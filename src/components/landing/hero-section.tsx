
'use client';

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, FileText, LucideIcon, ShieldCheck, Users, BrainCircuit } from "lucide-react";
import { Logo } from "../logo";

const featureOrbs: {
  icon: LucideIcon;
  title: string;
}[] = [
  { icon: FileText, title: "Facturación" },
  { icon: Users, title: "Nómina" },
  { icon: ShieldCheck, title: "Cumplimiento" },
  { icon: BrainCircuit, title: "Análisis IA" },
];

const ORB_SIZE = 80;
const ORBIT_RADIUS = 160;

export function HeroSection() {
    const [hoveredOrb, setHoveredOrb] = useState<string | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    return (
        <section className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-background py-20 md:py-0">
            <div className="absolute inset-0 -z-10 h-full w-full">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 z-10 text-center">
                 <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    Gestión Inteligente, Tranquilidad Absoluta
                </motion.h1>
                <motion.p
                    className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground text-balance"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                >
                    Kyron es el ecosistema que automatiza tu fiscalidad, contabilidad y cumplimiento para que te dediques a lo que importa: hacer crecer tu negocio.
                </motion.p>
                <motion.div
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                     initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                >
                    <Button size="lg" asChild className="w-full sm:w-auto text-base btn-3d-primary">
                        <Link href="/register">Comienza Ahora</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-base">
                        <Link href="#servicios">Explorar Servicios <ArrowRight className="ml-2 h-4 w-4"/></Link>
                    </Button>
                </motion.div>
            </div>
            
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] hidden lg:flex items-center justify-center -z-10"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <motion.div
                    className="relative w-full h-full"
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear",
                    }}
                    style={{
                        animationPlayState: isPaused ? 'paused' : 'running'
                    }}
                >
                    {featureOrbs.map((orb, index) => {
                        const angle = (index / featureOrbs.length) * 2 * Math.PI;
                        const x = Math.cos(angle) * ORBIT_RADIUS;
                        const y = Math.sin(angle) * ORBIT_RADIUS;
                        
                        return (
                            <motion.div
                                key={orb.title}
                                className="absolute"
                                style={{
                                    top: `calc(50% - ${ORB_SIZE / 2}px)`,
                                    left: `calc(50% - ${ORB_SIZE / 2}px)`,
                                    transform: `translate(${x}px, ${y}px)`,
                                }}
                                onMouseEnter={() => setHoveredOrb(orb.title)}
                                onMouseLeave={() => setHoveredOrb(null)}
                            >
                                <motion.div
                                     className="w-20 h-20 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center border shadow-md cursor-pointer"
                                     whileHover={{ scale: 1.2 }}
                                     style={{
                                        animation: 'counter-rotate 30s linear infinite',
                                        animationPlayState: isPaused ? 'paused' : 'running'
                                     }}
                                >
                                    <orb.icon className="h-8 w-8 text-primary" />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </motion.div>
                
                <div className="absolute w-40 h-40">
                   <AnimatePresence mode="wait">
                      <motion.div
                        key={hoveredOrb || "logo"}
                        className="w-full h-full flex items-center justify-center text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                         {hoveredOrb ? (
                            <span className="font-bold text-lg text-foreground">{hoveredOrb}</span>
                        ) : (
                            <Logo className="w-20 h-20"/>
                        )}
                       </motion.div>
                   </AnimatePresence>
                </div>
            </div>
            <style jsx>{`
                @keyframes counter-rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                }
            `}</style>
        </section>
    );
}
