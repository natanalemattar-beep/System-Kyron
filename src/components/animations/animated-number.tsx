'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

interface AnimatedNumberProps {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedNumber({
  target,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}: AnimatedNumberProps) {
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 100,
    damping: 30,
  });

  const display = useTransform(spring, (current) => {
    return `${prefix}${current.toLocaleString('es-VE', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;
  });

  useEffect(() => {
    spring.set(target);
  }, [target, spring]);

  return <motion.span className={className}>{display}</motion.span>;
}