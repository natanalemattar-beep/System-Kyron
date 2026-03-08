
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
  Archive,
  CreditCard,
  UserCheck,
  Users,
  Briefcase,
  TabletSmartphone,
  PieChart,
  TrendingUp,
  ShieldQuestion,
  Calendar,
  Building,
  Timer,
  Moon,
  Sun,
  ShoppingCart,
  Banknote,
  HandCoins,
  Wallet,
  HeartHandshake,
  Megaphone,
  BrainCircuit,
  ShieldCheck,
  Scale,
  Stamp,
  FileMinus,
  FilePlus,
  FileScan,
  Wand2,
  HelpCircle,
  Package,
  Target,
  Search,
  Home,
  Globe,
  KeyRound,
  LogOut,
  Calculator,
  Mail,
  UserPlus,
  Gift,
  Award,
  Sparkles,
  Smartphone,
  Phone,
  Recycle,
  Coins,
  Activity,
  School,
  Presentation,
  Zap,
  Cpu,
  Network
} from "lucide-react";

export const naturalNavGroups = [
    {
        title: "Principal",
        icon: Home,
        items: [
            { href: "/dashboard", label: "Inicio", icon: Home },
            { href: "/tarjeta-digital", label: "Mi Perfil", icon: User },
            { href: "/seguridad", label: "Seguridad", icon: Shield },
            { href: "/notificaciones", label: "Avisos", icon: Bell },
        ],
        subGroups: [],
    },
    {
        title: "Trámites y Documentos",
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
        title: "Sustentabilidad",
        icon: Recycle,
        items: [
            { href: "/tarjeta-reciclaje", label: "Mis Puntos Verdes", icon: Recycle },
            { href: "/mercado-ecocreditos", label: "Canje de Recompensas", icon: Coins },
        ],
        subGroups: [],
    },
    {
        title: "Salud",
        icon: HeartHandshake,
        items: [
            { href: "/directorio-medico", label: "Buscar Médicos", icon: HeartHandshake },
        ],
        subGroups: [],
    },
    {
        title: "Familia",
        icon: Users,
        items: [
            { href: "/manutencion", label: "Pagos de Pensión", icon: Gavel },
            { href: "/registro-rif", label: "RIF de Cargas Familiares", icon: FileEdit },
        ],
        subGroups: [],
    }
];

export const adminNavGroups = [
  { title: "Resumen", icon: LayoutDashboard, items: [{ href: "/dashboard-empresa", label: "Estado del Negocio", icon: LayoutDashboard }], subGroups: [] },
  { 
    title: "Ventas", 
    icon: ShoppingCart, 
    subGroups: [],
    items: [
        { href: "/facturacion", label: "Centro de Ventas", icon: FileText },
        { href: "/punto-de-venta", label: "Cobro en Caja", icon: TabletSmartphone },
        { href: "/proformas", label: "Cotizaciones", icon: Receipt },
        { href: "/facturacion-credito", label: "Ventas a Crédito", icon: CreditCard },
        { href: "/data-entry", label: "Escaneo de Facturas", icon: FileScan },
    ]
  },
  {
    title: "Finanzas",
    icon: Calculator,
    subGroups: [
      {
        title: "Análisis Financiero",
        icon: BarChart,
        items: [
          { href: "/analisis-ventas", label: "Reporte de Ingresos", icon: TrendingUp },
          { href: "/analisis-caja", label: "Flujo de Dinero", icon: BarChart },
          { href: "/estructura-costos", label: "Estructura de Gastos", icon: PieChart },
        ]
      },
      {
        title: "Impuestos",
        icon: ShieldCheck,
        items: [
          { href: "/declaracion-iva", label: "Declaración de IVA", icon: FileText },
          { href: "/islr-arc", label: "Comprobantes ISLR", icon: Banknote },
        ]
      }
    ],
    items: []
  },
  {
    title: "Personal",
    icon: Briefcase,
    subGroups: [
      {
        title: "Gestión de Empleados",
        icon: Users,
        items: [
            { href: "/dashboard-rrhh", label: "Resumen de Talento", icon: LayoutDashboard },
            { href: "/nominas", label: "Pagos de Nómina", icon: Users },
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
          title: "Asesoría Legal",
          icon: FileSignature,
          items: [
            { href: "/escritorio-juridico", label: "Área Legal", icon: Gavel },
            { href: "/generador-documentos", label: "Redactar Contratos", icon: Wand2 },
            { href: "/contratos", label: "Archivo de Contratos", icon: FileSignature },
            { href: "/permisos", label: "Permisos Vigentes", icon: UserCheck },
          ]
        }
    ], 
    items: [] 
  },
];

export const legalNavGroups = [
  { title: "Inicio", icon: Gavel, items: [{ href: "/escritorio-juridico", label: "Asesoría Legal", icon: Gavel }], subGroups: [] },
  { 
    title: "Documentación", 
    icon: Gavel, 
    items: [
        { href: "/generador-documentos", label: "Redactar Contratos", icon: Wand2 },
        { href: "/contratos", label: "Lista de Contratos", icon: FileSignature },
        { href: "/permisos", label: "Permisos y Licencias", icon: UserCheck },
    ], 
    subGroups: [] 
  },
];

export const rrhhNavGroups = [
    { title: "Inicio", icon: Briefcase, items: [{ href: "/dashboard-rrhh", label: "Resumen RR.HH.", icon: LayoutDashboard }], subGroups: []},
    { 
        title: "Pagos", 
        icon: Users, 
        items: [
            { href: "/nominas", label: "Pagos de Nómina", icon: Users },
            { href: "/prestaciones-sociales", label: "Cálculo de Liquidación", icon: Calculator },
        ],
        subGroups: []
    },
];

export const telecomNavGroups = [
  { 
    title: "Inicio", 
    icon: LayoutDashboard, 
    items: [ 
      { href: "/dashboard-telecom", label: "Control Técnico", icon: Signal },
    ], 
    subGroups: [] 
  },
  { 
    title: "Servicios", 
    icon: Signal, 
    items: [ 
      { href: "/venta-linea", label: "Activar Nueva Línea", icon: Phone },
      { href: "/conatel/licenses", label: "Estado de Licencias", icon: FileText },
    ], 
    subGroups: [] 
  },
];

export const sociosNavGroups = [
    { title: "Estrategia", icon: Briefcase, items: [
        { href: "/dashboard-socios", label: "Resumen de Socios", icon: LayoutDashboard },
        { href: "/poderes-representacion", label: "Empresas del Grupo", icon: Gavel },
        { href: "/planes-crecimiento", label: "Planes de Expansión", icon: Rocket },
    ], subGroups: [] },
];
