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

const ACCENT_BG: Record<string, string> = {
  'primary': 'bg-primary',
  'secondary': 'bg-secondary',
  'emerald-600': 'bg-emerald-600',
  'emerald-800': 'bg-emerald-800',
  'indigo-950': 'bg-indigo-950',
  'slate-800': 'bg-slate-800',
  'blue-900': 'bg-blue-900',
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
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const { toast } = useToast();

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

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = (formData.get('email') as string || '').trim().toLowerCase();
    const password = formData.get('password') as string;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || 'Credenciales incorrectas.');
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

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...codeDigits];

    if (value.length > 1) {
      const chars = value.slice(0, 6).split('');
      chars.forEach((char, i) => {
        if (index + i < 6) newDigits[index + i] = char;
      });
      setCodeDigits(newDigits);
      const nextIndex = Math.min(index + chars.length, 5);
      inputRefs.current[nextIndex]?.focus();

      if (newDigits.every(d => d !== '')) {
        submitCode(newDigits.join(''));
      }
      return;
    }

    newDigits[index] = value;
    setCodeDigits(newDigits);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newDigits.every(d => d !== '')) {
      submitCode(newDigits.join(''));
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !codeDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
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
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <Button variant="ghost" asChild className="mb-6 self-start md:absolute md:top-8 md:left-8 h-10 rounded-xl text-xs text-muted-foreground hover:text-foreground transition-all">
        <Link href={footerLinks?.primary.href as any ?? '/login'} className="flex items-center">
          <ChevronLeft className="mr-2 h-4 w-4" /> {footerLinks?.primary.text ?? 'Volver'}
        </Link>
      </Button>

      <div className="w-full max-w-5xl grid md:grid-cols-5 gap-0 bg-card border border-border/40 rounded-3xl shadow-2xl overflow-hidden">
        <div className={cn('md:col-span-2 p-8 md:p-10 relative overflow-hidden flex flex-col justify-between text-white', ACCENT_BG[accentColor] || 'bg-primary')}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-black/10 blur-[60px]" />

          <div className="relative z-10 space-y-6">
            <div className="p-3.5 bg-white/10 rounded-2xl w-fit border border-white/15 backdrop-blur-sm">
              <Icon className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">{portalName}</h1>
              <p className="text-sm font-medium opacity-80 leading-relaxed max-w-xs">{portalDescription}</p>
            </div>
          </div>

          {features.length > 0 && (
            <div className="relative z-10 space-y-3 mt-8 pt-6 border-t border-white/10">
              <ul className="space-y-2.5">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs font-semibold opacity-90">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-300 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
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
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20">
                    <TriangleAlert className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Correo Electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                    <Input name="email" type="email" placeholder="tu@correo.com" required autoComplete="email" className="h-12 pl-10 rounded-xl border-border/60 focus-visible:ring-primary" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-semibold">Contraseña</Label>
                    <Link href="/recuperar-cuenta" className="text-xs font-medium text-primary hover:underline">¿Olvidaste tu contraseña?</Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                    <Input name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" required autoComplete="current-password" className="h-12 pl-10 pr-10 rounded-xl border-border/60 focus-visible:ring-primary" />
                    <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" tabIndex={-1}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 rounded-xl font-bold text-sm shadow-lg" disabled={isLoading}>
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
                      <Link key={link.href} href={link.href as any} className="block text-primary hover:underline font-medium">{link.text}</Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="mb-8 text-center">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                  <KeyRound className="h-8 w-8 text-primary" />
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
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 mb-5">
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
                      digit
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border/60 focus:border-primary"
                    )}
                    disabled={isLoading}
                    autoComplete="one-time-code"
                  />
                ))}
              </div>

              {isLoading && (
                <div className="flex items-center justify-center gap-2 mb-5">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Verificando...</span>
                </div>
              )}

              <div className="space-y-3 mt-4">
                <Button
                  variant="outline"
                  onClick={handleResendCode}
                  className="w-full h-11 rounded-xl text-sm font-semibold"
                  disabled={isLoading}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Volver a iniciar sesión
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  ¿No recibiste el código? Revisa tu carpeta de spam o{' '}
                  <button onClick={handleResendCode} className="text-primary hover:underline font-medium" disabled={isLoading}>
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
