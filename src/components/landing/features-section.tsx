
'use client';

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";
import { Cpu, Shield, BarChart } from "lucide-react";

const features = [
    { title: "Inteligencia Artificial", description: "Conciliación bancaria, análisis predictivo y auditoría en tiempo real para decisiones más inteligentes.", icon: Cpu},
    { title: "Seguridad de Nivel Superior", description: "Tus datos están protegidos con cifrado de extremo a extremo y autenticación de dos factores.", icon: Shield },
    { title: "Análisis y Reportes", description: "Visualiza la salud de tu negocio con dashboards intuitivos y reportes personalizables.", icon: BarChart },
];

export function FeaturesSection() {
    const aboutImage = PlaceHolderImages.find((img) => img.id === "team-meeting-photo");

    return (
        <section id="caracteristicas" className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
                className="space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={{ visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: -20 } }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold">Inteligencia que Impulsa tu Negocio</h2>
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
            </motion.div>
             <motion.div 
                className="p-4 md:p-8 rounded-xl flex items-center justify-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={{ visible: { opacity: 1, scale: 1 }, hidden: { opacity: 0, scale: 0.9 } }}
                transition={{ duration: 0.6 }}
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
