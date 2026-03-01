'use client';

import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Magnet, Phone, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex items-center bg-transparent">
      
      {/* Background Animated Elements - "VIDA" */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Animated Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -80, 0],
            y: [0, 80, 0],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px]"
        />
        
        {/* Massive Background Logo - Controlled Scale */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square opacity-[0.03] flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, 0]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Logo className="w-full h-full" />
            </motion.div>
        </div>

        {/* Ambient Grid Particles */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 text-[10px] font-black uppercase tracking-[0.4em] text-primary shadow-2xl backdrop-blur-md border border-primary/20">
              <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse fill-yellow-400" />
              Ecosistema de Misión Crítica v2.6
            </div>

            <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-foreground">
                  KYRON <br/> 
                  <span className="text-primary italic italic-shadow relative">
                    SYSTEM
                    <motion.span 
                        className="absolute -right-10 -top-6 text-[10px] font-black not-italic text-secondary bg-secondary/10 px-3 py-1.5 rounded-xl border border-secondary/20 shadow-lg"
                        animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        ULTRA
                    </motion.span>
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-snug font-medium border-l-4 border-primary/20 pl-6">
                  Revolución en <span className="text-secondary font-black">Magnetismo de Residuos</span>, 
                  Telefonía <span className="text-primary font-black uppercase tracking-tighter">Pro X</span> y Blindaje Fiscal IA.
                </p>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
                <Button size="lg" className="btn-3d-primary h-16 px-10 text-xs font-black uppercase tracking-widest rounded-2xl group relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                        DESPLEGAR SISTEMA <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                    <motion.div className="absolute inset-0 bg-white/10" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.5 }} />
                </Button>
                <Button variant="outline" size="lg" className="h-16 px-10 text-xs font-black uppercase tracking-widest rounded-2xl border-primary/20 hover:bg-primary/5 shadow-2xl bg-background/40 backdrop-blur-md hover:scale-105 transition-all">
                    DOCUMENTACIÓN TÉCNICA
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-10 pt-10 border-t border-primary/10 max-w-lg">
                {[
                    { val: "100%", lab: "COMPLIANCE", color: "text-primary" },
                    { val: "3D", lab: "MAGNETIC", color: "text-secondary" },
                    { val: "AI", lab: "SHIELD", color: "text-primary" }
                ].map((stat, i) => (
                    <div key={i} className="flex flex-col gap-1 group cursor-default">
                        <span className={cn("font-black text-2xl tracking-tighter group-hover:scale-110 transition-transform block", stat.color)}>{stat.val}</span>
                        <span className="text-[9px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">{stat.lab}</span>
                    </div>
                ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-8 p-4">
                <Card className="p-8 bg-card/40 backdrop-blur-2xl border-primary/10 rounded-[2.5rem] shadow-2xl hover:scale-105 transition-all group overflow-hidden border hover:border-primary/40 hover:shadow-primary/20">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                    <div className="p-5 bg-primary/10 rounded-2xl w-fit mb-6 relative z-10 shadow-inner">
                        <Smartphone className="h-10 w-10 text-primary group-hover:rotate-12 transition-transform" />
                    </div>
                    <h3 className="font-black text-lg uppercase italic mb-2 relative z-10">Kyron Pro X</h3>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest relative z-10 leading-tight">Terminales de Grado Militar</p>
                </Card>
                
                <Card className="p-8 bg-card/40 backdrop-blur-2xl border-secondary/10 rounded-[2.5rem] shadow-2xl hover:scale-105 transition-all mt-16 group overflow-hidden border hover:border-secondary/40 hover:shadow-secondary/20">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                    <div className="p-5 bg-secondary/10 rounded-2xl w-fit mb-6 relative z-10 shadow-inner">
                        <Magnet className="h-10 w-10 text-secondary group-hover:animate-bounce" />
                    </div>
                    <h3 className="font-black text-lg uppercase italic mb-2 relative z-10">Smart Bins</h3>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest relative z-10 leading-tight">Clasificación Magnética IA</p>
                </Card>
                
                <Card className="p-8 bg-card/40 backdrop-blur-2xl border-primary/10 rounded-[2.5rem] shadow-2xl hover:scale-105 transition-all -mt-8 group overflow-hidden border hover:border-primary/40 hover:shadow-primary/20">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
                    <div className="p-5 bg-primary/10 rounded-2xl w-fit mb-6 relative z-10 shadow-inner">
                        <Phone className="h-10 w-10 text-primary animate-pulse" />
                    </div>
                    <h3 className="font-black text-lg uppercase italic mb-2 relative z-10">SIM Digital</h3>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest relative z-10 leading-tight">Activación de Números 5G</p>
                </Card>
                
                <div className="p-8 bg-primary text-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(10,36,114,0.4)] hover:scale-105 transition-all mt-8 group overflow-hidden border-none relative flex flex-col justify-end">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="p-5 bg-white/10 rounded-2xl w-fit mb-6 relative z-10 shadow-lg backdrop-blur-md">
                        <Globe className="h-10 w-10 text-white animate-spin-slow" />
                    </div>
                    <h3 className="font-black text-lg uppercase italic mb-2 relative z-10">Ecosistema</h3>
                    <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest relative z-10 leading-tight">Ledger Financiero Inmutable</p>
                </div>
            </div>
            
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-primary/5 rounded-full blur-[160px] animate-pulse" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
