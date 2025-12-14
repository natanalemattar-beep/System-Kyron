
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { HelpCircle, Layers, Sparkles, Bot, ShieldCheck, Banknote, Send, Users, ChevronDown, ArrowRight, ShoppingCart, Briefcase } from "lucide-react";
import dynamic from 'next/dynamic';
import { motion } from "framer-motion";
import type { FC, AnchorHTMLAttributes } from 'react';
import { iaSolutions, securityFeatures } from '@/lib/page-data';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

const SmoothScrollLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, ...props }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = href!.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return <a href={href} onClick={handleClick} {...props} />;
};

const mainModules = [
    { name: "Tecnología IA", href: "/soluciones-ia", icon: Bot },
    { name: "Seguridad Total", href: "/seguridad", icon: ShieldCheck },
    { name: "Gestión de Nómina", href: "/nominas", icon: Briefcase },
    { name: "Facturación Inteligente", href: "/facturacion", icon: ShoppingCart },
]

export function HeroSection() {
    
    return (
        <section className="relative h-dvh flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,hsl(var(--primary)/0.15),transparent)]"></div>
            </div>
            
            <motion.div 
                className="container mx-auto px-4 md:px-6 text-center z-10"
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
                variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: 20 },
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.div
                    variants={{
                        visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6 } },
                        hidden: { opacity: 0, y: 20 },
                    }}
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance text-shadow-glow">
                        La Plataforma Definitiva para la Gestión Empresarial en Venezuela
                    </h1>
                </motion.div>
                <motion.p 
                    className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground text-balance"
                    variants={{
                        visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.6 } },
                        hidden: { opacity: 0, y: 20 },
                    }}
                >
                    Automatización fiscal, contabilidad inteligente y gestión de cumplimiento, todo en un solo lugar. Garantizamos tu tranquilidad para que te enfoques en crecer.
                </motion.p>
                <motion.div 
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                    variants={{
                        visible: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.6 } },
                        hidden: { opacity: 0, y: 20 },
                    }}
                >
                    <Button size="lg" asChild className="w-full sm:w-auto btn-3d-primary text-base">
                        <Link href="/register">Comienza Ahora</Link>
                    </Button>
                    <SmoothScrollLink href="#servicios">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto text-base">
                            Explorar Servicios <ArrowRight className="ml-2 h-4 w-4"/>
                        </Button>
                    </SmoothScrollLink>
                </motion.div>

                <motion.div
                    className="mt-16"
                    variants={{
                        visible: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.6 } },
                        hidden: { opacity: 0, y: 20 },
                    }}
                >
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                        {mainModules.map((module) => (
                             <Link key={module.name} href={module.href} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                <module.icon className="h-5 w-5"/>
                                {module.name}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

             <div className="absolute bottom-10 animate-bounce">
                <SmoothScrollLink href="#servicios">
                    <ChevronDown className="w-8 h-8 text-muted-foreground" />
                </SmoothScrollLink>
            </div>
        </section>
    );
}
