
'use client';

import { motion } from "framer-motion";
import { ArrowRight, Radio, Magnet, ShieldCheck, Zap, Globe, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

/**
 * @fileOverview Hero Section refinado: Ingeniería estética y adaptabilidad móvil total.
 * Branding a escala reducida y marcos HUD integrados.
 */

export function HeroSection() {
  const t = useTranslations('HeroSection');
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-tech-visual");

  return (
    <section id="inicio" className="relative pt-24 pb-12 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center bg-transparent">
      
      {/* HUD Architectural Lines */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden hidden md:block">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/20 via-transparent to-transparent opacity-20" />
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        
        {/* Corner Markers */}
        <div className="absolute top-24 left-10 w-8 h-8 border-t-2 border-l-2 border-primary/20" />
        <div className="absolute top-24 right-10 w-8 h-8 border-t-2 border-r-2 border-primary/20" />
        <div className="absolute bottom-16 left-10 w-8 h-8 border-b-2 border-l-2 border-primary/20" />
        <div className="absolute bottom-16 right-10 w-8 h-8 border-b-2 border-r-2 border-primary/20" />
      </div>

      <div className="container mx-auto px-4 md:px-10 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 md:space-y-10 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-lg bg-primary/5 text-[9px] font-black uppercase tracking-[0.4em] text-primary backdrop-blur-md border border-primary/10 mx-auto lg:ml-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              MASTER PROTOCOL v2.6.5
            </div>

            <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase italic leading-[1.1] text-balance">
                  KYRON <span className="text-primary not-italic">SYSTEM</span>
                </h1>
                <p className="text-primary font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-[10px] opacity-60">
                  EFICIENCIA SIN FRONTERAS • FINANZAS DEL FUTURO
                </p>
                <div className="h-1 w-20 bg-primary/20 mx-auto lg:ml-0 rounded-full" />
                <p className="text-sm md:text-lg text-muted-foreground max-w-lg mx-auto lg:ml-0 leading-relaxed font-bold uppercase tracking-tight italic">
                  Ecosistema de <span className="text-primary">Ingeniería Digital</span> para operaciones de misión crítica.
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Button asChild size="lg" className="btn-3d-primary h-12 md:h-14 px-8 md:px-10 text-[10px] font-black uppercase tracking-widest rounded-xl group shadow-2xl w-full sm:w-auto">
                    <Link href="/register" className="flex items-center gap-3 justify-center">
                        DESPLEGAR NODO <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
                <Button variant="outline" asChild size="lg" className="h-12 md:h-14 px-8 md:px-10 text-[10px] font-black uppercase tracking-widest rounded-xl border-white/10 hover:bg-white/5 bg-white/[0.02] backdrop-blur-sm transition-all w-full sm:w-auto">
                    <Link href="/manual-usuario" className="flex justify-center">DOCUMENTACIÓN</Link>
                </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-8 border-t border-white/5">
                {[
                    { label: "LATENCIA", val: "14ms", icon: Zap },
                    { label: "CIFRADO", val: "AES-512", icon: ShieldCheck },
                    { label: "RED", val: "5G+", icon: Radio },
                    { label: "UPTIME", val: "99.9%", icon: Globe }
                ].map((stat, i) => (
                    <div key={i} className="space-y-1">
                        <div className="flex items-center gap-2 text-[8px] font-black text-white/30 uppercase tracking-widest">
                            <stat.icon className="h-3 w-3" /> {stat.label}
                        </div>
                        <p className="text-xs font-black text-white italic">{stat.val}</p>
                    </div>
                ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full"
          >
                <div className="absolute -inset-4 bg-primary/10 blur-[100px] rounded-full opacity-20 animate-pulse hidden md:block" />
                
                <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <Card className="col-span-1 sm:col-span-2 glass-card p-2 rounded-[2rem] shadow-2xl overflow-hidden group border-primary/20">
                        <div className="aspect-[16/9] relative rounded-[1.8rem] overflow-hidden">
                            {heroImage && (
                                <Image 
                                    src={heroImage.imageUrl} 
                                    alt={heroImage.description} 
                                    fill 
                                    className="object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[0.2] contrast-[1.1]"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-6 md:bottom-6 md:left-8 text-left">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-1">INFRAESTRUCTURA_HÍBRIDA</p>
                                <h3 className="text-base md:text-lg font-black text-white uppercase italic tracking-tighter">NODO VISUAL ACTIVO</h3>
                            </div>
                        </div>
                    </Card>

                    <Card className="glass-card p-6 rounded-[2rem] shadow-xl hover:translate-y-[-4px] transition-all duration-500 group border-secondary/10 bg-white/[0.02]">
                        <Magnet className="h-6 w-6 md:h-8 md:w-8 text-secondary mb-4 md:mb-6 group-hover:rotate-12 transition-transform" />
                        <h3 className="font-black text-[10px] md:text-xs uppercase italic mb-1 text-white">INDUCCIÓN MAGNÉTICA</h3>
                        <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest leading-relaxed">Trazabilidad inmutable para activos circulares.</p>
                    </Card>
                    
                    <Card className="glass-card p-6 rounded-[2rem] shadow-xl hover:translate-y-[-4px] transition-all duration-500 group border-primary/10 bg-white/[0.02]">
                        <Smartphone className="h-6 w-6 md:h-8 md:w-8 text-primary mb-4 md:mb-6 group-hover:scale-110 transition-transform" />
                        <h3 className="font-black text-[10px] md:text-xs uppercase italic mb-1 text-white">TERMINALES PRO X</h3>
                        <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest leading-relaxed">Autenticación biométrica síncrona integrada.</p>
                    </Card>
                </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
