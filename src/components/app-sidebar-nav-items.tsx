

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
  Building as BuildingIcon,
  BookUser,
  Timer,
  Moon,
  Sun,
  ShoppingCart,
  UserX,
  Plane,
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
  ShieldAlert,
  Bot,
  Scale,
  Stamp,
  Gift,
  FileScan,
  AreaChart,
  Sparkles,
  FilePlus,
  FileMinus,
  HelpCircle,
  Building,
  Send,
  Loader2,
  Contact,
  Calculator,
  Paintbrush,
  Network,
  Rocket,
  Mail,
  Award,
  Presentation,
  Cpu,
  Recycle,
  Wand2,
  Link as LinkIcon,
  Globe,
  Activity,
  DollarSign as DollarSignIcon,
  CandlestickChart,
  Swords,
  Search,
  HardHat,
  MessageSquare,
  HeartPulse,
  Home,
  SlidersHorizontal,
  School,
  UserPlus,
  Package,
  Zap,
} from "lucide-react";


export const juridicoMainMenuItems = [
  { href: "/escritorio-juridico", label: "Escritorio Jurídico", icon: LayoutDashboard },
  { href: "/departamento-juridico", label: "Departamento Jurídico", icon: Gavel },
  { href: "/legalizacion-empresa", label: "Legalización Empresa", icon: Stamp },
  { href: "/registro-rif", label: "Registro RIF", icon: FileEdit },
  { href: "/permisos", label: "Trámites y Permisos", icon: UserCheck },
  { href: "/autorizaciones", label: "Autorizaciones", icon: ShieldCheck },
  { href: "/multas", label: "Multas", icon: AlertTriangle },
  { href: "/recursos-fiscales", label: "Recursos Fiscales y Gacetas", icon: Scale },
  { href: "/compra-venta-inmuebles", label: "Gestión Inmobiliaria", icon: Home },
  { href: "/activos-inmobiliarios", label: "Gestión de Activos", icon: Building },
  { href: "/licencia-software", label: "Contrato de Licencia", icon: FileSignature },
];

export const finanzasContabilidadMenuItems = [
  { href: "/libros-contables", label: "Libros Contables", icon: BookOpen },
  { href: "/reports", label: "Reportes Financieros", icon: BarChart },
  { href: "/memoria-anual", label: "Memoria Anual", icon: BookOpen },
  { href: "/clasificacion-cuentas-contables", label: "Clasificación de Cuentas", icon: BookOpen },
  { href: "/tramites-fiscales", label: "Trámites Fiscales", icon: FileText },
  { href: "/cuentas-bancarias", label: "Cuentas Bancarias", icon: Landmark },
  { href: "/billetera-cambio", label: "Billetera de Cambio", icon: Wallet },
  { href: "/inventario", label: "Inventario", icon: Archive },
  { href: "/cuentas-por-cobrar", label: "Cuentas por Cobrar", icon: Wallet },
  { href: "/cuentas-por-pagar", label: "Cuentas por Pagar", icon: HandCoins },
  { href: "/seguros", label: "Seguros", icon: ShieldCheck },
  { href: "/libro-licores", label: "Libro de Licores", icon: Wine },
  { href: "/presupuesto", label: "Presupuesto", icon: PieChart },
  { href: "/cartas-seniat", label: "Cartas para SENIAT", icon: Mail },
  { href: "/zero-risk", label: "Protección Fiscal (0% Riesgo)", icon: Shield },
  { href: "/homologacion-seniat", label: "Homologación SENIAT", icon: ShieldCheck },
  { href: "/analisis-rentabilidad", label: "Análisis de Rentabilidad", icon: TrendingUp },
  { href: "/contabilidad-escuelas", label: "Contabilidad para Escuelas", icon: School },
  { href: "/software-contable", label: "Guía de Software Contable", icon: Puzzle },
];

export const facturacionGeneralMenuItems = [
    { href: "/facturacion", label: "Centro de Facturación", icon: FileText },
    { href: "/proformas", label: "Proformas", icon: Receipt },
    { href: "/punto-de-venta", label: "Punto de Venta", icon: TabletSmartphone },
    { href: "/facturacion-credito", label: "Facturación a Crédito", icon: CreditCard },
    { href: "/cobranza", label: "Gestión de Cobranza", icon: HandCoins },
    { href: "/modelo-factura", label: "Modelo de Factura", icon: FileText },
    { href: "/modelo-presupuesto", label: "Factura de Presupuesto", icon: Receipt },
    { href: "/nota-debito", label: "Nota de Débito", icon: FileMinus },
    { href: "/nota-credito", label: "Nota de Crédito", icon: FilePlus },
    { href: "/factura-nota-debito-credito", label: "Factura, Débito y Crédito", icon: HelpCircle },
    { href: "/data-entry", label: "Entrada de Datos por IA", icon: FileScan },
    { href: "/importaciones", label: "Proveedores", icon: Ship },
    { href: "/registro-proveedores", label: "Registro de Proveedores", icon: UserCog },
    { href: "/creditos", label: "Líneas de Crédito", icon: CreditCard },
    { href: "/archivo-digital", label: "Archivo Digital", icon: Archive },
    { href: "/registro-comprador", label: "Registro de Comprador", icon: UserCheck },
];

export const internationalOperationsMenuItems = [
    { href: "/gestion-global", label: "Centro de Gestión Global", icon: Globe },
    { href: "/facturacion-internacional", label: "Facturación Internacional", icon: Globe },
];

export const ventasMenuItems = [
    { href: "/analisis-ventas", label: "Dashboard de Ventas", icon: LayoutDashboard },
    { href: "/punto-de-venta", label: "Punto de Venta", icon: TabletSmartphone },
    { href: "/arqueo-caja", label: "Arqueo de Caja", icon: ClipboardCheck },
    { href: "/analisis-caja", label: "Análisis de Caja", icon: BarChart },
    { href: "/estrategias-ventas", label: "Descuentos y Promociones", icon: Lightbulb },
    { href: "/nota-credito", label: "Nota de Crédito", icon: FilePlus },
    { href: "/nota-debito", label: "Nota de Débito", icon: FileMinus },
    { href: "/atencion-online", label: "Centro de Atención Online", icon: MessageSquare },
];

export const recursosHumanosGestionItems = [
    { href: "/dashboard-rrhh", label: "Dashboard RR.HH.", icon: LayoutDashboard },
    { href: "/nominas", label: "Nóminas", icon: Users },
    { href: "/contratos", label: "Contratos", icon: FileSignature },
    { href: "/modelo-contrato-trabajo", label: "Modelo Contrato de Trabajo", icon: FileSignature },
    { href: "/prestaciones-sociales", label: "Prestaciones Sociales", icon: Calculator },
    { href: "/resumen-anual-empleados", label: "Resumen Anual de Empleados", icon: BookOpen },
    { href: "/proteccion-pensiones", label: "Protección de Pensiones", icon: Shield },
    { href: "/islr-arc", label: "ISLR / AR-C", icon: Banknote },
    { href: "/clasificacion-empleados", label: "Clasificación de Empleados", icon: Users },
    { href: "/beneficios-empleados", label: "Beneficios para Empleados", icon: Gift },
    { href: "/modelos-cartas", label: "Modelos de Cartas", icon: Mail },
    { href: "/desarrollo-profesional", label: "Desarrollo Profesional", icon: Sparkles },
    { href: "/gestion-notificaciones", label: "Gestión de Notificaciones", icon: Bell },
    { href: "/carnet-personal", label: "Carnet del Personal", icon: Contact },
    { href: "/material-apoyo", label: "Material de Apoyo", icon: Paintbrush },
    { href: "/reclutamiento", label: "Reclutamiento", icon: UserPlus },
];

export const librosRegistroMenuItems = [
    { href: "/libro-nomina", label: "Libro de Nómina", icon: Users },
    { href: "/libro-horas-extras", label: "Libro de Horas Extras", icon: Timer },
    { href: "/libro-horas-diurnas", label: "Libro de Horas Diurnas", icon: Sun },
    { href: "/libro-horario-nocturno", label: "Libro de Horario Nocturno", icon: Moon },
    { href: "/libro-vacaciones", label: "Libro de Vacaciones", icon: Plane },
    { href: "/libro-cesta-ticket", label: "Libro de Cesta Ticket", icon: ShoppingCart },
    { href: "/libro-personal-retirado", label: "Libro de Personal Retirado", icon: UserX },
];

export const corporativoMenuItems = [
    { href: "/tramites-corporativos", label: "Trámites Corporativos", icon: UserCog },
    { href: "/poderes-representacion", label: "Poderes y Representación", icon: Gavel },
];

export const ingenieriaMenuItems = [
  { href: "/ingenieria-ia", label: "Sistema de Ingeniería (IA)", icon: Cpu },
  { href: "/arquitectura-software-contable", label: "Arquitectura de Software", icon: Puzzle },
  { href: "/analisis-suelo-foto", label: "Análisis de Suelo por Foto", icon: Search },
  { href: "/carta-aval-ingenieria", label: "Carta Aval de Ingeniería", icon: HardHat },
  { href: "/presentacion-startup", label: "Guía para Presentar Startup", icon: Presentation },
  { href: "/estudio-factibilidad-economica", label: "Estudio de Factibilidad", icon: Bot },
  { href: "/analisis-empresa-hibrida", label: "Análisis de Modelos de Negocio", icon: Rocket },
];

export const iaMenuItems = [
  { href: "/soluciones-ia", label: "Soluciones con IA", icon: BrainCircuit },
];

export const generalMenuItems = [
  { href: "/integraciones", label: "Integraciones", icon: RefreshCw },
  { href: "/manual-usuario", label: "Manual de Usuario", icon: BookUser },
  { href: "/tipos-empresa", label: "Tipos de Empresa", icon: BuildingIcon },
  { href: "/organigrama", label: "Organigrama", icon: Network },
  { href: "/sistema-legal-contable", label: "Sistema Legal y Contable", icon: Scale },
  { href: "/analisis-empresas-no-digitales", label: "Empresas No Digitalizadas", icon: SlidersHorizontal },
];

export const marketingMenuItems = [
    { href: "/asesoria", label: "Centro de Asesoría", icon: Megaphone },
    { href: "/asesoria-bolsa-valores", label: "Asesoría de Inversión", icon: CandlestickChart },
    { href: "/propuesta-proyecto", label: "Propuesta de Proyecto", icon: FileText },
    { href: "/marketing-innovador", label: "Marketing Innovador", icon: Sparkles },
    { href: "/visualizacion-datos", label: "Visualización de Datos", icon: AreaChart },
    { href: "/app-aliada-recompensa", label: "Alianzas y Recompensas", icon: Award },
    { href: "/marketing-productos-vs-estrategias", label: "Marketing de Producto", icon: Package },
    { href: "/marketing-ventas", label: "Estrategias de Marketing", icon: TrendingUp },
    { href: "/analisis-mercado", label: "Análisis de Mercado", icon: Search },
    { href: "/analisis-competitivo", label: "Análisis Competitivo", icon: Zap },
];

export const naturalMenuItems = {
    principal: [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/tarjeta-digital", label: "Tarjeta Digital", icon: Contact },
        { href: "/seguridad", label: "Seguridad", icon: Shield },
        { href: "/notificaciones", label: "Notificaciones", icon: Bell },
    ],
    tramites: [
        { href: "/documentos", label: "Mis Documentos", icon: File },
        { href: "/partidas-nacimiento", label: "Partidas de Nacimiento", icon: Heart },
        { href: "/actas-matrimonio", label: "Actas de Matrimonio", icon: FileText },
        { href: "/documentos-judiciales", label: "Documentos Judiciales", icon: Gavel },
        { href: "/antecedentes-penales", label: "Antecedentes Penales", icon: Shield },
    ],
    salud: [
        { href: "/directorio-medico", label: "Directorio Médico", icon: HeartPulse },
    ],
    crs: [
        { href: "/manutencion", label: "Obligación de Manutención", icon: Gavel },
    ],
    parental: [
        { href: "/registro-rif", label: "Registro RIF (Hijos)", icon: FileEdit },
    ]
};

export const sociosNavGroups = [
    { title: "Socios y Holding", icon: Briefcase, items: [
        { href: "/dashboard-socios", label: "Dashboard de Socios", icon: LayoutDashboard },
        { href: "/poderes-representacion", label: "Empresas y Poderes", icon: Gavel },
        { href: "/organigrama", label: "Organigrama", icon: Network },
        { href: "/planes-crecimiento", label: "Planes de Crecimiento", icon: Rocket },
    ] },
];

export const informaticaNavGroups = [
  { title: "Dashboard", icon: LayoutDashboard, items: [ { href: "/dashboard-informatica", label: "Dashboard de IT", icon: LayoutDashboard } ] },
  { title: "Seguridad", icon: Shield, items: [ { href: "/seguridad", label: "Gestión de Accesos", icon: ShieldCheck } ] },
  { title: "Soluciones IA", icon: BrainCircuit, items: iaMenuItems },
  { title: "Arquitectura", icon: Puzzle, items: [ 
      { href: "/arquitectura-software-contable", label: "Arquitectura de Software", icon: Puzzle },
      { href: "/facturacion-futurista", label: "UI/UX Futurista", icon: Wand2 },
  ]},
  { title: "Ingeniería y Proyectos", icon: HardHat, items: ingenieriaMenuItems },
];

export const legalNavGroups = [
  { title: "Departamento Jurídico", icon: Gavel, items: juridicoMainMenuItems },
];

    
