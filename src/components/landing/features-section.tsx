'use client';

import { BrainCircuit, Lock, Calculator, Users, Smartphone, Recycle, Gavel, BarChart3, Landmark, FileText, ShieldCheck, Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';


const featuresMeta = [
    { icon: Calculator, color: "text-primary", bg: "bg-primary/10", border: "border-primary/15", glowColor: "rgba(30, 64, 175, 0.15)", span: "col-span-1" },
    { icon: Users, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/15", glowColor: "rgba(139, 92, 246, 0.15)", span: "col-span-1" },
    { icon: Smartphone, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/15", glowColor: "rgba(59, 130, 246, 0.15)", span: "col-span-1" },
    { icon: BrainCircuit, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/15", glowColor: "rgba(244, 63, 94, 0.15)", span: "col-span-1 sm:col-span-2 lg:col-span-1", featured: true },
    { icon: Gavel, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/15", glowColor: "rgba(245, 158, 11, 0.15)", span: "col-span-1" },
    { icon: Recycle, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/15", glowColor: "rgba(16, 185, 129, 0.15)", span: "col-span-1" },
    { icon: BarChart3, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/15", glowColor: "rgba(6, 182, 212, 0.15)", span: "col-span-1" },
    { icon: Landmark, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/15", glowColor: "rgba(99, 102, 241, 0.15)", span: "col-span-1" },
    { icon: Lock, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/15", glowColor: "rgba(249, 115, 22, 0.15)", span: "col-span-1" },
];

export function FeaturesSection() {
    const t = useTranslations('FeaturesSection');
    const features = t.raw('features') as { title: string; description: string }[];
    const stats = t.raw('stats') as { val: string; detail: string }[];
    return (
        <section id="caracteristicas" className="py-16 md:py-32 relative">
            <div className="container mx-auto px-4 md:px-10 max-w-7xl">

                <div
                    className="mb-14 md:mb-20 space-y-5 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-[9px] font-black uppercase tracking-[0.3em] text-secondary mx-auto">
                        <Sparkles className="h-3 w-3" /> {t('badge')}
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground uppercase leading-[1.2] overflow-hidden">
                        {t('title_highlight')} <br className="hidden sm:block" />
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">{t('title_rest')}</span>
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto font-semibold text-sm leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
                >
                    {features.map((f, idx) => {
                        const meta = featuresMeta[idx] || featuresMeta[0];
                        return (
                            <div
                                key={f.title}
                                className={cn(
                                    "group relative flex flex-col gap-5 p-6 md:p-7 rounded-[1.75rem] border transition-all duration-300 hover:-translate-y-1",
                                    "bg-card/30 dark:bg-card/15",
                                    meta.border, meta.span
                                )}
                                style={{
                                    '--glow-color': meta.glowColor,
                                } as React.CSSProperties}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px -8px ${meta.glowColor}`;
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                                }}
                            >
                                <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {meta.featured && (
                                    <div className="absolute top-4 right-4">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/20 text-[7px] font-black uppercase tracking-widest text-rose-400">
                                            <Sparkles className="h-2 w-2" /> {t('ai_native_badge')}
                                        </span>
                                    </div>
                                )}
                                <div className={cn("p-3 rounded-2xl w-fit border border-border/20 dark:border-white/5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-inner", meta.bg)}>
                                    <meta.icon className={cn("h-5 w-5", meta.color)} />
                                </div>
                                <div className="space-y-2 flex-1">
                                    <h3 className={cn("text-sm font-black uppercase tracking-tight flex items-center gap-2", meta.color)}>
                                        {f.title}
                                        <ArrowUpRight className={cn("h-3 w-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300", meta.color)} />
                                    </h3>
                                    <p className="text-[10px] text-muted-foreground font-semibold leading-relaxed">
                                        {f.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div
                    className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3"
                >
                    {stats.map((r, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center text-center gap-1.5 p-5 rounded-2xl bg-muted/30 dark:bg-white/[0.02] border border-border/30 dark:border-white/[0.06] hover:border-primary/20 transition-all duration-300 cursor-default hover:-translate-y-0.5"
                        >
                            <p className="text-xs font-black text-foreground/80 uppercase tracking-tight">{r.val}</p>
                            <p className="text-[8px] font-semibold text-muted-foreground uppercase tracking-widest">{r.detail}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
