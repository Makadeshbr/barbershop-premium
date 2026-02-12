import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina classes CSS condicionalmente usando clsx e resolve conflitos
 * de utilitários Tailwind via tailwind-merge.
 *
 * @param inputs - Valores de classes CSS (strings, objetos condicionais, arrays)
 * @returns String de classes CSS sem duplicatas ou conflitos
 *
 * @example
 * ```ts
 * cn("px-4 py-2", isActive && "bg-gold", "px-8")
 * // Resultado: "py-2 px-8 bg-gold" (px-8 sobrescreve px-4)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formata um valor numérico como moeda brasileira (Real - BRL).
 *
 * @param value - Valor numérico a ser formatado
 * @returns String formatada no padrão "R$ X,XX"
 *
 * @example
 * ```ts
 * formatCurrency(45)    // "R$ 45,00"
 * formatCurrency(70.5)  // "R$ 70,50"
 * ```
 */
export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/**
 * Gera o caminho para um frame de sequência de imagens usada pelo Remotion.
 * Os frames seguem o padrão de nomeação com zero-padding de 4 dígitos.
 *
 * @param basePath - Diretório base onde os frames estão armazenados
 * @param frameNumber - Número do frame (será padded com zeros à esquerda)
 * @returns Caminho completo do frame no formato "basePath/frame0001.webp"
 *
 * @example
 * ```ts
 * getFramePath("/images/intro", 5)
 * // Resultado: "/images/intro/frame0005.webp"
 * ```
 */
export function getFramePath(basePath: string, frameNumber: number): string {
  return `${basePath}/frame${String(frameNumber).padStart(4, "0")}.webp`;
}
