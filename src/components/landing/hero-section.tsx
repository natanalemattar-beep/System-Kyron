
'use client';

import { motion } from "framer-motion";
import { ArrowDown, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[9px] font-black uppercase tracking-[0.3em] text-primary mx-auto"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Infraestructura de Misión Crítica
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] text-foreground"
          >
            Gestión Inteligente <br/> 
            <span className="text-primary italic text-shadow-glow">para la Élite Empresarial</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Automatización fiscal, comercialización de tecnología magnética y finanzas blockchain bajo el ecosistema System Kyron.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center gap-12 pt-6"
          >
            <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" size="lg" className="h-12 px-10 text-[10px] uppercase tracking-[0.2em] rounded-xl border-primary/20 hover:bg-primary/5 hover:text-primary transition-all font-black">
                    EXPLORAR ECOSISTEMA
                </Button>
                <Button size="lg" className="btn-3d-primary h-12 px-10 text-[10px] uppercase tracking-[0.2em] rounded-xl shadow-xl">
                    AGENDAR CONSULTORÍA
                </Button>
            </div>
            
            <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-3 opacity-30 mt-8"
            >
                <span className="text-[8px] font-black uppercase tracking-[0.4em]">Descubre el Ecosistema</span>
                <ArrowDown className="h-4 w-4 text-primary" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
