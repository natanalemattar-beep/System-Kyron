
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
import { Link, usePathname } from "@/navigation";
import { Logo } from "./logo";
import { 
    LogOut, 
    ShieldCheck, 
    Bell,
    Signal,
    Activity,
    Calculator,
    LayoutDashboard,
    FileText,
    Wallet,
    Landmark,
    Cpu,
    Zap,
    Search
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn, formatCurrency } from "@/lib/utils";

interface AppHeaderProps {
    user: any;
    dashboardHref: string;
    navGroups?: any[];
}

export function AppHeader({ user, dashboardHref }: AppHeaderProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const nativeButtons = [
    { label: "Mando", href: "/dashboard-empresa", icon: Cpu },
    { label: "Contabilidad", href: "/contabilidad", icon: Calculator },
    { label: "Facturación", href: "/facturacion", icon: FileText },
    { label: "Billetera", href: "/billetera-cambio", icon: Wallet },
    { label: "Fiscal", href: "/tramites-fiscales", icon: Landmark },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[150] border-b border-border bg-background/80 backdrop-blur-3xl h-20 flex items-center w-full shadow-2xl">
      <div className="w-full px-6 md:px-10">
        <div className="flex items-center justify-between w-full gap-4">
          
          <div className="flex items-center gap-6 min-w-fit">
            <Link href="/" className="flex items-center gap-4 group shrink-0">
                <Logo className="h-10 w-10 transition-all duration-500 group-hover:scale-110 drop-shadow-glow" /> 
                <div className="flex flex-col -mt-1 hidden sm:flex">
                    <span className="text-sm font-black tracking-[0.4em] uppercase text-foreground italic italic-shadow leading-none">System Kyron</span>
                    <p className="text-[7px] font-bold text-primary uppercase tracking-[0.3em] mt-1 opacity-60">Corporate Master Node</p>
                </div>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center justify-center gap-2 flex-1 max-w-4xl">
            <div className="relative w-full max-w-xs mr-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40" />
                <input placeholder="BUSCAR MÓDULO..." className="w-full h-10 bg-foreground/5 border-none rounded-xl pl-9 text-[9px] font-black uppercase tracking-widest focus:ring-1 focus:ring-primary/30 outline-none" />
            </div>
            {nativeButtons.map((btn) => {
                const isActive = pathname.includes(btn.href);
                return (
                    <Button 
                        key={btn.href}
                        asChild 
                        variant="ghost" 
                        className={cn(
                            "h-11 px-5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all gap-3 border border-transparent",
                            isActive 
                                ? "bg-primary/10 text-primary border-primary/20 shadow-glow-sm" 
                                : "text-muted-foreground/60 hover:text-foreground hover:bg-white/5"
                        )}
                    >
                        <Link href={btn.href as any}>
                            <btn.icon className={cn("h-4 w-4", isActive ? "text-primary animate-pulse" : "opacity-40")} />
                            {btn.label}
                        </Link>
                    </Button>
                )
            })}
          </nav>

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
                    <div className="p-6 border-b border-border bg-muted/30 flex justify-between items-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Alertas de Nodo</p>
                        <Zap className="h-3 w-3 text-yellow-400" />
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
                    <Link href="/dashboard-empresa" className="flex items-center py-3 px-4 text-[10px] font-black uppercase tracking-widest gap-4">
                        <Cpu className="h-4 w-4 text-primary/40" />
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
