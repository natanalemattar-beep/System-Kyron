'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  User,
  Loader as Loader2,
  CircleCheck as CheckCircle,
  ArrowRight,
  ArrowLeft,
  Lock,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

const TOTAL_STEPS = 3;

const step1Schema = z.object({
  nombre: z.string().min(3, 'El nombre es requerido.'),
  apellido: z.string().min(2, 'El apellido es requerido.'),
  cedula: z
    .string()
    .min(7, 'La cédula es requerida.')
    .regex(/^[VE][-]\d+$/, 'Formato de C.I. inválido (Ej: V-12345678).'),
  telefono: z.string().min(10, 'El teléfono es requerido.'),
});

const step2Schema = z.object({
  email: z.string().email('Correo electrónico inválido.'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres.'),
  confirmPassword: z.string().min(8, 'Confirma tu contraseña.'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden.',
  path: ['confirmPassword'],
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

export default function RegisterNaturalPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<Step1Data & Step2Data>({
    resolver: zodResolver(step === 1 ? step1Schema : step2Schema),
  });

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = (data: Step1Data & Step2Data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: '¡Registro Exitoso!',
        description: `Bienvenido, ${data.nombre}. Revisa tu correo para verificar tu cuenta.`,
        action: <CheckCircle className="text-green-500" />,
      });
      setStep(TOTAL_STEPS);
    }, 1500);
  };

  const progressValue = (step / TOTAL_STEPS) * 100;

  const stepLabels = ['Datos Personales', 'Acceso a la Cuenta', 'Confirmación'];

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <User />
            Registro Personal
          </CardTitle>
          <CardDescription>
            {step < TOTAL_STEPS
              ? `Paso ${step} de ${TOTAL_STEPS - 1}: ${stepLabels[step - 1]}`
              : 'Registro completado'}
          </CardDescription>
          <Progress value={progressValue} className="mt-4" />
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Datos Personales</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre(s)</Label>
                    <Input id="nombre" {...register('nombre')} />
                    {errors.nombre && (
                      <p className="text-destructive text-sm">{errors.nombre.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellido">Apellido(s)</Label>
                    <Input id="apellido" {...register('apellido')} />
                    {errors.apellido && (
                      <p className="text-destructive text-sm">{errors.apellido.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cedula">Cédula de Identidad</Label>
                    <Input id="cedula" {...register('cedula')} placeholder="V-12345678" />
                    {errors.cedula && (
                      <p className="text-destructive text-sm">{errors.cedula.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input id="telefono" {...register('telefono')} placeholder="0412-1234567" />
                    {errors.telefono && (
                      <p className="text-destructive text-sm">{errors.telefono.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Acceso a la Cuenta</h3>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" {...register('email')} />
                  {errors.email && (
                    <p className="text-destructive text-sm">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-3 h-3" /> Contraseña
                  </Label>
                  <Input id="password" type="password" {...register('password')} />
                  {errors.password && (
                    <p className="text-destructive text-sm">{errors.password.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                  <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
                  {errors.confirmPassword && (
                    <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
            )}

            {step === TOTAL_STEPS && (
              <div className="text-center p-8">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                <h2 className="text-2xl font-bold">¡Registro Completado!</h2>
                <p className="text-muted-foreground mt-2">
                  Hemos enviado un correo de verificación a{' '}
                  <span className="font-semibold text-primary">{getValues('email')}</span>{' '}
                  para activar tu cuenta.
                </p>
              </div>
            )}
          </CardContent>

          {step < TOTAL_STEPS && (
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
              </Button>

              {step < 2 && (
                <Button type="button" onClick={nextStep}>
                  Siguiente <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}

              {step === 2 && (
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Crear Cuenta
                </Button>
              )}
            </CardFooter>
          )}
        </form>
      </Card>
    </div>
  );
}
