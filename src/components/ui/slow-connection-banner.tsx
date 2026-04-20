'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { WifiOff, X, SignalLow, Wifi, AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type ConnectionState = 'good' | 'slow' | 'offline' | 'recovered';

const STATE_TOKENS = {
  offline: {
    glow:    'rgba(239, 68, 68, 0.25)',
    glass:   'rgba(239, 68, 68, 0.05)',
    border:  'rgba(239, 68, 68, 0.3)',
    accent:  '#ef4444',
    icon:    '#f87171',
    label:   'text-red-100',
    sub:     'text-red-400',
    shimmer: 'linear-gradient(90deg, transparent 0%, rgba(239,68,68,0.2) 50%, transparent 100%)',
  },
  recovered: {
    glow:    'rgba(34, 197, 94, 0.25)',
    glass:   'rgba(34, 197, 94, 0.05)',
    border:  'rgba(34, 197, 94, 0.3)',
    accent:  '#22c55e',
    icon:    '#4ade80',
    label:   'text-emerald-100',
    sub:     'text-emerald-400',
    shimmer: 'linear-gradient(90deg, transparent 0%, rgba(34,197,94,0.2) 50%, transparent 100%)',
  },
  slow: {
    glow:    'rgba(245, 158, 11, 0.25)',
    glass:   'rgba(245, 158, 11, 0.05)',
    border:  'rgba(245, 158, 11, 0.3)',
    accent:  '#f59e0b',
    icon:    '#fbbf24',
    label:   'text-amber-100',
    sub:     'text-amber-400',
    shimmer: 'linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.2) 50%, transparent 100%)',
  },
};

const SLOW_THRESHOLD_MS    = 3500;
const CONSECUTIVE_SLOW     = 2;
const INITIAL_DELAY_MS     = 10000; // Recortado para feedback más rápido
const CHECK_INTERVAL_MS    = 60000;
const PING_TIMEOUT_MS      = 8000;
const RECOVERED_SHOW_MS    = 4000;

export function SlowConnectionBanner() {
  const [state, setState]       = useState<ConnectionState>('good');
  const [dismissed, setDismissed] = useState(false);

  const mountedRef       = useRef(true);
  const hadIssueRef      = useRef(false);
  const slowCountRef     = useRef(0);
  const recoveryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initializedRef   = useRef(false);

  const setGood = useCallback(() => {
    if (!mountedRef.current) return;
    if (hadIssueRef.current) {
      hadIssueRef.current = false;
      slowCountRef.current = 0;
      setState('recovered');
      setDismissed(false);
      if (recoveryTimerRef.current) clearTimeout(recoveryTimerRef.current);
      recoveryTimerRef.current = setTimeout(() => {
        if (mountedRef.current) setState('good');
      }, RECOVERED_SHOW_MS);
    } else {
      slowCountRef.current = Math.max(0, slowCountRef.current - 1);
      setState('good');
    }
  }, []);

  const checkConnection = useCallback(async () => {
    if (!mountedRef.current) return;

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      hadIssueRef.current = true;
      setState('offline');
      setDismissed(false);
      return;
    }

    const start = performance.now();
    try {
      await fetch('/api/ping', { method: 'HEAD', cache: 'no-store' });
      const elapsed = performance.now() - start;

      if (!mountedRef.current) return;

      if (elapsed > SLOW_THRESHOLD_MS) {
        slowCountRef.current++;
        if (slowCountRef.current >= CONSECUTIVE_SLOW) {
          hadIssueRef.current = true;
          setState('slow');
          setDismissed(false);
        }
      } else {
        setGood();
      }
    } catch {
      if (!mountedRef.current) return;
      if (!navigator.onLine) {
        hadIssueRef.current = true;
        setState('offline');
        setDismissed(false);
      }
    }
  }, [setGood]);

  useEffect(() => {
    mountedRef.current = true;
    const handleOffline = () => {
      hadIssueRef.current = true;
      setState('offline');
      setDismissed(false);
    };
    const handleOnline = () => {
      setTimeout(() => { if (mountedRef.current) checkConnection(); }, 1000);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    const initialTimer = setTimeout(() => {
      initializedRef.current = true;
      checkConnection();
    }, INITIAL_DELAY_MS);

    const interval = setInterval(checkConnection, CHECK_INTERVAL_MS);

    return () => {
      mountedRef.current = false;
      clearTimeout(initialTimer);
      clearInterval(interval);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [checkConnection]);

  const isVisible = state !== 'good' && !dismissed;
  const t = state === 'offline' ? STATE_TOKENS.offline : state === 'recovered' ? STATE_TOKENS.recovered : STATE_TOKENS.slow;
  
  const labels = {
    offline:   { title: 'SISTEMA OFFLINE', sub: 'Protocolo de desconexión activo', icon: WifiOff },
    slow:      { title: 'LATENCIA DETECTADA', sub: 'Velocidad de red degradada', icon: SignalLow },
    recovered: { title: 'CONEXIÓN NOMINAL', sub: 'Sincronización restaurada', icon: ShieldCheck },
  };

  const currentLabel = labels[state === 'good' ? 'recovered' : state];
  const Icon = currentLabel?.icon || Wifi;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed top-6 left-0 right-0 z-[500] px-4 pointer-events-none flex justify-center"
        >
          <div className="relative pointer-events-auto max-w-sm w-full group">
            {/* Glow Aura */}
            <div 
              className="absolute inset-0 rounded-2xl blur-2xl opacity-40 transition-colors duration-500"
              style={{ backgroundColor: t.glow }}
            />

            {/* Main HUD Body */}
            <div 
              className="relative rounded-2xl border backdrop-blur-3xl overflow-hidden transition-colors duration-500"
              style={{ 
                backgroundColor: t.glass,
                borderColor: t.border
              }}
            >
              {/* HUD Corner Accents */}
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-40">
                <div className="absolute top-3 right-3 w-1 h-1 rounded-full" style={{ backgroundColor: t.accent }} />
                <div className="absolute top-3 right-3 w-[1px] h-3" style={{ backgroundColor: t.border }} />
                <div className="absolute top-3 right-3 w-3 h-[1px]" style={{ backgroundColor: t.border }} />
              </div>
              <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none opacity-40">
                <div className="absolute bottom-3 left-3 w-[1px] h-3" style={{ backgroundColor: t.border }} />
                <div className="absolute bottom-3 left-3 w-3 h-[1px]" style={{ backgroundColor: t.border }} />
              </div>

              {/* Shimmer/Scan Effect */}
              {state !== 'recovered' && (
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 z-0 pointer-events-none"
                  style={{ background: t.shimmer }}
                />
              )}

              <div className="relative z-10 flex items-center gap-4 px-5 py-4">
                {/* Icon Container */}
                <div className="relative flex items-center justify-center h-12 w-12 rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundColor: t.accent }} />
                  <Icon className="h-6 w-6 relative z-10 animate-pulse" style={{ color: t.icon }} />
                  {/* Decorative pulse ring */}
                  <div className="absolute inset-0 border rounded-xl animate-ping opacity-20" style={{ borderColor: t.accent }} />
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <h4 className={cn("text-[12px] font-black uppercase tracking-[0.2em] leading-none mb-1.5", t.label)}>
                    {currentLabel.title}
                  </h4>
                  <p className={cn("text-[10px] font-medium leading-none opacity-70", t.sub)}>
                    {currentLabel.sub}
                  </p>
                </div>

                {/* Actions */}
                {state !== 'recovered' && (
                  <button
                    onClick={() => setDismissed(true)}
                    className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors border-none bg-transparent cursor-pointer"
                  >
                    <X className="h-4 w-4 text-white/40 hover:text-white transition-colors" />
                  </button>
                )}
              </div>

              {/* Progress HUD Bar */}
              <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
                <motion.div 
                  className="h-full rounded-full"
                  initial={{ width: '0%', opacity: 0.5 }}
                  animate={state === 'recovered' ? { width: '100%', opacity: 1 } : { width: ['10%', '60%', '10%'], opacity: [0.3, 0.8, 0.3] }}
                  transition={state === 'recovered' ? { duration: 0.5 } : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ backgroundColor: t.accent, boxShadow: `0 0 8px ${t.accent}` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
