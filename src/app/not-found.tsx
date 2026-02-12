"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const handleReady = useCallback(() => setVideoReady(true), []);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 3) setVideoReady(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onCanPlay={handleReady}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-out ${videoReady ? "opacity-40" : "opacity-0"
          }`}
      >
        <source src="/videos/video2.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-transparent to-black/60" />

      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="font-heading text-8xl md:text-9xl font-bold text-white">
          404
        </h1>
        <div className="h-0.5 w-16 mx-auto my-6 gold-gradient" />
        <p className="font-accent text-2xl md:text-3xl italic text-gold mb-4">
          Página não encontrada
        </p>
        <p className="text-cream/60 max-w-md mx-auto mb-10">
          A página que você procura não existe ou foi movida.
        </p>
        <Link
          href="/"
          className="btn-shimmer inline-flex items-center justify-center rounded-md font-body tracking-wide bg-gold text-dark-deep font-semibold px-8 py-4 text-lg hover:bg-gold-light transition-colors duration-200"
        >
          Voltar ao Início
        </Link>
      </motion.div>
    </div>
  );
}
