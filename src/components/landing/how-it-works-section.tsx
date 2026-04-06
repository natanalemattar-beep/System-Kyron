'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/use-device-performance';
import { UserPlus, Settings, Rocket, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from '@/navigation';

const steps = [
    {
        number: '01',
        icon: UserPlus,
        title: 'Regístrate en Minutos',
        description: 'Crea tu cuenta con verificación de cédula o RIF real vía SAIME/SENIAT. Sin papeleos, sin esperas.',
        details: ['Verificación instantánea', 'Validación de documentos', 'Acceso inmediato'],
        color: 'from-blue-500 to-cyan-500',
        textColor: 'text-blue-600 dark:text-blue-400',
        dotColor: 'bg-blue-500',
    },
    {
        number: '02',
        icon: Settings,
        title: 'Configura tu Empresa',
        description: 'Selecciona los módulos que necesitas. Desde contabilidad hasta RRHH, todo se activa con un clic.',
        details: ['9+ módulos disponibles', 'Personalización total', 'Importación de datos'],
        color: 'from-violet-500 to-purple-500',
        textColor: 'text-violet-600 dark:text-violet-400',
        dotColor: 'bg-violet-500',
    },
    {
        number: '03',
        icon: Rocket,
        title: 'Opera con IA',
        description: 'Las 19 automatizaciones se activan automáticamente. La IA analiza tus documentos, la tasa BCV se sincroniza sola.',
        details: ['Automatización inmediata', 'IA activa desde el día 1', 'BCV en tiempo real'],
        color: 'from-emerald-500 to-green-500',
        textColor: 'text-emerald-600 dark:text-emerald-400',
        dotColor: 'bg-emerald-500',
    },
    {
        number: '04',
        icon: Shield,
        title: 'Cumple y Crece',
        description: 'Mantente al día con SENIAT, VEN-NIF y LOTTT automáticamente. Alertas inteligentes te avisan antes de los vencimientos.',
        details: ['Cumplimiento automático', 'Alertas preventivas', 'Reportes fiscales'],
        color: 'from-amber-500 to-orange-500',
        textColor: 'text-amber-600 dark:text-amber-400',
        dotColor: 'bg-amber-500',
    },
];

export function HowItWorksSection() {
    const { tier } = useDevicePerformance();
    const animate = tier !== 'low';

    return (
        <section className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-slate-50/80 via-gray-50/60 to-slate-50/80 dark:from-[hsl(224,28%,8%)] dark:via-[hsl(224,24%,7%)] dark:to-[hsl(224,28%,9%)]">
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300/30 dark:via-slate-600/10 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300/25 dark:via-slate-600/10 to-transparent" />
            </div>

            <div className="container mx-auto px-4 md:px-10 max-w-6xl relative z-10">
                <motion.div
                    className="text-center mb-16 md:mb-20"
                    initial={animate ? { opacity: 0, y: 30 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass-subtle text-[11px] font-semibold uppercase tracking-widest text-primary mx-auto mb-6">
                        <Rocket className="h-3.5 w-3.5" />
                        Proceso Simple
                    </div>
                    <h2 className="text-[clamp(1.75rem,5vw,3.75rem)] font-bold tracking-tight text-foreground uppercase leading-[1.05] mb-4">
                        Cómo{' '}
                        <span className="liquid-glass-text italic">Funciona</span>
                    </h2>
                    <p className="text-base text-muted-foreground max-w-2xl mx-auto font-medium">
                        De cero a productivo en menos de una hora. Sin consultores, sin implementaciones
                        de meses, sin dolores de cabeza.
                    </p>
                </motion.div>

                <div className="relative">
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2">
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-violet-500/20 via-emerald-500/20 to-amber-500/20 rounded-full" />
                    </div>

                    <div className="space-y-12 md:space-y-0">
                        {steps.map((step, i) => {
                            const isLeft = i % 2 === 0;
                            return (
                                <motion.div
                                    key={i}
                                    className="relative md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-center"
                                    initial={animate ? { opacity: 0, y: 30 } : undefined}
                                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <div className={cn(
                                        "md:px-4",
                                        isLeft ? "md:text-right" : "md:order-3 md:text-left"
                                    )}>
                                        <div className={cn(
                                            "group p-6 rounded-2xl liquid-glass transition-all duration-500 hover:-translate-y-1 hover:shadow-lg",
                                            isLeft ? "md:ml-auto" : "md:mr-auto",
                                            "max-w-md"
                                        )}>
                                            <div className={cn(
                                                "flex items-center gap-3 mb-3",
                                                isLeft ? "md:flex-row-reverse" : ""
                                            )}>
                                                <div className={cn("p-2.5 rounded-xl bg-gradient-to-br text-white shadow-md", step.color)}>
                                                    <step.icon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className={cn("text-[10px] font-extrabold uppercase tracking-widest mb-0.5", step.textColor)}>
                                                        Paso {step.number}
                                                    </p>
                                                    <h3 className="text-sm font-bold uppercase tracking-tight text-foreground">
                                                        {step.title}
                                                    </h3>
                                                </div>
                                            </div>
                                            <p className="text-[11.5px] text-muted-foreground font-medium leading-relaxed mb-3">
                                                {step.description}
                                            </p>
                                            <div className={cn("flex flex-wrap gap-2", isLeft ? "md:justify-end" : "")}>
                                                {step.details.map((d, j) => (
                                                    <span key={j} className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/70">
                                                        <CheckCircle2 className={cn("h-2.5 w-2.5", step.textColor)} />
                                                        {d}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex flex-col items-center order-2 relative z-10">
                                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-extrabold shadow-lg bg-gradient-to-br", step.color)}>
                                            {step.number}
                                        </div>
                                    </div>

                                    <div className={cn(
                                        "hidden md:block md:px-4",
                                        isLeft ? "md:order-3" : "md:order-1"
                                    )} />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <motion.div
                    className="mt-16 flex flex-col items-center gap-4"
                    initial={animate ? { opacity: 0, y: 15 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <Link href="/register" className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl kyron-gradient-bg text-white text-xs font-bold uppercase tracking-widest shadow-kyron hover:shadow-[0_12px_40px_-8px_rgba(14,165,233,0.3)] hover:scale-[1.02] transition-all duration-500">
                        Comenzar Gratis <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        Sin tarjeta de crédito · Activación instantánea
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
