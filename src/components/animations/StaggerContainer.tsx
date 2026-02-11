"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function StaggerContainer({
  children,
  className,
  delay = 0,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: staggerContainer.hidden,
        visible: {
          ...staggerContainer.visible,
          transition: {
            ...(typeof staggerContainer.visible === "object" &&
            "transition" in staggerContainer.visible
              ? staggerContainer.visible.transition
              : {}),
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
