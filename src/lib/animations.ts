/**
 * Variantes de animação centralizadas para Framer Motion.
 *
 * Todas as animações usam o padrão hidden → visible para integração
 * com whileInView e viewport={{ once: true }} nos componentes.
 *
 * @module animations
 */

import { type Variants } from "framer-motion";

/**
 * Fade in com deslocamento vertical de baixo para cima.
 * Uso principal: entrada de elementos individuais ao entrar na viewport.
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Slide in da esquerda para a direita.
 * Uso principal: entrada de colunas esquerda em layouts side-by-side.
 */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Slide in da direita para a esquerda.
 * Uso principal: entrada de colunas direita em layouts side-by-side.
 */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
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
 * Scale in com efeito de "pop" — entrada com escala de 0.8 para 1.
 * Uso principal: cards, badges e elementos que devem "surgir".
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Revelação de texto do hero — clipPath anima de cima para baixo.
 * Uso principal: títulos e textos do HeroSection.
 */
export const heroTextReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    clipPath: "inset(100% 0 0 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};
