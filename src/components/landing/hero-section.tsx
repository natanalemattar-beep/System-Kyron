
'use client';

import * as React from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Orb } from "@/components/orb";

const SmoothScrollLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, ...props }) => {
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


export function HeroSection() {
    return (
        <section className="relative h-dvh flex items-center justify-center overflow-hidden">
             {/* Background Grid */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-background">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
            </div>

            {/* Central Orb */}
            <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] -z-10"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1]}}
            >
                <Orb />
            </motion.div>
            
            <div className="container mx-auto px-4 md:px-6 z-10 text-center">
                <motion.h1 
                    className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance text-shadow-glow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    La Plataforma Definitiva para la Gestión Empresarial
                </motion.h1>
                <motion.p 
                    className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground text-balance"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    Automatización fiscal, contabilidad inteligente y gestión de cumplimiento, todo en un solo lugar. Garantizamos tu tranquilidad para que te enfoques en crecer.
                </motion.p>
                <motion.div 
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                     initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
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
            </div>

             <motion.div 
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
                 initial={{ opacity: 0, y: -20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 1.2 }}
            >
                <SmoothScrollLink href="#servicios">
                    <ChevronDown className="w-8 h-8 text-muted-foreground" />
                </SmoothScrollLink>
            </motion.div>
        </section>
    );
}
