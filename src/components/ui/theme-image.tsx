'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ThemeImageProps {
  darkSrc: string;
  lightSrc: string;
  alt: string;
  width: number;
  height: number;
  quality?: number;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  sizes?: string;
}

export function ThemeImage({
  darkSrc,
  lightSrc,
  alt,
  width,
  height,
  quality = 85,
  className,
  priority,
  loading,
  sizes,
}: ThemeImageProps) {
  return (
    <div className="relative">
      <Image
        src={lightSrc}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        className={cn(className, 'dark:opacity-0')}
        priority={priority}
        loading={loading}
        sizes={sizes}
      />
      <Image
        src={darkSrc}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        className={cn(className, 'absolute inset-0 opacity-0 dark:opacity-100')}
        priority={priority}
        loading={loading}
        sizes={sizes}
      />
    </div>
  );
}
