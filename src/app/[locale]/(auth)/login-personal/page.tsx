'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Loader2, User, ChevronLeft, Fingerprint, ShieldCheck, UserPlus,
  Eye, EyeOff, CircleCheck, ArrowRight, TriangleAlert, Mail, Lock,
  KeyRound, RotateCcw, Scan, Sparkles
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Link } from '@/navigation';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function LoginPersonalPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'credentials' | 'verification'>('credentials');
  const [verificationEmail, setVerificationEmail] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
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

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
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
      if (!res.ok) { setError(json.error || 'Correo o contraseña incorrectos.'); setIsLoading(false); return; }
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
      toast({ title: 'Acceso concedido', description: `Bienvenido, ${json.user?.nombre ?? ''}.`, action: <CircleCheck className="text-emerald-500 h-4 w-4" /> });
      router.push('/dashboard');
    } catch { setError('Error de conexión. Intenta de nuevo.'); setIsLoading(false); }
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
      router.push('/dashboard');
    } catch { setError('Error de conexión.'); setCodeDigits(['', '', '', '', '', '']); setIsLoading(false); }
  };

  const formatCountdown = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const handleBiometric = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      toast({ title: 'Próximamente', description: 'El acceso biométrico estará disponible pronto.', variant: 'destructive' });
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 w-full relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-500/8 blur-[130px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,hsl(var(--background))_70%)]" />
      </div>

      <Button variant="ghost" asChild className="mb-6 self-start md:absolute md:top-8 md:left-8 h-10 rounded-xl text-xs text-muted-foreground hover:text-foreground transition-all">
        <Link href="/login" className="flex items-center"><ChevronLeft className="mr-2 h-4 w-4" /> Volver</Link>
      </Button>

      <div className="w-full max-w-5xl grid md:grid-cols-5 gap-0 rounded-[2rem] shadow-2xl overflow-hidden border border-border/30 ring-1 ring-blue-400/10">
        <div className="md:col-span-2 p-8 md:p-10 relative overflow-hidden flex flex-col justify-between bg-gradient-to-br from-blue-700 via-primary to-indigo-800 text-white">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-[60px] animate-pulse" style={{ animationDuration: '3s' }} />
            <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-white/8 blur-[40px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
            <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-white/30 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 rounded-full bg-white/20 animate-ping" style={{ animationDuration: '4s', animationDelay: '1.5s' }} />
            <div className="absolute top-1/4 left-1/3 w-1 h-1 rounded-full bg-white/25 animate-ping" style={{ animationDuration: '5s', animationDelay: '0.8s' }} />
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
              <defs><pattern id="pGrid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
              <rect width="100%" height="100%" fill="url(#pGrid)"/>
            </svg>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="p-4 bg-white/10 rounded-2xl w-fit border border-white/15 backdrop-blur-sm shadow-lg shadow-black/20">
              <Fingerprint className="h-9 w-9 text-white drop-shadow-lg" />
            </div>
            <div className="space-y-3">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight drop-shadow-md">Mi Cuenta Personal</h1>
              <p className="text-sm font-medium opacity-80 leading-relaxed max-w-xs">Gestión de identidad, trámites civiles y bóveda digital ciudadana.</p>
            </div>
          </div>

          <div className="relative z-10 space-y-3 mt-8 pt-6 border-t border-white/10">
            <ul className="space-y-3">
              {['Identidad Digital Unificada', 'Resguardo Inmutable', 'Verificación por Código'].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-xs font-semibold opacity-90">
                  <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center border border-white/10 shrink-0">
                    <ShieldCheck className="h-3 w-3 text-emerald-300" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 mt-6 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.3em] opacity-40">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Portal ciudadano activo
            </div>
          </div>
        </div>

        <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center bg-card">
          {step === 'credentials' ? (
            <>
              <div className="mb-8">
                <h2 className="text-xl font-black tracking-tight text-foreground">Iniciar Sesión</h2>
                <p className="text-sm text-muted-foreground mt-1">Accede a tu cuenta personal</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                {error && (
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 animate-in slide-in-from-top-2 duration-300">
                    <TriangleAlert className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Correo Electrónico</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-blue-500 transition-colors" />
                    <Input name="email" type="email" placeholder="tu@correo.com" required autoComplete="email" className="h-12 pl-10 rounded-xl border-border/60 focus-visible:ring-blue-500 transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-semibold">Contraseña</Label>
                    <Link href="/recuperar-cuenta" className="text-xs font-medium text-blue-500 hover:underline">¿Olvidaste tu contraseña?</Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-blue-500 transition-colors" />
                    <Input name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" required autoComplete="current-password" className="h-12 pl-10 pr-10 rounded-xl border-border/60 focus-visible:ring-blue-500 transition-all" />
                    <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" tabIndex={-1}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 rounded-xl font-bold text-sm shadow-lg bg-primary hover:shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99]" disabled={isLoading || isScanning}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <>Entrar <ArrowRight className="ml-2 h-4 w-4" /></>}
                </Button>
              </form>

              <div className="mt-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border/50" />
                  <span className="text-xs text-muted-foreground">o</span>
                  <div className="h-px flex-1 bg-border/50" />
                </div>

                <button
                  onClick={handleBiometric}
                  disabled={isScanning || isLoading}
                  className={cn(
                    'flex items-center gap-3 px-5 py-3.5 rounded-xl border transition-all duration-300 w-full justify-center group',
                    isScanning
                      ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/10'
                      : 'border-border hover:border-cyan-500/40 hover:bg-cyan-500/5 hover:shadow-md'
                  )}
                >
                  {isScanning ? (
                    <>
                      <Scan className="h-5 w-5 text-cyan-500 animate-pulse" />
                      <span className="text-sm font-semibold text-cyan-500">Escaneando...</span>
                    </>
                  ) : (
                    <>
                      <Fingerprint className="h-5 w-5 text-muted-foreground group-hover:text-cyan-500 transition-colors" />
                      <span className="text-sm font-semibold group-hover:text-cyan-500 transition-colors">Acceder con Biometría</span>
                      <Sparkles className="h-3 w-3 text-cyan-500/50 ml-auto" />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 pt-5 border-t border-border/50 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border/50" />
                  <span className="text-xs text-muted-foreground">¿No tienes cuenta?</span>
                  <div className="h-px flex-1 bg-border/50" />
                </div>
                <Button variant="outline" asChild className="w-full h-11 rounded-xl text-sm font-semibold hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all">
                  <Link href="/register/natural" className="flex items-center gap-2"><UserPlus className="h-4 w-4" /> Registrarse</Link>
                </Button>
                <div className="text-center">
                  <Link href="/recuperar-cuenta" className="text-xs text-muted-foreground hover:text-primary transition-colors">¿Problemas para acceder? Recuperar cuenta</Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8 text-center">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5 animate-in zoom-in duration-500">
                  <KeyRound className="h-8 w-8 text-blue-500" />
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
                    type="text" inputMode="numeric" maxLength={6} value={digit}
                    onChange={e => handleCodeChange(i, e.target.value)}
                    onKeyDown={e => handleCodeKeyDown(i, e)}
                    onPaste={e => { e.preventDefault(); const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6); if (pasted) handleCodeChange(0, pasted); }}
                    className={cn("w-11 h-14 sm:w-13 sm:h-16 text-center text-2xl font-black rounded-xl border-2 transition-all duration-200", digit ? "border-blue-500 bg-blue-500/5 text-blue-600" : "border-border/60 focus:border-blue-500")}
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
                <Button variant="outline" onClick={() => { setStep('credentials'); setError(null); setCodeDigits(['', '', '', '', '', '']); }} className="w-full h-11 rounded-xl text-sm font-semibold" disabled={isLoading}>
                  <RotateCcw className="mr-2 h-4 w-4" /> Volver a iniciar sesión
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  ¿No recibiste el código? Revisa spam o{' '}
                  <button onClick={() => { setStep('credentials'); setError(null); }} className="text-blue-500 hover:underline font-medium">solicita uno nuevo</button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <p className="mt-8 text-[9px] text-muted-foreground/30 uppercase tracking-widest font-bold">System Kyron v2.8.5 · Ciudadanía Digital</p>
    </div>
  );
}
