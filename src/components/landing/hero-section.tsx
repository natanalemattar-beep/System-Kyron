
'use client';
import * as React from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, FileText, LucideIcon, ShieldCheck, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

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
                            <Button size="lg" asChild className="w-full sm:w-auto text-base">
                                <Link href="/register">Comienza Ahora</Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-base">
                                 <Link href="#servicios">Explorar Servicios <ArrowRight className="ml-2 h-4 w-4"/></Link>
                            </Button>
                        </div>
                    </motion.div>
                     <motion.div
                        className="grid grid-cols-2 gap-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.2,
                                },
                            },
                        }}
                     >
                         {featureCards.map((feature) => (
                            <motion.div
                                key={feature.title}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                            >
                                <Card className="h-full w-full bg-card/60 backdrop-blur-md shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300">
                                    <CardHeader className="items-center text-center">
                                        <div className="p-3 bg-primary/10 rounded-full mb-3">
                                            <feature.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-base font-semibold">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-center text-xs text-muted-foreground">
                                        <p>{feature.description}</p>
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
