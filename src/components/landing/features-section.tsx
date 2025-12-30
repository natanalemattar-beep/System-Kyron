
'use client';

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BrainCircuit, GitBranch, Lock } from "lucide-react";

const features = [
    { title: "Inteligencia Fiscal Predictiva", description: "Nuestra IA analiza patrones y cambios normativos para anticipar riesgos fiscales, asegurando un cumplimiento proactivo y evitando sanciones antes de que ocurran.", icon: BrainCircuit},
    { title: "Ecosistema de Gestión Unificado", description: "Controla un holding completo desde una sola interfaz. Consolida finanzas, comparte datos entre empresas y mantén una visión 360° de todo tu grupo.", icon: GitBranch },
    { title: "Verificación Inmutable con Blockchain", description: "Cada transacción y documento fiscal se sella en una cadena de bloques privada, creando un registro de auditoría incorruptible y 100% verificable.", icon: Lock },
];

export function FeaturesSection() {
    const aboutImage = PlaceHolderImages.find((img) => img.id === "team-meeting-photo");

    return (
        <section id="caracteristicas" className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div 
                className="space-y-6"
            >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Tecnología que te Da el Control Absoluto</h2>
                <p className="text-lg text-muted-foreground">
                  Fusionamos IA, Blockchain y una arquitectura unificada para ofrecerte un nivel de gestión y seguridad sin precedentes.
                </p>
                <div className="space-y-6">
                    {features.map((feature) => (
                    <div key={feature.title} className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 text-primary rounded-lg mt-1">
                          <feature.icon className="h-6 w-6 shrink-0" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{feature.title}</h4>
                          <p className="text-muted-foreground text-sm">{feature.description}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
             <div 
                className="p-4 md:p-8 rounded-xl flex items-center justify-center"
            >
                 {aboutImage && <Image 
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    data-ai-hint={aboutImage.imageHint}
                    width={600}
                    height={400}
                    className="rounded-xl object-cover shadow-2xl"
                 />}
            </div>
          </div>
        </section>
    );
}
