
'use client';

import { useState, useEffect, useRef } from "react";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Layers, ShoppingCart, ShieldCheck, Briefcase, GitBranch, Megaphone } from "lucide-react";
import { Logo } from "../logo";
import { useIsMobile } from "@/hooks/use-mobile";
import { useHoliday } from "@/hooks/use-holiday";
import { cn } from "@/lib/utils";
import { FestiveEffect } from "../ui/confetti-effect";

const orbFeatures = [
  { icon: Layers, title: "Contabilidad y Finanzas" },
  { icon: ShoppingCart, title: "Ventas y Facturación" },
  { icon: ShieldCheck, title: "Cumplimiento Fiscal" },
  { icon: Briefcase, title: "Talento Humano" },
  { icon: GitBranch, title: "Gestión Corporativa" },
  { icon: Megaphone, title: "Asesoría Estratégica" },
];

const ORB_SIZE = 400;
const ICON_ORB_SIZE = 80;

const ORB_SIZE_MOBILE = 280;
const ICON_ORB_SIZE_MOBILE = 60;


export function HeroSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const isMobile = useIsMobile();
  const { activeHoliday, isHolidayActive } = useHoliday();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [animationStep, setAnimationStep] = useState(0); // 0: Start, 1: Message, 2: Year
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isHolidayActive && activeHoliday?.name === "Año Nuevo") {
      const timer1 = setTimeout(() => setAnimationStep(1), 500); // Start with message
      const timer2 = setTimeout(() => setAnimationStep(2), 4000); // Switch to year
      const timer3 = setTimeout(() => setAnimationStep(3), 8000); // End animation
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
        setAnimationStep(0);
    }
  }, [isHolidayActive, activeHoliday]);


  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
    }
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
        setHoveredIndex(null);
    }, 5000); // Persist for 5 seconds
  };
  
  const currentOrbSize = isClient && isMobile ? ORB_SIZE_MOBILE : ORB_SIZE;
  const currentIconOrbSize = isClient && isMobile ? ICON_ORB_SIZE_MOBILE : ICON_ORB_SIZE;
  
  const isFireworks = isHolidayActive && activeHoliday?.effect === 'fireworks';
  const showHolidayAnimation = isFireworks && animationStep > 0 && animationStep < 3;


  return (
    <section id="inicio" className={cn(
        "relative min-h-dvh flex flex-col items-center justify-center overflow-hidden py-24 sm:py-32",
        !isHolidayActive && "bg-muted/30",
        isHolidayActive && "bg-transparent"
    )}>
      {isHolidayActive && <FestiveEffect type={activeHoliday.effect} />}
      
      <AnimatePresence mode="wait">
        {showHolidayAnimation ? (
            <motion.div
                key="holiday-message"
                className="text-center text-white/90"
                style={{ textShadow: '0 0 20px rgba(255,255,255,0.7)' }}
            >
              <AnimatePresence mode="wait">
                {animationStep === 1 && (
                    <motion.h2
                        key="message"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-bold"
                    >
                        ¡Feliz Año Nuevo!
                    </motion.h2>
                )}
                 {animationStep === 2 && (
                    <motion.p
                        key="year"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-8xl md:text-9xl font-extrabold"
                    >
                        {currentYear}
                    </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
        ) : (
            <motion.div 
                key="default-content"
                className="w-full h-full flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: animationStep === 3 ? 0.5 : 0 }}
            >
                <div className="relative flex items-center justify-center" style={{ width: currentOrbSize, height: currentOrbSize }}>
                    {/* Central Logo and Text */}
                    <motion.div
                    className="absolute z-10 flex flex-col items-center text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    >
                    <AnimatePresence mode="wait">
                        <motion.div
                        key={hoveredIndex === null ? 'default' : hoveredIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col items-center"
                        >
                        {hoveredIndex === null ? (
                            <>
                            <Logo className="h-16 w-16 sm:h-20 sm:w-20 mb-4" />
                            <h1 className="text-2xl sm:text-3xl font-bold">System Kyron</h1>
                            </>
                        ) : (
                            <>
                            {React.createElement(orbFeatures[hoveredIndex].icon, { className: "h-12 w-12 sm:h-16 sm:w-16 text-primary mb-4" })}
                            <h2 className="text-xl sm:text-2xl font-semibold">{orbFeatures[hoveredIndex].title}</h2>
                            </>
                        )}
                        </motion.div>
                    </AnimatePresence>
                    </motion.div>

                    {/* Static Icons */}
                    <div className="absolute w-full h-full">
                        {isClient && orbFeatures.map((feature, index) => {
                            const angle = (index / orbFeatures.length) * 2 * Math.PI;
                            const x = (currentOrbSize / 2) * Math.cos(angle);
                            const y = (currentOrbSize / 2) * Math.sin(angle);

                            return (
                            <motion.div
                                key={feature.title}
                                className="absolute"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    x: x - currentIconOrbSize / 2,
                                    y: y - currentIconOrbSize / 2,
                                }}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <motion.div
                                    className={cn(
                                        "border rounded-full flex items-center justify-center cursor-pointer",
                                        isHolidayActive ? "bg-card/50 backdrop-blur-sm" : "bg-card"
                                    )}
                                    style={{ width: currentIconOrbSize, height: currentIconOrbSize }}
                                    whileHover={{ scale: 1.2, zIndex: 50, boxShadow: "0 0 20px hsl(var(--primary) / 0.5)" }}
                                    transition={{ duration: 0.2 }}
                                >
                                {React.createElement(feature.icon, { className: "h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" })}
                                </motion.div>
                            </motion.div>
                            );
                        })}
                    </div>
                </div>
        
                <div className="text-center mt-12 px-4 z-20">
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        >
                        Tu Centro de Mando Empresarial
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground text-balance mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Automatización fiscal, contabilidad inteligente y cumplimiento normativo en una única plataforma diseñada para la tranquilidad del empresario venezolano.
                    </motion.p>
                    <motion.div
                        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Button size="lg" asChild className="w-full sm:w-auto text-base btn-3d-primary">
                        <Link href="/register">Comienza Ahora</Link>
                        </Button>
                        <Button size="lg" variant="ghost" asChild className="w-full sm:w-auto text-base">
                        <Link href="#servicios">Explorar Servicios <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
