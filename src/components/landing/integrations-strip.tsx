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
            { name: "Banesco", status: "Active", brandColor: "text-[#ed1c24]" },
            { name: "Mercantil", status: "Active", brandColor: "text-[#005596]" },
            { name: "Provincial", status: "Active", brandColor: "text-[#004481]" },
            { name: "Venezuela", status: "Active", brandColor: "text-[#c20e1a]" },
            { name: "Bicentenario", status: "Active", brandColor: "text-[#e30613]" },
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
            { name: "Pago Móvil", status: "Active", brandColor: "text-emerald-400" },
            { name: "PayPal", status: "Beta", brandColor: "text-[#003087]" },
            { name: "Stripe", status: "Coming", brandColor: "text-[#635bff]" },
            { name: "Zelle", status: "Beta", brandColor: "text-[#6b1df2]" },
            { name: "Zinli", status: "Active", brandColor: "text-[#00d084]" },
            { name: "Crypto", status: "Active", brandColor: "text-[#f7931a]" },
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
            { name: "5G/eSIM", status: "Active", brandColor: "text-cyan-400" },
            { name: "PBX Virtual", status: "Active", brandColor: "text-cyan-400" },
            { name: "WhatsApp API", status: "Active", brandColor: "text-[#25d366]" },
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
            { name: "Claude AI", status: "Active", brandColor: "text-[#d97757]" },
            { name: "OpenAI", status: "Active", brandColor: "text-[#74aa9c]" },
            { name: "Gemini", status: "Active", brandColor: "text-[#4285f4]" },
            { name: "PostgreSQL", status: "Active", brandColor: "text-[#336791]" },
            { name: "AWS/Cloud", status: "Active", brandColor: "text-[#ff9900]" },
            { name: "Next.js 15", status: "Active", brandColor: "text-white" },
        ],
        color: "text-violet-400",
        gradient: "from-violet-500 to-violet-700",
        border: "border-violet-500/15",
        bg: "bg-violet-500/[0.03]",
        accent: "from-violet-500/15",
    },
];

function StatusBadge({ status }: { status: string }) {
    const colors = {
        Active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        Beta: "bg-amber-500/20 text-amber-400 border-amber-500/30",
        Coming: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    }[status as 'Active' | 'Beta' | 'Coming'] || "bg-white/10 text-white/50 border-white/20";

    const labels = {
        Active: "Activo",
        Beta: "Beta",
        Coming: "Próximamente"
    }[status as 'Active' | 'Beta' | 'Coming'] || status;

    return (
        <span className={cn("px-1.5 py-0.5 rounded-[4px] text-[7px] font-black uppercase tracking-widest border", colors)}>
            {labels}
        </span>
    );
}

export function IntegrationsStrip() {
    const { tier } = useDevicePerformance();
    const animate = tier !== 'low';
    const t = useTranslations('IntegrationsStrip');

    return (
        <section className="py-24 md:py-32 relative overflow-hidden bg-[#050816] scroll-mt-20">
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
                <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/[0.05] blur-[150px] animate-mesh-drift" />
                <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/[0.03] blur-[150px]" />
            </div>
            
            <div className="container mx-auto px-4 md:px-10 lg:px-12 max-w-[1440px] relative z-10">
                <motion.div
                    className="text-center mb-20 md:mb-24"
                    initial={animate ? { opacity: 0, y: 30 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md mb-8 mx-auto">
                        <Shield className="h-4 w-4 text-emerald-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-200/80">{t('badge')}</span>
                    </div>
                    <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-[-0.04em] text-white leading-[0.95] mb-6">
                        {t('title_highlight')}{' '}
                        <span className="block text-glow-emerald mt-2">{t('title_rest')}</span>
                    </h2>
                    <p className="text-lg text-white/40 max-w-2xl mx-auto font-medium leading-relaxed">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {integrationCategories.map((cat, catIdx) => (
                        <motion.div
                            key={cat.titleKey}
                            className={cn(
                                "glass-elite-interactive p-8 md:p-10 space-y-6 flex flex-col items-center text-center rounded-3xl",
                                "hover:bg-emerald-500/5 hover:border-emerald-500/20"
                            )}
                            initial={animate ? { opacity: 0, y: 25 } : undefined}
                            whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: catIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="flex flex-col items-center gap-3 mb-4">
                                <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center transition-all duration-500 hover:scale-110", 
                                    "bg-white/5 border border-white/10"
                                )}>
                                    <Cloud className={cn("h-7 w-7 text-white/80", cat.color)} />
                                </div>
                                <h3 className={cn("text-xs font-black uppercase tracking-[0.25em] mt-2", cat.color)}>
                                    {t(cat.titleKey)}
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 w-full gap-3">
                                {cat.items.map((item) => (
                                    <div
                                        key={item.name}
                                        className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 group"
                                    >
                                        <span className={cn("text-xs font-black tracking-tight transition-colors", item.brandColor || "text-white/60")}>
                                            {item.name}
                                        </span>
                                        <StatusBadge status={item.status} />
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
