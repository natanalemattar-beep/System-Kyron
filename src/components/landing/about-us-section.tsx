'use client';

import { Card } from "@/components/ui/card";
import { ShieldCheck, Building2, Users, Zap, Globe, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/use-device-performance';

interface SiteStats {
    totalUsuarios: number;
    totalEmpresas: number;
}

const Counter = ({ from, to, duration = 1500 }: { from: number, to: number, duration?: number }) => {
    const [displayed, setDisplayed] = useState(from);
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        if (started.current || to === 0) return;
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true;
                observer.disconnect();
                const startTime = Date.now();
                const animate = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    setDisplayed(Math.round(to * eased));
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
            }
        }, { threshold: 0.3 });

        observer.observe(el);
        return () => observer.disconnect();
    }, [to, duration]);

    return <span ref={ref}>{displayed}</span>;
};

const fadeUp = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: (i: number) => ({
        opacity: 1, y: 0, filter: 'blur(0px)',
        transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    })
};

export function AboutUsSection() {
    const t = useTranslations('AboutUsSection');
    const { tier } = useDevicePerformance();
    const [stats, setStats] = useState<SiteStats>({
        totalUsuarios: 0,
        totalEmpresas: 0,
    });

    useEffect(() => {
        fetch('/api/stats')
            .then(res => {
                if (!res.ok) throw new Error('stats fetch failed');
                return res.json();
            })
            .then((data: SiteStats) => setStats(data))
            .catch(() => {});
    }, []);

    const statCards = [
        { val: stats.totalUsuarios, label: t('stat_users'), icon: Users, color: "from-cyan-500 to-blue-600", text: "text-cyan-600" },
        { val: stats.totalEmpresas, label: t('stat_companies'), icon: Building2, color: "from-violet-500 to-purple-600", text: "text-violet-600" }
    ];

    const featItems = [
        { label: t('feat_migration'), icon: Zap },
        { label: t('feat_bilingual'), icon: Globe },
        { label: t('feat_multi'), icon: Building2 },
        { label: t('feat_audit'), icon: ShieldCheck },
    ];

    const animate = tier !== 'low';

    return (
        <section id="nosotros" className="relative overflow-hidden">
            <div className="relative py-20 md:py-28">
                <div className="absolute inset-0 -z-10">
                    <Image
                        src="/images/landing/caracas-skyline.webp"
                        alt=""
                        fill
                        quality={85}
                        className="object-cover"
                        loading="lazy"
                        sizes="(max-width: 1280px) 100vw, 1280px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-rose-50/90 via-pink-50/80 to-orange-50/85 dark:from-[hsl(224,28%,9%)] dark:via-[hsl(224,24%,8%)] dark:to-[hsl(224,28%,10%)]" />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-rose-100/20 to-amber-100/30 dark:from-transparent dark:via-transparent dark:to-transparent" />
                </div>

                <div className="container mx-auto px-4 md:px-10 max-w-7xl relative z-10">
                    <motion.div
                        className="text-center space-y-5 mb-16"
                        initial={animate ? "hidden" : undefined}
                        whileInView={animate ? "visible" : undefined}
                        viewport={{ once: true, margin: "-80px" }}
                    >
                        <motion.div variants={animate ? fadeUp : undefined} custom={0}>
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass-subtle text-xs font-semibold uppercase tracking-widest text-foreground/80 mx-auto">
                                <Globe className="h-3.5 w-3.5 text-emerald-400" />
                                {t('badge')}
                            </div>
                        </motion.div>
                        <motion.h2 variants={animate ? fadeUp : undefined} custom={1} className="text-[clamp(1.75rem,5vw,3.75rem)] font-black tracking-tight uppercase leading-[1.05] text-foreground">
                            {t('title_highlight')}{' '}
                            <span className="liquid-glass-text italic">
                                {t('title_rest')}
                            </span>
                        </motion.h2>
                        <motion.p variants={animate ? fadeUp : undefined} custom={2} className="text-base text-muted-foreground max-w-2xl mx-auto font-medium">
                            {t('subtitle')}
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12"
                        initial={animate ? { opacity: 0, y: 25, filter: 'blur(6px)' } : undefined}
                        whileInView={animate ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {statCards.map((stat, i) => (
                            <motion.div
                                key={i}
                                className="hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                                initial={animate ? { opacity: 0, scale: 0.9, filter: 'blur(4px)' } : undefined}
                                whileInView={animate ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : undefined}
                                viewport={{ once: true }}
                                transition={{ delay: 0.25 + i * 0.15, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                            >
                                <Card className="relative overflow-hidden rounded-[2rem] liquid-glass p-8 text-center group cursor-default transition-all duration-300">
                                    <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", stat.color)} />
                                    <div className="absolute top-4 right-4 opacity-[0.06] group-hover:opacity-[0.12] transition-all duration-500">
                                        <stat.icon className="h-16 w-16 text-foreground" />
                                    </div>
                                    <div className="relative">
                                        <p className={cn("text-4xl font-black italic tracking-tight mb-2", stat.text)}>
                                            <Counter from={0} to={stat.val} />
                                        </p>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
                        initial={animate ? { opacity: 0, y: 20, filter: 'blur(4px)' } : undefined}
                        whileInView={animate ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {featItems.map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3 p-4 rounded-2xl liquid-glass-subtle hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300"
                                initial={animate ? { opacity: 0, y: 20, scale: 0.95 } : undefined}
                                whileInView={animate ? { opacity: 1, y: 0, scale: 1 } : undefined}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/15 flex items-center justify-center shrink-0">
                                    <item.icon className="h-4 w-4 text-primary" />
                                </div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-foreground/80">{item.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="mt-10 flex justify-center"
                        initial={animate ? { opacity: 0, y: 20, filter: 'blur(4px)' } : undefined}
                        whileInView={animate ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link href="/register" className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl border border-border/30 bg-muted/30 text-foreground text-xs font-bold uppercase tracking-widest hover:bg-muted/60 hover:border-border/50 transition-all duration-500">
                            {t('join_cta')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
