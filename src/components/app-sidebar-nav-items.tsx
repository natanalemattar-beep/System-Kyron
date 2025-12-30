

import {
  FileText,
  Bell,
  LayoutDashboard,
  Gavel,
  User,
  Heart,
  Shield,
  File,
  Landmark,
  AlertTriangle,
  FileEdit,
  BookOpen,
  Receipt,
  FileSignature,
  Archive,
  Percent,
  CreditCard,
  Cog,
  UserCheck,
  Wine,
  Users,
  Briefcase,
  UserCog,
  TabletSmartphone,
  ClipboardCheck,
  PieChart,
  TrendingUp,
  ShieldQuestion,
  Lightbulb,
  Calendar,
  Building,
  BookUser,
  Timer,
  Moon,
  Sun,
  ShoppingCart,
  UserX,
  Banknote,
  HandCoins,
  Wallet,
  HeartHandshake,
  Megaphone,
  Puzzle,
  Layers,
  BarChart,
  Ship,
  BrainCircuit,
  ShieldCheck,
  RefreshCw,
  Bot,
  Scale,
  Stamp,
  GitBranch,
  FileMinus,
  FilePlus,
  FileScan,
  Swords,
  Rocket,
  Scaling,
  Wand2,
  Orbit,
  AreaChart,
  HelpCircle,
  Package,
  Target,
  SlidersHorizontal,
  CandlestickChart,
  HardHat,
  Search,
  LifeBuoy,
  Instagram,
  UploadCloud,
  Ruler,
  Home,
  Globe,
  KeyRound,
  Monitor,
  LogOut,
  Circle,
  CornerDownLeft,
  XCircle,
  Calculator,
  Mail,
  UserPlus,
  Gift,
  Award,
  Sparkles,
  Paintbrush,
  Plane,
  Signal,
  Network,
  School,
  Presentation,
  Zap,
  Cpu,
  Phone,
  Atom,
} from "lucide-react";


export const naturalNavGroups = [
    {
        title: "Principal",
        icon: LayoutDashboard,
        items: [
            { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
            { href: "/tarjeta-digital", label: "Tarjeta Digital", icon: User },
            { href: "/seguridad", label: "Seguridad", icon: Shield },
            { href: "/notificaciones", label: "Notificaciones", icon: Bell },
        ],
        subGroups: [],
    },
    {
        title: "Trámites Civiles",
        icon: FileText,
        items: [
            { href: "/documentos", label: "Mis Documentos", icon: File },
            { href: "/partidas-nacimiento", label: "Partidas de Nacimiento", icon: Heart },
            { href: "/actas-matrimonio", label: "Actas de Matrimonio", icon: FileText },
            { href: "/documentos-judiciales", label: "Documentos Judiciales", icon: Gavel },
            { href: "/antecedentes-penales", label: "Antecedentes Penales", icon: Shield },
        ],
        subGroups: [],
    },
    {
        title: "Salud",
        icon: HeartHandshake,
        items: [
            { href: "/directorio-medico", label: "Directorio Médico", icon: HeartHandshake },
        ],
        subGroups: [],
    },
    {
        title: "Obligaciones (LOPNNA)",
        icon: Gavel,
        items: [
            { href: "/manutencion", label: "Obligación de Manutención", icon: Gavel },
            { href: "/registro-rif", label: "Registro RIF (Hijos)", icon: FileEdit, isNew: true },
        ],
        subGroups: [],
    }
];

const facturacionGeneralMenuItems = [
    { href: "/(ventas)/facturacion", label: "Centro de Facturación", icon: FileText },
    { href: "/(ventas)/punto-de-venta", label: "Punto de Venta (TPV)", icon: TabletSmartphone },
    { href: "/(ventas)/proformas", label: "Proformas", icon: Receipt },
    { href: "/(ventas)/facturacion-credito", label: "Facturación a Crédito", icon: CreditCard },
    { href: "/(ventas)/modelo-factura", label: "Modelo de Factura", icon: FileText },
    { href: "/(ventas)/modelo-presupuesto", label: "Modelo de Presupuesto", icon: Receipt },
    { href: "/(ventas)/nota-debito", label: "Nota de Débito", icon: FileMinus },
    { href: "/(ventas)/nota-credito", label: "Nota de Crédito", icon: FilePlus },
    { href: "/(ventas)/factura-nota-debito-credito", label: "Factura, Débito y Crédito", icon: HelpCircle },
    { href: "/(main)/data-entry", label: "Entrada de Datos por IA", icon: FileScan },
];

const finanzasContabilidadNavItems = {
  title: "Finanzas y Contabilidad",
  icon: Calculator,
  subGroups: [
    {
      title: "Análisis Financiero",
      icon: BarChart,
      items: [
        { href: "/(ventas)/analisis-ventas", label: "Análisis de Ventas", icon: TrendingUp },
        { href: "/(admin)/analisis-caja", label: "Análisis de Caja", icon: BarChart },
        { href: "/(admin)/analisis-mercado", label: "Análisis de Mercado", icon: BarChart },
        { href: "/(admin)/analisis-riesgo", label: "Análisis de Riesgo", icon: ShieldQuestion },
        { href: "/(admin)/estructura-costos", label: "Estructura de Costos", icon: PieChart },
        { href: "/(main)/analisis-rentabilidad", label: "Análisis de Rentabilidad", icon: TrendingUp },
      ]
    },
    {
      title: "Gestión de Cuentas",
      icon: Wallet,
      items: [
        { href: "/(admin)/cuentas-por-cobrar", label: "Cuentas por Cobrar", icon: Wallet },
        { href: "/(admin)/cuentas-por-pagar", label: "Cuentas por Pagar", icon: HandCoins },
        { href: "/(main)/cuentas-bancarias", label: "Cuentas Bancarias", icon: Landmark },
        { href: "/(main)/creditos", label: "Créditos", icon: CreditCard },
        { href: "/(admin)/pasarelas-pago", label: "Pasarelas de Pago", icon: CreditCard },
      ]
    },
    {
        title: "Contabilidad General",
        icon: BookOpen,
        items: [
            { href: "/(admin)/reports", label: "Reportes Financieros", icon: FileText },
            { href: "/(main)/presupuesto", label: "Presupuesto", icon: PieChart },
            { href: "/(main)/clasificacion-cuentas-contables", label: "Clasificación de Cuentas", icon: Layers },
            { href: "/(main)/clasificacion-facturacion", label: "Clasificación de Facturación", icon: Layers },
            { href: "/(admin)/activos-inmobiliarios", label: "Activos Inmobiliarios", icon: Building },
        ]
    }
  ],
  items: []
};

export const librosContablesNavItems = {
    title: "Libros Oficiales",
    icon: BookOpen,
    subGroups: [
        {
            title: "Libros Contables",
            icon: BookOpen,
            items: [
                { href: "/(main)/libros-contables", label: "Libros Principales", icon: BookOpen },
            ]
        },
        {
            title: "Libros de Registro Fiscal",
            icon: BookOpen,
            items: [
                { href: "/(admin)/libro-compra-venta", label: "Libro de Compras y Ventas", icon: Landmark },
                { href: "/(main)/libro-licores", label: "Libro de Licores", icon: Wine },
            ]
        },
        {
            title: "Libros de Registro Laboral",
            icon: BookOpen,
            items: [
                { href: "/(hr)/libro-nomina", label: "Libro de Nómina", icon: Users },
                { href: "/(hr)/libro-horas-extras", label: "Libro de Horas Extras", icon: Timer },
                { href: "/(hr)/libro-horas-diurnas", label: "Libro de Horas Diurnas", icon: Sun },
                { href: "/(hr)/libro-horario-nocturno", label: "Libro de Horario Nocturno", icon: Moon },
                { href: "/(hr)/libro-vacaciones", label: "Libro de Vacaciones", icon: Plane },
                { href: "/(main)/libro-cesta-ticket", label: "Libro de Cesta Ticket", icon: ShoppingCart },
                { href: "/(hr)/libro-personal-retirado", label: "Libro de Personal Retirado", icon: UserX },
            ]
        }
    ],
    items: []
}

const impuestosCumplimientoNavGroups = {
  title: "Impuestos y Cumplimiento",
  icon: ShieldCheck,
  subGroups: [
    {
      title: "Centro de Cumplimiento",
      icon: ShieldCheck,
      items: [
        { href: "/(main)/zero-risk", label: "Protección Fiscal (0% Riesgo)", icon: Shield },
        { href: "/(main)/homologacion-seniat", label: "Homologación SENIAT", icon: ShieldCheck },
        { href: "/(main)/cumplimiento", label: "Prevención de Sanciones", icon: AlertTriangle },
        { href: "/(legal)/sistema-legal-contable", label: "Sistema Legal y Contable", icon: Scale },
      ]
    },
    {
      title: "Declaraciones y Pagos",
      icon: FileText,
      items: [
        { href: "/(admin)/tramites-fiscales", label: "Centro de Trámites Fiscales", icon: FileText },
        { href: "/(admin)/declaracion-iva", label: "Declaración de IVA", icon: FileText },
        { href: "/(admin)/islr-arc", label: "Declaración Estimada (ISLR)", icon: Banknote },
        { href: "/(admin)/proteccion-pensiones", label: "Protección de Pensiones", icon: Shield },
        { href: "/(admin)/igtf", label: "IGTF y Exoneraciones", icon: Percent },
        { href: "/(admin)/timbres-fiscales", label: "Timbres Fiscales", icon: Stamp },
        { href: "/(admin)/ajuste-por-inflacion", label: "Ajuste por Inflación", icon: TrendingUp },
      ]
    }
  ],
  items: []
};

const rrhhNavGroupsData = {
    title: "Recursos Humanos",
    icon: Briefcase,
    subGroups: [
      {
        title: "Gestión de Personal",
        icon: Users,
        items: [
            { href: "/(hr)/dashboard-rrhh", label: "Dashboard RR.HH.", icon: LayoutDashboard },
            { href: "/(hr)/nominas", label: "Nóminas", icon: Users },
            { href: "/(hr)/modelo-contrato-trabajo", label: "Modelo Contrato de Trabajo", icon: FileSignature },
            { href: "/(hr)/prestaciones-sociales", label: "Prestaciones Sociales", icon: Calculator },
            { href: "/(hr)/resumen-anual-empleados", label: "Resumen Anual de Empleados", icon: BookOpen },
            { href: "/(main)/beneficios-empleados", label: "Beneficios para Empleados", icon: Gift },
            { href: "/(main)/modelos-cartas", label: "Modelos de Cartas", icon: Mail },
            { href: "/(main)/desarrollo-profesional", label: "Desarrollo Profesional", icon: Sparkles },
            { href: "/(hr)/gestion-notificaciones", label: "Gestión de Notificaciones", icon: Bell },
            { href: "/(natural)/carnet-personal", label: "Carnet del Personal", icon: User },
            { href: "/(hr)/material-apoyo", label: "Material de Apoyo", icon: Paintbrush },
            { href: "/(hr)/reclutamiento", label: "Reclutamiento", icon: UserPlus },
            { href: "/(main)/clasificacion-empleados", label: "Clasificación de Empleados", icon: Award },
            { href: "/(main)/analisis-personal", label: "Análisis de Personal", icon: User },
        ]
      },
      {
        title: "Aportes Parafiscales",
        icon: Landmark,
        items: [
          { href: "/(main)/ivss", label: "IVSS y FAOV", icon: Briefcase },
          { href: "/(main)/integraciones", label: "Otros Parafiscales", icon: RefreshCw },
        ]
      }
    ],
    items: []
}

const legalNavGroupsData = { 
    title: "Jurídico y Corporativo", 
    icon: Gavel, 
    subGroups: [
        {
          title: "Gestión Legal",
          icon: Gavel,
          items: [
            { href: "/(legal)/escritorio-juridico", label: "Centro de Mando Legal", icon: Gavel },
            { href: "/(legal)/departamento-juridico", label: "Departamento Jurídico", icon: Gavel },
            { href: "/(legal)/permisos", label: "Trámites y Permisos", icon: UserCheck },
            { href: "/(main)/carta-aval-ingenieria", label: "Carta Aval de Ingeniería", icon: HardHat },
            { href: "/(admin)/autorizaciones", label: "Autorizaciones", icon: ShieldCheck },
            { href: "/(main)/multas", label: "Multas", icon: AlertTriangle },
            { href: "/(main)/compra-venta-inmuebles", label: "Gestión Inmobiliaria", icon: Home },
            { href: "/(legal)/recursos-fiscales", label: "Recursos Fiscales", icon: Scale },
          ]
        },
        {
          title: "Contratos y Documentos",
          icon: FileSignature,
          items: [
            { href: "/(legal)/contratos", label: "Gestión de Contratos", icon: FileSignature },
            { href: "/(main)/licencia-software", label: "Contrato de Licencia", icon: FileSignature },
            { href: "/(main)/cartas-autorizacion", label: "Cartas de Autorización", icon: Mail },
            { href: "/(main)/cartas-seniat", label: "Comunicaciones al SENIAT", icon: Mail },
            { href: "/(telecom)/cartas-conatel", label: "Comunicaciones a CONATEL", icon: Signal },
            { href: "/(hr)/modelo-contrato-trabajo", label: "Contrato de Trabajo", icon: FileSignature },
            { href: "/(main)/modelo-contrato", label: "Contrato de Servicios", icon: FileSignature },
            { href: "/(main)/archivo-digital", label: "Archivo Digital", icon: Archive },
          ]
        },
        {
          title: "Estructura Corporativa",
          icon: Building,
          items: [
            { href: "/(main)/legalizacion-empresa", label: "Legalización Empresa", icon: Stamp },
            { href: "/(main)/poderes-representacion", label: "Poderes y Socios", icon: Gavel },
            { href: "/(admin)/acta-asamblea", label: "Actas y Asambleas", icon: BookOpen },
            { href: "/(main)/tramites-corporativos", label: "Trámites Corporativos", icon: UserCog },
            { href: "/(main)/tipos-empresa", label: "Tipos de Empresa", icon: Building },
            { href: "/(main)/organigrama", label: "Organigrama", icon: Network },
          ]
        }
    ], 
    items: [] 
};

const advisoryNavGroups = { 
    title: "Asesoría y Estrategia", 
    icon: Megaphone, 
    subGroups: [
        {
            title: "Consultoría y Análisis",
            icon: Megaphone,
            items: [
                { href: "/(main)/asesoria", label: "Centro de Asesoría", icon: Megaphone },
                { href: "/(main)/estudio-factibilidad-economica", label: "Estudio de Factibilidad", icon: Bot },
                { href: "/(main)/asesoria-importaciones", label: "Asesoría de Importaciones", icon: Ship },
                { href: "/(main)/asesoria-publicidad", label: "Asesoría de Publicidad", icon: Megaphone },
                { href: "/(main)/asesoria-bolsa-valores", label: "Asesoría de Inversión", icon: CandlestickChart },
                { href: "/(main)/seguros-ia", label: "Asesoría para Seguros (IA)", icon: Shield },
                { href: "/(main)/propuesta-proyecto", label: "Propuesta de Proyecto", icon: FileText },
                { href: "/(main)/carta-exposicion-motivos", label: "Carta de Exposición de Motivos", icon: Lightbulb },
            ]
        },
        {
            title: "Inteligencia de Negocio",
            icon: Lightbulb,
            items: [
                { href: "/(main)/inteligencia-negocio", label: "Inteligencia de Negocio (BI)", icon: Lightbulb },
                { href: "/(main)/analisis-estrategico", label: "Análisis Estratégico", icon: BarChart },
                { href: "/(admin)/analisis-riesgo", label: "Análisis de Riesgo", icon: ShieldQuestion },
                { href: "/(main)/planes-crecimiento", label: "Planes de Crecimiento", icon: Rocket },
                { href: "/(admin)/analisis-mercado", label: "Análisis de Mercado", icon: BarChart },
                { href: "/(main)/nivel-competencia", label: "Nivel de Competencia", icon: Swords },
                { href: "/(main)/analisis-competitivo", label: "Análisis Competitivo", icon: BarChart },
                { href: "/(main)/visualizacion-datos", label: "Visualización de Datos", icon: AreaChart },
                { href: "/(main)/demografia", label: "Demografía", icon: Users },
                { href: "/(main)/analisis-fintech", label: "Análisis FinTech", icon: Banknote },
            ]
        },
         {
            title: "Guías de Negocio",
            icon: BookOpen,
            items: [
                { href: "/(main)/ecosistema-negocio", label: "Ecosistema de Negocio (Kyron)", icon: GitBranch },
                { href: "/(main)/ferias-eventos", label: "Ferias y Eventos", icon: Calendar },
                { href: "/(main)/analisis-empresa-hibrida", label: "Análisis Empresa Híbrida", icon: Layers },
                { href: "/(main)/analisis-empresas-no-digitales", label: "Análisis Empresas No Digitales", icon: SlidersHorizontal },
                { href: "/(main)/contabilidad-escuelas", label: "Contabilidad para Escuelas", icon: School },
                { href: "/(main)/manual-usuario", label: "Manual de Usuario", icon: BookUser },
                { href: "/(main)/marketing-productos-vs-estrategias", label: "Marketing: Producto vs Estrategia", icon: Package },
                { href: "/(main)/marketing-innovador", label: "Marketing Innovador", icon: Zap },
                { href: "/(main)/marketing-ventas", label: "Marketing y Ventas", icon: Megaphone },
                { href: "/(main)/presentacion-startup", label: "Presentación de Startup", icon: Presentation },
            ]
        }
    ],
    items: [] 
};

export const adminNavGroups = [
  { title: "Dashboard", icon: LayoutDashboard, items: [{ href: "/(admin)/dashboard-empresa", label: "Centro de Mando", icon: LayoutDashboard }], subGroups: [] },
  { 
    title: "Ventas y Facturación", 
    icon: ShoppingCart, 
    subGroups: [],
    items: facturacionGeneralMenuItems,
  },
  finanzasContabilidadNavItems,
  impuestosCumplimientoNavGroups,
  rrhhNavGroupsData,
  legalNavGroupsData,
  advisoryNavGroups,
  { title: "General", icon: Cog, items: [
      { href: "/(main)/general", label: "Configuración General", icon: Cog },
      { href: "/(main)/gestion-global", label: "Gestión Global", icon: Globe },
      { href: "/(main)/pago-servicios", label: "Pago de Servicios", icon: CreditCard },
  ], subGroups: [] },
];

export const contabilidadNavGroups = [
    { title: "Dashboard", icon: BookOpen, items: [{ href: "/(admin)/contabilidad", label: "Centro de Contabilidad", icon: BookOpen }], subGroups: [] },
    librosContablesNavItems,
];


export const legalNavGroups = [
  { title: "Dashboard", icon: Gavel, items: [{ href: "/(legal)/escritorio-juridico", label: "Centro de Mando Legal", icon: Gavel }], subGroups: [] },
  { 
    title: "Gestión Legal", 
    icon: Gavel, 
    items: legalNavGroupsData.subGroups.find(sg => sg.title === 'Gestión Legal')?.items || [], 
    subGroups: [] 
  },
  { 
    title: "Contratos y Documentos", 
    icon: FileSignature, 
    items: legalNavGroupsData.subGroups.find(sg => sg.title === 'Contratos y Documentos')?.items || [], 
    subGroups: [] 
  },
  { 
    title: "Estructura Corporativa", 
    icon: Building, 
    items: legalNavGroupsData.subGroups.find(sg => sg.title === 'Estructura Corporativa')?.items || [], 
    subGroups: [] 
  },
];

export const marketingNavGroups = [advisoryNavGroups];

export const rrhhNavGroups = [
    { title: "Dashboard", icon: Briefcase, items: [{ href: "/(hr)/dashboard-rrhh", label: "Dashboard RR.HH.", icon: LayoutDashboard }], subGroups: []},
    ...rrhhNavGroupsData.subGroups.map(group => ({ ...group, items: group.items, subGroups: [] })),
];

export const ventasNavGroups = [
    { title: "Dashboard", icon: LayoutDashboard, items: [{ href: "/(ventas)/analisis-ventas", label: "Análisis de Ventas", icon: LayoutDashboard }], subGroups: []},
    { title: "Ventas y Caja", icon: ShoppingCart, items: [
        { href: "/(ventas)/punto-de-venta", label: "Punto de Venta", icon: TabletSmartphone },
        { href: "/(ventas)/arqueo-caja", label: "Arqueo de Caja", icon: ClipboardCheck },
    ], subGroups: [] },
     { title: "Estrategias", icon: Lightbulb, items: [
        { href: "/(ventas)/estrategias-ventas", label: "Descuentos y Promociones", icon: Lightbulb },
    ], subGroups: [] },
    { title: "Facturación", icon: ShoppingCart, items: [
        { href: "/(ventas)/facturacion", label: "Centro de Facturación", icon: FileText },
        { href: "/(ventas)/proformas", label: "Proformas", icon: Receipt },
        { href: "/(ventas)/facturacion-credito", label: "Facturación a Crédito", icon: CreditCard },
        { href: "/(ventas)/modelo-factura", label: "Modelo de Factura", icon: FileText },
        { href: "/(ventas)/nota-debito", label: "Nota de Débito", icon: FileMinus },
        { href: "/(ventas)/nota-credito", label: "Nota de Crédito", icon: FilePlus },
    ], subGroups: [] },
];

export const sociosNavGroups = [
    { title: "Socios y Holding", icon: Briefcase, items: [
        { href: "/(socios)/dashboard-socios", label: "Dashboard de Socios", icon: LayoutDashboard },
        { href: "/(main)/poderes-representacion", label: "Empresas y Poderes", icon: Gavel },
        { href: "/(main)/organigrama", label: "Organigrama", icon: Network },
        { href: "/(main)/planes-crecimiento", label: "Planes de Crecimiento", icon: Rocket },
    ], subGroups: [] },
    advisoryNavGroups
];

export const telecomNavGroups = [
  { 
    title: "Dashboard", 
    icon: LayoutDashboard, 
    items: [ 
      { href: "/(telecom)/dashboard-telecom", label: "Dashboard Telecom", icon: Signal },
      { href: "/(telecom)/telecom-design-showcase", label: "Design Showcase", icon: Paintbrush },
    ], 
    subGroups: [] 
  },
  { 
    title: "Gestión CONATEL",
    icon: Gavel,
    items: [],
    subGroups: [
        {
            title: "Trámites y Cumplimiento",
            icon: Gavel,
            items: [
                { href: "/(telecom)/conatel/licenses", label: "Mis Licencias", icon: FileText },
                { href: "/(telecom)/conatel/alerts", label: "Alertas y Multas", icon: AlertTriangle },
                { href: "/(telecom)/conatel/documents", label: "Documentos", icon: Archive },
            ]
        }
    ]
  },
  { 
    title: "Operaciones", 
    icon: Signal, 
    items: [ 
      { href: "/(telecom)/venta-linea", label: "Venta de Líneas", icon: Phone },
    ], 
    subGroups: [] 
  },
];

export const seguridadNavGroups = [
  { title: "Seguridad", icon: Shield, items: [ { href: "/(main)/seguridad", label: "Gestión de Accesos", icon: ShieldCheck } ], subGroups: [] },
];

export const informaticaNavGroups = [
  { title: "Dashboard", icon: LayoutDashboard, items: [ { href: "/(main)/dashboard-informatica", label: "Dashboard de IT", icon: LayoutDashboard } ], subGroups: [] },
  { title: "Soluciones IA", icon: BrainCircuit, items: [ 
      { href: "/(main)/soluciones-ia", label: "Soluciones con IA", icon: BrainCircuit },
      { href: "/(main)/analisis-suelo-foto", label: "Análisis de Suelo (IA)", icon: Search },
   ], subGroups: [] },
  { title: "Arquitectura", icon: Puzzle, items: [ 
      { href: "/(main)/arquitectura-software-contable", label: "Arquitectura de Software", icon: Puzzle },
      { href: "/(main)/facturacion-futurista", label: "UI/UX Futurista", icon: Wand2 },
      { href: "/(main)/facturacion-internacional", label: "Facturación Internacional", icon: Globe },
  ], subGroups: [] },
  { title: "Ingeniería y Proyectos", icon: HardHat, items: [
      { href: "/(main)/ingenieria-ia", label: "Sistema de Ingeniería (IA)", icon: Cpu },
  ], subGroups: [] },
];
