
'use client';

import { Gavel, User, LayoutDashboard, Briefcase, ShoppingCart, Users, Megaphone, Cpu, Building } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarInset, SidebarHeader, SidebarTrigger, SidebarContent, SidebarFooter, useSidebar } from "@/components/ui/sidebar";
import {
  naturalMenuItems,
  adminNavGroups,
  legalNavGroups,
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

const CorporateSidebarContent = ({ navGroups, user }: { navGroups: any[], user: any }) => {
    const pathname = usePathname();
    const { state } = useSidebar();
    
    return (
        <Sidebar>
            <SidebarHeader>
                 <div className="flex items-center gap-3">
                    <Logo />
                    <span className={cn("text-xl font-bold", state === 'collapsed' && 'hidden')}>{user.name}</span>
                </div>
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
                {navGroups.map((group) => (
                    <div key={group.title}>
                        <p className={cn("p-2 text-xs font-semibold text-muted-foreground", state === 'collapsed' && 'hidden')}>{group.title}</p>
                        {group.items.map((item: any) => (
                            <SidebarMenuItem key={`${item.href}-${item.label}`}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname === item.href}
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
                                    isActive={pathname === item.href}
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
  
  const noSidebarPaths = ['/'];
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
  
  if (isAuthPage || noSidebarPaths.includes(pathname)) {
    return null;
  }

  // Define routes for each corporate profile
  const legalPaths = legalNavGroups.flatMap(g => g.items.map(i => i.href));
  const ventasPaths = ventasMenuItems.map(i => i.href);
  const rrhhPaths = [...recursosHumanosGestionItems, ...librosRegistroMenuItems].map(i => i.href);
  const sociosPaths = sociosNavGroups.flatMap(g => g.items.map(i => i.href));
  const informaticaPaths = informaticaNavGroups.flatMap(g => g.items.map(i => i.href));

  // Determine which sidebar to render
  if (legalPaths.some(p => pathname.startsWith(p))) {
    return <CorporateSidebarContent navGroups={legalNavGroups} user={{ name: "Escritorio Jurídico", email: "legal@kyron.com", fallback: "L" }} />;
  }
  if (ventasPaths.some(p => pathname.startsWith(p))) {
    return <CorporateSidebarContent navGroups={[{ title: "Ventas y Facturación", icon: ShoppingCart, items: ventasMenuItems }]} user={{ name: "Equipo de Ventas", email: "ventas@kyron.com", fallback: "V" }} />;
  }
  if (rrhhPaths.some(p => pathname.startsWith(p))) {
    return <CorporateSidebarContent navGroups={[{ title: "Gestión de RR.HH.", icon: Briefcase, items: recursosHumanosGestionItems }, { title: "Libros de Registro", icon: Briefcase, items: librosRegistroMenuItems }]} user={{ name: "Recursos Humanos", email: "rrhh@kyron.com", fallback: "RH" }} />;
  }
  if (sociosPaths.some(p => pathname.startsWith(p))) {
      return <CorporateSidebarContent navGroups={sociosNavGroups} user={{ name: "Portal de Socios", email: "socios@kyron.com", fallback: "S" }} />;
  }
   if (informaticaPaths.some(p => pathname.startsWith(p))) {
      return <CorporateSidebarContent navGroups={informaticaNavGroups} user={{ name: "Ingeniería y TI", email: "it@kyron.com", fallback: "IT" }} />;
  }
  if (pathname.startsWith('/dashboard-empresa') || adminNavGroups.flatMap(g => g.items).some(i => pathname.startsWith(i.href))) {
     return <CorporateSidebarContent navGroups={adminNavGroups} user={{ name: "Admin", email: "admin@kyron.com", fallback: "A" }} />;
  }
  
  // Fallback to natural person sidebar for any other path
  return <AppSidebarNatural />;
}
