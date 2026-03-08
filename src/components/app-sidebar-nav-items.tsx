
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
  Wand2
} from "lucide-react";

export const naturalNavGroups = [
    {
        title: "Principal",
        icon: Home,
        items: [
            { href: "/dashboard", label: "Inicio", icon: Home },
            { href: "/tarjeta-digital", label: "Mi Perfil", icon: User },
            { href: "/seguridad", label: "Ajustes de Seguridad", icon: Shield },
            { href: "/notificaciones", label: "Avisos Pendientes", icon: Bell },
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
        title: "Familia",
        icon: Users,
        items: [
            { href: "/manutencion", label: "Pagos de Pensión", icon: Gavel },
            { href: "/registro-rif", label: "RIF Familiar", icon: FileEdit },
        ],
        subGroups: [],
    }
];

export const adminNavGroups = [
  { 
    title: "Resumen", 
    icon: LayoutDashboard, 
    items: [{ href: "/resumen-negocio", label: "Estado del Negocio", icon: LayoutDashboard }], 
    subGroups: [] 
  },
  { 
    title: "Facturación y Ventas", 
    icon: ShoppingCart, 
    subGroups: [],
    items: [
        { href: "/facturacion", label: "Centro de Ventas", icon: FileText },
        { href: "/punto-de-venta", label: "Cobro en Caja", icon: TabletSmartphone },
        { href: "/proformas", label: "Cotizaciones", icon: Receipt },
        { href: "/facturacion-credito", label: "Ventas a Crédito", icon: CreditCard },
    ]
  },
  {
    title: "Contabilidad",
    icon: Calculator,
    subGroups: [
      {
        title: "Análisis Financiero",
        icon: TrendingUp,
        items: [
          { href: "/analisis-ventas", label: "Reporte de Ingresos", icon: TrendingUp },
          { href: "/cierre-caja", label: "Cierre de Caja", icon: Calculator },
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
    title: "Empleados",
    icon: Briefcase,
    subGroups: [
      {
        title: "Gestión de Personal",
        icon: Users,
        items: [
            { href: "/dashboard-rrhh", label: "Recursos Humanos", icon: LayoutDashboard },
            { href: "/nominas", label: "Pagos de Nómina", icon: Users },
            { href: "/reclutamiento", label: "Nuevas Vacantes", icon: UserPlus },
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
          title: "Legal y Contratos",
          icon: FileSignature,
          items: [
            { href: "/escritorio-juridico", label: "Área Legal", icon: Gavel },
            { href: "/generador-documentos", label: "Crear Contratos", icon: Wand2 },
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
        { href: "/generador-documentos", label: "Crear Contratos", icon: Wand2 },
        { href: "/contratos", label: "Archivo de Contratos", icon: FileSignature },
        { href: "/permisos", label: "Permisos Vigentes", icon: UserCheck },
    ], 
    subGroups: [] 
  },
];

export const rrhhNavGroups = [
    { title: "Inicio", icon: Briefcase, items: [{ href: "/dashboard-rrhh", label: "Recursos Humanos", icon: LayoutDashboard }], subGroups: []},
    { 
        title: "Pagos", 
        icon: Users, 
        items: [
            { href: "/nominas", label: "Pagos de Nómina", icon: Users },
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
      { href: "/dashboard-telecom", label: "Seguimiento de Red", icon: Signal },
    ], 
    subGroups: [] 
  },
  { 
    title: "Servicios", 
    icon: Smartphone, 
    items: [ 
      { href: "/venta-linea", label: "Nueva Línea", icon: Phone },
      { href: "/conatel/licenses", label: "Estado de Licencias", icon: FileText },
    ], 
    subGroups: [] 
  },
];

export const sociosNavGroups = [
    { title: "Estrategia", icon: Briefcase, items: [
        { href: "/dashboard-socios", label: "Socios y Directivos", icon: LayoutDashboard },
        { href: "/poderes-representacion", label: "Empresas del Grupo", icon: Gavel },
    ], subGroups: [] },
];
