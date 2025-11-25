

'use client';

import { Gavel, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarInset, SidebarHeader, SidebarTrigger, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import {
  naturalMenuItems,
  allJuridicoGroups
} from "@/components/app-sidebar-nav-items";
import { Badge } from "@/components/ui/badge";
import { Logo } from "./logo";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { LanguageSwitcher } from "./language-switcher";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const AppSidebarCorporate = () => {
    const pathname = usePathname();
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                     <div className="flex items-center gap-3">
                        <Logo />
                        <span className="text-xl font-bold">TRAMITEX C.A</span>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Accordion type="multiple" className="w-full">
                        {allJuridicoGroups.map((group) => (
                        <AccordionItem value={group.title} key={group.title} className="border-none">
                            <AccordionTrigger className="px-2 hover:no-underline font-semibold text-base hover:bg-accent rounded-md">
                            <div className="flex items-center gap-3">
                                <group.icon className="h-5 w-5 text-primary" />
                                <span>{group.title}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-0 pt-2">
                            <SidebarMenu>
                                {group.items.map((item) => (
                                <SidebarMenuItem key={`${item.href}-${item.label}`}>
                                    <SidebarMenuButton
                                    asChild
                                    isActive={pathname === item.href}
                                    className="justify-start h-9"
                                    >
                                    <Link href={item.href}>
                                        <item.icon className="h-4 w-4 mr-2" />
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
                <SidebarFooter>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-secondary">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold">Admin</p>
                                    <p className="text-xs text-muted-foreground">admin@tramitex.com</p>
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="mb-2">
                             <DropdownMenuItem asChild><Link href="/settings">Configuración</Link></DropdownMenuItem>
                             <DropdownMenuItem asChild><Link href="/">Cerrar Sesión</Link></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarFooter>
            </Sidebar>
        </SidebarProvider>
    )
}


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
  
  const isLandingPage = pathname === '/';
  if (isLandingPage) return null;

  const checkPathPrefix = (prefixes: string[]) => prefixes.some(prefix => pathname.startsWith(prefix));

  const naturalPaths = ['/login-natural', '/dashboard', '/tarjeta-digital', '/directorio-medico', '/partidas-nacimiento', '/actas-matrimonio', '/documentos-judiciales', '/antecedentes-penales', '/documentos', '/manutencion', '/registro-rif'];
  const corporatePaths = ['/escritorio-juridico', '/departamento-juridico', '/legalizacion-empresa', '/dashboard-empresa', '/dashboard-informatica', '/dashboard-rrhh', '/dashboard-socios', '/analisis-ventas'];

  if (checkPathPrefix(naturalPaths)) {
    return <AppSidebarNatural />;
  }

  // All other corporate dashboards will use this sidebar
  const isCorporateDashboard = !isLandingPage && !checkPathPrefix(naturalPaths);

  if(isCorporateDashboard) {
      return <AppSidebarCorporate />;
  }

  return null;
}
