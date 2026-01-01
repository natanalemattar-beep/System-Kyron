
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
  // This hook is now correctly used in a client component.
  const t = useTranslations('LandingHeader');

  return (
    <>
      <LandingHeader />
      <main>
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
