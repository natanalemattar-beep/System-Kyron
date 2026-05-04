
import { FileText, Bell, LayoutDashboard, Gavel, User, Heart, Shield, File, File as FileEdit, Receipt, Signature as FileSignature, CreditCard, UserCheck, Users, Briefcase, TabletSmartphone, ChartPie as PieChart, TrendingUp, ShoppingCart, Banknote, Calculator, UserPlus, Smartphone, Phone, Recycle, Coins, Chrome as Home, ShieldCheck, Cpu, Signal, LayoutGrid, Lock, Wand as Wand2, Activity, Leaf, Wallet, Landmark, ChartBar as ChartColumn, Scale, History, Percent, BookOpen, Calendar, Building2, Bot, Stethoscope, BookMarked, LifeBuoy, UserCog, FolderArchive, Star, Zap, BrainCircuit, ClipboardList, Target, FileSearch, Hammer, MailOpen, Settings2, School, HeartPulse, Handshake, Church, Building, Flame, Globe, Factory, MapPin, BellRing, FileCheck, Megaphone, ContactRound as IdCard, Sparkles, Palmtree, Trophy, FolderKanban, Server, Gauge, ScanLine, Wifi, CreditCard as CreditCardIcon, SlidersHorizontal, ChartLine, Fingerprint, FileSpreadsheet, Eye, KeyRound, ShieldAlert, MonitorSmartphone, Scan, Plane, Headphones, Navigation, AppWindow, Monitor as MonitorIcon } from "lucide-react";

export const naturalNavGroups = [
    {
        title: "Identidad",
        icon: User,
        items: [
            { href: "/tarjeta-digital", label: "ID Digital 3D", icon: User },
            { href: "/perfil", label: "Información de Perfil", icon: UserCog },
            { href: "/seguridad-cuenta", label: "Seguridad de Cuenta", icon: ShieldCheck, badge: "NUEVO" },
        ],
    },
    {
        title: "Documentos",
        icon: FolderArchive,
        items: [
            { href: "/documentos", label: "Bóveda Civil", icon: Lock },
            { href: "/documentos", label: "Cert. Ingresos", icon: Banknote },
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
        title: "Conectividad",
        icon: Wifi,
        items: [
            { href: "/mi-internet", label: "Internet y Teléfono", icon: Wifi, badge: "NUEVO" },
        ],
    },
    {
        title: "Kyron IA",
        icon: Sparkles,
        items: [
            { href: "/chat-personal", label: "Chat Kyron", icon: Sparkles },
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

export const asesoriaContableNavGroups = [
  {
    title: "Finanzas",
    icon: Calculator,
    items: [
        { href: "/contabilidad/libros", label: "Libros Consolidados", icon: BookOpen, section: "Contabilidad" },
        { href: "/contabilidad/plan-cuentas", label: "Plan de Cuentas", icon: FolderArchive, section: "Contabilidad" },
        { href: "/contabilidad/asientos-contables", label: "Asientos Contables", icon: FileEdit, section: "Contabilidad" },
        { href: "/contabilidad/estados-financieros", label: "Estados Financieros", icon: ChartColumn, section: "Contabilidad" },
        { href: "/contabilidad/presupuesto", label: "Presupuesto", icon: Target, section: "Contabilidad" },
        { href: "/contabilidad/indicadores-financieros", label: "Indicadores", icon: TrendingUp, section: "Contabilidad" },
        { href: "/contabilidad/centro-costos", label: "Centro de Costos", icon: Building2, section: "Contabilidad" },
        { href: "/contabilidad/depreciacion-activos", label: "Depreciación Activos", icon: History, section: "Contabilidad" },
        { href: "/contabilidad/cierre-contable", label: "Cierre Contable", icon: Lock, section: "Contabilidad" },
        { href: "/contabilidad/exportacion-seniat", label: "Exportación SENIAT", icon: Landmark, section: "Contabilidad" },
        { href: "/contabilidad/dictamen-contador", label: "Dictamen del Contador", icon: Star, section: "Contabilidad" },
        { href: "/contabilidad/cuentas", label: "Gestión de Cuentas", icon: Wallet, section: "Contabilidad" },
        { href: "/contabilidad/analisis", label: "Análisis e IA", icon: PieChart, section: "Contabilidad" },
        { href: "/contabilidad/entidades-sin-fines-lucro", label: "ESFL y Condominios", icon: Handshake, section: "Contabilidad" },
        { href: "/contabilidad/certificaciones/contables", label: "Cert. Contables", icon: FileSignature, section: "Contabilidad" },
        { href: "/contabilidad/certificaciones/financiera", label: "Dictamen Financiero", icon: Calculator, section: "Contabilidad" },
        { href: "/contabilidad/certificaciones/empresa", label: "Dossier Empresa", icon: Building2, section: "Contabilidad" },
        { href: "/contabilidad/tributos", label: "Centro Tributario", icon: Landmark, section: "Fiscal" },
        { href: "/gaceta-6952", label: "Asistente Fiscal IA", icon: Bot, section: "Fiscal" },
        { href: "/contabilidad/tributos/retenciones-iva", label: "Retenciones IVA", icon: Percent, section: "Fiscal" },
        { href: "/contabilidad/tributos/retenciones-islr", label: "Retenciones ISLR", icon: Banknote, section: "Fiscal" },
        { href: "/contabilidad/tributos/igtf", label: "IGTF 3%", icon: CreditCard, section: "Fiscal" },
        { href: "/contabilidad/tributos/aportes-parafiscales", label: "Parafiscales", icon: Landmark, section: "Fiscal" },
        { href: "/contabilidad/tributos/municipales", label: "Municipales", icon: Landmark, section: "Fiscal" },
        { href: "/contabilidad/tributos/calendario-fiscal", label: "Calendario Fiscal", icon: Calendar, section: "Fiscal" },
        { href: "/contabilidad/tributos/multas", label: "Multas y Sanciones", icon: Gavel, section: "Fiscal" },
        { href: "/contabilidad/tributos/comunicaciones", label: "Comunicaciones", icon: MailOpen, section: "Fiscal" },
    ],
  },
  {
    title: "Talento",
    icon: Users,
    items: [
        { href: "/nominas", label: "Pago de Nómina", icon: Calculator, section: "Nómina" },
        { href: "/contabilidad/rrhh/certificados-laborales", label: "Cert. Laborales", icon: FileSignature, section: "Nómina" },
        { href: "/prestaciones-sociales", label: "Liquidaciones", icon: Scale, section: "Nómina" },
        { href: "/libros-laborales", label: "Libros Laborales", icon: BookOpen, section: "Nómina" },
        { href: "/viaticos", label: "Viáticos y Gastos", icon: Plane, badge: "NUEVO", section: "Nómina" },
        { href: "/reclutamiento", label: "Selección e Inducción", icon: UserPlus, section: "Desarrollo" },
        { href: "/salud-seguridad", label: "Salud / LOPCYMAT", icon: Stethoscope, section: "Desarrollo" },
        { href: "/clima-organizacional", label: "Clima y Liderazgo", icon: BrainCircuit, section: "Desarrollo" },
        { href: "/desarrollo-personal", label: "Carrera y Formación", icon: School, section: "Desarrollo" },
        { href: "/proyectos-personal", label: "Proyectos y Estrategias", icon: FolderKanban, section: "Desarrollo" },
        { href: "/bienestar-laboral", label: "Bienestar y Vacaciones", icon: Palmtree, section: "Desarrollo" },
        { href: "/manuales-rrhh", label: "Manuales y Contratos", icon: BookOpen, section: "Desarrollo" },
    ],
  },
  {
    title: "Legal",
    icon: Shield,
    items: [
        { href: "/contabilidad/tributos/permisos", label: "Licencias y Permisología", icon: ShieldCheck, section: "Permisología" },
        { href: "/autorizaciones", label: "Autorizaciones", icon: UserCheck, section: "Permisología" },
        { href: "/contabilidad/conatel", label: "Permiso CONATEL", icon: Signal, section: "Permisología" },
        { href: "/contabilidad/tributos/proteccion-pensiones", label: "Protección Pensiones", icon: ShieldCheck, section: "Permisología" },
        { href: "/tramites-fiscales", label: "Trámites Fiscales", icon: FileEdit, section: "Permisología" },
    ],
  },
  {
    title: "Negocio",
    icon: Megaphone,
    items: [
        { href: "/marketing", label: "Dashboard Marketing", icon: Megaphone, section: "Marketing" },
        { href: "/feedback-responses", label: "Respuestas QR", icon: MessageSquare, badge: "NUEVO", section: "Marketing" },
        { href: "/marketing/campanas", label: "Campañas", icon: Target, section: "Marketing" },
        { href: "/marketing/embudos", label: "Embudos de Venta", icon: TrendingUp, section: "Marketing" },
        { href: "/marketing/crm", label: "CRM Clientes", icon: Users, section: "Marketing" },
        { href: "/marketing/redes-sociales", label: "Redes Sociales", icon: Globe, section: "Marketing" },
        { href: "/marketing/email-marketing", label: "Email Marketing", icon: MailOpen, section: "Marketing" },
        { href: "/marketing/carnets", label: "Carnets y Tarjetas", icon: IdCard, section: "Marketing" },
        { href: "/analisis-rentabilidad", label: "Rentabilidad Avanzada", icon: TrendingUp, section: "Planificación" },
        { href: "/estudio-factibilidad-economica", label: "Factibilidad Econ.", icon: Target, section: "Planificación" },
        { href: "/contabilidad/calidad/iso-9001", label: "Manuales ISO 9001", icon: FileText, section: "Planificación" },
        { href: "/contabilidad/proyectos/anteproyecto", label: "Anteproyecto", icon: FileText, section: "Planificación" },
        { href: "/contabilidad/proyectos/proyecto-maestro", label: "Gestión de Proyectos", icon: ClipboardList, section: "Planificación" },
        { href: "/ingenieria-ia", label: "Ingeniería e IA", icon: Cpu, section: "Planificación" },
    ],
  },
  {
    title: "Sistema",
    icon: Settings2,
    items: [
        { href: "/kyron-chat", label: "Chat Kyron", icon: Sparkles, section: "Kyron IA" },
        { href: "/seguridad-empresarial", label: "Centro de Seguridad", icon: Shield, badge: "NUEVO", section: "Seguridad" },
        { href: "/seguridad-empresarial/auditoria", label: "Auditoría de Accesos", icon: Eye, badge: "NUEVO", section: "Seguridad" },
        { href: "/seguridad-empresarial/dispositivos", label: "Dispositivos", icon: MonitorSmartphone, badge: "NUEVO", section: "Seguridad" },
        { href: "/actividad", label: "Registro de Actividad", icon: Activity, section: "Actividad" },
    ],
  }
];

export const adminNavGroups = asesoriaContableNavGroups;

export const ventasNavGroups = [
  { 
    title: "Operaciones", 
    icon: ShoppingCart, 
    items: [
        { href: "/facturacion", label: "Centro de Facturas", icon: FileText },
        { href: "/contabilidad/punto-de-ventas", label: "Punto de Venta", icon: TabletSmartphone },
        { href: "/proformas", label: "Cotizaciones", icon: Receipt },
        { href: "/facturacion-credito", label: "Ventas a Crédito", icon: CreditCard },
    ],
    subGroups: []
  },
  {
    title: "Inteligencia",
    icon: TrendingUp,
    items: [
        { href: "/analisis-ventas", label: "Análisis Comercial", icon: ChartColumn },
        { href: "/analisis-ventas", label: "Estrategias IA", icon: Zap },
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

export const rrhhNavGroups = asesoriaContableNavGroups;

export const sociosNavGroups = [
    { 
        title: "Supervisión", 
        icon: Briefcase, 
        items: [
            { href: "/contabilidad/tributos/poderes-representacion", label: "Empresas Holding", icon: Gavel },
        ], 
    },
];

export const informaticaNavGroups = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    items: [
        { href: "/dashboard-it", label: "Panel IT", icon: LayoutDashboard },
    ],
  },
  {
    title: "Soporte",
    icon: LifeBuoy,
    items: [
        { href: "/helpdesk", label: "Help Desk / Soporte", icon: LifeBuoy },
    ],
  },
  {
    title: "Infraestructura",
    icon: Server,
    items: [
        { href: "/infraestructura", label: "Servidores y Redes", icon: Signal },
    ],
  },
  {
    title: "Seguridad",
    icon: Shield,
    items: [
        { href: "/seguridad", label: "Ciberseguridad", icon: Shield },
    ],
  },
  {
    title: "Gestión",
    icon: FileCheck,
    items: [
        { href: "/licencias", label: "Licencias Software", icon: FileCheck },
        { href: "/respaldos", label: "Respaldos / Backup", icon: FolderArchive },
    ],
  },
];

export const telecomNavGroups = [
  { 
    title: "Mi Línea Personal", 
    icon: Smartphone, 
    items: [ 
      { href: "/mi-linea", label: "Mis Líneas", icon: Phone },
      { href: "/venta-linea", label: "Nueva Línea", icon: Smartphone },
      { href: "/recargas", label: "Recargas", icon: CreditCardIcon },
      { href: "/consumo-5g", label: "Consumo 5G", icon: Gauge },
      { href: "/esim", label: "eSIM Digital", icon: ScanLine },
      { href: "/facturas-linea", label: "Mis Facturas", icon: Receipt },
      { href: "/plan-familiar", label: "Plan Familiar", icon: Users, badge: "NUEVO" },
      { href: "/soporte-tecnico", label: "Soporte Técnico", icon: Headphones },
      { href: "/mapa-cobertura", label: "Mapa Cobertura", icon: MapPin },
      { href: "/analitica-consumo", label: "Analítica IA", icon: BrainCircuit, badge: "NUEVO" },
    ], 
  },
  {
    title: "Mi Línea Empresa",
    icon: Building,
    items: [
      { href: "/flota-empresarial", label: "Flota Empresarial", icon: Building },
      { href: "/internet-empresarial", label: "Internet y Telefonía", icon: Wifi, badge: "NUEVO" },
      { href: "/limites-corporativos", label: "Límites por Empleado", icon: SlidersHorizontal },
      { href: "/reportes-flota", label: "Reportes de Flota", icon: ChartLine },
      { href: "/homologacion-imei", label: "Homologación IMEI", icon: Fingerprint },
      { href: "/facturacion-corporativa", label: "Facturación Corp.", icon: FileSpreadsheet },
      { href: "/geolocalizacion-flota", label: "Geolocalización", icon: Navigation, badge: "NUEVO" },
      { href: "/mdm-corporativo", label: "MDM Corporativo", icon: MonitorIcon },
      { href: "/restriccion-apps", label: "Restricción Apps", icon: AppWindow },
      { href: "/analitica-empresarial", label: "Analítica Empresarial", icon: ChartColumn, badge: "NUEVO" },
      { href: "/cotizador-equipos", label: "Cotizador Equipos", icon: ShoppingCart },
      { href: "/dashboard-ejecutivo", label: "Dashboard Ejecutivo", icon: LayoutDashboard },
      { href: "/reportes-conatel", label: "Reportes CONATEL", icon: FileSpreadsheet, badge: "NUEVO" },
      { href: "/solicitudes-legales", label: "Solicitudes Legales", icon: Gavel },
    ],
  },
];
