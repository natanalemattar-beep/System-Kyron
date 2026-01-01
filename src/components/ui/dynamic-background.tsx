
"use client";

import { motion } from "framer-motion";
import { FestiveEffect } from "./confetti-effect";
import { useHoliday } from "@/hooks/use-holiday";

export function DynamicBackground() {
  const { activeHoliday, isHolidayActive } = useHoliday();

  return (
    <div className="fixed inset-0 -z-50 h-full w-full overflow-hidden">
        {isHolidayActive && activeHoliday && <FestiveEffect type={activeHoliday.effect} />}
        
        {/* Grid Background */}
        {!isHolidayActive && (
             <motion.div 
                className="absolute inset-0 -z-10 h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_0%,#000_100%)]"></div>
            </motion.div>
        )}
    </div>
  );
}
