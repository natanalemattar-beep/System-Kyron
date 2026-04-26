"use client";

import { useState, useEffect, lazy, Suspense, useRef } from "react";
import { useTheme } from "next-themes";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { getActiveEvent } from "@/lib/seasonal-themes";
import { useDeviceTierContext } from "@/hooks/use-device-tier";

const FestiveEffect = lazy(() => import("./confetti-effect").then(m => ({ default: m.FestiveEffect })));
const SlowConnectionBanner = lazy(() => import("./slow-connection-banner").then(m => ({ default: m.SlowConnectionBanner })));

export function DynamicBackground() {
  const [festiveEffect, setFestiveEffect] = useState<'snow' | 'fireworks' | null>(null);
  const [mounted, setMounted] = useState(false);
  const { tier } = useDeviceTierContext();
  const { resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  // Mouse tracking for interactive glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setMounted(true);
    const event = getActiveEvent();
    if (event && event.effect !== 'none') {
      setFestiveEffect(event.effect);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const isLow = !mounted || tier === "low";
  const isHigh = mounted && tier === "high";
  const showInteractiveGlow = mounted && !isLow;

  return (
    <>
      <div className="fixed inset-0 -z-50 h-full w-full overflow-hidden bg-[#020617] dark:bg-[#02040a] pointer-events-none">
        
        {/* Cinematic Noise / Film Grain */}
        <div className="absolute inset-0 z-50 opacity-[0.03] pointer-events-none mix-blend-overlay"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />

        {mounted && festiveEffect && !isLow && (
          <Suspense fallback={null}>
            <FestiveEffect type={festiveEffect} />
          </Suspense>
        )}

        {/* HUD Grid Overlay */}
        <div className={`absolute inset-0 -z-10 h-full w-full ${isDark ? 'opacity-[0.03]' : 'opacity-[0.06]'} hud-grid`} />

        {/* Liquid Mesh Gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-blue-600/10 blur-[120px] rounded-full" 
          />
          <motion.div 
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -8, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-emerald-600/10 blur-[120px] rounded-full" 
          />
          {isHigh && (
            <motion.div 
              animate={{ opacity: [0.03, 0.06, 0.03] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute top-[30%] right-[20%] w-[40%] h-[40%] bg-violet-600/5 blur-[100px] rounded-full" 
            />
          )}
        </div>

        {/* Interactive Mouse Glow */}
        {showInteractiveGlow && (
          <motion.div
            style={{
              left: springX,
              top: springY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            className="absolute w-[600px] h-[600px] bg-cyan-500/[0.07] blur-[100px] rounded-full pointer-events-none z-0"
          />
        )}

        {/* Vignette & Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/20 to-[#020617]/80 dark:to-black/90" />
        
        {/* Top/Bottom Signal Lines */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </div>
      
      {mounted && (
        <Suspense fallback={null}>
          <SlowConnectionBanner />
        </Suspense>
      )}
    </>
  );
}
