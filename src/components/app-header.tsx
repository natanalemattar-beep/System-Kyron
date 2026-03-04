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
    LogOut, 
    Lock,
    Clock,
    LayoutGrid,
    Zap,
    ShieldCheck
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

interface AppHeaderProps {
    user: any;
    dashboardHref: string;
}

export function AppHeader({ user }: AppHeaderProps) {
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
    <header className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-black/80 backdrop-blur-md h-14 flex items-center w-full">
      <div className="w-full px-6 md:px-10">
        <div className="grid grid-cols-3 items-center w-full">
          
          {/* SECCIÓN IZQUIERDA: Navegación */}
          <div className="flex items-center gap-8">
            <nav className="hidden lg:flex items-center gap-6">
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

          {/* SECCIÓN CENTRAL: Identidad (Perfectamente Centrada) */}
          <div className="flex justify-center">
            <Link href="/" className="flex items-center gap-3 group shrink-0">
                <Logo className="h-6 w-6 transition-transform group-hover:scale-110 drop-shadow-glow" />
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white italic italic-shadow">System Kyron</span>
            </Link>
          </div>

          {/* SECCIÓN DERECHA: Perfil y Tiempo */}
          <div className="flex items-center justify-end gap-6">
            <div className="hidden sm:flex items-center gap-3 text-[9px] font-mono font-black text-primary bg-primary/5 px-3 py-1 rounded-md border border-primary/10 shadow-glow">
                <Clock className="h-3 w-3" />
                {mounted ? time : '--:--:--'}
            </div>

            <div className="flex items-center gap-3">
                <ThemeToggle />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full border border-white/10 p-0 overflow-hidden hover:border-primary/40 transition-all bg-white/5">
                      <Avatar className="h-full w-full rounded-none">
                        <AvatarFallback className="rounded-none font-black text-[9px] text-white bg-transparent">
                            {user.fallback}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 p-2 rounded-xl border-white/10 bg-black/95 backdrop-blur-3xl shadow-2xl">
                    <DropdownMenuLabel className="p-4">
                       <div className="flex flex-col gap-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-primary">{user.name}</p>
                          <p className="text-[9px] text-white/40 truncate font-mono">{user.email}</p>
                       </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/5" />
                    <DropdownMenuItem asChild className="rounded-lg">
                      <Link href="/seguridad" className="flex items-center py-2.5 px-3 text-[9px] font-black uppercase tracking-[0.2em]">
                          <ShieldCheck className="mr-3 h-4 w-4 text-primary/40" />
                          <span>Seguridad</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/5" />
                    <DropdownMenuItem asChild className="rounded-lg text-red-400 focus:text-red-400 focus:bg-red-500/10">
                      <Link href="/" className="flex items-center py-2.5 px-3 text-[9px] font-black uppercase tracking-[0.2em]">
                          <LogOut className="mr-3 h-4 w-4" />
                          <span>Desconectar</span>
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