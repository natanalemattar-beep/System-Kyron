
"use client";

import { motion } from "framer-motion";

export function Orb() {
  return (
    <div className="relative w-full h-full">
      {/* Glow */}
      <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
      
      {/* Inner Core */}
      <div className="absolute inset-[30%] bg-primary/20 rounded-full blur-xl" />
      
      {/* Rotating lines */}
      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" style={{ transform: 'rotate(60deg)' }} />
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" style={{ transform: 'rotate(120deg)' }} />
      </div>

       {/* Static Rings */}
       <div className="absolute inset-[15%] border border-primary/10 rounded-full" />
       <div className="absolute inset-[40%] border border-primary/10 rounded-full" />
    </div>
  );
}
