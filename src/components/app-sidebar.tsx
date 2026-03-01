
'use client';

import { Link, usePathname } from "@/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart3, Users, Scale, Recycle, Droplets, Wallet, 
  Wrench, ShieldCheck, ShoppingBag, Fingerprint, Cog, 
  LayoutGrid, Sparkles
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
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card/10 backdrop-blur-3xl border-r border-white/5 flex flex-col z-50 hidden lg:flex shadow-[20px_0_50px_-20px_rgba(0,0,0,0.5)]">
      {/* Glow Efecto para rellenar el vacío */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
      
      <div className="p-8 border-b border-white/5 flex flex-col items-center gap-4 relative z-10">
        <Link href="/" className="flex flex-col items-center gap-2 transition-transform active:scale-95 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-0 group-hover:scale-125 transition-transform duration-500" />
            <Logo className="h-10 w-10 relative z-10" />
          </div>
          <span className="text-sm font-black tracking-[0.2em] text-primary uppercase italic">System Kyron</span>
        </Link>
      </div>
      
      <nav className="flex-grow py-8 px-4 space-y-1.5 overflow-y-auto custom-scrollbar relative z-10">
        <p className="text-[9px] font-black uppercase text-muted-foreground/30 tracking-[0.4em] mb-6 px-4 italic">Unidad de Control</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.id} 
              href={item.href as any}
              className={cn(
                "group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden",
                isActive 
                  ? "bg-primary/10 text-primary shadow-[inset_0_0_20px_rgba(37,99,235,0.1)] border border-primary/20" 
                  : "text-muted-foreground/60 hover:text-foreground hover:bg-white/5"
              )}
            >
              <item.icon className={cn("h-4 w-4 transition-transform duration-500 group-hover:scale-110", isActive ? "text-primary" : "opacity-50")} />
              <span className={cn("text-[11px] font-bold uppercase tracking-widest", isActive ? "font-black" : "font-medium")}>{item.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active-line"
                  className="absolute left-0 w-1 h-6 rounded-r-full bg-primary shadow-[0_0_15px_rgba(37,99,235,0.8)]"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5 bg-white/[0.02] relative z-10">
        <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            <span className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-[0.3em]">Core Status: Online</span>
        </div>
        <div className="text-[8px] font-bold text-center text-muted-foreground/20 uppercase tracking-[0.5em]">© 2026 KYRON ENGINE</div>
      </div>
    </aside>
  );
}
