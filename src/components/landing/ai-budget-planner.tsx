'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Zap, Sparkles, ArrowRight, Check, Brain, 
    Bot, Cpu, Terminal, Loader2, DollarSign,
    ShieldCheck, Wifi, Calculator, Receipt, Users, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollReveal } from './scroll-reveal';
import { Link } from '@/navigation';

const ICONS: Record<string, any> = {
  connectivity: Wifi,
  accounting: Calculator,
  legal: Shield,
  invoicing: Receipt,
  directors: Users,
};

export function AIBudgetPlanner() {
    const t = useTranslations('AIBudgetPlanner');
    const [budget, setBudget] = useState(50);
    const [needs, setNeeds] = useState<string[]>(['connectivity', 'accounting']);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [aiStep, setAiStep] = useState(0);
    
    const aiSteps = t.raw('ai_steps');

    const handleGenerate = () => {
        setIsGenerating(true);
        setShowResult(false);
        setAiStep(0);
        
        // Simular pasos de IA
        const interval = setInterval(() => {
            setAiStep(prev => {
                if (prev >= aiSteps.length - 1) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsGenerating(false);
                        setShowResult(true);
                    }, 800);
                    return prev;
                }
                return prev + 1;
            });
        }, 1200);
    };

    // Lógica determinística de recomendación
    const getRecommendation = () => {
        let recommendedModules = [];
        let totalValue = 0;
        
        if (budget >= 150) {
            recommendedModules = ['connectivity', 'accounting', 'legal', 'invoicing', 'directors'];
            totalValue = 225;
        } else if (budget >= 80) {
            recommendedModules = ['connectivity', 'accounting', 'invoicing'];
            totalValue = 100;
        } else if (budget >= 40) {
            recommendedModules = ['connectivity', 'accounting'];
            totalValue = 60;
        } else {
            recommendedModules = ['connectivity'];
            totalValue = 25;
        }

        // Filtrar por necesidades del usuario si es posible
        const finalModules = Array.from(new Set([...recommendedModules, ...needs.filter(n => budget >= 20)]));
        
        return {
            modules: finalModules,
            totalValue,
            savings: totalValue - budget > 0 ? totalValue - budget : 15
        };
    };

    const recommendation = getRecommendation();

    return (
        <section className="py-24 md:py-32 relative overflow-hidden bg-white dark:bg-[#050816] transition-colors duration-700">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-cyan-500/[0.08] dark:bg-cyan-500/5 blur-[120px] rounded-full animate-mesh-drift" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <ScrollReveal className="text-center mb-16 space-y-6">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md mx-auto transition-colors">
                        <Brain className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-200/80 transition-colors">{t('badge')}</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.95] uppercase italic transition-colors">
                        {t('title')} <span className="text-cyan-500 dark:text-cyan-400">{t('highlight')}</span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-500 dark:text-white/40 max-w-2xl mx-auto font-medium transition-colors">
                        {t('subtitle')}
                    </p>
                </ScrollReveal>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Input Side */}
                    <div className="lg:col-span-5 space-y-10">
                        <div className="p-8 md:p-12 rounded-[3.5rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-10 transition-colors">
                            <div className="space-y-8">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-white/30 flex items-center gap-2 transition-colors">
                                    <DollarSign className="h-4 w-4" /> {t('input_label')}
                                </label>
                                <div className="space-y-8">
                                    <Slider 
                                        value={[budget]} 
                                        onValueChange={(val) => setBudget(val[0])}
                                        max={300}
                                        step={5}
                                        className="py-4"
                                    />
                                    <div className="flex justify-between items-center px-2">
                                        <span className="text-sm font-black text-slate-300 dark:text-white/20 transition-colors">$5</span>
                                        <span className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors">${budget}</span>
                                        <span className="text-sm font-black text-slate-300 dark:text-white/20 transition-colors">$300</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-white/30 flex items-center gap-2 transition-colors">
                                    <Zap className="h-4 w-4" /> {t('needs_label')}
                                </label>
                                <div className="grid grid-cols-1 gap-4">
                                    {Object.entries(t.raw('needs')).map(([key, label]: [string, any]) => (
                                        <div 
                                            key={key}
                                            onClick={() => {
                                                if (needs.includes(key)) setNeeds(needs.filter(n => n !== key));
                                                else setNeeds([...needs, key]);
                                            }}
                                            className={cn(
                                                "flex items-center gap-5 p-5 rounded-[1.5rem] border transition-all cursor-pointer group shadow-sm",
                                                needs.includes(key) 
                                                    ? "bg-cyan-500/10 border-cyan-500/40 text-slate-900 dark:text-white shadow-cyan-500/10" 
                                                    : "bg-white dark:bg-white/5 border-black/5 dark:border-white/5 text-slate-400 dark:text-white/40 hover:bg-black/[0.03] dark:hover:bg-white/10"
                                            )}
                                        >
                                            <div className={cn(
                                                "h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-500 shadow-sm",
                                                needs.includes(key) ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400" : "bg-black/[0.03] dark:bg-white/5 text-slate-300 dark:text-white/20"
                                            )}>
                                                {(() => {
                                                    const Icon = ICONS[key] || Zap;
                                                    return <Icon className="h-6 w-6" />;
                                                })()}
                                            </div>
                                            <span className="text-xs font-black uppercase tracking-widest transition-colors">{label}</span>
                                            {needs.includes(key) && <Check className="h-5 w-5 ml-auto text-cyan-600 dark:text-cyan-400 transition-colors" />}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button 
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                className="w-full h-16 rounded-[1.5rem] bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-zinc-200 font-black text-[11px] uppercase tracking-[0.4em] shadow-xl dark:shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95 transition-all group border-none"
                            >
                                {isGenerating ? (
                                    <Loader2 className="h-5 w-5 animate-spin mr-3" />
                                ) : (
                                    <Sparkles className="h-5 w-5 mr-3 text-cyan-400" />
                                )}
                                {t('btn_generate')}
                            </Button>
                        </div>
                    </div>

                    {/* Result Side */}
                    <div className="lg:col-span-7 h-full min-h-[500px]">
                        <AnimatePresence mode="wait">
                            {isGenerating ? (
                                <motion.div 
                                    key="loading"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    className="h-full flex flex-col items-center justify-center space-y-10 bg-black/[0.02] dark:bg-white/[0.02] rounded-[3.5rem] border border-black/5 dark:border-white/5 p-12 text-center transition-colors"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-cyan-500/20 blur-3xl animate-pulse rounded-full" />
                                        <Bot className="h-20 w-20 text-cyan-400 relative z-10" />
                                    </div>
                                    <div className="space-y-4 max-w-md">
                                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] leading-relaxed transition-colors">
                                            {t('ai_thinking')}
                                        </p>
                                        <div className="space-y-3 pt-6">
                                            {aiSteps.map((step: string, i: number) => (
                                                <motion.div 
                                                    key={i}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ 
                                                        opacity: i <= aiStep ? 1 : 0.2,
                                                        x: i <= aiStep ? 0 : -10
                                                    }}
                                                    className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-cyan-400/60"
                                                >
                                                    <Terminal className="h-3 w-3" />
                                                    {step}
                                                    {i < aiStep && <Check className="h-3 w-3 ml-auto text-emerald-500" />}
                                                    {i === aiStep && <Loader2 className="h-3 w-3 ml-auto animate-spin" />}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ) : showResult ? (
                                <motion.div 
                                    key="result"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="h-full space-y-8"
                                >
                                    <div className="rounded-[3.5rem] border border-cyan-500/20 bg-white/40 dark:bg-cyan-500/5 p-10 md:p-16 relative overflow-hidden h-full shadow-2xl transition-colors backdrop-blur-3xl">
                                        <div className="absolute top-0 right-0 p-12">
                                            <ShieldCheck className="h-24 w-24 text-cyan-500/10 dark:text-cyan-500/5 transition-colors" />
                                        </div>
                                        
                                        <div className="space-y-3 mb-12">
                                            <h3 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic transition-colors">
                                                {t('result_title')}
                                            </h3>
                                            <p className="text-lg text-slate-500 dark:text-white/40 font-medium transition-colors">
                                                {t('result_subtitle')} <span className="text-slate-900 dark:text-white font-black transition-colors">${budget}/mes</span>
                                            </p>
                                        </div>

                                        <div className="grid gap-5 mb-12">
                                            {recommendation.modules.map((modId) => (
                                                <motion.div 
                                                    key={modId}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="flex items-center gap-6 p-6 rounded-[1.5rem] bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/5 hover:border-cyan-500/20 transition-all shadow-sm"
                                                >
                                                    <div className="h-14 w-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 transition-colors shadow-sm">
                                                        {(() => {
                                                            const Icon = ICONS[modId] || Check;
                                                            return <Icon className="h-7 w-7" />;
                                                        })()}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.3em] mb-1 transition-colors">Módulo Activo</p>
                                                        <p className="text-base font-black text-slate-900 dark:text-white uppercase tracking-[0.1em] transition-colors">
                                                            {t(`needs.${modId}`)}
                                                        </p>
                                                    </div>
                                                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.6)]" />
                                                </motion.div>
                                            ))}
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-8 pt-10 border-t border-black/5 dark:border-white/5 transition-colors">
                                            <div className="space-y-2">
                                                <p className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.4em] transition-colors">{t('total_value')}</p>
                                                <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors">${recommendation.totalValue}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-500/40 uppercase tracking-[0.4em] transition-colors">{t('savings')}</p>
                                                <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400 tracking-tighter transition-colors">${recommendation.savings}</p>
                                            </div>
                                        </div>

                                        <Button asChild className="w-full h-16 mt-12 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-white font-black text-[11px] uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(6,182,212,0.2)] group">
                                            <Link href="/register">
                                                {t('cta_activate')} <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1.5 transition-transform" />
                                            </Link>
                                        </Button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full flex flex-col items-center justify-center space-y-8 bg-black/[0.01] dark:bg-white/[0.01] rounded-[3.5rem] border-black/5 dark:border-white/5 border-dashed border-2 opacity-50 transition-colors"
                                >
                                    <div className="h-24 w-24 rounded-full bg-black/[0.03] dark:bg-white/5 flex items-center justify-center transition-colors">
                                        <Cpu className="h-12 w-12 text-slate-300 dark:text-white/20 transition-colors" />
                                    </div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400 dark:text-white/40 transition-colors">Esperando parámetros...</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
