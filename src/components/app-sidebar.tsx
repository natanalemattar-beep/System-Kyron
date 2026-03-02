'use client';

import { Link, usePathname } from "@/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart3, Users, Scale, Recycle, Droplets, Wallet, 
  Wrench, ShieldCheck, ShoppingBag, Fingerprint, Cog, 
  LayoutGrid, Activity, Radio
} from "lucide-react";
import { Logo } from "./logo";
import { motion } from "framer-motion";

const menuItems = [
  { id: 'inicio', label: 'Dashboard', icon: LayoutGrid, href: '/dashboard' },
  { id: 'contabilidad', label: 'Contabilidad', icon: BarChart3, href: '/contabilidad' },
  { id: 'rrhh', label: 'Recursos Humanos', icon: Users, href: '/dashboard-rrhh' },
  { id: 'juridico', label: 'Legal y Poderes', icon: Scale, href: '/escritorio-juridico' },
  { id: 'telecom', label: 'Telecom Operaciones', icon: Radio, href: '/dashboard-telecom' },
  { id: 'sistemas', label: 'Ingeniería IT', icon: Wrench, href: '/dashboard-informatica' },
  { id: 'zedu', label: 'Estudio ZEDU', icon: Activity, href: '/estudio-poblacion' },
  { id: 'fiscal', label: 'Blindaje SENIAT', icon: ShieldCheck, href: '/zero-risk' },
  { id: 'logistica', label: 'Ventas y POS', icon: ShoppingBag, href: '/punto-de-venta' },
  { id: 'identidad', label: 'ID Digital 3D', icon: Fingerprint, href: '/tarjeta-digital' },
  { id: 'config', label: 'Ajustes Maestro', icon: Cog, href: '/general' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#050505] border-r border-primary/30 flex flex-col z-50 hidden lg:flex shadow-[15px_0_50px_rgba(0,0,0,0.9)] backdrop-blur-3xl overflow-hidden">
      {/* HUD Overlay Textures */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:15px:15px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/[0.01] to-primary/[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0" />
      
      <div className="p-10 border-b border-white/5 flex flex-col items-center gap-6 relative z-10 bg-black/60">
        <Link href="/" className="flex flex-col items-center gap-4 transition-all hover:scale-105 group">
          <Logo className="h-14 w-14 drop-shadow-[0_0_20px_rgba(37,99,235,0.5)]" />
          <div className="text-center">
            <span className="text-[10px] font-black tracking-[0.5em] text-white uppercase italic leading-none italic-shadow">System Kyron</span>
            <p className="text-[7px] font-bold text-primary uppercase tracking-[0.3em] mt-2 opacity-60">Command Terminal v2.6</p>
          </div>
        </Link>
      </div>
      
      <nav className="flex-grow py-10 px-6 space-y-2 overflow-y-auto custom-scrollbar relative z-10">
        <p className="text-[8px] font-black uppercase text-primary/40 tracking-[0.5em] mb-8 px-4 italic">Core Hierarchy</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.id} 
              href={item.href as any}
              className={cn(
                "group flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden",
                isActive 
                  ? "bg-primary/10 text-white border border-primary/30 shadow-glow" 
                  : "text-white/30 hover:text-white/80 hover:bg-white/[0.02]"
              )}
            >
              <item.icon className={cn("h-4 w-4 transition-all", isActive ? "text-primary scale-110" : "opacity-40 group-hover:opacity-100")} />
              <span className={cn("text-[9px] font-black uppercase tracking-widest", isActive ? "text-white" : "")}>{item.label}</span>
              
              {isActive && (
                <motion.div 
                    layoutId="active-nav-glow"
                    className="absolute left-0 w-1.5 h-1/2 bg-primary rounded-r-full shadow-[2px_0_15px_rgba(37,99,235,1)]" 
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5 bg-black/40 relative z-10">
        <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 shadow-inner">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Secure Node Active</span>
        </div>
      </div>
    </aside>
  );
}