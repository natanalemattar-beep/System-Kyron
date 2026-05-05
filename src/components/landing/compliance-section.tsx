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
    Banknote, CircleCheck, ArrowRight
} from "lucide-react";

const regulationKeys = ["seniat", "bcv", "lottt", "conatel", "ven_nif", "sudeban"] as const;

const regulationStyles = {
    seniat:  { name: "SENIAT",  icon: Landmark,  color: "text-blue-400",    gradient: "from-blue-500 to-blue-700",    accent: "from-blue-500/15 to-blue-500/5",    border: "border-blue-500/15" },
    bcv:     { name: "BCV",     icon: Banknote,  color: "text-emerald-400", gradient: "from-emerald-500 to-emerald-700", accent: "from-emerald-500/15 to-emerald-500/5", border: "border-emerald-500/15" },
    lottt:   { name: "LOTTT",   icon: Scale,     color: "text-violet-400",  gradient: "from-violet-500 to-violet-700",  accent: "from-violet-500/15 to-violet-500/5",  border: "border-violet-500/15" },
    conatel: { name: "CONATEL", icon: Radio,     color: "text-cyan-400",    gradient: "from-cyan-500 to-cyan-700",    accent: "from-cyan-500/15 to-cyan-500/5",    border: "border-cyan-500/15" },
    ven_nif: { name: "VEN-NIF", icon: FileCheck, color: "text-amber-400",   gradient: "from-amber-500 to-amber-700",   accent: "from-amber-500/15 to-amber-500/5",   border: "border-amber-500/15" },
    sudeban: { name: "SUDEBAN", icon: Building2, color: "text-rose-400",    gradient: "from-rose-500 to-rose-700",    accent: "from-rose-500/15 to-rose-500/5",    border: "border-rose-500/15" },
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
        <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-yellow-50/40 dark:from-[#060a14] dark:via-[#080d18] dark:to-[#060a14]">
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/15 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/15 to-transparent" />
                <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-amber-500/[0.03] blur-[150px]" />
                <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-emerald-500/[0.03] blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 md:px-10 max-w-7xl relative z-10">
                <motion.div
                    className="text-center mb-16 md:mb-20"
                    initial={animate ? { opacity: 0, y: 40 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-500 dark:text-emerald-400 mx-auto mb-6">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {t('badge')}
                    </div>
                    <h2 className="text-[clamp(1.5rem,4.5vw,3.75rem)] font-bold tracking-tight text-foreground uppercase leading-[1.05] mb-4 break-words">
                        {t('title_highlight')}{' '}
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">{t('title_rest')}</span>
                    </h2>
                    <p className="text-base text-muted-foreground/60 max-w-2xl mx-auto font-medium">
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
                                "group relative rounded-2xl border-2 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-xl overflow-hidden",
                                reg.border,
                                'bg-white/[0.02]'
                            )}
                            initial={animate ? { opacity: 0, y: 35, scale: 0.95 } : undefined}
                            whileInView={animate ? { opacity: 1, y: 0, scale: 1 } : undefined}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-[1]", reg.accent)} />

                            <div className="flex items-start gap-4">
                                <div className={cn("p-3 rounded-xl bg-gradient-to-br shadow-lg shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500", reg.gradient)}>
                                    <reg.icon className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className={cn("text-lg font-black uppercase tracking-tight mb-1", reg.color)}>
                                        {reg.name}
                                    </h3>
                                    <p className="text-[10px] font-medium text-muted-foreground/40 leading-snug mb-3">
                                        {t(`regulations.${key}.full`)}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {badges.map((b: string) => (
                                            <span key={b} className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[0.1em] border border-white/[0.06] bg-white/[0.02] text-muted-foreground/40">
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
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="hidden md:block shrink-0">
                            <motion.div
                                className="relative w-32 h-32 lg:w-40 lg:h-40"
                                initial={animate ? { opacity: 0, scale: 0.8, rotate: -10 } : undefined}
                                whileInView={animate ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                                    <Globe className="h-3 w-3" />
                                    {t('security_badge')}
                                </div>
                                {securityScore !== null && (
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.15em]">
                                        <CircleCheck className="h-3 w-3" />
                                        {activeFeatures} protecciones activas
                                    </div>
                                )}
                            </div>
                            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-foreground mb-2">
                                {t('security_title_1')}{' '}
                                <span className="text-emerald-400">{t('security_title_2')}</span>
                            </h3>
                            <p className="text-sm text-muted-foreground/50 font-medium max-w-lg">
                                {t('security_desc')}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 shrink-0">
                            {securityKeys.map((key) => {
                                const Icon = securityIcons[key];
                                return (
                                <div
                                    key={key}
                                    className="flex items-center gap-3 p-3 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03] hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-green-700 shadow-lg">
                                        <Icon className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-tight text-foreground">{t(`security.${key}.label`)}</p>
                                        <p className="text-[10px] font-medium text-muted-foreground/40">{t(`security.${key}.desc`)}</p>
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
