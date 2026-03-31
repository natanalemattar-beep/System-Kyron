'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { WifiOff, Loader2, CheckCircle2, X, SignalLow } from 'lucide-react';

type ConnectionState = 'good' | 'slow' | 'offline' | 'recovered';

function detectSlowConnection(): boolean {
  if (typeof navigator === 'undefined') return false;
  const conn = (navigator as any).connection;
  if (!conn) return false;
  if (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') return true;
  if (typeof conn.downlink === 'number' && conn.downlink < 0.5) return true;
  if (typeof conn.rtt === 'number' && conn.rtt > 1500) return true;
  if (conn.saveData === true) return true;
  return false;
}

function getConnectionSpeed(): { type: string; downlink: number; rtt: number } | null {
  if (typeof navigator === 'undefined') return null;
  const conn = (navigator as any).connection;
  if (!conn) return null;
  return {
    type: conn.effectiveType ?? 'unknown',
    downlink: conn.downlink ?? 0,
    rtt: conn.rtt ?? 0,
  };
}

export function SlowConnectionBanner() {
  const [state, setState] = useState<ConnectionState>('good');
  const [dismissed, setDismissed] = useState(false);
  const [show, setShow] = useState(false);
  const [speed, setSpeed] = useState<{ type: string; downlink: number; rtt: number } | null>(null);
  const [retryCount, setRetryCount] = useState(0);
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
      setSpeed(getConnectionSpeed());
      return;
    }

    if (detectSlowConnection()) {
      prevStateRef.current = 'slow';
      setState('slow');
      setDismissed(false);
      setSpeed(getConnectionSpeed());
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

        setSpeed(getConnectionSpeed());

        if (elapsed > 4000) {
          prevStateRef.current = 'slow';
          setState('slow');
          setDismissed(false);
        } else if (wasOfflineOrSlow && firstCheckDone.current) {
          setState('recovered');
          setDismissed(false);
          setRetryCount(0);

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
        setSpeed(getConnectionSpeed());

        if (typeof navigator !== 'undefined' && !navigator.onLine) {
          prevStateRef.current = 'offline';
          setState('offline');
          setDismissed(false);
        } else {
          prevStateRef.current = 'slow';
          setState('slow');
          setDismissed(false);
        }
        setRetryCount(c => c + 1);
        firstCheckDone.current = true;
      });
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    const initialDelay = setTimeout(checkConnection, 3000);
    const interval = setInterval(checkConnection, 20000);

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
        setSpeed(getConnectionSpeed());
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

  const handleRetry = useCallback(() => {
    checkConnection();
  }, [checkConnection]);

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

  const subtextColor = isOffline
    ? 'text-red-300/70'
    : isRecovered
      ? 'text-emerald-300/70'
      : 'text-amber-300/70';

  const dismissColor = isOffline
    ? 'hover:bg-red-500/20 text-red-400'
    : isRecovered
      ? 'hover:bg-emerald-500/20 text-emerald-400'
      : 'hover:bg-amber-500/20 text-amber-400';

  const barColor = isOffline
    ? 'bg-red-400/60'
    : 'bg-amber-400/60';

  const speedInfo = speed && !isRecovered
    ? isSlow && speed.type !== 'unknown'
      ? ` · ${speed.type.toUpperCase()}${speed.downlink > 0 ? ` · ${speed.downlink.toFixed(1)} Mbps` : ''}${speed.rtt > 0 ? ` · ${speed.rtt}ms` : ''}`
      : ''
    : '';

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

          <div className="relative flex items-center gap-3 px-4 py-3.5">
            <div className={`flex-shrink-0 p-2.5 rounded-xl ${iconBg}`}>
              {isOffline ? (
                <WifiOff className="h-4.5 w-4.5 text-red-400 animate-pulse" />
              ) : isRecovered ? (
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 animate-[scb-check_0.5s_ease-out]" />
              ) : (
                <SignalLow className="h-4.5 w-4.5 text-amber-400 animate-pulse" style={{ animationDuration: '2s' }} />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className={`text-[13px] font-bold ${textColor}`}>
                  {isOffline
                    ? 'Sin conexión a Internet'
                    : isRecovered
                      ? '¡Conexión restaurada!'
                      : 'Conexión lenta detectada'}
                </p>
                {isOffline && retryCount > 0 && (
                  <span className="text-[9px] font-semibold text-red-400/60 px-1.5 py-0.5 rounded-md bg-red-500/10 border border-red-500/15">
                    {retryCount}x
                  </span>
                )}
              </div>
              <p className={`text-[11px] mt-0.5 leading-relaxed ${subtextColor}`}>
                {isOffline
                  ? 'Verifica tu Wi-Fi o datos móviles. Reintentando automáticamente...'
                  : isRecovered
                    ? 'Todo está funcionando correctamente. ¡Listo para continuar!'
                    : `La carga puede tardar más de lo habitual. Paciencia por favor.${speedInfo}`}
              </p>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              {(isOffline || isSlow) && (
                <button
                  onClick={handleRetry}
                  className={`p-1.5 rounded-lg transition-all duration-200 border-none cursor-pointer ${
                    isOffline
                      ? 'bg-red-500/15 hover:bg-red-500/30 text-red-400'
                      : 'bg-amber-500/15 hover:bg-amber-500/30 text-amber-400'
                  }`}
                  aria-label="Reintentar conexión"
                  title="Reintentar"
                >
                  <Loader2 className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                onClick={() => setDismissed(true)}
                className={`p-1.5 rounded-lg transition-all duration-200 border-none bg-transparent cursor-pointer ${dismissColor}`}
                aria-label="Cerrar aviso"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
