'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart3, Users, Scale, Recycle, Droplets, Wallet, 
  Wrench, ShieldCheck, ShoppingBag, Fingerprint, Cog, 
  ChevronRight, Zap, LayoutDashboard, Terminal
} from "lucide-react";
import { Logo } from "./logo";
import { motion } from "framer-motion";

const menuItems = [
  { id: 'inicio', label: 'OPERACIONES', icon: Terminal, href: '/dashboard' },
  { id: 'contabilidad', label: 'FINANZAS', icon: BarChart3, href: '/contabilidad' },
  { id: 'rrhh', label: 'TALENTO', icon: Users, href: '/dashboard-rrhh' },
  { id: 'juridico', label: 'LEGAL', icon: Scale, href: '/escritorio-juridico' },
  { id: 'sostenibilidad', label: 'VERDE', icon: Recycle, href: '/ecosistema' },
  { id: 'petroleo', label: 'ENERGÍA', icon: Droplets, href: '/dashboard-telecom' },
  { id: 'tesoreria', label: 'TESORERÍA', icon: Wallet, href: '/cuentas-por-cobrar' },
  { id: 'mantenimiento', label: 'SISTEMAS', icon: Wrench, href: '/dashboard-informatica' },
  { id: 'fiscalizacion', label: 'FISCAL', icon: ShieldCheck, href: '/zero-risk' },
  { id: 'tienda', label: 'LOGÍSTICA', icon: ShoppingBag, href: '/punto-de-venta' },
  { id: 'identidad', label: 'ID DIGITAL', icon: Fingerprint, href: '/tarjeta-digital' },
  { id: 'configuracion', label: 'MAESTRO', icon: Cog, href: '/general' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-black border-r border-white/10 flex flex-col z-50 hidden lg:flex">
      <div className="p-10 border-b border-white/5">
        <Link href="/" className="flex items-center gap-5 group">
          <div className="bg-primary/10 p-2.5 rounded-lg border border-primary/20 transition-all duration-500 group-hover:bg-primary/20">
            <Logo className="h-10 w-10" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-black tracking-tighter uppercase italic leading-none">Kyron</span>
            <span className="text-[7px] font-black tracking-[0.4em] text-primary/60 uppercase leading-none mt-1">Core Engine</span>
          </div>
        </Link>
      </div>
      
      <nav className="flex-grow py-10 px-6 space-y-2 overflow-y-auto custom-scrollbar">
        <p className="text-[9px] font-black uppercase text-white/20 tracking-[0.5em] mb-10 px-4">Terminal de Enlace</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.id} 
              href={item.href}
              className={cn(
                "group flex items-center gap-5 px-5 py-4 rounded-lg transition-all duration-300 relative",
                isActive 
                  ? "bg-white/5 text-primary border border-white/10 shadow-[inset_0_0_20px_rgba(37,99,235,0.1)]" 
                  : "text-white/30 hover:text-white hover:bg-white/[0.03]"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute left-0 top-4 bottom-4 w-1 bg-primary rounded-full shadow-[0_0_15px_#2563eb]"
                />
              )}
              <item.icon className={cn("h-5 w-5 transition-all duration-500", isActive ? "scale-125 text-primary" : "group-hover:scale-110 group-hover:text-white")} />
              <span className="text-[11px] font-black uppercase tracking-[0.1em]">{item.label}</span>
              {isActive && <div className="ml-auto h-2 w-2 rounded-full bg-primary animate-pulse" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-8 border-t border-white/10 bg-white/[0.02]">
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 p-5 rounded-lg bg-black border border-white/5">
                <div className="relative">
                    <Zap className="h-5 w-5 text-secondary" />
                    <div className="absolute inset-0 blur-[10px] bg-secondary opacity-40 animate-pulse" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-widest text-secondary/80">IA Neural Link</span>
                    <span className="text-[8px] font-bold text-white/20 uppercase">Estado: Nominal</span>
                </div>
            </div>
            <div className="text-[8px] font-black text-center text-white/10 uppercase tracking-[0.6em]">KYRON OS v2.6.0</div>
        </div>
      </div>
    </aside>
  );
}