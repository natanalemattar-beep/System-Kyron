"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookCopy,
  FileText,
  Receipt,
  FileSignature,
  Boxes,
  Percent,
  CreditCard,
  Bell,
  Settings,
  LayoutDashboard,
  Landmark,
  FileBadge,
  UserCheck,
  FileWarning,
  BookOpen,
  DollarSign,
  Gavel
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
import { Logo } from "./logo";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/registro-rif", label: "Registro RIF", icon: FileBadge },
  { href: "/permisos", label: "Permisos", icon: UserCheck },
  { href: "/autorizaciones", label: "Autorizaciones", icon: Landmark },
  { href: "/multas", label: "Multas", icon: FileWarning },
  { href: "/contabilidad", label: "Contabilidad", icon: BookOpen },
  { href: "/libros-contables", label: "Libros Contables", icon: BookCopy },
  { href: "/libro-compra-venta", label: "Libro Compra/Venta SENIAT", icon: Receipt },
  { href: "/libro-de-licores", label: "Libro de Licores", icon: BookCopy },
  { href: "/proformas", label: "Proformas", icon: FileText },
  { href: "/facturacion", label: "Facturación", icon: Receipt },
  { href: "/contratos", label: "Contratos", icon: FileSignature },
  { href: "/inventario", label: "Inventario", icon: Boxes },
  { href: "/igtf", label: "IGTF & Exoneraciones", icon: Percent },
  { href: "/creditos", label: "Créditos", icon: CreditCard },
  { href: "/notificaciones", label: "Notificaciones", icon: Bell },
  { href: "/integraciones", label: "Integraciones", icon: Settings },
];

export function AppSidebar() {
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
      <SidebarContent className="p-0">
        <SidebarGroup>
          <SidebarGroupLabel>Jurídico</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref legacyBehavior>
                  <SidebarMenuButton
                    as="a"
                    isActive={isActive(item.href)}
                    tooltip={item.label}
                    className="justify-start"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
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
            <span className="text-sm font-medium">Empresa Activa</span>
            <span className="text-xs text-muted-foreground">
              J-12345678-9
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
