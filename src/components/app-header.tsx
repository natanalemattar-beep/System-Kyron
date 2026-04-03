
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
    ChevronDown,
    Menu,
    Bell,
    Settings,
    User,
    Activity,
    Hexagon,
    ChevronRight,
    ShieldCheck,
    X,
    Home
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { GlobalSearch } from "./global-search";
import { BcvRateBadge } from "./bcv-rate-badge";
import { Breadcrumbs } from "./ui/breadcrumbs";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

interface AppHeaderProps {
  user: any;
  dashboardHref: string;
  navGroups?: {
    title: string;
    icon: React.ElementType;
    items: NavItem[];
  }[];
  compact?: boolean;
}

export function AppHeader({ user, dashboardHref, navGroups, compact }: AppHeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let active = true;
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/notificaciones?no_leidas=true&limit=1');
        if (!res.ok) return;
        const data = await res.json();
        if (active) setUnreadCount(data.total_no_leidas ?? 0);
      } catch {}
    };
    fetchCount();
    const interval = setInterval(fetchCount, 60000);
    return () => { active = false; clearInterval(interval); };
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  if (!mounted) return (
    <header className="fixed top-0 left-0 right-0 z-[150] bg-background/50 h-14 w-full" />
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-[150] bg-background/85 backdrop-blur-3xl h-14 flex items-center w-full shadow-[0_1px_20px_-4px_rgba(0,0,0,0.06)]">
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="w-full px-4 md:px-8">
        <Breadcrumbs dashboardHref={dashboardHref} className="absolute -bottom-5 left-4 md:left-8 opacity-60 hover:opacity-100 transition-opacity hidden md:flex" />
        <div className="flex items-center justify-between w-full gap-4">
          
          <div className="flex items-center gap-3.5">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9 rounded-xl bg-muted/40 border border-border/50">
                        <Menu className="h-4 w-4 text-foreground/60" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85vw] max-w-[340px] p-0 bg-background border-r border-border/30 flex flex-col">
                    <SheetHeader className="p-5 border-b border-border/20 bg-muted/5 flex flex-row items-center justify-between shrink-0 space-y-0">
                        <div className="flex items-center gap-3">
                            <Logo className="h-7 w-7" />
                            <div className="flex flex-col">
                                <SheetTitle className="text-[11px] font-black uppercase tracking-[0.15em] italic leading-none">System Kyron</SheetTitle>
                                <p className="text-[7px] font-bold uppercase tracking-[0.2em] mt-0.5 kyron-gradient-text">Control Corporativo</p>
                            </div>
                        </div>
                    </SheetHeader>

                    <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border/15 bg-primary/[0.03] shrink-0">
                        <Avatar className="h-9 w-9 rounded-xl">
                            <AvatarFallback className="rounded-xl font-black text-[10px] text-white bg-primary">
                                {user?.fallback || "AD"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0 flex-1">
                            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground truncate">Operador</p>
                            <p className="text-[8px] text-muted-foreground/50 font-mono truncate">{user?.email || "admin@kyron.com"}</p>
                        </div>
                    </div>

                    <div className="px-4 py-3 shrink-0">
                        <SheetClose asChild>
                            <Link href={dashboardHref as any} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/8 border border-primary/15 text-primary">
                                <Home className="h-4 w-4" />
                                <span className="text-[10px] font-black uppercase tracking-[0.15em]">Dashboard Principal</span>
                            </Link>
                        </SheetClose>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-5 custom-scrollbar">
                        {navGroups?.map((group) => (
                            <section key={group.title} className="space-y-1">
                                <div className="px-3 pt-2 pb-1.5 text-[8px] font-black uppercase text-muted-foreground/35 tracking-[0.3em] flex items-center gap-2">
                                    <group.icon className="h-3 w-3 opacity-30" />
                                    {group.title}
                                </div>
                                <div className="space-y-0.5">
                                    {group.items.filter(item => 
                                        item.href !== dashboardHref && 
                                        !['Inicio', 'Dashboard', 'Resumen General', 'Panel Central'].includes(item.label)
                                    ).map((item) => {
                                        const isActive = pathname.includes(item.href) && item.href !== '/';
                                        return (
                                            <SheetClose key={item.label} asChild>
                                                <Link
                                                    href={item.href as any}
                                                    className={cn(
                                                        "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm",
                                                        isActive 
                                                            ? "bg-primary/8 text-primary border border-primary/15" 
                                                            : "text-muted-foreground/60 hover:bg-muted/20 hover:text-foreground border border-transparent"
                                                    )}
                                                >
                                                    <item.icon className={cn("h-3.5 w-3.5 shrink-0", isActive ? "text-primary" : "opacity-40")} />
                                                    <span className="text-[10px] font-bold uppercase tracking-[0.1em]">{item.label}</span>
                                                    {item.badge && (
                                                      <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white text-[7px] font-black uppercase tracking-wider leading-none animate-pulse ml-auto shrink-0">
                                                        {item.badge}
                                                      </span>
                                                    )}
                                                    {isActive && !(item.badge) && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary shrink-0" />}
                                                </Link>
                                            </SheetClose>
                                        );
                                    })}
                                </div>
                            </section>
                        ))}
                    </div>

                    <div className="p-4 border-t border-border/15 bg-muted/5 space-y-2 shrink-0">
                        <div className="flex items-center gap-2">
                            <LanguageSwitcher variant="default" align="start" />
                            <ThemeToggle />
                            <SheetClose asChild>
                                <Button variant="ghost" size="icon" asChild className="relative h-9 w-9 rounded-xl bg-muted/40 border border-border/50">
                                    <Link href="/notificaciones">
                                        <Bell className="h-3.5 w-3.5 text-muted-foreground/50" />
                                        {unreadCount > 0 && (
                                          <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center px-0.5">
                                            {unreadCount > 99 ? '99+' : unreadCount}
                                          </span>
                                        )}
                                    </Link>
                                </Button>
                            </SheetClose>
                        </div>
                        <div className="flex gap-2">
                            <SheetClose asChild>
                                <Button variant="outline" size="sm" asChild className="flex-1 h-9 rounded-xl text-[9px] font-bold uppercase tracking-[0.1em] border-border/40">
                                    <Link href="/configuracion"><Settings className="mr-2 h-3 w-3" /> Ajustes</Link>
                                </Button>
                            </SheetClose>
                            <SheetClose asChild>
                                <Button variant="outline" size="sm" asChild className="h-9 rounded-xl text-[9px] font-bold uppercase tracking-[0.1em] text-rose-500 border-rose-500/15 hover:bg-rose-500/8">
                                    <Link href="/login"><LogOut className="h-3 w-3" /></Link>
                                </Button>
                            </SheetClose>
                        </div>
                        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-primary/[0.04] border border-primary/8">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                            <span className="text-[7px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em]">Protocolo Activo</span>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            <Link href={dashboardHref as any} className="flex items-center gap-2.5 group shrink-0">
                <Logo className="h-7 w-7 transition-transform duration-200 group-hover:scale-105" /> 
                <div className="flex-col hidden sm:flex">
                    <span className="text-[11px] font-black tracking-[0.15em] uppercase text-foreground italic leading-none">System Kyron</span>
                    <p className="text-[6px] font-bold uppercase tracking-[0.15em] mt-0.5 kyron-gradient-text opacity-70">Portal Corporativo</p>
                </div>
            </Link>
          </div>

          <nav className={cn("hidden lg:flex items-center justify-center gap-0.5 flex-1 mx-auto overflow-hidden", compact && "lg:hidden")}>
            {navGroups?.map((group) => {
                const filteredItems = group.items.filter(item => 
                    item.href !== dashboardHref && 
                    !['Inicio', 'Dashboard', 'Resumen General', 'Panel Central'].includes(item.label)
                );
                const useWideLayout = filteredItems.length > 6;
                const hasActiveItem = filteredItems.some(item => pathname.includes(item.href) && item.href !== '/');
                return (
                <DropdownMenu key={group.title} open={openMenu === group.title} onOpenChange={(isOpen) => setOpenMenu(isOpen ? group.title : null)}>
                    <DropdownMenuTrigger asChild>
                        <Button 
                            variant="ghost" 
                            className={cn(
                                "h-8 px-2.5 rounded-lg text-[8px] font-black uppercase tracking-[0.06em] hover:text-primary hover:bg-primary/5 whitespace-nowrap gap-1.5 group transition-all duration-200 data-[state=open]:text-primary data-[state=open]:bg-primary/5",
                                hasActiveItem ? "text-primary/80" : "text-muted-foreground/55"
                            )}
                        >
                            <group.icon className="h-3 w-3 opacity-40 group-data-[state=open]:opacity-80 transition-opacity" />
                            {group.title}
                            <ChevronDown className="h-2.5 w-2.5 opacity-20 group-data-[state=open]:rotate-180 transition-transform duration-200" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className={cn(
                        "p-3 rounded-2xl border-border/30 bg-card/98 backdrop-blur-3xl shadow-xl overflow-hidden",
                        useWideLayout ? "w-[580px]" : "w-[460px]"
                    )}>
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                        <DropdownMenuLabel className="p-2.5 mb-2.5 bg-primary/[0.04] rounded-xl border border-primary/8">
                            <div className="flex items-center gap-2.5">
                                <div className="p-1.5 rounded-lg bg-primary">
                                    <group.icon className="h-3.5 w-3.5 text-white" />
                                </div>
                                <span className="text-[9px] font-black text-foreground uppercase tracking-[0.2em]">{group.title}</span>
                                <span className="text-[8px] font-medium text-muted-foreground/40 ml-auto">{filteredItems.length} módulos</span>
                            </div>
                        </DropdownMenuLabel>
                        <div className="grid gap-1 grid-cols-2">
                            {filteredItems.map((item) => {
                                const isActive = pathname.includes(item.href) && item.href !== '/';
                                return (
                                <DropdownMenuItem key={item.href} asChild className={cn(
                                    "rounded-xl h-9 cursor-pointer transition-all",
                                    isActive ? "bg-primary/8 text-primary" : "hover:bg-muted/40"
                                )}>
                                    <Link href={item.href as any} className="flex items-center px-2.5 text-[8px] font-bold uppercase tracking-[0.1em] gap-2.5">
                                        <div className={cn(
                                            "p-1 rounded-md border shrink-0 transition-colors",
                                            isActive
                                                ? "bg-primary/10 border-primary/20"
                                                : "bg-muted/50 border-border/30 group-hover:bg-primary/5"
                                        )}>
                                            <item.icon className={cn("h-3 w-3", isActive ? "text-primary" : "text-muted-foreground/60")} />
                                        </div>
                                        <span>{item.label}</span>
                                        {item.badge && (
                                          <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white text-[6px] font-black uppercase tracking-wider leading-none ml-auto shrink-0">
                                            {item.badge}
                                          </span>
                                        )}
                                    </Link>
                                </DropdownMenuItem>
                                );
                            })}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
                );
            })}
          </nav>

          <div className="flex items-center justify-end gap-2 min-w-fit">
            <div className="hidden md:block">
              <BcvRateBadge />
            </div>
            <GlobalSearch />
            <div className="hidden sm:flex items-center gap-1.5">
                <LanguageSwitcher variant="default" align="end" />
                <ThemeToggle />
                <Button variant="ghost" size="icon" asChild className="relative h-8 w-8 rounded-lg bg-muted/30 border border-border/40 group hover:bg-muted/50 transition-all">
                    <Link href="/notificaciones">
                        <Bell className={cn(
                            "h-3.5 w-3.5 transition-colors",
                            pathname.includes('/notificaciones') ? "text-primary" : "text-muted-foreground/50 group-hover:text-primary"
                        )} />
                        {unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center px-0.5 shadow-sm shadow-red-500/20 animate-in zoom-in">
                            {unreadCount > 99 ? '99+' : unreadCount}
                          </span>
                        )}
                    </Link>
                </Button>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-lg border border-border/40 p-0 overflow-hidden bg-muted/30 group hover:border-primary/30 transition-all">
                    <Avatar className="h-full w-full rounded-none">
                    <AvatarFallback className="rounded-none font-black text-[9px] text-white bg-primary">
                        {user?.fallback || "AD"}
                    </AvatarFallback>
                    </Avatar>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-border/30 bg-card/98 backdrop-blur-3xl shadow-xl">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                    <DropdownMenuLabel className="p-3 bg-muted/20 rounded-xl mb-1.5">
                        <div className="flex flex-col gap-0.5">
                            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-foreground italic leading-none">Operador</p>
                            <p className="text-[8px] text-muted-foreground/40 font-mono truncate">{user?.email || "admin@kyron.com"}</p>
                        </div>
                    </DropdownMenuLabel>
                    
                    <div className="space-y-0.5">
                        <DropdownMenuItem asChild className="rounded-lg h-9 cursor-pointer">
                            <Link href={dashboardHref === "/dashboard-empresa" ? "/perfil-empresa" : "/perfil"} className="flex items-center px-3 text-[9px] font-bold uppercase tracking-[0.1em] gap-2.5">
                                <User className="h-3.5 w-3.5 text-primary/50" />
                                <span>Mi Perfil</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="rounded-lg h-9 cursor-pointer">
                            <Link href="/configuracion" className="flex items-center px-3 text-[9px] font-bold uppercase tracking-[0.1em] gap-2.5">
                                <Settings className="h-3.5 w-3.5 text-primary/50" />
                                <span>Ajustes</span>
                            </Link>
                        </DropdownMenuItem>
                    </div>

                    <DropdownMenuSeparator className="my-1 opacity-30" />
                    
                    <DropdownMenuItem asChild className="rounded-lg h-9 text-rose-500 focus:text-white focus:bg-rose-600 cursor-pointer">
                        <Link href="/login" className="flex items-center px-3 text-[9px] font-bold uppercase tracking-[0.1em] gap-2.5">
                            <LogOut className="h-3.5 w-3.5" />
                            <span>Salir</span>
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
