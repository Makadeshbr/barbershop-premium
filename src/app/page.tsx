import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { Footer } from "@/components/layout/Footer";

/**
 * Seções abaixo do fold carregadas via dynamic import.
 * Reduz o bundle JavaScript inicial em ~40-60KB, acelerando
 * o First Contentful Paint e Time to Interactive.
 *
 * As seções acima do fold (Hero, About, Services) permanecem
 * como imports estáticos para renderização imediata.
 */
const HairBeardSection = dynamic(
  () =>
    import("@/components/sections/HairBeardSection").then(
      (mod) => mod.HairBeardSection
    ),
  { ssr: true }
);

const PricingSection = dynamic(
  () =>
    import("@/components/sections/PricingSection").then(
      (mod) => mod.PricingSection
    ),
  { ssr: true }
);

const TeamSection = dynamic(
  () =>
    import("@/components/sections/TeamSection").then(
      (mod) => mod.TeamSection
    ),
  { ssr: true }
);

const NewsletterSection = dynamic(
  () =>
    import("@/components/sections/NewsletterSection").then(
      (mod) => mod.NewsletterSection
    ),
  { ssr: true }
);

const TestimonialsSection = dynamic(
  () =>
    import("@/components/sections/TestimonialsSection").then(
      (mod) => mod.TestimonialsSection
    ),
  { ssr: true }
);

const TipsSection = dynamic(
  () =>
    import("@/components/sections/TipsSection").then(
      (mod) => mod.TipsSection
    ),
  { ssr: true }
);

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Seções acima do fold — import estático para renderização imediata */}
        <HeroSection />
        <AboutSection />
        <ServicesSection />

        {/* Seções abaixo do fold — dynamic import para bundle splitting */}
        <HairBeardSection />
        <PricingSection />
        <TeamSection />
        <NewsletterSection />
        <TestimonialsSection />
        <TipsSection />
      </main>
      <Footer />
    </>
  );
}
