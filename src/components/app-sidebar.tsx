
'use client';

import { Link, usePathname } from "@/navigation";
import { cn } from "@/lib/utils";
import { 
  ChevronRight,
  ShieldCheck,
  Activity,
  Hexagon,
  Terminal
} from "lucide-react";
import { Logo } from "./logo";
import { motion } from "framer-motion";
import { 
    asesoriaContableNavGroups, 
    legalNavGroups, 
    sociosNavGroups, 
    telecomNavGroups,
    ventasNavGroups,
    sostenibilidadNavGroups
} from "./app-sidebar-nav-items";

export function AppSidebar() {
  const pathname = usePathname();

  const getContextualGroups = () => {
    if (pathname.includes('/contabilidad') || pathname.includes('/dashboard-rrhh') || pathname.includes('/nominas') || pathname.includes('/libros-laborales') || pathname.includes('/prestaciones-sociales') || pathname.includes('/reclutamiento') || pathname.includes('/clima-organizacional') || pathname.includes('/desarrollo-personal') || pathname.includes('/salud-seguridad') || pathname.includes('/ingenieria-ia') || pathname.includes('/marketing') || pathname.includes('/proyectos-personal') || pathname.includes('/bienestar-laboral') || pathname.includes('/manuales-rrhh') || pathname.includes('/seguridad-empresarial')) return asesoriaContableNavGroups;
    if (pathname.includes('/ventas') || pathname.includes('/punto-de-venta') || pathname.includes('/proformas')) return ventasNavGroups;
    if (pathname.includes('/sostenibilidad') || pathname.includes('/mercado-ecocreditos')) return sostenibilidadNavGroups;
    if (pathname.includes('/escritorio-juridico') || pathname.includes('/contratos') || pathname.includes('/permisos')) return legalNavGroups;
    if (pathname.includes('/dashboard-socios') || pathname.includes('/poderes-representacion')) return sociosNavGroups;
    if (pathname.includes('/venta-linea')) return telecomNavGroups;
    
    return asesoriaContableNavGroups;
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
            ? "bg-primary/10 text-primary border-primary/15 animate-kyron-breathe" 
            : "text-muted-foreground/60 hover:text-primary hover:bg-primary/5"
        )}
      >
        <div className="flex items-center gap-3 relative z-10">
          <item.icon className={cn("h-3.5 w-3.5 transition-all", isActive ? "text-primary" : "opacity-40 group-hover:opacity-100")} />
          <span className={cn("text-[11px] font-semibold uppercase tracking-wide", isActive ? "text-foreground" : "text-muted-foreground")}>
            {item.label}
          </span>
          {item.badge && (
            <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white text-[6px] font-semibold uppercase tracking-wider leading-none animate-pulse">
              {item.badge}
            </span>
          )}
        </div>
        
        {isActive && (
          <motion.div 
              layoutId="active-nav-indicator"
              className="absolute left-0 w-1 h-1/2 rounded-r-full" 
              style={{ background: 'linear-gradient(180deg, hsl(192 91% 48%), hsl(152 76% 42%))' }}
          />
        )}
        <ChevronRight className={cn("h-3 w-3 opacity-0 transition-all transform", isActive ? "opacity-20" : "group-hover:opacity-40 group-hover:translate-x-1")} />
      </Link>
    );
  };

  return (
    <aside className="flex flex-col h-full bg-transparent overflow-hidden">
      <div className="p-8 border-b border-border/30 flex flex-col items-center gap-4 bg-muted/5 relative">
        <div className="absolute bottom-0 left-0 right-0 kyron-accent-line opacity-20" />
        <Logo className="h-10 w-10 drop-shadow-glow" /> 
        <div className="text-center">
            <span className="text-[10px] font-bold tracking-wider text-foreground uppercase italic leading-none">System Kyron</span>
            <p className="text-[7px] font-bold uppercase tracking-wide mt-1 kyron-gradient-text">Control Corporativo</p>
        </div>
      </div>
      
      <div className="flex-grow py-8 px-4 space-y-10 overflow-y-auto custom-scrollbar">
        {currentGroups.map((group) => (
          <section key={group.title} className="space-y-3">
            <div className="px-4 text-[10px] font-semibold uppercase text-primary/40 tracking-wider flex items-center gap-2 italic">
              <Hexagon className="h-2 w-2 text-primary/20" /> {group.title}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => (
                <MenuItem key={item.label} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="p-6 border-t border-border/30 bg-muted/5 relative">
        <div className="absolute top-0 left-0 right-0 kyron-accent-line opacity-15" />
        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col gap-3">
            <div className="flex items-center gap-3">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <span className="text-[10px] font-bold text-foreground/60 uppercase tracking-widest leading-none">Protocolo Activo</span>
            </div>
            <div className="flex items-center gap-3">
                <span className="kyron-dot animate-pulse shrink-0" />
                <span className="text-[10px] font-bold text-foreground/60 uppercase tracking-widest leading-none">Sync: T+0</span>
            </div>
        </div>
      </div>
    </aside>
  );
}
