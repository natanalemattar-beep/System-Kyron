'use client';

import { useState, useEffect } from 'react';

// Static particle positions — no Math.random() on every render = 0 layout thrashing
const PARTICLES = [
  { l:'8%',  t:'15%', d:'0s',   dr:'18s' },
  { l:'23%', t:'72%', d:'3s',   dr:'22s' },
  { l:'45%', t:'30%', d:'6s',   dr:'19s' },
  { l:'67%', t:'88%', d:'1s',   dr:'25s' },
  { l:'82%', t:'20%', d:'8s',   dr:'21s' },
  { l:'91%', t:'55%', d:'4s',   dr:'17s' },
  { l:'15%', t:'45%', d:'11s',  dr:'23s' },
  { l:'56%', t:'10%', d:'2s',   dr:'20s' },
  { l:'33%', t:'60%', d:'9s',   dr:'26s' },
  { l:'74%', t:'40%', d:'5s',   dr:'16s' },
  { l:'50%', t:'80%', d:'13s',  dr:'24s' },
  { l:'88%', t:'75%', d:'7s',   dr:'19s' },
];

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
      <div className="bg-orb bg-orb--primary opacity-[0.2] blur-[140px] animate-orb-float-1" 
           style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)', willChange: 'transform' }} />
      <div className="bg-orb bg-orb--cyan opacity-[0.15] blur-[120px] animate-orb-float-2"
           style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)', willChange: 'transform' }} />
      <div className="bg-orb bg-orb--emerald opacity-[0.12] blur-[100px] animate-orb-float-3"
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
              className="absolute h-[1px] w-[1px] bg-white rounded-full animate-float-particle"
              style={{
                left: p.l, top: p.t,
                opacity: 0.15,
                animationDelay: p.d,
                animationDuration: p.dr,
                willChange: 'transform, opacity',
              }}
            />
          ))}
        </div>
      )}
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 hud-grid opacity-[0.03]" />
    </div>
  );
}
