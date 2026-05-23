"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, FileText, Download, Printer, Building2, 
  Landmark, Scale, Globe, Hammer, ChevronRight, 
  AlertTriangle, Clock, CheckCircle, ArrowLeft
} from "lucide-react";
import { Link } from "@/navigation";
import { PasswordGate } from "@/components/password-gate";

type Permiso = {
  id: string;
  organismo: string;
  siglas: string;
  permiso: string;
  descripcion: string;
  estado: "Vigente" | "En trámite" | "Pendiente" | "No aplica";
  vigencia: string;
  prioridad: "Crítico" | "Alto" | "Medio" | "Informativo";
  baseLegal?: string;
};

const permisos: Permiso[] = [
  {
    id: "registro-mercantil",
    organismo: "Servicio Autónomo de Registros y Notarías",
    siglas: "SAREN",
    permiso: "Registro Mercantil (Acta Constitutiva)",
    descripcion: "Inscripción de la empresa en el Registro Mercantil. Documento fundacional que otorga personalidad jurídica a System Kyron.",
    estado: "En trámite",
    vigencia: "Indefinida",
    prioridad: "Crítico",
    baseLegal: "Código de Comercio de Venezuela, arts. 126-130"
  },
  {
    id: "rif",
    organismo: "Servicio Nacional Integrado de Administración Aduanera y Tributaria",
    siglas: "SENIAT",
    permiso: "RIF (Registro de Información Fiscal)",
    descripcion: "Registro único tributario que identifica a System Kyron ante el fisco nacional. Obligatorio para emitir facturas, declarar impuestos y operar legalmente.",
    estado: "Vigente",
    vigencia: "Indefinida (actualización anual)",
    prioridad: "Crítico",
    baseLegal: "Código Orgánico Tributario, arts. 99-103"
  },
  {
    id: "iva",
    organismo: "Servicio Nacional Integrado de Administración Aduanera y Tributaria",
    siglas: "SENIAT",
    permiso: "IVA (Impuesto al Valor Agregado)",
    descripcion: "Inscripción como contribuyente ordinario del IVA. System Kyron debe declarar y pagar IVA mensual por servicios de tecnología y telecomunicaciones.",
    estado: "Vigente",
    vigencia: "Indefinida (declaración mensual)",
    prioridad: "Crítico",
    baseLegal: "Ley de IVA, arts. 36-45; Providencia del SENIAT"
  },
  {
    id: "islr",
    organismo: "Servicio Nacional Integrado de Administración Aduanera y Tributaria",
    siglas: "SENIAT",
    permiso: "ISLR (Impuesto Sobre La Renta)",
    descripcion: "Registro como contribuyente del ISLR. System Kyron debe presentar declaración definitiva anual de rentas.",
    estado: "Vigente",
    vigencia: "Anual (declaración 3 meses después del cierre fiscal)",
    prioridad: "Crítico",
    baseLegal: "Ley de ISLR, arts. 56-78"
  },
  {
    id: "patente",
    organismo: "Alcaldía del Municipio",
    siglas: "MUNICIPIO",
    permiso: "Patente de Industria y Comercio",
    descripcion: "Licencia municipal obligatoria para ejercer actividades comerciales, industriales o de servicios en la jurisdicción. Renovación anual.",
    estado: "En trámite",
    vigencia: "Anual",
    prioridad: "Crítico",
    baseLegal: "Ley Orgánica del Poder Público Municipal; Ordenanza de Patente"
  },
  {
    id: "conformidad-uso",
    organismo: "Alcaldía del Municipio",
    siglas: "MUNICIPIO",
    permiso: "Conformidad de Uso",
    descripcion: "Certificación municipal que acredita que el inmueble donde opera System Kyron cumple con el uso comercial/oficina permitido en la zonificación.",
    estado: "En trámite",
    vigencia: "Indefinida",
    prioridad: "Crítico"
  },
  {
    id: "solvencia-municipal",
    organismo: "Alcaldía del Municipio",
    siglas: "MUNICIPIO",
    permiso: "Solvencia Municipal",
    descripcion: "Certificado de estar al día con los tributos municipales. Requisito indispensable para contratar con el Estado y realizar trámites notariales.",
    estado: "Pendiente",
    vigencia: "Semestral",
    prioridad: "Alto"
  },
  {
    id: "ivss",
    organismo: "Instituto Venezolano de los Seguros Sociales",
    siglas: "IVSS",
    permiso: "Inscripción del Empleador (Patrono) IVSS",
    descripcion: "Registro patronal obligatorio para asegurar a los trabajadores de System Kyron ante el Seguro Social.",
    estado: "Pendiente",
    vigencia: "Indefinida (con aportes trimestrales)",
    prioridad: "Crítico",
    baseLegal: "Ley del Seguro Social, arts. 82-93"
  },
  {
    id: "inces",
    organismo: "Instituto Nacional de Capacitación y Educación Socialista",
    siglas: "INCES",
    permiso: "Registro del Empleador INCES",
    descripcion: "Inscripción patronal obligatoria. System Kyron debe aportar el 2% del total de salarios pagados al INCES.",
    estado: "Pendiente",
    vigencia: "Indefinida (aportes trimestrales)",
    prioridad: "Alto",
    baseLegal: "Ley del INCES, arts. 10-15"
  },
  {
    id: "banavih",
    organismo: "Banco Nacional de Vivienda y Hábitat",
    siglas: "BANAVIH",
    permiso: "Registro Patronal BANAVIH (Ley de Política Habitacional)",
    descripcion: "Registro obligatorio. System Kyron debe aportar el 3% del total de salarios pagados al Fondo de Ahorro Obligatorio para la Vivienda.",
    estado: "Pendiente",
    vigencia: "Indefinida (aportes trimestrales)",
    prioridad: "Medio",
    baseLegal: "Ley de Política Habitacional, arts. 24-31"
  },
  {
    id: "inpsasel",
    organismo: "Instituto Nacional de Prevención, Salud y Seguridad Laborales",
    siglas: "INPSASEL",
    permiso: "Registro de la Empresa INPSASEL",
    descripcion: "Registro obligatorio en el Sistema de Gestión de Seguridad y Salud en el Trabajo. Incluye la elaboración del Programa de Seguridad y Salud Laboral.",
    estado: "Pendiente",
    vigencia: "Indefinida (actualización anual del programa)",
    prioridad: "Alto",
    baseLegal: "Ley Orgánica de Prevención, Condiciones y Medio Ambiente de Trabajo (LOPCYMAT), arts. 56-65"
  },
  {
    id: "trademark",
    organismo: "Servicio Autónomo de la Propiedad Intelectual",
    siglas: "SAPI",
    permiso: "Registro de Marca «System Kyron»",
    descripcion: "Registro de la marca «System Kyron» como propiedad industrial. Protege el nombre comercial, logotipo y eslogan a nivel nacional en las clases de servicios de tecnología y telecomunicaciones.",
    estado: "En trámite",
    vigencia: "10 años (renovable)",
    prioridad: "Alto",
    baseLegal: "Ley de Propiedad Industrial, arts. 28-45; Decisión 486 CAN"
  },
  {
    id: "sencamer",
    organismo: "Servicio Autónomo Nacional de Normalización, Calidad, Metrología y Reglamentos Técnicos",
    siglas: "SENCAMER",
    permiso: "Registro de Servicios de Tecnología (Calidad)",
    descripcion: "Registro voluntario que certifica que los servicios de System Kyron cumplen con normas de calidad. Recomendado para contratar con el Estado.",
    estado: "Pendiente",
    vigencia: "2 años (renovable)",
    prioridad: "Medio"
  },
  {
    id: "sundde",
    organismo: "Superintendencia Nacional para la Defensa de los Derechos Socioeconómicos",
    siglas: "SUNDDE",
    permiso: "Registro de Precios de Servicios",
    descripcion: "Registro de los precios de los servicios de telecomunicaciones y tecnología ofrecidos por System Kyron cuando aplique control de precios.",
    estado: "Pendiente",
    vigencia: "Según Providencia",
    prioridad: "Medio",
    baseLegal: "Ley Orgánica de Precios Justos, arts. 33-39"
  },
  {
    id: "datos-personales",
    organismo: "Superintendencia de Datos Personales / Autoridad de Protección de Datos",
    siglas: "SDP",
    permiso: "Registro de Base de Datos Personales",
    descripcion: "Inscripción de los bancos de datos que contengan información personal de clientes, empleados y usuarios de System Kyron.",
    estado: "Pendiente",
    vigencia: "Indefinida",
    prioridad: "Alto",
    baseLegal: "Ley Orgánica de Protección de Datos Personales, arts. 22-30"
  },
  {
    id: "habilitacion-conatel",
    organismo: "Comisión Nacional de Telecomunicaciones",
    siglas: "CONATEL",
    permiso: "Habilitación Administrativa (Servicios de Telecomunicaciones)",
    descripcion: "Permiso para operar servicios de telecomunicaciones (VOIP, datos, valor agregado). Obligatorio si System Kyron presta servicios de conectividad, telefonía IP o transmisión de datos.",
    estado: "En trámite",
    vigencia: "10 años (renovable)",
    prioridad: "Alto",
    baseLegal: "Ley Orgánica de Telecomunicaciones, arts. 34-50"
  },
  {
    id: "espectro-radioelectrico",
    organismo: "Comisión Nacional de Telecomunicaciones",
    siglas: "CONATEL",
    permiso: "Asignación de Espectro Radioeléctrico (si aplica)",
    descripcion: "Permiso para usar frecuencias del espectro radioeléctrico si System Kyron opera enlaces de microondas, radio o WiFi de larga distancia.",
    estado: "No aplica",
    vigencia: "Según título habilitante",
    prioridad: "Informativo"
  },
  {
    id: "facturacion-electronica",
    organismo: "Servicio Nacional Integrado de Administración Aduanera y Tributaria",
    siglas: "SENIAT",
    permiso: "Facturación Electrónica (Sistema)",
    descripcion: "Autorización del SENIAT para emitir facturas electrónicas. System Kyron debe implementar un sistema de facturación electrónica certificado.",
    estado: "Pendiente",
    vigencia: "Indefinida",
    prioridad: "Alto",
    baseLegal: "Providencia del SENIAT sobre Facturación Electrónica"
  },
  {
    id: "bcv",
    organismo: "Banco Central de Venezuela",
    siglas: "BCV",
    permiso: "Registro de Operaciones Cambiarias (Si recibe divisas)",
    descripcion: "Registro ante el BCV si System Kyron recibe pagos en divisas del exterior o requiere liquidar operaciones cambiarias.",
    estado: "Pendiente",
    vigencia: "Según operación",
    prioridad: "Medio",
    baseLegal: "Convenio Cambiario N° 1; Ley del BCV"
  },
  {
    id: "ministerio-ambiente",
    organismo: "Ministerio del Poder Popular para el Ecosocialismo",
    siglas: "MINEC",
    permiso: "Permiso Ambiental (Actividades Susceptibles de Degradar el Ambiente)",
    descripcion: "Evaluación ambiental si System Kyron realiza actividades que puedan afectar el ambiente. Aplica si tiene instalaciones físicas con generación de desechos electrónicos.",
    estado: "Pendiente",
    vigencia: "Según estudio",
    prioridad: "Informativo",
    baseLegal: "Ley Orgánica del Ambiente, arts. 78-85"
  },
  {
    id: "gaceta-oficial",
    organismo: "Imprenta Nacional y Gaceta Oficial",
    siglas: "GACETA",
    permiso: "Publicación en Gaceta Oficial (Registro Mercantil)",
    descripcion: "Publicación del Registro Mercantil en Gaceta Oficial. Requisito posterior a la inscripción en SAREN.",
    estado: "En trámite",
    vigencia: "Única",
    prioridad: "Medio",
    baseLegal: "Código de Comercio"
  }
];

const prioridadColors: Record<string, string> = {
  "Crítico": "text-red-400 bg-red-500/10 border-red-500/20",
  "Alto": "text-amber-400 bg-amber-500/10 border-amber-500/20",
  "Medio": "text-blue-400 bg-blue-500/10 border-blue-500/20",
  "Informativo": "text-zinc-400 bg-zinc-500/10 border-zinc-500/20"
};

const estadoColors: Record<string, string> = {
  "Vigente": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  "En trámite": "text-amber-400 bg-amber-500/10 border-amber-500/20",
  "Pendiente": "text-zinc-400 bg-zinc-500/10 border-zinc-500/20",
  "No aplica": "text-zinc-600 bg-zinc-700/10 border-zinc-700/20"
};

const organismosUnicos = [...new Set(permisos.map(p => p.siglas))];

const resumenOrganismos: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  "SAREN": { icon: Building2, color: "from-blue-600 to-blue-800" },
  "SENIAT": { icon: Scale, color: "from-cyan-600 to-blue-800" },
  "MUNICIPIO": { icon: Landmark, color: "from-emerald-600 to-teal-800" },
  "IVSS": { icon: ShieldCheck, color: "from-green-600 to-emerald-800" },
  "INCES": { icon: FileText, color: "from-yellow-600 to-amber-800" },
  "BANAVIH": { icon: Building2, color: "from-indigo-600 to-blue-800" },
  "INPSASEL": { icon: ShieldCheck, color: "from-orange-600 to-red-800" },
  "SAPI": { icon: Globe, color: "from-purple-600 to-violet-800" },
  "SENCAMER": { icon: FileText, color: "from-teal-600 to-cyan-800" },
  "SUNDDE": { icon: Scale, color: "from-red-600 to-rose-800" },
  "SDP": { icon: ShieldCheck, color: "from-sky-600 to-blue-800" },
  "CONATEL": { icon: Globe, color: "from-fuchsia-600 to-purple-800" },
  "BCV": { icon: Landmark, color: "from-zinc-600 to-zinc-800" },
  "MINEC": { icon: Globe, color: "from-lime-600 to-green-800" },
  "GACETA": { icon: FileText, color: "from-stone-600 to-zinc-800" }
};

export default function PermisosSystemKyronPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<string>("TODOS");
  const [selectedPrioridad, setSelectedPrioridad] = useState<string>("TODAS");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filtered = permisos.filter(p => {
    if (selectedOrg !== "TODOS" && p.siglas !== selectedOrg) return false;
    if (selectedPrioridad !== "TODAS" && p.prioridad !== selectedPrioridad) return false;
    return true;
  });

  const criticosPendientes = permisos.filter(p => p.prioridad === "Crítico" && p.estado !== "Vigente" && p.estado !== "No aplica");
  const totalVigentes = permisos.filter(p => p.estado === "Vigente" && p.prioridad !== "Informativo").length;
  const totalPendientes = permisos.filter(p => (p.estado === "Pendiente" || p.estado === "En trámite") && p.prioridad !== "Informativo").length;

  return (
    <PasswordGate title="Permisos Requeridos — System Kyron">
    <div className="min-h-screen bg-[#020617] text-white font-[family-name:var(--font-outfit)] selection:bg-cyan-500/30">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03]"
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-[-5%] right-[-5%] w-[700px] h-[700px] bg-blue-600/8 blur-[200px] rounded-full" />
        <div className="absolute bottom-[5%] left-[-5%] w-[600px] h-[600px] bg-cyan-500/5 blur-[180px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-24">
        {/* Back + Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <Link href="/brand-kit" className="inline-flex items-center gap-2 text-zinc-500 hover:text-cyan-400 transition-colors text-sm font-bold">
            <ArrowLeft className="h-4 w-4" />
            Volver a Brand Kit
          </Link>
          <div className="flex gap-3">
            <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/30 text-zinc-400 hover:text-cyan-300 transition-all text-xs font-bold uppercase tracking-wider">
              <Printer className="h-4 w-4" />
              Imprimir / PDF
            </button>
          </div>
        </div>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md mb-6">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Cumplimiento Normativo — System Kyron</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] mb-6">
            Permisos <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-white bg-clip-text text-transparent">Requeridos</span>
          </h1>
          <p className="text-zinc-400 text-base lg:text-lg font-medium leading-relaxed max-w-2xl">
            Matriz completa de permisos, licencias, registros y habilitaciones que System Kyron debe obtener 
            para operar legalmente en Venezuela como empresa de tecnología, telecomunicaciones y servicios.
          </p>
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6">
            <p className="text-3xl font-black text-cyan-400">{permisos.length}</p>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mt-1">Total Permisos</p>
          </div>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6">
            <p className="text-3xl font-black text-emerald-400">{totalVigentes}</p>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mt-1">Vigentes</p>
          </div>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6">
            <p className="text-3xl font-black text-amber-400">{totalPendientes}</p>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mt-1">Pendientes</p>
          </div>
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6">
            <p className="text-3xl font-black text-red-400">{criticosPendientes.length}</p>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mt-1">Críticos Pendientes</p>
          </div>
        </motion.div>

        {/* Alert for critical pending */}
        {criticosPendientes.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-16 p-5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-black text-red-400">Permisos críticos pendientes</h3>
              <p className="text-zinc-400 text-sm mt-1">
                {criticosPendientes.map(p => p.permiso).join(", ")}. Sin estos permisos, System Kyron no puede operar legalmente.
              </p>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-3 mb-10">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSelectedOrg("TODOS")} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${selectedOrg === "TODOS" ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300" : "bg-white/5 border-white/10 text-zinc-500 hover:border-white/30"}`}>
              Todos
            </button>
            {organismosUnicos.map(org => (
              <button key={org} onClick={() => setSelectedOrg(org)} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${selectedOrg === org ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300" : "bg-white/5 border-white/10 text-zinc-500 hover:border-white/30"}`}>
                {org}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {["Crítico", "Alto", "Medio", "Informativo"].map(p => (
              <button key={p} onClick={() => setSelectedPrioridad(p)} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${selectedPrioridad === p ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300" : "bg-white/5 border-white/10 text-zinc-500 hover:border-white/30"}`}>
                {p}
              </button>
            ))}
            {selectedPrioridad !== "TODAS" && (
              <button onClick={() => setSelectedPrioridad("TODAS")} className="px-3 py-2 rounded-xl text-xs font-bold text-zinc-600 hover:text-zinc-400 transition-colors">
                ✕
              </button>
            )}
          </div>
        </motion.div>

        {/* Permisos List */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="space-y-4">
          {filtered.map((p, i) => {
            const orgIcon = resumenOrganismos[p.siglas]?.icon || Building2;
            return (
              <div key={p.id} className="group rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all duration-500 p-6">
                <div className="flex items-start gap-5">
                  <div className="hidden sm:flex h-12 w-12 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 items-center justify-center shrink-0">
                    {React.createElement(orgIcon, { className: "h-5 w-5 text-zinc-400" })}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="text-lg font-black tracking-tight text-white group-hover:text-cyan-200 transition-colors">{p.permiso}</h3>
                        <p className="text-xs font-medium text-zinc-500 mt-0.5">
                          {p.organismo} <span className="text-zinc-700">({p.siglas})</span>
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <span className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${prioridadColors[p.prioridad]}`}>
                          {p.prioridad}
                        </span>
                        <span className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${estadoColors[p.estado]}`}>
                          {p.estado}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">{p.descripcion}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-[11px] font-medium text-zinc-600">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        Vigencia: {p.vigencia}
                      </span>
                      {p.baseLegal && (
                        <span className="flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5" />
                          Base legal: {p.baseLegal}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Footer disclaimer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-16 p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-cyan-300">Disclaimer</p>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Esta matriz es una guía informativa basada en la normativa venezolana vigente. 
                Los requisitos pueden variar según la ubicación exacta del domicilio fiscal, 
                los servicios específicos que preste System Kyron y cambios en la legislación. 
                Se recomienda asesoría legal especializada para verificar cada caso.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
    </PasswordGate>
  );
}
