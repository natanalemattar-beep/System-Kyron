'use client';

import { BrainCircuit, Lock, Calculator, Users, Smartphone, Recycle, Gavel, BarChart3, Landmark, FileText, ShieldCheck, Sparkles, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const features = [
    {
        icon: Calculator,
        title: "Contabilidad VEN-NIF",
        description: "Libros digitales, RIPF, declaraciones de IVA, ISLR e IGTF automatizadas y selladas con sello SENIAT.",
        color: "text-primary",
        bg: "bg-primary/10",
        border: "border-primary/15",
        glow: "hover:shadow-[0_8px_30px_-12px_theme(colors.primary.DEFAULT)]",
        span: "col-span-1",
    },
    {
        icon: Users,
        title: "RRHH & Nómina",
        description: "Cálculo de nómina con SSO, FAOV, LPH, utilidades, prestaciones y LOPCYMAT. Cumplimiento total LOTTT.",
        color: "text-violet-400",
        bg: "bg-violet-500/10",
        border: "border-violet-500/15",
        glow: "hover:shadow-[0_8px_30px_-12px_theme(colors.violet.400)]",
        span: "col-span-1",
    },
    {
        icon: Smartphone,
        title: "Telecom 5G / eSIM",
        description: "Provisión de líneas físicas y eSIM, gestión de flota corporativa, control de consumo y telemetría en tiempo real.",
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/15",
        glow: "hover:shadow-[0_8px_30px_-12px_theme(colors.blue.400)]",
        span: "col-span-1",
    },
    {
        icon: BrainCircuit,
        title: "Inteligencia Artificial",
        description: "Gemini 2.0 Flash integrado. Generación de contratos, análisis fiscal, pitch IA, clasificación de residuos y más.",
        color: "text-rose-400",
        bg: "bg-rose-500/10",
        border: "border-rose-500/15",
        glow: "hover:shadow-[0_8px_30px_-12px_theme(colors.rose.400)]",
        span: "col-span-1 sm:col-span-2 lg:col-span-1",
        featured: true,
    },
    {
        icon: Gavel,
        title: "IA Legal & Permisos",
        description: "Contratos, poderes notariales, permisos CONATEL, SENIAT y Gaceta Oficial actualizada automáticamente.",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/15",
        glow: "hover:shadow-[0_8px_30px_-12px_theme(colors.amber.400)]",
        span: "col-span-1",
    },
    {
        icon: Recycle,
        title: "Ameru — Eco-Créditos",
        description: "Clasificación de residuos por IA, generación de eco-créditos certificados y mercado de sostenibilidad.",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/15",
        glow: "hover:shadow-[0_8px_30px_-12px_theme(colors.emerald.400)]",
        span: "col-span-1",
    },
    {
        icon: BarChart3,
        title: "Dashboard & Analítica",
        description: "KPIs en tiempo real, análisis de flujo de caja, proyecciones financieras y reportes PDF/PowerPoint.",
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/15",
        glow: "hover:shadow-[0_8px_30px_-12px_theme(colors.cyan.400)]",
        span: "col-span-1",
    },
    {
        icon: Landmark,
        title: "Gestión de Tributos",
        description: "IVA, ISLR, IGTF, parafiscales, municipales, retenciones y calendario fiscal automatizado.",
        color: "text-indigo-400",
        bg: "bg-indigo-500/10",
        border: "border-indigo-500/15",
        glow: "hover:shadow-[0_8px_30px_-12px_theme(colors.indigo.400)]",
        span: "col-span-1",
    },
    {
        icon: Lock,
        title: "Seguridad Avanzada",
        description: "Sellado criptográfico, log de auditoría inmutable y cifrado AES-256 en toda la plataforma corporativa.",
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/15",
        glow: "hover:shadow-[0_8px_30px_-12px_theme(colors.orange.400)]",
        span: "col-span-1",
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

export function FeaturesSection() {
    return (
        <section id="caracteristicas" className="py-16 md:py-32 relative">
            <div className="container mx-auto px-4 md:px-10 max-w-7xl">

                {/* Header */}
                <motion.div
                    className="mb-14 md:mb-20 space-y-5 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-[9px] font-black uppercase tracking-[0.3em] text-secondary mx-auto">
                        <Sparkles className="h-3 w-3" /> Capacidades del Sistema
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground uppercase leading-tight">
                        Todo lo que tu <br className="hidden sm:block" />
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">empresa necesita</span>
                    </h2>
                    <p className="text-muted-foreground/70 max-w-xl mx-auto font-semibold text-sm leading-relaxed">
                        9 módulos integrados bajo un solo ecosistema digital diseñado para el mercado venezolano.
                    </p>
                </motion.div>

                {/* Feature cards */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.05 }}
                >
                    {features.map((f) => (
                        <motion.div
                            key={f.title}
                            variants={itemVariants}
                            className={cn("group relative flex flex-col gap-5 p-6 md:p-7 rounded-[1.75rem] border bg-card/30 backdrop-blur-sm transition-all duration-300", f.border, f.glow, f.span)}
                        >
                            {f.featured && (
                                <div className="absolute top-4 right-4">
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/20 text-[7px] font-black uppercase tracking-widest text-rose-400">
                                        <Sparkles className="h-2 w-2" /> IA Nativa
                                    </span>
                                </div>
                            )}
                            <div className={cn("p-3 rounded-2xl w-fit border border-white/5 group-hover:scale-110 transition-transform shadow-inner", f.bg)}>
                                <f.icon className={cn("h-5 w-5", f.color)} />
                            </div>
                            <div className="space-y-2 flex-1">
                                <h3 className={cn("text-sm font-black uppercase tracking-tight flex items-center gap-2", f.color)}>
                                    {f.title}
                                    <ArrowUpRight className={cn("h-3 w-3 opacity-0 group-hover:opacity-100 -translate-y-0.5 group-hover:translate-y-0 transition-all", f.color)} />
                                </h3>
                                <p className="text-[10px] text-muted-foreground/60 font-semibold leading-relaxed">
                                    {f.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom stats ribbon */}
                <motion.div
                    className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {[
                        { val: "48h", detail: "Tiempo de migración" },
                        { val: "Multi-empresa", detail: "Holdings y condominios" },
                        { val: "Bilingüe", detail: "Español & English" },
                        { val: "Gemini 2.0", detail: "IA de última generación" },
                    ].map((r, i) => (
                        <div key={i} className="flex flex-col items-center text-center gap-1.5 p-5 rounded-2xl bg-white/[0.02] border border-white/8 hover:border-white/15 transition-colors">
                            <p className="text-xs font-black text-foreground/80 uppercase tracking-tight">{r.val}</p>
                            <p className="text-[8px] font-semibold text-muted-foreground/40 uppercase tracking-widest">{r.detail}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
