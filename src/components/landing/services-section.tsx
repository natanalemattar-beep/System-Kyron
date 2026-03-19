'use client';

import { motion } from "framer-motion";
import { Calculator, Users, Smartphone, Recycle, Gavel, ShoppingCart, BarChart3, Cpu, Megaphone, User, Signal, Building2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";

const categories = [
    {
        label: "Empresa",
        description: "Suite corporativa completa para gestión financiera, legal y de talento humano.",
        color: "text-primary",
        glow: "group-hover:shadow-[0_0_40px_-8px_theme(colors.primary.DEFAULT)]",
        gradient: "from-primary/15 via-primary/5 to-transparent",
        borderHover: "hover:border-primary/30",
        modules: [
            { icon: Calculator, title: "Contabilidad", desc: "VEN-NIF, libros, tributos y ajuste por inflación", color: "text-primary", bg: "bg-primary/10" },
            { icon: ShoppingCart, title: "Facturación", desc: "Facturas SENIAT con tasa BCV y módulo de ventas", color: "text-primary", bg: "bg-primary/10" },
            { icon: Users, title: "Recursos Humanos", desc: "Nómina, prestaciones, LOPCYMAT y selección", color: "text-primary", bg: "bg-primary/10" },
            { icon: Gavel, title: "Asesoría Legal", desc: "Contratos, permisos, Conatel y Gaceta Oficial IA", color: "text-primary", bg: "bg-primary/10" },
        ],
    },
    {
        label: "Telecom & IT",
        description: "Gestión de infraestructura de telecomunicaciones y tecnología de misión crítica.",
        color: "text-blue-400",
        glow: "group-hover:shadow-[0_0_40px_-8px_theme(colors.blue.400)]",
        gradient: "from-blue-500/15 via-blue-500/5 to-transparent",
        borderHover: "hover:border-blue-500/30",
        modules: [
            { icon: Signal,    title: "Administración de Red", desc: "Radiobases, infraestructura y provisión masiva", color: "text-blue-400", bg: "bg-blue-500/10" },
            { icon: Smartphone,title: "Mis Líneas",           desc: "Portal unificado personal + flota empresarial 5G", color: "text-blue-400", bg: "bg-blue-500/10" },
            { icon: Cpu,       title: "Ingeniería & IT",      desc: "Planos técnicos, presupuestos y servidores", color: "text-blue-400", bg: "bg-blue-500/10" },
            { icon: Megaphone, title: "Marketing IA",         desc: "Alertas de inversión y análisis de mercado con IA", color: "text-blue-400", bg: "bg-blue-500/10" },
        ],
    },
    {
        label: "Personal & Sostenibilidad",
        description: "Portal ciudadano con bóveda digital, eco-créditos y gestión de activos verdes.",
        color: "text-emerald-400",
        glow: "group-hover:shadow-[0_0_40px_-8px_theme(colors.emerald.400)]",
        gradient: "from-emerald-500/15 via-emerald-500/5 to-transparent",
        borderHover: "hover:border-emerald-500/30",
        modules: [
            { icon: User,      title: "Cuenta Personal",    desc: "ID digital, documentos civiles y trámites de salud", color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { icon: Recycle,   title: "Ameru Eco-Créditos", desc: "Reciclaje inteligente y mercado de eco-créditos", color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { icon: Building2, title: "Socios & Directivos", desc: "Supervisión estratégica de holdings y beneficios", color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { icon: BarChart3, title: "Analítica General",  desc: "KPIs, proyecciones y dashboard ejecutivo unificado", color: "text-emerald-400", bg: "bg-emerald-500/10" },
        ],
    },
];

export function ServicesSection() {
    return (
        <section id="servicios" className="py-16 md:py-32 bg-transparent relative z-10">

            {/* Section header */}
            <motion.div
                className="mb-16 md:mb-24 text-center space-y-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-card/40 backdrop-blur-sm text-[9px] font-black uppercase tracking-[0.35em] text-muted-foreground mx-auto">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    12 Módulos Integrados
                </div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground uppercase leading-tight">
                    Ecosistema <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent italic">Modular</span>
                </h2>
                <p className="text-muted-foreground/70 max-w-lg mx-auto font-semibold text-sm leading-relaxed">
                    Selecciona el área que tu empresa necesita. Cada módulo funciona de forma independiente o como parte del ecosistema completo.
                </p>
            </motion.div>

            {/* Category stacks */}
            <div className="space-y-6 md:space-y-8">
                {categories.map((cat, ci) => (
                    <motion.div
                        key={cat.label}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.05 }}
                        transition={{ duration: 0.6, delay: ci * 0.1 }}
                        className={cn(
                            "group rounded-[2rem] border border-white/8 bg-gradient-to-br overflow-hidden transition-all duration-500 hover:border-white/15",
                            cat.gradient, cat.glow
                        )}
                    >
                        {/* Category header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-7 py-5 border-b border-white/8">
                            <div className="space-y-1">
                                <span className={cn("text-[9px] font-black uppercase tracking-[0.4em]", cat.color)}>{cat.label}</span>
                                <p className="text-xs text-muted-foreground/60 font-medium">{cat.description}</p>
                            </div>
                            <div className={cn("text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-all", cat.color)}>
                                Ver módulos <ArrowRight className="h-3 w-3" />
                            </div>
                        </div>

                        {/* Module cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04]">
                            {cat.modules.map((mod, mi) => (
                                <motion.div
                                    key={mod.title}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 + mi * 0.06 }}
                                    className="flex flex-col gap-4 p-6 md:p-7 bg-card/30 hover:bg-card/50 backdrop-blur-sm transition-all duration-300 group/card"
                                >
                                    <div className={cn("p-2.5 rounded-xl w-fit border border-white/5 group-hover/card:scale-110 transition-transform shadow-inner", mod.bg)}>
                                        <mod.icon className={cn("h-5 w-5", mod.color)} />
                                    </div>
                                    <div className="space-y-1.5 mt-auto">
                                        <h3 className={cn("text-[11px] font-black uppercase tracking-tight transition-colors", mod.color)}>
                                            {mod.title}
                                        </h3>
                                        <p className="text-[9px] text-muted-foreground/60 font-semibold leading-relaxed">
                                            {mod.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
                className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
            >
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">
                    Accede desde el botón
                </p>
                <Link href="/register" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-[9px] font-black uppercase tracking-widest text-primary hover:border-primary/40 hover:bg-primary/10 transition-all">
                    <ArrowRight className="h-3 w-3" /> ACCESO AL ECOSISTEMA
                </Link>
            </motion.div>
        </section>
    );
}
