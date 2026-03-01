'use client';

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";

export function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-background">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[150px] pointer-events-none opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[150px] pointer-events-none opacity-50" />
      
      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#0A2472 1px, transparent 1px), linear-gradient(90deg, #0A2472 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-150 animate-pulse" />
            <Logo className="h-48 w-48 md:h-64 md:w-64 relative z-10 drop-shadow-[0_0_30px_rgba(10,36,114,0.3)]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-4 backdrop-blur-xl shadow-2xl">
                <Sparkles className="h-3.5 w-3.5 text-[#4CAF50]" /> SISTEMA INTEGRAL 2026
            </div>

            <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-light tracking-tighter text-balance leading-[0.85] mb-10">
              Sistemas que <span className="font-black italic text-white relative">
                definen
                <span className="absolute bottom-4 left-0 w-full h-3 bg-[#4CAF50]/40 -z-10 rounded-full blur-[2px]" />
              </span> el futuro.
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed opacity-80 mb-12 text-balance">
              Automatización fiscal, telecomunicaciones de misión crítica y finanzas blockchain en una arquitectura de tercera generación blindada por IA.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <Button asChild size="lg" className="h-16 px-14 rounded-[2rem] text-sm font-black shadow-2xl btn-3d-primary group min-w-[300px]">
                    <Link href="/login" className="flex items-center justify-center gap-3">
                        ENTRAR AL ECOSISTEMA <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-16 px-14 rounded-[2rem] text-sm font-black border-2 border-white/10 hover:bg-white/5 backdrop-blur-xl min-w-[300px] transition-all shadow-2xl">
                    DESCUBRIR TECNOLOGÍA
                </Button>
            </div>

            <div className="pt-20 flex flex-wrap justify-center gap-x-16 gap-y-8 opacity-60">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-glow-green">
                    <CheckCircle2 className="h-4 w-4 text-[#4CAF50]" /> CERO RIESGO FISCAL
                </div>
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-glow-green">
                    <CheckCircle2 className="h-4 w-4 text-[#4CAF50]" /> SELLADO BLOCKCHAIN
                </div>
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-glow-green">
                    <CheckCircle2 className="h-4 w-4 text-[#4CAF50]" /> IA PREDICTIVA 24/7
                </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30 cursor-pointer group"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] font-black uppercase tracking-[0.6em] group-hover:text-primary transition-colors">Explorar</span>
        <ChevronDown className="h-6 w-6 group-hover:text-primary transition-colors" />
      </motion.div>
    </section>
  );
}