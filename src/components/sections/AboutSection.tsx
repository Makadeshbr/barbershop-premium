"use client";

import { motion } from "framer-motion";
import { BUSINESS_HOURS } from "@/lib/constants";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
import { slideInLeft, slideInRight } from "@/lib/animations";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const FEATURES = [
  "Profissionais qualificados",
  "Produtos premium importados",
  "Ambiente climatizado",
  "Atendimento personalizado",
] as const;

export function AboutSection() {
  return (
    <section id="sobre" className="bg-dark py-20 lg:py-32">
      <div className="mx-auto max-w-7xl section-padding">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left column: text content ── */}
          <ScrollReveal variants={slideInLeft}>
            {/* Subtitle */}
            <p className="mb-3 text-sm font-body uppercase tracking-widest text-gold">
              Sobre Nós
            </p>

            {/* Heading with animated counter */}
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Somos{" "}
              <span className="inline-block text-5xl text-gold font-heading md:text-6xl lg:text-7xl">
                <AnimatedCounter target={15} duration={2.5} />
              </span>{" "}
              anos de{" "}
              <span className="text-gold-gradient">Experiência</span>
            </h2>

            {/* Description paragraph 1 */}
            <p className="mt-6 font-body leading-relaxed text-cream/70">
              Na Império Barbearia, cada detalhe é pensado para
              oferecer a melhor experiência. Com profissionais experientes
              e produtos de primeira linha, garantimos que você saia sempre
              satisfeito.
            </p>

            {/* Gold divider */}
            <div className="gold-divider my-6" />

            {/* Description paragraph 2 */}
            <p className="font-body leading-relaxed text-cream/70">
              Nosso compromisso é com a excelência. Cada corte,
              cada barba, cada tratamento reflete o padrão de qualidade
              que nos tornou referência em Avaré e região.
            </p>

            {/* Feature checklist */}
            <ul className="mt-8 space-y-3">
              {FEATURES.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-gold"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span className="font-body text-cream/80">{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* Business hours card */}
            <div className="glass-card mt-10 p-6">
              <h3 className="mb-4 font-heading text-lg font-semibold text-gold">
                Horário de Funcionamento
              </h3>

              <div className="space-y-2">
                {BUSINESS_HOURS.map(({ day, hours }) => (
                  <div
                    key={day}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="font-body text-sm text-cream/80">
                      {day}
                    </span>
                    <span className="flex-1 border-b border-dotted border-gold/30" />
                    <span
                      className={`font-body text-sm ${
                        hours === "Fechado"
                          ? "text-red-400"
                          : "text-cream/80"
                      }`}
                    >
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* ── Right column: image ── */}
          <ScrollReveal variants={slideInRight}>
            <div className="relative">
              {/* Decorative gold corner borders */}
              <div
                className="absolute -left-3 -top-3 z-10 h-20 w-20 border-l-2 border-t-2 border-gold rounded-tl-2xl"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-3 -right-3 z-10 h-20 w-20 border-b-2 border-r-2 border-gold rounded-br-2xl"
                aria-hidden="true"
              />

              {/* Image with parallax */}
              <ParallaxImage
                src="/images/bear-cutting.png"
                alt="Império Barbearia - Nosso espaço"
                className="aspect-[3/4] w-full rounded-2xl lg:aspect-[4/5]"
                speed={30}
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
