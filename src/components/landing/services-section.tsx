'use client';

import { motion } from "framer-motion";
import { ArrowRight, Calculator, Users, Smartphone, Recycle, Gavel, ShoppingCart, BarChart3, Cpu, Megaphone, User, Signal, Building2 } from "lucide-react";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";

const categories = [
    {
        label: "Empresa",
        color: "text-primary",
        accent: "bg-primary/10 border-primary/20",
        modules: [
            { icon: Calculator, title: "Contabilidad", desc: "VEN-NIF, libros, tributos y ajuste por inflación", href: "/login-empresa" },
            { icon: ShoppingCart, title: "Facturación", desc: "Facturas SENIAT con tasa BCV y módulo de ventas", href: "/login-ventas" },
            { icon: Users, title: "Recursos Humanos", desc: "Nómina, prestaciones, LOPCYMAT y selección", href: "/login-rrhh" },
            { icon: Gavel, title: "Asesoría Legal", desc: "Contratos, permisos, Conatel y Gaceta Oficial IA", href: "/login-escritorio-juridico" },
        ],
    },
    {
        label: "Telecom & IT",
        color: "text-blue-400",
        accent: "bg-blue-400/10 border-blue-400/20",
        modules: [
            { icon: Signal, title: "Administración de Red", desc: "Radiobases, infraestructura y provisión masiva", href: "/login-telecom" },
            { icon: Smartphone, title: "Mis Líneas", desc: "Portal unificado personal + flota empresarial 5G", href: "/login-linea" },
            { icon: Cpu, title: "Ingeniería & IT", desc: "Planos técnicos, presupuestos y servidores", href: "/login-informatica" },
            { icon: Megaphone, title: "Marketing IA", desc: "Alertas de inversión y análisis de mercado con IA", href: "/login-marketing" },
        ],
    },
    {
        label: "Personal & Sostenibilidad",
        color: "text-emerald-400",
        accent: "bg-emerald-400/10 border-emerald-400/20",
        modules: [
            { icon: User, title: "Cuenta Personal", desc: "ID digital, documentos civiles y trámites de salud", href: "/login-personal" },
            { icon: Recycle, title: "Ameru Eco-Créditos", desc: "Reciclaje inteligente y mercado de eco-créditos", href: "/login-sostenibilidad" },
            { icon: Building2, title: "Socios & Directivos", desc: "Supervisión estratégica de holdings y beneficios", href: "/login-socios" },
            { icon: BarChart3, title: "Analítica General", desc: "KPIs, proyecciones y dashboard ejecutivo unificado", href: "/login-empresa" },
        ],
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }
};

export function ServicesSection() {
    return (
        <section id="servicios" className="py-16 md:py-32 bg-transparent relative z-10">

            {/* Header */}
            <motion.div
                className="mb-12 md:mb-20 space-y-4 text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
            >
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground uppercase italic italic-shadow">
                    Ecosistema <span className="text-primary not-italic">Modular</span>
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto lg:ml-0 font-bold uppercase tracking-widest text-xs md:text-sm italic">
                    12 portales integrados. Selecciona el área que tu empresa necesita y accede de inmediato.
                </p>
            </motion.div>

            {/* Categories */}
            <div className="space-y-10 md:space-y-14">
                {categories.map((cat, ci) => (
                    <div key={cat.label}>
                        {/* Category label */}
                        <motion.div
                            className="flex items-center gap-4 mb-6"
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className={cn("text-[9px] font-black uppercase tracking-[0.4em] px-3 py-1 rounded-full border", cat.accent, cat.color)}>
                                {cat.label}
                            </span>
                            <div className="h-px flex-1 bg-border/40" />
                        </motion.div>

                        {/* Module cards */}
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            {cat.modules.map((mod) => (
                                <motion.div key={mod.title} variants={itemVariants}>
                                    <Link href={mod.href as any} className="block group h-full">
                                        <div className="h-full flex flex-col gap-4 p-6 rounded-[1.75rem] bg-card border border-border/50 hover:border-primary/25 transition-all duration-300 hover:shadow-lg hover:bg-card/80 min-h-[160px]">
                                            <div className="flex items-start justify-between">
                                                <div className={cn("p-2.5 rounded-xl border border-white/5", cat.accent)}>
                                                    <mod.icon className={cn("h-5 w-5", cat.color)} />
                                                </div>
                                                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                                            </div>
                                            <div className="space-y-1.5 mt-auto">
                                                <h3 className="text-[11px] font-black uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
                                                    {mod.title}
                                                </h3>
                                                <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wide leading-relaxed">
                                                    {mod.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Bottom link */}
            <motion.div
                className="mt-14 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
            >
                <Link href="/login" className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-primary hover:text-foreground transition-colors group">
                    Ver todos los portales de acceso <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </Link>
            </motion.div>
        </section>
    );
}
