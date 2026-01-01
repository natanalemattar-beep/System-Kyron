
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
import { useHoliday } from "@/hooks/use-holiday";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const { isHolidayActive } = useHoliday();
  
  return (
    <div className={cn(isHolidayActive && "bg-background/80 backdrop-blur-lg")}>
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
    </div>
  );
}
