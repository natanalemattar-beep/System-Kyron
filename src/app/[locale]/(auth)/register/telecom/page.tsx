'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, CircleCheck as CheckCircle, ArrowRight, ArrowLeft, Eye, EyeOff, Signal, ShieldCheck, RefreshCw, Smartphone, Building, User, Check, Crown, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { DocumentInput } from '@/components/document-input';
import { ESTADOS_VE, getMunicipios } from '@/lib/venezuela-geo';

const TOTAL_STEPS = 5;

const PLANES_TELECOM = [
    {
        id: 'Plan Básico 4G',
        nombre: 'Básico 4G',
        precioUsd: 5,
        descripcion: 'Ideal para quienes usan poco el teléfono',
        color: 'from-slate-500 to-gray-600',
        features: ['3 GB de datos 4G', '100 minutos nacionales', '50 SMS incluidos', 'Redes sociales básicas', 'Buzón de voz'],
    },
    {
        id: 'Plan Estándar 4G/LTE',
        nombre: 'Estándar LTE',
        precioUsd: 10,
        descripcion: 'El más popular para uso diario',
        popular: true,
        color: 'from-blue-500 to-cyan-500',
        features: ['10 GB de datos 4G/LTE', 'Llamadas ilimitadas nacionales', 'SMS ilimitados', 'Redes sociales ilimitadas', 'Roaming nacional incluido', 'Hotspot compartido'],
    },
    {
        id: 'Plan Pro 5G',
        nombre: 'Pro 5G',
        precioUsd: 18,
        descripcion: 'Velocidad premium con tecnología 5G',
        color: 'from-violet-500 to-purple-600',
        features: ['30 GB de datos 5G', 'Llamadas y SMS ilimitados', 'Streaming HD sin consumo', 'Prioridad de red 5G', 'Cloud storage 50 GB', 'Soporte prioritario 24/7'],
    },
    {
        id: 'Plan Empresarial 5G',
        nombre: 'Empresarial 5G',
        precioUsd: 30,
        descripcion: 'Para empresas con múltiples líneas',
        color: 'from-emerald-500 to-teal-600',
        features: ['50 GB de datos 5G por línea', 'Llamadas corporativas ilimitadas', 'Gestión de flota incluida', 'Panel admin multi-línea', 'VPN empresarial integrada', 'Facturación centralizada', 'SLA de alta disponibilidad'],
    },
    {
        id: 'Plan Datos Solo',
        nombre: 'Solo Datos',
        precioUsd: 7,
        descripcion: 'Solo internet, sin voz ni SMS',
        color: 'from-amber-500 to-orange-500',
        features: ['15 GB de datos 4G/LTE', 'Sin línea de voz', 'Ideal para tablets/módems', 'Hotspot ilimitado', 'Alertas de consumo'],
    },
    {
        id: 'Plan Internacional',
        nombre: 'Internacional',
        precioUsd: 25,
        descripcion: 'Roaming y llamadas internacionales',
        color: 'from-rose-500 to-pink-600',
        features: ['20 GB datos nacionales + 5 GB roaming', 'Llamadas internacionales 300 min', 'Roaming en 50+ países', 'WhatsApp internacional ilimitado', 'Traducción de llamadas con IA', 'eSIM compatible'],
    },
];
const TECNOLOGIAS = ['4G LTE','5G NSA','5G SA','Banda Dual (4G/5G)','Fibra Óptica'];
const TIPOS_EMPRESA_TELECOM = ['Compañía Anónima (C.A.)','S.A.','S.R.L.','Cooperativa','Persona Natural con Actividad Económica','Otro'];
const MOTIVOS_LINEA = ['Línea nueva (no tengo número)','Portar mi número actual','Segunda línea','Línea para empresa','Línea de datos (solo internet)'];

const baseSchema = z.object({
    tipo_cliente: z.enum(['personal','empresarial'], { required_error: 'Seleccione el tipo de cliente' }),

    nombre: z.string().min(2, 'Ingrese el nombre'),
    apellido: z.string().min(2, 'Ingrese el apellido'),
    cedula: z.string().min(6, 'Documento inválido'),

    tiene_telefono: z.boolean().default(false),
    telefono_contacto: z.string().optional(),
    motivo_linea: z.string().min(1, 'Seleccione el motivo'),
    numero_portar: z.string().optional(),

    razon_social: z.string().optional(),
    rif: z.string().optional(),
    tipo_empresa: z.string().optional(),
    cargo: z.string().optional(),
    nro_lineas: z.string().optional(),

    tipo_plan: z.string().min(1, 'Seleccione el plan'),
    tecnologia: z.string().min(1, 'Seleccione la tecnología'),
    iccid_esim: z.string().optional(),

    estado_servicio: z.string().min(1, 'Seleccione el estado'),
    municipio_servicio: z.string().min(2, 'Ingrese el municipio'),
    direccion_servicio: z.string().min(5, 'Ingrese la dirección de servicio'),

    email: z.string().email('Correo inválido'),
    password: z.string().min(8,'Mínimo 8 caracteres').regex(/[A-Z]/,'Una mayúscula').regex(/[0-9]/,'Un número'),
    confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, { message:'Las contraseñas no coinciden', path:['confirmPassword'] })
  .refine(d => {
      if (d.tiene_telefono && (!d.telefono_contacto || d.telefono_contacto.length < 7)) return false;
      return true;
  }, { message: 'Ingrese su número de teléfono', path: ['telefono_contacto'] })
  .refine(d => {
      if (d.tipo_cliente === 'empresarial' && (!d.razon_social || d.razon_social.length < 3)) return false;
      return true;
  }, { message: 'Ingrese la razón social', path: ['razon_social'] })
  .refine(d => {
      if (d.tipo_cliente === 'empresarial' && (!d.rif || !/^[JGCVEPF]-\d{8}-\d$/.test(d.rif))) return false;
      return true;
  }, { message: 'Formato RIF: J-50328471-6', path: ['rif'] })
  .refine(d => {
      if (d.motivo_linea === 'Portar mi número actual' && (!d.numero_portar || d.numero_portar.length < 7)) return false;
      return true;
  }, { message: 'Ingrese el número que desea portar', path: ['numero_portar'] });

type FormData = z.infer<typeof baseSchema>;

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
    const verifMethod = 'email' as const;
    const [verifCode, setVerifCode] = useState('');
    const [verifSent, setVerifSent] = useState(false);
    const [verifVerified, setVerifVerified] = useState(false);
    const [verifLoading, setVerifLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [docFromParams, setDocFromParams] = useState(false);
    const [tasaBcv, setTasaBcv] = useState<number | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
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

    const { register, handleSubmit, control, getValues, setValue, trigger, watch, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(baseSchema), mode: 'onChange',
        defaultValues: { tipo_cliente: 'personal', tiene_telefono: false },
    });

    useEffect(() => {
        const doc = searchParams.get('doc');
        if (doc) {
            setValue('cedula', doc);
            setDocFromParams(true);
            if (doc.startsWith('J-') || doc.startsWith('G-')) {
                setValue('tipo_cliente', 'empresarial');
                setValue('rif', doc);
            }
            const nombre = searchParams.get('nombre');
            if (nombre) setValue('nombre', nombre);
            const apellido = searchParams.get('apellido');
            if (apellido) setValue('apellido', apellido);
            const razon = searchParams.get('razon');
            if (razon) setValue('razon_social', razon);
            const tipo = searchParams.get('tipo');
            if (tipo) setValue('tipo_empresa', tipo);
            const tel = searchParams.get('tel');
            if (tel) {
                setValue('tiene_telefono', true);
                setValue('telefono_contacto', tel);
            }
            const estado = searchParams.get('estado');
            if (estado) setValue('estado_servicio', estado);
            const municipio = searchParams.get('municipio');
            if (municipio) setValue('municipio_servicio', municipio);
        }
    }, [searchParams, setValue]);

    const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100;
    const tipoCliente = watch('tipo_cliente');
    const tieneTelefono = watch('tiene_telefono');
    const motivoLinea = watch('motivo_linea');
    const estadoServicio = watch('estado_servicio');
    useEffect(() => { setValue('municipio_servicio', ''); }, [estadoServicio]);

    const stepFields: Record<number, (keyof FormData)[]> = {
        1: tipoCliente === 'empresarial'
            ? ['tipo_cliente','nombre','apellido','cedula','razon_social','rif']
            : ['tipo_cliente','nombre','apellido','cedula'],
        2: ['motivo_linea','tipo_plan','tecnologia'],
        3: ['estado_servicio','municipio_servicio','direccion_servicio','email','password','confirmPassword'],
    };

    const nextStep = async () => {
        const fields = stepFields[step];
        if (fields) { const v = await trigger(fields); if (!v) return; }
        if (step === 1 && tieneTelefono) {
            const phoneValid = await trigger('telefono_contacto');
            if (!phoneValid) return;
        }
        setStep(s => s + 1);
    };

    const startCountdown = () => {
        setCountdown(60);
        const i = setInterval(() => setCountdown(c => { if (c <= 1) { clearInterval(i); return 0; } return c - 1; }), 1000);
    };

    const sendVerificationCode = async () => {
        const destino = getValues('email');
        setVerifLoading(true);
        try {
            const res = await fetch('/api/auth/send-code', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destino, tipo: 'email' }),
            });
            if (!res.ok) throw new Error((await res.json()).error);
            setVerifSent(true); startCountdown();
            toast({ title: 'Código enviado' });
        } catch (e: any) { toast({ title: 'Error', description: e.message, variant: 'destructive' }); }
        finally { setVerifLoading(false); }
    };

    const verifyCode = async () => {
        const destino = getValues('email');
        setVerifLoading(true);
        try {
            const res = await fetch('/api/auth/verify-code', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destino, codigo: verifCode }),
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
        const esEmpresa = data.tipo_cliente === 'empresarial';
        try {
            const telecomMeta = {
                motivo_linea: data.motivo_linea,
                tipo_plan: data.tipo_plan,
                tecnologia: data.tecnologia,
                numero_portar: data.numero_portar || '',
                iccid_esim: data.iccid_esim || '',
                tiene_telefono: data.tiene_telefono,
            };

            const body = esEmpresa ? {
                tipo: 'juridico',
                razonSocial: data.razon_social,
                rif: data.rif,
                tipo_empresa: data.tipo_empresa || 'Telecom Empresarial',
                actividad_economica: `Servicio de telecomunicaciones — ${data.tipo_plan}`,
                telefono: data.telefono_contacto || '',
                estado_empresa: data.estado_servicio,
                municipio_empresa: data.municipio_servicio,
                direccion: data.direccion_servicio,
                repNombre: data.nombre,
                repApellido: data.apellido,
                repCedula: data.cedula,
                rep_cargo: data.cargo || 'Titular',
                rep_telefono: data.telefono_contacto || '',
                repEmail: data.email,
                password: data.password,
                email_verificado: true,
                telefono_verificado: false,
                nro_lineas: data.nro_lineas || '1',
                modules: [...MODULES_TELECOM, { id: 'flota-empresarial', label: 'Flota Empresarial' }],
                ...telecomMeta,
            } : {
                tipo: 'natural',
                nombre: data.nombre,
                apellido: data.apellido,
                cedula: data.cedula,
                telefono: data.telefono_contacto || '',
                estado_residencia: data.estado_servicio,
                municipio: data.municipio_servicio,
                ciudad: data.municipio_servicio,
                direccion: data.direccion_servicio,
                email: data.email,
                password: data.password,
                email_verificado: true,
                telefono_verificado: false,
                ...telecomMeta,
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
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">¿Tipo de cuenta? *</Label>
                                    <Controller name="tipo_cliente" control={control} render={({ field }) => (
                                        <div className="grid grid-cols-2 gap-3">
                                            <button type="button" onClick={() => field.onChange('personal')}
                                                className={cn("p-4 rounded-xl border text-left transition-all", field.value === 'personal' ? "border-blue-500 bg-blue-500/5" : "border-border")}>
                                                <User className={cn("h-5 w-5 mb-2", field.value === 'personal' ? "text-blue-500" : "text-muted-foreground/40")} />
                                                <p className="text-[10px] font-black uppercase tracking-widest">Personal</p>
                                                <p className="text-[8px] text-muted-foreground mt-1">Persona natural · Cédula</p>
                                            </button>
                                            <button type="button" onClick={() => field.onChange('empresarial')}
                                                className={cn("p-4 rounded-xl border text-left transition-all", field.value === 'empresarial' ? "border-blue-500 bg-blue-500/5" : "border-border")}>
                                                <Building className={cn("h-5 w-5 mb-2", field.value === 'empresarial' ? "text-blue-500" : "text-muted-foreground/40")} />
                                                <p className="text-[10px] font-black uppercase tracking-widest">Empresarial</p>
                                                <p className="text-[8px] text-muted-foreground mt-1">Persona jurídica · RIF</p>
                                            </button>
                                        </div>
                                    )} />
                                </div>

                                {tipoCliente === 'empresarial' && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
                                        <div className="sm:col-span-2">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                                                <Building className="h-3.5 w-3.5" /> Datos de la Empresa
                                            </p>
                                        </div>
                                        <div className="sm:col-span-2 space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest">Razón Social *</Label>
                                            <Input placeholder="Mi Empresa C.A." {...register('razon_social')} className={cn(errors.razon_social && 'border-destructive')} />
                                            {errors.razon_social && <p className="text-[10px] text-destructive">{errors.razon_social.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest">RIF *</Label>
                                            <Controller name="rif" control={control} render={({ field }) => (
                                                <DocumentInput type="rif" value={field.value || ''} onChange={field.onChange} error={!!errors.rif} />
                                            )} />
                                            {errors.rif && <p className="text-[10px] text-destructive">{errors.rif.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest">Tipo de Empresa</Label>
                                            <Controller name="tipo_empresa" control={control} render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                                                    <SelectContent>{TIPOS_EMPRESA_TELECOM.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                                </Select>
                                            )} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest">Cargo del Solicitante</Label>
                                            <Input placeholder="Gerente, Director..." {...register('cargo')} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest">N° de Líneas Requeridas</Label>
                                            <Input type="number" placeholder="1" {...register('nro_lineas')} />
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">{tipoCliente === 'empresarial' ? 'Nombre del Representante *' : 'Nombre *'}</Label>
                                        <Input {...register('nombre')} className={cn(errors.nombre && 'border-destructive')} />
                                        {errors.nombre && <p className="text-[10px] text-destructive">{errors.nombre.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">{tipoCliente === 'empresarial' ? 'Apellido del Representante *' : 'Apellido *'}</Label>
                                        <Input {...register('apellido')} className={cn(errors.apellido && 'border-destructive')} />
                                        {errors.apellido && <p className="text-[10px] text-destructive">{errors.apellido.message}</p>}
                                    </div>
                                    <div className="sm:col-span-2 space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">{tipoCliente === 'empresarial' ? 'Cédula del Representante *' : 'Cédula de Identidad *'}</Label>
                                        {docFromParams ? (
                                            <div className="flex items-center gap-3 p-3 rounded-xl border border-green-500/30 bg-green-500/5">
                                                <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                                                <div className="flex-1">
                                                    <p className="text-sm font-mono font-bold text-foreground">{watch('cedula')}</p>
                                                    <p className="text-[9px] text-green-600 dark:text-green-400 font-bold uppercase tracking-widest">Detectada automáticamente</p>
                                                </div>
                                                <Button type="button" variant="ghost" size="sm" className="h-7 text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground" onClick={() => { setDocFromParams(false); setValue('cedula', ''); }}>
                                                    Cambiar
                                                </Button>
                                            </div>
                                        ) : (
                                            <Controller name="cedula" control={control} render={({ field }) => (
                                                <DocumentInput type="cedula" value={field.value || ''} onChange={field.onChange} error={!!errors.cedula} />
                                            )} />
                                        )}
                                        {errors.cedula && <p className="text-[10px] text-destructive">{errors.cedula.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-3 p-4 rounded-xl border border-border bg-muted/5">
                                    <div className="flex items-center gap-3">
                                        <Controller name="tiene_telefono" control={control} render={({ field }) => (
                                            <Checkbox
                                                id="tiene_telefono"
                                                checked={field.value}
                                                onCheckedChange={(checked) => {
                                                    field.onChange(checked);
                                                    if (!checked) {
                                                        setValue('telefono_contacto', '');
                                                    }
                                                }}
                                            />
                                        )} />
                                        <Label htmlFor="tiene_telefono" className="text-[10px] font-black uppercase tracking-widest cursor-pointer">
                                            Ya poseo un número de teléfono
                                        </Label>
                                    </div>
                                    {tieneTelefono && (
                                        <div className="space-y-2 mt-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Número Actual</Label>
                                            <Input type="tel" placeholder="0412-XXXXXXX" {...register('telefono_contacto')} className={cn(errors.telefono_contacto && 'border-destructive')} />
                                            {errors.telefono_contacto && <p className="text-[10px] text-destructive">{errors.telefono_contacto.message}</p>}
                                        </div>
                                    )}
                                    {!tieneTelefono && (
                                        <p className="text-[9px] text-muted-foreground italic">
                                            No te preocupes — al activar tu línea recibirás un nuevo número de Mi Línea 5G.
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-5">
                                <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 mb-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-2">
                                        <Smartphone className="h-3.5 w-3.5" /> Selecciona tu Plan
                                    </p>
                                    <p className="text-[9px] text-muted-foreground">Elige el plan que mejor se adapte a tus necesidades. Podrás cambiarlo después.</p>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">¿Qué necesitas? *</Label>
                                    <Controller name="motivo_linea" control={control} render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className={cn(errors.motivo_linea && 'border-destructive')}><SelectValue placeholder="Seleccionar motivo..." /></SelectTrigger>
                                            <SelectContent>{MOTIVOS_LINEA.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                        </Select>
                                    )} />
                                    {errors.motivo_linea && <p className="text-[10px] text-destructive">{errors.motivo_linea.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest">Plan Seleccionado *</Label>
                                    {tasaBcv && <p className="text-[8px] text-muted-foreground/60 mb-1">Tasa BCV del día: 1 USD = Bs. {tasaBcv.toFixed(2)}</p>}
                                    {errors.tipo_plan && <p className="text-[10px] text-destructive mb-1">{errors.tipo_plan.message}</p>}
                                    <Controller name="tipo_plan" control={control} render={({ field }) => (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {PLANES_TELECOM.map(plan => {
                                                const selected = field.value === plan.id;
                                                return (
                                                    <button
                                                        key={plan.id}
                                                        type="button"
                                                        onClick={() => field.onChange(plan.id)}
                                                        aria-label={`Seleccionar ${plan.nombre}`}
                                                        className={cn(
                                                            "relative p-4 rounded-xl border text-left transition-all duration-200 group",
                                                            selected
                                                                ? "border-blue-500 bg-blue-500/5 ring-1 ring-blue-500/30 shadow-lg shadow-blue-500/10"
                                                                : "border-border/50 bg-muted/10 hover:border-blue-500/30 hover:bg-blue-500/[0.02]"
                                                        )}
                                                    >
                                                        {'popular' in plan && plan.popular && (
                                                            <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                                                                <Crown className="h-2.5 w-2.5" /> Popular
                                                            </span>
                                                        )}
                                                        <div className="flex items-start justify-between mb-2">
                                                            <div>
                                                                <div className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest mb-1.5", selected ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" : "bg-muted/30 text-muted-foreground")}>
                                                                    <Zap className="h-2.5 w-2.5" />
                                                                    {plan.nombre}
                                                                </div>
                                                                <p className="text-sm font-black text-foreground">${plan.precioUsd}/mes</p>
                                                                {tasaBcv && <p className="text-[9px] text-muted-foreground/70">Bs. {(plan.precioUsd * tasaBcv).toFixed(2)}</p>}
                                                            </div>
                                                            <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-all", selected ? "border-blue-500 bg-blue-500" : "border-muted-foreground/30")}>
                                                                {selected && <Check className="h-3 w-3 text-white" />}
                                                            </div>
                                                        </div>
                                                        <p className="text-[10px] text-muted-foreground mb-2.5">{plan.descripcion}</p>
                                                        <div className="space-y-1">
                                                            {plan.features.map((f, i) => (
                                                                <div key={i} className="flex items-center gap-1.5">
                                                                    <Check className={cn("h-3 w-3 shrink-0", selected ? "text-blue-500" : "text-muted-foreground/40")} />
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

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                    {(motivoLinea === 'Portar mi número actual') && (
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest">Número a Portar *</Label>
                                            <Input placeholder="04XX-XXXXXXX" {...register('numero_portar')} className={cn(errors.numero_portar && 'border-destructive')} />
                                            {errors.numero_portar && <p className="text-[10px] text-destructive">{errors.numero_portar.message}</p>}
                                            <p className="text-[8px] text-muted-foreground">Ingresa el número que deseas trasladar a Mi Línea 5G</p>
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest">ICCID eSIM (opcional)</Label>
                                        <Input placeholder="89580..." {...register('iccid_esim')} />
                                        <p className="text-[8px] text-muted-foreground">Solo si tienes un chip eSIM físico</p>
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
                                    <Controller name="municipio_servicio" control={control} render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange} disabled={!estadoServicio}>
                                            <SelectTrigger className={cn(errors.municipio_servicio && 'border-destructive')}>
                                                <SelectValue placeholder={estadoServicio ? 'Selecciona el municipio' : 'Primero selecciona el estado'} />
                                            </SelectTrigger>
                                            <SelectContent>{getMunicipios(estadoServicio || '').map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                                        </Select>
                                    )} />
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
                                <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-1">Verificación por Correo Electrónico</p>
                                    <p className="text-[9px] text-muted-foreground">Enviaremos un código de 6 dígitos a <strong className="text-foreground">{getValues('email')}</strong> para verificar tu identidad.</p>
                                </div>
                                {!verifSent ? (
                                    <div className="space-y-4">
                                        <Button type="button" className="w-full" onClick={sendVerificationCode} disabled={verifLoading}>
                                            {verifLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Enviando...</> : 'Enviar Código de Verificación'}
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
                                <p className="text-muted-foreground text-sm">Tu cuenta <strong className="text-blue-500">{tipoCliente === 'empresarial' ? 'Flota Empresarial 5G' : 'Mi Línea 5G'}</strong> fue registrada exitosamente.</p>
                                {getValues('tipo_plan') && (() => {
                                    const planSel = PLANES_TELECOM.find(p => p.id === getValues('tipo_plan'));
                                    return planSel ? (
                                        <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl text-xs">
                                            <p className="font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Plan seleccionado:</p>
                                            <p className="text-muted-foreground">{planSel.nombre} — ${planSel.precioUsd}/mes{tasaBcv ? ` (Bs. ${(planSel.precioUsd * tasaBcv).toFixed(2)})` : ''}</p>
                                        </div>
                                    ) : null;
                                })()}
                                <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl text-left text-xs space-y-2">
                                    <p className="font-black text-blue-600 uppercase tracking-widest">Servicios habilitados:</p>
                                    {MODULES_TELECOM.map(m => <p key={m.id} className="text-muted-foreground">✓ {m.label}</p>)}
                                    {tipoCliente === 'empresarial' && <p className="text-muted-foreground">✓ Flota Empresarial</p>}
                                </div>
                                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700" onClick={() => { router.push('/'); }}>
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
