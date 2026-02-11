"use client";

import { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS, WHATSAPP_LINK, BUSINESS_HOURS, CONTACT, SITE_NAME } from "@/lib/constants";
import { useLenis } from "@/hooks/useSmoothScroll";

export function Footer() {
  const lenis = useLenis();

  const scrollToSection = useCallback((href: string) => {
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { offset: 0 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, [lenis]);

  return (
    <footer className="bg-dark-deep border-t border-gold/20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Brand */}
          <div className="flex flex-col gap-4">
            <Image
              src="/images/icons/logo_semfundo.png"
              alt="Império Barbearia"
              width={140}
              height={140}
              className="h-36 w-36 object-contain"
            />
            <h3 className="text-gold font-heading text-xl">
              Império Barbearia
            </h3>
            <p className="text-cream/60 text-sm font-body italic">
              Domine. Transforme. Impressione.
            </p>
            <div className="flex items-center gap-3 mt-2">
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
            </div>
          </div>

          {/* Column 2 - Links */}
          <div>
            <h4 className="text-gold font-heading text-lg mb-4">
              Links Rápidos
            </h4>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-cream/60 hover:text-gold transition-colors duration-200 text-sm font-body cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  href="/privacidade"
                  className="text-cream/60 hover:text-gold transition-colors duration-200 text-sm font-body"
                >
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Business Hours */}
          <div>
            <h4 className="text-gold font-heading text-lg mb-4">
              Horário de Funcionamento
            </h4>
            <ul className="flex flex-col gap-2">
              {BUSINESS_HOURS.map((item) => (
                <li
                  key={item.day}
                  className="flex items-center justify-between text-sm font-body"
                >
                  <span className="text-cream/60">{item.day}</span>
                  <span
                    className={
                      item.hours === "Fechado"
                        ? "text-red-400/80"
                        : "text-cream/80"
                    }
                  >
                    {item.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="text-gold font-heading text-lg mb-4">Contato</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5 text-sm font-body text-cream/60">
                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span>{CONTACT.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="flex items-start gap-2.5 text-sm font-body text-cream/60 hover:text-gold transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>{CONTACT.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-2.5 text-sm font-body text-cream/60 hover:text-gold transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm font-body text-cream/60 hover:text-gold transition-colors duration-200 mt-1"
                >
                  <MessageCircle className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>Fale pelo WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
          <p className="text-center text-cream/40 text-sm py-4 font-body">
            &copy; {new Date().getFullYear()} {SITE_NAME}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
