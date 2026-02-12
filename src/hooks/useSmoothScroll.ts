/**
 * Hook que fornece acesso à instância do Lenis smooth scroll.
 *
 * Deve ser usado dentro de um SmoothScrollProvider. Retorna a instância
 * do Lenis ou null se o smooth scroll não estiver ativo (ex: em mobile
 * ou quando o usuário prefere movimento reduzido).
 *
 * @returns Instância do Lenis ou null se não disponível
 *
 * @example
 * ```tsx
 * const lenis = useLenis();
 * // Scroll suave programático
 * lenis?.scrollTo("#secao", { offset: 0 });
 * ```
 */
"use client";

import { createContext, useContext } from "react";
import type Lenis from "lenis";

/**
 * Contexto React para compartilhar a instância do Lenis entre componentes.
 * Inicializado com null — o SmoothScrollProvider define o valor real.
 */
export const LenisContext = createContext<Lenis | null>(null);

/**
 * Hook para acessar a instância do Lenis smooth scroll.
 *
 * @returns Instância do Lenis ou null se indisponível
 */
export function useLenis() {
  return useContext(LenisContext);
}
