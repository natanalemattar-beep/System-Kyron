'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from '@/navigation';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Loader2, CircleCheck, ArrowRight, ArrowLeft, Eye, EyeOff,
    Calculator, Check, Star, Mail, Lock, TrendingUp, Shield,
    Zap, Building, CreditCard, Package, Users, Globe,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useVerificationPoll } from '@/hooks/use-verification-poll';
import { useAuth } from '@/lib/auth/context';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { MODULOS_INDIVIDUALES, VALID_PLANS_MAP } from '@/lib/planes-data';
import { DocumentInput } from '@/components/document-input';

// ─── Planes individuales de contabilidad ───────────────
const PLANES_CONTABILIDAD = (() => {
  const modulo = MODULOS_INDIVIDUALES.find(m => m.id === 'asesoria_contable');
  return modulo ? modulo.subPlanes.map(sp => ({
    id: sp.id,
    nombre: sp.nombre,
    precioUsd: sp.precioMensualUSD,
    features: sp.caracteristicas,
    popular: sp.popular || false,
  })) : [];
})();

// ─── Combos disponibles ────────────────────────────────
const COMBOS = [
  {
    id: 'solo',
    nombre: 'Solo',
    precio: 19.99,
    modulos: ['contable_esencial', 'fact_basico', 'basico_2gb'],
    modulosLabels: ['Contable Esencial', 'Facturación Básica', 'Mi Línea 2GB'],
    icon: User,
    color: 'emerald',
  },
  {
    id: 'profesional',
    nombre: 'Profesional',
    precio: 34.99,
    popular: true,
    modulos: ['contable_profesional', 'fact_comercial', 'legal_profesional', 'conecta_5gb'],
    modulosLabels: ['Contable Pro', 'Facturación Comercial', 'Legal Pro', 'Mi Línea 5GB'],
    icon: Star,
    color: 'violet',
  },
  {
    id: 'empresarial',
    nombre: 'Empresarial',
    precio: 69.99,
    modulos: ['contable_avanzado', 'fact_enterprise', 'legal_escritorio', 'socios_profesional', 'plus_10gb'],
    modulosLabels: ['Contable Avanzado', 'Facturación Enterprise', 'Escritorio Jurídico', 'Socios Pro', 'Mi Línea 10GB'],
    icon: Building,
    color: 'blue',
  },
  {
    id: 'kyron_max',
    nombre: 'Kyron MAX',
    precio: 99.99,
    modulos: ['contable_max', 'fact_max', 'legal_max', 'socios_enterprise', 'infinite'],
    modulosLabels: ['Contable MAX', 'Facturación MAX', 'Legal MAX', 'Socios Enterprise', 'Mi Línea Infinite'],
    icon: Zap,
    color: 'amber',
  },
];

// ─── Schema ────────────────────────────────────────────
const schema = z.object({
    razonSocial: z.string().min(3, 'Ingrese la razón social'),
    rif: z.string().regex(/^[JGCVEPF]-\d{8}-\d$/, 'Formato: J-50832149-9'),
    nombre: z.string().min(2, 'Ingrese su nombre'),
    apellido: z.string().min(2, 'Ingrese su apellido'),
    email: z.string().email('Correo inválido'),
    telefono: z.string().min(7, 'Teléfono inválido'),
    password: z.string()
        .min(8, 'Mínimo 8 caracteres')
        .regex(/[A-Z]/, 'Una mayúscula')
        .regex(/[0-9]/, 'Un número')
        .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/, 'Un carácter especial'),
    confirmPassword: z.string(),
    plan: z.string().min(1, 'Seleccione un plan'),
    planType: z.enum(['individual', 'combo']).default('combo'),
}).refine(d => d.password === d.confirmPassword, {
    message: 'Las contraseñas no coinciden', path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

const TOTAL_STEPS = 4;

export default function RegisterContabilidadPage() {
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [selectedCombo, setSelectedCombo] = useState<string | null>(null);
    const [planType, setPlanType] = useState<'individual' | 'combo'>('combo');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { refreshUser } = useAuth();
    const { toast } = useToast();
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [verifSent, setVerifSent] = useState(false);
    const [verifCode, setVerifCode] = useState('');
    const [verifVerified, setVerifVerified] = useState(false);
    const [verifLoading, setVerifLoading] = useState(false);
    const [verifDestino, setVerifDestino] = useState('');
    const [countdown, setCountdown] = useState(0);

    const onMagicLinkVerified = useCallback(() => {
        setVerifVerified(true);
        toast({ title: '¡Verificado!', description: 'Identidad confirmada exitosamente.' });
    }, [toast]);

    useVerificationPoll(verifDestino, verifSent && !verifVerified, onMagicLinkVerified);

    const { register, handleSubmit, control, watch, setValue, trigger, getValues, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            plan: searchParams.get('plan') || '',
            planType: 'combo',
            rif: searchParams.get('doc') || '',
            razonSocial: searchParams.get('razon') || '',
        },
    });

    const startCountdown = () => {
        setCountdown(60);
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) { clearInterval(timer); return 0; }
                return prev - 1;
            });
        }, 1000);
    };

    const sendVerificationCode = async () => {
        setVerifLoading(true);
        const destino = getValues('email');
        setVerifDestino(destino);
        try {
            const res = await fetch('/api/auth/send-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destino, tipo: 'email', proposito: 'registration' }),
            });
            if (!res.ok) throw new Error('Error');
            setVerifSent(true);
            startCountdown();
            toast({ title: 'Código enviado', description: `Revisa tu correo ${destino}` });
        } catch {
            toast({ title: 'Error', description: 'No se pudo enviar el código.', variant: 'destructive' });
        } finally {
            setVerifLoading(false);
        }
    };

    const verifyCode = useCallback(async (code: string) => {
        if (code.length !== 6 || verifVerified) return;
        setVerifLoading(true);
        try {
            const res = await fetch('/api/auth/verify-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destino: verifDestino, codigo: code, proposito: 'registration' }),
            });
            if (!res.ok) throw new Error('Código inválido');
            setVerifVerified(true);
            toast({ title: '¡Verificado!' });
        } catch {
            toast({ title: 'Código incorrecto', variant: 'destructive' });
            setVerifCode('');
        } finally {
            setVerifLoading(false);
        }
    }, [verifDestino, verifVerified, toast]);

    useEffect(() => {
        if (verifCode.length === 6 && verifSent && !verifVerified) verifyCode(verifCode);
    }, [verifCode, verifSent, verifVerified, verifyCode]);

    const nextStep = async () => {
        if (step === 1) {
            if (planType === 'combo') {
                if (!selectedCombo) {
                    toast({ title: 'Selecciona un combo', variant: 'destructive' });
                    return;
                }
                setValue('plan', selectedCombo);
                setValue('planType', 'combo');
            } else {
                if (!selectedPlan) {
                    toast({ title: 'Selecciona un plan', variant: 'destructive' });
                    return;
                }
                setValue('plan', selectedPlan);
                setValue('planType', 'individual');
            }
            setStep(2);
            return;
        }
        if (step === 2) {
            const valid = await trigger(['razonSocial', 'rif', 'nombre', 'apellido', 'email', 'telefono', 'password', 'confirmPassword']);
            if (!valid) return;
            if (!acceptTerms) {
                toast({ title: 'Términos requeridos', variant: 'destructive' });
                return;
            }
            setStep(3);
        }
    };

    const onSubmit = async (data: FormData) => {
        if (!verifVerified) {
            toast({ title: 'Verificación requerida', variant: 'destructive' });
            return;
        }
        setIsLoading(true);
        try {
            const modules = data.planType === 'combo'
                ? (COMBOS.find(c => c.id === data.plan)?.modulos || [])
                : [data.plan];

            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tipo: 'juridico',
                    ...data,
                    modules: modules.map(m => ({ id: m, label: m })),
                    plan: data.plan,
                    planType: data.planType,
                }),
            });
            if (!res.ok) throw new Error('Error en el registro');
            await refreshUser();
            setStep(TOTAL_STEPS);
        } catch (e: unknown) {
            toast({ title: 'Error', description: e instanceof Error ? e.message : 'Error en el registro', variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    const getActivePlan = () => {
        if (planType === 'combo') {
            return COMBOS.find(c => c.id === selectedCombo);
        }
        return PLANES_CONTABILIDAD.find(p => p.id === selectedPlan);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-950">
            {/* Ambient Background */}
            <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #6366f130 0%, transparent 70%)' }} />
            <div className="absolute bottom-[-200px] right-[-100px] w-[700px] h-[700px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #06b6d420 0%, transparent 70%)' }} />

            {/* ─── Top Navigation Bar ─────────────────── */}
            <nav className="relative z-20 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
                            <Calculator className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-white uppercase tracking-wider">Asesoría Contable</h1>
                            <p className="text-[9px] text-cyan-400/60 font-black uppercase tracking-widest">System Kyron</p>
                        </div>
                    </div>

                    {/* Progress Steps */}
                    {step < TOTAL_STEPS && (
                        <div className="hidden sm:flex items-center gap-1">
                            {['Plan', 'Datos', 'Verificar'].map((label, i) => {
                                const stepNum = i + 1;
                                const isActive = step === stepNum;
                                const isDone = step > stepNum;
                                return (
                                    <div key={label} className="flex items-center gap-1">
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all",
                                            isDone ? "bg-cyan-500 text-white" :
                                            isActive ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" :
                                            "bg-white/5 text-white/20"
                                        )}>
                                            {isDone ? <Check className="h-4 w-4" /> : stepNum}
                                        </div>
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase tracking-wider hidden md:block",
                                            isActive ? "text-cyan-400" : isDone ? "text-white/60" : "text-white/20"
                                        )}>{label}</span>
                                        {i < 2 && <div className={cn("w-8 h-px", isDone ? "bg-cyan-500" : "bg-white/10")} />}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <Link href="/" className="text-[10px] font-bold text-white/30 hover:text-white/60 uppercase tracking-widest transition-colors">
                        ← Inicio
                    </Link>
                </div>
            </nav>

            {/* ─── Main Content ───────────────────────── */}
            <div className={cn(
                "relative z-10 container mx-auto px-4 py-8 flex flex-col items-center min-h-[calc(100vh-4rem)]",
                step === 1 ? "max-w-5xl" : "max-w-xl"
            )}>
                <div className="w-full bg-white/5 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-cyan-500/5 border border-white/10 dark:border-slate-800 overflow-hidden">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="p-6 md:p-8">
                            {/* ─── Step 1: Plan Selection ───────────────── */}
                            {step === 1 && (
                                <div className="space-y-8">
                                    <div className="text-center space-y-2">
                                        <h2 className="text-2xl font-black text-white italic tracking-tight">Elige tu Plan</h2>
                                        <p className="text-sm text-white/40 font-medium">Individual o Combo — tú decides.</p>
                                    </div>

                                    {/* Toggle Individual / Combo */}
                                    <div className="flex justify-center">
                                        <div className="inline-flex p-1 rounded-2xl bg-white/5 border border-white/10">
                                            <button
                                                type="button"
                                                onClick={() => { setPlanType('combo'); setSelectedCombo(null); setSelectedPlan(null); }}
                                                className={cn(
                                                    "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                                                    planType === 'combo'
                                                        ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                                                        : "text-white/40 hover:text-white/60"
                                                )}
                                            >
                                                <Package className="h-3.5 w-3.5 inline mr-1.5" />
                                                Combos
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => { setPlanType('individual'); setSelectedPlan(null); setSelectedCombo(null); }}
                                                className={cn(
                                                    "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                                                    planType === 'individual'
                                                        ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                                                        : "text-white/40 hover:text-white/60"
                                                )}
                                            >
                                                <Calculator className="h-3.5 w-3.5 inline mr-1.5" />
                                                Individual
                                            </button>
                                        </div>
                                    </div>

                                    {/* Combo Cards */}
                                    {planType === 'combo' && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                            {COMBOS.map((combo) => {
                                                const isSelected = selectedCombo === combo.id;
                                                const Icon = combo.icon;
                                                const colorMap: Record<string, string> = {
                                                    emerald: 'border-emerald-500/30 bg-emerald-500/5',
                                                    violet: 'border-violet-500/30 bg-violet-500/5',
                                                    blue: 'border-blue-500/30 bg-blue-500/5',
                                                    amber: 'border-amber-500/30 bg-amber-500/5',
                                                };
                                                const iconColorMap: Record<string, string> = {
                                                    emerald: 'text-emerald-400',
                                                    violet: 'text-violet-400',
                                                    blue: 'text-blue-400',
                                                    amber: 'text-amber-400',
                                                };
                                                return (
                                                    <button
                                                        key={combo.id}
                                                        type="button"
                                                        onClick={() => setSelectedCombo(combo.id)}
                                                        className={cn(
                                                            "relative text-left p-5 rounded-2xl border-2 transition-all duration-300 group",
                                                            isSelected
                                                                ? cn("ring-2", colorMap[combo.color].replace('border-', 'ring-').replace('/30', '/20'), colorMap[combo.color])
                                                                : "bg-white/5 border-white/10 hover:border-white/20"
                                                        )}
                                                    >
                                                        {combo.popular && (
                                                            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-white shadow-lg whitespace-nowrap">
                                                                ⭐ Más Popular — +2,000 compras
                                                            </div>
                                                        )}
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <div className={cn("p-1.5 rounded-lg", isSelected ? "bg-cyan-500 text-white" : "bg-white/10", iconColorMap[combo.color])}>
                                                                <Icon className="h-4 w-4" />
                                                            </div>
                                                            <span className="text-xs font-black text-white/60 uppercase tracking-wider">{combo.nombre}</span>
                                                        </div>
                                                        <div className="flex items-baseline gap-1 mb-3">
                                                            <span className="text-xs text-white/30">$</span>
                                                            <span className="text-2xl font-black text-white">{Math.floor(combo.precio)}</span>
                                                            <span className="text-xs text-white/30">.{String(combo.precio).split('.')[1] || '00'}</span>
                                                            <span className="text-[9px] text-white/30 font-bold">/mes</span>
                                                        </div>
                                                        <div className="space-y-1.5 pt-3 border-t border-white/5">
                                                            {combo.modulosLabels.slice(0, 3).map((m, i) => (
                                                                <div key={i} className="flex items-center gap-1.5">
                                                                    <Check className="h-3 w-3 text-cyan-400 shrink-0" />
                                                                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-tight">{m}</span>
                                                                </div>
                                                            ))}
                                                            {combo.modulosLabels.length > 3 && (
                                                                <span className="text-[9px] font-bold text-cyan-400/60">+{combo.modulosLabels.length - 3} más</span>
                                                            )}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Individual Plan Cards */}
                                    {planType === 'individual' && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {PLANES_CONTABILIDAD.map((p) => {
                                                const isSelected = selectedPlan === p.id;
                                                return (
                                                    <button
                                                        key={p.id}
                                                        type="button"
                                                        onClick={() => setSelectedPlan(p.id)}
                                                        className={cn(
                                                            "relative text-left p-5 rounded-2xl border-2 transition-all duration-300",
                                                            isSelected
                                                                ? "border-cyan-500 bg-cyan-500/5 ring-2 ring-cyan-500/20"
                                                                : "bg-white/5 border-white/10 hover:border-white/20"
                                                        )}
                                                    >
                                                        {p.popular && (
                                                            <div className="absolute -top-2.5 right-4 px-3 py-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-white shadow-lg">
                                                                ⭐ Más Popular
                                                            </div>
                                                        )}
                                                        <div className="flex justify-between items-start mb-3">
                                                            <div className="p-1.5 rounded-lg bg-white/10">
                                                                <Calculator className="h-4 w-4 text-cyan-400" />
                                                            </div>
                                                            {isSelected && <CircleCheck className="h-5 w-5 text-cyan-400" />}
                                                        </div>
                                                        <p className="text-xs font-black text-white/60 uppercase tracking-wider mb-1">{p.nombre}</p>
                                                        <div className="flex items-baseline gap-1 mb-3">
                                                            <span className="text-xs text-white/30">$</span>
                                                            <span className="text-2xl font-black text-white">{Math.floor(p.precioUsd)}</span>
                                                            <span className="text-xs text-white/30">.{String(p.precioUsd).split('.')[1] || '00'}</span>
                                                            <span className="text-[9px] text-white/30 font-bold">/mes</span>
                                                        </div>
                                                        <div className="space-y-1 pt-3 border-t border-white/5">
                                                            {p.features.slice(0, 3).map((f, i) => (
                                                                <div key={i} className="flex items-center gap-1.5">
                                                                    <Check className="h-3 w-3 text-emerald-400 shrink-0" />
                                                                    <span className="text-[9px] font-bold text-white/40">{f}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Payment Gateway Notice */}
                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                                        <CreditCard className="h-5 w-5 text-amber-400 shrink-0" />
                                        <p className="text-xs text-amber-200/60 font-medium">
                                            <span className="font-black text-amber-400">Pasarela de pago en construcción.</span> Por ahora, completa el registro y nuestro equipo te contactará para activar tu plan.
                                        </p>
                                    </div>

                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        className="w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-cyan-500/20 transition-all active:scale-[0.98]"
                                    >
                                        Continuar <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </div>
                            )}

                            {/* ─── Step 2: Business Info ────────────────── */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <div className="text-center space-y-1 mb-4">
                                        <h2 className="text-xl font-black text-white italic">Configuración de Negocio</h2>
                                        <p className="text-sm text-white/40 font-medium">Vincula tu empresa al sistema.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">RIF de la Empresa</Label>
                                                <Controller name="rif" control={control} render={({ field }) => (
                                                    <DocumentInput type="rif" value={field.value} onChange={field.onChange} error={!!errors.rif} />
                                                )} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Razón Social</Label>
                                                <Input {...register('razonSocial')} placeholder="Empresa C.A." className="h-12 rounded-xl bg-white/5 border-white/10 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder:text-white/20" />
                                            </div>
                                        </div>

                                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                             <div className="space-y-1.5">
                                                 <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Nombre</Label>
                                                 <p className="text-[9px] font-bold text-white/20 ml-1">Contador/Representante</p>
                                                 <Input {...register('nombre')} className="h-12 rounded-xl bg-white/5 border-white/10 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder:text-white/20" />
                                             </div>
                                             <div className="space-y-1.5">
                                                 <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Apellido</Label>
                                                 <Input {...register('apellido')} className="h-12 rounded-xl bg-white/5 border-white/10 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder:text-white/20" />
                                             </div>
                                         </div>

                                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                             <div className="space-y-1.5">
                                                 <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Email Profesional</Label>
                                                 <Input {...register('email')} type="email" className="h-12 rounded-xl bg-white/5 border-white/10 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder:text-white/20" />
                                             </div>
                                             <div className="space-y-1.5">
                                                 <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Teléfono</Label>
                                                 <Input {...register('telefono')} type="tel" className="h-12 rounded-xl bg-white/5 border-white/10 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder:text-white/20" />
                                             </div>
                                         </div>

                                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                             <div className="space-y-1.5">
                                                 <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Contraseña</Label>
                                                 <div className="relative">
                                                     <Input type={showPassword ? 'text' : 'password'} {...register('password')} className="h-12 rounded-xl bg-white/5 border-white/10 pr-10 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder:text-white/20" />
                                                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                                                         {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                     </button>
                                                 </div>
                                             </div>
                                             <div className="space-y-1.5">
                                                 <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Confirmar</Label>
                                                 <Input type="password" {...register('confirmPassword')} className="h-12 rounded-xl bg-white/5 border-white/10 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder:text-white/20" />
                                             </div>
                                         </div>

                                        <button
                                            type="button"
                                            onClick={() => setAcceptTerms(!acceptTerms)}
                                            className="flex items-start gap-3 p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 transition-colors w-full text-left mt-2"
                                        >
                                            <div className={cn(
                                                "mt-1 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
                                                acceptTerms ? "bg-cyan-500 border-cyan-500" : "border-white/20"
                                            )}>
                                                {acceptTerms && <Check className="h-3.5 w-3.5 text-white stroke-[3px]" />}
                                            </div>
                                            <p className="text-[11px] text-white/40 font-bold leading-relaxed uppercase tracking-tight">
                                                Autorizo la gestión de mis libros contables y declaraciones fiscales en Kyron.
                                            </p>
                                        </button>
                                    </div>

                                    <div className="flex gap-4 pt-2">
                                        <Button type="button" variant="ghost" onClick={() => setStep(1)} className="h-14 rounded-2xl border border-white/10 px-6 font-bold text-white/30 hover:text-white hover:bg-white/5">
                                            <ArrowLeft className="h-5 w-5" />
                                        </Button>
                                        <Button type="button" onClick={nextStep} className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black shadow-xl shadow-cyan-500/20 transition-all active:scale-[0.98]">
                                            Crear Portal <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* ─── Step 3: Verification ─────────────────── */}
                            {step === 3 && (
                                <div className="space-y-8 py-4">
                                    <div className="text-center space-y-2">
                                        <div className="inline-flex p-4 rounded-3xl bg-cyan-500/10 mb-2">
                                            <Lock className="h-8 w-8 text-cyan-400" />
                                        </div>
                                        <h2 className="text-xl font-black text-white">Verificar Email</h2>
                                        <p className="text-sm text-white/40 font-medium">Confirma el acceso al correo <span className="text-cyan-400 font-bold">{getValues('email')}</span></p>
                                    </div>

                                    {!verifSent ? (
                                        <Button type="button" onClick={sendVerificationCode} disabled={verifLoading} className="w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 font-black text-base">
                                            {verifLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Generar Token de Acceso'}
                                        </Button>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="flex justify-center gap-3">
                                                <Input
                                                    maxLength={6}
                                                    value={verifCode}
                                                    onChange={e => setVerifCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                    className="h-16 text-center text-3xl font-black font-mono tracking-[0.5em] rounded-2xl bg-white/5 border-white/10 focus:ring-4 focus:ring-cyan-500/10 text-white placeholder:text-white/20"
                                                    placeholder="000000"
                                                />
                                            </div>
                                            <div className="text-center">
                                                {countdown > 0 ? (
                                                    <p className="text-[11px] font-bold uppercase tracking-widest text-white/30">Nuevo token en <span className="text-cyan-400">{countdown}s</span></p>
                                                ) : (
                                                    <button type="button" onClick={sendVerificationCode} className="text-[11px] font-bold uppercase tracking-widest text-cyan-400 hover:underline">Reenviar token</button>
                                                )}
                                            </div>
                                            <Button type="submit" disabled={verifCode.length < 6 || verifLoading} className="w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/20 font-black text-base">
                                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sincronizar y Activar'}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ─── Step 4: Success ──────────────────────── */}
                            {step === 4 && (
                                <div className="text-center py-10 space-y-6">
                                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-cyan-500 to-blue-700 shadow-2xl shadow-cyan-500/40 mb-2">
                                        <TrendingUp className="h-12 w-12 text-white stroke-[3px]" />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-black italic tracking-tight text-white">Portal Activo</h2>
                                        <p className="text-sm text-white/40 font-medium px-8">
                                            Tu infraestructura ha sido desplegada. <span className="text-cyan-400 font-bold">System Kyron</span> está listo.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-4">
                                        <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 text-left">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Plan</p>
                                            <p className="text-sm font-bold text-cyan-300">
                                                {planType === 'combo'
                                                    ? COMBOS.find(c => c.id === getValues('plan'))?.nombre
                                                    : PLANES_CONTABILIDAD.find(p => p.id === getValues('plan'))?.nombre
                                                }
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 text-left">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Estado</p>
                                            <p className="text-sm font-bold text-emerald-400">✓ Activo</p>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full h-14 rounded-2xl bg-white text-slate-900 hover:bg-white/90 font-black uppercase tracking-widest shadow-xl transition-all"
                                        onClick={() => router.push('/dashboard-empresa' as any)}
                                    >
                                        Explorar Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                {/* Footer Trust Badges */}
                <div className="mt-12 flex items-center justify-center gap-8 opacity-30">
                    <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">KYC/AML Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">VEN-NIF Certified</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
