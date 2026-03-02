
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
      
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-left z-[200] shadow-glow"
        style={{ scaleX }}
      />

      <LandingHeader />
      
      <main className="relative flex-1 w-full transition-opacity duration-300">
        <div className="w-full">
            <section id="inicio">
              <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex items-center bg-transparent">
                <div className="container mx-auto px-6 relative z-10">
                  <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      className="space-y-12"
                    >
                      <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.8] text-foreground">
                        SYSTEM <br/> 
                        <span className="text-primary italic italic-shadow">KYRON</span>
                      </h1>
                      <p className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-snug font-bold border-l-4 border-primary/30 pl-8 opacity-80 uppercase tracking-tight">
                        Líneas <span className="text-secondary italic">5G Digitales</span>, <br/>
                        Conectividad <span className="text-primary tracking-tighter">eSIM</span> y Automatización.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
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
            
            <Footer />
        </div>
      </main>
    </div>
  );
}
