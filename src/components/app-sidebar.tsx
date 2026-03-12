'use client';

import { Link, usePathname } from "@/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart3, Users, Recycle, Radio, Cpu, Gavel, Lock, Cog, 
  UserCircle, Briefcase, Star, Fingerprint, Home, FileText, Smartphone, Bell
} from "lucide-react";
import { Logo } from "./logo";
import { motion } from "framer-motion";

const personalMenu = [
  { id: 'inicio', label: 'Inicio', icon: Home, href: '/dashboard' },
  { id: 'perfil', label: 'Mi Perfil', icon: UserCircle, href: '/tarjeta-digital' },
  { id: 'identidad', label: 'Mi Identidad', icon: Fingerprint, href: '/dashboard' },
  { id: 'documentos', label: 'Mis Documentos', icon: FileText, href: '/documentos' },
  { id: 'linea', label: 'Mi Línea 5G', icon: Smartphone, href: '/mi-linea' },
  { id: 'reciclaje', label: 'Puntos Verdes', icon: Recycle, href: '/tarjeta-reciclaje' },
  { id: 'alertas', label: 'Avisos', icon: Bell, href: '/notificaciones' },
];

const corporativoMenu = [
  { id: 'admin', label: 'Administración', icon: Briefcase, href: '/resumen-negocio' },
  { id: 'contabilidad', label: 'Contabilidad', icon: BarChart3, href: '/contabilidad' },
  { id: 'legal', label: 'Asesoría Legal', icon: Gavel, href: '/escritorio-juridico' },
  { id: 'holding', label: 'Socios y Directivos', icon: Users, href: '/dashboard-socios' },
  { id: 'it', label: 'Ingeniería e IT', icon: Cpu, href: '/dashboard-informatica' },
];

export function AppSidebar() {
  const pathname = usePathname();

  const MenuItem = ({ item }: { item: any }) => {
    const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
    return (
      <Link 
        href={item.href as any}
        className={cn(
          "group flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden",
          isActive 
            ? "bg-primary/20 text-white border border-primary/40 shadow-glow" 
            : "text-white/30 hover:text-white hover:bg-white/[0.04]"
        )}
      >
        <item.icon className={cn("h-4 w-4 transition-all", isActive ? "text-primary scale-110 shadow-glow" : "opacity-30 group-hover:opacity-100")} />
        <span className={cn("text-[9px] font-black uppercase tracking-[0.2em]", isActive ? "text-white" : "opacity-80")}>{item.label}</span>
        
        {isActive && (
          <motion.div 
              layoutId="active-nav-glow"
              className="absolute left-0 w-1 h-3/4 bg-primary rounded-r-full shadow-[2px_0_20px_rgba(37,99,235,1)]" 
          />
        )}
      </Link>
    );
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#050505] border-r border-white/5 flex flex-col z-[100] hidden lg:flex shadow-2xl backdrop-blur-3xl overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:30px_30px]" />
      
      <div className="p-10 border-b border-white/5 flex flex-col items-center gap-6 relative z-10 bg-black/40">
        <Link href="/" className="flex flex-col items-center gap-4 transition-all hover:scale-105 group">
          <Logo className="h-14 w-14 drop-shadow-[0_0_20px_rgba(37,99,235,0.4)]" />
          <div className="text-center">
            <span className="text-[11px] font-black tracking-[0.5em] text-white uppercase italic italic-shadow">System Kyron</span>
            <p className="text-[7px] font-bold text-primary uppercase tracking-[0.4em] mt-3 opacity-60 italic">Telecom, Reciclaje y Control Total</p>
          </div>
        </Link>
      </div>
      
      <div className="flex-grow py-8 px-4 space-y-10 overflow-y-auto custom-scrollbar relative z-10">
        <section>
            <p className="text-[8px] font-black uppercase text-primary tracking-[0.5em] mb-6 px-4 italic border-l-2 border-primary/20 ml-2">👤 MI ESPACIO</p>
            <div className="space-y-1.5">
                {personalMenu.map((item) => <MenuItem key={item.id} item={item} />)}
            </div>
        </section>

        <section>
            <p className="text-[8px] font-black uppercase text-white/20 tracking-[0.5em] mb-6 px-4 italic border-l-2 border-white/5 ml-2">💼 SERVICIOS EMPRESARIALES</p>
            <div className="space-y-1.5">
                {corporativoMenu.map((item) => <MenuItem key={item.id} item={item} />)}
            </div>
        </section>
      </div>

      <div className="p-6 border-t border-white/10 bg-black/60 relative z-10">
        <Link href="/seguridad" className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 shadow-inner hover:bg-white/5 transition-all group">
            <div className="flex items-center gap-3">
                <Cog className="h-3.5 w-3.5 text-white/20 group-hover:text-primary group-hover:rotate-90 transition-all duration-500" />
                <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em]">CONFIGURACIÓN</span>
            </div>
            <Star className="h-3 w-3 text-secondary animate-spin-slow opacity-20" />
        </Link>
      </div>
    </aside>
  );
}
