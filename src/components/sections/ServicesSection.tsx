"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SERVICES } from "@/lib/constants";
import { TiltCard } from "@/components/animations/TiltCard";
import { scaleIn } from "@/lib/animations";
import { formatCurrency } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerContainer } from "@/components/animations/StaggerContainer";

export function ServicesSection() {
  return (
    <section id="servicos" className="bg-cream py-20 lg:py-32">
      <div className="mx-auto max-w-7xl section-padding">
        <SectionHeading
          subtitle="NOSSOS SERVIÇOS"
          title="O que oferecemos aos nossos clientes"
          highlight="clientes"
          align="center"
          className="[&_h2]:text-dark [&_p]:text-dark/60 mb-12 lg:mb-16"
        />

        <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {SERVICES.map((service) => (
            <motion.div
              key={service.id}
              variants={scaleIn}
            >
              <TiltCard intensity={8} className="h-full">
                <div className="rounded-2xl bg-white p-6 text-center shadow-lg lg:p-8 h-full transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(197,165,90,0.15)]">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={80}
                      height={80}
                      className="h-20 w-20 object-contain"
                    />
                  </div>

                  <h3 className="mt-4 font-heading text-xl text-dark">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-dark/60">
                    {service.description}
                  </p>

                  <p className="mt-4 font-heading text-3xl font-bold text-gold">
                    {formatCurrency(service.price)}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
