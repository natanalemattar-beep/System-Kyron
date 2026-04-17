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
      
      {/* Animated Orbs */}
      <div className="bg-orb bg-orb--primary opacity-[0.15] blur-[120px]" />
      <div className="bg-orb bg-orb--cyan opacity-[0.12] blur-[100px]" />
      <div className="bg-orb bg-orb--violet opacity-[0.1] blur-[80px]" />
      
      {/* SCAN LINE Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 h-[100%] w-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-[scan-line_8s_linear_infinite]" />
      </div>

      {/* Floating Particles (Pseudo-Video Effect) */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 bg-white rounded-full"
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%',
            opacity: Math.random() * 0.5,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            y: [null, '-20%', '120%'],
            opacity: [0, 0.4, 0]
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 20
          }}
        />
      ))}
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 hud-grid opacity-[0.05]" />
    </div>
  );
}
