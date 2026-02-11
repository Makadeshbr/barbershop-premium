import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function getFramePath(frameNumber: number): string {
  const padded = String(frameNumber).padStart(3, "0");
  return `/images/intro-sequence/frame-${padded}.gif`;
}
