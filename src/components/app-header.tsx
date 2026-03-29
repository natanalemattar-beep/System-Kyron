
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
    LayoutGrid,
    ChevronRight,
    ShieldCheck,
    X,
    Home
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";

interface AppHeaderProps {
  user: any;
  dashboardHref: string;
  navGroups?: {
    title: string;
    icon: React.ElementType;
    items: {
      href: string;
      label: string;
      icon: React.ElementType;
    }[];
  }[];
}

export function AppHeader({ user, dashboardHref, navGroups }: AppHeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  if (!mounted) return (
    <header className="fixed top-0 left-0 right-0 z-[150] bg-background/50 h-16 w-full" />
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-[150] border-b border-white/5 bg-background/60 backdrop-blur-2xl h-16 flex items-center w-full shadow-sm">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="w-full px-4 md:px-8">
        <div className="flex items-center justify-between w-full gap-4">
          
          <div className="flex items-center gap-4">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9 rounded-lg bg-white/5 border border-border">
                        <Menu className="h-4 w-4 text-primary" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85vw] max-w-[340px] p-0 bg-background border-r border-white/5 flex flex-col">
                    <SheetHeader className="p-5 border-b border-white/5 bg-muted/5 flex flex-row items-center justify-between shrink-0 space-y-0">
                        <div className="flex items-center gap-3">
                            <Logo className="h-7 w-7" />
                            <div className="flex flex-col">
                                <SheetTitle className="text-[10px] font-black uppercase tracking-widest italic leading-none">System Kyron</SheetTitle>
                                <p className="text-[7px] font-bold text-primary uppercase tracking-[0.2em] mt-0.5 opacity-60">Control Corporativo</p>
                            </div>
                        </div>
                    </SheetHeader>

                    <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-primary/5 shrink-0">
                        <Avatar className="h-9 w-9 rounded-xl">
                            <AvatarFallback className="rounded-xl font-black text-[10px] text-white bg-primary">
                                {user?.fallback || "AD"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0 flex-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-foreground truncate">Operador</p>
                            <p className="text-[8px] text-muted-foreground font-mono truncate opacity-60">{user?.email || "admin@kyron.com"}</p>
                        </div>
                    </div>

                    <div className="px-4 py-3 shrink-0">
                        <SheetClose asChild>
                            <Link href={dashboardHref as any} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                                <Home className="h-4 w-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Dashboard Principal</span>
                            </Link>
                        </SheetClose>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-6 custom-scrollbar">
                        {navGroups?.map((group) => (
                            <section key={group.title} className="space-y-1.5">
                                <div className="px-3 pt-2 pb-1 text-[8px] font-black uppercase text-primary/50 tracking-[0.4em] flex items-center gap-2">
                                    <group.icon className="h-3 w-3 opacity-40" />
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
                                                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm",
                                                        isActive 
                                                            ? "bg-primary/10 text-primary border border-primary/20" 
                                                            : "text-muted-foreground/70 hover:bg-muted/30 hover:text-foreground border border-transparent"
                                                    )}
                                                >
                                                    <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "opacity-50")} />
                                                    <span className="text-[10px] font-black uppercase tracking-[0.15em] truncate">{item.label}</span>
                                                    {isActive && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary shrink-0" />}
                                                </Link>
                                            </SheetClose>
                                        );
                                    })}
                                </div>
                            </section>
                        ))}
                    </div>

                    <div className="p-4 border-t border-white/5 bg-muted/5 space-y-2 shrink-0">
                        <div className="flex items-center gap-2">
                            <LanguageSwitcher variant="default" align="start" />
                            <ThemeToggle />
                            <SheetClose asChild>
                                <Button variant="ghost" size="icon" asChild className="h-9 w-9 rounded-lg bg-white/5 border border-border">
                                    <Link href="/notificaciones">
                                        <Bell className="h-4 w-4 text-muted-foreground/60" />
                                    </Link>
                                </Button>
                            </SheetClose>
                        </div>
                        <div className="flex gap-2">
                            <SheetClose asChild>
                                <Button variant="outline" size="sm" asChild className="flex-1 h-9 rounded-lg text-[9px] font-black uppercase tracking-widest">
                                    <Link href="/configuracion"><Settings className="mr-2 h-3 w-3" /> Ajustes</Link>
                                </Button>
                            </SheetClose>
                            <SheetClose asChild>
                                <Button variant="outline" size="sm" asChild className="h-9 rounded-lg text-[9px] font-black uppercase tracking-widest text-rose-500 border-rose-500/20 hover:bg-rose-500/10">
                                    <Link href="/login"><LogOut className="h-3 w-3" /></Link>
                                </Button>
                            </SheetClose>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-primary/5 border border-primary/10">
                            <Activity className="h-3 w-3 text-emerald-500 animate-pulse shrink-0" />
                            <span className="text-[7px] font-black text-foreground/50 uppercase tracking-widest">Protocolo Activo · Sync T+0</span>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            <Link href={dashboardHref as any} className="flex items-center gap-3 group shrink-0">
                <Logo className="h-8 w-8 transition-transform group-hover:scale-105" /> 
                <div className="flex flex-col -mt-0.5 hidden sm:flex">
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-foreground italic leading-none">System Kyron</span>
                    <p className="text-[6px] font-bold text-primary uppercase tracking-[0.2em] mt-1 opacity-50">Portal Corporativo</p>
                </div>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center justify-center gap-0.5 flex-1 mx-auto overflow-hidden">
            {navGroups?.map((group) => {
                const filteredItems = group.items.filter(item => 
                    item.href !== dashboardHref && 
                    !['Inicio', 'Dashboard', 'Resumen General', 'Panel Central'].includes(item.label)
                );
                const useWideLayout = filteredItems.length > 6;
                return (
                <DropdownMenu key={group.title} open={openMenu === group.title} onOpenChange={(isOpen) => setOpenMenu(isOpen ? group.title : null)}>
                    <DropdownMenuTrigger asChild>
                        <Button 
                            variant="ghost" 
                            className="h-9 px-2.5 rounded-lg text-[8px] font-black uppercase tracking-[0.08em] text-muted-foreground/60 hover:text-primary hover:bg-muted/50 whitespace-nowrap gap-1.5 group data-[state=open]:text-primary"
                        >
                            <group.icon className="h-3 w-3 opacity-40 group-data-[state=open]:opacity-100" />
                            {group.title}
                            <ChevronDown className="h-2.5 w-2.5 opacity-20 group-data-[state=open]:rotate-180 transition-transform" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className={cn("p-3 rounded-[2rem] border-border bg-card/98 backdrop-blur-3xl shadow-2xl overflow-hidden", useWideLayout ? "w-[560px]" : "w-[400px]")}>
                        <DropdownMenuLabel className="p-3 mb-3 bg-primary/5 rounded-2xl border border-primary/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-xl">
                                    <group.icon className="h-4 w-4 text-primary" />
                                </div>
                                <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">{group.title}</span>
                                <span className="text-[8px] font-bold text-muted-foreground ml-auto">{filteredItems.length} módulos</span>
                            </div>
                        </DropdownMenuLabel>
                        <div className="grid gap-1.5 grid-cols-2">
                            {filteredItems.map((item) => (
                                <DropdownMenuItem key={item.href} asChild className="rounded-xl h-10 focus:bg-primary/5 group/item cursor-pointer">
                                    <Link href={item.href as any} className="flex items-center px-3 text-[8px] font-black uppercase tracking-widest gap-2.5">
                                        <div className="p-1.5 bg-muted rounded-lg border border-border group-hover/item:bg-primary/10 transition-colors shrink-0">
                                            <item.icon className="h-3 w-3 text-muted-foreground group-hover/item:text-primary" />
                                        </div>
                                        <span className="group-hover/item:text-foreground transition-colors truncate">{item.label}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
                );
            })}
          </nav>

          <div className="flex items-center justify-end gap-3 min-w-fit">
            <div className="hidden sm:flex items-center gap-2">
                <LanguageSwitcher variant="default" align="end" />
                <ThemeToggle />
                <Button variant="ghost" size="icon" asChild className="relative h-9 w-9 rounded-lg bg-white/5 border border-border group">
                    <Link href="/notificaciones">
                        <Bell className={cn("h-4 w-4 transition-colors", pathname.includes('/notificaciones') ? "text-primary" : "text-muted-foreground/60 group-hover:text-primary")} />
                        <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-rose-500 shadow-glow-sm" />
                    </Link>
                </Button>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-lg border border-border p-0 overflow-hidden bg-muted group">
                    <Avatar className="h-full w-full rounded-none">
                    <AvatarFallback className="rounded-none font-black text-[10px] text-white bg-primary shadow-glow">
                        {user?.fallback || "AD"}
                    </AvatarFallback>
                    </Avatar>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2 rounded-[1.5rem] border-border bg-card/98 backdrop-blur-3xl shadow-xl">
                    <DropdownMenuLabel className="p-4 bg-muted/30 rounded-xl mb-2">
                        <div className="flex flex-col gap-0.5">
                            <p className="text-[9px] font-black uppercase tracking-widest text-foreground italic leading-none">Operador</p>
                            <p className="text-[8px] text-muted-foreground font-mono truncate opacity-60">{user?.email || "admin@kyron.com"}</p>
                        </div>
                    </DropdownMenuLabel>
                    
                    <div className="space-y-0.5">
                        <DropdownMenuItem asChild className="rounded-lg h-10">
                            <Link href="/perfil" className="flex items-center px-3 text-[9px] font-black uppercase tracking-widest gap-3">
                                <User className="h-3.5 w-3.5 text-primary/60" />
                                <span>Mi Perfil</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="rounded-lg h-10">
                            <Link href="/configuracion" className="flex items-center px-3 text-[9px] font-black uppercase tracking-widest gap-3">
                                <Settings className="h-3.5 w-3.5 text-primary/60" />
                                <span>Ajustes</span>
                            </Link>
                        </DropdownMenuItem>
                    </div>

                    <DropdownMenuSeparator className="my-1 opacity-50" />
                    
                    <DropdownMenuItem asChild className="rounded-lg h-10 text-rose-500 focus:text-white focus:bg-rose-600">
                        <Link href="/login" className="flex items-center px-3 text-[9px] font-black uppercase tracking-widest gap-3">
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
