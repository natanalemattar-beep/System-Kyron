
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Home, BarChart3, Users, Scale, Recycle, Droplets, Wallet, 
  Wrench, ShieldCheck, ShoppingBag, Fingerprint, Cog, 
  ChevronRight, LayoutDashboard 
} from "lucide-react";
import { Logo } from "./logo";
import { motion } from "framer-motion";

const menuItems = [
  { id: 'inicio', label: 'Inicio', icon: Home, href: '/dashboard' },
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
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0A2472] text-white flex flex-col z-50 border-r border-white/10 shadow-2xl hidden lg:flex">
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo className="h-10 w-10 transition-transform group-hover:scale-110" />
          <span className="text-2xl font-black tracking-tighter uppercase italic opacity-90">Kyron</span>
        </Link>
      </div>
      
      <nav className="flex-grow py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.id} 
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden",
                isActive 
                  ? "bg-white/10 text-white shadow-lg" 
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute left-0 top-2 bottom-2 w-1 bg-[#4CAF50] rounded-r-full"
                />
              )}
              <item.icon className={cn("h-5 w-5 transition-colors", isActive ? "text-[#4CAF50]" : "group-hover:text-white")} />
              <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
              {isActive && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 bg-black/20">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Sistemas Operativos</span>
        </div>
      </div>
    </aside>
  );
}
