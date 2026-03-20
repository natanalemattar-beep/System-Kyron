
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
    ChevronDown,
    Menu,
    Bell,
    Settings,
    User,
    Activity,
    LayoutGrid
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { AppSidebar } from "./app-sidebar";
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
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <header className="fixed top-0 left-0 right-0 z-[150] bg-background/50 h-16 w-full" />
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-[150] border-b border-white/5 bg-background/60 backdrop-blur-2xl h-16 flex items-center w-full shadow-sm overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="w-full px-4 md:px-8">
        <div className="flex items-center justify-between w-full gap-4">
          
          <div className="flex items-center gap-4">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9 rounded-lg bg-white/5 border border-border">
                        <Menu className="h-4 w-4 text-primary" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0 bg-card/95 backdrop-blur-3xl border-r-white/5 flex flex-col">
                    <SheetHeader className="p-6 border-b border-white/5">
                        <SheetTitle className="sr-only">Navegación Kyron</SheetTitle>
                        <div className="flex items-center gap-3">
                            <Logo className="h-7 w-7" />
                            <span className="text-[10px] font-black uppercase tracking-widest italic">System Kyron</span>
                        </div>
                    </SheetHeader>
                    <AppSidebar />
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

          <nav className="hidden lg:flex items-center justify-center gap-1 flex-1 max-w-4xl mx-auto overflow-hidden">
            {navGroups?.map((group) => (
                <DropdownMenu key={group.title}>
                    <DropdownMenuTrigger asChild>
                        <Button 
                            variant="ghost" 
                            className="h-9 px-3 rounded-lg text-[9px] font-black uppercase tracking-[0.1em] text-muted-foreground/60 hover:text-primary hover:bg-muted/50 whitespace-nowrap gap-2 group data-[state=open]:text-primary"
                        >
                            <group.icon className="h-3 w-3 opacity-40 group-data-[state=open]:opacity-100" />
                            {group.title}
                            <ChevronDown className="h-2.5 w-2.5 opacity-20 group-data-[state=open]:rotate-180 transition-transform" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-[440px] p-3 rounded-[2rem] border-border bg-card/98 backdrop-blur-3xl shadow-2xl overflow-hidden">
                        <DropdownMenuLabel className="p-3 mb-3 bg-primary/5 rounded-2xl border border-primary/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-xl">
                                    <group.icon className="h-4 w-4 text-primary" />
                                </div>
                                <span className="text-[9px] font-black text-primary uppercase tracking-[0.3em]">{group.title}</span>
                            </div>
                        </DropdownMenuLabel>
                        <div className="grid grid-cols-2 gap-1.5">
                            {group.items.filter(item => 
                                item.href !== dashboardHref && 
                                !['Inicio', 'Dashboard', 'Resumen General', 'Panel Central'].includes(item.label)
                            ).map((item) => (
                                <DropdownMenuItem key={item.href} asChild className="rounded-xl h-11 focus:bg-primary/5 group/item cursor-pointer">
                                    <Link href={item.href as any} className="flex items-center px-3 text-[9px] font-black uppercase tracking-widest gap-3">
                                        <div className="p-1.5 bg-muted rounded-lg border border-border group-hover/item:bg-primary/10 transition-colors">
                                            <item.icon className="h-3.5 w-3.5 text-muted-foreground group-hover/item:text-primary" />
                                        </div>
                                        <span className="group-hover/item:text-foreground transition-colors">{item.label}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            ))}
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
