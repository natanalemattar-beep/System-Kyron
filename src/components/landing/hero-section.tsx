
'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck, Users, BrainCircuit, BarChart, Layers, DollarSign } from "lucide-react";
import { Logo } from "../logo";
import { useState } from "react";
import * as React from "react";

const orbFeatures = [
  { icon: Layers, title: "Gestión Fiscal" },
  { icon: DollarSign, title: "Nómina" },
  { icon: ShieldCheck, title: "Seguridad" },
  { icon: BrainCircuit, title: "Análisis IA" },
  { icon: FileText, title: "Facturación" },
  { icon: Users, title: "RR.HH." },
];

const ORB_SIZE = 400; // The size of the main orb
const ICON_ORB_SIZE = 80; // The size of the feature orbs

export function HeroSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-background py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_0%,#000_100%)]"></div>
      </div>

      <div className="relative flex items-center justify-center" style={{ width: ORB_SIZE, height: ORB_SIZE }}>
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
                  <Logo className="h-20 w-20 mb-4" />
                  <h1 className="text-3xl font-bold">System Kyron</h1>
                </>
              ) : (
                <>
                  {React.createElement(orbFeatures[hoveredIndex].icon, { className: "h-16 w-16 text-primary mb-4" })}
                  <h2 className="text-2xl font-semibold">{orbFeatures[hoveredIndex].title}</h2>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Orbiting Icons */}
        <motion.div
          className="absolute w-full h-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{
            animationPlayState: hoveredIndex !== null ? "paused" : "running",
          }}
        >
          {orbFeatures.map((feature, index) => {
            const angle = (index / orbFeatures.length) * 2 * Math.PI;
            const x = (ORB_SIZE / 2 - ICON_ORB_SIZE / 2) * Math.cos(angle);
            const y = (ORB_SIZE / 2 - ICON_ORB_SIZE / 2) * Math.sin(angle);

            return (
              <motion.div
                key={feature.title}
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  x: x,
                  y: y,
                  rotate: -360, // Counter-rotate the icon container
                }}
                animate={{ rotate: -360 }}
                transition={{
                  duration: 40,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <motion.div
                  className="w-20 h-20 bg-card/50 backdrop-blur-sm border rounded-full flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.2, zIndex: 50, boxShadow: "0 0 20px hsl(var(--primary) / 0.5)" }}
                  transition={{ duration: 0.2 }}
                  style={{
                    animationPlayState: hoveredIndex !== null ? "paused" : "running",
                  }}
                >
                  {React.createElement(feature.icon, { className: "h-8 w-8 text-muted-foreground" })}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      
       <div className="text-center mt-12">
           <motion.p
             className="text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground text-balance"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
           >
             La plataforma definitiva para la gestión empresarial en Venezuela. Automatización fiscal, contabilidad inteligente y cumplimiento normativo, todo en un solo lugar.
           </motion.p>
           <motion.div
             className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.4 }}
           >
             <Button size="lg" asChild className="w-full sm:w-auto text-base">
               <Link href="/register">Comienza Ahora</Link>
             </Button>
             <Button size="lg" variant="ghost" asChild className="w-full sm:w-auto text-base">
               <Link href="#servicios">Explorar Servicios <ArrowRight className="ml-2 h-4 w-4" /></Link>
             </Button>
           </motion.div>
       </div>
    </section>
  );
}
