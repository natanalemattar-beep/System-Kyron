'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver arriba"
      className={cn(
        'fixed bottom-6 right-6 z-[100] h-11 w-11 rounded-2xl',
        'bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20',
        'flex items-center justify-center',
        'hover:bg-primary hover:scale-110 hover:shadow-xl hover:shadow-primary/30',
        'active:scale-95',
        'transition-all duration-300 ease-out',
        'backdrop-blur-sm border border-white/10',
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
