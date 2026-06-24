'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from '@/navigation';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { VerificationCodeInput } from '@/components/auth/verification-code-input';
import {
    Loader2, CircleCheck as CircleCheck, ArrowRight, ArrowLeft, Eye, EyeOff,
    Leaf, Check, ShieldCheck, Mail, User, Lock, Recycle, Globe,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { useAuth } from '@/lib/auth/context';
import { cn } from '@/lib/utils';
import { getModuleConfig } from '@/lib/register-modules';
import { RegistrationSuccess } from '@/components/registration-success';

const schema = z.object({
    nombre: z.string().min(2, 'Ingrese su nombre'),
    apellido: z.string().min(2, 'Ingrese su apellido'),
    cedula: z.string().min(6, 'Cédula inválida').max(10, 'Cédula inválida'),
    fecha_nacimiento: z.string().min(1, 'Fecha de nacimiento requerida'),
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
    { title: 'Datos', desc: 'Identidad Verde', icon: User },
    { title: 'Acceso', desc: 'Tu Portal', icon: Lock },
    { title: 'Verificar', desc: 'Confirmación', icon: Mail },
    { title: 'Listo', desc: 'Activado', icon: CircleCheck },
];

export default function RegisterSostenibilidadPage() {
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState('');
    const router = useRouter();
    const { refreshUser } = useAuth();
    const { toast } = useToast();
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [verifVerified, setVerifVerified] = useState(false);
    const onVerified = useCallback(() => {
        setVerifVerified(true);
        toast({ title: '¡Verificado!', description: 'Identidad confirmada exitosamente.' });
    }, [toast]);

    const { register, handleSubmit, trigger, getValues, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            nombre: searchParams.get('nombre') || '',
            apellido: searchParams.get('apellido') || '',
            cedula: searchParams.get('doc') || '',
        },
    });

    const nextStep = async () => {
        if (step === 1) {
            const valid = await trigger(['nombre', 'apellido', 'cedula', 'fecha_nacimiento']);
            if (valid) setStep(2);
            return;
        }
        if (step === 2) {
            const valid = await trigger(['email', 'telefono', 'password', 'confirmPassword']);
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
                    tipo: 'natural',
                    nombre: data.nombre,
                    apellido: data.apellido,
                    cedula: data.cedula,
                    fecha_nacimiento: data.fecha_nacimiento,
                    email: data.email,
                    telefono: data.telefono,
                    password: data.password,
                    modules: [
                        { id: 'sostenibilidad', label: 'Sostenibilidad' },
                        { id: 'eco-creditos', label: 'Eco-Créditos' },
                        { id: 'ameru-ia', label: 'Ameru IA' }
                    ],
                    plan: 'personal',
                }),
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || 'Error en el registro');
            }
            await refreshUser();
            setRegisteredEmail(data.email);
            setStep(TOTAL_STEPS);
        } catch (e: unknown) {
            toast({ title: 'Error', description: e instanceof Error ? e.message : 'Error en el registro', variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50/30 to-slate-50 dark:from-slate-950 dark:via-emerald-900/10 dark:to-slate-950">
            <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, #10b98120 0%, transparent 70%)' }} />
            <div className="absolute bottom-[-200px] right-[-100px] w-[700px] h-[700px] rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, #05966920 0%, transparent 70%)' }} />

            <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center min-h-screen max-w-xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30 text-white">
                        <Leaf className="h-7 w-7" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold uppercase tracking-[0.1em] text-slate-800 dark:text-slate-100 italic">Sostenibilidad</h1>
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">System Kyron • Sostenibilidad</p>
                    </div>
                </div>

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
                                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 italic">Tus Datos</h2>
                                        <p className="text-sm text-slate-500 font-medium">Tu identidad en el ecosistema verde.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4 px-1">
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Nombre</Label>
                                                <Input {...register('nombre')} placeholder="Tu nombre" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-emerald-500/20" />
                                                {errors.nombre && <p className="text-xs text-red-500 ml-1">{errors.nombre.message}</p>}
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Apellido</Label>
                                                <Input {...register('apellido')} placeholder="Tu apellido" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-emerald-500/20" />
                                                {errors.apellido && <p className="text-xs text-red-500 ml-1">{errors.apellido.message}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-1.5 px-1">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Cédula</Label>
                                            <Input {...register('cedula')} placeholder="V-12345678" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-emerald-500/20" />
                                            {errors.cedula && <p className="text-xs text-red-500 ml-1">{errors.cedula.message}</p>}
                                        </div>

                                        <div className="space-y-1.5 px-1">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Fecha de Nacimiento</Label>
                                            <Input type="date" {...register('fecha_nacimiento')} max={new Date().toISOString().split('T')[0]} className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-emerald-500/20" />
                                            {errors.fecha_nacimiento && <p className="text-xs text-red-500 ml-1">{errors.fecha_nacimiento.message}</p>}
                                        </div>

                                        <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Recycle className="h-4 w-4 text-emerald-600" />
                                                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Tu Huella Personal</p>
                                            </div>
                                            <p className="text-[11px] text-slate-500 font-medium">Mide y compensa tu impacto ambiental desde tu perfil personal.</p>
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
                                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 italic">Tu Portal</h2>
                                        <p className="text-sm text-slate-500 font-medium">Acceso a tu perfil sostenible.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4 px-1">
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email</Label>
                                                <Input {...register('email')} type="email" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-emerald-500/20" />
                                                {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email.message}</p>}
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Teléfono</Label>
                                                <Input {...register('telefono')} type="tel" className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-emerald-500/20" />
                                                {errors.telefono && <p className="text-xs text-red-500 ml-1">{errors.telefono.message}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 px-1">
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Contraseña</Label>
                                                <div className="relative">
                                                    <Input type={showPassword ? 'text' : 'password'} autoComplete="new-password" {...register('password')} className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none pr-10 focus:ring-2 focus:ring-emerald-500/20" />
                                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                                {errors.password && <p className="text-xs text-red-500 ml-1">{errors.password.message}</p>}
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Confirmar</Label>
                                                <Input type="password" autoComplete="new-password" {...register('confirmPassword')} className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-none focus:ring-2 focus:ring-emerald-500/20" />
                                                {errors.confirmPassword && <p className="text-xs text-red-500 ml-1">{errors.confirmPassword.message}</p>}
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
                                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Verifica tu Identidad</h2>
                                        <p className="text-sm text-slate-500 font-medium">Código enviado a <span className="text-emerald-600 font-bold">{getValues('email')}</span></p>
                                    </div>

                                    <VerificationCodeInput
                                        destino={getValues('email')}
                                        accentColor="emerald"
                                        onVerified={onVerified}
                                    />

                                    <Button type="submit" disabled={!verifVerified || isLoading} className="w-full h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-600 shadow-xl shadow-emerald-500/20 font-bold text-base">
                                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Confirmar e Ingresar'}
                                    </Button>
                                </div>
                            )}

                            {step === TOTAL_STEPS && registeredEmail && (
                                <div className="py-6">
                                    <RegistrationSuccess
                                        moduleConfig={getModuleConfig('sostenibilidad')}
                                        email={registeredEmail}
                                        buttonText="Ir a mi Perfil Sostenible"
                                    />
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                <div className="mt-12 flex items-center justify-center gap-10 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                    <div className="flex items-center gap-2">
                        <Recycle className="h-4 w-4" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Circular Economy</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Carbon Audit IA</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
