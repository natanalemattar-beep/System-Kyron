
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
import { WelcomeTutorial } from "@/components/welcome-tutorial";

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 40, // Increased damping for smoother motion
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-background flex flex-col overflow-x-hidden">
      <DynamicBackground />
      <WelcomeTutorial />
      
      {/* Optimized Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-left z-[200] shadow-[0_0_10px_rgba(10,36,114,0.3)] gpu-accelerated"
        style={{ scaleX }}
      />

      <LandingHeader />
      
      <main className="relative flex-1 w-full transition-opacity duration-300">
        <div className="max-w-[1600px] mx-auto pb-20">
            <section id="inicio">
              <HeroSection />
            </section>
            
            <section id="servicios" className="relative z-10">
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
            
            <Footer />
        </div>
      </main>
    </div>
  );
}
