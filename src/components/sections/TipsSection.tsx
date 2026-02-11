"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TIPS } from "@/lib/constants";
import { TiltCard } from "@/components/animations/TiltCard";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TipsSection() {
  return (
    <section id="blog" className="py-20 lg:py-32 bg-[#1A1A1A]">
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
                  <div className="bg-[#1F1F1F] rounded-2xl overflow-hidden border border-[#2A2A2A] group hover:border-[#C5A55A]/30 transition-colors">
                    <div className="relative aspect-[16/9] overflow-hidden bg-[#2A2A2A] flex items-center justify-center">
                      <Image
                        src={tip.image}
                        alt={tip.title}
                        fill
                        className="object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 bg-[#C5A55A] text-[#0D0D0D] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        {tip.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="font-[family-name:var(--font-playfair)] text-lg text-white group-hover:text-[#C5A55A] transition-colors">
                        {tip.title}
                      </h3>
                      <p className="text-[#F5F0E0]/60 text-sm mt-2 leading-relaxed line-clamp-2">
                        {tip.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[#C5A55A] text-sm mt-4">
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
