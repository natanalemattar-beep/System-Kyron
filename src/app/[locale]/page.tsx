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
import { motion, useScroll, useSpring } from "framer-motion";

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen selection:bg-primary selection:text-white">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#4CAF50] origin-left z-[60]"
        style={{ scaleX }}
      />

      <LandingHeader />
      
      <main className="relative">
        <HeroSection />
        
        <div className="relative z-10 space-y-0">
          <ServicesSection />
          <FeaturesSection />
          <AboutUsSection />
          <FaqSection />
          <CtaSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}