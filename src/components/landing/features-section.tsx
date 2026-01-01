
'use client';

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BrainCircuit, GitBranch, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useHoliday } from "@/hooks/use-holiday";
import { cn } from "@/lib/utils";

const features = [
    { title: "Inteligencia Fiscal Predictiva", description: "Nuestra IA analiza cada transacción en tiempo real contra la normativa vigente, identificando y corrigiendo inconsistencias antes de que se conviertan en un problema. Garantizamos un cumplimiento proactivo.", icon: BrainCircuit},
    { title: "Verificación Inmutable (Blockchain)", description: "Sellamos cada registro contable y fiscal en una cadena de bloques. Esto crea una traza de auditoría inmutable, transparente y 100% verificable, eliminando la posibilidad de manipulación.", icon: Lock },
    { title: "Ecosistema de Gestión Unificado", description: "Desde la gestión de un holding hasta la operación de una sucursal, nuestra arquitectura modular se adapta. Activa los módulos que necesites y mantenlos sincronizados en una única plataforma.", icon: GitBranch },
];

export function FeaturesSection() {
    const aboutImage = PlaceHolderImages.find((img) => img.id === "team-meeting-photo");
    const { isHolidayActive } = useHoliday();

    return (
        <section id="caracteristicas" className={cn("py-20 md:py-28", !isHolidayActive && "bg-muted/30")}>
          <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Tecnología que te Da el Control Absoluto</h2>
                <p className="text-lg text-muted-foreground">
                  Fusionamos IA, Blockchain y una arquitectura unificada para ofrecerte un nivel de gestión y seguridad sin precedentes.
                </p>
                <div className="space-y-6">
                    {features.map((feature, index) => (
                    <motion.div 
                        key={feature.title} 
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                        <div className="p-3 bg-primary/10 text-primary rounded-lg mt-1">
                          <feature.icon className="h-6 w-6 shrink-0" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{feature.title}</h4>
                          <p className="text-muted-foreground text-sm">{feature.description}</p>
                        </div>
                    </motion.div>
                    ))}
                </div>
            </motion.div>
             <motion.div 
                className="p-4 md:p-8 rounded-xl flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                 {aboutImage && <Image 
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    data-ai-hint={aboutImage.imageHint}
                    width={600}
                    height={400}
                    className="rounded-xl object-cover shadow-2xl"
                 />}
            </motion.div>
          </div>
        </section>
    );
}
