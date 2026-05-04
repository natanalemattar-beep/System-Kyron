'use client';

import { motion, useInView, Variant } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  blur?: number;
  className?: string;
  once?: boolean;
  margin?: string;
}

/**
 * ScrollReveal - A premium animation wrapper for Apple-style reveal-on-scroll.
 * Consistent use of blur, scale, and subtle Y offsets for a high-end feel.
 */
export function ScrollReveal({
  children,
  delay = 0,
  y = 30,
  x = 0,
  scale = 0.96,
  blur = 10,
  className = '',
  once = true,
  margin = "-15% 0px -15% 0px",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin });

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: y, 
        x: x,
        scale: scale,
        filter: `blur(${blur}px)` 
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        x: 0,
        scale: 1,
        filter: 'blur(0px)' 
      } : {}}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 35,
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollRevealGroup - Orchestrates staggered reveals for multiple items.
 */
interface GroupProps {
  children: ReactNode[];
  staggerDelay?: number;
  className?: string;
  baseDelay?: number;
  y?: number;
  blur?: number;
}

export function ScrollRevealGroup({
  children,
  staggerDelay = 0.1,
  baseDelay = 0,
  y = 20,
  blur = 8,
  className = '',
}: GroupProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <ScrollReveal 
          key={i} 
          delay={baseDelay + (i * staggerDelay)} 
          y={y}
          blur={blur}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}
