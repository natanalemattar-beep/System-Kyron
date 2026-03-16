'use client';

import { Link, usePathname } from "@/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  ChevronRight,
  ShieldCheck,
  Terminal,
  Activity
} from "lucide-react";
import { Logo } from "./logo";
import { motion } from "framer-motion";
import { adminNavGroups } from "./app-sidebar-nav-items";

/**
 * @fileOverview AppSidebar - Rediseño HUD de Alta Fidelidad.
 * Sincronizado con la estética Glassmorphism del AppHeader.
 */

export function AppSidebar() {
  const pathname = usePathname();

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
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-background/40 backdrop-blur-3xl border-r border-white/5 flex flex-col z-[100] hidden lg:flex overflow-hidden shadow-2xl">
      {/* Fondo HUD sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none hud-grid" />
      
      <div className="p-10 border-b border-white/5 flex flex-col items-center gap-4 relative z-10 bg-muted/10">
        <Link href="/dashboard-empresa" className="flex flex-col items-center gap-4 transition-all hover:scale-105 group">
          <Logo className="h-12 w-12 drop-shadow-glow" /> 
          <div className="text-center">
            <span className="text-[11px] font-black tracking-[0.4em] text-foreground uppercase italic italic-shadow">System Kyron</span>
            <p className="text-[7px] font-bold text-primary uppercase tracking-[0.3em] mt-2 opacity-60">Control Maestro</p>
          </div>
        </Link>
      </div>
      
      <div className="flex-grow py-8 px-4 space-y-10 overflow-y-auto custom-scrollbar relative z-10">
        {adminNavGroups.map((group) => (
          <section key={group.title} className="space-y-3">
            <div className="px-4 text-[8px] font-black uppercase text-primary/40 tracking-[0.4em] flex items-center gap-2">
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

      <div className="p-6 border-t border-white/5 bg-muted/5 relative z-10">
        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col gap-3 shadow-inner">
            <div className="flex items-center gap-3">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <span className="text-[8px] font-black text-foreground/60 uppercase tracking-widest">Enlace Seguro</span>
            </div>
            <div className="flex items-center gap-3">
                <Activity className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
                <span className="text-[8px] font-black text-foreground/60 uppercase tracking-widest">Sincronizado</span>
            </div>
        </div>
      </div>
    </aside>
  );
}
