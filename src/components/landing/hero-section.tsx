'use client';

import { motion } from "framer-motion";
import { ArrowRight, Zap, ShieldCheck, Cpu, Activity, Globe, ZapOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-background hud-grid">
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="w-full h-1/2 bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-scanline" />
      </div>

      {/* Decorative Overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(10,36,114,0.1),transparent_70%)]" />

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-16 relative"
          >
            <div className="absolute inset-0 bg-primary/30 blur-[120px] rounded-full scale-150 animate-pulse" />
            <Logo className="h-56 w-56 md:h-96 md:w-96 relative z-10 filter drop-shadow-[0_0_80px_rgba(30,64,175,0.6)]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-2xl">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/90">Protocolo de Control Global v2.0.4</span>
            </div>

            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-black tracking-tighter leading-[0.75] uppercase italic italic-shadow">
              Sistemas <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary glow-text-primary">Blindados</span>
            </h1>
            
            <p className="text-xl md:text-3xl text-muted-foreground max-w-4xl mx-auto font-black uppercase tracking-tighter leading-none opacity-60">
              Arquitectura Industrial. Inteligencia Fiscal Cuántica. <br/> 
              <span className="text-primary/80">Inmutabilidad Blockchain Total.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-12">
              <Button asChild className="btn-3d-primary h-20 px-16 text-sm group min-w-[320px]">
                <Link href="/login" className="flex items-center gap-4">
                  INICIAR OPERACIONES <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-3" />
                </Link>
              </Button>
              <Button variant="outline" className="h-20 px-16 rounded-lg text-sm font-black border-2 border-white/10 hover:bg-white/5 backdrop-blur-xl min-w-[320px] tracking-widest uppercase transition-all shadow-2xl">
                DOCUMENTACIÓN TÉCNICA
              </Button>
            </div>

            <div className="pt-32 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto opacity-30">
              <div className="flex flex-col items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-secondary" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Cero Riesgo</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Zap className="h-8 w-8 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">IA Predictiva</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Globe className="h-8 w-8 text-white" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Conexión Global</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Activity className="h-8 w-8 text-secondary" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Telemetría</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}