'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart3, Users, Scale, Recycle, Droplets, Wallet, 
  Wrench, ShieldCheck, ShoppingBag, Fingerprint, Cog, 
  ChevronRight, Zap, LayoutDashboard
} from "lucide-react";
import { Logo } from "./logo";
import { motion } from "framer-motion";

const menuItems = [
  { id: 'inicio', label: 'OPERACIONES', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'contabilidad', label: 'FINANZAS', icon: BarChart3, href: '/contabilidad' },
  { id: 'rrhh', label: 'TALENTO', icon: Users, href: '/dashboard-rrhh' },
  { id: 'juridico', label: 'LEGAL', icon: Scale, href: '/escritorio-juridico' },
  { id: 'sostenibilidad', label: 'VERDE', icon: Recycle, href: '/ecosistema' },
  { id: 'petroleo', label: 'ENERGÍA', icon: Droplets, href: '/dashboard-telecom' },
  { id: 'tesoreria', label: 'TESORERÍA', icon: Wallet, href: '/cuentas-por-cobrar' },
  { id: 'mantenimiento', label: 'SISTEMAS', icon: Wrench, href: '/dashboard-informatica' },
  { id: 'fiscalizacion', label: 'FISCAL', icon: ShieldCheck, href: '/zero-risk' },
  { id: 'tienda', label: 'LOGÍSTICA', icon: ShoppingBag, href: '/punto-de-venta' },
  { id: 'identidad', label: 'ID 3D', icon: Fingerprint, href: '/tarjeta-digital' },
  { id: 'configuracion', label: 'MAESTRO', icon: Cog, href: '/general' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-white/5 flex flex-col z-50 transition-all duration-500 hidden lg:flex">
      <div className="p-8 border-b border-white/5">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="bg-primary/10 p-2 rounded-xl border border-primary/20 transition-transform group-hover:rotate-12">
            <Logo className="h-8 w-8" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic">Kyron</span>
        </Link>
      </div>
      
      <nav className="flex-grow py-8 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.4em] mb-6 px-4">Terminal de Control</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.id} 
              href={item.href}
              className={cn(
                "group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden",
                isActive 
                  ? "bg-primary/10 text-primary shadow-[0_0_20px_-5px_rgba(37,99,235,0.3)] border border-primary/20" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute left-0 top-3 bottom-3 w-1 bg-primary rounded-full shadow-[0_0_15px_#2563eb]"
                />
              )}
              <item.icon className={cn("h-5 w-5 transition-all", isActive ? "scale-110" : "group-hover:scale-110")} />
              <span className="text-[11px] font-black uppercase tracking-tighter">{item.label}</span>
              {isActive && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5 bg-black/20">
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/5 border border-secondary/20">
                <div className="relative">
                    <Zap className="h-4 w-4 text-secondary" />
                    <div className="absolute inset-0 blur-[8px] bg-secondary opacity-50" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-secondary/80">IA Core: Activo</span>
            </div>
            <div className="text-[8px] font-black text-center text-white/20 uppercase tracking-[0.5em]">SYSTEM KYRON v2.0 • 2026</div>
        </div>
      </div>
    </aside>
  );
}