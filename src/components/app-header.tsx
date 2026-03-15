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
import { Link, usePathname } from "@/navigation";
import { Logo } from "./logo";
import { 
    LogOut, 
    ShieldCheck, 
    Bell,
    Signal,
    Calculator,
    FileText,
    Wallet,
    Landmark,
    Cpu,
    LayoutDashboard,
    Gavel,
    Users,
    Recycle,
    Smartphone
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
    user: any;
    dashboardHref: string;
    navGroups?: any[];
}

export function AppHeader({ user }: AppHeaderProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const mainNavLinks = [
    { label: "MANDO", href: "/dashboard-empresa", icon: LayoutDashboard },
    { label: "CONTABILIDAD", href: "/contabilidad", icon: Calculator },
    { label: "FACTURACIÓN", href: "/facturacion", icon: FileText },
    { label: "BILLETERA", href: "/billetera-cambio", icon: Wallet },
    { label: "FISCAL", href: "/tramites-fiscales", icon: Landmark },
    { label: "LEGAL", href: "/escritorio-juridico", icon: Gavel },
    { label: "TALENTO", href: "/dashboard-rrhh", icon: Users },
    { label: "INGENIERÍA", href: "/dashboard-informatica", icon: Cpu },
    { label: "RED", href: "/dashboard-telecom", icon: Signal },
    { label: "AMBIENTE", href: "/sostenibilidad", icon: Recycle },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[150] border-b border-white/5 bg-black/80 backdrop-blur-3xl h-20 flex items-center w-full shadow-2xl">
      <div className="w-full px-4 md:px-6">
        <div className="flex items-center justify-between w-full gap-4">
          
          <div className="flex items-center gap-4 min-w-fit">
            <Link href="/" className="flex items-center gap-3 group shrink-0">
                <Logo className="h-9 w-9 transition-all duration-500 group-hover:scale-110 drop-shadow-glow" /> 
                <div className="flex flex-col -mt-1 hidden xl:flex">
                    <span className="text-xs font-black tracking-[0.3em] uppercase text-white italic leading-none">System Kyron</span>
                    <p className="text-[6px] font-bold text-primary uppercase tracking-[0.2em] mt-1 opacity-60">Centro Maestro Administrativo</p>
                </div>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 flex-1 overflow-x-auto no-scrollbar scroll-smooth">
            {mainNavLinks.map((btn) => {
                const isActive = pathname.includes(btn.href);
                return (
                    <Button 
                        key={btn.href}
                        asChild 
                        variant="ghost" 
                        className={cn(
                            "h-10 px-3 xl:px-4 rounded-xl text-[8px] font-black uppercase tracking-[0.15em] transition-all gap-2 border border-transparent whitespace-nowrap",
                            isActive 
                                ? "bg-primary/10 text-primary border-primary/20 shadow-glow-sm" 
                                : "text-white/40 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <Link href={btn.href as any}>
                            <btn.icon className={cn("h-3.5 w-3.5", isActive ? "text-primary animate-pulse" : "opacity-40")} />
                            {btn.label}
                        </Link>
                    </Button>
                )
            })}
          </nav>

          <div className="flex items-center justify-end gap-3 min-w-fit">
            <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-xl bg-white/5 border border-white/5">
                <div className="flex flex-col items-end">
                    <span className="text-[6px] font-black uppercase text-white/20 tracking-widest leading-none">Network 5G</span>
                    <span className="text-[9px] font-mono font-bold text-emerald-500 italic leading-none mt-1">14 MS</span>
                </div>
                <Signal className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
            </div>

            <ThemeToggle />
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-xl border border-white/10 p-0 overflow-hidden hover:border-primary/40 transition-all bg-white/5 shadow-inner group">
                    <Avatar className="h-full w-full rounded-none">
                    <AvatarFallback className={cn("rounded-none font-black text-[9px] text-white transition-all group-hover:scale-110", user.color || "bg-primary")}>
                        {user.fallback}
                    </AvatarFallback>
                    </Avatar>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 p-3 rounded-[2rem] border-white/10 bg-black/95 backdrop-blur-3xl shadow-2xl">
                <DropdownMenuLabel className="p-6 bg-white/5 rounded-[1.5rem] mb-2 border border-white/5">
                    <div className="flex flex-col gap-1.5">
                        <p className="text-[11px] font-black uppercase tracking-widest text-primary">{user.name}</p>
                        <p className="text-[8px] text-white/30 truncate font-mono italic">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                
                <DropdownMenuItem asChild className="rounded-xl mt-2">
                    <Link href="/dashboard-empresa" className="flex items-center py-3 px-4 text-[9px] font-black uppercase tracking-widest gap-4">
                        <Cpu className="h-4 w-4 text-primary/40" />
                        <span>Consola Maestra</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="rounded-xl">
                    <Link href="/seguridad" className="flex items-center py-3 px-4 text-[9px] font-black uppercase tracking-widest gap-4 text-white/60">
                        <ShieldCheck className="h-4 w-4 text-primary/40" />
                        <span>Seguridad</span>
                    </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-white/5 my-2" />
                
                <DropdownMenuItem asChild className="rounded-xl text-rose-500 focus:text-rose-600 focus:bg-rose-500/10">
                    <Link href="/" className="flex items-center py-3 px-4 text-[9px] font-black uppercase tracking-widest gap-4">
                        <LogOut className="h-4 w-4" />
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
