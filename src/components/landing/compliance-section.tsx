'use client';

import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/use-device-performance';
import { useTranslations } from 'next-intl';
import {
    ShieldCheck, Landmark, Scale, Radio, FileCheck,
    Building2, Fingerprint, Globe, BadgeCheck, Lock,
    Banknote, Wifi
} from "lucide-react";

const regulations = [
    {
        name: "SENIAT",
        full: "Servicio Nacional Integrado de Administración Aduanera y Tributaria",
        icon: Landmark,
        color: "text-blue-600",
        accent: "from-blue-500/20 to-blue-500/5",
        border: "border-blue-500/20",
        badges: ["IVA 16%", "ISLR", "IGTF 3%"],
    },
    {
        name: "BCV",
        full: "Banco Central de Venezuela",
        icon: Banknote,
        color: "text-emerald-600",
        accent: "from-emerald-500/20 to-emerald-500/5",
        border: "border-emerald-500/20",
        badges: ["Tasas BCV", "Divisas"],
    },
    {
        name: "LOTTT",
        full: "Ley Orgánica del Trabajo, Trabajadores y Trabajadoras",
        icon: Scale,
        color: "text-violet-600",
        accent: "from-violet-500/20 to-violet-500/5",
        border: "border-violet-500/20",
        badges: ["Nómina", "Prestaciones", "Utilidades"],
    },
    {
        name: "CONATEL",
        full: "Comisión Nacional de Telecomunicaciones",
        icon: Radio,
        color: "text-cyan-600",
        accent: "from-cyan-500/20 to-cyan-500/5",
        border: "border-cyan-500/20",
        badges: ["Permisos", "Habilitación"],
    },
    {
        name: "VEN-NIF",
        full: "Normas Internacionales de Información Financiera para Venezuela",
        icon: FileCheck,
        color: "text-amber-600",
        accent: "from-amber-500/20 to-amber-500/5",
        border: "border-amber-500/20",
        badges: ["NIIF", "Plan de Cuentas"],
    },
    {
        name: "SUDEBAN",
        full: "Superintendencia de las Instituciones del Sector Bancario",
        icon: Building2,
        color: "text-rose-600",
        accent: "from-rose-500/20 to-rose-500/5",
        border: "border-rose-500/20",
        badges: ["Normativa", "Reportes"],
    },
];

const securityFeatures = [
    { icon: Lock, label: "AES-256", desc: "Cifrado militar" },
    { icon: Fingerprint, label: "2FA", desc: "Autenticación doble" },
    { icon: ShieldCheck, label: "JWT + HTTPS", desc: "Sesiones seguras" },
    { icon: BadgeCheck, label: "Auditoría", desc: "Log inmutable" },
];

export function ComplianceSection() {
    const { tier } = useDevicePerformance();
    const animate = tier !== 'low';
    const t = useTranslations('ComplianceSection');

    return (
        <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-yellow-50/40">
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-300/25 to-transparent" />
                <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-amber-400/[0.08] blur-[120px]" />
                <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-orange-400/[0.06] blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 md:px-10 max-w-7xl relative z-10">
                <motion.div
                    className="text-center mb-16 md:mb-20"
                    initial={animate ? { opacity: 0, y: 20 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass-subtle text-xs font-semibold uppercase tracking-widest text-primary mx-auto mb-6">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {t('badge')}
                    </div>
                    <h2 className="text-[clamp(1.75rem,5vw,3.75rem)] font-black tracking-tight text-foreground uppercase leading-[1.05] mb-4">
                        {t('title_highlight')}{' '}
                        <span className="liquid-glass-text italic">{t('title_rest')}</span>
                    </h2>
                    <p className="text-base text-muted-foreground max-w-2xl mx-auto font-medium">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-16">
                    {regulations.map((reg, idx) => (
                        <motion.div
                            key={reg.name}
                            className={cn(
                                "group relative rounded-[1.5rem] liquid-glass p-6 transition-all duration-500 hover:-translate-y-1",
                                reg.border
                            )}
                            initial={animate ? { opacity: 0, y: 20 } : undefined}
                            whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                        >
                            <div className={cn("absolute inset-0 rounded-[1.5rem] bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-[1]", reg.accent)} />

                            <div className="flex items-start gap-4">
                                <div className={cn("p-3 rounded-xl border bg-gradient-to-br shrink-0", reg.accent, reg.border)}>
                                    <reg.icon className={cn("h-6 w-6", reg.color)} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className={cn("text-lg font-black uppercase tracking-tight mb-1", reg.color)}>
                                        {reg.name}
                                    </h3>
                                    <p className="text-[10px] font-medium text-muted-foreground leading-snug mb-3">
                                        {reg.full}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {reg.badges.map(b => (
                                            <span key={b} className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider liquid-glass-subtle text-muted-foreground">
                                                {b}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="rounded-[2rem] liquid-glass p-8 md:p-10"
                    initial={animate ? { opacity: 0, y: 20 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[9px] font-black uppercase tracking-widest mb-4">
                                <Globe className="h-3 w-3" />
                                {t('security_badge')}
                            </div>
                            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-foreground mb-2">
                                {t('security_title_1')}{' '}
                                <span className="text-emerald-600 italic">{t('security_title_2')}</span>
                            </h3>
                            <p className="text-sm text-muted-foreground font-medium max-w-lg">
                                {t('security_desc')}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 shrink-0">
                            {securityFeatures.map((feat, i) => (
                                <div
                                    key={feat.label}
                                    className="flex items-center gap-3 p-3 rounded-xl liquid-glass-subtle hover:-translate-y-0.5 transition-transform duration-300"
                                >
                                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/15">
                                        <feat.icon className="h-4 w-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-tight text-foreground">{feat.label}</p>
                                        <p className="text-[9px] font-medium text-muted-foreground">{feat.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
