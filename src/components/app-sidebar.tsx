
'use client';

import { Link, usePathname } from "@/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart3, Users, Scale, Recycle, Droplets, Wallet, 
  Wrench, ShieldCheck, ShoppingBag, Fingerprint, Cog, 
  LayoutGrid
} from "lucide-react";
import { Logo } from "./logo";
import { motion } from "framer-motion";

const menuItems = [
  { id: 'inicio', label: 'Dashboard', icon: LayoutGrid, href: '/dashboard' },
  { id: 'contabilidad', label: 'Contabilidad', icon: BarChart3, href: '/contabilidad' },
  { id: 'rrhh', label: 'RR.HH.', icon: Users, href: '/dashboard-rrhh' },
  { id: 'juridico', label: 'Legal', icon: Scale, href: '/escritorio-juridico' },
  { id: 'sostenibilidad', label: 'Eco-Kyron', icon: Recycle, href: '/ecosistema' },
  { id: 'telecom', label: 'Telecom', icon: Droplets, href: '/dashboard-telecom' },
  { id: 'mantenimiento', label: 'Sistemas', icon: Wrench, href: '/dashboard-informatica' },
  { id: 'fiscalizacion', label: 'SENIAT', icon: ShieldCheck, href: '/zero-risk' },
  { id: 'tienda', label: 'Logística', icon: ShoppingBag, href: '/punto-de-venta' },
  { id: 'identidad', label: 'ID Digital', icon: Fingerprint, href: '/tarjeta-digital' },
  { id: 'configuracion', label: 'Maestro', icon: Cog, href: '/general' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card/40 backdrop-blur-3xl border-r border-white/10 flex flex-col z-50 hidden lg:flex shadow-[20px_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="p-10 border-b border-white/5 flex flex-col items-center gap-6 relative z-10">
        <Link href="/" className="flex flex-col items-center gap-4 transition-all hover:scale-105 group">
          <Logo className="h-16 w-16 drop-shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
          <div className="text-center">
            <span className="text-xs font-black tracking-[0.6em] text-white uppercase italic leading-none">System Kyron</span>
            <p className="text-[8px] font-bold text-primary uppercase tracking-[0.3em] mt-2 opacity-80">Master Control Node</p>
          </div>
        </Link>
      </div>
      
      <nav className="flex-grow py-10 px-6 space-y-3 overflow-y-auto custom-scrollbar relative z-10">
        <p className="text-[9px] font-black uppercase text-white/20 tracking-[0.6em] mb-8 px-4 italic">Operativa Global</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.id} 
              href={item.href as any}
              className={cn(
                "group flex items-center gap-5 px-5 py-4 rounded-2xl transition-all duration-500 relative overflow-hidden border border-transparent",
                isActive 
                  ? "bg-primary text-white border-primary/20 shadow-xl" 
                  : "text-muted-foreground/70 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("h-5 w-5 transition-all duration-500", isActive ? "text-white scale-110" : "opacity-40 group-hover:opacity-100")} />
              <span className={cn("text-[10px] font-black uppercase tracking-[0.2em]", isActive ? "text-white" : "group-hover:text-white/90")}>{item.label}</span>
              
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active-indicator"
                  className="absolute left-0 w-1 h-1/2 bg-white rounded-r-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-8 border-t border-white/5 bg-black/20 relative z-10 backdrop-blur-3xl text-center">
        <div className="flex items-center justify-center gap-3">
            <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
            <span className="text-[9px] font-black text-emerald-500/60 uppercase tracking-widest">Active Node v2.6</span>
        </div>
      </div>
    </aside>
  );
}
