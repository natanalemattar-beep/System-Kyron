
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
    FileText,
    Bell,
    Search,
    Signal,
    Activity,
    User,
    Settings,
    LayoutGrid,
    Menu
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
    subGroups?: {
        title: string;
        icon: React.ElementType;
        items: NavItem[];
    }[];
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

  return (
    <header className="fixed top-0 left-0 right-0 z-[150] border-b border-border bg-background/80 backdrop-blur-3xl h-16 flex items-center w-full">
      <div className="w-full px-6 md:px-12">
        <div className="flex items-center justify-between w-full gap-4">
          
          {/* BRAND & MOBILE MENU */}
          <div className="flex items-center justify-start gap-4 min-w-[180px]">
            <Link href="/" className="flex items-center gap-4 group shrink-0">
                <Logo className="h-9 w-9 transition-all duration-500 group-hover:scale-110 drop-shadow-glow" />
                <div className="flex flex-col -mt-1">
                    <span className="text-xs font-black tracking-[0.4em] uppercase text-foreground italic italic-shadow leading-none">System Kyron</span>
                    <p className="text-[7px] font-bold text-primary uppercase tracking-[0.3em] mt-1 opacity-60">Control Maestro Pro</p>
                </div>
            </Link>
          </div>

          {/* HUD CONTROLS (CENTER) */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            <div className="relative w-full max-w-md group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                <Input 
                    placeholder="COMANDOS DE NODO..." 
                    className="h-10 pl-10 rounded-xl bg-foreground/5 border-border/50 text-[10px] font-black uppercase tracking-widest focus-visible:ring-primary/30"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-30">
                    <kbd className="text-[8px] font-black bg-muted px-1.5 py-0.5 rounded border border-border">CTRL</kbd>
                    <kbd className="text-[8px] font-black bg-muted px-1.5 py-0.5 rounded border border-border">K</kbd>
                </div>
            </div>
          </div>

          {/* TELEMETRY & USER (RIGHT) */}
          <div className="flex items-center justify-end gap-3 md:gap-6 min-w-[120px]">
            <div className="hidden md:flex items-center gap-4 px-4 py-1.5 rounded-xl bg-foreground/5 border border-border/50">
                <div className="flex flex-col items-end">
                    <span className="text-[7px] font-black uppercase text-muted-foreground/40 tracking-widest">Latencia 5G</span>
                    <span className="text-[9px] font-mono font-bold text-emerald-500">14 MS</span>
                </div>
                <Signal className="h-4 w-4 text-emerald-500 animate-pulse" />
            </div>

            <div className="flex items-center gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-foreground/5 border border-border/50 hover:text-primary relative group">
                            <Bell className="h-4 w-4" />
                            <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 bg-rose-500 rounded-full border border-background animate-pulse" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-80 p-0 rounded-[2rem] border-border bg-card/95 backdrop-blur-3xl shadow-2xl overflow-hidden">
                        <div className="p-5 border-b border-border bg-muted/30">
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Alertas de Nodo</p>
                        </div>
                        <div className="p-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                            {[
                                { title: "Vencimiento RIF", desc: "Su registro personal vence en 15 días.", type: "warning", time: "Hace 2h" },
                                { title: "Sincronización BCV", desc: "Tasas actualizadas a 40.50 VES/USD.", type: "info", time: "Hace 4h" },
                                { title: "Venta Exitosa", desc: "Factura #0012 registrada en Ledger.", type: "success", time: "Ayer" },
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
                        <div className="p-3 bg-muted/20 border-t border-border text-center">
                            <Link href="/notificaciones" className="text-[8px] font-black uppercase tracking-widest text-primary hover:underline">Ver todas las transmisiones</Link>
                        </div>
                    </PopoverContent>
                </Popover>

                <ThemeToggle />
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-xl border border-border p-0 overflow-hidden hover:border-primary/40 transition-all bg-foreground/5 shadow-inner group">
                      <Avatar className="h-full w-full rounded-none">
                        <AvatarFallback className={cn("rounded-none font-black text-[10px] text-white transition-all group-hover:scale-110", user.color || "bg-primary shadow-glow")}>
                            {user.fallback}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72 p-3 rounded-[2rem] border-border bg-card/95 backdrop-blur-3xl shadow-2xl">
                    <DropdownMenuLabel className="p-5 bg-foreground/5 rounded-2xl mb-2 border border-border">
                       <div className="flex flex-col gap-1.5">
                          <p className="text-[11px] font-black uppercase tracking-widest text-primary">{user.name}</p>
                          <p className="text-[9px] text-foreground/30 truncate font-mono italic">{user.email}</p>
                       </div>
                    </DropdownMenuLabel>
                    
                    <DropdownMenuItem asChild className="rounded-xl mt-2">
                      <Link href="/dashboard-empresa" className="flex items-center py-3 px-4 text-[10px] font-black uppercase tracking-[0.2em]">
                          <Activity className="mr-4 h-4 w-4 text-primary/40" />
                          <span>Panel Maestro</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="rounded-xl">
                      <Link href="/seguridad" className="flex items-center py-3 px-4 text-[10px] font-black uppercase tracking-[0.2em]">
                          <ShieldCheck className="mr-4 h-4 w-4 text-primary/40" />
                          <span>Seguridad de Nodo</span>
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator className="bg-border my-2" />
                    
                    <DropdownMenuItem asChild className="rounded-xl text-rose-500 focus:text-rose-600 focus:bg-rose-500/10">
                      <Link href="/" className="flex items-center py-3 px-4 text-[10px] font-black uppercase tracking-[0.2em]">
                          <LogOut className="mr-4 h-4 w-4" />
                          <span>Cerrar Conexión</span>
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
