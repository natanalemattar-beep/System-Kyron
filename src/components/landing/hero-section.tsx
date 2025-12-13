
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HelpCircle, Layers, Sparkles, Bot, ShieldCheck, Banknote, Send, Users, ChevronDown } from "lucide-react";
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import type { FC, AnchorHTMLAttributes } from 'react';

// Dynamic import for client-only components
const Orb = dynamic(() => import('@/components/orb').then(mod => mod.Orb), { ssr: false });
import { iaSolutions, securityFeatures } from '@/lib/page-data';
import { CtaSection } from './cta-section';

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


const navModules = [
  { name: "¿Qué es Kyron?", angle: 30, href: "#nosotros", type: 'scroll', icon: HelpCircle },
  { name: "Nuestros Servicios", angle: 75, href: "#servicios", type: 'scroll', icon: Layers },
  { name: "Funciones Clave", angle: 120, href: "#caracteristicas", type: 'scroll', icon: Sparkles },
  { name: "Tecnología IA", angle: 165, href: "/soluciones-ia", type: 'dialog', icon: Bot },
  { name: "Seguridad", angle: 210, href: "/seguridad", type: 'dialog', icon: ShieldCheck },
  { name: "Planes y Precios", angle: 255, href: "/planes-y-precios", type: 'link', icon: Banknote },
  { name: "Contacto Directo", angle: 300, href: "#contacto", type: 'scroll', icon: Send },
  { name: "Conócenos", angle: 345, href: "#nosotros", type: 'scroll', icon: Users },
];

const getModuleDescription = (name: string) => {
    switch (name) {
        case '¿Qué es Kyron?': return "Descubre nuestra misión, visión y el equipo detrás de la plataforma.";
        case 'Nuestros Servicios': return "Explora las soluciones que ofrecemos para tu empresa.";
        case 'Funciones Clave': return "Conoce las características principales que hacen a Kyron único.";
        case 'Tecnología IA': return "Ve cómo la IA puede automatizar y potenciar tu negocio.";
        case 'Seguridad': return "Aprende sobre nuestras capas de seguridad para proteger tus datos.";
        case 'Planes y Precios': return "Encuentra el plan perfecto que se ajusta a tus necesidades.";
        case 'Contacto Directo': return "Comunícate con nuestro equipo para más información.";
        case 'Conócenos': return "Nuestra historia y los valores que nos impulsan.";
        default: return "Accede al módulo especializado.";
    }
};

const IaContent = () => (
     <>
        <DialogHeader>
          <DialogTitle>Soluciones con Inteligencia Artificial</DialogTitle>
          <DialogDescription>Automatiza tareas, obtén análisis y toma decisiones más rápidas.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            {iaSolutions.map(solution => (
                <Card key={solution.title} className="bg-secondary/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-base">
                            <solution.icon className="h-5 w-5 text-primary"/>
                            {solution.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{solution.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
        <DialogFooter>
            <Button asChild>
                <Link href="/soluciones-ia">Explorar todas las soluciones de IA <ArrowRight className="ml-2 h-4 w-4"/></Link>
            </Button>
        </DialogFooter>
    </>
);

const SecurityContent = () => (
    <>
        <DialogHeader>
          <DialogTitle>Seguridad Garantizada</DialogTitle>
          <DialogDescription>Tu tranquilidad es nuestra prioridad. Conoce nuestras capas de protección.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            {securityFeatures.map(feature => (
                <Card key={feature.title} className="bg-secondary/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-base">
                            <feature.icon className="h-5 w-5 text-primary"/>
                            {feature.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
        <DialogFooter>
            <Button asChild>
                <Link href="/seguridad">Administrar mi seguridad <ArrowRight className="ml-2 h-4 w-4"/></Link>
            </Button>
        </DialogFooter>
    </>
);

const ModuleOrb = ({ module, onMouseEnter, onMouseLeave, isMobile }: { module: typeof navModules[0], onMouseEnter: () => void, onMouseLeave: () => void, isMobile: boolean }) => {
    const radius = isMobile ? 130 : 190;
    const motionProps = {
        className: "absolute w-28 h-12 bg-card/80 backdrop-blur-md border rounded-full flex items-center justify-center p-2 cursor-pointer",
        style: { 
            transform: `rotate(${module.angle}deg) translateX(${radius}px) rotate(-${module.angle}deg)`,
            transformOrigin: 'center',
        },
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
    };
    
    const content = (
        <motion.div
            className="flex items-center gap-2 text-center w-full h-full justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
            <module.icon className="h-4 w-4 text-primary shrink-0" />
            <p className="text-xs font-semibold text-foreground leading-tight">{module.name}</p>
        </motion.div>
    );

    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
                 whileHover={{ boxShadow: '0 0 25px hsl(var(--primary) / 0.5)' }}
                 className="rounded-full"
            >
             {children}
            </motion.div>
        </div>
    );

    if (module.type === 'scroll') {
        return (
            <Wrapper>
                <SmoothScrollLink href={module.href}>
                    <motion.div {...motionProps}>{content}</motion.div>
                </SmoothScrollLink>
            </Wrapper>
        );
    }
    if (module.type === 'dialog') {
        return (
            <Wrapper>
                <Dialog>
                    <DialogTrigger asChild>
                        <motion.div {...motionProps}>{content}</motion.div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl">
                        {module.name === 'Tecnología IA' && <IaContent />}
                        {module.name === 'Seguridad' && <SecurityContent />}
                    </DialogContent>
                </Dialog>
            </Wrapper>
        );
    }
    
    return (
        <Wrapper>
            <Link href={module.href} passHref>
                 <motion.div {...motionProps}>{content}</motion.div>
            </Link>
        </Wrapper>
    );
};
ModuleOrb.displayName = 'ModuleOrb';

export function HeroSection() {
    const [hoveredModule, setHoveredModule] = useState<{name: string, description: string} | null>(null);
    const isMobile = useIsMobile();

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,hsl(var(--primary)/0.15),transparent)]"></div>
            </div>
            
            <div className="relative grid w-full h-full place-items-center">
                <div className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full animate-spin [animation-duration:40s] [animation-direction:reverse]"></div>
                <div className="absolute w-[90%] h-[90%] border border-dashed border-primary/20 rounded-full animate-spin [animation-duration:30s]"></div>
                
                <div className="absolute z-10 grid place-items-center w-64 h-64 text-center">
                    <AnimatePresence mode="wait">
                         <motion.div
                            key={hoveredModule ? hoveredModule.name : 'kyron'}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            className="w-full"
                         >
                             {hoveredModule ? (
                                <div className="p-4">
                                    <h2 className="text-xl font-bold text-primary">{hoveredModule.name}</h2>
                                    <p className="text-muted-foreground text-sm max-w-xs">{hoveredModule.description}</p>
                                </div>
                                ) : (
                                <div className="flex flex-col items-center">
                                    <h1 className="text-6xl font-bold text-shadow-glow">Kyron</h1>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
                
                {navModules.map((module) => (
                    <ModuleOrb
                        key={module.name}
                        module={module}
                        onMouseEnter={() => setHoveredModule({ name: module.name, description: getModuleDescription(module.name) })}
                        onMouseLeave={() => setHoveredModule(null)}
                        isMobile={isMobile}
                    />
                ))}
                 <div className="absolute bottom-10 animate-bounce">
                    <ChevronDown className="w-8 h-8 text-muted-foreground" />
                </div>
            </div>
        </section>
    );
}
