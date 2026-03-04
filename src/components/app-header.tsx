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
    LayoutGrid,
    Zap,
    Menu
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
    user: any;
    dashboardHref: string;
}

export function AppHeader({ user, dashboardHref }: AppHeaderProps) {
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
    <header className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-[#020202]/90 backdrop-blur-3xl h-16 flex items-center w-full shadow-2xl">
      <div className="w-full px-4 md:px-10">
        <div className="flex items-center justify-between w-full">
          
          <div className="flex items-center gap-4 md:gap-10">
            <Link href="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
                <Logo className="h-7 w-7 md:h-8 md:w-8 transition-transform group-hover:scale-110 shadow-glow" />
                <span className="text-[10px] md:text-xs font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-primary italic">System Kyron</span>
            </Link>
            <div className="h-6 w-px bg-white/10 hidden sm:block" />
            <nav className="hidden md:flex items-center gap-6 lg:gap-10">
                <Link href="/dashboard-empresa" className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-primary transition-all flex items-center gap-2">
                    <LayoutGrid className="h-3 w-3" /> Consola
                </Link>
                <Link href="/kyron-vault" className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-primary transition-all flex items-center gap-2">
                    <Lock className="h-3 w-3" /> Bóveda
                </Link>
                <Link href="/ecosistema" className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-primary transition-all flex items-center gap-2">
                    <Zap className="h-3 w-3" /> Ecosistema
                </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden lg:flex items-center gap-3 text-[9px] font-mono font-black text-primary/60 italic bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10 shadow-inner">
                <Clock className="h-3 w-3 animate-pulse" />
                {mounted ? time : '--:--:--'}
            </div>

            <div className="flex items-center gap-2 md:gap-3 border-l border-white/10 pl-3 md:pl-6">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-white/30 hover:bg-white/5 rounded-xl border border-transparent hover:border-white/5 hidden xs:flex">
                    <Bell className="h-4 w-4" />
                </Button>
                <ThemeToggle />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 md:h-10 md:w-10 rounded-xl border border-white/10 p-0 overflow-hidden hover:border-primary/50 transition-all bg-white/[0.03]">
                      <Avatar className="h-full w-full rounded-none">
                        <AvatarFallback className={cn("rounded-none font-black text-[9px] md:text-[10px] text-white uppercase", user.color || "bg-primary")}>
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
                    <DropdownMenuItem asChild className="rounded-xl md:hidden">
                      <Link href="/dashboard-empresa" className="flex items-center py-3 px-4 text-[10px] font-bold uppercase tracking-widest">
                          <LayoutGrid className="mr-3 h-4 w-4 text-primary" />
                          <span>Consola Central</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-xl md:hidden">
                      <Link href="/kyron-vault" className="flex items-center py-3 px-4 text-[10px] font-bold uppercase tracking-widest">
                          <Lock className="mr-3 h-4 w-4 text-primary" />
                          <span>Bóveda Privada</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-xl">
                      <Link href="/seguridad" className="flex items-center py-3 px-4 text-[10px] font-bold uppercase tracking-widest">
                          <Zap className="mr-3 h-4 w-4 text-primary" />
                          <span>Seguridad de Datos</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/5" />
                    <DropdownMenuItem asChild className="rounded-xl text-red-400 focus:text-red-400 focus:bg-red-500/10">
                      <Link href="/" className="flex items-center py-3 px-4 text-[10px] font-black uppercase tracking-[0.2em]">
                          <LogOut className="mr-3 h-4 w-4" />
                          <span>Desconectar Nodo</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
