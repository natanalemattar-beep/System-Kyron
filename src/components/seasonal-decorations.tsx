"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useSeasonalTheme } from './seasonal-theme-provider';

interface Particle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
}

const PARTICLE_COUNT = 12;

export function SeasonalDecorations() {
  const { activeEvent, isEnabled } = useSeasonalTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo(() => {
    if (!activeEvent) return [];
    return Array.from({ length: PARTICLE_COUNT }, (_, i): Particle => ({
      id: i,
      emoji: activeEvent.particulas[i % activeEvent.particulas.length],
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      size: 14 + Math.random() * 10,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 15,
      opacity: 0.15 + Math.random() * 0.2,
      drift: -30 + Math.random() * 60,
    }));
  }, [activeEvent]);

  if (!mounted || !activeEvent || !isEnabled || particles.length === 0) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
        aria-hidden="true"
      >
        {particles.map(p => (
          <span
            key={p.id}
            className="seasonal-particle"
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              ['--drift' as string]: `${p.drift}px`,
            }}
          >
            {p.emoji}
          </span>
        ))}
      </div>

      <div
        className="pointer-events-none fixed top-0 left-0 right-0 z-[2] h-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${activeEvent.acento}40, ${activeEvent.acentoSecundario}40, transparent)`,
        }}
        aria-hidden="true"
      />
    </>
  );
}

export function SeasonalBanner() {
  const { activeEvent, isEnabled, toggleEnabled } = useSeasonalTheme();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (activeEvent) {
      const key = `kyron-seasonal-banner-${activeEvent.id}-dismissed`;
      const wasDismissed = sessionStorage.getItem(key);
      setDismissed(!!wasDismissed);
    } else {
      setDismissed(false);
    }
  }, [activeEvent]);

  if (!activeEvent || !isEnabled || dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(`kyron-seasonal-banner-${activeEvent.id}-dismissed`, 'true');
  };

  return (
    <div
      className="relative overflow-hidden rounded-xl border px-4 py-3 mb-4"
      style={{
        background: activeEvent.gradiente,
        borderColor: `${activeEvent.acento}20`,
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl flex-shrink-0">{activeEvent.emoji}</span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {activeEvent.saludo}
            </p>
            <p className="text-xs text-muted-foreground">
              System Kyron te desea lo mejor en esta fecha especial
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={toggleEnabled}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-white/5"
            title="Desactivar decoraciones"
          >
            Ocultar
          </button>
          <button
            onClick={handleDismiss}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-white/5"
            aria-label="Cerrar"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
