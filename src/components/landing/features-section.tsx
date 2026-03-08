'use client';

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BrainCircuit, GitBranch, Lock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useHoliday } from "@/hooks/use-holiday";
import { cn } from "@/lib/utils";

const features = [
    { 
        title: "Inteligencia Fiscal Predictiva", 
        description: "Nuestra IA analiza cada transacción en tiempo real contra la normativa vigente, garantizando un cumplimiento proactivo.", 
        icon: BrainCircuit,
        ref: "PROTOCOLO_IA"
    },
    { 
        title: "Verificación Inmutable (Blockchain)", 
        description: "Sellamos cada registro contable y fiscal en una cadena de bloques, eliminando la posibilidad de manipulación.", 
        icon: Lock,
        ref: "LEDGER_SECURE"
    },
    { 
        title: "Arquitectura Unificada", 
        description: "Diseño modular que escala desde una PYME hasta un Holding internacional sin pérdida de integridad.", 
        icon: GitBranch,
        ref: "CORE_SCALABLE"
    },
];

export function FeaturesSection() {
    const infrastructureImage = PlaceHolderImages.find((img) => img.id === "corporate-infrastructure");
    const { isHolidayActive } = useHoliday();

    return (
        <section id="caracteristicas" className={cn(
            "py-20 md:py-32 rounded-[3rem] md:rounded-[4rem] relative overflow-hidden", 
            !isHolidayActive && "bg-white/[0.01] border border-white/5", 
            isHolidayActive && "bg-background/80 backdrop-blur-lg"
        )}>
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <motion.div 
                className="space-y-12"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
            >
                <div className="space-y-6 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-[8px] font-black uppercase tracking-[0.3em] text-secondary">
                        <ShieldCheck className="h-3 w-3" /> Cero Riesgo Absoluto
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase italic leading-tight">Control <span className="text-primary not-italic">Sistémico</span></h2>
                    <p className="text-sm md:text-base text-white/40 font-bold uppercase tracking-widest leading-relaxed max-w-lg mx-auto lg:ml-0 italic">
                      Fusionamos IA predictiva y Blockchain para ofrecer una gestión de grado institucional.
                    </p>
                </div>

                <div className="space-y-8">
                    {features.map((feature, index) => (
                    <motion.div 
                        key={feature.title} 
                        className="flex flex-col sm:flex-row items-center lg:items-start gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all group"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                        <div className="p-4 bg-primary/10 text-primary rounded-2xl shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                          <feature.icon className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 justify-center sm:justify-start">
                            <h4 className="font-black text-sm md:text-base uppercase tracking-tight italic text-white/90">{feature.title}</h4>
                            <span className="text-[7px] font-black text-primary/40 uppercase tracking-[0.2em]">{feature.ref}</span>
                          </div>
                          <p className="text-xs text-white/40 font-medium leading-relaxed text-center sm:text-left uppercase">{feature.description}</p>
                        </div>
                    </motion.div>
                    ))}
                </div>
            </motion.div>

             <motion.div 
                className="relative p-2 md:p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                 <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full opacity-30" />
                 <Card className="relative glass-card border-none p-2 rounded-[3.5rem] bg-white/[0.03] overflow-hidden shadow-2xl">
                    <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden">
                        {infrastructureImage && (
                            <Image 
                                src={infrastructureImage.imageUrl}
                                alt={infrastructureImage.description}
                                data-ai-hint={infrastructureImage.imageHint}
                                fill
                                className="object-cover contrast-[1.1] grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute top-10 right-10 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 text-center">
                            <p className="text-[10px] font-black text-primary uppercase mb-1">STABILITY_NODE</p>
                            <p className="text-2xl font-black text-white italic tracking-tighter">100%</p>
                        </div>
                    </div>
                 </Card>
            </motion.div>
          </div>
        </section>
    );
}