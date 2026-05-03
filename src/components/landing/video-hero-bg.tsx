'use client';

import { motion } from 'framer-motion';

export function VideoHeroBg() {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden bg-[#050816]">
      {/* Fallback Static Image with Premium Effects */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen animate-mesh-drift"
        style={{ 
          backgroundImage: `url('/images/landing/hero-bg-elite.png')`,
        }}
      />
      
      {/* Interactive Mesh Gradient */}
      <div className="absolute inset-0 bg-mesh-dark opacity-60" />
      
      {/* Animated Orbs - Optimized for Blue/Green Gradient */}
      <div className="bg-orb bg-orb--primary opacity-[0.2] blur-[140px] animate-orb-float-1" 
           style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }} />
      <div className="bg-orb bg-orb--cyan opacity-[0.15] blur-[120px] animate-orb-float-2"
           style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }} />
      <div className="bg-orb bg-orb--emerald opacity-[0.12] blur-[100px] animate-orb-float-3"
           style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }} />
      
      {/* SCAN LINE Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <div className="absolute inset-0 h-[100%] w-full bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-[scan-line_10s_linear_infinite]" />
      </div>

      {/* Digital Data Particles (Hex drift) - Optimized with CSS */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`hex-${i}`}
          className="absolute text-[10px] font-mono text-cyan-500/20 whitespace-nowrap select-none pointer-events-none animate-float-slow"
          style={{ 
            left: Math.random() * 100 + '%', 
            top: Math.random() * 100 + '%',
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${Math.random() * 20 + 20}s`
          }}
        >
          {Math.random().toString(16).substring(2, 8).toUpperCase()}
        </div>
      ))}

      {/* Floating Particles (Pseudo-Video Effect) - Optimized with CSS */}
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute h-[1px] w-[1px] bg-white rounded-full animate-float-particle"
          style={{ 
            left: Math.random() * 100 + '%', 
            top: Math.random() * 100 + '%',
            opacity: Math.random() * 0.3,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${Math.random() * 15 + 15}s`
          }}
        />
      ))}
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 hud-grid opacity-[0.03]" />
    </div>
  );
}
