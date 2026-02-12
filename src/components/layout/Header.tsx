"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { Instagram, Facebook, MessageCircle, Menu, Phone, Mail } from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS, WHATSAPP_LINK, BUSINESS_HOURS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useLenis } from "@/hooks/useSmoothScroll";
import { useActiveSection } from "@/hooks/useActiveSection";
import { MobileMenu } from "./MobileMenu";

/**
 * IDs das seções da página principal, extraídos dos links de navegação.
 * Usados pelo IntersectionObserver para detectar a seção visível.
 */
const SECTION_IDS = NAV_LINKS.map((link) => link.href.replace("#", ""));

/**
 * Header principal do site com barra de informações, navegação desktop/mobile,
 * e destaque automático do link ativo via IntersectionObserver.
 *
 * Comportamento:
 * - Esconde ao rolar para baixo, reaparece ao rolar para cima
 * - Muda de transparente para blur+fundo ao rolar
 * - Destaca automaticamente o link da seção visível na viewport
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollDirection, scrollY } = useScrollDirection();
  const lenis = useLenis();

  // Ação 8: IntersectionObserver para detectar a seção visível automaticamente
  const activeSection = useActiveSection(SECTION_IDS);

  // Fallback para #inicio caso nenhuma seção esteja visível (topo da página)
  const activeLink = activeSection || "#inicio";

  const scrollToSection = useCallback((href: string) => {
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { offset: 0 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, [lenis]);

  const isScrolled = scrollY > 100;
  const isHidden = scrollDirection === "down" && scrollY > 100;

  /** Calcula o horário de funcionamento do dia atual */
  const todayHours = useMemo(() => {
    const todayIndex = new Date().getDay();
    const daysMap = [6, 0, 1, 2, 3, 4, 5];
    return BUSINESS_HOURS[daysMap[todayIndex]];
  }, []);

  return (
    <>
      {/* Barra de informações — visível apenas em desktop */}
      <div
        className={cn(
          "hidden lg:block fixed top-0 left-0 right-0 z-50 bg-dark-deep text-xs text-cream/60 transition-transform duration-300",
          isHidden && "-translate-y-full"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 flex items-center justify-between py-2">
          {/* Esquerda — Email e Telefone */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:contato@imperiobarbearia.com"
              className="flex items-center gap-1.5 hover:text-gold transition-colors"
            >
              <Mail className="w-3 h-3" />
              <span>contato@imperiobarbearia.com</span>
            </a>
            <a
              href="tel:+5514999999999"
              className="flex items-center gap-1.5 hover:text-gold transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>(14) 99999-9999</span>
            </a>
          </div>

          {/* Centro — Horário */}
          <div className="flex items-center gap-1.5">
            <span>
              Hoje ({todayHours.day}): {todayHours.hours}
            </span>
          </div>

          {/* Direita — Ícones Sociais */}
          <div className="flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Navbar Principal */}
      <header
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-300",
          "lg:top-[32px]",
          "top-0",
          isScrolled
            ? "bg-dark-deep/95 backdrop-blur-md border-b border-gold"
            : "bg-transparent border-b border-transparent",
          isHidden && "-translate-y-full"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection("#inicio")}>
              <Image
                src="/images/icons/logo_semfundo.png"
                alt="Império Barbearia"
                width={80}
                height={80}
                className="h-16 w-16 lg:h-20 lg:w-20 object-contain"
                priority
              />
            </button>

            {/* Navegação Desktop — Centro */}
            <ul className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className={cn(
                      "text-xs uppercase tracking-widest font-body transition-colors duration-200 pb-1 border-b-2 cursor-pointer",
                      activeLink === link.href
                        ? "text-gold border-gold"
                        : "text-cream/80 border-transparent hover:text-gold hover:border-gold"
                    )}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Desktop — CTA + Divisor + Social */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold text-dark font-body font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-gold-light transition-colors duration-200"
              >
                Agendar Horário
              </a>

              {/* Divisor Vertical */}
              <div className="w-px h-6 bg-cream/20" />

              {/* Ícones Sociais */}
              <div className="flex items-center gap-3">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/60 hover:text-gold transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/60 hover:text-gold transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/60 hover:text-gold transition-colors duration-200"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Botão Hambúrguer Mobile */}
            <button
              className="lg:hidden text-cream p-2 hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Menu Mobile */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
