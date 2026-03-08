
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
 * @fileOverview Página de Inicio Kyron - Rediseño Estético 2025.
 * Enfoque en limpieza, elegancia y solidez corporativa.
 * Se ha eliminado el fondo sólido para mostrar el DynamicBackground.
 */

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 40, restDelta: 0.001 });

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden selection:bg-primary/20 w-full bg-transparent">
      <WelcomeTutorial />
      
      {/* HUD Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary/60 shadow-glow origin-left z-[200]" 
        style={{ scaleX }} 
      />
      
      <LandingHeader />
      
      <main className="relative flex-1 w-full">
        <HeroSection />
        
        <div className="space-y-32 md:space-y-48 pb-32">
            <ServicesSection />
            
            <div className="container mx-auto px-6 max-w-7xl">
                <FeaturesSection />
            </div>

            <AboutUsSection />
            
            <div className="container mx-auto px-6 max-w-7xl">
                <FaqSection />
                <CtaSection />
            </div>
            
            <Footer />
        </div>
      </main>

      {/* Rejilla HUD Suavizada Global */}
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-[0.03] dark:opacity-[0.05] hud-grid" />
    </div>
  );
}
