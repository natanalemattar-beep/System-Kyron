
'use client';

import { motion } from "framer-motion";
import { ArrowRight, Radio, Magnet, ShieldCheck, Zap, Globe, Smartphone, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

/**
 * @fileOverview Hero Section: Ingeniería Estética y Adaptabilidad Total.
 * Diseño HUD con líneas de precisión y cuadrícula adaptable.
 */
export function HeroSection() {
  const t = useTranslations('HeroSection');
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-tech-visual");

  return (
    <section id="inicio" className="relative pt-32 pb-12 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center bg-transparent">
      
      {/* HUD Architectural Lines */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/40 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        {/* Corner Markers */}
        <div className="absolute top-24 left-6 md:left-10 w-6 md:w-8 h-6 md:h-8 border-t-2 border-l-2 border-primary/30" />
        <div className="absolute top-24 right-6 md:right-10 w-6 md:w-8 h-6 md:h-8 border-t-2 border-r-2 border-primary/30" />
      </div>

      <div className="container mx-auto px-4 md:px-10 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-lg bg-primary/5 text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-primary border border-primary/10 mx-auto lg:ml-0">
              <Activity className="h-3 w-3 animate-pulse" /> CORE NODE 2.6.5 ACTIVE
            </div>

            <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase italic leading-tight italic-shadow">
                  KYRON <span className="text-primary not-italic">SYSTEM</span>
                </h1>
                <p className="text-primary font-black uppercase tracking-[0.4em] text-[9px] opacity-60">
                  EFICIENCIA SIN FRONTERAS • 2026
                </p>
                <p className="text-sm md:text-lg text-white/60 max-w-lg mx-auto lg:ml-0 font-bold uppercase tracking-tight italic border-l-0 lg:border-l-4 border-primary/20 lg:pl-6">
                  Ecosistema de ingeniería para operaciones de misión crítica.
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Button asChild size="lg" className="btn-3d-primary h-12 md:h-14 px-8 text-[9px] font-black uppercase tracking-widest rounded-xl w-full sm:w-auto shadow-2xl">
                    <Link href="/register" className="flex items-center gap-3 justify-center">
                        AFILIACIÓN <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
                <Button variant="outline" asChild size="lg" className="h-12 md:h-14 px-8 text-[9px] font-black uppercase tracking-widest rounded-xl border-white/10 bg-white/[0.02] w-full sm:w-auto">
                    <Link href="/manual-usuario">DOCUMENTACIÓN</Link>
                </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/5">
                {[
                    { label: "LATENCIA", val: "14ms", icon: Zap },
                    { label: "CIFRADO", val: "AES-512", icon: ShieldCheck }
                ].map((stat, i) => (
                    <div key={i} className="space-y-1">
                        <div className="flex items-center gap-2 justify-center lg:justify-start text-[7px] font-black text-white/30 uppercase tracking-widest">
                            <stat.icon className="h-3 w-3" /> {stat.label}
                        </div>
                        <p className="text-xs font-black text-white italic">{stat.val}</p>
                    </div>
                ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full"
          >
                <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <Card className="col-span-1 sm:col-span-2 glass-card border-none p-2 rounded-[2.5rem] shadow-2xl overflow-hidden group bg-white/[0.03]">
                        <div className="aspect-video relative rounded-[2.2rem] overflow-hidden">
                            {heroImage && (
                                <Image 
                                    src={heroImage.imageUrl} 
                                    alt={heroImage.description} 
                                    fill 
                                    className="object-cover contrast-[1.1] grayscale-[0.2]"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 text-left">
                                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-primary mb-1">INFRAESTRUCTURA_HÍBRIDA</p>
                                <h3 className="text-sm md:text-lg font-black text-white uppercase italic">NODO: ÓPTIMO</h3>
                            </div>
                        </div>
                    </Card>

                    <Card className="glass-card border-none p-6 md:p-8 rounded-[2rem] bg-white/[0.02] flex flex-col items-center sm:items-start text-center sm:text-left">
                        <Magnet className="h-6 w-6 text-secondary mb-4" />
                        <h3 className="font-black text-[9px] uppercase italic text-white mb-1">MAG-SENSOR</h3>
                        <p className="text-[7px] text-white/40 font-bold uppercase tracking-widest leading-relaxed">Trazabilidad inmutable en el Ledger.</p>
                    </Card>
                    
                    <Card className="glass-card border-none p-6 md:p-8 rounded-[2rem] bg-white/[0.02] flex flex-col items-center sm:items-start text-center sm:text-left">
                        <Smartphone className="h-6 w-6 text-primary mb-4" />
                        <h3 className="font-black text-[9px] uppercase italic text-white mb-1">TERMINALES PRO</h3>
                        <p className="text-[7px] text-white/40 font-bold uppercase tracking-widest leading-relaxed">Validación biométrica integrada.</p>
                    </Card>
                </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
