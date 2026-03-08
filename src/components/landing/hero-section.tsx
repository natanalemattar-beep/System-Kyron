'use client';

import { motion } from "framer-motion";
import { ArrowRight, Radio, ShieldCheck, Zap, Activity, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "@/navigation";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useTranslations } from 'next-intl';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-tech-visual");
  const t = useTranslations('HeroSection');

  return (
    <section id="inicio" className="relative pt-32 pb-12 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center bg-transparent">
      
      {/* Líneas HUD de Arquitectura Técnica */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/40 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        {/* Marcadores de Esquina de Precisión */}
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
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-lg bg-primary/5 text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-primary border border-primary/10 mx-auto lg:ml-0 shadow-glow-sm">
              <Activity className="h-3 w-3 animate-pulse" /> SISTEMA OPERATIVO ACTIVO
            </div>

            <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tight text-white uppercase italic leading-[0.9] italic-shadow">
                  {t('title')}
                </h1>
                <p className="text-primary font-black uppercase tracking-[0.4em] text-[9px] md:text-[10px] opacity-60">
                  {t('slogan')}
                </p>
                <p className="text-sm md:text-lg text-white/60 max-w-lg mx-auto lg:ml-0 font-bold uppercase tracking-tight italic border-l-0 lg:border-l-4 border-primary/20 lg:pl-6 leading-relaxed">
                  {t('subtitle')}
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Button asChild size="lg" className="btn-3d-primary h-12 md:h-14 px-8 text-[9px] font-black uppercase tracking-widest rounded-xl w-full sm:w-auto shadow-2xl">
                    <Link href="/register" className="flex items-center gap-3 justify-center">
                        {t('cta_main')} <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
                <Button variant="outline" asChild size="lg" className="h-12 md:h-14 px-8 text-[9px] font-black uppercase tracking-widest rounded-xl border-white/10 bg-white/[0.02] w-full sm:w-auto hover:bg-white/5 transition-all">
                    <Link href="/manual-usuario">{t('cta_secondary')}</Link>
                </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/5">
                {[
                    { label: "CONEXIÓN", val: "ESTABLE", icon: Zap },
                    { label: "SEGURIDAD", val: "CIFRADA", icon: ShieldCheck }
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
                <div className="relative grid grid-cols-1 gap-4 md:gap-6">
                    <Card className="glass-card border-none p-2 rounded-[2.5rem] shadow-2xl overflow-hidden group bg-white/[0.03]">
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
                                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-primary mb-1">INFRAESTRUCTURA_DIGITAL</p>
                                <h3 className="text-sm md:text-lg font-black text-white uppercase italic tracking-tighter">ESTADO: ÓPTIMO</h3>
                            </div>
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        <Card className="glass-card border-none p-6 md:p-8 rounded-[2rem] bg-white/[0.02] flex flex-col items-center sm:items-start text-center sm:text-left transition-all hover:bg-white/[0.04]">
                            <Radio className="h-6 w-6 text-primary mb-4" />
                            <h3 className="font-black text-[9px] uppercase italic text-white mb-1 tracking-widest">RED 5G ACTIVA</h3>
                            <p className="text-[7px] text-white/40 font-bold uppercase tracking-widest leading-relaxed">Conectividad de baja latencia para empresas.</p>
                        </Card>
                        <Card className="glass-card border-none p-6 md:p-8 rounded-[2rem] bg-white/[0.02] flex flex-col items-center sm:items-start text-center sm:text-left transition-all hover:bg-white/[0.04]">
                            <Smartphone className="h-6 w-6 text-secondary mb-4" />
                            <h3 className="font-black text-[9px] uppercase italic text-white mb-1 tracking-widest">GESTIÓN DE LÍNEA</h3>
                            <p className="text-[7px] text-white/40 font-bold uppercase tracking-widest leading-relaxed">Control total de consumo y recargas.</p>
                        </Card>
                    </div>
                </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}