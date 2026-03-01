'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart3, Users, Scale, Recycle, Droplets, Wallet, 
  Wrench, ShieldCheck, ShoppingBag, Fingerprint, Cog, 
  LayoutGrid
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
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r flex flex-col z-50 hidden lg:flex">
      <div className="p-6 border-b flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 transition-transform active:scale-95">
          <Logo className="h-7 w-7" />
          <span className="text-lg font-black tracking-tighter text-primary uppercase">System Kyron</span>
        </Link>
      </div>
      
      <nav className="flex-grow py-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        <p className="text-[10px] font-bold uppercase text-muted-foreground/50 tracking-widest mb-4 px-2">Terminal Principal</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.id} 
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 relative",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className={cn("h-4 w-4", isActive ? "text-white" : "text-muted-foreground group-hover:text-primary")} />
              <span className="text-sm font-medium">{item.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active-indicator"
                  className="absolute right-2 w-1 h-4 rounded-full bg-white/20"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t bg-muted/30">
        <div className="text-[10px] font-bold text-center text-muted-foreground/40 uppercase tracking-widest">© 2025 System Kyron</div>
      </div>
    </aside>
  );
}