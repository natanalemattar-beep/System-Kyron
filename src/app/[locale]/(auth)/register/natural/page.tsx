'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Card, CardContent, CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  User, Loader2, CircleCheck as CheckCircle, ArrowRight, ArrowLeft,
  MapPin, Phone, Mail, Calendar as CalendarIcon, Shield, Eye, EyeOff,
  MessageSquare, RefreshCw, ShieldCheck, ChevronDown,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DocumentInput } from '@/components/document-input';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';

const TOTAL_STEPS = 5;

const ESTADOS_VE = [
  'Amazonas', 'Anzoátegui', 'Apure', 'Aragua', 'Barinas', 'Bolívar', 'Carabobo',
  'Cojedes', 'Delta Amacuro', 'Dependencias Federales', 'Distrito Capital', 'Falcón',
  'Guárico', 'Lara', 'Mérida', 'Miranda', 'Monagas', 'Nueva Esparta', 'Portuguesa',
  'Sucre', 'Táchira', 'Trujillo', 'La Guaira', 'Yaracuy', 'Zulia',
];

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
    .regex(/[0-9]/, 'Debe tener al menos un número.'),
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

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [verifMethod, setVerifMethod] = useState<'email' | 'sms'>('email');
  const [verifSent, setVerifSent] = useState(false);
  const [verifCode, setVerifCode] = useState('');
  const [verifLoading, setVerifLoading] = useState(false);
  const [verifVerified, setVerifVerified] = useState(false);
  const [verifDestino, setVerifDestino] = useState('');
  const [countdown, setCountdown] = useState(0);

  const { toast } = useToast();
  const router = useRouter();

  const { register, handleSubmit, control, getValues, formState: { errors }, trigger } =
    useForm<FormData>({
      resolver: zodResolver(fullSchema),
      mode: 'onTouched',
      defaultValues: {
        cedula: prefilledDoc || undefined,
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

  const nextStep = async () => {
    const fields = step === 1 ? step1Fields : step === 2 ? step2Fields : step3Fields;
    const valid = await trigger(fields as any);
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
      toast({
        title: 'Código enviado',
        description: verifMethod === 'email'
          ? `Revisa tu correo ${email}`
          : `Mensaje enviado al ${telefono}`,
      });
    } catch {
      toast({ title: 'Error de conexión', description: 'No se pudo enviar el código.', variant: 'destructive' });
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
      toast({ title: '¡Verificado!', description: 'Tu identidad ha sido confirmada.' });
    } catch {
      toast({ title: 'Error', description: 'No se pudo verificar el código.', variant: 'destructive' });
    } finally {
      setVerifLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!verifVerified) {
      toast({ title: 'Verificación requerida', description: 'Debes verificar tu identidad antes de crear la cuenta.', variant: 'destructive' });
      return;
    }
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
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast({ title: 'Error al registrarse', description: json.error, variant: 'destructive' });
        return;
      }
      setRegisteredEmail(data.email);
      setStep(TOTAL_STEPS);
    } catch {
      toast({ title: 'Error', description: 'Error de conexión. Intenta de nuevo.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const stepLabels = ['Datos Personales', 'Residencia y Contacto', 'Acceso a la Cuenta', 'Verificación de Identidad', 'Completado'];

  const Field = ({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">{label}</Label>
      {children}
      {error && <p className="text-destructive text-xs font-medium">{error}</p>}
    </div>
  );

  const stepIcons = [User, Phone, Shield, ShieldCheck, CheckCircle];
  const stepColors = ['text-blue-500', 'text-emerald-500', 'text-amber-500', 'text-violet-500', 'text-green-500'];
  const stepBgs = ['bg-blue-500/10', 'bg-emerald-500/10', 'bg-amber-500/10', 'bg-violet-500/10', 'bg-green-500/10'];

  return (
    <div className="w-full max-w-xl mx-auto">
      <Card className="bg-card border-border shadow-lg overflow-hidden">
        <div className="relative bg-gradient-to-r from-blue-600 via-primary to-emerald-500 px-6 py-6">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-50" />
          <div className="relative flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <User className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">
                Registro de Persona Natural
              </h1>
              <p className="text-white/80 text-sm font-medium mt-0.5">
                {step < TOTAL_STEPS
                  ? `Paso ${step} de ${TOTAL_STEPS - 1} · ${stepLabels[step - 1]}`
                  : stepLabels[TOTAL_STEPS - 1]}
              </p>
            </div>
          </div>

          {step < TOTAL_STEPS && (
            <div className="relative mt-5 flex items-center gap-2">
              {Array.from({ length: TOTAL_STEPS - 1 }).map((_, i) => {
                const StepIcon = stepIcons[i];
                const isActive = i + 1 === step;
                const isDone = i + 1 < step;
                return (
                  <div key={i} className="flex items-center flex-1 gap-2">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                      isDone ? "bg-white text-primary" :
                      isActive ? "bg-white/90 text-primary ring-2 ring-white/50 scale-110" :
                      "bg-white/20 text-white/60"
                    )}>
                      {isDone ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <StepIcon className="h-4 w-4" />
                      )}
                    </div>
                    {i < TOTAL_STEPS - 2 && (
                      <div className={cn(
                        "h-0.5 flex-1 rounded-full transition-all duration-500",
                        isDone ? "bg-white" : "bg-white/20"
                      )} />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-5 pt-6">

            {step === 1 && (
              <>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={cn("p-1.5 rounded-lg", stepBgs[0])}>
                    <User className={cn("h-4 w-4", stepColors[0])} />
                  </div>
                  <span className="text-sm font-bold text-foreground tracking-wide">Información Personal</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field id="nombre" label="Nombre(s)" error={errors.nombre?.message}>
                    <Input id="nombre" placeholder="Juan Carlos" className="bg-background border-input" {...register('nombre')} />
                  </Field>
                  <Field id="apellido" label="Apellido(s)" error={errors.apellido?.message}>
                    <Input id="apellido" placeholder="González Pérez" className="bg-background border-input" {...register('apellido')} />
                  </Field>
                </div>
                <Field id="cedula" label="Cédula de Identidad" error={errors.cedula?.message}>
                  <Controller name="cedula" control={control} render={({ field }) => (
                    <DocumentInput type="cedula" value={field.value || ''} onChange={field.onChange} error={!!errors.cedula} />
                  )} />
                </Field>
                <Field id="fecha_nacimiento" label="Fecha de Nacimiento" error={errors.fecha_nacimiento?.message}>
                  <Controller
                    name="fecha_nacimiento"
                    control={control}
                    render={({ field }) => {
                      const dateValue = field.value
                        ? parse(field.value, 'yyyy-MM-dd', new Date())
                        : undefined;
                      const isValidDate = dateValue && !isNaN(dateValue.getTime());
                      return (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="fecha_nacimiento"
                              className={cn(
                                "w-full justify-start text-left font-normal bg-background border-input h-10",
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
                                if (date) {
                                  field.onChange(format(date, 'yyyy-MM-dd'));
                                }
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
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id="genero" className="bg-background border-input">
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Masculino">Masculino</SelectItem>
                            <SelectItem value="Femenino">Femenino</SelectItem>
                            <SelectItem value="No binario">No binario</SelectItem>
                            <SelectItem value="Prefiero no decir">Prefiero no decir</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>
                  <Field id="estado_civil" label="Estado Civil" error={errors.estado_civil?.message}>
                    <Controller
                      name="estado_civil"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id="estado_civil" className="bg-background border-input">
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
                      )}
                    />
                  </Field>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={cn("p-1.5 rounded-lg", stepBgs[1])}>
                    <Phone className={cn("h-4 w-4", stepColors[1])} />
                  </div>
                  <span className="text-sm font-bold text-foreground tracking-wide">Datos de Contacto</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field id="telefono" label="Teléfono Principal" error={errors.telefono?.message}>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="telefono" placeholder="0412-1234567" className="pl-9 bg-background border-input" {...register('telefono')} />
                    </div>
                  </Field>
                  <Field id="telefono_alt" label="Teléfono Alternativo" error={errors.telefono_alt?.message}>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="telefono_alt" placeholder="0424-7654321" className="pl-9 bg-background border-input" {...register('telefono_alt')} />
                    </div>
                  </Field>
                </div>
                <div className="flex items-center gap-2.5 mt-5 mb-2">
                  <div className="p-1.5 rounded-lg bg-orange-500/10">
                    <MapPin className="h-4 w-4 text-orange-500" />
                  </div>
                  <span className="text-sm font-bold text-foreground tracking-wide">Dirección de Residencia</span>
                </div>
                <Field id="estado_residencia" label="Estado / Entidad Federal" error={errors.estado_residencia?.message}>
                  <Controller
                    name="estado_residencia"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="estado_residencia" className="bg-background border-input">
                          <SelectValue placeholder="Selecciona el estado" />
                        </SelectTrigger>
                        <SelectContent>
                          {ESTADOS_VE.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field id="municipio" label="Municipio" error={errors.municipio?.message}>
                    <Input id="municipio" placeholder="Ej: Sucre" className="bg-background border-input" {...register('municipio')} />
                  </Field>
                  <Field id="ciudad" label="Ciudad / Parroquia" error={errors.ciudad?.message}>
                    <Input id="ciudad" placeholder="Ej: Petare" className="bg-background border-input" {...register('ciudad')} />
                  </Field>
                </div>
                <Field id="direccion" label="Dirección Completa" error={errors.direccion?.message}>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <textarea
                      id="direccion"
                      placeholder="Av. Principal, Residencias X, Piso 2, Apto 2-B..."
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      {...register('direccion')}
                    />
                  </div>
                </Field>
              </>
            )}

            {step === 3 && (
              <>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={cn("p-1.5 rounded-lg", stepBgs[2])}>
                    <Shield className={cn("h-4 w-4", stepColors[2])} />
                  </div>
                  <span className="text-sm font-bold text-foreground tracking-wide">Credenciales de Acceso</span>
                </div>
                <Field id="email" label="Correo Electrónico" error={errors.email?.message}>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="tu@correo.com" className="pl-9 bg-background border-input" {...register('email')} />
                  </div>
                </Field>
                <Field id="password" label="Contraseña" error={errors.password?.message}>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type={showPassword ? 'text' : 'password'} autoCapitalize="none" autoCorrect="off" className="pl-9 pr-10 bg-background border-input" {...register('password')} />
                    <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">Mínimo 8 caracteres, una mayúscula y un número.</p>
                </Field>
                <Field id="confirmPassword" label="Confirmar Contraseña" error={errors.confirmPassword?.message}>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} autoCapitalize="none" autoCorrect="off" className="pl-9 pr-10 bg-background border-input" {...register('confirmPassword')} />
                    <button type="button" onClick={() => setShowConfirmPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </Field>
                <div className="p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground border border-border">
                  Al crear tu cuenta aceptas nuestros{' '}
                  <a href="/terms" className="text-primary underline">Términos de Servicio</a>{' '}
                  y nuestra{' '}
                  <a href="/politica-privacidad" className="text-primary underline">Política de Privacidad</a>.
                </div>
              </>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={cn("p-1.5 rounded-lg", stepBgs[3])}>
                    <ShieldCheck className={cn("h-4 w-4", stepColors[3])} />
                  </div>
                  <span className="text-sm font-bold text-foreground tracking-wide">Verificación de Identidad</span>
                </div>

                {verifVerified ? (
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                      <CheckCircle className="h-9 w-9 text-green-500" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">¡Identidad Verificada!</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      Tu {verifMethod === 'email' ? 'correo electrónico' : 'número de teléfono'} ha sido confirmado.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Para proteger tu cuenta, necesitamos verificar tu identidad. Elige cómo quieres recibir tu código de 6 dígitos.
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => { setVerifMethod('email'); setVerifSent(false); setVerifCode(''); }}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${verifMethod === 'email'
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-background hover:border-primary/50'}`}
                      >
                        <Mail className={`h-5 w-5 mb-2 ${verifMethod === 'email' ? 'text-primary' : 'text-muted-foreground'}`} />
                        <p className={`text-sm font-semibold ${verifMethod === 'email' ? 'text-primary' : 'text-foreground'}`}>Por Correo</p>
                        <p className="text-xs text-muted-foreground truncate">{getValues('email')}</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => { setVerifMethod('sms'); setVerifSent(false); setVerifCode(''); }}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${verifMethod === 'sms'
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-background hover:border-primary/50'}`}
                      >
                        <MessageSquare className={`h-5 w-5 mb-2 ${verifMethod === 'sms' ? 'text-primary' : 'text-muted-foreground'}`} />
                        <p className={`text-sm font-semibold ${verifMethod === 'sms' ? 'text-primary' : 'text-foreground'}`}>Por SMS</p>
                        <p className="text-xs text-muted-foreground truncate">{getValues('telefono')}</p>
                      </button>
                    </div>

                    {!verifSent ? (
                      <Button
                        type="button"
                        className="w-full"
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
                      <div className="space-y-3">
                        <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm text-center">
                          Código enviado a <strong className="text-primary">{verifDestino}</strong>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="verif-code" className="text-sm font-medium">Ingresa el código de 6 dígitos</Label>
                          <Input
                            id="verif-code"
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            placeholder="_ _ _ _ _ _"
                            value={verifCode}
                            onChange={e => setVerifCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            className="text-center text-2xl tracking-[0.5em] font-mono bg-background border-input"
                          />
                        </div>
                        <Button
                          type="button"
                          className="w-full"
                          onClick={verifyCode}
                          disabled={verifLoading || verifCode.length !== 6}
                        >
                          {verifLoading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verificando...</>
                          ) : (
                            <><ShieldCheck className="mr-2 h-4 w-4" /> Verificar Código</>
                          )}
                        </Button>
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
                              className="text-xs text-primary underline inline-flex items-center gap-1 hover:opacity-80"
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

            {step === TOTAL_STEPS && (
              <div className="text-center py-8">
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mb-6 shadow-lg shadow-green-500/25">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-black text-foreground">
                  ¡Bienvenido a System Kyron!
                </h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  Tu cuenta personal ha sido registrada y verificada exitosamente con el correo:{' '}
                  <span className="font-bold text-primary">{registeredEmail}</span>
                </p>
                <div className="mt-6 p-4 bg-gradient-to-br from-primary/5 to-emerald-500/5 border border-primary/15 rounded-xl text-left text-sm space-y-2">
                  <p className="font-bold text-primary flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" /> Próximos pasos
                  </p>
                  <div className="space-y-1.5 ml-6">
                    <p className="text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      Inicia sesión con tu correo y contraseña
                    </p>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      Accede a tus documentos y servicios personales
                    </p>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      Completa tu perfil para acceder a todos los módulos
                    </p>
                  </div>
                </div>
                <Button className="mt-6 w-full bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-white font-bold shadow-md" onClick={() => {
                  localStorage.setItem('kyron-just-registered', 'true');
                  router.push('/');
                }}>
                  Explorar la Plataforma <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>

          {step < TOTAL_STEPS && (
            <CardFooter className="flex justify-between pt-4 pb-6">
              <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Anterior
              </Button>
              {step < 3 && (
                <Button type="button" onClick={nextStep} className="gap-2 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-white font-bold shadow-md">
                  Siguiente <ArrowRight className="h-4 w-4" />
                </Button>
              )}
              {step === 3 && (
                <Button type="button" onClick={nextStep} className="gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-500/90 hover:to-orange-500/90 text-white font-bold shadow-md">
                  Continuar a Verificación <ArrowRight className="h-4 w-4" />
                </Button>
              )}
              {step === 4 && (
                <Button type="submit" disabled={isLoading || !verifVerified} className="gap-2 bg-gradient-to-r from-violet-500 to-primary hover:from-violet-500/90 hover:to-primary/90 text-white font-bold shadow-md">
                  {isLoading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Creando cuenta...</>
                  ) : (
                    <>Crear Cuenta <ArrowRight className="h-4 w-4" /></>
                  )}
                </Button>
              )}
            </CardFooter>
          )}
        </form>
      </Card>
    </div>
  );
}
