
'use client';

import { Link, usePathname } from "@/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart3, Users, Recycle, Droplets, Wallet, 
  ShieldCheck, Cog, LayoutGrid, Activity, Radio, Cpu, Gavel, Lock
} from "lucide-react";
import { Logo } from "./logo";
import { motion } from "framer-motion";

const menuItems = [
  { id: 'inicio', label: 'Consola Central', icon: LayoutGrid, href: '/dashboard' },
  { id: 'zedu', label: 'Modelo de ZEDU', icon: Activity, href: '/estudio-poblacion' },
  { id: 'telecom', label: 'Kyron 5G / eSIM', icon: Radio, href: '/dashboard-telecom' },
  { id: 'reciclaje', label: 'Reciclaje Magnético', icon: Recycle, href: '/tarjeta-reciclaje' },
  { id: 'ia', label: 'Ingeniería IA', icon: Cpu, href: '/dashboard-informatica' },
  { id: 'contabilidad', label: 'Finanzas & Nómina', icon: BarChart3, href: '/contabilidad' },
  { id: 'rrhh', label: 'Gestión Talento', icon: Users, href: '/dashboard-rrhh' },
  { id: 'juridico', label: 'Centro Legal', icon: Gavel, href: '/escritorio-juridico' },
  { id: 'vault', label: 'Bóveda Maestra', icon: Lock, href: '/terminal' },
  { id: 'config', label: 'Configuración', icon: Cog, href: '/general' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0a0a0a] border-r-2 border-primary/20 flex flex-col z-[100] hidden lg:flex shadow-[20px_0_60px_rgba(0,0,0,0.9)] backdrop-blur-3xl overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:30px_30px]" />
      
      <div className="absolute top-0 right-0 w-[3px] h-full bg-primary/40 shadow-[0_0_20px_rgba(37,99,235,0.6)]" />
      
      <div className="p-10 border-b border-white/5 flex flex-col items-center gap-6 relative z-10 bg-black/40">
        <Link href="/" className="flex flex-col items-center gap-4 transition-all hover:scale-105 group">
          <Logo className="h-16 w-16 drop-shadow-[0_0_25px_rgba(37,99,235,0.6)]" />
          <div className="text-center">
            <span className="text-[12px] font-black tracking-[0.5em] text-white uppercase italic leading-none italic-shadow">System Kyron</span>
            <p className="text-[8px] font-bold text-primary uppercase tracking-[0.4em] mt-3 opacity-80">Command Hub v2.6.5</p>
          </div>
        </Link>
      </div>
      
      <nav className="flex-grow py-10 px-6 space-y-2 overflow-y-auto custom-scrollbar relative z-10">
        <p className="text-[9px] font-black uppercase text-primary/60 tracking-[0.6em] mb-8 px-4 italic border-l-2 border-primary/20 ml-2">Hardware Root</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.id} 
              href={item.href as any}
              className={cn(
                "group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden",
                isActive 
                  ? "bg-primary/20 text-white border border-primary/40 shadow-glow" 
                  : "text-white/30 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              <item.icon className={cn("h-4 w-4 transition-all", isActive ? "text-primary scale-125 shadow-glow" : "opacity-30 group-hover:opacity-100 group-hover:scale-110")} />
              <span className={cn("text-[10px] font-black uppercase tracking-[0.2em]", isActive ? "text-white" : "opacity-80")}>{item.label}</span>
              
              {isActive && (
                <motion.div 
                    layoutId="active-nav-glow"
                    className="absolute left-0 w-1 h-3/4 bg-primary rounded-r-full shadow-[2px_0_20px_rgba(37,99,235,1)]" 
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/10 bg-black/60 relative z-10">
        <div className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-primary/5 border border-primary/10 shadow-inner group transition-all hover:bg-primary/10">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_#10b981]" />
            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] group-hover:text-primary transition-colors">Secured Stream</span>
        </div>
      </div>
    </aside>
  );
}
