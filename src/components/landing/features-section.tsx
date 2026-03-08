
'use client';

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BrainCircuit, GitBranch, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useHoliday } from "@/hooks/use-holiday";
import { cn } from "@/lib/utils";

const features = [
    { title: "Inteligencia Fiscal Predictiva", description: "Nuestra IA analiza cada transacción en tiempo real contra la normativa vigente, garantizando un cumplimiento proactivo.", icon: BrainCircuit},
    { title: "Verificación Inmutable (Blockchain)", description: "Sellamos cada registro contable y fiscal en una cadena de bloques, eliminando la posibilidad de manipulación.", icon: Lock },
    { title: "Ecosistema de Gestión Unificado", description: "Arquitectura modular que se adapta a cualquier escala, manteniendo la sincronización en una única plataforma.", icon: GitBranch },
];

export function FeaturesSection() {
    const aboutImage = PlaceHolderImages.find((img) => img.id === "team-meeting-photo");
    const { isHolidayActive } = useHoliday();

    return (
        <section id="caracteristicas" className={cn("py-16 md:py-28 rounded-[2.5rem] md:rounded-[4rem]", !isHolidayActive && "bg-muted/10", isHolidayActive && "bg-background/80 backdrop-blur-lg")}>
          <div className="container mx-auto px-4 md:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
            >
                <div className="space-y-4 text-center lg:text-left">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase italic leading-tight">Control <span className="text-primary not-italic">Absoluto</span></h2>
                    <p className="text-base md:text-lg text-muted-foreground font-medium max-w-lg mx-auto lg:ml-0">
                      Fusionamos IA, Blockchain y una arquitectura unificada para ofrecerte un nivel de gestión sin precedentes.
                    </p>
                </div>
                <div className="space-y-6">
                    {features.map((feature, index) => (
                    <motion.div 
                        key={feature.title} 
                        className="flex flex-col sm:flex-row items-center lg:items-start gap-4 text-center sm:text-left p-4 rounded-2xl hover:bg-white/5 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                        <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                          <feature.icon className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-black text-sm md:text-base uppercase tracking-tight italic">{feature.title}</h4>
                          <p className="text-muted-foreground text-xs md:text-sm font-medium leading-relaxed">{feature.description}</p>
                        </div>
                    </motion.div>
                    ))}
                </div>
            </motion.div>
             <motion.div 
                className="relative p-2 md:p-4 rounded-3xl flex items-center justify-center overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                 <div className="absolute inset-0 border-[10px] border-primary/5 rounded-[2.5rem] md:rounded-[3rem] pointer-events-none" />
                 {aboutImage && <Image 
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    data-ai-hint={aboutImage.imageHint}
                    width={600}
                    height={400}
                    className="rounded-2xl md:rounded-[2rem] object-cover shadow-2xl scale-105"
                 />}
            </motion.div>
          </div>
        </section>
    );
}
