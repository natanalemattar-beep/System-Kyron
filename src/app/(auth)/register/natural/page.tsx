'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
  User, Loader as Loader2, CircleCheck as CheckCircle, ArrowRight, ArrowLeft, Lock,
  MapPin, Phone, Mail, Calendar, Shield,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

const TOTAL_STEPS = 4;

const step1Schema = z.object({
  nombre: z.string().min(2, 'El nombre es requerido.'),
  apellido: z.string().min(2, 'El apellido es requerido.'),
  cedula: z.string().min(7).regex(/^[VE][-]\d+$/, 'Formato: V-12345678 o E-12345678'),
  fecha_nacimiento: z.string().min(1, 'La fecha de nacimiento es requerida.'),
  genero: z.string().min(1, 'Selecciona el género.'),
  estado_civil: z.string().min(1, 'Selecciona el estado civil.'),
});

const step2Schema = z.object({
  telefono: z.string().min(10, 'El teléfono principal es requerido.').regex(/^[0-9()+\-\s]+$/, 'Teléfono inválido.'),
  telefono_alt: z.string().optional(),
  estado_residencia: z.string().min(1, 'El estado es requerido.'),
  municipio: z.string().min(2, 'El municipio es requerido.'),
  ciudad: z.string().min(2, 'La ciudad/parroquia es requerida.'),
  direccion: z.string().min(10, 'La dirección completa es requerida.'),
});

const step3Schema = z.object({
  email: z.string().email('Correo electrónico inválido.'),
  password: z.string()
    .min(8, 'Mínimo 8 caracteres.')
    .regex(/[A-Z]/, 'Debe tener al menos una mayúscula.')
    .regex(/[0-9]/, 'Debe tener al menos un número.'),
  confirmPassword: z.string().min(8),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Las contraseñas no coinciden.',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof step1Schema> & z.infer<typeof step2Schema> & z.infer<typeof step3Schema>;

const ESTADOS_VE = [
  'Amazonas', 'Anzoátegui', 'Apure', 'Aragua', 'Barinas', 'Bolívar', 'Carabobo',
  'Cojedes', 'Delta Amacuro', 'Dependencias Federales', 'Distrito Capital', 'Falcón',
  'Guárico', 'Lara', 'Mérida', 'Miranda', 'Monagas', 'Nueva Esparta', 'Portuguesa',
  'Sucre', 'Táchira', 'Trujillo', 'La Guaira', 'Yaracuy', 'Zulia',
];

const stepSchemas = [step1Schema, step2Schema, step3Schema];

export default function RegisterNaturalPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [genero, setGenero] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [estadoResidencia, setEstadoResidencia] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, trigger, getValues, setValue } =
    useForm<FormData>({ resolver: zodResolver(stepSchemas[step - 1] ?? step3Schema) });

  const nextStep = async () => {
    const valid = await trigger();
    if (valid) setStep(s => s + 1);
  };

  const prevStep = () => setStep(s => s - 1);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo: 'natural', ...data }),
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
  const stepLabels = ['Datos Personales', 'Residencia y Contacto', 'Acceso a la Cuenta', 'Completado'];

  const Field = ({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );

  return (
    <div className="w-full max-w-xl mx-auto">
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-primary/10 rounded-lg"><User className="h-5 w-5 text-primary" /></div>
            Registro de Persona Natural
          </CardTitle>
          <CardDescription>
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

            {/* PASO 1: Datos Personales */}
            {step === 1 && (
              <>
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  <User className="h-4 w-4" /> Información Personal
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field id="nombre" label="Nombre(s)" error={errors.nombre?.message}>
                    <Input id="nombre" placeholder="Juan Carlos" {...register('nombre')} />
                  </Field>
                  <Field id="apellido" label="Apellido(s)" error={errors.apellido?.message}>
                    <Input id="apellido" placeholder="González Pérez" {...register('apellido')} />
                  </Field>
                </div>
                <Field id="cedula" label="Cédula de Identidad" error={errors.cedula?.message}>
                  <Input id="cedula" placeholder="V-12345678" {...register('cedula')} />
                </Field>
                <Field id="fecha_nacimiento" label="Fecha de Nacimiento" error={errors.fecha_nacimiento?.message}>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="fecha_nacimiento" type="date" className="pl-9" {...register('fecha_nacimiento')} />
                  </div>
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field id="genero" label="Género" error={errors.genero?.message}>
                    <Select value={genero} onValueChange={v => { setGenero(v); setValue('genero', v); }}>
                      <SelectTrigger id="genero"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Masculino">Masculino</SelectItem>
                        <SelectItem value="Femenino">Femenino</SelectItem>
                        <SelectItem value="No binario">No binario</SelectItem>
                        <SelectItem value="Prefiero no decir">Prefiero no decir</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field id="estado_civil" label="Estado Civil" error={errors.estado_civil?.message}>
                    <Select value={estadoCivil} onValueChange={v => { setEstadoCivil(v); setValue('estado_civil', v); }}>
                      <SelectTrigger id="estado_civil"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Soltero/a">Soltero/a</SelectItem>
                        <SelectItem value="Casado/a">Casado/a</SelectItem>
                        <SelectItem value="Divorciado/a">Divorciado/a</SelectItem>
                        <SelectItem value="Viudo/a">Viudo/a</SelectItem>
                        <SelectItem value="Unión Estable de Hecho">Unión Estable de Hecho</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              </>
            )}

            {/* PASO 2: Residencia y Contacto */}
            {step === 2 && (
              <>
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  <Phone className="h-4 w-4" /> Datos de Contacto
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field id="telefono" label="Teléfono Principal" error={errors.telefono?.message}>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="telefono" placeholder="0412-1234567" className="pl-9" {...register('telefono')} />
                    </div>
                  </Field>
                  <Field id="telefono_alt" label="Teléfono Alternativo" error={errors.telefono_alt?.message}>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="telefono_alt" placeholder="0424-7654321" className="pl-9" {...register('telefono_alt')} />
                    </div>
                  </Field>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide mt-4 mb-1">
                  <MapPin className="h-4 w-4" /> Dirección de Residencia
                </div>
                <Field id="estado_residencia" label="Estado / Entidad Federal" error={errors.estado_residencia?.message}>
                  <Select value={estadoResidencia} onValueChange={v => { setEstadoResidencia(v); setValue('estado_residencia', v); }}>
                    <SelectTrigger id="estado_residencia"><SelectValue placeholder="Selecciona el estado" /></SelectTrigger>
                    <SelectContent>
                      {ESTADOS_VE.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field id="municipio" label="Municipio" error={errors.municipio?.message}>
                    <Input id="municipio" placeholder="Ej: Sucre" {...register('municipio')} />
                  </Field>
                  <Field id="ciudad" label="Ciudad / Parroquia" error={errors.ciudad?.message}>
                    <Input id="ciudad" placeholder="Ej: Petare" {...register('ciudad')} />
                  </Field>
                </div>
                <Field id="direccion" label="Dirección Completa" error={errors.direccion?.message}>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <textarea
                      id="direccion"
                      placeholder="Av. Principal, Residencias X, Piso 2, Apto 2-B..."
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      {...register('direccion')}
                    />
                  </div>
                </Field>
              </>
            )}

            {/* PASO 3: Acceso */}
            {step === 3 && (
              <>
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  <Shield className="h-4 w-4" /> Credenciales de Acceso
                </div>
                <Field id="email" label="Correo Electrónico" error={errors.email?.message}>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="tu@correo.com" className="pl-9" {...register('email')} />
                  </div>
                </Field>
                <Field id="password" label="Contraseña" error={errors.password?.message}>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type="password" className="pl-9" {...register('password')} />
                  </div>
                  <p className="text-xs text-muted-foreground">Mínimo 8 caracteres, una mayúscula y un número.</p>
                </Field>
                <Field id="confirmPassword" label="Confirmar Contraseña" error={errors.confirmPassword?.message}>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="confirmPassword" type="password" className="pl-9" {...register('confirmPassword')} />
                  </div>
                </Field>
                <div className="p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
                  Al crear tu cuenta aceptas nuestros{' '}
                  <a href="/terms" className="text-primary underline">Términos de Servicio</a>{' '}
                  y nuestra{' '}
                  <a href="/politica-privacidad" className="text-primary underline">Política de Privacidad</a>.
                </div>
              </>
            )}

            {/* PASO 4: Confirmación */}
            {step === TOTAL_STEPS && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold">¡Cuenta Creada!</h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  Tu cuenta personal ha sido registrada exitosamente con el correo:{' '}
                  <span className="font-semibold text-primary">{registeredEmail}</span>
                </p>
                <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-lg text-left text-sm space-y-1">
                  <p className="font-semibold text-primary">Próximos pasos:</p>
                  <p className="text-muted-foreground">• Inicia sesión con tu correo y contraseña</p>
                  <p className="text-muted-foreground">• Accede a tus documentos y servicios personales</p>
                  <p className="text-muted-foreground">• Completa tu perfil para acceder a todos los módulos</p>
                </div>
                <Button className="mt-6 w-full" onClick={() => router.push('/login-personal')}>
                  Ir a Iniciar Sesión <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>

          {step < TOTAL_STEPS && (
            <CardFooter className="flex justify-between pt-2">
              <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
              </Button>
              {step < 3
                ? <Button type="button" onClick={nextStep}>Siguiente <ArrowRight className="ml-2 h-4 w-4" /></Button>
                : (
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Crear Cuenta
                  </Button>
                )
              }
            </CardFooter>
          )}
        </form>
      </Card>
    </div>
  );
}
