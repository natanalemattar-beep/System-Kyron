'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from '@/navigation';
import {
    Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
    Loader2, CircleCheck as CheckCircle, ArrowRight, ArrowLeft, Eye, EyeOff,
    Building, BookOpen, ShieldCheck, Check, Star, Crown, Zap, Sparkles,
    Mail, RefreshCw, Fingerprint,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { DocumentInput } from '@/components/document-input';
import { ESTADOS_VE, getMunicipios } from '@/lib/venezuela-geo';

const PLANES = [
    {
        id: 'basico',
        nombre: 'Básico',
        precio: 12,
        icon: BookOpen,
        color: 'blue',
        descripcion: 'Contabilidad simple para emprendedores',
        features: ['Libro diario y mayor', 'Balance general', 'Estado de resultados', 'Hasta 200 asientos/mes'],
    },
    {
        id: 'profesional',
        nombre: 'Profesional',
        precio: 28,
        icon: Zap,
        color: 'emerald',
        descripcion: 'Facturación electrónica y cumplimiento fiscal',
        features: ['Todo del Básico', 'Facturación SENIAT', 'Declaración IVA', 'Conciliación bancaria'],
    },
    {
        id: 'empresarial',
        nombre: 'Empresarial',
        precio: 52,
        icon: Building,
        color: 'violet',
        descripcion: 'Multi-usuario con retenciones y nómina',
        features: ['Todo del Profesional', 'Retenciones IVA/ISLR', 'Multi-usuario (5)', 'Nómina básica'],
    },
    {
        id: 'premium',
        nombre: 'Premium',
        precio: 95,
        icon: Crown,
        color: 'amber',
        descripcion: 'Solución completa con IA y asesoría',
        features: ['Todo del Empresarial', 'IA Kyron', 'Usuarios ilimitados', 'Soporte 24/7'],
    },
];

const TIPOS_EMPRESA = [
    'Compañía Anónima (C.A.)', 'Sociedad Anónima (S.A.)',
    'S.R.L.', 'C.R.L.', 'Cooperativa',
    'Persona Natural con Actividad Económica', 'Otro',
];

const MODULES_CONTABILIDAD = [
    { id: 'contabilidad', label: 'Contabilidad' },
    { id: 'facturacion', label: 'Facturación' },
    { id: 'tramites-fiscales', label: 'Trámites Fiscales' },
    { id: 'analisis-caja', label: 'Análisis de Caja' },
    { id: 'inventario', label: 'Inventario' },
];

const schema = z.object({
    razonSocial: z.string().min(3, 'Ingrese la razón social'),
    rif: z.string().regex(/^[JGCVEPF]-\d{8}-\d$/, 'Formato: J-50328471-6'),
    tipo_empresa: z.string().min(1, 'Seleccione el tipo'),
    repNombre: z.string().min(2, 'Ingrese el nombre'),
    repEmail: z.string().email('Correo inválido'),
    password: z.string()
        .min(8, 'Mínimo 8 caracteres')
        .regex(/[A-Z]/, 'Debe contener una mayúscula')
        .regex(/[a-z]/, 'Debe contener una minúscula')
        .regex(/[0-9]/, 'Debe contener un número')
        .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/, 'Debe contener un carácter especial'),
    confirmPassword: z.string(),
    estado_empresa: z.string().min(1, 'Seleccione el estado'),
    municipio_empresa: z.string().min(2, 'Seleccione el municipio'),
    telefono: z.string().min(7, 'Teléfono inválido'),
    regimen_iva: z.string().optional(),
}).refine(d => d.password === d.confirmPassword, {
    message: 'Las contraseñas no coinciden', path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

const colorMap: Record<string, { bg: string; border: string; text: string; accent: string; ring: string }> = {
    blue: { bg: 'bg-blue-500/5', border: 'border-blue-500/20', text: 'text-blue-600', accent: 'bg-blue-500', ring: 'ring-blue-500' },
    emerald: { bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', text: 'text-emerald-600', accent: 'bg-emerald-500', ring: 'ring-emerald-500' },
    violet: { bg: 'bg-violet-500/5', border: 'border-violet-500/20', text: 'text-violet-600', accent: 'bg-violet-500', ring: 'ring-violet-500' },
    amber: { bg: 'bg-amber-500/5', border: 'border-amber-500/20', text: 'text-amber-600', accent: 'bg-amber-500', ring: 'ring-amber-500' },
};

const TOTAL_STEPS = 4;

export default function RegisterContabilidadPage() {
    const [step, setStep] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const [acceptTerms, setAcceptTerms] = useState(false);
    const [verifSent, setVerifSent] = useState(false);
    const [verifCode, setVerifCode] = useState('');
    const [verifVerified, setVerifVerified] = useState(false);
    const [verifLoading, setVerifLoading] = useState(false);
    const [verifDestino, setVerifDestino] = useState('');
    const [countdown, setCountdown] = useState(0);

    const { register, handleSubmit, control, watch, setValue, trigger, getValues, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: { regimen_iva: 'General' },
    });

    const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100;
    const estadoEmpresa = watch('estado_empresa');
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
        const email = getValues('repEmail');
        setVerifDestino(email);
        try {
            const res = await fetch('/api/auth/send-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destino: email, tipo: 'email' }),
            });
            const json = await res.json();
            if (!res.ok) {
                toast({ title: 'Error al enviar código', description: json.error, variant: 'destructive' });
                return;
            }
            setVerifSent(true);
            startCountdown();
            toast({ title: 'Código enviado', description: `Revisa tu correo ${email}` });
        } catch {
            toast({ title: 'Error', description: 'No se pudo enviar el código.', variant: 'destructive' });
        } finally {
            setVerifLoading(false);
        }
    };

    const verifyCode = async () => {
        if (verifCode.length !== 6) {
            toast({ title: 'Código inválido', description: 'El código debe tener 6 dígitos.', variant: 'destructive' });
            return;
        }
        setVerifLoading(true);
        try {
            const res = await fetch('/api/auth/verify-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destino: verifDestino, codigo: verifCode }),
            });
            const json = await res.json();
            if (!res.ok) {
                toast({ title: 'Código incorrecto', description: json.error, variant: 'destructive' });
                return;
            }
            setVerifVerified(true);
            toast({ title: '¡Verificado!', description: 'Correo electrónico confirmado.' });
        } catch {
            toast({ title: 'Error', description: 'No se pudo verificar el código.', variant: 'destructive' });
        } finally {
            setVerifLoading(false);
        }
    };

    const nextStep = async () => {
        if (step === 1) {
            if (!selectedPlan) {
                toast({ title: 'Selecciona un plan', description: 'Debes elegir un plan para continuar', variant: 'destructive' });
                return;
            }
            setStep(2);
            return;
        }
        if (step === 2) {
            const fields: (keyof FormData)[] = [
                'razonSocial', 'rif', 'tipo_empresa', 'repNombre', 'repEmail',
                'password', 'confirmPassword', 'estado_empresa', 'municipio_empresa', 'telefono',
            ];
            const valid = await trigger(fields);
            if (!valid) return;
            if (!acceptTerms) {
                toast({ title: 'Términos requeridos', description: 'Debes aceptar los términos para continuar.', variant: 'destructive' });
                return;
            }
            setStep(3);
            return;
        }
    };

    const prevStep = () => {
        if (step === 3) {
            setVerifSent(false);
            setVerifCode('');
            setVerifVerified(false);
        }
        setStep(s => s - 1);
    };

    const planData = PLANES.find(p => p.id === selectedPlan);

    const onSubmit = async (data: FormData) => {
        if (!verifVerified) {
            toast({ title: 'Verificación requerida', description: 'Debes verificar tu correo electrónico.', variant: 'destructive' });
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tipo: 'juridico',
                    razonSocial: data.razonSocial,
                    rif: data.rif,
                    tipo_empresa: data.tipo_empresa,
                    telefono: data.telefono,
                    estado_empresa: data.estado_empresa,
                    municipio_empresa: data.municipio_empresa,
                    repNombre: data.repNombre,
                    repEmail: data.repEmail,
                    password: data.password,
                    regimen_iva: data.regimen_iva || 'General',
                    modules: MODULES_CONTABILIDAD,
                    plan: selectedPlan,
                    plan_monto: planData?.precio ?? 0,
                }),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error);
            setStep(TOTAL_STEPS);
        } catch (e: any) {
            toast({ title: 'Error de registro', description: e.message, variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    const stepTitles = [
        { title: 'Plan', icon: Star },
        { title: 'Datos', icon: Building },
        { title: 'Verificación', icon: Fingerprint },
        { title: '¡Listo!', icon: CheckCircle },
    ];

    const currentStep = stepTitles[step - 1];
    const StepIcon = currentStep.icon;

    const passwordChecks = [
        { label: '8+', ok: (watchedPassword || '').length >= 8 },
        { label: 'A-Z', ok: /[A-Z]/.test(watchedPassword || '') },
        { label: '0-9', ok: /[0-9]/.test(watchedPassword || '') },
        { label: '!@#', ok: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(watchedPassword || '') },
    ];

    return (
        <div className={cn(
            "container mx-auto px-4 py-8 min-h-screen flex items-start justify-center pt-12",
            step === 1 ? "max-w-3xl" : "max-w-xl"
        )}>
            <Card className="w-full border-none shadow-2xl bg-card/60 backdrop-blur-xl rounded-[2rem] overflow-hidden">
                <CardHeader className="p-6 pb-4 border-b border-border/50 bg-muted/5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
                            <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-primary">Asesoría Contable</CardTitle>
                            <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">Registro rápido</CardDescription>
                        </div>
                    </div>
                    {step < TOTAL_STEPS && (
                        <>
                            <Progress value={progress} className="h-1 mb-3" />
                            <div className="flex items-center gap-2">
                                <StepIcon className="h-3.5 w-3.5 text-primary" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{currentStep.title} · Paso {step} de {TOTAL_STEPS - 1}</p>
                            </div>
                        </>
                    )}
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="p-6 space-y-5">

                        {step === 1 && (
                            <div className="space-y-4">
                                <p className="text-xs text-muted-foreground text-center">Selecciona el plan que mejor se adapte. Podrás cambiarlo después.</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {PLANES.map((plan) => {
                                        const c = colorMap[plan.color];
                                        const isSelected = selectedPlan === plan.id;
                                        const Icon = plan.icon;
                                        return (
                                            <button
                                                key={plan.id}
                                                type="button"
                                                onClick={() => setSelectedPlan(plan.id)}
                                                className={cn(
                                                    "relative text-left rounded-2xl border-2 p-4 transition-all duration-200",
                                                    "hover:shadow-lg hover:scale-[1.01]",
                                                    isSelected
                                                        ? `${c.bg} ${c.border} ring-2 ${c.ring} shadow-lg`
                                                        : "bg-card border-border/40 hover:border-border"
                                                )}
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className={cn("p-1.5 rounded-lg", c.bg)}>
                                                        <Icon className={cn("h-4 w-4", c.text)} />
                                                    </div>
                                                    <div className={cn(
                                                        "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ml-auto",
                                                        isSelected ? `${c.border} ${c.accent}` : "border-muted-foreground/30"
                                                    )}>
                                                        {isSelected && <Check className="h-2.5 w-2.5 text-white" />}
                                                    </div>
                                                </div>
                                                <p className={cn("text-xs font-black uppercase tracking-wide", c.text)}>{plan.nombre}</p>
                                                <p className="text-lg font-black text-foreground">${plan.precio}<span className="text-[10px] font-bold text-muted-foreground">/mes</span></p>
                                                <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{plan.descripcion}</p>
                                                <div className="mt-2 space-y-1">
                                                    {plan.features.map((f, i) => (
                                                        <div key={i} className="flex items-start gap-1.5">
                                                            <Check className={cn("h-3 w-3 shrink-0 mt-0.5", isSelected ? c.text : "text-muted-foreground/40")} />
                                                            <span className="text-[10px] text-muted-foreground leading-tight">{f}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                {planData && (
                                    <div className={cn("p-2.5 rounded-xl border flex items-center gap-2", colorMap[planData.color].bg, colorMap[planData.color].border)}>
                                        <planData.icon className={cn("h-3.5 w-3.5", colorMap[planData.color].text)} />
                                        <p className={cn("text-[10px] font-black uppercase tracking-widest flex-1", colorMap[planData.color].text)}>Plan {planData.nombre} — ${planData.precio}/mes</p>
                                        <button type="button" onClick={() => setStep(1)} className="text-[9px] text-muted-foreground hover:text-foreground underline">Cambiar</button>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="col-span-2 space-y-1.5">
                                        <Label htmlFor="razonSocial" className="text-[10px] font-black uppercase tracking-widest">Razón Social *</Label>
                                        <Input id="razonSocial" placeholder="Empresa, C.A." {...register('razonSocial')} className={cn("h-9", errors.razonSocial && 'border-destructive')} />
                                        {errors.razonSocial && <p className="text-[10px] text-destructive">{errors.razonSocial.message}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">RIF *</Label>
                                        <Controller name="rif" control={control} render={({ field }) => (
                                            <DocumentInput type="rif" value={field.value || ''} onChange={field.onChange} error={!!errors.rif} />
                                        )} />
                                        {errors.rif && <p className="text-[10px] text-destructive">{errors.rif.message}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Tipo *</Label>
                                        <Controller name="tipo_empresa" control={control} render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className={cn("h-9", errors.tipo_empresa && 'border-destructive')}><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                                                <SelectContent>{TIPOS_EMPRESA.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                            </Select>
                                        )} />
                                        {errors.tipo_empresa && <p className="text-[10px] text-destructive">{errors.tipo_empresa.message}</p>}
                                    </div>
                                </div>

                                <div className="h-px bg-border/30" />

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="repNombre" className="text-[10px] font-black uppercase tracking-widest">Tu Nombre *</Label>
                                        <Input id="repNombre" placeholder="Juan Pérez" {...register('repNombre')} className={cn("h-9", errors.repNombre && 'border-destructive')} />
                                        {errors.repNombre && <p className="text-[10px] text-destructive">{errors.repNombre.message}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="telefono" className="text-[10px] font-black uppercase tracking-widest">Teléfono *</Label>
                                        <Input id="telefono" type="tel" placeholder="0412-1234567" {...register('telefono')} className={cn("h-9", errors.telefono && 'border-destructive')} />
                                        {errors.telefono && <p className="text-[10px] text-destructive">{errors.telefono.message}</p>}
                                    </div>
                                    <div className="col-span-2 space-y-1.5">
                                        <Label htmlFor="repEmail" className="text-[10px] font-black uppercase tracking-widest">Correo Electrónico *</Label>
                                        <Input id="repEmail" type="email" placeholder="tu@empresa.com" {...register('repEmail')} className={cn("h-9", errors.repEmail && 'border-destructive')} />
                                        {errors.repEmail && <p className="text-[10px] text-destructive">{errors.repEmail.message}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest">Contraseña *</Label>
                                        <div className="relative">
                                            <Input id="password" type={showPassword ? 'text' : 'password'} {...register('password')} className={cn('pr-9 h-9', errors.password && 'border-destructive')} />
                                            <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" tabIndex={-1}>
                                                {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                            </button>
                                        </div>
                                        <div className="flex gap-2 mt-1">
                                            {passwordChecks.map((c, i) => (
                                                <span key={i} className={cn("text-[9px] font-bold", c.ok ? "text-emerald-500" : "text-muted-foreground/40")}>
                                                    {c.ok ? '✓' : '○'} {c.label}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="confirmPassword" className="text-[10px] font-black uppercase tracking-widest">Confirmar *</Label>
                                        <Input id="confirmPassword" type={showPassword ? 'text' : 'password'} {...register('confirmPassword')} className={cn("h-9", errors.confirmPassword && 'border-destructive')} />
                                        {errors.confirmPassword && <p className="text-[10px] text-destructive">{errors.confirmPassword.message}</p>}
                                    </div>
                                </div>

                                <div className="h-px bg-border/30" />

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Estado *</Label>
                                        <Controller name="estado_empresa" control={control} render={({ field }) => (
                                            <Select onValueChange={(v) => { field.onChange(v); setValue('municipio_empresa', ''); }} value={field.value}>
                                                <SelectTrigger className={cn("h-9", errors.estado_empresa && 'border-destructive')}><SelectValue placeholder="Estado..." /></SelectTrigger>
                                                <SelectContent>{ESTADOS_VE.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
                                            </Select>
                                        )} />
                                        {errors.estado_empresa && <p className="text-[10px] text-destructive">{errors.estado_empresa.message}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Municipio *</Label>
                                        <Controller name="municipio_empresa" control={control} render={({ field }) => (
                                            <Select value={field.value} onValueChange={field.onChange} disabled={!estadoEmpresa}>
                                                <SelectTrigger className={cn("h-9", errors.municipio_empresa && 'border-destructive')}>
                                                    <SelectValue placeholder={estadoEmpresa ? 'Municipio...' : 'Primero el estado'} />
                                                </SelectTrigger>
                                                <SelectContent>{getMunicipios(estadoEmpresa || '').map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                                            </Select>
                                        )} />
                                        {errors.municipio_empresa && <p className="text-[10px] text-destructive">{errors.municipio_empresa.message}</p>}
                                    </div>
                                </div>

                                <label className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/50 cursor-pointer select-none group hover:bg-muted/50 transition-colors">
                                    <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-border accent-primary shrink-0" />
                                    <span className="text-[11px] text-muted-foreground">
                                        Acepto los{' '}
                                        <a href="/terms" target="_blank" className="text-primary font-semibold hover:underline" onClick={(e) => e.stopPropagation()}>Términos</a>{' '}
                                        y la{' '}
                                        <a href="/politica-privacidad" target="_blank" className="text-primary font-semibold hover:underline" onClick={(e) => e.stopPropagation()}>Política de Privacidad</a>.
                                    </span>
                                </label>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-5">
                                <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 text-center">
                                    <div className="flex items-center justify-center gap-2 mb-1">
                                        <Fingerprint className="h-4 w-4 text-primary" />
                                        <p className="text-xs font-black text-primary uppercase tracking-widest">Verificación</p>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground">Enviaremos un código de 6 dígitos a tu correo.</p>
                                </div>

                                {verifVerified ? (
                                    <div className="text-center py-4 space-y-3">
                                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                                            <CheckCircle className="h-8 w-8 text-emerald-500" />
                                        </div>
                                        <p className="text-sm font-black text-emerald-500 uppercase tracking-widest">¡Verificado!</p>
                                        <p className="text-xs text-muted-foreground">{verifDestino}</p>
                                    </div>
                                ) : (
                                    <div className="p-4 rounded-xl border border-border/50 bg-muted/5 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-sky-500/10 rounded-lg">
                                                <Mail className="h-4 w-4 text-sky-400" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-foreground">Correo</p>
                                                <p className="text-xs text-muted-foreground">{getValues('repEmail')}</p>
                                            </div>
                                        </div>

                                        {!verifSent ? (
                                            <Button type="button" className="w-full" onClick={sendVerificationCode} disabled={verifLoading}>
                                                {verifLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Enviando...</> : <><Mail className="mr-2 h-4 w-4" />Enviar Código</>}
                                            </Button>
                                        ) : (
                                            <div className="space-y-3">
                                                <p className="text-[10px] text-emerald-500 font-bold text-center uppercase tracking-widest">Código enviado</p>
                                                <Input
                                                    placeholder="000000"
                                                    maxLength={6}
                                                    value={verifCode}
                                                    onChange={e => setVerifCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                    className="text-center text-2xl font-black tracking-[0.5em] h-14"
                                                />
                                                <Button type="button" className="w-full" onClick={verifyCode} disabled={verifLoading || verifCode.length !== 6}>
                                                    {verifLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Verificando...</> : <><ShieldCheck className="mr-2 h-4 w-4" />Verificar</>}
                                                </Button>
                                                <div className="text-center">
                                                    {countdown > 0 ? (
                                                        <p className="text-[10px] text-muted-foreground">Reenviar en {countdown}s</p>
                                                    ) : (
                                                        <button type="button" onClick={sendVerificationCode} disabled={verifLoading} className="text-xs text-primary underline inline-flex items-center gap-1">
                                                            <RefreshCw className="h-3 w-3" /> Reenviar
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {step === TOTAL_STEPS && (
                            <div className="text-center py-6 space-y-4">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-2">
                                    <CheckCircle className="h-10 w-10 text-green-500" />
                                </div>
                                <h2 className="text-xl font-black uppercase italic tracking-tight">¡Cuenta Creada!</h2>
                                <p className="text-muted-foreground text-sm">Registrado en <strong className="text-primary">Asesoría Contable</strong>.</p>

                                {planData && (
                                    <div className={cn("p-3 rounded-xl border", colorMap[planData.color].bg, colorMap[planData.color].border)}>
                                        <div className="flex items-center justify-center gap-2">
                                            <planData.icon className={cn("h-4 w-4", colorMap[planData.color].text)} />
                                            <p className={cn("text-xs font-black uppercase tracking-widest", colorMap[planData.color].text)}>Plan {planData.nombre} — ${planData.precio}/mes</p>
                                        </div>
                                    </div>
                                )}

                                <Button className="w-full mt-4" onClick={() => { router.push('/resumen-negocio' as any); }}>
                                    Ir al Portal <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </CardContent>

                    {step < TOTAL_STEPS && (
                        <CardFooter className="flex justify-between p-6 pt-0">
                            <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1} size="sm">
                                <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />Anterior
                            </Button>
                            {step === 1 && (
                                <Button type="button" onClick={nextStep} disabled={!selectedPlan} size="sm">
                                    Siguiente<ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                                </Button>
                            )}
                            {step === 2 && (
                                <Button type="button" onClick={nextStep} size="sm">
                                    Verificar<ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                                </Button>
                            )}
                            {step === 3 && (
                                <Button type="submit" disabled={isLoading || !verifVerified} size="sm">
                                    {isLoading ? <><Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />Registrando...</> : <>Finalizar<ArrowRight className="ml-1.5 h-3.5 w-3.5" /></>}
                                </Button>
                            )}
                        </CardFooter>
                    )}
                    {step < TOTAL_STEPS && (
                        <p className="text-center text-xs text-muted-foreground pb-5">
                            ¿Ya tienes cuenta? <Link href="/login-empresa" className="text-primary font-semibold hover:underline">Iniciar sesión</Link>
                        </p>
                    )}
                </form>
            </Card>
        </div>
    );
}
