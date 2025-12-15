
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
    { href: "/facturacion", label: "Centro de Facturación", icon: FileText },
    { href: "/punto-de-venta", label: "Punto de Venta (TPV)", icon: TabletSmartphone },
    { href: "/proformas", label: "Proformas", icon: Receipt },
    { href: "/facturacion-credito", label: "Facturación a Crédito", icon: CreditCard },
    { href: "/modelo-factura", label: "Modelo de Factura", icon: FileText },
    { href: "/modelo-presupuesto", label: "Modelo de Presupuesto", icon: Receipt },
    { href: "/nota-debito", label: "Nota de Débito", icon: FileMinus },
    { href: "/nota-credito", label: "Nota de Crédito", icon: FilePlus },
    { href: "/factura-nota-debito-credito", label: "Factura, Débito y Crédito", icon: HelpCircle },
    { href: "/data-entry", label: "Entrada de Datos por IA", icon: FileScan },
];

const finanzasContabilidadNavGroups = {
  title: "Finanzas y Contabilidad",
  icon: BookOpen,
  subGroups: [
    {
      title: "Reportes Clave",
      icon: BarChart,
      items: [
        { href: "/contabilidad/reports", label: "Reportes Financieros", icon: BarChart },
        { href: "/legal/memoria-anual", label: "Memoria Anual", icon: BookOpen },
        { href: "/contabilidad/analisis-rentabilidad", label: "Análisis de Rentabilidad", icon: TrendingUp },
        { href: "/contabilidad/estructura-costos", label: "Estructura de Costos", icon: PieChart },
        { href: "/contabilidad/clasificacion-cuentas-contables", label: "Clasificación de Cuentas", icon: BookOpen },
      ],
    },
    {
      title: "Gestión de Cuentas",
      icon: Wallet,
      items: [
        { href: "/contabilidad/cuentas-bancarias", label: "Cuentas Bancarias", icon: Landmark },
        { href: "/contabilidad/cuentas-por-cobrar", label: "Cuentas por Cobrar", icon: Wallet },
        { href: "/contabilidad/cuentas-por-pagar", label: "Cuentas por Pagar", icon: HandCoins },
        { href: "/contabilidad/billetera-cambio", label: "Billetera de Cambio", icon: Wallet },
        { href: "/contabilidad/pago-servicios", label: "Pago de Servicios", icon: CreditCard },
      ],
    },
    {
      title: "Libros Oficiales y Auxiliares",
      icon: BookOpen,
      items: [
        { href: "/contabilidad/libros-contables", label: "Libros Contables Principales", icon: BookOpen },
        { href: "/contabilidad/libro-compra-venta", label: "Libro de Compras y Ventas", icon: Landmark },
        { href: "/contabilidad/libro-licores", label: "Libro de Licores", icon: Wine },
      ],
    },
     {
      title: "Activos",
      icon: Building,
      items: [
        { href: "/ventas/inventario", label: "Inventario", icon: Archive },
        { href: "/contabilidad/activos-inmobiliarios", label: "Activos Inmobiliarios", icon: Building },
      ]
    },
  ],
  items: [],
};

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
        { href: "/legal/cumplimiento", label: "Prevención de Sanciones", icon: AlertTriangle },
        { href: "/legal/sistema-legal-contable", label: "Sistema Legal y Contable", icon: Scale },
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
            { href: "/hr/dashboard-rrhh", label: "Dashboard RR.HH.", icon: LayoutDashboard },
            { href: "/hr/nominas", label: "Nóminas", icon: Users },
            { href: "/hr/modelo-contrato-trabajo", label: "Modelo Contrato de Trabajo", icon: FileSignature },
            { href: "/hr/prestaciones-sociales", label: "Prestaciones Sociales", icon: Calculator },
            { href: "/hr/resumen-anual-empleados", label: "Resumen Anual de Empleados", icon: BookOpen },
            { href: "/hr/beneficios-empleados", label: "Beneficios para Empleados", icon: Gift },
            { href: "/hr/modelos-cartas", label: "Modelos de Cartas", icon: Mail },
            { href: "/hr/desarrollo-profesional", label: "Desarrollo Profesional", icon: Sparkles },
            { href: "/hr/gestion-notificaciones", label: "Gestión de Notificaciones", icon: Bell },
            { href: "/hr/carnet-personal", label: "Carnet del Personal", icon: User },
            { href: "/hr/material-apoyo", label: "Material de Apoyo", icon: Paintbrush },
            { href: "/hr/reclutamiento", label: "Reclutamiento", icon: UserPlus },
            { href: "/hr/clasificacion-empleados", label: "Clasificación de Empleados", icon: Award },
        ]
      },
      {
        title: "Aportes Parafiscales",
        icon: Landmark,
        items: [
          { href: "/hr/ivss", label: "IVSS y FAOV", icon: Briefcase },
          { href: "/hr/integraciones", label: "Otros Parafiscales", icon: RefreshCw },
        ]
      },
      {
        title: "Libros de Registro",
        icon: BookOpen,
        items: [
            { href: "/hr/libro-nomina", label: "Libro de Nómina", icon: Users },
            { href: "/hr/libro-horas-extras", label: "Libro de Horas Extras", icon: Timer },
            { href: "/hr/libro-horas-diurnas", label: "Libro de Horas Diurnas", icon: Sun },
            { href: "/hr/libro-horario-nocturno", label: "Libro de Horario Nocturno", icon: Moon },
            { href: "/hr/libro-vacaciones", label: "Libro de Vacaciones", icon: Plane },
            { href: "/hr/libro-cesta-ticket", label: "Libro de Cesta Ticket", icon: ShoppingCart },
            { href: "/hr/libro-personal-retirado", label: "Libro de Personal Retirado", icon: UserX },
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
            { href: "/legal/escritorio-juridico", label: "Dashboard Jurídico", icon: Gavel },
            { href: "/legal/departamento-juridico", label: "Departamento Jurídico", icon: Gavel },
            { href: "/legal/permisos", label: "Trámites y Permisos", icon: UserCheck },
            { href: "/legal/autorizaciones", label: "Autorizaciones", icon: ShieldCheck },
            { href: "/legal/multas", label: "Multas", icon: AlertTriangle },
            { href: "/legal/compra-venta-inmuebles", label: "Gestión Inmobiliaria", icon: Home },
            { href: "/legal/recursos-fiscales", label: "Recursos Fiscales", icon: Scale },
          ]
        },
        {
          title: "Contratos y Documentos",
          icon: FileSignature,
          items: [
            { href: "/legal/contratos", label: "Gestión de Contratos", icon: FileSignature },
            { href: "/legal/licencia-software", label: "Contrato de Licencia", icon: FileSignature },
            { href: "/legal/cartas-autorizacion", label: "Cartas de Autorización", icon: Mail },
            { href: "/legal/cartas-seniat", label: "Comunicaciones al SENIAT", icon: Mail },
            { href: "/legal/cartas-conatel", label: "Comunicaciones a CONATEL", icon: Signal },
            { href: "/hr/modelo-contrato-trabajo", label: "Contrato de Trabajo", icon: FileSignature },
            { href: "/legal/modelo-contrato", label: "Contrato de Servicios", icon: FileSignature },
            { href: "/legal/archivo-digital", label: "Archivo Digital", icon: Archive },
          ]
        },
        {
          title: "Estructura Corporativa",
          icon: Building,
          items: [
            { href: "/legal/legalizacion-empresa", label: "Legalización Empresa", icon: Stamp },
            { href: "/legal/poderes-representacion", label: "Poderes y Socios", icon: Gavel },
            { href: "/legal/acta-asamblea", label: "Actas y Asambleas", icon: BookOpen },
            { href: "/legal/tramites-corporativos", label: "Trámites Corporativos", icon: UserCog },
            { href: "/legal/tipos-empresa", label: "Tipos de Empresa", icon: Building },
            { href: "/legal/organigrama", label: "Organigrama", icon: Network },
          ]
        }
    ], 
    items: []
};


export const advisoryNavGroups = { 
    title: "Asesoría y Estrategia", 
    icon: Megaphone, 
    subGroups: [
        {
            title: "Consultoría y Análisis",
            icon: Megaphone,
            items: [
                { href: "/main/asesoria", label: "Centro de Asesoría", icon: Megaphone },
                { href: "/main/estudio-factibilidad-economica", label: "Estudio de Factibilidad", icon: Bot },
                { href: "/main/asesoria-importaciones", label: "Asesoría de Importaciones", icon: Ship },
                { href: "/main/asesoria-publicidad", label: "Asesoría de Publicidad", icon: Megaphone },
                { href: "/main/asesoria-bolsa-valores", label: "Asesoría de Inversión", icon: CandlestickChart },
                { href: "/main/propuesta-proyecto", label: "Propuesta de Proyecto", icon: FileText },
                { href: "/main/carta-exposicion-motivos", label: "Carta de Exposición de Motivos", icon: Lightbulb },
            ]
        },
        {
            title: "Inteligencia de Negocio",
            icon: Lightbulb,
            items: [
                { href: "/main/analisis-estrategico", label: "Análisis Estratégico", icon: BarChart },
                { href: "/admin/analisis-riesgo", label: "Análisis de Riesgo", icon: ShieldQuestion },
                { href: "/main/planes-crecimiento", label: "Planes de Crecimiento", icon: Rocket },
                { href: "/admin/analisis-mercado", label: "Análisis de Mercado", icon: BarChart },
                { href: "/main/nivel-competencia", label: "Nivel de Competencia", icon: Swords },
                { href: "/main/analisis-competitivo", label: "Análisis Competitivo", icon: BarChart },
                { href: "/main/visualizacion-datos", label: "Visualización de Datos", icon: AreaChart },
                { href: "/main/demografia", label: "Demografía", icon: Users },
                { href: "/main/ecosistema-negocio", label: "Modelo de Negocio", icon: GitBranch },
            ]
        },
         {
            title: "Guías de Negocio",
            icon: BookOpen,
            items: [
                { href: "/main/analisis-empresa-hibrida", label: "Análisis Empresa Híbrida", icon: Layers },
                { href: "/main/analisis-empresas-no-digitales", label: "Análisis Empresas No Digitales", icon: SlidersHorizontal },
                { href: "/main/contabilidad-escuelas", label: "Contabilidad para Escuelas", icon: School },
                { href: "/main/manual-usuario", label: "Manual de Usuario", icon: BookUser },
                { href: "/main/marketing-productos-vs-estrategias", label: "Marketing: Producto vs Estrategia", icon: Package },
                { href: "/main/marketing-innovador", label: "Marketing Innovador", icon: Zap },
                { href: "/main/marketing-ventas", label: "Marketing y Ventas", icon: Megaphone },
                { href: "/main/presentacion-startup", label: "Presentación de Startup", icon: Presentation },
            ]
        }
    ],
    items: [] 
};

export const adminNavGroups = [
  { title: "Dashboard", icon: LayoutDashboard, items: [{ href: "/dashboard-empresa", label: "Centro de Mando", icon: LayoutDashboard }], subGroups: [] },
  finanzasContabilidadNavGroups,
  { title: "Facturación", icon: ShoppingCart, items: facturacionGeneralMenuItems.map(item => ({...item, href: `/ventas${item.href.replace('(ventas)', '')}`})), subGroups: [] },
  impuestosCumplimientoNavGroups,
  rrhhNavGroupsData,
  legalNavGroupsData,
  advisoryNavGroups
];

export const contabilidadNavGroups = [
  { title: "Dashboard", icon: BookOpen, items: [{ href: "/contabilidad", label: "Centro de Contabilidad", icon: BookOpen }], subGroups: [] },
  finanzasContabilidadNavGroups,
  { title: "Facturación", icon: ShoppingCart, items: [
      { href: "/ventas/facturacion-credito", label: "Facturación a Crédito", icon: CreditCard },
      { href: "/ventas/proformas", label: "Proformas", icon: Receipt },
    ], subGroups: [] },
  impuestosCumplimientoNavGroups,
];

export const legalNavGroups = [
  { title: "Dashboard", icon: Gavel, items: [{ href: "/legal/escritorio-juridico", label: "Dashboard Jurídico", icon: Gavel }], subGroups: [] },
  legalNavGroupsData,
  advisoryNavGroups
];

export const marketingNavGroups = [advisoryNavGroups];

export const rrhhNavGroups = [
    {
        title: "Recursos Humanos",
        icon: Briefcase,
        items: rrhhNavGroupsData.subGroups.flatMap(sg => sg.items),
        subGroups: []
    }
];

export const ventasNavGroups = [
    { title: "Dashboard", icon: LayoutDashboard, items: [{ href: "/analisis-ventas", label: "Análisis de Ventas", icon: LayoutDashboard }], subGroups: []},
    { title: "Ventas y Caja", icon: ShoppingCart, items: [
        { href: "/punto-de-venta", label: "Punto de Venta", icon: TabletSmartphone },
        { href: "/arqueo-caja", label: "Arqueo de Caja", icon: ClipboardCheck },
    ], subGroups: [] },
     { title: "Estrategias", icon: Lightbulb, items: [
        { href: "/estrategias-ventas", label: "Descuentos y Promociones", icon: Lightbulb },
    ], subGroups: [] },
    { title: "Facturación", icon: ShoppingCart, items: facturacionGeneralMenuItems.map(item => ({...item, href: `/ventas${item.href.replace('/(ventas)', '')}`})), subGroups: [] },
];

export const sociosNavGroups = [
    { title: "Socios y Holding", icon: Briefcase, items: [
        { href: "/dashboard-socios", label: "Dashboard de Socios", icon: LayoutDashboard },
        { href: "/legal/poderes-representacion", label: "Empresas y Poderes", icon: Gavel },
        { href: "/legal/organigrama", label: "Organigrama", icon: Network },
        { href: "/main/planes-crecimiento", label: "Planes de Crecimiento", icon: Rocket },
    ], subGroups: [] },
    advisoryNavGroups
];

export const telecomNavGroups = [
  { title: "Dashboard", icon: LayoutDashboard, items: [ 
      { href: "/dashboard-telecom", label: "Dashboard Telecom", icon: Signal },
      { href: "/venta-linea", label: "Venta de Líneas", icon: Phone },
    ], subGroups: [] },
];

export const seguridadNavGroups = [
  { title: "Seguridad", icon: Shield, items: [ { href: "/seguridad", label: "Gestión de Accesos", icon: ShieldCheck } ], subGroups: [] },
];

export const informaticaNavGroups = [
  { title: "Dashboard", icon: LayoutDashboard, items: [ { href: "/dashboard-informatica", label: "Dashboard de IT", icon: LayoutDashboard } ], subGroups: [] },
  { title: "Soluciones IA", icon: BrainCircuit, items: [ 
      { href: "/soluciones-ia", label: "Soluciones con IA", icon: BrainCircuit },
      { href: "/analisis-suelo-foto", label: "Análisis de Suelo (IA)", icon: Search },
   ], subGroups: [] },
  { title: "Arquitectura", icon: Puzzle, items: [ 
      { href: "/arquitectura-software-contable", label: "Arquitectura de Software", icon: Puzzle },
      { href: "/facturacion-futurista", label: "UI/UX Futurista", icon: Wand2 },
      { href: "/facturacion-internacional", label: "Facturación Internacional", icon: Globe },
  ], subGroups: [] },
  { title: "Ingeniería y Proyectos", icon: HardHat, items: [
      { href: "/ingenieria-ia", label: "Sistema de Ingeniería (IA)", icon: Cpu },
  ], subGroups: [] },
];
