
'use client';

import { motion } from "framer-motion";
import { ArrowDown, ShieldCheck, Zap, Smartphone, Magnet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background min-h-screen flex items-center">
      {/* Background Large Logo - Centered and Scale-Limited */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[600px] aspect-square opacity-[0.03] pointer-events-none -z-10">
          <Logo className="w-full h-full" />
      </div>

      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/5 border border-primary/10 text-[9px] font-black uppercase tracking-[0.4em] text-primary mx-auto shadow-inner"
          >
            <ShieldCheck className="h-4 w-4" />
            Infraestructura de Misión Crítica
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1] text-foreground"
          >
            Ecosistema Global <br/> 
            <span className="text-primary italic italic-shadow">System Kyron</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Líderes en automatización fiscal, comercialización de **papeleras inteligentes con tecnología de magnetismo**, venta de smartphones de alta gama y asignación inmediata de números telefónicos.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center gap-16 pt-8"
          >
            <div className="flex flex-wrap justify-center gap-6">
                <Button variant="outline" size="lg" className="h-14 px-12 text-[10px] uppercase tracking-[0.2em] rounded-2xl border-primary/20 hover:bg-primary/5 hover:text-primary transition-all font-black shadow-sm">
                    EXPLORAR TIENDA
                </Button>
                <Button size="lg" className="btn-3d-primary h-14 px-12 text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-2xl">
                    ADQUIRIR LÍNEA
                </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-12 opacity-40">
                <div className="flex flex-col items-center gap-2">
                    <Magnet className="h-6 w-6 text-primary" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Magnetismo</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Smartphone className="h-6 w-6 text-primary" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Tecnología</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Zap className="h-6 w-6 text-primary" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Velocidad</span>
                </div>
            </div>

            <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-3 opacity-30"
            >
                <span className="text-[8px] font-black uppercase tracking-[0.5em]">Scroll para Inmersión</span>
                <ArrowDown className="h-5 w-5 text-primary" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
