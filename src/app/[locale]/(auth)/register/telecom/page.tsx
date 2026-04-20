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
    Signal, Check, Star, Crown, Zap, Mail, RefreshCw, Smartphone, Building, User, Lock, Phone,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useVerificationPoll } from '@/hooks/use-verification-poll';
import { usePopularPlan } from '@/hooks/use-popular-plan';
import { useAuth } from '@/lib/auth/context';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { DocumentInput } from '@/components/document-input';

const PLANES_TELECOM = [
    {
        id: 'conecta_5gb',
        nombre: 'Conecta 5G',
        precioUsd: 5,
        descripcion: 'Perfecto para uso diario con redes sociales ilimitadas.',
        color: 'blue',
        features: ['5 GB de datos 5G', '150 min llamadas', 'Redes Sociales ilimitadas', 'Música streaming'],
    },
    {
        id: 'plus_10gb',
        nombre: 'Plus 5G',
        precioUsd: 8,
        descripcion: 'Navegación fluida y streaming en alta definición.',
        color: 'indigo',
        features: ['10 GB de datos 5G', '300 min llamadas', '150 SMS incluidos', 'Streaming video HD'],
    },
    {
        id: 'global_25gb',
        nombre: 'Global 5G',
        precioUsd: 14,
        descripcion: 'Potencia total para productividad y entretenimiento.',
        color: 'violet',
        features: ['25 GB de datos 5G', 'Llamadas ilimitadas', '500 SMS incluidos', 'Roaming Premium'],
    },
    {
        id: 'infinite',
        nombre: 'Infinite 5G',
        precioUsd: 35,
        descripcion: 'La experiencia definitiva sin límites de velocidad.',
        color: 'rose',
        features: ['Datos ILIMITADOS 5G', 'Todo ilimitado', 'Soporte VIP 24/7', 'eSIM Multi-perfil'],
    },
];

const schema = z.object({
    tipo_cliente: z.enum(['personal', 'empresarial']),
    nombre: z.string().min(2, 'Ingrese su nombre'),
    apellido: z.string().min(2, 'Ingrese su apellido'),
    cedula: z.string().min(6, 'Documento inválido'),
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
    { title: 'Plan', desc: 'Elige tu servicio', icon: Smartphone },
    { title: 'Cuenta', desc: 'Tus datos básicos', icon: User },
    { title: 'Verificar', desc: 'Confirma tu email', icon: Mail },
    { title: 'Listo', desc: 'Línea activada', icon: CheckCircle },
];

export default function RegisterTelecomPage() {
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { refreshUser } = useAuth();
    const { toast } = useToast();
    const { popularPlan, recordSelection } = usePopularPlan('telecom');
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
            tipo_cliente: 'personal',
            plan: searchParams.get('plan') || '',
        },
    });

    const watchedPassword = watch('password');
    const tipoCliente = watch('tipo_cliente');

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
            if (!res.ok) throw new Error('Error al enviar código');
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
            toast({ title: '¡Verificado!', description: 'Correo electrónico confirmado.' });
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
            const valid = await trigger(['nombre', 'apellido', 'cedula', 'email', 'telefono', 'password', 'confirmPassword']);
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
                    tipo: data.tipo_cliente === 'empresarial' ? 'juridico' : 'natural',
                    ...data,
                    modules: [{ id: 'telecom', label: 'Mi Línea 5G' }],
                    plan: data.plan,
                    // Defer docs and secondary info
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
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50/30 to-slate-50 dark:from-slate-950 dark:via-blue-900/10 dark:to-slate-950">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #3b82f640 0%, transparent 70%)' }} />
            <div className="absolute bottom-[-200px] right-[-100px] w-[700px] h-[700px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #0ea5e940 0%, transparent 70%)' }} />

            <div className={cn(
                "relative z-10 container mx-auto px-4 py-8 flex flex-col items-center min-h-screen",
                step === 1 ? "max-w-4xl" : "max-w-xl"
            )}>
                {/* Header Branding */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30">
                        <Signal className="h-7 w-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold uppercase tracking-[0.1em] text-slate-800 dark:text-slate-100 italic">Mi Línea 5G</h1>
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-500">System Kyron • Telecom</p>
                    </div>
                </div>

                {/* Progress Steps */}
                {step < TOTAL_STEPS && (
                    <div className="flex items-center gap-0 mb-10 w-full max-w-md">
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
                                            isDone ? "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/20" :
                                            isActive ? "bg-white dark:bg-slate-800 border-blue-500 text-blue-500 shadow-xl shadow-blue-500/10" :
                                            "bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-300"
                                        )}>
                                            {isDone ? <Check className="h-6 w-6" /> : <Icon className="h-5 w-5" />}
                                        </div>
                                        <p className={cn("text-[10px] font-bold uppercase tracking-widest mt-2 px-1", isActive ? "text-blue-600" : isDone ? "text-slate-600" : "text-slate-400")}>{s.title}</p>
                                    </div>
                                    {i < 2 && <div className={cn("flex-1 h-0.5 mx-2 -mt-6 rounded-full transition-colors duration-500", step > stepNum ? "bg-blue-500" : "bg-slate-200 dark:bg-slate-800")} />}
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-blue-500/5 border border-white/20 dark:border-slate-800 overflow-hidden">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="p-8">
                            {step === 1 && (
                                <div className="space-y-8 text-center">
                                    <div className="space-y-1">
                                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Selecciona tu Plan 5G</h2>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Planes residenciales y corporativos con ultra-velocidad.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {PLANES_TELECOM.map((p) => {
                                            const isSelected = selectedPlan === p.id;
                                            return (
                                                <button
                                                    key={p.id} type="button" onClick={() => setSelectedPlan(p.id)}
                                                    className={cn(
                                                        "relative text-left p-6 rounded-[2rem] border-2 transition-all duration-300 group",
                                                        isSelected ? "border-blue-500 bg-blue-50/50 dark:bg-blue-500/5 ring-4 ring-blue-500/10 shadow-xl" : "bg-white dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800"
                                                    )}
                                                >
                                                    {popularPlan === p.id && <div className="absolute -top-3 right-6 px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-lg">Popular</div>}
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className={cn("p-2.5 rounded-xl transition-colors", isSelected ? "bg-blue-500 text-white" : "bg-blue-50 dark:bg-blue-900/20 text-blue-500")}>
                                                            <Zap className="h-5 w-5" />
                                                        </div>
                                                        <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all", isSelected ? "bg-blue-500 border-blue-500 shadow-md shadow-blue-500/20" : "border-slate-200 dark:border-slate-700")}>
                                                            {isSelected && <Check className="h-3.5 w-3.5 text-white stroke-[3px]" />}
                                                        </div>
                                                    </div>
                                                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">{p.nombre}</p>
                                                    <div className="flex items-baseline gap-1 mb-2">
                                                        <span className="text-3xl font-black text-slate-800 dark:text-slate-100">${p.precioUsd}</span>
                                                        <span className="text-sm font-bold text-slate-400">/mes</span>
                                                    </div>
                                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4 font-medium leading-relaxed">{p.descripcion}</p>
                                                    <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                                                        {p.features.map((f, i) => (
                                                            <div key={i} className="flex items-center gap-2">
                                                                <CheckCircle className={cn("h-3.5 w-3.5", isSelected ? "text-blue-500" : "text-slate-300 dark:text-slate-700")} />
                                                                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">{f}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <Button type="button" onClick={nextStep} className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98]">
                                        Continuar con el Plan <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6">
                                    <div className="text-center space-y-1 mb-4">
                                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Crear tu Cuenta 5G</h2>
                                        <p className="text-sm text-slate-500 font-medium">Ingresa los datos del titular de la línea.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5 px-1">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">¿Tipo de Cuenta?</Label>
                                                <Controller name="tipo_cliente" control={control} render={({ field }) => (
                                                    <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                                                        <button type="button" onClick={() => field.onChange('personal')} className={cn("flex-1 h-9 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all", field.value === 'personal' ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600")}>
                                                            <User className="h-3.5 w-3.5" /> Personal
                                                        </button>
                                                        <button type="button" onClick={() => field.onChange('empresarial')} className={cn("flex-1 h-9 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all", field.value === 'empresarial' ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600")}>
                                                            <Building className="h-3.5 w-3.5" /> Empresa
                                                        </button>
                                                    </div>
                                                )} />
                                            </div>
                                            <div className="space-y-1.5 px-1">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">{tipoCliente === 'personal' ? 'Cédula • ID' : 'RIF • Empresa'}</Label>
                                                <Controller name="cedula" control={control} render={({ field }) => (
                                                    <DocumentInput type={tipoCliente === 'personal' ? 'cedula' : 'rif'} value={field.value} onChange={field.onChange} error={!!errors.cedula} />
                                                )} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 px-1">
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Nombre</Label>
                                                <Input {...register('nombre')} className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-blue-500/20" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Apellido</Label>
                                                <Input {...register('apellido')} className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-blue-500/20" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 px-1">
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Teléfono Alternativo</Label>
                                                <Input {...register('telefono')} type="tel" placeholder="0412-1234567" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-blue-500/20" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Correo Electrónico</Label>
                                                <Input {...register('email')} type="email" placeholder="usuario@email.com" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-blue-500/20" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 px-1">
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Contraseña</Label>
                                                <div className="relative">
                                                    <Input type={showPassword ? 'text' : 'password'} {...register('password')} className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none pr-10 focus:ring-2 focus:ring-blue-500/20" />
                                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Confirmar</Label>
                                                <Input type="password" {...register('confirmPassword')} className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-blue-500/20" />
                                            </div>
                                        </div>

                                        <button type="button" onClick={() => setAcceptTerms(!acceptTerms)} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-100/50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-full text-left">
                                            <div className={cn("mt-1 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all", acceptTerms ? "bg-blue-600 border-blue-600 shadow-md" : "border-slate-300 dark:border-slate-600")}>
                                                {acceptTerms && <Check className="h-3.5 w-3.5 text-white stroke-[3px]" />}
                                            </div>
                                            <p className="text-[11px] text-slate-500 font-bold leading-relaxed">Acepto los términos y condiciones de servicio y la política de privacidad de System Kyron Telecom.</p>
                                        </button>
                                    </div>

                                    <div className="flex gap-4 pt-2">
                                        <Button type="button" variant="ghost" onClick={() => setStep(1)} className="h-14 rounded-2xl border border-slate-200 dark:border-slate-800 px-6 font-bold text-slate-400 hover:text-slate-800">
                                            <ArrowLeft className="h-5 w-5" />
                                        </Button>
                                        <Button type="button" onClick={nextStep} className="flex-1 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98]">
                                            Crear Cuenta <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-8 py-4">
                                    <div className="text-center space-y-2">
                                        <div className="inline-flex p-4 rounded-[1.5rem] bg-blue-500/10 mb-2">
                                            <Mail className="h-8 w-8 text-blue-500" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Verifica tu Correo</h2>
                                        <p className="text-sm text-slate-500 font-medium">Enviamos un código de seguridad a <span className="text-blue-600 font-bold">{getValues('email')}</span></p>
                                    </div>

                                    {!verifSent ? (
                                        <Button type="button" onClick={sendVerificationCode} disabled={verifLoading} className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 font-bold text-base">
                                            {verifLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Enviar Código 5G'}
                                        </Button>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="flex justify-center gap-3">
                                                <Input maxLength={6} value={verifCode} onChange={e => setVerifCode(e.target.value.replace(/\D/g, '').slice(0, 6))} className="h-16 text-center text-3xl font-black font-mono tracking-[0.5em] rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-4 focus:ring-blue-500/10" placeholder="000000" />
                                            </div>
                                            <div className="text-center">
                                                {countdown > 0 ? (
                                                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Reenviar en <span className="text-blue-500">{countdown}s</span></p>
                                                ) : (
                                                    <button type="button" onClick={sendVerificationCode} className="text-[11px] font-bold uppercase tracking-widest text-blue-500 hover:underline">Solicitar nuevo código</button>
                                                )}
                                            </div>
                                            <Button type="submit" disabled={verifCode.length < 6 || verifLoading} className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20 font-bold text-base">
                                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Verificar y Activar'}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {step === 4 && (
                                <div className="text-center py-10 space-y-6">
                                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-blue-500 to-blue-700 shadow-2xl shadow-blue-500/40 mb-2">
                                        <Check className="h-12 w-12 text-white stroke-[4px]" />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-black italic tracking-tight text-slate-800 dark:text-slate-100">¡Línea Activada!</h2>
                                        <p className="text-sm text-slate-500 font-medium px-8">Tu acceso a <span className="text-blue-600 font-bold">Mi Línea 5G</span> ha sido procesado exitosamente. Ahora puedes gestionar tu servicio desde el panel.</p>
                                    </div>
                                    <div className="py-6 px-4 bg-blue-50 dark:bg-blue-500/5 rounded-3xl border border-blue-100 dark:border-blue-500/10 space-y-3">
                                        <div className="flex items-center justify-between text-xs px-2">
                                            <span className="font-bold text-slate-400 uppercase tracking-widest">Plan Contratado</span>
                                            <span className="font-black text-blue-600 uppercase tracking-wide">{PLANES_TELECOM.find(p => p.id === getValues('plan'))?.nombre}</span>
                                        </div>
                                        <div className="h-px bg-blue-200/50 dark:bg-blue-500/10" />
                                        <div className="flex items-center justify-between text-xs px-2">
                                            <span className="font-bold text-slate-400 uppercase tracking-widest">Estado</span>
                                            <span className="px-2 py-0.5 bg-green-500 text-white rounded text-[9px] font-black uppercase tracking-widest">Activo</span>
                                        </div>
                                    </div>
                                    <Button className="w-full h-14 rounded-2xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-black uppercase tracking-widest shadow-xl transition-all" onClick={() => window.location.href = '/dashboard'}>
                                        Ir al Panel de Control <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                <div className="mt-12 flex items-center justify-center gap-10 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                    <div className="flex items-center gap-2">
                        <Signal className="h-4 w-4" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Ultra 5G Network</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">AES-256 Encrypted</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
