
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
  Calendar
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
    items: [
        { href: "/dashboard-empresa", label: "Resumen General", icon: LayoutDashboard },
        { href: "/analisis-rentabilidad", label: "Rentabilidad Pro", icon: TrendingUp },
    ], 
    subGroups: [] 
  },
  {
    title: "Contabilidad",
    icon: Calculator,
    items: [
        { href: "/contabilidad", label: "Centro Contable", icon: Calculator },
        { href: "/contabilidad/libros", label: "Libros Maestros", icon: BookOpen },
        { href: "/contabilidad/cuentas", label: "Gestión de Cuentas", icon: Wallet },
        { href: "/contabilidad/analisis", label: "Análisis BI", icon: PieChart },
    ],
    subGroups: []
  },
  {
    title: "Tributos",
    icon: Landmark,
    items: [
        { href: "/contabilidad/tributos/retenciones-iva", label: "Retenciones IVA", icon: Percent },
        { href: "/contabilidad/tributos/retenciones-islr", label: "Retenciones ISLR", icon: Banknote },
        { href: "/contabilidad/tributos/municipales", label: "Municipales", icon: Landmark },
        { href: "/contabilidad/tributos/calendario-fiscal", label: "Calendario", icon: Calendar },
        { href: "/contabilidad/tributos/multas", label: "Multas", icon: Gavel },
        { href: "/contabilidad/tributos/homologacion", label: "Homologación", icon: ShieldCheck },
    ],
    subGroups: []
  },
  { 
    title: "Ventas", 
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
    title: "Sostenibilidad",
    icon: Recycle,
    items: [
        { href: "/sostenibilidad", label: "Dashboard Verde", icon: Leaf },
        { href: "/mercado-ecocreditos", label: "Eco-Exchange", icon: Coins },
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
