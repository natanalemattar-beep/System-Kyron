
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FestiveEffect } from "./confetti-effect";
import { holidays, type Holiday } from "@/lib/holidays";

export function DynamicBackground() {
  const [activeHoliday, setActiveHoliday] = useState<Holiday | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, ensuring window and other browser-specific APIs are available.
    setIsClient(true);
    
    // Logic to determine the current holiday
    const now = new Date();
    
    // --- TEMPORARY FOR DEMONSTRATION ---
    // This forces the Christmas holiday to be active so you can see the effect.
    const currentHoliday = holidays.find(h => h.name === "Navidad") || null;
    setActiveHoliday(currentHoliday);
    // --- END TEMPORARY ---

    /*
    // Original logic to be restored later:
    const currentMonth = now.getMonth();
    const currentDay = now.getDate();

    for (const holiday of holidays) {
        const holidayEndDate = new Date(now.getFullYear(), holiday.month, holiday.day + holiday.duration - 1);
        const holidayStartDate = new Date(now.getFullYear(), holiday.month, holiday.day);

        if (now >= holidayStartDate && now <= holidayEndDate) {
            setActiveHoliday(holiday);
            break; // Found an active holiday, no need to check further
        }
    }
    */
    
  }, []); // Empty dependency array ensures this runs once on mount.

  return (
    <div className="fixed inset-0 -z-50 h-full w-full overflow-hidden">
        {isClient && activeHoliday && <FestiveEffect type={activeHoliday.effect} />}
        <motion.div 
            className="absolute inset-0 -z-10 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        >
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_0%,#000_100%)]"></div>
        </motion.div>
         <motion.div
            className="absolute inset-0 -z-20"
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
        >
            <motion.div
                className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,hsl(var(--primary)/0.1),rgba(255,255,255,0))] animate-[pulse_8s_infinite]"
                animate={{
                    x: [0, 100, 0, -100, 0],
                    y: [0, -50, 50, 0, 0],
                    scale: [1, 1.1, 1, 0.9, 1],
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle_farthest-side,hsl(var(--primary)/0.05),rgba(255,255,255,0))] animate-[pulse_10s_infinite_2s]"
                  animate={{
                    x: [0, -80, 0, 80, 0],
                    y: [0, 60, -40, 0, 0],
                    scale: [1, 1.2, 1, 1.1, 1],
                }}
                 transition={{
                    duration: 50,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut"
                }}
            />
        </motion.div>
    </div>
  );
}
