'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { WifiOff, CheckCircle2, X, SignalLow } from 'lucide-react';

type ConnectionState = 'good' | 'slow' | 'offline' | 'recovered';

function detectSlowConnection(): boolean {
  if (typeof navigator === 'undefined') return false;
  const conn = (navigator as any).connection;
  if (!conn) return false;
  if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g') return true;
  if (typeof conn.downlink === 'number' && conn.downlink <= 1) return true;
  if (typeof conn.rtt === 'number' && conn.rtt > 3000) return true;
  return false;
}

export function SlowConnectionBanner() {
  const [state, setState] = useState<ConnectionState>('good');
  const [dismissed, setDismissed] = useState(false);
  const [show, setShow] = useState(false);
  const mountedRef = useRef(true);
  const prevStateRef = useRef<ConnectionState>('good');
  const recoveryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstCheckDone = useRef(false);

  const checkConnection = useCallback(() => {
    if (!mountedRef.current) return;

    const wasOfflineOrSlow = prevStateRef.current === 'offline' || prevStateRef.current === 'slow';

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      prevStateRef.current = 'offline';
      setState('offline');
      setDismissed(false);
      return;
    }

    if (detectSlowConnection()) {
      prevStateRef.current = 'slow';
      setState('slow');
      setDismissed(false);
      return;
    }

    const start = performance.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    fetch('/api/ping', {
      method: 'HEAD',
      cache: 'no-store',
      signal: controller.signal,
    })
      .then(() => {
        clearTimeout(timeout);
        const elapsed = performance.now() - start;
        if (!mountedRef.current) return;

        if (elapsed > 8000) {
          prevStateRef.current = 'slow';
          setState('slow');
          setDismissed(false);
        } else if (wasOfflineOrSlow && firstCheckDone.current) {
          setState('recovered');
          setDismissed(false);
          if (recoveryTimerRef.current) clearTimeout(recoveryTimerRef.current);
          recoveryTimerRef.current = setTimeout(() => {
            if (mountedRef.current) {
              prevStateRef.current = 'good';
              setState('good');
            }
          }, 4000);
        } else {
          prevStateRef.current = 'good';
          setState('good');
        }
        firstCheckDone.current = true;
      })
      .catch(() => {
        clearTimeout(timeout);
        if (!mountedRef.current) return;
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
          prevStateRef.current = 'offline';
          setState('offline');
          setDismissed(false);
        } else {
          prevStateRef.current = 'slow';
          setState('slow');
          setDismissed(false);
        }
        firstCheckDone.current = true;
      });
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    const initialDelay = setTimeout(checkConnection, 10000);
    const interval = setInterval(checkConnection, 60000);

    const handleOnline = () => {
      if (!mountedRef.current) return;
      setTimeout(() => {
        if (mountedRef.current) checkConnection();
      }, 1500);
    };

    const handleOffline = () => {
      if (!mountedRef.current) return;
      prevStateRef.current = 'offline';
      setState('offline');
      setDismissed(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const conn = (navigator as any).connection;
    const handleChange = () => {
      if (mountedRef.current) {
        checkConnection();
      }
    };
    conn?.addEventListener?.('change', handleChange);

    return () => {
      mountedRef.current = false;
      clearTimeout(initialDelay);
      clearInterval(interval);
      if (recoveryTimerRef.current) clearTimeout(recoveryTimerRef.current);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      conn?.removeEventListener?.('change', handleChange);
    };
  }, [checkConnection]);

  useEffect(() => {
    if (state !== 'good' && !dismissed) {
      requestAnimationFrame(() => setShow(true));
    } else {
      setShow(false);
    }
  }, [state, dismissed]);


  if (state === 'good') return null;
  if (dismissed && state !== 'recovered') return null;

  const isOffline = state === 'offline';
  const isRecovered = state === 'recovered';
  const isSlow = state === 'slow';

  const bgColor = isOffline
    ? 'bg-red-950/95 border-red-500/30'
    : isRecovered
      ? 'bg-emerald-950/95 border-emerald-500/30'
      : 'bg-amber-950/95 border-amber-500/30';

  const gradientColor = isOffline
    ? 'from-red-500/10 via-transparent to-red-500/10'
    : isRecovered
      ? 'from-emerald-500/10 via-transparent to-emerald-500/10'
      : 'from-amber-500/10 via-transparent to-amber-500/10';

  const iconBg = isOffline
    ? 'bg-red-500/20'
    : isRecovered
      ? 'bg-emerald-500/20'
      : 'bg-amber-500/20';

  const textColor = isOffline
    ? 'text-red-200'
    : isRecovered
      ? 'text-emerald-200'
      : 'text-amber-200';

  const dismissColor = isOffline
    ? 'hover:bg-red-500/20 text-red-400'
    : isRecovered
      ? 'hover:bg-emerald-500/20 text-emerald-400'
      : 'hover:bg-amber-500/20 text-amber-400';

  const barColor = isOffline
    ? 'bg-red-400/60'
    : 'bg-amber-400/60';


  return (
    <div
      className={`
        fixed top-0 left-0 right-0 z-[300] flex items-center justify-center pointer-events-none
        transition-all duration-500 ease-out
        ${show ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}
      `}
    >
      <div className="pointer-events-auto mt-4 mx-4 max-w-lg w-full">
        <div
          className={`relative overflow-hidden rounded-2xl border shadow-2xl ${bgColor}`}
          style={{ backdropFilter: 'blur(20px)' }}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${gradientColor}`} />

          {(isSlow || isOffline) && (
            <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${isOffline ? 'bg-red-900/50' : 'bg-amber-900/50'} overflow-hidden`}>
              <div className={`h-full w-1/3 ${barColor} rounded-full animate-[scb-slide_2s_ease-in-out_infinite]`} />
            </div>
          )}

          {isRecovered && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500/40 overflow-hidden">
              <div className="h-full bg-emerald-400/80 rounded-full animate-[scb-fill_1s_ease-out_forwards]" />
            </div>
          )}

          <div className="relative flex items-center gap-3 px-4 py-3">
            <div className={`flex-shrink-0 p-2 rounded-xl ${iconBg}`}>
              {isOffline ? (
                <WifiOff className="h-4 w-4 text-red-400 animate-pulse" />
              ) : isRecovered ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              ) : (
                <SignalLow className="h-4 w-4 text-amber-400" />
              )}
            </div>

            <p className={`flex-1 text-[13px] font-semibold ${textColor}`}>
              {isOffline
                ? 'Sin conexión'
                : isRecovered
                  ? 'Conexión restaurada'
                  : 'Conexión lenta'}
            </p>

            <button
              onClick={() => setDismissed(true)}
              className={`p-1.5 rounded-lg transition-all duration-200 border-none bg-transparent cursor-pointer flex-shrink-0 ${dismissColor}`}
              aria-label="Cerrar aviso"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
