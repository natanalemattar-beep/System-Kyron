'use client';

import { ReactNode, useRef, useState, useEffect } from 'react';

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
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { rootMargin: margin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, margin]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translate(0, 0)'
          : `translate(${x}px, ${y}px)`,
        filter: isVisible ? 'blur(0)' : `blur(${initialBlur}px)`,
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s,
                     transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s,
                     filter 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
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
