"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { useTheme } from "next-themes";
import { holidays } from "@/lib/holidays";
import { useDeviceTierContext } from "@/hooks/use-device-tier";

const FestiveEffect = lazy(() => import("./confetti-effect").then(m => ({ default: m.FestiveEffect })));
const SlowConnectionBanner = lazy(() => import("./slow-connection-banner").then(m => ({ default: m.SlowConnectionBanner })));

export function DynamicBackground() {
  const [isSnow, setIsSnow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { tier } = useDeviceTierContext();
  const { resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

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
          <div className={`absolute inset-0 -z-10 h-full w-full ${isDark ? 'opacity-[0.04]' : 'opacity-[0.08]'} hud-grid`} />
        )}

        {showOrbs && (
          <>
            <div className={`bg-orb bg-orb--primary ${isDark ? 'opacity-[0.06]' : ''}`} />
            <div className={`bg-orb bg-orb--cyan ${isDark ? 'opacity-[0.05]' : ''}`} />
            <div className={`bg-orb bg-orb--emerald ${isDark ? 'opacity-[0.04]' : ''}`} />
            {isHigh && (
              <>
                <div className={`bg-orb bg-orb--violet ${isDark ? 'opacity-[0.04]' : ''}`} />
                <div className={`bg-orb bg-orb--gold ${isDark ? 'opacity-[0.03]' : ''}`} />
              </>
            )}
          </>
        )}

        <div className={`absolute inset-0 pointer-events-none ${isDark ? 'bg-mesh-dark' : 'bg-mesh-light'}`} />

        <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent ${isDark ? 'via-primary/10' : 'via-primary/20'} to-transparent`} />
        <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent ${isDark ? 'via-cyan-500/8' : 'via-cyan-500/15'} to-transparent`} />

        <div className={`absolute top-0 left-0 right-0 h-64 pointer-events-none bg-gradient-to-b ${isDark ? 'from-primary/[0.03] via-cyan-400/[0.015] to-transparent' : 'from-primary/[0.06] via-cyan-400/[0.03] to-transparent'}`} />
        <div className={`absolute bottom-0 left-0 right-0 h-64 pointer-events-none bg-gradient-to-t ${isDark ? 'from-primary/[0.02] via-blue-500/[0.01] to-transparent' : 'from-primary/[0.04] via-blue-500/[0.02] to-transparent'}`} />
      </div>
      {mounted && (
        <Suspense fallback={null}>
          <SlowConnectionBanner />
        </Suspense>
      )}
    </>
  );
}
