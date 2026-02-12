"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TIPS } from "@/lib/constants";
import { TiltCard } from "@/components/animations/TiltCard";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Seção de dicas e artigos do blog.
 *
 * Exibe cards com imagem, categoria, título e excerpt de cada dica.
 * Cada card é um link para a página completa do artigo.
 * Ação 7: Cores padronizadas com tokens do design system.
 */
export function TipsSection() {
  return (
    <section id="blog" className="py-20 lg:py-32 bg-dark">
      <div className="max-w-7xl mx-auto section-padding">
        <SectionHeading
          subtitle="BLOG"
          title="Dicas e truques"
          highlight="truques"
          align="center"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
        >
          {TIPS.map((tip) => (
            <motion.div
              key={tip.id}
              variants={fadeInUp}
            >
              <TiltCard intensity={6}>
                <Link href={`/blog/${tip.slug}`} className="block">
                  <div className="bg-dark-card rounded-2xl overflow-hidden border border-dark-border group hover:border-gold/30 transition-colors">
                    <div className="relative aspect-[16/9] overflow-hidden bg-dark-border flex items-center justify-center">
                      <Image
                        src={tip.image}
                        alt={tip.title}
                        fill
                        className="object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 bg-gold text-dark-deep text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        {tip.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="font-heading text-lg text-white group-hover:text-gold transition-colors">
                        {tip.title}
                      </h3>
                      <p className="text-cream/60 text-sm mt-2 leading-relaxed line-clamp-2">
                        {tip.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 text-gold text-sm mt-4">
                        Ler mais
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
