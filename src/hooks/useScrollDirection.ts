/**
 * Hook que detecta a direção de rolagem (up/down) e a posição vertical atual.
 *
 * Utiliza um event listener passivo para performance otimizada,
 * evitando bloqueio do thread principal durante o scroll.
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

import { useState, useEffect, useRef } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    /**
     * Handler de scroll que compara a posição atual com a anterior
     * para determinar a direção. Usa threshold de 5px para evitar
     * mudanças erráticas em micro-scrolls.
     */
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (Math.abs(currentScrollY - lastScrollY.current) < 5) return;

      setScrollDirection(currentScrollY > lastScrollY.current ? "down" : "up");
      lastScrollY.current = currentScrollY;
    };

    // Passive event listener — não bloqueia o scroll para melhor performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollDirection, scrollY };
}
