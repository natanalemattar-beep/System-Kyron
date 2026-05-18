'use client';

import { useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  margin?: string;
}

export function ScrollReveal({
  children,
  delay = 0,
  y = 30,
  className = '',
  once = true,
  margin = "-15% 0px -15% 0px",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

interface GroupProps {
  children: ReactNode[];
  staggerDelay?: number;
  className?: string;
  baseDelay?: number;
  y?: number;
}

export function ScrollRevealGroup({
  children,
  staggerDelay = 0.1,
  baseDelay = 0,
  y = 20,
  className = '',
}: GroupProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <ScrollReveal
          key={i}
          delay={baseDelay + (i * staggerDelay)}
          y={y}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}
