'use client';

import dynamic from 'next/dynamic';
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslations } from 'next-intl';

const CtaForm = dynamic(() => import('./cta-form').then(mod => ({ default: mod.CtaForm })), {
    ssr: false,
    loading: () => (
        <div className="space-y-4 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-xl animate-pulse min-h-[500px] bg-card/50 border border-border/20" />
    ),
});

export function CtaSection() {
    const t = useTranslations('CtaSection');
    const checks = [t('check_1'), t('check_2'), t('check_3')];

    return (
        <section id="contacto" className="relative overflow-hidden">
            <div className="relative py-20 md:py-28">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-[#dde8f8] to-[#dde8f8] dark:via-[#020a18] dark:to-[#0a1628]" />
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/[0.14] dark:bg-primary/[0.12] blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.12] dark:bg-cyan-500/[0.10] blur-[100px]" />
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="space-y-7 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass-subtle text-[10px] font-black uppercase tracking-[0.35em] text-foreground/80 dark:text-white/80 mx-auto lg:ml-0">
                               <Sparkles className="h-3.5 w-3.5 text-cyan-400" /> {t('badge')}
                            </div>
                            <h2 className="text-[clamp(1.75rem,5vw,3.75rem)] font-black tracking-tight leading-[1.05] text-foreground uppercase">
                                {t('title_highlight')}{' '}
                                <span className="bg-gradient-to-r from-cyan-400 via-primary to-emerald-400 bg-clip-text text-transparent italic">
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
                        </div>

                        <div className="w-full">
                            <CtaForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
