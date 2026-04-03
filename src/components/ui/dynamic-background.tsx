"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { holidays } from "@/lib/holidays";
import { useDeviceTierContext } from "@/hooks/use-device-tier";

const FestiveEffect = lazy(() => import("./confetti-effect").then(m => ({ default: m.FestiveEffect })));
const SlowConnectionBanner = lazy(() => import("./slow-connection-banner").then(m => ({ default: m.SlowConnectionBanner })));

export function DynamicBackground() {
  const [isSnow, setIsSnow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { tier } = useDeviceTierContext();

  useEffect(() => {
    setMounted(true);
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

  const isLow = !mounted || tier === "low";
  const isHigh = mounted && tier === "high";
  const showOrbs = mounted && !isLow;
  const showGrid = mounted && !isLow;

  return (
    <>
      <div className="fixed inset-0 -z-50 h-full w-full overflow-hidden bg-background pointer-events-none">
        {mounted && isSnow && !isLow && (
          <Suspense fallback={null}>
            <FestiveEffect type="snow" />
          </Suspense>
        )}

        {showGrid && (
          <div className="absolute inset-0 -z-10 h-full w-full opacity-[0.06] hud-grid" />
        )}

        {showOrbs && (
          <>
            <div className="bg-orb bg-orb--primary" />
            <div className="bg-orb bg-orb--cyan" />
            <div className="bg-orb bg-orb--emerald" />
            {isHigh && (
              <>
                <div className="bg-orb bg-orb--violet" />
                <div className="bg-orb bg-orb--gold" />
              </>
            )}
          </>
        )}

        <div className="absolute inset-0 pointer-events-none bg-mesh-light" />

        <div className="hidden absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
        <div className="hidden absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />

        <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none bg-gradient-to-b from-primary/[0.04] via-cyan-400/[0.02] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none bg-gradient-to-t from-primary/[0.03] to-transparent" />
      </div>
      {mounted && (
        <Suspense fallback={null}>
          <SlowConnectionBanner />
        </Suspense>
      )}
    </>
  );
}
