"use client";

import { motion } from "framer-motion";
import { FestiveEffect } from "./confetti-effect";
import { useHoliday } from "@/hooks/use-holiday";

export function DynamicBackground() {
  const { activeHoliday, isHolidayActive } = useHoliday();

  const isSnow = isHolidayActive && activeHoliday?.effect === 'snow';

  return (
    <div className="fixed inset-0 -z-50 h-full w-full overflow-hidden bg-background gpu-accelerated">
        {isSnow && <FestiveEffect type="snow" />}
        
        {/* Rejilla HUD optimizada */}
        <div className="absolute inset-0 -z-10 h-full w-full opacity-50 hud-grid [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)]" />

        {/* Resplandores ambientales dinámicos */}
        <motion.div 
            animate={{ 
                x: [0, 40, 0],
                y: [0, -30, 0],
                opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" 
        />
        <motion.div 
            animate={{ 
                x: [0, -40, 0],
                y: [0, 30, 0],
                opacity: [0.05, 0.15, 0.05],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 pointer-events-none" 
        />
    </div>
  );
}