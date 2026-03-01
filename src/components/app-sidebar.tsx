
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
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0a0a0a] border-r border-white/10 flex flex-col z-50 hidden lg:flex shadow-[10px_0_50px_rgba(0,0,0,0.5)]">
      {/* Textura de fondo para evitar el vacío negro */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <div className="p-10 border-b border-white/5 flex flex-col items-center gap-6 relative z-10 bg-black/40 backdrop-blur-md">
        <Link href="/" className="flex flex-col items-center gap-4 transition-all hover:scale-105 group">
          <Logo className="h-14 w-14 drop-shadow-[0_0_20px_rgba(37,99,235,0.4)]" />
          <div className="text-center">
            <span className="text-[10px] font-black tracking-[0.5em] text-white uppercase italic leading-none">System Kyron</span>
            <p className="text-[7px] font-bold text-primary uppercase tracking-[0.3em] mt-2 opacity-60">Control Master</p>
          </div>
        </Link>
      </div>
      
      <nav className="flex-grow py-10 px-6 space-y-2 overflow-y-auto custom-scrollbar relative z-10">
        <p className="text-[8px] font-black uppercase text-white/20 tracking-[0.5em] mb-6 px-4 italic">Operativa</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.id} 
              href={item.href as any}
              className={cn(
                "group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden border",
                isActive 
                  ? "bg-primary/10 border-primary/30 text-white shadow-glow" 
                  : "text-white/40 border-transparent hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("h-4 w-4 transition-all", isActive ? "text-primary" : "opacity-40 group-hover:opacity-100")} />
              <span className={cn("text-[9px] font-black uppercase tracking-widest", isActive ? "text-white" : "group-hover:text-white/80")}>{item.label}</span>
              
              {isActive && (
                <div className="absolute left-0 w-1 h-1/2 bg-primary rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5 bg-black/20 relative z-10 text-center">
        <div className="flex items-center justify-center gap-2">
            <Activity className="h-3 w-3 text-emerald-500 animate-pulse" />
            <span className="text-[8px] font-black text-emerald-500/60 uppercase tracking-widest italic">Node Online v2.6</span>
        </div>
      </div>
    </aside>
  );
}
