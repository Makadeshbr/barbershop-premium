"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { WHATSAPP_LINK } from "@/lib/constants";
import { heroTextReveal, staggerContainer } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { gsap } from "@/lib/gsap-config";

const VIDEO_SRC = "/videos/video_inicial2.mp4";

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  const handleVideoReady = useCallback(() => setVideoReady(true), []);

  // Handle browser-cached video (already loaded before React hydrates)
  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 3) setVideoReady(true);
  }, []);

  // Desktop: scroll-driven parallax zoom + overlay darkening
  // Respects prefers-reduced-motion — no parallax for users who opt out
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const overlay = overlayRef.current;
    if (!section || !video || !overlay) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        tl.to(video, { yPercent: 20, scale: 1.08, ease: "none" }, 0);
        tl.to(overlay, { opacity: 0.7, ease: "none" }, 0);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* ── Vídeo principal — fundo preto do vídeo funde-se com bg-black da seção ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onCanPlay={handleVideoReady}
        className={`absolute inset-0 w-full h-full object-contain will-change-transform transition-opacity duration-[1500ms] ease-out ${videoReady ? "opacity-100" : "opacity-0"
          }`}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Fallback gradient while video loads */}
      <div
        className={`absolute inset-0 z-[1] bg-gradient-to-b from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] transition-opacity duration-[1500ms] ease-out ${videoReady ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
      />

      {/* Dark overlay for text readability (opacity animated by GSAP on scroll) */}
      <div ref={overlayRef} className="absolute inset-0 z-[2] bg-black/40" />

      {/* Cinematic vignette */}
      <div className="absolute inset-0 z-[3] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(13,13,13,0.4)_70%,rgba(13,13,13,0.8)_100%)]" />

      {/* Bottom fade — seamless transition into next section */}
      <div className="absolute bottom-0 left-0 right-0 z-[3] h-32 pointer-events-none bg-gradient-to-t from-[#0D0D0D] to-transparent" />

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={heroTextReveal}
          className="mb-4 text-xs uppercase tracking-widest text-[#C5A55A]"
        >
          Avaré, São Paulo
        </motion.p>

        <motion.div variants={heroTextReveal} className="gold-divider mb-8" />

        <motion.h1
          variants={heroTextReveal}
          className="font-[family-name:var(--font-playfair)] text-3xl sm:text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl"
        >
          Faça seu próprio
        </motion.h1>

        <motion.span
          variants={heroTextReveal}
          className="mt-2 block font-[family-name:var(--font-cormorant)] text-4xl sm:text-6xl italic text-gold-gradient md:text-8xl lg:text-9xl"
        >
          Estilo
        </motion.span>

        <motion.p
          variants={heroTextReveal}
          className="mt-6 max-w-md text-lg text-[#F5F0E0]/80 md:text-xl"
        >
          Domine. Transforme. Impressione.
        </motion.p>

        <motion.div variants={heroTextReveal} className="mt-10">
          <Button href={WHATSAPP_LINK} variant="primary" size="lg">
            Agendar Horário
          </Button>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-[#F5F0E0]/40">
            Role para baixo
          </span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#C5A55A]/60"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
