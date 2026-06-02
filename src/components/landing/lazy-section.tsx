'use client';

import { useInView } from 'react-intersection-observer';

export function LazySection({
  children,
  fallbackHeight = '200px',
}: {
  children: React.ReactNode;
  fallbackHeight?: string;
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px',
  });

  return (
    <div ref={ref} className="relative w-full">
      {inView ? (
        <div
          style={{
            animation: 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
            willChange: 'transform, opacity',
          }}
        >
          {children}
        </div>
      ) : (
        <div
          style={{ minHeight: fallbackHeight }}
          className="w-full bg-transparent"
        />
      )}
    </div>
  );
}
