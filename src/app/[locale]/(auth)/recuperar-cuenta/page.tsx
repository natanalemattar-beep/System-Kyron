'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Loader2, ChevronLeft, Mail, KeyRound, ShieldCheck, Eye, EyeOff,
  CircleCheck, ArrowRight, RefreshCw, User, Search, AlertTriangle
} from 'lucide-react';
import { Link } from '@/navigation';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type Step = 'choose' | 'find-account' | 'code-sent' | 'new-password' | 'done';

export default function RecuperarCuentaPage() {
  const [step, setStep] = useState<Step>('choose');
  const [email, setEmail] = useState('');
  const [accountInfo, setAccountInfo] = useState<{ nombre: string; tipo: string; maskedEmail: string } | null>(null);
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  const startCountdown = () => {
    setCountdown(60);
    const i = setInterval(() => setCountdown(c => { if (c <= 1) { clearInterval(i); return 0; } return c - 1; }), 1000);
  };

  const findAccount = async () => {
    if (!email.trim()) { setError('Ingresa tu correo electrónico, cédula o RIF'); return; }
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'find-account', email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.noEmail) {
          setError(data.error);
        } else if (res.status === 404) {
          setError(data.error || 'No encontramos una cuenta con ese dato');
        } else {
          throw new Error(data.error);
        }
        return;
      }
      setAccountInfo({ nombre: data.nombre, tipo: data.tipo, maskedEmail: data.maskedEmail });
      setStep('code-sent');
      startCountdown();
      toast({ title: 'Código enviado', description: 'Revisa tu correo electrónico.' });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const sendCode = async () => {
    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: 'email', email: email.trim().toLowerCase() }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      startCountdown();
      toast({ title: 'Código enviado', description: 'Revisa tu correo electrónico.' });
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  const verifyAndProceed = async () => {
    if (code.length !== 6) { setError('Ingresa el código de 6 dígitos'); return; }
    setError('');
    setStep('new-password');
  };

  const resetPassword = async () => {
    if (newPassword.length < 8) { setError('Mínimo 8 caracteres'); return; }
    if (!/[A-Z]/.test(newPassword)) { setError('Debe contener al menos una mayúscula'); return; }
    if (!/[a-z]/.test(newPassword)) { setError('Debe contener al menos una minúscula'); return; }
    if (!/[0-9]/.test(newPassword)) { setError('Debe contener al menos un número'); return; }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(newPassword)) { setError('Debe contener al menos un carácter especial (!@#$%...)'); return; }
    if (newPassword !== confirmPassword) { setError('Las contraseñas no coinciden'); return; }
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset', email: email.trim().toLowerCase(), code, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStep('done');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <Button variant="ghost" asChild className="mb-8 self-start md:absolute md:top-8 md:left-8 h-10 rounded-xl text-xs text-muted-foreground hover:text-foreground transition-all">
        <Link href="/login" className="flex items-center"><ChevronLeft className="mr-2 h-4 w-4" /> Volver al inicio de sesión</Link>
      </Button>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
            {step === 'done' ? <CircleCheck className="h-7 w-7 text-emerald-500" /> : <KeyRound className="h-7 w-7 text-primary" />}
          </div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">
            {step === 'choose' && 'Recuperar Cuenta'}
            {step === 'find-account' && 'Buscar tu Cuenta'}
            {step === 'code-sent' && 'Verificar Identidad'}
            {step === 'new-password' && 'Nueva Contraseña'}
            {step === 'done' && 'Cuenta Recuperada'}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {step === 'choose' && 'Selecciona qué necesitas recuperar'}
            {step === 'find-account' && 'Ingresa tu correo, cédula o RIF para buscar tu cuenta'}
            {step === 'code-sent' && `Enviamos un código a ${accountInfo?.maskedEmail || 'tu correo'}`}
            {step === 'new-password' && 'Crea una nueva contraseña segura'}
            {step === 'done' && 'Tu contraseña ha sido actualizada'}
          </p>
        </div>

        <div className="bg-card border border-border/50 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 space-y-5">

            {step === 'choose' && (
              <div className="space-y-3">
                <button
                  onClick={() => setStep('find-account')}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all text-left group"
                >
                  <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
                    <KeyRound className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">Olvidé mi contraseña</p>
                    <p className="text-xs text-muted-foreground">Buscar por correo, cédula o RIF</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>

                <button
                  onClick={() => setStep('find-account')}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all text-left group"
                >
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/15 transition-colors">
                    <User className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">Encontrar mi cuenta</p>
                    <p className="text-xs text-muted-foreground">Buscar cuenta por correo, cédula o RIF</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              </div>
            )}

            {step === 'find-account' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Correo, Cédula o RIF</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="tu@correo.com, V-12345678 o J-12345678-9"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && findAccount()}
                      className="h-12 pl-10 rounded-xl"
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground/60">Puedes buscar con tu correo electrónico, número de cédula o RIF</p>
                </div>
                {error && (
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-destructive/5 border border-destructive/15">
                    <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}
                <Button onClick={findAccount} disabled={isLoading} className="w-full h-12 rounded-xl font-bold">
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                  Buscar Cuenta
                </Button>
                <button onClick={() => { setStep('choose'); setError(''); setEmail(''); }} className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Volver
                </button>
              </div>
            )}

            {step === 'code-sent' && accountInfo && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{accountInfo.nombre}</p>
                    <p className="text-xs text-muted-foreground">{accountInfo.maskedEmail} · {accountInfo.tipo === 'juridico' ? 'Empresa' : 'Personal'}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Código de Verificación</Label>
                  <Input
                    maxLength={6}
                    value={code}
                    onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    onKeyDown={e => e.key === 'Enter' && code.length === 6 && verifyAndProceed()}
                    className="h-14 text-center text-2xl tracking-[0.5em] font-mono rounded-xl"
                    placeholder="000000"
                  />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button onClick={verifyAndProceed} disabled={code.length !== 6} className="w-full h-12 rounded-xl font-bold">
                  Verificar Código
                </Button>

                <div className="text-center">
                  {countdown > 0 ? (
                    <p className="text-xs text-muted-foreground">Reenviar código en <strong>{countdown}s</strong></p>
                  ) : (
                    <button onClick={sendCode} className="text-xs text-primary hover:underline inline-flex items-center gap-1">
                      <RefreshCw className="h-3 w-3" /> Reenviar código
                    </button>
                  )}
                </div>
              </div>
            )}

            {step === 'new-password' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Nueva Contraseña</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className="h-12 rounded-xl pr-10"
                      placeholder="Mínimo 8 caracteres"
                    />
                    <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" tabIndex={-1}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Confirmar Contraseña</Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && resetPassword()}
                    className="h-12 rounded-xl"
                    placeholder="Repetir contraseña"
                  />
                </div>

                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <p className={cn("flex items-center gap-1.5", newPassword.length >= 8 && "text-emerald-600")}>
                    <ShieldCheck className="h-3 w-3" /> Mínimo 8 caracteres
                  </p>
                  <p className={cn("flex items-center gap-1.5", /[A-Z]/.test(newPassword) && "text-emerald-600")}>
                    <ShieldCheck className="h-3 w-3" /> Una mayúscula
                  </p>
                  <p className={cn("flex items-center gap-1.5", /[a-z]/.test(newPassword) && "text-emerald-600")}>
                    <ShieldCheck className="h-3 w-3" /> Una minúscula
                  </p>
                  <p className={cn("flex items-center gap-1.5", /[0-9]/.test(newPassword) && "text-emerald-600")}>
                    <ShieldCheck className="h-3 w-3" /> Un número
                  </p>
                  <p className={cn("flex items-center gap-1.5", /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(newPassword) && "text-emerald-600")}>
                    <ShieldCheck className="h-3 w-3" /> Un carácter especial
                  </p>
                  <p className={cn("flex items-center gap-1.5", newPassword === confirmPassword && newPassword.length > 0 && "text-emerald-600")}>
                    <ShieldCheck className="h-3 w-3" /> Las contraseñas coinciden
                  </p>
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button onClick={resetPassword} disabled={isLoading} className="w-full h-12 rounded-xl font-bold">
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Restablecer Contraseña
                </Button>
              </div>
            )}

            {step === 'done' && (
              <div className="text-center py-4 space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <CircleCheck className="h-9 w-9 text-emerald-500" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Ya puedes iniciar sesión con tu nueva contraseña.
                </p>
                <Button onClick={() => router.push('/login')} className="w-full h-12 rounded-xl font-bold">
                  Ir a Iniciar Sesión <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground/70 mt-8 uppercase tracking-widest font-bold">
          System Kyron v2.8.5 · Recuperación Segura
        </p>
      </div>
    </div>
  );
}
