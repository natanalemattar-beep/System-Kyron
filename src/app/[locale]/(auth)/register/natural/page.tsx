'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  User, Loader2, CircleCheck as CheckCircle, ArrowRight, ArrowLeft,
  MapPin, Phone, Mail, Calendar as CalendarIcon, Shield, Eye, EyeOff,
  MessageSquare, RefreshCw, ShieldCheck, ChevronDown, Sparkles, Globe,
  Lock, Fingerprint, Upload,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useVerificationPoll } from '@/hooks/use-verification-poll';
import { DocumentInput } from '@/components/document-input';
import { DocumentUpload, type UploadedDoc } from '@/components/document-upload';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';
import { ESTADOS_VE, getMunicipios, getCiudades } from '@/lib/venezuela-geo';

const TOTAL_STEPS = 5;
const FORM_STEPS = TOTAL_STEPS - 1;

const fullSchema = z.object({
  nombre: z.string().min(2, 'El nombre es requerido.'),
  apellido: z.string().min(2, 'El apellido es requerido.'),
  cedula: z.string().min(7).regex(/^[VE][-]\d+$/, 'Formato: V-18745632 o E-12345678'),
  fecha_nacimiento: z.string().min(1, 'La fecha de nacimiento es requerida.'),
  genero: z.string().min(1, 'Selecciona el género.'),
  estado_civil: z.string().min(1, 'Selecciona el estado civil.'),
  telefono: z.string().min(10, 'El teléfono principal es requerido.').regex(/^[0-9()+\-\s]+$/, 'Teléfono inválido.'),
  telefono_alt: z.string().optional(),
  estado_residencia: z.string().min(1, 'El estado es requerido.'),
  municipio: z.string().min(2, 'El municipio es requerido.'),
  ciudad: z.string().min(2, 'La ciudad/parroquia es requerida.'),
  direccion: z.string().min(10, 'La dirección completa es requerida.'),
  email: z.string().email('Correo electrónico inválido.'),
  password: z.string()
    .min(8, 'Mínimo 8 caracteres.')
    .regex(/[A-Z]/, 'Debe tener al menos una mayúscula.')
    .regex(/[a-z]/, 'Debe tener al menos una minúscula.')
    .regex(/[0-9]/, 'Debe tener al menos un número.')
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/, 'Debe tener al menos un carácter especial (!@#$%...).'),
  confirmPassword: z.string().min(8, 'Confirma tu contraseña.'),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Las contraseñas no coinciden.',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof fullSchema>;

const step1Fields = ['nombre', 'apellido', 'cedula', 'fecha_nacimiento', 'genero', 'estado_civil'] as const;
const step2Fields = ['telefono', 'estado_residencia', 'municipio', 'ciudad', 'direccion'] as const;
const step3Fields = ['email', 'password', 'confirmPassword'] as const;

export default function RegisterNaturalPage() {
  const searchParams = useSearchParams();
  const prefilledDoc = searchParams.get('doc') || '';

  const [step, setStep] = useState(() => {
    try {
      const s = typeof window !== 'undefined' ? sessionStorage.getItem('kyron-register-natural-step') : null;
      const parsed = s ? parseInt(s, 10) : 1;
      return parsed >= 1 && parsed <= 3 ? parsed : 1;
    } catch { return 1; }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, UploadedDoc | null>>({});
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [verifMethod, setVerifMethod] = useState<'email' | 'sms'>('email');
  const [verifSent, setVerifSent] = useState(false);
  const [verifCode, setVerifCode] = useState('');
  const [verifLoading, setVerifLoading] = useState(false);
  const [verifVerified, setVerifVerified] = useState(false);
  const [verifDestino, setVerifDestino] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [devCode, setDevCode] = useState<string | null>(null);

  const { toast } = useToast();
  const router = useRouter();

  const onMagicLinkVerified = useCallback(() => {
    setVerifVerified(true);
    toast({ title: '¡Verificado!', description: 'Tu identidad fue confirmada vía enlace de verificación.' });
  }, [toast]);

  useVerificationPoll(verifDestino, verifMethod === 'email' && verifSent && !verifVerified, onMagicLinkVerified);

  const prefilledNombre = searchParams.get('nombre') || '';
  const prefilledApellido = searchParams.get('apellido') || '';
  const prefilledEstado = searchParams.get('estado') || '';
  const prefilledMunicipio = searchParams.get('municipio') || '';
  const prefilledFechaNac = searchParams.get('fechaNac') || '';
  const prefilledSexo = searchParams.get('sexo') || '';
  const prefilledCivil = searchParams.get('civil') || '';
  const prefilledParroquia = searchParams.get('parroquia') || '';

  const hasSaimeData = !!(prefilledNombre && prefilledApellido);

  const getSavedFormData = (): Partial<FormData> => {
    try {
      const saved = sessionStorage.getItem('kyron-register-natural');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  };

  const savedData = typeof window !== 'undefined' ? getSavedFormData() : {};

  const { register, handleSubmit, control, getValues, watch, setValue, formState: { errors }, trigger } =
    useForm<FormData>({
      resolver: zodResolver(fullSchema),
      mode: 'onTouched',
      defaultValues: {
        cedula: prefilledDoc || savedData.cedula || undefined,
        nombre: prefilledNombre || savedData.nombre || undefined,
        apellido: prefilledApellido || savedData.apellido || undefined,
        estado_residencia: prefilledEstado || savedData.estado_residencia || undefined,
        municipio: prefilledMunicipio || savedData.municipio || undefined,
        ciudad: prefilledParroquia || savedData.ciudad || undefined,
        fecha_nacimiento: prefilledFechaNac || savedData.fecha_nacimiento || undefined,
        genero: prefilledSexo || savedData.genero || undefined,
        estado_civil: prefilledCivil || savedData.estado_civil || undefined,
        telefono: savedData.telefono || undefined,
        telefono_alt: savedData.telefono_alt || undefined,
        direccion: savedData.direccion || undefined,
        email: savedData.email || undefined,
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

  useEffect(() => {
    const subscription = watch((data) => {
      const { password, confirmPassword, ...safeData } = data;
      try { sessionStorage.setItem('kyron-register-natural', JSON.stringify(safeData)); } catch {}
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    try { sessionStorage.setItem('kyron-register-natural-step', String(step)); } catch {}
  }, [step]);

  const estadoResidencia = watch('estado_residencia');
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) { isInitialMount.current = false; return; }
    setValue('municipio', '');
    setValue('ciudad', '');
  }, [estadoResidencia]);

  const nextStep = async () => {
    const fields = step === 1 ? step1Fields : step === 2 ? step2Fields : step3Fields;
    const valid = await trigger(fields as any);
    if (step === 3 && !acceptTerms) return;
    if (valid) setStep(s => s + 1);
  };

  const prevStep = () => {
    if (step === 4) {
      setVerifSent(false);
      setVerifCode('');
      setVerifVerified(false);
    }
    setStep(s => s - 1);
  };

  const sendVerificationCode = async () => {
    setVerifLoading(true);
    const email = getValues('email');
    const telefono = getValues('telefono');
    const destino = verifMethod === 'email' ? email : telefono;
    setVerifDestino(destino);

    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destino, tipo: verifMethod }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast({ title: 'Error al enviar código', description: json.error, variant: 'destructive' });
        return;
      }
      setVerifSent(true);
      startCountdown();
      const returnedCode = json.devCode || json.kyronCode || null;
      setDevCode(returnedCode);
      if (returnedCode) {
        setVerifCode(returnedCode);
      }
      toast({
        title: 'Código enviado',
        description: returnedCode
          ? 'Código de verificación generado por System Kyron.'
          : verifMethod === 'email'
            ? `Revisa tu correo ${email}`
            : `Mensaje enviado al ${telefono}`,
      });
    } catch {
      toast({ title: 'Error de conexión', description: 'No se pudo enviar el código.', variant: 'destructive' });
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
      toast({ title: '¡Verificado!', description: 'Tu identidad ha sido confirmada.' });
    } catch {
      toast({ title: 'Error', description: 'No se pudo verificar el código.', variant: 'destructive' });
      setVerifCode('');
    } finally {
      setVerifLoading(false);
      verifyingRef.current = false;
    }
  }, [verifDestino, verifVerified, toast]);

  useEffect(() => {
    if (verifCode.length === 6 && verifSent && !verifVerified) {
      verifyCode(verifCode);
    }
  }, [verifCode, verifSent, verifVerified, verifyCode]);

  const submittingRef = useRef(false);
  const onSubmit = async (data: FormData) => {
    if (!verifVerified) {
      toast({ title: 'Verificación requerida', description: 'Debes verificar tu identidad antes de crear la cuenta.', variant: 'destructive' });
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
          tipo: 'natural',
          ...data,
          email_verificado: verifMethod === 'email',
          telefono_verificado: verifMethod === 'sms',
          documentos_adjuntos: Object.fromEntries(
            Object.entries(uploadedDocs).filter(([, v]) => v != null)
          ),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        if (res.status === 409) {
          toast({ title: 'Cuenta existente', description: 'Ya existe una cuenta con ese correo. Serás redirigido al inicio de sesión.', variant: 'destructive' });
          try { sessionStorage.removeItem('kyron-register-natural'); sessionStorage.removeItem('kyron-register-natural-step'); } catch {}
          setTimeout(() => router.push('/login-personal'), 2000);
          return;
        }
        toast({ title: 'Error al registrarse', description: json.error, variant: 'destructive' });
        return;
      }
      setRegisteredEmail(data.email);
      try { sessionStorage.removeItem('kyron-register-natural'); sessionStorage.removeItem('kyron-register-natural-step'); } catch {}
      setStep(TOTAL_STEPS);
    } catch {
      toast({ title: 'Error', description: 'Error de conexión. Intenta de nuevo.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
      submittingRef.current = false;
    }
  };

  const stepLabels = ['Datos Personales', 'Contacto y Dirección', 'Acceso', 'Verificación'];
  const stepIcons = [User, Phone, Lock, Fingerprint];

  const Field = ({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) => (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-[13px] font-semibold text-foreground/80 uppercase tracking-wider">{label}</Label>
      {children}
      {error && <p className="text-destructive text-xs font-medium">{error}</p>}
    </div>
  );

  if (step === TOTAL_STEPS) {
    return (
      <div className="w-full max-w-lg mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-card border border-border shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-emerald-400/10 to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

          <div className="relative px-8 py-12 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 mb-8 shadow-xl shadow-emerald-500/20">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>

            <div className="space-y-2 mb-8">
              <p className="text-sm font-bold text-emerald-500 uppercase tracking-widest">Registro Exitoso</p>
              <h2 className="text-3xl font-black text-foreground leading-tight">
                ¡Bienvenido a<br />
                <span className="bg-gradient-to-r from-primary via-blue-500 to-emerald-500 bg-clip-text text-transparent">
                  System Kyron!
                </span>
              </h2>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto mt-3">
                Tu cuenta ha sido verificada con
                <span className="font-bold text-primary block mt-1">{registeredEmail}</span>
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                { icon: Mail, text: 'Inicia sesión con tu correo y contraseña', color: 'from-blue-500 to-cyan-500' },
                { icon: Globe, text: 'Accede a documentos y servicios personales', color: 'from-emerald-500 to-teal-500' },
                { icon: Sparkles, text: 'Completa tu perfil para todos los módulos', color: 'from-amber-500 to-orange-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 border border-border/50 text-left">
                  <div className={cn("w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0", item.color)}>
                    <item.icon className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm text-foreground/80 font-medium">{item.text}</p>
                </div>
              ))}
            </div>

            <Button
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-primary via-blue-500 to-emerald-500 hover:opacity-90 text-white font-bold text-base shadow-lg shadow-primary/20 transition-all"
              onClick={() => {
                router.push('/');
              }}
            >
              Explorar la Plataforma
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-card border border-border shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/8 via-blue-500/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-emerald-500/6 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative px-8 pt-8 pb-4">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-1 rounded-full bg-gradient-to-r from-primary to-blue-500" />
                <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">System Kyron</span>
              </div>
              <h1 className="text-2xl font-black text-foreground leading-tight">
                Crear tu Cuenta
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Registro de persona natural
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-muted/50 rounded-full px-3 py-1.5 border border-border/50">
              <span className="text-xs font-bold text-primary">{step}</span>
              <span className="text-xs text-muted-foreground">/</span>
              <span className="text-xs text-muted-foreground">{FORM_STEPS}</span>
            </div>
          </div>

          <div className="flex gap-1.5 mb-2">
            {stepLabels.map((label, i) => {
              const StepIcon = stepIcons[i];
              const isActive = i + 1 === step;
              const isDone = i + 1 < step;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (isDone) setStep(i + 1);
                  }}
                  aria-label={`Paso ${i + 1}: ${label}`}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-300 border",
                    isActive
                      ? "bg-primary text-white border-primary shadow-md shadow-primary/25"
                      : isDone
                        ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 cursor-pointer"
                        : "bg-muted/30 text-muted-foreground border-transparent cursor-default"
                  )}
                >
                  <StepIcon className="h-3.5 w-3.5 shrink-0" />
                  <span className="hidden sm:inline truncate" aria-hidden="true">{label}</span>
                </button>
              );
            })}
          </div>

          <div className="h-1 rounded-full bg-muted/50 overflow-hidden mt-3 mb-1">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary via-blue-500 to-emerald-500 transition-all duration-700 ease-out"
              style={{ width: `${(step / FORM_STEPS) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative px-8 py-6 space-y-5">

            {step === 1 && (
              <>
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-500/20">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Información Personal</p>
                    <p className="text-xs text-muted-foreground">{hasSaimeData ? 'Datos verificados por SAIME' : 'Tus datos de identidad'}</p>
                  </div>
                </div>

                {hasSaimeData && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                      Datos obtenidos del SAIME — los campos verificados no se pueden editar
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <Field id="nombre" label="Nombre(s)" error={errors.nombre?.message}>
                    <Input id="nombre" placeholder="Juan Carlos" readOnly={!!prefilledNombre} className={cn("rounded-xl bg-muted/30 border-border/50 focus:bg-background h-11", prefilledNombre && "bg-muted/60 text-foreground/80 cursor-not-allowed")} {...register('nombre')} />
                  </Field>
                  <Field id="apellido" label="Apellido(s)" error={errors.apellido?.message}>
                    <Input id="apellido" placeholder="González Pérez" readOnly={!!prefilledApellido} className={cn("rounded-xl bg-muted/30 border-border/50 focus:bg-background h-11", prefilledApellido && "bg-muted/60 text-foreground/80 cursor-not-allowed")} {...register('apellido')} />
                  </Field>
                </div>

                <Field id="cedula" label="Cédula de Identidad" error={errors.cedula?.message}>
                  <Controller name="cedula" control={control} render={({ field }) => (
                    <DocumentInput type="cedula" value={field.value || ''} onChange={prefilledDoc ? () => {} : field.onChange} error={!!errors.cedula} />
                  )} />
                </Field>

                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                      <Upload className="h-3 w-3 text-white" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wider text-foreground">Documentos de Identidad</p>
                  </div>
                  <DocumentUpload
                    requirements={[
                      { id: 'cedula_frente', label: 'Cédula — Lado Frontal', description: 'Foto o escaneo legible del frente de su cédula', required: true },
                      { id: 'cedula_reverso', label: 'Cédula — Lado Reverso', description: 'Foto o escaneo legible del reverso de su cédula', required: true },
                    ]}
                    documents={uploadedDocs}
                    onDocumentsChange={setUploadedDocs}
                  />
                </div>

                <Field id="fecha_nacimiento" label="Fecha de Nacimiento" error={errors.fecha_nacimiento?.message}>
                  <Controller
                    name="fecha_nacimiento"
                    control={control}
                    render={({ field }) => {
                      const dateValue = field.value
                        ? parse(field.value, 'yyyy-MM-dd', new Date())
                        : undefined;
                      const isValidDate = dateValue && !isNaN(dateValue.getTime());
                      if (prefilledFechaNac && isValidDate) {
                        return (
                          <div className="flex items-center gap-2 h-11 px-3 rounded-xl bg-muted/60 border border-border/50 cursor-not-allowed">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="text-sm text-foreground/80">{format(dateValue!, "d 'de' MMMM, yyyy", { locale: es })}</span>
                          </div>
                        );
                      }
                      return (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="fecha_nacimiento"
                              className={cn(
                                "w-full justify-start text-left font-normal rounded-xl bg-muted/30 border-border/50 h-11 hover:bg-muted/50",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground shrink-0" />
                              <span className="flex-1">
                                {isValidDate
                                  ? format(dateValue!, "d 'de' MMMM, yyyy", { locale: es })
                                  : "Seleccionar fecha"}
                              </span>
                              <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={isValidDate ? dateValue : undefined}
                              onSelect={(date) => {
                                if (date) field.onChange(format(date, 'yyyy-MM-dd'));
                              }}
                              defaultMonth={isValidDate ? dateValue : new Date(1990, 0)}
                              captionLayout="dropdown-buttons"
                              fromYear={1930}
                              toYear={new Date().getFullYear()}
                              locale={es}
                              disabled={(date) => date > new Date() || date < new Date(1920, 0, 1)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      );
                    }}
                  />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field id="genero" label="Género" error={errors.genero?.message}>
                    <Controller
                      name="genero"
                      control={control}
                      render={({ field }) => {
                        if (prefilledSexo) {
                          return (
                            <div className="flex items-center h-11 px-3 rounded-xl bg-muted/60 border border-border/50 cursor-not-allowed">
                              <span className="text-sm text-foreground/80">{field.value}</span>
                            </div>
                          );
                        }
                        return (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger id="genero" className="rounded-xl bg-muted/30 border-border/50 h-11">
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Masculino">Masculino</SelectItem>
                              <SelectItem value="Femenino">Femenino</SelectItem>
                              <SelectItem value="No binario">No binario</SelectItem>
                              <SelectItem value="Prefiero no decir">Prefiero no decir</SelectItem>
                            </SelectContent>
                          </Select>
                        );
                      }}
                    />
                  </Field>
                  <Field id="estado_civil" label="Estado Civil" error={errors.estado_civil?.message}>
                    <Controller
                      name="estado_civil"
                      control={control}
                      render={({ field }) => {
                        if (prefilledCivil) {
                          return (
                            <div className="flex items-center h-11 px-3 rounded-xl bg-muted/60 border border-border/50 cursor-not-allowed">
                              <span className="text-sm text-foreground/80">{field.value}</span>
                            </div>
                          );
                        }
                        return (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger id="estado_civil" className="rounded-xl bg-muted/30 border-border/50 h-11">
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Soltero/a">Soltero/a</SelectItem>
                              <SelectItem value="Casado/a">Casado/a</SelectItem>
                              <SelectItem value="Divorciado/a">Divorciado/a</SelectItem>
                              <SelectItem value="Viudo/a">Viudo/a</SelectItem>
                              <SelectItem value="Unión Estable de Hecho">Unión Estable de Hecho</SelectItem>
                            </SelectContent>
                          </Select>
                        );
                      }}
                    />
                  </Field>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-500/20">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Contacto y Dirección</p>
                    <p className="text-xs text-muted-foreground">Cómo te ubicamos</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field id="telefono" label="Teléfono Principal" error={errors.telefono?.message}>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input id="telefono" placeholder="0412-1234567" className="pl-10 rounded-xl bg-muted/30 border-border/50 focus:bg-background h-11" {...register('telefono')} />
                    </div>
                  </Field>
                  <Field id="telefono_alt" label="Teléfono Alternativo" error={errors.telefono_alt?.message}>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input id="telefono_alt" placeholder="0424-7654321" className="pl-10 rounded-xl bg-muted/30 border-border/50 focus:bg-background h-11" {...register('telefono_alt')} />
                    </div>
                  </Field>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-1" />

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-orange-500/5 border border-orange-500/10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/20">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Dirección de Residencia</p>
                    <p className="text-xs text-muted-foreground">Tu ubicación en Venezuela</p>
                  </div>
                </div>

                <Field id="estado_residencia" label="Estado / Entidad Federal" error={errors.estado_residencia?.message}>
                  <Controller
                    name="estado_residencia"
                    control={control}
                    render={({ field }) => {
                      if (prefilledEstado) {
                        return (
                          <div className="flex items-center h-11 px-3 rounded-xl bg-muted/60 border border-border/50 cursor-not-allowed">
                            <span className="text-sm text-foreground/80">{field.value}</span>
                          </div>
                        );
                      }
                      return (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id="estado_residencia" className="rounded-xl bg-muted/30 border-border/50 h-11">
                            <SelectValue placeholder="Selecciona el estado" />
                          </SelectTrigger>
                          <SelectContent>
                            {ESTADOS_VE.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      );
                    }}
                  />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field id="municipio" label="Municipio" error={errors.municipio?.message}>
                    <Controller
                      name="municipio"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange} disabled={!estadoResidencia || !!prefilledMunicipio}>
                          <SelectTrigger id="municipio" className={cn("rounded-xl bg-muted/30 border-border/50 h-11", prefilledMunicipio && "bg-muted/60 text-foreground/80 cursor-not-allowed")}>
                            <SelectValue placeholder={estadoResidencia ? 'Selecciona el municipio' : 'Primero selecciona el estado'} />
                          </SelectTrigger>
                          <SelectContent>
                            {getMunicipios(estadoResidencia || '').map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>
                  <Field id="ciudad" label="Ciudad / Parroquia" error={errors.ciudad?.message}>
                    <Controller
                      name="ciudad"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange} disabled={!estadoResidencia || !!prefilledParroquia}>
                          <SelectTrigger id="ciudad" className={cn("rounded-xl bg-muted/30 border-border/50 h-11", prefilledParroquia && "bg-muted/60 text-foreground/80 cursor-not-allowed")}>
                            <SelectValue placeholder={estadoResidencia ? 'Selecciona ciudad/parroquia' : 'Primero selecciona el estado'} />
                          </SelectTrigger>
                          <SelectContent>
                            {getCiudades(estadoResidencia || '').map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>
                </div>

                <Field id="direccion" label="Dirección Completa" error={errors.direccion?.message}>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <textarea
                      id="direccion"
                      placeholder="Av. Principal, Residencias X, Piso 2, Apto 2-B..."
                      className="flex min-h-[80px] w-full rounded-xl border border-border/50 bg-muted/30 px-3 py-2.5 pl-10 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:bg-background transition-colors"
                      {...register('direccion')}
                    />
                  </div>
                </Field>
              </>
            )}

            {step === 3 && (
              <>
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-amber-500/20">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Credenciales de Acceso</p>
                    <p className="text-xs text-muted-foreground">Tu correo y contraseña</p>
                  </div>
                </div>

                <Field id="email" label="Correo Electrónico" error={errors.email?.message}>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input id="email" type="email" placeholder="tu@correo.com" className="pl-10 rounded-xl bg-muted/30 border-border/50 focus:bg-background h-11" {...register('email')} />
                  </div>
                </Field>

                <Field id="password" label="Contraseña" error={errors.password?.message}>
                  <div className="relative">
                    <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input id="password" type={showPassword ? 'text' : 'password'} autoCapitalize="none" autoCorrect="off" className="pl-10 pr-11 rounded-xl bg-muted/30 border-border/50 focus:bg-background h-11" {...register('password')} />
                    <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex gap-1 flex-1">
                      {[1,2,3,4].map(i => (
                        <div key={i} className={cn(
                          "h-1 flex-1 rounded-full transition-colors",
                          (() => {
                            const pw = getValues('password') || '';
                            const strength = (pw.length >= 8 ? 1 : 0) + (/[A-Z]/.test(pw) ? 1 : 0) + (/[0-9]/.test(pw) ? 1 : 0) + (/[^A-Za-z0-9]/.test(pw) ? 1 : 0);
                            return i <= strength
                              ? strength <= 1 ? 'bg-red-400' : strength <= 2 ? 'bg-amber-400' : strength <= 3 ? 'bg-blue-400' : 'bg-emerald-400'
                              : 'bg-muted';
                          })()
                        )} />
                      ))}
                    </div>
                    <span className="text-[10px] text-muted-foreground">Min. 8, mayúscula, minúscula, número y carácter especial</span>
                  </div>
                </Field>

                <Field id="confirmPassword" label="Confirmar Contraseña" error={errors.confirmPassword?.message}>
                  <div className="relative">
                    <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} autoCapitalize="none" autoCorrect="off" className="pl-10 pr-11 rounded-xl bg-muted/30 border-border/50 focus:bg-background h-11" {...register('confirmPassword')} />
                    <button type="button" onClick={() => setShowConfirmPassword(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </Field>

                <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-muted/30 border border-border/50 cursor-pointer select-none group hover:bg-muted/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-border accent-primary shrink-0"
                  />
                  <span className="text-xs text-muted-foreground">
                    He leído y acepto los{' '}
                    <a href="/terms" target="_blank" className="text-primary font-semibold hover:underline" onClick={(e) => e.stopPropagation()}>Términos de Servicio</a>{' '}
                    y la{' '}
                    <a href="/politica-privacidad" target="_blank" className="text-primary font-semibold hover:underline" onClick={(e) => e.stopPropagation()}>Política de Privacidad</a>.
                  </span>
                </label>
                {!acceptTerms && step === 3 && (
                  <p className="text-xs text-destructive mt-1">Debes aceptar los términos y condiciones para continuar.</p>
                )}
              </>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-violet-500/5 border border-violet-500/10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-md shadow-violet-500/20">
                    <Fingerprint className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Verificación de Identidad</p>
                    <p className="text-xs text-muted-foreground">Confirma que eres tú</p>
                  </div>
                </div>

                {verifVerified ? (
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 mb-5 shadow-lg shadow-emerald-500/20">
                      <CheckCircle className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-lg font-black text-foreground">¡Identidad Verificada!</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      Tu {verifMethod === 'email' ? 'correo electrónico' : 'número de teléfono'} ha sido confirmado.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Para proteger tu cuenta, necesitamos verificar tu identidad. Elige cómo recibir tu código de 6 dígitos.
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => { setVerifMethod('email'); setVerifSent(false); setVerifCode(''); }}
                        className={cn(
                          "p-4 rounded-2xl border-2 transition-all text-left group",
                          verifMethod === 'email'
                            ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                            : 'border-border/50 bg-muted/20 hover:border-primary/30 hover:bg-muted/40'
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all",
                          verifMethod === 'email'
                            ? 'bg-gradient-to-br from-primary to-blue-500 shadow-md shadow-primary/20'
                            : 'bg-muted/50'
                        )}>
                          <Mail className={cn("h-5 w-5", verifMethod === 'email' ? 'text-white' : 'text-muted-foreground')} />
                        </div>
                        <p className={cn("text-sm font-bold", verifMethod === 'email' ? 'text-primary' : 'text-foreground')}>Por Correo</p>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{getValues('email')}</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => { setVerifMethod('sms'); setVerifSent(false); setVerifCode(''); }}
                        className={cn(
                          "p-4 rounded-2xl border-2 transition-all text-left group",
                          verifMethod === 'sms'
                            ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                            : 'border-border/50 bg-muted/20 hover:border-primary/30 hover:bg-muted/40'
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all",
                          verifMethod === 'sms'
                            ? 'bg-gradient-to-br from-primary to-blue-500 shadow-md shadow-primary/20'
                            : 'bg-muted/50'
                        )}>
                          <MessageSquare className={cn("h-5 w-5", verifMethod === 'sms' ? 'text-white' : 'text-muted-foreground')} />
                        </div>
                        <p className={cn("text-sm font-bold", verifMethod === 'sms' ? 'text-primary' : 'text-foreground')}>Por SMS</p>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{getValues('telefono')}</p>
                      </button>
                    </div>

                    {!verifSent ? (
                      <Button
                        type="button"
                        className="w-full h-12 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-500 hover:opacity-90 text-white font-bold shadow-md shadow-violet-500/20"
                        onClick={sendVerificationCode}
                        disabled={verifLoading}
                      >
                        {verifLoading ? (
                          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...</>
                        ) : (
                          <>{verifMethod === 'email' ? <Mail className="mr-2 h-4 w-4" /> : <MessageSquare className="mr-2 h-4 w-4" />}
                            Enviar Código de Verificación</>
                        )}
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-3.5 bg-primary/5 border border-primary/15 rounded-2xl text-sm text-center">
                          {devCode ? 'Ingresa el código mostrado abajo' : <>Código enviado a <strong className="text-primary">{verifDestino}</strong></>}
                        </div>
                        {devCode && (
                          <div className="p-4 bg-cyan-500/10 border-2 border-cyan-500/30 rounded-2xl text-center">
                            <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Tu código de verificación</p>
                            <p className="text-3xl font-black font-mono tracking-[0.3em] text-cyan-600">{devCode}</p>
                          </div>
                        )}
                        <div className="space-y-2">
                          <Label htmlFor="verif-code" className="text-sm font-semibold">Ingresa el código de 6 dígitos</Label>
                          <Input
                            id="verif-code"
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            placeholder="000000"
                            value={verifCode}
                            onChange={e => setVerifCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            className="text-center text-2xl tracking-[0.5em] font-mono rounded-2xl bg-muted/30 border-border/50 h-14"
                          />
                        </div>
                        {verifLoading && (
                          <div className="flex items-center justify-center gap-2 py-3 text-sm text-primary font-semibold">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Verificando...
                          </div>
                        )}
                        <div className="text-center">
                          {countdown > 0 ? (
                            <p className="text-xs text-muted-foreground">
                              Puedes solicitar otro código en <strong className="text-foreground">{countdown}s</strong>
                            </p>
                          ) : (
                            <button
                              type="button"
                              onClick={sendVerificationCode}
                              disabled={verifLoading}
                              className="text-xs text-primary font-semibold inline-flex items-center gap-1 hover:opacity-80"
                            >
                              <RefreshCw className="h-3 w-3" /> Reenviar código
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {step < TOTAL_STEPS && (
            <div className="px-8 pb-8 pt-2 flex justify-between items-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
                className="rounded-2xl h-12 px-6 border-border/50 gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Anterior
              </Button>

              {step < 3 && (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="rounded-2xl h-12 px-8 bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 text-white font-bold shadow-lg shadow-primary/20 gap-2 flex-1 max-w-[220px]"
                >
                  Siguiente <ArrowRight className="h-4 w-4" />
                </Button>
              )}
              {step === 3 && (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="rounded-2xl h-12 px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90 text-white font-bold shadow-lg shadow-amber-500/20 gap-2"
                >
                  Verificar Identidad <ArrowRight className="h-4 w-4" />
                </Button>
              )}
              {step === 4 && (
                <Button
                  type="submit"
                  disabled={isLoading || !verifVerified}
                  className="rounded-2xl h-12 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 text-white font-bold shadow-lg shadow-emerald-500/20 gap-2"
                >
                  {isLoading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Creando...</>
                  ) : (
                    <>Crear Cuenta <ArrowRight className="h-4 w-4" /></>
                  )}
                </Button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
