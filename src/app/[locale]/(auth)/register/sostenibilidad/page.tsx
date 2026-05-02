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
    Loader2, CircleCheck as CircleCheck, ArrowRight, ArrowLeft, Eye, EyeOff,
    Leaf, Check, ShieldCheck, Mail, RefreshCw, Smartphone, Building, User, Lock, Phone,
    Recycle, CloudSun, Globe, TreePine,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useVerificationPoll } from '@/hooks/use-verification-poll';
import { useAuth } from '@/lib/auth/context';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { DocumentInput } from '@/components/document-input';

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
}).refine(d => d.password === d.confirmPassword, {
    message: 'Las contraseñas no coinciden', path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

const TOTAL_STEPS = 4;

const stepConfig = [
    { title: 'Empresa', desc: 'Identidad Verde', icon: Leaf },
    { title: 'Representante', desc: 'Gestion de Impacto', icon: User },
    { title: 'Verificar', desc: 'Confirmación', icon: Mail },
    { title: 'Listo', desc: 'Activado', icon: CircleCheck },
];

export default function RegisterSostenibilidadPage() {
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
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
            const valid = await trigger(['razonSocial', 'rif']);
            if (valid) setStep(2);
            return;
        }
        if (step === 2) {
            const valid = await trigger(['nombre', 'apellido', 'email', 'telefono', 'password', 'confirmPassword']);
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
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tipo: 'juridico',
                    ...data,
                    modules: [
                        { id: 'sostenibilidad', label: 'Sostenibilidad' },
                        { id: 'eco-creditos', label: 'Eco-Créditos' },
                        { id: 'ameru-ia', label: 'Ameru IA' }
                    ],
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
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50/30 to-slate-50 dark:from-slate-950 dark:via-emerald-900/10 dark:to-slate-950">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, #10b98120 0%, transparent 70%)' }} />
            <div className="absolute bottom-[-200px] right-[-100px] w-[700px] h-[700px] rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, #05966920 0%, transparent 70%)' }} />

            <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center min-h-screen max-w-xl">
                {/* Header Branding */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30 text-white">
                        <Leaf className="h-7 w-7" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold uppercase tracking-[0.1em] text-slate-800 dark:text-slate-100 italic">Sostenibilidad</h1>
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">System Kyron • Green Impact</p>
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
                                            isDone ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20" :
                                            isActive ? "bg-white dark:bg-slate-800 border-emerald-500 text-emerald-500 shadow-xl shadow-emerald-500/10" :
                                            "bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-300"
                                        )}>
                                            {isDone ? <Check className="h-6 w-6" /> : <Icon className="h-5 w-5" />}
                                        </div>
                                        <p className={cn("text-[10px] font-bold uppercase tracking-widest mt-2 px-1 text-center leading-tight", isActive ? "text-emerald-600" : isDone ? "text-slate-600" : "text-slate-400")}>{s.title}</p>
                                    </div>
                                    {i < 2 && <div className={cn("flex-1 h-0.5 mx-2 -mt-6 rounded-full transition-colors duration-500", step > stepNum ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-800")} />}
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-emerald-500/5 border border-white/20 dark:border-slate-800 overflow-hidden">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="p-8">
                            {step === 1 && (
                                <div className="space-y-6">
                                    <div className="text-center space-y-1 mb-4">
                                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 italic">Compromiso Ambiental</h2>
                                        <p className="text-sm text-slate-500 font-medium">Registra tu empresa para comenzar a certificar tu impacto.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-1.5 px-1">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Razón Social</Label>
                                            <div className="relative">
                                                <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                                                <Input {...register('razonSocial')} placeholder="Nombre de la empresa" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none pl-11 focus:ring-2 focus:ring-emerald-500/20" />
                                            </div>
                                            {errors.razonSocial && <p className="text-xs text-red-500 ml-1">{errors.razonSocial.message}</p>}
                                        </div>

                                        <div className="space-y-1.5 px-1">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">RIF</Label>
                                            <Controller name="rif" control={control} render={({ field }) => (
                                                <DocumentInput type="rif" value={field.value} onChange={field.onChange} error={!!errors.rif} />
                                            )} />
                                        </div>

                                        <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <TreePine className="h-4 w-4 text-emerald-600" />
                                                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Módulos Activos</p>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {['Eco-Créditos', 'Trazabilidad', 'ESG IA'].map(m => (
                                                    <span key={m} className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-[9px] font-black uppercase tracking-widest border border-emerald-500/10">{m}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <Button type="button" onClick={nextStep} className="w-full h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base shadow-xl shadow-emerald-500/20 transition-all active:scale-[0.98] mt-4">
                                            Continuar <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6">
                                    <div className="text-center space-y-1 mb-4">
                                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 italic">Acceso de Gestión</h2>
                                        <p className="text-sm text-slate-500 font-medium">Datos del responsable ambiental.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4 px-1">
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Nombre</Label>
                                                <Input {...register('nombre')} className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-emerald-500/20" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Apellido</Label>
                                                <Input {...register('apellido')} className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-emerald-500/20" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 px-1">
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Corporativo</Label>
                                                <Input {...register('email')} type="email" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-emerald-500/20" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Teléfono</Label>
                                                <Input {...register('telefono')} type="tel" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-emerald-500/20" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 px-1">
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Contraseña</Label>
                                                <div className="relative">
                                                    <Input type={showPassword ? 'text' : 'password'} {...register('password')} className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none pr-10 focus:ring-2 focus:ring-emerald-500/20" />
                                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Confirmar</Label>
                                                <Input type="password" {...register('confirmPassword')} className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-emerald-500/20" />
                                            </div>
                                        </div>

                                        <button type="button" onClick={() => setAcceptTerms(!acceptTerms)} className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors w-full text-left mt-2">
                                            <div className={cn("mt-1 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all", acceptTerms ? "bg-emerald-600 border-emerald-600 shadow-md" : "border-slate-300 dark:border-slate-600")}>
                                                {acceptTerms && <Check className="h-3.5 w-3.5 text-white stroke-[3px]" />}
                                            </div>
                                            <p className="text-[11px] text-slate-500 font-bold leading-relaxed">Acepto los lineamientos de trazabilidad ambiental y términos de servicio de la red Kyron.</p>
                                        </button>
                                    </div>

                                    <div className="flex gap-4 pt-2">
                                        <Button type="button" variant="ghost" onClick={() => setStep(1)} className="h-14 rounded-2xl border border-slate-200 dark:border-slate-800 px-6 font-bold text-slate-400 hover:text-slate-800">
                                            <ArrowLeft className="h-5 w-5" />
                                        </Button>
                                        <Button type="button" onClick={nextStep} className="flex-1 h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-xl shadow-emerald-500/20 transition-all active:scale-[0.98]">
                                            Crear Cuenta <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-8 py-4">
                                    <div className="text-center space-y-2">
                                        <div className="inline-flex p-4 rounded-[1.5rem] bg-emerald-500/10 mb-2">
                                            <ShieldCheck className="h-8 w-8 text-emerald-600" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Cifrado de Acceso</h2>
                                        <p className="text-sm text-slate-500 font-medium">Validación de seguridad ambiental enviada a <span className="text-emerald-600 font-bold">{getValues('email')}</span></p>
                                    </div>

                                    {!verifSent ? (
                                        <Button type="button" onClick={sendVerificationCode} disabled={verifLoading} className="w-full h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 font-bold text-base">
                                            {verifLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Sincronizar con la Red'}
                                        </Button>
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="flex justify-center gap-3">
                                                <Input maxLength={6} value={verifCode} onChange={e => setVerifCode(e.target.value.replace(/\D/g, '').slice(0, 6))} className="h-16 text-center text-3xl font-black font-mono tracking-[0.5em] rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-4 focus:ring-emerald-500/10" placeholder="000000" />
                                            </div>
                                            <div className="text-center">
                                                {countdown > 0 ? (
                                                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Reintento en <span className="text-emerald-500">{countdown}s</span></p>
                                                ) : (
                                                    <button type="button" onClick={sendVerificationCode} className="text-[11px] font-bold uppercase tracking-widest text-emerald-500 hover:underline">Reenviar llave</button>
                                                )}
                                            </div>
                                            <Button type="submit" disabled={verifCode.length < 6 || verifLoading} className="w-full h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-600 shadow-xl shadow-emerald-500/20 font-bold text-base">
                                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Confirmar e Ingresar'}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {step === 4 && (
                                <div className="text-center py-10 space-y-6">
                                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-emerald-500 to-green-600 shadow-2xl shadow-emerald-500/40 mb-2">
                                        <Globe className="h-12 w-12 text-white stroke-[3px]" />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-black italic tracking-tight text-slate-800 dark:text-slate-100">Eco-Portal Listo</h2>
                                        <p className="text-sm text-slate-500 font-medium px-8">Bienvenido al ecosistema de regeneración de System Kyron. Tu empresa ya está en línea.</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-3 pt-4">
                                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-left">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Impacto</p>
                                            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Zero Target</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-left">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Status</p>
                                            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Verificado</p>
                                        </div>
                                    </div>

                                    <Button className="w-full h-14 rounded-2xl bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white font-black uppercase tracking-widest shadow-xl transition-all" onClick={() => window.location.href = '/dashboard-empresa'}>
                                        Gestionar Sostenibilidad <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                <div className="mt-12 flex items-center justify-center gap-10 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                    <div className="flex items-center gap-2">
                        <CloudSun className="h-4 w-4" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Carbon Audit IA</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Recycle className="h-4 w-4" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Circular Economy</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
