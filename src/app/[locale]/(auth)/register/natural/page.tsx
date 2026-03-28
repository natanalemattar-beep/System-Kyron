'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
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
  User, Loader2, CircleCheck as CheckCircle, ArrowRight, ArrowLeft,
  MapPin, Phone, Mail, Calendar, Shield, Eye, EyeOff,
  MessageSquare, RefreshCw, ShieldCheck,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { DocumentInput } from '@/components/document-input';

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

  const progressValue = (step / TOTAL_STEPS) * 100;
  const stepLabels = ['Datos Personales', 'Residencia y Contacto', 'Acceso a la Cuenta', 'Verificación de Identidad', 'Completado'];

  const Field = ({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">{label}</Label>
      {children}
      {error && <p className="text-destructive text-xs font-medium">{error}</p>}
    </div>
  );

  return (
    <div className="w-full max-w-xl mx-auto">
      <Card className="bg-card border-border shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl text-foreground">
            <div className="p-2 bg-primary/10 rounded-lg"><User className="h-5 w-5 text-primary" /></div>
            Registro de Persona Natural
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {step < TOTAL_STEPS
              ? `Paso ${step} de ${TOTAL_STEPS - 1} · ${stepLabels[step - 1]}`
              : stepLabels[TOTAL_STEPS - 1]}
          </CardDescription>
          <Progress value={progressValue} className="mt-3" />
          {step < TOTAL_STEPS && (
            <div className="flex gap-1 mt-2">
              {Array.from({ length: TOTAL_STEPS - 1 }).map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i < step ? 'bg-primary' : 'bg-border'}`} />
              ))}
            </div>
          )}
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-5">

            {step === 1 && (
              <>
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  <User className="h-4 w-4" /> Información Personal
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
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="fecha_nacimiento" type="date" className="pl-9 bg-background border-input" {...register('fecha_nacimiento')} />
                  </div>
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
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  <Phone className="h-4 w-4" /> Datos de Contacto
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
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide mt-4 mb-1">
                  <MapPin className="h-4 w-4" /> Dirección de Residencia
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
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  <Shield className="h-4 w-4" /> Credenciales de Acceso
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
                    <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" tabIndex={-1}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">Mínimo 8 caracteres, una mayúscula y un número.</p>
                </Field>
                <Field id="confirmPassword" label="Confirmar Contraseña" error={errors.confirmPassword?.message}>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} autoCapitalize="none" autoCorrect="off" className="pl-9 pr-10 bg-background border-input" {...register('confirmPassword')} />
                    <button type="button" onClick={() => setShowConfirmPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" tabIndex={-1}>
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
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  <ShieldCheck className="h-4 w-4 text-primary" /> Verificación de Identidad
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
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">¡Cuenta Creada!</h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  Tu cuenta personal ha sido registrada y verificada exitosamente con el correo:{' '}
                  <span className="font-semibold text-primary">{registeredEmail}</span>
                </p>
                <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-lg text-left text-sm space-y-1">
                  <p className="font-semibold text-primary">Próximos pasos:</p>
                  <p className="text-muted-foreground">• Inicia sesión con tu correo y contraseña</p>
                  <p className="text-muted-foreground">• Accede a tus documentos y servicios personales</p>
                  <p className="text-muted-foreground">• Completa tu perfil para acceder a todos los módulos</p>
                </div>
                <Button className="mt-6 w-full" onClick={() => {
                  localStorage.setItem('kyron-just-registered', 'true');
                  router.push('/');
                }}>
                  Explorar la Plataforma <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>

          {step < TOTAL_STEPS && (
            <CardFooter className="flex justify-between pt-2">
              <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
              </Button>
              {step < 3 && (
                <Button type="button" onClick={nextStep}>Siguiente <ArrowRight className="ml-2 h-4 w-4" /></Button>
              )}
              {step === 3 && (
                <Button type="button" onClick={nextStep}>
                  Continuar a Verificación <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              {step === 4 && (
                <Button type="submit" disabled={isLoading || !verifVerified}>
                  {isLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creando cuenta...</>
                  ) : (
                    <>Crear Cuenta <ArrowRight className="ml-2 h-4 w-4" /></>
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
