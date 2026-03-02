
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
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0a0a0a]/95 border-r border-primary/50 flex flex-col z-[100] hidden lg:flex shadow-[20px_0_60px_rgba(0,0,0,0.9)] backdrop-blur-3xl overflow-hidden">
      {/* HUD Overlay Textures - Eradicate the Black Hole */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-[3px] h-full bg-primary/40 shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
      
      <div className="p-10 border-b border-white/10 flex flex-col items-center gap-6 relative z-10 bg-black/40">
        <Link href="/" className="flex flex-col items-center gap-4 transition-all hover:scale-105 group">
          <Logo className="h-14 w-14 drop-shadow-[0_0_25px_rgba(37,99,235,0.6)]" />
          <div className="text-center">
            <span className="text-[11px] font-black tracking-[0.5em] text-white uppercase italic leading-none italic-shadow">System Kyron</span>
            <p className="text-[8px] font-bold text-primary uppercase tracking-[0.3em] mt-3 opacity-80">Command Terminal v2.6.5</p>
          </div>
        </Link>
      </div>
      
      <nav className="flex-grow py-10 px-6 space-y-2 overflow-y-auto custom-scrollbar relative z-10">
        <p className="text-[9px] font-black uppercase text-primary/60 tracking-[0.5em] mb-8 px-4 italic">Core Hierarchy</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.id} 
              href={item.href as any}
              className={cn(
                "group flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 relative overflow-hidden",
                isActive 
                  ? "bg-primary/20 text-white border border-primary/40 shadow-glow" 
                  : "text-white/40 hover:text-white hover:bg-white/[0.03]"
              )}
            >
              <item.icon className={cn("h-4 w-4 transition-all", isActive ? "text-primary scale-125" : "opacity-40 group-hover:opacity-100 group-hover:scale-110")} />
              <span className={cn("text-[10px] font-black uppercase tracking-[0.2em]", isActive ? "text-white" : "")}>{item.label}</span>
              
              {isActive && (
                <motion.div 
                    layoutId="active-nav-glow"
                    className="absolute left-0 w-1.5 h-1/2 bg-primary rounded-r-full shadow-[4px_0_20px_rgba(37,99,235,1)]" 
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/10 bg-black/60 relative z-10">
        <div className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-primary/5 border border-primary/20 shadow-inner group">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_#10b981]" />
            <span className="text-[9px] font-black text-white/60 uppercase tracking-[0.3em] group-hover:text-primary transition-colors">Secure Node Active</span>
        </div>
      </div>
    </aside>
  );
}
