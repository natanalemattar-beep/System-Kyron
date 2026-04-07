'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/use-device-performance';
import { BrainCircuit, MessageSquare, FileSearch, BarChart3, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const capabilityConfigs = [
    { icon: MessageSquare, engine: 'Claude AI', color: 'text-violet-400', gradient: 'from-violet-500 to-purple-700', border: 'border-violet-500/20' },
    { icon: FileSearch, engine: 'GPT + Gemini + Claude', color: 'text-cyan-400', gradient: 'from-cyan-500 to-blue-700', border: 'border-cyan-500/20' },
    { icon: BarChart3, engine: 'OpenAI', color: 'text-emerald-400', gradient: 'from-emerald-500 to-green-700', border: 'border-emerald-500/20' },
];

const aiEngines = [
    { name: 'Claude', company: 'Anthropic', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    { name: 'GPT-4', company: 'OpenAI', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { name: 'Gemini', company: 'Google', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
];

export function HowItWorksSection() {
    const { tier } = useDevicePerformance();
    const animate = tier !== 'low';
    const [activeCapability, setActiveCapability] = useState(0);
    const t = useTranslations('HowItWorksSection');
    const capabilities = t.raw('capabilities') as { title: string; description: string; demo_user?: string; demo_system?: string; demo_ai: string }[];

    const buildDemo = (cap: typeof capabilities[number]) => {
        const msgs: { role: string; text: string }[] = [];
        if (cap.demo_user) msgs.push({ role: 'user', text: cap.demo_user });
        if (cap.demo_system) msgs.push({ role: 'system', text: cap.demo_system });
        msgs.push({ role: 'ai', text: cap.demo_ai });
        return msgs;
    };

    return (
        <section className="py-24 md:py-36 relative overflow-hidden bg-gradient-to-br from-slate-50/80 via-gray-50/60 to-slate-50/80 dark:from-[#060a14] dark:via-[#080d18] dark:to-[#060a14]">
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />
                <div className="absolute top-[20%] left-[5%] w-[500px] h-[500px] rounded-full bg-violet-500/[0.03] blur-[150px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-cyan-500/[0.03] blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 md:px-10 max-w-7xl relative z-10">
                <motion.div
                    className="text-center mb-16 md:mb-20"
                    initial={animate ? { opacity: 0, y: 40 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-violet-500/20 bg-violet-500/[0.06] text-[10px] font-bold uppercase tracking-[0.25em] text-violet-500 dark:text-violet-400 mx-auto mb-6">
                        <BrainCircuit className="h-3.5 w-3.5" />
                        {t('badge')}
                    </div>
                    <h2 className="text-[clamp(1.5rem,4.5vw,3.75rem)] font-bold tracking-tight text-foreground uppercase leading-[1.05] mb-4 break-words">
                        {t('title_highlight')}{' '}
                        <span className="liquid-glass-text italic">{t('title_rest')}</span>
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <motion.div
                    className="flex flex-wrap justify-center gap-4 mb-14"
                    initial={animate ? { opacity: 0, y: 20 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {aiEngines.map((engine, i) => (
                        <motion.div
                            key={engine.name}
                            className={cn("flex items-center gap-3 px-5 py-3 rounded-2xl border", engine.border, engine.bg)}
                            initial={animate ? { opacity: 0, scale: 0.9 } : undefined}
                            whileInView={animate ? { opacity: 1, scale: 1 } : undefined}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                        >
                            <Sparkles className={cn("h-4 w-4", engine.color)} />
                            <div>
                                <p className={cn("text-xs font-bold", engine.color)}>{engine.name}</p>
                                <p className="text-[9px] text-muted-foreground/40 font-medium">{engine.company}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 space-y-3">
                        {capabilities.map((cap, i) => {
                            const config = capabilityConfigs[i];
                            return (
                                <motion.button
                                    key={i}
                                    className={cn(
                                        "w-full text-left p-5 rounded-2xl border transition-all duration-500",
                                        activeCapability === i
                                            ? cn('bg-white/80 dark:bg-white/[0.05] shadow-xl', config.border)
                                            : 'border-gray-200 dark:border-white/[0.04] bg-white/60 dark:bg-white/[0.01] hover:bg-white/80 dark:hover:bg-white/[0.03] hover:border-gray-300 dark:hover:border-white/[0.08]'
                                    )}
                                    onClick={() => setActiveCapability(i)}
                                    initial={animate ? { opacity: 0, x: -20 } : undefined}
                                    whileInView={animate ? { opacity: 1, x: 0 } : undefined}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.6 }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn("p-2.5 rounded-xl bg-gradient-to-br shadow-lg", config.gradient)}>
                                            <config.icon className="h-4 w-4 text-white" />
                                        </div>
                                        <div>
                                            <h3 className={cn("text-sm font-bold", activeCapability === i ? config.color : 'text-foreground/70')}>
                                                {cap.title}
                                            </h3>
                                            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground/30">
                                                {config.engine}
                                            </p>
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    <motion.div
                        className="lg:col-span-8"
                        initial={animate ? { opacity: 0, x: 30 } : undefined}
                        whileInView={animate ? { opacity: 1, x: 0 } : undefined}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className={cn(
                            "rounded-2xl border p-8 backdrop-blur-sm min-h-[320px]",
                            capabilityConfigs[activeCapability].border,
                            'bg-white/80 dark:bg-white/[0.02]'
                        )}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={cn("p-2 rounded-lg bg-gradient-to-br", capabilityConfigs[activeCapability].gradient)}>
                                    {(() => { const Icon = capabilityConfigs[activeCapability].icon; return <Icon className="h-4 w-4 text-white" />; })()}
                                </div>
                                <div>
                                    <h3 className={cn("text-base font-bold", capabilityConfigs[activeCapability].color)}>
                                        {capabilities[activeCapability].title}
                                    </h3>
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-8">
                                {capabilities[activeCapability].description}
                            </p>

                            <div className="space-y-4">
                                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-muted-foreground/30 mb-4">
                                    {t('demo_label')}
                                </p>
                                {buildDemo(capabilities[activeCapability]).map((msg, j) => (
                                    <motion.div
                                        key={`${activeCapability}-${j}`}
                                        className={cn(
                                            "p-4 rounded-xl max-w-[90%]",
                                            msg.role === 'user'
                                                ? 'ml-auto bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/15'
                                                : msg.role === 'system'
                                                    ? 'mx-auto text-center bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06]'
                                                    : 'bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06]'
                                        )}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: j * 0.3, duration: 0.5 }}
                                    >
                                        {msg.role === 'ai' && (
                                            <div className="flex items-center gap-1.5 mb-2">
                                                <Sparkles className={cn("h-3 w-3", capabilityConfigs[activeCapability].color)} />
                                                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground/30">
                                                    {capabilityConfigs[activeCapability].engine}
                                                </span>
                                            </div>
                                        )}
                                        <p className="text-xs text-foreground/80 dark:text-foreground/60 font-medium leading-relaxed">
                                            {msg.text}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="mt-14 flex justify-center"
                    initial={animate ? { opacity: 0, y: 15 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <Link href="/prueba-gratuita" className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-2xl kyron-gradient-bg text-white text-xs font-bold uppercase tracking-widest shadow-kyron hover:shadow-[0_12px_40px_-8px_rgba(14,165,233,0.3)] hover:scale-[1.02] transition-all duration-500">
                        {t('cta')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
