
'use client';

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BrainCircuit, Lock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useHoliday } from "@/hooks/use-holiday";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

/**
 * @fileOverview Sección de Características: Ingeniería de Datos.
 * Normalización de nombres para una comunicación clara.
 */
const features = [
    { 
        title: "Inteligencia Fiscal", 
        description: "Análisis transaccional contra normativa vigente en tiempo real.", 
        icon: BrainCircuit
    },
    { 
        title: "Registro Seguro", 
        description: "Sellado de registros digitales para integridad absoluta de la información.", 
        icon: Lock
    }
];

export function FeaturesSection() {
    const infrastructureImage = PlaceHolderImages.find((img) => img.id === "corporate-infrastructure");
    const { isHolidayActive } = useHoliday();

    return (
        <section id="caracteristicas" className={cn(
            "py-16 md:py-32 rounded-[2.5rem] md:rounded-[4rem] relative overflow-hidden", 
            !isHolidayActive && "bg-white/[0.01] border border-white/5"
        )}>
          <div className="container mx-auto px-4 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div 
                className="space-y-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                <div className="space-y-6 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-[7px] font-black uppercase tracking-[0.3em] text-secondary mx-auto lg:ml-0">
                        <ShieldCheck className="h-3 w-3" /> Seguridad Corporativa
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase italic italic-shadow leading-tight">Control <br className="hidden sm:block"/> <span className="text-primary not-italic">Financiero</span></h2>
                </div>

                <div className="grid grid-cols-1 gap-4 md:gap-6">
                    {features.map((feature, index) => (
                    <div 
                        key={feature.title} 
                        className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 md:p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all group"
                    >
                        <div className="p-4 bg-primary/10 text-primary rounded-2xl shrink-0 group-hover:scale-110 transition-transform">
                          <feature.icon className="h-6 w-6" />
                        </div>
                        <div className="space-y-2 text-center sm:text-left">
                          <h4 className="font-black text-sm uppercase text-white/90">{feature.title}</h4>
                          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-relaxed">{feature.description}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </motion.div>

             <div className="relative p-2">
                 <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full opacity-30" />
                 <Card className="relative glass-card border-none p-2 rounded-[2.5rem] bg-white/[0.03] overflow-hidden shadow-2xl">
                    <div className="aspect-[4/5] sm:aspect-video lg:aspect-[4/5] relative rounded-[2.2rem] overflow-hidden">
                        {infrastructureImage && (
                            <Image 
                                src={infrastructureImage.imageUrl}
                                alt={infrastructureImage.description}
                                fill
                                className="object-cover contrast-[1.1] grayscale-[0.3]"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                 </Card>
            </div>
          </div>
        </section>
    );
}
