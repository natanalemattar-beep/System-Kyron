import { useEffect, useRef } from 'react';

export function useVerificationPoll(
  destino: string,
  isActive: boolean,
  onVerified: () => void,
  intervalMs = 3000,
) {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const verifiedRef = useRef(false);

  useEffect(() => {
    if (!isActive || !destino || verifiedRef.current) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const check = async () => {
      try {
        const res = await fetch(
          `/api/auth/check-verified?destino=${encodeURIComponent(destino)}`,
        );
        if (!res.ok) return;
        const json = await res.json();
        if (json.verified && !verifiedRef.current) {
          verifiedRef.current = true;
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          onVerified();
        }
      } catch {
        // ignore network errors silently
      }
    };

    timerRef.current = setInterval(check, intervalMs);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [destino, isActive, onVerified, intervalMs]);

  useEffect(() => {
    if (!isActive) {
      verifiedRef.current = false;
    }
  }, [isActive]);
}
