'use client';

import { motion } from "framer-motion";
import { ArrowRight, Zap, ShieldCheck, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-background hud-grid">
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="w-full h-1/2 bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-scanline" />
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse" />

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-12 relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <Logo className="h-48 w-48 md:h-72 md:w-72 relative z-10 filter drop-shadow-[0_0_50px_rgba(30,64,175,0.4)]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80">Protocolo Operativo v2.0</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.8] uppercase italic italic-shadow">
              Sistemas que <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary glow-text">Dominan</span> el Futuro
            </h1>
            
            <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed balance opacity-70">
              Arquitectura de misión crítica unificada. Automatización fiscal con IA cuántica, telecomunicaciones blindadas y finanzas inmutables.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <Button asChild className="btn-3d-primary h-16 px-12 text-sm group min-w-[280px]">
                <Link href="/login" className="flex items-center gap-3">
                  INICIAR OPERACIONES <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
              <Button variant="outline" className="h-16 px-12 rounded-xl text-sm font-black border-2 border-white/10 hover:bg-white/5 backdrop-blur-xl min-w-[280px] tracking-tighter uppercase transition-all">
                ESPECIFICACIONES TÉCNICAS
              </Button>
            </div>

            <div className="pt-24 flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-40">
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest border-r border-white/10 pr-12">
                <ShieldCheck className="h-4 w-4 text-secondary" /> CERO RIESGO FISCAL
              </div>
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest border-r border-white/10 pr-12">
                <Zap className="h-4 w-4 text-primary" /> IA PREDICTIVA 24/7
              </div>
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest">
                <Cpu className="h-4 w-4 text-white" /> SELLADO BLOCKCHAIN
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}