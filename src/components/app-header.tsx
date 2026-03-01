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
import { Menu, ShieldCheck, ChevronDown, Bell, LogOut, Cog, Search, Zap, LayoutGrid, Calendar as CalendarIcon, Wallet, Droplets, Scale, ShoppingBag, Landmark, BarChart3, TrendingUp, Gavel } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

type User = {
  name: string;
  email: string;
  fallback: string;
};

const defaultNavGroups = [
    {
        title: "Operaciones",
        icon: Cog,
        items: [
            { href: "/dashboard-telecom", label: "Producción Petróleo", icon: Droplets },
            { href: "/dashboard-informatica", label: "Mantenimiento Preventivo", icon: Zap },
            { href: "/punto-de-venta", label: "Logística y Tienda", icon: ShoppingBag },
        ]
    },
    {
        title: "Finanzas",
        icon: Wallet,
        items: [
            { href: "/cuentas-bancarias", label: "Consolidado Bancario", icon: Landmark },
            { href: "/cuentas-por-cobrar", label: "Cuentas por Cobrar", icon: BarChart3 },
            { href: "/analisis-ventas", label: "Flujo de Caja IA", icon: TrendingUp },
        ]
    },
    {
        title: "Legal",
        icon: Scale,
        items: [
            { href: "/escritorio-juridico", label: "Escritorio Jurídico", icon: Gavel },
            { href: "/zero-risk", label: "Fiscalización SENIAT", icon: ShieldCheck },
            { href: "/tarjeta-digital", label: "Identidad Digital", icon: Zap },
        ]
    }
];

interface AppHeaderProps {
    user: User;
    navGroups?: any[];
    dashboardHref: string;
}

export function AppHeader({ user, navGroups = defaultNavGroups, dashboardHref }: AppHeaderProps) {
  const pathname = usePathname();
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const now = new Date();
    setDateStr(new Intl.DateTimeFormat('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(now));
  }, []);

  const isLinkActive = (itemHref: string) => pathname === itemHref;

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 z-40 border-b bg-background/80 backdrop-blur-xl h-16 flex items-center shadow-sm">
      <div className="w-full px-4 md:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile Logo & Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link href={dashboardHref}>
                <Logo className="h-8 w-8" />
            </Link>
          </div>

          {/* Desktop Navigation - Middle (MAESTRO) */}
          <div className="hidden lg:flex items-center gap-6 flex-grow">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-primary tracking-widest leading-none mb-1">Misión Crítica</span>
              <p className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Motor IA Activo
              </p>
            </div>

            <nav className="flex items-center gap-1">
                 {navGroups.map((group: any) => (
                    <DropdownMenu key={group.title}>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-9 px-4 gap-2 font-bold text-[11px] uppercase tracking-wider rounded-lg text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all"
                            >
                                {group.title}
                                <ChevronDown className="h-3 w-3 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-64 p-2 rounded-xl shadow-2xl border-primary/10">
                            <DropdownMenuLabel className="text-[9px] font-black uppercase tracking-widest opacity-40 px-3 py-2">Módulos</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {group.items.map((item: any) => (
                                <DropdownMenuItem key={item.href} asChild className="rounded-lg">
                                    <Link href={item.href} className={cn("flex items-center gap-3 py-2.5 px-3", isLinkActive(item.href) && "bg-primary/5 text-primary font-bold")}>
                                        <item.icon className="h-4 w-4 opacity-70" />
                                        <span className="text-[11px] font-bold uppercase">{item.label}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ))}
            </nav>
          </div>

          {/* User Actions & Stats */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-secondary/30 px-3 py-1.5 rounded-xl border">
                <CalendarIcon className="h-3.5 w-3.5 text-primary/60" />
                <span className="text-[10px] font-bold text-primary/80 uppercase">{dateStr}</span>
            </div>

            <div className="flex items-center gap-1 bg-secondary/20 p-1 rounded-xl">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg relative">
                    <Bell className="h-4 w-4 text-primary/70" />
                    <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[7px] font-bold h-3 w-3 flex items-center justify-center rounded-full border border-background">3</span>
                </Button>
                <ThemeToggle />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-primary/10 p-0 overflow-hidden">
                  <Avatar className="h-full w-full">
                    <AvatarFallback className="font-bold text-xs bg-primary/5 text-primary">{user.fallback}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 rounded-xl shadow-3xl">
                <DropdownMenuLabel className="p-4">
                   <div className="flex flex-col gap-1">
                      <p className="text-sm font-black uppercase italic">{user.name}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">{user.email}</p>
                   </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="rounded-lg">
                  <Link href="/seguridad" className="flex items-center py-2.5 px-3">
                      <ShieldCheck className="mr-3 h-4 w-4 text-primary" />
                      <span className="font-bold text-[10px] uppercase tracking-widest">Seguridad</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="rounded-lg text-destructive">
                  <Link href="/" className="flex items-center py-2.5 px-3 font-black">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="text-[10px] uppercase tracking-widest">Cerrar Sesión</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Sheet Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10">
                    <Menu className="h-6 w-6 text-primary"/>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0 border-none bg-[#0A2472] text-white">
                <SheetHeader className="p-8 border-b border-white/10">
                    <SheetTitle className="flex items-center gap-3 text-white">
                        <Logo className="h-10 w-10" />
                        <span className="text-2xl font-black tracking-tighter uppercase italic text-white">KYRON</span>
                    </SheetTitle>
                </SheetHeader>
                <div className="p-6">
                  <nav className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-4">Portal Móvil</p>
                    <Button variant="ghost" asChild className="w-full justify-start text-white hover:bg-white/10 h-12 rounded-xl">
                        <Link href="/dashboard" className="flex items-center gap-3"><LayoutGrid className="h-5 w-5"/> Dashboard</Link>
                    </Button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}