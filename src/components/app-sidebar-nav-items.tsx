
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
  Activity
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
    },
    {
        title: "Familia",
        icon: Users,
        items: [
            { href: "/manutencion", label: "Manutención", icon: Gavel },
            { href: "/registro-rif", label: "Registro RIF", icon: FileEdit },
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
    subGroups: [],
    items: [
        { href: "/facturacion", label: "Facturación", icon: FileText },
        { href: "/punto-de-venta", label: "Punto de Venta", icon: TabletSmartphone },
        { href: "/proformas", label: "Cotizaciones", icon: Receipt },
        { href: "/facturacion-credito", label: "Ventas a Crédito", icon: CreditCard },
    ]
  },
  {
    title: "Contabilidad",
    icon: Calculator,
    subGroups: [
      {
        title: "Finanzas",
        icon: TrendingUp,
        items: [
          { href: "/analisis-ventas", label: "Reporte de Ventas", icon: TrendingUp },
          { href: "/cierre-caja", label: "Cierre de Caja", icon: Calculator },
          { href: "/estructura-costos", label: "Estructura de Gastos", icon: PieChart },
        ]
      },
      {
        title: "Impuestos",
        icon: ShieldCheck,
        items: [
          { href: "/declaracion-iva", label: "Declaración IVA", icon: FileText },
          { href: "/islr-arc", label: "Comprobantes ISLR", icon: Banknote },
        ]
      }
    ],
    items: []
  },
  {
    title: "Recursos Humanos",
    icon: Briefcase,
    subGroups: [
      {
        title: "Personal",
        icon: Users,
        items: [
            { href: "/dashboard-rrhh", label: "Inicio RR.HH.", icon: LayoutDashboard },
            { href: "/nominas", label: "Pago de Nómina", icon: Users },
            { href: "/reclutamiento", label: "Vacantes", icon: UserPlus },
        ]
      }
    ],
    items: []
  },
  { 
    title: "Asesoría Legal", 
    icon: Gavel, 
    subGroups: [
        {
          title: "Legal",
          icon: FileSignature,
          items: [
            { href: "/escritorio-juridico", label: "Inicio Legal", icon: Gavel },
            { href: "/generador-documentos", label: "Crear Contratos", icon: Wand2 },
            { href: "/contratos", label: "Archivo de Contratos", icon: FileSignature },
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
      { href: "/mi-linea", label: "Mi Línea 5G", icon: Smartphone },
      { href: "/conatel/licenses", label: "Licencias Conatel", icon: FileText },
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
