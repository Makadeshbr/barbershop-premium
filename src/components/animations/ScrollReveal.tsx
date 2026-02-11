"use client";

import { motion, type Variants } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface ScrollRevealProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}

export function ScrollReveal({
  children,
  variants = fadeInUp,
  className,
  delay = 0,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
