

'use client';

import { Gavel, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import {
  naturalMenuItems
} from "@/components/app-sidebar-nav-items";
import { Badge } from "@/components/ui/badge";

const AppSidebarJuridicoPrincipal = () => (
  <Sidebar>
  </Sidebar>
);

const AppSidebarNatural = () => {
    const pathname = usePathname();
    return (
        <Sidebar>
            <SidebarMenu>
              {naturalMenuItems.principal.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

             <SidebarMenu>
                <div className="px-2 font-semibold text-muted-foreground text-sm">Trámites Civiles</div>
                {naturalMenuItems.tramites.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                            asChild
                            isActive={pathname.startsWith(item.href)}
                        >
                            <Link href={item.href}>
                            <item.icon />
                            <span>{item.label}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
             </SidebarMenu>
             <SidebarMenu>
                <div className="px-2 font-semibold text-muted-foreground text-sm">Salud</div>
                 {naturalMenuItems.salud.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                            asChild
                            isActive={pathname.startsWith(item.href)}
                        >
                            <Link href={item.href}>
                            <item.icon />
                            <span>{item.label}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
            <SidebarMenu>
                <div className="px-2 font-semibold text-muted-foreground text-sm">Obligaciones (LOPNNA)</div>
                 {naturalMenuItems.crs.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                            asChild
                            isActive={pathname.startsWith(item.href)}
                        >
                            <Link href={item.href}>
                            <item.icon />
                            <span>{item.label}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                 {naturalMenuItems.parental.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                            asChild
                            isActive={pathname.startsWith(item.href)}
                        >
                            <Link href={item.href}>
                            <item.icon />
                            <span>{item.label}</span>
                             <Badge variant="outline" className="ml-auto">Nuevo</Badge>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </Sidebar>
    );
};

export function AppSidebar() {
  const pathname = usePathname();
  
  const checkPathPrefix = (prefixes: string[]) => prefixes.some(prefix => pathname.startsWith(prefix));

  const isNaturalPath = checkPathPrefix(['/login-natural', '/dashboard', '/tarjeta-digital', '/directorio-medico', '/partidas-nacimiento', '/actas-matrimonio', '/documentos-judiciales', '/antecedentes-penales', '/documentos', '/manutencion', '/registro-rif']);

  const isJuridicoPath = checkPathPrefix(['/escritorio-juridico', '/departamento-juridico', '/legalizacion-empresa']);

  if (isNaturalPath) return <AppSidebarNatural />;
  if (isJuridicoPath) return <AppSidebarJuridicoPrincipal />;

  // Default sidebar for main corporate management
  return null;
}
