'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ThemeImageProps {
  darkSrc?: string;
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
    <Image
      src={lightSrc}
      alt={alt}
      width={width}
      height={height}
      quality={quality}
      className={className}
      priority={priority}
      loading={loading}
      sizes={sizes}
    />
  );
}
