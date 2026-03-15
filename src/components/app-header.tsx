
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

interface AppHeaderProps {
    user: any;
    dashboardHref: string;
}

export function AppHeader({ user, dashboardHref }: AppHeaderProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navigation = [
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
            { label: "Retenciones (IVA/ISLR)", href: "/contabilidad/impuestos/retenciones", icon: ShieldCheck },
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
        ]
    },
    { 
        label: "TESORERÍA", 
        icon: Activity,
        type: 'menu',
        items: [
            { label: "Arqueo de Caja", href: "/arqueo-caja", icon: Calculator },
            { label: "Billetera Multimoneda", href: "/billetera-cambio", icon: Wallet },
            { label: "Historial de Transacciones", href: "/transactions", icon: History },
        ]
    }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[150] border-b border-border/50 bg-background/80 backdrop-blur-3xl h-20 flex items-center w-full shadow-xl">
      <div className="w-full px-4 md:px-6">
        <div className="flex items-center justify-between w-full gap-4">
          
          <div className="flex items-center justify-start min-w-fit">
            <Link href="/" className="flex items-center gap-4 group shrink-0">
                <Logo className="h-9 w-9 transition-all duration-500 group-hover:scale-110 drop-shadow-glow" /> 
                <div className="flex flex-col -mt-1 hidden xl:flex">
                    <span className="text-xs font-black tracking-[0.3em] uppercase text-foreground italic leading-none">System Kyron</span>
                    <p className="text-[6px] font-bold text-primary uppercase tracking-[0.2em] mt-1 opacity-60">Centro de Inteligencia Contable</p>
                </div>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center justify-center gap-1 flex-1">
            {navigation.map((nav) => (
                nav.type === 'link' ? (
                    <Button 
                        key={nav.href}
                        asChild 
                        variant="ghost" 
                        className={cn(
                            "h-10 px-4 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all gap-2 border border-transparent whitespace-nowrap",
                            pathname.includes(nav.href!) ? "bg-primary/10 text-primary border-primary/20 shadow-sm" : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                        )}
                    >
                        <Link href={nav.href as any}>
                            <nav.icon className="h-3.5 w-3.5" />
                            {nav.label}
                        </Link>
                    </Button>
                ) : (
                    <DropdownMenu key={nav.label}>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="ghost" 
                                className="h-10 px-4 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all gap-2 text-muted-foreground hover:text-primary hover:bg-primary/5 whitespace-nowrap"
                            >
                                <nav.icon className="h-3.5 w-3.5" />
                                {nav.label}
                                <ChevronDown className="h-3 w-3 opacity-20" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64 p-2 rounded-[1.5rem] border-border bg-card/95 backdrop-blur-3xl shadow-2xl">
                            {nav.items?.map((item) => (
                                <DropdownMenuItem key={item.href} asChild className="rounded-xl">
                                    <Link href={item.href as any} className="flex items-center py-3 px-4 text-[9px] font-black uppercase tracking-widest gap-4 group">
                                        <item.icon className="h-4 w-4 text-primary/40 group-hover:text-primary transition-colors" />
                                        <span>{item.label}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3 min-w-fit">
            <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-xl bg-muted/50 border border-border">
                <div className="flex flex-col items-end">
                    <span className="text-[6px] font-black uppercase text-muted-foreground/40 tracking-widest leading-none">Red 5G</span>
                    <span className="text-[9px] font-mono font-bold text-emerald-500 italic leading-none mt-1">14 MS</span>
                </div>
                <Signal className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
            </div>

            <ThemeToggle />
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-xl border border-border p-0 overflow-hidden hover:border-primary/40 transition-all bg-muted shadow-inner group">
                    <Avatar className="h-full w-full rounded-none">
                    <AvatarFallback className={cn("rounded-none font-black text-[9px] text-white transition-all group-hover:scale-110 bg-primary")}>
                        {user?.fallback || "AD"}
                    </AvatarFallback>
                    </Avatar>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 p-3 rounded-[2rem] border-border bg-card/95 backdrop-blur-3xl shadow-2xl">
                <DropdownMenuLabel className="p-6 bg-muted/50 rounded-[1.5rem] mb-2 border border-border">
                    <div className="flex flex-col gap-1.5">
                        <p className="text-[11px] font-black uppercase tracking-widest text-primary">Responsable Contable</p>
                        <p className="text-[8px] text-muted-foreground truncate font-mono italic">{user?.email || "finanzas@kyron.com"}</p>
                    </div>
                </DropdownMenuLabel>
                
                <DropdownMenuItem asChild className="rounded-xl mt-2">
                    <Link href={dashboardHref as any} className="flex items-center py-3 px-4 text-[9px] font-black uppercase tracking-widest gap-4">
                        <Cpu className="h-4 w-4 text-primary/40" />
                        <span>Consola Maestra</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="rounded-xl">
                    <Link href="/seguridad" className="flex items-center py-3 px-4 text-[9px] font-black uppercase tracking-widest gap-4 text-muted-foreground">
                        <ShieldCheck className="h-4 w-4 text-primary/40" />
                        <span>Seguridad Bancaria</span>
                    </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem asChild className="rounded-xl text-rose-500 focus:text-rose-600 focus:bg-rose-500/10">
                    <Link href="/" className="flex items-center py-3 px-4 text-[9px] font-black uppercase tracking-widest gap-4">
                        <LogOut className="h-4 w-4" />
                        <span>Cerrar Sesión</span>
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
