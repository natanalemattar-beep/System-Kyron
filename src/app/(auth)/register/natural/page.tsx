'use client';

import { useState } from 'react';
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
  User, Loader as Loader2, CircleCheck as CheckCircle, ArrowRight, ArrowLeft,
  MapPin, Phone, Mail, Calendar, Shield, Eye, EyeOff,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

const TOTAL_STEPS = 4;

const ESTADOS_VE = [
  'Amazonas', 'Anzoátegui', 'Apure', 'Aragua', 'Barinas', 'Bolívar', 'Carabobo',
  'Cojedes', 'Delta Amacuro', 'Dependencias Federales', 'Distrito Capital', 'Falcón',
  'Guárico', 'Lara', 'Mérida', 'Miranda', 'Monagas', 'Nueva Esparta', 'Portuguesa',
  'Sucre', 'Táchira', 'Trujillo', 'La Guaira', 'Yaracuy', 'Zulia',
];

const fullSchema = z.object({
  nombre: z.string().min(2, 'El nombre es requerido.'),
  apellido: z.string().min(2, 'El apellido es requerido.'),
  cedula: z.string().min(7).regex(/^[VE][-]\d+$/, 'Formato: V-12345678 o E-12345678'),
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
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { register, handleSubmit, control, formState: { errors }, trigger } =
    useForm<FormData>({
      resolver: zodResolver(fullSchema),
      mode: 'onTouched',
    });

  const nextStep = async () => {
    const fields = step === 1 ? step1Fields : step === 2 ? step2Fields : step3Fields;
    const valid = await trigger(fields as any);
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
                  <Input id="cedula" placeholder="V-12345678" className="bg-background border-input" {...register('cedula')} />
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
                    <Input id="password" type={showPassword ? "text" : "password"} autoCapitalize="none" autoCorrect="off" className="pl-9 pr-10 bg-background border-input" {...register('password')} />
                    <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" tabIndex={-1}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">Mínimo 8 caracteres, una mayúscula y un número.</p>
                </Field>
                <Field id="confirmPassword" label="Confirmar Contraseña" error={errors.confirmPassword?.message}>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} autoCapitalize="none" autoCorrect="off" className="pl-9 pr-10 bg-background border-input" {...register('confirmPassword')} />
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

            {step === TOTAL_STEPS && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">¡Cuenta Creada!</h2>
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
