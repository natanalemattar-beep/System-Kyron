'use client';

import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/use-device-performance';
import { useTranslations } from 'next-intl';
import {
    Building2, CreditCard, Smartphone, Cpu, Cloud,
    Database, BrainCircuit, Wifi, Banknote, Globe,
    Shield, ArrowRight, Hexagon, Server
} from "lucide-react";
import { Link } from "@/navigation";

const integrationCategories = [
    {
        titleKey: "cat_banking",
        title: "Banca Venezolana",
        items: [
            { name: "Banesco", icon: Building2 },
            { name: "Mercantil", icon: Building2 },
            { name: "Provincial", icon: Building2 },
            { name: "BNC", icon: Building2 },
            { name: "Venezuela", icon: Building2 },
            { name: "Bicentenario", icon: Building2 },
        ],
        color: "text-blue-600",
        accent: "from-blue-500/15",
    },
    {
        titleKey: "cat_payments",
        title: "Pagos & Fintech",
        items: [
            { name: "Pago Móvil", icon: Smartphone },
            { name: "PayPal", icon: CreditCard },
            { name: "Stripe", icon: CreditCard },
            { name: "Zelle", icon: Banknote },
            { name: "Zinli", icon: Banknote },
            { name: "Crypto", icon: Globe },
        ],
        color: "text-emerald-600",
        accent: "from-emerald-500/15",
    },
    {
        titleKey: "cat_telecom",
        title: "Telecom & Conectividad",
        items: [
            { name: "Digitel", icon: Wifi },
            { name: "Movilnet", icon: Wifi },
            { name: "Movistar", icon: Wifi },
            { name: "5G/eSIM", icon: Smartphone },
            { name: "PBX Virtual", icon: Server },
            { name: "WhatsApp API", icon: Smartphone },
        ],
        color: "text-cyan-600",
        accent: "from-cyan-500/15",
    },
    {
        titleKey: "cat_tech",
        title: "Tecnología & IA",
        items: [
            { name: "Claude AI", icon: BrainCircuit },
            { name: "OpenAI", icon: BrainCircuit },
            { name: "Gemini", icon: BrainCircuit },
            { name: "PostgreSQL", icon: Database },
            { name: "AWS/Cloud", icon: Cloud },
            { name: "Next.js 15", icon: Cpu },
        ],
        color: "text-violet-600",
        accent: "from-violet-500/15",
    },
];

export function IntegrationsStrip() {
    const { tier } = useDevicePerformance();
    const animate = tier !== 'low';
    const t = useTranslations('IntegrationsStrip');

    return (
        <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-lime-50/40 via-green-50/30 to-emerald-50/40">
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-lime-300/25 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-300/25 to-transparent" />
                <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] rounded-full bg-lime-400/[0.06] blur-[100px]" />
                <div className="absolute bottom-[10%] left-[15%] w-[350px] h-[350px] rounded-full bg-emerald-400/[0.05] blur-[90px]" />
            </div>
            <div className="container mx-auto px-4 md:px-10 max-w-7xl relative z-10">
                <motion.div
                    className="text-center mb-12 md:mb-16"
                    initial={animate ? { opacity: 0, y: 20 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass-subtle text-xs font-semibold uppercase tracking-widest text-primary mx-auto mb-6">
                        <Shield className="h-3.5 w-3.5" />
                        {t('badge')}
                    </div>
                    <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-black tracking-tight text-foreground uppercase leading-[1.1] mb-4">
                        {t('title_highlight')}{' '}
                        <span className="liquid-glass-text italic">{t('title_rest')}</span>
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-xl mx-auto font-medium">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {integrationCategories.map((cat, catIdx) => (
                        <motion.div
                            key={cat.title}
                            className="rounded-[1.5rem] liquid-glass p-5 space-y-4 hover:-translate-y-1 transition-transform duration-300"
                            initial={animate ? { opacity: 0, y: 20 } : undefined}
                            whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                        >
                            <h3 className={cn("text-xs font-black uppercase tracking-wider", cat.color)}>
                                {t(cat.titleKey)}
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {cat.items.map((item) => (
                                    <div
                                        key={item.name}
                                        className="flex items-center gap-2 p-2 rounded-xl liquid-glass-subtle hover:border-primary/20 transition-colors duration-300"
                                    >
                                        <div className={cn("p-1.5 rounded-lg bg-gradient-to-br to-transparent", cat.accent)}>
                                            <item.icon className={cn("h-3 w-3", cat.color)} />
                                        </div>
                                        <span className="text-[9px] font-bold uppercase tracking-wide text-muted-foreground truncate">
                                            {item.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-10 flex justify-center"
                    initial={animate ? { opacity: 0, y: 10 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                >
                    <Link href="/register" className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl kyron-gradient-bg text-white text-xs font-bold uppercase tracking-widest shadow-kyron hover:shadow-[0_12px_40px_-8px_rgba(14,165,233,0.3)] transition-all duration-500">
                        {t('cta')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
