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
import { Menu, ShieldCheck, ChevronDown, Bell, LogOut, Search, Zap, LayoutGrid, Calendar as CalendarIcon, Wallet, Droplets, Scale, ShoppingBag, BarChart3, TrendingUp, Gavel } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const defaultNavGroups = [
    {
        title: "OPERACIONES",
        items: [
            { href: "/dashboard-telecom", label: "ENERGÍA", icon: Droplets },
            { href: "/dashboard-informatica", label: "SISTEMAS", icon: Zap },
            { href: "/punto-de-venta", label: "LOGÍSTICA", icon: ShoppingBag },
        ]
    },
    {
        title: "FINANZAS",
        items: [
            { href: "/cuentas-bancarias", label: "BANCARIO", icon: Wallet },
            { href: "/cuentas-por-cobrar", label: "CARTERA", icon: BarChart3 },
            { href: "/analisis-ventas", label: "PROYECCIÓN", icon: TrendingUp },
        ]
    },
    {
        title: "LEGAL",
        items: [
            { href: "/escritorio-juridico", label: "ESTRATEGIA", icon: Gavel },
            { href: "/zero-risk", label: "FISCAL", icon: ShieldCheck },
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
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isLinkActive = (itemHref: string) => pathname === itemHref;

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 z-40 border-b border-white/5 bg-background/60 backdrop-blur-3xl h-16 flex items-center">
      <div className="w-full px-4 md:px-8">
        <div className="flex items-center justify-between gap-8">
          
          {/* Mobile UI */}
          <div className="lg:hidden">
            <Link href={dashboardHref}><Logo className="h-8 w-8" /></Link>
          </div>

          {/* Desktop HUD Center */}
          <div className="hidden lg:flex items-center gap-10 flex-grow">
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase text-primary tracking-[0.3em] leading-none mb-1">Misión Crítica</span>
              <p className="text-xs font-bold text-white/40 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_#22c55e]" />
                PROTOCOLO ACTIVO
              </p>
            </div>

            <nav className="flex items-center gap-2">
                 {navGroups.map((group: any) => (
                    <DropdownMenu key={group.title}>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-10 px-5 gap-3 font-black text-[10px] uppercase tracking-widest rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all"
                            >
                                {group.title}
                                <ChevronDown className="h-3 w-3 opacity-30" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-64 p-2 titanium-card rounded-xl">
                            <DropdownMenuLabel className="text-[8px] font-black uppercase tracking-[0.4em] opacity-30 px-4 py-3">Módulos</DropdownMenuLabel>
                            {group.items.map((item: any) => (
                                <DropdownMenuItem key={item.href} asChild className="rounded-lg">
                                    <Link href={item.href} className={cn("flex items-center gap-4 py-3 px-4", isLinkActive(item.href) && "bg-primary/10 text-primary font-black")}>
                                        <item.icon className="h-4 w-4 opacity-50" />
                                        <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ))}
            </nav>
          </div>

          {/* User & Global State */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end gap-0.5">
                <span className="text-[10px] font-black text-white/80 uppercase tracking-tighter">
                    {time.toLocaleTimeString('es-VE', { hour12: false })}
                </span>
                <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">ESTADO SÍNCRONO</span>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-white/40 hover:text-white hover:bg-white/5 relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]" />
                </Button>
                <ThemeToggle />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-xl border border-white/10 p-0 overflow-hidden group hover:border-primary/50 transition-all">
                  <Avatar className="h-full w-full rounded-none">
                    <AvatarFallback className="font-black text-xs bg-primary/10 text-primary">{user.fallback}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 titanium-card rounded-2xl">
                <DropdownMenuLabel className="p-4">
                   <div className="flex flex-col gap-1">
                      <p className="text-xs font-black uppercase italic tracking-tighter">{user.name}</p>
                      <p className="text-[9px] text-white/20 font-mono">{user.email}</p>
                   </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem asChild className="rounded-xl">
                  <Link href="/seguridad" className="flex items-center py-3 px-4">
                      <ShieldCheck className="mr-3 h-4 w-4 text-primary" />
                      <span className="font-black text-[9px] uppercase tracking-widest">SEGURIDAD NIVEL 5</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl text-destructive">
                  <Link href="/" className="flex items-center py-3 px-4">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="font-black text-[9px] uppercase tracking-widest">DESCONEXIÓN</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Sidebar */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon"><Menu className="h-6 w-6 text-primary"/></Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-background/95 border-r border-white/5">
                <SheetHeader className="mb-12">
                    <SheetTitle className="flex items-center gap-3">
                        <Logo className="h-8 w-8" />
                        <span className="text-2xl font-black uppercase tracking-tighter italic">KYRON</span>
                    </SheetTitle>
                </SheetHeader>
                <nav className="space-y-4">
                    <Button variant="ghost" asChild className="w-full justify-start text-lg font-black tracking-tighter">
                        <Link href="/dashboard" className="flex items-center gap-4"><LayoutGrid className="h-5 w-5"/> DASHBOARD</Link>
                    </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}