import {
  Calculator, Receipt, Users, Gavel, Megaphone, Smartphone, Leaf,
  BrainCircuit, LayoutDashboard, Building2, BookOpen, Landmark, Shield,
  FileText, Briefcase, UserPlus, Scale, Target, CreditCard,
  Wallet, Banknote, UserCheck, Stethoscope, School, Recycle,
  Phone, Gauge, Bot, ShieldCheck, Sparkles, Globe, MailOpen,
  type LucideIcon,
} from "lucide-react";

export interface ModuleTutorialStep {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
  bullets?: string[];
}

export interface ModuleTutorialConfig {
  moduleId: string;
  moduleName: string;
  moduleTag: string;
  steps: ModuleTutorialStep[];
}

export const moduleTutorials: Record<string, ModuleTutorialConfig> = {
  "dashboard-empresa": {
    moduleId: "dashboard-empresa",
    moduleName: "Dashboard Empresarial",
    moduleTag: "DASHBOARD",
    steps: [
      {
        title: "Tu Centro de Control",
        description: "El Dashboard Empresarial es tu vista general de toda la operación. Aquí puedes ver en tiempo real los indicadores clave de tu empresa.",
        icon: LayoutDashboard,
        color: "text-cyan-400",
        bg: "bg-cyan-400/15",
        border: "border-cyan-400/20",
        bullets: [
          "Ingresos, gastos, utilidad neta y liquidez en tiempo real",
          "Tasa BCV actualizada automáticamente",
          "Índice de salud financiera con calificación automática",
        ],
      },
      {
        title: "Métricas y Gráficos",
        description: "Visualiza el flujo financiero de los últimos 12 meses, distribución de facturas, clientes activos, empleados y notificaciones pendientes.",
        icon: Target,
        color: "text-blue-400",
        bg: "bg-blue-400/15",
        border: "border-blue-400/20",
        bullets: [
          "Gráfico de flujo financiero mensual (ingresos vs gastos)",
          "Distribución de facturas: emitidas, cobradas, pagadas y vencidas",
          "Sparklines de tendencia en cada indicador",
        ],
      },
      {
        title: "Herramientas Rápidas",
        description: "Desde el dashboard puedes acceder a cierre de período fiscal, registro de auditoría y análisis con inteligencia artificial en un solo clic.",
        icon: BrainCircuit,
        color: "text-violet-400",
        bg: "bg-violet-400/15",
        border: "border-violet-400/20",
        bullets: [
          "Cerrar período fiscal con vista previa automática",
          "Registro de auditoría con búsqueda y filtros",
          "Análisis IA de tu situación financiera actual",
        ],
      },
    ],
  },

  "contabilidad": {
    moduleId: "contabilidad",
    moduleName: "Contabilidad",
    moduleTag: "CONTABILIDAD",
    steps: [
      {
        title: "Centro Contable",
        description: "Gestiona toda tu contabilidad bajo normas VEN-NIF desde un solo lugar. El centro contable es el corazón financiero de tu empresa.",
        icon: Calculator,
        color: "text-blue-400",
        bg: "bg-blue-400/15",
        border: "border-blue-400/20",
        bullets: [
          "Plan de cuentas personalizable según normativa venezolana",
          "Asientos contables con partida doble automática",
          "Estados financieros: Balance General, Estado de Resultados, Flujo de Efectivo",
        ],
      },
      {
        title: "Libros Obligatorios",
        description: "Todos los libros contables que exige la ley venezolana, generados y actualizados automáticamente desde tus operaciones diarias.",
        icon: BookOpen,
        color: "text-emerald-400",
        bg: "bg-emerald-400/15",
        border: "border-emerald-400/20",
        bullets: [
          "Libro Diario, Mayor, Inventario y Compra-Venta",
          "Libro de Nómina, Horas Extras y Cesta Ticket",
          "Libro de Control de Licores (si aplica)",
        ],
      },
      {
        title: "Centro Tributario",
        description: "Gestiona todas tus obligaciones fiscales: IVA, ISLR, IGTF, retenciones, parafiscales, municipales y más. Con calendario fiscal y alertas automáticas.",
        icon: Landmark,
        color: "text-amber-400",
        bg: "bg-amber-400/15",
        border: "border-amber-400/20",
        bullets: [
          "Declaraciones de IVA, ISLR, IGTF 3% y retenciones",
          "Aportes parafiscales: IVSS, INCES, FAOV, BANAVIH",
          "Calendario fiscal SENIAT con alertas de vencimiento",
        ],
      },
      {
        title: "Análisis y Cierre",
        description: "Indicadores financieros, presupuesto, centro de costos, depreciación de activos, conciliación bancaria y cierre contable por período.",
        icon: Target,
        color: "text-indigo-400",
        bg: "bg-indigo-400/15",
        border: "border-indigo-400/20",
        bullets: [
          "Conciliación bancaria automática y exportación SENIAT",
          "Indicadores financieros y análisis con IA",
          "Cierre contable por período con dictamen del contador",
        ],
      },
    ],
  },

  "facturacion": {
    moduleId: "facturacion",
    moduleName: "Facturación",
    moduleTag: "FACTURACIÓN",
    steps: [
      {
        title: "Centro de Facturas",
        description: "Emite facturas electrónicas con tasa BCV en tiempo real. Controla todas tus operaciones de facturación desde un panel centralizado.",
        icon: Receipt,
        color: "text-amber-400",
        bg: "bg-amber-400/15",
        border: "border-amber-400/20",
        bullets: [
          "Facturas con tasa BCV actualizada automáticamente",
          "Notas de crédito y débito integradas",
          "Historial completo de todas las facturas emitidas",
        ],
      },
      {
        title: "Ventas y Cobros",
        description: "Gestiona cotizaciones, ventas a crédito, punto de venta para operaciones rápidas y seguimiento de cuentas por cobrar con alertas de vencimiento.",
        icon: CreditCard,
        color: "text-blue-400",
        bg: "bg-blue-400/15",
        border: "border-blue-400/20",
        bullets: [
          "Cotizaciones (proformas) convertibles a factura",
          "Punto de venta para ventas presenciales",
          "Ventas a crédito con seguimiento de pagos",
        ],
      },
      {
        title: "Cuentas por Cobrar y Pagar",
        description: "Controla tus cobros y pagos pendientes con análisis de vencimientos, notificaciones automáticas y reportes de antigüedad de saldos.",
        icon: Wallet,
        color: "text-emerald-400",
        bg: "bg-emerald-400/15",
        border: "border-emerald-400/20",
        bullets: [
          "Dashboard de cuentas por cobrar con estado de cada factura",
          "Cuentas por pagar con fechas de vencimiento",
          "Reportes de antigüedad y análisis de cartera",
        ],
      },
    ],
  },

  "rrhh": {
    moduleId: "rrhh",
    moduleName: "RRHH & Nómina",
    moduleTag: "RRHH",
    steps: [
      {
        title: "Gestión de Nómina",
        description: "Calcula y procesa la nómina de tus empleados con todos los conceptos legales venezolanos incluidos automáticamente.",
        icon: Banknote,
        color: "text-emerald-400",
        bg: "bg-emerald-400/15",
        border: "border-emerald-400/20",
        bullets: [
          "Cálculo automático con SSO, FAOV, INCES, IVSS",
          "Prestaciones sociales y liquidaciones según LOTTT",
          "Certificados laborales y constancias de trabajo",
        ],
      },
      {
        title: "Talento Humano",
        description: "Reclutamiento, selección, inducción, clima organizacional, formación y desarrollo de carrera de tus colaboradores.",
        icon: UserPlus,
        color: "text-blue-400",
        bg: "bg-blue-400/15",
        border: "border-blue-400/20",
        bullets: [
          "Proceso de selección e inducción de nuevos empleados",
          "Evaluación de clima y liderazgo organizacional",
          "Planes de carrera y formación continua",
        ],
      },
      {
        title: "Bienestar y Seguridad",
        description: "Salud laboral bajo LOPCYMAT, gestión de vacaciones, bienestar del empleado, libros de horas extras y manuales internos.",
        icon: Stethoscope,
        color: "text-rose-400",
        bg: "bg-rose-400/15",
        border: "border-rose-400/20",
        bullets: [
          "Cumplimiento LOPCYMAT y salud ocupacional",
          "Gestión de vacaciones y permisos",
          "Libros de horas extras y cesta ticket",
        ],
      },
    ],
  },

  "legal": {
    moduleId: "legal",
    moduleName: "Legal & Permisos",
    moduleTag: "LEGAL",
    steps: [
      {
        title: "Generador de Documentos",
        description: "Crea contratos, acuerdos y documentos legales con asistencia de inteligencia artificial. Plantillas prediseñadas para las necesidades más comunes.",
        icon: Gavel,
        color: "text-purple-400",
        bg: "bg-purple-400/15",
        border: "border-purple-400/20",
        bullets: [
          "Generación de contratos con IA integrada",
          "Archivo digital de todos tus contratos",
          "Plantillas personalizables por tipo de documento",
        ],
      },
      {
        title: "Permisología",
        description: "Centraliza todos los permisos y licencias de tu empresa: CONATEL, protección de pensiones, trámites fiscales y autorizaciones vigentes.",
        icon: Shield,
        color: "text-cyan-400",
        bg: "bg-cyan-400/15",
        border: "border-cyan-400/20",
        bullets: [
          "Centro de permisología con licencias vigentes",
          "Alertas de vencimiento de permisos",
          "Trámites fiscales y autorizaciones en un solo lugar",
        ],
      },
    ],
  },

  "marketing": {
    moduleId: "marketing",
    moduleName: "Marketing & CRM",
    moduleTag: "MARKETING",
    steps: [
      {
        title: "Dashboard de Marketing",
        description: "Visualiza el rendimiento de todas tus campañas, embudos de venta y métricas de conversión desde un panel centralizado.",
        icon: Megaphone,
        color: "text-pink-400",
        bg: "bg-pink-400/15",
        border: "border-pink-400/20",
        bullets: [
          "Métricas de campañas en tiempo real",
          "Embudos de venta con tasas de conversión",
          "Análisis de ROI por canal de marketing",
        ],
      },
      {
        title: "CRM y Clientes",
        description: "Gestiona tu relación con clientes: seguimiento, segmentación, fidelización, email marketing y gestión de redes sociales desde un solo lugar.",
        icon: Users,
        color: "text-blue-400",
        bg: "bg-blue-400/15",
        border: "border-blue-400/20",
        bullets: [
          "CRM con seguimiento de cada cliente",
          "Email marketing y campañas automatizadas",
          "Gestión de redes sociales y carnets corporativos",
        ],
      },
    ],
  },

  "telecom": {
    moduleId: "telecom",
    moduleName: "Mi Línea",
    moduleTag: "TELECOM",
    steps: [
      {
        title: "Líneas Personales",
        description: "Gestiona tus líneas telefónicas: recargas, consumo de datos 5G, activación de eSIM digital y consulta de facturas de telecom.",
        icon: Phone,
        color: "text-teal-400",
        bg: "bg-teal-400/15",
        border: "border-teal-400/20",
        bullets: [
          "Recargas y consulta de saldo en tiempo real",
          "Monitoreo de consumo 5G y datos",
          "Activación de eSIM digital y facturación",
        ],
      },
      {
        title: "Flota Empresarial",
        description: "Administra las líneas corporativas de tu empresa: límites por empleado, homologación IMEI, reportes de flota y facturación corporativa.",
        icon: Building2,
        color: "text-blue-400",
        bg: "bg-blue-400/15",
        border: "border-blue-400/20",
        bullets: [
          "Control de flota con límites por empleado",
          "Homologación IMEI y gestión de equipos",
          "Reportes de consumo y facturación corporativa",
        ],
      },
    ],
  },

  "sostenibilidad": {
    moduleId: "sostenibilidad",
    moduleName: "Sostenibilidad",
    moduleTag: "ECO",
    steps: [
      {
        title: "Impacto Ambiental",
        description: "Mide y gestiona el impacto ambiental de tu empresa con métricas, certificaciones y herramientas de sostenibilidad corporativa.",
        icon: Leaf,
        color: "text-green-400",
        bg: "bg-green-400/15",
        border: "border-green-400/20",
        bullets: [
          "Dashboard ambiental con métricas de impacto",
          "Mercado Eco-Exchange de créditos verdes",
          "Tarjeta de reciclaje avanzada con tracking",
        ],
      },
    ],
  },

  "ciudadano": {
    moduleId: "ciudadano",
    moduleName: "Portal Ciudadano",
    moduleTag: "CIUDADANO",
    steps: [
      {
        title: "Tu Identidad Digital",
        description: "Accede a tu identificación digital 3D, datos maestros personales y configuración de privacidad y seguridad de tu cuenta.",
        icon: UserCheck,
        color: "text-indigo-400",
        bg: "bg-indigo-400/15",
        border: "border-indigo-400/20",
        bullets: [
          "Tarjeta de identificación digital 3D",
          "Datos personales y configuración de privacidad",
          "Seguridad de cuenta y autenticación",
        ],
      },
      {
        title: "Documentos y Gestión Civil",
        description: "Tu bóveda de documentos civiles: partidas de nacimiento, actas de matrimonio, antecedentes penales, RIF y buzón judicial.",
        icon: FileText,
        color: "text-blue-400",
        bg: "bg-blue-400/15",
        border: "border-blue-400/20",
        bullets: [
          "Bóveda civil con documentos digitalizados",
          "Partidas de nacimiento y actas de matrimonio",
          "Antecedentes penales y documentos judiciales",
        ],
      },
      {
        title: "Salud y Bienestar",
        description: "Red médica, carnet de salud, LOPNNA Sync para manutención, directorio médico y servicios de bienestar ciudadano.",
        icon: Stethoscope,
        color: "text-emerald-400",
        bg: "bg-emerald-400/15",
        border: "border-emerald-400/20",
        bullets: [
          "Directorio médico y red de salud",
          "Carnet de salud digital",
          "LOPNNA Sync para gestión de manutención",
        ],
      },
    ],
  },

  "kyron-ia": {
    moduleId: "kyron-ia",
    moduleName: "Kyron IA",
    moduleTag: "IA",
    steps: [
      {
        title: "Tu Asistente Inteligente",
        description: "Kyron IA es tu asistente empresarial impulsado por inteligencia artificial. Consulta sobre contabilidad, fiscal, legal y cualquier tema de tu empresa.",
        icon: Sparkles,
        color: "text-violet-400",
        bg: "bg-violet-400/15",
        border: "border-violet-400/20",
        bullets: [
          "Consultas en lenguaje natural sobre tu empresa",
          "Análisis fiscal con Gaceta Oficial integrada",
          "Generación automática de documentos y reportes",
        ],
      },
      {
        title: "Asistente Fiscal IA",
        description: "El motor fiscal audita tus operaciones contra la normativa vigente en tiempo real. Detecta errores y sugiere correcciones antes de que sean un problema.",
        icon: Bot,
        color: "text-cyan-400",
        bg: "bg-cyan-400/15",
        border: "border-cyan-400/20",
        bullets: [
          "Auditoría automática contra Gaceta Oficial",
          "Detección temprana de errores fiscales",
          "Recomendaciones de optimización tributaria",
        ],
      },
    ],
  },
};
