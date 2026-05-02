'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
    Loader2, CircleCheck as CheckCircle, ArrowRight, ArrowLeft, Eye, EyeOff,
    Calculator, Check, Star, Crown, Zap, Mail, RefreshCw, Smartphone, Building, User, Lock, Phone,
    ChartColumn, TrendingUp, ShieldCheck, FileText,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useVerificationPoll } from '@/hooks/use-verification-poll';
import { usePopularPlan } from '@/hooks/use-popular-plan';
import { useAuth } from '@/lib/auth/context';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { DocumentInput } from '@/components/document-input';

const PLANES_CONTABILIDAD = [
    {
        id: 'contable_esencial',
        nombre: 'Esencial',
        precioUsd: 8,
        descripcion: 'Libros legales básicos y calendario fiscal automatizado.',
        features: ['Libros Diario/Mayor', 'Calendario Fiscal IA', 'Tasa BCV en vivo', '1 Usuario'],
    },
    {
        id: 'contable_profesional',
        nombre: 'Profesional',
        precioUsd: 18,
        descripcion: 'Gestión tributaria avanzada y declaraciones asistidas.',
        features: ['Todo en Esencial', 'Retenciones IVA/ISLR', 'Centro Tributario', '3 Usuarios'],
    },
    {
        id: 'contable_avanzado',
        nombre: 'Avanzado',
        precioUsd: 35,
        descripcion: 'IA de auditoría y conciliación bancaria completa.',
        features: ['Todo en Profesional', 'IA Fiscal Auditor', 'Conciliación Bancaria', '5 Usuarios'],
    },
    {
        id: 'contable_max',
        nombre: 'MAX',
        precioUsd: 60,
        descripcion: 'Poder absoluto multi-empresa con soporte VIP 24/7.',
        features: ['Todo ilimitado', 'Multi-empresa (hasta 5)', 'Soporte VIP 24/7', 'API Connect'],
    },
];

const schema = z.object({
    razonSocial: z.string().min(3, 'Ingrese la razón social'),
    rif: z.string().regex(/^[JGCVEPF]-\d{8}-\d$/, 'Formato: J-50328471-6'),
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
}).refine(d => d.password === d.confirmPassword, {
    message: 'Las contraseñas no coinciden', path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

const TOTAL_STEPS = 4;

const stepConfig = [
    { title: 'Plan', desc: 'Elige tu potencia', icon: Star },
    { title: 'Empresa', desc: 'Identidad fiscal', icon: Building },
    { title: 'Verificar', desc: 'Confirma email', icon: Mail },
    { title: 'Listo', desc: 'Portal activado', icon: CheckCircle },
];

export default function RegisterContabilidadPage() {
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { refreshUser } = useAuth();
    const { toast } = useToast();
    const { popularPlan, recordSelection } = usePopularPlan('asesoria-contable');
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
            rif: searchParams.get('doc') || '',
            razonSocial: searchParams.get('razon') || '',
        },
    });

    const watchedPassword = watch('password');

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
                body: JSON.stringify({ destino, tipo: 'email' }),
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
                body: JSON.stringify({ destino: verifDestino, codigo: code }),
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
            if (!selectedPlan) {
                toast({ title: 'Selecciona un plan', variant: 'destructive' });
                return;
            }
            setValue('plan', selectedPlan);
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
            recordSelection(data.plan);
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tipo: 'juridico',
                    ...data,
                    modules: [{ id: 'contabilidad', label: 'Asesoría Contable' }],
                    plan: data.plan,
                    // Details deferred
                }),
            });
            if (!res.ok) throw new Error('Error en el registro');
            await refreshUser();
            setStep(TOTAL_STEPS);
        } catch (e: any) {
            toast({ title: 'Error', description: e.message, variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-slate-50 to-blue-50 dark:from-slate-950 dark:via-indigo-950/10 dark:to-slate-950">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, #6366f120 0%, transparent 70%)' }} />
            <div className="absolute bottom-[-200px] right-[-100px] w-[700px] h-[700px] rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, #2563eb20 0%, transparent 70%)' }} />

            <div className={cn(
                "relative z-10 container mx-auto px-4 py-8 flex flex-col items-center min-h-screen",
                step === 1 ? "max-w-4xl" : "max-w-xl"
            )}>
                {/* Header Branding */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-700 shadow-lg shadow-indigo-500/30 text-white">
                        <Calculator className="h-7 w-7" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold uppercase tracking-[0.1em] text-slate-800 dark:text-slate-100 italic">Asesoría Contable</h1>
                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600">System Kyron • Fiscal & Tech</p>
                    </div>
                </div>

                {/* Progress Steps */}
                {step < TOTAL_STEPS && (
                    <div className="flex items-center gap-0 mb-10 w-full max-w-md mx-auto">
                        {stepConfig.slice(0, 3).map((s, i) => {
                            const stepNum = i + 1;
                            const isActive = step === stepNum;
                            const isDone = step > stepNum;
                            const Icon = s.icon;
                            return (
                                <div key={i} className="flex items-center flex-1 last:flex-none">
                                    <div className="flex flex-col items-center">
                                        <div className={cn(
                                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border-2",
                                            isDone ? "bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/20" :
                                            isActive ? "bg-white dark:bg-slate-800 border-indigo-500 text-indigo-500 shadow-xl shadow-indigo-500/10" :
                                            "bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-300"
                                        )}>
                                            {isDone ? <Check className="h-6 w-6" /> : <Icon className="h-5 w-5" />}
                                        </div>
                                        <p className={cn("text-[10px] font-bold uppercase tracking-widest mt-2 px-1 text-center leading-tight", isActive ? "text-indigo-600" : isDone ? "text-slate-600" : "text-slate-400")}>{s.title}</p>
                                    </div>
                                    {i < 2 && <div className={cn("flex-1 h-0.5 mx-2 -mt-6 rounded-full transition-colors duration-500", step > stepNum ? "bg-indigo-500" : "bg-slate-200 dark:bg-slate-800")} />}
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-indigo-500/5 border border-white/20 dark:border-slate-800 overflow-hidden">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="p-8">
                            {step === 1 && (
                                <div className="space-y-8">
                                    <div className="text-center space-y-1.5">
                                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 italic">Optimización Contable IA</h2>
                                        <p className="text-sm text-slate-500 font-medium">Automatiza tus libros, tributos y estados financieros hoy mismo.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {PLANES_CONTABILIDAD.map((p) => {
                                            const isSelected = selectedPlan === p.id;
                                            return (
                                                <button
                                                    key={p.id} type="button" onClick={() => setSelectedPlan(p.id)}
                                                    className={cn(
                                                        "relative text-left p-6 rounded-[2rem] border-2 transition-all duration-300 group hover:shadow-xl",
                                                        isSelected ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/5 ring-4 ring-indigo-500/10" : "bg-white dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 hover:border-indigo-200"
                                                    )}
                                                >
                                                    {popularPlan === p.id && <div className="absolute -top-3 right-6 px-3 py-1 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-lg">Más Vendido</div>}
                                                    <div className="flex justify-between items-center mb-3">
                                                        <div className={cn("p-2 rounded-xl", isSelected ? "bg-indigo-500 text-white" : "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500")}>
                                                            <ChartColumn className="h-5 w-5" />
                                                        </div>
                                                        {isSelected && <CheckCircle className="h-5 w-5 text-indigo-500" />}
                                                    </div>
                                                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{p.nombre}</p>
                                                    <div className="flex items-baseline gap-1 mb-2">
                                                        <span className="text-2xl font-black text-slate-800 dark:text-slate-100">${p.precioUsd}</span>
                                                        <span className="text-xs font-bold text-slate-400">/mes</span>
                                                    </div>
                                                    <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                                                        {p.features.map((f, i) => (
                                                            <div key={i} className="flex items-center gap-2">
                                                                <Check className="h-3 w-3 text-emerald-500" />
                                                                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">{f}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <Button type="button" onClick={nextStep} className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98]">
                                        Continuar con el Plan <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6">
                                    <div className="text-center space-y-1 mb-4">
                                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 italic">Configuración de Negocio</h2>
                                        <p className="text-sm text-slate-500 font-medium">Vincula tu empresa al sistema contable.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-1">
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">RIF de la Empresa</Label>
                                                <Controller name="rif" control={control} render={({ field }) => (
                                                    <DocumentInput type="rif" value={field.value} onChange={field.onChange} error={!!errors.rif} />
                                                )} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Razón Social</Label>
                                                <Input {...register('razonSocial')} placeholder="Empresa C.A." className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 px-1">
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Nombre Contador/Representante</Label>
                                                <Input {...register('nombre')} className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Apellido</Label>
                                                <Input {...register('apellido')} className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 px-1">
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Profesional</Label>
                                                <Input {...register('email')} type="email" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Teléfono</Label>
                                                <Input {...register('telefono')} type="tel" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 px-1">
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Contraseña</Label>
                                                <div className="relative">
                                                    <Input type={showPassword ? 'text' : 'password'} {...register('password')} className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none pr-10 focus:ring-2 focus:ring-indigo-500/20 shadow-sm" />
                                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Confirmar</Label>
                                                <Input type="password" {...register('confirmPassword')} className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm" />
                                            </div>
                                        </div>

                                        <button type="button" onClick={() => setAcceptTerms(!acceptTerms)} className="flex items-start gap-3 p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10 transition-colors w-full text-left mt-2 shadow-sm">
                                            <div className={cn("mt-1 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all", acceptTerms ? "bg-indigo-600 border-indigo-600 shadow-md" : "border-slate-300 dark:border-slate-600")}>
                                                {acceptTerms && <Check className="h-3.5 w-3.5 text-white stroke-[3px]" />}
                                            </div>
                                            <p className="text-[11px] text-slate-500 font-bold leading-relaxed uppercase tracking-tight">Autorizo la gestión de mis libros contables y declaraciones fiscales en Kyron.</p>
                                        </button>
                                    </div>

                                    <div className="flex gap-4 pt-2">
                                        <Button type="button" variant="ghost" onClick={() => setStep(1)} className="h-14 rounded-2xl border border-slate-200 dark:border-slate-800 px-6 font-bold text-slate-400 hover:text-slate-800">
                                            <ArrowLeft className="h-5 w-5" />
                                        </Button>
                                        <Button type="button" onClick={nextStep} className="flex-1 h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98]">
                                            Crear Portal <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-8 py-4">
                                    <div className="text-center space-y-2">
                                        <div className="inline-flex p-4 rounded-3xl bg-indigo-500/10 mb-2">
                                            <Lock className="h-8 w-8 text-indigo-500" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Verificar Email</h2>
                                        <p className="text-sm text-slate-500 font-medium">Por seguridad corporativa, confirma el acceso al correo <span className="text-indigo-600 font-bold">{getValues('email')}</span></p>
                                    </div>

                                    {!verifSent ? (
                                        <Button type="button" onClick={sendVerificationCode} disabled={verifLoading} className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 font-bold text-base">
                                            {verifLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Generar Token de Acceso'}
                                        </Button>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="flex justify-center gap-3">
                                                <Input maxLength={6} value={verifCode} onChange={e => setVerifCode(e.target.value.replace(/\D/g, '').slice(0, 6))} className="h-16 text-center text-3xl font-black font-mono tracking-[0.5em] rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-4 focus:ring-indigo-500/10" placeholder="000000" />
                                            </div>
                                            <div className="text-center">
                                                {countdown > 0 ? (
                                                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Nuevo token en <span className="text-indigo-500">{countdown}s</span></p>
                                                ) : (
                                                    <button type="button" onClick={sendVerificationCode} className="text-[11px] font-bold uppercase tracking-widest text-indigo-500 hover:underline">Reenviar token</button>
                                                )}
                                            </div>
                                            <Button type="submit" disabled={verifCode.length < 6 || verifLoading} className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 font-bold text-base">
                                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sincronizar y Activar'}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {step === 4 && (
                                <div className="text-center py-10 space-y-6">
                                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-indigo-500 to-blue-700 shadow-2xl shadow-indigo-500/40 mb-2">
                                        <TrendingUp className="h-12 w-12 text-white stroke-[3px]" />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-black italic tracking-tight text-slate-800 dark:text-slate-100">Portal Activo</h2>
                                        <p className="text-sm text-slate-500 font-medium px-8">Tu infraestructura contable ha sido desplegada. Ahora puedes disfrutar de la potencia de <span className="text-indigo-600 font-bold">System Kyron Contabilidad</span>.</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-3 pt-4">
                                        <div className="p-4 rounded-3xl bg-indigo-50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10 text-left">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Membresía</p>
                                            <p className="text-sm font-bold text-indigo-800 dark:text-indigo-300">{PLANES_CONTABILIDAD.find(p => p.id === getValues('plan'))?.nombre}</p>
                                        </div>
                                        <div className="p-4 rounded-3xl bg-indigo-50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10 text-left">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Cumplimiento</p>
                                            <p className="text-sm font-bold text-indigo-800 dark:text-indigo-300">100% Tax OK</p>
                                        </div>
                                    </div>

                                    <Button className="w-full h-14 rounded-2xl bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-700 text-white font-black uppercase tracking-widest shadow-xl transition-all" onClick={() => window.location.href = '/dashboard-empresa'}>
                                        Explorar Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                <div className="mt-12 flex items-center justify-center gap-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                    <div className="flex items-center gap-2">
                        <ChartColumn className="h-4 w-4" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Real-time Analytics</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">KYC/AML Compliant</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
