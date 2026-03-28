
import { FileText, Bell, LayoutDashboard, Gavel, User, Heart, Shield, File, File as FileEdit, Receipt, Signature as FileSignature, CreditCard, UserCheck, Users, Briefcase, TabletSmartphone, ChartPie as PieChart, TrendingUp, ShoppingCart, Banknote, Calculator, UserPlus, Smartphone, Phone, Recycle, Coins, Chrome as Home, ShieldCheck, Cpu, Signal, LayoutGrid, Lock, Wand as Wand2, Activity, Leaf, Wallet, Landmark, ChartBar as BarChart3, Scale, History, Percent, BookOpen, Calendar, Building2, Bot, Stethoscope, BookMarked, LifeBuoy, UserCog, FolderArchive, Star, Zap, BrainCircuit, ClipboardList, Target, FileSearch, Hammer, MailOpen, Settings2, School, HeartPulse, Handshake, Church, Building, Flame, Globe, Factory } from "lucide-react";

export const naturalNavGroups = [
    {
        title: "Identidad",
        icon: User,
        items: [
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
            { href: "/actas-matrimonio", label: "Partidas Nupciales", icon: Heart },
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
    title: "Estrategia",
    icon: Hammer,
    items: [
        { href: "/analisis-rentabilidad", label: "Rentabilidad Avanzada", icon: TrendingUp },
        { href: "/estudio-factibilidad-economica", label: "Factibilidad Econ.", icon: Target },
    ]
  },
  {
    title: "Calidad",
    icon: ShieldCheck,
    items: [
        { href: "/contabilidad/calidad/iso-9001", label: "Manuales ISO 9001", icon: FileText },
    ]
  },
  {
    title: "Proyectos",
    icon: ClipboardList,
    items: [
        { href: "/contabilidad/proyectos/anteproyecto", label: "Anteproyecto", icon: FileText },
        { href: "/contabilidad/proyectos/proyecto-maestro", label: "Proyecto Maestro", icon: ClipboardList },
    ]
  },
  {
    title: "Contabilidad",
    icon: Calculator,
    items: [
        { href: "/contabilidad", label: "Centro Contable", icon: BrainCircuit },
        { href: "/contabilidad/libros", label: "Libros Consolidados", icon: BookOpen },
        { href: "/contabilidad/cuentas", label: "Gestión de Cuentas", icon: Wallet },
        { href: "/contabilidad/entidades-sin-fines-lucro", label: "ESFL y Condominios", icon: Handshake },
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
        { href: "/contabilidad/tributos/comunicaciones", label: "Centro Comunicaciones", icon: MailOpen },
        { href: "/contabilidad/conatel", label: "Permiso Conatel", icon: Signal },
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
        { href: "/contabilidad/certificaciones/empresa", label: "Dossier Empresa", icon: Building2 },
        { href: "/contabilidad/certificaciones/contables", label: "Cert. Contables", icon: FileSignature },
        { href: "/contabilidad/certificaciones/financiera", label: "Dictamen Financiero", icon: Calculator },
        { href: "/contabilidad/rrhh/certificados-laborales", label: "Cert. Laborales", icon: Users },
    ],
    subGroups: []
  },
  {
    title: "Sistema",
    icon: Activity,
    items: [
        { href: "/actividad", label: "Registro de Actividad", icon: Activity },
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
  { 
    title: "Gestión Jurídica", 
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
    { 
        title: "Operaciones Maestro", 
        icon: Users, 
        items: [
            { href: "/nominas", label: "Pago de Nómina", icon: Calculator },
            { href: "/contabilidad/rrhh/certificados-laborales", label: "Cert. Laborales", icon: FileSignature },
            { href: "/prestaciones-sociales", label: "Liquidaciones", icon: Scale },
            { href: "/libros-laborales", label: "Libros Laborales", icon: BookOpen },
        ],
        subGroups: []
    },
    {
        title: "Gestión Humana",
        icon: Heart,
        items: [
            { href: "/reclutamiento", label: "Selección e Inducción", icon: UserPlus },
            { href: "/salud-seguridad", label: "Salud / LOPCYMAT", icon: Stethoscope },
            { href: "/clima-organizacional", label: "Clima y Liderazgo", icon: BrainCircuit },
            { href: "/desarrollo-personal", label: "Carrera y Formación", icon: School },
        ]
    }
];

export const sociosNavGroups = [
    { 
        title: "Supervisión", 
        icon: Briefcase, 
        items: [
            { href: "/contabilidad/tributos/poderes-representacion", label: "Empresas Holding", icon: Gavel },
        ], 
    },
];

export const telecomNavGroups = [
  { 
    title: "Servicios Telecom", 
    icon: Smartphone, 
    items: [ 
      { href: "/venta-linea", label: "Nueva Línea", icon: Phone },
      { href: "/flota-empresarial", label: "Flota Empresarial", icon: Building },
    ], 
  },
];
