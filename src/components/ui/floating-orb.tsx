'use client';

import { motion } from "framer-motion";

export function FloatingOrb() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Resplandor de Fondo Difuminado */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[150%] h-[140%] bg-primary/20 rounded-full blur-[120px] pointer-events-none"
      />
      
      {/* Núcleo del Globo */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 360]
        }}
        transition={{ 
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
        className="relative w-64 h-64 md:w-96 md:h-96"
      >
        {/* Anillos de Ingeniería */}
        <div className="absolute inset-0 border-2 border-primary/30 rounded-full shadow-glow" />
        <div className="absolute inset-4 border border-secondary/20 rounded-full rotate-45 shadow-glow-secondary" />
        <div className="absolute inset-8 border border-primary/10 rounded-full -rotate-12" />
        
        {/* Partículas de Datos */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.8, 0.2],
              x: [0, (i % 2 === 0 ? 20 : -20), 0],
              y: [0, (i < 3 ? 20 : -20), 0]
            }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
            className={cn(
              "absolute w-2 h-2 rounded-full shadow-glow",
              i % 2 === 0 ? "bg-primary" : "bg-secondary"
            )}
            style={{
              top: `${20 + (i * 12)}%`,
              left: `${15 + (i * 15)}%`
            }}
          />
        ))}

        {/* Centro de Energía */}
        <div className="absolute inset-[35%] bg-gradient-to-br from-primary via-primary/40 to-secondary/40 rounded-full blur-2xl animate-pulse opacity-60" />
        <div className="absolute inset-[40%] border-4 border-white/10 rounded-full backdrop-blur-sm shadow-inner flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_70%)]" />
        </div>
      </motion.div>
    </div>
  );
}

import { cn } from "@/lib/utils";
