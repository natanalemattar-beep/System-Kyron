
'use client';

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-background">
      {/* Background patterns */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Ecosistema de Gestión v2.6
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15]"
          >
            Sistemas para la <span className="text-primary italic">Estrategia Empresarial</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed font-medium"
          >
            Automatización fiscal, contabilidad avanzada y cumplimiento normativo en una plataforma única diseñada para la claridad y el crecimiento.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-6 pt-4"
          >
            <Button variant="outline" size="lg" className="h-12 px-8 text-xs uppercase tracking-widest rounded-xl hover:bg-muted transition-all font-bold border-border/60">
              Descubrir tecnología
            </Button>
            
            <motion.div 
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center gap-2 opacity-40"
            >
                <span className="text-[9px] font-black uppercase tracking-[0.3em]">Explorar</span>
                <MousePointer2 className="h-4 w-4" />
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-12"
          >
            <div className="flex flex-col items-center gap-3 group">
              <div className="p-3 bg-primary/5 rounded-2xl group-hover:bg-primary/10 transition-colors border border-primary/10">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Cero Riesgo</span>
            </div>
            <div className="flex flex-col items-center gap-3 group">
              <div className="p-3 bg-primary/5 rounded-2xl group-hover:bg-primary/10 transition-colors border border-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">IA Aplicada</span>
            </div>
            <div className="flex flex-col items-center gap-3 group">
              <div className="p-3 bg-primary/5 rounded-2xl group-hover:bg-primary/10 transition-colors border border-primary/10">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Global Ready</span>
            </div>
            <div className="flex flex-col items-center gap-3 group">
              <div className="p-3 bg-primary/5 rounded-2xl group-hover:bg-primary/10 transition-colors border border-primary/10">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Eficiencia</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
