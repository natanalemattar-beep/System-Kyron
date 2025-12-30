
'use client';

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BrainCircuit, Shield, GitBranch } from "lucide-react";

const features = [
    { title: "Auditoría con IA y Cero Riesgo Fiscal", description: "Utilizamos IA para una auditoría continua y predictiva, garantizando un 100% de cumplimiento con el SENIAT y eliminando el riesgo de multas.", icon: BrainCircuit},
    { title: "Seguridad de Grado Bancario", description: "Tus datos están protegidos con cifrado de extremo a extremo, autenticación de dos factores y una arquitectura de nube robusta y segura.", icon: Shield },
    { title: "Ecosistema Modular e Integrado", description: "Desde contabilidad y nómina hasta ventas y legal. Activa los módulos que necesitas y escala tu operación sin fricciones.", icon: GitBranch },
];

export function FeaturesSection() {
    const aboutImage = PlaceHolderImages.find((img) => img.id === "team-meeting-photo");

    return (
        <section id="caracteristicas" className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div 
                className="space-y-6"
            >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Inteligencia que Impulsa tu Negocio</h2>
                <p className="text-lg text-muted-foreground">
                  Nuestra plataforma integra tecnologías de vanguardia para darte una ventaja competitiva.
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
