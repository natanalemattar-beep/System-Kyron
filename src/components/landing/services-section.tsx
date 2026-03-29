'use client';

import { motion } from "framer-motion";
import { Calculator, Users, Smartphone, Recycle, Gavel, ShoppingCart, Cpu, Signal, User, Building2, BarChart3, Megaphone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";

const modules = [
    { icon: Calculator,  title: "Contabilidad",  tag: "VEN-NIF",    color: "text-primary",      bg: "bg-gradient-to-br from-primary/20 to-primary/5",  glow: "group-hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.25)]",  border: "border-primary/15", hoverBorder: "hover:border-primary/50" },
    { icon: ShoppingCart, title: "Facturación",   tag: "SENIAT",     color: "text-primary",      bg: "bg-gradient-to-br from-primary/20 to-primary/5",  glow: "group-hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.25)]",  border: "border-primary/15", hoverBorder: "hover:border-primary/50" },
    { icon: Users,       title: "Nómina & RRHH", tag: "LOTTT",      color: "text-primary",      bg: "bg-gradient-to-br from-primary/20 to-primary/5",  glow: "group-hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.25)]",  border: "border-primary/15", hoverBorder: "hover:border-primary/50" },
    { icon: Gavel,       title: "Asesoría Legal", tag: "Gaceta IA",  color: "text-primary",      bg: "bg-gradient-to-br from-primary/20 to-primary/5",  glow: "group-hover:shadow-[0_8px_30px_-8px_rgba(30,64,175,0.25)]",  border: "border-primary/15", hoverBorder: "hover:border-primary/50" },
    { icon: Signal,      title: "Mi Línea 5G",   tag: "eSIM",       color: "text-blue-500 dark:text-blue-400",     bg: "bg-gradient-to-br from-blue-500/20 to-blue-500/5",     glow: "group-hover:shadow-[0_8px_30px_-8px_rgba(59,130,246,0.25)]",   border: "border-blue-500/15",     hoverBorder: "hover:border-blue-500/50" },
    { icon: Smartphone,  title: "Flota Móvil",   tag: "Corporativa", color: "text-blue-500 dark:text-blue-400",     bg: "bg-gradient-to-br from-blue-500/20 to-blue-500/5",     glow: "group-hover:shadow-[0_8px_30px_-8px_rgba(59,130,246,0.25)]",   border: "border-blue-500/15",     hoverBorder: "hover:border-blue-500/50" },
    { icon: Cpu,         title: "IT & Ingeniería", tag: "Servidores", color: "text-blue-500 dark:text-blue-400",     bg: "bg-gradient-to-br from-blue-500/20 to-blue-500/5",     glow: "group-hover:shadow-[0_8px_30px_-8px_rgba(59,130,246,0.25)]",   border: "border-blue-500/15",     hoverBorder: "hover:border-blue-500/50" },
    { icon: Megaphone,   title: "Marketing IA",  tag: "Gemini 2.0",  color: "text-blue-500 dark:text-blue-400",     bg: "bg-gradient-to-br from-blue-500/20 to-blue-500/5",     glow: "group-hover:shadow-[0_8px_30px_-8px_rgba(59,130,246,0.25)]",   border: "border-blue-500/15",     hoverBorder: "hover:border-blue-500/50" },
    { icon: User,        title: "Portal Personal", tag: "ID Digital", color: "text-emerald-600 dark:text-emerald-400",  bg: "bg-gradient-to-br from-emerald-500/20 to-emerald-500/5",  glow: "group-hover:shadow-[0_8px_30px_-8px_rgba(16,185,129,0.25)]",  border: "border-emerald-500/15",  hoverBorder: "hover:border-emerald-500/50" },
    { icon: Recycle,     title: "Eco-Créditos",  tag: "Ameru IA",    color: "text-emerald-600 dark:text-emerald-400",  bg: "bg-gradient-to-br from-emerald-500/20 to-emerald-500/5",  glow: "group-hover:shadow-[0_8px_30px_-8px_rgba(16,185,129,0.25)]",  border: "border-emerald-500/15",  hoverBorder: "hover:border-emerald-500/50" },
    { icon: Building2,   title: "Socios",        tag: "Holdings",    color: "text-emerald-600 dark:text-emerald-400",  bg: "bg-gradient-to-br from-emerald-500/20 to-emerald-500/5",  glow: "group-hover:shadow-[0_8px_30px_-8px_rgba(16,185,129,0.25)]",  border: "border-emerald-500/15",  hoverBorder: "hover:border-emerald-500/50" },
    { icon: BarChart3,   title: "Analítica",     tag: "Dashboard",   color: "text-emerald-600 dark:text-emerald-400",  bg: "bg-gradient-to-br from-emerald-500/20 to-emerald-500/5",  glow: "group-hover:shadow-[0_8px_30px_-8px_rgba(16,185,129,0.25)]",  border: "border-emerald-500/15",  hoverBorder: "hover:border-emerald-500/50" },
];

const highlights = [
    { val: "48h", detail: "Migración", icon: "⚡" },
    { val: "Bilingüe", detail: "ES & EN", icon: "🌍" },
    { val: "Multi-empresa", detail: "Holdings", icon: "🏢" },
    { val: "Gemini 2.0", detail: "IA Integrada", icon: "🧠" },
];

export function ServicesSection() {
    return (
        <section id="servicios" className="py-16 md:py-24 bg-transparent relative z-10 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none -z-10">
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-emerald-500/8 blur-[100px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-blue-500/6 blur-[100px]"
                />
            </div>

            <motion.div
                className="mb-12 md:mb-16 text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-[9px] font-black uppercase tracking-[0.35em] text-primary mx-auto shadow-[0_0_15px_rgba(var(--primary-rgb,30,64,175),0.08)]">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    12 Módulos Integrados
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-foreground uppercase leading-[1.1]">
                    Un ecosistema, <br className="sm:hidden" /><span className="bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 bg-clip-text text-transparent italic animate-gradient-shift" style={{ backgroundSize: '200% auto' }}>cero límites</span>
                </h2>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {modules.map((mod, i) => (
                    <motion.div
                        key={mod.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04, duration: 0.5 }}
                        whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                        className={cn(
                            "group relative flex flex-col items-center text-center gap-3 p-5 md:p-6 rounded-3xl border bg-card/50 dark:bg-white/[0.02] backdrop-blur-sm transition-all duration-500 cursor-default overflow-hidden",
                            mod.border, mod.hoverBorder, mod.glow
                        )}
                    >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-transparent via-transparent to-primary/[0.03]" />
                        <div className={cn("relative p-3 rounded-xl border shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500", mod.bg, mod.border)}>
                            <mod.icon className={cn("h-5 w-5", mod.color)} />
                        </div>
                        <div className="relative space-y-1">
                            <h3 className="text-[11px] font-black uppercase tracking-tight text-foreground group-hover:text-foreground transition-colors">{mod.title}</h3>
                            <span className={cn("text-[8px] font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity", mod.color)}>{mod.tag}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                {highlights.map((r, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -3, scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="flex flex-col items-center text-center gap-1.5 p-4 rounded-3xl bg-gradient-to-b from-muted/40 to-muted/20 dark:from-white/[0.03] dark:to-white/[0.01] border border-border/30 dark:border-white/[0.06] hover:border-primary/25 transition-all duration-300 cursor-default"
                    >
                        <span className="text-base">{r.icon}</span>
                        <p className="text-xs font-black text-foreground/85 uppercase tracking-tight">{r.val}</p>
                        <p className="text-[8px] font-semibold text-muted-foreground/70 uppercase tracking-widest">{r.detail}</p>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                className="mt-8 flex justify-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
            >
                <Link href="/register" className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-[9px] font-black uppercase tracking-widest text-primary hover:border-primary/40 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(var(--primary-rgb,30,64,175),0.1)] transition-all duration-500">
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" /> Acceso al Ecosistema
                </Link>
            </motion.div>
        </section>
    );
}
