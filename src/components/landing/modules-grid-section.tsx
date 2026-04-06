'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/use-device-performance';
import { useState } from 'react';
import {
    Calculator, Users, Gavel, Receipt, Smartphone,
    BrainCircuit, BarChart3, Landmark, Lock, ArrowRight,
    Briefcase, FileText, Shield, Globe, Zap,
    Building2, Wallet, Scale, BadgeCheck,
    Wrench, GraduationCap, HeartPulse, Car, CreditCard, Sparkles
} from 'lucide-react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

const categoryKeys = ['all', 'finance', 'hr', 'legal', 'ops', 'tech'] as const;
const categoryIcons = [Sparkles, Calculator, Users, Gavel, Briefcase, BrainCircuit];

const modulesMeta = [
    { icon: Calculator, category: 'finance', color: 'text-blue-600 dark:text-blue-400', accent: 'from-blue-500/15', featured: true },
    { icon: Receipt, category: 'finance', color: 'text-cyan-600 dark:text-cyan-400', accent: 'from-cyan-500/15' },
    { icon: Wallet, category: 'finance', color: 'text-emerald-600 dark:text-emerald-400', accent: 'from-emerald-500/15' },
    { icon: Landmark, category: 'finance', color: 'text-indigo-600 dark:text-indigo-400', accent: 'from-indigo-500/15' },
    { icon: BarChart3, category: 'finance', color: 'text-violet-600 dark:text-violet-400', accent: 'from-violet-500/15' },
    { icon: CreditCard, category: 'hr', color: 'text-green-600 dark:text-green-400', accent: 'from-green-500/15' },
    { icon: Users, category: 'hr', color: 'text-teal-600 dark:text-teal-400', accent: 'from-teal-500/15' },
    { icon: GraduationCap, category: 'hr', color: 'text-sky-600 dark:text-sky-400', accent: 'from-sky-500/15' },
    { icon: HeartPulse, category: 'hr', color: 'text-pink-600 dark:text-pink-400', accent: 'from-pink-500/15' },
    { icon: GraduationCap, category: 'hr', color: 'text-purple-600 dark:text-purple-400', accent: 'from-purple-500/15' },
    { icon: FileText, category: 'legal', color: 'text-amber-600 dark:text-amber-400', accent: 'from-amber-500/15' },
    { icon: Scale, category: 'legal', color: 'text-orange-600 dark:text-orange-400', accent: 'from-orange-500/15' },
    { icon: Gavel, category: 'legal', color: 'text-red-600 dark:text-red-400', accent: 'from-red-500/15' },
    { icon: BadgeCheck, category: 'legal', color: 'text-rose-600 dark:text-rose-400', accent: 'from-rose-500/15' },
    { icon: Briefcase, category: 'ops', color: 'text-lime-600 dark:text-lime-400', accent: 'from-lime-500/15' },
    { icon: Building2, category: 'ops', color: 'text-slate-600 dark:text-slate-400', accent: 'from-slate-500/15' },
    { icon: Globe, category: 'ops', color: 'text-fuchsia-600 dark:text-fuchsia-400', accent: 'from-fuchsia-500/15' },
    { icon: Car, category: 'ops', color: 'text-yellow-600 dark:text-yellow-400', accent: 'from-yellow-500/15' },
    { icon: Smartphone, category: 'tech', color: 'text-cyan-600 dark:text-cyan-400', accent: 'from-cyan-500/15' },
    { icon: Wrench, category: 'tech', color: 'text-gray-600 dark:text-gray-400', accent: 'from-gray-500/15' },
    { icon: BrainCircuit, category: 'tech', color: 'text-violet-600 dark:text-violet-400', accent: 'from-violet-500/15', featured: true },
    { icon: Lock, category: 'tech', color: 'text-emerald-600 dark:text-emerald-400', accent: 'from-emerald-500/15' },
    { icon: Zap, category: 'tech', color: 'text-amber-600 dark:text-amber-400', accent: 'from-amber-500/15' },
    { icon: Shield, category: 'tech', color: 'text-blue-600 dark:text-blue-400', accent: 'from-blue-500/15' },
];

export function ModulesGridSection() {
    const { tier } = useDevicePerformance();
    const animate = tier !== 'low';
    const [activeCategory, setActiveCategory] = useState('all');
    const t = useTranslations('ModulesGridSection');
    const moduleNames = t.raw('modules') as string[];
    const categories = t.raw('categories') as Record<string, string>;

    const modules = modulesMeta.map((m, i) => ({ ...m, name: moduleNames[i] ?? '' }));

    const filteredModules = activeCategory === 'all'
        ? modules
        : modules.filter(m => m.category === activeCategory);

    return (
        <section className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-purple-50/40 via-indigo-50/30 to-blue-50/40 dark:from-[hsl(224,28%,10%)] dark:via-[hsl(224,24%,9%)] dark:to-[hsl(224,28%,10%)]">
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-300/25 dark:via-purple-500/10 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-300/25 dark:via-indigo-500/10 to-transparent" />
                <div className="absolute top-[30%] left-[10%] w-[450px] h-[450px] rounded-full bg-purple-400/[0.05] dark:bg-purple-500/[0.02] blur-[120px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-indigo-400/[0.05] dark:bg-indigo-500/[0.02] blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 md:px-10 max-w-7xl relative z-10">
                <motion.div
                    className="text-center mb-12 md:mb-16"
                    initial={animate ? { opacity: 0, y: 30 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass-subtle text-[11px] font-semibold uppercase tracking-widest text-primary mx-auto mb-6">
                        <Briefcase className="h-3.5 w-3.5" />
                        {t('badge')}
                    </div>
                    <h2 className="text-[clamp(1.75rem,5vw,3.75rem)] font-bold tracking-tight text-foreground uppercase leading-[1.05] mb-4">
                        {t('title_main')}{' '}
                        <span className="liquid-glass-text italic">{t('title_highlight')}</span>
                    </h2>
                    <p className="text-base text-muted-foreground max-w-2xl mx-auto font-medium">
                        {t('subtitle_template', { count: modules.length })}
                    </p>
                </motion.div>

                <motion.div
                    className="flex flex-wrap justify-center gap-2 mb-10"
                    initial={animate ? { opacity: 0, y: 15 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {categoryKeys.map((key, idx) => {
                        const Icon = categoryIcons[idx];
                        return (
                            <button
                                key={key}
                                onClick={() => setActiveCategory(key)}
                                className={cn(
                                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
                                    activeCategory === key
                                        ? "kyron-gradient-bg text-white shadow-kyron"
                                        : "liquid-glass-subtle text-muted-foreground hover:text-foreground hover:border-primary/20"
                                )}
                            >
                                <Icon className="h-3 w-3" />
                                {categories[key]}
                            </button>
                        );
                    })}
                </motion.div>

                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
                    layout
                >
                    {filteredModules.map((mod, i) => (
                        <motion.div
                            key={mod.name}
                            className="group relative p-4 rounded-xl liquid-glass text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg cursor-default"
                            initial={animate ? { opacity: 0, scale: 0.9 } : undefined}
                            whileInView={animate ? { opacity: 1, scale: 1 } : undefined}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.03, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            layout
                        >
                            <div className={cn("absolute inset-0 rounded-xl bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-[1]", mod.accent)} />
                            <div className={cn("mx-auto mb-2.5 p-2.5 rounded-xl w-fit bg-gradient-to-br to-transparent group-hover:scale-110 transition-transform duration-300", mod.accent)}>
                                <mod.icon className={cn("h-5 w-5", mod.color)} />
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/80 leading-tight">
                                {mod.name}
                            </p>
                            {mod.featured && (
                                <span className="absolute top-1.5 right-1.5 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[6px] font-bold uppercase tracking-widest text-primary">
                                    <Sparkles className="h-1.5 w-1.5" /> Pro
                                </span>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="mt-12 flex flex-col items-center gap-3"
                    initial={animate ? { opacity: 0, y: 10 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            {t('modules_included', { count: modules.length })}
                        </span>
                        <span className="text-border">·</span>
                        <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {t('no_extra_costs')}
                        </span>
                    </div>
                    <Link href="/register" className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-2xl kyron-gradient-bg text-white text-xs font-bold uppercase tracking-widest shadow-kyron hover:shadow-[0_12px_40px_-8px_rgba(14,165,233,0.3)] hover:scale-[1.02] transition-all duration-500">
                        {t('cta')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
