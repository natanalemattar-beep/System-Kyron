'use client';

import { motion, useInView, useReducedMotion, AnimatePresence, type Variants } from 'framer-motion';
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const springBounce = { type: 'spring', stiffness: 100, damping: 18, mass: 0.8 } as const;
const smoothEase = [0.25, 0.1, 0.25, 1] as const; // Standard Ease-In-Out
const snappyEase = [0.4, 0, 0.2, 1] as const; // High authority transition

function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(2px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -6, filter: 'blur(2px)' },
};

const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: 12, filter: 'blur(4px)' },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -28, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, x: 16, filter: 'blur(3px)' },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 28, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, x: -16, filter: 'blur(3px)' },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.98, filter: 'blur(2px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 0.99, filter: 'blur(2px)' },
};

const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)', scale: 0.97 },
  visible: { opacity: 1, filter: 'blur(0px)', scale: 1 },
  exit: { opacity: 0, filter: 'blur(8px)', scale: 0.98 },
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -18, scale: 0.98 },
};

const expandIn: Variants = {
  hidden: { opacity: 0, scale: 0.85, filter: 'blur(10px)', rotateX: 8 },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', rotateX: 0 },
  exit: { opacity: 0, scale: 0.92, filter: 'blur(6px)' },
};

const variantMap = {
  'fade-up': fadeUp,
  'fade-down': fadeDown,
  'fade-left': fadeLeft,
  'fade-right': fadeRight,
  'scale-in': scaleIn,
  'blur-in': blurIn,
  'slide-up': slideUp,
  'expand-in': expandIn,
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
  duration = 0.35,
  once = true,
  amount = 0.1,
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
      transition={{ duration, delay, ease: smoothEase }}
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
  staggerDelay = 0.08,
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
            delayChildren: 0.1,
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
  duration = 0.3,
}: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: variantMap[variant].hidden,
        visible: {
          ...variantMap[variant].visible,
          transition: { duration, ease: smoothEase },
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
      initial={{ opacity: 0, y: 8, filter: 'blur(2px)', scale: 0.99 }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
      transition={{ duration: 0.3, ease: smoothEase }}
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
  duration = 1.8,
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
      const eased = 1 - Math.pow(1 - progress, 4);
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
  amplitude = 6,
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
        rotate: [-0.5, 0.5, -0.5],
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
        scale: [1, 1.15, 1],
        opacity: [0.08, 0.22, 0.08],
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
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 5 }}
      />
    </span>
  );
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
}

export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const mounted = useHasMounted();
  const prefersReduced = useReducedMotion();

  if (!mounted || prefersReduced) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  const dirMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: -40 },
    right: { y: 0, x: 40 },
  };

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div
        initial={{ opacity: 0, ...dirMap[direction], filter: 'blur(6px)' }}
        animate={isInView ? { opacity: 1, y: 0, x: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration, delay, ease: snappyEase }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface ModalTransitionProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
}

export function ModalTransition({ children, className, isOpen }: ModalTransitionProps) {
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className={className}
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.92, filter: 'blur(8px)', y: 12 }}
          animate={prefersReduced ? { opacity: 1 } : { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, filter: 'blur(6px)', y: -8 }}
          transition={{ duration: 0.3, ease: smoothEase }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
