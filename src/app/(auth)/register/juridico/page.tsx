'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Building, Loader as Loader2, CircleCheck as CheckCircle, ArrowRight, ArrowLeft,
  CloudUpload as UploadCloud, BookOpen, BarChart2, Users, Landmark, ShieldCheck,
  Wallet, FileText, Package, Scale, Cpu, Handshake, Megaphone, Globe, TrendingUp,
  Smartphone, Signal, Recycle, Gavel, ShoppingCart, Briefcase, Lock,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { FileInputTrigger } from '@/components/file-input-trigger';

const TOTAL_STEPS = 5;

const moduleGroups = [
  {
    group: 'Portal Ciudadano',
    modules: [
      { id: 'cuenta-personal', label: 'Cuenta Personal', icon: Users },
      { id: 'linea-personal', label: 'Mi Línea Personal', icon: Smartphone },
    ],
  },
  {
    group: 'Módulos Empresariales',
    modules: [
      { id: 'linea-empresa', label: 'Mi Línea Empresa', icon: Signal },
      { id: 'contabilidad', label: 'Contabilidad', icon: BookOpen },
      { id: 'asesoria-legal', label: 'Asesoría Legal', icon: Gavel },
      { id: 'facturacion', label: 'Facturación', icon: ShoppingCart },
      { id: 'recursos-humanos', label: 'Recursos Humanos', icon: Briefcase },
      { id: 'socios-directivos', label: 'Socios y Directivos', icon: Users },
      { id: 'sostenibilidad', label: 'Sostenibilidad', icon: Recycle },
      { id: 'administracion-red', label: 'Administración de Red', icon: Signal },
      { id: 'ingenieria-it', label: 'Ingeniería e IT', icon: Cpu },
    ],
  },
  {
    group: 'Administración & Finanzas',
    modules: [
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
      { id: 'estudio-factibilidad', label: 'Factibilidad Económica', icon: TrendingUp },
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
  rif: z.string().min(9).regex(/^[JGVEP][-]\d{8}[-]\d$/, 'Formato: J-12345678-9'),
  telefono: z.string().min(10, 'El teléfono es requerido.'),
  direccion: z.string().min(10, 'La dirección fiscal es requerida.'),
});

const step2Schema = z.object({
  repNombre: z.string().min(3, 'El nombre es requerido.'),
  repCedula: z.string().min(7).regex(/^[VE][-]\d+$/, 'Formato: V-12345678'),
  repEmail: z.string().email('Correo inválido.'),
  password: z.string().min(8, 'Mínimo 8 caracteres.'),
  confirmPassword: z.string().min(8),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Las contraseñas no coinciden.',
  path: ['confirmPassword'],
});

const step3Schema = z.object({
  fileRif: z.any().refine(f => f, 'El RIF digital es requerido.'),
  fileActa: z.any().refine(f => f, 'El acta constitutiva es requerida.'),
});

type FormData = z.infer<typeof step1Schema> & z.infer<typeof step2Schema> & z.infer<typeof step3Schema>;

export default function RegisterJuridicoPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [fileRifName, setFileRifName] = useState<string | null>(null);
  const [fileActaName, setFileActaName] = useState<string | null>(null);
  const [selectedModules, setSelectedModules] = useState<Set<string>>(new Set());
  const [registeredEmail, setRegisteredEmail] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  const schema = step === 1 ? step1Schema : step === 2 ? step2Schema : step3Schema;

  const { register, handleSubmit, formState: { errors }, trigger, getValues, setValue } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  const toggleModule = (id: string) => {
    setSelectedModules(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const nextStep = async () => {
    if (step <= 3) {
      const valid = await trigger();
      if (valid) setStep(s => s + 1);
    } else {
      setStep(s => s + 1);
    }
  };

  const prevStep = () => setStep(s => s - 1);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const selectedModuleList = moduleGroups.flatMap(g =>
      g.modules.filter(m => selectedModules.has(m.id)).map(m => ({ id: m.id, label: m.label }))
    );

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: 'juridico',
          razonSocial: data.razonSocial,
          rif: data.rif,
          telefono: data.telefono,
          direccion: data.direccion,
          repNombre: data.repNombre,
          repCedula: data.repCedula,
          repEmail: data.repEmail,
          password: data.password,
          modules: selectedModuleList,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        toast({ title: 'Error', description: json.error, variant: 'destructive' });
        setIsLoading(false);
        return;
      }

      setRegisteredEmail(data.repEmail);
      setStep(TOTAL_STEPS);
    } catch {
      toast({ title: 'Error', description: 'Error de conexión', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const progressValue = (step / TOTAL_STEPS) * 100;
  const stepLabels = ['Datos de la Empresa', 'Representante Legal', 'Documentos', 'Módulos', 'Confirmación'];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Building /> Registro de Persona Jurídica
          </CardTitle>
          <CardDescription>
            {step < TOTAL_STEPS ? `Paso ${step} de ${TOTAL_STEPS - 1}: ${stepLabels[step - 1]}` : 'Registro completado'}
          </CardDescription>
          <Progress value={progressValue} className="mt-4" />
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            {/* PASO 1: Datos de la Empresa */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Datos de la Empresa</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="razonSocial">Razón Social</Label>
                    <Input id="razonSocial" {...register('razonSocial')} />
                    {errors.razonSocial && <p className="text-destructive text-sm">{errors.razonSocial.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rif">RIF</Label>
                    <Input id="rif" {...register('rif')} placeholder="J-12345678-9" />
                    {errors.rif && <p className="text-destructive text-sm">{errors.rif.message}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección Fiscal</Label>
                  <Input id="direccion" {...register('direccion')} placeholder="Av. Principal, Edificio..." />
                  {errors.direccion && <p className="text-destructive text-sm">{errors.direccion.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono de Contacto</Label>
                  <Input id="telefono" {...register('telefono')} placeholder="0212-1234567" />
                  {errors.telefono && <p className="text-destructive text-sm">{errors.telefono.message}</p>}
                </div>
              </div>
            )}

            {/* PASO 2: Representante Legal */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Datos del Representante Legal</h3>
                <div className="space-y-2">
                  <Label htmlFor="repNombre">Nombres y Apellidos</Label>
                  <Input id="repNombre" {...register('repNombre')} />
                  {errors.repNombre && <p className="text-destructive text-sm">{errors.repNombre.message}</p>}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="repCedula">Cédula de Identidad</Label>
                    <Input id="repCedula" {...register('repCedula')} placeholder="V-12345678" />
                    {errors.repCedula && <p className="text-destructive text-sm">{errors.repCedula.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="repEmail">Correo Electrónico</Label>
                    <Input id="repEmail" type="email" {...register('repEmail')} />
                    {errors.repEmail && <p className="text-destructive text-sm">{errors.repEmail.message}</p>}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
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
              </div>
            )}

            {/* PASO 3: Documentos */}
            {step === 3 && (
              <div className="space-y-6">
                <h3 className="font-semibold text-lg">Carga de Documentos</h3>
                <div className="space-y-2">
                  <Label>RIF Digitalizado</Label>
                  <FileInputTrigger onFileSelect={f => { setValue('fileRif', f); setFileRifName(f.name); }}>
                    <div className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary">
                      <UploadCloud className="w-6 h-6 mr-2 text-muted-foreground" />
                      <span className={cn('text-muted-foreground', fileRifName && 'text-primary')}>
                        {fileRifName || 'Seleccionar archivo (PDF, JPG)'}
                      </span>
                    </div>
                  </FileInputTrigger>
                  {errors.fileRif && <p className="text-destructive text-sm">El RIF es requerido</p>}
                </div>
                <div className="space-y-2">
                  <Label>Acta Constitutiva y Modificaciones (PDF)</Label>
                  <FileInputTrigger onFileSelect={f => { setValue('fileActa', f); setFileActaName(f.name); }}>
                    <div className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary">
                      <UploadCloud className="w-6 h-6 mr-2 text-muted-foreground" />
                      <span className={cn('text-muted-foreground', fileActaName && 'text-primary')}>
                        {fileActaName || 'Seleccionar archivo (PDF)'}
                      </span>
                    </div>
                  </FileInputTrigger>
                  {errors.fileActa && <p className="text-destructive text-sm">El acta es requerida</p>}
                </div>
              </div>
            )}

            {/* PASO 4: Módulos */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg">Selecciona los Módulos</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Activa los módulos que tu empresa necesita.
                    {selectedModules.size > 0 && (
                      <span className="ml-2 font-medium text-primary">
                        ({selectedModules.size} seleccionado{selectedModules.size !== 1 ? 's' : ''})
                      </span>
                    )}
                  </p>
                </div>
                <div className="space-y-6 max-h-[420px] overflow-y-auto pr-1">
                  {moduleGroups.map(group => (
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
                              {selected && <CheckCircle className="w-4 h-4 ml-auto shrink-0 text-primary" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PASO 5: Confirmación */}
            {step === TOTAL_STEPS && (
              <div className="text-center p-8">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                <h2 className="text-2xl font-bold">¡Registro Completado!</h2>
                <p className="text-muted-foreground mt-2">
                  Tu empresa ha sido registrada exitosamente. Hemos enviado las instrucciones a{' '}
                  <span className="font-semibold text-primary">{registeredEmail}</span>.
                </p>
                {selectedModules.size > 0 && (
                  <p className="text-sm text-muted-foreground mt-3">
                    {selectedModules.size} módulo{selectedModules.size !== 1 ? 's' : ''} activado{selectedModules.size !== 1 ? 's' : ''}.
                  </p>
                )}
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
