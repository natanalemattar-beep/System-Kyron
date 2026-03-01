'use client';

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-muted/50 border border-border/40 text-[9px] font-black uppercase tracking-[0.25em] text-primary shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Ecosistema de Gestión v2.6.0
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[1.1] text-balance"
          >
            La Arquitectura para la <br/> <span className="text-primary font-medium italic">Estrategia Empresarial</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium text-balance"
          >
            Automatización fiscal, contabilidad de precisión y cumplimiento normativo en una infraestructura de grado corporativo.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-10 pt-8"
          >
            <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" size="lg" className="h-14 px-10 text-[11px] uppercase tracking-[0.3em] rounded-2xl hover:bg-muted/50 transition-all font-black border-border/60 shadow-sm">
                    Explorar Tecnología
                </Button>
            </div>
            
            <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-3 opacity-30"
            >
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Protocolo de Inicio</span>
                <div className="h-10 w-px bg-gradient-to-b from-primary to-transparent" />
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 max-w-5xl mx-auto"
          >
            {[
                { icon: ShieldCheck, label: "Cero Riesgo" },
                { icon: Zap, label: "IA de Misión" },
                { icon: Globe, label: "Global Ready" },
                { icon: ShieldCheck, label: "Eficiencia" }
            ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-4 group">
                    <div className="p-4 bg-card border border-border/40 rounded-[1.5rem] group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-500 shadow-sm">
                        <item.icon className="h-6 w-6 text-primary/60 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 group-hover:text-primary transition-colors">{item.label}</span>
                </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
