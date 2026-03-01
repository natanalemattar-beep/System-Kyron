
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
        
        {/* Modern Optimized Grid */}
        <div className="absolute inset-0 -z-10 h-full w-full opacity-30">
            <div className="absolute h-full w-full bg-[radial-gradient(#0A2472_1px,transparent_1px)] [background-size:32px_32px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>

        {/* Dynamic Ambient Glows - Optimized Blur and Motion */}
        <motion.div 
            animate={{ 
                x: [0, 30, 0],
                y: [0, -20, 0],
                opacity: [0.3, 0.4, 0.3],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[90px] -translate-y-1/2 pointer-events-none" 
        />
        <motion.div 
            animate={{ 
                x: [0, -30, 0],
                y: [0, 30, 0],
                opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[80px] translate-y-1/2 pointer-events-none" 
        />
    </div>
  );
}
