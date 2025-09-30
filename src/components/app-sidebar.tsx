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
  LayoutDashboard
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
import { Logo } from "./logo";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/book", label: "Libro de Licores", icon: BookCopy },
  { href: "/proformas", label: "Proformas", icon: FileText },
  { href: "/invoices", label: "Facturación", icon: Receipt },
  { href: "/contracts", label: "Contratos", icon: FileSignature },
  { href: "/inventory", label: "Inventario", icon: Boxes },
  { href: "/igtf", label: "IGTF & Exoneraciones", icon: Percent },
  { href: "/credits", label: "Créditos", icon: CreditCard },
  { href: "/notifications", label: "Notificaciones", icon: Bell },
  { href: "/integrations", label: "Integraciones", icon: Settings },
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
        <div className="flex items-center gap-3">
          <Logo />
          <h1 className="text-xl font-semibold font-headline tracking-tight">
            FinTrack
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
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
            <span className="text-sm font-medium">User</span>
            <span className="text-xs text-muted-foreground">
              user@fintrack.com
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
