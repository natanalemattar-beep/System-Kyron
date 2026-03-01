
"use client";

import { motion } from "framer-motion";
import { FestiveEffect } from "./confetti-effect";
import { useHoliday } from "@/hooks/use-holiday";

export function DynamicBackground() {
  const { activeHoliday, isHolidayActive } = useHoliday();

  const isSnow = isHolidayActive && activeHoliday?.effect === 'snow';

  return (
    <div className="fixed inset-0 -z-50 h-full w-full overflow-hidden bg-background">
        {isSnow && <FestiveEffect type="snow" />}
        
        {/* Modern Animated Grid */}
        <motion.div 
            className="absolute inset-0 -z-10 h-full w-full opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 2 }}
        >
            <div className="absolute h-full w-full bg-[radial-gradient(#0A2472_1px,transparent_1px)] [background-size:32px_32px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </motion.div>

        {/* Dynamic Ambient Glows with Motion */}
        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 50, 0],
                y: [0, -30, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2" 
        />
        <motion.div 
            animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
                x: [0, -40, 0],
                y: [0, 40, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2" 
        />
    </div>
  );
}
