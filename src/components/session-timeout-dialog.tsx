'use client';

import { useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/auth/context';
import { useSessionTimeout } from '@/hooks/use-session-timeout';
import { useRouter } from 'next/navigation';
import { Timer, LogOut, RefreshCw, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SessionTimeoutDialog() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const {
    showWarning,
    secondsLeft,
    extendSession,
  } = useSessionTimeout(!!user);

  const handleLogout = useCallback(async () => {
    await logout();
    router.push('/login');
  }, [logout, router]);

  useEffect(() => {
    const handler = () => {
      handleLogout();
    };
    window.addEventListener('kyron-session-expired', handler);
    return () => window.removeEventListener('kyron-session-expired', handler);
  }, [handleLogout]);

  if (!showWarning || !user) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeStr = `${minutes}:${secs.toString().padStart(2, '0')}`;
  const urgency = secondsLeft <= 15;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-sm mx-4 rounded-2xl border-2 border-amber-500/30 bg-card shadow-2xl shadow-amber-500/10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-white/10">
          <div
            className={`h-full transition-all duration-1000 ease-linear rounded-full ${urgency ? 'bg-red-500' : 'bg-amber-500'}`}
            style={{ width: `${Math.max(0, (secondsLeft / 60) * 100)}%` }}
          />
        </div>

        <div className="p-6 pt-8 text-center space-y-5">
          <div className={`mx-auto w-14 h-14 rounded-2xl flex items-center justify-center ${urgency ? 'bg-red-500/10 border border-red-500/20' : 'bg-amber-500/10 border border-amber-500/20'}`}>
            <ShieldAlert className={`h-7 w-7 ${urgency ? 'text-red-500 animate-pulse' : 'text-amber-500'}`} />
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-foreground">
              Sesión a punto de expirar
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Tu sesión se cerrará automáticamente por inactividad.
            </p>
          </div>

          <div className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-xl border ${urgency ? 'border-red-500/20 bg-red-500/5' : 'border-amber-500/20 bg-amber-500/5'}`}>
            <Timer className={`h-4 w-4 ${urgency ? 'text-red-500' : 'text-amber-500'}`} />
            <span className={`text-2xl font-black tabular-nums tracking-tight ${urgency ? 'text-red-500' : 'text-amber-500'}`}>
              {timeStr}
            </span>
          </div>

          <div className="flex gap-3 pt-1">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex-1 h-11 rounded-xl text-[10px] font-bold uppercase tracking-wider border-2 border-border/30 hover:border-red-500/30 hover:text-red-500 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5 mr-2" />
              Cerrar sesión
            </Button>
            <Button
              onClick={extendSession}
              className="flex-1 h-11 rounded-xl text-[10px] font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 shadow-md shadow-primary/20"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-2" />
              Seguir activo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
