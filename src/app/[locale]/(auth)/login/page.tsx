'use client';

import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { User, Building2, ArrowRight, ChevronLeft, ShieldCheck, KeyRound, Globe, Signal, Smartphone, Banknote, Gavel, ShoppingCart, Users, Recycle, Sparkles, Lock, Zap, Fingerprint, Shield, Cpu, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';
import { motion } from 'framer-motion';
import { useState } from 'react';

const optionKeys = [
  { key: 'personal', href: '/login-personal', icon: User, category: 'citizen', color: 'from-blue-500 to-indigo-600', iconBg: 'bg-blue-500/10', textColor: 'text-blue-600', borderHover: 'hover:border-blue-400/50', shadow: 'hover:shadow-blue-500/10', glow: 'rgba(59,130,246,0.18)' },
  { key: 'lines_personal', href: '/login-linea?type=personal', icon: Smartphone, category: 'citizen', color: 'from-cyan-500 to-blue-600', iconBg: 'bg-cyan-500/10', textColor: 'text-cyan-600', borderHover: 'hover:border-cyan-400/50', shadow: 'hover:shadow-cyan-500/10', glow: 'rgba(6,182,212,0.18)' },
  { key: 'lines_business', href: '/login-linea?type=empresa', icon: Signal, category: 'citizen', color: 'from-amber-500 to-orange-600', iconBg: 'bg-amber-500/10', textColor: 'text-amber-600', borderHover: 'hover:border-amber-400/50', shadow: 'hover:shadow-amber-500/10', glow: 'rgba(245,158,11,0.18)' },
  { key: 'accounting', href: '/login-empresa', icon: Banknote, category: 'corporate', color: 'from-emerald-500 to-teal-600', iconBg: 'bg-emerald-500/10', textColor: 'text-emerald-600', borderHover: 'hover:border-emerald-400/50', shadow: 'hover:shadow-emerald-500/10', glow: 'rgba(16,185,129,0.18)' },
  { key: 'legal', href: '/login-escritorio-juridico', icon: Gavel, category: 'corporate', color: 'from-violet-500 to-purple-600', iconBg: 'bg-violet-500/10', textColor: 'text-violet-600', borderHover: 'hover:border-violet-400/50', shadow: 'hover:shadow-violet-500/10', glow: 'rgba(139,92,246,0.18)' },
  { key: 'invoicing', href: '/login-ventas', icon: ShoppingCart, category: 'corporate', color: 'from-amber-500 to-orange-600', iconBg: 'bg-amber-500/10', textColor: 'text-amber-600', borderHover: 'hover:border-amber-400/50', shadow: 'hover:shadow-amber-500/10', glow: 'rgba(245,158,11,0.18)' },
  { key: 'partners', href: '/login-socios', icon: Users, category: 'corporate', color: 'from-slate-500 to-zinc-600', iconBg: 'bg-slate-500/10', textColor: 'text-slate-600', borderHover: 'hover:border-slate-400/50', shadow: 'hover:shadow-slate-500/10', glow: 'rgba(100,116,139,0.18)' },
  { key: 'sustainability', href: '/login-sostenibilidad', icon: Recycle, category: 'corporate', color: 'from-green-500 to-emerald-600', iconBg: 'bg-green-500/10', textColor: 'text-green-600', borderHover: 'hover:border-green-400/50', shadow: 'hover:shadow-green-500/10', glow: 'rgba(34,197,94,0.18)' },
  { key: 'it', href: '/login-informatica', icon: Cpu, category: 'corporate', color: 'from-cyan-500 to-teal-600', iconBg: 'bg-cyan-500/10', textColor: 'text-cyan-600', borderHover: 'hover:border-cyan-400/50', shadow: 'hover:shadow-cyan-500/10', glow: 'rgba(6,182,212,0.18)' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

export default function LoginSelectionPage() {
  const t = useTranslations('LoginPage');
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);
  const personalOptions = optionKeys.filter(o => o.category === 'citizen');
  const enterpriseOptions = optionKeys.filter(o => o.category === 'corporate');

  return (
    <div className="min-h-screen flex flex-col items-center w-full relative bg-[#02040a] overflow-hidden">
      {/* Hyper-Space / HUD Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-600/10 blur-[180px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-emerald-600/5 blur-[180px] rounded-full animate-pulse" />
        
        {/* Animated HUD Grid */}
        <div className="absolute inset-0 bg-[url('/images/grid-bg.png')] bg-repeat opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02040a]/80 to-[#02040a]" />

        {/* Scanning Line */}
        <motion.div 
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent z-10 pointer-events-none"
        />
      </div>

      <div className="w-full max-w-6xl px-6 py-6 flex justify-between items-center relative z-20">
        <Button variant="ghost" asChild className="rounded-full h-10 px-4 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white hover:bg-white/5 transition-all">
          <Link href="/" className="flex items-center"><ChevronLeft className="mr-2 h-4 w-4" /> {t('back')}</Link>
        </Button>
        <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">Servidores Operativos</span>
        </div>
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
            <div className="relative group">
              <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full scale-150 animate-kyron-breathe" />
              <div className="relative h-20 w-20 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                <Logo className="h-12 w-12 relative drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
              </div>
            </div>
          </motion.div>
          
          <div className="space-y-4">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/5 bg-white/[0.02] text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-md mb-2"
            >
                <Lock className="h-3 w-3" /> {t('badge')}
            </motion.div>
            <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black tracking-tight leading-[0.9] text-white uppercase font-outfit">
                {t('title')}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 text-glow-cyan">
                    {t('title_highlight')}
                </span>
            </h1>
            <p className="text-[10px] font-bold text-white/40 max-w-xl mx-auto uppercase tracking-[0.4em] font-outfit">
                {t('subtitle')}
            </p>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* PORTAL CIUDADANO - Left Side / Main focus */}
            <div className="lg:col-span-5 space-y-8">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                        <User className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xs font-black text-white uppercase tracking-[0.3em]">{t('citizen_portal')}</h2>
                        <div className="h-[1px] w-full bg-gradient-to-r from-blue-500/30 to-transparent mt-2" />
                    </div>
                </div>

                <div className="grid gap-4">
                    {personalOptions.map((o, i) => (
                        <motion.div 
                            key={o.key}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + (i * 0.1) }}
                        >
                            <Link href={o.href as any} className="group block" onClick={() => setNavigatingTo(o.href)}>
                                <div className="glass-system-kyron-interactive p-8 rounded-[2.5rem] flex items-center gap-8 relative overflow-hidden">
                                    <div className={cn("h-16 w-16 rounded-[1.5rem] bg-gradient-to-br flex items-center justify-center shadow-xl text-white shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500", o.color)}>
                                        {navigatingTo === o.href ? <Loader2 className="h-7 w-7 animate-spin" /> : <o.icon className="h-7 w-7" />}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h3 className="text-2xl font-black text-white tracking-tighter uppercase group-hover:text-cyan-400 transition-colors">{t(`options.${o.key}.label`)}</h3>
                                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] leading-relaxed line-clamp-1">{t(`options.${o.key}.description`)}</p>
                                    </div>
                                    <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-all">
                                        <ArrowRight className="h-5 w-5 text-white/20 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* PORTAL CORPORATIVO - Right Side / Grid of modules */}
            <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                        <Building2 className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xs font-black text-white uppercase tracking-[0.3em]">{t('corporate_portals')}</h2>
                        <div className="h-[1px] w-full bg-gradient-to-r from-emerald-500/30 to-transparent mt-2" />
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    {enterpriseOptions.map((option, i) => (
                        <motion.div 
                            key={option.key}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + (i * 0.05) }}
                        >
                            <Link href={option.href as any} className="group block" onClick={() => setNavigatingTo(option.href)}>
                                <div className="glass-system-kyron-interactive p-6 rounded-[2rem] flex items-center gap-5">
                                    <div className={cn("h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg text-white shrink-0 group-hover:scale-110 transition-all duration-500", option.color)}>
                                        {navigatingTo === option.href ? <Loader2 className="h-5 w-5 animate-spin" /> : <option.icon className="h-5 w-5" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">{t(`options.${option.key}.label`)}</h4>
                                        <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-0.5 line-clamp-1">{t(`options.${option.key}.description`)}</p>
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
                    className="p-8 rounded-[2.5rem] bg-gradient-to-r from-primary/10 to-cyan-500/5 border border-white/5 relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <div className="h-16 w-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center border border-white/10 shadow-2xl group-hover:rotate-6 transition-transform">
                                <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-white uppercase tracking-tighter font-outfit">{t('full_ecosystem')}</h4>
                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mt-1">{t('ecosystem_desc')}</p>
                            </div>
                        </div>
                        <Button asChild className="h-14 px-10 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] bg-white text-black hover:bg-cyan-400 transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
                            <Link href="/register">Crear Cuenta <ArrowRight className="ml-3 h-4 w-4" /></Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>

        <footer className="mt-24 pt-12 border-t border-white/[0.03] flex flex-col items-center gap-8">
            <div className="flex items-center justify-center gap-4 flex-wrap opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                {["VEN-NIF", "SENIAT", "IGTF 3.0", "LOTTT", "SAPI", "SUDEBAN"].map((badge) => (
                    <div key={badge} className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white">
                        {badge}
                    </div>
                ))}
            </div>
            <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.5em] flex items-center gap-4">
                <Globe className="h-3 w-3" /> Protocolo de Seguridad Kyron Shield v2026.04
            </p>
        </footer>
      </motion.div>
    </div>
  );
}
