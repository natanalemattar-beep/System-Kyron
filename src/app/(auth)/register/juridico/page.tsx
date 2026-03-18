'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Building, Loader as Loader2, CircleCheck as CheckCircle, ArrowRight, ArrowLeft,
  CloudUpload as UploadCloud, MapPin, Phone, Mail, Calendar, Shield, Eye, EyeOff,
  BookOpen, BarChart2, Users, Landmark, ShieldCheck, Wallet, FileText, Package,
  Scale, Cpu, Handshake, Megaphone, Globe, TrendingUp, Smartphone, Signal,
  Recycle, Gavel, ShoppingCart, Briefcase,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { FileInputTrigger } from '@/components/file-input-trigger';

const TOTAL_STEPS = 6;

const ESTADOS_VE = [
  'Amazonas', 'Anzoátegui', 'Apure', 'Aragua', 'Barinas', 'Bolívar', 'Carabobo',
  'Cojedes', 'Delta Amacuro', 'Dependencias Federales', 'Distrito Capital', 'Falcón',
  'Guárico', 'Lara', 'Mérida', 'Miranda', 'Monagas', 'Nueva Esparta', 'Portuguesa',
  'Sucre', 'Táchira', 'Trujillo', 'La Guaira', 'Yaracuy', 'Zulia',
];

const TIPOS_EMPRESA = [
  'Compañía Anónima (C.A.)',
  'Compañía de Responsabilidad Limitada (C.R.L.)',
  'Sociedad Anónima (S.A.)',
  'Sociedad de Responsabilidad Limitada (S.R.L.)',
  'Cooperativa',
  'Asociación Civil',
  'Fundación',
  'ONG',
  'Empresa Pública',
  'Organismo del Estado',
  'Persona Natural con Actividad Económica',
  'Otro',
];

const moduleGroups = [
  {
    group: 'Portal Ciudadano',
    modules: [
      { id: 'cuenta-personal', label: 'Cuenta Personal', icon: Users },
      { id: 'linea-personal', label: 'Mi Línea Personal', icon: Smartphone },
    ],
  },
  {
    group: 'Módulos Empresariales Principales',
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
      { id: 'cuentas-cobrar', label: 'Cuentas por Cobrar', icon: TrendingUp },
      { id: 'cuentas-pagar', label: 'Cuentas por Pagar', icon: Landmark },
      { id: 'pasarelas-pago', label: 'Pasarelas de Pago', icon: Wallet },
      { id: 'analisis-caja', label: 'Análisis de Caja', icon: BarChart2 },
      { id: 'tramites-fiscales', label: 'Trámites Fiscales', icon: Scale },
    ],
  },
  {
    group: 'Recursos Humanos',
    modules: [
      { id: 'nominas', label: 'Nóminas', icon: Users },
      { id: 'prestaciones', label: 'Prestaciones Sociales', icon: ShieldCheck },
      { id: 'reclutamiento', label: 'Reclutamiento', icon: Handshake },
      { id: 'libro-vacaciones', label: 'Libro de Vacaciones', icon: BookOpen },
    ],
  },
  {
    group: 'Legal & Corporativo',
    modules: [
      { id: 'escritorio-juridico', label: 'Escritorio Jurídico', icon: Scale },
      { id: 'tramites-corporativos', label: 'Trámites Corporativos', icon: FileText },
      { id: 'poderes', label: 'Poderes y Representación', icon: ShieldCheck },
    ],
  },
  {
    group: 'Tecnología & Análisis',
    modules: [
      { id: 'ingenieria-ia', label: 'Ingeniería IA', icon: Cpu },
      { id: 'analisis-mercado', label: 'Análisis de Mercado', icon: Globe },
      { id: 'analisis-riesgo', label: 'Análisis de Riesgo', icon: BarChart2 },
      { id: 'factibilidad', label: 'Factibilidad Económica', icon: TrendingUp },
    ],
  },
  {
    group: 'Ventas & Clientes',
    modules: [
      { id: 'fidelizacion', label: 'Fidelización de Clientes', icon: Handshake },
      { id: 'credito', label: 'Solicitud de Crédito', icon: Wallet },
      { id: 'propuesta', label: 'Propuesta de Proyecto', icon: Megaphone },
    ],
  },
];

const fullSchema = z.object({
  razonSocial: z.string().min(3, 'La razón social es requerida.'),
  rif: z.string().min(9).regex(/^[JGCVEP][-]\d{8}[-]\d$/, 'Formato: J-12345678-9'),
  tipo_empresa: z.string().min(1, 'Selecciona el tipo de empresa.'),
  actividad_economica: z.string().min(5, 'Describe la actividad económica.'),
  codigo_ciiu: z.string().optional(),
  fecha_constitucion: z.string().optional(),
  registro_mercantil: z.string().optional(),
  capital_social: z.string().optional(),
  telefono: z.string().min(10, 'El teléfono es requerido.').regex(/^[0-9()+\-\s]+$/, 'Teléfono inválido.'),
  telefono_alt: z.string().optional(),
  estado_empresa: z.string().min(1, 'El estado es requerido.'),
  municipio_empresa: z.string().min(2, 'El municipio es requerido.'),
  direccion: z.string().min(10, 'La dirección fiscal es requerida.'),
  repNombre: z.string().min(2, 'El nombre es requerido.'),
  repApellido: z.string().min(2, 'El apellido es requerido.'),
  repCedula: z.string().min(7).regex(/^[VE][-]\d+$/, 'Formato: V-12345678'),
  rep_cargo: z.string().min(2, 'El cargo es requerido.'),
  rep_telefono: z.string().min(10, 'El teléfono es requerido.').regex(/^[0-9()+\-\s]+$/, 'Inválido.'),
  repEmail: z.string().email('Correo electrónico inválido.'),
  password: z.string()
    .min(8, 'Mínimo 8 caracteres.')
    .regex(/[A-Z]/, 'Debe tener al menos una mayúscula.')
    .regex(/[0-9]/, 'Debe tener al menos un número.'),
  confirmPassword: z.string().min(8, 'Confirma tu contraseña.'),
  fileRif: z.any().optional(),
  fileActa: z.any().optional(),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Las contraseñas no coinciden.',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof fullSchema>;

const step1Fields = ['razonSocial', 'rif', 'tipo_empresa', 'actividad_economica'] as const;
const step2Fields = ['telefono', 'estado_empresa', 'municipio_empresa', 'direccion'] as const;
const step3Fields = ['repNombre', 'repApellido', 'repCedula', 'rep_cargo', 'rep_telefono', 'repEmail', 'password', 'confirmPassword'] as const;

export default function RegisterJuridicoPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModules, setSelectedModules] = useState<Set<string>>(new Set());
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [registeredRazon, setRegisteredRazon] = useState('');
  const [fileRifName, setFileRifName] = useState<string | null>(null);
  const [fileActaName, setFileActaName] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { register, handleSubmit, control, setValue, formState: { errors }, trigger } =
    useForm<FormData>({
      resolver: zodResolver(fullSchema),
      mode: 'onTouched',
    });

  const toggleModule = (id: string) => {
    setSelectedModules(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const nextStep = async () => {
    if (step === 1) {
      const valid = await trigger(step1Fields as any);
      if (valid) setStep(s => s + 1);
    } else if (step === 2) {
      const valid = await trigger(step2Fields as any);
      if (valid) setStep(s => s + 1);
    } else if (step === 3) {
      const valid = await trigger(step3Fields as any);
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
          tipo_empresa: data.tipo_empresa,
          actividad_economica: data.actividad_economica,
          codigo_ciiu: data.codigo_ciiu,
          fecha_constitucion: data.fecha_constitucion,
          registro_mercantil: data.registro_mercantil,
          capital_social: data.capital_social,
          telefono: data.telefono,
          telefono_alt: data.telefono_alt,
          estado_empresa: data.estado_empresa,
          municipio_empresa: data.municipio_empresa,
          direccion: data.direccion,
          repNombre: `${data.repNombre} ${data.repApellido}`,
          repCedula: data.repCedula,
          rep_cargo: data.rep_cargo,
          rep_telefono: data.rep_telefono,
          repEmail: data.repEmail,
          password: data.password,
          modules: selectedModuleList,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        toast({ title: 'Error al registrarse', description: json.error, variant: 'destructive' });
        return;
      }

      setRegisteredEmail(data.repEmail);
      setRegisteredRazon(data.razonSocial);
      setStep(TOTAL_STEPS);
    } catch {
      toast({ title: 'Error', description: 'Error de conexión. Intenta de nuevo.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const progressValue = (step / TOTAL_STEPS) * 100;
  const stepLabels = [
    'Datos de la Empresa',
    'Sede y Contacto',
    'Representante Legal',
    'Documentos',
    'Módulos del Sistema',
    'Registro Completado',
  ];

  const Field = ({ id, label, error, children, optional }: { id: string; label: string; error?: string; children: React.ReactNode; optional?: boolean }) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground flex items-center gap-2">
        {label}
        {optional && <span className="text-[10px] text-muted-foreground font-normal">(opcional)</span>}
      </Label>
      {children}
      {error && <p className="text-destructive text-xs font-medium">{error}</p>}
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="bg-card border-border shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl text-foreground">
            <div className="p-2 bg-primary/10 rounded-lg"><Building className="h-5 w-5 text-primary" /></div>
            Registro de Persona Jurídica
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
                  <Building className="h-4 w-4" /> Identificación de la Empresa
                </div>
                <Field id="razonSocial" label="Razón Social" error={errors.razonSocial?.message}>
                  <Input id="razonSocial" placeholder="Empresa Ejemplo, C.A." className="bg-background border-input" {...register('razonSocial')} />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field id="rif" label="RIF" error={errors.rif?.message}>
                    <Input id="rif" placeholder="J-12345678-9" className="bg-background border-input" {...register('rif')} />
                  </Field>
                  <Field id="tipo_empresa" label="Tipo de Empresa" error={errors.tipo_empresa?.message}>
                    <Controller
                      name="tipo_empresa"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id="tipo_empresa" className="bg-background border-input">
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            {TIPOS_EMPRESA.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>
                </div>
                <Field id="actividad_economica" label="Actividad Económica Principal" error={errors.actividad_economica?.message}>
                  <textarea
                    id="actividad_economica"
                    placeholder="Describe el giro o actividad principal de la empresa..."
                    className="flex min-h-[70px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    {...register('actividad_economica')}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field id="codigo_ciiu" label="Código CIIU" error={errors.codigo_ciiu?.message} optional>
                    <Input id="codigo_ciiu" placeholder="Ej: 6201" className="bg-background border-input" {...register('codigo_ciiu')} />
                  </Field>
                  <Field id="fecha_constitucion" label="Fecha de Constitución" error={errors.fecha_constitucion?.message} optional>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="fecha_constitucion" type="date" className="pl-9 bg-background border-input" {...register('fecha_constitucion')} />
                    </div>
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field id="registro_mercantil" label="N° Registro Mercantil" error={errors.registro_mercantil?.message} optional>
                    <Input id="registro_mercantil" placeholder="Tomo X, Folio Y, N° Z" className="bg-background border-input" {...register('registro_mercantil')} />
                  </Field>
                  <Field id="capital_social" label="Capital Social" error={errors.capital_social?.message} optional>
                    <Input id="capital_social" placeholder="Ej: Bs. 1.000.000" className="bg-background border-input" {...register('capital_social')} />
                  </Field>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  <Phone className="h-4 w-4" /> Datos de Contacto Corporativo
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field id="telefono" label="Teléfono Corporativo" error={errors.telefono?.message}>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="telefono" placeholder="0212-1234567" className="pl-9 bg-background border-input" {...register('telefono')} />
                    </div>
                  </Field>
                  <Field id="telefono_alt" label="Teléfono Alternativo" error={errors.telefono_alt?.message} optional>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="telefono_alt" placeholder="0424-7654321" className="pl-9 bg-background border-input" {...register('telefono_alt')} />
                    </div>
                  </Field>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide mt-3 mb-1">
                  <MapPin className="h-4 w-4" /> Dirección Fiscal / Sede Principal
                </div>
                <Field id="estado_empresa" label="Estado / Entidad Federal" error={errors.estado_empresa?.message}>
                  <Controller
                    name="estado_empresa"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="estado_empresa" className="bg-background border-input">
                          <SelectValue placeholder="Selecciona el estado" />
                        </SelectTrigger>
                        <SelectContent>
                          {ESTADOS_VE.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
                <Field id="municipio_empresa" label="Municipio" error={errors.municipio_empresa?.message}>
                  <Input id="municipio_empresa" placeholder="Ej: Chacao" className="bg-background border-input" {...register('municipio_empresa')} />
                </Field>
                <Field id="direccion" label="Dirección Fiscal Completa" error={errors.direccion?.message}>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <textarea
                      id="direccion"
                      placeholder="Av. Francisco de Miranda, Centro Lido, Torre A, Piso 8, Ofic. 8-B..."
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
                  <Users className="h-4 w-4" /> Datos del Representante Legal
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field id="repNombre" label="Nombre(s)" error={errors.repNombre?.message}>
                    <Input id="repNombre" placeholder="María José" className="bg-background border-input" {...register('repNombre')} />
                  </Field>
                  <Field id="repApellido" label="Apellido(s)" error={errors.repApellido?.message}>
                    <Input id="repApellido" placeholder="Rodríguez López" className="bg-background border-input" {...register('repApellido')} />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field id="repCedula" label="Cédula de Identidad" error={errors.repCedula?.message}>
                    <Input id="repCedula" placeholder="V-12345678" className="bg-background border-input" {...register('repCedula')} />
                  </Field>
                  <Field id="rep_cargo" label="Cargo en la Empresa" error={errors.rep_cargo?.message}>
                    <Input id="rep_cargo" placeholder="Director Gerente / Presidente" className="bg-background border-input" {...register('rep_cargo')} />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field id="rep_telefono" label="Teléfono Directo" error={errors.rep_telefono?.message}>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="rep_telefono" placeholder="0414-1234567" className="pl-9 bg-background border-input" {...register('rep_telefono')} />
                    </div>
                  </Field>
                  <Field id="repEmail" label="Correo Electrónico" error={errors.repEmail?.message}>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="repEmail" type="email" placeholder="rep@empresa.com" className="pl-9 bg-background border-input" {...register('repEmail')} />
                    </div>
                  </Field>
                </div>
                <div className="border-t border-border pt-4 mt-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    <Shield className="h-4 w-4" /> Credenciales de Acceso
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field id="password" label="Contraseña" error={errors.password?.message}>
                      <div className="relative">
                        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="password" type={showPassword ? "text" : "password"} autoCapitalize="none" autoCorrect="off" className="pl-9 pr-10 bg-background border-input" {...register('password')} />
                        <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" tabIndex={-1}>
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
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
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Mínimo 8 caracteres, una mayúscula y un número.</p>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  <FileText className="h-4 w-4" /> Documentos Legales (Opcionales)
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Puedes subir los documentos ahora o completarlos más tarde desde tu perfil. Formato PDF o imagen (JPG, PNG). Máx. 10 MB.
                </p>
                {[
                  { key: 'fileRif', label: 'RIF Digitalizado', desc: 'Registro de Información Fiscal vigente (PDF o imagen)', stateName: fileRifName, setStateFn: setFileRifName, field: 'fileRif' as keyof FormData },
                  { key: 'fileActa', label: 'Acta Constitutiva', desc: 'Última acta notariada con todas sus modificaciones (PDF)', stateName: fileActaName, setStateFn: setFileActaName, field: 'fileActa' as keyof FormData },
                ].map(({ key, label, desc, stateName, setStateFn, field }) => (
                  <div key={key} className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">{label}</Label>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                    <FileInputTrigger onFileSelect={f => { setValue(field, f); setStateFn(f.name); }}>
                      <div className={cn(
                        'flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors',
                        stateName
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-primary/50 text-muted-foreground'
                      )}>
                        <div className="text-center">
                          <UploadCloud className="h-7 w-7 mx-auto mb-2" />
                          <p className="text-xs font-medium">{stateName ?? 'Haz clic para seleccionar archivo'}</p>
                        </div>
                      </div>
                    </FileInputTrigger>
                    {errors[field] && <p className="text-destructive text-xs font-medium">{String(errors[field]?.message)}</p>}
                  </div>
                ))}
              </>
            )}

            {step === 5 && (
              <>
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  <BookOpen className="h-4 w-4" /> Módulos del Sistema
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Selecciona los módulos que tu empresa necesita. Puedes cambiarlos desde la configuración.
                </p>
                <div className="space-y-5 max-h-[400px] overflow-y-auto pr-1">
                  {moduleGroups.map(group => (
                    <div key={group.group}>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-2">{group.group}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {group.modules.map(mod => {
                          const selected = selectedModules.has(mod.id);
                          return (
                            <button
                              key={mod.id}
                              type="button"
                              onClick={() => toggleModule(mod.id)}
                              className={cn(
                                'flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all text-xs font-medium',
                                selected
                                  ? 'border-primary bg-primary/5 text-primary'
                                  : 'border-border bg-background text-muted-foreground hover:border-primary/30 hover:bg-primary/2'
                              )}
                            >
                              <mod.icon className={`h-4 w-4 shrink-0 ${selected ? 'text-primary' : 'text-muted-foreground'}`} />
                              <span className="leading-tight">{mod.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  {selectedModules.size} módulo(s) seleccionado(s)
                </p>
              </>
            )}

            {step === TOTAL_STEPS && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">¡Empresa Registrada!</h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  <span className="font-semibold text-primary">{registeredRazon}</span> ha sido registrada exitosamente.
                </p>
                <p className="text-muted-foreground text-xs mt-1">Acceso configurado para: <span className="font-medium">{registeredEmail}</span></p>
                <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-lg text-left text-sm space-y-1">
                  <p className="font-semibold text-primary">Próximos pasos:</p>
                  <p className="text-muted-foreground">• Inicia sesión con el correo del representante legal</p>
                  <p className="text-muted-foreground">• Completa la configuración de los módulos activados</p>
                  <p className="text-muted-foreground">• Importa tus datos contables y de nómina</p>
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
              {step < 5
                ? <Button type="button" onClick={nextStep}>Siguiente <ArrowRight className="ml-2 h-4 w-4" /></Button>
                : (
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Finalizar Registro
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
