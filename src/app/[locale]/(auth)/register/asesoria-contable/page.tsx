'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from '@/navigation';
import {
    Card, CardContent, CardHeader, CardFooter,
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
    Mail, RefreshCw, Fingerprint, Calculator, FileText, Users, Headphones,
    TrendingUp, Shield, BarChart3,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
        popular: false,
        descripcion: 'Contabilidad simple para emprendedores',
        features: ['Libro diario y mayor', 'Balance general', 'Estado de resultados', 'Hasta 200 asientos/mes'],
    },
    {
        id: 'profesional',
        nombre: 'Profesional',
        precio: 28,
        icon: Zap,
        color: 'emerald',
        popular: true,
        descripcion: 'Facturación electrónica y cumplimiento fiscal',
        features: ['Todo del Básico', 'Facturación SENIAT', 'Declaración IVA', 'Conciliación bancaria'],
    },
    {
        id: 'empresarial',
        nombre: 'Empresarial',
        precio: 52,
        icon: Building,
        color: 'violet',
        popular: false,
        descripcion: 'Multi-usuario con retenciones y nómina',
        features: ['Todo del Profesional', 'Retenciones IVA/ISLR', 'Multi-usuario (5)', 'Nómina básica'],
    },
    {
        id: 'premium',
        nombre: 'Premium',
        precio: 95,
        icon: Crown,
        color: 'amber',
        popular: false,
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

const colorMap: Record<string, { bg: string; bgHover: string; border: string; borderActive: string; text: string; accent: string; ring: string; gradient: string; shadow: string }> = {
    blue: { bg: 'bg-blue-500/5', bgHover: 'hover:bg-blue-500/10', border: 'border-blue-500/15', borderActive: 'border-blue-500/40', text: 'text-blue-500', accent: 'bg-blue-500', ring: 'ring-blue-500/30', gradient: 'from-blue-500 to-blue-600', shadow: 'shadow-blue-500/20' },
    emerald: { bg: 'bg-emerald-500/5', bgHover: 'hover:bg-emerald-500/10', border: 'border-emerald-500/15', borderActive: 'border-emerald-500/40', text: 'text-emerald-500', accent: 'bg-emerald-500', ring: 'ring-emerald-500/30', gradient: 'from-emerald-500 to-emerald-600', shadow: 'shadow-emerald-500/20' },
    violet: { bg: 'bg-violet-500/5', bgHover: 'hover:bg-violet-500/10', border: 'border-violet-500/15', borderActive: 'border-violet-500/40', text: 'text-violet-500', accent: 'bg-violet-500', ring: 'ring-violet-500/30', gradient: 'from-violet-500 to-violet-600', shadow: 'shadow-violet-500/20' },
    amber: { bg: 'bg-amber-500/5', bgHover: 'hover:bg-amber-500/10', border: 'border-amber-500/15', borderActive: 'border-amber-500/40', text: 'text-amber-500', accent: 'bg-amber-500', ring: 'ring-amber-500/30', gradient: 'from-amber-500 to-amber-600', shadow: 'shadow-amber-500/20' },
};

const TOTAL_STEPS = 4;

const stepConfig = [
    { title: 'Plan', desc: 'Elige tu plan', icon: Star },
    { title: 'Empresa', desc: 'Datos del negocio', icon: Building },
    { title: 'Verificar', desc: 'Confirma tu correo', icon: Fingerprint },
    { title: 'Completado', desc: 'Tu cuenta está lista', icon: CheckCircle },
];

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

    const passwordChecks = [
        { label: '8+ chars', ok: (watchedPassword || '').length >= 8 },
        { label: 'Mayúscula', ok: /[A-Z]/.test(watchedPassword || '') },
        { label: 'Número', ok: /[0-9]/.test(watchedPassword || '') },
        { label: 'Especial', ok: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(watchedPassword || '') },
    ];

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-slate-950 dark:via-blue-950/20 dark:to-emerald-950/10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-emerald-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className={cn(
                "relative z-10 container mx-auto px-4 py-8 flex flex-col items-center min-h-screen",
                step === 1 ? "max-w-4xl pt-8" : "max-w-xl pt-12"
            )}>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-2xl border border-primary/10 shadow-lg shadow-primary/5">
                        <Calculator className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black uppercase tracking-[0.15em] text-foreground">Asesoría Contable</h1>
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">System Kyron</p>
                    </div>
                </div>

                {step < TOTAL_STEPS && (
                    <div className="flex items-center gap-0 mb-8 w-full max-w-md mx-auto">
                        {stepConfig.slice(0, 3).map((s, i) => {
                            const stepNum = i + 1;
                            const isActive = step === stepNum;
                            const isDone = step > stepNum;
                            const Icon = s.icon;
                            return (
                                <div key={i} className="flex items-center flex-1 last:flex-none">
                                    <div className="flex flex-col items-center">
                                        <div className={cn(
                                            "w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 border-2",
                                            isDone && "bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/20",
                                            isActive && "bg-primary border-primary shadow-lg shadow-primary/20",
                                            !isActive && !isDone && "bg-muted/50 border-border/50"
                                        )}>
                                            {isDone ? (
                                                <Check className="h-4.5 w-4.5 text-white" />
                                            ) : (
                                                <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-muted-foreground/50")} />
                                            )}
                                        </div>
                                        <p className={cn(
                                            "text-[11px] font-bold uppercase tracking-wider mt-1.5 text-center",
                                            isActive ? "text-primary" : isDone ? "text-emerald-500" : "text-muted-foreground/50"
                                        )}>{s.title}</p>
                                    </div>
                                    {i < 2 && (
                                        <div className={cn(
                                            "flex-1 h-0.5 mx-2 rounded-full transition-all duration-500 mt-[-16px]",
                                            step > stepNum ? "bg-emerald-500" : "bg-border/30"
                                        )} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                <Card className="w-full border border-border/40 shadow-2xl shadow-black/5 dark:shadow-black/30 bg-card/80 backdrop-blur-xl rounded-3xl overflow-hidden">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className={cn("p-6", step === TOTAL_STEPS && "p-8")}>

                            {step === 1 && (
                                <div className="space-y-5">
                                    <div className="text-center space-y-1">
                                        <h2 className="text-lg font-black text-foreground">Elige tu plan contable</h2>
                                        <p className="text-sm text-muted-foreground">Todos incluyen soporte VEN-NIF y SENIAT. Podrás cambiarlo después.</p>
                                    </div>
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
                                                        "relative text-left rounded-2xl border-2 p-4 transition-all duration-300 group",
                                                        "hover:shadow-xl hover:scale-[1.02]",
                                                        isSelected
                                                            ? `${c.bg} ${c.borderActive} ring-2 ${c.ring} shadow-xl ${c.shadow}`
                                                            : `bg-card ${c.border} ${c.bgHover}`
                                                    )}
                                                >
                                                    {plan.popular && (
                                                        <div className={cn(
                                                            "absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white bg-gradient-to-r",
                                                            c.gradient, "shadow-md", c.shadow
                                                        )}>
                                                            Popular
                                                        </div>
                                                    )}
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className={cn(
                                                            "p-2 rounded-xl transition-all duration-300",
                                                            isSelected ? `bg-gradient-to-br ${c.gradient} shadow-md ${c.shadow}` : c.bg
                                                        )}>
                                                            <Icon className={cn("h-4 w-4", isSelected ? "text-white" : c.text)} />
                                                        </div>
                                                        <div className={cn(
                                                            "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300",
                                                            isSelected ? `${c.borderActive} ${c.accent}` : "border-muted-foreground/20"
                                                        )}>
                                                            {isSelected && <Check className="h-3 w-3 text-white" />}
                                                        </div>
                                                    </div>
                                                    <p className={cn("text-xs font-black uppercase tracking-wider", c.text)}>{plan.nombre}</p>
                                                    <div className="flex items-baseline gap-0.5 mt-1">
                                                        <span className="text-2xl font-black text-foreground">${plan.precio}</span>
                                                        <span className="text-xs font-bold text-muted-foreground">/mes</span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{plan.descripcion}</p>
                                                    <div className="mt-3 pt-3 border-t border-border/30 space-y-1.5">
                                                        {plan.features.map((f, i) => (
                                                            <div key={i} className="flex items-start gap-2">
                                                                <div className={cn("mt-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0", isSelected ? c.bg : "bg-muted/50")}>
                                                                    <Check className={cn("h-2.5 w-2.5", isSelected ? c.text : "text-muted-foreground/40")} />
                                                                </div>
                                                                <span className="text-xs text-muted-foreground leading-tight">{f}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="flex items-center justify-center gap-6 pt-2">
                                        {[
                                            { icon: Shield, label: 'SSL Seguro' },
                                            { icon: BarChart3, label: 'VEN-NIF' },
                                            { icon: Headphones, label: 'Soporte' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-1.5">
                                                <item.icon className="h-3.5 w-3.5 text-muted-foreground/50" />
                                                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/50">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-5">
                                    {planData && (
                                        <div className={cn("p-3 rounded-2xl border flex items-center gap-3", colorMap[planData.color].bg, colorMap[planData.color].borderActive)}>
                                            <div className={cn("p-2 rounded-xl bg-gradient-to-br", colorMap[planData.color].gradient)}>
                                                <planData.icon className="h-3.5 w-3.5 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <p className={cn("text-xs font-black uppercase tracking-widest", colorMap[planData.color].text)}>Plan {planData.nombre}</p>
                                                <p className="text-xs text-muted-foreground">${planData.precio}/mes</p>
                                            </div>
                                            <button type="button" onClick={() => setStep(1)} className="text-xs font-bold text-muted-foreground hover:text-foreground px-2 py-1 rounded-lg hover:bg-muted/50 transition-colors">Cambiar</button>
                                        </div>
                                    )}

                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="p-1.5 bg-primary/10 rounded-lg">
                                                <Building className="h-3.5 w-3.5 text-primary" />
                                            </div>
                                            <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Datos de la Empresa</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="col-span-2 space-y-1.5">
                                                <Label htmlFor="razonSocial" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Razón Social</Label>
                                                <Input id="razonSocial" placeholder="Empresa, C.A." {...register('razonSocial')} className={cn("h-10 rounded-xl bg-muted/30 border-border/50 focus:bg-background transition-colors", errors.razonSocial && 'border-destructive')} />
                                                {errors.razonSocial && <p className="text-xs text-destructive">{errors.razonSocial.message}</p>}
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">RIF</Label>
                                                <Controller name="rif" control={control} render={({ field }) => (
                                                    <DocumentInput type="rif" value={field.value || ''} onChange={field.onChange} error={!!errors.rif} />
                                                )} />
                                                {errors.rif && <p className="text-xs text-destructive">{errors.rif.message}</p>}
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Tipo de Empresa</Label>
                                                <Controller name="tipo_empresa" control={control} render={({ field }) => (
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className={cn("h-10 rounded-xl bg-muted/30 border-border/50", errors.tipo_empresa && 'border-destructive')}><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                                                        <SelectContent>{TIPOS_EMPRESA.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                                    </Select>
                                                )} />
                                                {errors.tipo_empresa && <p className="text-xs text-destructive">{errors.tipo_empresa.message}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="p-1.5 bg-sky-500/10 rounded-lg">
                                                <Users className="h-3.5 w-3.5 text-sky-500" />
                                            </div>
                                            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-500">Representante Legal</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1.5">
                                                <Label htmlFor="repNombre" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Nombre Completo</Label>
                                                <Input id="repNombre" placeholder="Juan Pérez" {...register('repNombre')} className={cn("h-10 rounded-xl bg-muted/30 border-border/50 focus:bg-background transition-colors", errors.repNombre && 'border-destructive')} />
                                                {errors.repNombre && <p className="text-xs text-destructive">{errors.repNombre.message}</p>}
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="telefono" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Teléfono</Label>
                                                <Input id="telefono" type="tel" placeholder="0412-1234567" {...register('telefono')} className={cn("h-10 rounded-xl bg-muted/30 border-border/50 focus:bg-background transition-colors", errors.telefono && 'border-destructive')} />
                                                {errors.telefono && <p className="text-xs text-destructive">{errors.telefono.message}</p>}
                                            </div>
                                            <div className="col-span-2 space-y-1.5">
                                                <Label htmlFor="repEmail" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Correo Electrónico</Label>
                                                <Input id="repEmail" type="email" placeholder="tu@empresa.com" {...register('repEmail')} className={cn("h-10 rounded-xl bg-muted/30 border-border/50 focus:bg-background transition-colors", errors.repEmail && 'border-destructive')} />
                                                {errors.repEmail && <p className="text-xs text-destructive">{errors.repEmail.message}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="p-1.5 bg-violet-500/10 rounded-lg">
                                                <ShieldCheck className="h-3.5 w-3.5 text-violet-500" />
                                            </div>
                                            <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-500">Seguridad y Ubicación</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1.5">
                                                <Label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Contraseña</Label>
                                                <div className="relative">
                                                    <Input id="password" type={showPassword ? 'text' : 'password'} {...register('password')} className={cn('pr-10 h-10 rounded-xl bg-muted/30 border-border/50 focus:bg-background transition-colors', errors.password && 'border-destructive')} />
                                                    <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" tabIndex={-1}>
                                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5">
                                                    {passwordChecks.map((c, i) => (
                                                        <span key={i} className={cn(
                                                            "text-[11px] font-bold transition-colors flex items-center gap-1",
                                                            c.ok ? "text-emerald-500" : "text-muted-foreground/30"
                                                        )}>
                                                            <span className={cn("w-1.5 h-1.5 rounded-full", c.ok ? "bg-emerald-500" : "bg-muted-foreground/20")} />
                                                            {c.label}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="confirmPassword" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Confirmar</Label>
                                                <Input id="confirmPassword" type={showPassword ? 'text' : 'password'} {...register('confirmPassword')} className={cn("h-10 rounded-xl bg-muted/30 border-border/50 focus:bg-background transition-colors", errors.confirmPassword && 'border-destructive')} />
                                                {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Estado</Label>
                                                <Controller name="estado_empresa" control={control} render={({ field }) => (
                                                    <Select onValueChange={(v) => { field.onChange(v); setValue('municipio_empresa', ''); }} value={field.value}>
                                                        <SelectTrigger className={cn("h-10 rounded-xl bg-muted/30 border-border/50", errors.estado_empresa && 'border-destructive')}><SelectValue placeholder="Estado..." /></SelectTrigger>
                                                        <SelectContent>{ESTADOS_VE.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
                                                    </Select>
                                                )} />
                                                {errors.estado_empresa && <p className="text-xs text-destructive">{errors.estado_empresa.message}</p>}
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Municipio</Label>
                                                <Controller name="municipio_empresa" control={control} render={({ field }) => (
                                                    <Select value={field.value} onValueChange={field.onChange} disabled={!estadoEmpresa}>
                                                        <SelectTrigger className={cn("h-10 rounded-xl bg-muted/30 border-border/50", errors.municipio_empresa && 'border-destructive')}>
                                                            <SelectValue placeholder={estadoEmpresa ? 'Municipio...' : 'Primero el estado'} />
                                                        </SelectTrigger>
                                                        <SelectContent>{getMunicipios(estadoEmpresa || '').map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                                                    </Select>
                                                )} />
                                                {errors.municipio_empresa && <p className="text-xs text-destructive">{errors.municipio_empresa.message}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-muted/20 border border-border/30 cursor-pointer select-none group hover:bg-muted/40 transition-all duration-200">
                                        <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-border accent-primary shrink-0" />
                                        <span className="text-sm text-muted-foreground leading-relaxed">
                                            Acepto los{' '}
                                            <a href="/terms" target="_blank" className="text-primary font-semibold hover:underline" onClick={(e) => e.stopPropagation()}>Términos y Condiciones</a>{' '}
                                            y la{' '}
                                            <a href="/politica-privacidad" target="_blank" className="text-primary font-semibold hover:underline" onClick={(e) => e.stopPropagation()}>Política de Privacidad</a>.
                                        </span>
                                    </label>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6">
                                    <div className="text-center space-y-2">
                                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-sky-500/20 border border-primary/10">
                                            <Fingerprint className="h-7 w-7 text-primary" />
                                        </div>
                                        <h2 className="text-lg font-black text-foreground">Verifica tu correo</h2>
                                        <p className="text-sm text-muted-foreground">Enviaremos un código de 6 dígitos para confirmar tu identidad.</p>
                                    </div>

                                    {verifVerified ? (
                                        <div className="text-center py-6 space-y-4">
                                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-900/20 shadow-lg shadow-emerald-500/10">
                                                <CheckCircle className="h-10 w-10 text-emerald-500" />
                                            </div>
                                            <div>
                                                <p className="text-base font-black text-emerald-500 uppercase tracking-widest">¡Verificado!</p>
                                                <p className="text-sm text-muted-foreground mt-1">{verifDestino}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-5 rounded-2xl border border-border/40 bg-muted/5 space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2.5 bg-sky-500/10 rounded-xl">
                                                    <Mail className="h-5 w-5 text-sky-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs font-black uppercase tracking-widest text-foreground">Correo de destino</p>
                                                    <p className="text-sm text-muted-foreground">{getValues('repEmail')}</p>
                                                </div>
                                            </div>

                                            {!verifSent ? (
                                                <Button type="button" className="w-full h-11 rounded-xl font-bold" onClick={sendVerificationCode} disabled={verifLoading}>
                                                    {verifLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Enviando...</> : <><Mail className="mr-2 h-4 w-4" />Enviar Código de Verificación</>}
                                                </Button>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-center gap-2 py-1">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                        <p className="text-xs text-emerald-500 font-black uppercase tracking-widest">Código enviado a tu correo</p>
                                                    </div>
                                                    <Input
                                                        placeholder="000000"
                                                        maxLength={6}
                                                        value={verifCode}
                                                        onChange={e => setVerifCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                        className="text-center text-3xl font-black tracking-[0.6em] h-16 rounded-2xl bg-muted/30 border-2 border-border/50 focus:border-primary/50"
                                                    />
                                                    <Button type="button" className="w-full h-11 rounded-xl font-bold" onClick={verifyCode} disabled={verifLoading || verifCode.length !== 6}>
                                                        {verifLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Verificando...</> : <><ShieldCheck className="mr-2 h-4 w-4" />Verificar Código</>}
                                                    </Button>
                                                    <div className="text-center">
                                                        {countdown > 0 ? (
                                                            <p className="text-xs text-muted-foreground">Reenviar en <span className="font-bold text-foreground">{countdown}s</span></p>
                                                        ) : (
                                                            <button type="button" onClick={sendVerificationCode} disabled={verifLoading} className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1.5 transition-colors">
                                                                <RefreshCw className="h-3 w-3" /> Reenviar código
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
                                <div className="text-center py-4 space-y-6">
                                    <div className="relative inline-flex items-center justify-center">
                                        <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/20 to-primary/20 blur-xl" />
                                        <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-900/20 flex items-center justify-center shadow-xl shadow-emerald-500/10">
                                            <CheckCircle className="h-10 w-10 text-emerald-500" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-black uppercase tracking-tight bg-gradient-to-r from-emerald-500 to-primary bg-clip-text text-transparent">¡Cuenta Creada!</h2>
                                        <p className="text-base text-muted-foreground">Tu empresa ya está registrada en <strong className="text-foreground">Asesoría Contable</strong>.</p>
                                    </div>

                                    {planData && (
                                        <div className={cn("p-4 rounded-2xl border-2 mx-auto max-w-xs", colorMap[planData.color].bg, colorMap[planData.color].borderActive)}>
                                            <div className="flex items-center justify-center gap-3">
                                                <div className={cn("p-2 rounded-xl bg-gradient-to-br", colorMap[planData.color].gradient)}>
                                                    <planData.icon className="h-4 w-4 text-white" />
                                                </div>
                                                <div>
                                                    <p className={cn("text-xs font-black uppercase tracking-widest", colorMap[planData.color].text)}>Plan {planData.nombre}</p>
                                                    <p className="text-sm font-black text-foreground">${planData.precio}/mes</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                                        {[
                                            { icon: Calculator, label: 'Contabilidad' },
                                            { icon: FileText, label: 'Facturación' },
                                            { icon: TrendingUp, label: 'Análisis' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-muted/30 border border-border/30">
                                                <item.icon className="h-4 w-4 text-primary" />
                                                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button className="w-full max-w-xs h-12 rounded-xl font-bold text-sm" onClick={() => { router.push('/resumen-negocio' as any); }}>
                                        Ir al Portal Contable <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </CardContent>

                        {step < TOTAL_STEPS && (
                            <CardFooter className="flex justify-between p-6 pt-0">
                                <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1} size="sm" className="rounded-xl h-10 px-5">
                                    <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />Anterior
                                </Button>
                                {step === 1 && (
                                    <Button type="button" onClick={nextStep} disabled={!selectedPlan} size="sm" className="rounded-xl h-10 px-5">
                                        Siguiente<ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                                    </Button>
                                )}
                                {step === 2 && (
                                    <Button type="button" onClick={nextStep} size="sm" className="rounded-xl h-10 px-5">
                                        Verificar Correo<ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                                    </Button>
                                )}
                                {step === 3 && (
                                    <Button type="submit" disabled={isLoading || !verifVerified} size="sm" className="rounded-xl h-10 px-5">
                                        {isLoading ? <><Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />Registrando...</> : <>Finalizar Registro<ArrowRight className="ml-1.5 h-3.5 w-3.5" /></>}
                                    </Button>
                                )}
                            </CardFooter>
                        )}
                        {step < TOTAL_STEPS && (
                            <p className="text-center text-sm text-muted-foreground pb-6">
                                ¿Ya tienes cuenta? <Link href="/login-empresa" className="text-primary font-bold hover:underline">Iniciar sesión</Link>
                            </p>
                        )}
                    </form>
                </Card>
            </div>
        </div>
    );
}
