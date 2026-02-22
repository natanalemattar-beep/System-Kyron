'use client';

import { motion } from "framer-motion";
import { Video } from "lucide-react";
import { useHoliday } from "@/hooks/use-holiday";
import { cn } from "@/lib/utils";
import { FestiveEffect } from "../ui/confetti-effect";

export function HeroSection() {
  const { activeHoliday, isHolidayActive } = useHoliday();

  return (
    <section id="inicio" className={cn(
        "relative min-h-[85vh] flex items-center justify-center overflow-hidden py-24 sm:py-32",
        !isHolidayActive && "bg-muted/30",
        isHolidayActive && "bg-transparent"
    )}>
      {isHolidayActive && activeHoliday && <FestiveEffect type={activeHoliday.effect} />}
      
      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-bold tracking-tight mb-8">
                🚀 Ecosistema de Gestión de Próxima Generación
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-balance leading-[1] mb-10">
              Gestión, Telecomunicaciones y Finanzas en un <span className="text-primary">Solo Lugar</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed mb-12">
              Unifica todos tus departamentos con Inteligencia Artificial, Alertas Predictivas y Blockchain. La solución definitiva para empresas que miran al futuro.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <div className="flex items-center gap-3 group cursor-pointer bg-card/50 backdrop-blur-sm p-4 rounded-2xl border border-border/50 hover:border-primary/50 transition-all shadow-xl">
                    <div className="p-3 bg-primary text-primary-foreground rounded-xl group-hover:scale-110 transition-transform">
                        <Video className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                        <p className="text-xs font-bold uppercase tracking-widest opacity-60">Demo Interactiva</p>
                        <p className="font-bold">Ver Video del Sistema</p>
                    </div>
                </div>
                
                <div className="text-sm font-medium text-muted-foreground">
                    <span className="text-primary font-bold">30 días gratis</span> para nuevas empresas
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
