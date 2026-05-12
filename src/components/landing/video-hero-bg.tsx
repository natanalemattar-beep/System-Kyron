'use client';

import { useState, useEffect } from 'react';

// Static particle positions (40 particles) mimicking a galaxy without JS Math.random lag
const PARTICLES = Array.from({ length: 40 }).map((_, i) => ({
  l: `${(i * 13) % 100}%`,
  t: `${(i * 29) % 100}%`,
  d: `${(i * 7) % 15}s`,
  dr: `${15 + (i % 15)}s`,
  s: 1 + (i % 3), // size variation
}));

export function VideoHeroBg() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden bg-[#050816]">
      {/* Static Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen animate-mesh-drift"
        style={{ backgroundImage: `url('/images/landing/hero-bg-elite.png')`, willChange: 'transform' }}
      />
      
      {/* Mesh Gradient */}
      <div className="absolute inset-0 bg-mesh-dark opacity-60" />
      
      {/* Ambient Orbs — GPU-composited with will-change */}
      <div className="bg-orb bg-orb--primary opacity-[0.25] blur-[140px] animate-orb-float-1" 
           style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)', willChange: 'transform' }} />
      <div className="bg-orb bg-orb--cyan opacity-[0.2] blur-[120px] animate-orb-float-2"
           style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)', willChange: 'transform' }} />
      <div className="bg-orb bg-orb--emerald opacity-[0.15] blur-[100px] animate-orb-float-3"
           style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)', willChange: 'transform' }} />
      
      {/* Scan Line */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <div className="absolute inset-0 h-[100%] w-full bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-[scan-line_10s_linear_infinite]" />
      </div>

      {/* Static particles — rendered only after mount, fixed positions */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-float-particle"
              style={{
                left: p.l, top: p.t,
                width: `${p.s}px`,
                height: `${p.s}px`,
                opacity: 0.25 + (p.s * 0.1), // Bigger particles are brighter
                animationDelay: p.d,
                animationDuration: p.dr,
                boxShadow: `0 0 ${p.s * 3}px rgba(6, 182, 212, 0.8)`, // Glowing effect
                willChange: 'transform, opacity',
              }}
            />
          ))}
        </div>
      )}
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 hud-grid opacity-[0.05]" />
    </div>
  );
}
