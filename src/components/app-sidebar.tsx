
'use client';

import { Gavel, User, LayoutDashboard, Briefcase, ShoppingCart, Users, Megaphone, Cpu, Building, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarHeader, SidebarTrigger, SidebarContent, SidebarFooter, useSidebar } from "@/components/ui/sidebar";
import {
  naturalMenuItems,
  adminNavGroups,
  legalNavGroups,
  ventasNavGroups,
  rrhhNavGroups,
  sociosNavGroups,
  informaticaNavGroups,
  marketingNavGroups,
} from "@/components/app-sidebar-nav-items";
import { Logo } from "./logo";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
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
                    <div key={group.title} className="mb-4">
                        <p className={cn("p-2 text-xs font-semibold text-muted-foreground", state === 'collapsed' && 'hidden')}>{group.title}</p>
                        <div className="space-y-1">
                            {group.items.map((item: any) => (
                                <Link
                                    key={`${item.href}-${item.label}`}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-accent",
                                        pathname === item.href && "bg-accent text-primary font-semibold",
                                        state === 'collapsed' && "justify-center"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span className={cn(state === 'collapsed' && 'hidden')}>{item.label}</span>
                                </Link>
                            ))}
                        </div>
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
                        <div key={group.title} className="mb-4">
                            <p className={cn("px-3 py-2 text-xs font-semibold text-muted-foreground flex items-center gap-2", state === 'collapsed' && 'hidden')}>
                               <group.icon className="h-4 w-4" />
                               <span>{group.title}</span>
                            </p>
                            <div className="space-y-1">
                                {group.items.map((item) => (
                                     <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-accent",
                                            pathname === item.href && "bg-accent text-primary font-semibold",
                                            state === 'collapsed' && "justify-center"
                                        )}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        <span className={cn(state === 'collapsed' && 'hidden')}>{item.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
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
                         <DropdownMenuItem asChild><Link href="/seguridad">Seguridad</Link></DropdownMenuItem>
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

  // Determine which sidebar to render based on the URL prefix
  if (pathname.startsWith('/escritorio-juridico')) {
      return <CorporateSidebarContent navGroups={legalNavGroups} user={{ name: "Escritorio Jurídico", email: "legal@kyron.com", fallback: "L" }} />;
  }
  if (pathname.startsWith('/analisis-ventas')) {
      return <CorporateSidebarContent navGroups={ventasNavGroups} user={{ name: "Equipo de Ventas", email: "ventas@kyron.com", fallback: "V" }} />;
  }
  if (pathname.startsWith('/dashboard-rrhh') || pathname.startsWith('/nominas') || pathname.startsWith('/libro-')) {
      return <CorporateSidebarContent navGroups={rrhhNavGroups} user={{ name: "Recursos Humanos", email: "rrhh@kyron.com", fallback: "RH" }} />;
  }
  if (pathname.startsWith('/dashboard-socios')) {
      return <CorporateSidebarContent navGroups={sociosNavGroups} user={{ name: "Portal de Socios", email: "socios@kyron.com", fallback: "S" }} />;
  }
   if (pathname.startsWith('/dashboard-informatica')) {
      return <CorporateSidebarContent navGroups={informaticaNavGroups} user={{ name: "Ingeniería y TI", email: "it@kyron.com", fallback: "IT" }} />;
  }
  if (pathname.startsWith('/asesoria-publicidad')) {
    return <CorporateSidebarContent navGroups={marketingNavGroups} user={{ name: "Marketing", email: "marketing@kyron.com", fallback: "M" }} />;
  }
  
  if (pathname.startsWith('/dashboard-empresa') || pathname.startsWith('/financiero') || pathname.startsWith('/cuentas-') || pathname.startsWith('/facturacion')) {
     return <CorporateSidebarContent navGroups={adminNavGroups} user={{ name: "Admin", email: "admin@kyron.com", fallback: "A" }} />;
  }
  
  // Fallback to natural person sidebar for any other path in the main app
  return <AppSidebarNatural />;
}
