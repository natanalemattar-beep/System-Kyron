
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
    History,
    Menu
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const navigationConfig = [
  { 
      label: "MANDO", 
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
          { label: "Nómina", href: "/contabilidad/libros/nomina", icon: Users },
          { label: "Inventario", href: "/contabilidad/libros/inventario", icon: Box },
          { label: "Licores", href: "/contabilidad/libros/control-licores", icon: Landmark },
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
          { label: "Municipales", href: "/contabilidad/impuestos/municipales", icon: Landmark },
          { label: "Multas", href: "/contabilidad/impuestos/multas", icon: ShieldAlert },
          { label: "Homologación", href: "/contabilidad/impuestos/homologacion", icon: CheckCircle },
          { label: "Reportes", href: "/contabilidad/impuestos/reportes", icon: FileSearch },
      ]
  },
  { 
      label: "CUENTAS", 
      icon: Wallet,
      type: 'menu',
      items: [
          { label: "Resumen", href: "/cuentas", icon: Wallet },
          { label: "CxC", href: "/cuentas-por-cobrar", icon: TrendingUp },
          { label: "CxP", href: "/cuentas-por-pagar", icon: HandCoins },
          { label: "Caja", href: "/analisis-caja", icon: Activity },
          { label: "Ver Todas", href: "/cuentas/todas", icon: BookOpen },
      ]
  },
  { 
      label: "ANÁLISIS", 
      icon: PieChart,
      type: 'menu',
      items: [
          { label: "Ventas", href: "/analisis-ventas", icon: BarChart3 },
          { label: "Riesgo", href: "/analisis-riesgo", icon: ShieldCheck },
          { label: "Rentabilidad", href: "/analisis-rentabilidad", icon: TrendingUp },
          { label: "Factibilidad", href: "/estudio-factibilidad-economica", icon: Calculator },
          { label: "Costos", href: "/estructura-costos", icon: Activity },
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-sm" />
      
      <div className="w-full px-4 md:px-10">
        <div className="flex items-center justify-between w-full gap-4">
          
          <div className="flex items-center gap-4">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10 rounded-xl bg-white/5 border border-white/10">
                        <Menu className="h-5 w-5 text-primary" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0 bg-card border-r-white/10">
                    <SheetHeader className="p-8 border-b border-white/5">
                        <div className="flex items-center gap-4">
                            <Logo className="h-10 w-10" />
                            <SheetTitle className="text-xl font-black uppercase italic tracking-tighter text-white">MENÚ</SheetTitle>
                        </div>
                    </SheetHeader>
                    <div className="p-4 overflow-y-auto max-h-[calc(100vh-8rem)]">
                        {navigationConfig.map((nav) => (
                            <div key={nav.label} className="mb-6 last:mb-0">
                                <p className="px-4 text-[8px] font-black uppercase text-primary tracking-[0.4em] mb-3">{nav.label}</p>
                                <div className="space-y-1">
                                    {nav.type === 'link' ? (
                                        <Button asChild variant="ghost" className="w-full justify-start h-11 rounded-xl text-[10px] font-bold uppercase tracking-widest gap-4 text-white/70">
                                            <Link href={nav.href as any}>
                                                <nav.icon className="h-4 w-4 opacity-40" />
                                                {nav.label}
                                            </Link>
                                        </Button>
                                    ) : (
                                        nav.items?.map(item => (
                                            <Button key={item.label} asChild variant="ghost" className="w-full justify-start h-11 rounded-xl text-[10px] font-bold uppercase tracking-widest gap-4 text-white/70">
                                                <Link href={item.href as any}>
                                                    <item.icon className="h-4 w-4 opacity-40" />
                                                    {item.label}
                                                </Link>
                                            </Button>
                                        ))
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-3 group shrink-0">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full scale-150" />
                    <Logo className="h-9 w-9 relative z-10 drop-shadow-glow" /> 
                </div>
                <div className="flex flex-col -mt-1 hidden sm:flex">
                    <span className="text-[11px] font-black tracking-[0.3em] uppercase text-foreground italic leading-none">System Kyron</span>
                    <p className="text-[7px] font-bold text-primary uppercase tracking-[0.2em] mt-1 opacity-60">Master Node 2.6</p>
                </div>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center justify-center gap-1 flex-1 max-w-4xl mx-auto overflow-hidden">
            {navigationConfig.map((nav) => (
                nav.type === 'link' ? (
                    <Button 
                        key={nav.href}
                        asChild 
                        variant="ghost" 
                        className={cn(
                            "h-10 px-3 xl:px-4 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all gap-2 border border-transparent whitespace-nowrap group",
                            pathname.includes(nav.href!) 
                                ? "bg-primary/10 text-primary border-primary/20" 
                                : "text-muted-foreground/60 hover:text-primary hover:bg-white/5"
                        )}
                    >
                        <Link href={nav.href as any}>
                            <nav.icon className={cn("h-3.5 w-3.5", pathname.includes(nav.href!) ? "text-primary" : "opacity-30")} />
                            {nav.label}
                        </Link>
                    </Button>
                ) : (
                    <DropdownMenu key={nav.label}>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="ghost" 
                                className="h-10 px-3 xl:px-4 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 hover:text-primary hover:bg-white/5 whitespace-nowrap gap-2"
                            >
                                <nav.icon className="h-3.5 w-3.5 opacity-30" />
                                {nav.label}
                                <ChevronDown className="h-3 w-3 opacity-20" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center" className="w-64 p-2 rounded-2xl border-white/5 bg-card/95 backdrop-blur-3xl shadow-2xl">
                            <DropdownMenuLabel className="p-3 mb-1">
                                <p className="text-[8px] font-black text-primary uppercase tracking-[0.4em]">{nav.label}</p>
                            </DropdownMenuLabel>
                            {nav.items?.map((item) => (
                                <DropdownMenuItem key={item.href} asChild className="rounded-xl h-10 mb-1 last:mb-0">
                                    <Link href={item.href as any} className="flex items-center px-3 text-[9px] font-bold uppercase tracking-widest gap-3 group/item">
                                        <item.icon className="h-3.5 w-3.5 text-primary/40 group-hover/item:text-primary transition-colors" />
                                        <span>{item.label}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3 md:gap-5 min-w-fit">
            <div className="hidden xs:flex items-center gap-3 px-3 md:px-4 py-1.5 rounded-xl bg-white/[0.02] border border-white/5 shadow-inner">
                <div className="flex flex-col items-end">
                    <span className="text-[6px] font-black uppercase text-muted-foreground/30 tracking-[0.2em] leading-none">Net Node</span>
                    <span className="text-[9px] font-mono font-bold text-emerald-500 italic leading-none mt-1 uppercase">14MS</span>
                </div>
                <Signal className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
            </div>

            <ThemeToggle />
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 md:h-11 md:w-11 rounded-xl border border-white/5 p-0 overflow-hidden bg-muted/30 group">
                    <Avatar className="h-full w-full rounded-none">
                    <AvatarFallback className={cn("rounded-none font-black text-xs text-white bg-primary")}>
                        {user?.fallback || "AD"}
                    </AvatarFallback>
                    </Avatar>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 p-2 rounded-[2rem] border-white/5 bg-card/98 backdrop-blur-3xl shadow-2xl">
                <DropdownMenuLabel className="p-6 bg-muted/30 rounded-2xl mb-2">
                    <div className="flex flex-col gap-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground italic">Operador Maestro</p>
                        <p className="text-[8px] text-muted-foreground font-mono truncate">{user?.email || "finanzas@kyron.com"}</p>
                    </div>
                </DropdownMenuLabel>
                
                <DropdownMenuItem asChild className="rounded-xl h-12">
                    <Link href={dashboardHref as any} className="flex items-center px-4 text-[9px] font-black uppercase tracking-widest gap-4">
                        <Cpu className="h-4 w-4 text-primary" />
                        <span>Consola Inteligencia</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1 bg-white/5" />
                
                <DropdownMenuItem asChild className="rounded-xl h-12 text-rose-500 focus:text-white focus:bg-rose-600">
                    <Link href="/" className="flex items-center px-4 text-[9px] font-black uppercase tracking-widest gap-4">
                        <LogOut className="h-4 w-4" />
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
