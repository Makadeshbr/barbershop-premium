import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { HairBeardSection } from "@/components/sections/HairBeardSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TipsSection } from "@/components/sections/TipsSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
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
