'use client';

import {
  ServicesSection,
  FeaturesSection,
  AboutUsSection,
  FaqSection,
  CtaSection,
  Footer,
  HeroSection
} from "@/components/landing";
import { LandingHeader } from "@/components/landing/landing-header";
import { motion, useScroll, useSpring } from "framer-motion";
import { WelcomeTutorial } from "@/components/welcome-tutorial";

/**
 * @fileOverview Página de Inicio Consolidada v2.6.5.
 * Implementa el flujo completo de conversión y el Hero de Alta Fidelidad.
 */

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 40, restDelta: 0.001 });

  return (
    <div className="relative min-h-screen bg-transparent flex flex-col overflow-x-hidden hud-grid selection:bg-primary/20 w-full">
      <WelcomeTutorial />
      
      {/* Progress Bar HUD */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[1px] bg-primary/40 shadow-glow origin-left z-[200]" 
        style={{ scaleX }} 
      />
      
      <LandingHeader />
      
      <main className="relative flex-1 w-full">
        {/* HERO SECTION COMPONENTE MAESTRO */}
        <HeroSection />
        
        <div className="container mx-auto px-6 max-w-7xl space-y-32 md:space-y-48 pb-24">
            <ServicesSection />
            <FeaturesSection />
            <AboutUsSection />
            <FaqSection />
            <CtaSection />
            <Footer />
        </div>
      </main>
    </div>
  );
}
