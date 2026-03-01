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
    Zap, 
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
        title: "LOGÍSTICA",
        items: [
            { href: "/dashboard-telecom", label: "RECURSOS", icon: Droplets },
            { href: "/dashboard-informatica", label: "SISTEMAS", icon: Zap },
            { href: "/punto-de-venta", label: "VENTAS", icon: ShoppingBag },
        ]
    },
    {
        title: "FINANZAS",
        items: [
            { href: "/cuentas-bancarias", label: "TESORERÍA", icon: Wallet },
            { href: "/cuentas-por-cobrar", label: "CARTERA", icon: BarChart3 },
            { href: "/analisis-ventas", label: "KPI PRO", icon: TrendingUp },
        ]
    },
    {
        title: "LEGAL",
        items: [
            { href: "/escritorio-juridico", label: "CUMPLIMIENTO", icon: Gavel },
            { href: "/zero-risk", label: "BLINDAJE", icon: ShieldCheck },
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
    <header className="fixed top-0 left-0 lg:left-64 right-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-3xl h-20 flex items-center">
      <div className="w-full px-6 md:px-12">
        <div className="flex items-center justify-between gap-12">
          
          {/* Mobile UI */}
          <div className="lg:hidden">
            <Link href={dashboardHref}><Logo className="h-10 w-10" /></Link>
          </div>

          {/* Desktop HUD Center */}
          <div className="hidden lg:flex items-center gap-12 flex-grow">
            <div className="flex flex-col border-l-2 border-primary pl-6">
              <span className="text-[10px] font-black uppercase text-primary tracking-[0.5em] leading-none mb-2">Protocolo Activo</span>
              <p className="text-xs font-black text-white/90 flex items-center gap-3">
                <Activity className="h-3 w-3 text-secondary animate-pulse" />
                SISTEMA SÍNCRONO
              </p>
            </div>

            <nav className="flex items-center gap-3">
                 {navGroups.map((group: any) => (
                    <DropdownMenu key={group.title}>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-12 px-6 gap-4 font-black text-[11px] uppercase tracking-[0.3em] rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all"
                            >
                                {group.title}
                                <ChevronDown className="h-3 w-3 opacity-30" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-72 p-3 titanium-card border-white/10 rounded-xl">
                            <DropdownMenuLabel className="text-[9px] font-black uppercase tracking-[0.5em] opacity-30 px-5 py-4">Protocolos</DropdownMenuLabel>
                            {group.items.map((item: any) => (
                                <DropdownMenuItem key={item.href} asChild className="rounded-lg">
                                    <Link href={item.href} className={cn("flex items-center gap-5 py-4 px-5", isLinkActive(item.href) && "bg-primary/20 text-primary font-black shadow-inner")}>
                                        <item.icon className="h-5 w-5 opacity-50" />
                                        <span className="text-[11px] font-black uppercase tracking-tighter">{item.label}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ))}
            </nav>
          </div>

          {/* User & Global State */}
          <div className="flex items-center gap-8">
            <div className="hidden md:flex flex-col items-end gap-1">
                <span className="text-sm font-mono font-black text-white tracking-tighter">
                    {time.toLocaleTimeString('es-VE', { hour12: false })}
                </span>
                <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">Enlace Estelar</span>
            </div>

            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="h-11 w-11 text-white/30 hover:text-white hover:bg-white/5 relative border border-white/5 rounded-lg">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-3 right-3 h-2 w-2 bg-red-500 rounded-full shadow-[0_0_12px_#ef4444]" />
                </Button>
                <ThemeToggle />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-12 w-12 rounded-lg border border-white/10 p-0 overflow-hidden group hover:border-primary/50 transition-all bg-white/5 shadow-2xl">
                  <Avatar className="h-full w-full rounded-none">
                    <AvatarFallback className="font-black text-sm bg-primary/20 text-primary">{user.fallback}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 p-3 titanium-card border-white/10 rounded-xl">
                <DropdownMenuLabel className="p-5">
                   <div className="flex flex-col gap-2">
                      <p className="text-sm font-black uppercase italic tracking-tighter">{user.name}</p>
                      <p className="text-[10px] text-white/30 font-mono font-bold">{user.email}</p>
                   </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem asChild className="rounded-lg">
                  <Link href="/seguridad" className="flex items-center py-4 px-5">
                      <Lock className="mr-4 h-5 w-5 text-primary" />
                      <span className="font-black text-[10px] uppercase tracking-[0.3em]">ACCESO TOTAL NIVEL 5</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg text-red-500 hover:bg-red-500/10">
                  <Link href="/" className="flex items-center py-4 px-5">
                      <LogOut className="mr-4 h-5 w-5" />
                      <span className="font-black text-[10px] uppercase tracking-[0.3em]">DESCONECTAR TERMINAL</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Sidebar */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="h-12 w-12 bg-white/5 border border-white/10 rounded-lg"><Menu className="h-6 w-6 text-primary"/></Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-black/95 border-r border-white/10 w-80 p-10 flex flex-col">
                <SheetHeader className="mb-16">
                    <SheetTitle className="flex items-center gap-5">
                        <Logo className="h-10 w-10" />
                        <span className="text-3xl font-black uppercase tracking-tighter italic">KYRON</span>
                    </SheetTitle>
                </SheetHeader>
                <nav className="space-y-6">
                    <Button variant="ghost" asChild className="w-full justify-start text-3xl font-black tracking-tighter hover:text-primary transition-all">
                        <Link href="/dashboard" className="flex items-center gap-6"><LayoutGrid className="h-8 w-8"/> DASHBOARD</Link>
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