

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
  Mail,
  Puzzle,
  Layers,
  BarChart,
  Ship,
  BrainCircuit,
  ShieldCheck,
  RefreshCw,
  ShieldAlert,
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const juridicoMainMenuItems = [
  { href: "/dashboard-juridico", label: "Dashboard", icon: LayoutDashboard },
  { href: "/legalizacion-empresa", label: "Legalización Empresa", icon: Gavel },
  { href: "/registro-rif", label: "Registro RIF", icon: FileEdit },
  { href: "/permisos", label: "Trámites y Permisos", icon: UserCheck },
  { href: "/autorizaciones", label: "Autorizaciones", icon: Shield },
  { href: "/multas", label: "Multas", icon: AlertTriangle },
];

const finanzasContabilidadMenuItems = [
  { href: "/reports", label: "Reportes Contables", icon: BookOpen },
  { href: "/libros-contables", label: "Libros Contables", icon: BookOpen },
  { href: "/libro-compra-venta", label: "Libro Compra/Venta SENIAT", icon: Landmark },
  { href: "/declaracion-iva", label: "Declaración IVA", icon: FileText },
  { href: "/cumplimiento", label: "Cumplimiento Normativo", icon: ShieldAlert },
  { href: "/cumplimiento-fiscal", label: "Cumplimiento Fiscal", icon: ShieldCheck },
  { href: "/cuentas-bancarias", label: "Cuentas Bancarias", icon: Landmark },
  { href: "/seguros", label: "Seguros", icon: ShieldCheck },
  { href: "/libro-licores", label: "Libro de Licores", icon: Wine },
  { href: "/presupuesto", label: "Presupuesto", icon: PieChart },
];

const analisisCrecimientoMenuItems = [
    { href: "/analisis-ventas", label: "Análisis de Ventas", icon: TrendingUp },
    { href: "/analisis-mercado", label: "Análisis de Mercado", icon: BarChart },
    { href: "/estrategias-ventas", label: "Estrategias de Ventas", icon: Lightbulb },
    { href: "/analisis-foda", label: "Análisis FODA", icon: Briefcase },
    { href: "/asesoria-publicidad", label: "Asesoría y Ventas", icon: Megaphone },
    { href: "/ferias-eventos", label: "Ferias y Eventos", icon: Calendar },
    { href: "/estructura-costos", label: "Análisis de Costos", icon: PieChart },
    { href: "/analisis-riesgo", label: "Análisis de Riesgo", icon: ShieldQuestion },
    { href: "/solicitud-credito", label: "Análisis para Crédito", icon: CreditCard },
    { href: "/software-contable", label: "Software Contable y ERP", icon: Puzzle },
];

const facturacionMenuItems = [
    { href: "/proformas", label: "Proformas", icon: Receipt },
    { href: "/facturacion", label: "Facturación", icon: FileText },
    { href: "/inventario", label: "Inventario", icon: Archive },
    { href: "/importaciones", label: "Importaciones", icon: Ship },
    { href: "/punto-de-venta", label: "Punto de Venta", icon: TabletSmartphone },
    { href: "/cuentas-por-cobrar", label: "Cuentas por Cobrar", icon: Wallet },
    { href: "/cuentas-por-pagar", label: "Cuentas por Pagar", icon: HandCoins },
    { href: "/arqueo-caja", label: "Arqueo de Caja", icon: ClipboardCheck },
    { href: "/igtf", label: "IGTF & Exoneraciones", icon: Percent },
    { href: "/creditos", label: "Líneas de Crédito", icon: CreditCard },
    { href: "/archivo-digital", label: "Archivo Digital", icon: Archive },
];

const recursosHumanosMenuItems = [
    { href: "/nominas", label: "Nóminas", icon: Users },
    { href: "/contratos", label: "Contratos", icon: FileSignature },
    { href: "/tramites-corporativos", label: "Trámites Corporativos", icon: UserCog },
    { href: "/poderes-representacion", label: "Poderes y Representación", icon: Gavel },
    { href: "/proteccion-pensiones", label: "Protección de Pensiones", icon: Shield },
    { href: "/islr-arc", label: "ISLR / AR-C", icon: Banknote },
    { href: "/ivss", label: "Gestión IVSS", icon: Briefcase },
    { href: "/clasificacion-empleados", label: "Clasificación de Empleados", icon: Users },
    { href: "/modelos-cartas", label: "Modelos de Cartas", icon: Mail },
    { href: "/desarrollo-profesional", label: "Desarrollo Profesional", icon: TrendingUp },
];

const librosRegistroMenuItems = [
    { href: "/libro-nomina", label: "Libro de Nómina", icon: Users },
    { href: "/libro-horas-extras", label: "Libro de Horas Extras", icon: Timer },
    { href: "/libro-horas-diurnas", label: "Libro de Horas Diurnas", icon: Sun },
    { href: "/libro-horario-nocturno", label: "Libro de Horario Nocturno", icon: Moon },
    { href: "/libro-vacaciones", label: "Libro de Vacaciones", icon: Plane },
    { href: "/libro-cesta-ticket", label: "Libro de Cesta Ticket", icon: ShoppingCart },
    { href: "/libro-personal-retirado", label: "Libro de Personal Retirado", icon: UserX },
];


const generalMenuItems = [
  { href: "/notificaciones", label: "Notificaciones", icon: Bell },
  { href: "/integraciones", label: "Integraciones", icon: Cog },
  { href: "/manual-usuario", label: "Manual de Usuario", icon: BookUser },
  { href: "/tipos-empresa", label: "Tipos de Empresa", icon: BuildingIcon },
];

const iaMenuItems = [
  { href: "/soluciones-ia", label: "Soluciones con IA", icon: BrainCircuit },
];

const naturalMenuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/documentos", label: "Documentos", icon: File },
  { href: "/partidas-nacimiento", label: "Partidas de Nacimiento", icon: Heart },
  { href: "/actas-matrimonio", label: "Actas de Matrimonio", icon: FileText },
  { href: "/documentos-judiciales", label: "Documentos Judiciales", icon: Gavel },
  { href: "/manutencion", label: "Gestión Integral CRS", icon: HeartHandshake },
  { href: "/antecedentes-penales", label: "Antecedentes Penales", icon: Shield },
  { href: "/seguridad", label: "Seguridad", icon: Shield },
  { href: "/notificaciones", label: "Notificaciones", icon: Bell },
];

const navGroups = [
    { title: "Jurídico", icon: Gavel, items: juridicoMainMenuItems },
    { title: "Finanzas y Contabilidad", icon: BookOpen, items: finanzasContabilidadMenuItems },
    { title: "Análisis y Crecimiento", icon: TrendingUp, items: analisisCrecimientoMenuItems },
    { title: "Soluciones con IA", icon: BrainCircuit, items: iaMenuItems },
    { title: "Facturación", icon: FileText, items: facturacionMenuItems },
    { title: "Recursos Humanos", icon: Briefcase, items: recursosHumanosMenuItems },
    { title: "Libros de Registro", icon: BookOpen, items: librosRegistroMenuItems },
    { title: "General", icon: Cog, items: generalMenuItems },
];


export function AppSidebar() {
  const pathname = usePathname();
  
  const isJuridicoPath = (path: string) => {
    const naturalPaths = naturalMenuItems.map(item => item.href);
    if (path === '/dashboard') return false; // This is the natural dashboard
    if (naturalPaths.some(p => p !== '/dashboard' && path.startsWith(p))) return false;
    
    const juridicoPaths = navGroups.flatMap(g => g.items.map(i => i.href));

    if (juridicoPaths.some(p => path.startsWith(p))) return true;

    // Default to juridico for root and other non-specified paths
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
           <div className="bg-primary text-primary-foreground p-2 rounded-lg">
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
      <SidebarContent className="p-0">
        <Accordion type="multiple" className="w-full">
            {navGroups.map((group) => (
                <AccordionItem value={group.title} key={group.title} className="border-none">
                    <AccordionTrigger className="px-2 hover:no-underline hover:bg-sidebar-accent text-sidebar-foreground/70">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <group.icon className="h-4 w-4" />
                            {group.title}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                        <SidebarMenu className="pl-4 border-l border-sidebar-border ml-4 py-2">
                            {group.items.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton
                                asChild
                                isActive={pathname.startsWith(item.href)}
                                tooltip={item.label}
                                className="justify-start h-8"
                                >
                                <Link href={item.href}>
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.label}</span>
                                </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
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
           <div className="bg-primary text-primary-foreground p-2 rounded-lg">
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
