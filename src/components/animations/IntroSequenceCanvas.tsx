"use client";

import { useRef, useEffect, useState } from "react";
import { useFrameSequence } from "@/hooks/useFrameSequence";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

export function IntroSequenceCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isLoading, progress, renderFrame, frameCount } = useFrameSequence(canvasRef);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Render first frame as soon as loading completes
  useEffect(() => {
    if (!isLoading) {
      renderFrame(0);
    }
  }, [isLoading, renderFrame]);

  // Set up GSAP scroll-driven animation on desktop
  useEffect(() => {
    if (isLoading || isMobile || !containerRef.current) return;

    // Total scroll distance: 300vh
    // First 30% (0–0.3): delay — mascot stays on frame 0
    // Next 70% (0.3–1.0): plays all 60 frames
    // This gives time before the animation kicks in.
    const DELAY_ZONE = 0.3; // 30% of scroll is "dead zone" — frame stays at 0

    const dummy = { progress: 0 };

    const frameTween = gsap.to(dummy, {
      progress: 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;

          if (p <= DELAY_ZONE) {
            // Still in the delay zone — hold frame 0
            renderFrame(0);
          } else {
            // Map remaining progress (DELAY_ZONE..1) → frame (0..last)
            const animProgress = (p - DELAY_ZONE) / (1 - DELAY_ZONE);
            const frameIndex = Math.round(animProgress * (frameCount - 1));
            renderFrame(Math.min(frameIndex, frameCount - 1));
          }
        },
      },
    });

    return () => {
      frameTween.scrollTrigger?.kill();
      frameTween.kill();
    };
  }, [isLoading, isMobile, renderFrame, frameCount]);

  // On mobile: auto-play animation (single pass then hold last frame)
  useEffect(() => {
    if (isLoading || !isMobile) return;

    let currentFrame = 0;
    let animFrameId: number;

    const animate = () => {
      renderFrame(currentFrame);

      if (currentFrame < frameCount - 1) {
        currentFrame++;
        animFrameId = requestAnimationFrame(() => {
          setTimeout(() => {
            animFrameId = requestAnimationFrame(animate);
          }, 60);
        });
      }
    };

    animFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [isLoading, isMobile, renderFrame, frameCount]);

  return (
    <div ref={containerRef} className="relative w-full h-screen">
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0D0D0D]">
          <div className="w-48 h-1 bg-[#2A2A2A] rounded-full overflow-hidden">
            <div
              className="h-full gold-gradient rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[#F5F0E0]/40 text-sm mt-3">
            Carregando... {progress}%
          </p>
        </div>
      )}

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.5s ease" }}
      />

      {/* Gradient overlays — the bottom one creates natural transition to dark Hero below */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/30 via-transparent to-[#1A1A1A] z-[1] pointer-events-none" />
    </div>
  );
}
