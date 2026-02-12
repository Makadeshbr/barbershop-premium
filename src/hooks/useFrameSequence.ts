"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { getFramePath } from "@/lib/utils";
import { INTRO_FRAME_START, INTRO_FRAME_END } from "@/lib/constants";

/** Diretório padrão dos frames de introdução */
const INTRO_FRAMES_PATH = "/images/intro";

export function useFrameSequence(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameCount = INTRO_FRAME_END - INTRO_FRAME_START + 1;

  const preloadImages = useCallback(async () => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    const loadPromises = [];
    for (let i = INTRO_FRAME_START; i <= INTRO_FRAME_END; i++) {
      const promise = new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.onload = () => {
          loaded++;
          setProgress(Math.round((loaded / frameCount) * 100));
          resolve(img);
        };
        img.onerror = () => {
          loaded++;
          setProgress(Math.round((loaded / frameCount) * 100));
          resolve(img);
        };
        img.src = getFramePath(INTRO_FRAMES_PATH, i);
      });
      loadPromises.push(promise);
    }

    const loadedImages = await Promise.all(loadPromises);
    images.push(...loadedImages);
    imagesRef.current = images;
    setIsLoading(false);
  }, [frameCount]);

  const renderFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const images = imagesRef.current;
      const clampedIndex = Math.max(0, Math.min(frameIndex, images.length - 1));
      const img = images[clampedIndex];

      if (!img || !img.complete || img.naturalWidth === 0) return;

      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const canvasAspect = canvas.width / canvas.height;
      const imgAspect = img.naturalWidth / img.naturalHeight;

      let drawWidth: number;
      let drawHeight: number;
      let drawX: number;
      let drawY: number;

      if (imgAspect > canvasAspect) {
        drawHeight = canvas.height;
        drawWidth = drawHeight * imgAspect;
        drawX = (canvas.width - drawWidth) / 2;
        drawY = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = drawWidth / imgAspect;
        drawX = 0;
        drawY = (canvas.height - drawHeight) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    },
    [canvasRef]
  );

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  return { isLoading, progress, renderFrame, frameCount };
}
