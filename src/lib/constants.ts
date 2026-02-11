// ============================================================
// DADOS DO CLIENTE — Altere os valores abaixo antes de publicar
// ============================================================

export const SITE_NAME = "Império Barbearia";
export const SITE_DOMAIN = "imperiobarbearia.com"; // [PREENCHA] domínio real

export const CONTACT = {
  phone: "(14) 99999-9999", // [PREENCHA] telefone real
  phoneRaw: "+5514999999999", // [PREENCHA] telefone sem formatação
  email: "contato@imperiobarbearia.com", // [PREENCHA] email real
  address: "Avaré, São Paulo", // [PREENCHA] endereço completo
} as const;

export const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Nosso Espaço", href: "#espaco" },
  { label: "Blog", href: "#blog" },
  { label: "Contato", href: "#contato" },
] as const;

export const SERVICES = [
  {
    id: "corte",
    title: "Corte de Cabelo",
    description: "Cortes modernos e clássicos com acabamento impecável para todos os estilos.",
    icon: "/images/icons/tesoura_icon.png",
    price: 45,
  },
  {
    id: "barba",
    title: "Barba Completa",
    description: "Modelagem e aparação com navalha, toalha quente e produtos premium.",
    icon: "/images/icons/navalha_icon.png",
    price: 35,
  },
  {
    id: "barboterapia",
    title: "Barboterapia",
    description: "Tratamento completo com espuma, toalha quente e hidratação profunda.",
    icon: "/images/icons/barba_espuma.png",
    price: 55,
  },
  {
    id: "combo",
    title: "Combo Completo",
    description: "Corte + Barba com desconto especial. O pacote mais procurado.",
    icon: "/images/icons/cadeira_icon.png",
    price: 70,
  },
] as const;

export const BUSINESS_HOURS = [
  { day: "Segunda", hours: "09:00 - 19:00" },
  { day: "Terça", hours: "09:00 - 19:00" },
  { day: "Quarta", hours: "09:00 - 19:00" },
  { day: "Quinta", hours: "09:00 - 19:00" },
  { day: "Sexta", hours: "09:00 - 20:00" },
  { day: "Sábado", hours: "08:00 - 18:00" },
  { day: "Domingo", hours: "Fechado" },
] as const;

export const PRICING_MENU = [
  { service: "Corte Masculino", price: 45 },
  { service: "Corte Infantil", price: 35 },
  { service: "Barba Completa", price: 35 },
  { service: "Barboterapia", price: 55 },
  { service: "Combo Corte + Barba", price: 70 },
  { service: "Hidratação Capilar", price: 40 },
  { service: "Pigmentação", price: 50 },
  { service: "Sobrancelha", price: 15 },
  { service: "Acabamento Navalha", price: 20 },
] as const;

export const TEAM_MEMBERS = [
  {
    name: "Carlos Silva", // [PREENCHA] nome real
    role: "Barbeiro Chefe",
    image: "/images/logos/bear-3d-crossed.png", // [PREENCHA] foto real
  },
  {
    name: "Rafael Santos", // [PREENCHA] nome real
    role: "Barbeiro Sênior",
    image: "/images/logos/bear-3d-scissors.png", // [PREENCHA] foto real
  },
  {
    name: "Lucas Oliveira", // [PREENCHA] nome real
    role: "Barbeiro",
    image: "/images/logos/bear-3d-leaning.png", // [PREENCHA] foto real
  },
] as const;

export const TESTIMONIALS = [
  {
    id: "1",
    name: "João Pedro", // [PREENCHA] cliente real
    text: "Melhor barbearia de Avaré! Atendimento impecável e o corte ficou perfeito. Recomendo demais!",
    rating: 5,
  },
  {
    id: "2",
    name: "Marcos Vinícius", // [PREENCHA] cliente real
    text: "Ambiente muito agradável e profissionais de primeira. A barboterapia é uma experiência incrível.",
    rating: 5,
  },
  {
    id: "3",
    name: "Felipe Augusto", // [PREENCHA] cliente real
    text: "Frequento há 2 anos e nunca me decepcionei. Sempre saio satisfeito com o resultado.",
    rating: 5,
  },
  {
    id: "4",
    name: "Ricardo Mendes", // [PREENCHA] cliente real
    text: "O combo corte + barba é sensacional. Preço justo e qualidade premium. Virei cliente fiel!",
    rating: 5,
  },
] as const;

export const TIPS = [
  {
    id: "1",
    slug: "manter-corte-perfeito",
    title: "Como manter o corte perfeito por mais tempo",
    excerpt: "Dicas essenciais para preservar seu corte entre as visitas à barbearia.",
    image: "/images/icons/tesoura_icon.png",
    category: "Cabelo",
  },
  {
    id: "2",
    slug: "cuidados-diarios-barba",
    title: "Cuidados diários com a barba",
    excerpt: "Os melhores produtos e técnicas para uma barba sempre impecável.",
    image: "/images/icons/navalha_icon.png",
    category: "Barba",
  },
  {
    id: "3",
    slug: "importancia-barboterapia",
    title: "A importância da barboterapia",
    excerpt: "Descubra por que esse tratamento é essencial para a saúde da sua pele.",
    image: "/images/icons/barba_espuma.png",
    category: "Tratamento",
  },
] as const;

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/imperiobarbearia", // [PREENCHA] link real
  facebook: "https://facebook.com/imperiobarbearia", // [PREENCHA] link real
  whatsapp: "https://wa.me/5514999999999", // [PREENCHA] número real
} as const;

export const WHATSAPP_LINK = "https://wa.me/5514999999999?text=Olá! Gostaria de agendar um horário na Império Barbearia."; // [PREENCHA] número real

export const INTRO_FRAME_COUNT = 60;
export const INTRO_FRAME_START = 2;
export const INTRO_FRAME_END = 61;
