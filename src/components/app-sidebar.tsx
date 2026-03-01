
'use client';

import { Link, usePathname } from "@/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart3, Users, Scale, Recycle, Droplets, Wallet, 
  Wrench, ShieldCheck, ShoppingBag, Fingerprint, Cog, 
  LayoutGrid, Sparkles, ChevronRight
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
  { id: 'tesoreria', label: 'Tesoreria', icon: Wallet, href: '/cuentas-por-cobrar' },
  { id: 'mantenimiento', label: 'Sistemas', icon: Wrench, href: '/dashboard-informatica' },
  { id: 'fiscalizacion', label: 'SENIAT', icon: ShieldCheck, href: '/zero-risk' },
  { id: 'tienda', label: 'Logística', icon: ShoppingBag, href: '/punto-de-venta' },
  { id: 'identidad', label: 'ID Digital', icon: Fingerprint, href: '/tarjeta-digital' },
  { id: 'configuracion', label: 'Maestro', icon: Cog, href: '/general' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white/[0.01] backdrop-blur-3xl border-r border-white/5 flex flex-col z-50 hidden lg:flex shadow-[20px_0_80px_rgba(0,0,0,0.4)]">
      {/* Efecto de luz lateral integrado */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="p-10 border-b border-white/5 flex flex-col items-center gap-4 relative z-10">
        <Link href="/" className="flex flex-col items-center gap-3 transition-transform active:scale-95 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-1000" />
            <Logo className="h-14 w-14 relative z-10 drop-shadow-[0_0_20px_rgba(37,99,235,0.3)]" />
          </div>
          <div className="text-center">
            <span className="text-[10px] font-black tracking-[0.5em] text-white uppercase italic leading-none">System Kyron</span>
            <p className="text-[7px] font-bold text-primary/40 uppercase tracking-[0.2em] mt-1">Global Ecosystem</p>
          </div>
        </Link>
      </div>
      
      <nav className="flex-grow py-10 px-6 space-y-2 overflow-y-auto custom-scrollbar relative z-10">
        <p className="text-[8px] font-black uppercase text-white/20 tracking-[0.6em] mb-8 px-4 italic">Unidad de Control</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.id} 
              href={item.href as any}
              className={cn(
                "group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 relative overflow-hidden border border-transparent",
                isActive 
                  ? "bg-white/[0.03] text-white border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]" 
                  : "text-muted-foreground/40 hover:text-white hover:bg-white/[0.02]"
              )}
            >
              <item.icon className={cn("h-5 w-5 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3", isActive ? "text-primary shadow-glow" : "opacity-30")} />
              <span className={cn("text-[10px] font-black uppercase tracking-[0.2em] transition-colors", isActive ? "text-white" : "group-hover:text-white/80")}>{item.label}</span>
              
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active-line"
                  className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_15px_rgba(37,99,235,1)]"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-8 border-t border-white/5 bg-white/[0.01] relative z-10">
        <div className="flex items-center justify-between gap-4 px-2">
            <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                <span className="text-[8px] font-black text-emerald-500/40 uppercase tracking-widest">Active Node</span>
            </div>
            <span className="text-[8px] font-bold text-white/10 uppercase tracking-widest italic">v2.6.4</span>
        </div>
      </div>
    </aside>
  );
}
