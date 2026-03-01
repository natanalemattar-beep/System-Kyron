
'use client';

import { motion } from "framer-motion";
import { ArrowRight, Radio, Magnet, Phone, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex items-center bg-transparent">
      
      {/* Background Animated Elements */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden gpu-accelerated">
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[100px]"
        />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square opacity-[0.03] flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Logo className="w-full h-full" />
            </motion.div>
        </div>

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.01] mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 text-[10px] font-black uppercase tracking-[0.4em] text-primary backdrop-blur-xl border border-primary/20 shadow-glow">
              <Sparkles className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              Ecosistema de Misión Crítica v2.6
            </div>

            <div className="space-y-6">
                <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.8] text-foreground">
                  KYRON <br/> 
                  <span className="text-primary italic italic-shadow">SYSTEM</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-snug font-bold border-l-4 border-primary/30 pl-8 opacity-80 uppercase tracking-tight">
                  Líneas <span className="text-secondary italic">5G Digitales</span>, <br/>
                  Conectividad <span className="text-primary tracking-tighter">eSIM</span> y Blindaje Fiscal.
                </p>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
                <Button size="lg" className="btn-3d-primary h-16 px-12 text-xs font-black uppercase tracking-widest rounded-2xl group shadow-2xl">
                    <span className="relative z-10 flex items-center gap-3">
                        DESPLEGAR SISTEMA <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                </Button>
                <Button variant="outline" size="lg" className="h-16 px-10 text-xs font-black uppercase tracking-widest rounded-2xl border-white/10 hover:bg-white/5 shadow-xl bg-white/[0.02] backdrop-blur-xl transition-all">
                    DOCUMENTACIÓN
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-12 pt-12 border-t border-white/5 max-w-lg">
                {[
                    { val: "100%", lab: "COMPLIANCE", color: "text-primary" },
                    { val: "3D", lab: "MAGNETIC", color: "text-secondary" },
                    { val: "AI", lab: "SHIELD", color: "text-primary" }
                ].map((stat, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <span className={cn("font-black text-3xl tracking-tighter block italic", stat.color)}>{stat.val}</span>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-30">{stat.lab}</span>
                    </div>
                ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-8 p-4">
                <Card className="glass-card p-10 rounded-[3rem] shadow-2xl hover:scale-105 transition-all duration-500 group overflow-hidden border-none bg-primary/5">
                    <div className="p-6 bg-primary/10 rounded-[2rem] w-fit mb-8 shadow-inner border border-primary/10">
                        <Radio className="h-10 w-10 text-primary group-hover:animate-pulse" />
                    </div>
                    <h3 className="font-black text-xl uppercase italic mb-2">Líneas Kyron</h3>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] opacity-40">Activación 5G</p>
                </Card>
                
                <Card className="glass-card p-10 rounded-[3rem] shadow-2xl hover:scale-105 transition-all duration-500 mt-20 group overflow-hidden border-none bg-secondary/5">
                    <div className="p-6 bg-secondary/10 rounded-[2rem] w-fit mb-8 shadow-inner border border-secondary/10">
                        <Magnet className="h-10 w-10 text-secondary" />
                    </div>
                    <h3 className="font-black text-xl uppercase italic mb-2">Smart Bins</h3>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] opacity-40">Magnético IA</p>
                </Card>
                
                <Card className="glass-card p-10 rounded-[3rem] shadow-2xl hover:scale-105 transition-all duration-500 -mt-10 group overflow-hidden border-none bg-primary/5">
                    <div className="p-6 bg-primary/10 rounded-[2rem] w-fit mb-8 shadow-inner border border-primary/10">
                        <Phone className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="font-black text-xl uppercase italic mb-2">SIM Digital</h3>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] opacity-40">Gestión eSIM</p>
                </Card>
                
                <div className="glass-card p-10 bg-primary text-white rounded-[3rem] shadow-[0_0_100px_-20px_rgba(37,99,235,0.5)] hover:scale-105 transition-all duration-500 mt-10 group overflow-hidden border-none relative flex flex-col justify-end">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-180 transition-all duration-1000">
                        <Globe className="h-32 w-32" />
                    </div>
                    <div className="p-6 bg-white/10 rounded-[2rem] w-fit mb-8 shadow-xl backdrop-blur-md relative z-10 border border-white/10">
                        <Globe className="h-10 w-10 text-white animate-spin-slow" />
                    </div>
                    <h3 className="font-black text-xl uppercase italic mb-2 relative z-10">Ecosistema</h3>
                    <p className="text-[10px] text-white/50 font-black uppercase tracking-[0.2em] relative z-10">Ledger Inmutable</p>
                </div>
            </div>
            
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-primary/5 rounded-full blur-[150px] opacity-50" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
