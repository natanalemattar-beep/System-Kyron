
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
      
      {/* Background Animated Elements - Optimized for Performance */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden gpu-accelerated">
        {/* Optimized Orbs - Reduced Blur for Performance */}
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[70px]"
        />
        
        {/* Massive Background Logo - Controlled Scale */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] aspect-square opacity-[0.02] flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ 
                  scale: [1, 1.03, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Logo className="w-full h-full" />
            </motion.div>
        </div>

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.01] mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/5 text-[10px] font-black uppercase tracking-[0.4em] text-primary backdrop-blur-md border border-primary/10">
              <Sparkles className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              Ecosistema de Misión Crítica v2.6
            </div>

            <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-foreground">
                  KYRON <br/> 
                  <span className="text-primary italic italic-shadow relative">
                    SYSTEM
                    <motion.span 
                        className="absolute -right-10 -top-6 text-[10px] font-black not-italic text-secondary bg-secondary/10 px-3 py-1.5 rounded-xl border border-secondary/20 shadow-lg"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
                </Button>
                <Button variant="outline" size="lg" className="h-16 px-10 text-xs font-black uppercase tracking-widest rounded-2xl border-primary/20 hover:bg-primary/5 shadow-xl bg-background/40 backdrop-blur-md transition-all">
                    DOCUMENTACIÓN TÉCNICA
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-10 pt-10 border-t border-primary/10 max-w-lg">
                {[
                    { val: "100%", lab: "COMPLIANCE", color: "text-primary" },
                    { val: "3D", lab: "MAGNETIC", color: "text-secondary" },
                    { val: "AI", lab: "SHIELD", color: "text-primary" }
                ].map((stat, i) => (
                    <div key={i} className="flex flex-col gap-1 cursor-default">
                        <span className={cn("font-black text-2xl tracking-tighter block", stat.color)}>{stat.val}</span>
                        <span className="text-[9px] font-black uppercase tracking-widest opacity-40">{stat.lab}</span>
                    </div>
                ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative gpu-accelerated"
          >
            <div className="grid grid-cols-2 gap-8 p-4">
                <Card className="p-8 bg-card/40 backdrop-blur-lg border-primary/10 rounded-[2.5rem] shadow-xl hover:scale-[1.02] transition-transform duration-300 group overflow-hidden border">
                    <div className="p-5 bg-primary/10 rounded-2xl w-fit mb-6 relative z-10 shadow-inner">
                        <Smartphone className="h-10 w-10 text-primary group-hover:rotate-6 transition-transform" />
                    </div>
                    <h3 className="font-black text-lg uppercase italic mb-2 relative z-10">Kyron Pro X</h3>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest relative z-10 leading-tight">Terminales de Grado Militar</p>
                </Card>
                
                <Card className="p-8 bg-card/40 backdrop-blur-lg border-secondary/10 rounded-[2.5rem] shadow-xl hover:scale-[1.02] transition-transform duration-300 mt-16 group overflow-hidden border">
                    <div className="p-5 bg-secondary/10 rounded-2xl w-fit mb-6 relative z-10 shadow-inner">
                        <Magnet className="h-10 w-10 text-secondary" />
                    </div>
                    <h3 className="font-black text-lg uppercase italic mb-2 relative z-10">Smart Bins</h3>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest relative z-10 leading-tight">Clasificación Magnética IA</p>
                </Card>
                
                <Card className="p-8 bg-card/40 backdrop-blur-lg border-primary/10 rounded-[2.5rem] shadow-xl hover:scale-[1.02] transition-transform duration-300 -mt-8 group overflow-hidden border">
                    <div className="p-5 bg-primary/10 rounded-2xl w-fit mb-6 relative z-10 shadow-inner">
                        <Phone className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="font-black text-lg uppercase italic mb-2 relative z-10">SIM Digital</h3>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest relative z-10 leading-tight">Activación de Números 5G</p>
                </Card>
                
                <div className="p-8 bg-primary text-white rounded-[2.5rem] shadow-2xl hover:scale-[1.02] transition-transform duration-300 mt-8 group overflow-hidden border-none relative flex flex-col justify-end">
                    <div className="p-5 bg-white/10 rounded-2xl w-fit mb-6 relative z-10 shadow-lg backdrop-blur-md">
                        <Globe className="h-10 w-10 text-white animate-spin-slow" />
                    </div>
                    <h3 className="font-black text-lg uppercase italic mb-2 relative z-10">Ecosistema</h3>
                    <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest relative z-10 leading-tight">Ledger Financiero Inmutable</p>
                </div>
            </div>
            
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[120px]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
