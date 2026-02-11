"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface TiltState {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
}

const INITIAL: TiltState = { rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 };

export function useTilt(intensity = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>(INITIAL);
  const [isHovering, setIsHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop
    const check = () => setEnabled(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current || !enabled) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -intensity;
      const rotateY = ((x - centerX) / centerX) * intensity;

      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      setTilt({ rotateX, rotateY, glareX, glareY });
    },
    [intensity, enabled]
  );

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTilt(INITIAL);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enabled, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  const style = enabled
    ? {
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: isHovering
          ? "transform 0.1s ease-out"
          : "transform 0.4s ease-out",
      }
    : {};

  const glareStyle = enabled && isHovering
    ? {
        background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(197,165,90,0.15) 0%, transparent 60%)`,
        opacity: 1,
      }
    : { opacity: 0 };

  return { ref, style, glareStyle, isHovering };
}
