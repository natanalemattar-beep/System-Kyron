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
import { Menu, ShieldCheck, ChevronDown, Bell, LogOut, Cog, Search, Sparkles, LayoutGrid, Globe, Zap } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { motion } from "framer-motion";

type User = {
  name: string;
  email: string;
  fallback: string;
};

type NavItem = {
    href: string;
    label: string;
    icon: React.ElementType;
};

type NavGroup = {
    title: string;
    icon: React.ElementType;
    items: NavItem[];
};

interface AppHeaderProps {
    user: User;
    navGroups?: NavGroup[];
    dashboardHref: string;
}

export function AppHeader({ user, navGroups, dashboardHref }: AppHeaderProps) {
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
    <motion.header 
      className="fixed top-0 left-0 lg:left-64 right-0 z-40 border-b bg-background/60 backdrop-blur-2xl h-16 flex items-center transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href={dashboardHref} className="lg:hidden flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Logo className="h-8 w-8" />
                <span className="text-xl font-black tracking-tighter">KYRON</span>
            </Link>
            
            <div className="hidden md:flex flex-col">
              <span className="text-[9px] font-black uppercase text-primary tracking-[0.2em] leading-none mb-1">{dateStr}</span>
              <p className="text-sm font-bold text-muted-foreground leading-none">Bienvenido, Empresa Ejemplo C.A.</p>
            </div>

            <nav className="hidden xl:flex items-center gap-1 ml-8">
                 {navGroups?.map((group) => (
                    <DropdownMenu key={group.title}>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-9 px-4 gap-1.5 font-black text-[10px] uppercase tracking-[0.1em] rounded-xl text-muted-foreground hover:bg-secondary"
                            >
                                {group.title}
                                <ChevronDown className="h-3 w-3 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-64 p-2 rounded-2xl shadow-2xl border-primary/5 bg-background/95 backdrop-blur-xl">
                            {group.items.map((item) => (
                                <DropdownMenuItem key={item.href} asChild className="rounded-xl">
                                    <Link href={item.href} className={cn("flex items-center gap-3 py-2.5", isLinkActive(item.href) && "bg-primary/5 font-bold text-primary")}>
                                        <item.icon className="h-4 w-4" />
                                        <span className="text-xs uppercase tracking-tight">{item.label}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input 
                  type="text" 
                  placeholder="Buscador inteligente..." 
                  className="bg-secondary/50 border-none h-10 w-48 pl-9 pr-4 rounded-xl text-xs focus:ring-2 focus:ring-primary/20 transition-all outline-none focus:w-64"
                />
            </div>

            <div className="flex items-center gap-1 bg-secondary/30 p-1 rounded-xl">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-1 right-1 bg-red-500 text-white text-[7px] font-black h-3.5 w-3.5 flex items-center justify-center rounded-full border border-background">3</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                    <Zap className="h-4 w-4 text-yellow-500" />
                </Button>
                <ThemeToggle />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-xl ring-offset-background hover:bg-secondary flex items-center justify-center p-0 overflow-hidden border-2 border-primary/10">
                  <Avatar className="h-full w-full rounded-none">
                    <AvatarFallback className="font-black text-xs bg-primary/5 text-primary">{user.fallback}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-2xl border-primary/5 bg-background/95 backdrop-blur-xl">
                <DropdownMenuLabel className="p-4 font-normal">
                   <div className="flex flex-col gap-1">
                      <p className="text-sm font-black tracking-tight leading-none uppercase italic">{user.name}</p>
                      <p className="text-[10px] text-muted-foreground truncate font-mono">{user.email}</p>
                   </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="mx-2" />
                <DropdownMenuItem asChild className="rounded-xl">
                  <Link href="/seguridad" className="flex items-center py-2.5 px-3">
                      <ShieldCheck className="mr-3 h-4 w-4 text-primary" />
                      <span className="font-bold text-[10px] uppercase tracking-widest">Seguridad 2FA</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl">
                  <Link href="/general" className="flex items-center py-2.5 px-3">
                      <Cog className="mr-3 h-4 w-4 text-primary" />
                      <span className="font-bold text-[10px] uppercase tracking-widest">Configuración</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="mx-2" />
                <DropdownMenuItem asChild className="rounded-xl text-destructive focus:bg-destructive/10 focus:text-destructive">
                  <Link href="/" className="flex items-center py-2.5 px-3">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="font-black text-[10px] uppercase tracking-widest">Cerrar Sesión</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10 rounded-xl bg-secondary/50">
                    <Menu className="h-5 w-5 text-primary"/>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0 flex flex-col bg-background/95 backdrop-blur-3xl border-none">
                <SheetHeader className="p-8 border-b">
                    <SheetTitle asChild>
                      <Link href={dashboardHref} className="flex items-center gap-3">
                          <Logo className="h-10 w-10" />
                          <span className="text-2xl font-black tracking-tighter uppercase italic">KYRON</span>
                      </Link>
                    </SheetTitle>
                </SheetHeader>
                <div className="flex-grow p-6 overflow-y-auto">
                  <nav className="flex flex-col gap-2">
                    {navGroups?.map(group => (
                        <div key={group.title} className="mb-6">
                            <h4 className="text-[10px] font-black uppercase text-primary/40 tracking-[0.3em] mb-3 px-2">{group.title}</h4>
                            <div className="space-y-1">
                                {group.items.map(item => (
                                    <Button key={item.href} asChild variant="ghost" className="w-full justify-start h-11 rounded-xl gap-3">
                                        <Link href={item.href}>
                                            <item.icon className="h-4 w-4 text-primary" />
                                            <span className="text-xs font-bold uppercase tracking-tight">{item.label}</span>
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}