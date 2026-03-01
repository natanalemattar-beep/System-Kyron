
'use client';

import { motion } from "framer-motion";
import { ArrowRight, Zap, Smartphone, Magnet, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex items-center bg-transparent">
      {/* Background Large Logo - Marca de agua tecnológica controlada */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[600px] aspect-square opacity-[0.03] pointer-events-none -z-10">
          <motion.div
            animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.02, 0.04, 0.02]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <Logo className="w-full h-full" />
          </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.3em] text-primary shadow-lg backdrop-blur-sm">
              <Zap className="h-4 w-4 text-yellow-500 animate-pulse" />
              Ecosistema de Misión Crítica v2.0
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-foreground">
              Tu Empresa <br/> 
              <span className="text-primary italic drop-shadow-sm">Sin Límites</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed font-medium">
              Automatización fiscal, <span className="text-secondary font-bold">tecnología magnética</span> para residuos y la red de <span className="text-primary font-bold">telefonía Kyron Pro</span>. Todo en una plataforma vibrante.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="btn-3d-primary h-14 px-8 text-xs font-black uppercase tracking-widest rounded-2xl group">
                    COMENZAR AHORA <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-8 text-xs font-black uppercase tracking-widest rounded-2xl border-primary/20 hover:bg-primary/5 shadow-md bg-background/50 backdrop-blur-sm">
                    EXPLORAR SERVICIOS
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-primary/10 max-w-md">
                <div className="flex flex-col items-center lg:items-start gap-1">
                    <span className="text-primary font-black text-lg">100%</span>
                    <span className="text-[8px] font-black uppercase tracking-widest opacity-60">Legal Compliance</span>
                </div>
                <div className="flex flex-col items-center lg:items-start gap-1">
                    <span className="text-secondary font-black text-lg">3D</span>
                    <span className="text-[8px] font-black uppercase tracking-widest opacity-60">Magnet Tech</span>
                </div>
                <div className="flex flex-col items-center lg:items-start gap-1">
                    <span className="text-primary font-black text-lg">PRO X</span>
                    <span className="text-[8px] font-black uppercase tracking-widest opacity-60">Kyron Mobile</span>
                </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Visual Showcase de Productos con Vida */}
            <div className="grid grid-cols-2 gap-6 p-4">
                <div className={cn(
                    "p-8 bg-card/60 backdrop-blur-xl border-primary/10 rounded-[2.5rem] shadow-2xl hover:scale-105 transition-all group overflow-hidden border"
                )}>
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                    <div className="p-4 bg-primary/10 rounded-2xl w-fit mb-6 relative z-10">
                        <Smartphone className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="font-black text-base uppercase italic mb-2 relative z-10">Kyron Pro X</h3>
                    <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest relative z-10 leading-tight">Venta de Dispositivos de Alta Gama</p>
                </div>
                
                <div className={cn(
                    "p-8 bg-card/60 backdrop-blur-xl border-secondary/10 rounded-[2.5rem] shadow-2xl hover:scale-105 transition-all mt-12 group overflow-hidden border"
                )}>
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                    <div className="p-4 bg-secondary/10 rounded-2xl w-fit mb-6 relative z-10">
                        <Magnet className="h-10 w-10 text-secondary" />
                    </div>
                    <h3 className="font-black text-base uppercase italic mb-2 relative z-10">Smart Bins</h3>
                    <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest relative z-10 leading-tight">Tecnología de Magnetismo Inteligente</p>
                </div>
                
                <div className={cn(
                    "p-8 bg-card/60 backdrop-blur-xl border-primary/10 rounded-[2.5rem] shadow-2xl hover:scale-105 transition-all -mt-6 group overflow-hidden border"
                )}>
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                    <div className="p-4 bg-primary/10 rounded-2xl w-fit mb-6 relative z-10">
                        <Phone className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="font-black text-base uppercase italic mb-2 relative z-10">Línea Kyron</h3>
                    <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest relative z-10 leading-tight">Asignación Inmediata de Números</p>
                </div>
                
                <div className="p-8 bg-primary text-white rounded-[2.5rem] shadow-2xl hover:scale-105 transition-all mt-6 group overflow-hidden border-none relative">
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="p-4 bg-white/10 rounded-2xl w-fit mb-6 relative z-10">
                        <Globe className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-black text-base uppercase italic mb-2 relative z-10">Ecosistema</h3>
                    <p className="text-[9px] text-white/70 font-bold uppercase tracking-widest relative z-10 leading-tight">Finanzas y Gestión Blockchain</p>
                </div>
            </div>
            
            {/* Ambient Glow */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
