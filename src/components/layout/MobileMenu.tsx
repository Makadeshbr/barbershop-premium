"use client";

import { useCallback } from "react";
import { X, Instagram, Facebook, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SOCIAL_LINKS, WHATSAPP_LINK } from "@/lib/constants";
import { useLenis } from "@/hooks/useSmoothScroll";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, delay: 0.1 },
  },
};

const EASE = [0.22, 1, 0.36, 1] as const;

const menuVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.4, ease: EASE },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.3, ease: EASE },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      delay: 0.15 + i * 0.08,
      ease: EASE,
    },
  }),
  exit: {
    opacity: 0,
    x: 50,
    transition: { duration: 0.2 },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.15 + NAV_LINKS.length * 0.08 + 0.1,
      ease: EASE,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 },
  },
};

const socialsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.15 + NAV_LINKS.length * 0.08 + 0.25,
      ease: EASE,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 },
  },
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const lenis = useLenis();

  const scrollToSection = useCallback((href: string) => {
    onClose();
    // Small delay to let menu close animation start before scrolling
    setTimeout(() => {
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      if (lenis) {
        lenis.scrollTo(target, { offset: 0 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [lenis, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-dark-deep/95 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-cream hover:text-gold transition-colors p-2"
              aria-label="Fechar menu"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Navigation Links */}
            <nav className="flex flex-col items-center gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-cream text-2xl sm:text-3xl font-heading uppercase tracking-widest hover:text-gold transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </button>
                </motion.div>
              ))}
            </nav>

            {/* CTA Button */}
            <motion.div
              className="mt-10"
              variants={ctaVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="bg-gold text-dark font-body font-semibold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-gold-light transition-colors duration-200 inline-block"
              >
                Agendar Horário
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              className="mt-8 flex items-center gap-5"
              variants={socialsVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/60 hover:text-gold transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/60 hover:text-gold transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/60 hover:text-gold transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
