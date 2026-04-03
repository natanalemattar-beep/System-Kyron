'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Loader2, User, ChevronLeft, Fingerprint, ShieldCheck, UserPlus,
  Eye, EyeOff, CircleCheck, ArrowRight, TriangleAlert, Mail, Lock,
  KeyRound, RotateCcw, Scan, Sparkles, Smartphone, MessageSquare, MessageCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Link } from '@/navigation';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function LoginPersonalPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showAccessKey, setShowAccessKey] = useState(false);
  const [useAccessKey, setUseAccessKey] = useState(false);
  const [step, setStep] = useState<'credentials' | 'verification'>('credentials');
  const [loginMode, setLoginMode] = useState<'email' | 'phone'>('email');
  const [phoneMethod, setPhoneMethod] = useState<'sms' | 'whatsapp'>('sms');
  const [verificationEmail, setVerificationEmail] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [maskedPhone, setMaskedPhone] = useState('');
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(0);
  const [devCode, setDevCode] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (step === 'verification') setTimeout(() => inputRefs.current[0]?.focus(), 100);
  }, [step]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
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
      const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const json = await res.json();
      if (!res.ok) { setError(json.error || 'Correo o contraseña incorrectos.'); setIsLoading(false); return; }
      if (json.accessKeyUsed || json.success) {
        toast({ title: json.accessKeyUsed ? 'Acceso con llave' : 'Acceso concedido', description: `Bienvenido, ${json.user?.nombre ?? ''}.`, action: <CircleCheck className="text-emerald-500 h-4 w-4" /> });
        router.push('/dashboard');
        return;
      }
      if (json.requiresVerification) {
        setVerificationEmail(email);
        setMaskedEmail(json.maskedEmail || email);
        setDevCode(json.devCode || null);
        setStep('verification');
        setCountdown(600);
        setCodeDigits(['', '', '', '', '', '']);
        setIsLoading(false);
        if (json.devCode) {
          toast({ title: 'Modo desarrollo', description: 'Código mostrado en pantalla', action: <Sparkles className="text-amber-500 h-4 w-4" /> });
        } else {
          toast({ title: 'Código enviado', description: `Revisa tu correo ${json.maskedEmail || email}`, action: <Mail className="text-cyan-500 h-4 w-4" /> });
        }
        return;
      }
      toast({ title: 'Acceso concedido', description: `Bienvenido, ${json.user?.nombre ?? ''}.`, action: <CircleCheck className="text-emerald-500 h-4 w-4" /> });
      router.push('/dashboard');
    } catch { setError('Error de conexión.'); setIsLoading(false); }
  };

  const handlePhoneLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const phone = (formData.get('phone') as string || '').trim();
    if (!phone) { setError('Ingresa tu número de teléfono'); return; }
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, method: phoneMethod }),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error || 'Error al enviar código.'); setIsLoading(false); return; }
      if (json.requiresVerification) {
        setVerificationEmail(json.email);
        setMaskedPhone(json.maskedPhone || '');
        setDevCode(null);
        setStep('verification');
        setCountdown(600);
        setCodeDigits(['', '', '', '', '', '']);
        setIsLoading(false);
        const label = phoneMethod === 'sms' ? 'SMS' : 'WhatsApp';
        toast({ title: `Código enviado por ${label}`, description: `Revisa tu ${label} en ${json.maskedPhone}`, action: <Smartphone className="text-emerald-500 h-4 w-4" /> });
      }
    } catch { setError('Error de conexión.'); setIsLoading(false); }
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
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8 w-full relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-blue-500/[0.03] to-transparent" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.012]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="pGrid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#pGrid)"/>
        </svg>
      </div>

      <Button variant="ghost" asChild className="absolute top-6 left-6 md:top-8 md:left-8 h-9 rounded-xl text-xs text-muted-foreground hover:text-foreground z-20">
        <Link href="/login" className="flex items-center"><ChevronLeft className="mr-1.5 h-4 w-4" /> Volver</Link>
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[1000px] grid md:grid-cols-2 gap-0 rounded-3xl shadow-2xl shadow-black/[0.08] overflow-hidden border border-border/40"
      >
        <div className="relative overflow-hidden flex flex-col justify-between text-white bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 p-8 md:p-10">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/[0.06] blur-[80px]" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/[0.04] blur-[60px]" />
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
              <defs><pattern id="pLoginGrid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.4"/></pattern></defs>
              <rect width="100%" height="100%" fill="url(#pLoginGrid)"/>
            </svg>
          </div>

          <div className="relative z-10 space-y-8">
            <div className="h-14 w-14 rounded-2xl bg-white/[0.12] backdrop-blur-sm border border-white/[0.15] flex items-center justify-center shadow-lg">
              <Fingerprint className="h-7 w-7 text-white" />
            </div>
            <div className="space-y-3">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">Mi Cuenta Personal</h1>
              <p className="text-sm font-medium text-white/70 leading-relaxed max-w-sm">Gestión de identidad, trámites civiles y bóveda digital ciudadana.</p>
            </div>
          </div>

          <div className="relative z-10 mt-10">
            <div className="h-px bg-white/10 mb-6" />
            <ul className="space-y-3">
              {['Identidad Digital Unificada', 'Resguardo Inmutable', 'Verificación por Código'].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-[13px] font-medium text-white/80">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 mt-8 pt-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Portal ciudadano activo
            </div>
          </div>
        </div>

        <div className="p-8 md:p-10 flex flex-col justify-center bg-card">
          {step === 'credentials' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div className="mb-6">
                <h2 className="text-2xl font-black tracking-tight text-foreground">Iniciar Sesión</h2>
                <p className="text-sm text-muted-foreground mt-1.5">Elige cómo quieres acceder</p>
              </div>

              <div className="flex rounded-xl bg-muted/30 border border-border/30 p-1 mb-6">
                <button type="button" onClick={() => { setLoginMode('email'); setError(null); }}
                  className={cn("flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[12px] font-bold transition-all",
                    loginMode === 'email' ? "bg-card shadow-sm border border-border/30 text-blue-500" : "text-muted-foreground hover:text-foreground"
                  )}>
                  <Mail className="h-3.5 w-3.5" /> Correo
                </button>
                <button type="button" onClick={() => { setLoginMode('phone'); setError(null); }}
                  className={cn("flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[12px] font-bold transition-all",
                    loginMode === 'phone' ? "bg-card shadow-sm border border-border/30 text-emerald-500" : "text-muted-foreground hover:text-foreground"
                  )}>
                  <Smartphone className="h-3.5 w-3.5" /> Teléfono
                </button>
              </div>

              {error && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/15 mb-5">
                  <TriangleAlert className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {loginMode === 'email' ? (
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-foreground/80">Correo Electrónico</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within:text-blue-500 transition-colors" />
                      <Input name="email" type="email" placeholder="tu@correo.com" required autoComplete="email" className="h-12 pl-10 rounded-xl border-border/50 bg-muted/20 focus-visible:ring-blue-500/30 focus-visible:border-blue-500/50 transition-all" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-semibold text-foreground/80">Contraseña</Label>
                      <Link href="/recuperar-cuenta" className="text-xs font-medium text-blue-500 hover:underline">¿Olvidaste?</Link>
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within:text-blue-500 transition-colors" />
                      <Input name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" required autoComplete="current-password" className="h-12 pl-10 pr-10 rounded-xl border-border/50 bg-muted/20 focus-visible:ring-blue-500/30 focus-visible:border-blue-500/50 transition-all" />
                      <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors" tabIndex={-1}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button type="button" onClick={() => setUseAccessKey(v => !v)}
                      className={cn("flex items-center gap-2 text-xs font-semibold transition-colors", useAccessKey ? "text-blue-500" : "text-muted-foreground hover:text-foreground")}>
                      <KeyRound className="h-3.5 w-3.5" />
                      {useAccessKey ? 'Ocultar llave de acceso' : 'Usar llave de acceso'}
                    </button>
                    {useAccessKey && (
                      <div className="relative group">
                        <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within:text-blue-500 transition-colors" />
                        <Input name="accessKey" type={showAccessKey ? 'text' : 'password'} placeholder="Tu llave personal" autoComplete="off" minLength={6}
                          className="h-12 pl-10 pr-10 rounded-xl border-border/50 bg-muted/20 focus-visible:ring-blue-500/30 focus-visible:border-blue-500/50 transition-all" />
                        <button type="button" onClick={() => setShowAccessKey(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors" tabIndex={-1}>
                          {showAccessKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full h-12 rounded-xl font-bold text-sm shadow-lg bg-blue-600 hover:bg-blue-500 text-white transition-all hover:shadow-xl" disabled={isLoading || isScanning}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <>Acceder <ArrowRight className="ml-2 h-4 w-4" /></>}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handlePhoneLogin} className="space-y-5">
                  <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                    <div className="flex items-start gap-2.5">
                      <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[12px] font-semibold text-foreground/80">Acceso sin contraseña</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Recibirás un código de 6 dígitos para verificar tu identidad.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-foreground/80">Número de Teléfono</Label>
                    <div className="relative group">
                      <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within:text-emerald-500 transition-colors" />
                      <Input name="phone" type="tel" placeholder="04XX-XXXXXXX" required autoComplete="tel"
                        className="h-12 pl-10 rounded-xl border-border/50 bg-muted/20 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500/50 transition-all" />
                    </div>
                    <p className="text-[10px] text-muted-foreground/50">El número debe estar registrado en tu cuenta</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-foreground/80">Recibir código por</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <button type="button" onClick={() => setPhoneMethod('sms')}
                        className={cn("flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-[12px] font-bold transition-all",
                          phoneMethod === 'sms' ? "border-emerald-500/50 bg-emerald-500/5 text-emerald-500" : "border-border/30 text-muted-foreground hover:border-border/60 hover:text-foreground"
                        )}>
                        <MessageSquare className="h-4 w-4" /> SMS
                      </button>
                      <button type="button" onClick={() => setPhoneMethod('whatsapp')}
                        className={cn("flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-[12px] font-bold transition-all",
                          phoneMethod === 'whatsapp' ? "border-green-500/50 bg-green-500/5 text-green-500" : "border-border/30 text-muted-foreground hover:border-border/60 hover:text-foreground"
                        )}>
                        <MessageCircle className="h-4 w-4" /> WhatsApp
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-12 rounded-xl font-bold text-sm shadow-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white transition-all hover:shadow-xl" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <>Enviar Código <ArrowRight className="ml-2 h-4 w-4" /></>}
                  </Button>
                </form>
              )}

              <div className="mt-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-border/30" />
                  <span className="text-xs text-muted-foreground/50">o</span>
                  <div className="h-px flex-1 bg-border/30" />
                </div>

                <button
                  onClick={handleBiometric}
                  disabled={isScanning || isLoading}
                  className={cn(
                    'flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300 w-full justify-center group',
                    isScanning
                      ? 'border-cyan-500/40 bg-cyan-500/5 shadow-md'
                      : 'border-border/40 hover:border-cyan-500/30 hover:bg-cyan-500/[0.03]'
                  )}
                >
                  {isScanning ? (
                    <>
                      <Scan className="h-4 w-4 text-cyan-500 animate-pulse" />
                      <span className="text-sm font-semibold text-cyan-500">Escaneando...</span>
                    </>
                  ) : (
                    <>
                      <Fingerprint className="h-4 w-4 text-muted-foreground/50 group-hover:text-cyan-500 transition-colors" />
                      <span className="text-sm font-medium text-muted-foreground/70 group-hover:text-cyan-500 transition-colors">Acceder con Biometría</span>
                      <Sparkles className="h-3 w-3 text-cyan-500/40 ml-auto" />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 pt-5 border-t border-border/30 space-y-4">
                <Button variant="outline" asChild className="w-full h-11 rounded-xl text-sm font-semibold border-border/40 hover:bg-blue-500/5 hover:text-blue-500 hover:border-blue-500/20 transition-all">
                  <Link href="/register/natural" className="flex items-center gap-2"><UserPlus className="h-4 w-4" /> Registrarse</Link>
                </Button>
                <p className="text-center text-xs text-muted-foreground/60">
                  <Link href="/recuperar-cuenta" className="hover:text-foreground transition-colors">¿Problemas para acceder? Recuperar cuenta</Link>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div className="mb-8 text-center">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center mb-5">
                  <KeyRound className="h-7 w-7 text-blue-500" />
                </div>
                <h2 className="text-xl font-black tracking-tight text-foreground">Verificación</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  {devCode ? 'Ingresa el código mostrado abajo' : <>Código de 6 dígitos enviado a <strong className="text-foreground">{maskedEmail}</strong></>}
                </p>
                {countdown > 0 && (
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Expira en <span className="font-mono font-bold text-amber-500">{formatCountdown(countdown)}</span>
                  </p>
                )}
              </div>

              {devCode && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/20 mb-5">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400">System Kyron — Verificación Segura</p>
                    <p className="text-sm text-muted-foreground mt-0.5">Ingresa este código para continuar:</p>
                    <p className="text-3xl font-black font-mono tracking-[0.3em] text-cyan-600 dark:text-cyan-400 mt-2">{devCode}</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-1.5">Válido por 10 minutos · No lo compartas</p>
                  </div>
                </div>
              )}

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
                    className={cn("w-12 h-14 sm:w-13 sm:h-16 text-center text-2xl font-black rounded-xl border-2 transition-all duration-200 bg-muted/20", digit ? "border-blue-500 bg-blue-500/5 text-blue-600" : "border-border/40 focus:border-blue-500")}
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
                <Button variant="outline" onClick={() => { setStep('credentials'); setError(null); setCodeDigits(['', '', '', '', '', '']); setDevCode(null); }} className="w-full h-11 rounded-xl text-sm font-semibold border-border/40" disabled={isLoading}>
                  <RotateCcw className="mr-2 h-4 w-4" /> Volver a iniciar sesión
                </Button>
                <p className="text-center text-xs text-muted-foreground/60">
                  ¿No recibiste el código?{' '}
                  <button onClick={() => { setStep('credentials'); setError(null); setDevCode(null); }} className="text-blue-500 hover:underline font-medium">Solicitar nuevo</button>
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      <p className="absolute bottom-6 text-[9px] text-muted-foreground/25 uppercase tracking-widest font-semibold">System Kyron · Ciudadanía Digital</p>
    </div>
  );
}
