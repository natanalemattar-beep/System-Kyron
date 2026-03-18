'use client';

import { BrainCircuit, Lock, Calculator, Users, Smartphone, Recycle, Gavel, BarChart3, Landmark, FileText, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const features = [
    {
        icon: Calculator,
        title: "Contabilidad VEN-NIF",
        description: "Libros digitales, ajuste por inflación (RIPF), declaraciones de IVA, ISLR e IGTF automatizadas y selladas.",
        color: "text-primary",
        bg: "bg-primary/10",
        border: "hover:border-primary/30",
    },
    {
        icon: Users,
        title: "RRHH & Nómina",
        description: "Gestión de empleados, cálculo de nómina con SSO, FAOV, LPH, utilidades, prestaciones y LOPCYMAT.",
        color: "text-secondary",
        bg: "bg-secondary/10",
        border: "hover:border-secondary/30",
    },
    {
        icon: Smartphone,
        title: "Telecom 5G / eSIM",
        description: "Provisión de líneas físicas y eSIM, gestión de flota corporativa, control de consumo y telemetría en tiempo real.",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "hover:border-blue-400/30",
    },
    {
        icon: Gavel,
        title: "IA Legal & Permisos",
        description: "Generación automática de contratos, poderes notariales, permisos CONATEL, SENIAT y Gaceta Oficial actualizada.",
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        border: "hover:border-amber-400/30",
    },
    {
        icon: Recycle,
        title: "Ameru — Eco-Créditos",
        description: "Clasificación de residuos por IA, generación de eco-créditos certificados y acceso al mercado de sostenibilidad.",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "hover:border-emerald-400/30",
    },
    {
        icon: BarChart3,
        title: "Dashboard & Analítica",
        description: "KPIs en tiempo real, análisis de flujo de caja, proyecciones financieras y reportes en PDF y PowerPoint.",
        color: "text-rose-400",
        bg: "bg-rose-400/10",
        border: "hover:border-rose-400/30",
    },
    {
        icon: Landmark,
        title: "Gestión de Tributos",
        description: "Centro tributario completo: IVA, ISLR, IGTF, parafiscales, municipales, retenciones y calendario fiscal.",
        color: "text-violet-400",
        bg: "bg-violet-400/10",
        border: "hover:border-violet-400/30",
    },
    {
        icon: FileText,
        title: "Facturación SENIAT",
        description: "Facturas de venta y compra con tasa BCV automática, número de control, notas de débito/crédito y NCF.",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        border: "hover:border-cyan-400/30",
    },
    {
        icon: Lock,
        title: "Registro Seguro",
        description: "Sellado criptográfico de expedientes, log de auditoría inmutable y cifrado AES-256 en toda la plataforma.",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
        border: "hover:border-orange-400/30",
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } }
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
                    className="mb-12 md:mb-20 space-y-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-[9px] font-black uppercase tracking-[0.3em] text-secondary mx-auto">
                        <ShieldCheck className="h-3 w-3" /> Capacidades del Sistema
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground uppercase italic italic-shadow leading-tight">
                        Todo lo que tu <br className="hidden sm:block" /><span className="text-primary not-italic">empresa necesita</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs md:text-sm italic">
                        9 módulos integrados bajo un solo ecosistema digital diseñado para el mercado venezolano.
                    </p>
                </motion.div>

                {/* 9-card grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {features.map((f) => (
                        <motion.div
                            key={f.title}
                            variants={itemVariants}
                            className={cn(
                                "group flex flex-col gap-5 p-7 md:p-8 rounded-[2rem] bg-card border border-border/50 transition-all duration-300 hover:shadow-xl",
                                f.border
                            )}
                        >
                            <div className={cn("p-3.5 rounded-2xl w-fit border border-white/5 group-hover:scale-105 transition-transform shadow-inner", f.bg)}>
                                <f.icon className={cn("h-6 w-6", f.color)} />
                            </div>
                            <div className="space-y-2">
                                <h3 className={cn("text-sm font-black uppercase tracking-tight transition-colors group-hover:text-foreground", f.color)}>
                                    {f.title}
                                </h3>
                                <p className="text-[10px] md:text-xs text-muted-foreground font-bold uppercase tracking-wide leading-relaxed">
                                    {f.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom ribbon */}
                <motion.div
                    className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {[
                        { val: "Migración", detail: "en menos de 48h" },
                        { val: "Multi-empresa", detail: "holdigs y condominios" },
                        { val: "Bilingüe", detail: "Español & English" },
                        { val: "IA nativa", detail: "Gemini 1.5 Pro integrado" },
                    ].map((r, i) => (
                        <div key={i} className="flex flex-col items-center text-center gap-1 p-5 rounded-2xl bg-muted/20 border border-border/30">
                            <p className="text-xs font-black text-foreground uppercase tracking-tight">{r.val}</p>
                            <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">{r.detail}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
