'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Loader2, CircleCheck, CircleX, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isNetworkError } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function VerifyLinkPage() {
  const params = useParams();
  const token = params?.token as string;
  const locale = (params?.locale as string) || 'es';
  const [status, setStatus] = useState<'verifying' | 'success' | 'registration' | 'error'>('verifying');
  const [errorMsg, setErrorMsg] = useState('');
  const [userName, setUserName] = useState('');
  const attempted = useRef(false);

  useEffect(() => {
    if (!token || attempted.current) return;
    attempted.current = true;

    (async () => {
      try {
        const res = await fetch('/api/auth/verify-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        const json = await res.json();

        if (!res.ok) {
          setStatus('error');
          setErrorMsg(json.error || 'Enlace inválido o expirado.');
          return;
        }

        if (json.registrationMode) {
          setStatus('registration');
          return;
        }

        setStatus('success');
        setUserName(json.user?.nombre || '');
      } catch (err) {
        setStatus('error');
        setErrorMsg(isNetworkError(err) ? 'Error de conexión. Verifica tu internet e intenta de nuevo.' : 'Error inesperado al verificar el enlace. Intenta de nuevo.');
      }
    })();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center space-y-6"
      >
        <div className="mx-auto w-20 h-20 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center">
          {status === 'verifying' && (
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          )}
          {(status === 'success' || status === 'registration') && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              <CircleCheck className="h-8 w-8 text-emerald-500" />
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              <CircleX className="h-8 w-8 text-destructive" />
            </motion.div>
          )}
        </div>

        {status === 'verifying' && (
          <div className="space-y-2">
            <h1 className="text-xl font-bold tracking-tight text-foreground uppercase">
              Verificando...
            </h1>
            <p className="text-sm text-muted-foreground">
              Confirmando tu identidad de forma segura.
            </p>
          </div>
        )}

        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-xl font-bold tracking-tight text-foreground uppercase">
              Identidad verificada
            </h1>
            <p className="text-sm text-muted-foreground">
              {userName ? (
                <>Bienvenido, <strong className="text-foreground">{userName}</strong>.</>
              ) : (
                'Tu identidad ha sido confirmada.'
              )}
            </p>
            <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 mx-auto max-w-xs">
              <ArrowLeft className="h-4 w-4 text-emerald-500 shrink-0" />
              <p className="text-[12px] font-medium text-emerald-600 dark:text-emerald-400">
                Vuelve a la pestaña donde iniciaste sesión. Se actualizará automáticamente.
              </p>
            </div>
            <p className="text-[11px] text-muted-foreground/50">
              Puedes cerrar esta pestaña.
            </p>
          </motion.div>
        )}

        {status === 'registration' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-xl font-bold tracking-tight text-foreground uppercase">
              Correo verificado
            </h1>
            <p className="text-sm text-muted-foreground">
              Tu correo ha sido verificado exitosamente. Puedes cerrar esta pestaña y continuar con tu registro.
            </p>
            <Button
              onClick={() => { window.close(); }}
              className="rounded-xl font-bold text-xs uppercase tracking-widest"
            >
              Cerrar pestaña
            </Button>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-xl font-bold tracking-tight text-foreground uppercase">
              Enlace no válido
            </h1>
            <p className="text-sm text-muted-foreground">{errorMsg}</p>
            <Button
              onClick={() => { window.location.href = `/${locale}`; }}
              className="rounded-xl font-bold text-xs uppercase tracking-widest"
            >
              Volver al inicio
            </Button>
          </motion.div>
        )}

        <div className="flex items-center justify-center gap-2 pt-4">
          <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground/30" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/30 italic">
            System Kyron · Enlace Seguro
          </span>
        </div>
      </motion.div>
    </div>
  );
}
