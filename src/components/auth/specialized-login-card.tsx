'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Loader2, ChevronLeft, CircleCheck, ShieldCheck, ArrowRight, Shield,
  UserPlus, Eye, EyeOff, TriangleAlert, Mail, Lock, KeyRound, RotateCcw, Sparkles, Zap,
  Smartphone, MessageSquare, MessageCircle, Fingerprint, RefreshCw, Construction
} from 'lucide-react';
import { Link, useRouter } from "@/navigation";
import { useToast } from '@/hooks/use-toast';
import { useVerificationPoll } from '@/hooks/use-verification-poll';
import { Logo } from '@/components/logo';
import { cn, isNetworkError } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type LayoutVariant = 'split-left' | 'split-right' | 'centered' | 'stacked' | 'minimal' | 'dark-immersive';

const ACCENT_THEMES: Record<string, { gradient: string; accent: string; ring: string; inputRing: string; codeBorder: string; btnBg: string; glowFrom: string }> = {
  'primary':     { gradient: 'from-blue-600 via-blue-500 to-indigo-700',     accent: 'text-cyan-400',    ring: 'ring-cyan-500/20',    inputRing: 'focus-visible:ring-cyan-500/20 focus-visible:border-cyan-500/40', codeBorder: 'border-cyan-500', btnBg: 'bg-blue-600 hover:bg-blue-500', glowFrom: 'rgba(6,182,212,0.15)' },
  'secondary':   { gradient: 'from-emerald-600 via-emerald-500 to-teal-700',  accent: 'text-emerald-400', ring: 'ring-emerald-500/20', inputRing: 'focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500/40', codeBorder: 'border-emerald-500', btnBg: 'bg-emerald-600 hover:bg-emerald-500', glowFrom: 'rgba(16,185,129,0.15)' },
  'emerald-600': { gradient: 'from-emerald-600 via-emerald-500 to-green-600', accent: 'text-emerald-400', ring: 'ring-emerald-500/20', inputRing: 'focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500/40', codeBorder: 'border-emerald-500', btnBg: 'bg-emerald-600 hover:bg-emerald-500', glowFrom: 'rgba(16,185,129,0.15)' },
  'indigo-950':  { gradient: 'from-indigo-900 via-purple-800 to-violet-900', accent: 'text-purple-400',  ring: 'ring-purple-500/20',  inputRing: 'focus-visible:ring-purple-500/20 focus-visible:border-purple-500/40', codeBorder: 'border-purple-500', btnBg: 'bg-purple-600 hover:bg-purple-500', glowFrom: 'rgba(139,92,246,0.15)' },
  'blue-900':    { gradient: 'from-blue-900 via-blue-800 to-cyan-800',       accent: 'text-cyan-400',    ring: 'ring-cyan-500/20',    inputRing: 'focus-visible:ring-cyan-500/20 focus-visible:border-cyan-500/40', codeBorder: 'border-cyan-500', btnBg: 'bg-blue-800 hover:bg-blue-700', glowFrom: 'rgba(6,182,212,0.15)' },
  'amber-700':   { gradient: 'from-amber-700 via-amber-600 to-orange-700',   accent: 'text-amber-400',   ring: 'ring-amber-500/20',   inputRing: 'focus-visible:ring-amber-500/20 focus-visible:border-amber-500/40', codeBorder: 'border-amber-500', btnBg: 'bg-amber-600 hover:bg-amber-500', glowFrom: 'rgba(245,158,11,0.15)' },
};

interface SpecializedLoginCardProps {
  portalName: string;
  portalDescription: string;
  redirectPath: string;
  icon: React.ElementType;
  accentColor?: string;
  bgPattern?: React.ReactNode;
  features?: string[];
  layoutVariant?: LayoutVariant;
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
  layoutVariant = 'split-left',
  footerLinks,
}: SpecializedLoginCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showAccessKey, setShowAccessKey] = useState(false);
  const [useAccessKey, setUseAccessKey] = useState(false);
  const [step, setStep] = useState<'credentials' | 'verification'>('credentials');
  const [loginMode, setLoginMode] = useState<'email' | 'phone'>('email');
  const [phoneMethod, setPhoneMethod] = useState<'sms' | 'whatsapp'>('sms');
  const [verificationEmail, setVerificationEmail] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [emailDeliveryFailed, setEmailDeliveryFailed] = useState(false);
  const [savedCredentials, setSavedCredentials] = useState<{ email: string; password: string } | null>(null);
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'sms' | 'whatsapp'>('email');
  const [hasPhone, setHasPhone] = useState(false);
  const [maskedPhone, setMaskedPhone] = useState('');
  const [switchingMethod, setSwitchingMethod] = useState(false);
  const [challengeToken, setChallengeToken] = useState('');
  const [devCode, setDevCode] = useState<string | null>(null);
  const [singleCode, setSingleCode] = useState('');
  const [verifVerified, setVerifVerified] = useState(false);
  const singleInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const theme = ACCENT_THEMES[accentColor] || ACCENT_THEMES['primary'];
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const isPersonalPortal = portalName.toLowerCase().includes('personal') || portalName.toLowerCase().includes('ciudadano');
  const isTelecomPortal = portalName.toLowerCase().includes('línea') || portalName.toLowerCase().includes('teléfono') || portalName.toLowerCase().includes('móvil');
  
  const identifierLabel = isTelecomPortal ? 'Número de Teléfono' : (isPersonalPortal ? 'Número de Cédula / Correo' : 'Correo Electrónico');
  const identifierPlaceholder = isTelecomPortal ? '04XX-XXXXXXX' : (isPersonalPortal ? 'V-12345678 o tu@correo.com' : 'tu@correo.com');
  const IdentifierIcon = isTelecomPortal ? Smartphone : (isPersonalPortal ? Fingerprint : Mail);


  const handleMagicLinkVerified = useCallback(() => {
    setVerifVerified(true);
    toast({ title: 'Identidad verificada', description: 'Acceso verificado automáticamente.', action: <CircleCheck className="text-emerald-500 h-4 w-4" /> });
    router.push(redirectPath as any);
  }, [toast, router, redirectPath]);

  useVerificationPoll(
    verificationEmail,
    step === 'verification' && verificationMethod === 'email' && !devCode && !verifVerified,
    handleMagicLinkVerified
  );

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (step === 'verification') setTimeout(() => singleInputRef.current?.focus(), 200);
  }, [step]);

  const attemptLogin = async (identifier: string, password: string, accessKey?: string) => {
    setIsLoading(true);
    setError(null);
    setEmailDeliveryFailed(false);
    try {
      const body: Record<string, string> = { identifier, password, portal: 'business' };
      if (accessKey && accessKey.trim()) body.accessKey = accessKey.trim();


      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        if (json.emailDeliveryFailed) {
          setSavedCredentials({ email: identifier, password });
          setEmailDeliveryFailed(true);
          setError(json.error || 'No pudimos enviar el código de verificación.');
        } else if (res.status === 401) {
          setSavedCredentials(null);
          setError('NO_ACCOUNT');
        } else if (res.status === 403 && json.portalMismatch) {
          setSavedCredentials(null);
          setError('PORTAL_MISMATCH:' + (json.error || 'No tienes acceso a este portal.'));
        } else {
          setSavedCredentials(null);
          setError(json.error || 'Error al iniciar sesión.');
        }
        setIsLoading(false);
        return;
      }
      if (json.accessKeyUsed || json.success) {
        toast({ title: json.accessKeyUsed ? 'Acceso con llave' : 'Acceso concedido', description: `Bienvenido, ${json.user?.nombre ?? ''}.`, action: <CircleCheck className="text-emerald-500 h-4 w-4" /> });
        router.push(redirectPath as any);
        return;
      }
      if (json.requiresVerification) {
        setVerificationEmail(json.email || identifier);
        setMaskedEmail(json.maskedEmail || json.email || identifier);

        setUserName(json.nombre || '');
        setHasPhone(!!json.hasPhone);
        setMaskedPhone(json.maskedPhone || '');
        setChallengeToken(json.challengeToken || '');
        setDevCode(json.devCode || json.kyronCode || null);
        setVerificationMethod('email');
        setStep('verification');
        setCountdown(600);
        setSingleCode('');
        setEmailDeliveryFailed(false);
        setSavedCredentials(null);
        setIsLoading(false);
        if (json.devCode || json.kyronCode) {
          toast({ title: 'Verificación System Kyron', description: 'Código generado de forma segura', action: <Sparkles className="text-cyan-500 h-4 w-4" /> });
        } else if (json.emailFailed && json.hasPhone) {
          toast({ title: 'Correo no disponible', description: json.emailFailedMessage || 'Usa SMS o WhatsApp para recibir tu código.', action: <Smartphone className="text-amber-500 h-4 w-4" /> });
        } else {
          toast({ title: 'Código enviado', description: `Revisa tu correo ${json.maskedEmail || identifier}`, action: <Mail className="text-cyan-500 h-4 w-4" /> });
        }
        return;
      }
      toast({ title: 'Acceso concedido', description: `Bienvenido, ${json.user?.nombre ?? ''}.`, action: <CircleCheck className="text-emerald-500 h-4 w-4" /> });
      router.push(redirectPath as any);
    } catch (err: any) {
      console.error('[Login] Connection error:', err);
      const isNet = isNetworkError(err);
      setError(isNet 
        ? 'Error de conexión. El servidor no responde o no tienes internet.' 
        : `Error: ${err.message || 'Error inesperado'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const identifier = (formData.get('identifier') as string || '').trim().toLowerCase();

    const password = formData.get('password') as string;
    const accessKey = formData.get('accessKey') as string || '';
    await attemptLogin(identifier, password, accessKey);

  };

  const handleResendEmail = async () => {
    if (!savedCredentials) return;
    await attemptLogin(savedCredentials.email, savedCredentials.password);

  };

  const handlePhoneLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const channelName = phoneMethod === 'sms' ? 'SMS' : 'WhatsApp';
    toast({ title: `${channelName} en construcción`, description: `La verificación por ${channelName} estará disponible próximamente. Usa tu correo electrónico para iniciar sesión.`, action: <Construction className="text-amber-500 h-4 w-4" /> });
    return;
  };

  const submitCode = async (code: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/verify-code', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ destino: verificationEmail, codigo: code, proposito: 'verification' }) 
      });

      const json = await res.json();
      if (!res.ok) { setError(json.error || 'Código incorrecto.'); setSingleCode(''); setIsLoading(false); setTimeout(() => singleInputRef.current?.focus(), 100); return; }
      setVerifVerified(true);
      toast({ title: 'Identidad verificada', description: `Bienvenido, ${json.user?.nombre ?? ''}.`, action: <CircleCheck className="text-emerald-500 h-4 w-4" /> });
      router.push(redirectPath as any);
    } catch (err) {
      setError(isNetworkError(err) ? 'Error de conexión. Verifica tu internet.' : 'Error al verificar el código. Intenta de nuevo.');
      setSingleCode('');
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => { setStep('credentials'); setError(null); setSingleCode(''); setVerifVerified(false); setVerificationMethod('email'); setChallengeToken(''); setHasPhone(false); setMaskedPhone(''); setDevCode(null); };
  const formatCountdown = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const handleResendCode = async () => {
    setIsLoading(true);
    setError(null);
    setSingleCode('');
    try {
      const body: Record<string, string> = { method: verificationMethod, destino: verificationEmail, tipo: verificationMethod };
      if ((verificationMethod === 'sms' || verificationMethod === 'whatsapp') && challengeToken) {
        body.challengeToken = challengeToken;
      }
      const res = await fetch('/api/auth/send-code', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ ...body, proposito: 'verification' }) 
      });

      const json = await res.json();
      if (!res.ok) { setError(json.error || 'No se pudo reenviar el código.'); setIsLoading(false); return; }
      setCountdown(600);
      if (json.devCode || json.kyronCode) {
        setDevCode(json.devCode || json.kyronCode);
      }
      toast({ title: 'Código reenviado', description: `Se envió un nuevo código por ${verificationMethod === 'email' ? 'correo' : verificationMethod}.`, action: <RefreshCw className="text-primary h-4 w-4" /> });
    } catch (err) {
      setError(isNetworkError(err) ? 'Error de conexión al reenviar.' : 'No se pudo reenviar el código. Intenta de nuevo.');
    }
    setIsLoading(false);
    setTimeout(() => singleInputRef.current?.focus(), 100);
  };

  useEffect(() => {
    if (singleCode.length === 6 && step === 'verification' && !verifVerified) {
      submitCode(singleCode);
    }
  }, [singleCode, step, verifVerified]);

  const handleSwitchMethod = async (method: 'email' | 'sms' | 'whatsapp') => {
    if (method === verificationMethod || switchingMethod) return;
    if (method === 'sms' || method === 'whatsapp') {
      const channelName = method === 'sms' ? 'SMS' : 'WhatsApp';
      toast({ title: `${channelName} en construcción`, description: `La verificación por ${channelName} estará disponible próximamente. Usa el correo electrónico por ahora.`, action: <Construction className="text-amber-500 h-4 w-4" /> });
      return;
    }
    setSwitchingMethod(true);
    setError(null);
    setSingleCode('');
    try {
      const body: Record<string, string> = { method, destino: verificationEmail, tipo: method };
      if ((method === 'sms' || method === 'whatsapp') && challengeToken) {
        body.challengeToken = challengeToken;
      }
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, proposito: 'verification' }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'No se pudo enviar el código.');
        setSwitchingMethod(false);
        return;
      }
      setVerificationMethod(method);
      setCountdown(600);
      if (json.devCode || json.kyronCode) {
        setDevCode(json.devCode || json.kyronCode);
        toast({ title: 'Verificación System Kyron', description: 'Código generado de forma segura', action: <Sparkles className="text-cyan-500 h-4 w-4" /> });
      } else {
        setDevCode(null);
        const channelLabels = {
          email: { title: 'Código enviado por correo', desc: `Revisa tu correo ${maskedEmail}`, icon: <Mail className="text-cyan-500 h-4 w-4" /> },
          sms: { title: 'Código enviado por SMS', desc: `Revisa los mensajes en ${maskedPhone}`, icon: <Smartphone className="text-emerald-500 h-4 w-4" /> },
          whatsapp: { title: 'Código enviado por WhatsApp', desc: `Revisa tu WhatsApp en ${maskedPhone}`, icon: <MessageCircle className="text-green-500 h-4 w-4" /> },
        };
        const ch = channelLabels[method];
        toast({ title: ch.title, description: ch.desc, action: ch.icon });
      }
      setTimeout(() => singleInputRef.current?.focus(), 100);
    } catch (err) {
      setError(isNetworkError(err) ? 'Error de conexión al reenviar código.' : 'No se pudo cambiar el método. Intenta de nuevo.');
    } finally {
      setSwitchingMethod(false);
    }
  };

  const formContent = (
    <>
      <AnimatePresence mode="wait">
        {step === 'credentials' ? (
          <motion.div
            key="credentials"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-bold tracking-tight text-foreground">Iniciar Sesión</h2>
              <p className="text-[13px] text-muted-foreground mt-1.5">Elige cómo quieres acceder</p>
            </div>

            <div className="flex rounded-xl bg-muted/30 border border-border/30 p-1 mb-6">
              <button
                type="button"
                onClick={() => { setLoginMode('email'); setError(null); }}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[12px] font-bold transition-all",
                  loginMode === 'email'
                    ? cn("bg-card shadow-sm border border-border/30", theme.accent)
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Mail className="h-3.5 w-3.5" /> Correo
              </button>
              <button
                type="button"
                onClick={() => { setLoginMode('phone'); setError(null); }}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[12px] font-bold transition-all",
                  loginMode === 'phone'
                    ? "bg-card shadow-sm border border-border/30 text-emerald-500"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Smartphone className="h-3.5 w-3.5" /> Teléfono
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-5"
                >
                  {error === 'NO_ACCOUNT' ? (
                    <div className="flex flex-col gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                      <div className="flex items-start gap-3">
                        <TriangleAlert className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p className="text-[13px] font-semibold text-foreground">Credenciales incorrectas</p>
                          <p className="text-[12px] text-muted-foreground">Verifica tus datos o crea una cuenta nueva.</p>
                        </div>
                      </div>
                      <Link href="/register">
                        <Button type="button" variant="outline" size="sm" className="w-full h-9 text-xs font-bold rounded-lg border-amber-500/25 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-300">
                          <UserPlus className="mr-1.5 h-3.5 w-3.5" /> Crear Cuenta Ahora
                        </Button>
                      </Link>
                    </div>
                  ) : error?.startsWith('PORTAL_MISMATCH:') ? (
                    <div className="flex flex-col gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                      <div className="flex items-start gap-3">
                        <Shield className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p className="text-[13px] font-semibold text-foreground">Portal incorrecto</p>
                          <p className="text-[12px] text-muted-foreground">{error.replace('PORTAL_MISMATCH:', '')}</p>
                        </div>
                      </div>
                      <Link href="/login-personal">
                        <Button type="button" variant="outline" size="sm" className="w-full h-9 text-xs font-bold rounded-lg border-blue-500/25 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 hover:text-blue-700 dark:hover:text-blue-300">
                          <ArrowRight className="mr-1.5 h-3.5 w-3.5" /> Ir al Portal Personal
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 p-4 rounded-xl bg-destructive/5 border border-destructive/15">
                      <div className="flex items-start gap-3">
                        <TriangleAlert className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                        <p className="text-[13px] text-destructive">{error}</p>
                      </div>
                      {emailDeliveryFailed && savedCredentials && (
                        <Button type="button" variant="outline" size="sm" onClick={handleResendEmail} disabled={isLoading} className="self-start h-8 text-xs font-semibold rounded-lg border-destructive/20 text-destructive hover:bg-destructive/10">
                          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> {isLoading ? 'Reenviando...' : 'Reenviar código'}
                        </Button>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {loginMode === 'email' ? (
                <motion.form
                  key="email-form"
                  onSubmit={handleAuth}
                  className="space-y-5"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="space-y-2">
                    <Label className="text-[13px] font-semibold text-foreground/80">{identifierLabel}</Label>
                    <div className="relative group">
                      <IdentifierIcon className={cn("absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors")} />
                      <Input name="identifier" type="text" placeholder={identifierPlaceholder} required className={cn("h-12 pl-10 rounded-xl border-border/50 bg-muted/20 text-[13px] transition-all", theme.inputRing)} />
                    </div>
                  </div>


                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-[13px] font-semibold text-foreground/80">Contraseña</Label>
                      <Link href="/recuperar-cuenta" className={cn("text-xs font-medium hover:underline", theme.accent)}>¿Olvidaste?</Link>
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                      <Input name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" required autoComplete="current-password" className={cn("h-12 pl-10 pr-10 rounded-xl border-border/50 bg-muted/20 text-[13px] transition-all", theme.inputRing)} />
                      <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors" tabIndex={-1}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setUseAccessKey(v => !v)}
                      className={cn("flex items-center gap-2 text-xs font-semibold transition-colors", useAccessKey ? theme.accent : "text-muted-foreground hover:text-foreground")}
                    >
                      <KeyRound className="h-3.5 w-3.5" />
                      {useAccessKey ? 'Ocultar llave de acceso' : 'Usar llave de acceso'}
                    </button>
                    <AnimatePresence>
                      {useAccessKey && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden space-y-2"
                        >
                          <div className="relative group">
                            <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                            <Input
                              name="accessKey"
                              type={showAccessKey ? 'text' : 'password'}
                              placeholder="Tu llave personal"
                              autoComplete="off"
                              minLength={6}
                              className={cn("h-12 pl-10 pr-10 rounded-xl border-border/50 bg-muted/20 text-[13px] transition-all", theme.inputRing)}
                            />
                            <button type="button" onClick={() => setShowAccessKey(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors" tabIndex={-1}>
                              {showAccessKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
                            Si tienes una llave de acceso configurada, puedes saltarte la verificación por correo.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Button type="submit" className={cn("w-full h-12 rounded-xl font-bold text-[13px] text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]", theme.btnBg)} disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <>Acceder <ArrowRight className="ml-2 h-4 w-4" /></>}
                  </Button>
                </motion.form>
              ) : (
                <motion.form
                  key="phone-form"
                  onSubmit={handlePhoneLogin}
                  className="space-y-5"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                    <div className="flex items-start gap-2.5">
                      <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[12px] font-semibold text-foreground/80">Acceso sin contraseña</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Recibirás un código de 6 dígitos en tu teléfono para verificar tu identidad.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[13px] font-semibold text-foreground/80">Número de Teléfono</Label>
                    <div className="relative group">
                      <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within:text-emerald-500 transition-colors" />
                      <Input name="phone" type="tel" placeholder="04XX-XXXXXXX" required autoComplete="tel" className={cn("h-12 pl-10 rounded-xl border-border/50 bg-muted/20 text-[13px] transition-all focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500/50")} />
                    </div>
                    <p className="text-[10px] text-muted-foreground/50">El número debe estar registrado en tu cuenta</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[13px] font-semibold text-foreground/80">Recibir código por</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPhoneMethod('sms')}
                        className={cn(
                          "flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-[12px] font-bold transition-all",
                          phoneMethod === 'sms'
                            ? "border-emerald-500/50 bg-emerald-500/5 text-emerald-500"
                            : "border-border/30 text-muted-foreground hover:border-border/60 hover:text-foreground"
                        )}
                      >
                        <MessageSquare className="h-4 w-4" /> SMS
                      </button>
                      <button
                        type="button"
                        onClick={() => setPhoneMethod('whatsapp')}
                        className={cn(
                          "flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-[12px] font-bold transition-all",
                          phoneMethod === 'whatsapp'
                            ? "border-green-500/50 bg-green-500/5 text-green-500"
                            : "border-border/30 text-muted-foreground hover:border-border/60 hover:text-foreground"
                        )}
                      >
                        <MessageCircle className="h-4 w-4" /> WhatsApp
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-12 rounded-xl font-bold text-[13px] text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <>Enviar Código <ArrowRight className="ml-2 h-4 w-4" /></>}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="mt-8 pt-6 border-t border-border/30 space-y-4">
              <Button variant="outline" asChild className="w-full h-11 rounded-xl text-[13px] font-semibold border-border/40 hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all">
                <Link href="/register" className="flex items-center gap-2"><UserPlus className="h-4 w-4" /> Crear Cuenta</Link>
              </Button>
              <p className="text-center text-xs text-muted-foreground/60">
                <Link href="/recuperar-cuenta" className="hover:text-foreground transition-colors">¿Problemas para acceder? Recuperar cuenta</Link>
              </p>
              {footerLinks?.secondaryLinks && (
                <div className="text-center text-xs text-muted-foreground space-y-1 mt-2">
                  {footerLinks.secondaryLinks.title && <p className="font-medium">{footerLinks.secondaryLinks.title}</p>}
                  {footerLinks.secondaryLinks.links.map(link => (
                    <Link key={link.href} href={link.href as any} className={cn("block font-medium hover:underline", theme.accent)}>{link.text}</Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="verification"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center space-y-3">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg"
                style={{ background: verificationMethod === 'whatsapp' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : verificationMethod === 'sms' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #3b82f6, #1e40af)' }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                {verificationMethod === 'whatsapp'
                  ? <MessageCircle className="h-8 w-8 text-white" />
                  : verificationMethod === 'sms'
                    ? <Smartphone className="h-8 w-8 text-white" />
                    : <Fingerprint className="h-8 w-8 text-white" />
                }
              </motion.div>
              <h2 className="text-xl font-bold text-foreground">Verifica tu identidad</h2>
              <p className="text-sm text-muted-foreground">
                {devCode ? 'Ingresa el código de verificación segura' : `Código de 6 dígitos enviado a tu ${verificationMethod === 'email' ? 'correo' : verificationMethod === 'sms' ? 'SMS' : 'WhatsApp'}.`}
              </p>
            </div>

            {verifVerified ? (
              <motion.div 
                className="text-center py-10 space-y-6 relative overflow-hidden rounded-2xl"
                initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
              >
                <motion.div
                  className="absolute inset-0 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-full blur-3xl animate-pulse"
                />
                <motion.div
                  className="inline-flex relative z-10 items-center justify-center w-24 h-24 rounded-[2rem] shadow-2xl shadow-emerald-500/40 bg-gradient-to-br from-emerald-400 to-emerald-600 border-4 border-emerald-300 dark:border-emerald-700/50"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.7, bounce: 0.5 }}
                >
                  <CircleCheck className="h-12 w-12 text-white drop-shadow-md" />
                </motion.div>
                <div className="relative z-10">
                  <motion.p 
                    className="text-2xl font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em] mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    ¡Acceso Concedido!
                  </motion.p>
                  <motion.p 
                    className="text-xs text-emerald-700/60 dark:text-emerald-400/60 uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Loader2 className="h-3 w-3 animate-spin" /> Estableciendo enlace seguro...
                  </motion.p>
                </div>
              </motion.div>
            ) : (
              <div className="p-5 rounded-2xl border border-border/40 bg-muted/20 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl" style={{
                    background: verificationMethod === 'email'
                      ? 'linear-gradient(135deg, #dbeafe, #bfdbfe)'
                      : verificationMethod === 'whatsapp'
                        ? 'linear-gradient(135deg, #bbf7d0, #86efac)'
                        : 'linear-gradient(135deg, #d1fae5, #a7f3d0)'
                  }}>
                    {verificationMethod === 'email'
                      ? <Mail className="h-5 w-5 text-blue-600" />
                      : verificationMethod === 'whatsapp'
                        ? <MessageCircle className="h-5 w-5 text-green-700" />
                        : <Smartphone className="h-5 w-5 text-emerald-600" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-foreground/80">
                      {verificationMethod === 'email' ? 'Código enviado por correo' : verificationMethod === 'sms' ? 'Código enviado por SMS' : 'Código enviado por WhatsApp'}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {verificationMethod === 'email' ? maskedEmail : maskedPhone}
                    </p>
                  </div>
                  {hasPhone && (
                    <button
                      type="button"
                      onClick={() => {
                        setSingleCode('');
                        setError(null);
                        const methodsEl = document.getElementById('login-method-cards');
                        if (methodsEl) methodsEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="text-xs font-bold text-muted-foreground hover:text-foreground px-2 py-1 rounded-lg hover:bg-muted/50 transition-colors shrink-0"
                    >
                      Cambiar
                    </button>
                  )}
                </div>

                {devCode && (
                  <motion.div
                    className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/20"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 shadow-md">
                      <Shield className="h-[18px] w-[18px] text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400">System Kyron — Verificación Segura</p>
                      <p className="text-[12px] text-muted-foreground mt-0.5">Usa este código o haz clic para autocompletar:</p>
                      <button
                        type="button"
                        onClick={() => { setSingleCode(devCode); }}
                        className="text-3xl font-bold font-mono tracking-wider text-cyan-600 dark:text-cyan-400 mt-2 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                      >
                        {devCode}
                      </button>
                      <p className="text-[10px] text-muted-foreground/60 mt-1.5">Válido por 10 minutos · Toca el código para usar</p>
                    </div>
                  </motion.div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 py-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-xs text-emerald-600 font-semibold uppercase tracking-widest">
                      {verificationMethod === 'email' ? 'Esperando verificación' : verificationMethod === 'sms' ? 'Código enviado por SMS' : 'Código enviado por WhatsApp'}
                    </p>
                  </div>

                  <Input
                    ref={singleInputRef}
                    placeholder="000000"
                    inputMode="numeric"
                    maxLength={6}
                    value={singleCode}
                    onChange={e => setSingleCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className={cn("text-center text-3xl font-bold tracking-wider h-16 rounded-2xl bg-card border-2 border-border/40 focus:border-primary shadow-sm text-foreground", singleCode.length === 6 && theme.codeBorder)}
                    disabled={isLoading}
                    autoComplete="one-time-code"
                  />

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500/[0.06] dark:bg-amber-500/[0.08] border border-amber-500/20">
                          <div className="shrink-0 h-7 w-7 rounded-lg bg-amber-500/10 flex items-center justify-center">
                            <TriangleAlert className="h-3.5 w-3.5 text-amber-500" />
                          </div>
                          <p className="text-[12px] font-medium text-amber-600 dark:text-amber-400">{error}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {isLoading && (
                    <div className="flex items-center justify-center gap-2 py-3 text-sm text-primary font-semibold">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Verificando...
                    </div>
                  )}

                  {!devCode && verificationMethod === 'email' && (
                    <p className="text-[11px] text-muted-foreground/60 text-center">
                      También puedes hacer clic en el <strong className="text-primary/70">enlace</strong> del correo para verificar automáticamente
                    </p>
                  )}

                  <div className="text-center">
                    {countdown > 0 ? (
                      <p className="text-xs text-muted-foreground">Expira en <span className="font-bold font-mono text-amber-500">{formatCountdown(countdown)}</span></p>
                    ) : (
                      <button type="button" onClick={handleResendCode} disabled={isLoading} className={cn("text-xs font-semibold hover:underline inline-flex items-center gap-1.5 transition-colors", theme.accent)}>
                        <RefreshCw className="h-3 w-3" /> Reenviar código
                      </button>
                    )}
                  </div>
                </div>

                {hasPhone && (
                  <div id="login-method-cards" className="space-y-2 pt-2 border-t border-border/30">
                    <p className="text-[11px] font-semibold text-muted-foreground text-center uppercase tracking-widest">Cambiar método</p>
                    <div className="grid grid-cols-3 gap-2">
                      {([
                        { method: 'email' as const, icon: Mail, label: 'Correo', gradientBg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', iconColor: 'text-blue-600', borderActive: 'border-blue-400', hoverBg: 'hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30' },
                        { method: 'sms' as const, icon: Smartphone, label: 'SMS', gradientBg: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', iconColor: 'text-emerald-600', borderActive: 'border-emerald-400', hoverBg: 'hover:border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30' },
                        { method: 'whatsapp' as const, icon: MessageCircle, label: 'WhatsApp', gradientBg: 'linear-gradient(135deg, #bbf7d0, #86efac)', iconColor: 'text-green-700', borderActive: 'border-green-500', hoverBg: 'hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-950/30' },
                      ]).map(({ method, icon: MethodIcon, label, gradientBg, iconColor, borderActive, hoverBg }) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => handleSwitchMethod(method)}
                          disabled={switchingMethod || isLoading || verificationMethod === method}
                          className={cn(
                            "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200",
                            verificationMethod === method
                              ? cn(borderActive, "bg-primary/5")
                              : cn("border-border/30", hoverBg),
                            (switchingMethod || isLoading) && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          <div className="p-2 rounded-lg" style={{ background: gradientBg }}>
                            <MethodIcon className={cn("h-4 w-4", iconColor)} />
                          </div>
                          <span className="text-[11px] font-bold text-foreground/70">{label}</span>
                        </button>
                      ))}
                    </div>
                    {switchingMethod && (
                      <div className="flex items-center justify-center gap-2 py-1">
                        <Loader2 className={cn("h-3.5 w-3.5 animate-spin", theme.accent)} />
                        <span className="text-[11px] text-muted-foreground">Enviando código...</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-3">
              <Button variant="outline" onClick={handleBackToLogin} className="w-full h-11 rounded-xl text-[13px] font-semibold border-border/40 hover:bg-muted/50" disabled={isLoading}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Volver a iniciar sesión
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  const brandPanel = (
    <div className={cn('hidden md:flex relative overflow-hidden flex-col justify-between text-white bg-gradient-to-br p-8 md:p-10', theme.gradient)}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/[0.07] blur-[80px]" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/[0.05] blur-[60px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/[0.02] blur-[100px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="loginGrid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.4"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#loginGrid)"/>
        </svg>
      </div>

      <div className="relative z-10 space-y-8">
        <motion.div
          className="h-14 w-14 rounded-2xl bg-white/[0.12] backdrop-blur-sm border border-white/[0.15] flex items-center justify-center shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Icon className="h-7 w-7 text-white" />
        </motion.div>
        <div className="space-y-3">
          <motion.h1
            className="text-2xl md:text-3xl font-bold tracking-tight leading-tight"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            {portalName}
          </motion.h1>
          <motion.p
            className="text-[13px] font-medium text-white/70 leading-relaxed max-w-sm"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {portalDescription}
          </motion.p>
        </div>
      </div>

      {features.length > 0 && (
        <motion.div
          className="relative z-10 mt-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <div className="h-px bg-white/10 mb-6" />
          <ul className="space-y-3">
            {features.map((feature, i) => (
              <motion.li
                key={i}
                className="flex items-center gap-3 text-[13px] font-medium text-white/80"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.06, duration: 0.3 }}
              >
                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                </div>
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      <motion.div
        className="relative z-10 mt-8 pt-4 border-t border-white/[0.06]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
      >
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-white/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Sistema activo · Enlace seguro
        </div>
      </motion.div>
    </div>
  );

  const mobileHeader = (
    <div className={cn("flex md:hidden items-center gap-3 mb-6 pb-5 border-b border-border/20")}>
      <div className={cn("h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center shadow text-white shrink-0", theme.gradient)}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-bold tracking-tight text-foreground">{portalName}</p>
        <p className="text-[11px] text-muted-foreground leading-tight">{portalDescription}</p>
      </div>
    </div>
  );

  const backButton = (
    <Button variant="ghost" asChild className="absolute top-6 left-6 md:top-8 md:left-8 h-9 rounded-xl text-xs text-muted-foreground hover:text-foreground z-20">
      <Link href={footerLinks?.primary.href as any ?? '/login'} className="flex items-center">
        <ChevronLeft className="mr-1.5 h-4 w-4" /> {footerLinks?.primary.text ?? 'Volver'}
      </Link>
    </Button>
  );

  const pageBackground = (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#050816]">
      {/* HUD Grid Overlay */}
      <div className="absolute inset-0 hud-grid opacity-20" />
      
      {/* Dynamic Glows */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] blur-[150px] opacity-20 rounded-full animate-pulse-slow" style={{ background: theme.glowFrom }} />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] blur-[150px] opacity-10 rounded-full animate-pulse" style={{ background: theme.glowFrom }} />
      
      {/* Animated Scanline */}
      <motion.div 
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[1px] bg-cyan-500/10 z-10 pointer-events-none"
      />
    </div>
  );

  if (layoutVariant === 'split-right') {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 md:p-8 w-full relative overflow-hidden">
        {pageBackground}
        {backButton}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[1040px] grid md:grid-cols-2 gap-0 rounded-3xl shadow-lg shadow-black/[0.12] overflow-hidden border border-border/40"
        >
          <div className="p-6 md:p-10 flex flex-col justify-center bg-card">
            {mobileHeader}
            {formContent}
          </div>
          {brandPanel}
        </motion.div>
        <p className="absolute bottom-6 text-[11px] text-muted-foreground/25 uppercase tracking-widest font-semibold">System Kyron · Enlace Seguro</p>
      </div>
    );
  }

  if (layoutVariant === 'centered') {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 md:p-8 w-full relative overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className={cn("absolute inset-0 bg-gradient-to-br opacity-[0.06]", theme.gradient)} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[200px] opacity-40" style={{ background: theme.glowFrom }} />
          <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-background to-transparent" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="centeredHex" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
              <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100" fill="none" stroke="currentColor" strokeWidth="0.3"/>
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#centeredHex)"/>
          </svg>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              animate={{ opacity: [0.1, 0.35, 0.1], scale: [1, 1.3, 1] }}
              transition={{ duration: 5 + i * 0.8, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
              style={{
                width: 4 + (i % 4) * 3,
                height: 4 + (i % 4) * 3,
                left: `${8 + i * 12}%`,
                top: `${10 + (i % 5) * 18}%`,
                background: `radial-gradient(circle, ${theme.glowFrom}, transparent)`,
              }}
            />
          ))}
        </div>
        {backButton}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[480px] relative"
        >
          <div className="text-center mb-8">
            <motion.div
              className={cn("mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-xl shadow-black/20 mb-5", theme.gradient)}
              initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.15, duration: 0.5, type: "spring" }}
            >
              <Icon className="h-8 w-8 text-white" />
            </motion.div>
            <motion.h1
              className={cn("text-3xl font-bold tracking-tight bg-gradient-to-r bg-clip-text text-transparent", theme.gradient)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              {portalName}
            </motion.h1>
            <motion.p
              className="text-[13px] text-muted-foreground mt-2 max-w-sm mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              {portalDescription}
            </motion.p>
            {features.length > 0 && (
              <motion.div
                className="flex items-center justify-center gap-4 mt-4 flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                {features.map((f, i) => (
                  <span key={i} className={cn("inline-flex items-center gap-1.5 text-[11px] font-semibold", theme.accent)}>
                    <ShieldCheck className="h-3 w-3" />
                    {f}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })}
            className="group relative rounded-2xl border border-border/40 bg-card/80 backdrop-blur-xl p-6 md:p-8 shadow-lg shadow-black/[0.08] overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
              style={{
                background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${theme.glowFrom}, transparent 40%)`,
              }}
            />
            <div className="relative z-10">
              {formContent}
            </div>
          </motion.div>
        </motion.div>
        <p className="absolute bottom-6 text-[11px] text-muted-foreground/25 uppercase tracking-widest font-semibold">System Kyron · Enlace Seguro</p>
      </div>
    );
  }

  if (layoutVariant === 'stacked') {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 md:p-8 w-full relative overflow-hidden">
        {pageBackground}
        {backButton}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="group relative w-full max-w-[540px] rounded-3xl shadow-lg shadow-black/[0.12] overflow-hidden border border-border/40"
        >
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${theme.glowFrom}, transparent 40%)`,
            }}
          />
          <div className={cn('relative z-10 overflow-hidden text-white bg-gradient-to-br p-8 md:p-10', theme.gradient)}>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/[0.07] blur-[70px]" />
              <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-white/[0.05] blur-[50px]" />
              <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
                <defs><pattern id="stackedDots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="white" opacity="0.5"/></pattern></defs>
                <rect width="100%" height="100%" fill="url(#stackedDots)"/>
              </svg>
            </div>
            <div className="relative z-10 flex items-center gap-5">
              <motion.div
                className="h-14 w-14 rounded-2xl bg-white/[0.12] backdrop-blur-sm border border-white/[0.15] flex items-center justify-center shadow-lg shrink-0"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <Icon className="h-7 w-7 text-white" />
              </motion.div>
              <div>
                <motion.h1
                  className="text-2xl font-bold tracking-tight"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                >
                  {portalName}
                </motion.h1>
                <motion.p
                  className="text-[12px] font-medium text-white/60 mt-1 max-w-sm"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  {portalDescription}
                </motion.p>
              </div>
            </div>
            {features.length > 0 && (
              <motion.div
                className="relative z-10 flex items-center gap-3 mt-6 flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                {features.map((f, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-[11px] font-semibold text-white/80 border border-white/[0.08]">
                    <ShieldCheck className="h-3 w-3 text-emerald-300" />
                    {f}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
          <div className="p-6 md:p-10 bg-card">
            {formContent}
          </div>
        </motion.div>
        <p className="absolute bottom-6 text-[11px] text-muted-foreground/25 uppercase tracking-widest font-semibold">System Kyron · Enlace Seguro</p>
      </div>
    );
  }

  if (layoutVariant === 'minimal') {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 md:p-8 w-full relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-muted/20">
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-[180px] opacity-30" style={{ background: theme.glowFrom }} />
        </div>
        {backButton}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[440px]"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className={cn("h-12 w-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg text-white shrink-0", theme.gradient)}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">{portalName}</h1>
              <p className="text-[12px] text-muted-foreground mt-0.5">{portalDescription}</p>
            </div>
          </div>
          {features.length > 0 && (
            <motion.div
              className="grid grid-cols-3 gap-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {features.map((f, i) => (
                <div key={i} className="p-3 rounded-xl border border-border/30 bg-card/50 text-center">
                  <ShieldCheck className={cn("h-4 w-4 mx-auto mb-1.5", theme.accent)} />
                  <p className="text-[10px] font-semibold text-foreground/70 leading-tight">{f}</p>
                </div>
              ))}
            </motion.div>
          )}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })}
            className="group relative rounded-2xl border border-border/30 bg-card p-6 md:p-8 shadow-xl shadow-black/[0.06] overflow-hidden"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
              style={{
                background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${theme.glowFrom}, transparent 40%)`,
              }}
            />
            <div className="relative z-10">
              {formContent}
            </div>
          </motion.div>
        </motion.div>
        <p className="absolute bottom-6 text-[11px] text-muted-foreground/25 uppercase tracking-widest font-semibold">System Kyron · Enlace Seguro</p>
      </div>
    );
  }

  if (layoutVariant === 'dark-immersive') {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 md:p-8 w-full relative overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden bg-[#0a0a0f]">
          <div className={cn("absolute inset-0 bg-gradient-to-br opacity-[0.15]", theme.gradient)} />
          <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full blur-[250px] opacity-25" style={{ background: theme.glowFrom }} />
          <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full blur-[200px] opacity-15" style={{ background: theme.glowFrom }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="darkCircuit" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 0 L30 20 M30 40 L30 60 M0 30 L20 30 M40 30 L60 30" fill="none" stroke="white" strokeWidth="0.5"/>
                <circle cx="30" cy="30" r="3" fill="none" stroke="white" strokeWidth="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#darkCircuit)"/>
          </svg>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              animate={{ opacity: [0.05, 0.2, 0.05], y: [0, -20, 0] }}
              transition={{ duration: 4 + i * 0.6, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
              style={{
                width: 2 + (i % 3),
                height: 2 + (i % 3),
                left: `${5 + i * 8}%`,
                top: `${10 + (i % 6) * 14}%`,
                background: theme.glowFrom.replace('0.15', '0.6'),
              }}
            />
          ))}
        </div>
        <Button variant="ghost" asChild className="absolute top-6 left-6 md:top-8 md:left-8 h-9 rounded-xl text-xs text-white/40 hover:text-white/80 z-20">
          <Link href={footerLinks?.primary.href as any ?? '/login'} className="flex items-center">
            <ChevronLeft className="mr-1.5 h-4 w-4" /> {footerLinks?.primary.text ?? 'Volver'}
          </Link>
        </Button>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[480px] relative"
        >
          <div className="text-center mb-8">
            <motion.div
              className={cn("mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg mb-5 ring-1 ring-white/10", theme.gradient)}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5, type: "spring" }}
            >
              <Icon className="h-8 w-8 text-white" />
            </motion.div>
            <motion.h1
              className="text-3xl font-bold tracking-tight text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              {portalName}
            </motion.h1>
            <motion.p
              className="text-[13px] text-white/40 mt-2 max-w-sm mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              {portalDescription}
            </motion.p>
            {features.length > 0 && (
              <motion.div
                className="flex items-center justify-center gap-3 mt-5 flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                {features.map((f, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] text-[11px] font-semibold text-white/60 border border-white/[0.08]">
                    <ShieldCheck className="h-3 w-3 text-emerald-400" />
                    {f}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })}
            className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl p-6 md:p-8 shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
              style={{
                background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${theme.glowFrom}, transparent 40%)`,
              }}
            />
            <div className="relative z-10 dark-immersive-form" style={{ '--di-fg': 'rgb(255 255 255)', '--di-fg-80': 'rgb(255 255 255 / 0.7)', '--di-muted': 'rgb(255 255 255 / 0.4)', '--di-muted-60': 'rgb(255 255 255 / 0.25)', '--di-bg-subtle': 'rgb(255 255 255 / 0.05)', '--di-bg-card': 'rgb(255 255 255 / 0.06)', '--di-border': 'rgb(255 255 255 / 0.08)', '--di-border-strong': 'rgb(255 255 255 / 0.1)' } as React.CSSProperties}>
              {formContent}
            </div>
          </motion.div>
        </motion.div>
        <p className="absolute bottom-6 text-[11px] text-white/15 uppercase tracking-widest font-semibold">System Kyron · Enlace Seguro</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8 w-full relative overflow-hidden bg-[#050816]">
      {pageBackground}
      {backButton}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1040px] grid md:grid-cols-2 gap-0 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/5 bg-white/[0.01] backdrop-blur-3xl relative z-10"
      >
        {brandPanel}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-white/[0.02]">
          {mobileHeader}
          {formContent}
        </div>
      </motion.div>
      <p className="absolute bottom-6 text-[11px] text-white/20 uppercase tracking-[0.3em] font-black">System Kyron · Misión Crítica</p>
    </div>
  );
}
