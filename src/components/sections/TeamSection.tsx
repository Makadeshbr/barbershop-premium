"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TEAM_MEMBERS } from "@/lib/constants";
import { TiltCard } from "@/components/animations/TiltCard";
import { fadeInUp } from "@/lib/animations";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TeamSection() {
  return (
    <section id="espaco" className="py-20 lg:py-32 bg-dark-deep">
      <div className="max-w-7xl mx-auto section-padding">
        <SectionHeading
          subtitle="NOSSA EQUIPE"
          title="Conheça os artistas"
          highlight="artistas"
          align="center"
          className="mb-12"
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
            >
              <TiltCard intensity={6}>
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] group border-2 border-transparent hover:border-gold/50 transition-colors duration-500">
                  {/* Team member image */}
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-dark-deep/90 via-dark-deep/40 to-transparent" />

                  {/* Text content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading text-xl text-white">
                      {member.name}
                    </h3>
                    <p className="text-gold text-sm uppercase tracking-wider mt-1">
                      {member.role}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
