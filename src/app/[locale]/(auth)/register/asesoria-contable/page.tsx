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
    Building, BookOpen, ShieldCheck, Calculator, Check,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { DocumentInput } from '@/components/document-input';
import { ESTADOS_VE, getMunicipios } from '@/lib/venezuela-geo';

const TOTAL_STEPS = 3;

const TIPOS_EMPRESA = [
    'Compañía Anónima (C.A.)', 'Compañía de Responsabilidad Limitada (C.R.L.)',
    'Sociedad Anónima (S.A.)', 'Sociedad de Responsabilidad Limitada (S.R.L.)',
    'Cooperativa', 'Asociación Civil', 'Fundación', 'ONG',
    'Empresa Pública', 'Persona Natural con Actividad Económica', 'Otro',
];

const REGIMENES_IVA = ['General', 'Especial', 'Simplificado', 'Exento'];

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
    tipo_empresa: z.string().min(1, 'Seleccione el tipo de empresa'),
    repNombre: z.string().min(2, 'Ingrese el nombre'),
    repEmail: z.string().email('Correo inválido'),
    password: z.string()
        .min(8, 'Mínimo 8 caracteres')
        .regex(/[A-Z]/, 'Debe contener una mayúscula')
        .regex(/[0-9]/, 'Debe contener un número'),
    confirmPassword: z.string(),
    estado_empresa: z.string().min(1, 'Seleccione el estado'),
    municipio_empresa: z.string().min(2, 'Seleccione el municipio'),
    telefono: z.string().min(7, 'Teléfono inválido'),
    regimen_iva: z.string().optional(),
}).refine(d => d.password === d.confirmPassword, {
    message: 'Las contraseñas no coinciden', path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

export default function RegisterContabilidadPage() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const { register, handleSubmit, control, watch, setValue, trigger, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            regimen_iva: 'General',
        },
    });

    const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

    const estadoEmpresa = watch('estado_empresa');
    const watchedPassword = watch('password');

    const stepFields: Record<number, (keyof FormData)[]> = {
        1: ['razonSocial', 'rif', 'tipo_empresa', 'repNombre', 'repEmail', 'password', 'confirmPassword'],
        2: ['estado_empresa', 'municipio_empresa', 'telefono'],
    };

    const nextStep = async () => {
        const fields = stepFields[step];
        if (fields) {
            const valid = await trigger(fields);
            if (!valid) return;
        }
        if (step === 2) {
            return;
        }
        setStep(s => s + 1);
    };

    const prevStep = () => setStep(s => s - 1);

    const onSubmit = async (data: FormData) => {
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
        { title: 'Datos de la Empresa', desc: 'Identificación y acceso', icon: Building },
        { title: 'Ubicación', desc: 'Estado, municipio y contacto', icon: Calculator },
        { title: '¡Listo!', desc: 'Cuenta registrada', icon: CheckCircle },
    ];

    const currentStep = stepTitles[step - 1];
    const StepIcon = currentStep.icon;

    const passwordChecks = [
        { label: '8+ caracteres', ok: (watchedPassword || '').length >= 8 },
        { label: '1 mayúscula', ok: /[A-Z]/.test(watchedPassword || '') },
        { label: '1 número', ok: /[0-9]/.test(watchedPassword || '') },
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-xl min-h-screen flex items-start justify-center pt-16">
            <Card className="w-full border-none shadow-2xl bg-card/60 backdrop-blur-xl rounded-[2rem] overflow-hidden">
                <CardHeader className="p-8 border-b border-border/50 bg-muted/5">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                            <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-primary">Registro · Asesoría Contable</CardTitle>
                            <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">Contabilidad · RRHH · Nómina · Fiscal</CardDescription>
                        </div>
                    </div>
                    {step < TOTAL_STEPS && (
                        <>
                            <Progress value={progress} className="h-1 mb-4" />
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/5 rounded-lg">
                                    <StepIcon className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-tight text-foreground">{currentStep.title}</p>
                                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{currentStep.desc} · Paso {step} de {TOTAL_STEPS - 1}</p>
                                </div>
                            </div>
                        </>
                    )}
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="p-8 space-y-6">

                        {step === 1 && (
                            <div className="space-y-5">
                                <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Registra tu empresa en 2 pasos</p>
                                    <p className="text-[9px] text-muted-foreground mt-0.5">Solo necesitamos lo esencial. Podrás completar tu perfil después.</p>
                                </div>

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
                                </div>

                                <div className="h-px bg-border/30" />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2 space-y-2">
                                        <Label htmlFor="repNombre" className="text-[10px] font-black uppercase tracking-widest">Nombre Completo *</Label>
                                        <Input id="repNombre" placeholder="Juan Pérez" {...register('repNombre')} className={cn(errors.repNombre && 'border-destructive')} />
                                        {errors.repNombre && <p className="text-[10px] text-destructive">{errors.repNombre.message}</p>}
                                    </div>
                                    <div className="sm:col-span-2 space-y-2">
                                        <Label htmlFor="repEmail" className="text-[10px] font-black uppercase tracking-widest">Correo Electrónico *</Label>
                                        <Input id="repEmail" type="email" placeholder="tu@empresa.com" {...register('repEmail')} className={cn(errors.repEmail && 'border-destructive')} />
                                        {errors.repEmail && <p className="text-[10px] text-destructive">{errors.repEmail.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest">Contraseña *</Label>
                                        <div className="relative">
                                            <Input id="password" type={showPassword ? 'text' : 'password'} {...register('password')} className={cn('pr-10', errors.password && 'border-destructive')} />
                                            <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" tabIndex={-1}>
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        <div className="flex gap-3 mt-1.5">
                                            {passwordChecks.map((c, i) => (
                                                <span key={i} className={cn("text-[9px] font-bold flex items-center gap-1", c.ok ? "text-emerald-500" : "text-muted-foreground/50")}>
                                                    {c.ok ? <Check className="h-3 w-3" /> : <span className="w-3 h-3 rounded-full border border-current inline-flex" />}
                                                    {c.label}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword" className="text-[10px] font-black uppercase tracking-widest">Confirmar *</Label>
                                        <Input id="confirmPassword" type={showPassword ? 'text' : 'password'} {...register('confirmPassword')} className={cn(errors.confirmPassword && 'border-destructive')} />
                                        {errors.confirmPassword && <p className="text-[10px] text-destructive">{errors.confirmPassword.message}</p>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-5">
                                <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Ubicación y contacto</p>
                                    <p className="text-[9px] text-muted-foreground mt-0.5">Último paso. El régimen IVA lo puedes ajustar después.</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Estado *</Label>
                                        <Controller name="estado_empresa" control={control} render={({ field }) => (
                                            <Select onValueChange={(v) => { field.onChange(v); setValue('municipio_empresa', ''); }} value={field.value}>
                                                <SelectTrigger className={cn(errors.estado_empresa && 'border-destructive')}><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                                                <SelectContent>{ESTADOS_VE.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
                                            </Select>
                                        )} />
                                        {errors.estado_empresa && <p className="text-[10px] text-destructive">{errors.estado_empresa.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Municipio *</Label>
                                        <Controller name="municipio_empresa" control={control} render={({ field }) => (
                                            <Select value={field.value} onValueChange={field.onChange} disabled={!estadoEmpresa}>
                                                <SelectTrigger className={cn(errors.municipio_empresa && 'border-destructive')}>
                                                    <SelectValue placeholder={estadoEmpresa ? 'Selecciona el municipio' : 'Primero selecciona el estado'} />
                                                </SelectTrigger>
                                                <SelectContent>{getMunicipios(estadoEmpresa || '').map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                                            </Select>
                                        )} />
                                        {errors.municipio_empresa && <p className="text-[10px] text-destructive">{errors.municipio_empresa.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="telefono" className="text-[10px] font-black uppercase tracking-widest">Teléfono *</Label>
                                        <Input id="telefono" type="tel" placeholder="0412-1234567" {...register('telefono')} className={cn(errors.telefono && 'border-destructive')} />
                                        {errors.telefono && <p className="text-[10px] text-destructive">{errors.telefono.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Régimen IVA</Label>
                                        <Controller name="regimen_iva" control={control} render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value || 'General'}>
                                                <SelectTrigger><SelectValue placeholder="General" /></SelectTrigger>
                                                <SelectContent>{REGIMENES_IVA.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                                            </Select>
                                        )} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === TOTAL_STEPS && (
                            <div className="text-center py-8 space-y-4">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-2">
                                    <CheckCircle className="h-12 w-12 text-green-500" />
                                </div>
                                <h2 className="text-2xl font-black uppercase italic tracking-tight">¡Cuenta Creada!</h2>
                                <p className="text-muted-foreground text-sm">Tu empresa fue registrada en <strong className="text-primary">Asesoría Contable</strong>.</p>
                                <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl text-left text-xs space-y-2">
                                    <p className="font-black text-primary uppercase tracking-widest">Módulos habilitados:</p>
                                    {MODULES_CONTABILIDAD.map(m => <p key={m.id} className="text-muted-foreground flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-500" /> {m.label}</p>)}
                                </div>
                                <Button className="w-full mt-4" onClick={() => { router.push('/resumen-negocio' as any); }}>
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
                            {step === 1 && <Button type="button" onClick={nextStep}>Siguiente<ArrowRight className="ml-2 h-4 w-4" /></Button>}
                            {step === 2 && (
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Registrando...</> : <>Crear Cuenta<ShieldCheck className="ml-2 h-4 w-4" /></>}
                                </Button>
                            )}
                        </CardFooter>
                    )}
                    {step < TOTAL_STEPS && (
                        <p className="text-center text-xs text-muted-foreground pb-6">
                            ¿Ya tienes cuenta? <Link href="/login-empresa" className="text-primary font-semibold hover:underline">Iniciar sesión</Link>
                        </p>
                    )}
                </form>
            </Card>
        </div>
    );
}
