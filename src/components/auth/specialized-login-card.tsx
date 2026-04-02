'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Loader2, ChevronLeft, CircleCheck, ShieldCheck, ArrowRight,
  UserPlus, Eye, EyeOff, TriangleAlert, Mail, Lock, KeyRound, RotateCcw, Sparkles, Zap,
  Smartphone, MessageSquare, MessageCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Link } from '@/navigation';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const ACCENT_THEMES: Record<string, { gradient: string; accent: string; ring: string; inputRing: string; codeBorder: string; btnBg: string; glowFrom: string }> = {
  'primary':     { gradient: 'from-blue-600 via-primary to-indigo-700',     accent: 'text-blue-500',    ring: 'ring-blue-500/20',    inputRing: 'focus-visible:ring-blue-500/30 focus-visible:border-blue-500/50', codeBorder: 'border-blue-500', btnBg: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500', glowFrom: 'rgba(59,130,246,0.15)' },
  'secondary':   { gradient: 'from-emerald-600 via-secondary to-teal-700',  accent: 'text-emerald-500', ring: 'ring-emerald-500/20', inputRing: 'focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500/50', codeBorder: 'border-emerald-500', btnBg: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500', glowFrom: 'rgba(16,185,129,0.15)' },
  'emerald-600': { gradient: 'from-emerald-600 via-emerald-500 to-green-600', accent: 'text-emerald-500', ring: 'ring-emerald-500/20', inputRing: 'focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500/50', codeBorder: 'border-emerald-500', btnBg: 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500', glowFrom: 'rgba(16,185,129,0.15)' },
  'emerald-800': { gradient: 'from-emerald-800 via-emerald-700 to-teal-800', accent: 'text-emerald-500', ring: 'ring-emerald-500/20', inputRing: 'focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500/50', codeBorder: 'border-emerald-500', btnBg: 'bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600', glowFrom: 'rgba(16,185,129,0.12)' },
  'indigo-950':  { gradient: 'from-indigo-900 via-purple-800 to-violet-900', accent: 'text-purple-500',  ring: 'ring-purple-500/20',  inputRing: 'focus-visible:ring-purple-500/30 focus-visible:border-purple-500/50', codeBorder: 'border-purple-500', btnBg: 'bg-gradient-to-r from-purple-700 to-violet-700 hover:from-purple-600 hover:to-violet-600', glowFrom: 'rgba(139,92,246,0.15)' },
  'slate-800':   { gradient: 'from-slate-700 via-slate-600 to-zinc-700',     accent: 'text-slate-400',   ring: 'ring-slate-400/20',   inputRing: 'focus-visible:ring-slate-400/30 focus-visible:border-slate-400/50', codeBorder: 'border-slate-400', btnBg: 'bg-gradient-to-r from-slate-700 to-zinc-700 hover:from-slate-600 hover:to-zinc-600', glowFrom: 'rgba(100,116,139,0.12)' },
  'blue-900':    { gradient: 'from-blue-900 via-blue-800 to-cyan-800',       accent: 'text-cyan-500',    ring: 'ring-cyan-500/20',    inputRing: 'focus-visible:ring-cyan-500/30 focus-visible:border-cyan-500/50', codeBorder: 'border-cyan-500', btnBg: 'bg-gradient-to-r from-blue-800 to-cyan-800 hover:from-blue-700 hover:to-cyan-700', glowFrom: 'rgba(6,182,212,0.15)' },
  'amber-700':   { gradient: 'from-amber-700 via-amber-600 to-orange-700',   accent: 'text-amber-500',   ring: 'ring-amber-500/20',   inputRing: 'focus-visible:ring-amber-500/30 focus-visible:border-amber-500/50', codeBorder: 'border-amber-500', btnBg: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500', glowFrom: 'rgba(245,158,11,0.15)' },
  'rose-800':    { gradient: 'from-rose-800 via-rose-700 to-pink-800',       accent: 'text-rose-500',    ring: 'ring-rose-500/20',    inputRing: 'focus-visible:ring-rose-500/30 focus-visible:border-rose-500/50', codeBorder: 'border-rose-500', btnBg: 'bg-gradient-to-r from-rose-700 to-pink-700 hover:from-rose-600 hover:to-pink-600', glowFrom: 'rgba(244,63,94,0.15)' },
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
  const [showAccessKey, setShowAccessKey] = useState(false);
  const [useAccessKey, setUseAccessKey] = useState(false);
  const [step, setStep] = useState<'credentials' | 'verification'>('credentials');
  const [loginMode, setLoginMode] = useState<'email' | 'phone'>('email');
  const [phoneMethod, setPhoneMethod] = useState<'sms' | 'whatsapp'>('sms');
  const [verificationEmail, setVerificationEmail] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(0);
  const [emailDeliveryFailed, setEmailDeliveryFailed] = useState(false);
  const [savedCredentials, setSavedCredentials] = useState<{ email: string; password: string } | null>(null);
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'sms' | 'whatsapp'>('email');
  const [hasPhone, setHasPhone] = useState(false);
  const [maskedPhone, setMaskedPhone] = useState('');
  const [switchingMethod, setSwitchingMethod] = useState(false);
  const [challengeToken, setChallengeToken] = useState('');
  const [devCode, setDevCode] = useState<string | null>(null);
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
    if (step === 'verification') setTimeout(() => inputRefs.current[0]?.focus(), 100);
  }, [step]);

  const attemptLogin = async (email: string, password: string, accessKey?: string) => {
    setIsLoading(true);
    setError(null);
    setEmailDeliveryFailed(false);
    try {
      const body: Record<string, string> = { email, password };
      if (accessKey && accessKey.trim()) body.accessKey = accessKey.trim();

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        if (json.emailDeliveryFailed) {
          setSavedCredentials({ email, password });
          setEmailDeliveryFailed(true);
          setError(json.error || 'No pudimos enviar el código de verificación.');
        } else if (res.status === 401) {
          setSavedCredentials(null);
          setError('NO_ACCOUNT');
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
        setVerificationEmail(email);
        setMaskedEmail(json.maskedEmail || email);
        setUserName(json.nombre || '');
        setHasPhone(!!json.hasPhone);
        setMaskedPhone(json.maskedPhone || '');
        setChallengeToken(json.challengeToken || '');
        setDevCode(json.devCode || null);
        setVerificationMethod('email');
        setStep('verification');
        setCountdown(600);
        setCodeDigits(['', '', '', '', '', '']);
        setEmailDeliveryFailed(false);
        setSavedCredentials(null);
        setIsLoading(false);
        if (json.devCode) {
          toast({ title: 'Modo desarrollo', description: 'Código mostrado en pantalla', action: <Sparkles className="text-amber-500 h-4 w-4" /> });
        } else if (json.emailFailed && json.hasPhone) {
          toast({ title: 'Correo no disponible', description: json.emailFailedMessage || 'Usa SMS o WhatsApp para recibir tu código.', action: <Smartphone className="text-amber-500 h-4 w-4" /> });
        } else {
          toast({ title: 'Código enviado', description: `Revisa tu correo ${json.maskedEmail || email}`, action: <Mail className="text-cyan-500 h-4 w-4" /> });
        }
        return;
      }
      toast({ title: 'Acceso concedido', description: `Bienvenido, ${json.user?.nombre ?? ''}.`, action: <CircleCheck className="text-emerald-500 h-4 w-4" /> });
      router.push(redirectPath as any);
    } catch { setError('Error de conexión.'); setIsLoading(false); }
  };

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = (formData.get('email') as string || '').trim().toLowerCase();
    const password = formData.get('password') as string;
    const accessKey = formData.get('accessKey') as string || '';
    await attemptLogin(email, password, accessKey);
  };

  const handleResendEmail = async () => {
    if (!savedCredentials) return;
    await attemptLogin(savedCredentials.email, savedCredentials.password);
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
      if (!res.ok) {
        setError(json.error || 'Error al enviar código.');
        setIsLoading(false);
        return;
      }
      if (json.requiresVerification) {
        setVerificationEmail(json.email);
        setMaskedPhone(json.maskedPhone || '');
        setUserName(json.nombre || '');
        setHasPhone(true);
        setChallengeToken(json.challengeToken || '');
        setDevCode(null);
        setVerificationMethod(phoneMethod);
        setStep('verification');
        setCountdown(600);
        setCodeDigits(['', '', '', '', '', '']);
        setIsLoading(false);
        const channelLabel = phoneMethod === 'sms' ? 'SMS' : 'WhatsApp';
        const icon = phoneMethod === 'sms'
          ? <Smartphone className="text-emerald-500 h-4 w-4" />
          : <MessageCircle className="text-green-500 h-4 w-4" />;
        toast({ title: `Código enviado por ${channelLabel}`, description: `Revisa tu ${channelLabel} en ${json.maskedPhone}`, action: icon });
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
      router.push(redirectPath as any);
    } catch { setError('Error de conexión.'); setCodeDigits(['', '', '', '', '', '']); setIsLoading(false); }
  };

  const handleResendCode = () => { setStep('credentials'); setError(null); setCodeDigits(['', '', '', '', '', '']); setVerificationMethod('email'); setChallengeToken(''); setHasPhone(false); setMaskedPhone(''); setDevCode(null); };
  const formatCountdown = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const handleSwitchMethod = async (method: 'email' | 'sms' | 'whatsapp') => {
    if (method === verificationMethod || switchingMethod) return;
    setSwitchingMethod(true);
    setError(null);
    setCodeDigits(['', '', '', '', '', '']);
    try {
      const body: Record<string, string> = { method, destino: verificationEmail, tipo: method };
      if ((method === 'sms' || method === 'whatsapp') && challengeToken) {
        body.challengeToken = challengeToken;
      }
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'No se pudo enviar el código.');
        setSwitchingMethod(false);
        return;
      }
      setVerificationMethod(method);
      setCountdown(600);
      if (json.devCode) {
        setDevCode(json.devCode);
        toast({ title: 'Modo desarrollo', description: 'Código mostrado en pantalla', action: <Sparkles className="text-amber-500 h-4 w-4" /> });
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
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch {
      setError('Error de conexión al reenviar código.');
    } finally {
      setSwitchingMethod(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8 w-full relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-primary/[0.03] to-transparent" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[150px] opacity-60" style={{ background: theme.glowFrom }} />
        <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-primary/[0.02] blur-[100px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.015]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="lgGrid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#lgGrid)"/>
        </svg>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            animate={{
              opacity: [0.15, 0.4, 0.15],
              y: [0, -15, 0],
            }}
            transition={{ duration: 6 + i, repeat: Infinity, delay: i * 1.2, ease: "easeInOut" }}
            style={{
              width: 3 + (i % 3) * 2,
              height: 3 + (i % 3) * 2,
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 4) * 20}%`,
              background: `linear-gradient(135deg, ${theme.glowFrom}, transparent)`,
            }}
          />
        ))}
      </div>

      <Button variant="ghost" asChild className="absolute top-6 left-6 md:top-8 md:left-8 h-9 rounded-xl text-xs text-muted-foreground hover:text-foreground z-20">
        <Link href={footerLinks?.primary.href as any ?? '/login'} className="flex items-center">
          <ChevronLeft className="mr-1.5 h-4 w-4" /> {footerLinks?.primary.text ?? 'Volver'}
        </Link>
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn("w-full max-w-[1040px] grid md:grid-cols-2 gap-0 rounded-3xl shadow-2xl shadow-black/[0.12] overflow-hidden border border-border/40")}
      >
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
                className="text-2xl md:text-3xl font-black tracking-tight leading-tight"
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
            <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Sistema activo · Enlace seguro
            </div>
          </motion.div>
        </div>

        <div className="p-6 md:p-10 flex flex-col justify-center bg-card">
          <div className={cn("flex md:hidden items-center gap-3 mb-6 pb-5 border-b border-border/20")}>
            <div className={cn("h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center shadow text-white shrink-0", theme.gradient)}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-black tracking-tight text-foreground">{portalName}</p>
              <p className="text-[11px] text-muted-foreground leading-tight">{portalDescription}</p>
            </div>
          </div>
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
                  <h2 className="text-xl font-black tracking-tight text-foreground">Iniciar Sesión</h2>
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
                            <Button type="button" variant="outline" size="sm" className="w-full h-9 text-xs font-bold rounded-lg border-amber-500/25 text-amber-600 hover:bg-amber-500/10 hover:text-amber-700">
                              <UserPlus className="mr-1.5 h-3.5 w-3.5" /> Crear Cuenta Ahora
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
                        <Label className="text-[13px] font-semibold text-foreground/80">Correo Electrónico</Label>
                        <div className="relative group">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                          <Input name="email" type="email" placeholder="tu@correo.com" required autoComplete="email" className={cn("h-12 pl-10 rounded-xl border-border/50 bg-muted/20 text-[13px] transition-all", theme.inputRing)} />
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
              >
                <div className="mb-8 text-center">
                  <motion.div
                    className={cn("mx-auto w-16 h-16 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center mb-5")}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, type: "spring" }}
                  >
                    {verificationMethod === 'whatsapp'
                      ? <MessageCircle className={cn("h-7 w-7 text-green-500")} />
                      : verificationMethod === 'sms'
                        ? <Smartphone className={cn("h-7 w-7", theme.accent)} />
                        : <KeyRound className={cn("h-7 w-7", theme.accent)} />
                    }
                  </motion.div>
                  <h2 className="text-xl font-black tracking-tight text-foreground">Verificación</h2>
                  <p className="text-[13px] text-muted-foreground mt-2">
                    {devCode ? 'Ingresa el código mostrado abajo' : (
                      <>Código de 6 dígitos enviado a{' '}
                      <strong className="text-foreground">
                        {verificationMethod === 'email' ? maskedEmail : maskedPhone}
                      </strong>
                      {verificationMethod === 'whatsapp' && <span className="text-green-500 ml-1">(WhatsApp)</span>}
                      </>
                    )}
                  </p>
                  {!devCode && verificationMethod === 'email' && (
                    <p className="text-[11px] text-muted-foreground/60 mt-1.5">
                      También puedes hacer clic en el <strong className="text-primary/70">enlace</strong> del correo para verificar automáticamente
                    </p>
                  )}
                  {countdown > 0 && (
                    <p className="text-xs text-muted-foreground mt-1.5">
                      Expira en <span className="font-mono font-bold text-amber-500">{formatCountdown(countdown)}</span>
                    </p>
                  )}

                  {hasPhone && (
                    <div className="flex items-center justify-center gap-1.5 mt-4 flex-wrap">
                      {([
                        { method: 'email' as const, icon: Mail, label: 'Correo', activeColor: theme.accent },
                        { method: 'sms' as const, icon: Smartphone, label: 'SMS', activeColor: theme.accent },
                        { method: 'whatsapp' as const, icon: MessageCircle, label: 'WhatsApp', activeColor: 'text-green-500' },
                      ]).map(({ method, icon: MethodIcon, label, activeColor }) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => handleSwitchMethod(method)}
                          disabled={switchingMethod || isLoading}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all",
                            verificationMethod === method
                              ? cn("bg-primary/10 border border-primary/20", activeColor)
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
                          )}
                        >
                          <MethodIcon className="h-3.5 w-3.5" />
                          {label}
                        </button>
                      ))}
                    </div>
                  )}

                  {switchingMethod && (
                    <div className="flex items-center justify-center gap-2 mt-3">
                      <Loader2 className={cn("h-3.5 w-3.5 animate-spin", theme.accent)} />
                      <span className="text-[11px] text-muted-foreground">Enviando código...</span>
                    </div>
                  )}
                </div>

                {devCode && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-5">
                    <Sparkles className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Modo Desarrollo</p>
                      <p className="text-[12px] text-muted-foreground mt-0.5">El email no está configurado. Tu código es:</p>
                      <p className="text-3xl font-black font-mono tracking-[0.3em] text-amber-600 dark:text-amber-400 mt-2">{devCode}</p>
                    </div>
                  </div>
                )}

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mb-5"
                    >
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/15">
                        <TriangleAlert className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                        <p className="text-[13px] text-destructive">{error}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-center gap-1.5 xs:gap-2 sm:gap-2.5 mb-6">
                  {codeDigits.map((digit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                    >
                      <Input
                        ref={el => { inputRefs.current[i] = el; }}
                        type="text" inputMode="numeric" maxLength={6} value={digit}
                        onChange={e => handleCodeChange(i, e.target.value)}
                        onKeyDown={e => handleCodeKeyDown(i, e)}
                        onPaste={e => { e.preventDefault(); const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6); if (pasted) handleCodeChange(0, pasted); }}
                        className={cn("w-10 h-12 xs:w-11 xs:h-13 sm:w-12 sm:h-14 md:w-13 md:h-16 text-center text-xl sm:text-2xl font-black rounded-lg sm:rounded-xl border-2 transition-all duration-200 bg-muted/20", digit ? cn(theme.codeBorder, "bg-primary/5") : "border-border/40 focus:border-primary")}
                        disabled={isLoading} autoComplete="one-time-code"
                      />
                    </motion.div>
                  ))}
                </div>

                {isLoading && (
                  <div className="flex items-center justify-center gap-2 mb-5">
                    <Loader2 className={cn("h-4 w-4 animate-spin", theme.accent)} />
                    <span className="text-[13px] text-muted-foreground">Verificando...</span>
                  </div>
                )}

                <div className="space-y-3 mt-4">
                  <Button variant="outline" onClick={handleResendCode} className="w-full h-11 rounded-xl text-[13px] font-semibold border-border/40" disabled={isLoading}>
                    <RotateCcw className="mr-2 h-4 w-4" /> Volver a iniciar sesión
                  </Button>
                  <p className="text-center text-xs text-muted-foreground/60">
                    ¿No recibiste el código?{' '}
                    <button onClick={handleResendCode} className={cn("hover:underline font-medium", theme.accent)} disabled={isLoading}>Solicitar nuevo</button>
                    {hasPhone && verificationMethod === 'email' && (
                      <>
                        {' · '}
                        <button onClick={() => handleSwitchMethod('sms')} className={cn("hover:underline font-medium", theme.accent)} disabled={isLoading || switchingMethod}>
                          SMS
                        </button>
                        {' · '}
                        <button onClick={() => handleSwitchMethod('whatsapp')} className="hover:underline font-medium text-green-500" disabled={isLoading || switchingMethod}>
                          WhatsApp
                        </button>
                      </>
                    )}
                    {verificationMethod === 'sms' && (
                      <>
                        {' · '}
                        <button onClick={() => handleSwitchMethod('email')} className={cn("hover:underline font-medium", theme.accent)} disabled={isLoading || switchingMethod}>
                          Correo
                        </button>
                        {' · '}
                        <button onClick={() => handleSwitchMethod('whatsapp')} className="hover:underline font-medium text-green-500" disabled={isLoading || switchingMethod}>
                          WhatsApp
                        </button>
                      </>
                    )}
                    {verificationMethod === 'whatsapp' && (
                      <>
                        {' · '}
                        <button onClick={() => handleSwitchMethod('email')} className={cn("hover:underline font-medium", theme.accent)} disabled={isLoading || switchingMethod}>
                          Correo
                        </button>
                        {' · '}
                        <button onClick={() => handleSwitchMethod('sms')} className={cn("hover:underline font-medium", theme.accent)} disabled={isLoading || switchingMethod}>
                          SMS
                        </button>
                      </>
                    )}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <p className="absolute bottom-6 text-[9px] text-muted-foreground/25 uppercase tracking-widest font-semibold">System Kyron · Enlace Seguro</p>
    </div>
  );
}
