"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, ArrowLeft, FileText, AlertTriangle, CheckCircle, Clock, XCircle, Download, ExternalLink } from "lucide-react";
import { Link } from "@/navigation";
import { PasswordGate } from "@/components/password-gate";
import { useTheme } from "next-themes";

type Estado = "completado" | "pendiente" | "critico" | "no_iniciado";

type PermisoEntry = {
  organismo: string;
  permiso: string;
  descripcion: string;
  estado: Estado;
  prioridad: "alta" | "media" | "baja";
  baseLegal?: string;
  vigencia: string;
  observacion?: string;
  requisitos: string[];
};

const permisos: PermisoEntry[] = [
  {
    organismo: "SENIAT",
    permiso: "Registro Único de Información Fiscal (RIF)",
    descripcion: "Identificación tributaria del emprendimiento. Obligatorio para toda operación comercial, importación y facturación.",
    estado: "completado",
    prioridad: "alta",
    baseLegal: "Código Orgánico Tributario",
    vigencia: "Indefinida (actualización de datos obligatoria)",
    observacion: "RIF J-50832149-9 ya emitido",
    requisitos: ["Cédula de identidad del representante", "Constancia de domicilio fiscal", "Registro Mercantil"]
  },
  {
    organismo: "SENIAT",
    permiso: "IVA — Inscripción como Contribuyente Ordinario",
    descripcion: "Registro del impuesto al valor agregado. Declaración y pago mensual del IVA cobrado y retenido.",
    estado: "completado",
    prioridad: "alta",
    baseLegal: "Ley de Impuesto al Valor Agregado (IVA)",
    vigencia: "Mensual (declaración)",
    observacion: "Ya inscrito como contribuyente ordinario",
    requisitos: ["RIF activo", "Registro Mercantil", "Constancia de domicilio fiscal"]
  },
  {
    organismo: "SENIAT",
    permiso: "ISLR — Impuesto Sobre La Renta",
    descripcion: "Declaración anual del impuesto sobre la renta. Obligatorio para personas jurídicas.",
    estado: "completado",
    prioridad: "alta",
    baseLegal: "Ley de Impuesto Sobre La Renta (ISLR)",
    vigencia: "Anual (declaración definitiva)",
    observacion: "Declaración al día",
    requisitos: ["RIF activo", "Balance general", "Estado de resultados", "Registro Mercantil"]
  },
  {
    organismo: "SENIAT",
    permiso: "Facturación Electrónica",
    descripcion: "Autorización para emitir facturas electrónicas. Obligatorio para facturar a empresas contribuyentes.",
    estado: "pendiente",
    prioridad: "alta",
    baseLegal: "Providencia SNAT/2011/0071",
    vigencia: "Indefinida (mientras cumpla requisitos)",
    observacion: "Gestionar certificado digital y habilitación del sistema",
    requisitos: ["Solicitud de habilitación", "Software certificado", "Certificado digital", "RIF activo", "Comprobante de pruebas técnicas"]
  },
  {
    organismo: "SENIAT",
    permiso: "IGTF — Impuesto a Grandes Transacciones Financieras",
    descripcion: "Registro y declaración del 3% sobre pagos en divisas. Aplica a todas las importaciones.",
    estado: "pendiente",
    prioridad: "alta",
    baseLegal: "Ley de Impuesto a Grandes Transacciones Financieras (IGTF)",
    vigencia: "Mensual (declaración)",
    observacion: "Obligatorio si se reciben pagos en USD, USDT, EUR",
    requisitos: ["RIF activo como contribuyente IGTF", "Registro de operaciones en divisas", "Estados de cuenta bancarios"]
  },
  {
    organismo: "SENIAT / MINISTERIO DE COMERCIO",
    permiso: "Registro de Importador / Exportador",
    descripcion: "Habilitación ante el SENIAT y el Ministerio de Comercio para realizar operaciones de importación. Sin este registro no se pueden nacionalizar mercancías.",
    estado: "critico",
    prioridad: "alta",
    baseLegal: "Ley Orgánica de Aduanas, Decreto con Rango y Fuerza de Ley de Impuesto sobre Importaciones",
    vigencia: "Anual (renovación)",
    observacion: "URGENTE — Sin este registro no se pueden nacionalizar los contenedores de calzado",
    requisitos: ["RIF activo", "Registro Mercantil (objeto de importación explícito)", "Solvencia fiscal SENIAT", "Carta de exposición del importador", "Estados financieros"]
  },
  {
    organismo: "ALCALDÍA — Municipio del Domicilio Fiscal",
    permiso: "Patente de Industria y Comercio",
    descripcion: "Licencia municipal para ejercer actividades de comercio y distribución. Renovable cada año.",
    estado: "pendiente",
    prioridad: "alta",
    baseLegal: "Ley de Impuesto sobre Actividades Económicas (LIAE)",
    vigencia: "Anual",
    observacion: "Gestionar en la alcaldía correspondiente al domicilio fiscal",
    requisitos: ["Registro Mercantil", "RIF", "Cédula del representante", "Contrato de arrendamiento o título de propiedad", "Solvencia municipal del inmueble", "Pago de tasas municipales"]
  },
  {
    organismo: "ALCALDÍA",
    permiso: "Conformidad de Uso",
    descripcion: "Certificación municipal que acredita que el inmueble puede usarse para actividades de comercio, almacenamiento y distribución.",
    estado: "pendiente",
    prioridad: "media",
    baseLegal: "Ordenanza de Zonificación Municipal",
    vigencia: "Indefinida (mientras se mantenga el uso)",
    requisitos: ["Solicitud dirigida a Ingeniería Municipal", "Plano de ubicación", "Documento de propiedad o arrendamiento", "RIF", "Registro Mercantil"]
  },
  {
    organismo: "SENCAMER",
    permiso: "Registro de Producto — Calzado y Accesorios",
    descripcion: "Registro obligatorio ante SENCAMER para la comercialización de productos. Certificado de conformidad del producto.",
    estado: "critico",
    prioridad: "alta",
    baseLegal: "Ley sobre Metrología y Calidad, Reglamento Técnico de Calzado",
    vigencia: "2 años (renovable)",
    observacion: "URGENTE — Cada modelo de calzado requiere su propio registro sanitario/comercial",
    requisitos: ["Ficha técnica del producto", "Muestra del producto", "Certificado de conformidad (laboratorio acreditado)", "RIF", "Registro Mercantil", "Pago de tasas"]
  },
  {
    organismo: "INTT — Instituto Nacional de Transporte Terrestre",
    permiso: "Homologación de Calzado (Normas COVENIN)",
    descripcion: "Certificación de cumplimiento de normas COVENIN para calzado. Aplica especialmente a calzado de seguridad e industrial.",
    estado: "critico",
    prioridad: "alta",
    baseLegal: "Normas COVENIN 3.500+ (calzado), Reglamento Técnico Venezolano",
    vigencia: "Por lote de importación",
    observacion: "URGENTE — El calzado industrial y de seguridad debe cumplir normas COVENIN específicas",
    requisitos: ["Muestras del producto", "Ensayo de laboratorio acreditado", "Ficha técnica detallada", "Certificado de origen"]
  },
  {
    organismo: "INSALUD",
    permiso: "Permiso Sanitario (Calzado de Uso Médico/Industrial)",
    descripcion: "Permiso sanitario obligatorio para calzado de uso quirúrgico, clínico o de protección industrial.",
    estado: "no_iniciado",
    prioridad: "media",
    baseLegal: "Ley de Ejercicio de la Farmacia, Reglamento de Alimentos y Productos",
    vigencia: "1 a 3 años según el producto",
    observacion: "Solo aplica si se importa calzado clínico o de uso hospitalario",
    requisitos: ["Registro sanitario del producto", "Análisis microbiológico", "Certificado de libre venta del país de origen", "Ficha técnica"]
  },
  {
    organismo: "SAPI — Servicio Autónomo de Propiedad Intelectual",
    permiso: "Registro de Marca",
    descripcion: "Registro de la marca 'Carlos Mattar' o del nombre comercial para proteger la identidad del emprendimiento.",
    estado: "no_iniciado",
    prioridad: "media",
    baseLegal: "Ley de Propiedad Industrial, Decisión 486 CAN",
    vigencia: "10 años (renovable)",
    observacion: "Recomendado para proteger el nombre comercial antes de escalar",
    requisitos: ["Solicitud de registro", "Etiqueta o logotipo", "Clasificación internacional (Niza)", "Pago de tasas SAPI"]
  },
  {
    organismo: "IVSS / FAOV / INCES",
    permiso: "Registro Patronal (IVSS, FAOV, INCES, LOPCYMAT)",
    descripcion: "Inscripción como empleador ante el IVSS, FAOV, INCES y cumplimiento de la LOPCYMAT. Obligatorio al contratar personal.",
    estado: "pendiente",
    prioridad: "alta",
    baseLegal: "Ley del Seguro Social, Ley del INCES, Ley de la LOPCYMAT",
    vigencia: "Mensual (cotizaciones) / Anual (declaración)",
    observacion: "Se activa al contratar al primer empleado",
    requisitos: ["RIF activo", "Registro Mercantil", "Cédula del representante", "Contratos de trabajo", "Nómina inicial"]
  },
  {
    organismo: "MINISTERIO DE COMERCIO COLOMBIA / VENEZUELA",
    permiso: "Certificado de Origen (CAN - AAP.CE 28)",
    descripcion: "Certificado que acredita el origen colombiano del calzado para acogerse a preferencias arancelarias del Acuerdo de Alcance Parcial AAP.CE No. 28.",
    estado: "pendiente",
    prioridad: "alta",
    baseLegal: "Acuerdo de Alcance Parcial de Complementación Económica AAP.CE No. 28 (CAN)",
    vigencia: "Por operación de importación",
    observacion: "Se gestiona por cada importación. Emitido por el Ministerio de Comercio de Colombia (formato DIGITEX)",
    requisitos: ["Factura comercial del proveedor colombiano", "Certificado de origen del productor", "Registro como importador en Venezuela", "Declaración de importación"]
  },
  {
    organismo: "SENIAT / ADUANA",
    permiso: "Declaración de Importación (DUA)",
    descripcion: "Documento Único Aduanero. Se requiere para cada operación de importación para nacionalizar la mercancía.",
    estado: "pendiente",
    prioridad: "alta",
    baseLegal: "Ley Orgánica de Aduanas, Reglamento de la Ley de Aduanas",
    vigencia: "Por operación",
    observacion: "Cada contenedor requiere su propia declaración. Gestionar con un agente aduanal autorizado",
    requisitos: ["Registro de Importador activo", "Factura comercial", "Lista de empaque", "Conocimiento de embarque (BL o guía)", "Certificado de origen", "Pago de aranceles e IVA"]
  },
  {
    organismo: "BANCO CENTRAL DE VENEZUELA (BCV)",
    permiso: "Registro de Operaciones Cambiarias",
    descripcion: "Registro de las operaciones de pago al exterior para la importación. Obligatorio para canalizar divisas.",
    estado: "no_iniciado",
    prioridad: "media",
    baseLegal: "Convenio Cambiario No. 1, Ley de Ilícitos Cambiarios",
    vigencia: "Por operación",
    observacion: "Aplica si se canalizan divisas a través del sistema bancario venezolano",
    requisitos: ["Declaración de importación", "Factura comercial", "Contrato de compraventa internacional", "Registro de importador"]
  },
  {
    organismo: "VARIOS",
    permiso: "Licencia de Actividades Económicas (Otros Municipios)",
    descripcion: "Si se almacena o distribuye en más de un municipio, se requiere licencia en cada jurisdicción donde opere el negocio.",
    estado: "no_iniciado",
    prioridad: "baja",
    baseLegal: "Ley de Impuesto sobre Actividades Económicas (LIAE)",
    vigencia: "Anual por municipio",
    observacion: "Aplica si se abren centros de distribución secundarios",
    requisitos: ["Patente del domicilio principal", "Contrato de arrendamiento del secundario", "RIF"]
  },
];

function EstadoBadge({ estado }: { estado: Estado }) {
  const config: Record<Estado, { icon: typeof AlertTriangle; label: string; classes: string }> = {
    completado: { icon: CheckCircle, label: "Completado", classes: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
    pendiente: { icon: Clock, label: "Pendiente", classes: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
    critico: { icon: XCircle, label: "Crítico", classes: "bg-red-500/10 text-red-500 border-red-500/20" },
    no_iniciado: { icon: AlertTriangle, label: "No Iniciado", classes: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
  };
  const c = config[estado];
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${c.classes}`}>
      <Icon className="h-3 w-3" /> {c.label}
    </span>
  );
}

function PrioridadBadge({ prioridad }: { prioridad: string }) {
  const config: Record<string, string> = {
    alta: "bg-red-500/10 text-red-400 border-red-500/20",
    media: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    baja: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${config[prioridad]}`}>
      {prioridad}
    </span>
  );
}

export default function PermisosEmprendimientoCarlosMattarPage() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";
  const total = permisos.length;
  const completados = permisos.filter(p => p.estado === "completado").length;
  const pendientes = permisos.filter(p => p.estado === "pendiente").length;
  const criticos = permisos.filter(p => p.estado === "critico").length;
  const noIniciados = permisos.filter(p => p.estado === "no_iniciado").length;

  return (
    <PasswordGate title="Permisos Requeridos — Emprendimiento Carlos Mattar">
    <div className="min-h-screen bg-background text-foreground font-[family-name:var(--font-outfit)]">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0"
             style={{ backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.04)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.04)'} 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="absolute top-[-5%] right-[-5%] w-[700px] h-[700px] bg-amber-600/8 dark:bg-amber-600/8 bg-amber-200/40 blur-[200px] rounded-full" />
        <div className="absolute bottom-[5%] left-[-5%] w-[600px] h-[600px] bg-orange-500/5 dark:bg-orange-500/5 bg-orange-200/30 blur-[180px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-24">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <Link href="/brand-kit" className="inline-flex items-center gap-2 text-muted-foreground hover:text-amber-500 dark:hover:text-amber-400 transition-colors text-sm font-bold">
            <ArrowLeft className="h-4 w-4" />
            Volver a Brand Kit
          </Link>
        </div>

        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-md mb-6">
          <ShieldCheck className="h-4 w-4 text-amber-500 dark:text-amber-400" />
          <span className="text-[11px] font-black text-amber-500 dark:text-amber-400 uppercase tracking-[0.15em]">ALERTA DE PERMISOS</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-foreground mb-2">
            Permisos Requeridos —{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Emprendimiento Carlos Mattar</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Matriz de permisos, licencias y habilitaciones necesarias para la importación y distribución de calzado y accesorios. 
            RIF <strong className="text-foreground">J-50832149-9</strong>.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-10">
          <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-center">
            <CheckCircle className="h-6 w-6 text-emerald-500 mx-auto mb-1" />
            <p className="text-2xl font-black text-emerald-500">{completados}</p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Completados</p>
          </div>
          <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 text-center">
            <Clock className="h-6 w-6 text-amber-500 mx-auto mb-1" />
            <p className="text-2xl font-black text-amber-500">{pendientes}</p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Pendientes</p>
          </div>
          <div className="p-4 rounded-2xl border border-red-500/20 bg-red-500/5 text-center">
            <XCircle className="h-6 w-6 text-red-500 mx-auto mb-1" />
            <p className="text-2xl font-black text-red-500">{criticos}</p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Críticos</p>
          </div>
          <div className="p-4 rounded-2xl border border-slate-500/20 bg-slate-500/5 text-center">
            <AlertTriangle className="h-6 w-6 text-slate-400 mx-auto mb-1" />
            <p className="text-2xl font-black text-slate-400">{noIniciados}</p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">No Iniciados</p>
          </div>
        </div>

        <div className="space-y-3">
          {permisos.map((p, i) => (
            <div key={i} className="group relative p-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-foreground mb-0.5">{p.permiso}</h3>
                  <p className="text-[11px] text-cyan-500 dark:text-cyan-400 font-semibold">{p.organismo}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <PrioridadBadge prioridad={p.prioridad} />
                  <EstadoBadge estado={p.estado} />
                </div>
              </div>
              <p className="text-[12px] text-muted-foreground leading-relaxed mb-3">{p.descripcion}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
                {p.baseLegal && <span className="font-medium"><span className="text-amber-500/70">Base Legal:</span> {p.baseLegal}</span>}
                <span className="font-medium"><span className="text-amber-500/70">Vigencia:</span> {p.vigencia}</span>
                {p.observacion && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold">
                    <AlertTriangle className="h-3 w-3" /> {p.observacion}
                  </span>
                )}
              </div>
              <details className="mt-3">
                <summary className="text-[10px] font-bold text-muted-foreground hover:text-foreground cursor-pointer uppercase tracking-wider">
                  Requisitos ({p.requisitos.length})
                </summary>
                <ul className="mt-2 space-y-1">
                  {p.requisitos.map((r, j) => (
                    <li key={j} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                      <span className="text-amber-500/60 mt-0.5 shrink-0">•</span> {r}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          ))}
        </div>

        <div className="mt-10 p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-foreground mb-1">Resumen de Acciones Prioritarias</p>
              <ul className="space-y-1 text-[12px] text-muted-foreground">
                <li><strong className="text-red-500">Crítico:</strong> Gestionar el Registro de Importador (SENIAT) antes de la primera importación.</li>
                <li><strong className="text-red-500">Crítico:</strong> Registrar cada modelo de calzado ante SENCAMER con su ficha técnica.</li>
                <li><strong className="text-red-500">Crítico:</strong> Obtener homologación COVENIN para calzado industrial/de seguridad.</li>
                <li><strong className="text-amber-500">Pendiente:</strong> Activar facturación electrónica y certificado digital.</li>
                <li><strong className="text-amber-500">Pendiente:</strong> Inscribir Patente de Industria y Comercio en la alcaldía.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-muted-foreground">
            Lista actualizada a junio 2026. Verificar requisitos específicos según el domicilio fiscal y los productos que se importen.
          </p>
          <p className="text-[10px] text-muted-foreground mt-1">
            Emprendimiento Carlos Mattar — RIF J-50832149-9 | System Kyron
          </p>
        </div>
      </main>
    </div>
    </PasswordGate>
  );
}
