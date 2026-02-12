"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

/**
 * Seção de depoimentos com carrossel interativo.
 *
 * Funcionalidades:
 * - Auto-advance a cada 5 segundos (pausa no hover)
 * - Navegação por botões (setas), dots e teclado (← →)
 * - Progress bar animado sincronizado com o auto-advance
 * - Acessibilidade: role="region", aria-roledescription, aria-live
 */
export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const totalTestimonials = TESTIMONIALS.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalTestimonials);
  }, [totalTestimonials]);

  const goToPrev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + totalTestimonials) % totalTestimonials
    );
  }, [totalTestimonials]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-advance a cada 5 segundos, pausando no hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  // Ação 9: Navegação por teclado — ArrowLeft e ArrowRight
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    }

    carousel.addEventListener("keydown", handleKeyDown);
    return () => carousel.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  const testimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="bg-cream py-20 lg:py-32">
      <div className="mx-auto max-w-7xl section-padding">
        <SectionHeading
          subtitle="DEPOIMENTOS"
          title="Nossos queridos clientes"
          highlight="clientes"
          align="center"
          className="[&_h2]:text-dark [&_p]:text-dark/60 mb-12 lg:mb-16"
        />

        <ScrollReveal>
          {/* Ação 9: region + aria-roledescription para acessibilidade do carrossel */}
          <div
            ref={carouselRef}
            className="relative"
            role="region"
            aria-roledescription="carrossel"
            aria-label="Depoimentos de clientes"
            tabIndex={0}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            {/* Conteúdo do Carrossel */}
            <div className="relative mx-auto max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl bg-white p-5 sm:p-8 shadow-lg lg:p-12"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Depoimento ${currentIndex + 1} de ${totalTestimonials}`}
                >
                  {/* Ícone de Aspas */}
                  <Quote className="mb-6 h-8 w-8 sm:h-12 sm:w-12 text-gold opacity-20 lg:h-16 lg:w-16" />

                  {/* Texto do Depoimento */}
                  <p className="font-accent text-xl italic leading-relaxed text-dark lg:text-2xl">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Estrelas */}
                  <div className="mt-6 flex items-center gap-1" aria-label={`Avaliação: ${testimonial.rating} de 5 estrelas`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating
                            ? "fill-gold text-gold"
                            : "text-dark/20"
                          }`}
                      />
                    ))}
                  </div>

                  {/* Nome do Cliente */}
                  <p className="mt-4 font-heading text-lg text-dark">
                    {testimonial.name}
                  </p>

                  {/* Divisor Dourado */}
                  <div className="gold-divider mt-3 w-12" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Setas de Navegação */}
            <button
              onClick={goToPrev}
              aria-label="Depoimento anterior"
              className="absolute left-0 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gold text-white shadow-lg transition-all hover:scale-110 hover:bg-gold/90 max-lg:left-1 lg:-left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={goToNext}
              aria-label="Próximo depoimento"
              className="absolute right-0 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gold text-white shadow-lg transition-all hover:scale-110 hover:bg-gold/90 max-lg:right-1 lg:-right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </ScrollReveal>

        {/* Navegação por Dots */}
        <div className="mt-8 flex items-center justify-center gap-3" role="tablist" aria-label="Navegar depoimentos">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Ir para depoimento ${index + 1}`}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${index === currentIndex
                  ? "scale-125 bg-gold"
                  : "bg-dark/20 hover:bg-dark/40"
                }`}
            />
          ))}
        </div>

        {/* Barra de Progresso */}
        <div className="mt-4 flex justify-center">
          <div className="w-48 h-1 bg-dark/10 rounded-full overflow-hidden">
            <div
              key={currentIndex}
              className="h-full gold-gradient rounded-full"
              style={{
                animation: "progressFill 5s linear forwards",
                animationPlayState: isPaused ? "paused" : "running",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
