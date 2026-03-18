"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Mic, FileText, ChevronDown, ChevronRight, Play, Pause,
  Target, Zap, TrendingUp, Users, Globe, Shield, Heart,
  Phone, MessageSquare, Wifi, CreditCard, Banknote, Building2,
  CheckCircle, Star, Award, ArrowRight, Download, Printer,
  BrainCircuit, Handshake, Receipt, Car, BarChart2, Rocket,
  DollarSign, Clock, Activity, Lock, Sparkles, Database,
  FileDown, History, X, Copy, Check, ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const secciones = [
  {
    id: "apertura",
    numero: "01",
    titulo: "APERTURA — GANCHO INICIAL",
    duracion: "2 min",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    icon: Mic,
    guion: [
      {
        tipo: "NARRADOR",
        texto: "¿Cuántas horas a la semana pierde tu empresa haciendo a mano lo que una máquina puede hacer en segundos?",
      },
      {
        tipo: "PAUSA DRAMÁTICA",
        texto: "[Dejar que la pregunta resuene. Mirar al público. 3 segundos de silencio.]",
        esNota: true,
      },
      {
        tipo: "NARRADOR",
        texto: "En Venezuela, el 78% de las PYMEs y empresas medianas aún llevan su contabilidad en Excel. El 61% desconoce cuánto debe exactamente al SENIAT en tiempo real. Y el 84% no puede verificar un pago móvil en menos de 5 minutos.",
      },
      {
        tipo: "NARRADOR",
        texto: "Eso no es un problema de capacidad. Es un problema de herramientas. Hoy les presentamos la solución.",
      },
      {
        tipo: "REVEAL",
        texto: "System Kyron. El sistema operativo del empresario venezolano del siglo XXI.",
        esDestacado: true,
      },
    ],
    cifrasApoyo: [
      { val: "78%", desc: "PYMEs sin sistema contable automatizado" },
      { val: "61%", desc: "Desconocen su exposición fiscal en tiempo real" },
      { val: "84%", desc: "Verifican pagos móviles manualmente" },
    ],
  },
  {
    id: "problema",
    numero: "02",
    titulo: "EL PROBLEMA — CONTEXTO VENEZOLANO",
    duracion: "3 min",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    icon: Target,
    guion: [
      {
        tipo: "NARRADOR",
        texto: "El empresario venezolano de hoy enfrenta un entorno único en el mundo. Maneja simultáneamente: bolívares y dólares, IVA al 16%, IGTF al 3% en operaciones en divisa, retenciones de ISLR, libros del SENIAT, normas VEN-NIF, y un tipo de cambio que fluctúa a diario.",
      },
      {
        tipo: "NARRADOR",
        texto: "Al mismo tiempo, necesita emitir facturas, cobrar por pago móvil, Zelle, Reserve, Binance. Manejar puntos de venta. Gestionar nómina. Controlar inventario. Y cumplir con Saren, LOPCYMAT, INPSASEL, municipalidades…",
      },
      {
        tipo: "ÉNFASIS",
        texto: "Todo esto, con equipos pequeños, en tiempo real, sin margen de error.",
        esDestacado: true,
      },
      {
        tipo: "NARRADOR",
        texto: "El costo promedio de un error fiscal en Venezuela puede llegar al 150% del tributo omitido más intereses y sanciones. Una sola inconsistencia en libros puede paralizar operaciones. Una retención mal calculada puede generar una fiscalización que dure meses.",
      },
      {
        tipo: "NARRADOR",
        texto: "Las soluciones existentes en el mercado — software contable importado, ERPs costosos, hojas de cálculo compartidas — no fueron diseñadas para este contexto. System Kyron sí.",
      },
    ],
    cifrasApoyo: [
      { val: "150%", desc: "Sanción máxima por tributo omitido (SENIAT)" },
      { val: "Bs. 50,45", desc: "Tasa BCV USD referencial – marzo 2026" },
      { val: "16% + 3%", desc: "IVA + IGTF en operaciones con divisas" },
    ],
  },
  {
    id: "solucion",
    numero: "03",
    titulo: "LA SOLUCIÓN — SYSTEM KYRON",
    duracion: "5 min",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: Rocket,
    guion: [
      {
        tipo: "NARRADOR",
        texto: "System Kyron es una plataforma de gestión empresarial integral, diseñada específicamente para el mercado venezolano. No es solo software contable. Es el sistema nervioso de tu empresa.",
      },
      {
        tipo: "MÓDULO",
        titulo: "CONTABILIDAD INTELIGENTE",
        texto: "Normas VEN-NIF automatizadas. Libros del SENIAT generados en un clic: Libro de Compra-Venta, Diario, Mayor, Inventario. Ajuste por inflación RIPF automático con el índice BCV. Declaraciones de IVA, ISLR, IGTF precalculadas.",
        icono: "📊",
      },
      {
        tipo: "MÓDULO",
        titulo: "PAGOS DIGITALES VERIFICADOS",
        texto: "Verificación automática de pago móvil en tiempo real. El cliente paga y en 3 segundos el sistema confirma, registra y acredita. Sin llamadas. Sin esperas. Integración con Banesco, BdV, Mercantil, BNC, BOD, BBVA Provincial.",
        icono: "📱",
      },
      {
        tipo: "MÓDULO",
        titulo: "TELECOMUNICACIONES CORPORATIVAS",
        texto: "En alianza con nuestra línea telefónica, el sistema incluye internet ilimitado, telefonía corporativa con planes contables integrados, y WhatsApp Business con IA que responde a tus clientes 24/7 automáticamente.",
        icono: "📡",
      },
      {
        tipo: "MÓDULO",
        titulo: "ALIANZAS ESTRATÉGICAS",
        texto: "Acceso directo a Chévere Salud para cobertura médica corporativa, Mercantil Seguros para protección de activos, y Mapfre para seguros vehiculares. Todo gestionado dentro del sistema con integración contable automática.",
        icono: "🤝",
      },
      {
        tipo: "ÉNFASIS",
        texto: "Un solo sistema. Todo lo que tu empresa necesita para operar, crecer y cumplir en Venezuela.",
        esDestacado: true,
      },
    ],
    cifrasApoyo: [
      { val: "12+", desc: "Módulos integrados en una sola plataforma" },
      { val: "3 seg", desc: "Verificación automática de pago móvil" },
      { val: "100%", desc: "Cumplimiento SENIAT garantizado" },
    ],
  },
  {
    id: "mercado",
    numero: "04",
    titulo: "MERCADO OBJETIVO",
    duracion: "2 min",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    icon: Target,
    guion: [
      {
        tipo: "NARRADOR",
        texto: "Venezuela cuenta con más de 120.000 empresas formalmente registradas en el SENIAT. De ellas, aproximadamente 94.000 son PYMEs con entre 5 y 250 empleados. Ese es nuestro mercado primario.",
      },
      {
        tipo: "NARRADOR",
        texto: "Nuestro cliente ideal es el director o dueño de empresa entre 35 y 60 años, con operaciones en Caracas, Maracaibo, Valencia, Barquisimeto o Maracay, que factura entre $5.000 y $200.000 USD mensuales y que actualmente usa Excel, un contador externo, o software desactualizado.",
      },
      {
        tipo: "NARRADOR",
        texto: "Segmentos verticales con mayor tracción inicial: Distribuidoras, Farmacias, Ferreterías, Constructoras, Bufetes de abogados, Clínicas privadas, Empresas de servicios y Condominios.",
      },
      {
        tipo: "DATOS",
        titulo: "TAMAÑO DE MERCADO DIRECCIONABLE",
        texto: "TAM: 120.000 empresas · SAM: 94.000 PYMEs formales · SOM (primer año): 2.400 clientes · Precio promedio: $150 USD/mes · ARR potencial año 1: $4.320.000 USD",
        esDestacado: true,
      },
    ],
    cifrasApoyo: [
      { val: "120K", desc: "Empresas registradas en SENIAT Venezuela" },
      { val: "94K", desc: "PYMEs en mercado objetivo" },
      { val: "$150", desc: "Precio promedio mensual por empresa (USD)" },
    ],
  },
  {
    id: "modelo",
    numero: "05",
    titulo: "MODELO DE NEGOCIO",
    duracion: "3 min",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    icon: DollarSign,
    guion: [
      {
        tipo: "NARRADOR",
        texto: "System Kyron opera bajo un modelo de suscripción mensual SaaS con tres niveles, más ingresos adicionales por servicios de valor agregado y comisiones de alianzas.",
      },
      {
        tipo: "PLAN",
        titulo: "PLAN PROFESIONAL — $99 USD/mes",
        texto: "Contabilidad completa VEN-NIF. Facturación electrónica ilimitada. Conciliación bancaria 3 bancos. Pago móvil verificado. Hasta 10 usuarios. Telefonía básica incluida.",
        icono: "🔷",
      },
      {
        tipo: "PLAN",
        titulo: "PLAN CORPORATIVO — $199 USD/mes",
        texto: "Todo del plan Profesional. Conciliación 6 bancos. Módulo RRHH completo. WhatsApp IA activado. Telefonía corporativa 5 líneas. Módulos legal y tributario avanzados. Hasta 50 usuarios.",
        icono: "🔶",
      },
      {
        tipo: "PLAN",
        titulo: "PLAN ENTERPRISE — $399 USD/mes",
        texto: "Plataforma completa sin límites. Onboarding personalizado. SLA garantizado 99.9%. Integración API con sistemas bancarios. Módulo de telecomunicaciones completo. Alianzas de seguros y salud integradas. Usuarios ilimitados.",
        icono: "💎",
      },
      {
        tipo: "NARRADOR",
        texto: "Ingresos adicionales: 1) Comisiones por afiliación de clientes a Chévere Salud, Mercantil Seguros y Mapfre. 2) Margen en planes telefónicos corporativos. 3) Servicios de implementación y capacitación a empresas grandes.",
      },
    ],
    cifrasApoyo: [
      { val: "$99", desc: "Precio entrada Plan Profesional / mes (USD)" },
      { val: "LTV $3.600+", desc: "Valor promedio de cliente en 3 años" },
      { val: "< $80", desc: "Costo de adquisición de cliente (CAC)" },
    ],
  },
  {
    id: "diferenciadores",
    numero: "06",
    titulo: "VENTAJAS COMPETITIVAS",
    duracion: "3 min",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    icon: Shield,
    guion: [
      {
        tipo: "NARRADOR",
        texto: "Lo que nos diferencia no es solo tecnología. Es contexto. Somos el único sistema diseñado desde Venezuela, para Venezuela.",
      },
      {
        tipo: "DIFERENCIADOR",
        titulo: "INTELIGENCIA FISCAL VENEZOLANA",
        texto: "Conocemos el SENIAT, la Gaceta Oficial, el BCV, la LOPCYMAT, el SAREN, el SAPI. Actualizaciones automáticas ante cualquier cambio regulatorio. Cero riesgo de incumplimiento involuntario.",
        icono: "⚡",
      },
      {
        tipo: "DIFERENCIADOR",
        titulo: "VERIFICACIÓN DE PAGO MÓVIL EN TIEMPO REAL",
        texto: "Nadie más en Venezuela ofrece verificación automática de pago móvil integrada al sistema contable. El cliente paga, el sistema lo confirma y lo registra. 0% de fraude. 100% de trazabilidad.",
        icono: "📱",
      },
      {
        tipo: "DIFERENCIADOR",
        titulo: "ECOSISTEMA TODO EN UNO",
        texto: "No solo contabilidad. Telefonía, internet, seguros, salud, nómina, legal, inventario. Todo integrado. El empresario venezolano no tiene que salir de Kyron para operar su empresa.",
        icono: "🌐",
      },
      {
        tipo: "DIFERENCIADOR",
        titulo: "IA GENERATIVA APLICADA AL CONTEXTO LOCAL",
        texto: "Usando Google Gemini 1.5 Pro, el sistema redacta documentos legales venezolanos, extrae datos de facturas y recibos por foto, y responde consultas contables y tributarias en lenguaje natural.",
        icono: "🧠",
      },
      {
        tipo: "ÉNFASIS",
        texto: "Software importado como SAP, QuickBooks o Aspel no tienen ni la mitad de estas capacidades adaptadas al mercado venezolano. Y cuestan 10 veces más.",
        esDestacado: true,
      },
    ],
    cifrasApoyo: [
      { val: "0", desc: "Competidores directos con verificación de pago móvil integrada" },
      { val: "10x", desc: "Más económico que ERPs importados equivalentes" },
      { val: "34h", desc: "Promedio de horas ahorradas por empresa al mes" },
    ],
  },
  {
    id: "traccion",
    numero: "07",
    titulo: "TRACCIÓN Y VALIDACIÓN",
    duracion: "2 min",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    icon: TrendingUp,
    guion: [
      {
        tipo: "NARRADOR",
        texto: "System Kyron no es una idea. Es un producto funcionando, con clientes reales, en el mercado venezolano hoy.",
      },
      {
        tipo: "LOGRO",
        titulo: "CLIENTES ACTIVOS",
        texto: "Actualmente gestionamos la contabilidad y operaciones de empresas en sectores: distribución, retail, servicios profesionales, salud privada y construcción. Más de 240 empresas en lista de espera.",
        icono: "🏢",
      },
      {
        tipo: "LOGRO",
        titulo: "VOLUMEN DE TRANSACCIONES",
        texto: "En el último trimestre procesamos más de Bs. 18.400.000.000 en transacciones registradas, equivalentes a aproximadamente $364 millones USD al tipo de cambio BCV promedio del período.",
        icono: "💰",
      },
      {
        tipo: "LOGRO",
        titulo: "ALIANZAS FORMALIZADAS",
        texto: "Acuerdos marco firmados con Chévere Salud, Mercantil Seguros y Mapfre Venezuela. Negociaciones avanzadas con Banesco y BNC para integración API bancaria certificada.",
        icono: "🤝",
      },
      {
        tipo: "NARRADOR",
        texto: "NPS (Net Promoter Score) promedio entre clientes actuales: 72 puntos. Tasa de retención mensual: 96.4%. Tiempo promedio desde demo a contrato firmado: 11 días.",
      },
    ],
    cifrasApoyo: [
      { val: "96.4%", desc: "Tasa de retención mensual de clientes" },
      { val: "72 NPS", desc: "Satisfacción de clientes activos" },
      { val: "11 días", desc: "Ciclo promedio de venta (demo → contrato)" },
    ],
  },
  {
    id: "proyecciones",
    numero: "08",
    titulo: "PROYECCIONES FINANCIERAS",
    duracion: "2 min",
    color: "text-emerald-600",
    bg: "bg-emerald-600/10",
    border: "border-emerald-600/20",
    icon: BarChart2,
    guion: [
      {
        tipo: "NARRADOR",
        texto: "Proyectamos un crecimiento conservador basado en nuestra tracción actual y en los 240 clientes en lista de espera.",
      },
      {
        tipo: "DATOS",
        titulo: "AÑO 1 — 2026",
        texto: "Meta: 500 empresas activas · Ingreso ARR: $720.000 USD · EBITDA estimado: 24% · MRR al cierre: $60.000 USD",
        icono: "📈",
      },
      {
        tipo: "DATOS",
        titulo: "AÑO 2 — 2027",
        texto: "Meta: 2.400 empresas activas · Ingreso ARR: $3.840.000 USD · EBITDA: 38% · Expansión a mercados LATAM: Colombia, Ecuador",
        icono: "📈",
      },
      {
        tipo: "DATOS",
        titulo: "AÑO 3 — 2028",
        texto: "Meta: 8.000 empresas activas · Ingreso ARR: $14.400.000 USD · EBITDA: 52% · Plataforma regional consolidada",
        icono: "🚀",
      },
      {
        tipo: "NARRADOR",
        texto: "Estas proyecciones asumen una tasa de conversión del 2.5% del mercado venezolano SAM y un churn mensual inferior al 4%, consistente con nuestros números actuales.",
      },
    ],
    cifrasApoyo: [
      { val: "$14.4M", desc: "ARR proyectado año 3 (2028)" },
      { val: "52%", desc: "Margen EBITDA proyectado año 3" },
      { val: "3", desc: "Países objetivo para 2027 (VE, CO, EC)" },
    ],
  },
  {
    id: "equipo",
    numero: "09",
    titulo: "EL EQUIPO",
    duracion: "2 min",
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    border: "border-rose-400/20",
    icon: Users,
    guion: [
      {
        tipo: "NARRADOR",
        texto: "Detrás de System Kyron hay un equipo fundador con más de 20 años de experiencia combinada en contabilidad venezolana, tecnología y telecomunicaciones.",
      },
      {
        tipo: "MIEMBRO",
        titulo: "FUNDADOR / CEO",
        texto: "Contador Público colegiado con 15 años de experiencia fiscal en Venezuela. Ex-gerente tributario en firma Big Four. Especialista en VEN-NIF, SENIAT y cumplimiento regulatorio venezolano.",
        icono: "👤",
      },
      {
        tipo: "MIEMBRO",
        titulo: "CTO",
        texto: "Ingeniero en computación. Especialista en arquitecturas SaaS y desarrollo de plataformas de pagos digitales en el ecosistema venezolano. Ex-desarrollador senior en entidad bancaria venezolana.",
        icono: "👤",
      },
      {
        tipo: "MIEMBRO",
        titulo: "CCO – ALIANZAS",
        texto: "Ejecutivo comercial con red de más de 800 contactos empresariales en Venezuela. Responsable de los acuerdos con Chévere Salud, Mercantil Seguros y Mapfre.",
        icono: "👤",
      },
      {
        tipo: "NARRADOR",
        texto: "El equipo está complementado por un board de asesores que incluye abogados mercantiles, contadores públicos certificados, y especialistas en fintech latinoamericano.",
      },
    ],
    cifrasApoyo: [
      { val: "20+", desc: "Años experiencia combinada del equipo fundador" },
      { val: "800+", desc: "Contactos empresariales en red comercial" },
      { val: "3", desc: "Alianzas estratégicas formalizadas" },
    ],
  },
  {
    id: "inversion",
    numero: "10",
    titulo: "RONDA DE INVERSIÓN — CALL TO ACTION",
    duracion: "3 min",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    icon: Rocket,
    guion: [
      {
        tipo: "NARRADOR",
        texto: "Estamos buscando nuestra primera ronda seed de $500.000 USD para acelerar lo que ya está funcionando.",
      },
      {
        tipo: "USO",
        titulo: "35% — TECNOLOGÍA Y PRODUCTO",
        texto: "Finalización de módulos avanzados: Telecom corporativo, API bancaria certificada Banesco/Mercantil. Infraestructura cloud para escalar a 10.000 empresas.",
        icono: "💻",
      },
      {
        tipo: "USO",
        titulo: "30% — EQUIPO COMERCIAL",
        texto: "Contratación de 8 ejecutivos de ventas B2B en Caracas, Maracaibo, Valencia y Barquisimeto. Meta: cerrar 500 empresas en los primeros 12 meses post-ronda.",
        icono: "📣",
      },
      {
        tipo: "USO",
        titulo: "20% — MARKETING Y POSICIONAMIENTO",
        texto: "Presencia digital, eventos empresariales, alianzas con cámaras de comercio: Fedecámaras, Conindustria, Consecomercio, Cavedi.",
        icono: "📢",
      },
      {
        tipo: "USO",
        titulo: "15% — OPERACIONES Y CAPITAL DE TRABAJO",
        texto: "6 meses de runway operativo. Estructura administrativa. Licencias regulatorias adicionales.",
        icono: "⚙️",
      },
      {
        tipo: "CIERRE",
        texto: "El mercado existe. Los clientes están esperando. El producto funciona. El equipo lo sabe hacer. Solo necesitamos el combustible para acelerar. Únase a nosotros en construir el sistema operativo del empresario venezolano.",
        esDestacado: true,
      },
    ],
    cifrasApoyo: [
      { val: "$500K", desc: "Ronda seed buscada" },
      { val: "18 meses", desc: "Runway con la inversión actual" },
      { val: "500", desc: "Empresas meta en 12 meses post-ronda" },
    ],
  },
];

const metasDeck = [
  { icon: Clock, label: "Duración total", val: "27 min" },
  { icon: FileText, label: "Secciones", val: "10 actos" },
  { icon: Users, label: "Audiencia", val: "Inversores / Socios" },
  { icon: Globe, label: "Mercado", val: "Venezuela · LATAM" },
];

type RegistroItem = { id: number; titulo: string; creado_en: string };

export default function SectorPrivadoKyronPage() {
  const [seccionAbierta, setSeccionAbierta] = useState<string | null>("apertura");
  const [imprimiendo, setImprimiendo] = useState(false);
  const [generandoIA, setGenerandoIA] = useState(false);
  const [pitchIA, setPitchIA] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [descargandoPPTX, setDescargandoPPTX] = useState(false);
  const [errorPPTX, setErrorPPTX] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [registros, setRegistros] = useState<RegistroItem[]>([]);
  const [mostrarRegistros, setMostrarRegistros] = useState(false);

  const toggleSeccion = (id: string) => {
    setSeccionAbierta(seccionAbierta === id ? null : id);
  };

  const handlePrint = () => {
    setImprimiendo(true);
    setTimeout(() => {
      window.print();
      setImprimiendo(false);
    }, 300);
  };

  const handleGenerarIA = async () => {
    setGenerandoIA(true);
    try {
      const res = await fetch('/api/pitch-ia', { method: 'POST' });
      const data = await res.json();
      if (data.pitch) {
        setPitchIA(data.pitch);
        setMostrarModal(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGenerandoIA(false);
    }
  };

  const handleDescargarPPTX = async () => {
    setDescargandoPPTX(true);
    setErrorPPTX(false);
    try {
      const res = await fetch('/api/pitch-pptx', { method: 'POST' });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ?? 'Error al generar el archivo');
      }
      const blob = await res.blob();
      if (blob.size === 0) throw new Error('Archivo vacío recibido');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'SystemKyron-PitchDeck-12slides.pptx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('[PPTX Download]', e);
      setErrorPPTX(true);
      setTimeout(() => setErrorPPTX(false), 5000);
    } finally {
      setDescargandoPPTX(false);
    }
  };

  const handleCopiar = () => {
    if (pitchIA) {
      navigator.clipboard.writeText(pitchIA);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  };

  const cargarRegistros = useCallback(async () => {
    try {
      const res = await fetch('/api/pitch-ia');
      const data = await res.json();
      setRegistros(data.sessions ?? []);
    } catch {}
  }, []);

  useEffect(() => {
    cargarRegistros();
  }, [cargarRegistros]);

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">

      <AnimatePresence>
        {mostrarModal && pitchIA && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setMostrarModal(false)}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-card border border-border rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-primary">Gemini IA</p>
                    <p className="text-xs text-muted-foreground font-bold uppercase">Guión de Pitch — 5 minutos</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="rounded-xl gap-2 text-[10px] font-black uppercase" onClick={handleCopiar}>
                    {copiado ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                    {copiado ? 'Copiado' : 'Copiar'}
                  </Button>
                  <Button size="sm" variant="ghost" className="rounded-xl" onClick={() => setMostrarModal(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="overflow-y-auto p-6 flex-1">
                <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed">
                  {pitchIA}
                </pre>
              </div>
              <div className="p-4 border-t border-border shrink-0 flex justify-end gap-2">
                <Button variant="outline" className="rounded-xl text-[10px] font-black uppercase gap-2" onClick={handlePrint}>
                  <Printer className="h-3.5 w-3.5" /> Imprimir
                </Button>
                <Button className="rounded-xl text-[10px] font-black uppercase gap-2 btn-3d-primary" onClick={handleDescargarPPTX} disabled={descargandoPPTX}>
                  <FileDown className="h-3.5 w-3.5" />
                  {descargandoPPTX ? 'Generando...' : 'Generar PPTX'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <Mic className="h-3 w-3" /> GUIÓN DE PITCH — SECTOR PRIVADO
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            SYSTEM KYRON · <span className="text-primary italic">PITCH DECK</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Guión Maestro · Sector Privado Venezolano · Ronda Seed $500K USD
          </p>
        </div>
        <div className="flex flex-wrap gap-3 no-print">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2" onClick={handlePrint}>
            {imprimiendo ? <Activity className="h-4 w-4 animate-spin" /> : <Printer className="h-4 w-4" />}
            Imprimir
          </Button>
          <Button
            variant="outline"
            className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2 border-emerald-500/40 text-emerald-600 hover:bg-emerald-500/10"
            onClick={handleDescargarPPTX}
            disabled={descargandoPPTX}
          >
            {descargandoPPTX ? <Activity className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
            {descargandoPPTX ? 'Generando...' : 'Generar PPTX'}
          </Button>
          <Button
            className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2"
            onClick={handleGenerarIA}
            disabled={generandoIA}
          >
            {generandoIA ? <Activity className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {generandoIA ? 'Generando con IA...' : 'Generar Pitch IA — 5 min'}
          </Button>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 no-print"
      >
        <div
          className="col-span-2 p-5 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-transparent flex items-center gap-5 cursor-pointer hover:border-primary/40 transition-all"
          onClick={handleGenerarIA}
        >
          <div className="p-3 bg-primary/20 rounded-xl shrink-0">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-black text-primary uppercase tracking-widest">Generador de Pitch con IA · Gemini</p>
            <p className="text-[11px] text-muted-foreground font-bold mt-0.5">
              Genera un guión de 5 minutos personalizado sobre las innovaciones de System Kyron. Cada generación se guarda en la base de datos.
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-primary shrink-0 ml-auto" />
        </div>
        <div
          className={cn(
            "p-5 rounded-2xl border bg-gradient-to-r from-emerald-500/10 to-transparent flex items-center gap-4 cursor-pointer transition-all",
            errorPPTX ? "border-rose-500/50 from-rose-500/10" : "border-emerald-500/20 hover:border-emerald-500/40",
            descargandoPPTX && "opacity-70 cursor-wait"
          )}
          onClick={!descargandoPPTX ? handleDescargarPPTX : undefined}
        >
          <div className={cn("p-3 rounded-xl shrink-0", errorPPTX ? "bg-rose-500/20" : "bg-emerald-500/20")}>
            {descargandoPPTX
              ? <Activity className="h-6 w-6 text-emerald-500 animate-spin" />
              : errorPPTX
              ? <X className="h-6 w-6 text-rose-500" />
              : <FileDown className="h-6 w-6 text-emerald-500" />}
          </div>
          <div>
            <p className={cn("text-sm font-black uppercase tracking-widest", errorPPTX ? "text-rose-500" : "text-emerald-600")}>
              {descargandoPPTX ? 'Generando PPTX...' : errorPPTX ? 'Error — Intentar de nuevo' : 'Generar PPTX'}
            </p>
            <p className="text-[11px] text-muted-foreground font-bold mt-0.5">
              {errorPPTX ? 'No se pudo generar el archivo. Haz clic para reintentar.' : '12 slides · 27 minutos · Guión del presentador incluido'}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {metasDeck.map((m, i) => (
          <Card key={i} className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
            <div className="flex flex-row items-center justify-between p-6">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mb-1">{m.label}</p>
                <p className="text-xl font-black italic text-primary">{m.val}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-muted border border-border group-hover:scale-110 transition-transform">
                <m.icon className="h-4 w-4 text-primary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 flex items-start gap-5">
        <div className="p-3 bg-primary/10 rounded-xl shrink-0">
          <BrainCircuit className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-[11px] font-black uppercase text-primary tracking-widest mb-1">Instrucciones para el Presentador</p>
          <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed">
            Este guión está estructurado en 10 actos con una duración total aproximada de 27 minutos. Cada acto incluye el texto de narración, notas de dirección, y cifras de apoyo para reforzar cada punto. Los bloques en color destacado son los momentos de mayor impacto — entréguelos con pausa y convicción. No los apresure.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {secciones.map((s, idx) => {
          const Icon = s.icon;
          const isOpen = seccionAbierta === s.id;

          return (
            <motion.div key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <Card className={cn("glass-card border bg-card/40 rounded-2xl overflow-hidden transition-all", s.border, isOpen && "shadow-xl")}>
                <button
                  className="w-full flex items-center justify-between p-6 md:p-8 hover:bg-muted/20 transition-colors text-left"
                  onClick={() => toggleSeccion(s.id)}
                >
                  <div className="flex items-center gap-5">
                    <div className={cn("px-3 py-1.5 rounded-xl font-black text-[11px] italic", s.bg, s.color)}>
                      {s.numero}
                    </div>
                    <div className={cn("p-3 rounded-xl", s.bg)}>
                      <Icon className={cn("h-5 w-5", s.color)} />
                    </div>
                    <div>
                      <p className={cn("text-[11px] font-black uppercase tracking-widest italic", s.color)}>{s.titulo}</p>
                      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                        Duración estimada: {s.duracion}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className={cn("h-5 w-5 text-muted-foreground/60 transition-transform duration-300", isOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 md:px-10 pb-8 space-y-8 border-t border-border pt-6">
                        <div className="grid grid-cols-3 gap-4">
                          {s.cifrasApoyo.map((c, j) => (
                            <div key={j} className={cn("p-4 rounded-2xl text-center", s.bg, s.border, "border")}>
                              <p className={cn("text-xl font-black italic", s.color)}>{c.val}</p>
                              <p className="text-[8px] font-bold text-muted-foreground uppercase leading-tight mt-1">{c.desc}</p>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-5">
                          {s.guion.map((bloque, j) => (
                            <div key={j} className={cn(
                              "rounded-2xl p-5 space-y-2",
                              bloque.esNota ? "bg-amber-500/5 border border-amber-500/20" :
                              bloque.esDestacado ? cn(s.bg, "border", s.border) :
                              "bg-muted/30 border border-border"
                            )}>
                              <div className="flex items-center gap-2 mb-2">
                                {bloque.tipo === "NARRADOR" && (
                                  <Badge className="bg-foreground/10 text-foreground/60 border-none text-[7px] font-black px-2 py-0.5 uppercase tracking-widest">🎙 NARRADOR</Badge>
                                )}
                                {bloque.tipo === "PAUSA DRAMÁTICA" && (
                                  <Badge className="bg-amber-500/20 text-amber-600 border-none text-[7px] font-black px-2 py-0.5 uppercase tracking-widest">⏸ PAUSA DRAMÁTICA</Badge>
                                )}
                                {bloque.tipo === "ÉNFASIS" && (
                                  <Badge className={cn("border-none text-[7px] font-black px-2 py-0.5 uppercase tracking-widest", s.bg, s.color)}>⚡ ÉNFASIS</Badge>
                                )}
                                {bloque.tipo === "REVEAL" && (
                                  <Badge className={cn("border-none text-[7px] font-black px-2 py-0.5 uppercase tracking-widest", s.bg, s.color)}>🎯 REVEAL</Badge>
                                )}
                                {(bloque.tipo === "MÓDULO" || bloque.tipo === "PLAN" || bloque.tipo === "DATOS" || bloque.tipo === "DIFERENCIADOR" || bloque.tipo === "LOGRO" || bloque.tipo === "USO" || bloque.tipo === "MIEMBRO") && (
                                  <Badge className={cn("border-none text-[7px] font-black px-2 py-0.5 uppercase tracking-widest", s.bg, s.color)}>
                                    {bloque.tipo === "MÓDULO" && "📦 "}
                                    {bloque.tipo === "PLAN" && "💼 "}
                                    {bloque.tipo === "DATOS" && "📊 "}
                                    {bloque.tipo === "DIFERENCIADOR" && "🏆 "}
                                    {bloque.tipo === "LOGRO" && "✅ "}
                                    {bloque.tipo === "USO" && "🎯 "}
                                    {bloque.tipo === "MIEMBRO" && "👤 "}
                                    {bloque.tipo}
                                  </Badge>
                                )}
                                {(bloque.tipo === "CIERRE") && (
                                  <Badge className={cn("border-none text-[7px] font-black px-2 py-0.5 uppercase tracking-widest", s.bg, s.color)}>🚀 CIERRE</Badge>
                                )}
                                {"titulo" in bloque && bloque.titulo && (
                                  <p className={cn("text-[10px] font-black uppercase italic", s.color)}>{bloque.titulo}</p>
                                )}
                              </div>
                              <p className={cn(
                                "font-bold uppercase leading-relaxed",
                                bloque.esDestacado ? cn("text-sm font-black", s.color) : "text-[10px] text-foreground/80",
                                bloque.esNota && "text-amber-600 italic"
                              )}>
                                {bloque.texto}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card border-none bg-primary/5 rounded-2xl p-8 border border-primary/20 space-y-4">
          <div className="p-3 bg-primary/10 rounded-xl w-fit">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-[11px] font-black uppercase text-primary italic tracking-widest">Confidencial</p>
            <p className="text-[9px] font-bold text-muted-foreground uppercase leading-snug mt-1">
              Este guión es de uso exclusivo del equipo directivo de System Kyron. No reproducir ni distribuir sin autorización escrita del CEO.
            </p>
          </div>
        </Card>
        <Card className="glass-card border-none bg-emerald-500/5 rounded-2xl p-8 border border-emerald-500/20 space-y-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl w-fit">
            <CheckCircle className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-[11px] font-black uppercase text-emerald-500 italic tracking-widest">Versión Validada</p>
            <p className="text-[9px] font-bold text-muted-foreground uppercase leading-snug mt-1">
              Guión v3.2 · Marzo 2026. Revisado por equipo legal y contador público externo. Cifras auditadas al 15/03/2026.
            </p>
          </div>
        </Card>
        <Card className="glass-card border-none bg-amber-500/5 rounded-2xl p-8 border border-amber-500/20 space-y-4">
          <div className="p-3 bg-amber-500/10 rounded-xl w-fit">
            <Star className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <p className="text-[11px] font-black uppercase text-amber-500 italic tracking-widest">Consejo Final</p>
            <p className="text-[9px] font-bold text-muted-foreground uppercase leading-snug mt-1">
              Practica el pitch completo al menos 5 veces antes de la presentación. Cronometra cada sección. Los mejores pitch son los que suenan naturales, no memorizados.
            </p>
          </div>
        </Card>
      </div>

      <div className="no-print rounded-2xl border border-border bg-card/30 overflow-hidden">
        <button
          className="w-full flex items-center justify-between p-5 hover:bg-muted/10 transition-colors"
          onClick={() => { setMostrarRegistros(!mostrarRegistros); if (!mostrarRegistros) cargarRegistros(); }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-muted rounded-xl">
              <Database className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-left">
              <p className="text-[11px] font-black uppercase tracking-widest text-foreground">Registro de Documentos</p>
              <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wide">
                {registros.length} generaciones guardadas en base de datos
              </p>
            </div>
          </div>
          {mostrarRegistros ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </button>
        <AnimatePresence>
          {mostrarRegistros && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="px-5 pb-5 border-t border-border">
                {registros.length === 0 ? (
                  <div className="py-8 flex flex-col items-center gap-2 text-muted-foreground">
                    <History className="h-8 w-8 opacity-30" />
                    <p className="text-[11px] font-bold uppercase tracking-widest">Sin registros aún — genera tu primer pitch con IA</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {registros.map((r) => (
                      <div key={r.id} className="flex items-center justify-between py-3 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-primary/10 rounded-lg shrink-0">
                            <FileText className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <p className="text-[11px] font-bold text-foreground truncate max-w-xs">{r.titulo}</p>
                        </div>
                        <p className="text-[9px] text-muted-foreground font-bold uppercase whitespace-nowrap">
                          {new Date(r.creado_en).toLocaleDateString('es-VE', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
