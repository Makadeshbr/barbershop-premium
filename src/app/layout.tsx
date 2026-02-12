import type { Metadata } from "next";
import { playfair, inter, cormorant } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { SITE_NAME, SITE_DOMAIN, CONTACT, SOCIAL_LINKS, BUSINESS_HOURS } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE_DOMAIN}`),
  title: {
    default: `${SITE_NAME} | Avaré, SP - Domine. Transforme. Impressione.`,
    template: `%s | ${SITE_NAME}`,
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
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    title: `${SITE_NAME} | Avaré, SP`,
    description: "Domine. Transforme. Impressione. A melhor barbearia de Avaré.",
    locale: "pt_BR",
    type: "website",
    siteName: SITE_NAME,
    url: `https://${SITE_DOMAIN}`,
    images: [
      {
        url: "/images/icons/logo_oficial_icon.png",
        width: 512,
        height: 512,
        alt: `${SITE_NAME} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Avaré, SP`,
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

/**
 * JSON-LD LocalBusiness schema para SEO local.
 * Permite que o Google exiba informações estruturadas no Knowledge Panel,
 * Google Maps e resultados de busca local.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarberShop",
  name: SITE_NAME,
  image: `https://${SITE_DOMAIN}/images/icons/logo_oficial_icon.png`,
  url: `https://${SITE_DOMAIN}`,
  telephone: CONTACT.phone,
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Avaré",
    addressRegion: "SP",
    addressCountry: "BR",
    streetAddress: CONTACT.address,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -23.1,
    longitude: -48.92,
  },
  openingHoursSpecification: BUSINESS_HOURS.filter((h) => h.hours !== "Fechado").map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.day,
    opens: h.hours.split(" - ")[0],
    closes: h.hours.split(" - ")[1],
  })),
  sameAs: [
    SOCIAL_LINKS.instagram,
    SOCIAL_LINKS.facebook,
    SOCIAL_LINKS.whatsapp,
  ],
  priceRange: "$$",
  description:
    "A melhor barbearia de Avaré, SP. 15 anos de experiência em cortes masculinos, barba, barboterapia e mais.",
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
        {/* Ação 5: JSON-LD para SEO local */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScrollProvider>
          {children}
          <DemoBanner />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
