
'use client';
import * as React from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, FileText, LucideIcon, ShieldCheck, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "../ui/card";

const featureCards: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: FileText,
    title: "Gestión Fiscal",
    description: "Facturación, IVA, ISLR. Todo bajo control.",
  },
  {
    icon: Users,
    title: "Nómina y RR.HH.",
    description: "Calcula y gestiona la nómina y beneficios sin errores.",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad y Cumplimiento",
    description: "Garantiza el cumplimiento normativo y la seguridad de tus datos.",
  },
  {
    icon: BarChart,
    title: "Análisis y Reportes",
    description: "Visualiza la salud de tu negocio con dashboards inteligentes.",
  },
];

export function HeroSection() {
    const [featureIndex, setFeatureIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setFeatureIndex((prevIndex) => (prevIndex + 1) % featureCards.length);
        }, 3000); // Change card every 3 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-background">
            <div className="absolute inset-0 -z-10 h-full w-full">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        className="text-center lg:text-left"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                            La Plataforma Definitiva para la Gestión Empresarial en Venezuela
                        </h1>
                        <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 text-muted-foreground text-balance">
                            Automatización fiscal, contabilidad inteligente y gestión de cumplimiento, todo en un solo lugar. Garantizamos tu tranquilidad para que te enfoques en crecer.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Button size="lg" asChild className="w-full sm:w-auto btn-3d-primary text-base">
                                <Link href="/register">Comienza Ahora</Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-base">
                                 <Link href="#servicios">Explorar Servicios <ArrowRight className="ml-2 h-4 w-4"/></Link>
                            </Button>
                        </div>
                    </motion.div>
                     <motion.div
                        className="relative h-96 w-full max-w-md mx-auto lg:max-w-none"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                     >
                         {featureCards.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                className="absolute inset-0"
                                initial={{ opacity: 0, scale: 0.9, rotateY: -30 }}
                                animate={{
                                    opacity: index === featureIndex ? 1 : 0,
                                    scale: index === featureIndex ? 1 : 0.9,
                                    rotateY: index === featureIndex ? 0 : 30,
                                    zIndex: index === featureIndex ? 10 : 1,
                                }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                <Card className="h-full w-full flex flex-col items-center justify-center bg-card/80 backdrop-blur-md shadow-2xl">
                                    <CardHeader className="items-center text-center">
                                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                                            {React.createElement(feature.icon, { className: "h-10 w-10 text-primary" })}
                                        </div>
                                        <h3 className="text-xl font-semibold">{feature.title}</h3>
                                    </CardHeader>
                                    <CardContent className="text-center">
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
