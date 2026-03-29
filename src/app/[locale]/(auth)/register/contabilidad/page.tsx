'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
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
    Building, BookOpen, ShieldCheck, RefreshCw, Scale, Calculator, Check, Crown, Star,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { DocumentInput } from '@/components/document-input';

const TOTAL_STEPS = 6;

const ESTADOS_VE = [
    'Amazonas', 'Anzoátegui', 'Apure', 'Aragua', 'Barinas', 'Bolívar', 'Carabobo',
    'Cojedes', 'Delta Amacuro', 'Dependencias Federales', 'Distrito Capital', 'Falcón',
    'Guárico', 'Lara', 'Mérida', 'Miranda', 'Monagas', 'Nueva Esparta', 'Portuguesa',
    'Sucre', 'Táchira', 'Trujillo', 'La Guaira', 'Yaracuy', 'Zulia',
];

const TIPOS_EMPRESA = [
    'Compañía Anónima (C.A.)', 'Compañía de Responsabilidad Limitada (C.R.L.)',
    'Sociedad Anónima (S.A.)', 'Sociedad de Responsabilidad Limitada (S.R.L.)',
    'Cooperativa', 'Asociación Civil', 'Fundación', 'ONG',
    'Empresa Pública', 'Persona Natural con Actividad Económica', 'Otro',
];

const REGIMENES_IVA = ['General', 'Especial', 'Simplificado', 'Exento'];
const PERIODOS_CONTABLES = ['Enero-Diciembre', 'Octubre-Septiembre', 'Julio-Junio', 'Abril-Marzo'];

const PLANES_CONTABILIDAD = [
    {
        id: 'basico',
        nombre: 'Básico',
        precioUsd: 12,
        descripcion: 'Contabilidad simple para emprendedores y microempresas',
        color: 'from-slate-500 to-gray-600',
        features: ['Libro diario y mayor', 'Balance general básico', 'Estado de resultados', 'Hasta 200 asientos/mes', 'Exportar a PDF/Excel'],
    },
    {
        id: 'profesional',
        nombre: 'Profesional',
        precioUsd: 28,
        descripcion: 'Facturación electrónica y cumplimiento fiscal completo',
        popular: true,
        color: 'from-primary to-blue-600',
        features: ['Todo del plan Básico', 'Facturación electrónica SENIAT', 'Declaración IVA automática', 'Control de cuentas por cobrar/pagar', 'Conciliación bancaria', 'Hasta 1.000 asientos/mes', 'Reportes fiscales VEN-NIF'],
    },
    {
        id: 'empresarial',
        nombre: 'Empresarial',
        precioUsd: 52,
        descripcion: 'Multi-usuario con retenciones y libros de compra/venta',
        color: 'from-emerald-500 to-teal-600',
        features: ['Todo del plan Profesional', 'Retenciones IVA e ISLR automáticas', 'Libros de compra y venta', 'Multi-usuario (hasta 5)', 'Control de inventario básico', 'Asientos ilimitados', 'Soporte prioritario', 'Auditoría de transacciones'],
    },
    {
        id: 'premium',
        nombre: 'Premium',
        precioUsd: 95,
        descripcion: 'Solución completa con IA y asesoría contable',
        color: 'from-violet-500 to-purple-600',
        features: ['Todo del plan Empresarial', 'IA asistente contable (Kyron AI)', 'Asesoría fiscal personalizada', 'Multi-empresa ilimitado', 'Usuarios ilimitados', 'API de integración', 'Dashboard ejecutivo en tiempo real', 'Reportes personalizados SENIAT', 'Backup y recuperación avanzada', 'SLA 99.9% disponibilidad'],
    },
];

const schema = z.object({
    plan_contable: z.string().min(1, 'Seleccione un plan contable'),
    razonSocial: z.string().min(3, 'Ingrese la razón social'),
    rif: z.string().regex(/^[JGCVEPF]-\d{8}-\d$/, 'Formato: J-50328471-6'),
    tipo_empresa: z.string().min(1, 'Seleccione el tipo de empresa'),
    actividad_economica: z.string().min(5, 'Describa la actividad económica'),
    codigo_ciiu: z.string().optional(),
    estado_empresa: z.string().min(1, 'Seleccione el estado'),
    municipio_empresa: z.string().min(2, 'Ingrese el municipio'),
    direccion: z.string().min(5, 'Ingrese la dirección fiscal'),
    telefono: z.string().min(7, 'Teléfono inválido'),
    regimen_iva: z.string().min(1, 'Seleccione el régimen de IVA'),
    agente_retencion_iva: z.string().min(1, 'Indique si es agente de retención IVA'),
    agente_retencion_islr: z.string().min(1, 'Indique si es agente de retención ISLR'),
    periodo_contable: z.string().min(1, 'Seleccione el período contable'),
    nro_resoluciones: z.string().optional(),
    repNombre: z.string().min(2, 'Ingrese el nombre'),
    repApellido: z.string().min(2, 'Ingrese el apellido'),
    repCedula: z.string().min(6, 'Cédula inválida'),
    rep_cargo: z.string().min(2, 'Ingrese el cargo'),
    rep_telefono: z.string().min(7, 'Teléfono inválido'),
    repEmail: z.string().email('Correo inválido'),
    password: z.string()
        .min(8, 'Mínimo 8 caracteres')
        .regex(/[A-Z]/, 'Debe contener una mayúscula')
        .regex(/[0-9]/, 'Debe contener un número'),
    confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
    message: 'Las contraseñas no coinciden', path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

const MODULES_CONTABILIDAD = [
    { id: 'contabilidad', label: 'Contabilidad' },
    { id: 'facturacion', label: 'Facturación' },
    { id: 'tramites-fiscales', label: 'Trámites Fiscales' },
    { id: 'analisis-caja', label: 'Análisis de Caja' },
    { id: 'inventario', label: 'Inventario' },
];

export default function RegisterContabilidadPage() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [verifMethod, setVerifMethod] = useState<'email' | 'sms'>('email');
    const [verifCode, setVerifCode] = useState('');
    const [verifSent, setVerifSent] = useState(false);
    const [verifVerified, setVerifVerified] = useState(false);
    const [verifLoading, setVerifLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [registeredEmail, setRegisteredEmail] = useState('');
    const [tasaBcv, setTasaBcv] = useState<number | null>(null);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        fetch('/api/tasas-bcv?limit=1')
            .then(r => r.json())
            .then(d => {
                const rate = parseFloat(d.ultima?.tasa_usd_ves);
                if (!isNaN(rate) && rate > 0) setTasaBcv(rate);
            })
            .catch(() => {});
    }, []);

    const { register, handleSubmit, control, getValues, trigger, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange',
    });

    const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

    const stepFields: Record<number, (keyof FormData)[]> = {
        1: ['plan_contable'],
        2: ['razonSocial', 'rif', 'tipo_empresa', 'actividad_economica'],
        3: ['regimen_iva', 'agente_retencion_iva', 'agente_retencion_islr', 'periodo_contable', 'estado_empresa', 'municipio_empresa', 'direccion', 'telefono'],
        4: ['repNombre', 'repApellido', 'repCedula', 'rep_cargo', 'rep_telefono', 'repEmail', 'password', 'confirmPassword'],
    };

    const nextStep = async () => {
        const fields = stepFields[step];
        if (fields) {
            const valid = await trigger(fields);
            if (!valid) return;
        }
        setStep(s => s + 1);
    };

    const prevStep = () => setStep(s => s - 1);

    const startCountdown = () => {
        setCountdown(60);
        const interval = setInterval(() => {
            setCountdown(c => { if (c <= 1) { clearInterval(interval); return 0; } return c - 1; });
        }, 1000);
    };

    const sendVerificationCode = async () => {
        const email = getValues('repEmail');
        const phone = getValues('rep_telefono');
        const destino = verifMethod === 'email' ? email : phone;
        setVerifLoading(true);
        try {
            const res = await fetch('/api/auth/send-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destino, tipo: verifMethod }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setVerifSent(true);
            startCountdown();
            toast({ title: 'Código enviado', description: `Se envió el código a tu ${verifMethod === 'email' ? 'correo' : 'teléfono'}.` });
        } catch (e: any) {
            toast({ title: 'Error', description: e.message, variant: 'destructive' });
        } finally {
            setVerifLoading(false);
        }
    };

    const verifyCode = async () => {
        const email = getValues('repEmail');
        const phone = getValues('rep_telefono');
        const destino = verifMethod === 'email' ? email : phone;
        setVerifLoading(true);
        try {
            const res = await fetch('/api/auth/verify-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destino, codigo: verifCode }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setVerifVerified(true);
            toast({ title: '¡Verificado!', description: 'Identidad confirmada.' });
        } catch (e: any) {
            toast({ title: 'Código incorrecto', description: e.message, variant: 'destructive' });
        } finally {
            setVerifLoading(false);
        }
    };

    const onSubmit = async (data: FormData) => {
        if (!verifVerified) {
            toast({ title: 'Verificación pendiente', description: 'Completa la verificación de identidad.', variant: 'destructive' });
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tipo: 'juridico',
                    plan_contable: data.plan_contable,
                    razonSocial: data.razonSocial,
                    rif: data.rif,
                    tipo_empresa: data.tipo_empresa,
                    actividad_economica: data.actividad_economica,
                    codigo_ciiu: data.codigo_ciiu,
                    telefono: data.telefono,
                    estado_empresa: data.estado_empresa,
                    municipio_empresa: data.municipio_empresa,
                    direccion: data.direccion,
                    repNombre: data.repNombre,
                    repApellido: data.repApellido,
                    repCedula: data.repCedula,
                    rep_cargo: data.rep_cargo,
                    rep_telefono: data.rep_telefono,
                    repEmail: data.repEmail,
                    password: data.password,
                    email_verificado: verifMethod === 'email',
                    telefono_verificado: verifMethod === 'sms',
                    modules: MODULES_CONTABILIDAD,
                }),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error);
            setRegisteredEmail(data.repEmail);
            setStep(TOTAL_STEPS);
        } catch (e: any) {
            toast({ title: 'Error de registro', description: e.message, variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    const stepTitles = [
        { title: 'Selección de Plan', desc: 'Elige tu plan contable', icon: Star },
        { title: 'Identificación Empresarial', desc: 'Datos fiscales de la organización', icon: Building },
        { title: 'Configuración Contable', desc: 'Régimen IVA, retenciones y períodos', icon: Calculator },
        { title: 'Representante Legal', desc: 'Responsable de la cuenta', icon: ShieldCheck },
        { title: 'Verificación de Identidad', desc: 'Confirmación de acceso', icon: Scale },
        { title: 'Módulo Activado', desc: 'Contabilidad registrada', icon: CheckCircle },
    ];

    const currentStep = stepTitles[step - 1];
    const StepIcon = currentStep.icon;

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl min-h-screen flex items-start justify-center pt-16">
            <Card className="w-full border-none shadow-2xl bg-card/60 backdrop-blur-xl rounded-[2rem] overflow-hidden">
                <CardHeader className="p-8 border-b border-border/50 bg-muted/5">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                            <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-primary">Registro · Contabilidad</CardTitle>
                            <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">VEN-NIF · SENIAT · IVA · ISLR</CardDescription>
                        </div>
                    </div>
                    <Progress value={progress} className="h-1 mb-4" />
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/5 rounded-lg">
                            <StepIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-tight text-foreground">{currentStep.title}</p>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{currentStep.desc} · Paso {step} de {TOTAL_STEPS}</p>
                        </div>
                    </div>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="p-8 space-y-6">

                        {step === 1 && (
                            <div className="space-y-4">
                                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 mb-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1 flex items-center gap-2">
                                        <Star className="h-3.5 w-3.5" /> Elige tu Plan Contable
                                    </p>
                                    <p className="text-[9px] text-muted-foreground">Selecciona el plan que mejor se adapte a tu empresa. Podrás cambiarlo después.</p>
                                    {tasaBcv && <p className="text-[8px] text-muted-foreground/60 mt-1">Tasa BCV del día: 1 USD = Bs. {tasaBcv.toFixed(2)}</p>}
                                </div>

                                {errors.plan_contable && <p className="text-[10px] text-destructive">{errors.plan_contable.message}</p>}
                                <Controller name="plan_contable" control={control} render={({ field }) => (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {PLANES_CONTABILIDAD.map(plan => {
                                            const selected = field.value === plan.id;
                                            return (
                                                <button
                                                    key={plan.id}
                                                    type="button"
                                                    onClick={() => field.onChange(plan.id)}
                                                    aria-label={`Seleccionar plan ${plan.nombre}`}
                                                    className={cn(
                                                        "relative p-4 rounded-xl border text-left transition-all duration-200 group",
                                                        selected
                                                            ? "border-primary bg-primary/5 ring-1 ring-primary/30 shadow-lg shadow-primary/10"
                                                            : "border-border/50 bg-muted/10 hover:border-primary/30 hover:bg-primary/[0.02]"
                                                    )}
                                                >
                                                    {'popular' in plan && plan.popular && (
                                                        <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-primary to-blue-600 text-white text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                                                            <Crown className="h-2.5 w-2.5" /> Recomendado
                                                        </span>
                                                    )}
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <div className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest mb-1.5", selected ? "bg-primary/10 text-primary" : "bg-muted/30 text-muted-foreground")}>
                                                                <BookOpen className="h-2.5 w-2.5" />
                                                                {plan.nombre}
                                                            </div>
                                                            <p className="text-sm font-black text-foreground">${plan.precioUsd}/mes</p>
                                                            {tasaBcv && <p className="text-[9px] text-muted-foreground/70">Bs. {(plan.precioUsd * tasaBcv).toFixed(2)}</p>}
                                                        </div>
                                                        <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-all", selected ? "border-primary bg-primary" : "border-muted-foreground/30")}>
                                                            {selected && <Check className="h-3 w-3 text-white" />}
                                                        </div>
                                                    </div>
                                                    <p className="text-[10px] text-muted-foreground mb-2.5">{plan.descripcion}</p>
                                                    <div className="space-y-1">
                                                        {plan.features.map((f, i) => (
                                                            <div key={i} className="flex items-center gap-1.5">
                                                                <Check className={cn("h-3 w-3 shrink-0", selected ? "text-primary" : "text-muted-foreground/40")} />
                                                                <span className="text-[9px] text-muted-foreground">{f}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )} />
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2 space-y-2">
                                        <Label htmlFor="razonSocial" className="text-[10px] font-black uppercase tracking-widest">Razón Social *</Label>
                                        <Input id="razonSocial" placeholder="Empresa Ejemplo, C.A." {...register('razonSocial')} className={cn(errors.razonSocial && 'border-destructive')} />
                                        {errors.razonSocial && <p className="text-[10px] text-destructive">{errors.razonSocial.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">RIF *</Label>
                                        <Controller name="rif" control={control} render={({ field }) => (
                                            <DocumentInput type="rif" value={field.value || ''} onChange={field.onChange} error={!!errors.rif} />
                                        )} />
                                        {errors.rif && <p className="text-[10px] text-destructive">{errors.rif.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Tipo de Empresa *</Label>
                                        <Controller name="tipo_empresa" control={control} render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className={cn(errors.tipo_empresa && 'border-destructive')}><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                                                <SelectContent>{TIPOS_EMPRESA.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                            </Select>
                                        )} />
                                        {errors.tipo_empresa && <p className="text-[10px] text-destructive">{errors.tipo_empresa.message}</p>}
                                    </div>
                                    <div className="sm:col-span-2 space-y-2">
                                        <Label htmlFor="actividad_economica" className="text-[10px] font-black uppercase tracking-widest">Actividad Económica Principal *</Label>
                                        <Input id="actividad_economica" placeholder="Ej: Servicios de consultoría contable y fiscal..." {...register('actividad_economica')} className={cn(errors.actividad_economica && 'border-destructive')} />
                                        {errors.actividad_economica && <p className="text-[10px] text-destructive">{errors.actividad_economica.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="codigo_ciiu" className="text-[10px] font-black uppercase tracking-widest">Código CIIU</Label>
                                        <Input id="codigo_ciiu" placeholder="Ej: 6920" {...register('codigo_ciiu')} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Régimen IVA *</Label>
                                        <Controller name="regimen_iva" control={control} render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className={cn(errors.regimen_iva && 'border-destructive')}><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                                                <SelectContent>{REGIMENES_IVA.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                                            </Select>
                                        )} />
                                        {errors.regimen_iva && <p className="text-[10px] text-destructive">{errors.regimen_iva.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Período Contable *</Label>
                                        <Controller name="periodo_contable" control={control} render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className={cn(errors.periodo_contable && 'border-destructive')}><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                                                <SelectContent>{PERIODOS_CONTABLES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                                            </Select>
                                        )} />
                                        {errors.periodo_contable && <p className="text-[10px] text-destructive">{errors.periodo_contable.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">¿Agente Retención IVA? *</Label>
                                        <Controller name="agente_retencion_iva" control={control} render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className={cn(errors.agente_retencion_iva && 'border-destructive')}><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="si">Sí — Agente designado por SENIAT</SelectItem>
                                                    <SelectItem value="no">No</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )} />
                                        {errors.agente_retencion_iva && <p className="text-[10px] text-destructive">{errors.agente_retencion_iva.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">¿Agente Retención ISLR? *</Label>
                                        <Controller name="agente_retencion_islr" control={control} render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className={cn(errors.agente_retencion_islr && 'border-destructive')}><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="si">Sí</SelectItem>
                                                    <SelectItem value="no">No</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )} />
                                        {errors.agente_retencion_islr && <p className="text-[10px] text-destructive">{errors.agente_retencion_islr.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="nro_resoluciones" className="text-[10px] font-black uppercase tracking-widest">Nro. Resolución SENIAT</Label>
                                        <Input id="nro_resoluciones" placeholder="Ej: SNAT/2013/0030" {...register('nro_resoluciones')} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Estado *</Label>
                                        <Controller name="estado_empresa" control={control} render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className={cn(errors.estado_empresa && 'border-destructive')}><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                                                <SelectContent>{ESTADOS_VE.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
                                            </Select>
                                        )} />
                                        {errors.estado_empresa && <p className="text-[10px] text-destructive">{errors.estado_empresa.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="municipio_empresa" className="text-[10px] font-black uppercase tracking-widest">Municipio *</Label>
                                        <Input id="municipio_empresa" placeholder="Municipio..." {...register('municipio_empresa')} className={cn(errors.municipio_empresa && 'border-destructive')} />
                                        {errors.municipio_empresa && <p className="text-[10px] text-destructive">{errors.municipio_empresa.message}</p>}
                                    </div>
                                    <div className="sm:col-span-2 space-y-2">
                                        <Label htmlFor="direccion" className="text-[10px] font-black uppercase tracking-widest">Dirección Fiscal *</Label>
                                        <Input id="direccion" placeholder="Dirección completa de la sede fiscal..." {...register('direccion')} className={cn(errors.direccion && 'border-destructive')} />
                                        {errors.direccion && <p className="text-[10px] text-destructive">{errors.direccion.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="telefono" className="text-[10px] font-black uppercase tracking-widest">Teléfono Corporativo *</Label>
                                        <Input id="telefono" type="tel" placeholder="0212-XXXXXXX" {...register('telefono')} className={cn(errors.telefono && 'border-destructive')} />
                                        {errors.telefono && <p className="text-[10px] text-destructive">{errors.telefono.message}</p>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="repNombre" className="text-[10px] font-black uppercase tracking-widest">Nombre *</Label>
                                        <Input id="repNombre" {...register('repNombre')} className={cn(errors.repNombre && 'border-destructive')} />
                                        {errors.repNombre && <p className="text-[10px] text-destructive">{errors.repNombre.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="repApellido" className="text-[10px] font-black uppercase tracking-widest">Apellido *</Label>
                                        <Input id="repApellido" {...register('repApellido')} className={cn(errors.repApellido && 'border-destructive')} />
                                        {errors.repApellido && <p className="text-[10px] text-destructive">{errors.repApellido.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Cédula *</Label>
                                        <Controller name="repCedula" control={control} render={({ field }) => (
                                            <DocumentInput type="cedula" value={field.value || ''} onChange={field.onChange} error={!!errors.repCedula} />
                                        )} />
                                        {errors.repCedula && <p className="text-[10px] text-destructive">{errors.repCedula.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="rep_cargo" className="text-[10px] font-black uppercase tracking-widest">Cargo *</Label>
                                        <Input id="rep_cargo" placeholder="Ej: Director Financiero, Contador..." {...register('rep_cargo')} className={cn(errors.rep_cargo && 'border-destructive')} />
                                        {errors.rep_cargo && <p className="text-[10px] text-destructive">{errors.rep_cargo.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="rep_telefono" className="text-[10px] font-black uppercase tracking-widest">Teléfono *</Label>
                                        <Input id="rep_telefono" type="tel" {...register('rep_telefono')} className={cn(errors.rep_telefono && 'border-destructive')} />
                                        {errors.rep_telefono && <p className="text-[10px] text-destructive">{errors.rep_telefono.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="repEmail" className="text-[10px] font-black uppercase tracking-widest">Correo Electrónico *</Label>
                                        <Input id="repEmail" type="email" {...register('repEmail')} className={cn(errors.repEmail && 'border-destructive')} />
                                        {errors.repEmail && <p className="text-[10px] text-destructive">{errors.repEmail.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest">Contraseña *</Label>
                                        <div className="relative">
                                            <Input id="password" type={showPassword ? 'text' : 'password'} {...register('password')} className={cn('pr-10', errors.password && 'border-destructive')} />
                                            <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        {errors.password && <p className="text-[10px] text-destructive">{errors.password.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword" className="text-[10px] font-black uppercase tracking-widest">Confirmar Contraseña *</Label>
                                        <Input id="confirmPassword" type="password" {...register('confirmPassword')} className={cn(errors.confirmPassword && 'border-destructive')} />
                                        {errors.confirmPassword && <p className="text-[10px] text-destructive">{errors.confirmPassword.message}</p>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 5 && (
                            <div className="space-y-6">
                                {!verifSent ? (
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">Elige cómo verificar tu identidad:</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {(['email', 'sms'] as const).map(m => (
                                                <button key={m} type="button" onClick={() => setVerifMethod(m)}
                                                    className={cn("p-4 rounded-xl border text-xs font-black uppercase tracking-widest transition-all", verifMethod === m ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground")}>
                                                    {m === 'email' ? '📧 Correo' : '📱 SMS'}
                                                </button>
                                            ))}
                                        </div>
                                        <Button type="button" className="w-full" onClick={sendVerificationCode} disabled={verifLoading}>
                                            {verifLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Enviando...</> : 'Enviar Código de Verificación'}
                                        </Button>
                                    </div>
                                ) : verifVerified ? (
                                    <div className="text-center py-6 space-y-3">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30">
                                            <CheckCircle className="h-10 w-10 text-green-500" />
                                        </div>
                                        <p className="font-black text-green-600 uppercase tracking-widest text-xs">Identidad Verificada</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground text-center">Ingresa el código de 6 dígitos enviado.</p>
                                        <Input
                                            maxLength={6}
                                            value={verifCode}
                                            onChange={e => setVerifCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                            className="text-center text-2xl tracking-[0.5em] font-mono"
                                        />
                                        <Button type="button" className="w-full" onClick={verifyCode} disabled={verifLoading || verifCode.length !== 6}>
                                            {verifLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Verificando...</> : <><ShieldCheck className="mr-2 h-4 w-4" />Verificar</>}
                                        </Button>
                                        <div className="text-center">
                                            {countdown > 0 ? (
                                                <p className="text-xs text-muted-foreground">Reenviar en <strong>{countdown}s</strong></p>
                                            ) : (
                                                <button type="button" onClick={sendVerificationCode} disabled={verifLoading} className="text-xs text-primary underline inline-flex items-center gap-1">
                                                    <RefreshCw className="h-3 w-3" />Reenviar código
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {step === TOTAL_STEPS && (
                            <div className="text-center py-8 space-y-4">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-2">
                                    <CheckCircle className="h-12 w-12 text-green-500" />
                                </div>
                                <h2 className="text-2xl font-black uppercase italic tracking-tight">¡Módulo Activado!</h2>
                                <p className="text-muted-foreground text-sm">Tu empresa fue registrada en el módulo de <strong className="text-primary">Contabilidad VEN-NIF</strong>.</p>
                                {getValues('plan_contable') && (
                                    <div className="p-3 bg-primary/5 border border-primary/10 rounded-xl text-xs">
                                        <p className="font-black text-primary uppercase tracking-widest mb-1">Plan seleccionado:</p>
                                        <p className="text-muted-foreground">{PLANES_CONTABILIDAD.find(p => p.id === getValues('plan_contable'))?.nombre} — ${PLANES_CONTABILIDAD.find(p => p.id === getValues('plan_contable'))?.precioUsd}/mes{tasaBcv ? ` (Bs. ${((PLANES_CONTABILIDAD.find(p => p.id === getValues('plan_contable'))?.precioUsd ?? 0) * tasaBcv).toFixed(2)})` : ''}</p>
                                    </div>
                                )}
                                <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl text-left text-xs space-y-2">
                                    <p className="font-black text-primary uppercase tracking-widest">Módulos habilitados:</p>
                                    {MODULES_CONTABILIDAD.map(m => <p key={m.id} className="text-muted-foreground">✓ {m.label}</p>)}
                                </div>
                                <Button className="w-full mt-4" onClick={() => { router.push('/'); }}>
                                    Ir al Portal <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </CardContent>

                    {step < TOTAL_STEPS && (
                        <CardFooter className="flex justify-between p-8 pt-2">
                            <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>
                                <ArrowLeft className="mr-2 h-4 w-4" />Anterior
                            </Button>
                            {step < 4 && <Button type="button" onClick={nextStep}>Siguiente<ArrowRight className="ml-2 h-4 w-4" /></Button>}
                            {step === 4 && <Button type="button" onClick={nextStep}>Continuar a Verificación<ArrowRight className="ml-2 h-4 w-4" /></Button>}
                            {step === 5 && (
                                <Button type="submit" disabled={isLoading || !verifVerified}>
                                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Registrando...</> : <>Registrar Empresa<ArrowRight className="ml-2 h-4 w-4" /></>}
                                </Button>
                            )}
                        </CardFooter>
                    )}
                    {step < TOTAL_STEPS && (
                        <p className="text-center text-xs text-muted-foreground pb-6">
                            ¿Ya tienes cuenta? <Link href="/login" className="text-primary font-semibold hover:underline">Iniciar sesión</Link>
                        </p>
                    )}
                </form>
            </Card>
        </div>
    );
}
