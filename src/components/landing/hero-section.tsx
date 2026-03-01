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
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#0A2472 1px, transparent 1px), linear-gradient(90deg, #0A2472 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 relative"
          >
            <div className="absolute inset-0 bg-primary/10 blur-[60px] rounded-full scale-150 animate-pulse" />
            <Logo className="h-40 w-40 md:h-56 md:w-56 relative z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[#0A2472] dark:text-[#4CAF50] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                <Sparkles className="h-3.5 w-3.5" /> Ecosistema de Gestión 2026
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter text-balance leading-[0.9] mb-10">
              Sistemas que <span className="font-black italic text-[#0A2472] dark:text-white relative">
                definen
                <span className="absolute bottom-4 left-0 w-full h-2 bg-[#4CAF50]/30 -z-10 rounded-full" />
              </span> el futuro.
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed opacity-80 mb-12">
              Automatización fiscal, telecomunicaciones críticas y finanzas blockchain en una arquitectura única y blindada por IA.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <Button asChild size="lg" className="h-16 px-12 rounded-[2rem] text-sm font-black shadow-2xl btn-3d-primary group min-w-[280px]">
                    <Link href="/login" className="flex items-center justify-center gap-3">
                        ENTRAR AL ECOSISTEMA <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-16 px-12 rounded-[2rem] text-sm font-black border-2 border-primary/10 hover:bg-primary/5 backdrop-blur-sm min-w-[280px] transition-all">
                    DESCUBRIR TECNOLOGÍA
                </Button>
            </div>

            <div className="pt-16 flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-60">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                    <CheckCircle2 className="h-4 w-4 text-[#4CAF50]" /> Cero Riesgo Fiscal
                </div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                    <CheckCircle2 className="h-4 w-4 text-[#4CAF50]" /> Verificación Blockchain
                </div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                    <CheckCircle2 className="h-4 w-4 text-[#4CAF50]" /> IA Predictiva 24/7
                </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20 cursor-pointer"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[9px] font-black uppercase tracking-[0.5em]">Explorar</span>
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}