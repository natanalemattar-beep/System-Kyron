
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
    Lock
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const defaultNavGroups = [
    {
        title: "Operaciones",
        items: [
            { href: "/dashboard-telecom", label: "Recursos Telecom", icon: Droplets },
            { href: "/dashboard-informatica", label: "Sistemas & IT", icon: Activity },
            { href: "/punto-de-venta", label: "Ventas TPV", icon: ShoppingBag },
        ]
    },
    {
        title: "Finanzas",
        items: [
            { href: "/cuentas-bancarias", label: "Tesoreria", icon: Wallet },
            { href: "/cuentas-por-cobrar", label: "Cartera de Clientes", icon: BarChart3 },
            { href: "/analisis-ventas", label: "KPI Pro", icon: TrendingUp },
        ]
    },
    {
        title: "Legal",
        items: [
            { href: "/escritorio-juridico", label: "Cumplimiento", icon: Gavel },
            { href: "/zero-risk", label: "Protección Fiscal", icon: ShieldCheck },
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
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString('es-VE', { hour12: false }));
    updateTime();
    const timer = setInterval(updateTime, 1000);
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
                <div className="p-6 border-b mb-4 flex items-center gap-3">
                    <Logo className="h-8 w-8" />
                    <span className="font-bold text-lg tracking-tight">System Kyron</span>
                </div>
                <nav className="px-4 space-y-2">
                    <Button variant="ghost" asChild className="w-full justify-start h-11"><Link href="/dashboard"><LayoutGrid className="mr-3 h-5 w-5"/> Dashboard</Link></Button>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href={dashboardHref}><Logo className="h-8 w-8" /></Link>
          </div>

          {/* Desktop Navigation - POBLADO Y VISIBLE */}
          <div className="hidden lg:flex items-center gap-6 flex-grow">
            <nav className="flex items-center gap-1">
                 {navGroups.map((group: any) => (
                    <DropdownMenu key={group.title}>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-9 px-4 gap-2 font-bold text-[10px] uppercase tracking-widest rounded-lg text-muted-foreground hover:text-primary transition-all"
                            >
                                {group.title}
                                <ChevronDown className="h-3 w-3 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-64 p-2 rounded-2xl shadow-xl border bg-background/98">
                            <DropdownMenuLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-3 py-2">Módulos de Gestión</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {group.items.map((item: any) => (
                                <DropdownMenuItem key={item.href} asChild className="rounded-xl">
                                    <Link href={item.href} className={cn("flex items-center gap-3 py-2.5 px-3", isLinkActive(item.href) && "bg-primary/5 text-primary font-bold")}>
                                        <item.icon className="h-4 w-4" />
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ))}
            </nav>
            
            <div className="h-4 w-px bg-border/50 mx-2" />
            
            <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                    type="text" 
                    placeholder="Búsqueda global..." 
                    className="w-full h-9 pl-9 pr-4 bg-muted/40 border-none rounded-xl text-xs focus:ring-1 focus:ring-primary transition-all outline-none font-medium"
                />
            </div>
          </div>

          {/* User & Global State */}
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:flex flex-col items-end gap-0.5 min-w-[100px]">
                <span className="text-xs font-mono font-bold tracking-tight text-primary">
                    {time || '--:--:--'}
                </span>
                <span className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-50">Sincronizado</span>
            </div>

            <div className="flex items-center gap-1.5">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground relative hover:bg-primary/5 transition-all">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 bg-red-500 rounded-full" />
                </Button>
                <ThemeToggle />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border p-0 overflow-hidden hover:border-primary/50 transition-all shadow-sm">
                  <Avatar className="h-full w-full">
                    <AvatarFallback className="font-bold text-[10px] bg-primary/10 text-primary">{user.fallback}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-2xl border bg-background/98">
                <DropdownMenuLabel className="p-4">
                   <div className="flex flex-col gap-1">
                      <p className="text-sm font-bold truncate tracking-tight">{user.name}</p>
                      <p className="text-xs text-muted-foreground font-medium truncate opacity-70">{user.email}</p>
                   </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="rounded-xl">
                  <Link href="/seguridad" className="flex items-center py-2.5 px-3">
                      <Lock className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Seguridad de la Cuenta</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl text-destructive focus:text-destructive focus:bg-destructive/5">
                  <Link href="/" className="flex items-center py-2.5 px-3">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="text-sm font-bold">Cerrar Sesión</span>
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
