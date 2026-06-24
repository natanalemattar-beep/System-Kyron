"use client";

import { useState, useEffect } from 'react';
import { Logo } from '@/components/logo';

export function GlobalPreloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const done = () => requestAnimationFrame(() => setShow(false));
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      done();
    } else {
      document.addEventListener('DOMContentLoaded', done, { once: true });
      const timer = setTimeout(done, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020617] transition-opacity duration-500">
      <div className="relative flex flex-col items-center justify-center">
        <div className="h-24 w-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full animate-pulse" />
          <div className="animate-spin w-full h-full rounded-full border-2 border-cyan-500/20 border-t-cyan-500/60" />
          <div className="absolute flex items-center justify-center">
            <Logo className="w-12 h-12 text-white" />
          </div>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400/60 mt-8">
          System Kyron
        </span>
      </div>
    </div>
  );
}
