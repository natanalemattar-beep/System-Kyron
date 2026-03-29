'use client';

import { Card } from "@/components/ui/card";
import { ShieldCheck, Building2, Users, Zap, Globe, ArrowRight } from "lucide-react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { Link } from "@/navigation";

interface SiteStats {
    totalUsuarios: number;
    totalEmpresas: number;
}

const Counter = ({ from, to, duration = 1.5 }: { from: number, to: number, duration?: number }) => {
    const [displayValue, setDisplayValue] = useState(from);
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView) {
            animate(count, to, { duration });
        }
    }, [count, inView, to, duration]);

    useEffect(() => {
        return rounded.on('change', (latest: number) => setDisplayValue(latest));
    }, [rounded]);

    return <motion.span ref={ref}>{displayValue}</motion.span>;
}

export function AboutUsSection() {
    const [stats, setStats] = useState<SiteStats>({
        totalUsuarios: 0,
        totalEmpresas: 0,
    });

    useEffect(() => {
        fetch('/api/stats')
            .then(res => {
                if (!res.ok) throw new Error('stats fetch failed');
                return res.json();
            })
            .then((data: SiteStats) => setStats(data))
            .catch(() => {});
    }, []);

    return (
        <section id="nosotros" className="relative overflow-hidden">
            <div className="relative py-20 md:py-28">
                <div className="absolute inset-0 -z-10">
                    <Image
                        src="/images/landing/caracas-skyline.png"
                        alt=""
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
                    <div className="absolute inset-0 bg-[#030B1A]/60" />
                </div>

                <div className="container mx-auto px-4 md:px-10 max-w-7xl relative z-10">
                    <motion.div
                        className="text-center space-y-5 mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-widest text-white/80 mx-auto">
                            <Globe className="h-3.5 w-3.5 text-emerald-400" />
                            Hecho en Venezuela
                        </div>
                        <h2 className="text-[clamp(1.75rem,5vw,3.75rem)] font-black tracking-tighter uppercase leading-[1.05] text-white break-words">
                            Construido para{' '}
                            <span className="bg-gradient-to-r from-cyan-400 via-primary to-emerald-400 bg-clip-text text-transparent italic">
                                Venezuela
                            </span>
                        </h2>
                        <p className="text-base text-white/50 max-w-2xl mx-auto font-medium">
                            Ingeniería de software diseñada para la excelencia operativa y el cumplimiento normativo total.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        {[
                            { val: stats.totalUsuarios, label: "Usuarios Registrados", icon: Users, color: "from-cyan-500 to-blue-600", text: "text-cyan-400" },
                            { val: stats.totalEmpresas, label: "Empresas Activas", icon: Building2, color: "from-violet-500 to-purple-600", text: "text-violet-400" }
                        ].map((stat, i) => (
                            <div key={i} className="hover:-translate-y-1 transition-transform duration-300">
                                <Card className="relative overflow-hidden rounded-[2rem] bg-white/5 dark:bg-white/[0.03] border border-white/10 p-8 text-center group cursor-default hover:border-white/20 transition-all duration-300 shadow-2xl">
                                    <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", stat.color)} />
                                    <div className="absolute top-4 right-4 opacity-[0.06] group-hover:opacity-[0.12] transition-all duration-500">
                                        <stat.icon className="h-16 w-16 text-white" />
                                    </div>
                                    <div className="relative">
                                        <p className={cn("text-5xl font-black italic tracking-tighter mb-2", stat.text)}>
                                            <Counter from={0} to={stat.val} />
                                        </p>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-white/40">{stat.label}</p>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                    >
                        {[
                            { label: "Migración en 48h", icon: Zap },
                            { label: "Soporte Bilingüe", icon: Globe },
                            { label: "Multi-empresa", icon: Building2 },
                            { label: "Auditoría Inmutable", icon: ShieldCheck },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/8">
                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/15 flex items-center justify-center shrink-0">
                                    <item.icon className="h-4 w-4 text-primary" />
                                </div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-white/60">{item.label}</p>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="mt-10 flex justify-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link href="/register" className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl border border-white/15 bg-white/5 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white/25 transition-all duration-500">
                            Únete al Ecosistema <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
