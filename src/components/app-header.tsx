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
    ShieldCheck, 
    Cpu,
    ChevronDown,
    Activity
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

interface NavItem {
    href: string;
    label: string;
    icon: React.ElementType;
}

interface NavGroup {
    title: string;
    icon: React.ElementType;
    items: NavItem[];
    subGroups?: {
        title: string;
        icon: React.ElementType;
        items: NavItem[];
    }[];
}

interface AppHeaderProps {
    user: any;
    dashboardHref: string;
    navItems?: NavItem[];
    navGroups?: NavGroup[];
}

export function AppHeader({ user, navItems, navGroups }: AppHeaderProps) {
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
    <header className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-black/80 backdrop-blur-3xl h-16 flex items-center w-full">
      <div className="w-full px-6 md:px-12">
        <div className="flex items-center justify-between w-full gap-4">
          
          {/* LEFT: BRAND */}
          <div className="flex items-center justify-start min-w-[120px]">
            <Link href="/" className="flex items-center gap-4 group shrink-0">
                <Logo className="h-8 w-8 transition-all duration-500 group-hover:scale-110 drop-shadow-glow" />
                <span className="hidden sm:inline-block text-[11px] font-black tracking-[0.5em] uppercase text-white italic italic-shadow leading-none">KYRON</span>
            </Link>
          </div>

          {/* CENTER: CONTEXTUAL NAV (DROPDOWNS) */}
          <div className="flex-1 flex justify-center overflow-x-auto no-scrollbar">
            <nav className="flex items-center gap-2 md:gap-4 px-4">
                {/* Render Groups as Dropdowns */}
                {navGroups && navGroups.map((group) => (
                    <DropdownMenu key={group.title}>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant="ghost" 
                                className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-primary transition-all flex items-center gap-2.5 h-10 px-4 rounded-xl hover:bg-white/5 group"
                            >
                                <group.icon className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all" /> 
                                <span className="group-hover:text-white transition-colors">{group.title}</span>
                                <ChevronDown className="h-3 w-3 opacity-20 group-hover:opacity-100" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center" className="w-64 p-2 rounded-[1.5rem] border-white/10 bg-black/95 backdrop-blur-3xl shadow-2xl">
                            <DropdownMenuLabel className="px-4 py-3 text-[8px] font-black uppercase tracking-[0.4em] text-primary/60 border-b border-white/5 mb-2">
                                {group.title}
                            </DropdownMenuLabel>
                            {(group.items.length > 0 ? group.items : (group.subGroups?.flatMap(sg => sg.items) || [])).map((item) => (
                                <DropdownMenuItem key={item.href} asChild className="rounded-xl">
                                    <Link href={item.href as any} className="flex items-center py-3 px-4 text-[9px] font-bold uppercase tracking-widest text-white/70 hover:text-white">
                                        <item.icon className="mr-4 h-4 w-4 opacity-40" />
                                        <span>{item.label}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ))}

                {/* Legacy simple items */}
                {navItems && navItems.map((item) => (
                    <Link 
                        key={item.href} 
                        href={item.href as any} 
                        className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-primary transition-all flex items-center gap-2.5 whitespace-nowrap h-10 px-4 rounded-xl hover:bg-white/5 group"
                    >
                        <item.icon className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all" /> 
                        <span className="group-hover:text-white transition-colors">{item.label}</span>
                    </Link>
                ))}
            </nav>
          </div>

          {/* RIGHT: TIME & USER ACTIONS */}
          <div className="flex items-center justify-end gap-4 md:gap-6 min-w-[240px]">
            
            {/* COMPACT TIME HUD CAPSULE */}
            <div className="hidden md:flex items-center gap-4 px-5 py-2 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-xl shadow-inner">
                <div className="flex items-center gap-2.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse shadow-glow" />
                    <span className="text-xs font-mono font-black text-white tracking-widest leading-none">
                        {mounted ? time : '--:--:--'}
                    </span>
                </div>
                <div className="h-4 w-px bg-white/10" />
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20 whitespace-nowrap">Real-Time Node</span>
            </div>

            <div className="flex items-center gap-4">
                <ThemeToggle />
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-white/10 p-0 overflow-hidden hover:border-primary/40 transition-all bg-white/5 shadow-inner">
                      <Avatar className="h-full w-full rounded-none">
                        <AvatarFallback className={cn("rounded-none font-black text-[10px] text-white", user.color || "bg-primary shadow-glow")}>
                            {user.fallback}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72 p-3 rounded-[2rem] border-white/10 bg-black/95 backdrop-blur-3xl shadow-2xl">
                    <DropdownMenuLabel className="p-5 bg-white/[0.02] rounded-2xl mb-2 border border-white/5">
                       <div className="flex flex-col gap-1.5">
                          <p className="text-[11px] font-black uppercase tracking-widest text-primary">{user.name}</p>
                          <p className="text-[9px] text-white/30 truncate font-mono italic">{user.email}</p>
                       </div>
                    </DropdownMenuLabel>
                    
                    <DropdownMenuItem asChild className="rounded-xl mt-2">
                      <Link href="/seguridad" className="flex items-center py-3 px-4 text-[10px] font-black uppercase tracking-[0.2em]">
                          <ShieldCheck className="mr-4 h-4 w-4 text-primary/40" />
                          <span>Seguridad de Nodo</span>
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem asChild className="rounded-xl">
                      <Link href="/manual-usuario" className="flex items-center py-3 px-4 text-[10px] font-black uppercase tracking-[0.2em]">
                          <Cpu className="mr-4 h-4 w-4 text-primary/40" />
                          <span>Manual Técnico</span>
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator className="bg-white/5 my-2" />
                    
                    <DropdownMenuItem asChild className="rounded-xl text-red-400 focus:text-red-400 focus:bg-red-500/10">
                      <Link href="/" className="flex items-center py-3 px-4 text-[10px] font-black uppercase tracking-[0.2em]">
                          <LogOut className="mr-4 h-4 w-4" />
                          <span>Cerrar Sesión</span>
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
