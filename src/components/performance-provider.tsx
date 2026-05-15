"use client";

import { LazyMotion, domMax, MotionConfig } from "framer-motion";

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig 
        reducedMotion="user" 
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 30,
          mass: 1
        }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
