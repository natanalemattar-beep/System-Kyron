
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
  Bot,
  Scale,
  Stamp,
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
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Logo } from "@/components/logo";

const juridicoMainMenuItems = [
  { href: "/dashboard-juridico", label: "Dashboard", icon: LayoutDashboard },
  { href: "/legalizacion-empresa", label: "Legalización Empresa", icon: Gavel },
  { href: "/registro-rif", label: "Registro RIF", icon: FileEdit },
  { href: "/permisos", label: "Trámites y Permisos", icon: UserCheck },
  { href: "/autorizaciones", label: "Autorizaciones", icon: Shield },
  { href: "/multas", label: "Multas", icon: AlertTriangle },
  { href: "/recursos-fiscales", label: "Recursos Fiscales", icon: Scale },
];

const finanzasContabilidadMenuItems = [
  { href: "/reports", label: "Reportes Contables", icon: BarChart },
  { href: "/libros-contables", label: "Libros Contables", icon: BookOpen },
  { href: "/libro-compra-venta", label: "Libro Compra/Venta SENIAT", icon: Landmark },
  { href: "/declaracion-iva", label: "Declaración IVA", icon: FileText },
  { href: "/cumplimiento", label: "Cumplimiento Normativo", icon: ShieldAlert },
  { href: "/cumplimiento-fiscal", label: "Cumplimiento Fiscal", icon: ShieldCheck },
  { href: "/cuentas-bancarias", label: "Cuentas Bancarias", icon: Landmark },
  { href: "/seguros", label: "Seguros", icon: ShieldCheck },
  { href: "/libro-licores", label: "Libro de Licores", icon: Wine },
  { href: "/presupuesto", label: "Presupuesto", icon: PieChart },
  { href: "/timbres-fiscales", label: "Timbres Fiscales", icon: Stamp },
];

const analisisCrecimientoMenuItems = [
    { href: "/analisis-ventas", label: "Análisis de Ventas", icon: TrendingUp },
    { href: "/analisis-mercado", label: "Análisis de Mercado", icon: BarChart },
    { href: "/estrategias-ventas", label: "Estrategias de Ventas", icon: Lightbulb },
    { href: "/analisis-estrategico", label: "Análisis Estratégico", icon: Briefcase },
    { href: "/asesoria-publicidad", label: "Asesoría y Ventas", icon: Megaphone },
    { href: "/ferias-eventos", label: "Ferias y Eventos", icon: Calendar },
    { href: "/estructura-costos", label: "Análisis de Costos", icon: PieChart },
    { href: "/analisis-riesgo", label: "Análisis de Riesgo", icon: ShieldQuestion },
    { href: "/solicitud-credito", label: "Análisis para Crédito", icon: CreditCard },
    { href: "/software-contable", label: "Software Contable y ERP", icon: Puzzle },
    { href: "/soluciones-empresariales-ia", label: "Soluciones Empresariales IA", icon: Bot },
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

const recursosHumanosGestionItems = [
    { href: "/dashboard-rrhh", label: "Dashboard RR.HH.", icon: LayoutDashboard },
    { href: "/nominas", label: "Nóminas", icon: Users },
    { href: "/contratos", label: "Contratos", icon: FileSignature },
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

const corporativoMenuItems = [
    { href: "/tramites-corporativos", label: "Trámites Corporativos", icon: UserCog },
    { href: "/poderes-representacion", label: "Poderes y Representación", icon: Gavel },
];

const generalMenuItems = [
  { href: "/notificaciones", label: "Notificaciones", icon: Bell },
  { href: "/integraciones", label: "Integraciones", icon: RefreshCw },
  { href: "/manual-usuario", label: "Manual de Usuario", icon: BookUser },
  { href: "/tipos-empresa", label: "Tipos de Empresa", icon: BuildingIcon },
];

const iaMenuItems = [
  { href: "/soluciones-ia", label: "Soluciones con IA", icon: BrainCircuit },
];

const naturalMenuItems = {
    principal: [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
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
    crs: [
        { href: "/manutencion", label: "Gestión Integral CRS", icon: HeartHandshake },
    ]
};


const juridicoNavGroups = [
    { title: "Jurídico", icon: Gavel, items: juridicoMainMenuItems },
    { title: "Finanzas y Contabilidad", icon: BookOpen, items: finanzasContabilidadMenuItems },
    { title: "Análisis y Crecimiento", icon: TrendingUp, items: analisisCrecimientoMenuItems },
    { title: "Soluciones con IA", icon: BrainCircuit, items: iaMenuItems },
    { title: "Facturación", icon: FileText, items: facturacionMenuItems },
    { title: "General", icon: Cog, items: generalMenuItems },
];


export function AppSidebar() {
  const pathname = usePathname();
  
  const isHrPath = (path: string) => path.startsWith('/login-rrhh') || path.startsWith('/dashboard-rrhh') || librosRegistroMenuItems.some(item => path.startsWith(item.href)) || recursosHumanosGestionItems.some(item => path.startsWith(item.href)) || corporativoMenuItems.some(item => path.startsWith(item.href));
  const isNaturalPath = (path: string) => Object.values(naturalMenuItems).flat().some(item => path.startsWith(item.href)) && !juridicoMainMenuItems.some(item => path.startsWith(item.href)) && !isHrPath(path);
  
  if (isHrPath(pathname)) {
    return <AppSidebarHr />;
  }
  
  if (isNaturalPath(pathname)) {
    return <AppSidebarNatural />;
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
          <Logo />
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight">System</span>
            <span className="text-lg font-bold leading-tight -mt-1">C.M.S</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
          <Accordion type="multiple" className="w-full">
            {juridicoNavGroups.map((group) => (
              <AccordionItem value={group.title} key={group.title} className="border-none">
                <AccordionTrigger className="px-2 hover:no-underline text-muted-foreground font-medium text-sm hover:bg-accent rounded-md">
                   <div className="flex items-center gap-2">
                      <group.icon className="h-4 w-4" />
                      {group.title}
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                   <SidebarMenu className="pl-4 border-l ml-4 py-2">
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
        <Separator className="my-2" />
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

  const naturalNavGroups = [
      { title: "Principal", icon: User, items: naturalMenuItems.principal },
      { title: "Trámites Civiles", icon: Gavel, items: naturalMenuItems.tramites },
      { title: "Gestión CRS", icon: HeartHandshake, items: naturalMenuItems.crs },
  ];
  
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
           <Logo />
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight">System</span>
            <span className="text-lg font-bold leading-tight -mt-1">C.M.S</span>
          </div>
        </div>
      </SidebarHeader>
       <SidebarContent className="p-2">
          <Accordion type="multiple" className="w-full">
            {naturalNavGroups.map((group) => (
              <AccordionItem value={group.title} key={group.title} className="border-none">
                <AccordionTrigger className="px-2 hover:no-underline text-muted-foreground font-medium text-sm hover:bg-accent rounded-md">
                   <div className="flex items-center gap-2">
                      <group.icon className="h-4 w-4" />
                      {group.title}
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                   <SidebarMenu className="pl-4 border-l ml-4 py-2">
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive(item.href)}
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
        <Separator className="my-2" />
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

function AppSidebarHr() {
  const pathname = usePathname();

  const navGroups = [
    { title: "Gestión", icon: Briefcase, items: recursosHumanosGestionItems },
    { title: "Corporativo", icon: BuildingIcon, items: corporativoMenuItems },
    { title: "Libros de Registro", icon: BookOpen, items: librosRegistroMenuItems },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
           <Logo />
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight">System</span>
            <span className="text-lg font-bold leading-tight -mt-1">C.M.S</span>
          </div>
        </div>
      </SidebarHeader>
       <SidebarContent className="p-2">
        <Accordion type="multiple" className="w-full">
            {navGroups.map((group) => (
              <AccordionItem value={group.title} key={group.title} className="border-none">
                <AccordionTrigger className="px-2 hover:no-underline text-muted-foreground font-medium text-sm hover:bg-accent rounded-md">
                   <div className="flex items-center gap-2">
                       <group.icon className="h-4 w-4" />
                      {group.title}
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                   <SidebarMenu className="pl-4 border-l ml-4 py-2">
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
        <Separator className="my-2" />
        <div className="flex items-center gap-3 px-2 py-1">
          <Avatar className="h-9 w-9">
            <AvatarFallback>RH</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Usuario RR.HH.</span>
            <span className="text-xs text-muted-foreground">
              Empresa S.A.
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
