'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Loader2, ChevronLeft, CircleCheck, ShieldCheck, ArrowRight,
  UserPlus, Eye, EyeOff, TriangleAlert, Mail, Lock, KeyRound,
  Smartphone, Signal, RotateCcw
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Link } from '@/navigation';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const ACCESS_TYPES = {
  personal: {
    label: 'Mi Línea Personal',
    tag: 'Personal',
    description: 'Gestión de tu línea móvil, recargas y consumo 5G.',
    icon: Smartphone,
    redirectPath: '/mi-linea',
    features: ['eSIM Individual', 'Recargas Prepago', 'Monitor 5G'],
  },
  empresa: {
    label: 'Mi Línea Empresa',
    tag: 'Corporativo',
    description: 'Centro de control de flota corporativa y gestión masiva.',
    icon: Signal,
    redirectPath: '/flota-empresarial',
    features: ['Control de Flota', 'Límites por Empleado', 'Facturación Consolidada'],
  },
} as const;

type AccessType = keyof typeof ACCESS_TYPES;

export default function LoginLineaUnifiedPage() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') === 'empresa' ? 'empresa' : 'personal';
  const [selected, setSelected] = useState<AccessType>(initialType);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showAccessKey, setShowAccessKey] = useState(false);
  const [useAccessKey, setUseAccessKey] = useState(false);
  const [step, setStep] = useState<'credentials' | 'verification'>('credentials');
  const [verificationEmail, setVerificationEmail] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const current = ACCESS_TYPES[selected];
  const Icon = current.icon;

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (step === 'verification') setTimeout(() => inputRefs.current[0]?.focus(), 100);
  }, [step]);

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = (formData.get('email') as string || '').trim().toLowerCase();
    const password = formData.get('password') as string;
    const accessKey = (formData.get('accessKey') as string || '').trim();

    try {
      const body: Record<string, string> = { email, password };
      if (accessKey) body.accessKey = accessKey;
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Credenciales incorrectas.');
        setIsLoading(false);
        return;
      }
      if (json.accessKeyUsed || json.success) {
        toast({
          title: json.accessKeyUsed ? 'Acceso con llave' : 'Acceso concedido',
          description: `Bienvenido, ${json.user?.nombre ?? ''}.`,
          action: <CircleCheck className="text-emerald-500 h-4 w-4" />,
        });
        router.push(current.redirectPath as any);
        return;
      }
      if (json.requiresVerification) {
        setVerificationEmail(email);
        setMaskedEmail(json.maskedEmail || email);
        setStep('verification');
        setCountdown(600);
        setCodeDigits(['', '', '', '', '', '']);
        setIsLoading(false);
        toast({ title: 'Código enviado', description: `Revisa tu correo ${json.maskedEmail || email}`, action: <Mail className="text-cyan-500 h-4 w-4" /> });
        return;
      }
      toast({
        title: 'Acceso concedido',
        description: `Bienvenido, ${json.user?.nombre ?? ''}.`,
        action: <CircleCheck className="text-emerald-500 h-4 w-4" />,
      });
      router.push(current.redirectPath as any);
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
      setIsLoading(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...codeDigits];
    if (value.length > 1) {
      const chars = value.slice(0, 6).split('');
      chars.forEach((char, i) => { if (index + i < 6) newDigits[index + i] = char; });
      setCodeDigits(newDigits);
      inputRefs.current[Math.min(index + chars.length, 5)]?.focus();
      if (newDigits.every(d => d !== '')) submitCode(newDigits.join(''));
      return;
    }
    newDigits[index] = value;
    setCodeDigits(newDigits);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
    if (newDigits.every(d => d !== '')) submitCode(newDigits.join(''));
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !codeDigits[index] && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const submitCode = async (code: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/verify-code', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: verificationEmail, code }) });
      const json = await res.json();
      if (!res.ok) { setError(json.error || 'Código incorrecto.'); setCodeDigits(['', '', '', '', '', '']); setIsLoading(false); setTimeout(() => inputRefs.current[0]?.focus(), 100); return; }
      toast({ title: 'Identidad verificada', description: `Bienvenido, ${json.user?.nombre ?? ''}.`, action: <CircleCheck className="text-emerald-500 h-4 w-4" /> });
      router.push(current.redirectPath as any);
    } catch { setError('Error de conexión.'); setCodeDigits(['', '', '', '', '', '']); setIsLoading(false); }
  };

  const formatCountdown = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <Button variant="ghost" asChild className="mb-6 self-start md:absolute md:top-8 md:left-8 h-10 rounded-xl text-xs text-muted-foreground hover:text-foreground transition-all">
        <Link href="/login" className="flex items-center"><ChevronLeft className="mr-2 h-4 w-4" /> Volver</Link>
      </Button>

      <div className="w-full max-w-5xl bg-card border border-border/40 rounded-3xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-2 border-b border-border/40">
          {(Object.keys(ACCESS_TYPES) as AccessType[]).map((key) => {
            const opt = ACCESS_TYPES[key];
            const isActive = selected === key;
            return (
              <button
                key={key}
                onClick={() => { setSelected(key); setError(null); if (step === 'verification') { setStep('credentials'); setCodeDigits(['', '', '', '', '', '']); } }}
                className={cn(
                  'flex items-center justify-center gap-2 py-3.5 text-sm font-bold transition-all duration-200 border-b-2',
                  isActive
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'
                )}
              >
                <opt.icon className="h-4 w-4" />
                {opt.tag}
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-5 gap-0">
          <div className="md:col-span-2 p-8 md:p-10 relative overflow-hidden flex flex-col justify-between bg-blue-600 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-black/10 blur-[60px]" />

            <div className="relative z-10 space-y-6">
              <div className="p-3.5 bg-white/10 rounded-2xl w-fit border border-white/15 backdrop-blur-sm">
                <Icon className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">{current.label}</h1>
                <p className="text-sm font-medium opacity-80 leading-relaxed max-w-xs">{current.description}</p>
              </div>
            </div>

            <div className="relative z-10 space-y-3 mt-8 pt-6 border-t border-white/10">
              <ul className="space-y-2.5">
                {current.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs font-semibold opacity-90">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-300 shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center bg-card">
            {step === 'credentials' ? (
              <>
                <div className="mb-8">
                  <h2 className="text-xl font-bold tracking-tight text-foreground">Iniciar Sesión</h2>
                  <p className="text-sm text-muted-foreground mt-1">Accede a tu portal {current.label}</p>
                </div>

                <form onSubmit={handleAuth} className="space-y-5">
                  {error && (
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20">
                      <TriangleAlert className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">{error}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Correo Electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                      <Input name="email" type="email" placeholder="tu@correo.com" required autoComplete="email" className="h-12 pl-10 rounded-xl border-border/60" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-semibold">Contraseña</Label>
                      <Link href="/recuperar-cuenta" className="text-xs font-medium text-primary hover:underline">¿Olvidaste tu contraseña?</Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                      <Input name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" required autoComplete="current-password" className="h-12 pl-10 pr-10 rounded-xl border-border/60" />
                      <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" tabIndex={-1}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setUseAccessKey(v => !v)}
                      className={cn("flex items-center gap-2 text-xs font-semibold transition-colors", useAccessKey ? "text-primary" : "text-muted-foreground hover:text-foreground")}
                    >
                      <KeyRound className="h-3.5 w-3.5" />
                      {useAccessKey ? 'Ocultar llave de acceso' : 'Usar llave de acceso'}
                    </button>
                    {useAccessKey && (
                      <div className="relative group">
                        <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                        <Input
                          name="accessKey"
                          type={showAccessKey ? 'text' : 'password'}
                          placeholder="Tu llave personal"
                          autoComplete="off"
                          minLength={6}
                          className="h-12 pl-10 pr-10 rounded-xl border-border/60"
                        />
                        <button type="button" onClick={() => setShowAccessKey(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors" tabIndex={-1}>
                          {showAccessKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    )}
                    {useAccessKey && (
                      <p className="text-[10px] text-muted-foreground/60 leading-relaxed">
                        Si tienes una llave de acceso configurada, puedes saltarte la verificación por correo.
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full h-12 rounded-xl font-bold text-sm shadow-lg" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <>Acceder <ArrowRight className="ml-2 h-4 w-4" /></>}
                  </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-border/50 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-border/50" />
                    <span className="text-xs text-muted-foreground">¿No tienes línea?</span>
                    <div className="h-px flex-1 bg-border/50" />
                  </div>
                  <Button variant="outline" asChild className="w-full h-11 rounded-xl text-sm font-semibold hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all">
                    <Link href="/register/telecom" className="flex items-center gap-2"><UserPlus className="h-4 w-4" /> Activar Mi Línea</Link>
                  </Button>
                  <div className="text-center">
                    <Link href="/recuperar-cuenta" className="text-xs text-muted-foreground hover:text-primary transition-colors">¿Problemas para acceder? Recuperar cuenta</Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center mb-5">
                    <KeyRound className="h-7 w-7 text-blue-500" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-foreground">Verificación</h2>
                  <p className="text-sm text-muted-foreground mt-2">
                    Código de 6 dígitos enviado a <strong className="text-foreground">{maskedEmail}</strong>
                  </p>
                  {countdown > 0 && (
                    <p className="text-xs text-muted-foreground mt-1.5">
                      Expira en <span className="font-mono font-bold text-amber-500">{formatCountdown(countdown)}</span>
                    </p>
                  )}
                </div>

                {error && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/15 mb-5">
                    <TriangleAlert className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <div className="flex justify-center gap-2.5 mb-6">
                  {codeDigits.map((digit, i) => (
                    <Input
                      key={i}
                      ref={el => { inputRefs.current[i] = el; }}
                      type="text" inputMode="numeric" maxLength={6} value={digit}
                      onChange={e => handleCodeChange(i, e.target.value)}
                      onKeyDown={e => handleCodeKeyDown(i, e)}
                      onPaste={e => { e.preventDefault(); const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6); if (pasted) handleCodeChange(0, pasted); }}
                      className={cn("w-12 h-14 sm:w-13 sm:h-16 text-center text-2xl font-bold rounded-xl border-2 transition-all duration-200 bg-muted/20", digit ? "border-blue-500 bg-blue-500/5 text-blue-600" : "border-border/40 focus:border-blue-500")}
                      disabled={isLoading} autoComplete="one-time-code"
                    />
                  ))}
                </div>

                {isLoading && (
                  <div className="flex items-center justify-center gap-2 mb-5">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                    <span className="text-sm text-muted-foreground">Verificando...</span>
                  </div>
                )}

                <div className="space-y-3 mt-4">
                  <Button variant="outline" onClick={() => { setStep('credentials'); setError(null); setCodeDigits(['', '', '', '', '', '']); }} className="w-full h-11 rounded-xl text-sm font-semibold border-border/40" disabled={isLoading}>
                    <RotateCcw className="mr-2 h-4 w-4" /> Volver a iniciar sesión
                  </Button>
                  <p className="text-center text-xs text-muted-foreground/60">
                    ¿No recibiste el código?{' '}
                    <button onClick={() => { setStep('credentials'); setError(null); }} className="text-primary hover:underline font-medium" disabled={isLoading}>Solicitar nuevo</button>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <p className="mt-8 text-[11px] text-muted-foreground/60 uppercase tracking-widest font-bold">System Kyron v2.8.5 · Mi Línea 5G</p>
    </div>
  );
}
