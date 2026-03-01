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

export default function LandingPage() {
  return (
    <div className="relative min-h-screen">
      <LandingHeader />
      <main>
        <HeroSection />
        <ServicesSection />
        <FeaturesSection />
        <AboutUsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}