
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
  Wallet
} from "lucide-react";

export const naturalNavGroups = [
    {
        title: "Principal",
        icon: Home,
        items: [
            { href: "/dashboard", label: "Inicio", icon: Home },
            { href: "/tarjeta-digital", label: "Mi Perfil", icon: User },
            { href: "/mi-linea", label: "Mi Línea 5G", icon: Smartphone },
            { href: "/seguridad", label: "Seguridad", icon: Shield },
            { href: "/notificaciones", label: "Avisos", icon: Bell },
        ],
        subGroups: [],
    },
    {
        title: "Trámites",
        icon: FileText,
        items: [
            { href: "/documentos", label: "Mis Documentos", icon: File },
            { href: "/partidas-nacimiento", label: "Partida de Nacimiento", icon: Heart },
            { href: "/actas-matrimonio", label: "Acta de Matrimonio", icon: FileText },
            { href: "/documentos-judiciales", label: "Documentos Judiciales", icon: Gavel },
            { href: "/antecedentes-penales", label: "Antecedentes Penales", icon: Shield },
        ],
        subGroups: [],
    },
    {
        title: "Sostenibilidad",
        icon: Recycle,
        items: [
            { href: "/tarjeta-reciclaje", label: "Puntos Verdes", icon: Recycle },
            { href: "/mercado-ecocreditos", label: "Canje de Puntos", icon: Coins },
        ],
        subGroups: [],
    }
];

export const adminNavGroups = [
  { 
    title: "Administración", 
    icon: LayoutDashboard, 
    items: [{ href: "/resumen-negocio", label: "Estado del Negocio", icon: LayoutDashboard }], 
    subGroups: [] 
  },
  { 
    title: "Ventas", 
    icon: ShoppingCart, 
    items: [
        { href: "/facturacion", label: "Facturación", icon: FileText },
        { href: "/punto-de-venta", label: "Punto de Venta", icon: TabletSmartphone },
        { href: "/proformas", label: "Cotizaciones", icon: Receipt },
    ],
    subGroups: []
  },
  {
    title: "Sostenibilidad",
    icon: Recycle,
    items: [
        { href: "/sostenibilidad", label: "Dashboard Verde", icon: Activity },
        { href: "/mercado-ecocreditos", label: "Eco-Exchange", icon: Coins },
    ],
    subGroups: []
  }
];

export const sostenibildadNavGroups = [
    {
        title: "Gestión Ambiental",
        icon: Recycle,
        items: [
            { href: "/sostenibilidad", label: "Dashboard", icon: LayoutDashboard },
            { href: "/mercado-ecocreditos", label: "Mercado ECR", icon: Coins },
            { href: "/tarjeta-reciclaje", label: "ID Reciclaje", icon: CreditCard },
        ],
        subGroups: []
    }
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

export const lineUserNavGroups = [
    {
        title: "Mi Conectividad",
        icon: Smartphone,
        items: [
            { href: "/mi-linea", label: "Resumen de Consumo", icon: Activity },
            { href: "/mi-linea", label: "Recargar Saldo", icon: Wallet },
        ],
        subGroups: []
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
            { href: "/prestaciones-sociales", label: "Liquidaciones", icon: Calculator },
        ],
        subGroups: []
    },
];

export const sociosNavGroups = [
    { title: "Estrategia", icon: Briefcase, items: [
        { href: "/dashboard-socios", label: "Socios", icon: LayoutDashboard },
        { href: "/poderes-representacion", label: "Empresas", icon: Gavel },
    ], subGroups: [] },
];
