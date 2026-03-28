'use client';

import { motion } from "framer-motion";
import { Calculator, Users, Smartphone, Recycle, Gavel, ShoppingCart, Cpu, Signal, User, Building2, BarChart3, Megaphone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";

const modules = [
    { icon: Calculator,  title: "Contabilidad",  tag: "VEN-NIF",    color: "text-primary",      bg: "bg-gradient-to-br from-primary/15 to-primary/5",      border: "border-primary/20",      hover: "hover:border-primary/40" },
    { icon: ShoppingCart, title: "Facturación",   tag: "SENIAT",     color: "text-primary",      bg: "bg-gradient-to-br from-primary/15 to-primary/5",      border: "border-primary/20",      hover: "hover:border-primary/40" },
    { icon: Users,       title: "Nómina & RRHH", tag: "LOTTT",      color: "text-primary",      bg: "bg-gradient-to-br from-primary/15 to-primary/5",      border: "border-primary/20",      hover: "hover:border-primary/40" },
    { icon: Gavel,       title: "Asesoría Legal", tag: "Gaceta IA",  color: "text-primary",      bg: "bg-gradient-to-br from-primary/15 to-primary/5",      border: "border-primary/20",      hover: "hover:border-primary/40" },
    { icon: Signal,      title: "Mi Línea 5G",   tag: "eSIM",       color: "text-blue-500 dark:text-blue-400",     bg: "bg-gradient-to-br from-blue-500/15 to-blue-500/5",     border: "border-blue-500/20",     hover: "hover:border-blue-500/40" },
    { icon: Smartphone,  title: "Flota Móvil",   tag: "Corporativa", color: "text-blue-500 dark:text-blue-400",     bg: "bg-gradient-to-br from-blue-500/15 to-blue-500/5",     border: "border-blue-500/20",     hover: "hover:border-blue-500/40" },
    { icon: Cpu,         title: "IT & Ingeniería", tag: "Servidores", color: "text-blue-500 dark:text-blue-400",     bg: "bg-gradient-to-br from-blue-500/15 to-blue-500/5",     border: "border-blue-500/20",     hover: "hover:border-blue-500/40" },
    { icon: Megaphone,   title: "Marketing IA",  tag: "Gemini 2.0",  color: "text-blue-500 dark:text-blue-400",     bg: "bg-gradient-to-br from-blue-500/15 to-blue-500/5",     border: "border-blue-500/20",     hover: "hover:border-blue-500/40" },
    { icon: User,        title: "Portal Personal", tag: "ID Digital", color: "text-emerald-600 dark:text-emerald-400",  bg: "bg-gradient-to-br from-emerald-500/15 to-emerald-500/5",  border: "border-emerald-500/20",  hover: "hover:border-emerald-500/40" },
    { icon: Recycle,     title: "Eco-Créditos",  tag: "Ameru IA",    color: "text-emerald-600 dark:text-emerald-400",  bg: "bg-gradient-to-br from-emerald-500/15 to-emerald-500/5",  border: "border-emerald-500/20",  hover: "hover:border-emerald-500/40" },
    { icon: Building2,   title: "Socios",        tag: "Holdings",    color: "text-emerald-600 dark:text-emerald-400",  bg: "bg-gradient-to-br from-emerald-500/15 to-emerald-500/5",  border: "border-emerald-500/20",  hover: "hover:border-emerald-500/40" },
    { icon: BarChart3,   title: "Analítica",     tag: "Dashboard",   color: "text-emerald-600 dark:text-emerald-400",  bg: "bg-gradient-to-br from-emerald-500/15 to-emerald-500/5",  border: "border-emerald-500/20",  hover: "hover:border-emerald-500/40" },
];

const highlights = [
    { val: "48h", detail: "Migración" },
    { val: "Bilingüe", detail: "ES & EN" },
    { val: "Multi-empresa", detail: "Holdings" },
    { val: "Gemini 2.0", detail: "IA Integrada" },
];

export function ServicesSection() {
    return (
        <section id="servicios" className="py-12 md:py-20 bg-transparent relative z-10 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-emerald-500/5 blur-[100px]" />
            </div>

            <motion.div
                className="mb-10 md:mb-14 text-center space-y-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-card/40 backdrop-blur-sm text-[9px] font-black uppercase tracking-[0.35em] text-muted-foreground mx-auto">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
                    12 Módulos
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-foreground uppercase leading-[1.2]">
                    Un ecosistema, <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent italic animate-gradient-shift" style={{ backgroundSize: '200% auto' }}>cero límites</span>
                </h2>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {modules.map((mod, i) => (
                    <motion.div
                        key={mod.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04, duration: 0.4 }}
                        whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                        className={cn(
                            "group flex flex-col items-center text-center gap-3 p-5 md:p-6 rounded-3xl border bg-card/50 dark:bg-white/[0.015] backdrop-blur-sm transition-all duration-300 cursor-default shadow-sm hover:shadow-xl",
                            mod.border, mod.hover
                        )}
                    >
                        <div className={cn("p-3 rounded-xl border shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-300", mod.bg, mod.border)}>
                            <mod.icon className={cn("h-5 w-5", mod.color)} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-[11px] font-black uppercase tracking-tight text-foreground">{mod.title}</h3>
                            <span className={cn("text-[8px] font-bold uppercase tracking-widest", mod.color)}>{mod.tag}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                {highlights.map((r, i) => (
                    <div key={i} className="flex flex-col items-center text-center gap-1 p-3 rounded-3xl bg-muted/30 dark:bg-white/[0.02] border border-border/30 dark:border-white/[0.06]">
                        <p className="text-xs font-black text-foreground/80 uppercase tracking-tight">{r.val}</p>
                        <p className="text-[8px] font-semibold text-muted-foreground/70 uppercase tracking-widest">{r.detail}</p>
                    </div>
                ))}
            </motion.div>

            <motion.div
                className="mt-6 flex justify-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
            >
                <Link href="/register" className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/15 bg-primary/5 text-[9px] font-black uppercase tracking-widest text-primary hover:border-primary/30 hover:bg-primary/10 transition-all duration-300">
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform duration-300" /> Acceso al Ecosistema
                </Link>
            </motion.div>
        </section>
    );
}
