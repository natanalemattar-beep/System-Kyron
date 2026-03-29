'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Loader2, ChevronLeft, CircleCheck, ShieldCheck, ArrowRight,
  UserPlus, Eye, EyeOff, TriangleAlert, Mail, Lock, KeyRound, RotateCcw
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Link } from '@/navigation';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const ACCENT_THEMES: Record<string, { bg: string; gradient: string; glow: string; ring: string; text: string; inputFocus: string }> = {
  'primary':     { bg: 'bg-primary',      gradient: 'from-blue-700 via-primary to-indigo-800',       glow: 'bg-blue-500/30',    ring: 'ring-blue-400/20',    text: 'text-blue-400',    inputFocus: 'focus-visible:ring-blue-500' },
  'secondary':   { bg: 'bg-secondary',    gradient: 'from-emerald-700 via-secondary to-teal-800',    glow: 'bg-emerald-500/30', ring: 'ring-emerald-400/20', text: 'text-emerald-400', inputFocus: 'focus-visible:ring-emerald-500' },
  'emerald-600': { bg: 'bg-emerald-600',  gradient: 'from-emerald-700 via-emerald-600 to-green-700', glow: 'bg-emerald-400/30', ring: 'ring-emerald-400/20', text: 'text-emerald-400', inputFocus: 'focus-visible:ring-emerald-500' },
  'emerald-800': { bg: 'bg-emerald-800',  gradient: 'from-emerald-900 via-emerald-800 to-teal-900',  glow: 'bg-emerald-500/20', ring: 'ring-emerald-400/20', text: 'text-emerald-400', inputFocus: 'focus-visible:ring-emerald-500' },
  'indigo-950':  { bg: 'bg-indigo-950',   gradient: 'from-indigo-950 via-purple-900 to-violet-950',  glow: 'bg-purple-500/20',  ring: 'ring-purple-400/20',  text: 'text-purple-400',  inputFocus: 'focus-visible:ring-purple-500' },
  'slate-800':   { bg: 'bg-slate-800',    gradient: 'from-slate-800 via-slate-700 to-zinc-800',      glow: 'bg-slate-400/20',   ring: 'ring-slate-400/20',   text: 'text-slate-400',   inputFocus: 'focus-visible:ring-slate-500' },
  'blue-900':    { bg: 'bg-blue-900',     gradient: 'from-blue-950 via-blue-900 to-cyan-900',        glow: 'bg-cyan-500/20',    ring: 'ring-cyan-400/20',    text: 'text-cyan-400',    inputFocus: 'focus-visible:ring-cyan-500' },
  'amber-700':   { bg: 'bg-amber-700',    gradient: 'from-amber-800 via-amber-700 to-orange-800',    glow: 'bg-amber-400/30',   ring: 'ring-amber-400/20',   text: 'text-amber-400',   inputFocus: 'focus-visible:ring-amber-500' },
  'rose-800':    { bg: 'bg-rose-800',     gradient: 'from-rose-900 via-rose-800 to-pink-900',        glow: 'bg-rose-400/20',    ring: 'ring-rose-400/20',    text: 'text-rose-400',    inputFocus: 'focus-visible:ring-rose-500' },
};

interface SpecializedLoginCardProps {
  portalName: string;
  portalDescription: string;
  redirectPath: string;
  icon: React.ElementType;
  accentColor?: string;
  bgPattern?: React.ReactNode;
  features?: string[];
  footerLinks?: {
    primary: { href: string; text: string };
    secondaryLinks?: {
      title?: string;
      links: { href: string; text: string }[];
    };
  };
}

export function SpecializedLoginCard({
  portalName,
  portalDescription,
  redirectPath,
  icon: Icon,
  accentColor = 'primary',
  features = [],
  footerLinks,
}: SpecializedLoginCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'credentials' | 'verification'>('credentials');
  const [verificationEmail, setVerificationEmail] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(0);
  const [emailDeliveryFailed, setEmailDeliveryFailed] = useState(false);
  const [savedCredentials, setSavedCredentials] = useState<{ email: string; password: string } | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const { toast } = useToast();
  const theme = ACCENT_THEMES[accentColor] || ACCENT_THEMES['primary'];

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (step === 'verification') {
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [step]);

  const attemptLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    setEmailDeliveryFailed(false);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();

      if (!res.ok) {
        if (json.emailDeliveryFailed) {
          setSavedCredentials({ email, password });
          setEmailDeliveryFailed(true);
          setError(json.error || 'No pudimos enviar el código de verificación a tu correo. Por favor intenta de nuevo.');
        } else {
          setSavedCredentials(null);
          setError(json.error || 'Credenciales incorrectas.');
        }
        setIsLoading(false);
        return;
      }

      if (json.requiresVerification) {
        setVerificationEmail(email);
        setMaskedEmail(json.maskedEmail || email);
        setUserName(json.nombre || '');
        setStep('verification');
        setCountdown(600);
        setCodeDigits(['', '', '', '', '', '']);
        setEmailDeliveryFailed(false);
        setSavedCredentials(null);
        setIsLoading(false);
        toast({
          title: 'Código enviado',
          description: `Revisa tu correo ${json.maskedEmail || email}`,
          action: <Mail className="text-cyan-500 h-4 w-4" />,
        });
        return;
      }

      toast({
        title: 'Acceso concedido',
        description: `Bienvenido al portal de ${portalName}, ${json.user?.nombre ?? ''}.`,
        action: <CircleCheck className="text-emerald-500 h-4 w-4" />,
      });
      router.push(redirectPath as any);
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
      setIsLoading(false);
    }
  };

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = (formData.get('email') as string || '').trim().toLowerCase();
    const password = formData.get('password') as string;
    await attemptLogin(email, password);
  };

  const handleResendEmail = async () => {
    if (!savedCredentials) return;
    await attemptLogin(savedCredentials.email, savedCredentials.password);
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
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: verificationEmail, code }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Código incorrecto.');
        setCodeDigits(['', '', '', '', '', '']);
        setIsLoading(false);
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
        return;
      }
      toast({
        title: 'Identidad verificada',
        description: `Bienvenido al portal de ${portalName}, ${json.user?.nombre ?? ''}.`,
        action: <CircleCheck className="text-emerald-500 h-4 w-4" />,
      });
      router.push(redirectPath as any);
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
      setCodeDigits(['', '', '', '', '', '']);
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    setStep('credentials');
    setError(null);
    setCodeDigits(['', '', '', '', '', '']);
  };

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className={cn("absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[150px] opacity-40 animate-pulse", theme.glow)} style={{ animationDuration: '4s' }} />
        <div className={cn("absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-[130px] opacity-30 animate-pulse", theme.glow)} style={{ animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/3 blur-[200px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,hsl(var(--background))_70%)]" />
      </div>

      <Button variant="ghost" asChild className="mb-6 self-start md:absolute md:top-8 md:left-8 h-10 rounded-xl text-xs text-muted-foreground hover:text-foreground transition-all">
        <Link href={footerLinks?.primary.href as any ?? '/login'} className="flex items-center">
          <ChevronLeft className="mr-2 h-4 w-4" /> {footerLinks?.primary.text ?? 'Volver'}
        </Link>
      </Button>

      <div className={cn("w-full max-w-5xl grid md:grid-cols-5 gap-0 rounded-[2rem] shadow-2xl overflow-hidden border border-border/30", theme.ring)}>
        <div className={cn('md:col-span-2 p-8 md:p-10 relative overflow-hidden flex flex-col justify-between text-white bg-gradient-to-br', theme.gradient)}>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-[60px] animate-pulse" style={{ animationDuration: '3s' }} />
            <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-white/8 blur-[40px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
            <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-white/30 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 rounded-full bg-white/20 animate-ping" style={{ animationDuration: '4s', animationDelay: '1.5s' }} />
            <div className="absolute top-1/4 left-1/3 w-1 h-1 rounded-full bg-white/25 animate-ping" style={{ animationDuration: '5s', animationDelay: '0.8s' }} />
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
              <defs><pattern id="loginGrid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
              <rect width="100%" height="100%" fill="url(#loginGrid)"/>
            </svg>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="p-4 bg-white/10 rounded-2xl w-fit border border-white/15 backdrop-blur-sm shadow-lg shadow-black/20">
              <Icon className="h-9 w-9 text-white drop-shadow-lg" />
            </div>
            <div className="space-y-3">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight drop-shadow-md">{portalName}</h1>
              <p className="text-sm font-medium opacity-80 leading-relaxed max-w-xs">{portalDescription}</p>
            </div>
          </div>

          {features.length > 0 && (
            <div className="relative z-10 space-y-3 mt-8 pt-6 border-t border-white/10">
              <ul className="space-y-3">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-semibold opacity-90">
                    <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center border border-white/10 shrink-0">
                      <ShieldCheck className="h-3 w-3 text-emerald-300" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="relative z-10 mt-6 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.3em] opacity-40">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Sistema activo · Enlace seguro
            </div>
          </div>
        </div>

        <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center bg-card">
          {step === 'credentials' ? (
            <>
              <div className="mb-8">
                <h2 className="text-xl font-black tracking-tight text-foreground">Iniciar Sesión</h2>
                <p className="text-sm text-muted-foreground mt-1">Accede con tu correo y contraseña</p>
              </div>

              <form onSubmit={handleAuth} className="space-y-5">
                {error && (
                  <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 animate-in slide-in-from-top-2 duration-300">
                    <div className="flex items-start gap-3">
                      <TriangleAlert className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">{error}</p>
                    </div>
                    {emailDeliveryFailed && savedCredentials && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleResendEmail}
                        disabled={isLoading}
                        className="self-start h-8 text-xs font-semibold rounded-lg border-destructive/30 text-destructive hover:bg-destructive/10"
                      >
                        <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                        {isLoading ? 'Reenviando...' : 'Reenviar código'}
                      </Button>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Correo Electrónico</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                    <Input name="email" type="email" placeholder="tu@correo.com" required autoComplete="email" className={cn("h-12 pl-10 rounded-xl border-border/60 transition-all", theme.inputFocus)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-semibold">Contraseña</Label>
                    <Link href="/recuperar-cuenta" className={cn("text-xs font-medium hover:underline", theme.text)}>¿Olvidaste tu contraseña?</Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                    <Input name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" required autoComplete="current-password" className={cn("h-12 pl-10 pr-10 rounded-xl border-border/60 transition-all", theme.inputFocus)} />
                    <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" tabIndex={-1}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className={cn("w-full h-12 rounded-xl font-bold text-sm shadow-lg transition-all hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]", theme.bg)} disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <>Acceder <ArrowRight className="ml-2 h-4 w-4" /></>}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-border/50 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border/50" />
                  <span className="text-xs text-muted-foreground">¿No tienes cuenta?</span>
                  <div className="h-px flex-1 bg-border/50" />
                </div>
                <Button variant="outline" asChild className="w-full h-11 rounded-xl text-sm font-semibold hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all">
                  <Link href="/register" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" /> Crear Cuenta
                  </Link>
                </Button>
                <div className="text-center">
                  <Link href="/recuperar-cuenta" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    ¿Problemas para acceder? Recuperar cuenta
                  </Link>
                </div>

                {footerLinks?.secondaryLinks && (
                  <div className="text-center text-xs text-muted-foreground space-y-1 mt-2">
                    {footerLinks.secondaryLinks.title && <p className="font-medium">{footerLinks.secondaryLinks.title}</p>}
                    {footerLinks.secondaryLinks.links.map(link => (
                      <Link key={link.href} href={link.href as any} className={cn("block font-medium hover:underline", theme.text)}>{link.text}</Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="mb-8 text-center">
                <div className={cn("mx-auto w-16 h-16 rounded-2xl border flex items-center justify-center mb-5 animate-in zoom-in duration-500", `${theme.bg}/10 border-${accentColor}/20`)}>
                  <KeyRound className={cn("h-8 w-8", theme.text)} />
                </div>
                <h2 className="text-xl font-black tracking-tight text-foreground">Verificación de identidad</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Enviamos un código de 6 dígitos a <strong className="text-foreground">{maskedEmail}</strong>
                </p>
                {countdown > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    El código expira en <span className="font-mono font-bold text-amber-500">{formatCountdown(countdown)}</span>
                  </p>
                )}
              </div>

              {error && (
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 mb-5 animate-in slide-in-from-top-2">
                  <TriangleAlert className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="flex justify-center gap-2 sm:gap-3 mb-6">
                {codeDigits.map((digit, i) => (
                  <Input
                    key={i}
                    ref={el => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={digit}
                    onChange={e => handleCodeChange(i, e.target.value)}
                    onKeyDown={e => handleCodeKeyDown(i, e)}
                    onPaste={e => {
                      e.preventDefault();
                      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
                      if (pasted) handleCodeChange(0, pasted);
                    }}
                    className={cn(
                      "w-11 h-14 sm:w-13 sm:h-16 text-center text-2xl font-black rounded-xl border-2 transition-all duration-200",
                      digit ? cn("border-primary bg-primary/5", theme.text) : "border-border/60 focus:border-primary"
                    )}
                    disabled={isLoading}
                    autoComplete="one-time-code"
                  />
                ))}
              </div>

              {isLoading && (
                <div className="flex items-center justify-center gap-2 mb-5">
                  <Loader2 className={cn("h-4 w-4 animate-spin", theme.text)} />
                  <span className="text-sm text-muted-foreground">Verificando...</span>
                </div>
              )}

              <div className="space-y-3 mt-4">
                <Button variant="outline" onClick={handleResendCode} className="w-full h-11 rounded-xl text-sm font-semibold" disabled={isLoading}>
                  <RotateCcw className="mr-2 h-4 w-4" /> Volver a iniciar sesión
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  ¿No recibiste el código? Revisa tu carpeta de spam o{' '}
                  <button onClick={handleResendCode} className={cn("hover:underline font-medium", theme.text)} disabled={isLoading}>
                    solicita uno nuevo
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <p className="mt-8 text-[9px] text-muted-foreground/30 uppercase tracking-widest font-bold">System Kyron v2.8.5 · Enlace Seguro</p>
    </div>
  );
}
