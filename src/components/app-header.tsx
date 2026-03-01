
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
import { Menu, ShieldCheck, ChevronDown, Bell, LogOut, Cog, Search, Sparkles } from "lucide-react";
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
    subGroups?: {
        title: string;
        icon: React.ElementType;
        items: NavItem[];
    }[];
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

  const isLinkActive = (itemHref: string) => {
    return pathname === itemHref || pathname.startsWith(itemHref + '/');
  }

  const isGroupActive = (group: NavGroup) => {
    if (!group) return false;
    const allHrefs = [
      ...group.items.map(i => i.href),
      ...(group.subGroups?.flatMap(sg => sg.items.map(i => i.href)) || [])
    ];
    return allHrefs.some(href => isLinkActive(href));
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 lg:left-64 right-0 z-40 border-b bg-background/80 backdrop-blur-xl h-16 flex items-center transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo solo en móvil o si no hay sidebar */}
            <Link href={dashboardHref} className="lg:hidden flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Logo className="h-8 w-8" />
                <span className="text-xl font-black tracking-tighter">KYRON</span>
            </Link>
            
            <div className="hidden md:flex flex-col">
              <span className="text-[9px] font-black uppercase text-primary tracking-[0.2em] leading-none mb-1">{dateStr}</span>
              <p className="text-sm font-bold text-muted-foreground leading-none">Bienvenido, Empresa Ejemplo C.A.</p>
            </div>

            <nav className="hidden lg:flex items-center gap-1 ml-8">
                 {navGroups?.map((group) => (
                    <DropdownMenu key={group.title}>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className={cn(
                                    "h-9 px-4 gap-1.5 font-black text-[10px] uppercase tracking-[0.1em] rounded-xl transition-all",
                                    isGroupActive(group) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary"
                                )}
                            >
                                {group.title}
                                <ChevronDown className="h-3 w-3 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-64 p-2 rounded-2xl shadow-2xl border-primary/5">
                          {group.subGroups && group.subGroups.length > 0 ? group.subGroups.map((subGroup) => (
                              <div key={subGroup.title}>
                                <DropdownMenuLabel className="px-3 py-2 text-[9px] font-black uppercase text-muted-foreground tracking-widest opacity-60">
                                  {subGroup.title}
                                </DropdownMenuLabel>
                                {subGroup.items.map((item) => (
                                  <DropdownMenuItem key={item.href} asChild className="rounded-xl">
                                    <Link href={item.href} className={cn("flex items-center gap-3 py-2.5", isLinkActive(item.href) && "bg-primary/5 font-bold text-primary")}>
                                        <item.icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                  </DropdownMenuItem>
                                ))}
                                <DropdownMenuSeparator className="my-2 opacity-50" />
                              </div>
                            ))
                          : 
                            group.items.map((item) => (
                                <DropdownMenuItem key={item.href} asChild className="rounded-xl">
                                    <Link href={item.href} className={cn("flex items-center gap-3 py-2.5", isLinkActive(item.href) && "bg-primary/5 font-bold text-primary")}>
                                        <item.icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                </DropdownMenuItem>
                            ))
                          }
                        </DropdownMenuContent>
                    </DropdownMenu>
                ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Buscar módulo..." 
                  className="bg-secondary/50 border-none h-10 w-48 pl-9 pr-4 rounded-xl text-xs focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
            </div>

            <div className="relative">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/5 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 bg-red-500 text-white text-[8px] font-black h-4 w-4 flex items-center justify-center rounded-full border-2 border-background">3</span>
              </Button>
            </div>
            
            <ThemeToggle />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-xl ring-offset-background hover:bg-secondary flex items-center justify-center p-0">
                  <Avatar className="h-9 w-9 rounded-xl overflow-hidden border-2 border-primary/10">
                    <AvatarFallback className="font-black text-xs bg-primary/5 text-primary">{user.fallback}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-2xl border-primary/5">
                <DropdownMenuLabel className="p-4 font-normal">
                   <div className="flex flex-col gap-1">
                      <p className="text-sm font-black tracking-tight leading-none">{user.name}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
                   </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="mx-2" />
                <DropdownMenuItem asChild className="rounded-xl">
                  <Link href="/seguridad" className="flex items-center py-2.5 px-3">
                      <ShieldCheck className="mr-3 h-4 w-4 text-primary" />
                      <span className="font-bold text-xs uppercase tracking-widest">Seguridad</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl">
                  <Link href="/general" className="flex items-center py-2.5 px-3">
                      <Cog className="mr-3 h-4 w-4 text-primary" />
                      <span className="font-bold text-xs uppercase tracking-widest">Configuración</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="mx-2" />
                <DropdownMenuItem asChild className="rounded-xl text-destructive focus:bg-destructive/10 focus:text-destructive">
                  <Link href="/" className="flex items-center py-2.5 px-3">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="font-black text-xs uppercase tracking-widest">Cerrar Sesión</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10 rounded-xl">
                    <Menu className="h-6 w-6"/>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0 flex flex-col bg-background/95 backdrop-blur-xl">
                <SheetHeader className="p-6 border-b">
                    <SheetTitle asChild>
                      <Link href={dashboardHref} className="flex items-center gap-2">
                          <Logo className="h-8 w-8" />
                          <span className="text-xl font-black tracking-tighter uppercase italic">KYRON</span>
                      </Link>
                    </SheetTitle>
                </SheetHeader>
                <div className="flex-grow p-4">
                  <p className="text-muted-foreground italic text-center py-12">Menú móvil sincronizado...</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
