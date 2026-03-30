"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { holidays } from "@/lib/holidays";
import { useDeviceTierContext } from "@/hooks/use-device-tier";

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
  const { tier } = useDeviceTierContext();

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

  const showOrbs = tier !== "low";
  const showPulsingOrbs = tier === "high";
  const showGrid = tier !== "low";

  return (
    <>
      <div className="fixed inset-0 -z-50 h-full w-full overflow-hidden bg-background">
          {isSnow && tier !== "low" && <FestiveEffect type="snow" />}
          
          {showGrid && (
            <div className="absolute inset-0 -z-10 h-full w-full opacity-[0.06] dark:opacity-[0.08] hud-grid" />
          )}

          {showOrbs && (
            <>
              <div
                className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
                  opacity: "var(--bg-orb-opacity, 0.04)",
                }}
              />
              <div
                className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgb(6,182,212) 0%, transparent 70%)",
                  opacity: "var(--bg-orb-opacity, 0.03)",
                }}
              />
            </>
          )}

          {showPulsingOrbs && (
            <>
              <div className="absolute top-[30%] right-[10%] w-[350px] h-[350px] rounded-full pointer-events-none opacity-[0.025] dark:opacity-[0.015] animate-[pulse_10s_ease-in-out_infinite]"
                style={{
                  background: "radial-gradient(circle, hsl(var(--kyron-emerald)) 0%, transparent 70%)",
                }}
              />
              <div className="absolute bottom-[20%] left-[15%] w-[250px] h-[250px] rounded-full pointer-events-none opacity-[0.02] dark:opacity-[0.012] animate-[pulse_12s_ease-in-out_infinite_2s]"
                style={{
                  background: "radial-gradient(circle, hsl(var(--kyron-cyan)) 0%, transparent 70%)",
                }}
              />
            </>
          )}

          <div className="hidden dark:block absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
          <div className="hidden dark:block absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/8 to-transparent" />

          <div className="dark:hidden absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.02) 0%, transparent 50%)",
            }}
          />
      </div>
      <SlowConnectionBanner />
    </>
  );
}
