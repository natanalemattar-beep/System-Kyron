'use client';

import { cn } from "@/lib/utils";

export function FloatingOrb() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="absolute w-[150%] h-[140%] bg-gradient-to-br from-primary/15 via-cyan-500/10 to-secondary/10 rounded-full blur-[120px] pointer-events-none animate-orb-pulse"
      />

      <div className="relative w-64 h-64 md:w-96 md:h-96 animate-float">
        <div
          className="absolute inset-0 border-2 border-primary/25 rounded-full shadow-glow animate-orb-scale"
        />
        <div
          className="absolute inset-4 border border-secondary/15 rounded-full shadow-glow-secondary animate-orb-rotate"
        />
        <div
          className="absolute inset-8 border border-primary/8 rounded-full"
        />

        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute rounded-full animate-orb-particle",
              i % 3 === 0 ? "bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.3)]"
                : i % 3 === 1 ? "bg-secondary shadow-[0_0_8px_hsl(var(--secondary)/0.3)]"
                : "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.3)]"
            )}
            style={{
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              top: `${12 + (i * 8)}%`,
              left: `${8 + (i * 10)}%`,
              animationDuration: `${3.5 + i * 0.8}s`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}

        <div className="absolute inset-[30%] bg-gradient-to-br from-primary via-primary/30 to-secondary/30 rounded-full blur-3xl animate-pulse-soft opacity-50" />
        <div className="absolute inset-[40%] border-4 border-white/8 rounded-full backdrop-blur-md shadow-inner flex items-center justify-center overflow-hidden bg-black/15">
            <div className="w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12)_0,transparent_60%)]" />
        </div>
      </div>
    </div>
  );
}
