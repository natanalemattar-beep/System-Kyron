
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "@/navigation";
import { Logo } from "./logo";
import { 
    LogOut, 
    ShieldCheck, 
    ChevronDown,
    Bell,
    Search,
    Signal,
    Activity,
    Calculator,
    LayoutGrid,
    Menu,
    Settings,
    Globe
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

interface NavItem {
    href: string;
    label: string;
    icon: React.ElementType;
}

interface NavGroup {
    title: string;
    icon: React.ElementType;
    items: NavItem[];
}

interface AppHeaderProps {
    user: any;
    dashboardHref: string;
    navGroups?: NavGroup[];
}

export function AppHeader({ user, navGroups, dashboardHref }: AppHeaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Filtramos solo los grupos contables para evitar "ligues" con otros módulos
  const accountingGroups = navGroups?.filter(g => 
    g.title === "Contabilidad" || g.title === "Administración" || g.title === "Finanzas"
  ) || [];

  return (
    <header className="fixed top-0 left-0 right-0 z-[150] border-b border-border bg-background/80 backdrop-blur-3xl h-16 flex items-center w-full shadow-2xl">
      <div className="w-full px-6 md:px-10">
        <div className="flex items-center justify-between w-full gap-8">
          
          {/* BRAND (LEFT) */}
          <div className="flex items-center gap-8 min-w-fit">
            <Link href="/" className="flex items-center gap-4 group shrink-0">
                <Logo className="h-9 w-9 transition-all duration-500 group-hover:scale-110 drop-shadow-glow" />
                <div className="flex flex-col -mt-1">
                    <span className="text-xs font-black tracking-[0.4em] uppercase text-foreground italic italic-shadow leading-none">System Kyron</span>
                    <p className="text-[7px] font-bold text-primary uppercase tracking-[0.3em] mt-1 opacity-60">Control Maestro</p>
                </div>
            </Link>

            {/* MÓDULOS DROPDOWN (Reemplaza la barra lateral) */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-xl border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest gap-3 h-10 px-5 shadow-glow-sm">
                        <Calculator className="h-4 w-4" /> MÓDULOS <ChevronDown className="h-3 w-3 opacity-40" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 p-2 rounded-[2rem] bg-card/95 backdrop-blur-3xl border-border shadow-2xl">
                    <DropdownMenuLabel className="p-4 text-[9px] font-black uppercase tracking-[0.3em] opacity-40">Gestión Contable Pro</DropdownMenuLabel>
                    {accountingGroups.map(group => (
                        <div key={group.title} className="space-y-1 py-2">
                            {group.items.map(item => (
                                <DropdownMenuItem key={item.href} asChild className="rounded-xl">
                                    <Link href={item.href as any} className="flex items-center py-3 px-4 text-[10px] font-black uppercase tracking-widest gap-4">
                                        <item.icon className="h-4 w-4 text-primary/40" />
                                        <span>{item.label}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </div>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* SEARCH (CENTER) */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center max-w-xl">
            <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                <Input 
                    placeholder="COMANDOS CONTABLES..." 
                    className="h-11 pl-12 rounded-2xl bg-foreground/5 border-border/50 text-[10px] font-black uppercase tracking-[0.2em] focus-visible:ring-primary/30"
                />
            </div>
          </div>

          {/* TELEMETRY & USER (RIGHT) */}
          <div className="flex items-center justify-end gap-4 min-w-fit">
            <div className="hidden md:flex items-center gap-4 px-5 py-2 rounded-xl bg-foreground/5 border border-border/50">
                <div className="flex flex-col items-end">
                    <span className="text-[7px] font-black uppercase text-muted-foreground/40 tracking-widest">Network 5G</span>
                    <span className="text-[10px] font-mono font-bold text-emerald-500 italic">14 MS</span>
                </div>
                <Signal className="h-4 w-4 text-emerald-500 animate-pulse" />
            </div>

            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl bg-foreground/5 border border-border/50 hover:text-primary relative group">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-3 right-3 h-2 w-2 bg-rose-500 rounded-full border-2 border-background animate-pulse" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80 p-0 rounded-[2.5rem] border-border bg-card/95 backdrop-blur-3xl shadow-2xl overflow-hidden">
                    <div className="p-6 border-b border-border bg-muted/30">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Alertas Fiscales</p>
                    </div>
                    <div className="p-3 max-h-[300px] overflow-y-auto custom-scrollbar space-y-1">
                        {[
                            { title: "Vencimiento ISLR", desc: "La declaración estimada vence en 3 días.", type: "warning", time: "Hace 1h" },
                            { title: "Sincronización BCV", desc: "Tasas actualizadas: 40.50 VES/USD.", type: "info", time: "Hace 4h" },
                            { title: "Ledger Sincronizado", desc: "Sello de bloque #2026-X1 completado.", type: "success", time: "Ayer" },
                        ].map((note, i) => (
                            <div key={i} className="p-4 rounded-2xl hover:bg-foreground/5 transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-1">
                                    <p className="text-[10px] font-black uppercase italic group-hover:text-primary transition-colors">{note.title}</p>
                                    <span className="text-[8px] font-bold text-muted-foreground opacity-40">{note.time}</span>
                                </div>
                                <p className="text-[10px] font-medium text-muted-foreground leading-snug">{note.desc}</p>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            <ThemeToggle />
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-11 w-11 rounded-xl border border-border p-0 overflow-hidden hover:border-primary/40 transition-all bg-foreground/5 shadow-inner group">
                    <Avatar className="h-full w-full rounded-none">
                    <AvatarFallback className={cn("rounded-none font-black text-[10px] text-white transition-all group-hover:scale-110", user.color || "bg-primary")}>
                        {user.fallback}
                    </AvatarFallback>
                    </Avatar>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 p-3 rounded-[2.5rem] border-border bg-card/95 backdrop-blur-3xl shadow-2xl">
                <DropdownMenuLabel className="p-6 bg-foreground/5 rounded-[1.5rem] mb-2 border border-border">
                    <div className="flex flex-col gap-1.5">
                        <p className="text-[11px] font-black uppercase tracking-widest text-primary">{user.name}</p>
                        <p className="text-[9px] text-foreground/30 truncate font-mono italic">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                
                <DropdownMenuItem asChild className="rounded-xl mt-2">
                    <Link href={dashboardHref as any} className="flex items-center py-3 px-4 text-[10px] font-black uppercase tracking-widest gap-4">
                        <Activity className="h-4 w-4 text-primary/40" />
                        <span>Consola Maestra</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="rounded-xl">
                    <Link href="/seguridad" className="flex items-center py-3 px-4 text-[10px] font-black uppercase tracking-widest gap-4">
                        <ShieldCheck className="h-4 w-4 text-primary/40" />
                        <span>Seguridad Nodo</span>
                    </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-border my-2" />
                
                <DropdownMenuItem asChild className="rounded-xl text-rose-500 focus:text-rose-600 focus:bg-rose-500/10">
                    <Link href="/" className="flex items-center py-3 px-4 text-[10px] font-black uppercase tracking-widest gap-4">
                        <LogOut className="h-4 w-4" />
                        <span>Cerrar Conexión</span>
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
