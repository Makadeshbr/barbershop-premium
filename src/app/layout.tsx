import type { Metadata } from "next";
import { playfair, inter, cormorant } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { DemoBanner } from "@/components/layout/DemoBanner";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://imperiobarbearia.com"), // [PREENCHA] domínio real
  title: {
    default: "Império Barbearia | Avaré, SP - Domine. Transforme. Impressione.",
    template: "%s | Império Barbearia",
  },
  description:
    "A melhor barbearia de Avaré, SP. 15 anos de experiência em cortes masculinos, barba, barboterapia e mais. Agende seu horário!",
  keywords: [
    "barbearia",
    "barbearia avaré",
    "corte masculino",
    "barba",
    "barboterapia",
    "império barbearia",
    "barbearia perto de mim",
    "corte de cabelo masculino avaré",
  ],
  authors: [{ name: "Império Barbearia" }],
  creator: "Império Barbearia",
  openGraph: {
    title: "Império Barbearia | Avaré, SP",
    description: "Domine. Transforme. Impressione. A melhor barbearia de Avaré.",
    locale: "pt_BR",
    type: "website",
    siteName: "Império Barbearia",
    url: "https://imperiobarbearia.com",
    images: [
      {
        url: "/images/icons/logo_oficial_icon.png",
        width: 512,
        height: 512,
        alt: "Império Barbearia Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Império Barbearia | Avaré, SP",
    description: "Domine. Transforme. Impressione.",
    images: ["/images/icons/logo_oficial_icon.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/icons/logo_oficial_icon.png",
    apple: "/images/icons/logo_oficial_icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}
    >
      <body className="antialiased">
        <SmoothScrollProvider>
          {children}
          <DemoBanner />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
