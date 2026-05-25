'use client';

import { useState, useEffect, useRef } from 'react';

export function LazySection({
  children,
  fallbackHeight = '200px',
}: {
  children: React.ReactNode;
  fallbackHeight?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      {visible ? (
        <div
          style={{
            animation: 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
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
