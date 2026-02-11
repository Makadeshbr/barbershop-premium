"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  highlight?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  subtitle,
  title,
  highlight,
  align = "center",
  className,
}: SectionHeadingProps) {
  const alignmentClass = align === "center" ? "text-center" : "text-left";

  const renderTitle = () => {
    if (!highlight) {
      return title;
    }

    const parts = title.split(highlight);

    if (parts.length === 1) {
      return title;
    }

    return (
      <>
        {parts[0]}
        <span className="text-gold-gradient">{highlight}</span>
        {parts.slice(1).join(highlight)}
      </>
    );
  };

  return (
    <ScrollReveal className={cn(alignmentClass, className)}>
      {subtitle && (
        <p className="mb-3 text-sm font-body uppercase tracking-widest text-gold">
          {subtitle}
        </p>
      )}
      <h2 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
        {renderTitle()}
      </h2>
    </ScrollReveal>
  );
}
