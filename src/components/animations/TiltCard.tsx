"use client";

import { useTilt } from "@/hooks/useTilt";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function TiltCard({ children, className, intensity = 8 }: TiltCardProps) {
  const { ref, style, glareStyle } = useTilt(intensity);

  return (
    <div ref={ref} style={style} className={`relative ${className ?? ""}`}>
      {children}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl z-10"
        style={glareStyle}
        aria-hidden="true"
      />
    </div>
  );
}
