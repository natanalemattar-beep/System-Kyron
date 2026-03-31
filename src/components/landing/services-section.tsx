'use client';

import { Receipt, ArrowRight, Lock, Sparkles, Zap, ShieldCheck, BarChart3, Globe, FileCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/use-device-performance';

const featuresMeta = [
    { image: "/images/landing/devices-mockup.webp", icon: Receipt, color: "from-primary to-blue-600" },
    { image: "/images/landing/security-shield.webp", icon: Lock, color: "from-emerald-500 to-cyan-600" },
    { image: "/images/landing/ai-brain.webp", icon: Sparkles, color: "from-violet-500 to-purple-600" },
];

const statsMeta = [
    { value: "7+", icon: BarChart3, color: "text-primary", bg: "from-primary/15 to-primary/5", key: "stat_modules" },
    { value: "AES-256", icon: ShieldCheck, color: "text-cyan-400", bg: "from-cyan-500/15 to-cyan-500/5", key: "stat_encryption" },
    { value: "VEN-NIF", icon: FileCheck, color: "text-violet-400", bg: "from-violet-500/15 to-violet-500/5", key: "stat_compliance" },
    { value: "24/7", icon: Sparkles, color: "text-amber-400", bg: "from-amber-500/15 to-amber-500/5", key: "stat_support" },
];

export function ServicesSection() {
    const t = useTranslations('ServicesSection');
    const features = t.raw('features') as Array<{ title: string; subtitle: string; description: string; badges: string[] }>;
    const { tier } = useDevicePerformance();
    const animate = tier !== 'low';

    return (
        <section id="servicios" className="relative z-10 overflow-hidden">
            <div className="py-20 md:py-28">
                <motion.div
                    className="container mx-auto px-4 md:px-10 max-w-7xl mb-16 md:mb-20 text-center"
                    initial={animate ? { opacity: 0, y: 20 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass-subtle text-xs font-semibold uppercase tracking-widest text-primary mx-auto mb-6">
                        <Zap className="h-3.5 w-3.5" />
                        {t('badge')}
                    </div>
                    <h2 className="text-[clamp(1.75rem,5vw,3.75rem)] font-black tracking-tight text-foreground uppercase leading-[1.05] mb-4">
                        {t('title_highlight')}{' '}
                        <span className="kyron-gradient-text italic">
                            {t('title_rest')}
                        </span>
                    </h2>
                    <p className="text-base text-muted-foreground max-w-2xl mx-auto font-medium">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="space-y-20 md:space-y-28">
                    {features.map((feat, idx) => {
                        const meta = featuresMeta[idx];
                        return (
                            <motion.div
                                key={idx}
                                className="container mx-auto px-4 md:px-10 max-w-7xl"
                                initial={animate ? { opacity: 0, y: 30 } : undefined}
                                whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className={cn(
                                    "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center",
                                    idx % 2 === 1 && "lg:flex-row-reverse"
                                )}>
                                    <div className={cn("space-y-6", idx % 2 === 1 && "lg:order-2")}>
                                        <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-white border border-white/10", `bg-gradient-to-r ${meta.color}`)}>
                                            <meta.icon className="h-3.5 w-3.5" />
                                            {feat.subtitle}
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase text-foreground leading-[1.1]">
                                            {feat.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed max-w-lg">
                                            {feat.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {feat.badges.map((b) => (
                                                <span key={b} className="px-3 py-1.5 rounded-full liquid-glass-subtle text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                    {b}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={cn("relative", idx % 2 === 1 && "lg:order-1")}>
                                        <div className={cn("absolute -inset-4 rounded-[2rem] blur-xl opacity-20", `bg-gradient-to-br ${meta.color}`)} />
                                        <div className="relative rounded-[1.5rem] overflow-hidden border border-border/20 shadow-2xl bg-card/30 hover:-translate-y-1 transition-transform duration-300">
                                            <Image
                                                src={meta.image}
                                                alt={feat.title}
                                                width={idx === 0 ? 800 : 600}
                                                height={idx === 0 ? 450 : 600}
                                                quality={85}
                                                className="w-full h-auto"
                                                loading="lazy"
                                                sizes="(max-width: 1024px) 100vw, 50vw"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    className="container mx-auto px-4 md:px-10 max-w-7xl mt-24 md:mt-32"
                    initial={animate ? { opacity: 0, y: 20 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold uppercase tracking-widest text-primary mx-auto mb-5">
                            <Globe className="h-3.5 w-3.5" />
                            {t('platform_badge')}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-foreground mb-3">
                            {t('platform_title')} <span className="kyron-gradient-text italic">{t('platform_highlight')}</span>
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-xl mx-auto font-medium">
                            {t('platform_subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        {statsMeta.map((stat) => (
                            <div
                                key={stat.key}
                                className="group liquid-glass rounded-2xl transition-all duration-500 hover:-translate-y-1"
                            >
                                <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-[1]", stat.bg)} />
                                <div className="relative p-3 sm:p-5 flex flex-col items-center text-center gap-2">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-xl liquid-glass-subtle group-hover:scale-110 transition-transform duration-300">
                                        <stat.icon className={cn("h-4.5 w-4.5", stat.color)} />
                                    </div>
                                    <div className={cn("text-lg sm:text-2xl font-black tracking-tight", stat.color)}>
                                        {stat.value}
                                    </div>
                                    <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground/70 leading-tight">
                                        {t(stat.key)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex justify-center">
                        <Link href="/register" className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl kyron-gradient-bg text-white text-xs font-bold uppercase tracking-widest shadow-kyron hover:shadow-[0_12px_40px_-8px_rgba(14,165,233,0.3)] transition-all duration-500">
                            {t('start_now')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
