
'use client';

import { useState, useEffect } from "react";
import { holidays, type Holiday } from "@/lib/holidays";

export function useHoliday() {
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

    checkHoliday();
    const interval = setInterval(checkHoliday, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, [isClient]);

  return { activeHoliday, isHolidayActive: !!activeHoliday };
}
