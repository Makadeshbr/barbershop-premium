"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PRICING_MENU, WHATSAPP_LINK } from "@/lib/constants";
import { fadeInUp, slideInRight } from "@/lib/animations";
import { formatCurrency } from "@/lib/utils";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function PricingSection() {
  return (
    <section id="agendar" className="py-20 lg:py-32 bg-dark">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* ── Left column: Price list ── */}
          <div>
            <SectionHeading
              subtitle="TABELA DE PREÇOS"
              title="Faremos o nosso melhor para te Satisfazer"
              highlight="Satisfazer"
              align="left"
            />

            <StaggerContainer className="mt-10">
              {PRICING_MENU.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ x: 8 }}
                  className="flex items-end py-3 px-2 -mx-2 rounded-lg hover:bg-gold/5 transition-colors cursor-default"
                >
                  <span className="text-cream/80 text-sm font-body whitespace-nowrap">
                    {item.service}
                  </span>
                  <span className="flex-1 border-b border-dotted border-gold/30 mx-3 mb-1" />
                  <span className="text-gold font-heading font-bold whitespace-nowrap">
                    {formatCurrency(item.price)}
                  </span>
                </motion.div>
              ))}
            </StaggerContainer>

            <ScrollReveal className="mt-8">
              <Button variant="primary" href={WHATSAPP_LINK}>
                Agendar pelo WhatsApp
              </Button>
            </ScrollReveal>
          </div>

          {/* ── Right column: Image + Map ── */}
          <ScrollReveal variants={slideInRight}>
            <div className="flex flex-col items-center">
              <div className="relative w-full max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] flex justify-center">
                <Image
                  src="/images/logos/bear-3d-welcome.png"
                  alt="Império Barbearia - Bem-vindo"
                  width={500}
                  height={500}
                  className="rounded-2xl object-contain max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] w-auto"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58902.12!2d-48.92!3d-23.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c01c8e3b3beb67%3A0xd0e40d3c7e02720d!2sAvar%C3%A9%2C%20SP!5e0!3m2!1sen!2sbr!4v1700000000000"
                title="Localização Império Barbearia - Avaré, SP"
                className="w-full h-48 sm:h-56 md:h-64 rounded-xl border-2 border-gold/20 mt-6"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
