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
import { Link } from "@/navigation";
import { Logo } from "./logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
    Menu, 
    Bell, 
    LogOut, 
    Lock,
    Clock,
    LayoutGrid,
    ChevronDown,
    Sparkles,
    Search
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

interface AppHeaderProps {
    user: any;
    dashboardHref: string;
    navGroups?: {
        title: string;
        icon: any;
        items: { href: string; label: string; icon: any }[];
    }[];
    showSidebarOffset?: boolean;
}

export function AppHeader({ user, dashboardHref, navGroups, showSidebarOffset = true }: AppHeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    setMounted(true);
    const updateTime = () => setTime(new Date().toLocaleTimeString('es-VE', { hour12: false }));
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className={cn(
        "fixed top-0 left-0 right-0 z-40 border-b border-white/5 bg-background/60 backdrop-blur-md h-14 flex items-center transition-all duration-300",
        showSidebarOffset && "lg:left-64"
    )}>
      <div className="w-full px-6">
        <div className="flex items-center justify-between gap-8">
          
          <div className="flex items-center gap-6 flex-1">
            <Link href="/" className="flex items-center gap-2 shrink-0">
                <Logo className="h-7 w-7" />
                {!showSidebarOffset && <span className="text-xs font-black tracking-tighter uppercase text-primary italic">Kyron</span>}
            </Link>

            <div className="hidden md:flex relative max-w-xs w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
                <Input placeholder="Buscar en el ecosistema..." className="h-8 bg-white/5 border-none rounded-lg pl-9 text-[10px] focus-visible:ring-primary/30" />
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden sm:flex items-center gap-3 text-[10px] font-mono font-bold text-muted-foreground/60">
                <Clock className="h-3 w-3" />
                {mounted ? time : '--:--:--'}
            </div>

            <div className="h-4 w-px bg-white/10" />

            <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-white/5 rounded-lg">
                    <Bell className="h-3.5 w-3.5" />
                </Button>
                <ThemeToggle />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-lg border border-white/10 p-0 overflow-hidden hover:border-primary/30 transition-all">
                  <Avatar className="h-full w-full rounded-none">
                    <AvatarFallback className={cn("rounded-none font-black text-[9px] text-white uppercase", user.color || "bg-primary/20 text-primary")}>
                        {user.fallback}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-1 rounded-xl shadow-2xl border-white/5 bg-background/95 backdrop-blur-xl">
                <DropdownMenuLabel className="p-3">
                   <div className="flex flex-col gap-0.5">
                      <p className="text-[11px] font-black uppercase">{user.name}</p>
                      <p className="text-[8px] text-muted-foreground font-bold truncate opacity-50 uppercase tracking-widest">{user.email}</p>
                   </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem asChild className="rounded-lg">
                  <Link href="/seguridad" className="flex items-center py-2 px-3 text-xs">
                      <Lock className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                      <span>Seguridad</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem asChild className="rounded-lg text-destructive focus:text-destructive focus:bg-destructive/10">
                  <Link href="/" className="flex items-center py-2 px-3 text-xs font-bold uppercase">
                      <LogOut className="mr-2 h-3.5 w-3.5" />
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
