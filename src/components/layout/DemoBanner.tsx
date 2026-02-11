"use client";

import { useState } from "react";
import { X, ExternalLink } from "lucide-react";

const WHATSAPP_CONTACT =
  "https://wa.me/5514999999999?text=Olá! Tenho interesse no site de barbearia e no app de agendamento."; // [PREENCHA] número real

export function DemoBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-gradient-to-r from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] border-t border-[#C5A55A]/30 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm sm:text-base font-semibold leading-tight">
            Tenha seu site de Barbearia profissional
            <span className="text-[#C5A55A]"> + App de Agendamento</span>
          </p>
          <p className="text-white/50 text-xs sm:text-sm mt-0.5 hidden sm:block">
            Site completo + aplicativo onde seus clientes agendam horários pelo celular
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={WHATSAPP_CONTACT}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C5A55A] text-[#0D0D0D] text-xs sm:text-sm font-bold px-4 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-[#D4B96E] transition-colors whitespace-nowrap inline-flex items-center gap-1.5"
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
