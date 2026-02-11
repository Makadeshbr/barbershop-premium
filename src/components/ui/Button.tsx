"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-dark-deep font-semibold hover:bg-gold-light active:bg-gold-dark",
  secondary:
    "bg-transparent border-2 border-gold text-gold hover:bg-gold/10 active:bg-gold/20",
  ghost:
    "bg-transparent text-gold hover:underline underline-offset-4 decoration-gold",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  onClick,
}: ButtonProps) {
  const baseStyles =
    "btn-shimmer inline-flex items-center justify-center rounded-md font-body tracking-wide transition-colors duration-200 cursor-pointer";

  const combinedClassName = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={combinedClassName}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={combinedClassName}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
