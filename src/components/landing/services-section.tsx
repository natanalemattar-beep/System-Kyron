'use client';

import { ArrowRight, Check, Sparkles, Crown, Zap, Building2, Star, Globe, ShieldCheck, Phone, Calculator, Receipt, Users, Scale, RadioTower, Package, ChevronDown, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/use-device-performance';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { BudgetConfigurator } from './budget-configurator';

const planConfigs = [
    { monthlyPrice: 0, annualPrice: 0, color: 'text-emerald-400', gradient: 'from-emerald-500 to-green-600', border: 'border-emerald-500/15', bg: 'bg-emerald-500/[0.03]', icon: Zap, popular: false },
    { monthlyPrice: 29, annualPrice: 23, color: 'text-sky-400', gradient: 'from-sky-500 to-blue-600', border: 'border-sky-500/20', bg: 'bg-sky-500/[0.03]', icon: Star, popular: false },
    { monthlyPrice: 59, annualPrice: 47, color: 'text-violet-400', gradient: 'from-violet-500 to-purple-600', border: 'border-violet-500/20', bg: 'bg-violet-500/[0.03]', icon: Crown, popular: true },
    { monthlyPrice: 149, annualPrice: 119, color: 'text-amber-400', gradient: 'from-amber-500 to-orange-600', border: 'border-amber-500/15', bg: 'bg-amber-500/[0.03]', icon: Building2, popular: false },
];

const moduleConfigs = [
    { price: 3, color: 'text-cyan-400', gradient: 'from-cyan-500 to-teal-600', icon: Phone },
    { price: 15, color: 'text-pink-400', gradient: 'from-pink-500 to-rose-600', icon: RadioTower },
    { price: 8, color: 'text-blue-400', gradient: 'from-blue-500 to-indigo-600', icon: Calculator },
    { price: 5, color: 'text-amber-400', gradient: 'from-amber-500 to-orange-600', icon: Scale },
    { price: 6, color: 'text-emerald-400', gradient: 'from-emerald-500 to-green-600', icon: Receipt },
    { price: 10, color: 'text-violet-400', gradient: 'from-violet-500 to-purple-600', icon: Users },
];

const statsMeta = [
    { key: 'stat_modules', value: '6', icon: Sparkles, color: 'text-cyan-400', bg: 'from-cyan-500/10 to-blue-500/10' },
    { key: 'stat_encryption', value: '256', icon: ShieldCheck, color: 'text-blue-400', bg: 'from-blue-500/10 to-indigo-500/10' },
    { key: 'stat_compliance', value: '100%', icon: Building2, color: 'text-violet-400', bg: 'from-violet-500/10 to-purple-500/10' },
    { key: 'stat_support', value: '24/7', icon: Zap, color: 'text-amber-400', bg: 'from-amber-500/10 to-orange-500/10' },
];

interface PlanDetail {
    sections: { title: string; items: string[] }[];
}

export function ServicesSection() {
    const t = useTranslations('ServicesSection');
    const { tier } = useDevicePerformance();
    const animate = tier !== 'low';
    const [isAnnual, setIsAnnual] = useState(true);
    const [mode, setMode] = useState<'combo' | 'individual' | 'budget'>('combo');
    const [expandedPlan, setExpandedPlan] = useState<number | null>(null);
    const plansData = t.raw('plans') as { name: string; description: string; features: string[]; cta: string; details?: PlanDetail }[];
    const modulesData = t.raw('individual_modules') as { name: string; description: string; features: string[]; tiers?: { name: string; price: number; highlight: string }[] }[];
    const [expandedModule, setExpandedModule] = useState<number | null>(null);

    const plans = plansData.map((p, i) => ({ ...p, ...planConfigs[i] }));
    const modules = modulesData.map((m, i) => ({ ...m, ...moduleConfigs[i] }));

    return (
        <section id="servicios" className="py-24 md:py-36 relative z-10 overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-indigo-50/80 to-cyan-50/60 dark:from-[#060a14] dark:via-[#080d18] dark:to-[#060a14]">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/15 to-transparent" />
                <div className="absolute -top-20 right-[10%] w-[600px] h-[600px] rounded-full bg-violet-500/[0.03] blur-[150px]" />
                <div className="absolute bottom-0 left-[5%] w-[500px] h-[500px] rounded-full bg-indigo-500/[0.03] blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 md:px-10 max-w-7xl">
                <motion.div
                    className="text-center mb-14 md:mb-18"
                    initial={animate ? { opacity: 0, y: 40 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-violet-500/20 bg-violet-500/[0.06] text-[10px] font-bold uppercase tracking-[0.25em] text-violet-500 dark:text-violet-400 mx-auto mb-6">
                        <Building2 className="h-3.5 w-3.5" />
                        {t('badge')}
                    </div>
                    <h2 className="text-[clamp(1.5rem,4.5vw,3.75rem)] font-bold tracking-tight text-foreground uppercase leading-[1.05] mb-4 break-words">
                        {t('title_highlight')}{' '}
                        <span className="liquid-glass-text italic">
                            {t('title_rest')}
                        </span>
                    </h2>
                    <p className="text-base text-muted-foreground/60 max-w-2xl mx-auto font-medium mb-10">
                        {t('subtitle')}
                    </p>

                    <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm mb-8">
                        <button
                            onClick={() => { setMode('combo'); setExpandedPlan(null); }}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-400",
                                mode === 'combo'
                                    ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/20"
                                    : "text-muted-foreground/50 hover:text-foreground"
                            )}
                        >
                            <Layers className="h-3.5 w-3.5" />
                            {t('tab_combo')}
                        </button>
                        <button
                            onClick={() => { setMode('individual'); setExpandedPlan(null); setExpandedModule(null); }}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-400",
                                mode === 'individual'
                                    ? "bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-lg shadow-cyan-500/20"
                                    : "text-muted-foreground/50 hover:text-foreground"
                            )}
                        >
                            <Package className="h-3.5 w-3.5" />
                            {t('tab_individual')}
                        </button>
                        <button
                            onClick={() => { setMode('budget'); setExpandedPlan(null); }}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-400",
                                mode === 'budget'
                                    ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20"
                                    : "text-muted-foreground/50 hover:text-foreground"
                            )}
                        >
                            <Sparkles className="h-3.5 w-3.5" />
                            {t('tab_budget')}
                        </button>
                    </div>

                    <p className="text-xs text-muted-foreground/40 font-medium max-w-lg mx-auto">
                        {mode === 'combo' ? t('tab_combo_desc') : mode === 'individual' ? t('tab_individual_desc') : t('tab_budget_desc')}
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {mode === 'combo' && (
                        <motion.div
                            key="combo"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="flex justify-center mb-8">
                                <div className="inline-flex items-center gap-3 p-1.5 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                                    <button
                                        onClick={() => setIsAnnual(false)}
                                        className={cn(
                                            "px-5 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300",
                                            !isAnnual
                                                ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg"
                                                : "text-muted-foreground/50 hover:text-foreground"
                                        )}
                                    >
                                        {t('monthly')}
                                    </button>
                                    <button
                                        onClick={() => setIsAnnual(true)}
                                        className={cn(
                                            "px-5 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 relative",
                                            isAnnual
                                                ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg"
                                                : "text-muted-foreground/50 hover:text-foreground"
                                        )}
                                    >
                                        {t('annual')}
                                        <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-emerald-500 text-[7px] font-bold text-white uppercase tracking-wider">
                                            {t('discount')}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
                                {plans.map((plan, i) => {
                                    const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
                                    return (
                                        <motion.div
                                            key={plan.name}
                                            className={cn(
                                                "group relative rounded-2xl border-2 backdrop-blur-sm transition-all duration-700 overflow-hidden",
                                                plan.popular
                                                    ? 'border-violet-500/30 bg-white/[0.04] shadow-[0_8px_40px_-8px_rgba(139,92,246,0.15)]'
                                                    : cn(plan.border, plan.bg, 'hover:-translate-y-2 hover:shadow-xl')
                                            )}
                                            initial={animate ? { opacity: 0, y: 40 } : undefined}
                                            whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            {plan.popular && (
                                                <>
                                                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
                                                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-[8px] font-bold uppercase tracking-[0.2em] text-white shadow-lg">
                                                        {t('most_popular')}
                                                    </div>
                                                </>
                                            )}

                                            <div className="p-8">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className={cn("p-2.5 rounded-xl bg-gradient-to-br shadow-lg", plan.gradient)}>
                                                        <plan.icon className="h-5 w-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <h3 className={cn("text-lg font-black", plan.color)}>{plan.name}</h3>
                                                        <p className="text-[11px] text-white/55 font-medium">{plan.description}</p>
                                                    </div>
                                                </div>

                                                <div className="mb-6">
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-4xl font-black text-foreground">
                                                            {price === 0 ? t('free_label') : `$${price}`}
                                                        </span>
                                                        {price > 0 && (
                                                            <span className="text-sm text-muted-foreground/40 font-medium">{t('per_month')}</span>
                                                        )}
                                                    </div>
                                                    {price === 0 && (
                                                        <p className="text-[10px] font-bold text-emerald-500/70 mt-1">
                                                            {t('free_forever')}
                                                        </p>
                                                    )}
                                                    {isAnnual && plan.annualPrice > 0 && (
                                                        <p className="text-[10px] font-bold text-muted-foreground/30 mt-1">
                                                            {t('billed_annually')} · ${plan.annualPrice * 12}{t('per_year')}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="space-y-3 mb-6">
                                                    {plan.features.map((feature, j) => (
                                                        <div key={j} className="flex items-center gap-2.5">
                                                            <Check className={cn("h-3.5 w-3.5 shrink-0", plan.color)} />
                                                            <span className="text-xs text-foreground/70 font-medium">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {plan.details && (
                                                    <>
                                                        <button
                                                            onClick={() => setExpandedPlan(expandedPlan === i ? null : i)}
                                                            className={cn(
                                                                "flex items-center justify-center gap-1.5 w-full py-2 mb-4 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 border",
                                                                expandedPlan === i
                                                                    ? cn('border-white/10 bg-white/[0.04]', plan.color)
                                                                    : 'border-white/[0.06] text-muted-foreground/40 hover:text-muted-foreground/60 hover:border-white/10'
                                                            )}
                                                        >
                                                            <ChevronDown className={cn("h-3 w-3 transition-transform duration-300", expandedPlan === i && "rotate-180")} />
                                                            {expandedPlan === i ? t('hide_details') : t('show_details')}
                                                        </button>
                                                        <AnimatePresence>
                                                            {expandedPlan === i && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                                                    className="overflow-hidden mb-4"
                                                                >
                                                                    <div className="space-y-4 pt-2 border-t border-white/[0.06]">
                                                                        {plan.details.sections.map((section, si) => (
                                                                            <div key={si}>
                                                                                <p className={cn("text-[10px] font-bold uppercase tracking-wider mb-1.5", plan.color)}>{section.title}</p>
                                                                                <div className="space-y-1.5 pl-1">
                                                                                    {section.items.map((item, ii) => (
                                                                                        <div key={ii} className="flex items-start gap-2">
                                                                                            <Check className={cn("h-2.5 w-2.5 shrink-0 mt-0.5", plan.color, "opacity-60")} />
                                                                                            <span className="text-[10px] text-foreground/40 font-medium leading-tight">{item}</span>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </>
                                                )}

                                                <Link
                                                    href="/register"
                                                    className={cn(
                                                        "group/btn flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all duration-500",
                                                        plan.popular
                                                            ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-[0_4px_20px_-4px_rgba(139,92,246,0.4)] hover:shadow-[0_8px_32px_-4px_rgba(139,92,246,0.5)] hover:scale-[1.02]'
                                                            : cn('border-2', plan.border, 'text-foreground/70 hover:bg-white/[0.04] hover:text-foreground hover:scale-[1.02]')
                                                    )}
                                                >
                                                    {plan.cta} <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                    {mode === 'individual' && (
                        <motion.div
                            key="individual"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                                {modules.map((mod, i) => (
                                    <motion.div
                                        key={mod.name}
                                        className="group relative rounded-2xl border-2 border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-6 text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                                        initial={animate ? { opacity: 0, y: 30 } : undefined}
                                        whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                                        viewport={{ once: true, margin: "-30px" }}
                                        transition={{ duration: 0.6, delay: i * 0.08 }}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={cn("p-2.5 rounded-xl bg-gradient-to-br shadow-lg", mod.gradient)}>
                                                <mod.icon className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <h4 className={cn("text-base font-bold", mod.color)}>{mod.name}</h4>
                                                <p className="text-[11px] text-white/55 font-medium">{mod.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-baseline gap-1 mb-4">
                                            <span className="text-[10px] text-muted-foreground/50 font-medium mr-0.5">{t('price_from')}</span>
                                            <span className="text-3xl font-black text-foreground">${mod.price}</span>
                                            <span className="text-[10px] text-muted-foreground/40 font-medium">{t('per_month')}</span>
                                        </div>

                                        {mod.tiers && (
                                            <>
                                                <button
                                                    onClick={() => setExpandedModule(expandedModule === i ? null : i)}
                                                    className={cn(
                                                        "flex items-center justify-center gap-1.5 w-full py-2 mb-3 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 border",
                                                        expandedModule === i
                                                            ? cn('border-white/10 bg-white/[0.04]', mod.color)
                                                            : 'border-white/[0.06] text-muted-foreground/40 hover:text-muted-foreground/60 hover:border-white/10'
                                                    )}
                                                >
                                                    <ChevronDown className={cn("h-3 w-3 transition-transform duration-300", expandedModule === i && "rotate-180")} />
                                                    {expandedModule === i ? t('hide_details') : t('see_all_plans')}
                                                </button>
                                                <AnimatePresence>
                                                    {expandedModule === i && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                                            className="overflow-hidden mb-3"
                                                        >
                                                            <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                                                                {mod.tiers.map((tier, ti) => (
                                                                    <div
                                                                        key={ti}
                                                                        className={cn(
                                                                            "flex items-center justify-between p-2.5 rounded-lg border transition-all",
                                                                            ti === 0 ? cn('border-white/[0.06] bg-white/[0.02]') : 'border-white/[0.04] hover:border-white/[0.08]'
                                                                        )}
                                                                    >
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className={cn("text-[11px] font-bold", mod.color)}>{tier.name}</p>
                                                                            <p className="text-[10px] text-white/55 font-medium truncate">{tier.highlight}</p>
                                                                        </div>
                                                                        <div className="text-right shrink-0 ml-3">
                                                                            <span className="text-base font-black text-foreground">${tier.price}</span>
                                                                            <span className="text-[8px] text-muted-foreground/40 font-medium">/mes</span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </>
                                        )}

                                        <Link
                                            href="/register"
                                            className={cn(
                                                "group/btn flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all duration-500 border-2 border-white/[0.08] text-foreground/70 hover:bg-white/[0.04] hover:text-foreground hover:scale-[1.02]"
                                            )}
                                        >
                                            {t('select_module')} <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    {mode === 'budget' && (
                        <motion.div
                            key="budget"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <BudgetConfigurator />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    className="container mx-auto px-4 md:px-10 max-w-7xl mt-24 md:mt-32"
                    initial={animate ? { opacity: 0, y: 30 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold uppercase tracking-widest text-primary mx-auto mb-5">
                            <Globe className="h-3.5 w-3.5" />
                            {t('platform_badge')}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase text-foreground mb-3">
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
                                className="group liquid-glass rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-[1]", stat.bg)} />
                                <div className="relative p-3 sm:p-5 flex flex-col items-center text-center gap-2">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-xl liquid-glass-subtle group-hover:scale-110 transition-transform duration-300">
                                        <stat.icon className={cn("h-[18px] w-[18px]", stat.color)} />
                                    </div>
                                    <div className={cn("text-lg sm:text-2xl font-bold tracking-tight", stat.color)}>
                                        {stat.value}
                                    </div>
                                    <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-foreground/60 leading-tight">
                                        {t(stat.key)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex justify-center">
                        <Link href="/register" className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-2xl kyron-gradient-bg text-white text-xs font-bold uppercase tracking-widest shadow-kyron hover:shadow-[0_12px_40px_-8px_rgba(14,165,233,0.3)] transition-all duration-500">
                            {t('start_now')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
