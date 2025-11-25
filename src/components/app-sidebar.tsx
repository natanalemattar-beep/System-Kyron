
'use client';

import { Gavel, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarInset, SidebarHeader, SidebarTrigger, SidebarContent, SidebarFooter, useSidebar } from "@/components/ui/sidebar";
import {
  naturalMenuItems,
  allJuridicoGroups,
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

    const isLegalPath = pathname.startsWith('/escritorio-juridico') || pathname.startsWith('/departamento-juridico') || pathname.startsWith('/login-juridico');

    const userProfile = isLegalPath
      ? { name: "Equipo Legal", email: "legal@tramitex.com", fallback: "L" }
      : { name: "Admin", email: "admin@tramitex.com", fallback: "A" };

    return (
        <Sidebar>
            <SidebarHeader>
                 <div className="flex items-center gap-3">
                    <Logo />
                    <span className={cn("text-xl font-bold", state === 'collapsed' && 'hidden')}>TRAMITEX C.A</span>
                </div>
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {allJuridicoGroups.map((group) => (
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
                                <AvatarFallback>{userProfile.fallback}</AvatarFallback>
                            </Avatar>
                            <div className={cn("flex-1 overflow-hidden", state === 'collapsed' && 'hidden')}>
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
    const { state } = useSidebar();
    const groupTitles = Object.keys(naturalMenuItems) as (keyof typeof naturalMenuItems)[];

    return (
        <Sidebar>
             <SidebarHeader>
                <div className="flex items-center gap-3">
                    <Logo />
                    <span className={cn("text-xl font-bold", state === 'collapsed' && 'hidden')}>TRAMITEX</span>
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
  
  // No mostrar la barra lateral en la landing page o en páginas de registro/login sin layout.
  const noSidebarPaths = ['/', '/register'];
  if (noSidebarPaths.includes(pathname) || pathname.startsWith('/login') || pathname.startsWith('/register')) {
      if(pathname === '/login-natural' || pathname === '/register/natural' || pathname.startsWith('/(auth)')) {
          // No sidebar needed for these auth pages as they have their own layout
          return null;
      }
      if (pathname.startsWith('/register') && pathname !== '/register/natural') {
        return null;
      }
      if (pathname === '/') return null;
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
  ];
  
  const isCorporatePath = corporatePaths.some(p => pathname.startsWith(p)) || allJuridicoGroups.flatMap(g => g.items).some(i => pathname.startsWith(i.href));
  const isNaturalPath = Object.values(naturalMenuItems).flatMap(g => g.items).some(i => pathname.startsWith(i.href));

  if (isNaturalPath && !isCorporatePath) {
       return <AppSidebarNatural />;
  }

  // Por defecto, mostrar el sidebar corporativo para el resto de las rutas del dashboard
  return <AppSidebarCorporate />;
}
