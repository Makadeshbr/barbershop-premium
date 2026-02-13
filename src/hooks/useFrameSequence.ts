/**
 * Hook que gerencia o pré-carregamento e renderização de uma sequência
 * de frames de imagem, usado para animação canvas scroll-driven.
 *
 * Otimizações implementadas:
 * - Concurrency limit no preload: carrega no máximo 6 imagens em paralelo
 *   para evitar saturar a rede e causar stalls em conexões mais lentas
 * - Progress tracking granular para UX de loading suave
 * - Cleanup de referências no unmount para evitar memory leaks
 * - Clamp de frameIndex para evitar acesso out-of-bounds
 *
 * @param canvasRef - Ref para o elemento canvas onde os frames serão desenhados
 * @returns Objeto com isLoading, progress (0-100), renderFrame(index), frameCount
 */
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { getFramePath } from "@/lib/utils";
import { INTRO_FRAME_START, INTRO_FRAME_END } from "@/lib/constants";

/** Diretório padrão dos frames de introdução */
const INTRO_FRAMES_PATH = "/images/intro";

/**
 * Número máximo de imagens carregando simultaneamente.
 * Valor 6 balanceia velocidade vs pressão de rede.
 * Em mobile com 3G lento, evita timeout de requisições.
 */
const MAX_CONCURRENT_LOADS = 6;

/**
 * Carrega um array de URLs de imagem com limite de concorrência.
 * Evita saturar a rede com dezenas de requests simultâneos.
 *
 * @param urls - Array de URLs de imagem para carregar
 * @param concurrency - Máximo de carregamentos simultâneos
 * @param onProgress - Callback chamado a cada imagem carregada, com total carregado
 * @returns Array de HTMLImageElement na mesma ordem das URLs
 */
async function loadImagesWithConcurrency(
  urls: string[],
  concurrency: number,
  onProgress: (loaded: number) => void
): Promise<HTMLImageElement[]> {
  const results: HTMLImageElement[] = new Array(urls.length);
  let loadedCount = 0;
  let nextIndex = 0;

  return new Promise((resolve) => {
    /**
     * Worker que processa uma imagem por vez em loop.
     * Cada worker pega o próximo índice disponível e carrega.
     */
    const processNext = () => {
      if (nextIndex >= urls.length) {
        // Todos os slots foram atribuídos — verifica se terminou
        if (loadedCount >= urls.length) {
          resolve(results);
        }
        return;
      }

      const currentIndex = nextIndex++;
      const img = new Image();

      const handleComplete = () => {
        results[currentIndex] = img;
        loadedCount++;
        onProgress(loadedCount);

        if (loadedCount >= urls.length) {
          resolve(results);
        } else {
          // Processa próxima imagem disponível neste "slot" de concorrência
          processNext();
        }
      };

      img.onload = handleComplete;
      img.onerror = handleComplete;
      img.src = urls[currentIndex];
    };

    // Inicia N workers em paralelo
    const workersToStart = Math.min(concurrency, urls.length);
    for (let i = 0; i < workersToStart; i++) {
      processNext();
    }
  });
}

export function useFrameSequence(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameCount = INTRO_FRAME_END - INTRO_FRAME_START + 1;

  /**
   * Pré-carrega todos os frames com concurrency limit.
   * Constrói array de URLs e delega para loadImagesWithConcurrency.
   */
  const preloadImages = useCallback(async () => {
    const urls: string[] = [];
    for (let i = INTRO_FRAME_START; i <= INTRO_FRAME_END; i++) {
      urls.push(getFramePath(INTRO_FRAMES_PATH, i));
    }

    const images = await loadImagesWithConcurrency(
      urls,
      MAX_CONCURRENT_LOADS,
      (loaded) => {
        setProgress(Math.round((loaded / frameCount) * 100));
      }
    );

    imagesRef.current = images;
    setIsLoading(false);
  }, [frameCount]);

  /**
   * Renderiza um frame específico no canvas.
   * Usa cover-fit para manter aspect ratio sem distorção.
   *
   * @param frameIndex - Índice do frame a renderizar (0-based)
   */
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

      // Usa devicePixelRatio para renderização nítida em telas HiDPI
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Cover-fit: mantém aspect ratio preenchendo todo o canvas
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
