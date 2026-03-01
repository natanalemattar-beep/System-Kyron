'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Home, BarChart3, Users, Scale, Recycle, Droplets, Wallet, 
  Wrench, ShieldCheck, ShoppingBag, Fingerprint, Cog, 
  ChevronRight, Zap, ShieldAlert, LayoutDashboard
} from "lucide-react";
import { Logo } from "./logo";
import { motion } from "framer-motion";

const menuItems = [
  { id: 'inicio', label: 'Inicio', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'contabilidad', label: 'Contabilidad', icon: BarChart3, href: '/contabilidad' },
  { id: 'rrhh', label: 'RR.HH.', icon: Users, href: '/dashboard-rrhh' },
  { id: 'juridico', label: 'Jurídico', icon: Scale, href: '/escritorio-juridico' },
  { id: 'sostenibilidad', label: 'Sostenibilidad', icon: Recycle, href: '/ecosistema' },
  { id: 'petroleo', label: 'Petróleo', icon: Droplets, href: '/dashboard-telecom' },
  { id: 'tesoreria', label: 'Tesorería', icon: Wallet, href: '/cuentas-por-cobrar' },
  { id: 'mantenimiento', label: 'Mantenimiento', icon: Wrench, href: '/dashboard-informatica' },
  { id: 'fiscalizacion', label: 'Fiscalización', icon: ShieldCheck, href: '/zero-risk' },
  { id: 'tienda', label: 'Tienda', icon: ShoppingBag, href: '/punto-de-venta' },
  { id: 'identidad', label: 'Identidad Digital', icon: Fingerprint, href: '/tarjeta-digital' },
  { id: 'configuracion', label: 'Configuración', icon: Cog, href: '/general' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0A2472] text-white flex flex-col z-50 border-r border-white/5 shadow-2xl hidden lg:flex">
      <div className="p-8 border-b border-white/5">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="bg-white p-2 rounded-xl shadow-lg transition-transform group-hover:rotate-12">
            <Logo className="h-8 w-8 text-[#0A2472]" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic text-white/90">Kyron</span>
        </Link>
      </div>
      
      <nav className="flex-grow py-8 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        <p className="text-[10px] font-black uppercase text-white/30 tracking-[0.3em] mb-4 px-4">Centro de Mando</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.id} 
              href={item.href}
              className={cn(
                "group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden",
                isActive 
                  ? "bg-white/10 text-white shadow-xl translate-x-1" 
                  : "text-white/50 hover:text-white hover:bg-white/5 hover:translate-x-1"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-nav-indicator"
                  className="absolute left-0 top-3 bottom-3 w-1.5 bg-[#4CAF50] rounded-r-full shadow-[0_0_15px_#4CAF50]"
                />
              )}
              <item.icon className={cn("h-5 w-5 transition-transform duration-300", isActive ? "text-[#4CAF50] scale-110" : "group-hover:scale-110")} />
              <span className="text-[11px] font-bold uppercase tracking-widest">{item.label}</span>
              {isActive && <ChevronRight className="ml-auto h-3 w-3 opacity-50" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5 bg-black/20">
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <Zap className="h-4 w-4 text-[#4CAF50]" />
                <span className="text-[9px] font-black uppercase tracking-widest text-green-400">Core IA: Online</span>
            </div>
            <div className="text-[9px] font-bold text-center text-white/30 uppercase tracking-[0.4em]">v2.0 • Build 2026</div>
        </div>
      </div>
    </aside>
  );
}