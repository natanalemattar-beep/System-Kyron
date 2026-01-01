
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FestiveEffect } from "./confetti-effect";
import { holidays, type Holiday } from "@/lib/holidays";

export function DynamicBackground() {
  const [activeHoliday, setActiveHoliday] = useState<Holiday | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const checkHoliday = () => {
        const now = new Date();
        let foundHoliday: Holiday | null = null;

        for (const holiday of holidays) {
            const holidayStartDate = new Date(now.getFullYear(), holiday.month, holiday.day);
            const holidayEndDate = new Date(now.getFullYear(), holiday.month, holiday.day + holiday.duration);
            
            if (now >= holidayStartDate && now < holidayEndDate) {
                foundHoliday = holiday;
                break; 
            }
        }
        setActiveHoliday(foundHoliday);
    };

    checkHoliday(); // Check immediately on mount
    const interval = setInterval(checkHoliday, 1000 * 60 * 60); // Re-check every hour

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isClient]);

  return (
    <div className="fixed inset-0 -z-50 h-full w-full overflow-hidden">
        {isClient && activeHoliday && <FestiveEffect type={activeHoliday.effect} />}
        
        {/* Grid Background */}
        <motion.div 
            className="absolute inset-0 -z-10 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        >
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_0%,#000_100%)]"></div>
        </motion.div>
    </div>
  );
}
