
'use client';

import { Gavel, User, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarInset, SidebarHeader, SidebarTrigger, SidebarContent, SidebarFooter, useSidebar } from "@/components/ui/sidebar";
import {
  naturalMenuItems,
  allAdminGroups,
  allJuridicoGroups,
  ventasMenuItems,
  recursosHumanosGestionItems,
  librosRegistroMenuItems,
  sociosNavGroups,
  informaticaNavGroups,
} from "@/components/app-sidebar-nav-items";
import { Badge } from "./ui/badge";
import { Logo } from "./logo";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { LanguageSwitcher } from "./language-switcher";
import { cn } from "@/lib/utils";

const AppSidebarCorporate = () => {
    const pathname = usePathname();
    const { state } = useSidebar();

    // Determine current user profile and navigation groups based on path
    const getCorporateProfile = () => {
        if (pathname.startsWith('/dashboard-empresa') || pathname.startsWith('/analisis-ventas') || pathname.startsWith('/dashboard-rrhh')) {
            return {
                navGroups: allAdminGroups,
                user: { name: "Admin", email: "admin@kyron.com", fallback: "A" }
            };
        }
        if (pathname.startsWith('/escritorio-juridico') || pathname.startsWith('/departamento-juridico')) {
            return {
                navGroups: allJuridicoGroups,
                user: { name: "Equipo Legal", email: "legal@kyron.com", fallback: "L" }
            };
        }
         if (pathname.startsWith('/analisis-ventas')) {
             return {
                navGroups: [{ title: 'Ventas', icon: Gavel, items: ventasMenuItems }],
                user: { name: "Equipo de Ventas", email: "ventas@kyron.com", fallback: "V"}
            }
        }
         if (pathname.startsWith('/dashboard-rrhh')) {
             return {
                navGroups: [
                    { title: 'Gestión de RR.HH.', icon: Gavel, items: recursosHumanosGestionItems},
                    { title: 'Libros de Registro', icon: Gavel, items: librosRegistroMenuItems},
                ],
                user: { name: "Recursos Humanos", email: "rrhh@kyron.com", fallback: "RH"}
            }
        }
        if (pathname.startsWith('/dashboard-socios')) {
             return {
                navGroups: sociosNavGroups,
                user: { name: "Socio / Directivo", email: "socio@kyron.com", fallback: "S"}
            }
        }
         if (pathname.startsWith('/dashboard-informatica')) {
             return {
                navGroups: informaticaNavGroups,
                user: { name: "Equipo de IT", email: "it@kyron.com", fallback: "IT"}
            }
        }
        // Fallback to a default corporate profile if no specific path matches
        return {
            navGroups: allAdminGroups,
            user: { name: "Admin", email: "admin@kyron.com", fallback: "A" }
        };
    };

    const { navGroups, user } = getCorporateProfile();

    return (
        <Sidebar>
            <SidebarHeader>
                 <div className="flex items-center gap-3">
                    <Logo />
                    <span className={cn("text-xl font-bold", state === 'collapsed' && 'hidden')}>Kyron</span>
                </div>
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {navGroups.map((group) => (
                        <div key={group.title}>
                            <p className={cn("p-2 text-xs font-semibold text-muted-foreground", state === 'collapsed' && 'hidden')}>{group.title}</p>
                            {group.items.map((item) => (
                                <SidebarMenuItem key={`${item.href}-${item.label}`}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname.startsWith(item.href)}
                                        className="justify-start h-9"
                                        tooltip={item.label}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="h-4 w-4" />
                                            <span className={cn(state === 'collapsed' && 'hidden')}>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </div>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className={cn("flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-secondary", state === 'collapsed' && 'justify-center')}>
                            <Avatar className="h-9 w-9">
                                <AvatarFallback>{user.fallback}</AvatarFallback>
                            </Avatar>
                            <div className={cn("flex-1 overflow-hidden", state === 'collapsed' && 'hidden')}>
                                <p className="text-sm font-semibold truncate">{user.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
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
    const { state } = useSidebar();
    const groupTitles = Object.keys(naturalMenuItems) as (keyof typeof naturalMenuItems)[];

    return (
        <Sidebar>
             <SidebarHeader>
                <div className="flex items-center gap-3">
                    <Logo />
                    <span className={cn("text-xl font-bold", state === 'collapsed' && 'hidden')}>Kyron</span>
                </div>
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
                {groupTitles.map((groupKey) => {
                    const group = naturalMenuItems[groupKey];
                    return (
                        <SidebarMenu key={group.title}>
                            <div className={cn("px-2 font-semibold text-muted-foreground text-sm flex items-center gap-2 mb-2", state === 'collapsed' && 'hidden')}>
                               <group.icon className="h-4 w-4" />
                               <span>{group.title}</span>
                            </div>
                            {group.items.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname.startsWith(item.href)}
                                    tooltip={item.label}
                                >
                                    <Link href={item.href}>
                                    <item.icon className="h-4 w-4" />
                                    <span className={cn(state === 'collapsed' && 'hidden')}>{item.label}</span>
                                     {item.isNew && <Badge variant="outline" className={cn("ml-auto", state === 'collapsed' && 'hidden')}>Nuevo</Badge>}
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
                        <div className={cn("flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-secondary", state === 'collapsed' && 'justify-center')}>
                            <Avatar className="h-9 w-9">
                                <AvatarFallback>UN</AvatarFallback>
                            </Avatar>
                            <div className={cn("flex-1 overflow-hidden", state === 'collapsed' && 'hidden')}>
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
  
  const noSidebarPaths = ['/', '/register'];
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');

  if (isAuthPage) {
    return null;
  }
  if (noSidebarPaths.includes(pathname)) {
      return null;
  }

  const corporatePaths = [
    '/dashboard-empresa',
    '/analisis-ventas',
    '/dashboard-rrhh',
    '/escritorio-juridico',
    '/dashboard-socios',
    '/dashboard-informatica',
    '/asesoria-publicidad',
    '/departamento-juridico',
    ...allAdminGroups.flatMap(g => g.items.map(i => i.href)),
    ...allJuridicoGroups.flatMap(g => g.items.map(i => i.href)),
  ];
  
  const isCorporatePath = corporatePaths.some(p => pathname.startsWith(p) && p !== '/');

  if (isCorporatePath) {
    return <AppSidebarCorporate />;
  }

  // Fallback to natural person sidebar for any other path that is not corporate or landing/auth
  return <AppSidebarNatural />;
}
