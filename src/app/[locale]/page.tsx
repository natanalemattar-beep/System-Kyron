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
import { DynamicBackground } from "@/components/ui/dynamic-background";

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen selection:bg-primary selection:text-white bg-background">
      <DynamicBackground />
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0A2472] to-[#4CAF50] origin-left z-[60] shadow-[0_0_15px_rgba(76,175,80,0.5)]"
        style={{ scaleX }}
      />

      <LandingHeader />
      
      <main className="relative">
        <HeroSection />
        
        <div className="relative z-10">
          <ServicesSection />
          <FeaturesSection />
          <div className="bg-gradient-to-b from-transparent via-primary/5 to-transparent">
            <AboutUsSection />
          </div>
          <FaqSection />
          <CtaSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}