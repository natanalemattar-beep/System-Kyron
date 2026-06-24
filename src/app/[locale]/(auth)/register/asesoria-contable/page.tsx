'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
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
    Calculator, Check, Star, Lock, TrendingUp, Shield,
    Zap, Building, CreditCard, Package, Globe, User,
    Mail, Phone, Building2, FileText, KeyRound, X,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth/context';
import { VerificationCodeInput } from '@/components/auth/verification-code-input';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { MODULOS_INDIVIDUALES } from '@/lib/planes-data';
import { DocumentInput } from '@/components/document-input';

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

const COMBOS = [
  {
    id: 'solo',
    nombre: 'Solo',
    precio: 19.99,
    modulos: ['contabilidad', 'ventas', 'telecom'],
    modulosLabels: ['Contable Esencial', 'Facturación Básica', 'Mi Línea 2GB'],
    icon: User,
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/20',
  },
  {
    id: 'profesional',
    nombre: 'Profesional',
    precio: 34.99,
    popular: true,
    modulos: ['contabilidad', 'ventas', 'legal', 'telecom'],
    modulosLabels: ['Contable Pro', 'Facturación Comercial', 'Legal Pro', 'Mi Línea 5GB'],
    icon: Star,
    color: 'violet',
    gradient: 'from-violet-500 to-purple-600',
    glow: 'shadow-violet-500/20',
  },
  {
    id: 'empresarial',
    nombre: 'Empresarial',
    precio: 69.99,
    modulos: ['contabilidad', 'ventas', 'legal', 'socios', 'telecom'],
    modulosLabels: ['Contable Avanzado', 'Facturación Enterprise', 'Escritorio Jurídico', 'Socios Pro', 'Mi Línea 10GB'],
    icon: Building,
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600',
    glow: 'shadow-blue-500/20',
  },
  {
    id: 'kyron_max',
    nombre: 'Kyron MAX',
    precio: 99.99,
    modulos: ['contabilidad', 'ventas', 'legal', 'socios', 'telecom'],
    modulosLabels: ['Contable MAX', 'Facturación MAX', 'Legal MAX', 'Socios Enterprise', 'Mi Línea Infinite'],
    icon: Zap,
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600',
    glow: 'shadow-amber-500/20',
  },
];

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
    plan: z.string(),
    planType: z.enum(['individual', 'combo']).default('individual'),
}).refine(d => d.password === d.confirmPassword, {
    message: 'Las contraseñas no coinciden', path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

const TOTAL_STEPS = 4;
const STEP_LABELS = ['Plan', 'Datos', 'Verificar', 'Listo'];

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)) score++;

    if (score <= 1) return { score, label: 'Débil', color: 'bg-red-500' };
    if (score <= 2) return { score, label: 'Regular', color: 'bg-orange-500' };
    if (score <= 3) return { score, label: 'Buena', color: 'bg-yellow-500' };
    if (score <= 4) return { score, label: 'Fuerte', color: 'bg-emerald-500' };
    return { score, label: 'Excelente', color: 'bg-cyan-500' };
}

export default function RegisterContabilidadPage() {
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [selectedCombo, setSelectedCombo] = useState<string | null>(null);
    const [planType, setPlanType] = useState<'individual' | 'combo'>('individual');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const { refreshUser } = useAuth();
    const { toast } = useToast();
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [verifVerified, setVerifVerified] = useState(false);
    const [passwordWatch, setPasswordWatch] = useState('');

    const onVerified = useCallback(() => {
        setVerifVerified(true);
        toast({ title: '¡Verificado!', description: 'Identidad confirmada exitosamente.' });
    }, [toast]);

    const { register, handleSubmit, control, setValue, trigger, getValues, watch, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onBlur',
        defaultValues: {
            plan: searchParams.get('plan') || '',
            planType: 'individual',
            rif: searchParams.get('doc') || '',
            razonSocial: searchParams.get('razon') || '',
            email: searchParams.get('email') || '',
        },
    });

    const [rifSearching, setRifSearching] = useState(false);
    const [rifFound, setRifFound] = useState(false);
    const rifValue = watch('rif');
    useEffect(() => {
        const doc = searchParams.get('doc');
        if (!rifValue || rifValue === doc) { return; }
        if (!/^[JGCVEPF]-\d{8}-\d$/.test(rifValue)) { setRifFound(false); return; }
        setRifSearching(true);
        setRifFound(false);
        const controller = new AbortController();
        const timeout = setTimeout(async () => {
            try {
                const res = await fetch(`/api/rif/consulta?rif=${encodeURIComponent(rifValue)}`, { signal: controller.signal });
                const data = await res.json();
                if (data.found && data.data?.razonSocial) {
                    setValue('razonSocial', data.data.razonSocial, { shouldValidate: true });
                    setRifFound(true);
                }
            } catch {} finally {
                setRifSearching(false);
            }
        }, 500);
        return () => { clearTimeout(timeout); controller.abort(); setRifSearching(false); };
    }, [rifValue, setValue, searchParams]);

    useEffect(() => {
        const sub = watch((value, { name }) => {
            if (name === 'password') setPasswordWatch(value.password || '');
        });
        return sub.unsubscribe;
    }, [watch]);

    const nextStep = useCallback(async () => {
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
    }, [step, planType, selectedCombo, selectedPlan, setValue, trigger, acceptTerms, toast]);

    const onSubmit = async (data: FormData) => {
        if (!verifVerified) {
            toast({ title: 'Verificación requerida', variant: 'destructive' });
            return;
        }
        setIsLoading(true);
        try {
            const modules = data.planType === 'combo'
                ? (COMBOS.find(c => c.id === data.plan)?.modulos || [])
                : ['contabilidad'];

            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tipo: 'juridico',
                    ...data,
                    repEmail: data.email,
                    repNombre: `${data.nombre} ${data.apellido}`,
                    modules: modules.map(m => ({ id: m, label: m })),
                    plan: data.plan,
                    planType: data.planType,
                }),
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || 'Error en el registro');
            }
            await refreshUser();
            setStep(TOTAL_STEPS);
        } catch (e: unknown) {
            toast({ title: 'Error', description: e instanceof Error ? e.message : 'Error en el registro', variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    const activePlan = useMemo(() => {
        if (planType === 'combo') {
            return COMBOS.find(c => c.id === selectedCombo);
        }
        return PLANES_CONTABILIDAD.find(p => p.id === selectedPlan);
    }, [planType, selectedCombo, selectedPlan]);

    const passwordStrength = useMemo(() => getPasswordStrength(passwordWatch), [passwordWatch]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-950">
            {/* Optimized Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/6 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
            </div>

            {/* Nav */}
            <nav className="relative z-20 border-b border-[#1e293b] bg-[#0a0e1a]">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 transition-transform group-hover:scale-105">
                            <Calculator className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-white uppercase tracking-wider">Asesoría Contable</h1>
                            <p className="text-[9px] text-cyan-400/60 font-black uppercase tracking-widest">System Kyron</p>
                        </div>
                    </Link>

                    {step < TOTAL_STEPS && (
                        <div className="hidden sm:flex items-center gap-2">
                            {STEP_LABELS.slice(0, 3).map((label, i) => {
                                const stepNum = i + 1;
                                const isActive = step === stepNum;
                                const isDone = step > stepNum;
                                return (
                                    <div key={label} className="flex items-center gap-2">
                                        <div className={cn(
                                            "w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300",
                                            isDone ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20" :
                                            isActive ? "bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/30" :
                                            "bg-white/5 text-white/20"
                                        )}>
                                            {isDone ? <Check className="h-4 w-4" /> : stepNum}
                                        </div>
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase tracking-wider hidden lg:block transition-colors",
                                            isActive ? "text-cyan-400" : isDone ? "text-white/50" : "text-white/15"
                                        )}>{label}</span>
                                        {i < 2 && <div className={cn("w-10 h-px transition-colors", isDone ? "bg-cyan-500/50" : "bg-white/5")} />}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/50 hover:text-white transition-all group">
                        <X className="h-4 w-4" />
                        <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest">Cerrar</span>
                    </Link>
                </div>
            </nav>

            {/* Main */}
            <div className={cn(
                "relative z-10 container mx-auto px-4 py-8 flex flex-col items-center min-h-[calc(100vh-4rem)]",
                step === 1 ? "max-w-6xl" : step === 4 ? "max-w-lg" : "max-w-2xl"
            )}>
                <div className="w-full bg-[#111827] rounded-2xl shadow-2xl shadow-black/30 border border-[#1e293b] overflow-hidden">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="p-6 md:p-10">
                            {/* Step 1: Plan Selection */}
                            {step === 1 && (
                                <div className="space-y-8">
                                    <div className="text-center space-y-3">
                                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 ring-1 ring-cyan-500/20 mb-2">
                                            <Package className="h-7 w-7 text-cyan-400" />
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Elige tu Plan Ideal</h2>
                                        <p className="text-sm text-white/40 font-medium max-w-md mx-auto">Selecciona un combo completo o un módulo individual según tus necesidades.</p>
                                    </div>

                                    {/* Toggle */}
                                    <div className="flex justify-center">
                                        <div className="inline-flex p-1.5 rounded-2xl bg-white/5 ring-1 ring-white/10">
                                            {(['combo', 'individual'] as const).map((type) => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => { setPlanType(type); setSelectedCombo(null); setSelectedPlan(null); }}
                                                    className={cn(
                                                        "px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300",
                                                        planType === type
                                                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                                                            : "text-white/40 hover:text-white/60"
                                                    )}
                                                >
                                                    {type === 'combo' ? <><Package className="h-3.5 w-3.5 inline mr-1.5" />Combos</> : <><Calculator className="h-3.5 w-3.5 inline mr-1.5" />Individual</>}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Combo Cards */}
                                    {planType === 'combo' && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                                            {COMBOS.map((combo) => {
                                                const isSelected = selectedCombo === combo.id;
                                                const Icon = combo.icon;
                                                return (
                                                    <button
                                                        key={combo.id}
                                                        type="button"
                                                        onClick={() => setSelectedCombo(combo.id)}
                                                        className={cn(
                                                            "relative text-left p-5 rounded-2xl border transition-all duration-300 group",
                                                            isSelected
                                                                ? "border-cyan-500/40 bg-cyan-500/5 ring-2 ring-cyan-500/20 shadow-lg shadow-cyan-500/10"
                                                                : "border-[#1e293b] bg-[#111827] hover:border-[#334155] hover:bg-[#151e30]"
                                                        )}
                                                    >
                                                        {combo.popular && (
                                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-white shadow-lg whitespace-nowrap">
                                                                Más Popular
                                                            </div>
                                                        )}
                                                        <div className="flex items-center gap-2.5 mb-4">
                                                            <div className={cn(
                                                                "p-2 rounded-xl transition-all",
                                                                isSelected ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md" : "bg-[#1e293b]"
                                                            )}>
                                                                <Icon className="h-4 w-4" />
                                                            </div>
                                                            <span className="text-xs font-black text-white/70 uppercase tracking-wider">{combo.nombre}</span>
                                                        </div>
                                                        <div className="flex items-baseline gap-0.5 mb-4">
                                                            <span className="text-xs text-white/30">$</span>
                                                            <span className="text-3xl font-black text-white">{Math.floor(combo.precio)}</span>
                                                            <span className="text-xs text-white/30">.{String(combo.precio).split('.')[1] || '00'}</span>
                                                            <span className="text-[9px] text-white/25 font-bold ml-1">/mes</span>
                                                        </div>
                                                        <div className="space-y-2 pt-3 border-t border-white/5">
                                                            {combo.modulosLabels.map((m, i) => (
                                                                <div key={i} className="flex items-center gap-2">
                                                                    <Check className="h-3 w-3 text-cyan-400/60 shrink-0" />
                                                                    <span className="text-[10px] font-medium text-white/40">{m}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Individual Plans */}
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
                                                            "relative text-left p-5 rounded-2xl border transition-all duration-300",
                                                            isSelected
                                                                ? "border-cyan-500/40 bg-cyan-500/5 ring-2 ring-cyan-500/20 shadow-lg shadow-cyan-500/10"
                                                                : "border-white/10 bg-white/[0.02] hover:border-white/20"
                                                        )}
                                                    >
                                                        {p.popular && (
                                                            <div className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-white shadow-lg">
                                                                Popular
                                                            </div>
                                                        )}
                                                        <div className="flex justify-between items-start mb-3">
                                                            <div className="p-2 rounded-xl bg-white/10">
                                                                <Calculator className="h-4 w-4 text-cyan-400" />
                                                            </div>
                                                            {isSelected && <CircleCheck className="h-5 w-5 text-cyan-400" />}
                                                        </div>
                                                        <p className="text-xs font-black text-white/70 uppercase tracking-wider mb-1">{p.nombre}</p>
                                                        <div className="flex items-baseline gap-0.5 mb-3">
                                                            <span className="text-xs text-white/30">$</span>
                                                            <span className="text-2xl font-black text-white">{Math.floor(p.precioUsd)}</span>
                                                            <span className="text-[9px] text-white/25 font-bold ml-1">/mes</span>
                                                        </div>
                                                        <div className="space-y-1.5 pt-3 border-t border-white/5">
                                                            {p.features.slice(0, 3).map((f, i) => (
                                                                <div key={i} className="flex items-center gap-2">
                                                                    <Check className="h-3 w-3 text-emerald-400/60 shrink-0" />
                                                                    <span className="text-[10px] font-medium text-white/40">{f}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Payment Notice */}
                                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                                        <CreditCard className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                                        <p className="text-xs text-amber-200/50 font-medium leading-relaxed">
                                            <span className="font-black text-amber-400">Pasarela de pago en desarrollo.</span> Completa el registro y nuestro equipo te contactará para activar tu plan.
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

                            {/* Step 2: Business Info */}
                            {step === 2 && (
                                <div className="space-y-8">
                                    <div className="text-center space-y-2">
                                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 ring-1 ring-cyan-500/20 mb-2">
                                            <Building2 className="h-7 w-7 text-cyan-400" />
                                        </div>
                                        <h2 className="text-2xl font-black text-white tracking-tight">Datos de tu Empresa</h2>
                                        <p className="text-sm text-white/40 font-medium">Configura tu perfil empresarial para comenzar.</p>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Company Section */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/30">
                                                <Building2 className="h-3.5 w-3.5" />
                                                <span>Información Empresarial</span>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-bold uppercase tracking-wider text-white/40">RIF</Label>
                                                    <Controller name="rif" control={control} render={({ field }) => (
                                                        <DocumentInput type="rif" value={field.value} onChange={field.onChange} error={!!errors.rif} />
                                                    )} />
                                                    {errors.rif && <p className="text-[10px] text-red-400">{errors.rif.message}</p>}
                                                    {rifSearching && (
                                                        <div className="flex items-center gap-2 mt-1.5 text-[11px] text-cyan-400/60">
                                                            <Loader2 className="h-3 w-3 animate-spin" /> Buscando en SENIAT...
                                                        </div>
                                                    )}
                                                    {rifFound && !rifSearching && (
                                                        <div className="flex items-center gap-2 mt-1.5 text-[11px] text-emerald-400 font-medium">
                                                            <CircleCheck className="h-3 w-3" /> Razón social auto-completada
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Razón Social</Label>
                                                    <Input {...register('razonSocial')} placeholder="Empresa C.A." className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 text-white placeholder:text-white/20 transition-all" />
                                                    {errors.razonSocial && <p className="text-[10px] text-red-400">{errors.razonSocial.message}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Person Section */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/30">
                                                <User className="h-3.5 w-3.5" />
                                                <span>Representante / Contador</span>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Nombre</Label>
                                                    <Input {...register('nombre')} placeholder="Tu nombre" className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 text-white placeholder:text-white/20 transition-all" />
                                                    {errors.nombre && <p className="text-[10px] text-red-400">{errors.nombre.message}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Apellido</Label>
                                                    <Input {...register('apellido')} placeholder="Tu apellido" className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 text-white placeholder:text-white/20 transition-all" />
                                                    {errors.apellido && <p className="text-[10px] text-red-400">{errors.apellido.message}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Contact Section */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/30">
                                                <Mail className="h-3.5 w-3.5" />
                                                <span>Contacto y Acceso</span>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Email</Label>
                                                    <Input {...register('email')} type="email" placeholder="correo@empresa.com" className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 text-white placeholder:text-white/20 transition-all" />
                                                    {errors.email && <p className="text-[10px] text-red-400">{errors.email.message}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Teléfono</Label>
                                                    <Input {...register('telefono')} type="tel" placeholder="+58 412-1234567" className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 text-white placeholder:text-white/20 transition-all" />
                                                    {errors.telefono && <p className="text-[10px] text-red-400">{errors.telefono.message}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Password Section */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/30">
                                                <KeyRound className="h-3.5 w-3.5" />
                                                <span>Seguridad</span>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Contraseña</Label>
                                                    <div className="relative">
                                                        <Input type={showPassword ? 'text' : 'password'} autoComplete="new-password" {...register('password')} className="h-12 rounded-xl bg-white/5 border-white/10 pr-10 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 text-white placeholder:text-white/20 transition-all" />
                                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                        </button>
                                                    </div>
                                                    {passwordWatch && (
                                                        <div className="space-y-1.5">
                                                            <div className="flex gap-1">
                                                                {[1, 2, 3, 4, 5].map(i => (
                                                                    <div key={i} className={cn("h-1 flex-1 rounded-full transition-all", i <= passwordStrength.score ? passwordStrength.color : "bg-white/10")} />
                                                                ))}
                                                            </div>
                                                            <p className={cn("text-[10px] font-bold", passwordStrength.score >= 4 ? "text-emerald-400" : passwordStrength.score >= 3 ? "text-yellow-400" : "text-red-400")}>
                                                                {passwordStrength.label}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {errors.password && <p className="text-[10px] text-red-400">{errors.password.message}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-bold uppercase tracking-wider text-white/40">Confirmar Contraseña</Label>
                                                    <div className="relative">
                                                        <Input type={showConfirmPassword ? 'text' : 'password'} autoComplete="new-password" {...register('confirmPassword')} className="h-12 rounded-xl bg-white/5 border-white/10 pr-10 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 text-white placeholder:text-white/20 transition-all" />
                                                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                                                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                        </button>
                                                    </div>
                                                    {errors.confirmPassword && <p className="text-[10px] text-red-400">{errors.confirmPassword.message}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Terms */}
                                        <button
                                            type="button"
                                            onClick={() => setAcceptTerms(!acceptTerms)}
                                            className="flex items-start gap-3 p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 hover:bg-cyan-500/10 transition-all w-full text-left"
                                        >
                                            <div className={cn(
                                                "mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
                                                acceptTerms ? "bg-gradient-to-br from-cyan-500 to-blue-600 border-transparent shadow-md shadow-cyan-500/20" : "border-white/20"
                                            )}>
                                                {acceptTerms && <Check className="h-3.5 w-3.5 text-white stroke-[3px]" />}
                                            </div>
                                            <p className="text-[11px] text-white/40 font-medium leading-relaxed">
                                                Autorizo la gestión de mis libros contables y declaraciones fiscales en <span className="text-cyan-400 font-bold">System Kyron</span>.
                                            </p>
                                        </button>
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <Button type="button" variant="ghost" onClick={() => setStep(1)} className="h-14 w-14 rounded-2xl border border-white/10 text-white/30 hover:text-white hover:bg-white/5 transition-all">
                                            <ArrowLeft className="h-5 w-5" />
                                        </Button>
                                        <Button type="button" onClick={nextStep} className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black shadow-xl shadow-cyan-500/20 transition-all active:scale-[0.98]">
                                            Continuar <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Verification */}
                            {step === 3 && (
                                <div className="space-y-8 py-4">
                                    <div className="text-center space-y-3">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 ring-1 ring-cyan-500/20 mb-2">
                                            <Lock className="h-8 w-8 text-cyan-400" />
                                        </div>
                                        <h2 className="text-2xl font-black text-white tracking-tight">Verifica tu Email</h2>
                                        <p className="text-sm text-white/40 font-medium">
                                            Confirma el acceso a <span className="text-cyan-400 font-bold">{getValues('email')}</span>
                                        </p>
                                    </div>

                                    <VerificationCodeInput
                                        destino={getValues('email')}
                                        accentColor="cyan"
                                        onVerified={onVerified}
                                    />

                                    <Button type="submit" disabled={!verifVerified || isLoading} className="w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/20 font-black text-base transition-all active:scale-[0.98] disabled:opacity-50">
                                        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                                        Activar Cuenta
                                    </Button>

                                    <div className="flex justify-center pt-4">
                                        <Button type="button" variant="ghost" onClick={() => setStep(2)} className="h-10 text-white/30 hover:text-white transition-colors">
                                            <ArrowLeft className="mr-2 h-4 w-4" /> Volver a datos
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Success */}
                            {step === 4 && (
                                <div className="text-center py-8 space-y-8">
                                    <div className="relative inline-flex items-center justify-center w-24 h-24">
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl blur-xl opacity-40" />
                                        <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30">
                                            <TrendingUp className="h-12 w-12 text-white stroke-[2.5px]" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-black text-white tracking-tight">¡Cuenta Activada!</h2>
                                        <p className="text-sm text-white/40 font-medium px-4">
                                            Tu portal contable está listo. <span className="text-cyan-400 font-bold">System Kyron</span> te espera.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/25 mb-1">Plan</p>
                                            <p className="text-sm font-bold text-cyan-300">{activePlan?.nombre || '—'}</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-left">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/25 mb-1">Estado</p>
                                            <p className="text-sm font-bold text-emerald-400">Activo</p>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full h-14 rounded-2xl bg-white text-slate-900 hover:bg-white/90 font-black uppercase tracking-widest shadow-xl transition-all active:scale-[0.98]"
                                        onClick={() => router.push('/dashboard-empresas' as any)}
                                    >
                                        Ir al Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="mt-10 flex items-center justify-center gap-6 opacity-25">
                    <div className="flex items-center gap-2">
                        <Shield className="h-3.5 w-3.5" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">KYC/AML</span>
                    </div>
                    <div className="h-3 w-px bg-white/20" />
                    <div className="flex items-center gap-2">
                        <Globe className="h-3.5 w-3.5" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">VEN-NIF</span>
                    </div>
                    <div className="h-3 w-px bg-white/20" />
                    <div className="flex items-center gap-2">
                        <FileText className="h-3.5 w-3.5" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">SENIAT</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
