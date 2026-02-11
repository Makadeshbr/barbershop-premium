export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: number;
}

export interface BusinessHour {
  day: string;
  hours: string;
}

export interface PriceItem {
  service: string;
  price: number;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}

export interface BlogTip {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
}
