
"use client";

import { FestiveEffect } from "./confetti-effect";
import { useHoliday } from "@/hooks/use-holiday";

export function DynamicBackground() {
  const { activeHoliday, isHolidayActive } = useHoliday();
  const isSnow = isHolidayActive && activeHoliday?.effect === 'snow';

  return (
    <div className="fixed inset-0 -z-50 h-full w-full overflow-hidden bg-background">
        {isSnow && <FestiveEffect type="snow" />}
        
        <div className="absolute inset-0 -z-10 h-full w-full opacity-[0.06] dark:opacity-[0.08] hud-grid" />

        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.04] dark:opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.03] dark:opacity-[0.02]"
          style={{
            background: "radial-gradient(circle, rgb(6,182,212) 0%, transparent 70%)",
          }}
        />
    </div>
  );
}
