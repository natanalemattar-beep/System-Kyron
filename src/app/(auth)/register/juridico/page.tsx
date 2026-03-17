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
import { Building, User, Mail, Phone, FileText, Loader as Loader2, CircleCheck as CheckCircle, ArrowRight, ArrowLeft, CloudUpload as UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { FileInputTrigger } from '@/components/file-input-trigger';

const step1Schema = z.object({
  razonSocial: z.string().min(3, 'La razón social es requerida.'),
  rif: z
    .string()
    .min(9, 'El RIF debe tener al menos 9 caracteres.')
    .regex(
      /^[JGVEP][-]\d{8}[-]\d$/,
      'Formato de RIF inválido (Ej: J-12345678-9).'
    ),
  telefono: z.string().min(10, 'El teléfono es requerido.'),
  direccion: z.string().min(10, 'La dirección fiscal es requerida.'),
});

const step2Schema = z.object({
  repNombre: z.string().min(3, 'El nombre es requerido.'),
  repCedula: z
    .string()
    .min(7, 'La cédula es requerida.')
    .regex(/^[VE][-]\d+$/, 'Formato de C.I. inválido (Ej: V-12345678).'),
  repEmail: z.string().email('Correo electrónico inválido.'),
});

const step3Schema = z.object({
  fileRif: z.any().refine((file) => file, 'El RIF digital es requerido.'),
  fileActa: z.any().refine((file) => file, 'El acta constitutiva es requerida.'),
});


type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;

export default function RegisterJuridicoPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [fileRifName, setFileRifName] = useState<string | null>(null);
  const [fileActaName, setFileActaName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    setValue,
  } = useForm<Step1Data & Step2Data & Step3Data>({
    resolver: zodResolver(
      step === 1 ? step1Schema : step === 2 ? step2Schema : step3Schema
    ),
  });

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = (data: Step1Data & Step2Data & Step3Data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: '¡Registro Exitoso!',
        description: `La empresa ${data.razonSocial} ha sido pre-registrada. Recibirás un correo para verificar tu cuenta.`,
        action: <CheckCircle className="text-green-500" />,
      });
      // Here you would typically send the data to your backend
      console.log(data);
       setStep(4);
    }, 1500);
  };
  
  const progressValue = (step / 4) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Building />
            Registro de Persona Jurídica
          </CardTitle>
          <CardDescription>
            Sigue los pasos para crear la cuenta principal de tu empresa.
          </CardDescription>
          <Progress value={progressValue} className="mt-4" />
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Paso 1: Datos de la Empresa</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="razonSocial">Razón Social</Label>
                        <Input id="razonSocial" {...register('razonSocial')} />
                        {errors.razonSocial && <p className="text-destructive text-sm">{errors.razonSocial.message}</p>}
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="rif">RIF</Label>
                        <Input id="rif" {...register('rif')} placeholder="J-12345678-9"/>
                        {errors.rif && <p className="text-destructive text-sm">{errors.rif.message}</p>}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="direccion">Dirección Fiscal</Label>
                    <Input id="direccion" {...register('direccion')} placeholder="Av. Principal, Edificio..."/>
                    {errors.direccion && <p className="text-destructive text-sm">{errors.direccion.message}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono de Contacto</Label>
                    <Input id="telefono" {...register('telefono')} placeholder="0212-1234567"/>
                    {errors.telefono && <p className="text-destructive text-sm">{errors.telefono.message}</p>}
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Paso 2: Datos del Representante Legal</h3>
                 <div className="space-y-2">
                    <Label htmlFor="repNombre">Nombres y Apellidos</Label>
                    <Input id="repNombre" {...register('repNombre')} />
                    {errors.repNombre && <p className="text-destructive text-sm">{errors.repNombre.message}</p>}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="repCedula">Cédula de Identidad</Label>
                        <Input id="repCedula" {...register('repCedula')} placeholder="V-12345678"/>
                        {errors.repCedula && <p className="text-destructive text-sm">{errors.repCedula.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="repEmail">Correo Electrónico</Label>
                        <Input id="repEmail" type="email" {...register('repEmail')} />
                        {errors.repEmail && <p className="text-destructive text-sm">{errors.repEmail.message}</p>}
                    </div>
                </div>
              </div>
            )}
            {step === 3 && (
                <div className="space-y-6">
                    <h3 className="font-semibold text-lg">Paso 3: Carga de Documentos</h3>
                    <div className="space-y-2">
                         <Label>RIF Digitalizado</Label>
                         <FileInputTrigger onFileSelect={(file) => { setValue('fileRif', file); setFileRifName(file.name); }}>
                            <div className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary">
                                <UploadCloud className="w-6 h-6 mr-2 text-muted-foreground"/>
                                <span className={cn("text-muted-foreground", fileRifName && "text-primary")}>{fileRifName || 'Seleccionar archivo (PDF, JPG)'}</span>
                            </div>
                         </FileInputTrigger>
                         {errors.fileRif && <p className="text-destructive text-sm">El RIF es requerido</p>}
                    </div>
                     <div className="space-y-2">
                         <Label>Acta Constitutiva y Modificaciones (PDF)</Label>
                         <FileInputTrigger onFileSelect={(file) => { setValue('fileActa', file); setFileActaName(file.name); }}>
                            <div className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary">
                                <UploadCloud className="w-6 h-6 mr-2 text-muted-foreground"/>
                                 <span className={cn("text-muted-foreground", fileActaName && "text-primary")}>{fileActaName || 'Seleccionar archivo (PDF)'}</span>
                            </div>
                         </FileInputTrigger>
                         {errors.fileActa && <p className="text-destructive text-sm">El acta es requerida</p>}
                    </div>
                </div>
            )}
            {step === 4 && (
                <div className="text-center p-8">
                    <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6"/>
                    <h2 className="text-2xl font-bold">¡Registro Completado!</h2>
                    <p className="text-muted-foreground mt-2">Hemos enviado un correo de verificación a <span className="font-semibold text-primary">{getValues('repEmail')}</span> para activar tu cuenta.</p>
                </div>
            )}
          </CardContent>
          {step < 4 && (
             <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>
                    <ArrowLeft className="mr-2 h-4 w-4"/> Anterior
                </Button>
                {step < 3 && (
                    <Button type="button" onClick={nextStep}>
                    Siguiente <ArrowRight className="ml-2 h-4 w-4"/>
                    </Button>
                )}
                {step === 3 && (
                    <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                    Finalizar Registro
                    </Button>
                )}
            </CardFooter>
          )}
        </form>
      </Card>
    </div>
  );
}
