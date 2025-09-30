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

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

const naturalMenuItems = [
  { href: "/documentos", label: "Documentos", icon: File },
  { href: "/partidas-nacimiento", label: "Partidas de Nacimiento", icon: Heart },
  { href: "/actas-matrimonio", label: "Actas de Matrimonio", icon: FileText },
  { href: "/documentos-judiciales", label: "Documentos Judiciales", icon: Gavel },
  { href: "/antecedentes-penales", label: "Antecedentes Penales", icon: Shield },
  { href: "/notificaciones", label: "Notificaciones", icon: Bell },
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
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2"><User className="h-4 w-4"/>Natural</SidebarGroupLabel>
          <SidebarMenu>
            {naturalMenuItems.map((item) => (
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