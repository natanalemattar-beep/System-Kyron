'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from '@/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
    Loader2, CircleCheck as CheckCircle, ArrowRight, ArrowLeft, Eye, EyeOff,
    Building, BookOpen, ShieldCheck, Check, Star, Crown, Zap,
    Mail, RefreshCw, Fingerprint, Calculator, FileText, Users, Headphones,
    TrendingUp, Shield, BarChart3, Lock, Phone, MessageCircle,
    Landmark, ShoppingCart,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useVerificationPoll } from '@/hooks/use-verification-poll';
import { useAuth } from '@/lib/auth/context';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { DocumentInput } from '@/components/document-input';
import { ESTADOS_VE, getMunicipios, getCiudades } from '@/lib/venezuela-geo';

const PLANES = [
    {
        id: 'basico',
        nombre: 'Básico',
        precio: 12,
        icon: BookOpen,
        color: 'lightblue',
        popular: false,
        descripcion: 'Contabilidad simple para emprendedores',
        features: ['Libro diario y mayor', 'Balance general', 'Estado de resultados', 'Hasta 200 asientos/mes', 'IA Kyron: 10 consultas/mes'],
    },
    {
        id: 'profesional',
        nombre: 'Profesional',
        precio: 28,
        icon: Zap,
        color: 'green',
        popular: true,
        descripcion: 'Facturación electrónica y cumplimiento fiscal',
        features: ['Todo del Básico', 'Facturación SENIAT', 'Declaración IVA', 'Conciliación bancaria', 'IA Kyron: 50 consultas/mes'],
    },
    {
        id: 'empresarial',
        nombre: 'Empresarial',
        precio: 52,
        icon: Building,
        color: 'darkblue',
        popular: false,
        descripcion: 'Multi-usuario con retenciones y nómina',
        features: ['Todo del Profesional', 'Retenciones IVA/ISLR', 'Multi-usuario (5)', 'Nómina básica', 'IA Kyron: 200 consultas/mes'],
    },
    {
        id: 'premium',
        nombre: 'Premium',
        precio: 95,
        icon: Crown,
        color: 'neon',
        popular: false,
        descripcion: 'Solución completa con IA ilimitada y asesoría',
        features: ['Todo del Empresarial', 'IA Kyron ilimitada', 'Usuarios ilimitados', 'Soporte prioritario 24/7'],
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

interface ModuleVariant {
    title: string;
    subtitle: string;
    icon: React.ElementType;
    gradient: string;
    portalLabel: string;
    successLabel: string;
    modules: { id: string; label: string }[];
    summaryIcons: { icon: React.ElementType; label: string }[];
}

const MODULE_VARIANTS: Record<string, ModuleVariant> = {
    'asesoria-contable': {
        title: 'Asesoría Contable',
        subtitle: 'System Kyron',
        icon: Calculator,
        gradient: 'linear-gradient(135deg, #1e3a5f, #2563eb)',
        portalLabel: 'Portal Contable',
        successLabel: 'Asesoría Contable',
        modules: MODULES_CONTABILIDAD,
        summaryIcons: [
            { icon: Calculator, label: 'Contabilidad' },
            { icon: FileText, label: 'Facturación' },
            { icon: TrendingUp, label: 'Análisis' },
        ],
    },
    'asesoria-comunal': {
        title: 'Gestión Comunal',
        subtitle: 'Contraloría Social',
        icon: Building,
        gradient: 'linear-gradient(135deg, #c2410c, #ea580c)',
        portalLabel: 'Portal Comunal',
        successLabel: 'Gestión Comunal',
        modules: [
            { id: 'contabilidad-comunal', label: 'Contabilidad Comunal' },
            { id: 'rendicion-cuentas', label: 'Rendición de Cuentas' },
            { id: 'presupuesto-participativo', label: 'Presupuesto Participativo' },
            { id: 'contraloria-social', label: 'Contraloría Social' },
        ],
        summaryIcons: [
            { icon: Building, label: 'Comunal' },
            { icon: FileText, label: 'Rendición' },
            { icon: Shield, label: 'Contraloría' },
        ],
    },
    'gestion-publica': {
        title: 'Gestión Pública',
        subtitle: 'Presupuesto & SIGECOF',
        icon: Landmark,
        gradient: 'linear-gradient(135deg, #b45309, #d97706)',
        portalLabel: 'Portal Gobierno',
        successLabel: 'Gestión Pública',
        modules: [
            { id: 'presupuesto-publico', label: 'Presupuesto Público' },
            { id: 'sigecof', label: 'SIGECOF' },
            { id: 'rendicion-cgr', label: 'Rendición CGR' },
            { id: 'onapre', label: 'ONAPRE' },
            { id: 'transparencia', label: 'Transparencia Fiscal' },
        ],
        summaryIcons: [
            { icon: Landmark, label: 'Gobierno' },
            { icon: FileText, label: 'SIGECOF' },
            { icon: Shield, label: 'CGR' },
        ],
    },
    'ventas': {
        title: 'Punto de Venta',
        subtitle: 'Ventas & Inventario',
        icon: ShoppingCart,
        gradient: 'linear-gradient(135deg, #9f1239, #e11d48)',
        portalLabel: 'Portal de Ventas',
        successLabel: 'Punto de Venta',
        modules: [
            { id: 'tpv', label: 'Terminal Punto de Venta' },
            { id: 'inventario', label: 'Control de Inventario' },
            { id: 'ventas-estrategia', label: 'Estrategia de Ventas' },
            { id: 'fidelizacion', label: 'Fidelización de Clientes' },
        ],
        summaryIcons: [
            { icon: ShoppingCart, label: 'Ventas' },
            { icon: BarChart3, label: 'Inventario' },
            { icon: TrendingUp, label: 'Análisis' },
        ],
    },
};

const schema = z.object({
    razonSocial: z.string().min(3, 'Ingrese la razón social').or(z.literal('')),
    rif: z.string().regex(/^[JGCVEPF]-\d{8}-\d$/, 'Formato: J-50328471-6').or(z.literal('')),
    tipo_empresa: z.string().min(1, 'Seleccione el tipo').or(z.literal('')),
    repNombre: z.string().min(2, 'Ingrese el nombre'),
    repEmail: z.string().email('Correo inválido'),
    password: z.string()
        .min(8, 'Mínimo 8 caracteres')
        .regex(/[A-Z]/, 'Debe contener una mayúscula')
        .regex(/[a-z]/, 'Debe contener una minúscula')
        .regex(/[0-9]/, 'Debe contener un número')
        .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/, 'Debe contener un carácter especial'),
    confirmPassword: z.string(),
    estado_empresa: z.string().min(1, 'Seleccione el estado').or(z.literal('')),
    municipio_empresa: z.string().min(2, 'Seleccione el municipio').or(z.literal('')),
    parroquia: z.string().optional(),
    telefono: z.string().min(7, 'Teléfono inválido').or(z.literal('')),
    regimen_iva: z.string().optional(),
}).refine(d => d.password === d.confirmPassword, {
    message: 'Las contraseñas no coinciden', path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

const colorMap: Record<string, { bg: string; bgHover: string; border: string; borderActive: string; text: string; accent: string; ring: string; gradient: string; shadow: string; iconBg: string }> = {
    lightblue: {
        bg: 'bg-sky-50 dark:bg-sky-950/50', bgHover: 'hover:bg-sky-50 dark:hover:bg-sky-950/50', border: 'border-sky-200 dark:border-sky-800', borderActive: 'border-sky-400 dark:border-sky-500',
        text: 'text-sky-600 dark:text-sky-400', accent: 'bg-sky-500', ring: 'ring-sky-300 dark:ring-sky-700', gradient: 'from-sky-400 to-sky-600',
        shadow: 'shadow-sky-200/50 dark:shadow-sky-900/30', iconBg: 'bg-sky-100 dark:bg-sky-900',
    },
    green: {
        bg: 'bg-emerald-50 dark:bg-emerald-950/50', bgHover: 'hover:bg-emerald-50 dark:hover:bg-emerald-950/50', border: 'border-emerald-200 dark:border-emerald-800', borderActive: 'border-emerald-400 dark:border-emerald-500',
        text: 'text-emerald-600 dark:text-emerald-400', accent: 'bg-emerald-500', ring: 'ring-emerald-300 dark:ring-emerald-700', gradient: 'from-emerald-400 to-green-600',
        shadow: 'shadow-emerald-200/50 dark:shadow-emerald-900/30', iconBg: 'bg-emerald-100 dark:bg-emerald-900',
    },
    darkblue: {
        bg: 'bg-blue-50 dark:bg-blue-950/50', bgHover: 'hover:bg-blue-50 dark:hover:bg-blue-950/50', border: 'border-blue-200 dark:border-blue-800', borderActive: 'border-blue-500 dark:border-blue-400',
        text: 'text-blue-700 dark:text-blue-400', accent: 'bg-blue-600', ring: 'ring-blue-300 dark:ring-blue-700', gradient: 'from-blue-500 to-blue-800',
        shadow: 'shadow-blue-200/50 dark:shadow-blue-900/30', iconBg: 'bg-blue-100 dark:bg-blue-900',
    },
    neon: {
        bg: 'bg-lime-50 dark:bg-lime-950/50', bgHover: 'hover:bg-lime-50 dark:hover:bg-lime-950/50', border: 'border-lime-300 dark:border-lime-800', borderActive: 'border-lime-500 dark:border-lime-400',
        text: 'text-lime-600 dark:text-lime-400', accent: 'bg-lime-500', ring: 'ring-lime-300 dark:ring-lime-700', gradient: 'from-lime-400 to-green-500',
        shadow: 'shadow-lime-200/50 dark:shadow-lime-900/30', iconBg: 'bg-lime-100 dark:bg-lime-900',
    },
};

const TOTAL_STEPS = 4;

const stepConfig = [
    { title: 'Plan', desc: 'Elige tu plan', icon: Star },
    { title: 'Empresa', desc: 'Datos del negocio', icon: Building },
    { title: 'Verificar', desc: 'Confirma tu correo', icon: Fingerprint },
    { title: 'Completado', desc: 'Tu cuenta está lista', icon: CheckCircle },
];

export default function RegisterContabilidadPage() {
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [billingPeriod, setBillingPeriod] = useState<'mensual' | 'anual'>('mensual');
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
    const [verifMethod, setVerifMethod] = useState<'email' | 'sms' | 'whatsapp' | null>(null);
    const [countdown, setCountdown] = useState(0);

    const onMagicLinkVerified = useCallback(() => {
        setVerifVerified(true);
        toast({ title: '¡Verificado!', description: 'Tu identidad fue confirmada vía enlace de verificación.' });
    }, [toast]);

    useVerificationPoll(verifDestino, verifMethod === 'email' && verifSent && !verifVerified, onMagicLinkVerified);

    const prefillDoc = searchParams.get('doc') || '';
    const prefillRazon = searchParams.get('razon') || '';
    const prefillTipo = searchParams.get('tipo') || '';
    const prefillEstado = searchParams.get('estado') || '';
    const prefillMunicipio = searchParams.get('municipio') || '';
    const prefillTel = searchParams.get('tel') || '';
    const prefillParroquia = searchParams.get('parroquia') || '';
    const hasPrefill = !!prefillDoc;
    const moduloParam = searchParams.get('modulo') || 'asesoria-contable';
    const variant = MODULE_VARIANTS[moduloParam] || MODULE_VARIANTS['asesoria-contable'];
    const VariantIcon = variant.icon;

    const { register, handleSubmit, control, watch, setValue, trigger, getValues, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            regimen_iva: 'General',
            rif: prefillDoc,
            razonSocial: prefillRazon,
            tipo_empresa: prefillTipo,
            estado_empresa: prefillEstado,
            municipio_empresa: prefillMunicipio,
            parroquia: prefillParroquia,
            telefono: prefillTel,
        },
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

    const sendVerificationCode = async (method?: 'email' | 'sms' | 'whatsapp') => {
        const useMethod = method || verifMethod || 'email';
        setVerifLoading(true);
        const destino = useMethod === 'email' ? getValues('repEmail') : getValues('telefono');
        setVerifDestino(destino);
        setVerifMethod(useMethod);
        try {
            const res = await fetch('/api/auth/send-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destino, tipo: useMethod }),
            });
            const json = await res.json();
            if (!res.ok) {
                toast({ title: 'Error al enviar código', description: json.error, variant: 'destructive' });
                return;
            }
            setVerifSent(true);
            startCountdown();
            const channelLabel = useMethod === 'email' ? `correo ${destino}` : useMethod === 'sms' ? `SMS al ${destino}` : `WhatsApp al ${destino}`;
            toast({ title: 'Código enviado', description: `Revisa tu ${channelLabel}` });
        } catch {
            toast({ title: 'Error', description: 'No se pudo enviar el código.', variant: 'destructive' });
        } finally {
            setVerifLoading(false);
        }
    };

    const verifyingRef = useRef(false);
    const verifyCode = useCallback(async (code: string) => {
        if (code.length !== 6 || verifyingRef.current || verifVerified) return;
        verifyingRef.current = true;
        setVerifLoading(true);
        try {
            const res = await fetch('/api/auth/verify-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destino: verifDestino, codigo: code }),
            });
            const json = await res.json();
            if (!res.ok) {
                toast({ title: 'Código incorrecto', description: json.error, variant: 'destructive' });
                setVerifCode('');
                return;
            }
            setVerifVerified(true);
            const verifiedLabel = verifMethod === 'sms' ? 'Número verificado por SMS.' : verifMethod === 'whatsapp' ? 'Número verificado por WhatsApp.' : 'Correo electrónico confirmado.';
            toast({ title: '¡Verificado!', description: verifiedLabel });
        } catch {
            toast({ title: 'Error', description: 'No se pudo verificar el código.', variant: 'destructive' });
            setVerifCode('');
        } finally {
            setVerifLoading(false);
            verifyingRef.current = false;
        }
    }, [verifDestino, verifVerified, verifMethod, toast]);

    useEffect(() => {
        if (verifCode.length === 6 && verifSent && !verifVerified) {
            verifyCode(verifCode);
        }
    }, [verifCode, verifSent, verifVerified, verifyCode]);

    const nextStep = async () => {
        if (step === 1) {
            if (!selectedPlan) {
                toast({ title: 'Selecciona un plan', description: 'Debes elegir un plan para continuar', variant: 'destructive' });
                return;
            }
            setStep(2);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (step === 2) {
            const baseFields: (keyof FormData)[] = ['repNombre', 'repEmail', 'password', 'confirmPassword'];
            const companyFields: (keyof FormData)[] = ['razonSocial', 'rif', 'tipo_empresa', 'estado_empresa', 'municipio_empresa', 'telefono'];
            const visibleCompanyFields = hasPrefill
                ? companyFields.filter(f => {
                    const prefillMap: Record<string, string> = {
                        razonSocial: prefillRazon, rif: prefillDoc, tipo_empresa: prefillTipo,
                        estado_empresa: prefillEstado, municipio_empresa: prefillMunicipio, telefono: prefillTel,
                    };
                    return !prefillMap[f];
                })
                : companyFields;
            const requiredFields = [...baseFields, ...visibleCompanyFields];
            const manualErrors: string[] = [];
            for (const f of visibleCompanyFields) {
                const val = getValues(f)?.trim();
                if (!val) manualErrors.push(f);
            }
            if (manualErrors.length > 0) {
                toast({ title: 'Campos incompletos', description: 'Por favor revisa los campos marcados en rojo.', variant: 'destructive' });
                return;
            }
            const valid = await trigger(requiredFields);
            if (!valid) {
                toast({ title: 'Campos incompletos', description: 'Por favor revisa los campos marcados en rojo.', variant: 'destructive' });
                const firstError = document.querySelector('[class*="border-red"]');
                if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
            if (!acceptTerms) {
                toast({ title: 'Términos requeridos', description: 'Debes aceptar los términos para continuar.', variant: 'destructive' });
                return;
            }
            setStep(3);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
    };

    const prevStep = () => {
        if (step === 3) {
            setVerifSent(false);
            setVerifCode('');
            setVerifVerified(false);
            setVerifMethod(null);
        }
        setStep(s => s - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const planData = PLANES.find(p => p.id === selectedPlan);

    const submittingRef = useRef(false);
    const onSubmit = async (data: FormData) => {
        if (!verifVerified) {
            toast({ title: 'Verificación requerida', description: 'Debes verificar tu correo electrónico.', variant: 'destructive' });
            return;
        }
        if (submittingRef.current || isLoading) return;
        submittingRef.current = true;
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
                    parroquia: data.parroquia || '',
                    repNombre: data.repNombre,
                    repEmail: data.repEmail,
                    password: data.password,
                    regimen_iva: data.regimen_iva || 'General',
                    modules: variant.modules,
                    plan: selectedPlan,
                    plan_periodo: billingPeriod,
                    plan_monto: billingPeriod === 'anual' ? Math.round((planData?.precio ?? 0) * 0.8) : (planData?.precio ?? 0),
                }),
            });
            const result = await res.json();
            if (!res.ok) {
                if (res.status === 409) {
                    toast({ title: 'Cuenta existente', description: 'Ya existe una cuenta con ese correo. Serás redirigido al inicio de sesión.', variant: 'destructive' });
                    setTimeout(() => router.push('/login-empresa' as any), 2000);
                    return;
                }
                throw new Error(result.error);
            }
            await refreshUser();
            setStep(TOTAL_STEPS);
        } catch (e: any) {
            toast({ title: 'Error de registro', description: e.message, variant: 'destructive' });
        } finally {
            setIsLoading(false);
            submittingRef.current = false;
        }
    };

    const passwordChecks = [
        { label: '8+ chars', ok: (watchedPassword || '').length >= 8 },
        { label: 'Mayúscula', ok: /[A-Z]/.test(watchedPassword || '') },
        { label: 'Número', ok: /[0-9]/.test(watchedPassword || '') },
        { label: 'Especial', ok: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(watchedPassword || '') },
    ];

    const inputClass = "h-11 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 transition-colors shadow-sm dark:shadow-none";
    const labelClass = "text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400";
    const errorClass = "text-xs text-red-500 mt-0.5";

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-emerald-50/30 via-30% to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, #3b82f620 0%, transparent 70%)' }} />
            <div className="absolute bottom-[-200px] right-[-100px] w-[700px] h-[700px] rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, #10b98120 0%, transparent 70%)' }} />
            <div className="absolute top-[40%] left-[60%] w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #84cc1620 0%, transparent 70%)' }} />

            <div className={cn(
                "relative z-10 container mx-auto px-4 py-8 flex flex-col items-center min-h-screen",
                step === 1 ? "max-w-4xl pt-8" : "max-w-xl pt-10"
            )}>
                <div className="flex items-center gap-4 mb-7">
                    <div className="p-3 rounded-2xl shadow-lg" style={{ background: variant.gradient }}>
                        <VariantIcon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold uppercase tracking-[0.12em] text-slate-800 dark:text-slate-100">{variant.title}</h1>
                        <p className="text-xs font-bold uppercase tracking-wide text-blue-500">{variant.subtitle}</p>
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
                                            "w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 border-2",
                                            isDone && "border-emerald-400 shadow-lg shadow-emerald-100 dark:shadow-emerald-900/30",
                                            isActive && "border-blue-500 shadow-lg shadow-blue-100 dark:shadow-blue-900/30",
                                            !isActive && !isDone && "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                        )} style={isDone ? { background: 'linear-gradient(135deg, #10b981, #059669)' } : isActive ? { background: 'linear-gradient(135deg, #3b82f6, #1e40af)' } : undefined}>
                                            {isDone ? (
                                                <Check className="h-5 w-5 text-white" />
                                            ) : (
                                                <Icon className={cn("h-4.5 w-4.5", isActive ? "text-white" : "text-slate-300")} />
                                            )}
                                        </div>
                                        <p className={cn(
                                            "text-[11px] font-bold uppercase tracking-wider mt-2 text-center",
                                            isActive ? "text-blue-600" : isDone ? "text-emerald-600" : "text-slate-300 dark:text-slate-600"
                                        )}>{s.title}</p>
                                    </div>
                                    {i < 2 && (
                                        <div className={cn(
                                            "flex-1 h-0.5 mx-3 rounded-full transition-all duration-500 mt-[-18px]",
                                            step > stepNum ? "bg-emerald-400" : "bg-slate-200 dark:bg-slate-700"
                                        )} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-800 overflow-hidden">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={cn("p-7", step === TOTAL_STEPS && "p-8")}>

                            {step === 1 && (
                                <div className="space-y-6">
                                    <div className="text-center space-y-1.5">
                                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Elige tu plan contable</h2>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Todos incluyen soporte VEN-NIF y SENIAT. Podrás cambiarlo después.</p>
                                    </div>

                                    <div className="flex items-center justify-center gap-3">
                                        <span className={cn("text-sm font-bold transition-colors", billingPeriod === 'mensual' ? "text-slate-800 dark:text-slate-100" : "text-slate-400 dark:text-slate-500")}>Mensual</span>
                                        <button
                                            type="button"
                                            onClick={() => setBillingPeriod(billingPeriod === 'mensual' ? 'anual' : 'mensual')}
                                            className={cn(
                                                "relative w-14 h-7 rounded-full transition-all duration-300 shrink-0",
                                                billingPeriod === 'anual' ? "bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-md shadow-emerald-500/30" : "bg-slate-200 dark:bg-slate-700"
                                            )}
                                        >
                                            <div className={cn(
                                                "absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300",
                                                billingPeriod === 'anual' ? "left-[calc(100%-1.625rem)]" : "left-0.5"
                                            )} />
                                        </button>
                                        <span className={cn("text-sm font-bold transition-colors", billingPeriod === 'anual' ? "text-slate-800 dark:text-slate-100" : "text-slate-400 dark:text-slate-500")}>Anual</span>
                                        {billingPeriod === 'anual' && (
                                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/50">-20%</span>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {PLANES.map((plan) => {
                                            const c = colorMap[plan.color];
                                            const isSelected = selectedPlan === plan.id;
                                            const Icon = plan.icon;
                                            const displayPrice = billingPeriod === 'anual' ? Math.round(plan.precio * 0.8) : plan.precio;
                                            const annualTotal = displayPrice * 12;
                                            return (
                                                <button
                                                    key={plan.id}
                                                    type="button"
                                                    onClick={() => setSelectedPlan(plan.id)}
                                                    className={cn(
                                                        "relative text-left rounded-2xl border-2 p-5 transition-all duration-300 group",
                                                        "hover:shadow-xl hover:scale-[1.02]",
                                                        isSelected
                                                            ? `${c.bg} ${c.borderActive} ring-2 ${c.ring} shadow-xl ${c.shadow}`
                                                            : `bg-white dark:bg-slate-800 ${c.border} ${c.bgHover}`
                                                    )}
                                                >
                                                    {plan.popular && (
                                                        <div className={cn(
                                                            "absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest text-white bg-gradient-to-r shadow-md",
                                                            c.gradient, c.shadow
                                                        )}>
                                                            Popular
                                                        </div>
                                                    )}
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className={cn(
                                                            "p-2.5 rounded-xl transition-all duration-300",
                                                            isSelected ? `bg-gradient-to-br ${c.gradient} shadow-md ${c.shadow}` : c.iconBg
                                                        )}>
                                                            <Icon className={cn("h-5 w-5", isSelected ? "text-white" : c.text)} />
                                                        </div>
                                                        <div className={cn(
                                                            "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300",
                                                            isSelected ? `${c.borderActive} ${c.accent}` : "border-slate-200 dark:border-slate-700"
                                                        )}>
                                                            {isSelected && <Check className="h-3 w-3 text-white" />}
                                                        </div>
                                                    </div>
                                                    <p className={cn("text-xs font-semibold uppercase tracking-wider", c.text)}>{plan.nombre}</p>
                                                    <div className="flex items-baseline gap-0.5 mt-1">
                                                        <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">${displayPrice}</span>
                                                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500">/mes</span>
                                                    </div>
                                                    {billingPeriod === 'anual' && (
                                                        <div className="flex items-center gap-1.5 mt-1">
                                                            <span className="text-[11px] font-semibold text-slate-400 line-through">${plan.precio * 12}/año</span>
                                                            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">${annualTotal}/año</span>
                                                        </div>
                                                    )}
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{plan.descripcion}</p>
                                                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 space-y-2">
                                                        {plan.features.map((f, i) => (
                                                            <div key={i} className="flex items-start gap-2">
                                                                <div className={cn("mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0", isSelected ? c.iconBg : "bg-slate-100 dark:bg-slate-700")}>
                                                                    <Check className={cn("h-2.5 w-2.5", isSelected ? c.text : "text-slate-300 dark:text-slate-600")} />
                                                                </div>
                                                                <span className={cn("text-xs leading-tight", isSelected ? "text-slate-700 dark:text-slate-300" : "text-slate-500 dark:text-slate-400")}>{f}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="flex items-center justify-center gap-8 pt-2">
                                        {[
                                            { icon: Shield, label: 'SSL Seguro' },
                                            { icon: BarChart3, label: 'VEN-NIF' },
                                            { icon: Headphones, label: 'Soporte' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <item.icon className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-5">
                                    {planData && (
                                        <div className={cn("p-3.5 rounded-2xl border-2 flex items-center gap-3", colorMap[planData.color].bg, colorMap[planData.color].borderActive)}>
                                            <div className={cn("p-2 rounded-xl bg-gradient-to-br", colorMap[planData.color].gradient)}>
                                                <planData.icon className="h-4 w-4 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <p className={cn("text-xs font-semibold uppercase tracking-widest", colorMap[planData.color].text)}>Plan {planData.nombre}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    ${billingPeriod === 'anual' ? Math.round(planData.precio * 0.8) : planData.precio}/mes
                                                    {billingPeriod === 'anual' && <span className="ml-1 text-emerald-600 dark:text-emerald-400 font-bold">(facturación anual)</span>}
                                                    {billingPeriod === 'mensual' && <span className="ml-1">(facturación mensual)</span>}
                                                </p>
                                            </div>
                                            <button type="button" onClick={() => setStep(1)} className="text-xs font-bold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 px-3 py-1.5 rounded-xl hover:bg-white/80 dark:hover:bg-slate-700/80 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-600">Cambiar</button>
                                        </div>
                                    )}

                                    {hasPrefill && (
                                        <div className="p-4 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 space-y-3">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                                                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                                                </div>
                                                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">Datos de la Empresa (verificados)</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                {prefillRazon && (
                                                    <div className="col-span-2 p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900">
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5">Razón Social</p>
                                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{prefillRazon}</p>
                                                    </div>
                                                )}
                                                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5">RIF</p>
                                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{prefillDoc}</p>
                                                </div>
                                                {prefillTipo && (
                                                    <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900">
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5">Tipo</p>
                                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{prefillTipo}</p>
                                                    </div>
                                                )}
                                                {prefillEstado && (
                                                    <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900">
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5">Estado</p>
                                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{prefillEstado}</p>
                                                    </div>
                                                )}
                                                {prefillMunicipio && (
                                                    <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900">
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5">Municipio</p>
                                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{prefillMunicipio}</p>
                                                    </div>
                                                )}
                                                {prefillParroquia && (
                                                    <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900">
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5">Parroquia</p>
                                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{prefillParroquia}</p>
                                                    </div>
                                                )}
                                                {prefillTel && (
                                                    <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900">
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-0.5">Teléfono</p>
                                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{prefillTel}</p>
                                                    </div>
                                                )}
                                            </div>
                                            {(!prefillRazon || !prefillTipo || !prefillEstado || !prefillMunicipio || !prefillTel) && (
                                                <div className="space-y-3 mt-3 pt-3 border-t border-emerald-200 dark:border-emerald-800">
                                                    <p className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                                                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
                                                        Completa los datos faltantes
                                                    </p>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {!prefillRazon && (
                                                            <div className="col-span-2 space-y-1.5">
                                                                <Label htmlFor="razonSocial" className={labelClass}>Razón Social</Label>
                                                                <Input id="razonSocial" placeholder="Empresa, C.A." {...register('razonSocial')} className={cn(inputClass, errors.razonSocial && 'border-red-400')} />
                                                                {errors.razonSocial && <p className={errorClass}>{errors.razonSocial.message}</p>}
                                                            </div>
                                                        )}
                                                        {!prefillTipo && (
                                                            <div className="space-y-1.5">
                                                                <Label className={labelClass}>Tipo de Empresa</Label>
                                                                <Controller name="tipo_empresa" control={control} render={({ field }) => (
                                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                                        <SelectTrigger className={cn("h-11 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none", errors.tipo_empresa && 'border-red-400')}><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                                                                        <SelectContent>{TIPOS_EMPRESA.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                                                    </Select>
                                                                )} />
                                                                {errors.tipo_empresa && <p className={errorClass}>{errors.tipo_empresa.message}</p>}
                                                            </div>
                                                        )}
                                                        {!prefillTel && (
                                                            <div className="space-y-1.5">
                                                                <Label htmlFor="telefono" className={labelClass}>Teléfono</Label>
                                                                <Input id="telefono" type="tel" placeholder="0412-1234567" {...register('telefono')} className={cn(inputClass, errors.telefono && 'border-red-400')} />
                                                                {errors.telefono && <p className={errorClass}>{errors.telefono.message}</p>}
                                                            </div>
                                                        )}
                                                        {!prefillEstado && (
                                                            <div className="space-y-1.5">
                                                                <Label className={labelClass}>Estado</Label>
                                                                <Controller name="estado_empresa" control={control} render={({ field }) => (
                                                                    <Select onValueChange={(v) => { field.onChange(v); setValue('municipio_empresa', ''); setValue('parroquia', ''); }} value={field.value}>
                                                                        <SelectTrigger className={cn("h-11 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none", errors.estado_empresa && 'border-red-400')}><SelectValue placeholder="Estado..." /></SelectTrigger>
                                                                        <SelectContent>{ESTADOS_VE.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
                                                                    </Select>
                                                                )} />
                                                                {errors.estado_empresa && <p className={errorClass}>{errors.estado_empresa.message}</p>}
                                                            </div>
                                                        )}
                                                        {!prefillMunicipio && (
                                                            <div className="space-y-1.5">
                                                                <Label className={labelClass}>Municipio</Label>
                                                                <Controller name="municipio_empresa" control={control} render={({ field }) => (
                                                                    <Select value={field.value} onValueChange={field.onChange} disabled={!estadoEmpresa && !prefillEstado}>
                                                                        <SelectTrigger className={cn("h-11 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none", errors.municipio_empresa && 'border-red-400')}>
                                                                            <SelectValue placeholder={estadoEmpresa || prefillEstado ? 'Municipio...' : 'Primero el estado'} />
                                                                        </SelectTrigger>
                                                                        <SelectContent>{getMunicipios(estadoEmpresa || prefillEstado || '').map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                                                                    </Select>
                                                                )} />
                                                                {errors.municipio_empresa && <p className={errorClass}>{errors.municipio_empresa.message}</p>}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                            {!prefillParroquia && (prefillEstado || estadoEmpresa) && (
                                                <div className="space-y-1.5 mt-2">
                                                    <Label className={labelClass}>Parroquia / Ciudad</Label>
                                                    <Controller name="parroquia" control={control} render={({ field }) => (
                                                        <Select value={field.value || ''} onValueChange={field.onChange}>
                                                            <SelectTrigger className="h-11 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none">
                                                                <SelectValue placeholder="Seleccionar parroquia..." />
                                                            </SelectTrigger>
                                                            <SelectContent>{getCiudades(prefillEstado || estadoEmpresa || '').map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                                                        </Select>
                                                    )} />
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {!hasPrefill && (
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800">
                                                    <Building className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400">Datos de la Empresa</p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="col-span-2 space-y-1.5">
                                                    <Label htmlFor="razonSocial" className={labelClass}>Razón Social</Label>
                                                    <Input id="razonSocial" placeholder="Empresa, C.A." {...register('razonSocial')} className={cn(inputClass, errors.razonSocial && 'border-red-400')} />
                                                    {errors.razonSocial && <p className={errorClass}>{errors.razonSocial.message}</p>}
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label className={labelClass}>RIF</Label>
                                                    <Controller name="rif" control={control} render={({ field }) => (
                                                        <DocumentInput type="rif" value={field.value || ''} onChange={field.onChange} error={!!errors.rif} />
                                                    )} />
                                                    {errors.rif && <p className={errorClass}>{errors.rif.message}</p>}
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label className={labelClass}>Tipo de Empresa</Label>
                                                    <Controller name="tipo_empresa" control={control} render={({ field }) => (
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger className={cn("h-11 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none", errors.tipo_empresa && 'border-red-400')}><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                                                            <SelectContent>{TIPOS_EMPRESA.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                                        </Select>
                                                    )} />
                                                    {errors.tipo_empresa && <p className={errorClass}>{errors.tipo_empresa.message}</p>}
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label htmlFor="telefono" className={labelClass}>Teléfono</Label>
                                                    <Input id="telefono" type="tel" placeholder="0412-1234567" {...register('telefono')} className={cn(inputClass, errors.telefono && 'border-red-400')} />
                                                    {errors.telefono && <p className={errorClass}>{errors.telefono.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />

                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900 dark:to-emerald-800">
                                                <Users className="h-4 w-4 text-emerald-600" />
                                            </div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">Representante Legal</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className={cn("space-y-1.5", hasPrefill ? "col-span-2" : "")}>
                                                <Label htmlFor="repNombre" className={labelClass}>Nombre Completo</Label>
                                                <Input id="repNombre" placeholder="Juan Pérez" {...register('repNombre')} className={cn(inputClass, errors.repNombre && 'border-red-400')} />
                                                {errors.repNombre && <p className={errorClass}>{errors.repNombre.message}</p>}
                                            </div>
                                            {!hasPrefill && (
                                                <div className="space-y-1.5">
                                                    <Label htmlFor="telefono2" className={labelClass}>Teléfono</Label>
                                                    <Input id="telefono2" type="tel" placeholder="0412-1234567" {...register('telefono')} className={cn(inputClass, errors.telefono && 'border-red-400')} />
                                                    {errors.telefono && <p className={errorClass}>{errors.telefono.message}</p>}
                                                </div>
                                            )}
                                            <div className="col-span-2 space-y-1.5">
                                                <Label htmlFor="repEmail" className={labelClass}>Correo Electrónico</Label>
                                                <Input id="repEmail" type="email" placeholder="tu@empresa.com" {...register('repEmail')} className={cn(inputClass, errors.repEmail && 'border-red-400')} />
                                                {errors.repEmail && <p className={errorClass}>{errors.repEmail.message}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />

                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800">
                                                <Lock className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                                            </div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-blue-800 dark:text-blue-400">{hasPrefill ? 'Seguridad' : 'Seguridad y Ubicación'}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1.5">
                                                <Label htmlFor="password" className={labelClass}>Contraseña</Label>
                                                <div className="relative">
                                                    <Input id="password" type={showPassword ? 'text' : 'password'} {...register('password')} className={cn(inputClass, 'pr-10', errors.password && 'border-red-400')} />
                                                    <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" tabIndex={-1}>
                                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5">
                                                    {passwordChecks.map((c, i) => (
                                                        <span key={i} className={cn(
                                                            "text-[11px] font-bold transition-colors flex items-center gap-1",
                                                            c.ok ? "text-emerald-500" : "text-slate-300 dark:text-slate-600"
                                                        )}>
                                                            <span className={cn("w-1.5 h-1.5 rounded-full", c.ok ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700")} />
                                                            {c.label}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label htmlFor="confirmPassword" className={labelClass}>Confirmar</Label>
                                                <Input id="confirmPassword" type={showPassword ? 'text' : 'password'} {...register('confirmPassword')} className={cn(inputClass, errors.confirmPassword && 'border-red-400')} />
                                                {errors.confirmPassword && <p className={errorClass}>{errors.confirmPassword.message}</p>}
                                            </div>
                                            {!hasPrefill && (
                                                <>
                                                    <div className="space-y-1.5">
                                                        <Label className={labelClass}>Estado</Label>
                                                        <Controller name="estado_empresa" control={control} render={({ field }) => (
                                                            <Select onValueChange={(v) => { field.onChange(v); setValue('municipio_empresa', ''); setValue('parroquia', ''); }} value={field.value}>
                                                                <SelectTrigger className={cn("h-11 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none", errors.estado_empresa && 'border-red-400')}><SelectValue placeholder="Estado..." /></SelectTrigger>
                                                                <SelectContent>{ESTADOS_VE.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
                                                            </Select>
                                                        )} />
                                                        {errors.estado_empresa && <p className={errorClass}>{errors.estado_empresa.message}</p>}
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <Label className={labelClass}>Municipio</Label>
                                                        <Controller name="municipio_empresa" control={control} render={({ field }) => (
                                                            <Select value={field.value} onValueChange={field.onChange} disabled={!estadoEmpresa}>
                                                                <SelectTrigger className={cn("h-11 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none", errors.municipio_empresa && 'border-red-400')}>
                                                                    <SelectValue placeholder={estadoEmpresa ? 'Municipio...' : 'Primero el estado'} />
                                                                </SelectTrigger>
                                                                <SelectContent>{getMunicipios(estadoEmpresa || '').map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                                                            </Select>
                                                        )} />
                                                        {errors.municipio_empresa && <p className={errorClass}>{errors.municipio_empresa.message}</p>}
                                                    </div>
                                                    <div className="col-span-2 space-y-1.5">
                                                        <Label className={labelClass}>Parroquia / Ciudad</Label>
                                                        <Controller name="parroquia" control={control} render={({ field }) => (
                                                            <Select value={field.value || ''} onValueChange={field.onChange} disabled={!estadoEmpresa}>
                                                                <SelectTrigger className="h-11 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none">
                                                                    <SelectValue placeholder={estadoEmpresa ? 'Parroquia...' : 'Primero el estado'} />
                                                                </SelectTrigger>
                                                                <SelectContent>{getCiudades(estadoEmpresa || '').map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                                                            </Select>
                                                        )} />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <label className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 cursor-pointer select-none group hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200">
                                        <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-slate-300 dark:border-slate-600 accent-blue-600 shrink-0" />
                                        <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                            Acepto los{' '}
                                            <a href="/terms" target="_blank" className="text-blue-600 font-semibold hover:underline" onClick={(e) => e.stopPropagation()}>Términos y Condiciones</a>{' '}
                                            y la{' '}
                                            <a href="/politica-privacidad" target="_blank" className="text-blue-600 font-semibold hover:underline" onClick={(e) => e.stopPropagation()}>Política de Privacidad</a>.
                                        </span>
                                    </label>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6">
                                    <div className="text-center space-y-3">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #3b82f6, #1e40af)' }}>
                                            <Fingerprint className="h-8 w-8 text-white" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Verifica tu identidad</h2>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Elige cómo recibir tu código de verificación de 6 dígitos.</p>
                                    </div>

                                    {verifVerified ? (
                                        <div className="text-center py-6 space-y-4">
                                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl shadow-lg shadow-emerald-100 dark:shadow-emerald-900/30 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900 dark:to-emerald-800">
                                                <CheckCircle className="h-10 w-10 text-emerald-600" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-bold text-emerald-600 uppercase tracking-widest">¡Verificado!</p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{verifDestino}</p>
                                            </div>
                                        </div>
                                    ) : !verifSent ? (
                                        <div className="space-y-3">
                                            <button
                                                type="button"
                                                onClick={() => sendVerificationCode('email')}
                                                disabled={verifLoading}
                                                className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-200 flex items-center gap-4 group"
                                            >
                                                <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)' }}>
                                                    <Mail className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Correo Electrónico</p>
                                                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{getValues('repEmail')}</p>
                                                </div>
                                                <ArrowRight className="h-4 w-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => sendVerificationCode('sms')}
                                                disabled={verifLoading}
                                                className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-200 flex items-center gap-4 group"
                                            >
                                                <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)' }}>
                                                    <Phone className="h-5 w-5 text-emerald-600" />
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">SMS</p>
                                                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{getValues('telefono') || 'Teléfono registrado'}</p>
                                                </div>
                                                <ArrowRight className="h-4 w-4 text-slate-300 dark:text-slate-600 group-hover:text-emerald-500 transition-colors" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => sendVerificationCode('whatsapp')}
                                                disabled={verifLoading}
                                                className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-950/30 transition-all duration-200 flex items-center gap-4 group"
                                            >
                                                <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #bbf7d0, #86efac)' }}>
                                                    <MessageCircle className="h-5 w-5 text-green-700" />
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">WhatsApp</p>
                                                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{getValues('telefono') || 'Teléfono registrado'}</p>
                                                </div>
                                                <ArrowRight className="h-4 w-4 text-slate-300 dark:text-slate-600 group-hover:text-green-600 transition-colors" />
                                            </button>

                                            {verifLoading && (
                                                <div className="flex items-center justify-center gap-2 py-2">
                                                    <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Enviando código...</p>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2.5 rounded-xl" style={{ background: verifMethod === 'email' ? 'linear-gradient(135deg, #dbeafe, #bfdbfe)' : 'linear-gradient(135deg, #d1fae5, #a7f3d0)' }}>
                                                    {verifMethod === 'email' ? <Mail className="h-5 w-5 text-blue-600" /> : verifMethod === 'whatsapp' ? <MessageCircle className="h-5 w-5 text-green-700" /> : <Phone className="h-5 w-5 text-emerald-600" />}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-300">
                                                        {verifMethod === 'email' ? 'Código enviado por correo' : verifMethod === 'sms' ? 'Código enviado por SMS' : 'Código enviado por WhatsApp'}
                                                    </p>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400">{verifDestino}</p>
                                                </div>
                                                <button type="button" onClick={() => { setVerifSent(false); setVerifCode(''); setVerifMethod(null); }} className="text-xs font-bold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 px-2 py-1 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors">Cambiar</button>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center justify-center gap-2 py-1">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                    <p className="text-xs text-emerald-600 font-semibold uppercase tracking-widest">
                                                        {verifMethod === 'email' ? 'Código enviado a tu correo' : verifMethod === 'sms' ? 'Código enviado por SMS' : 'Código enviado por WhatsApp'}
                                                    </p>
                                                </div>
                                                <Input
                                                    placeholder="000000"
                                                    maxLength={6}
                                                    value={verifCode}
                                                    onChange={e => setVerifCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                    className="text-center text-3xl font-bold tracking-wider h-16 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-blue-400 text-slate-800 dark:text-slate-100 shadow-sm dark:shadow-none"
                                                />
                                                {verifLoading && (
                                                    <div className="flex items-center justify-center gap-2 py-3 text-sm text-primary font-semibold">
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                        Verificando...
                                                    </div>
                                                )}
                                                <div className="text-center">
                                                    {countdown > 0 ? (
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">Reenviar en <span className="font-bold text-blue-600">{countdown}s</span></p>
                                                    ) : (
                                                        <button type="button" onClick={() => sendVerificationCode()} disabled={verifLoading} className="text-xs text-blue-600 font-semibold hover:underline inline-flex items-center gap-1.5 transition-colors">
                                                            <RefreshCw className="h-3 w-3" /> Reenviar código
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {step === TOTAL_STEPS && (
                                <div className="text-center py-4 space-y-6">
                                    <div className="relative inline-flex items-center justify-center">
                                        <div className="absolute inset-0 w-24 h-24 rounded-full blur-xl" style={{ background: 'radial-gradient(circle, #10b98130, #3b82f620)' }} />
                                        <div className="relative w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl shadow-emerald-100 dark:shadow-emerald-900/30 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900 dark:to-emerald-800">
                                            <CheckCircle className="h-10 w-10 text-emerald-600" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-semibold uppercase tracking-tight" style={{ background: 'linear-gradient(135deg, #10b981, #1e40af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>¡Cuenta Creada!</h2>
                                        <p className="text-base text-slate-500 dark:text-slate-400">Tu empresa ya está registrada en <strong className="text-slate-800 dark:text-slate-100">{variant.successLabel}</strong>.</p>
                                    </div>

                                    {planData && (
                                        <div className={cn("p-4 rounded-2xl border-2 mx-auto max-w-xs", colorMap[planData.color].bg, colorMap[planData.color].borderActive)}>
                                            <div className="flex items-center justify-center gap-3">
                                                <div className={cn("p-2 rounded-xl bg-gradient-to-br", colorMap[planData.color].gradient)}>
                                                    <planData.icon className="h-4 w-4 text-white" />
                                                </div>
                                                <div>
                                                    <p className={cn("text-xs font-semibold uppercase tracking-widest", colorMap[planData.color].text)}>Plan {planData.nombre}</p>
                                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                                                        ${billingPeriod === 'anual' ? Math.round(planData.precio * 0.8) : planData.precio}/mes
                                                        <span className="text-[10px] font-bold text-slate-400 ml-1">({billingPeriod === 'anual' ? 'anual' : 'mensual'})</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                                        {variant.summaryIcons.map((item, i) => (
                                            <div key={i} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                                                <item.icon className="h-5 w-5 text-blue-600" />
                                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button className="w-full max-w-xs h-12 rounded-xl font-bold text-sm text-white shadow-md" style={{ background: variant.gradient }} onClick={() => { window.location.href = '/es/dashboard-empresa'; }}>
                                        Ir al {variant.portalLabel} <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        {step < TOTAL_STEPS && (
                            <div className="flex justify-between px-7 pb-5">
                                <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1} className="rounded-xl h-11 px-6 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200">
                                    <ArrowLeft className="mr-1.5 h-4 w-4" />Anterior
                                </Button>
                                {step === 1 && (
                                    <Button type="button" onClick={nextStep} disabled={!selectedPlan} className="rounded-xl h-11 px-6 text-white font-bold shadow-md" style={{ background: 'linear-gradient(135deg, #3b82f6, #1e40af)' }}>
                                        Siguiente<ArrowRight className="ml-1.5 h-4 w-4" />
                                    </Button>
                                )}
                                {step === 2 && (
                                    <Button type="button" onClick={nextStep} className="rounded-xl h-11 px-6 text-white font-bold shadow-md" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                                        Verificar Correo<ArrowRight className="ml-1.5 h-4 w-4" />
                                    </Button>
                                )}
                                {step === 3 && (
                                    <Button type="submit" disabled={isLoading || !verifVerified} className={cn("rounded-xl h-11 px-6 text-white font-bold shadow-md", (!verifVerified && !isLoading) && "opacity-50 cursor-not-allowed")} style={{ background: (isLoading || !verifVerified) ? '#94a3b8' : 'linear-gradient(135deg, #3b82f6, #1e40af)' }}>
                                        {isLoading ? <><Loader2 className="mr-1.5 h-4 w-4 animate-spin" />Registrando...</> : <>Finalizar Registro<ArrowRight className="ml-1.5 h-4 w-4" /></>}
                                    </Button>
                                )}
                            </div>
                        )}
                        {step < TOTAL_STEPS && (
                            <p className="text-center text-sm text-slate-400 pb-6">
                                ¿Ya tienes cuenta? <Link href="/login-empresa" className="text-blue-600 font-bold hover:underline">Iniciar sesión</Link>
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
