'use client';

import { Link, usePathname } from "@/navigation";
import { cn } from "@/lib/utils";
import { 
  ChevronDown,
  Sparkles,
  LayoutGrid,
  Calculator,
  Users,
  Shield,
  Megaphone,
  Zap,
  Settings2,
  Menu,
  X
} from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth/context";
import { 
    asesoriaContableNavGroups, 
    legalNavGroups, 
    sociosNavGroups, 
    telecomNavGroups,
    ventasNavGroups,
    sostenibilidadNavGroups
} from "./app-sidebar-nav-items";
import { useState, useRef, useEffect } from "react";

export function AppTopNav() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getAuthorizedGroups = () => {
    const groups: typeof asesoriaContableNavGroups = [];
    const userModules = user?.modules ?? [];

    if (userModules.includes('contabilidad')) groups.push(...asesoriaContableNavGroups);
    if (userModules.includes('ventas') || userModules.includes('tpv')) groups.push(...ventasNavGroups);
    if (userModules.includes('sostenibilidad')) groups.push(...sostenibilidadNavGroups);
    if (userModules.includes('legal')) groups.push(...legalNavGroups);
    if (userModules.includes('socios')) groups.push(...sociosNavGroups);
    if (userModules.includes('telecom')) groups.push(...telecomNavGroups);

    if (groups.length === 0) return [...asesoriaContableNavGroups];
    return groups;
  };

  const currentGroups = getAuthorizedGroups();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
  }, [pathname]);

  const groupIcons: Record<string, any> = {
    "Finanzas": Calculator,
    "Talento": Users,
    "Legal": Shield,
    "Negocio": Megaphone,
    "IA Core": Sparkles,
    "Sistema": Settings2,
    "Operaciones": LayoutGrid,
    "Inteligencia": Zap,
    "Mi Línea Personal": LayoutGrid,
    "Mi Línea Empresa": LayoutGrid,
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#030711]/80 backdrop-blur-2xl border-b border-white/5">
        <div className="h-full flex items-center justify-between px-4 lg:px-6 max-w-[1800px] mx-auto">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-6">
            <Link href="/dashboard-empresa" className="flex items-center gap-2.5 shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <Logo className="h-8 w-8 relative z-10" />
              </div>
              <span className="text-[10px] font-black tracking-[0.3em] text-white/80 uppercase hidden sm:block">Kyron</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
              {currentGroups.slice(0, 6).map((group) => {
                const Icon = groupIcons[group.title] || LayoutGrid;
                const isActive = group.items?.some((item: any) => pathname.includes(item.href) && item.href !== '/');
                
                return (
                  <div key={group.title} className="relative">
                    <button
                      onClick={() => setOpenGroup(openGroup === group.title ? null : group.title)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all",
                        isActive || openGroup === group.title
                          ? "bg-primary/15 text-primary"
                          : "text-white/40 hover:text-white/70 hover:bg-white/5"
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span className="hidden xl:inline">{group.title}</span>
                      <ChevronDown className={cn("h-3 w-3 transition-transform", openGroup === group.title && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                      {openGroup === group.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-[#0a0f1a]/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden"
                        >
                          <div className="p-2">
                            <div className="px-3 py-2 text-[8px] font-black uppercase text-white/20 tracking-[0.3em]">
                              {group.title}
                            </div>
                            {group.items?.slice(0, 8).map((item: any) => {
                              const itemActive = pathname.includes(item.href) && item.href !== '/';
                              return (
                                <Link
                                  key={item.href}
                                  href={item.href as any}
                                  className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all",
                                    itemActive
                                      ? "bg-primary/15 text-primary"
                                      : "text-white/40 hover:text-white/70 hover:bg-white/5"
                                  )}
                                >
                                  <item.icon className="h-3.5 w-3.5 shrink-0" />
                                  <span className="truncate">{item.label}</span>
                                  {item.badge && (
                                    <span className={cn(
                                      "px-1.5 py-0.5 rounded text-[6px] font-black uppercase tracking-widest",
                                      item.badge === 'NUEVO' ? "bg-primary text-white" : "bg-emerald-500/20 text-emerald-400"
                                    )}>
                                      {item.badge}
                                    </span>
                                  )}
                                </Link>
                              );
                            })}
                            {group.items && group.items.length > 8 && (
                              <Link
                                href={group.items[0].href as any}
                                className="flex items-center justify-center px-3 py-2 text-[9px] font-bold text-primary/60 hover:text-primary uppercase tracking-wider"
                              >
                                Ver todo ({group.items.length})
                              </Link>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="lg:hidden p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-[#0a0f1a] border-l border-white/5 z-50 overflow-y-auto lg:hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-black tracking-[0.3em] text-white/60 uppercase">Navegación</span>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl text-white/40 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4 space-y-6">
                {currentGroups.map((group) => {
                  const Icon = groupIcons[group.title] || LayoutGrid;
                  return (
                    <div key={group.title} className="space-y-2">
                      <div className="flex items-center gap-2 px-2 text-[9px] font-black uppercase text-white/20 tracking-[0.3em]">
                        <Icon className="h-3 w-3" />
                        {group.title}
                      </div>
                      <div className="space-y-1">
                        {group.items?.map((item: any) => {
                          const itemActive = pathname.includes(item.href) && item.href !== '/';
                          return (
                            <Link
                              key={item.href}
                              href={item.href as any}
                              onClick={() => setMobileOpen(false)}
                              className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all",
                                itemActive
                                  ? "bg-primary/15 text-primary"
                                  : "text-white/40 hover:text-white/70 hover:bg-white/5"
                              )}
                            >
                              <item.icon className="h-3.5 w-3.5 shrink-0" />
                              <span>{item.label}</span>
                              {item.badge && (
                                <span className={cn(
                                  "px-1.5 py-0.5 rounded text-[6px] font-black uppercase tracking-widest",
                                  item.badge === 'NUEVO' ? "bg-primary text-white" : "bg-emerald-500/20 text-emerald-400"
                                )}>
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
