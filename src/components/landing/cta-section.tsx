'use client';

import dynamic from 'next/dynamic';
import { Sparkles, ArrowRight, CheckCircle2, Shield, Zap, Clock } from "lucide-react";
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
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
        <section id="contacto" ref={containerRef} className="relative overflow-hidden scroll-mt-20">
            <div className="relative py-24 md:py-36">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/60 via-teal-50/40 to-cyan-50/60 dark:from-[#060a14] dark:via-[#080d18] dark:to-[#060a14]" />
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.04] blur-[150px]" />
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.03] blur-[120px]" />
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
                                <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-[-0.04em] leading-[0.95] text-white uppercase overflow-visible break-words" lang="es">
                                    {t('title_highlight')}{' '}
                                    <span className="block text-glow-cyan">
                                        {t('title_rest')}
                                    </span>
                                </h2>
                            </ScrollReveal>

                            <ScrollReveal delay={0.3} y={15}>
                                <p className="text-lg md:text-xl text-white/30 max-w-md mx-auto lg:ml-0 leading-relaxed font-medium">
                                    {t('subtitle')}
                                </p>
                            </ScrollReveal>

                            <ScrollReveal delay={0.4} className="flex flex-wrap justify-center lg:justify-start gap-4">
                                {checks.map((label, i) => (
                                    <div key={i} className="flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-100">{label}</span>
                                    </div>
                                ))}
                            </ScrollReveal>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-6">
                                {guaranteeConfigs.map((g, i) => (
                                    <ScrollReveal
                                        key={i}
                                        delay={0.5 + i * 0.1}
                                        y={15}
                                        className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-300"
                                    >
                                        <g.icon className={cn("h-4 w-4", g.color)} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{t(g.labelKey)}</span>
                                    </ScrollReveal>
                                ))}
                            </div>

                            <ScrollReveal
                                className="relative mt-12 hidden lg:block"
                                delay={0.6}
                                y={40}
                            >
                                <div className="absolute -inset-10 rounded-[3rem] bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 blur-[60px] -z-[1] animate-mesh-drift" />
                                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] bg-white/[0.02] backdrop-blur-md transition-transform duration-700 hover:scale-[1.02]">
                                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                                    <Image
                                        src="/images/landing/devices-mockup.webp"
                                        alt=""
                                        width={1408}
                                        height={768}
                                        quality={90}
                                        className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity"
                                        loading="lazy"
                                        sizes="(max-width: 1024px) 0px, 45vw"
                                    />
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
