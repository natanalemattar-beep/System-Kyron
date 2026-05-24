'use client';

import dynamic from 'next/dynamic';
import { Sparkles, ArrowRight, CircleCheck, Shield, Zap, Clock } from "lucide-react";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRef } from 'react';
import { ScrollReveal } from './scroll-reveal';

const CtaForm = dynamic(() => import('./cta-form').then(mod => ({ default: mod.CtaForm })), {
    ssr: false,
    loading: () => (
        <div className="space-y-4 p-6 md:p-10 rounded-2xl shadow-xl animate-pulse min-h-[500px] bg-white/80 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06]" />
    ),
});

const guaranteeConfigs = [
    { icon: Shield, labelKey: 'guarantee_encryption', color: 'text-emerald-400' },
    { icon: Zap, labelKey: 'guarantee_activation', color: 'text-cyan-400' },
    { icon: Clock, labelKey: 'guarantee_support', color: 'text-violet-400' },
];

export function CtaSection() {
    const t = useTranslations('CtaSection');
    const checks = [t('check_1'), t('check_2'), t('check_3')];
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section id="contacto" ref={containerRef} className="relative overflow-hidden scroll-mt-20 bg-white dark:bg-[#030712]">
            <div className="relative py-32 md:py-48">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-[20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-600/[0.05] blur-[160px] animate-mesh-drift" />
                    <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-600/[0.04] blur-[140px] animate-mesh-drift" style={{ animationDelay: '-12s' }} />
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="space-y-8 text-center lg:text-left">
                            <ScrollReveal delay={0.1} y={20}>
                                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/60 mx-auto lg:ml-0">
                                   <Sparkles className="h-3.5 w-3.5 text-cyan-400" /> {t('badge')}
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.2} y={30} blur={15}>
                                    <h2 className="text-[clamp(3rem,6vw,5.5rem)] font-black tracking-tighter leading-[0.9] text-gray-900 dark:text-white uppercase italic">
                                    {t('title_highlight')}<br/>
                                    <span className="text-glow-cyan not-italic">
                                        {t('title_rest')}
                                    </span>
                                </h2>
                            </ScrollReveal>

                            <ScrollReveal delay={0.3} y={15}>
                                <p className="text-lg md:text-xl text-gray-900/30 dark:text-white/30 max-w-md mx-auto lg:ml-0 leading-relaxed font-medium">
                                    {t('subtitle')}
                                </p>
                            </ScrollReveal>

                            <ScrollReveal delay={0.4} className="flex flex-wrap justify-center lg:justify-start gap-5">
                                {checks.map((label, i) => (
                                    <div key={i} className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-3xl">
                                        <CircleCheck className="h-4 w-4 text-emerald-400" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900/60 dark:text-white/60">{label}</span>
                                    </div>
                                ))}
                            </ScrollReveal>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-6">
                                {guaranteeConfigs.map((g, i) => (
                                    <ScrollReveal
                                        key={i}
                                        delay={0.5 + i * 0.1}
                                        y={15}
                                        className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/[0.03] hover:bg-gray-100 dark:hover:bg-white/[0.05] transition-all duration-300"
                                    >
                                        <g.icon className={cn("h-4 w-4", g.color)} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900/40 dark:text-white/40">{t(g.labelKey)}</span>
                                    </ScrollReveal>
                                ))}
                            </div>

                            <ScrollReveal
                                className="relative mt-12 hidden lg:block"
                                delay={0.6}
                                y={40}
                            >
                                <div className="absolute -inset-20 rounded-[4rem] bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-[100px] -z-[1] animate-mesh-drift" />
                                <div className="relative rounded-[3rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl bg-gray-50 dark:bg-white/[0.01] backdrop-blur-3xl p-4">
                                    <div className="relative rounded-[2.5rem] overflow-hidden border border-gray-200 dark:border-white/5">
                                        <Image
                                            src="/images/landing/hero-dashboard-dark.jpg"
                                            alt="Ecosystem Dashboard"
                                            width={1408}
                                            height={768}
                                            quality={90}
                                            className="w-full h-auto opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        <ScrollReveal
                            className="w-full lg:sticky lg:top-32"
                            delay={0.4}
                            x={30}
                            blur={12}
                        >
                            <CtaForm />
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
