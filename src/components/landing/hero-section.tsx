'use client';

import { motion } from "framer-motion";
import { Play, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHoliday } from "@/hooks/use-holiday";
import { cn } from "@/lib/utils";
import { FestiveEffect } from "../ui/confetti-effect";
import Link from "next/link";

export function HeroSection() {
  const { activeHoliday, isHolidayActive } = useHoliday();

  return (
    <section id="inicio" className={cn(
        "relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-20 pb-16",
        "bg-gradient-to-b from-background via-background to-secondary/20"
    )}>
      {isHolidayActive && activeHoliday && <FestiveEffect type={activeHoliday.effect} />}
      
      {/* Background decoration elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                <Zap className="h-3 w-3 fill-primary" /> Ecosistema de Gestión 2025
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-balance leading-[0.85] mb-12 uppercase italic">
              El Poder <br /> <span className="text-primary not-italic">Absoluto</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
              Unifica operaciones, finanzas y cumplimiento legal con el primer ecosistema empresarial blindado por Inteligencia Artificial y Blockchain.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="h-14 px-10 rounded-2xl text-base font-black shadow-2xl btn-3d-primary group">
                    <Link href="/login">
                        Comenzar Ahora <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
                <Button variant="ghost" size="lg" className="h-14 px-8 rounded-2xl text-base font-bold group">
                    <div className="p-2 bg-primary/5 rounded-xl mr-3 group-hover:bg-primary/10 transition-colors">
                        <Play className="h-4 w-4 fill-primary text-primary" />
                    </div>
                    Ver Demo Interactiva
                </Button>
            </div>

            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-primary/5 pt-12">
                {[
                    { label: "Riesgo Fiscal", value: "0%", icon: ShieldCheck },
                    { label: "Automatización", value: "100%", icon: Zap },
                    { label: "Disponibilidad", value: "99.9%", icon: Globe },
                    { label: "Seguridad", value: "Banking", icon: ShieldCheck },
                ].map((stat, i) => (
                    <div key={i} className="text-center">
                        <p className="text-2xl font-black tracking-tighter mb-1">{stat.value}</p>
                        <p className="text-[9px] uppercase font-black tracking-widest text-muted-foreground">{stat.label}</p>
                    </div>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}