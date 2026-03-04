
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
import { 
    Bell, 
    LogOut, 
    Lock,
    Clock,
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
        "fixed top-0 right-0 z-40 border-b border-white/5 bg-[#020202]/80 backdrop-blur-xl h-16 flex items-center transition-all duration-300",
        showSidebarOffset ? "lg:left-64 left-0" : "left-0"
    )}>
      <div className="w-full px-8">
        <div className="flex items-center justify-between gap-12">
          
          <div className="flex items-center gap-8 flex-1">
            <Link href="/" className="flex items-center gap-3 shrink-0">
                <Logo className="h-8 w-8" />
                {!showSidebarOffset && <span className="text-xs font-black tracking-[0.2em] uppercase text-primary italic hidden sm:block">System Kyron</span>}
            </Link>

            <div className="hidden md:flex relative max-w-sm w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                <Input placeholder="Buscar en consola maestro..." className="h-10 bg-white/[0.03] border-white/5 rounded-xl pl-11 text-[10px] uppercase font-bold tracking-widest focus-visible:ring-primary/20" />
            </div>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <div className="hidden sm:flex items-center gap-3 text-[10px] font-mono font-black text-primary/40 italic">
                <Clock className="h-3.5 w-3.5" />
                {mounted ? time : '--:--:--'}
            </div>

            <div className="h-6 w-px bg-white/5" />

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-10 w-10 text-white/30 hover:bg-white/5 rounded-xl">
                    <Bell className="h-4 w-4" />
                </Button>
                <ThemeToggle />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-xl border border-white/5 p-0 overflow-hidden hover:border-primary/30 transition-all bg-white/[0.02]">
                  <Avatar className="h-full w-full rounded-none">
                    <AvatarFallback className={cn("rounded-none font-black text-[10px] text-white uppercase", user.color || "bg-primary/20 text-primary")}>
                        {user.fallback}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 rounded-[1.5rem] border-white/10 bg-black/95 backdrop-blur-3xl shadow-2xl">
                <DropdownMenuLabel className="p-4">
                   <div className="flex flex-col gap-1">
                      <p className="text-[11px] font-black uppercase text-white tracking-tighter">{user.name}</p>
                      <p className="text-[8px] text-muted-foreground font-bold truncate opacity-40 uppercase tracking-[0.2em]">{user.email}</p>
                   </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem asChild className="rounded-xl">
                  <Link href="/seguridad" className="flex items-center py-3 px-4 text-[10px] font-bold uppercase tracking-widest">
                      <Lock className="mr-3 h-4 w-4 text-primary" />
                      <span>Seguridad</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem asChild className="rounded-xl text-red-400 focus:text-red-400 focus:bg-red-500/10">
                  <Link href="/" className="flex items-center py-3 px-4 text-[10px] font-black uppercase tracking-[0.2em]">
                      <LogOut className="mr-3 h-4 w-4" />
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
