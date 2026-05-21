'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Loader2, ChevronLeft, CircleCheck, ShieldCheck, ArrowRight, Shield,
  UserPlus, Eye, EyeOff, TriangleAlert, Mail, Lock, KeyRound,
  Smartphone, Signal, RotateCcw, Fingerprint
} from 'lucide-react';
import { useRouter } from '@/navigation';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/navigation';
import { useToast } from '@/hooks/use-toast';
import { useVerificationPoll } from '@/hooks/use-verification-poll';
import { cn } from '@/lib/utils';
import { getDeviceFingerprint } from '@/lib/device-fingerprint';

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
  const [trustDevice, setTrustDevice] = useState(false);
  const [deviceFingerprint] = useState(() => getDeviceFingerprint());
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const current = useMemo(() => ACCESS_TYPES[selected], [selected]);
  const Icon = current.icon;

  const handleMagicLinkVerified = useCallback(() => {
    toast({ title: 'Identidad verificada', description: 'Acceso verificado automáticamente.', action: <CircleCheck className="text-emerald-500 h-4 w-4" /> });
    router.push(current.redirectPath as any);
  }, [toast, router, current.redirectPath]);

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

  const handleAuth = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const identifier = (formData.get('identifier') as string || '').trim().toLowerCase();

    const password = formData.get('password') as string;
    const accessKey = (formData.get('accessKey') as string || '').trim();

    try {
      const body: Record<string, any> = { identifier, password, portal: selected === 'empresa' ? 'business' : 'personal', deviceFingerprint, trustDevice };

      if (accessKey) body.accessKey = accessKey;
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        if (res.status === 403 && json.portalMismatch) {
          setError('PORTAL_MISMATCH:' + (json.error || 'No tienes acceso a este portal.'));
        } else {
          setError(json.error || 'Credenciales incorrectas.');
        }
        setIsLoading(false);
        return;
      }
      if (json.accessKeyUsed || json.success) {
        const title = json.trustedDevice ? 'Dispositivo confiable' : (json.accessKeyUsed ? 'Acceso con llave' : 'Acceso concedido');
        const desc = json.trustedDevice ? `Bienvenido, ${json.user?.nombre ?? ''}. Acceso automático desde dispositivo confiable.` : `Bienvenido, ${json.user?.nombre ?? ''}.`;
        toast({ title, description: desc, action: <CircleCheck className="text-emerald-500 h-4 w-4" /> });
        router.push(current.redirectPath as any);
        return;
      }
      if (json.requiresVerification) {
        setVerificationEmail(json.email || identifier);
        setMaskedEmail(json.maskedEmail || json.email || identifier);

        setStep('verification');
        setCountdown(600);
        setCodeDigits(['', '', '', '', '', '']);
        setIsLoading(false);
        toast({ title: 'Código enviado', description: `Revisa tu correo ${json.maskedEmail || json.email || identifier}`, action: <Mail className="text-cyan-500 h-4 w-4" /> });

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
  }, [selected, deviceFingerprint, trustDevice, toast, router, current.redirectPath]);

  const submitCode = useCallback(async (code: string) => {
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
      router.push(current.redirectPath as any);
    } catch { setError('Error de conexión.'); setCodeDigits(['', '', '', '', '', '']); setIsLoading(false); }
  }, [verificationEmail, deviceFingerprint, trustDevice, toast, router, current.redirectPath]);

  const handleCodeChange = useCallback((index: number, value: string) => {
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
  }, [codeDigits, submitCode]);

  const handleCodeKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !codeDigits[index] && index > 0) inputRefs.current[index - 1]?.focus();
  }, [codeDigits]);

  const formatCountdown = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="flex flex-col items-center min-h-screen w-full relative overflow-hidden bg-[#02040a]">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[180px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[150px]" />
        <div className="absolute inset-0 bg-[url('/images/grid-bg.png')] bg-repeat opacity-[0.02] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02040a]/60 to-[#02040a]" />
      </div>

      <div className="w-full max-w-6xl px-4 md:px-6 py-4 md:py-6 flex justify-between items-center relative z-20">
        <Button variant="ghost" asChild className="rounded-full h-10 px-4 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white hover:bg-white/5 transition-all">
          <Link href="/login" className="flex items-center"><ChevronLeft className="mr-2 h-4 w-4" /> Volver</Link>
        </Button>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] hidden sm:block">Red 5G Operativa</span>
        </div>
      </div>

      <div className="w-full max-w-5xl px-4 pb-12 flex-1 flex items-center relative z-10">
        <div className="w-full bg-[#0a0f1e]/90 backdrop-blur-xl border border-white/[0.06] rounded-[2.5rem] shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Hero Panel */}
            <div className="md:w-[38%] p-8 md:p-10 relative overflow-hidden flex flex-col justify-between bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white min-h-[240px] md:min-h-[500px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_70%)] pointer-events-none" />
              <div className="absolute inset-0 bg-scanline opacity-[0.05]" />
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              
              <div className="relative z-10 space-y-6">
                <div className="p-4 bg-white/10 rounded-2xl w-fit border border-white/15 backdrop-blur-sm shadow-lg">
                  <Icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                </div>
                <div className="space-y-3">
                  <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight uppercase">{current.label}</h1>
                  <p className="text-[11px] md:text-sm font-medium opacity-80 leading-relaxed max-w-xs">{current.description}</p>
                </div>
              </div>

              <div className="relative z-10 space-y-3 mt-6 md:mt-8 pt-6 border-t border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Incluye</p>
                <ul className="space-y-2.5">
                  {current.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs md:text-sm font-semibold opacity-90">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-300 shrink-0" />{f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form Panel */}
            <div className="md:w-[62%] p-8 md:p-10 flex flex-col justify-center bg-[#0a0f1e]/80">
              {step === 'credentials' ? (
              <>
                <div className="mb-8">
                  <h2 className="text-xl font-black tracking-tight text-white uppercase">Iniciar Sesión</h2>
                  <p className="text-[11px] font-medium text-white/40 mt-1 tracking-wide">Accede a tu portal {current.label}</p>
                </div>

                <form onSubmit={handleAuth} className="space-y-5">
                  {error && (
                    error.startsWith('PORTAL_MISMATCH:') ? (
                      <div className="flex flex-col gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/25">
                        <div className="flex items-start gap-3">
                          <Shield className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <p className="text-[13px] font-bold text-white">Portal incorrecto</p>
                            <p className="text-[12px] text-white/50">{error.replace('PORTAL_MISMATCH:', '')}</p>
                          </div>
                        </div>
                        <Link href={selected === 'personal' ? '/login-empresa' : '/login-personal'}>
                          <Button type="button" variant="outline" size="sm" className="w-full h-9 text-xs font-bold rounded-lg border-blue-500/25 text-blue-400 hover:bg-blue-500/20">
                            <ArrowRight className="mr-1.5 h-3.5 w-3.5" /> {selected === 'personal' ? 'Ir al Portal Empresa' : 'Ir al Portal Personal'}
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20">
                        <TriangleAlert className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                        <p className="text-sm text-red-400">{error}</p>
                      </div>
                    )
                  )}

                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-white/70 uppercase tracking-widest">Número de Teléfono</Label>
                    <div className="relative group">
                      <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-blue-400 transition-colors" />
                      <Input name="identifier" type="tel" placeholder="04XX-XXXXXXX" required autoComplete="tel" className="h-12 pl-10 rounded-xl bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20" />
                    </div>
                  </div>


                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs font-bold text-white/70 uppercase tracking-widest">Contraseña</Label>
                      <Link href="/recuperar-cuenta" className="text-[10px] font-bold text-blue-400 hover:text-blue-300 uppercase tracking-wider">¿Olvidaste?</Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                      <Input name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" required autoComplete="current-password" className="h-12 pl-10 pr-10 rounded-xl bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20" />
                      <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors" tabIndex={-1}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setUseAccessKey(v => !v)}
                      className={cn("flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider transition-colors", useAccessKey ? "text-blue-400" : "text-white/30 hover:text-white/50")}
                    >
                      <KeyRound className="h-3 w-3" />
                      {useAccessKey ? 'Ocultar llave' : 'Usar llave de acceso'}
                    </button>
                    {useAccessKey && (
                      <div className="relative group">
                        <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-blue-400 transition-colors" />
                        <Input
                          name="accessKey"
                          type={showAccessKey ? 'text' : 'password'}
                          placeholder="Tu llave personal"
                          autoComplete="off"
                          minLength={6}
                          className="h-12 pl-10 pr-10 rounded-xl bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                        />
                        <button type="button" onClick={() => setShowAccessKey(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors" tabIndex={-1}>
                          {showAccessKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    )}
                    {useAccessKey && (
                      <p className="text-[10px] text-white/30 leading-relaxed">
                        Si tienes una llave configurada, puedes saltarte la verificación.
                      </p>
                    )}
                  </div>

                  <label className="flex items-center gap-3 px-1 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={trustDevice}
                      onChange={e => setTrustDevice(e.target.checked)}
                      className="h-4 w-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500/30 accent-cyan-500"
                    />
                    <span className="text-[9px] font-bold text-white/30 group-hover:text-white/50 uppercase tracking-[0.2em] transition-colors">
                      Confiar en este dispositivo
                    </span>
                  </label>

                  <Button type="submit" className="w-full h-12 rounded-xl font-bold text-sm shadow-lg bg-blue-600 hover:bg-blue-500 text-white border-0" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <>Acceder <ArrowRight className="ml-2 h-4 w-4" /></>}
                  </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/[0.06] space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/[0.06]" />
                    <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider">¿No tienes línea?</span>
                    <div className="h-px flex-1 bg-white/[0.06]" />
                  </div>
                  <Button variant="outline" asChild className="w-full h-11 rounded-xl text-xs font-bold uppercase tracking-wider bg-transparent border-white/[0.08] text-white/50 hover:bg-white/5 hover:text-white hover:border-white/20 transition-all">
                    <Link href="/register/telecom" className="flex items-center gap-2"><UserPlus className="h-4 w-4" /> Activar Mi Línea</Link>
                  </Button>
                  <div className="text-center">
                    <Link href="/recuperar-cuenta" className="text-[10px] text-white/30 hover:text-blue-400 transition-colors font-bold uppercase tracking-wider">¿Problemas para acceder? Recuperar cuenta</Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/20 flex items-center justify-center mb-5 shadow-lg shadow-blue-500/5">
                    <Fingerprint className="h-7 w-7 text-blue-400" />
                  </div>
                  <h2 className="text-xl font-black tracking-tight text-white uppercase">Verificación</h2>
                  <p className="text-sm text-white/50 mt-2">
                    Código de 6 dígitos enviado a <strong className="text-white font-bold">{maskedEmail}</strong>
                  </p>
                  {countdown > 0 && (
                    <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                      <Signal className="h-3 w-3 text-amber-400" />
                      <span className="text-[11px] font-bold text-amber-400">
                        Expira en <span className="font-mono">{formatCountdown(countdown)}</span>
                      </span>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-5">
                    <TriangleAlert className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                <div className="flex justify-center gap-2 sm:gap-3 mb-6 px-2">
                  {codeDigits.map((digit, i) => (
                    <Input
                      key={i}
                      ref={el => { inputRefs.current[i] = el; }}
                      type="text" inputMode="numeric" maxLength={6} value={digit}
                      onChange={e => handleCodeChange(i, e.target.value)}
                      onKeyDown={e => handleCodeKeyDown(i, e)}
                      onPaste={e => { e.preventDefault(); const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6); if (pasted) handleCodeChange(0, pasted); }}
                      className={cn(
                        "w-11 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black rounded-xl border-2 transition-all duration-200",
                        digit
                          ? "border-blue-500/70 bg-blue-500/10 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                          : "border-white/[0.08] bg-white/[0.03] text-white focus:border-blue-500/40 focus:bg-blue-500/5 focus:shadow-[0_0_15px_rgba(59,130,246,0.08)]"
                      )}
                      disabled={isLoading} autoComplete="one-time-code"
                    />
                  ))}
                </div>

                {isLoading && (
                  <div className="flex items-center justify-center gap-3 mb-5">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-sm text-white/50 font-bold">Verificando acceso seguro...</span>
                  </div>
                )}

                <div className="space-y-3 mt-6">
                  <Button variant="outline" onClick={() => { setStep('credentials'); setError(null); setCodeDigits(['', '', '', '', '', '']); }} className="w-full h-11 rounded-xl text-xs font-bold uppercase tracking-wider bg-transparent border-white/[0.08] text-white/50 hover:bg-white/5 hover:text-white hover:border-white/20 transition-all" disabled={isLoading}>
                    <RotateCcw className="mr-2 h-3.5 w-3.5" /> Volver a iniciar sesión
                  </Button>
                  <p className="text-center text-xs text-white/30">
                    ¿No recibiste el código?{' '}
                    <button onClick={() => { setStep('credentials'); setError(null); }} className="text-blue-400 hover:text-blue-300 font-bold transition-colors" disabled={isLoading}>Solicitar nuevo</button>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <p className="mt-8 pb-4 text-[11px] text-white/20 uppercase tracking-widest font-bold">System Kyron v2.8.5 · Mi Línea 5G</p>
    </div>
  </div>
  );
}
