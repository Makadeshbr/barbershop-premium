/**
 * Banner fixo no rodapé que promove o serviço de criação de sites.
 * Pode ser fechado pelo usuário via botão X.
 *
 * Melhorias implementadas:
 * - Aplica padding-bottom dinâmico no body para evitar que o banner
 *   fixo cubra conteúdo no mobile (especialmente o footer)
 * - Limpa o padding ao fechar ou desmontar o componente
 */
"use client";

import { useState, useEffect, useRef } from "react";
import { X, ExternalLink } from "lucide-react";

/** URL de contato para o CTA do banner de demonstração */
const CONTACT_URL = "https://allanfelipef.dev/";

/**
 * Altura estimada do banner em pixels.
 * Usar valor conservador para garantir que todo conteúdo fica acessível.
 */
const BANNER_HEIGHT_PX = 64;

export function DemoBanner() {
  const [visible, setVisible] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);

  /**
   * Aplica padding-bottom no body igual à altura real do banner,
   * garantindo que conteúdo fixo no fundo (ex: footer) não fique
   * escondido atrás do banner, especialmente em viewports mobile.
   */
  useEffect(() => {
    if (!visible) {
      document.body.style.paddingBottom = "";
      return;
    }

    /**
     * Usa a altura real do elemento se disponível, caso contrário
     * usa o valor estimado constante como fallback.
     */
    const updatePadding = () => {
      const height = bannerRef.current?.offsetHeight ?? BANNER_HEIGHT_PX;
      document.body.style.paddingBottom = `${height}px`;
    };

    // Atualiza após o render para capturar a altura real do DOM
    updatePadding();

    // Recalcula em resize — o banner pode mudar de altura (texto wrap no mobile)
    window.addEventListener("resize", updatePadding, { passive: true });

    return () => {
      document.body.style.paddingBottom = "";
      window.removeEventListener("resize", updatePadding);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      className="fixed bottom-0 left-0 right-0 z-[60] bg-gradient-to-r from-dark-deep via-dark to-dark-deep border-t border-gold/30 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm sm:text-base font-semibold leading-tight">
            Tenha seu site de Barbearia profissional
            <span className="text-gold"> + App de Agendamento</span>
          </p>
          <p className="text-white/50 text-xs sm:text-sm mt-0.5 hidden sm:block">
            Site completo + aplicativo onde seus clientes agendam horários pelo celular
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold text-dark-deep text-xs sm:text-sm font-bold px-4 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-gold-light transition-colors whitespace-nowrap inline-flex items-center gap-1.5"
          >
            Quero saber mais
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setVisible(false)}
            className="text-white/40 hover:text-white transition-colors p-1 cursor-pointer"
            aria-label="Fechar banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
