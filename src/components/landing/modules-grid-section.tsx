'use client';

import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/use-device-performance';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import {
    Calculator, Users, Gavel, Receipt, Smartphone,
    BrainCircuit, ChartColumn, Landmark, Lock, ArrowRight,
    Briefcase, FileText, Shield, Globe, Zap,
    Building2, Wallet, Scale, BadgeCheck,
    Wrench, GraduationCap, HeartPulse, Car, CreditCard, Sparkles,
    ChevronRight, Search, ChevronDown, ChevronUp
} from 'lucide-react';
import { Link } from '@/navigation';

const categoryKeys = ['all', 'finance', 'hr', 'legal', 'ops', 'tech'] as const;
const categoryIcons: Record<string, any> = {
    all: Sparkles,
    finance: Calculator,
    hr: Users,
    legal: Gavel,
    ops: Briefcase,
    tech: BrainCircuit,
};

const moduleConfigs = [
    { icon: Calculator, category: 'finance', color: 'text-blue-400', gradient: 'from-blue-500 to-blue-700', accent: 'from-blue-500/15', border: 'border-blue-500/15', featured: true },
    { icon: Receipt, category: 'finance', color: 'text-cyan-400', gradient: 'from-cyan-500 to-cyan-700', accent: 'from-cyan-500/15', border: 'border-cyan-500/15' },
    { icon: Wallet, category: 'finance', color: 'text-emerald-400', gradient: 'from-emerald-500 to-emerald-700', accent: 'from-emerald-500/15', border: 'border-emerald-500/15' },
    { icon: Landmark, category: 'finance', color: 'text-indigo-400', gradient: 'from-indigo-500 to-indigo-700', accent: 'from-indigo-500/15', border: 'border-indigo-500/15', requiresOnline: true },
    { icon: ChartColumn, category: 'finance', color: 'text-violet-400', gradient: 'from-violet-500 to-violet-700', accent: 'from-violet-500/15', border: 'border-violet-500/15', requiresOnline: true },
    { icon: CreditCard, category: 'hr', color: 'text-green-400', gradient: 'from-green-500 to-green-700', accent: 'from-green-500/15', border: 'border-green-500/15' },
    { icon: Users, category: 'hr', color: 'text-teal-400', gradient: 'from-teal-500 to-teal-700', accent: 'from-teal-500/15', border: 'border-teal-500/15' },
    { icon: GraduationCap, category: 'hr', color: 'text-sky-400', gradient: 'from-sky-500 to-sky-700', accent: 'from-sky-500/15', border: 'border-sky-500/15' },
    { icon: HeartPulse, category: 'hr', color: 'text-pink-400', gradient: 'from-pink-500 to-pink-700', accent: 'from-pink-500/15', border: 'border-pink-500/15' },
    { icon: GraduationCap, category: 'hr', color: 'text-purple-400', gradient: 'from-purple-500 to-purple-700', accent: 'from-purple-500/15', border: 'border-purple-500/15' },
    { icon: FileText, category: 'legal', color: 'text-amber-400', gradient: 'from-amber-500 to-amber-700', accent: 'from-amber-500/15', border: 'border-amber-500/15' },
    { icon: Scale, category: 'legal', color: 'text-orange-400', gradient: 'from-orange-500 to-orange-700', accent: 'from-orange-500/15', border: 'border-orange-500/15' },
    { icon: Gavel, category: 'legal', color: 'text-red-400', gradient: 'from-red-500 to-red-700', accent: 'from-red-500/15', border: 'border-red-500/15' },
    { icon: BadgeCheck, category: 'legal', color: 'text-rose-400', gradient: 'from-rose-500 to-rose-700', accent: 'from-rose-500/15', border: 'border-rose-500/15' },
    { icon: Briefcase, category: 'ops', color: 'text-lime-400', gradient: 'from-lime-500 to-lime-700', accent: 'from-lime-500/15', border: 'border-lime-500/15' },
    { icon: Building2, category: 'ops', color: 'text-slate-400', gradient: 'from-slate-500 to-slate-700', accent: 'from-slate-500/15', border: 'border-slate-500/15' },
    { icon: Globe, category: 'ops', color: 'text-fuchsia-400', gradient: 'from-fuchsia-500 to-fuchsia-700', accent: 'from-fuchsia-500/15', border: 'border-fuchsia-500/15', requiresOnline: true },
    { icon: Car, category: 'ops', color: 'text-yellow-400', gradient: 'from-yellow-500 to-yellow-700', accent: 'from-yellow-500/15', border: 'border-yellow-500/15' },
    { icon: Smartphone, category: 'tech', color: 'text-cyan-400', gradient: 'from-cyan-500 to-cyan-700', accent: 'from-cyan-500/15', border: 'border-cyan-500/15' },
    { icon: Wrench, category: 'tech', color: 'text-gray-400', gradient: 'from-gray-500 to-gray-700', accent: 'from-gray-500/15', border: 'border-gray-500/15' },
    { icon: BrainCircuit, category: 'tech', color: 'text-violet-400', gradient: 'from-violet-500 to-violet-700', accent: 'from-violet-500/15', border: 'border-violet-500/15', featured: true },
    { icon: Lock, category: 'tech', color: 'text-emerald-400', gradient: 'from-emerald-500 to-emerald-700', accent: 'from-emerald-500/15', border: 'border-emerald-500/15', requiresOnline: true },
    { icon: Zap, category: 'tech', color: 'text-amber-400', gradient: 'from-amber-500 to-amber-700', accent: 'from-amber-500/15', border: 'border-amber-500/15', requiresOnline: true },
    { icon: Shield, category: 'tech', color: 'text-blue-400', gradient: 'from-blue-500 to-blue-700', accent: 'from-blue-500/15', border: 'border-blue-500/15', requiresOnline: true },
];

export function ModulesGridSection() {
    const { tier } = useDevicePerformance();
    const animate = tier !== 'low';
    const [activeCategory, setActiveCategory] = useState('all');
    const [expandedModule, setExpandedModule] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAll, setShowAll] = useState(false);
    const MOBILE_LIMIT = 8;
    const isOffline = false; // Implementación futura para modo offline
    const t = useTranslations('ModulesGridSection');

    const moduleData = t.raw('modules') as { name: string; desc: string }[];
    const categories = t.raw('categories') as Record<string, string>;

    const modules = moduleConfigs.map((config, i) => ({
        ...config,
        name: moduleData[i]?.name ?? '',
        desc: moduleData[i]?.desc ?? '',
    }));

    const allFiltered = modules
        .filter(m => activeCategory === 'all' || m.category === activeCategory)
        .filter(m => !searchQuery || m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.desc.toLowerCase().includes(searchQuery.toLowerCase()));

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const shouldLimit = isMobile && !showAll && !searchQuery && activeCategory === 'all';
    const filteredModules = shouldLimit ? allFiltered.slice(0, MOBILE_LIMIT) : allFiltered;
    const hasMore = isMobile && !searchQuery && activeCategory === 'all' && allFiltered.length > MOBILE_LIMIT;

    return (
        <section className="py-24 md:py-36 relative overflow-hidden bg-gradient-to-br from-purple-50/40 via-indigo-50/30 to-blue-50/40 dark:from-[#060a14] dark:via-[#080d18] dark:to-[#060a14]">
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/15 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/15 to-transparent" />
                <div className="absolute top-[30%] left-[10%] w-[500px] h-[500px] rounded-full bg-purple-500/[0.03] blur-[150px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-indigo-500/[0.03] blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 md:px-10 max-w-7xl relative z-10">
                <motion.div
                    className="text-center mb-14 md:mb-18"
                    initial={animate ? { opacity: 0, y: 40 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-violet-500/20 bg-violet-500/[0.06] text-[10px] font-bold uppercase tracking-[0.25em] text-violet-500 dark:text-violet-400 mx-auto mb-6">
                        <Briefcase className="h-3.5 w-3.5" />
                        {t('badge')}
                    </div>
                    <h2 className="text-[clamp(1.5rem,4.5vw,3.75rem)] font-bold tracking-tight text-foreground uppercase leading-[1.05] mb-4 break-words">
                        {t('title_main')}{' '}
                        <span className="liquid-glass-text italic">{t('title_highlight')}</span>
                    </h2>
                    <p className="text-base text-muted-foreground/60 max-w-2xl mx-auto font-medium">
                        {t('subtitle', { count: modules.length })}
                    </p>
                </motion.div>

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
                    initial={animate ? { opacity: 0, y: 20 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-wrap justify-center gap-2">
                        {categoryKeys.map((key) => {
                            const CatIcon = categoryIcons[key] || Sparkles;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setActiveCategory(key)}
                                    className={cn(
                                        "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 border",
                                        activeCategory === key
                                            ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white border-transparent shadow-[0_4px_16px_-4px_rgba(14,165,233,0.4)]"
                                            : "border-white/[0.08] bg-white/[0.02] text-muted-foreground/60 hover:text-foreground hover:border-white/[0.15] hover:bg-white/[0.04]"
                                    )}
                                >
                                    <CatIcon className="h-3 w-3" />
                                    {categories[key]}
                                </button>
                            );
                        })}
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40" />
                        <input
                            type="text"
                            placeholder={t('search_placeholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2.5 rounded-xl text-xs font-medium bg-white/[0.03] border border-white/[0.08] text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-cyan-500/30 transition-colors w-48"
                        />
                    </div>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredModules.map((mod, i) => (
                            <motion.div
                                key={mod.name}
                                className={cn(
                                    "group relative rounded-2xl border backdrop-blur-sm transition-all duration-500 overflow-hidden",
                                    mod.border,
                                    expandedModule === mod.name ? 'bg-white/[0.05] shadow-xl' : 'bg-white/[0.02] hover:-translate-y-2 hover:shadow-lg',
                                    'cursor-pointer'
                                )}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: i * 0.03, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                layout
                                onClick={() => {
                                    if (isOffline && mod.requiresOnline) return;
                                    setExpandedModule(expandedModule === mod.name ? null : mod.name);
                                }}
                            >
                                <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-[1]", mod.accent)} />
                                


                                <div className="p-5">
                                    <div className="flex items-start gap-3">
                                        <div className={cn("p-2.5 rounded-xl bg-gradient-to-br shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300", mod.gradient)}>
                                            {mod.icon && <mod.icon className="h-4 w-4 text-white" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={cn("text-[11px] font-bold uppercase tracking-wide leading-tight", mod.color)}>
                                                {mod.name}
                                            </p>
                                            <p className="text-[10px] text-muted-foreground/40 mt-1 leading-snug">
                                                {mod.desc}
                                            </p>
                                        </div>
                                        {mod.featured && !(isOffline && mod.requiresOnline) && (
                                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[7px] font-bold uppercase tracking-[0.15em] text-cyan-400 shrink-0">
                                                <Sparkles className="h-1.5 w-1.5" /> Pro
                                            </span>
                                        )}
                                    </div>

                                    {expandedModule === mod.name && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-4 pt-4 border-t border-white/[0.06]"
                                        >
                                            <Link
                                                href="/guia-registro"
                                                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-400 hover:text-cyan-300 transition-colors"
                                            >
                                                {t('explore_module')} <ChevronRight className="h-3 w-3" />
                                            </Link>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {hasMore && (
                    <div className="mt-6 flex justify-center md:hidden">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.15em] border border-white/[0.08] bg-white/[0.03] text-muted-foreground/60 hover:text-foreground hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300"
                        >
                            {showAll ? t('show_less') : t('show_more', { remaining: allFiltered.length - MOBILE_LIMIT })}
                            {showAll ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                        </button>
                    </div>
                )}

                <motion.div
                    className="mt-14 flex flex-col items-center gap-4"
                    initial={animate ? { opacity: 0, y: 15 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/30">
                        <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            {t('modules_included', { count: modules.length })}
                        </span>
                        <span className="text-white/10">·</span>
                        <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                            {t('no_extra_costs')}
                        </span>
                    </div>
                    <Link href="/guia-registro" className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-2xl kyron-gradient-bg text-white text-xs font-bold uppercase tracking-widest shadow-kyron hover:shadow-[0_12px_40px_-8px_rgba(14,165,233,0.3)] hover:scale-[1.02] transition-all duration-500">
                        {t('cta')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
