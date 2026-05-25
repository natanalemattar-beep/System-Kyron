'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Loader2, User, ChevronLeft, Fingerprint, ShieldCheck, UserPlus, Shield,
  Eye, EyeOff, CircleCheck, ArrowRight, TriangleAlert, Mail, Lock,
  KeyRound, RotateCcw, Scan, Sparkles, Smartphone, MessageSquare, MessageCircle,
  Cpu
} from 'lucide-react';
import { useRouter, Link } from '@/navigation';
import { useToast } from '@/hooks/use-toast';
import { useVerificationPoll } from '@/hooks/use-verification-poll';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { getDeviceFingerprint } from '@/lib/device-fingerprint';

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
  const [trustDevice, setTrustDevice] = useState(false);
  const [deviceFingerprint] = useState(() => getDeviceFingerprint());
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const handleMagicLinkVerified = useCallback(() => {
    toast({ title: 'Identidad verificada', description: 'Acceso verificado automáticamente.', action: <CircleCheck className="text-emerald-500 h-4 w-4" /> });
    router.push('/dashboard');
  }, [toast, router]);

  useVerificationPoll(
    verificationEmail,
    step === 'verification' && !isLoading,
    handleMagicLinkVerified
  );

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
    const identifier = (formData.get('identifier') as string || '').trim().toLowerCase();

    const password = formData.get('password') as string;
    const accessKey = (formData.get('accessKey') as string || '').trim();
    try {
      const body: Record<string, any> = { identifier, password, portal: 'personal', deviceFingerprint, trustDevice };

      if (accessKey) body.accessKey = accessKey;
      const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const json = await res.json();
      if (!res.ok) {
        if (res.status === 403 && json.portalMismatch) {
          setError('PORTAL_MISMATCH:' + (json.error || 'No tienes acceso a este portal.'));
        } else {
          setError(json.error || 'Correo o contraseña incorrectos.');
        }
        setIsLoading(false);
        return;
      }
      const MODULE_PATH_MAP: Record<string, string> = {
        contabilidad: '/dashboard-empresa',
        juridico: '/dashboard-empresa',
        legal: '/escritorio-juridico',
        ventas: '/dashboard-empresa',
        tpv: '/dashboard-empresa',
        sostenibilidad: '/sostenibilidad',
        telecom: '/mi-linea',
        socios: '/dashboard-socios',
        rrhh: '/dashboard-empresa',
        nomina: '/dashboard-empresa',
        talento: '/dashboard-empresa',
        informatica: '/dashboard-it',
      };
      const modules = json.user?.modules;
      let dashboardPath = '/dashboard';
      if (modules && modules.length > 0) {
        for (const mod of modules) {
          const p = MODULE_PATH_MAP[mod];
          if (p) { dashboardPath = p; break; }
        }
      }
      if (json.accessKeyUsed || json.success) {
        const title = json.trustedDevice ? 'Dispositivo confiable' : (json.accessKeyUsed ? 'Acceso con llave' : 'Acceso concedido');
        const desc = json.trustedDevice ? `Bienvenido, ${json.user?.nombre ?? ''}. Acceso automático desde dispositivo confiable.` : `Bienvenido, ${json.user?.nombre ?? ''}.`;
        toast({ title, description: desc, action: <CircleCheck className="text-emerald-500 h-4 w-4" /> });
        router.push(dashboardPath as any);
        return;
      }
      if (json.requiresVerification) {
        setVerificationEmail(json.email || identifier);
        setMaskedEmail(json.maskedEmail || json.email || identifier);

        setDevCode(json.devCode || null);
        setStep('verification');
        setCountdown(600);
        setCodeDigits(['', '', '', '', '', '']);
        setIsLoading(false);
        if (json.devCode) {
          toast({ title: 'Modo desarrollo', description: 'Código mostrado en pantalla', action: <Sparkles className="text-amber-500 h-4 w-4" /> });
        } else {
          toast({ title: 'Código enviado', description: `Revisa tu correo ${json.maskedEmail || json.email || identifier}`, action: <Mail className="text-cyan-500 h-4 w-4" /> });

        }
        return;
      }
      toast({ title: 'Acceso concedido', description: `Bienvenido, ${json.user?.nombre ?? ''}.`, action: <CircleCheck className="text-emerald-500 h-4 w-4" /> });
      router.push(dashboardPath as any);
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
      const res = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: verificationEmail,
          code,
          deviceFingerprint,
          trustDevice,
          deviceName: typeof navigator !== 'undefined' ? navigator.userAgent?.slice(0, 120) : undefined,
          deviceType: 'web',
        }),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error || 'Código incorrecto.'); setCodeDigits(['', '', '', '', '', '']); setIsLoading(false); setTimeout(() => inputRefs.current[0]?.focus(), 100); return; }
      toast({ title: 'Identidad verificada', description: `Bienvenido, ${json.user?.nombre ?? ''}.`, action: <CircleCheck className="text-emerald-500 h-4 w-4" /> });
      const modPathMap: Record<string, string> = { contabilidad: '/dashboard-empresa', juridico: '/dashboard-empresa', legal: '/escritorio-juridico', ventas: '/dashboard-empresa', tpv: '/dashboard-empresa', sostenibilidad: '/sostenibilidad', telecom: '/mi-linea', socios: '/dashboard-socios', rrhh: '/dashboard-empresa', nomina: '/dashboard-empresa', talento: '/dashboard-empresa', informatica: '/dashboard-it' };
      let dest = '/dashboard';
      for (const mod of (json.user?.modules ?? [])) { const p = modPathMap[mod]; if (p) { dest = p; break; } }
      router.push(dest as any);
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
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8 w-full relative overflow-hidden bg-[#02040a]">
      {/* Background HUD / Digital Vault */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/5 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('/images/grid-bg.png')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="absolute top-8 left-8 z-50">
        <Button variant="ghost" asChild className="rounded-full h-10 px-4 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white hover:bg-white/5 transition-all">
          <Link href="/login" className="flex items-center"><ChevronLeft className="mr-2 h-4 w-4" /> Volver</Link>
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl grid md:grid-cols-10 gap-0 rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative z-10"
      >
        {/* Lado Informativo - Vault Aesthetics */}
        <div className="md:col-span-4 relative overflow-hidden flex flex-col justify-between text-white bg-gradient-to-br from-blue-700 via-blue-800 to-[#02040a] p-12">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('/images/grain.png')] mix-blend-overlay" />
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs><pattern id="vaultGrid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
                    <rect width="100%" height="100%" fill="url(#vaultGrid)"/>
                </svg>
            </div>

            <div className="relative z-10 space-y-12">
                <div className="h-20 w-20 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-3xl shadow-2xl group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Logo className="h-12 w-12 relative z-10 drop-shadow-glow" />
                </div>
                <div className="space-y-4">
                    <h1 className="text-5xl font-black tracking-tight leading-[0.9] uppercase font-outfit text-white">MI CUENTA<br/><span className="text-cyan-400">DIGITAL</span></h1>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] font-outfit">Identidad Blindada • Kyron Shield v2.8</p>
                </div>
            </div>

            <div className="relative z-10 space-y-6">
                <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent" />
                <div className="space-y-4">
                    {['Encriptación AES-256', 'Acceso Multi-Factor', 'Firma Pericial'].map((f, i) => (
                        <div key={i} className="flex items-center gap-4 text-xs font-bold text-white/70 uppercase tracking-widest">
                            <div className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                            {f}
                        </div>
                    ))}
                </div>
                <div className="pt-6">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">
                        <ShieldCheck className="h-3.5 w-3.5" /> Servidor Seguro Activo
                    </div>
                </div>
            </div>
        </div>

        {/* Lado de Formulario - Interactive Terminal */}
        <div className="md:col-span-6 p-12 md:p-16 flex flex-col justify-center bg-[#030711] relative">
            <div className="absolute top-0 right-0 p-8 opacity-20">
                <Scan className="h-20 w-20 text-white/10" />
            </div>

          {step === 'credentials' ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-12">
                <h2 className="text-4xl font-black tracking-tight text-white uppercase font-outfit leading-none mb-3 text-glow-cyan">Protocolo de Acceso</h2>
                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Autenticación de Ciudadanía Digital</p>
              </div>

              <div className="flex rounded-2xl bg-white/[0.02] border border-white/5 p-1.5 mb-10">
                <button type="button" onClick={() => { setLoginMode('email'); setError(null); }}
                  className={cn("flex-1 flex items-center justify-center gap-3 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500",
                    loginMode === 'email' ? "bg-blue-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.4)]" : "text-white/20 hover:text-white"
                  )}>
                  <Mail className="h-4 w-4" /> Correo / ID
                </button>
                <button type="button" onClick={() => { setLoginMode('phone'); setError(null); }}
                  className={cn("flex-1 flex items-center justify-center gap-3 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500",
                    loginMode === 'phone' ? "bg-emerald-600 text-white shadow-[0_10px_30px_rgba(5,150,105,0.4)]" : "text-white/20 hover:text-white"
                  )}>
                  <Smartphone className="h-4 w-4" /> Teléfono
                </button>
              </div>

              {error && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={cn(
                        "p-5 rounded-2xl border mb-8 flex items-start gap-4",
                        error.startsWith('PORTAL_MISMATCH:') ? "bg-blue-500/5 border-blue-500/20 text-blue-400" : "bg-rose-500/5 border-rose-500/20 text-rose-400"
                    )}
                >
                    <TriangleAlert className="h-5 w-5 shrink-0" />
                    <div className="space-y-3">
                        <p className="text-xs font-black uppercase tracking-widest">{error.replace('PORTAL_MISMATCH:', '')}</p>
                        {error.startsWith('PORTAL_MISMATCH:') && (
                            <Button asChild variant="outline" className="h-9 rounded-xl text-[10px] font-black uppercase tracking-widest border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20">
                                <Link href="/login-empresa">Ir al Portal Corporativo</Link>
                            </Button>
                        )}
                    </div>
                </motion.div>
              )}

              {loginMode === 'email' ? (
                <form onSubmit={handleLogin} className="space-y-8">
                  <div className="space-y-3 group">
                    <Label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-2">Cédula o Correo</Label>
                    <div className="relative">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20 group-focus-within:text-cyan-400 transition-colors" />
                      <Input name="identifier" type="text" placeholder="V-00.000.000" required className="h-16 pl-16 rounded-2xl border-white/5 bg-white/[0.03] text-white focus-visible:ring-cyan-500/20 focus-visible:border-cyan-500/40 transition-all font-bold text-lg tracking-wider placeholder:text-white/5" />
                    </div>
                  </div>

                  <div className="space-y-3 group">
                    <div className="flex justify-between items-center px-2">
                        <Label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Clave de Acceso</Label>
                        <Link href="/recuperar-cuenta" className="text-[9px] font-black text-cyan-400/50 hover:text-cyan-400 uppercase tracking-widest transition-colors">¿Olvidaste?</Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20 group-focus-within:text-cyan-400 transition-colors" />
                      <Input name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" required className="h-16 pl-16 pr-16 rounded-2xl border-white/5 bg-white/[0.03] text-white focus-visible:ring-cyan-500/20 focus-visible:border-cyan-500/40 transition-all font-mono text-2xl placeholder:text-white/5" />
                      <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors" tabIndex={-1}>
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <label className="flex items-center gap-3 px-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={trustDevice}
                      onChange={e => setTrustDevice(e.target.checked)}
                      className="h-4 w-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500/30 accent-cyan-500"
                    />
                    <span className="text-[9px] font-bold text-white/30 group-hover:text-white/50 uppercase tracking-[0.2em] transition-colors">
                      Confiar en este dispositivo — no pedir código otra vez
                    </span>
                  </label>

                  <Button type="submit" className="w-full h-18 rounded-[1.5rem] font-black text-[12px] uppercase tracking-[0.4em] shadow-2xl bg-blue-600 hover:bg-blue-500 text-white transition-all hover:scale-[1.02] active:scale-[0.98] italic group/btn overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                    {isLoading ? <Loader2 className="mr-3 h-6 w-6 animate-spin" /> : <span className="flex items-center gap-4">Sincronizar Identidad <ArrowRight className="h-5 w-5" /></span>}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handlePhoneLogin} className="space-y-8">
                  <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-2">
                    <div className="flex items-center gap-3 text-emerald-400">
                      <ShieldCheck className="h-5 w-5" />
                      <p className="text-xs font-black uppercase tracking-widest">Acceso Biométrico / OTP</p>
                    </div>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest leading-relaxed">Enviaremos un código de verificación de 6 dígitos a tu dispositivo registrado.</p>
                  </div>

                  <div className="space-y-3 group">
                    <Label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-2">Móvil Registrado</Label>
                    <div className="relative">
                      <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20 group-focus-within:text-emerald-400 transition-colors" />
                      <Input name="phone" type="tel" placeholder="0412-0000000" required className="h-16 pl-16 rounded-2xl border-white/5 bg-white/[0.03] text-white focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500/40 transition-all font-bold text-lg tracking-wider placeholder:text-white/5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button type="button" onClick={() => setPhoneMethod('sms')}
                        className={cn("flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-500",
                          phoneMethod === 'sms' ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 shadow-[0_10px_20px_rgba(16,185,129,0.2)]" : "border-white/5 text-white/20 hover:border-white/10"
                        )}>
                        <MessageSquare className="h-6 w-6" />
                        <span className="text-[9px] font-black uppercase tracking-widest">SMS Kyron</span>
                    </button>
                    <button type="button" onClick={() => setPhoneMethod('whatsapp')}
                        className={cn("flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-500",
                          phoneMethod === 'whatsapp' ? "border-green-500/50 bg-green-500/10 text-green-400 shadow-[0_10px_20px_rgba(34,197,94,0.2)]" : "border-white/5 text-white/20 hover:border-white/10"
                        )}>
                        <MessageCircle className="h-6 w-6" />
                        <span className="text-[9px] font-black uppercase tracking-widest">WhatsApp ID</span>
                    </button>
                  </div>

                  <Button type="submit" className="w-full h-18 rounded-[1.5rem] font-black text-[12px] uppercase tracking-[0.4em] shadow-2xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all hover:scale-[1.02] active:scale-[0.98] italic" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-3 h-6 w-6 animate-spin" /> : <span className="flex items-center gap-4">Enviar Token <ArrowRight className="h-5 w-5" /></span>}
                  </Button>
                </form>
              )}

              <div className="mt-10 pt-10 border-t border-white/[0.05] space-y-6">
                <button
                  onClick={handleBiometric}
                  disabled={isScanning || isLoading}
                  className={cn(
                    'flex items-center justify-center gap-4 h-16 rounded-2xl border transition-all duration-500 w-full group overflow-hidden relative',
                    isScanning ? 'border-cyan-500/40 bg-cyan-500/5' : 'border-white/5 hover:border-cyan-500/20 hover:bg-cyan-500/5'
                  )}
                >
                  {isScanning ? (
                    <div className="flex items-center gap-4">
                      <Scan className="h-6 w-6 text-cyan-400 animate-pulse" />
                      <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">Analizando Patrones...</span>
                    </div>
                  ) : (
                    <>
                      <Fingerprint className="h-6 w-6 text-white/20 group-hover:text-cyan-400 transition-colors" />
                      <span className="text-[10px] font-black text-white/30 group-hover:text-cyan-400 transition-colors uppercase tracking-[0.3em]">Acceso Biométrico Pericial</span>
                    </>
                  )}
                  <div className="absolute bottom-0 left-0 h-[2px] bg-cyan-500/50 group-hover:w-full w-0 transition-all duration-2000" />
                </button>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild variant="outline" className="flex-1 h-14 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/5 hover:bg-white/5 transition-all italic">
                        <Link href="/register/natural"><UserPlus className="mr-3 h-4 w-4" /> Nuevo Ciudadano</Link>
                    </Button>
                    <Button asChild variant="ghost" className="flex-1 h-14 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-all">
                        <Link href="/soporte">Reportar Incidencia</Link>
                    </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <div className="mb-12 text-center">
                <div className="mx-auto w-24 h-24 rounded-[2rem] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl animate-pulse" />
                    <KeyRound className="h-10 w-10 text-blue-400 relative z-10" />
                </div>
                <h2 className="text-4xl font-black tracking-tight text-white uppercase font-outfit mb-4">Verificación</h2>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] leading-relaxed">
                  {devCode ? 'Ingresa el código de desarrollo generado:' : <>Código enviado a <strong className="text-white">{maskedEmail || maskedPhone}</strong></>}
                </p>
                {countdown > 0 && (
                  <div className="mt-6 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-amber-500/5 border border-amber-500/10 text-[10px] font-black text-amber-500 uppercase tracking-widest">
                    <RotateCcw className="h-3 w-3 animate-spin-slow" /> Sesión expira en {formatCountdown(countdown)}
                  </div>
                )}
              </div>

              {devCode && (
                <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-600/20 to-blue-600/10 border border-cyan-500/30 mb-10 text-center relative overflow-hidden">
                    <div className="absolute top-2 left-2 text-[8px] font-black text-cyan-400/40 uppercase tracking-widest">System Kyron Debug</div>
                    <p className="text-5xl font-black font-mono tracking-[0.3em] text-white text-glow-cyan mb-2">{devCode}</p>
                    <p className="text-[9px] font-bold text-cyan-400/50 uppercase tracking-[0.2em]">Copia este código pericial</p>
                </div>
              )}

              {error && (
                <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-rose-400 text-xs font-black uppercase tracking-widest text-center mb-8">
                  {error}
                </div>
              )}

              <div className="flex justify-center gap-3 mb-12">
                {codeDigits.map((digit, i) => (
                  <Input
                    key={i}
                    ref={el => { inputRefs.current[i] = el; }}
                    type="text" inputMode="numeric" maxLength={6} value={digit}
                    onChange={e => handleCodeChange(i, e.target.value)}
                    onKeyDown={e => handleCodeKeyDown(i, e)}
                    className={cn("w-14 h-20 text-center text-4xl font-black rounded-2xl border-2 transition-all duration-300 bg-white/[0.02]", digit ? "border-cyan-500 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]" : "border-white/5 focus:border-cyan-500/50")}
                    disabled={isLoading}
                  />
                ))}
              </div>

              <div className="space-y-4">
                <Button variant="outline" onClick={() => { setStep('credentials'); setError(null); setCodeDigits(['', '', '', '', '', '']); setDevCode(null); }} className="w-full h-16 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] border-white/5 hover:bg-white/5" disabled={isLoading}>
                  Reiniciar Protocolo
                </Button>
                <p className="text-center text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">
                  ¿No recibiste el token?{' '}
                  <button onClick={() => { setStep('credentials'); setError(null); setDevCode(null); }} className="text-cyan-400 hover:underline">Reintentar Sincronización</button>
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      <div className="absolute bottom-10 flex flex-col items-center gap-4">
        <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.6em]">System Kyron · Ciudadanía Digital v2.8</p>
        <div className="flex gap-4 opacity-10">
            <Shield className="h-4 w-4" />
            <Lock className="h-4 w-4" />
            <Cpu className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
