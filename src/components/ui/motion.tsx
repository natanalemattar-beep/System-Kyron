'use client';

import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const easeOut = [0.22, 1, 0.36, 1] as const;

function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const fadeDown: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0 },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0 },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(4px)' },
  visible: { opacity: 1, filter: 'blur(0px)' },
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const variantMap = {
  'fade-up': fadeUp,
  'fade-down': fadeDown,
  'fade-left': fadeLeft,
  'fade-right': fadeRight,
  'scale-in': scaleIn,
  'blur-in': blurIn,
  'slide-up': slideUp,
};

type AnimationVariant = keyof typeof variantMap;

interface MotionContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  as?: keyof JSX.IntrinsicElements;
}

export function MotionContainer({
  children,
  className,
  variant = 'fade-up',
  delay = 0,
  duration = 0.5,
  once = true,
  amount = 0.2,
  as = 'div',
}: MotionContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const mounted = useHasMounted();
  const prefersReduced = useReducedMotion();

  if (!mounted || prefersReduced) {
    const Tag = as as any;
    return <Tag ref={ref} className={className}>{children}</Tag>;
  }

  const Component = motion[as as keyof typeof motion] as any;

  return (
    <Component
      ref={ref}
      className={className}
      variants={variantMap[variant]}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration, delay, ease: easeOut }}
    >
      {children}
    </Component>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  amount?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.06,
  once = true,
  amount = 0.15,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const mounted = useHasMounted();
  const prefersReduced = useReducedMotion();

  if (!mounted || prefersReduced) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.05,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
  duration?: number;
}

export function StaggerItem({
  children,
  className,
  variant = 'fade-up',
  duration = 0.4,
}: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: variantMap[variant].hidden,
        visible: {
          ...variantMap[variant].visible,
          transition: { duration, ease: easeOut },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const mounted = useHasMounted();
  const prefersReduced = useReducedMotion();

  if (!mounted || prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

interface CountUpProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export function CountUp({
  target,
  duration = 1.5,
  prefix = '',
  suffix = '',
  className,
  decimals = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const mounted = useHasMounted();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || !mounted) return;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, mounted, target, duration]);

  const formatted = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.round(count).toLocaleString('es-VE');

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}

export function FloatingElement({
  children,
  className,
  amplitude = 5,
  duration = 5,
  delay = 0,
}: FloatingElementProps) {
  const mounted = useHasMounted();
  const prefersReduced = useReducedMotion();

  if (!mounted || prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

interface GlowPulseProps {
  className?: string;
  color?: string;
}

export function GlowPulse({ className, color = 'primary' }: GlowPulseProps) {
  return (
    <motion.div
      className={cn('absolute rounded-full pointer-events-none', className)}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export function ShimmerText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('relative inline-block overflow-hidden', className)}>
      {children}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
      />
    </span>
  );
}
