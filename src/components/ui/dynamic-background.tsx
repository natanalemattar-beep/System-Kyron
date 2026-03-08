
"use client";

import { motion } from "framer-motion";
import { FestiveEffect } from "./confetti-effect";
import { useHoliday } from "@/hooks/use-holiday";
import { Logo } from "@/components/logo";

/**
 * @fileOverview Fondo dinámico con marca de agua sutil.
 * El logo actúa como un detalle técnico rotatorio refinado.
 */
export function DynamicBackground() {
  const { activeHoliday, isHolidayActive } = useHoliday();
  const isSnow = isHolidayActive && activeHoliday?.effect === 'snow';

  return (
    <div className="fixed inset-0 -z-50 h-full w-full overflow-hidden bg-background gpu-accelerated">
        {isSnow && <FestiveEffect type="snow" />}
        
        {/* Rejilla HUD sutil */}
        <div className="absolute inset-0 -z-10 h-full w-full opacity-20 hud-grid [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)]" />

        {/* Logo de Fondo Refinado (Pequeño y rotatorio) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[180px] md:max-w-[240px] aspect-square opacity-[0.03] dark:opacity-[0.05] pointer-events-none p-8">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                rotate: { duration: 120, repeat: Infinity, ease: "linear" },
                scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-full h-full"
            >
              <Logo className="w-full h-full grayscale opacity-50" />
            </motion.div>
        </div>

        {/* Resplandores ambientales dinámicos */}
        <motion.div 
            animate={{ 
                x: [0, 30, 0],
                y: [0, -20, 0],
                opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" 
        />
    </div>
  );
}
