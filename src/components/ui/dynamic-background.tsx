
"use client";

import { motion } from "framer-motion";
import { FestiveEffect } from "./confetti-effect";
import { useHoliday } from "@/hooks/use-holiday";
import { Logo } from "@/components/logo";

/**
 * @fileOverview Fondo dinámico optimizado para alto rendimiento.
 * v2.6.5: Mejora de visibilidad del logo en modo claro.
 */
export function DynamicBackground() {
  const { activeHoliday, isHolidayActive } = useHoliday();
  const isSnow = isHolidayActive && activeHoliday?.effect === 'snow';

  return (
    <div className="fixed inset-0 -z-50 h-full w-full overflow-hidden bg-background">
        {isSnow && <FestiveEffect type="snow" />}
        
        {/* Rejilla HUD Adaptativa */}
        <div className="absolute inset-0 -z-10 h-full w-full opacity-[0.1] dark:opacity-15 hud-grid" />

        {/* Logo de Fondo - Opacidad aumentada en modo claro para mayor visibilidad */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[200px] md:max-w-[280px] aspect-square opacity-[0.08] dark:opacity-[0.03] pointer-events-none p-8">
            <motion.div
              animate={{ 
                rotate: 360,
              }}
              transition={{ 
                duration: 180, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="w-full h-full"
            >
              <Logo className="w-full h-full grayscale" />
            </motion.div>
        </div>

        {/* Resplandores dinámicos suaves */}
        <motion.div 
            animate={{ 
                x: [0, 20, 0],
                opacity: [0.02, 0.04, 0.02],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" 
        />
    </div>
  );
}
