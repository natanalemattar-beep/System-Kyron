
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


export const naturalMenuItems = [
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
    { href: "/admin/facturacion", label: "Centro de Facturación", icon: FileText },
    { href: "/admin/punto-de-venta", label: "Punto de Venta (TPV)", icon: TabletSmartphone },
    { href: "/admin/proformas", label: "Proformas", icon: Receipt },
    { href: "/admin/facturacion-credito", label: "Facturación a Crédito", icon: CreditCard },
    { href: "/admin/modelo-factura", label: "Modelo de Factura", icon: FileText },
    { href: "/admin/modelo-presupuesto", label: "Modelo de Presupuesto", icon: Receipt },
    { href: "/admin/nota-debito", label: "Nota de Débito", icon: FileMinus },
    { href: "/admin/nota-credito", label: "Nota de Crédito", icon: FilePlus },
    { href: "/admin/factura-nota-debito-credito", label: "Factura, Débito y Crédito", icon: HelpCircle },
    { href: "/admin/data-entry", label: "Entrada de Datos por IA", icon: FileScan },
];

const finanzasContabilidadNavItems = [
    {
      title: "Análisis Financiero",
      icon: BarChart,
      items: [
        { href: "/admin/analisis-ventas", label: "Análisis de Ventas", icon: TrendingUp },
        { href: "/admin/analisis-caja", label: "Análisis de Caja", icon: BarChart },
        { href: "/admin/analisis-mercado", label: "Análisis de Mercado", icon: BarChart },
        { href: "/admin/analisis-riesgo", label: "Análisis de Riesgo", icon: ShieldQuestion },
        { href: "/admin/estructura-costos", label: "Estructura de Costos", icon: PieChart },
        { href: "/admin/analisis-rentabilidad", label: "Análisis de Rentabilidad", icon: TrendingUp },
      ]
    },
    {
      title: "Gestión de Cuentas",
      icon: Wallet,
      items: [
        { href: "/admin/cuentas-por-cobrar", label: "Cuentas por Cobrar", icon: Wallet },
        { href: "/admin/cuentas-por-pagar", label: "Cuentas por Pagar", icon: HandCoins },
        { href: "/admin/cuentas-bancarias", label: "Cuentas Bancarias", icon: Landmark },
        { href: "/admin/creditos", label: "Créditos", icon: CreditCard },
      ]
    },
    {
        title: "Contabilidad General",
        icon: BookOpen,
        items: [
            { href: "/admin/libros-contables", label: "Libros Contables", icon: BookOpen },
            { href: "/admin/reports", label: "Reportes Financieros", icon: FileText },
            { href: "/admin/presupuesto", label: "Presupuesto", icon: PieChart },
            { href: "/admin/clasificacion-cuentas-contables", label: "Clasificación de Cuentas", icon: Layers },
            { href: "/admin/clasificacion-facturacion", label: "Clasificación de Facturación", icon: Layers },
            { href: "/admin/activos-inmobiliarios", label: "Activos Inmobiliarios", icon: Building },
        ]
    }
  ];

const impuestosCumplimientoNavGroups = {
  title: "Impuestos y Cumplimiento",
  icon: ShieldCheck,
  subGroups: [
    {
      title: "Centro de Cumplimiento",
      icon: ShieldCheck,
      items: [
        { href: "/admin/zero-risk", label: "Protección Fiscal (0% Riesgo)", icon: Shield },
        { href: "/admin/homologacion-seniat", label: "Homologación SENIAT", icon: ShieldCheck },
        { href: "/admin/cumplimiento", label: "Prevención de Sanciones", icon: AlertTriangle },
        { href: "/admin/sistema-legal-contable", label: "Sistema Legal y Contable", icon: Scale },
      ]
    },
    {
      title: "Declaraciones y Pagos",
      icon: FileText,
      items: [
        { href: "/admin/tramites-fiscales", label: "Centro de Trámites Fiscales", icon: FileText },
        { href: "/admin/declaracion-iva", label: "Declaración de IVA", icon: FileText },
        { href: "/admin/islr-arc", label: "Declaración Estimada (ISLR)", icon: Banknote },
        { href: "/admin/proteccion-pensiones", label: "Protección de Pensiones", icon: Shield },
        { href: "/admin/igtf", label: "IGTF y Exoneraciones", icon: Percent },
        { href: "/admin/timbres-fiscales", label: "Timbres Fiscales", icon: Stamp },
        { href: "/admin/ajuste-por-inflacion", label: "Ajuste por Inflación", icon: TrendingUp },
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
            { href: "/admin/dashboard-rrhh", label: "Dashboard RR.HH.", icon: LayoutDashboard },
            { href: "/admin/nominas", label: "Nóminas", icon: Users },
            { href: "/admin/modelo-contrato-trabajo", label: "Modelo Contrato de Trabajo", icon: FileSignature },
            { href: "/admin/prestaciones-sociales", label: "Prestaciones Sociales", icon: Calculator },
            { href: "/admin/resumen-anual-empleados", label: "Resumen Anual de Empleados", icon: BookOpen },
            { href: "/admin/beneficios-empleados", label: "Beneficios para Empleados", icon: Gift },
            { href: "/admin/modelos-cartas", label: "Modelos de Cartas", icon: Mail },
            { href: "/admin/desarrollo-profesional", label: "Desarrollo Profesional", icon: Sparkles },
            { href: "/admin/gestion-notificaciones", label: "Gestión de Notificaciones", icon: Bell },
            { href: "/admin/carnet-personal", label: "Carnet del Personal", icon: User },
            { href: "/admin/material-apoyo", label: "Material de Apoyo", icon: Paintbrush },
            { href: "/admin/reclutamiento", label: "Reclutamiento", icon: UserPlus },
            { href: "/admin/clasificacion-empleados", label: "Clasificación de Empleados", icon: Award },
        ]
      },
      {
        title: "Aportes Parafiscales",
        icon: Landmark,
        items: [
          { href: "/admin/ivss", label: "IVSS y FAOV", icon: Briefcase },
          { href: "/admin/integraciones", label: "Otros Parafiscales", icon: RefreshCw },
        ]
      },
      {
        title: "Libros de Registro",
        icon: BookOpen,
        items: [
            { href: "/admin/libro-nomina", label: "Libro de Nómina", icon: Users },
            { href: "/admin/libro-horas-extras", label: "Libro de Horas Extras", icon: Timer },
            { href: "/admin/libro-horas-diurnas", label: "Libro de Horas Diurnas", icon: Sun },
            { href: "/admin/libro-horario-nocturno", label: "Libro de Horario Nocturno", icon: Moon },
            { href: "/admin/libro-vacaciones", label: "Libro de Vacaciones", icon: Plane },
            { href: "/admin/libro-cesta-ticket", label: "Libro de Cesta Ticket", icon: ShoppingCart },
            { href: "/admin/libro-personal-retirado", label: "Libro de Personal Retirado", icon: UserX },
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
            { href: "/admin/dashboard-juridico", label: "Dashboard Jurídico", icon: Gavel },
            { href: "/admin/departamento-juridico", label: "Departamento Jurídico", icon: Gavel },
            { href: "/admin/permisos", label: "Trámites y Permisos", icon: UserCheck },
            { href: "/admin/carta-aval-ingenieria", label: "Carta Aval de Ingeniería", icon: HardHat },
            { href: "/admin/autorizaciones", label: "Autorizaciones", icon: ShieldCheck },
            { href: "/admin/multas", label: "Multas", icon: AlertTriangle },
            { href: "/admin/compra-venta-inmuebles", label: "Gestión Inmobiliaria", icon: Home },
            { href: "/admin/recursos-fiscales", label: "Recursos Fiscales", icon: Scale },
          ]
        },
        {
          title: "Contratos y Documentos",
          icon: FileSignature,
          items: [
            { href: "/admin/contratos", label: "Gestión de Contratos", icon: FileSignature },
            { href: "/admin/licencia-software", label: "Contrato de Licencia", icon: FileSignature },
            { href: "/admin/cartas-autorizacion", label: "Cartas de Autorización", icon: Mail },
            { href: "/admin/cartas-seniat", label: "Comunicaciones al SENIAT", icon: Mail },
            { href: "/admin/cartas-conatel", label: "Comunicaciones a CONATEL", icon: Signal },
            { href: "/admin/modelo-contrato-trabajo", label: "Contrato de Trabajo", icon: FileSignature },
            { href: "/admin/modelo-contrato", label: "Contrato de Servicios", icon: FileSignature },
            { href: "/admin/archivo-digital", label: "Archivo Digital", icon: Archive },
          ]
        },
        {
          title: "Estructura Corporativa",
          icon: Building,
          items: [
            { href: "/admin/legalizacion-empresa", label: "Legalización Empresa", icon: Stamp },
            { href: "/admin/poderes-representacion", label: "Poderes y Socios", icon: Gavel },
            { href: "/admin/acta-asamblea", label: "Actas y Asambleas", icon: BookOpen },
            { href: "/admin/tramites-corporativos", label: "Trámites Corporativos", icon: UserCog },
            { href: "/admin/tipos-empresa", label: "Tipos de Empresa", icon: Building },
            { href: "/admin/organigrama", label: "Organigrama", icon: Network },
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
                { href: "/admin/asesoria", label: "Centro de Asesoría", icon: Megaphone },
                { href: "/admin/estudio-factibilidad-economica", label: "Estudio de Factibilidad", icon: Bot },
                { href: "/admin/asesoria-importaciones", label: "Asesoría de Importaciones", icon: Ship },
                { href: "/admin/asesoria-publicidad", label: "Asesoría de Publicidad", icon: Megaphone },
                { href: "/admin/asesoria-bolsa-valores", label: "Asesoría de Inversión", icon: CandlestickChart },
                { href: "/admin/seguros-ia", label: "Asesoría para Seguros (IA)", icon: Shield },
                { href: "/admin/propuesta-proyecto", label: "Propuesta de Proyecto", icon: FileText },
                { href: "/admin/carta-exposicion-motivos", label: "Carta de Exposición de Motivos", icon: Lightbulb },
            ]
        },
        {
            title: "Inteligencia de Negocio",
            icon: Lightbulb,
            items: [
                { href: "/admin/inteligencia-negocio", label: "Inteligencia de Negocio (BI)", icon: Lightbulb },
                { href: "/admin/analisis-estrategico", label: "Análisis Estratégico", icon: BarChart },
                { href: "/admin/analisis-riesgo", label: "Análisis de Riesgo", icon: ShieldQuestion },
                { href: "/admin/planes-crecimiento", label: "Planes de Crecimiento", icon: Rocket },
                { href: "/admin/analisis-mercado", label: "Análisis de Mercado", icon: BarChart },
                { href: "/admin/nivel-competencia", label: "Nivel de Competencia", icon: Swords },
                { href: "/admin/analisis-competitivo", label: "Análisis Competitivo", icon: BarChart },
                { href: "/admin/visualizacion-datos", label: "Visualización de Datos", icon: AreaChart },
                { href: "/admin/demografia", label: "Demografía", icon: Users },
            ]
        },
         {
            title: "Guías de Negocio",
            icon: BookOpen,
            items: [
                { href: "/admin/ecosistema-negocio", label: "Ecosistema de Negocio (Kyron)", icon: GitBranch },
                { href: "/admin/ferias-eventos", label: "Ferias y Eventos", icon: Calendar },
                { href: "/admin/analisis-empresa-hibrida", label: "Análisis Empresa Híbrida", icon: Layers },
                { href: "/admin/analisis-empresas-no-digitales", label: "Análisis Empresas No Digitales", icon: SlidersHorizontal },
                { href: "/admin/contabilidad-escuelas", label: "Contabilidad para Escuelas", icon: School },
                { href: "/admin/manual-usuario", label: "Manual de Usuario", icon: BookUser },
                { href: "/admin/marketing-productos-vs-estrategias", label: "Marketing: Producto vs Estrategia", icon: Package },
                { href: "/admin/marketing-innovador", label: "Marketing Innovador", icon: Zap },
                { href: "/admin/marketing-ventas", label: "Marketing y Ventas", icon: Megaphone },
                { href: "/admin/presentacion-startup", label: "Presentación de Startup", icon: Presentation },
            ]
        }
    ],
    items: [] 
};

export const adminNavGroups = [
  { title: "Dashboard", icon: LayoutDashboard, items: [{ href: "/admin/dashboard-empresa", label: "Centro de Mando", icon: LayoutDashboard }], subGroups: [] },
  { title: "Facturación", icon: ShoppingCart, items: facturacionGeneralMenuItems, subGroups: [] },
  { title: "Finanzas y Contabilidad", icon: Banknote, subGroups: finanzasContabilidadNavItems, items:[] },
  impuestosCumplimientoNavGroups,
  rrhhNavGroupsData,
  legalNavGroupsData,
  advisoryNavGroups
];

export const contabilidadNavGroups = [
    { title: "Dashboard", icon: BookOpen, items: [{ href: "/admin/contabilidad", label: "Centro de Contabilidad", icon: BookOpen }], subGroups: [] },
    ...finanzasContabilidadNavItems.map(group => ({ ...group, subGroups: [] })),
];

export const legalNavGroups = [
  { title: "Dashboard", icon: Gavel, items: [{ href: "/admin/dashboard-juridico", label: "Dashboard Jurídico", icon: Gavel }], subGroups: [] },
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
    { title: "Dashboard", icon: Briefcase, items: [{ href: "/admin/dashboard-rrhh", label: "Dashboard RR.HH.", icon: LayoutDashboard }], subGroups: []},
    ...rrhhNavGroupsData.subGroups.map(group => ({ ...group, items: group.items, subGroups: [] })),
];

export const ventasNavGroups = [
    { title: "Dashboard", icon: LayoutDashboard, items: [{ href: "/admin/analisis-ventas", label: "Análisis de Ventas", icon: LayoutDashboard }], subGroups: []},
    { title: "Ventas y Caja", icon: ShoppingCart, items: [
        { href: "/admin/punto-de-venta", label: "Punto de Venta", icon: TabletSmartphone },
        { href: "/admin/arqueo-caja", label: "Arqueo de Caja", icon: ClipboardCheck },
    ], subGroups: [] },
     { title: "Estrategias", icon: Lightbulb, items: [
        { href: "/admin/estrategias-ventas", label: "Descuentos y Promociones", icon: Lightbulb },
    ], subGroups: [] },
    { title: "Facturación", icon: ShoppingCart, items: facturacionGeneralMenuItems, subGroups: [] },
];

export const sociosNavGroups = [
    { title: "Socios y Holding", icon: Briefcase, items: [
        { href: "/admin/dashboard-socios", label: "Dashboard de Socios", icon: LayoutDashboard },
        { href: "/admin/poderes-representacion", label: "Empresas y Poderes", icon: Gavel },
        { href: "/admin/organigrama", label: "Organigrama", icon: Network },
        { href: "/admin/planes-crecimiento", label: "Planes de Crecimiento", icon: Rocket },
    ], subGroups: [] },
    advisoryNavGroups
];

export const telecomNavGroups = [
  { title: "Dashboard", icon: LayoutDashboard, items: [ 
      { href: "/admin/dashboard-telecom", label: "Dashboard Telecom", icon: Signal },
      { href: "/admin/venta-linea", label: "Venta de Líneas", icon: Phone },
    ], subGroups: [] },
];

export const seguridadNavGroups = [
  { title: "Seguridad", icon: Shield, items: [ { href: "/admin/seguridad", label: "Gestión de Accesos", icon: ShieldCheck } ], subGroups: [] },
];

export const informaticaNavGroups = [
  { title: "Dashboard", icon: LayoutDashboard, items: [ { href: "/admin/dashboard-informatica", label: "Dashboard de IT", icon: LayoutDashboard } ], subGroups: [] },
  { title: "Soluciones IA", icon: BrainCircuit, items: [ 
      { href: "/admin/soluciones-ia", label: "Soluciones con IA", icon: BrainCircuit },
      { href: "/admin/analisis-suelo-foto", label: "Análisis de Suelo (IA)", icon: Search },
   ], subGroups: [] },
  { title: "Arquitectura", icon: Puzzle, items: [ 
      { href: "/admin/arquitectura-software-contable", label: "Arquitectura de Software", icon: Puzzle },
      { href: "/admin/facturacion-futurista", label: "UI/UX Futurista", icon: Wand2 },
      { href: "/admin/facturacion-internacional", label: "Facturación Internacional", icon: Globe },
  ], subGroups: [] },
  { title: "Ingeniería y Proyectos", icon: HardHat, items: [
      { href: "/admin/ingenieria-ia", label: "Sistema de Ingeniería (IA)", icon: Cpu },
  ], subGroups: [] },
];
