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
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-black/40 backdrop-blur-2xl border-r border-white/10 flex flex-col z-50 hidden lg:flex shadow-[10px_0_40px_rgba(0,0,0,0.8)]">
      {/* Efecto de luz lateral para rellenar el negro */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="p-8 border-b border-white/5 flex flex-col items-center gap-4 relative z-10 bg-black/20">
        <Link href="/" className="flex flex-col items-center gap-2 transition-transform active:scale-95 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/40 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
            <Logo className="h-12 w-12 relative z-10 drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
          </div>
          <span className="text-xs font-black tracking-[0.4em] text-white uppercase italic">System Kyron</span>
        </Link>
      </div>
      
      <nav className="flex-grow py-8 px-4 space-y-1.5 overflow-y-auto custom-scrollbar relative z-10">
        <p className="text-[9px] font-black uppercase text-primary/40 tracking-[0.5em] mb-6 px-4 italic">Unidad de Control</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.id} 
              href={item.href as any}
              className={cn(
                "group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden border border-transparent",
                isActive 
                  ? "bg-primary/20 text-white border-white/10 shadow-[0_0_20px_rgba(37,99,235,0.2)]" 
                  : "text-muted-foreground/80 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("h-4.5 w-4.5 transition-transform duration-500 group-hover:scale-110", isActive ? "text-primary" : "opacity-50")} />
              <span className={cn("text-[10px] font-black uppercase tracking-widest", isActive ? "text-white" : "")}>{item.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active-line"
                  className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(37,99,235,1)]"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5 bg-black/40 relative z-10">
        <div className="flex items-center justify-between gap-2 px-2">
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                <span className="text-[8px] font-black text-green-500/60 uppercase tracking-widest">Online</span>
            </div>
            <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest italic">v2.6.4</span>
        </div>
      </div>
    </aside>
  );
}