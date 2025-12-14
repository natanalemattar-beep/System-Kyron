
'use client';

import { useState, useEffect, FC, AnchorHTMLAttributes } from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Layers, Bot, ShieldCheck, Briefcase, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

const featureCards = [
    { title: "Gestión Fiscal Automatizada", icon: Layers, description: "Declaraciones y cumplimiento sin errores." },
    { title: "Análisis Financiero con IA", icon: Bot, description: "Decisiones inteligentes basadas en datos." },
    { title: "Seguridad y Cumplimiento", icon: ShieldCheck, description: "Protección total para tu información." },
    { title: "Nómina y RR.HH. Simplificado", icon: Briefcase, description: "Administra tu equipo de forma eficiente." },
];

const cardVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
      zIndex: 1,
    };
  },
  center: {
    zIndex: 3,
    x: 0,
    opacity: 1,
    scale: 1,
  },
   centerSecond: {
    zIndex: 2,
    x: 0,
    opacity: 0.7,
    scale: 0.9,
    y: 30,
  },
  exit: (direction: number) => {
    return {
      zIndex: 1,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
    };
  },
};


export function HeroSection() {
    const [[page, direction], setPage] = useState([0, 0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPage(([prevPage]) => [prevPage + 1, 1]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const featureIndex = page % featureCards.length;

    return (
        <section className="relative h-dvh flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,hsl(var(--primary)/0.15),transparent)]"></div>
            </div>
            
            <div className="container mx-auto px-4 md:px-6 z-10 grid lg:grid-cols-2 gap-12 items-center">
                <motion.div 
                    className="text-center lg:text-left"
                    initial="hidden"
                    animate="visible"
                    viewport={{ once: true }}
                    variants={{
                        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
                        hidden: { opacity: 0, y: 20 },
                    }}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance text-shadow-glow">
                        La Plataforma Definitiva para la Gestión Empresarial
                    </h1>
                    <p className="mt-6 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 text-muted-foreground text-balance">
                        Automatización fiscal, contabilidad inteligente y gestión de cumplimiento, todo en un solo lugar. Garantizamos tu tranquilidad para que te enfoques en crecer.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <Button size="lg" asChild className="w-full sm:w-auto btn-3d-primary text-base">
                            <Link href="/register">Comienza Ahora</Link>
                        </Button>
                        <SmoothScrollLink href="#servicios">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base">
                                Explorar Servicios <ArrowRight className="ml-2 h-4 w-4"/>
                            </Button>
                        </SmoothScrollLink>
                    </div>
                </motion.div>

                <motion.div 
                    className="relative h-80 hidden lg:flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                >
                    <AnimatePresence initial={false} custom={direction}>
                         <motion.div
                            key={page + 1}
                            className="absolute w-full h-full"
                            custom={direction}
                            variants={cardVariants}
                            initial="enter"
                            animate="centerSecond"
                            exit="exit"
                            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                        >
                            <Card className="w-full max-w-sm mx-auto h-full bg-card/60 backdrop-blur-lg border-white/10 shadow-xl">
                                <CardHeader className="items-center text-center">
                                    <div className="p-3 bg-background/50 rounded-full mb-2">
                                        {React.createElement(featureCards[(featureIndex + 1) % featureCards.length].icon, { className: "h-8 w-8 text-muted-foreground" })}
                                    </div>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <CardTitle>{featureCards[(featureIndex + 1) % featureCards.length].title}</CardTitle>
                                    <p className="text-muted-foreground text-sm mt-2">{featureCards[(featureIndex + 1) % featureCards.length].description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                        <motion.div
                            key={page}
                            className="absolute w-full h-full"
                            custom={direction}
                            variants={cardVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                        >
                            <Card className="w-full max-w-sm mx-auto h-full bg-card/80 backdrop-blur-xl border-primary/50 shadow-2xl">
                                <CardHeader className="items-center text-center">
                                    <div className="p-4 bg-primary/10 rounded-full mb-2">
                                        {React.createElement(featureCards[featureIndex].icon, { className: "h-10 w-10 text-primary" })}
                                    </div>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <CardTitle className="text-xl">{featureCards[featureIndex].title}</CardTitle>
                                    <p className="text-muted-foreground text-sm mt-2">{featureCards[featureIndex].description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <SmoothScrollLink href="#servicios">
                    <ChevronDown className="w-8 h-8 text-muted-foreground" />
                </SmoothScrollLink>
            </div>
        </section>
    );
}

