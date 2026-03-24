'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, CircleCheck as CheckCircle, ArrowRight, ArrowLeft, Eye, EyeOff, Signal, ShieldCheck, RefreshCw, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';

const TOTAL_STEPS = 5;

const ESTADOS_VE = [
    'Amazonas','Anzoátegui','Apure','Aragua','Barinas','Bolívar','Carabobo',
    'Cojedes','Delta Amacuro','Dependencias Federales','Distrito Capital','Falcón',
    'Guárico','Lara','Mérida','Miranda','Monagas','Nueva Esparta','Portuguesa',
    'Sucre','Táchira','Trujillo','La Guaira','Yaracuy','Zulia',
];

const TIPOS_PLAN = ['Plan Básico 4G','Plan Estándar 4G/LTE','Plan Pro 5G','Plan Empresarial 5G','Plan Flota Corporativa','Plan Datos Solo','Plan Voz y Datos','Plan Internacional'];
const TECNOLOGIAS = ['4G LTE','5G NSA','5G SA','Banda Dual (4G/5G)','Fibra Óptica'];
const TIPOS_CLIENTE = ['Personal — Persona Natural','Empresarial — Personas Jurídica'];
const TIPOS_DOCUMENTO = ['Cédula de Identidad (V)','Cédula de Identidad (E)','Pasaporte','RIF'];

const schemaPersonal = z.object({
    tipo_cliente: z.string().min(1, 'Seleccione el tipo de cliente'),
    nombre: z.string().min(2, 'Ingrese el nombre'),
    apellido: z.string().min(2, 'Ingrese el apellido'),
    tipo_documento: z.string().min(1, 'Seleccione el tipo de documento'),
    cedula: z.string().min(6, 'Documento inválido'),
    telefono_contacto: z.string().min(7, 'Teléfono inválido'),
    tipo_plan: z.string().min(1, 'Seleccione el plan'),
    tecnologia: z.string().min(1, 'Seleccione la tecnología'),
    numero_portar: z.string().optional(),
    iccid_esim: z.string().optional(),
    estado_servicio: z.string().min(1, 'Seleccione el estado'),
    municipio_servicio: z.string().min(2, 'Ingrese el municipio'),
    direccion_servicio: z.string().min(5, 'Ingrese la dirección de servicio'),
    email: z.string().email('Correo inválido'),
    password: z.string().min(8,'Mínimo 8 caracteres').regex(/[A-Z]/,'Una mayúscula').regex(/[0-9]/,'Un número'),
    confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { message:'Las contraseñas no coinciden', path:['confirmPassword'] });

type FormData = z.infer<typeof schemaPersonal>;

const MODULES_TELECOM = [
    { id: 'linea-personal', label: 'Mi Línea Personal' },
    { id: 'gestion-lineas', label: 'Gestión de Líneas' },
    { id: 'esim-provisioning', label: 'eSIM Provisioning' },
    { id: 'telemetria-red', label: 'Telemetría de Red' },
];

export default function RegisterTelecomPage() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [verifMethod, setVerifMethod] = useState<'email'|'sms'>('email');
    const [verifCode, setVerifCode] = useState('');
    const [verifSent, setVerifSent] = useState(false);
    const [verifVerified, setVerifVerified] = useState(false);
    const [verifLoading, setVerifLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const router = useRouter();
    const { toast } = useToast();

    const { register, handleSubmit, control, getValues, trigger, watch, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schemaPersonal), mode: 'onChange',
    });

    const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100;
    const tipoCliente = watch('tipo_cliente');

    const stepFields: Record<number, (keyof FormData)[]> = {
        1: ['tipo_cliente','nombre','apellido','tipo_documento','cedula','telefono_contacto'],
        2: ['tipo_plan','tecnologia'],
        3: ['estado_servicio','municipio_servicio','direccion_servicio','email','password','confirmPassword'],
    };

    const nextStep = async () => {
        const fields = stepFields[step];
        if (fields) { const v = await trigger(fields); if (!v) return; }
        setStep(s => s + 1);
    };

    const startCountdown = () => {
        setCountdown(60);
        const i = setInterval(() => setCountdown(c => { if (c <= 1) { clearInterval(i); return 0; } return c - 1; }), 1000);
    };

    const sendVerificationCode = async () => {
        setVerifLoading(true);
        try {
            const res = await fetch('/api/auth/send-code', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ method: verifMethod, email: getValues('email'), phone: getValues('telefono_contacto') }),
            });
            if (!res.ok) throw new Error((await res.json()).error);
            setVerifSent(true); startCountdown();
            toast({ title: 'Código enviado' });
        } catch (e: any) { toast({ title: 'Error', description: e.message, variant: 'destructive' }); }
        finally { setVerifLoading(false); }
    };

    const verifyCode = async () => {
        setVerifLoading(true);
        try {
            const res = await fetch('/api/auth/verify-code', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ method: verifMethod, email: getValues('email'), phone: getValues('telefono_contacto'), code: verifCode }),
            });
            if (!res.ok) throw new Error((await res.json()).error);
            setVerifVerified(true);
            toast({ title: '¡Verificado!' });
        } catch (e: any) { toast({ title: 'Código incorrecto', description: e.message, variant: 'destructive' }); }
        finally { setVerifLoading(false); }
    };

    const onSubmit = async (data: FormData) => {
        if (!verifVerified) { toast({ title:'Verificación pendiente', variant:'destructive' }); return; }
        setIsLoading(true);
        const esEmpresa = data.tipo_cliente?.includes('Empresarial');
        try {
            const body = esEmpresa ? {
                tipo: 'juridico',
                razonSocial: `${data.nombre} ${data.apellido}`,
                rif: data.cedula,
                tipo_empresa: 'Telecom Empresarial',
                actividad_economica: `Servicio de telecomunicaciones — ${data.tipo_plan}`,
                telefono: data.telefono_contacto,
                estado_empresa: data.estado_servicio,
                municipio_empresa: data.municipio_servicio,
                direccion: data.direccion_servicio,
                repNombre: data.nombre,
                repApellido: data.apellido,
                repCedula: data.cedula,
                rep_cargo: 'Titular',
                rep_telefono: data.telefono_contacto,
                repEmail: data.email,
                password: data.password,
                email_verificado: verifMethod === 'email',
                telefono_verificado: verifMethod === 'sms',
                modules: MODULES_TELECOM,
            } : {
                tipo: 'natural',
                nombre: data.nombre,
                apellido: data.apellido,
                cedula: data.cedula,
                telefono: data.telefono_contacto,
                estado_residencia: data.estado_servicio,
                municipio: data.municipio_servicio,
                ciudad: data.municipio_servicio,
                direccion: data.direccion_servicio,
                email: data.email,
                password: data.password,
                email_verificado: verifMethod === 'email',
                telefono_verificado: verifMethod === 'sms',
            };

            const res = await fetch('/api/auth/register', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error);
            setStep(TOTAL_STEPS);
        } catch (e: any) { toast({ title: 'Error de registro', description: e.message, variant: 'destructive' }); }
        finally { setIsLoading(false); }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl min-h-screen flex items-start justify-center pt-16">
            <Card className="w-full border-none shadow-2xl bg-card/60 backdrop-blur-xl rounded-[2rem] overflow-hidden">
                <CardHeader className="p-8 border-b border-border/50 bg-muted/5">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                            <Signal className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                            <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Registro · Mis Líneas</CardTitle>
                            <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">Mi Línea 5G · eSIM · Flota Corporativa · Telemetría</CardDescription>
                        </div>
                    </div>
                    <Progress value={progress} className="h-1 mb-4" />
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Paso {step} de {TOTAL_STEPS}</p>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="p-8 space-y-5">

                        {step === 1 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2 space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">Tipo de Cliente *</Label>
                                    <Controller name="tipo_cliente" control={control} render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className={cn(errors.tipo_cliente && 'border-destructive')}><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                                            <SelectContent>{TIPOS_CLIENTE.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                        </Select>
                                    )} />
                                    {errors.tipo_cliente && <p className="text-[10px] text-destructive">{errors.tipo_cliente.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">{tipoCliente?.includes('Empresa') ? 'Nombre Rep. Legal *' : 'Nombre *'}</Label>
                                    <Input {...register('nombre')} className={cn(errors.nombre && 'border-destructive')} />
                                    {errors.nombre && <p className="text-[10px] text-destructive">{errors.nombre.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">{tipoCliente?.includes('Empresa') ? 'Apellido Rep. Legal *' : 'Apellido *'}</Label>
                                    <Input {...register('apellido')} className={cn(errors.apellido && 'border-destructive')} />
                                    {errors.apellido && <p className="text-[10px] text-destructive">{errors.apellido.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">Tipo de Documento *</Label>
                                    <Controller name="tipo_documento" control={control} render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className={cn(errors.tipo_documento && 'border-destructive')}><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                                            <SelectContent>{TIPOS_DOCUMENTO.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                        </Select>
                                    )} />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">Número de Documento *</Label>
                                    <Input placeholder="12345678 / J-12345678-9" {...register('cedula')} className={cn(errors.cedula && 'border-destructive')} />
                                    {errors.cedula && <p className="text-[10px] text-destructive">{errors.cedula.message}</p>}
                                </div>
                                <div className="sm:col-span-2 space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">Teléfono de Contacto *</Label>
                                    <Input type="tel" placeholder="0412-XXXXXXX" {...register('telefono_contacto')} className={cn(errors.telefono_contacto && 'border-destructive')} />
                                    {errors.telefono_contacto && <p className="text-[10px] text-destructive">{errors.telefono_contacto.message}</p>}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 mb-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-2">
                                        <Smartphone className="h-3.5 w-3.5" /> Configuración de Línea
                                    </p>
                                    <p className="text-[9px] text-muted-foreground">Configura tu línea Mi Línea 5G. Si tienes un número a portar, ingrésalo aquí.</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Plan Seleccionado *</Label>
                                        <Controller name="tipo_plan" control={control} render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className={cn(errors.tipo_plan && 'border-destructive')}><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                                                <SelectContent>{TIPOS_PLAN.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                            </Select>
                                        )} />
                                        {errors.tipo_plan && <p className="text-[10px] text-destructive">{errors.tipo_plan.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Tecnología de Red *</Label>
                                        <Controller name="tecnologia" control={control} render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className={cn(errors.tecnologia && 'border-destructive')}><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                                                <SelectContent>{TECNOLOGIAS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                            </Select>
                                        )} />
                                        {errors.tecnologia && <p className="text-[10px] text-destructive">{errors.tecnologia.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">Número a Portar (si aplica)</Label>
                                        <Input placeholder="04XX-XXXXXXX" {...register('numero_portar')} />
                                        <p className="text-[8px] text-muted-foreground">Opcional — Solo si deseas portar un número existente</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">ICCID eSIM (si aplica)</Label>
                                        <Input placeholder="89580..." {...register('iccid_esim')} />
                                        <p className="text-[8px] text-muted-foreground">Opcional — Para provisión de eSIM remota</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">Estado de Servicio *</Label>
                                    <Controller name="estado_servicio" control={control} render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className={cn(errors.estado_servicio && 'border-destructive')}><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                                            <SelectContent>{ESTADOS_VE.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
                                        </Select>
                                    )} />
                                    {errors.estado_servicio && <p className="text-[10px] text-destructive">{errors.estado_servicio.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">Municipio *</Label>
                                    <Input {...register('municipio_servicio')} className={cn(errors.municipio_servicio && 'border-destructive')} />
                                    {errors.municipio_servicio && <p className="text-[10px] text-destructive">{errors.municipio_servicio.message}</p>}
                                </div>
                                <div className="sm:col-span-2 space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">Dirección de Servicio *</Label>
                                    <Input {...register('direccion_servicio')} className={cn(errors.direccion_servicio && 'border-destructive')} />
                                    {errors.direccion_servicio && <p className="text-[10px] text-destructive">{errors.direccion_servicio.message}</p>}
                                </div>
                                <div className="sm:col-span-2 space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">Correo Electrónico *</Label>
                                    <Input type="email" {...register('email')} className={cn(errors.email && 'border-destructive')} />
                                    {errors.email && <p className="text-[10px] text-destructive">{errors.email.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">Contraseña *</Label>
                                    <div className="relative">
                                        <Input type={showPassword ? 'text' : 'password'} {...register('password')} className={cn('pr-10', errors.password && 'border-destructive')} />
                                        <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-[10px] text-destructive">{errors.password.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">Confirmar Contraseña *</Label>
                                    <Input type="password" {...register('confirmPassword')} className={cn(errors.confirmPassword && 'border-destructive')} />
                                    {errors.confirmPassword && <p className="text-[10px] text-destructive">{errors.confirmPassword.message}</p>}
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-6">
                                {!verifSent ? (
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">Elige cómo verificar tu identidad:</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {(['email','sms'] as const).map(m => (
                                                <button key={m} type="button" onClick={() => setVerifMethod(m)}
                                                    className={cn("p-4 rounded-xl border text-xs font-black uppercase tracking-widest transition-all", verifMethod === m ? "border-blue-500 bg-blue-500/5 text-blue-600" : "border-border text-muted-foreground")}>
                                                    {m === 'email' ? '📧 Correo' : '📱 SMS'}
                                                </button>
                                            ))}
                                        </div>
                                        <Button type="button" className="w-full" onClick={sendVerificationCode} disabled={verifLoading}>
                                            {verifLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Enviando...</> : 'Enviar Código de Activación'}
                                        </Button>
                                    </div>
                                ) : verifVerified ? (
                                    <div className="text-center py-6 space-y-3">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30">
                                            <CheckCircle className="h-10 w-10 text-green-500" />
                                        </div>
                                        <p className="font-black text-green-600 uppercase tracking-widest text-xs">Línea Verificada</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground text-center">Ingresa el código de activación de 6 dígitos.</p>
                                        <Input maxLength={6} value={verifCode} onChange={e => setVerifCode(e.target.value.replace(/\D/g,'').slice(0,6))} className="text-center text-2xl tracking-[0.5em] font-mono" />
                                        <Button type="button" className="w-full" onClick={verifyCode} disabled={verifLoading || verifCode.length !== 6}>
                                            {verifLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Verificando...</> : <><ShieldCheck className="mr-2 h-4 w-4"/>Activar Línea</>}
                                        </Button>
                                        <div className="text-center">
                                            {countdown > 0 ? <p className="text-xs text-muted-foreground">Reenviar en <strong>{countdown}s</strong></p> :
                                                <button type="button" onClick={sendVerificationCode} disabled={verifLoading} className="text-xs text-primary underline inline-flex items-center gap-1">
                                                    <RefreshCw className="h-3 w-3"/>Reenviar
                                                </button>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {step === TOTAL_STEPS && (
                            <div className="text-center py-8 space-y-4">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-2">
                                    <CheckCircle className="h-12 w-12 text-blue-500" />
                                </div>
                                <h2 className="text-2xl font-black uppercase italic tracking-tight">¡Línea Activada!</h2>
                                <p className="text-muted-foreground text-sm">Tu cuenta <strong className="text-blue-500">Mi Línea 5G</strong> fue registrada exitosamente.</p>
                                <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl text-left text-xs space-y-2">
                                    <p className="font-black text-blue-600 uppercase tracking-widest">Servicios habilitados:</p>
                                    {MODULES_TELECOM.map(m => <p key={m.id} className="text-muted-foreground">✓ {m.label}</p>)}
                                </div>
                                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700" onClick={() => { localStorage.setItem('kyron-just-registered','true'); router.push('/'); }}>
                                    Ir a Mis Líneas<ArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </div>
                        )}
                    </CardContent>

                    {step < TOTAL_STEPS && (
                        <CardFooter className="flex justify-between p-8 pt-2">
                            <Button type="button" variant="outline" onClick={() => setStep(s => s - 1)} disabled={step === 1}>
                                <ArrowLeft className="mr-2 h-4 w-4"/>Anterior
                            </Button>
                            {step < 3 && <Button type="button" onClick={nextStep}>Siguiente<ArrowRight className="ml-2 h-4 w-4"/></Button>}
                            {step === 3 && <Button type="button" onClick={nextStep}>Continuar<ArrowRight className="ml-2 h-4 w-4"/></Button>}
                            {step === 4 && (
                                <Button type="submit" disabled={isLoading || !verifVerified}>
                                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Activando...</> : <>Activar Línea<ArrowRight className="ml-2 h-4 w-4"/></>}
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
