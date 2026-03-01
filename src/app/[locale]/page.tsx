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
    <div className="relative min-h-screen bg-background">
      <DynamicBackground />
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[110]"
        style={{ scaleX }}
      />

      <LandingHeader />
      
      <main>
        <section id="inicio">
          <HeroSection />
        </section>
        
        <section id="servicios">
          <ServicesSection />
        </section>
        
        <section id="tecnologia">
          <FeaturesSection />
        </section>
        
        <section id="nosotros">
          <AboutUsSection />
        </section>
        
        <section id="faq">
          <FaqSection />
        </section>
        
        <section id="contacto">
          <CtaSection />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
