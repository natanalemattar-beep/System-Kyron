
import {
  FileText,
  Bell,
  LayoutDashboard,
  Gavel,
  User,
  Heart,
  Shield,
  File,
  FileEdit,
  Receipt,
  FileSignature,
  CreditCard,
  UserCheck,
  Users,
  Briefcase,
  TabletSmartphone,
  PieChart,
  TrendingUp,
  ShoppingCart,
  Banknote,
  Calculator,
  UserPlus,
  Smartphone,
  Phone,
  Recycle,
  Coins,
  Home,
  ShieldCheck,
  Cpu,
  Signal,
  LayoutGrid,
  Lock,
  Wand2,
  Activity,
  Leaf,
  Wallet,
  Landmark,
  BarChart3,
  Scale,
  History,
  Percent,
  BookOpen,
  Calendar,
  Building2,
  Bot,
  Stethoscope,
  BookMarked,
  LifeBuoy,
  UserCog,
  FolderArchive,
  Star,
  Zap
} from "lucide-react";

export const naturalNavGroups = [
    {
        title: "Identidad",
        icon: User,
        items: [
            { href: "/dashboard", label: "Panel Central", icon: Home },
            { href: "/tarjeta-digital", label: "ID Digital 3D", icon: User },
            { href: "/perfil", label: "Datos Maestros", icon: UserCog },
            { href: "/seguridad", label: "Privacidad", icon: ShieldCheck },
        ],
    },
    {
        title: "Documentos",
        icon: FolderArchive,
        items: [
            { href: "/documentos", label: "Bóveda Civil", icon: Lock },
            { href: "/cuenta-personal/certificados-ingreso", label: "Cert. Ingresos", icon: Banknote },
            { href: "/antecedentes-penales", label: "Antecedentes", icon: Gavel },
            { href: "/registro-rif", label: "RIF Familiar", icon: FileEdit },
        ],
    },
    {
        title: "Salud y Bienestar",
        icon: Stethoscope,
        items: [
            { href: "/directorio-medico", label: "Red Médica", icon: Stethoscope },
            { href: "/carnet-personal", label: "Carnet Salud", icon: Heart },
            { href: "/manutencion", label: "LOPNNA Sync", icon: Scale },
        ],
    },
    {
        title: "Gestión Civil",
        icon: BookMarked,
        items: [
            { href: "/partidas-nacimiento", label: "Partidas", icon: FileText },
            { href: "/actas-matrimonio", label: "Actas Nupciales", icon: Heart },
            { href: "/documentos-judiciales", label: "Buzón Judicial", icon: Gavel },
        ],
    },
    {
        title: "Ayuda",
        icon: LifeBuoy,
        items: [
            { href: "/manual-usuario", label: "Guía Usuario", icon: BookOpen },
            { href: "/notificaciones", label: "Avisos", icon: Bell },
        ],
    }
];

export const adminNavGroups = [
  { 
    title: "Administración", 
    icon: LayoutDashboard, 
    items: [
        { href: "/dashboard-empresa", label: "Resumen General", icon: LayoutDashboard },
        { href: "/analisis-rentabilidad", label: "Rentabilidad Avanzada", icon: TrendingUp },
    ], 
    subGroups: [] 
  },
  {
    title: "Contabilidad",
    icon: Calculator,
    items: [
        { href: "/contabilidad", label: "Centro Contable", icon: Calculator },
        { href: "/contabilidad/libros", label: "Libros Consolidados", icon: BookOpen },
        { href: "/contabilidad/cuentas", label: "Gestión de Cuentas", icon: Wallet },
        { href: "/contabilidad/analisis", label: "Análisis e IA", icon: PieChart },
    ],
    subGroups: []
  },
  {
    title: "Tributos",
    icon: Landmark,
    items: [
        { href: "/contabilidad/tributos", label: "Centro Tributario", icon: Landmark },
        { href: "/gaceta-6952", label: "Asistente Fiscal IA", icon: Bot },
        { href: "/contabilidad/tributos/aportes-parafiscales", label: "Parafiscales", icon: Landmark },
        { href: "/contabilidad/tributos/proteccion-pensiones", label: "Protecc. Pensiones", icon: ShieldCheck },
        { href: "/contabilidad/tributos/retenciones-iva", label: "Retenciones IVA", icon: Percent },
        { href: "/contabilidad/tributos/retenciones-islr", label: "Retenciones ISLR", icon: Banknote },
        { href: "/contabilidad/tributos/igtf", label: "IGTF 3%", icon: CreditCard },
        { href: "/contabilidad/tributos/municipales", label: "Municipales", icon: Landmark },
        { href: "/contabilidad/tributos/calendario-fiscal", label: "Calendario", icon: Calendar },
        { href: "/contabilidad/tributos/multas", label: "Multas", icon: Gavel },
    ],
    subGroups: []
  },
  {
    title: "Certificaciones",
    icon: ShieldCheck,
    items: [
        { href: "/contabilidad/certificaciones/empresa", label: "Cert. Empresa", icon: Building2 },
        { href: "/contabilidad/certificaciones/socios", label: "Cert. Socios", icon: UserCheck },
        { href: "/contabilidad/rrhh/certificados-laborales", label: "Cert. Laborales", icon: FileSignature },
    ],
    subGroups: []
  }
];

export const ventasNavGroups = [
  { 
    title: "Operaciones", 
    icon: ShoppingCart, 
    items: [
        { href: "/facturacion", label: "Centro de Facturas", icon: FileText },
        { href: "/punto-de-venta", label: "Punto de Venta", icon: TabletSmartphone },
        { href: "/proformas", label: "Cotizaciones", icon: Receipt },
        { href: "/facturacion-credito", label: "Ventas a Crédito", icon: CreditCard },
    ],
    subGroups: []
  },
  {
    title: "Inteligencia",
    icon: TrendingUp,
    items: [
        { href: "/analisis-ventas", label: "Análisis Comercial", icon: BarChart3 },
        { href: "/estrategias-ventas", label: "Estrategias IA", icon: Zap },
    ]
  }
];

export const sostenibilidadNavGroups = [
    {
        title: "Impacto Verde",
        icon: Recycle,
        items: [
            { href: "/sostenibilidad", label: "Dashboard Ambiental", icon: Leaf },
            { href: "/mercado-ecocreditos", label: "Eco-Exchange", icon: Coins },
            { href: "/tarjeta-reciclaje", label: "Tarjeta Avanzada", icon: Recycle },
        ]
    }
];

export const legalNavGroups = [
  { title: "Inicio", icon: Gavel, items: [{ href: "/escritorio-juridico", label: "Inicio Legal", icon: Gavel }], subGroups: [] },
  { 
    title: "Gestión", 
    icon: Gavel, 
    items: [
        { href: "/generador-documentos", label: "Crear Contratos", icon: Wand2 },
        { href: "/contratos", label: "Archivo de Contratos", icon: FileSignature },
        { href: "/permisos", label: "Permisos Vigentes", icon: UserCheck },
    ], 
    subGroups: [] 
  },
];

export const rrhhNavGroups = [
    { title: "Inicio", icon: Briefcase, items: [{ href: "/dashboard-rrhh", label: "Inicio RR.HH.", icon: LayoutDashboard }], subGroups: []},
    { 
        title: "Operaciones", 
        icon: Users, 
        items: [
            { href: "/nominas", label: "Pago de Nómina", icon: Users },
            { href: "/contabilidad/rrhh/certificados-laborales", label: "Cert. Laborales", icon: FileSignature },
            { href: "/prestaciones-sociales", label: "Liquidaciones", icon: Calculator },
        ],
        subGroups: []
    },
];

export const sociosNavGroups = [
    { title: "Estrategia", icon: Briefcase, items: [
        { href: "/dashboard-socios", label: "Dashboard Socios", icon: LayoutDashboard },
        { href: "/poderes-representacion", label: "Empresas Holding", icon: Gavel },
    ], subGroups: [] },
];

export const telecomNavGroups = [
  { 
    title: "Estado Técnico", 
    icon: Signal, 
    items: [ 
      { href: "/dashboard-telecom", label: "Estado de Red", icon: Signal },
    ], 
    subGroups: [] 
  },
  { 
    title: "Servicios", 
    icon: Smartphone, 
    items: [ 
      { href: "/venta-linea", label: "Nueva Línea", icon: Phone },
      { href: "/conatel/licenses", label: "Licencias Conatel", icon: FileText },
    ], 
    subGroups: [] 
  },
];
