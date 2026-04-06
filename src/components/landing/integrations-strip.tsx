'use client';

import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/use-device-performance';
import { useTranslations } from 'next-intl';
import {
    Building2, CreditCard, Smartphone, Cpu, Cloud,
    Database, BrainCircuit, Wifi, Banknote, Globe,
    Shield, ArrowRight, Server
} from "lucide-react";
import { Link } from "@/navigation";

const integrationCategories = [
    {
        titleKey: "cat_banking",
        items: [
            { name: "Banesco", icon: Building2 },
            { name: "Mercantil", icon: Building2 },
            { name: "Provincial", icon: Building2 },
            { name: "BNC", icon: Building2 },
            { name: "Venezuela", icon: Building2 },
            { name: "Bicentenario", icon: Building2 },
        ],
        color: "text-blue-400",
        gradient: "from-blue-500 to-blue-700",
        border: "border-blue-500/15",
        bg: "bg-blue-500/[0.03]",
        accent: "from-blue-500/15",
    },
    {
        titleKey: "cat_payments",
        items: [
            { name: "Pago Móvil", icon: Smartphone },
            { name: "PayPal", icon: CreditCard },
            { name: "Stripe", icon: CreditCard },
            { name: "Zelle", icon: Banknote },
            { name: "Zinli", icon: Banknote },
            { name: "Crypto", icon: Globe },
        ],
        color: "text-emerald-400",
        gradient: "from-emerald-500 to-emerald-700",
        border: "border-emerald-500/15",
        bg: "bg-emerald-500/[0.03]",
        accent: "from-emerald-500/15",
    },
    {
        titleKey: "cat_telecom",
        items: [
            { name: "5G/eSIM", icon: Smartphone },
            { name: "PBX Virtual", icon: Server },
            { name: "WhatsApp API", icon: Smartphone },
        ],
        color: "text-cyan-400",
        gradient: "from-cyan-500 to-cyan-700",
        border: "border-cyan-500/15",
        bg: "bg-cyan-500/[0.03]",
        accent: "from-cyan-500/15",
    },
    {
        titleKey: "cat_tech",
        items: [
            { name: "Claude AI", icon: BrainCircuit },
            { name: "OpenAI", icon: BrainCircuit },
            { name: "Gemini", icon: BrainCircuit },
            { name: "PostgreSQL", icon: Database },
            { name: "AWS/Cloud", icon: Cloud },
            { name: "Next.js 15", icon: Cpu },
        ],
        color: "text-violet-400",
        gradient: "from-violet-500 to-violet-700",
        border: "border-violet-500/15",
        bg: "bg-violet-500/[0.03]",
        accent: "from-violet-500/15",
    },
];

export function IntegrationsStrip() {
    const { tier } = useDevicePerformance();
    const animate = tier !== 'low';
    const t = useTranslations('IntegrationsStrip');

    return (
        <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-lime-50/40 via-green-50/30 to-emerald-50/40 dark:from-[#060a14] dark:via-[#080d18] dark:to-[#060a14]">
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/15 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
                <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] rounded-full bg-emerald-500/[0.03] blur-[120px]" />
                <div className="absolute bottom-[10%] left-[15%] w-[350px] h-[350px] rounded-full bg-violet-500/[0.02] blur-[100px]" />
            </div>
            <div className="container mx-auto px-4 md:px-10 max-w-7xl relative z-10">
                <motion.div
                    className="text-center mb-14 md:mb-18"
                    initial={animate ? { opacity: 0, y: 30 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-500 dark:text-emerald-400 mx-auto mb-6">
                        <Shield className="h-3.5 w-3.5" />
                        {t('badge')}
                    </div>
                    <h2 className="text-[clamp(1.75rem,4vw,3.5rem)] font-black tracking-[-0.02em] text-foreground leading-[0.95] mb-5">
                        {t('title_highlight')}{' '}
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">{t('title_rest')}</span>
                    </h2>
                    <p className="text-sm text-muted-foreground/50 max-w-xl mx-auto font-medium">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {integrationCategories.map((cat, catIdx) => (
                        <motion.div
                            key={cat.titleKey}
                            className={cn(
                                "rounded-2xl border-2 p-5 space-y-4 backdrop-blur-sm hover:-translate-y-2 transition-all duration-500 hover:shadow-xl",
                                cat.border,
                                cat.bg
                            )}
                            initial={animate ? { opacity: 0, y: 25 } : undefined}
                            whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                        >
                            <div className="flex items-center gap-2">
                                <div className={cn("p-1.5 rounded-lg bg-gradient-to-br", cat.gradient)}>
                                    {(() => { const Icon = cat.items[0].icon; return <Icon className="h-3 w-3 text-white" />; })()}
                                </div>
                                <h3 className={cn("text-xs font-bold uppercase tracking-[0.15em]", cat.color)}>
                                    {t(cat.titleKey)}
                                </h3>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {cat.items.map((item) => (
                                    <div
                                        key={item.name}
                                        className="flex items-center gap-2 p-2.5 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.1] hover:bg-white/[0.03] transition-all duration-300"
                                    >
                                        <div className={cn("p-1.5 rounded-lg bg-gradient-to-br to-transparent", cat.accent)}>
                                            <item.icon className={cn("h-3 w-3", cat.color)} />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground/40 truncate">
                                            {item.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-12 flex justify-center"
                    initial={animate ? { opacity: 0, y: 10 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <Link href="/register" className="group inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-bold uppercase tracking-[0.2em] shadow-[0_8px_32px_-4px_rgba(16,185,129,0.3)] hover:shadow-[0_16px_48px_-8px_rgba(16,185,129,0.4)] hover:scale-[1.03] transition-all duration-500">
                        {t('cta')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
