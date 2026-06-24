'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { OtpInput } from '@/components/ui/otp-input';
import { useVerificationPoll } from '@/hooks/use-verification-poll';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  Loader2, Mail, Smartphone, CheckCircle2,
  TriangleAlert, RotateCcw, Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SENT_KEY = 'kyron-code-sent';
const VERIFIED_KEY = 'kyron-code-verified';

type VerificationMethod = 'email' | 'sms';

interface VerificationCodeInputProps {
  destino: string;
  proposito?: 'registration' | 'verification';
  tipo?: VerificationMethod;
  accentColor?: string;
  maskedDestino?: string;
  onVerified: () => void;
  showMethodToggle?: boolean;
  className?: string;
}

const ACCENT_COLORS: Record<string, string> = {
  amber: 'from-amber-500/10 to-amber-600/5 border-amber-500/30 text-amber-400',
  emerald: 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/30 text-emerald-400',
  blue: 'from-blue-500/10 to-blue-600/5 border-blue-500/30 text-blue-400',
  cyan: 'from-cyan-500/10 to-cyan-600/5 border-cyan-500/30 text-cyan-400',
  violet: 'from-violet-500/10 to-violet-600/5 border-violet-500/30 text-violet-400',
  primary: 'from-primary/10 to-primary/5 border-primary/30 text-primary',
};

export function VerificationCodeInput({
  destino,
  proposito = 'registration',
  tipo: initialTipo = 'email',
  accentColor = 'primary',
  maskedDestino,
  onVerified,
  showMethodToggle = false,
  className,
}: VerificationCodeInputProps) {
  const { toast } = useToast();
  const [method, setMethod] = useState<VerificationMethod>(initialTipo);
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [devCode, setDevCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const verifyingRef = useRef(false);
  const mountedRef = useRef(true);
  const initialMountRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (destino && !sent && !verified && initialMountRef.current) {
      initialMountRef.current = false;
      sendCode();
    }
  }, [destino]);

  useEffect(() => {
    if (verified) {
      try { sessionStorage.setItem(`${VERIFIED_KEY}:${destino}`, 'true'); } catch {}
    }
  }, [verified, destino]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (code.length === 6 && sent && !verified && !verifyingRef.current) {
      verifyCode(code);
    }
  }, [code, sent, verified]);

  useVerificationPoll(
    destino,
    method === 'email' && sent && !verified,
    onVerified
  );

  useEffect(() => {
    if (!destino || verified) return;
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel('kyron-auth');
      channel.onmessage = (event) => {
        if (event.data?.type === 'SESSION_READY') {
          try { sessionStorage.setItem(`${VERIFIED_KEY}:${destino}`, 'true'); } catch {}
          onVerified();
        }
      };
    } catch {}
    return () => { try { channel?.close(); } catch {} };
  }, [destino, verified, onVerified]);

  const startCountdown = useCallback(() => {
    setCountdown(30);
  }, []);

  const sendCode = useCallback(async () => {
    if (!destino) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destino, tipo: method, proposito }),
      });
      const json = await res.json();
      if (!res.ok) {
        const errMsg = json.error || 'Error al enviar código';
        setError(errMsg);
        toast({ title: 'Error', description: errMsg, variant: 'destructive' });
        return;
      }
      setSent(true);
      try { sessionStorage.setItem(`${SENT_KEY}:${destino}`, 'true'); } catch {}
      startCountdown();
      const returnedCode = json.devCode || json.kyronCode || null;
      if (returnedCode) {
        setDevCode(returnedCode);
        setCode(returnedCode);
      }
      const displayDest = maskedDestino || destino;
      toast({
        title: 'Código enviado',
        description: `Revisa tu ${method === 'email' ? 'correo' : 'teléfono'} ${displayDest}`,
      });
    } catch {
      const errMsg = 'Error de conexión. Verifica tu conexión a internet.';
      setError(errMsg);
      toast({ title: 'Error de conexión', description: errMsg, variant: 'destructive' });
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, [destino, method, proposito, maskedDestino, toast, startCountdown]);

  const verifyCode = useCallback(async (codeToVerify: string) => {
    if (codeToVerify.length !== 6 || verifyingRef.current || verified) return;
    verifyingRef.current = true;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destino, codigo: codeToVerify, proposito }),
      });
      const json = await res.json();
      if (!res.ok) {
        const errMsg = json.error || 'Código incorrecto';
        setError(errMsg);
        setCode('');
        toast({ title: 'Código incorrecto', description: errMsg, variant: 'destructive' });
        return;
      }
      setVerified(true);
      try { sessionStorage.setItem(`${VERIFIED_KEY}:${destino}`, 'true'); } catch {}
      toast({ title: '¡Verificado!', description: 'Tu identidad ha sido confirmada.' });
      onVerified();
    } catch {
      const errMsg = 'Error de conexión';
      setError(errMsg);
      toast({ title: 'Error de conexión', description: errMsg, variant: 'destructive' });
    } finally {
      if (mountedRef.current) setLoading(false);
      verifyingRef.current = false;
    }
  }, [destino, proposito, verified, toast, onVerified]);

  const handleResend = () => {
    if (countdown > 0) return;
    sendCode();
  };

  const accentBg = ACCENT_COLORS[accentColor] || ACCENT_COLORS.primary;

  if (verified) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 py-8"
      >
        <div className="h-16 w-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        </div>
        <p className="text-lg font-bold text-emerald-400">Identidad Verificada</p>
      </motion.div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {showMethodToggle && !sent && (
        <div className="flex gap-3 justify-center">
          <Button
            type="button"
            variant={method === 'email' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMethod('email')}
            className="gap-2 text-xs font-black uppercase tracking-widest"
          >
            <Mail className="h-4 w-4" /> Correo
          </Button>
          <Button
            type="button"
            variant={method === 'sms' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMethod('sms')}
            className="gap-2 text-xs font-black uppercase tracking-widest"
          >
            <Smartphone className="h-4 w-4" /> SMS
          </Button>
        </div>
      )}

      {!sent ? (
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Enviaremos un código de verificación a tu {method === 'email' ? 'correo electrónico' : 'teléfono'}
          </p>
          <Button
            type="button"
            onClick={sendCode}
            disabled={loading || !destino}
            size="lg"
            className="w-full font-black text-xs uppercase tracking-widest h-14"
          >
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
            {loading ? 'Enviando...' : 'Enviar Código de Verificación'}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {devCode && (
            <div className={cn('p-6 rounded-2xl bg-gradient-to-br border text-center relative overflow-hidden', accentBg)}>
              <div className="absolute top-2 left-2 text-[8px] font-black uppercase tracking-widest opacity-40">
                System Kyron Debug
              </div>
              <p className="text-4xl sm:text-5xl font-black font-mono tracking-[0.3em] mb-1">
                {devCode}
              </p>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-50">
                Código de desarrollo
              </p>
            </div>
          )}

          <div className="text-center space-y-4">
            <p className="text-xs font-medium text-muted-foreground">
              Ingresa el código enviado a{' '}
              <strong className="text-foreground">{maskedDestino || destino}</strong>
            </p>

            <OtpInput
              value={code}
              onChange={setCode}
              onComplete={(val) => verifyCode(val)}
              disabled={loading || verified}
              accentColor={accentColor}
            />

            {loading && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Verificando...
              </div>
            )}

            {error && (
              <div className="flex items-start justify-center gap-2 text-xs text-rose-400 bg-rose-500/5 border border-rose-500/20 rounded-xl p-3">
                <TriangleAlert className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              {countdown > 0 ? (
                <>
                  <RotateCcw className="h-3 w-3" />
                  Reenviar en <span className="font-mono font-bold">{countdown}s</span>
                </>
              ) : (
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  onClick={handleResend}
                  disabled={loading}
                  className="text-xs font-bold p-0 h-auto"
                >
                  Reenviar código
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
