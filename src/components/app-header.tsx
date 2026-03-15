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
import { Link, usePathname } from "@/navigation";
import { Logo } from "./logo";
import { 
    LogOut, 
    ShieldCheck, 
    Signal,
    Calculator,
    FileText,
    LayoutDashboard,
    Cpu,
    ChevronDown,
    BookOpen,
    Landmark,
    Activity,
    Wallet,
    Users,
    PieChart,
    TrendingUp,
    HandCoins,
    BarChart3,
    Box,
    Banknote,
    Calendar,
    ShieldAlert,
    FileSearch,
    CheckCircle,
    History
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

// Configuración de navegación externalizada para rendimiento
const navigationConfig = [
  { 
      label: "CENTRO DE MANDO", 
      href: "/dashboard-empresa", 
      icon: LayoutDashboard,
      type: 'link'
  },
  { 
      label: "LIBROS", 
      icon: BookOpen,
      type: 'menu',
      items: [
          { label: "Compra y Venta", href: "/contabilidad/libros/compra-venta", icon: FileText },
          { label: "Nómina y Personal", href: "/contabilidad/libros/nomina", icon: Users },
          { label: "Inventario Activo", href: "/contabilidad/libros/inventario", icon: Box },
          { label: "Control de Licores", href: "/contabilidad/libros/control-licores", icon: Landmark },
          { label: "Cesta-Ticket", href: "/contabilidad/libros/cesta-ticket", icon: Banknote },
          { label: "Horas Extras", href: "/contabilidad/libros/horas-extras", icon: History },
          { label: "Ver Biblioteca", href: "/contabilidad/libros", icon: BookOpen },
      ]
  },
  { 
      label: "TRIBUTOS", 
      icon: Landmark,
      type: 'menu',
      items: [
          { label: "Declaración IVA", href: "/declaracion-iva", icon: FileText },
          { label: "ISLR y AR-C", href: "/islr-arc", icon: Banknote },
          { label: "Retenciones", href: "/contabilidad/impuestos/retenciones", icon: ShieldCheck },
          { label: "Calendario Fiscal", href: "/contabilidad/impuestos/calendario", icon: Calendar },
          { label: "Impuestos Municipales", href: "/contabilidad/impuestos/municipales", icon: Landmark },
          { label: "Multas y Sanciones", href: "/contabilidad/impuestos/multas", icon: ShieldAlert },
          { label: "Homologación SENIAT", href: "/contabilidad/impuestos/homologacion", icon: CheckCircle },
          { label: "Reportes Fiscales", href: "/contabilidad/impuestos/reportes", icon: FileSearch },
      ]
  },
  { 
      label: "CUENTAS", 
      icon: Wallet,
      type: 'menu',
      items: [
          { label: "Resumen de Cuentas", href: "/cuentas", icon: Wallet },
          { label: "Cuentas por Cobrar", href: "/cuentas-por-cobrar", icon: TrendingUp },
          { label: "Cuentas por Pagar", href: "/cuentas-por-pagar", icon: HandCoins },
          { label: "Análisis de Caja", href: "/analisis-caja", icon: Activity },
          { label: "Ver Todas", href: "/cuentas/todas", icon: BookOpen },
      ]
  },
  { 
      label: "ANÁLISIS", 
      icon: PieChart,
      type: 'menu',
      items: [
          { label: "Ventas e Ingresos", href: "/analisis-ventas", icon: BarChart3 },
          { label: "Riesgo Financiero", href: "/analisis-riesgo", icon: ShieldCheck },
          { label: "Rentabilidad Pro", href: "/analisis-rentabilidad", icon: TrendingUp },
          { label: "Factibilidad Económica", href: "/estudio-factibilidad-economica", icon: Calculator },
          { label: "Estructura de Costos", href: "/estructura-costos", icon: Activity },
          { label: "Centro de Análisis", href: "/analisis", icon: PieChart },
      ]
  }
];

export function AppHeader({ user, dashboardHref }: { user: any; dashboardHref: string }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <header className="fixed top-0 left-0 right-0 z-[150] bg-background/50 h-20 w-full" />
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-[150] border-b border-white/5 bg-background/60 backdrop-blur-3xl h-20 flex items-center w-full shadow-2xl overflow-hidden">
      {/* Glow ambiental superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-sm" />
      
      <div className="w-full px-6 md:px-10">
        <div className="flex items-center justify-between w-full gap-8">
          
          {/* SECCIÓN LOGO */}
          <div className="flex items-center justify-start min-w-fit">
            <Link href="/" className="flex items-center gap-5 group shrink-0">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-all duration-500 scale-150" />
                    <Logo className="h-10 w-10 relative z-10 transition-transform duration-500 group-hover:scale-110 drop-shadow-glow" /> 
                </div>
                <div className="flex flex-col -mt-1 hidden lg:flex">
                    <span className="text-[13px] font-black tracking-[0.4em] uppercase text-foreground italic leading-none italic-shadow">System Kyron</span>
                    <p className="text-[7px] font-bold text-primary uppercase tracking-[0.3em] mt-1.5 opacity-60">Intelligence Hub 2.6</p>
                </div>
            </Link>
          </div>

          {/* SECCIÓN NAVEGACIÓN ESTÉTICA */}
          <nav className="hidden lg:flex items-center justify-center gap-2 flex-1 max-w-4xl mx-auto">
            {navigationConfig.map((nav) => (
                nav.type === 'link' ? (
                    <Button 
                        key={nav.href}
                        asChild 
                        variant="ghost" 
                        className={cn(
                            "h-11 px-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all gap-3 border border-transparent whitespace-nowrap group",
                            pathname.includes(nav.href!) 
                                ? "bg-primary/10 text-primary border-primary/20 shadow-glow-sm" 
                                : "text-muted-foreground/60 hover:text-primary hover:bg-white/5"
                        )}
                    >
                        <Link href={nav.href as any}>
                            <nav.icon className={cn("h-4 w-4 transition-all", pathname.includes(nav.href!) ? "text-primary" : "opacity-30 group-hover:opacity-100")} />
                            {nav.label}
                        </Link>
                    </Button>
                ) : (
                    <DropdownMenu key={nav.label}>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="ghost" 
                                className="h-11 px-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 hover:text-primary hover:bg-white/5 whitespace-nowrap gap-3 group"
                            >
                                <nav.icon className="h-4 w-4 opacity-30 group-hover:opacity-100 transition-all" />
                                {nav.label}
                                <ChevronDown className="h-3 w-3 opacity-20 group-hover:opacity-40 transition-all" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center" className="w-72 p-2 rounded-[1.8rem] border-white/5 bg-card/95 backdrop-blur-3xl shadow-2xl shadow-black/50 animate-in fade-in slide-in-from-top-2">
                            <div className="px-4 py-3 mb-2 border-b border-white/5">
                                <p className="text-[8px] font-black text-primary uppercase tracking-[0.4em]">{nav.label}</p>
                            </div>
                            {nav.items?.map((item) => (
                                <DropdownMenuItem key={item.href} asChild className="rounded-xl h-12 mb-1 last:mb-0">
                                    <Link href={item.href as any} className="flex items-center px-4 text-[10px] font-bold uppercase tracking-widest gap-4 group/item">
                                        <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover/item:border-primary/20 transition-all">
                                            <item.icon className="h-3.5 w-3.5 text-primary/40 group-hover/item:text-primary transition-colors" />
                                        </div>
                                        <span>{item.label}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            ))}
          </nav>

          {/* SECCIÓN ACCIONES Y PERFIL */}
          <div className="flex items-center justify-end gap-5 min-w-fit">
            <div className="hidden md:flex items-center gap-4 px-5 py-2 rounded-2xl bg-white/[0.02] border border-white/5 shadow-inner">
                <div className="flex flex-col items-end">
                    <span className="text-[7px] font-black uppercase text-muted-foreground/30 tracking-[0.3em] leading-none">Net Node</span>
                    <span className="text-[10px] font-mono font-bold text-emerald-500 italic leading-none mt-1.5 uppercase tracking-tighter">5G 14MS</span>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full animate-pulse" />
                    <Signal className="h-4 w-4 text-emerald-500 relative z-10" />
                </div>
            </div>

            <ThemeToggle />
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-11 w-11 rounded-2xl border border-white/5 p-0 overflow-hidden hover:border-primary/40 transition-all bg-muted/30 shadow-2xl group">
                    <Avatar className="h-full w-full rounded-none">
                    <AvatarFallback className={cn("rounded-none font-black text-xs text-white transition-all group-hover:scale-110 bg-primary")}>
                        {user?.fallback || "AD"}
                    </AvatarFallback>
                    </Avatar>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 p-3 rounded-[2.5rem] border-white/5 bg-card/98 backdrop-blur-3xl shadow-2xl">
                <DropdownMenuLabel className="p-8 bg-muted/30 rounded-[2rem] mb-3 border border-white/5">
                    <div className="flex flex-col gap-2">
                        <p className="text-[12px] font-black uppercase tracking-[0.3em] text-foreground italic leading-none">Operador Maestro</p>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <p className="text-[9px] text-muted-foreground font-mono truncate lowercase">{user?.email || "finanzas@kyron.com"}</p>
                        </div>
                    </div>
                </DropdownMenuLabel>
                
                <DropdownMenuItem asChild className="rounded-2xl h-14">
                    <Link href={dashboardHref as any} className="flex items-center px-5 text-[10px] font-black uppercase tracking-widest gap-5">
                        <div className="p-2.5 bg-primary/10 rounded-xl">
                            <Cpu className="h-4.5 w-4.5 text-primary" />
                        </div>
                        <span>Consola de Inteligencia</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="rounded-2xl h-14">
                    <Link href="/seguridad" className="flex items-center px-5 text-[10px] font-black uppercase tracking-widest gap-5 text-muted-foreground">
                        <div className="p-2.5 bg-white/5 rounded-xl">
                            <ShieldCheck className="h-4.5 w-4.5 text-white/20" />
                        </div>
                        <span>Seguridad de Nodo</span>
                    </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="my-2 bg-white/5" />
                
                <DropdownMenuItem asChild className="rounded-2xl h-14 text-rose-500 focus:text-white focus:bg-rose-600">
                    <Link href="/" className="flex items-center px-5 text-[10px] font-black uppercase tracking-widest gap-5">
                        <div className="p-2.5 bg-rose-500/10 rounded-xl">
                            <LogOut className="h-4.5 w-4.5" />
                        </div>
                        <span>Finalizar Sesión</span>
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
