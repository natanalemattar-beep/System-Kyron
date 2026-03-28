
'use client';

import { Link, usePathname } from "@/navigation";
import { cn } from "@/lib/utils";
import { 
  ChevronRight,
  ShieldCheck,
  Activity,
  Terminal
} from "lucide-react";
import { Logo } from "./logo";
import { motion } from "framer-motion";
import { 
    adminNavGroups, 
    legalNavGroups, 
    rrhhNavGroups, 
    sociosNavGroups, 
    telecomNavGroups,
    ventasNavGroups,
    sostenibilidadNavGroups
} from "./app-sidebar-nav-items";

/**
 * @fileOverview AppSidebar Contextual.
 * Determina qué grupo de navegación mostrar basándose en la URL actual.
 */

export function AppSidebar() {
  const pathname = usePathname();

  // Lógica de selección de grupo basada en contexto de ruta
  const getContextualGroups = () => {
    if (pathname.includes('/contabilidad')) return adminNavGroups;
    if (pathname.includes('/ventas') || pathname.includes('/punto-de-venta') || pathname.includes('/proformas')) return ventasNavGroups;
    if (pathname.includes('/sostenibilidad') || pathname.includes('/mercado-ecocreditos')) return sostenibilidadNavGroups;
    if (pathname.includes('/escritorio-juridico') || pathname.includes('/contratos') || pathname.includes('/permisos')) return legalNavGroups;
    if (pathname.includes('/dashboard-rrhh') || pathname.includes('/nominas') || pathname.includes('/libros-laborales')) return rrhhNavGroups;
    if (pathname.includes('/dashboard-socios') || pathname.includes('/poderes-representacion')) return sociosNavGroups;
    if (pathname.includes('/venta-linea')) return telecomNavGroups;
    
    // Default para Dashboard General o rutas no mapeadas
    return adminNavGroups;
  };

  const currentGroups = getContextualGroups();

  const MenuItem = ({ item }: { item: any }) => {
    const isActive = pathname.includes(item.href) && item.href !== '/';
    
    return (
      <Link 
        href={item.href as any}
        className={cn(
          "group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden border border-transparent",
          isActive 
            ? "bg-primary/10 text-primary border-primary/20 shadow-glow-sm" 
            : "text-muted-foreground/60 hover:text-primary hover:bg-primary/5"
        )}
      >
        <div className="flex items-center gap-3 relative z-10">
          <item.icon className={cn("h-3.5 w-3.5 transition-all", isActive ? "text-primary" : "opacity-40 group-hover:opacity-100")} />
          <span className={cn("text-[9px] font-black uppercase tracking-[0.2em]", isActive ? "text-foreground" : "text-muted-foreground")}>
            {item.label}
          </span>
        </div>
        
        {isActive && (
          <motion.div 
              layoutId="active-nav-indicator"
              className="absolute left-0 w-1 h-1/2 bg-primary rounded-r-full shadow-glow" 
          />
        )}
        <ChevronRight className={cn("h-3 w-3 opacity-0 transition-all transform", isActive ? "opacity-20" : "group-hover:opacity-40 group-hover:translate-x-1")} />
      </Link>
    );
  };

  return (
    <aside className="flex flex-col h-full bg-transparent overflow-hidden">
      <div className="p-8 border-b border-white/5 flex flex-col items-center gap-4 bg-muted/5">
        <Logo className="h-10 w-10 drop-shadow-glow" /> 
        <div className="text-center">
            <span className="text-[10px] font-black tracking-[0.4em] text-foreground uppercase italic leading-none">System Kyron</span>
            <p className="text-[7px] font-bold text-primary uppercase tracking-[0.2em] mt-1 opacity-60">Control Corporativo</p>
        </div>
      </div>
      
      <div className="flex-grow py-8 px-4 space-y-10 overflow-y-auto custom-scrollbar">
        {currentGroups.map((group) => (
          <section key={group.title} className="space-y-3">
            <div className="px-4 text-[8px] font-black uppercase text-primary/40 tracking-[0.4em] flex items-center gap-2 italic">
              <div className="h-px w-4 bg-primary/20" /> {group.title}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => (
                <MenuItem key={item.label} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="p-6 border-t border-white/5 bg-muted/5">
        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col gap-3 shadow-inner">
            <div className="flex items-center gap-3">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <span className="text-[8px] font-black text-foreground/60 uppercase tracking-widest leading-none">Protocolo Activo</span>
            </div>
            <div className="flex items-center gap-3">
                <Activity className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
                <span className="text-[8px] font-black text-foreground/60 uppercase tracking-widest leading-none">Sync: T+0</span>
            </div>
        </div>
      </div>
    </aside>
  );
}
