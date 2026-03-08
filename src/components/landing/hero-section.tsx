
'use client';

import { motion } from "framer-motion";
import { ArrowRight, Radio, Magnet, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';

/**
 * @fileOverview Hero Section refinado con estética de ingeniería y adaptabilidad total.
 */

export function HeroSection() {
  const t = useTranslations('HeroSection');

  return (
    <section id="inicio" className="relative pt-24 pb-12 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex items-center bg-transparent">
      
      {/* HUD Architectural Lines - Adaptive visibility */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/20 via-transparent to-transparent opacity-20" />
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        
        {/* Corner Markers - Positioned for all screens */}
        <div className="absolute top-16 left-4 md:left-10 w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-primary/20" />
        <div className="absolute top-16 right-4 md:right-10 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-primary/20" />
        <div className="absolute bottom-16 left-4 md:left-10 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-primary/20" />
        <div className="absolute bottom-16 right-4 md:right-10 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-primary/20" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 md:space-y-10 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-lg bg-primary/5 text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-primary backdrop-blur-md border border-primary/10 mx-auto lg:ml-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              CORE SYSTEM v2.6.5
            </div>

            <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground uppercase italic leading-none">
                  KYRON <span className="text-primary not-italic">SYSTEM</span>
                </h1>
                <p className="text-primary font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-[8px] md:text-[10px] mt-2 opacity-60">
                  {t('slogan')}
                </p>
                <p className="text-sm md:text-lg text-muted-foreground max-w-lg mx-auto lg:ml-0 leading-relaxed font-bold uppercase tracking-tight italic border-l-0 lg:border-l-2 border-primary/20 lg:pl-6 mt-6">
                  Infraestructura <span className="text-primary">Digital Soberana</span> para operaciones de misión crítica.
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4">
                <Button asChild size="lg" className="btn-3d-primary h-12 md:h-14 px-8 md:px-10 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-xl group shadow-2xl w-full sm:w-auto">
                    <Link href="/register" className="flex items-center gap-3 justify-center">
                        DESPLEGAR <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
                <Button variant="outline" asChild size="lg" className="h-12 md:h-14 px-8 md:px-10 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-xl border-white/10 hover:bg-white/5 bg-white/[0.02] backdrop-blur-sm transition-all w-full sm:w-auto">
                    <Link href="/manual-usuario" className="flex justify-center">MANUAL TÉCNICO</Link>
                </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 pt-4 md:pt-8 opacity-40">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black italic tracking-widest">5G_CONNECT</span>
                    <div className="h-1 w-12 bg-primary rounded-full" />
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black italic tracking-widest">AUTH_SECURE</span>
                    <div className="h-1 w-12 bg-secondary rounded-full" />
                </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative grid grid-cols-1 xs:grid-cols-2 gap-4 md:gap-6 p-4"
          >
                <Card className="glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl hover:translate-y-[-4px] transition-all duration-500 group border-primary/10">
                    <Radio className="h-6 w-6 md:h-8 md:w-8 text-primary mb-4 md:mb-6" />
                    <h3 className="font-black text-xs md:text-sm uppercase italic mb-1">Red 5G</h3>
                    <p className="text-[7px] md:text-[8px] text-muted-foreground font-black uppercase tracking-widest">Activación eSIM</p>
                </Card>
                
                <Card className="glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl hover:translate-y-[-4px] transition-all duration-500 xs:mt-12 group border-secondary/10">
                    <Magnet className="h-6 w-6 md:h-8 md:w-8 text-secondary mb-4 md:mb-6" />
                    <h3 className="font-black text-xs md:text-sm uppercase italic mb-1">Smart Bins</h3>
                    <p className="text-[7px] md:text-[8px] text-muted-foreground font-black uppercase tracking-widest">Mag-Induction</p>
                </Card>
                
                <Card className="glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl hover:translate-y-[-4px] transition-all duration-500 xs:-mt-6 group border-primary/10">
                    <Phone className="h-6 w-6 md:h-8 md:w-8 text-primary mb-4 md:mb-6" />
                    <h3 className="font-black text-xs md:text-sm uppercase italic mb-1">Terminales</h3>
                    <p className="text-[7px] md:text-[8px] text-muted-foreground font-black uppercase tracking-widest">Kyron Pro X</p>
                </Card>
                
                <Card className="p-6 md:p-8 bg-primary text-white rounded-2xl md:rounded-3xl shadow-glow hover:translate-y-[-4px] transition-all duration-500 xs:mt-6 group border-none relative overflow-hidden">
                    <Globe className="h-6 w-6 md:h-8 md:w-8 text-white mb-4 md:mb-6 animate-spin-slow" />
                    <h3 className="font-black text-xs md:text-sm uppercase italic mb-1">Ecosistema</h3>
                    <p className="text-[7px] md:text-[8px] text-white/50 font-black uppercase tracking-widest">Ledger Validated</p>
                </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
