'use client';

import dynamic from 'next/dynamic';
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/use-device-performance';
import Image from 'next/image';

const CtaForm = dynamic(() => import('./cta-form').then(mod => ({ default: mod.CtaForm })), {
    ssr: false,
    loading: () => (
        <div className="space-y-4 p-6 md:p-10 rounded-[2.5rem] md:rounded-2xl shadow-xl animate-pulse min-h-[500px] bg-card/50 border border-border/20" />
    ),
});

export function CtaSection() {
    const t = useTranslations('CtaSection');
    const checks = [t('check_1'), t('check_2'), t('check_3')];
    const { tier } = useDevicePerformance();
    const animate = tier !== 'low';

    return (
        <section id="contacto" className="relative overflow-hidden">
            <div className="relative py-20 md:py-28">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/60 via-teal-50/40 to-cyan-50/60 dark:from-[hsl(224,28%,9%)] dark:via-[hsl(224,24%,8%)] dark:to-[hsl(224,28%,10%)]" />
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-300/35 dark:via-transparent to-transparent" />
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-400/[0.10] dark:bg-emerald-500/[0.04] blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-400/[0.08] dark:bg-cyan-500/[0.03] blur-[100px]" />
                    <div className="absolute top-[50%] right-[10%] w-[300px] h-[300px] rounded-full bg-teal-400/[0.06] dark:bg-teal-500/[0.03] blur-[80px]" />
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            className="space-y-7 text-center lg:text-left"
                            initial={animate ? { opacity: 0, x: -40 } : undefined}
                            whileInView={animate ? { opacity: 1, x: 0 } : undefined}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass-subtle text-[10px] font-semibold uppercase tracking-[0.35em] text-foreground/80 mx-auto lg:ml-0">
                               <Sparkles className="h-3.5 w-3.5 text-cyan-400" /> {t('badge')}
                            </div>
                            <h2 className="text-[clamp(1.75rem,5vw,3.75rem)] font-bold tracking-tight leading-[1.05] text-foreground uppercase">
                                {t('title_highlight')}{' '}
                                <span className="liquid-glass-text italic">
                                    {t('title_rest')}
                                </span>?
                            </h2>
                            <p className="text-base text-muted-foreground max-w-md mx-auto lg:ml-0 leading-relaxed font-medium">
                                {t('subtitle')}
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                {checks.map((label, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
                                    </div>
                                ))}
                            </div>

                            <motion.div
                                className="relative mt-8 hidden lg:block"
                                initial={animate ? { opacity: 0, y: 20 } : undefined}
                                whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 blur-xl -z-[1]" />
                                <div className="relative rounded-2xl overflow-hidden border border-border/20 shadow-xl bg-card/40 backdrop-blur-sm">
                                    <Image
                                        src="/images/landing/devices-mockup.webp"
                                        alt=""
                                        width={1408}
                                        height={768}
                                        quality={85}
                                        className="w-full h-auto"
                                        loading="lazy"
                                        sizes="(max-width: 1024px) 0px, 45vw"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="w-full"
                            initial={animate ? { opacity: 0, x: 40, scale: 0.95 } : undefined}
                            whileInView={animate ? { opacity: 1, x: 0, scale: 1 } : undefined}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <CtaForm />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
