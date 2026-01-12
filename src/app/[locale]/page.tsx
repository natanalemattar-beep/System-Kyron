
'use client';

import {
  HeroSection,
  ServicesSection,
  FeaturesSection,
  AboutUsSection,
  FaqSection,
  CtaSection,
  Footer
} from "@/components/landing";
import { LandingHeader } from "@/components/landing/landing-header";
import { useTranslations } from "next-intl";

export default function LandingPage() {
  const t = useTranslations('LandingHeader');

  return (
    <>
      <LandingHeader />
      <main className="pt-16">
        <HeroSection />
        <ServicesSection />
        <FeaturesSection />
        <AboutUsSection />
        <FaqSection />
        <CtaSection />
        <Footer />
      </main>
    </>
  );
}
