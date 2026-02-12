/**
 * Interfaces de tipo para os dados do site.
 *
 * Estas interfaces definem os contratos de dados usados pelas constantes
 * em constants.ts e consumidos pelos componentes de seção.
 *
 * @module types
 */

/** Link de navegação usado no Header e MobileMenu */
export interface NavLink {
  /** Texto exibido no link */
  label: string;
  /** Âncora de destino (ex: "#sobre") */
  href: string;
}

/** Serviço oferecido pela barbearia, exibido no ServicesSection */
export interface Service {
  /** Identificador único do serviço */
  id: string;
  /** Nome do serviço */
  title: string;
  /** Descrição breve do serviço */
  description: string;
  /** Caminho para o ícone do serviço */
  icon: string;
  /** Preço em reais (BRL) */
  price: number;
}

/** Horário de funcionamento para um dia da semana */
export interface BusinessHour {
  /** Nome do dia (ex: "Segunda", "Domingo") */
  day: string;
  /** Horário no formato "HH:mm - HH:mm" ou "Fechado" */
  hours: string;
}

/** Item da tabela de preços */
export interface PriceItem {
  /** Nome do serviço na tabela */
  service: string;
  /** Preço em reais (BRL) */
  price: number;
}

/** Membro da equipe exibido no TeamSection */
export interface TeamMember {
  /** Nome do profissional */
  name: string;
  /** Cargo/função na barbearia */
  role: string;
  /** Caminho para a foto do profissional */
  image: string;
}

/** Depoimento de cliente exibido no TestimonialsSection */
export interface Testimonial {
  /** Identificador único */
  id: string;
  /** Nome do cliente */
  name: string;
  /** Texto do depoimento */
  text: string;
  /** Avaliação de 1 a 5 estrelas */
  rating: number;
}

/** Dica/artigo do blog exibido no TipsSection */
export interface BlogTip {
  /** Identificador único */
  id: string;
  /** Slug URL-safe para link ao post completo */
  slug: string;
  /** Título do artigo */
  title: string;
  /** Resumo curto para exibição no card */
  excerpt: string;
  /** Caminho para a imagem/ícone do artigo */
  image: string;
  /** Categoria do artigo (ex: "Cabelo", "Barba") */
  category: string;
}

/** Links de redes sociais da barbearia */
export interface SocialLinks {
  /** URL do perfil do Instagram */
  instagram: string;
  /** URL do perfil do Facebook */
  facebook: string;
  /** URL do WhatsApp (wa.me) */
  whatsapp: string;
}

/** Informações de contato da barbearia */
export interface ContactInfo {
  /** Telefone formatado (ex: "(14) 99999-9999") */
  phone: string;
  /** Telefone sem formatação para uso em links tel: */
  phoneRaw: string;
  /** Email de contato */
  email: string;
  /** Endereço da barbearia */
  address: string;
}
