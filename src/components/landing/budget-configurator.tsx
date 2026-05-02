'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import {
    Sparkles, Phone, RadioTower, Calculator, Scale, Receipt, Users,
    ArrowRight, Check, TrendingDown, Loader2, ChartColumn
} from 'lucide-react';

const MODULE_DEFS = [
    { key: 'mi_linea_personal', icon: Phone, color: 'text-cyan-400', gradient: 'from-cyan-500 to-teal-600', border: 'border-cyan-500/20' },
    { key: 'mi_linea_juridica', icon: RadioTower, color: 'text-pink-400', gradient: 'from-pink-500 to-rose-600', border: 'border-pink-500/20' },
    { key: 'asesoria_contable', icon: Calculator, color: 'text-blue-400', gradient: 'from-blue-500 to-indigo-600', border: 'border-blue-500/20' },
    { key: 'asesoria_legal', icon: Scale, color: 'text-amber-400', gradient: 'from-amber-500 to-orange-600', border: 'border-amber-500/20' },
    { key: 'facturacion', icon: Receipt, color: 'text-emerald-400', gradient: 'from-emerald-500 to-green-600', border: 'border-emerald-500/20' },
    { key: 'socios_directivos', icon: Users, color: 'text-violet-400', gradient: 'from-violet-500 to-purple-600', border: 'border-violet-500/20' },
];

const EMPLOYEE_MARKS = [1, 5, 10, 25, 50, 100];
const BUDGET_OPTIONS = ['low', 'medium', 'high'] as const;

interface BudgetResult {
    recommendations: { module: string; plan: string; price: number; reason: string }[];
    individualTotal: number;
    comboRecommendation: { name: string; price: number; savings: number } | null;
    summary: string;
    selectedCount: number;
}

export function BudgetConfigurator() {
    const t = useTranslations('BudgetConfigurator');
    const [employees, setEmployees] = useState(5);
    const [modules, setModules] = useState<Record<string, boolean>>({
        mi_linea_personal: false,
        mi_linea_juridica: false,
        asesoria_contable: true,
        asesoria_legal: false,
        facturacion: true,
        socios_directivos: false,
    });
    const [budget, setBudget] = useState<'low' | 'medium' | 'high'>('medium');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<BudgetResult | null>(null);

    const selectedCount = Object.values(modules).filter(Boolean).length;

    const toggleModule = (key: string) => {
        setModules(prev => ({ ...prev, [key]: !prev[key] }));
        setResult(null);
    };

    const generateBudget = async () => {
        if (selectedCount === 0) return;
        setLoading(true);
        try {
            const locale = document.documentElement.lang || 'es';
            const res = await fetch('/api/budget', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ employees, modules, budget, locale }),
            });
            const data = await res.json();
            setResult(data);
        } catch {
            setResult(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border-2 border-white/[0.08] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
                <div className="p-6 md:p-8 space-y-8">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/60 mb-4">
                            {t('employees_label')}
                        </label>
                        <div className="space-y-3">
                            <input
                                type="range"
                                min={1}
                                max={100}
                                value={employees}
                                onChange={(e) => { setEmployees(Number(e.target.value)); setResult(null); }}
                                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/[0.06] accent-violet-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-br [&::-webkit-slider-thumb]:from-violet-500 [&::-webkit-slider-thumb]:to-purple-600 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-grab"
                            />
                            <div className="flex justify-between">
                                {EMPLOYEE_MARKS.map(mark => (
                                    <button
                                        key={mark}
                                        onClick={() => { setEmployees(mark); setResult(null); }}
                                        className={cn(
                                            "text-[10px] font-bold px-2 py-1 rounded-md transition-all",
                                            employees === mark
                                                ? "text-violet-400 bg-violet-500/10"
                                                : "text-muted-foreground/30 hover:text-muted-foreground/50"
                                        )}
                                    >
                                        {mark}
                                    </button>
                                ))}
                            </div>
                            <div className="text-center">
                                <span className="text-3xl font-black text-foreground">{employees}</span>
                                <span className="text-sm text-muted-foreground/40 ml-2 font-medium">{t('employees_unit')}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/60 mb-4">
                            {t('modules_label')}
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {MODULE_DEFS.map(mod => {
                                const active = modules[mod.key];
                                return (
                                    <button
                                        key={mod.key}
                                        onClick={() => toggleModule(mod.key)}
                                        className={cn(
                                            "flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all duration-300 text-left",
                                            active
                                                ? cn(mod.border, 'bg-white/[0.04] shadow-md')
                                                : 'border-white/[0.06] hover:border-white/[0.12] opacity-50 hover:opacity-70'
                                        )}
                                    >
                                        <div className={cn(
                                            "p-2 rounded-lg bg-gradient-to-br shadow-md transition-all",
                                            active ? mod.gradient : 'from-gray-500/20 to-gray-600/20'
                                        )}>
                                            <mod.icon className={cn("h-4 w-4", active ? 'text-white' : 'text-muted-foreground/40')} />
                                        </div>
                                        <span className={cn(
                                            "text-xs font-bold transition-colors",
                                            active ? mod.color : 'text-muted-foreground/40'
                                        )}>
                                            {t(`module_${mod.key}`)}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                        <p className="text-[10px] text-muted-foreground/30 mt-2 text-center font-medium">
                            {selectedCount} {t('modules_selected')}
                        </p>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/60 mb-4">
                            {t('budget_label')}
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {BUDGET_OPTIONS.map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => { setBudget(opt); setResult(null); }}
                                    className={cn(
                                        "py-3 px-4 rounded-xl border-2 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300",
                                        budget === opt
                                            ? opt === 'low' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                                                : opt === 'medium' ? 'border-violet-500/30 bg-violet-500/10 text-violet-400'
                                                    : 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                                            : 'border-white/[0.06] text-muted-foreground/40 hover:text-muted-foreground/60'
                                    )}
                                >
                                    {t(`budget_${opt}`)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={generateBudget}
                        disabled={selectedCount === 0 || loading}
                        className={cn(
                            "flex items-center justify-center gap-2.5 w-full py-4 rounded-xl text-sm font-bold uppercase tracking-[0.15em] transition-all duration-500",
                            selectedCount > 0
                                ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-[0_4px_20px_-4px_rgba(139,92,246,0.4)] hover:shadow-[0_8px_32px_-4px_rgba(139,92,246,0.5)] hover:scale-[1.02]'
                                : 'bg-white/[0.04] text-muted-foreground/30 cursor-not-allowed'
                        )}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                {t('generating')}
                            </>
                        ) : (
                            <>
                                <Sparkles className="h-4 w-4" />
                                {t('generate_button')}
                            </>
                        )}
                    </button>
                </div>

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                        >
                            <div className="border-t border-white/[0.06] p-6 md:p-8 space-y-6 bg-gradient-to-b from-violet-500/[0.02] to-transparent">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shrink-0">
                                        <ChartColumn className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-foreground mb-1">{t('result_title')}</h4>
                                        <p className="text-xs text-muted-foreground/50 font-medium leading-relaxed">{result.summary}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {result.recommendations.map((rec, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                                            <div className="flex items-center gap-3">
                                                <div className={cn("p-1.5 rounded-lg bg-gradient-to-br shadow-md", MODULE_DEFS.find(m => t(`module_${m.key}`) === rec.module)?.gradient || 'from-gray-500 to-gray-600')}>
                                                    {(() => {
                                                        const modDef = MODULE_DEFS.find(m => t(`module_${m.key}`) === rec.module);
                                                        const Icon = modDef?.icon || Sparkles;
                                                        return <Icon className="h-3 w-3 text-white" />;
                                                    })()}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-foreground">{rec.module}</p>
                                                    <p className="text-[10px] text-muted-foreground/40 font-medium">{t('plan_label')}: {rec.plan}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-lg font-black text-foreground">${rec.price}</span>
                                                <span className="text-[10px] text-muted-foreground/40 font-medium">/mes</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl border-2 border-violet-500/20 bg-violet-500/[0.04]">
                                    <span className="text-xs font-bold uppercase tracking-wider text-violet-400">{t('total_individual')}</span>
                                    <div>
                                        <span className="text-2xl font-black text-foreground">${result.individualTotal}</span>
                                        <span className="text-xs text-muted-foreground/40 font-medium">/mes</span>
                                    </div>
                                </div>

                                {result.comboRecommendation && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="p-5 rounded-xl border-2 border-emerald-500/25 bg-gradient-to-br from-emerald-500/[0.06] to-teal-500/[0.03] relative overflow-hidden"
                                    >
                                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500 text-[8px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                                            <TrendingDown className="h-2.5 w-2.5" />
                                            {t('save')} ${result.comboRecommendation.savings}/mes
                                        </div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                                                <Check className="h-4 w-4 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">{t('combo_recommended')}</p>
                                                <p className="text-[10px] text-muted-foreground/40 font-medium">{t('combo_desc')}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-baseline gap-2 mb-4">
                                            <span className="text-sm text-muted-foreground/40 font-medium">{t('plan_label')}:</span>
                                            <span className="text-lg font-black text-emerald-400">{result.comboRecommendation.name}</span>
                                            <span className="text-3xl font-black text-foreground">${result.comboRecommendation.price}</span>
                                            <span className="text-xs text-muted-foreground/40 font-medium">/mes</span>
                                        </div>
                                        <Link
                                            href="/register"
                                            className="group/btn flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold uppercase tracking-[0.15em] shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-500"
                                        >
                                            {t('start_combo')} <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </motion.div>
                                )}

                                {!result.comboRecommendation && (
                                    <Link
                                        href="/register"
                                        className="group/btn flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-bold uppercase tracking-[0.15em] shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-500"
                                    >
                                        {t('start_individual')} <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
