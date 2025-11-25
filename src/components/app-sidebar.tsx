

'use client';

import { Gavel, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarInset, SidebarHeader, SidebarTrigger, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import {
  naturalMenuItems,
  allJuridicoGroups,
} from "@/components/app-sidebar-nav-items";
import { Badge } from "./ui/badge";
import { Logo } from "./logo";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { LanguageSwitcher } from "./language-switcher";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const AppSidebarCorporate = () => {
    const pathname = usePathname();

    const isLegalPath = pathname.startsWith('/escritorio-juridico') || pathname.startsWith('/departamento-juridico') || pathname.startsWith('/login-juridico');

    const userProfile = isLegalPath
      ? { name: "Equipo Legal", email: "legal@tramitex.com", fallback: "L" }
      : { name: "Admin", email: "admin@tramitex.com", fallback: "A" };

    return (
        <Sidebar>
            <SidebarHeader>
                 <div className="flex items-center gap-3">
                    <Logo />
                    <span className="text-xl font-bold">TRAMITEX C.A</span>
                </div>
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
                <Accordion type="multiple" className="w-full">
                    {allJuridicoGroups.map((group) => (
                    <AccordionItem value={group.title} key={group.title} className="border-none">
                        <AccordionTrigger className="px-2 hover:no-underline font-semibold text-muted-foreground text-sm hover:bg-accent rounded-md">
                        <div className="flex items-center gap-2">
                            <group.icon className="h-4 w-4" />
                            <span>{group.title}</span>
                        </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-0 pt-1">
                        <SidebarMenu>
                            {group.items.map((item) => (
                            <SidebarMenuItem key={`${item.href}-${item.label}`}>
                                <SidebarMenuButton
                                asChild
                                isActive={pathname.startsWith(item.href)}
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
                                <AvatarFallback>{userProfile.fallback}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-semibold truncate">{userProfile.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{userProfile.email}</p>
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="mb-2 w-56">
                         <DropdownMenuItem asChild><Link href="/general">Configuración</Link></DropdownMenuItem>
                         <DropdownMenuItem asChild><Link href="/">Cerrar Sesión</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

const AppSidebarNatural = () => {
    const pathname = usePathname();
    const groupTitles = Object.keys(naturalMenuItems) as (keyof typeof naturalMenuItems)[];

    return (
        <Sidebar>
             <SidebarHeader>
                <div className="flex items-center gap-3">
                    <Logo />
                    <span className="text-xl font-bold">TRAMITEX</span>
                </div>
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
                {groupTitles.map((groupKey) => {
                    const group = naturalMenuItems[groupKey];
                    return (
                        <SidebarMenu key={group.title}>
                            <div className="px-2 font-semibold text-muted-foreground text-sm flex items-center gap-2 mb-2">
                               <group.icon className="h-4 w-4" />
                               <span>{group.title}</span>
                            </div>
                            {group.items.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname.startsWith(item.href)}
                                >
                                    <Link href={item.href}>
                                    <item.icon className="h-4 w-4 mr-2" />
                                    <span>{item.label}</span>
                                     {item.isNew && <Badge variant="outline" className="ml-auto">Nuevo</Badge>}
                                    </Link>
                                </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    )
                })}
             </SidebarContent>
             <SidebarFooter>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-secondary">
                            <Avatar className="h-9 w-9">
                                <AvatarFallback>UN</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-semibold truncate">Usuario Natural</p>
                                <p className="text-xs text-muted-foreground truncate">usuario@email.com</p>
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="mb-2 w-56">
                         <DropdownMenuItem asChild><Link href="/general">Configuración</Link></DropdownMenuItem>
                         <DropdownMenuItem asChild><Link href="/">Cerrar Sesión</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarFooter>
        </Sidebar>
    );
};

export function AppSidebar() {
  const pathname = usePathname();
  
  if (pathname === '/') return null;

  const checkPathPrefix = (prefixes: string[]) => prefixes.some(prefix => pathname.startsWith(prefix));

  const naturalPaths = [
    '/login-natural', 
    '/register/natural', 
    '/dashboard', 
    '/tarjeta-digital', 
    '/seguridad',
    '/notificaciones',
    '/documentos', 
    '/partidas-nacimiento', 
    '/actas-matrimonio', 
    '/documentos-judiciales',
    '/antecedentes-penales',
    '/manutencion',
    '/registro-rif',
    '/directorio-medico'
  ];

  if (checkPathPrefix(naturalPaths)) {
    return <AppSidebarNatural />;
  }
  
  return <AppSidebarCorporate />;
}
