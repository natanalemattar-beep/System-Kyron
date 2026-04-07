'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export type TimeoutMode = 'auto' | 'manual';

export interface SessionTimeoutConfig {
  mode: TimeoutMode;
  timeoutMinutes: number;
  warningBeforeSeconds: number;
}

export const DEFAULT_TIMEOUT_CONFIG: SessionTimeoutConfig = {
  mode: 'auto',
  timeoutMinutes: 6,
  warningBeforeSeconds: 60,
};

const STORAGE_KEY = 'kyron-session-timeout';
const CONFIG_CHANGED_EVENT = 'kyron-session-timeout-changed';

export function getStoredTimeoutConfig(): SessionTimeoutConfig {
  if (typeof window === 'undefined') return DEFAULT_TIMEOUT_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_TIMEOUT_CONFIG;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_TIMEOUT_CONFIG, ...parsed };
  } catch {
    return DEFAULT_TIMEOUT_CONFIG;
  }
}

export function storeTimeoutConfig(config: SessionTimeoutConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    window.dispatchEvent(new CustomEvent(CONFIG_CHANGED_EVENT, { detail: config }));
  } catch {}
}

export function useSessionTimeout(isAuthenticated: boolean) {
  const [showWarning, setShowWarning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [config, setConfig] = useState<SessionTimeoutConfig>(DEFAULT_TIMEOUT_CONFIG);

  const lastActivityRef = useRef(Date.now());
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const expiredRef = useRef(false);

  useEffect(() => {
    setConfig(getStoredTimeoutConfig());

    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as SessionTimeoutConfig;
      if (detail) setConfig(detail);
    };
    window.addEventListener(CONFIG_CHANGED_EVENT, handler);
    return () => window.removeEventListener(CONFIG_CHANGED_EVENT, handler);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      lastActivityRef.current = Date.now();
      setShowWarning(false);
      setSecondsLeft(0);
      expiredRef.current = false;
    }
  }, [isAuthenticated]);

  const resetActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  const extendSession = useCallback(() => {
    setShowWarning(false);
    setSecondsLeft(0);
    expiredRef.current = false;
    lastActivityRef.current = Date.now();
    if (countdownRef.current) { clearInterval(countdownRef.current); countdownRef.current = null; }
  }, []);

  useEffect(() => {
    if (!isAuthenticated || config.mode === 'manual') {
      setShowWarning(false);
      if (countdownRef.current) { clearInterval(countdownRef.current); countdownRef.current = null; }
      return;
    }

    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    const handler = () => {
      if (!showWarning) resetActivity();
    };
    events.forEach(e => window.addEventListener(e, handler, { passive: true }));

    const timeoutMs = config.timeoutMinutes * 60 * 1000;
    const warningMs = config.warningBeforeSeconds * 1000;

    const checker = setInterval(() => {
      if (showWarning || expiredRef.current) return;
      const elapsed = Date.now() - lastActivityRef.current;
      const timeUntilTimeout = timeoutMs - elapsed;

      if (timeUntilTimeout <= 0) {
        expiredRef.current = true;
        window.dispatchEvent(new CustomEvent('kyron-session-expired'));
      } else if (timeUntilTimeout <= warningMs) {
        setShowWarning(true);
        setSecondsLeft(Math.ceil(timeUntilTimeout / 1000));
      }
    }, 5000);

    return () => {
      clearInterval(checker);
      events.forEach(e => window.removeEventListener(e, handler));
    };
  }, [isAuthenticated, config.mode, config.timeoutMinutes, config.warningBeforeSeconds, showWarning, resetActivity]);

  useEffect(() => {
    if (!showWarning) {
      if (countdownRef.current) { clearInterval(countdownRef.current); countdownRef.current = null; }
      return;
    }

    countdownRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          setShowWarning(false);
          expiredRef.current = true;
          window.dispatchEvent(new CustomEvent('kyron-session-expired'));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownRef.current) { clearInterval(countdownRef.current); countdownRef.current = null; }
    };
  }, [showWarning]);

  return {
    showWarning,
    secondsLeft,
    config,
    extendSession,
  };
}
