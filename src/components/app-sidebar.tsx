'use client';

import { Link, usePathname } from "@/navigation";
import { cn } from "@/lib/utils";
import { 
  ChevronRight,
  ShieldCheck,
  Hexagon,
  LayoutGrid,
  Banknote,
  Rocket,
  FileText,
  Wand2
} from "lucide-react";
import { Logo } from "./logo";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth/context";
import { 
    asesoriaContableNavGroups, 
    legalNavGroups, 
    sociosNavGroups, 
    telecomNavGroups,
    ventasNavGroups,
    sostenibilidadNavGroups,
    globalNavGroups
} from "./app-sidebar-nav-items";

export function AppSidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  const getAuthorizedGroups = () => {
    const groups = [];
    const userModules = user?.modules || [];
    
    if (userModules.includes('contabilidad')) groups.push(asesoriaContableNavGroups);
    if (userModules.includes('ventas') || userModules.includes('tpv')) groups.push(ventasNavGroups);
    if (userModules.includes('sostenibilidad')) groups.push(sostenibilidadNavGroups);
    if (userModules.includes('legal')) groups.push(legalNavGroups);
    if (userModules.includes('socios')) groups.push(sociosNavGroups);
    if (userModules.includes('telecom')) groups.push(telecomNavGroups);
    
    if (groups.length === 0) groups.push(asesoriaContableNavGroups);
    
    return groups.flat();
  };

  const currentGroups = [...globalNavGroups, ...getAuthorizedGroups()];

  const MenuItem = ({ item }: { item: any }) => {
    const isActive = pathname.includes(item.href) && item.href !== '/';
    
    return (
      <Link 
        href={item.href as any}
        className={cn(
          "group flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-500 relative overflow-hidden border border-transparent",
          isActive 
            ? "bg-primary/15 text-primary border-primary/20 shadow-[0_8px_20px_-10px_rgba(var(--primary),0.3)]" 
            : "text-muted-foreground/50 hover:text-primary hover:bg-primary/5"
        )}
      >
        <div className="flex items-center gap-3 relative z-10">
          <item.icon className={cn("h-3.5 w-3.5 transition-all duration-500", 
            isActive ? "text-primary scale-110" : "opacity-40 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-3"
          )} />
          <span className={cn("text-[10px] font-bold uppercase tracking-widest transition-colors duration-300", 
            isActive ? "text-foreground" : "text-muted-foreground/70 group-hover:text-primary"
          )}>
            {item.label}
          </span>
          {item.badge && (
            <span className={cn(
              "px-1.5 py-0.5 rounded text-[6px] font-black uppercase tracking-widest leading-none",
              item.badge === 'NUEVO' ? "bg-primary text-primary-foreground animate-pulse" : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
            )}>
              {item.badge}
            </span>
          )}
        </div>
        
        {isActive && (
          <motion.div 
              layoutId="sidebar-active-pill"
              className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent -z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
          />
        )}
        <ChevronRight className={cn("h-3 w-3 transition-all duration-300", isActive ? "opacity-40" : "opacity-0 group-hover:opacity-40 group-hover:translate-x-1")} />
      </Link>
    );
  };

  return (
    <aside className="flex flex-col h-full bg-[#030711]/40 backdrop-blur-3xl overflow-hidden border-r border-white/5">
      <div className="p-10 border-b border-white/5 flex flex-col items-center gap-5 bg-white/[0.02] relative group">
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
          <Logo className="h-12 w-12 relative z-10 drop-shadow-[0_0_15px_rgba(var(--primary),0.5)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" /> 
        </div>
        <div className="text-center relative z-10">
            <span className="text-[11px] font-black tracking-[0.4em] text-white uppercase italic leading-none block mb-1">System Kyron</span>
            <p className="text-[7px] font-black uppercase tracking-[0.25em] text-primary/60">Advanced Engineering</p>
        </div>
      </div>
      
      <div className="flex-grow py-8 px-4 space-y-10 overflow-y-auto custom-scrollbar scroll-smooth">
        {currentGroups.map((group, gIdx) => (
          <section key={`${group.title}-${gIdx}`} className="space-y-4">
            <div className="px-4 text-[9px] font-black uppercase text-white/20 tracking-[0.3em] flex items-center gap-3">
              <div className="h-[1px] w-4 bg-white/10" />
              {group.title}
            </div>
            <div className="space-y-1.5">
              {group.items.map((item, iIdx) => (
                <MenuItem key={`${item.label}-${iIdx}`} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="p-6 border-t border-white/5 bg-white/[0.01] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.03] to-transparent pointer-events-none" />
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-4 relative z-10 transition-all duration-500 group-hover:border-primary/20 group-hover:bg-primary/[0.02]">
            <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)] animate-pulse" />
                <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] leading-none">Cifrado AES-256</span>
            </div>
            <div className="flex items-center gap-3">
                <ShieldCheck className="h-3.5 w-3.5 text-primary/60" />
                <span className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em] leading-none">Protocolo Nexus v3</span>
            </div>
        </div>
      </div>
    </aside>
  );
}
