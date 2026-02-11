"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { slideInLeft, slideInRight } from "@/lib/animations";
import { WHATSAPP_LINK } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const CHECKLIST_ITEMS = [
  "Nós cuidamos de você e do seu estilo",
  "Barba é uma das coisas mais importantes para nós",
  "Somos 15 anos de experiência",
];

export function HairBeardSection() {
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!watermarkRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        watermarkRef.current,
        { x: 0 },
        {
          x: -200,
          ease: "none",
          scrollTrigger: {
            trigger: watermarkRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden bg-dark-deep py-20 lg:py-32">
      {/* Watermark text */}
      <div
        ref={watermarkRef}
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-heading text-[3rem] sm:text-[5rem] uppercase tracking-widest text-white/[0.03] md:text-[8rem] lg:text-[12rem]"
        aria-hidden="true"
      >
        IMPÉRIO BARBEARIA
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl section-padding">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column - Image */}
          <ScrollReveal variants={slideInLeft}>
            <div className="shadow-[0_0_60px_rgba(197,165,90,0.1)]">
              <ParallaxImage
                src="/images/bear-cutting.png"
                alt="Cuidados premium com cabelo e barba"
                className="w-full aspect-square rounded-2xl"
                speed={40}
              />
            </div>
          </ScrollReveal>

          {/* Right column - Text */}
          <ScrollReveal variants={slideInRight}>
            <SectionHeading
              subtitle="CUIDADOS PREMIUM"
              title="Nós cuidamos do seu Cabelo e Barba"
              highlight="Cabelo e Barba"
              align="left"
              className="mb-6"
            />

            <p className="leading-relaxed text-cream/70">
              Na Império Barbearia, oferecemos um atendimento completo com os
              melhores produtos e técnicas do mercado. Cada corte é uma obra de
              arte.
            </p>

            <ul className="mt-6 space-y-4">
              {CHECKLIST_ITEMS.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 shrink-0 text-gold" />
                  <span className="font-body text-cream/80">{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8">
              <Button variant="primary" href={WHATSAPP_LINK}>
                Agendar Horário
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
