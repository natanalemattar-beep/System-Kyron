'use client';

import { useState } from 'react';
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
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
        features: ['Libro diario y mayor', 'Balance general', 'Estado de resultados', 'Hasta 200 asientos/mes'],
    },
    {
        id: 'profesional',
        nombre: 'Profesional',
        precio: 28,
        icon: Zap,
        color: 'green',
        popular: true,
        descripcion: 'Facturación electrónica y cumplimiento fiscal',
        features: ['Todo del Básico', 'Facturación SENIAT', 'Declaración IVA', 'Conciliación bancaria'],
    },
    {
        id: 'empresarial',
        nombre: 'Empresarial',
        precio: 52,
        icon: Building,
        color: 'darkblue',
        popular: false,
        descripcion: 'Multi-usuario con retenciones y nómina',
        features: ['Todo del Profesional', 'Retenciones IVA/ISLR', 'Multi-usuario (5)', 'Nómina básica'],
    },
    {
        id: 'premium',
        nombre: 'Premium',
        precio: 95,
        icon: Crown,
        color: 'neon',
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
    parroquia: z.string().optional(),
    telefono: z.string().min(7, 'Teléfono inválido'),
    regimen_iva: z.string().optional(),
}).refine(d => d.password === d.confirmPassword, {
    message: 'Las contraseñas no coinciden', path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

const colorMap: Record<string, { bg: string; bgHover: string; border: string; borderActive: string; text: string; accent: string; ring: string; gradient: string; shadow: string; iconBg: string }> = {
    lightblue: {
        bg: 'bg-sky-50', bgHover: 'hover:bg-sky-50', border: 'border-sky-200', borderActive: 'border-sky-400',
        text: 'text-sky-600', accent: 'bg-sky-500', ring: 'ring-sky-300', gradient: 'from-sky-400 to-sky-600',
        shadow: 'shadow-sky-200/50', iconBg: 'bg-sky-100',
    },
    green: {
        bg: 'bg-emerald-50', bgHover: 'hover:bg-emerald-50', border: 'border-emerald-200', borderActive: 'border-emerald-400',
        text: 'text-emerald-600', accent: 'bg-emerald-500', ring: 'ring-emerald-300', gradient: 'from-emerald-400 to-green-600',
        shadow: 'shadow-emerald-200/50', iconBg: 'bg-emerald-100',
    },
    darkblue: {
        bg: 'bg-blue-50', bgHover: 'hover:bg-blue-50', border: 'border-blue-200', borderActive: 'border-blue-500',
        text: 'text-blue-700', accent: 'bg-blue-600', ring: 'ring-blue-300', gradient: 'from-blue-500 to-blue-800',
        shadow: 'shadow-blue-200/50', iconBg: 'bg-blue-100',
    },
    neon: {
        bg: 'bg-lime-50', bgHover: 'hover:bg-lime-50', border: 'border-lime-300', borderActive: 'border-lime-500',
        text: 'text-lime-600', accent: 'bg-lime-500', ring: 'ring-lime-300', gradient: 'from-lime-400 to-green-500',
        shadow: 'shadow-lime-200/50', iconBg: 'bg-lime-100',
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
    const [verifMethod, setVerifMethod] = useState<'email' | 'sms' | 'whatsapp' | null>(null);
    const [countdown, setCountdown] = useState(0);

    const prefillDoc = searchParams.get('doc') || '';
    const prefillRazon = searchParams.get('razon') || '';
    const prefillTipo = searchParams.get('tipo') || '';
    const prefillEstado = searchParams.get('estado') || '';
    const prefillMunicipio = searchParams.get('municipio') || '';
    const prefillTel = searchParams.get('tel') || '';
    const prefillParroquia = searchParams.get('parroquia') || '';
    const hasPrefill = !!prefillDoc;

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
            setVerifMethod(null);
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
                    parroquia: data.parroquia || '',
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

    const inputClass = "h-11 rounded-xl bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 transition-colors shadow-sm";
    const labelClass = "text-xs font-bold uppercase tracking-widest text-slate-500";
    const errorClass = "text-xs text-red-500 mt-0.5";

    return (
        <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #ecfdf5 30%, #f8fafc 60%, #eff6ff 100%)' }}>
            <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, #3b82f620 0%, transparent 70%)' }} />
            <div className="absolute bottom-[-200px] right-[-100px] w-[700px] h-[700px] rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, #10b98120 0%, transparent 70%)' }} />
            <div className="absolute top-[40%] left-[60%] w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #84cc1620 0%, transparent 70%)' }} />

            <div className={cn(
                "relative z-10 container mx-auto px-4 py-8 flex flex-col items-center min-h-screen",
                step === 1 ? "max-w-4xl pt-8" : "max-w-xl pt-10"
            )}>
                <div className="flex items-center gap-4 mb-7">
                    <div className="p-3 rounded-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #1e3a5f, #2563eb)' }}>
                        <Calculator className="h-7 w-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black uppercase tracking-[0.12em] text-slate-800">Asesoría Contable</h1>
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-500">System Kyron</p>
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
                                            isDone && "border-emerald-400 shadow-lg shadow-emerald-100",
                                            isActive && "border-blue-500 shadow-lg shadow-blue-100",
                                            !isActive && !isDone && "bg-white border-slate-200"
                                        )} style={isDone ? { background: 'linear-gradient(135deg, #10b981, #059669)' } : isActive ? { background: 'linear-gradient(135deg, #3b82f6, #1e40af)' } : undefined}>
                                            {isDone ? (
                                                <Check className="h-5 w-5 text-white" />
                                            ) : (
                                                <Icon className={cn("h-4.5 w-4.5", isActive ? "text-white" : "text-slate-300")} />
                                            )}
                                        </div>
                                        <p className={cn(
                                            "text-[11px] font-bold uppercase tracking-wider mt-2 text-center",
                                            isActive ? "text-blue-600" : isDone ? "text-emerald-600" : "text-slate-300"
                                        )}>{s.title}</p>
                                    </div>
                                    {i < 2 && (
                                        <div className={cn(
                                            "flex-1 h-0.5 mx-3 rounded-full transition-all duration-500 mt-[-18px]",
                                            step > stepNum ? "bg-emerald-400" : "bg-slate-200"
                                        )} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={cn("p-7", step === TOTAL_STEPS && "p-8")}>

                            {step === 1 && (
                                <div className="space-y-6">
                                    <div className="text-center space-y-1.5">
                                        <h2 className="text-xl font-black text-slate-800">Elige tu plan contable</h2>
                                        <p className="text-sm text-slate-500">Todos incluyen soporte VEN-NIF y SENIAT. Podrás cambiarlo después.</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
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
                                                        "relative text-left rounded-2xl border-2 p-5 transition-all duration-300 group",
                                                        "hover:shadow-xl hover:scale-[1.02]",
                                                        isSelected
                                                            ? `${c.bg} ${c.borderActive} ring-2 ${c.ring} shadow-xl ${c.shadow}`
                                                            : `bg-white ${c.border} ${c.bgHover}`
                                                    )}
                                                >
                                                    {plan.popular && (
                                                        <div className={cn(
                                                            "absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white bg-gradient-to-r shadow-md",
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
                                                            isSelected ? `${c.borderActive} ${c.accent}` : "border-slate-200"
                                                        )}>
                                                            {isSelected && <Check className="h-3 w-3 text-white" />}
                                                        </div>
                                                    </div>
                                                    <p className={cn("text-xs font-black uppercase tracking-wider", c.text)}>{plan.nombre}</p>
                                                    <div className="flex items-baseline gap-0.5 mt-1">
                                                        <span className="text-2xl font-black text-slate-800">${plan.precio}</span>
                                                        <span className="text-xs font-bold text-slate-400">/mes</span>
                                                    </div>
                                                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{plan.descripcion}</p>
                                                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                                                        {plan.features.map((f, i) => (
                                                            <div key={i} className="flex items-start gap-2">
                                                                <div className={cn("mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0", isSelected ? c.iconBg : "bg-slate-100")}>
                                                                    <Check className={cn("h-2.5 w-2.5", isSelected ? c.text : "text-slate-300")} />
                                                                </div>
                                                                <span className={cn("text-xs leading-tight", isSelected ? "text-slate-700" : "text-slate-500")}>{f}</span>
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
                                                <item.icon className="h-3.5 w-3.5 text-slate-400" />
                                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{item.label}</span>
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
                                                <p className={cn("text-xs font-black uppercase tracking-widest", colorMap[planData.color].text)}>Plan {planData.nombre}</p>
                                                <p className="text-xs text-slate-500">${planData.precio}/mes</p>
                                            </div>
                                            <button type="button" onClick={() => setStep(1)} className="text-xs font-bold text-slate-400 hover:text-slate-700 px-3 py-1.5 rounded-xl hover:bg-white/80 transition-colors border border-transparent hover:border-slate-200">Cambiar</button>
                                        </div>
                                    )}

                                    {hasPrefill && (
                                        <div className="p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50 space-y-3">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-emerald-100 rounded-lg">
                                                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                                                </div>
                                                <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">Datos de la Empresa (verificados)</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                {prefillRazon && (
                                                    <div className="col-span-2 p-3 rounded-xl bg-white border border-emerald-100">
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Razón Social</p>
                                                        <p className="text-sm font-semibold text-slate-800">{prefillRazon}</p>
                                                    </div>
                                                )}
                                                <div className="p-3 rounded-xl bg-white border border-emerald-100">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">RIF</p>
                                                    <p className="text-sm font-semibold text-slate-800">{prefillDoc}</p>
                                                </div>
                                                {prefillTipo && (
                                                    <div className="p-3 rounded-xl bg-white border border-emerald-100">
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Tipo</p>
                                                        <p className="text-sm font-semibold text-slate-800">{prefillTipo}</p>
                                                    </div>
                                                )}
                                                {prefillEstado && (
                                                    <div className="p-3 rounded-xl bg-white border border-emerald-100">
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Estado</p>
                                                        <p className="text-sm font-semibold text-slate-800">{prefillEstado}</p>
                                                    </div>
                                                )}
                                                {prefillMunicipio && (
                                                    <div className="p-3 rounded-xl bg-white border border-emerald-100">
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Municipio</p>
                                                        <p className="text-sm font-semibold text-slate-800">{prefillMunicipio}</p>
                                                    </div>
                                                )}
                                                {prefillParroquia && (
                                                    <div className="p-3 rounded-xl bg-white border border-emerald-100">
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Parroquia</p>
                                                        <p className="text-sm font-semibold text-slate-800">{prefillParroquia}</p>
                                                    </div>
                                                )}
                                                {prefillTel && (
                                                    <div className="p-3 rounded-xl bg-white border border-emerald-100">
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Teléfono</p>
                                                        <p className="text-sm font-semibold text-slate-800">{prefillTel}</p>
                                                    </div>
                                                )}
                                            </div>
                                            {!prefillParroquia && prefillEstado && (
                                                <div className="space-y-1.5 mt-2">
                                                    <Label className={labelClass}>Parroquia / Ciudad</Label>
                                                    <Controller name="parroquia" control={control} render={({ field }) => (
                                                        <Select value={field.value || ''} onValueChange={field.onChange}>
                                                            <SelectTrigger className="h-11 rounded-xl bg-white border-slate-200 shadow-sm">
                                                                <SelectValue placeholder="Seleccionar parroquia..." />
                                                            </SelectTrigger>
                                                            <SelectContent>{getCiudades(prefillEstado).map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                                                        </Select>
                                                    )} />
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {!hasPrefill && (
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="p-1.5 rounded-lg" style={{ background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)' }}>
                                                    <Building className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">Datos de la Empresa</p>
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
                                                            <SelectTrigger className={cn("h-11 rounded-xl bg-white border-slate-200 shadow-sm", errors.tipo_empresa && 'border-red-400')}><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
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

                                    <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #cbd5e1, transparent)' }} />

                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="p-1.5 rounded-lg" style={{ background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)' }}>
                                                <Users className="h-4 w-4 text-emerald-600" />
                                            </div>
                                            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">Representante Legal</p>
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

                                    <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #cbd5e1, transparent)' }} />

                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="p-1.5 rounded-lg" style={{ background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)' }}>
                                                <Lock className="h-4 w-4 text-blue-700" />
                                            </div>
                                            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-800">{hasPrefill ? 'Seguridad' : 'Seguridad y Ubicación'}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1.5">
                                                <Label htmlFor="password" className={labelClass}>Contraseña</Label>
                                                <div className="relative">
                                                    <Input id="password" type={showPassword ? 'text' : 'password'} {...register('password')} className={cn(inputClass, 'pr-10', errors.password && 'border-red-400')} />
                                                    <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors" tabIndex={-1}>
                                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5">
                                                    {passwordChecks.map((c, i) => (
                                                        <span key={i} className={cn(
                                                            "text-[11px] font-bold transition-colors flex items-center gap-1",
                                                            c.ok ? "text-emerald-500" : "text-slate-300"
                                                        )}>
                                                            <span className={cn("w-1.5 h-1.5 rounded-full", c.ok ? "bg-emerald-500" : "bg-slate-200")} />
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
                                                                <SelectTrigger className={cn("h-11 rounded-xl bg-white border-slate-200 shadow-sm", errors.estado_empresa && 'border-red-400')}><SelectValue placeholder="Estado..." /></SelectTrigger>
                                                                <SelectContent>{ESTADOS_VE.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
                                                            </Select>
                                                        )} />
                                                        {errors.estado_empresa && <p className={errorClass}>{errors.estado_empresa.message}</p>}
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <Label className={labelClass}>Municipio</Label>
                                                        <Controller name="municipio_empresa" control={control} render={({ field }) => (
                                                            <Select value={field.value} onValueChange={field.onChange} disabled={!estadoEmpresa}>
                                                                <SelectTrigger className={cn("h-11 rounded-xl bg-white border-slate-200 shadow-sm", errors.municipio_empresa && 'border-red-400')}>
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
                                                                <SelectTrigger className="h-11 rounded-xl bg-white border-slate-200 shadow-sm">
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

                                    <label className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer select-none group hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                                        <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-blue-600 shrink-0" />
                                        <span className="text-sm text-slate-600 leading-relaxed">
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
                                        <h2 className="text-xl font-black text-slate-800">Verifica tu identidad</h2>
                                        <p className="text-sm text-slate-500">Elige cómo recibir tu código de verificación de 6 dígitos.</p>
                                    </div>

                                    {verifVerified ? (
                                        <div className="text-center py-6 space-y-4">
                                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl shadow-lg shadow-emerald-100" style={{ background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)' }}>
                                                <CheckCircle className="h-10 w-10 text-emerald-600" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-black text-emerald-600 uppercase tracking-widest">¡Verificado!</p>
                                                <p className="text-sm text-slate-500 mt-1">{verifDestino}</p>
                                            </div>
                                        </div>
                                    ) : !verifSent ? (
                                        <div className="space-y-3">
                                            <button
                                                type="button"
                                                onClick={() => sendVerificationCode('email')}
                                                disabled={verifLoading}
                                                className="w-full p-4 rounded-2xl border-2 border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 flex items-center gap-4 group"
                                            >
                                                <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)' }}>
                                                    <Mail className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <p className="text-sm font-black text-slate-800">Correo Electrónico</p>
                                                    <p className="text-xs text-slate-400 mt-0.5">{getValues('repEmail')}</p>
                                                </div>
                                                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => sendVerificationCode('sms')}
                                                disabled={verifLoading}
                                                className="w-full p-4 rounded-2xl border-2 border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200 flex items-center gap-4 group"
                                            >
                                                <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)' }}>
                                                    <Phone className="h-5 w-5 text-emerald-600" />
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <p className="text-sm font-black text-slate-800">SMS</p>
                                                    <p className="text-xs text-slate-400 mt-0.5">{getValues('telefono') || 'Teléfono registrado'}</p>
                                                </div>
                                                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => sendVerificationCode('whatsapp')}
                                                disabled={verifLoading}
                                                className="w-full p-4 rounded-2xl border-2 border-slate-200 bg-white hover:border-green-500 hover:bg-green-50 transition-all duration-200 flex items-center gap-4 group"
                                            >
                                                <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #bbf7d0, #86efac)' }}>
                                                    <MessageCircle className="h-5 w-5 text-green-700" />
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <p className="text-sm font-black text-slate-800">WhatsApp</p>
                                                    <p className="text-xs text-slate-400 mt-0.5">{getValues('telefono') || 'Teléfono registrado'}</p>
                                                </div>
                                                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-green-600 transition-colors" />
                                            </button>

                                            {verifLoading && (
                                                <div className="flex items-center justify-center gap-2 py-2">
                                                    <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                                                    <p className="text-xs text-slate-500 font-bold">Enviando código...</p>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2.5 rounded-xl" style={{ background: verifMethod === 'email' ? 'linear-gradient(135deg, #dbeafe, #bfdbfe)' : 'linear-gradient(135deg, #d1fae5, #a7f3d0)' }}>
                                                    {verifMethod === 'email' ? <Mail className="h-5 w-5 text-blue-600" /> : verifMethod === 'whatsapp' ? <MessageCircle className="h-5 w-5 text-green-700" /> : <Phone className="h-5 w-5 text-emerald-600" />}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs font-black uppercase tracking-widest text-slate-700">
                                                        {verifMethod === 'email' ? 'Código enviado por correo' : verifMethod === 'sms' ? 'Código enviado por SMS' : 'Código enviado por WhatsApp'}
                                                    </p>
                                                    <p className="text-sm text-slate-500">{verifDestino}</p>
                                                </div>
                                                <button type="button" onClick={() => { setVerifSent(false); setVerifCode(''); setVerifMethod(null); }} className="text-xs font-bold text-slate-400 hover:text-slate-700 px-2 py-1 rounded-lg hover:bg-white transition-colors">Cambiar</button>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center justify-center gap-2 py-1">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                    <p className="text-xs text-emerald-600 font-black uppercase tracking-widest">
                                                        {verifMethod === 'email' ? 'Código enviado a tu correo' : verifMethod === 'sms' ? 'Código enviado por SMS' : 'Código enviado por WhatsApp'}
                                                    </p>
                                                </div>
                                                <Input
                                                    placeholder="000000"
                                                    maxLength={6}
                                                    value={verifCode}
                                                    onChange={e => setVerifCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                    className="text-center text-3xl font-black tracking-[0.6em] h-16 rounded-2xl bg-white border-2 border-slate-200 focus:border-blue-400 text-slate-800 shadow-sm"
                                                />
                                                <Button type="button" className="w-full h-12 rounded-xl font-bold text-white shadow-md" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }} onClick={verifyCode} disabled={verifLoading || verifCode.length !== 6}>
                                                    {verifLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Verificando...</> : <><ShieldCheck className="mr-2 h-4 w-4" />Verificar Código</>}
                                                </Button>
                                                <div className="text-center">
                                                    {countdown > 0 ? (
                                                        <p className="text-xs text-slate-500">Reenviar en <span className="font-bold text-blue-600">{countdown}s</span></p>
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
                                        <div className="relative w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl shadow-emerald-100" style={{ background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)' }}>
                                            <CheckCircle className="h-10 w-10 text-emerald-600" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-black uppercase tracking-tight" style={{ background: 'linear-gradient(135deg, #10b981, #1e40af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>¡Cuenta Creada!</h2>
                                        <p className="text-base text-slate-500">Tu empresa ya está registrada en <strong className="text-slate-800">Asesoría Contable</strong>.</p>
                                    </div>

                                    {planData && (
                                        <div className={cn("p-4 rounded-2xl border-2 mx-auto max-w-xs", colorMap[planData.color].bg, colorMap[planData.color].borderActive)}>
                                            <div className="flex items-center justify-center gap-3">
                                                <div className={cn("p-2 rounded-xl bg-gradient-to-br", colorMap[planData.color].gradient)}>
                                                    <planData.icon className="h-4 w-4 text-white" />
                                                </div>
                                                <div>
                                                    <p className={cn("text-xs font-black uppercase tracking-widest", colorMap[planData.color].text)}>Plan {planData.nombre}</p>
                                                    <p className="text-sm font-black text-slate-800">${planData.precio}/mes</p>
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
                                            <div key={i} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                                                <item.icon className="h-5 w-5 text-blue-600" />
                                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Button className="w-full max-w-xs h-12 rounded-xl font-bold text-sm text-white shadow-md" style={{ background: 'linear-gradient(135deg, #3b82f6, #1e40af)' }} onClick={() => { router.push('/resumen-negocio' as any); }}>
                                        Ir al Portal Contable <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </div>

                        {step < TOTAL_STEPS && (
                            <div className="flex justify-between px-7 pb-5">
                                <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1} className="rounded-xl h-11 px-6 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800">
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
                                    <Button type="submit" disabled={isLoading || !verifVerified} className="rounded-xl h-11 px-6 text-white font-bold shadow-md" style={{ background: 'linear-gradient(135deg, #3b82f6, #1e40af)' }}>
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
