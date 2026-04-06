'use client';

import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/use-device-performance';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
    ShieldCheck, Landmark, Scale, Radio, FileCheck,
    Building2, Fingerprint, Globe, BadgeCheck, Lock,
    Banknote, Wifi, CheckCircle2
} from "lucide-react";

const regulationKeys = ["seniat", "bcv", "lottt", "conatel", "ven_nif", "sudeban"] as const;

const regulationStyles = {
    seniat:  { name: "SENIAT",  icon: Landmark,  color: "text-blue-600",    accent: "from-blue-500/20 to-blue-500/5",    border: "border-blue-500/20" },
    bcv:     { name: "BCV",     icon: Banknote,  color: "text-emerald-600", accent: "from-emerald-500/20 to-emerald-500/5", border: "border-emerald-500/20" },
    lottt:   { name: "LOTTT",   icon: Scale,     color: "text-violet-600",  accent: "from-violet-500/20 to-violet-500/5",  border: "border-violet-500/20" },
    conatel: { name: "CONATEL", icon: Radio,     color: "text-cyan-600",    accent: "from-cyan-500/20 to-cyan-500/5",    border: "border-cyan-500/20" },
    ven_nif: { name: "VEN-NIF", icon: FileCheck, color: "text-amber-600",   accent: "from-amber-500/20 to-amber-500/5",   border: "border-amber-500/20" },
    sudeban: { name: "SUDEBAN", icon: Building2, color: "text-rose-600",    accent: "from-rose-500/20 to-rose-500/5",    border: "border-rose-500/20" },
};

const securityKeys = ["aes256", "twofa", "jwt", "audit"] as const;
const securityIcons = { aes256: Lock, twofa: Fingerprint, jwt: ShieldCheck, audit: BadgeCheck };

export function ComplianceSection() {
    const { tier } = useDevicePerformance();
    const animate = tier !== 'low';
    const t = useTranslations('ComplianceSection');
    const [securityScore, setSecurityScore] = useState<number | null>(null);
    const [activeFeatures, setActiveFeatures] = useState<number>(0);

    useEffect(() => {
        fetch('/api/security-status')
            .then(r => r.json())
            .then(data => {
                setSecurityScore(data.securityScore ?? null);
                setActiveFeatures(data.activeFeatures ?? 0);
            })
            .catch(() => {});
    }, []);

    return (
        <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-yellow-50/40 dark:from-[hsl(224,28%,9%)] dark:via-[hsl(224,24%,8%)] dark:to-[hsl(224,28%,10%)]">
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-300/30 dark:via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-300/25 dark:via-transparent to-transparent" />
                <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-amber-400/[0.08] dark:bg-amber-500/[0.03] blur-[120px]" />
                <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-orange-400/[0.06] dark:bg-orange-500/[0.03] blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 md:px-10 max-w-7xl relative z-10">
                <motion.div
                    className="text-center mb-16 md:mb-20"
                    initial={animate ? { opacity: 0, y: 30 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass-subtle text-xs font-semibold uppercase tracking-widest text-primary mx-auto mb-6">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {t('badge')}
                    </div>
                    <h2 className="text-[clamp(1.5rem,4.5vw,3.75rem)] font-bold tracking-tight text-foreground uppercase leading-[1.05] mb-4 break-words">
                        {t('title_highlight')}{' '}
                        <span className="liquid-glass-text italic">{t('title_rest')}</span>
                    </h2>
                    <p className="text-base text-muted-foreground max-w-2xl mx-auto font-medium">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-16">
                    {regulationKeys.map((key, idx) => {
                        const reg = regulationStyles[key];
                        const badges = (t.raw(`regulations.${key}.badges`) as string[]);
                        return (
                        <motion.div
                            key={reg.name}
                            className={cn(
                                "group relative rounded-[1.5rem] liquid-glass p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl",
                                reg.border
                            )}
                            initial={animate ? { opacity: 0, y: 30, scale: 0.95 } : undefined}
                            whileInView={animate ? { opacity: 1, y: 0, scale: 1 } : undefined}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className={cn("absolute inset-0 rounded-[1.5rem] bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-[1]", reg.accent)} />

                            <div className="flex items-start gap-4">
                                <div className={cn("p-3 rounded-xl border bg-gradient-to-br shrink-0", reg.accent, reg.border)}>
                                    <reg.icon className={cn("h-6 w-6", reg.color)} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className={cn("text-lg font-semibold uppercase tracking-tight mb-1", reg.color)}>
                                        {reg.name}
                                    </h3>
                                    <p className="text-[10px] font-medium text-muted-foreground leading-snug mb-3">
                                        {t(`regulations.${key}.full`)}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {badges.map((b: string) => (
                                            <span key={b} className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider liquid-glass-subtle text-muted-foreground">
                                                {b}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                    })}
                </div>

                <motion.div
                    className="rounded-xl liquid-glass p-5 sm:p-8 md:p-10"
                    initial={animate ? { opacity: 0, y: 30, scale: 0.97 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0, scale: 1 } : undefined}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="hidden md:block shrink-0">
                            <motion.div
                                className="relative w-32 h-32 lg:w-40 lg:h-40"
                                initial={animate ? { opacity: 0, scale: 0.8, rotate: -10 } : undefined}
                                whileInView={animate ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 blur-2xl" />
                                <Image
                                    src="/images/landing/security-shield.webp"
                                    alt=""
                                    width={1024}
                                    height={1024}
                                    quality={85}
                                    className="relative w-full h-full object-contain drop-shadow-lg"
                                    loading="lazy"
                                />
                            </motion.div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[11px] font-semibold uppercase tracking-widest">
                                    <Globe className="h-3 w-3" />
                                    {t('security_badge')}
                                </div>
                                {securityScore !== null && (
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                                        <CheckCircle2 className="h-3 w-3" />
                                        {activeFeatures} protecciones activas
                                    </div>
                                )}
                            </div>
                            <h3 className="text-xl md:text-2xl font-semibold uppercase tracking-tight text-foreground mb-2">
                                {t('security_title_1')}{' '}
                                <span className="text-emerald-600 italic">{t('security_title_2')}</span>
                            </h3>
                            <p className="text-sm text-muted-foreground font-medium max-w-lg">
                                {t('security_desc')}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 shrink-0">
                            {securityKeys.map((key) => {
                                const Icon = securityIcons[key];
                                return (
                                <div
                                    key={key}
                                    className="flex items-center gap-3 p-3 rounded-xl liquid-glass-subtle hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/15">
                                        <Icon className="h-4 w-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-tight text-foreground">{t(`security.${key}.label`)}</p>
                                        <p className="text-[11px] font-medium text-muted-foreground">{t(`security.${key}.desc`)}</p>
                                    </div>
                                </div>
                            );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
