
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
  Coins,
  Recycle,
} from "lucide-react";


export const naturalNavGroups = [
    {
        title: "Principal",
        icon: Home,
        items: [
            { href: "/dashboard", label: "Inicio", icon: Home },
            { href: "/tarjeta-digital", label: "Mi Tarjeta de Contacto", icon: User },
            { href: "/seguridad", label: "Ajustes de Seguridad", icon: Shield },
            { href: "/notificaciones", label: "Mis Avisos", icon: Bell },
        ],
        subGroups: [],
    },
    {
        title: "Papeles y Documentos",
        icon: FileText,
        items: [
            { href: "/documentos", label: "Mis Archivos Guardados", icon: File },
            { href: "/partidas-nacimiento", label: "Partida de Nacimiento", icon: Heart },
            { href: "/actas-matrimonio", label: "Acta de Matrimonio", icon: FileText },
            { href: "/documentos-judiciales", label: "Papeles de Tribunales", icon: Gavel },
            { href: "/antecedentes-penales", label: "Antecedentes Penales", icon: Shield },
        ],
        subGroups: [],
    },
    {
        title: "Puntos y Reciclaje",
        icon: Recycle,
        items: [
            { href: "/tarjeta-reciclaje", label: "Mi Tarjeta de Puntos", icon: Recycle },
            { href: "/mercado-ecocreditos", label: "Tienda de Eco-Puntos", icon: Coins },
        ],
        subGroups: [],
    },
    {
        title: "Salud y Médicos",
        icon: HeartHandshake,
        items: [
            { href: "/directorio-medico", label: "Buscar Doctores", icon: HeartHandshake },
        ],
        subGroups: [],
    },
    {
        title: "Familia e Hijos",
        icon: Users,
        items: [
            { href: "/manutencion", label: "Pago de Pensión", icon: Gavel },
            { href: "/registro-rif", label: "RIF de mis hijos", icon: FileEdit },
        ],
        subGroups: [],
    }
];

export const adminNavGroups = [
  { title: "Inicio", icon: LayoutDashboard, items: [{ href: "/dashboard-empresa", label: "Resumen del Negocio", icon: LayoutDashboard }], subGroups: [] },
  { 
    title: "Ventas y Facturas", 
    icon: ShoppingCart, 
    subGroups: [],
    items: [
        { href: "/facturacion", label: "Centro de Ventas", icon: FileText },
        { href: "/punto-de-venta", label: "Cobrar en Caja", icon: TabletSmartphone },
        { href: "/proformas", label: "Cotizaciones", icon: Receipt },
        { href: "/facturacion-credito", label: "Ventas a Crédito", icon: CreditCard },
        { href: "/data-entry", label: "Escanear Facturas", icon: FileScan },
    ]
  },
  {
    title: "Contabilidad",
    icon: Calculator,
    subGroups: [
      {
        title: "Análisis Financiero",
        icon: BarChart,
        items: [
          { href: "/analisis-ventas", label: "Reporte de Ventas", icon: TrendingUp },
          { href: "/analisis-caja", label: "Flujo de Dinero", icon: BarChart },
          { href: "/estructura-costos", label: "Gastos de la Empresa", icon: PieChart },
        ]
      },
      {
        title: "Impuestos",
        icon: ShieldCheck,
        items: [
          { href: "/declaracion-iva", label: "Pagar el IVA", icon: FileText },
          { href: "/islr-arc", label: "Reporte ISLR", icon: Banknote },
        ]
      }
    ],
    items: []
  },
  {
    title: "Empleados",
    icon: Briefcase,
    subGroups: [
      {
        title: "Personal",
        icon: Users,
        items: [
            { href: "/dashboard-rrhh", label: "Resumen de Personal", icon: LayoutDashboard },
            { href: "/nominas", label: "Pago de Nómina", icon: Users },
            { href: "/reclutamiento", label: "Nuevas Vacantes", icon: UserPlus },
        ]
      }
    ],
    items: []
  },
  { 
    title: "Legal", 
    icon: Gavel, 
    subGroups: [
        {
          title: "Documentos",
          icon: FileSignature,
          items: [
            { href: "/escritorio-juridico", label: "Asesoría Legal", icon: Gavel },
            { href: "/generador-documentos", label: "Crear Contratos IA", icon: Wand2 },
            { href: "/contratos", label: "Mis Contratos", icon: FileSignature },
            { href: "/permisos", label: "Permisos y Licencias", icon: UserCheck },
          ]
        }
    ], 
    items: [] 
  },
];

export const legalNavGroups = [
  { title: "Inicio", icon: Gavel, items: [{ href: "/escritorio-juridico", label: "Inicio Legal", icon: Gavel }], subGroups: [] },
  { 
    title: "Gestión", 
    icon: Gavel, 
    items: [
        { href: "/generador-documentos", label: "Crear Contratos", icon: Wand2 },
        { href: "/contratos", label: "Lista de Contratos", icon: FileSignature },
        { href: "/permisos", label: "Permisos Vigentes", icon: UserCheck },
    ], 
    subGroups: [] 
  },
];

export const rrhhNavGroups = [
    { title: "Inicio", icon: Briefcase, items: [{ href: "/dashboard-rrhh", label: "Inicio RR.HH.", icon: LayoutDashboard }], subGroups: []},
    { 
        title: "Nómina", 
        icon: Users, 
        items: [
            { href: "/nominas", label: "Pagos de Nómina", icon: Users },
            { href: "/prestaciones-sociales", label: "Cálculo Liquidación", icon: Calculator },
        ],
        subGroups: []
    },
];

export const telecomNavGroups = [
  { 
    title: "Inicio", 
    icon: LayoutDashboard, 
    items: [ 
      { href: "/dashboard-telecom", label: "Inicio Telecom", icon: Signal },
    ], 
    subGroups: [] 
  },
  { 
    title: "Líneas", 
    icon: Signal, 
    items: [ 
      { href: "/venta-linea", label: "Nueva Línea 5G", icon: Phone },
      { href: "/conatel/licenses", label: "Licencias Conatel", icon: FileText },
    ], 
    subGroups: [] 
  },
];

export const sociosNavGroups = [
    { title: "Holding", icon: Briefcase, items: [
        { href: "/dashboard-socios", label: "Resumen para Socios", icon: LayoutDashboard },
        { href: "/poderes-representacion", label: "Empresas del Grupo", icon: Gavel },
        { href: "/planes-crecimiento", label: "Planes de Futuro", icon: Rocket },
    ], subGroups: [] },
];
