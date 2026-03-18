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
import { User, Loader as Loader2, CircleCheck as CheckCircle, ArrowRight, ArrowLeft, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

const TOTAL_STEPS = 3;

const step1Schema = z.object({
  nombre: z.string().min(3, 'El nombre es requerido.'),
  apellido: z.string().min(2, 'El apellido es requerido.'),
  cedula: z.string().min(7).regex(/^[VE][-]\d+$/, 'Formato: V-12345678'),
  telefono: z.string().min(10, 'El teléfono es requerido.'),
});

const step2Schema = z.object({
  email: z.string().email('Correo electrónico inválido.'),
  password: z.string().min(8, 'Mínimo 8 caracteres.'),
  confirmPassword: z.string().min(8),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Las contraseñas no coinciden.',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof step1Schema> & z.infer<typeof step2Schema>;

export default function RegisterNaturalPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  const schema = step === 1 ? step1Schema : step2Schema;
  const { register, handleSubmit, formState: { errors }, trigger, getValues } =
    useForm<FormData>({ resolver: zodResolver(schema) });

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
        body: JSON.stringify({
          tipo: 'natural',
          nombre: data.nombre,
          apellido: data.apellido,
          cedula: data.cedula,
          telefono: data.telefono,
          email: data.email,
          password: data.password,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        toast({ title: 'Error', description: json.error, variant: 'destructive' });
        setIsLoading(false);
        return;
      }

      setRegisteredEmail(data.email);
      setStep(TOTAL_STEPS);
    } catch {
      toast({ title: 'Error', description: 'Error de conexión', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const progressValue = (step / TOTAL_STEPS) * 100;
  const stepLabels = ['Datos Personales', 'Acceso a la Cuenta', 'Confirmación'];

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <User /> Registro Personal
          </CardTitle>
          <CardDescription>
            {step < TOTAL_STEPS ? `Paso ${step} de ${TOTAL_STEPS - 1}: ${stepLabels[step - 1]}` : 'Registro completado'}
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
                    {errors.nombre && <p className="text-destructive text-sm">{errors.nombre.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellido">Apellido(s)</Label>
                    <Input id="apellido" {...register('apellido')} />
                    {errors.apellido && <p className="text-destructive text-sm">{errors.apellido.message}</p>}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cedula">Cédula de Identidad</Label>
                    <Input id="cedula" {...register('cedula')} placeholder="V-12345678" />
                    {errors.cedula && <p className="text-destructive text-sm">{errors.cedula.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input id="telefono" {...register('telefono')} placeholder="0412-1234567" />
                    {errors.telefono && <p className="text-destructive text-sm">{errors.telefono.message}</p>}
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
                  {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-1"><Lock className="w-3 h-3" /> Contraseña</Label>
                  <Input id="password" type="password" {...register('password')} />
                  {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                  <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
                  {errors.confirmPassword && <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>}
                </div>
              </div>
            )}

            {step === TOTAL_STEPS && (
              <div className="text-center p-8">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                <h2 className="text-2xl font-bold">¡Registro Completado!</h2>
                <p className="text-muted-foreground mt-2">
                  Tu cuenta ha sido creada exitosamente.{' '}
                  <span className="font-semibold text-primary">{registeredEmail}</span>
                </p>
                <Button className="mt-6" onClick={() => router.push('/login')}>
                  Iniciar Sesión <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>

          {step < TOTAL_STEPS && (
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>
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
