/**
 * Variantes de animação centralizadas para Framer Motion.
 *
 * Todas as animações usam o padrão hidden → visible para integração
 * com whileInView e viewport={{ once: true }} nos componentes.
 *
 * Valores de deslocamento (x, y) foram calibrados para funcionar
 * bem tanto em desktop quanto mobile:
 * - Deslocamentos moderados (20-40px) que não causam overflow
 *   ou content-shift perceptível em viewports pequenos
 * - Duração e easing consistentes em toda a aplicação
 *
 * @module animations
 */

import { type Variants } from "framer-motion";

/** Easing padrão — curva custom com entrada suave e saída precisa */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Fade in com deslocamento vertical de baixo para cima.
 * Uso principal: entrada de elementos individuais ao entrar na viewport.
 * Deslocamento reduzido de 30px → 20px para evitar jank em mobile.
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/**
 * Slide in da esquerda para a direita.
 * Uso principal: entrada de colunas esquerda em layouts side-by-side.
 * Deslocamento reduzido de 60px → 40px para evitar overflow horizontal em mobile.
 */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/**
 * Slide in da direita para a esquerda.
 * Uso principal: entrada de colunas direita em layouts side-by-side.
 * Deslocamento reduzido de 60px → 40px para evitar overflow horizontal em mobile.
 */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/**
 * Container com efeito stagger nos filhos.
 * Deve ser usado no elemento pai, e cada filho deve usar fadeInUp.
 *
 * @example
 * ```tsx
 * <motion.div variants={staggerContainer} initial="hidden" whileInView="visible">
 *   <motion.div variants={fadeInUp}>Item 1</motion.div>
 *   <motion.div variants={fadeInUp}>Item 2</motion.div>
 * </motion.div>
 * ```
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Scale in com efeito de "pop" — entrada com escala de 0.85 para 1.
 * Uso principal: cards, badges e elementos que devem "surgir".
 * Escala ajustada de 0.8 → 0.85 para transição mais sutil em mobile.
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE },
  },
};

/**
 * Revelação de texto do hero — clipPath anima de cima para baixo.
 * Uso principal: títulos e textos do HeroSection.
 * Deslocamento reduzido de 40px → 30px para mobile.
 */
export const heroTextReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    clipPath: "inset(100% 0 0 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.8, ease: EASE },
  },
};
