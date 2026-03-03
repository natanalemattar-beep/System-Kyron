
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
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Radio } from "lucide-react";
import { Link } from "@/navigation";

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 40,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-[#020202] flex flex-col overflow-x-hidden hud-grid selection:bg-primary/30 w-full">
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
                <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
                  <div className="grid lg:grid-cols-2 gap-20 items-center w-full">
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      className="space-y-12"
                    >
                      <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.4em] border border-primary/20 shadow-glow">
                        <Sparkles className="h-3 w-3" /> Ecosistema de Misión Crítica
                      </div>
                      <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter leading-[0.8] text-foreground uppercase italic italic-shadow">
                        SYSTEM <br/> 
                        <span className="text-primary">KYRON</span>
                      </h1>
                      <p className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-snug font-bold border-l-4 border-primary/30 pl-8 opacity-80 uppercase tracking-tight">
                        Líneas <span className="text-secondary italic">5G Digitales</span>, <br/>
                        Conectividad <span className="text-primary tracking-tighter">eSIM</span> y Automatización.
                      </p>
                      <div className="flex flex-wrap gap-6">
                        <Button asChild size="lg" className="btn-3d-primary h-16 px-12 text-xs font-black uppercase tracking-widest rounded-2xl group shadow-2xl">
                            <Link href="/login">DESPLEGAR SISTEMA <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" /></Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-16 px-10 text-xs font-black uppercase tracking-widest rounded-2xl border-white/10 hover:bg-white/5 shadow-xl bg-white/[0.02] backdrop-blur-xl transition-all">
                            <Link href="/estudio-poblacion">MODELO DE ZEDU</Link>
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
            
            <section id="servicios" className="w-full">
              <ServicesSection />
            </section>
            
            <section id="tecnologia" className="w-full">
              <FeaturesSection />
            </section>
            
            <section id="nosotros" className="w-full">
              <AboutUsSection />
            </section>
            
            <section id="faq" className="w-full">
              <FaqSection />
            </section>
            
            <section id="contacto" className="w-full">
              <CtaSection />
            </section>
            
            <Footer />
        </div>
      </main>
    </div>
  );
}
