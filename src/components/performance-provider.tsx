"use client";

import { LazyMotion, domMax, MotionConfig } from "framer-motion";

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax}>
      <MotionConfig 
        reducedMotion="user" 
        transition={{ 
          type: "spring", 
          stiffness: 350, 
          damping: 25,
          mass: 0.6
        }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
