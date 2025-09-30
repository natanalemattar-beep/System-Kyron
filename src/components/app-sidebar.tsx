
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
  UserCheck
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

const mainMenuItems = [
  { href: "/dashboard-juridico", label: "Dashboard", icon: LayoutDashboard },
  { href: "/registro-rif", label: "Registro RIF", icon: FileEdit },
  { href: "/permisos", label: "Permisos", icon: UserCheck },
  { href: "/autorizaciones", label: "Autorizaciones", icon: Shield },
  { href: "/multas", label: "Multas", icon: AlertTriangle },
];

const contabilidadMenuItems = [
  { href: "/contabilidad", label: "Contabilidad", icon: BookOpen },
  { href: "/libros-contables", label: "Libros Contables", icon: BookOpen },
  { href: "/libro-compra-venta", label: "Libro Compra/Venta SENIAT", icon: Landmark },
  { href: "/libro-licores", label: "Libro de Licores", icon: Gavel },
];

const facturacionMenuItems = [
    { href: "/proformas", label: "Proformas", icon: Receipt },
    { href: "/facturacion", label: "Facturación", icon: FileText },
    { href: "/contratos", label: "Contratos", icon: FileSignature },
    { href: "/inventario", label: "Inventario", icon: Archive },
    { href: "/igtf", label: "IGTF & Exoneraciones", icon: Percent },
    { href: "/creditos", label: "Créditos", icon: CreditCard },
];

const generalMenuItems = [
  { href: "/notificaciones", label: "Notificaciones", icon: Bell },
  { href: "/integraciones", label: "Integraciones", icon: Cog },
];


export function AppSidebar() {
  const pathname = usePathname();
  const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar");

  const isActive = (href: string) => {
    if (href === "/dashboard-juridico" || href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };
  
  const isJuridico = pathname.startsWith('/dashboard-juridico');
  const isNatural = pathname.startsWith('/dashboard');

  if (isNatural) {
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
                GobiernaVE
              </h1>
              <p className="text-xs text-sidebar-foreground/70">Plataforma Digital Oficial</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2"><Gavel className="h-4 w-4"/>Jurídico</SidebarGroupLabel>
          <SidebarMenu>
            {mainMenuItems.map((item) => (
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
        
        <SidebarGroup>
            <SidebarMenu>
                {contabilidadMenuItems.map((item) => (
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
        <SidebarGroup>
            <SidebarMenu>
                {facturacionMenuItems.map((item) => (
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
        <SidebarGroup>
            <SidebarMenu>
                {generalMenuItems.map((item) => (
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
            <AvatarFallback>J</AvatarFallback>
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

    const naturalMenuItems = [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/documentos", label: "Documentos", icon: File },
      { href: "/partidas-nacimiento", label: "Partidas de Nacimiento", icon: Heart },
      { href: "/actas-matrimonio", label: "Actas de Matrimonio", icon: FileText },
      { href: "/documentos-judiciales", label: "Documentos Judiciales", icon: Gavel },
      { href: "/antecedentes-penales", label: "Antecedentes Penales", icon: Shield },
      { href: "/notificaciones", label: "Notificaciones", icon: Bell },
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
           <div className="bg-purple-600 text-white p-2 rounded-lg">
              <Gavel className="h-6 w-6" />
            </div>
          <div className="flex flex-col">
              <h1 className="text-lg font-bold tracking-tight text-sidebar-foreground">
                GobiernaVE
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
