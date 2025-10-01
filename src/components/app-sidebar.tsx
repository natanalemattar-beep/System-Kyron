
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Bookmark,
  Timer,
  Plane,
  Moon,
  Sun,
  ShoppingCart,
  UserX,
  Banknote,
  Sparkles,
  Scale,
  Mail,
  Stamp,
  BookUser,
  UserCog,
  ShieldAlert,
  Award,
  TabletSmartphone,
  ClipboardCheck,
  PieChart,
  TrendingUp,
  ShieldQuestion,
  Lightbulb,
  Calendar,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const juridicoMainMenuItems = [
  { href: "/dashboard-juridico", label: "Dashboard", icon: LayoutDashboard },
  { href: "/legalizacion-empresa", label: "Legalización Empresa", icon: Stamp },
  { href: "/registro-rif", label: "Registro RIF", icon: FileEdit },
  { href: "/permisos", label: "Permisos", icon: UserCheck },
  { href: "/autorizaciones", label: "Autorizaciones", icon: Shield },
  { href: "/multas", label: "Multas", icon: AlertTriangle },
  { href: "/recursos-fiscales", label: "Recursos Fiscales", icon: Scale },
  { href: "/cumplimiento", label: "Cumplimiento", icon: ShieldAlert },
];

const finanzasContabilidadMenuItems = [
  { href: "/reports", label: "Reportes Contables", icon: BookOpen },
  { href: "/libros-contables", label: "Libros Contables", icon: BookOpen },
  { href: "/libro-compra-venta", label: "Libro Compra/Venta SENIAT", icon: Landmark },
  { href: "/declaracion-iva", label: "Declaración IVA", icon: FileText },
  { href: "/libro-licores", label: "Libro de Licores", icon: Wine },
  { href: "/islr-arc", label: "ISLR / AR-C", icon: Banknote },
  { href: "/timbres-fiscales", label: "Timbres Fiscales", icon: Stamp },
];

const analisisCrecimientoMenuItems = [
    { href: "/analisis-ventas", label: "Análisis de Ventas", icon: TrendingUp },
    { href: "/estrategias-ventas", label: "Estrategias de Ventas", icon: Lightbulb },
    { href: "/administracion", label: "Análisis FODA", icon: Briefcase },
    { href: "/ferias-eventos", label: "Ferias y Eventos", icon: Calendar },
    { href: "/estructura-costos", label: "Análisis de Costos", icon: PieChart },
    { href: "/analisis-riesgo", label: "Análisis de Riesgo", icon: ShieldQuestion },
    { href: "/solicitud-credito", label: "Análisis para Crédito", icon: CreditCard },
];

const entesReguladoresItems = [
    { href: "/permisos", label: "Permisos Funerarias", icon: Briefcase },
    { href: "/permisos", label: "SUDEASEG", icon: Landmark },
    { href: "/permisos", label: "SUDEBAN", icon: Landmark },
    { href: "/permisos", label: "Colegiaturas Profesionales", icon: Award },
];

const facturacionMenuItems = [
    { href: "/proformas", label: "Proformas", icon: Receipt },
    { href: "/facturacion", label: "Facturación", icon: FileText },
    { href: "/inventario", label: "Inventario", icon: Archive },
    { href: "/punto-de-venta", label: "Punto de Venta", icon: TabletSmartphone },
    { href: "/arqueo-caja", label: "Arqueo de Caja", icon: ClipboardCheck },
    { href: "/igtf", label: "IGTF & Exoneraciones", icon: Percent },
    { href: "/creditos", label: "Créditos", icon: CreditCard },
];

const recursosHumanosMenuItems = [
    { href: "/nominas", label: "Nóminas", icon: Users },
    { href: "/contratos", label: "Contratos", icon: FileSignature },
    { href: "/ivss", label: "IVSS (14-01, 14-02)", icon: Briefcase },
    { href: "/desarrollo-profesional", label: "Desarrollo Profesional", icon: Sparkles },
    { href: "/clasificacion-empleados", label: "Clasificación Empleados", icon: Award },
    { href: "/tramites-corporativos", label: "Trámites Corporativos", icon: UserCog },
    { href: "/modelos-cartas", label: "Modelos de Cartas", icon: Mail },
];

const librosRegistroMenuItems = [
    { href: "/libro-nomina", label: "Libro de Nómina", icon: Users },
    { href: "/libro-horas-extras", label: "Libro Horas Extras", icon: Timer },
    { href: "/libro-vacaciones", label: "Libro de Vacaciones", icon: Plane },
    { href: "/libro-horario-nocturno", label: "Libro Horario Nocturno", icon: Moon },
    { href: "/libro-horas-diurnas", label: "Libro Horas Diurnas", icon: Sun },
    { href: "/libro-cesta-ticket", label: "Libro Cesta Ticket", icon: ShoppingCart },
    { href: "/libro-personal-retirado", label: "Libro Personal Retirado", icon: UserX },
]

const generalMenuItems = [
  { href: "/notificaciones", label: "Notificaciones", icon: Bell },
  { href: "/integraciones", label: "Integraciones", icon: Cog },
  { href: "/manual-usuario", label: "Manual de Usuario", icon: BookUser },
];

const naturalMenuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/documentos", label: "Documentos", icon: File },
  { href: "/partidas-nacimiento", label: "Partidas de Nacimiento", icon: Heart },
  { href: "/actas-matrimonio", label: "Actas de Matrimonio", icon: FileText },
  { href: "/documentos-judiciales", label: "Documentos Judiciales", icon: Gavel },
  { href: "/antecedentes-penales", label: "Antecedentes Penales", icon: Shield },
  { href: "/notificaciones", label: "Notificaciones", icon: Bell },
  { href: "/manual-usuario", label: "Manual de Usuario", icon: BookUser },
];


export function AppSidebar() {
  const pathname = usePathname();
  
  const isJuridicoPath = (path: string) => {
    const naturalPaths = naturalMenuItems.map(item => item.href);
    if (path === '/dashboard') return false; // This is the natural dashboard
    if (naturalPaths.some(p => p !== '/dashboard' && path.startsWith(p))) return false;
    
    // Check for specific juridico paths to be sure
    const juridicoPaths = [
        ...juridicoMainMenuItems.map(item => item.href),
        ...finanzasContabilidadMenuItems.map(item => item.href),
        ...facturacionMenuItems.map(item => item.href),
        ...recursosHumanosMenuItems.map(item => item.href),
        ...librosRegistroMenuItems.map(item => item.href),
        ...generalMenuItems.map(item => item.href),
        ...entesReguladoresItems.map(item => item.href),
        ...analisisCrecimientoMenuItems.map(item => item.href),
        '/declaracion-iva',
    ];

    if (juridicoPaths.some(p => path.startsWith(p))) return true;

    // Fallback for pages that could be either, like /notificaciones
    // A more robust solution might be needed if ambiguity increases.
    // For now, if it's not explicitly natural, assume juridico if not on a natural page.
    return true;
  }
  
  const isJuridico = isJuridicoPath(pathname);

  if (!isJuridico) {
    return <AppSidebarNatural />;
  }


  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
           <div className="bg-purple-600 text-white p-2 rounded-lg">
              <Gavel className="h-6 w-6" />
            </div>
          <div className="flex flex-col">
              <h1 className="text-lg font-bold tracking-tight text-sidebar-foreground">
                System C.R.S
              </h1>
              <p className="text-xs text-sidebar-foreground/70">Plataforma Digital Oficial</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2"><Gavel className="h-4 w-4"/>Jurídico</SidebarGroupLabel>
          <SidebarMenu>
            {juridicoMainMenuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
                  className="justify-start"
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2"><Landmark className="h-4 w-4"/>Entes Reguladores</SidebarGroupLabel>
            <SidebarMenu>
                {entesReguladoresItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                    className="justify-start"
                    >
                    <Link href={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
        
        <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2"><BookOpen className="h-4 w-4"/>Finanzas y Contabilidad</SidebarGroupLabel>
            <SidebarMenu>
                {finanzasContabilidadMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                    className="justify-start"
                    >
                    <Link href={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2"><TrendingUp className="h-4 w-4"/>Análisis y Crecimiento</SidebarGroupLabel>
            <SidebarMenu>
                {analisisCrecimientoMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                    className="justify-start"
                    >
                    <Link href={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2"><FileText className="h-4 w-4"/>Facturación</SidebarGroupLabel>
            <SidebarMenu>
                {facturacionMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                    className="justify-start"
                    >
                    <Link href={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
         <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2"><Briefcase className="h-4 w-4"/>Recursos Humanos</SidebarGroupLabel>
            <SidebarMenu>
                {recursosHumanosMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                    className="justify-start"
                    >
                    <Link href={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2"><BookOpen className="h-4 w-4"/>Libros de Registro</SidebarGroupLabel>
            <SidebarMenu>
                {librosRegistroMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                    className="justify-start"
                    >
                    <Link href={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
             <SidebarGroupLabel className="flex items-center gap-2"><Cog className="h-4 w-4"/>General</SidebarGroupLabel>
            <SidebarMenu>
                {generalMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                    className="justify-start"
                    >
                    <Link href={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <Separator className="my-2 bg-sidebar-border" />
        <div className="flex items-center gap-3 px-2 py-1">
          <Avatar className="h-9 w-9">
            <AvatarFallback>E</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Empresa S.A.</span>
            <span className="text-xs text-muted-foreground">
              J-12345678-9
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}


function AppSidebarNatural() {
  const pathname = usePathname();
  const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar");

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
           <div className="bg-purple-600 text-white p-2 rounded-lg">
              <User className="h-6 w-6" />
            </div>
          <div className="flex flex-col">
              <h1 className="text-lg font-bold tracking-tight text-sidebar-foreground">
                System C.R.S
              </h1>
              <p className="text-xs text-sidebar-foreground/70">Plataforma Digital Oficial</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2"><User className="h-4 w-4"/>Natural</SidebarGroupLabel>
          <SidebarMenu>
            {naturalMenuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.href)}
                  tooltip={item.label}
                  className="justify-start"
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <Separator className="my-2 bg-sidebar-border" />
        <div className="flex items-center gap-3 px-2 py-1">
          <Avatar className="h-9 w-9">
            {userAvatar && (
              <AvatarImage
                src={userAvatar.imageUrl}
                alt={userAvatar.description}
                data-ai-hint={userAvatar.imageHint}
              />
            )}
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Usuario Natural</span>
            <span className="text-xs text-muted-foreground">
              V-12345678
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
