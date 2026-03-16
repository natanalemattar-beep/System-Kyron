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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Link, usePathname } from "@/navigation";
import { Logo } from "./logo";
import { 
    LogOut, 
    Calculator,
    LayoutDashboard,
    ChevronDown,
    BookOpen,
    Landmark,
    Wallet,
    PieChart,
    Menu,
    Zap,
    Bell,
    Settings,
    User,
    BarChart3,
    ChevronRight
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { adminNavGroups } from "./app-sidebar-nav-items";

const navigationConfig = [
  { 
      label: "MANDO", 
      href: "/dashboard-empresa", 
      icon: LayoutDashboard,
      type: 'link'
  },
  { 
      label: "CONTABILIDAD", 
      icon: Calculator,
      type: 'menu',
      items: [
          { label: "Libros", href: "/contabilidad/libros", icon: BookOpen },
          { label: "Tributos", href: "/contabilidad/tributos", icon: Landmark },
          { label: "Cuentas", href: "/contabilidad/cuentas", icon: Wallet },
          { label: "Análisis", href: "/contabilidad/analisis", icon: PieChart },
      ]
  },
  { 
      label: "AUTOMATIZACIONES", 
      href: "/automatizaciones", 
      icon: Zap,
      type: 'link',
      prefix: '⚡'
  },
  { 
      label: "REPORTES", 
      href: "/reportes", 
      icon: BarChart3,
      type: 'link',
      prefix: '📊'
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
    <header className="fixed top-0 left-0 right-0 z-[150] border-b border-white/5 bg-background/60 backdrop-blur-3xl h-20 flex items-center w-full shadow-sm overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-sm" />
      
      <div className="w-full px-4 md:px-10">
        <div className="flex items-center justify-between w-full gap-4">
          
          <div className="flex items-center gap-4">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10 rounded-xl bg-white/5 border border-border group">
                        <Menu className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0 bg-card/95 backdrop-blur-3xl border-r-white/5">
                    <SheetHeader className="p-8 border-b border-white/5 bg-muted/10">
                        <div className="flex items-center gap-4">
                            <Logo className="h-10 w-10" />
                            <SheetTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground">SISTEMA</SheetTitle>
                        </div>
                    </SheetHeader>
                    <div className="p-4 overflow-y-auto max-h-[calc(100vh-8rem)] space-y-8 py-10">
                        {adminNavGroups.map((group) => (
                            <div key={group.title}>
                                <p className="px-4 text-[8px] font-black uppercase text-primary/40 tracking-[0.4em] mb-4 italic">{group.title}</p>
                                <div className="space-y-1">
                                    {group.items.map((item) => (
                                        <SheetClose key={item.label} asChild>
                                            <Link 
                                                href={item.href as any}
                                                className={cn(
                                                    "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300",
                                                    pathname.includes(item.href) ? "bg-primary/10 text-primary" : "text-muted-foreground/60 hover:text-primary hover:bg-primary/5"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <item.icon className="h-4 w-4 opacity-40" />
                                                    <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
                                                </div>
                                                <ChevronRight className="h-3 w-3 opacity-20" />
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-3 group shrink-0">
                <Logo className="h-9 w-9 drop-shadow-glow" /> 
                <div className="flex flex-col -mt-1 hidden sm:flex">
                    <span className="text-[11px] font-black tracking-[0.3em] uppercase text-foreground italic leading-none">System Kyron</span>
                    <p className="text-[7px] font-bold text-primary uppercase tracking-[0.2em] mt-1 opacity-60">Control Maestro</p>
                </div>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center justify-center gap-1 flex-1 max-w-5xl mx-auto overflow-hidden">
            {navigationConfig.map((nav) => (
                nav.type === 'link' ? (
                    <Button 
                        key={nav.href}
                        asChild 
                        variant="ghost" 
                        className={cn(
                            "h-10 px-3 xl:px-4 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all gap-2 border border-transparent whitespace-nowrap group",
                            pathname.includes(nav.href!) 
                                ? "bg-primary/5 text-primary border-primary/10 shadow-glow-sm" 
                                : "text-muted-foreground/60 hover:text-primary hover:bg-muted/50"
                        )}
                    >
                        <Link href={nav.href as any}>
                            <nav.icon className={cn("h-3.5 w-3.5", pathname.includes(nav.href!) ? "text-primary" : "opacity-30")} />
                            {nav.prefix ? `${nav.prefix} ${nav.label}` : nav.label}
                        </Link>
                    </Button>
                ) : (
                    <DropdownMenu key={nav.label}>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="ghost" 
                                className="h-10 px-3 xl:px-4 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 hover:text-primary hover:bg-muted/50 whitespace-nowrap gap-2"
                            >
                                <nav.icon className="h-3.5 w-3.5 opacity-30" />
                                {nav.label}
                                <ChevronDown className="h-3 w-3 opacity-20" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center" className="w-64 p-2 rounded-2xl border-border bg-card/95 backdrop-blur-3xl shadow-xl">
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

          <div className="flex items-center justify-end gap-3 min-w-fit">
            <ThemeToggle />
            
            <Button variant="ghost" size="icon" asChild className="relative h-10 w-10 rounded-xl bg-white/5 border border-border group hover:bg-primary/5 hover:border-primary/20 transition-all duration-300">
                <Link href="/notificaciones">
                    <div className="relative">
                        <Bell className={cn("h-5 w-5 transition-colors", pathname.includes('/notificaciones') ? "text-primary" : "text-muted-foreground/60 group-hover:text-primary")} />
                        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></span>
                        </span>
                    </div>
                </Link>
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-xl border border-border p-0 overflow-hidden bg-muted group">
                    <Avatar className="h-full w-full rounded-none">
                    <AvatarFallback className="rounded-none font-black text-xs text-white bg-primary shadow-glow">
                        {user?.fallback || "AD"}
                    </AvatarFallback>
                    </Avatar>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 p-2 rounded-[2rem] border-border bg-card/98 backdrop-blur-3xl shadow-xl">
                <DropdownMenuLabel className="p-6 bg-muted/30 rounded-2xl mb-2">
                    <div className="flex flex-col gap-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground italic">Operador Autorizado</p>
                        <p className="text-[8px] text-muted-foreground font-mono truncate">{user?.email || "admin@kyron.com"}</p>
                    </div>
                </DropdownMenuLabel>
                
                <div className="p-1 space-y-1">
                    <DropdownMenuItem asChild className="rounded-xl h-12">
                        <Link href="/perfil" className="flex items-center px-4 text-[9px] font-black uppercase tracking-widest gap-4">
                            <User className="h-4 w-4 text-primary" />
                            <span>Mi Perfil Maestro</span>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="rounded-xl h-12">
                        <Link href="/configuracion" className="flex items-center px-4 text-[9px] font-black uppercase tracking-widest gap-4">
                            <Settings className="h-4 w-4 text-primary" />
                            <span>Configuración</span>
                        </Link>
                    </DropdownMenuItem>
                </div>

                <DropdownMenuSeparator className="my-1 border-border/50" />
                
                <DropdownMenuItem asChild className="rounded-xl h-12 text-rose-500 focus:text-white focus:bg-rose-600">
                    <Link href="/login" className="flex items-center px-4 text-[9px] font-black uppercase tracking-widest gap-4">
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
