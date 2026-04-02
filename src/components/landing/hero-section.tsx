'use client';

import { ArrowRight, ShieldCheck, UserPlus, Sparkles, Lock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/use-device-performance';
import { loginOptions } from "@/lib/login-options";
import { cn } from "@/lib/utils";

function FloatingParticles({ reduced }: { reduced?: boolean }) {
    if (reduced) return null;
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-[4]">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0, 0.6, 0],
                    }}
                    transition={{
                        duration: 4 + (i % 4) * 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut",
                    }}
                    style={{
                        width: 2 + (i % 3),
                        height: 2 + (i % 3),
                        left: `${5 + (i * 4.7) % 90}%`,
                        top: `${10 + (i * 7.3) % 80}%`,
                        background: i % 3 === 0
                            ? 'rgba(14,165,233,0.5)'
                            : i % 3 === 1
                                ? 'rgba(59,130,246,0.4)'
                                : 'rgba(34,197,94,0.4)',
                    }}
                />
            ))}
        </div>
    );
}

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
    })
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (delay: number) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
    })
};

export function HeroSection() {
    const t = useTranslations('HeroSection');
    const tHeader = useTranslations('LandingHeader');
    const { tier, config } = useDevicePerformance();

    return (
        <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/landing/hero-bg-light.webp"
                    alt=""
                    fill
                    sizes="100vw"
                    quality={90}
                    className="object-cover dark:opacity-0"
                    priority
                />
                <Image
                    src="/images/landing/hero-bg-dark.webp"
                    alt=""
                    fill
                    sizes="100vw"
                    quality={90}
                    className="object-cover opacity-0 dark:opacity-100"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/95 dark:from-[#020810]/80 dark:via-[#020810]/60 dark:to-[#020810]/95" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-white/50 dark:from-[#020810]/50 dark:via-transparent dark:to-[#020810]/50" />
            </div>

            {config.enableBlur && (
                <div className="absolute inset-0 pointer-events-none -z-[5] overflow-hidden">
                    <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full bg-[#0ea5e9]/[0.07] dark:bg-[#0ea5e9]/[0.05] blur-[150px] animate-[pulse_10s_ease-in-out_infinite]" />
                    <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-[#3b82f6]/[0.06] dark:bg-[#3b82f6]/[0.04] blur-[120px] animate-[pulse_12s_ease-in-out_infinite_3s]" />
                    <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-[#22c55e]/[0.05] dark:bg-[#22c55e]/[0.03] blur-[100px] animate-[pulse_8s_ease-in-out_infinite_1s]" />
                </div>
            )}

            <FloatingParticles reduced={tier === 'low'} />

            <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-6xl relative z-10 pt-28 pb-12 sm:pt-32 md:pt-36 lg:pt-20 flex-1 flex items-center w-full">
                <div className="w-full flex flex-col items-center gap-10 lg:gap-14">

                    <div className="text-center space-y-6 max-w-3xl">
                        <motion.div
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full liquid-glass-subtle"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.05}
                        >
                            <span className="kyron-dot animate-pulse" />
                            <span className="text-xs font-semibold uppercase tracking-widest text-foreground/80 dark:text-white/80">{t('badge')}</span>
                        </motion.div>

                        <motion.h1
                            className="text-[clamp(2rem,6vw,4.5rem)] font-black tracking-tight uppercase leading-[1.02]"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.1}
                        >
                            <span className="block text-foreground">{t('title_line1')}</span>
                            <span className="block text-foreground">{t('title_line2')}</span>
                            <span className="block bg-gradient-to-r from-[#0ea5e9] via-[#3b82f6] to-[#22c55e] bg-clip-text text-transparent italic animate-gradient-flow" style={{ backgroundSize: '200% 200%' }}>
                                {t('title_line3')}
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto font-medium leading-relaxed"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.15}
                        >
                            {t('subtitle')}
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row justify-center gap-4 pt-2"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.2}
                        >
                            <Button asChild size="lg" className="relative h-14 px-10 text-xs font-bold uppercase tracking-widest rounded-2xl overflow-hidden group border-0 transition-all duration-500 kyron-gradient-bg text-white shadow-kyron hover:shadow-[0_12px_40px_-8px_rgba(14,165,233,0.4)] hover:scale-[1.02] active:scale-[0.98]">
                                <Link href="/login" className="flex items-center gap-3 justify-center">
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    <ShieldCheck className="h-5 w-5" />
                                    {tHeader('access')}
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                                </Link>
                            </Button>
                            <Button variant="outline" asChild size="lg" className="h-14 px-10 text-xs font-bold uppercase tracking-widest rounded-2xl border-2 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/5 dark:hover:bg-emerald-500/10 hover:shadow-[0_8px_30px_-8px_rgba(16,185,129,0.25)] transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]">
                                <Link href="/register" className="flex items-center gap-3 justify-center">
                                    <UserPlus className="h-5 w-5" />
                                    {tHeader('register')}
                                </Link>
                            </Button>
                        </motion.div>

                        <motion.div
                            className="flex items-center justify-center gap-6 pt-2"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.25}
                        >
                            <div className="flex items-center gap-1.5 text-muted-foreground/50">
                                <Lock className="h-3 w-3" />
                                <span className="text-[10px] font-medium uppercase tracking-wider">AES-256</span>
                            </div>
                            <div className="w-px h-3 bg-border/30" />
                            <div className="flex items-center gap-1.5 text-muted-foreground/50">
                                <ShieldCheck className="h-3 w-3" />
                                <span className="text-[10px] font-medium uppercase tracking-wider">SSL/TLS</span>
                            </div>
                            <div className="w-px h-3 bg-border/30" />
                            <div className="flex items-center gap-1.5 text-muted-foreground/50">
                                <Sparkles className="h-3 w-3" />
                                <span className="text-[10px] font-medium uppercase tracking-wider">IA Integrada</span>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        className="w-full max-w-4xl"
                        variants={scaleIn}
                        initial="hidden"
                        animate="visible"
                        custom={0.3}
                    >
                        <div className="relative">
                            {config.enableBlur && (
                                <div className="absolute -inset-4 rounded-[2rem] opacity-50" style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.1), rgba(59,130,246,0.1), rgba(34,197,94,0.1))', filter: 'blur(40px)' }} />
                            )}

                            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border/20 dark:border-white/10 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_80px_-20px_rgba(0,0,0,0.5)] liquid-glass p-4 sm:p-6">
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0ea5e9]/40 to-transparent" />

                                <div className="mb-4 sm:mb-5">
                                    <div className="flex items-center gap-2.5">
                                        <div className="h-8 w-8 rounded-xl flex items-center justify-center kyron-gradient-bg shadow-md shadow-primary/20">
                                            <Sparkles className="h-4 w-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-foreground tracking-tight">Portales de Acceso</p>
                                            <p className="text-[10px] text-muted-foreground/50 font-medium">Selecciona tu módulo para iniciar sesión</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3">
                                    {loginOptions.map((option, i) => (
                                        <motion.div
                                            key={option.href}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <Link
                                                href={option.href as any}
                                                className="flex items-center gap-3 p-3.5 rounded-xl border border-border/20 dark:border-white/8 bg-background/50 dark:bg-white/[0.03] hover:bg-background/80 dark:hover:bg-white/[0.07] hover:border-border/40 dark:hover:border-white/15 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                                            >
                                                <div className={cn(
                                                    "h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-110 group-hover:shadow-lg transition-all duration-300",
                                                    option.gradient
                                                )}>
                                                    <option.icon className="h-4 w-4" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <span className="text-[12px] font-bold text-foreground/80 group-hover:text-foreground transition-colors block leading-tight">{option.label}</span>
                                                    <p className="text-[10px] text-muted-foreground/40 line-clamp-1 mt-0.5 leading-snug">{option.description}</p>
                                                </div>
                                                <ChevronRight className="h-4 w-4 text-muted-foreground/15 group-hover:text-foreground/30 group-hover:translate-x-0.5 transition-all shrink-0" />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-4 sm:mt-5 pt-4 border-t border-border/10 dark:border-white/5">
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                        <Link
                                            href="/login"
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/[0.06] hover:bg-primary/[0.12] border border-primary/15 hover:border-primary/25 transition-all group"
                                        >
                                            <ShieldCheck className="h-3.5 w-3.5 text-primary/60 group-hover:text-primary transition-colors" />
                                            <span className="text-[11px] font-bold text-primary/70 group-hover:text-primary transition-colors">Ver todos los servicios</span>
                                            <ArrowRight className="h-3 w-3 text-primary/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                                        </Link>
                                        <span className="text-[10px] text-muted-foreground/30 hidden sm:inline">|</span>
                                        <Link
                                            href="/register"
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/[0.06] hover:bg-emerald-500/[0.12] border border-emerald-500/15 hover:border-emerald-500/25 transition-all group"
                                        >
                                            <UserPlus className="h-3.5 w-3.5 text-emerald-500/60 group-hover:text-emerald-500 transition-colors" />
                                            <span className="text-[11px] font-bold text-emerald-500/70 group-hover:text-emerald-500 transition-colors">Crear cuenta nueva</span>
                                            <ArrowRight className="h-3 w-3 text-emerald-500/40 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-[5]" />
        </section>
    );
}
