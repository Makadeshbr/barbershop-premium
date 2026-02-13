/**
 * Hook que detecta a direção de rolagem (up/down) e a posição vertical atual.
 *
 * Otimizações implementadas:
 * - Estado unificado em objeto único para evitar double-render por evento
 * - Throttle via requestAnimationFrame para limitar execução a 1x por frame
 * - Leitura imediata de window.scrollY no mount para capturar posição
 *   restaurada pelo browser (ex: reload com scroll restaurado)
 * - Event listener passivo para não bloquear o thread principal
 *
 * @returns Objeto com `scrollDirection` ("up" | "down") e `scrollY` (posição vertical em px)
 *
 * @example
 * ```tsx
 * const { scrollDirection, scrollY } = useScrollDirection();
 * const isHeaderHidden = scrollDirection === "down" && scrollY > 100;
 * ```
 */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/** Estrutura unificada de estado de scroll */
interface ScrollState {
  /** Direção atual do scroll */
  direction: "up" | "down";
  /** Posição vertical em pixels */
  y: number;
}

/**
 * Threshold mínimo de delta em pixels para considerar uma mudança de direção.
 * Evita mudanças erráticas em micro-scrolls causados por touch ou trackpad.
 */
const DIRECTION_THRESHOLD = 5;

export function useScrollDirection() {
  const [scrollState, setScrollState] = useState<ScrollState>({
    direction: "up",
    y: 0,
  });

  /** Ref para a última posição Y conhecida — evita closure stale no handler */
  const lastScrollYRef = useRef(0);

  /** Ref para controle do requestAnimationFrame — garante no máximo 1 execução por frame */
  const rafIdRef = useRef<number | null>(null);

  /**
   * Handler de scroll com throttle via RAF.
   * Compara a posição atual com a anterior para determinar direção,
   * aplicando threshold para evitar mudanças em micro-scrolls.
   */
  const handleScroll = useCallback(() => {
    // Se já há um frame agendado, não agendar outro (throttle natural do RAF)
    if (rafIdRef.current !== null) return;

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;

      const currentY = window.scrollY;
      const lastY = lastScrollYRef.current;
      const delta = currentY - lastY;

      // Ignora micro-scrolls abaixo do threshold
      if (Math.abs(delta) < DIRECTION_THRESHOLD) return;

      const newDirection = delta > 0 ? "down" : "up";
      lastScrollYRef.current = currentY;

      // Atualização única de estado — evita double-render
      setScrollState({ direction: newDirection, y: currentY });
    });
  }, []);

  useEffect(() => {
    // Captura posição real no mount — corrige SSR hydration mismatch
    // e browser scroll restoration (ex: reload com scroll mantido)
    const initialY = window.scrollY;
    lastScrollYRef.current = initialY;

    if (initialY > 0) {
      setScrollState({ direction: "up", y: initialY });
    }

    // Passive listener — não bloqueia compositing do scroll
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      // Cancela RAF pendente para evitar memory leak e setState após unmount
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [handleScroll]);

  return {
    scrollDirection: scrollState.direction,
    scrollY: scrollState.y,
  };
}
