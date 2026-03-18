'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
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
  Building,
  Loader as Loader2,
  CircleCheck as CheckCircle,
  ArrowRight,
  ArrowLeft,
  CloudUpload as UploadCloud,
  BookOpen,
  BarChart2,
  Users,
  Landmark,
  ShieldCheck,
  Wallet,
  FileText,
  Package,
  Scale,
  Cpu,
  Handshake,
  Megaphone,
  Globe,
  TrendingUp,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { FileInputTrigger } from '@/components/file-input-trigger';

const TOTAL_STEPS = 5;

const moduleGroups = [
  {
    group: 'Administración & Finanzas',
    modules: [
      { id: 'contabilidad', label: 'Contabilidad', icon: BookOpen },
      { id: 'facturacion', label: 'Facturación', icon: FileText },
      { id: 'inventario', label: 'Inventario', icon: Package },
      { id: 'cuentas-por-cobrar', label: 'Cuentas por Cobrar', icon: TrendingUp },
      { id: 'cuentas-por-pagar', label: 'Cuentas por Pagar', icon: Landmark },
      { id: 'pasarelas-pago', label: 'Pasarelas de Pago', icon: Wallet },
      { id: 'analisis-caja', label: 'Análisis de Caja', icon: BarChart2 },
      { id: 'tramites-fiscales', label: 'Trámites Fiscales', icon: Scale },
    ],
  },
  {
    group: 'Recursos Humanos',
    modules: [
      { id: 'nominas', label: 'Nóminas', icon: Users },
      { id: 'prestaciones-sociales', label: 'Prestaciones Sociales', icon: ShieldCheck },
      { id: 'reclutamiento', label: 'Reclutamiento', icon: Handshake },
      { id: 'libro-vacaciones', label: 'Libro de Vacaciones', icon: BookOpen },
    ],
  },
  {
    group: 'Legal & Corporativo',
    modules: [
      { id: 'escritorio-juridico', label: 'Escritorio Jurídico', icon: Scale },
      { id: 'tramites-corporativos', label: 'Trámites Corporativos', icon: FileText },
      { id: 'poderes-representacion', label: 'Poderes y Representación', icon: ShieldCheck },
    ],
  },
  {
    group: 'Tecnología & Análisis',
    modules: [
      { id: 'ingenieria-ia', label: 'Ingeniería IA', icon: Cpu },
      { id: 'analisis-mercado', label: 'Análisis de Mercado', icon: Globe },
      { id: 'analisis-riesgo', label: 'Análisis de Riesgo', icon: BarChart2 },
      { id: 'estudio-factibilidad-economica', label: 'Factibilidad Económica', icon: TrendingUp },
    ],
  },
  {
    group: 'Ventas & Clientes',
    modules: [
      { id: 'fidelizacion-clientes', label: 'Fidelización de Clientes', icon: Handshake },
      { id: 'solicitud-credito', label: 'Solicitud de Crédito', icon: Wallet },
      { id: 'propuesta-proyecto', label: 'Propuesta de Proyecto', icon: Megaphone },
    ],
  },
];

const step1Schema = z.object({
  razonSocial: z.string().min(3, 'La razón social es requerida.'),
  rif: z
    .string()
    .min(9, 'El RIF debe tener al menos 9 caracteres.')
    .regex(/^[JGVEP][-]\d{8}[-]\d$/, 'Formato de RIF inválido (Ej: J-12345678-9).'),
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
  const [selectedModules, setSelectedModules] = useState<Set<string>>(new Set());

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

  const toggleModule = (id: string) => {
    setSelectedModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const nextStep = async () => {
    if (step <= 3) {
      const isValid = await trigger();
      if (isValid) setStep((prev) => prev + 1);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = (data: Step1Data & Step2Data & Step3Data) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: '¡Registro Exitoso!',
        description: `La empresa ${data.razonSocial} ha sido pre-registrada. Recibirás un correo para verificar tu cuenta.`,
        action: <CheckCircle className="text-green-500" />,
      });
      setStep(TOTAL_STEPS);
    }, 1500);
  };

  const progressValue = (step / TOTAL_STEPS) * 100;

  const stepLabels = [
    'Datos de la Empresa',
    'Representante Legal',
    'Documentos',
    'Módulos',
    'Confirmación',
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Building />
            Registro de Persona Jurídica
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
            {/* Paso 1: Datos de la Empresa */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Datos de la Empresa</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="razonSocial">Razón Social</Label>
                    <Input id="razonSocial" {...register('razonSocial')} />
                    {errors.razonSocial && (
                      <p className="text-destructive text-sm">{errors.razonSocial.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rif">RIF</Label>
                    <Input id="rif" {...register('rif')} placeholder="J-12345678-9" />
                    {errors.rif && (
                      <p className="text-destructive text-sm">{errors.rif.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección Fiscal</Label>
                  <Input
                    id="direccion"
                    {...register('direccion')}
                    placeholder="Av. Principal, Edificio..."
                  />
                  {errors.direccion && (
                    <p className="text-destructive text-sm">{errors.direccion.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono de Contacto</Label>
                  <Input
                    id="telefono"
                    {...register('telefono')}
                    placeholder="0212-1234567"
                  />
                  {errors.telefono && (
                    <p className="text-destructive text-sm">{errors.telefono.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Paso 2: Representante Legal */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Datos del Representante Legal</h3>
                <div className="space-y-2">
                  <Label htmlFor="repNombre">Nombres y Apellidos</Label>
                  <Input id="repNombre" {...register('repNombre')} />
                  {errors.repNombre && (
                    <p className="text-destructive text-sm">{errors.repNombre.message}</p>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="repCedula">Cédula de Identidad</Label>
                    <Input
                      id="repCedula"
                      {...register('repCedula')}
                      placeholder="V-12345678"
                    />
                    {errors.repCedula && (
                      <p className="text-destructive text-sm">{errors.repCedula.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="repEmail">Correo Electrónico</Label>
                    <Input id="repEmail" type="email" {...register('repEmail')} />
                    {errors.repEmail && (
                      <p className="text-destructive text-sm">{errors.repEmail.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Paso 3: Documentos */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="font-semibold text-lg">Carga de Documentos</h3>
                <div className="space-y-2">
                  <Label>RIF Digitalizado</Label>
                  <FileInputTrigger
                    onFileSelect={(file) => {
                      setValue('fileRif', file);
                      setFileRifName(file.name);
                    }}
                  >
                    <div className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary">
                      <UploadCloud className="w-6 h-6 mr-2 text-muted-foreground" />
                      <span
                        className={cn(
                          'text-muted-foreground',
                          fileRifName && 'text-primary'
                        )}
                      >
                        {fileRifName || 'Seleccionar archivo (PDF, JPG)'}
                      </span>
                    </div>
                  </FileInputTrigger>
                  {errors.fileRif && (
                    <p className="text-destructive text-sm">El RIF es requerido</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Acta Constitutiva y Modificaciones (PDF)</Label>
                  <FileInputTrigger
                    onFileSelect={(file) => {
                      setValue('fileActa', file);
                      setFileActaName(file.name);
                    }}
                  >
                    <div className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary">
                      <UploadCloud className="w-6 h-6 mr-2 text-muted-foreground" />
                      <span
                        className={cn(
                          'text-muted-foreground',
                          fileActaName && 'text-primary'
                        )}
                      >
                        {fileActaName || 'Seleccionar archivo (PDF)'}
                      </span>
                    </div>
                  </FileInputTrigger>
                  {errors.fileActa && (
                    <p className="text-destructive text-sm">El acta es requerida</p>
                  )}
                </div>
              </div>
            )}

            {/* Paso 4: Selección de Módulos */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg">Selecciona los Módulos</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Elige los módulos que tu empresa necesita. Podrás activar más módulos después.
                    {selectedModules.size > 0 && (
                      <span className="ml-2 font-medium text-primary">
                        ({selectedModules.size} seleccionado{selectedModules.size !== 1 ? 's' : ''})
                      </span>
                    )}
                  </p>
                </div>
                <div className="space-y-6 max-h-[420px] overflow-y-auto pr-1">
                  {moduleGroups.map((group) => (
                    <div key={group.group}>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        {group.group}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {group.modules.map(({ id, label, icon: Icon }) => {
                          const selected = selectedModules.has(id);
                          return (
                            <button
                              key={id}
                              type="button"
                              onClick={() => toggleModule(id)}
                              className={cn(
                                'flex items-center gap-2 p-3 rounded-lg border text-sm text-left transition-all',
                                selected
                                  ? 'border-primary bg-primary/10 text-primary font-medium'
                                  : 'border-border bg-card hover:border-primary/50 hover:bg-secondary text-foreground'
                              )}
                            >
                              <Icon className="w-4 h-4 shrink-0" />
                              <span className="leading-tight">{label}</span>
                              {selected && (
                                <CheckCircle className="w-4 h-4 ml-auto shrink-0 text-primary" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Paso 5: Confirmación */}
            {step === TOTAL_STEPS && (
              <div className="text-center p-8">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                <h2 className="text-2xl font-bold">¡Registro Completado!</h2>
                <p className="text-muted-foreground mt-2">
                  Hemos enviado un correo de verificación a{' '}
                  <span className="font-semibold text-primary">{getValues('repEmail')}</span>{' '}
                  para activar tu cuenta.
                </p>
                {selectedModules.size > 0 && (
                  <p className="text-sm text-muted-foreground mt-3">
                    {selectedModules.size} módulo{selectedModules.size !== 1 ? 's' : ''}{' '}
                    solicitado{selectedModules.size !== 1 ? 's' : ''} para activación.
                  </p>
                )}
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

              {step < 4 && (
                <Button type="button" onClick={nextStep}>
                  Siguiente <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}

              {step === 4 && (
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
