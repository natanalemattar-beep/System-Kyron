'use client';

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Logo } from "./logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
    Menu, 
    ShieldCheck, 
    ChevronDown, 
    Bell, 
    LogOut, 
    Search, 
    LayoutGrid, 
    Wallet, 
    Droplets, 
    ShoppingBag, 
    BarChart3, 
    TrendingUp, 
    Gavel,
    Activity,
    Lock,
    Clock as ClockIcon
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const defaultNavGroups = [
    {
        title: "Operaciones",
        items: [
            { href: "/dashboard-telecom", label: "Recursos", icon: Droplets },
            { href: "/dashboard-informatica", label: "Sistemas", icon: Activity },
            { href: "/punto-de-venta", label: "Ventas", icon: ShoppingBag },
        ]
    },
    {
        title: "Finanzas",
        items: [
            { href: "/cuentas-bancarias", label: "Tesoreria", icon: Wallet },
            { href: "/cuentas-por-cobrar", label: "Cartera", icon: BarChart3 },
            { href: "/analisis-ventas", label: "KPI Pro", icon: TrendingUp },
        ]
    },
    {
        title: "Legal",
        items: [
            { href: "/escritorio-juridico", label: "Cumplimiento", icon: Gavel },
            { href: "/zero-risk", label: "Blindaje", icon: ShieldCheck },
        ]
    }
];

interface AppHeaderProps {
    user: any;
    navGroups?: any[];
    dashboardHref: string;
}

export function AppHeader({ user, navGroups = defaultNavGroups, dashboardHref }: AppHeaderProps) {
  const pathname = usePathname();
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isLinkActive = (itemHref: string) => pathname === itemHref;

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 z-40 border-b bg-background/80 backdrop-blur-xl h-16 flex items-center">
      <div className="w-full px-4 md:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile Logo & Trigger */}
          <div className="flex items-center gap-4 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9"><Menu className="h-5 w-5" /></Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <div className="p-6 border-b mb-4">
                    <Logo className="h-8 w-8 inline-block mr-2" />
                    <span className="font-bold text-lg">System Kyron</span>
                </div>
                <nav className="px-4 space-y-2">
                    <Button variant="ghost" asChild className="w-full justify-start h-11"><Link href="/dashboard"><LayoutGrid className="mr-3 h-5 w-5"/> Dashboard</Link></Button>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href={dashboardHref}><Logo className="h-8 w-8" /></Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 flex-grow">
            <nav className="flex items-center gap-1">
                 {navGroups.map((group: any) => (
                    <DropdownMenu key={group.title}>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-9 px-4 gap-2 font-semibold text-xs uppercase tracking-wider rounded-lg text-muted-foreground hover:text-foreground"
                            >
                                {group.title}
                                <ChevronDown className="h-3 w-3 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-64 p-2 rounded-xl">
                            <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 px-3 py-2">Módulos</DropdownMenuLabel>
                            {group.items.map((item: any) => (
                                <DropdownMenuItem key={item.href} asChild className="rounded-lg">
                                    <Link href={item.href} className={cn("flex items-center gap-3 py-2.5 px-3", isLinkActive(item.href) && "bg-primary/5 text-primary font-bold")}>
                                        <item.icon className="h-4 w-4" />
                                        <span className="text-sm">{item.label}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ))}
            </nav>
            
            <div className="h-4 w-px bg-border mx-2" />
            
            <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                    type="text" 
                    placeholder="Buscar trámites o facturas..." 
                    className="w-full h-9 pl-9 pr-4 bg-muted/50 border-none rounded-lg text-sm focus:ring-1 focus:ring-primary transition-all outline-none"
                />
            </div>
          </div>

          {/* User & Global State */}
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:flex flex-col items-end gap-0.5 min-w-[100px]">
                <span className="text-xs font-mono font-bold tracking-tight">
                    {time ? time.toLocaleTimeString('es-VE', { hour12: false }) : '--:--:--'}
                </span>
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Sincronizado</span>
            </div>

            <div className="flex items-center gap-1.5">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 bg-red-500 rounded-full" />
                </Button>
                <ThemeToggle />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border p-0 overflow-hidden hover:border-primary/50 transition-all">
                  <Avatar className="h-full w-full">
                    <AvatarFallback className="font-bold text-xs bg-primary/10 text-primary">{user.fallback}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 rounded-xl">
                <DropdownMenuLabel className="p-4">
                   <div className="flex flex-col gap-1">
                      <p className="text-sm font-bold truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground font-medium truncate">{user.email}</p>
                   </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="rounded-lg">
                  <Link href="/seguridad" className="flex items-center py-2 px-3">
                      <Lock className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Configuración de Seguridad</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg text-destructive focus:text-destructive">
                  <Link href="/" className="flex items-center py-2 px-3">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="text-sm">Cerrar Sesión</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}