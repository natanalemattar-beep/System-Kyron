'use client';

import { motion } from "framer-motion";
import { Receipt, ArrowRight, Lock, Sparkles, Zap, ShieldCheck, BarChart3, Globe, FileCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import Image from 'next/image';

const features = [
    {
        title: "Contabilidad & Fiscal",
        subtitle: "VEN-NIF · SENIAT · ISLR",
        description: "Sistema contable completo con libros legales, plan de cuentas venezolano, cálculo automático de IVA 16%, IGTF 3% e ISLR. Compatible con Gaceta Oficial vigente.",
        image: "/images/landing/devices-mockup.png",
        icon: Receipt,
        color: "from-primary to-blue-600",
        badges: ["VEN-NIF", "SENIAT", "LOTTT", "BCV"],
    },
    {
        title: "Seguridad AES-256",
        subtitle: "Cifrado Militar · JWT · Auditoría",
        description: "Infraestructura de seguridad de grado bancario. Cifrado AES-256, autenticación JWT con cookies HTTP-only, y registro inmutable de cada acción.",
        image: "/images/landing/security-shield.png",
        icon: Lock,
        color: "from-emerald-500 to-cyan-600",
        badges: ["AES-256", "JWT", "HTTPS", "Auditoría"],
    },
    {
        title: "Inteligencia Artificial",
        subtitle: "Kyron AI · Claude (Anthropic)",
        description: "IA fiscal potenciada por Claude de Anthropic. Monitorea la Gaceta Oficial, asistente contable inteligente, análisis predictivo de flujo de caja, y generación automática de reportes ejecutivos.",
        image: "/images/landing/ai-brain.png",
        icon: Sparkles,
        color: "from-violet-500 to-purple-600",
        badges: ["Kyron AI", "Claude", "Chat IA", "Reportes"],
    },
];

const platformStats = [
    { value: "7+", label: "Módulos Integrados", icon: BarChart3, color: "text-primary", bg: "from-primary/15 to-primary/5" },
    { value: "AES-256", label: "Cifrado Empresarial", icon: ShieldCheck, color: "text-cyan-400", bg: "from-cyan-500/15 to-cyan-500/5" },
    { value: "VEN-NIF", label: "Cumplimiento Fiscal", icon: FileCheck, color: "text-violet-400", bg: "from-violet-500/15 to-violet-500/5" },
    { value: "24/7", label: "Soporte IA Activo", icon: Sparkles, color: "text-amber-400", bg: "from-amber-500/15 to-amber-500/5" },
];

export function ServicesSection() {
    return (
        <section id="servicios" className="relative z-10 overflow-hidden">
            <div className="py-20 md:py-28">
                <motion.div
                    className="container mx-auto px-4 md:px-10 max-w-7xl mb-16 md:mb-20 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold uppercase tracking-widest text-primary mx-auto mb-6">
                        <Zap className="h-3.5 w-3.5" />
                        Ecosistema Completo
                    </div>
                    <h2 className="text-[clamp(1.75rem,5vw,3.75rem)] font-black tracking-tight text-foreground uppercase leading-[1.05] mb-4 break-words">
                        Todo lo que necesitas,{' '}
                        <span className="kyron-gradient-text italic">
                            integrado
                        </span>
                    </h2>
                    <p className="text-base text-muted-foreground max-w-2xl mx-auto font-medium">
                        Soluciones interconectadas que cubren asesoría contable, facturación, legal, telecomunicaciones e inteligencia artificial.
                    </p>
                </motion.div>

                <div className="space-y-20 md:space-y-28">
                    {features.map((feat, idx) => (
                        <motion.div
                            key={feat.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7 }}
                            className="container mx-auto px-4 md:px-10 max-w-7xl"
                        >
                            <div className={cn(
                                "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center",
                                idx % 2 === 1 && "lg:flex-row-reverse"
                            )}>
                                <div className={cn("space-y-6", idx % 2 === 1 && "lg:order-2")}>
                                    <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-white border border-white/10", `bg-gradient-to-r ${feat.color}`)}>
                                        <feat.icon className="h-3.5 w-3.5" />
                                        {feat.subtitle}
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase text-foreground leading-[1.1]">
                                        {feat.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed max-w-lg">
                                        {feat.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {feat.badges.map((b) => (
                                            <span key={b} className="px-3 py-1.5 rounded-full border border-border/40 bg-muted/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                {b}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className={cn("relative", idx % 2 === 1 && "lg:order-1")}>
                                    <div className={cn("absolute -inset-4 rounded-[2rem] blur-xl opacity-20", `bg-gradient-to-br ${feat.color}`)} />
                                    <div className="relative rounded-[1.5rem] overflow-hidden border border-border/20 shadow-2xl bg-card/30 hover:-translate-y-1 transition-transform duration-300">
                                        <Image
                                            src={feat.image}
                                            alt={feat.title}
                                            width={idx === 0 ? 800 : 600}
                                            height={idx === 0 ? 450 : 600}
                                            className="w-full h-auto"
                                            loading="lazy"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="container mx-auto px-4 md:px-10 max-w-7xl mt-24 md:mt-32"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold uppercase tracking-widest text-primary mx-auto mb-5">
                            <Globe className="h-3.5 w-3.5" />
                            Plataforma en Cifras
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-foreground mb-3">
                            Resultados que <span className="kyron-gradient-text italic">hablan solos</span>
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-xl mx-auto font-medium">
                            La infraestructura más robusta de Venezuela para gestión corporativa integral.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        {platformStats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07, duration: 0.5 }}
                                className="group relative overflow-hidden rounded-2xl border border-border/30 hover:border-border/60 bg-card/30 dark:bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", stat.bg)} />
                                <div className="relative p-5 flex flex-col items-center text-center gap-2.5">
                                    <div className={cn("flex items-center justify-center w-10 h-10 rounded-xl border border-border/30 bg-background/50 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300")}>
                                        <stat.icon className={cn("h-4.5 w-4.5", stat.color)} />
                                    </div>
                                    <div className={cn("text-xl sm:text-2xl font-black tracking-tight", stat.color)}>
                                        {stat.value}
                                    </div>
                                    <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70 leading-tight">
                                        {stat.label}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 flex justify-center">
                        <Link href="/register" className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl kyron-gradient-bg text-white text-xs font-bold uppercase tracking-widest shadow-kyron hover:shadow-[0_12px_40px_-8px_rgba(14,165,233,0.3)] transition-all duration-500">
                            Comenzar Ahora <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
