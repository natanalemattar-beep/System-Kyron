
'use client';

import { Link, usePathname } from "@/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart3, Users, Scale, Recycle, Droplets, Wallet, 
  Wrench, ShieldCheck, ShoppingBag, Fingerprint, Cog, 
  LayoutGrid, Activity
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
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0a0a0a]/95 border-r border-primary/50 flex flex-col z-50 hidden lg:flex shadow-[20px_0_100px_rgba(0,0,0,0.8)] backdrop-blur-3xl overflow-hidden">
      {/* Textura Industrial para el Sidebar */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:10px_10px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/[0.03] pointer-events-none" />
      
      <div className="p-12 border-b border-white/10 flex flex-col items-center gap-6 relative z-10 bg-black/60">
        <Link href="/" className="flex flex-col items-center gap-4 transition-all hover:scale-105 group">
          <Logo className="h-16 w-16 drop-shadow-[0_0_25px_rgba(37,99,235,0.6)]" />
          <div className="text-center">
            <span className="text-[11px] font-black tracking-[0.6em] text-white uppercase italic leading-none">System Kyron</span>
            <p className="text-[8px] font-bold text-primary uppercase tracking-[0.4em] mt-3 opacity-80">Command Control</p>
          </div>
        </Link>
      </div>
      
      <nav className="flex-grow py-12 px-6 space-y-3 overflow-y-auto custom-scrollbar relative z-10">
        <p className="text-[9px] font-black uppercase text-primary/40 tracking-[0.6em] mb-10 px-4 italic">Core Operations</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.id} 
              href={item.href as any}
              className={cn(
                "group flex items-center gap-5 px-5 py-4 rounded-2xl transition-all duration-500 relative overflow-hidden border",
                isActive 
                  ? "bg-primary/20 border-primary/50 text-white shadow-[0_0_30px_rgba(37,99,235,0.2)]" 
                  : "text-white/30 border-transparent hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("h-5 w-5 transition-all duration-500", isActive ? "text-primary scale-110" : "opacity-30 group-hover:opacity-100 group-hover:scale-110")} />
              <span className={cn("text-[10px] font-black uppercase tracking-[0.2em]", isActive ? "text-white" : "group-hover:text-white/90")}>{item.label}</span>
              
              {isActive && (
                <motion.div 
                    layoutId="active-nav"
                    className="absolute left-0 w-1.5 h-1/2 bg-primary rounded-r-full shadow-[4px_0_15px_rgba(37,99,235,0.8)]" 
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-8 border-t border-white/10 bg-black/40 relative z-10">
        <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
            <Activity className="h-4 w-4 text-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black text-emerald-500/80 uppercase tracking-widest italic">Node v2.6.4 Online</span>
        </div>
      </div>
    </aside>
  );
}
