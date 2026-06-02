'use client';

import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  once?: boolean;
  margin?: string;
  blur?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  y = 30,
  x = 0,
  className = '',
  once = true,
  margin = "-15% 0px -15% 0px",
  blur: initialBlur = 0,
}: ScrollRevealProps) {
  const { ref, inView } = useInView({
    triggerOnce: once,
    rootMargin: margin,
  });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate(0, 0)' : `translate(${x}px, ${y}px)`,
        filter: inView ? 'blur(0)' : `blur(${initialBlur}px)`,
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s,
                     transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s,
                     filter 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        willChange: inView ? 'auto' : 'transform, opacity',
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
        <ScrollReveal key={i} delay={baseDelay + (i * staggerDelay)} y={y}>
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}