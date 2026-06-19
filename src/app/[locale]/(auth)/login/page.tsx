'use client';

import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { User, Building2, ArrowRight, ChevronLeft, Globe, Signal, Smartphone, Landmark, Gavel, Users, Recycle, Sparkles, Lock, Cpu, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/logo';
import { ModuleLogo } from '@/components/module-logo';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from '@/navigation';
import { useAuth } from '@/lib/auth/context';
import { MODULE_PATH_MAP } from '@/lib/module-paths';

const optionKeys = [
  { key: 'personal', href: '/login-personal', icon: User, category: 'citizen', color: 'from-blue-500 to-indigo-600', iconBg: 'bg-blue-500/10', textColor: 'text-blue-600', borderHover: 'hover:border-blue-400/50', shadow: 'hover:shadow-blue-500/10', glow: 'rgba(59,130,246,0.18)' },
  { key: 'lines_personal', href: '/login-linea?type=personal', icon: Smartphone, category: 'citizen', color: 'from-cyan-500 to-blue-600', iconBg: 'bg-cyan-500/10', textColor: 'text-cyan-600', borderHover: 'hover:border-cyan-400/50', shadow: 'hover:shadow-cyan-500/10', glow: 'rgba(6,182,212,0.18)' },
  { key: 'lines_business', href: '/login-linea?type=empresa', icon: Signal, category: 'citizen', color: 'from-amber-500 to-orange-600', iconBg: 'bg-amber-500/10', textColor: 'text-amber-600', borderHover: 'hover:border-amber-400/50', shadow: 'hover:shadow-amber-500/10', glow: 'rgba(245,158,11,0.18)' },
  { key: 'accounting', href: '/login-empresa', icon: Landmark, category: 'corporate', color: 'from-emerald-500 to-teal-600', iconBg: 'bg-emerald-500/10', textColor: 'text-emerald-600', borderHover: 'hover:border-emerald-400/50', shadow: 'hover:shadow-emerald-500/10', glow: 'rgba(16,185,129,0.18)' },
  { key: 'legal', href: '/login-escritorio-juridico', icon: Gavel, category: 'corporate', color: 'from-violet-500 to-purple-600', iconBg: 'bg-violet-500/10', textColor: 'text-violet-600', borderHover: 'hover:border-violet-400/50', shadow: 'hover:shadow-violet-500/10', glow: 'rgba(139,92,246,0.18)' },
  { key: 'partners', href: '/login-socios', icon: Users, category: 'corporate', color: 'from-slate-500 to-zinc-600', iconBg: 'bg-slate-500/10', textColor: 'text-slate-600', borderHover: 'hover:border-slate-400/50', shadow: 'hover:shadow-slate-500/10', glow: 'rgba(100,116,139,0.18)' },
  { key: 'sustainability', href: '/login-sostenibilidad', icon: Recycle, category: 'corporate', color: 'from-green-500 to-emerald-600', iconBg: 'bg-green-500/10', textColor: 'text-green-600', borderHover: 'hover:border-green-400/50', shadow: 'hover:shadow-green-500/10', glow: 'rgba(34,197,94,0.18)' },
  { key: 'it', href: '/login-informatica', icon: Cpu, category: 'corporate', color: 'from-cyan-500 to-teal-600', iconBg: 'bg-cyan-500/10', textColor: 'text-cyan-600', borderHover: 'hover:border-cyan-400/50', shadow: 'hover:shadow-cyan-500/10', glow: 'rgba(6,182,212,0.18)' },
];

export default function LoginSelectionPage() {
  const t = useTranslations('LoginPage');
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const handleNavClick = useCallback((href: string) => setNavigatingTo(href), []);

  useEffect(() => {
    if (authLoading || !user?.modules || user.modules.length === 0) return;
    for (const mod of user.modules) {
      const p = MODULE_PATH_MAP[mod];
      if (p) { router.replace(p as any); return; }
    }
  }, [user, authLoading, router]);

  const personalOptions = optionKeys.filter(o => o.category === 'citizen');
  const enterpriseOptions = optionKeys.filter(o => o.category === 'corporate');

  return (
    <div className="min-h-screen flex flex-col items-center w-full relative bg-background overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background/95 to-background" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/4 blur-[180px] rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl px-6 py-6 flex justify-between items-center relative z-20">
        <Button variant="ghost" asChild className="rounded-full h-10 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 hover:text-foreground hover:bg-muted transition-all">
          <Link href="/" className="flex items-center"><ChevronLeft className="mr-2 h-4 w-4" /> {t('back')}</Link>
        </Button>
      </div>

      <motion.div
        className="w-full max-w-6xl px-6 pb-20 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <header className="text-center mb-16 md:mb-24">
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          >
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-blue-600/20">
              <Logo className="h-12 w-12 brightness-0 invert" />
            </div>
          </motion.div>
          
          <div className="space-y-4">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-2"
            >
                <Lock className="h-3 w-3" /> {t('badge')}
            </motion.div>
            <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black tracking-tight leading-[0.9] text-foreground uppercase font-outfit">
                {t('title')}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-accent">
                    {t('title_highlight')}
                </span>
            </h1>
            <p className="text-[10px] font-bold text-muted-foreground/60 max-w-xl mx-auto uppercase tracking-[0.4em] font-outfit">
                {t('subtitle')}
            </p>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* PORTAL CIUDADANO - Left Side / Main focus */}
            <div className="lg:col-span-5 space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                        </div>
                        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t('citizen_portal')}</h2>
                </div>

                <div className="grid gap-4">
                    {personalOptions.map((o, i) => (
                        <motion.div 
                            key={o.key}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + (i * 0.1) }}
                        >
                            <Link href={o.href as any} className="group block" onClick={() => handleNavClick(o.href)}>
                                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:bg-card/80 transition-all duration-300 flex items-center gap-6 shadow-lg">
                                     <div className="h-14 w-14 rounded-xl flex items-center justify-center shadow-lg shrink-0 transition-all duration-300 overflow-hidden">
                                         {navigatingTo === o.href ? <Loader2 className="h-6 w-6 animate-spin text-white" /> : <ModuleLogo src={o.logo} alt={o.key} size="md" />}
                                     </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-foreground tracking-tight">{t(`options.${o.key}.label`)}</h3>
                                        <p className="text-[11px] text-muted-foreground mt-0.5">{t(`options.${o.key}.description`)}</p>
                                    </div>
                                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all text-muted-foreground/60">
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* PORTAL CORPORATIVO - Right Side / Grid of modules */}
            <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t('corporate_portals')}</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    {enterpriseOptions.map((option, i) => (
                        <motion.div 
                            key={option.key}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + (i * 0.05) }}
                        >
                            <Link href={option.href as any} className="group block" onClick={() => handleNavClick(option.href)}>
                                <div className="p-4 rounded-xl bg-card border border-border hover:border-accent/30 hover:bg-card/80 transition-all duration-300 flex items-center gap-4 shadow-lg">
                                     <div className="h-10 w-10 rounded-lg flex items-center justify-center shadow-md shrink-0 transition-all duration-300 overflow-hidden">
                                         {navigatingTo === option.href ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : <ModuleLogo src={option.logo} alt={option.key} size="sm" />}
                                     </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold text-foreground">{t(`options.${option.key}.label`)}</h4>
                                        <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{t(`options.${option.key}.description`)}</p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Final CTA Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="p-6 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Sparkles className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-base font-bold text-foreground">{t('full_ecosystem')}</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">{t('ecosystem_desc')}</p>
                            </div>
                        </div>
                        <Button asChild className="h-11 px-6 rounded-xl font-bold text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                            <Link href="/register">Crear Cuenta <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>

        <footer className="mt-24 pt-12 border-t border-border/30 flex flex-col items-center gap-8">
            <div className="flex items-center justify-center gap-4 flex-wrap opacity-30 hover:opacity-60 transition-all duration-500">
                {["VEN-NIF", "SENIAT", "IGTF 3.0", "LOTTT", "SAPI", "SUDEBAN"].map((badge) => (
                    <div key={badge} className="px-4 py-1.5 rounded-lg bg-muted border border-border text-[10px] font-bold tracking-wider text-muted-foreground/60">
                        {badge}
                    </div>
                ))}
            </div>
            <p className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-[0.5em] flex items-center gap-4">
                <Globe className="h-3 w-3" /> Protocolo de Seguridad Kyron Shield v2026.04
            </p>
        </footer>
      </motion.div>
    </div>
  );
}
