"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { holidays } from "@/lib/holidays";

const FestiveEffect = dynamic(
  () => import("./confetti-effect").then(m => ({ default: m.FestiveEffect })),
  { ssr: false }
);

const SlowConnectionBanner = dynamic(
  () => import("./slow-connection-banner").then(m => ({ default: m.SlowConnectionBanner })),
  { ssr: false }
);

export function DynamicBackground() {
  const [isSnow, setIsSnow] = useState(false);

  useEffect(() => {
    const now = new Date();
    for (const holiday of holidays) {
      const start = new Date(now.getFullYear(), holiday.month, holiday.day);
      const end = new Date(now.getFullYear(), holiday.month, holiday.day + holiday.duration);
      if (now >= start && now < end && holiday.effect === 'snow') {
        setIsSnow(true);
        break;
      }
    }
  }, []);

  return (
    <>
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
      <SlowConnectionBanner />
    </>
  );
}
