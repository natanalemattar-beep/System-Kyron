'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

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
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';
  const src = isDark && darkSrc ? darkSrc : lightSrc;

  return (
    <Image
      src={src}
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
