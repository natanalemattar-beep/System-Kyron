"use client";

import { useState, useEffect, lazy, Suspense, useRef } from "react";
import { useTheme } from "next-themes";
import { m, useMotionValue, useSpring } from "framer-motion";
import { getActiveEvent } from "@/lib/seasonal-themes";
import { useDeviceTierContext } from "@/hooks/use-device-tier";

const FestiveEffect = lazy(() => import("./confetti-effect").then(m => ({ default: m.FestiveEffect })));
export function DynamicBackground() {
  const [festiveEffect, setFestiveEffect] = useState<'snow' | 'fireworks' | null>(null);
  const [mounted, setMounted] = useState(false);
  const { tier } = useDeviceTierContext();
  const { resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  // Mouse tracking for interactive glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    setMounted(true);
    const event = getActiveEvent();
    if (event && event.effect !== 'none') {
      setFestiveEffect(event.effect);
    }

    if (tier === 'low') return; // Disable mouse tracking on low tier

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [tier]);

  const isLow = !mounted || tier === "low";
  const isHigh = mounted && tier === "high";
  const showInteractiveGlow = mounted && isHigh;

  return (
    <div className="fixed inset-0 -z-50 h-full w-full overflow-hidden bg-[#020617] dark:bg-[#02040a] pointer-events-none">
      
      {/* Cinematic Noise / Film Grain - Pure CSS, no animation for performance */}
      <div className="absolute inset-0 z-50 opacity-[0.015] pointer-events-none mix-blend-overlay"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {mounted && festiveEffect && !isLow && (
        <Suspense fallback={null}>
          <FestiveEffect type={festiveEffect} />
        </Suspense>
      )}

      {/* HUD Grid Overlay - Pure CSS */}
      <div className={`absolute inset-0 -z-10 h-full w-full ${isDark ? 'opacity-[0.01]' : 'opacity-[0.02]'} hud-grid`} />

      {/* Liquid Mesh Gradients - Simplified for performance */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <m.div 
          animate={isHigh ? {
            scale: [1, 1.05, 1],
            rotate: [0, 3, 0],
          } : {}}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[5%] w-[60%] h-[60%] bg-blue-600/5 blur-[100px] rounded-full" 
        />
        <m.div 
          animate={isHigh ? {
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0],
          } : {}}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[5%] w-[50%] h-[50%] bg-emerald-600/5 blur-[100px] rounded-full" 
        />
      </div>

      {/* Interactive Mouse Glow - Only if high tier */}
      {showInteractiveGlow && (
        <m.div
          style={{
            left: springX,
            top: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="absolute w-[500px] h-[500px] bg-cyan-500/[0.03] blur-[100px] rounded-full pointer-events-none z-0"
        />
      )}

      {/* Vignette & Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/80" />
      
      {/* Top/Bottom Signal Lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/5 to-transparent" />
    </div>
  );
}

