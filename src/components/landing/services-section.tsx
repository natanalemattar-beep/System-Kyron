'use client';

import { motion } from "framer-motion";
import { Calculator, Smartphone, Recycle, Gavel, ShoppingCart, Signal, User, Building2, BarChart3, ArrowRight, Shield, Brain, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import Image from 'next/image';

const features = [
    {
        title: "Contabilidad & Fiscal",
        subtitle: "VEN-NIF · SENIAT · ISLR",
        description: "Sistema contable completo con libros legales, plan de cuentas venezolano, cálculo automático de IVA 16%, IGTF 3% e ISLR. Compatible con Gaceta Oficial vigente.",
        image: "/images/landing/devices-mockup.png",
        icon: Calculator,
        color: "from-primary to-blue-600",
        badges: ["VEN-NIF", "SENIAT", "LOTTT", "BCV"],
    },
    {
        title: "Seguridad AES-256",
        subtitle: "Cifrado Militar · JWT · Auditoría",
        description: "Infraestructura de seguridad de grado bancario. Cifrado AES-256, autenticación JWT con cookies HTTP-only, y registro inmutable de cada acción.",
        image: "/images/landing/security-shield.png",
        icon: Shield,
        color: "from-emerald-500 to-cyan-600",
        badges: ["AES-256", "JWT", "HTTPS", "Auditoría"],
    },
    {
        title: "Inteligencia Artificial",
        subtitle: "Gemini 2.0 Flash · GPT-4o",
        description: "IA fiscal que monitorea la Gaceta Oficial, asistente contable inteligente, análisis predictivo de flujo de caja, y generación automática de reportes ejecutivos.",
        image: "/images/landing/ai-brain.png",
        icon: Brain,
        color: "from-violet-500 to-purple-600",
        badges: ["Gemini 2.0", "GPT-4o", "Chat IA", "Reportes"],
    },
];

const modules = [
    { icon: User,        title: "Cuenta Personal",   color: "text-blue-500 dark:text-blue-400", bg: "from-blue-500/20 to-blue-500/5", border: "border-blue-500/20" },
    { icon: Signal,      title: "Mis Líneas",        color: "text-blue-500 dark:text-blue-400", bg: "from-blue-500/20 to-blue-500/5", border: "border-blue-500/20" },
    { icon: Calculator,  title: "Asesoría Contable", color: "text-primary",      bg: "from-primary/20 to-primary/5", border: "border-primary/20" },
    { icon: Gavel,       title: "Asesoría Legal",    color: "text-primary",      bg: "from-primary/20 to-primary/5", border: "border-primary/20" },
    { icon: ShoppingCart, title: "Facturación",      color: "text-primary",      bg: "from-primary/20 to-primary/5", border: "border-primary/20" },
    { icon: Building2,   title: "Socios",            color: "text-emerald-600 dark:text-emerald-400", bg: "from-emerald-500/20 to-emerald-500/5", border: "border-emerald-500/20" },
    { icon: Recycle,     title: "Sostenibilidad",    color: "text-emerald-600 dark:text-emerald-400", bg: "from-emerald-500/20 to-emerald-500/5", border: "border-emerald-500/20" },
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
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-black uppercase tracking-[0.35em] text-primary mx-auto mb-6">
                        <Zap className="h-3.5 w-3.5" />
                        Ecosistema Completo
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-foreground uppercase leading-[1.05] mb-4">
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
                                    <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-white border border-white/10", `bg-gradient-to-r ${feat.color}`)}>
                                        <feat.icon className="h-3.5 w-3.5" />
                                        {feat.subtitle}
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter uppercase text-foreground leading-[1.1]">
                                        {feat.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed max-w-lg">
                                        {feat.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {feat.badges.map((b) => (
                                            <span key={b} className="px-3 py-1.5 rounded-full border border-border/40 bg-muted/30 text-[9px] font-black uppercase tracking-widest text-muted-foreground">
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
                    <div className="text-center mb-12">
                        <h3 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase text-foreground mb-3">
                            Todo Integrado, <span className="kyron-gradient-text italic">Un Ecosistema</span>
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                        {modules.map((mod, i) => (
                            <motion.div
                                key={mod.title}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.04, duration: 0.4 }}
                                className={cn(
                                    "group flex flex-col items-center text-center gap-3 p-5 rounded-3xl border bg-card/50 dark:bg-white/[0.02] transition-all duration-300 cursor-default hover:shadow-xl hover:-translate-y-1",
                                    mod.border
                                )}
                            >
                                <div className={cn("p-3 rounded-xl border shadow-inner group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br", mod.bg, mod.border)}>
                                    <mod.icon className={cn("h-5 w-5", mod.color)} />
                                </div>
                                <h4 className="text-[10px] font-black uppercase tracking-tight text-foreground">{mod.title}</h4>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-10 flex justify-center">
                        <Link href="/register" className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl kyron-gradient-bg text-white text-xs font-black uppercase tracking-widest shadow-kyron hover:shadow-[0_12px_40px_-8px_rgba(14,165,233,0.3)] transition-all duration-500">
                            Explorar Ecosistema <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
