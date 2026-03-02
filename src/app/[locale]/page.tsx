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
    damping: 40,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-[#020202] flex flex-col overflow-x-hidden hud-grid selection:bg-primary/30">
      <DynamicBackground />
      <WelcomeTutorial />
      
      {/* HUD Scroll Progress */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-left z-[200] shadow-glow"
        style={{ scaleX }}
      />

      <LandingHeader />
      
      <main className="relative flex-1 w-full transition-opacity duration-300">
        <div className="w-full">
            <section id="inicio">
              <HeroSection />
            </section>
            
            <section id="servicios" className="relative z-10 border-y border-white/5 bg-black/40 backdrop-blur-3xl">
              <ServicesSection />
            </section>
            
            <section id="tecnologia" className="bg-[#050505] relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 blur-[150px] -z-10" />
              <FeaturesSection />
            </section>
            
            <section id="nosotros">
              <AboutUsSection />
            </section>
            
            <section id="faq" className="bg-[#020202] border-t border-white/5">
              <FaqSection />
            </section>
            
            <section id="contacto" className="bg-black/60 backdrop-blur-3xl border-t border-white/5">
              <CtaSection />
            </section>
            
            <Footer />
        </div>
      </main>
    </div>
  );
}