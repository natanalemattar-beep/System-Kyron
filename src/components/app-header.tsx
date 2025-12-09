
'use client';

import {
  adminNavGroups,
  legalNavGroups,
  ventasNavGroups,
  rrhhNavGroups,
  sociosNavGroups,
  informaticaNavGroups,
  marketingNavGroups,
  telecomNavGroups,
  naturalMenuItems,
  advisoryNavGroups
} from "@/components/app-sidebar-nav-items";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Logo } from "./logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { loginOptions } from "@/lib/login-options";
import { ThemeToggle } from "./theme-toggle";
import { motion } from "framer-motion";

type User = {
  name: string;
  email: string;
  fallback: string;
};

const getNavInfoForPath = (pathname: string) => {
    if (pathname.startsWith('/dashboard-empresa') || pathname.startsWith('/analisis-ventas') || pathname.startsWith('/facturacion')) {
        return { user: { name: "Admin", email: "admin@kyron.com", fallback: "A" }, navGroups: adminNavGroups, dashboardHref: "/dashboard-empresa" };
    }
     if (pathname.startsWith('/cuentas-por-pagar') || pathname.startsWith('/cuentas-por-cobrar')) {
        return { user: { name: "Admin", email: "admin@kyron.com", fallback: "A" }, navGroups: adminNavGroups, dashboardHref: "/dashboard-empresa" };
    }
    if (pathname.startsWith('/dashboard-rrhh') || pathname.startsWith('/nominas')) {
        return { user: { name: "Recursos Humanos", email: "rrhh@kyron.com", fallback: "RH" }, navGroups: rrhhNavGroups, dashboardHref: "/dashboard-rrhh" };
    }
    if (pathname.startsWith('/dashboard-socios')) {
        return { user: { name: "Socio Director", email: "socio@kyron.com", fallback: "S" }, navGroups: sociosNavGroups, dashboardHref: "/dashboard-socios" };
    }
    if (pathname.startsWith('/dashboard-informatica') || pathname.startsWith('/seguridad') || pathname.startsWith('/arquitectura-software-contable') || pathname.startsWith('/facturacion-futurista') || pathname.startsWith('/ingenieria-ia')) {
        return { user: { name: "Ingeniería", email: "it@kyron.com", fallback: "IT" }, navGroups: informaticaNavGroups, dashboardHref: "/dashboard-informatica" };
    }
    if (pathname.startsWith('/asesoria')) {
        return { user: { name: "Marketing", email: "mkt@kyron.com", fallback: "M" }, navGroups: [advisoryNavGroups], dashboardHref: "/asesoria-publicidad" };
    }
     if (pathname.startsWith('/escritorio-juridico') || pathname.startsWith('/contratos') || pathname.startsWith('/permisos')) {
        return { user: { name: "Legal", email: "legal@kyron.com", fallback: "L" }, navGroups: legalNavGroups, dashboardHref: "/escritorio-juridico" };
    }
    if (pathname.startsWith('/dashboard-telecom')) {
        return { user: { name: "Telecom", email: "telecom@kyron.com", fallback: "T" }, navGroups: telecomNavGroups, dashboardHref: "/dashboard-telecom" };
    }
    // Default case for personal user
    return { user: { name: "Usuario", email: "usuario@email.com", fallback: "UN" }, navGroups: naturalMenuItems, dashboardHref: "/dashboard" };
}


export function AppHeader({ user }: { user: User }) {
  const pathname = usePathname();
  const { navGroups, dashboardHref } = getNavInfoForPath(pathname);

  return (
    <motion.header 
      className="sticky top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 70,
        damping: 20,
        mass: 1,
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between px-4 md:px-6 rounded-none md:rounded-full mt-0 md:mt-4 border-b md:border bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-6">
            <Link href={dashboardHref} className="flex items-center gap-3">
                <Logo />
                <span className="text-xl font-bold hidden sm:inline-block">System Kyron</span>
            </Link>
            <nav className="hidden md:flex items-center gap-2">
                 {navGroups.map((group) => (
                    <DropdownMenu key={group.title}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="gap-1">
                                {group.title}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {group.subGroups && group.subGroups.length > 0 ? (
                            group.subGroups.map((subGroup) => (
                              <DropdownMenuSub key={subGroup.title}>
                                <DropdownMenuSubTrigger>
                                  <subGroup.icon className="mr-2 h-4 w-4" />
                                  <span>{subGroup.title}</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                  {subGroup.items.map((item) => (
                                    <DropdownMenuItem key={item.href} asChild>
                                      <Link href={item.href} className={cn("flex items-center", pathname === item.href && "font-bold text-primary")}>
                                          <item.icon className="mr-2 h-4 w-4" />
                                          {item.label}
                                      </Link>
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuSubContent>
                              </DropdownMenuSub>
                            ))
                          ) : (
                            group.items.map((item) => (
                                <DropdownMenuItem key={item.href} asChild>
                                    <Link href={item.href} className={cn("flex items-center", pathname === item.href && "font-bold text-primary")}>
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.label}
                                    </Link>
                                </DropdownMenuItem>
                            ))
                          )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ))}
            </nav>
        </div>
        <div className="flex items-center gap-4">
           {/* Mobile Menu */}
           <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5"/>
                    <span className="sr-only">Abrir Menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-sm">
                <SheetHeader>
                    <Link href={dashboardHref} className="flex items-center gap-3 mb-4">
                        <Logo />
                        <span className="text-xl font-bold">System Kyron</span>
                    </Link>
                </SheetHeader>
                 <ScrollArea className="h-[calc(100%-4rem)]">
                    <nav className="flex flex-col gap-2 p-4">
                      {navGroups.map((group) => (
                        <div key={group.title}>
                          <h4 className="font-semibold text-sm text-muted-foreground px-2 py-1 flex items-center gap-2">
                            <group.icon className="h-4 w-4" />
                            {group.title}
                          </h4>
                           {group.subGroups && group.subGroups.length > 0 ? (
                                group.subGroups.map(subGroup => (
                                <div key={subGroup.title} className="pl-2">
                                    <h5 className="font-semibold text-xs text-muted-foreground px-2 py-1 mt-2 flex items-center gap-2">
                                    <subGroup.icon className="h-4 w-4" />
                                    {subGroup.title}
                                    </h5>
                                    {subGroup.items.map(item => (
                                    <Button key={item.href} asChild variant={pathname === item.href ? "secondary" : "ghost"} className="justify-start w-full">
                                        <Link href={item.href}>
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.label}
                                        </Link>
                                    </Button>
                                    ))}
                                </div>
                                ))
                            ) : (
                                group.items.map((item) => (
                                    <Button key={item.href} asChild variant={pathname === item.href ? "secondary" : "ghost"} className="justify-start w-full">
                                    <Link href={item.href}>
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.label}
                                    </Link>
                                    </Button>
                                ))
                            )}
                        </div>
                      ))}
                    </nav>
                 </ScrollArea>
              </SheetContent>
            </Sheet>
            <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{user.fallback}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                 <p className="font-semibold">{user.name}</p>
                 <p className="text-xs text-muted-foreground font-normal">{user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
               <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Portales de Acceso</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {loginOptions.map((opt) => (
                        <DropdownMenuItem key={opt.href} asChild>
                           <Link href={opt.href} className="flex items-center justify-start">
                              <opt.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                              <p>{opt.label}</p>
                            </Link>
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/general">Configuración</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/">Cerrar Sesión</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        </div>
      </div>
    </motion.header>
  );
}
