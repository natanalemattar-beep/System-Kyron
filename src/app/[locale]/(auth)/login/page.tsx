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
    <div className="min-h-screen flex flex-col items-center w-full relative bg-[#050816] overflow-hidden">
      {/* Deep Space / HUD Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full animate-pulse" />
        
        {/* Animated Scanline */}
        <motion.div 
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[1px] bg-cyan-500/10 z-10 pointer-events-none"
        />

        {/* Dynamic Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-cyan-400/30"
              style={{
                width: 2 + (i % 3),
                height: 2 + (i % 3),
                left: `${5 + (i * 4)}%`,
                top: `${(i % 10) * 10}%`,
              }}
              animate={{
                y: [0, -60, -120],
                opacity: [0, 0.8, 0],
                x: [0, i % 2 === 0 ? 20 : -20],
              }}
              transition={{
                duration: 6 + (i % 4) * 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 hud-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050816]/50 to-[#050816]" />
      </div>

      <div className="w-full max-w-5xl px-4 md:px-8 py-6">
        <Button variant="ghost" asChild className="rounded-xl h-9 px-3 text-xs text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-200 dark:hover:bg-slate-800 -ml-3">
          <Link href="/" className="flex items-center"><ChevronLeft className="mr-1.5 h-4 w-4" /> {t('back')}</Link>
        </Button>
      </div>

      <motion.div
        className="w-full max-w-5xl px-4 md:px-8 pb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className="text-center mb-12 md:mb-16">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/15 blur-2xl rounded-full scale-150 animate-pulse" />
              <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/15 to-cyan-500/15 border border-blue-200/50 dark:border-blue-700/50 flex items-center justify-center backdrop-blur-sm">
                <Logo className="h-10 w-10 relative drop-shadow-lg" />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-300/40 dark:border-cyan-700/40 bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 text-[10px] font-semibold uppercase tracking-wide mb-5 backdrop-blur-sm">
              <Lock className="h-3 w-3" /> {t('badge')}
            </div>
          </motion.div>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-800 dark:text-slate-100 leading-[1.1] uppercase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {t('title')}{' '}
            <span className="bg-gradient-to-r from-primary via-cyan-500 to-emerald-500 bg-clip-text text-transparent">{t('title_highlight')}</span>
          </motion.h1>
          <motion.p
            className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {t('subtitle')}
          </motion.p>
        </header>

        <motion.section
          className="mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 border border-blue-200/50 dark:border-blue-700/50 flex items-center justify-center">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-[0.15em]">{t('citizen_portal')}</h2>
              <p className="text-[10px] text-slate-400 mt-0.5">Servicios para ciudadanos</p>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-700 to-transparent dark:to-transparent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {personalOptions.map((o) => (
              <motion.div variants={itemVariants} key={o.key}>
                <Link href={o.href as any} className="group block" onClick={() => setNavigatingTo(o.href)}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setHoveredKey(o.key)}
                    onHoverEnd={() => setHoveredKey(null)}
                    className={cn(
                      "relative flex items-center gap-4 p-5 rounded-[1.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl transition-all duration-500 overflow-hidden",
                      "hover:bg-white/[0.05] hover:border-white/10",
                      o.borderHover
                    )}
                  >
                    {hoveredKey === o.key && (
                      <motion.div
                        layoutId="glow"
                        className="absolute inset-0 z-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, background: `radial-gradient(150px circle at 50% 50%, ${o.glow}, transparent)` }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                    
                    <div className={cn("h-14 w-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg text-white shrink-0 transition-transform group-hover:scale-110 duration-500 relative z-10", o.color)}>
                      {navigatingTo === o.href ? <Loader2 className="h-6 w-6 animate-spin" /> : <o.icon className="h-6 w-6" />}
                    </div>
                    <div className="flex-1 min-w-0 relative z-10">
                      <p className="text-base font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors uppercase">{t(`options.${o.key}.label`)}</p>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed line-clamp-2 uppercase tracking-wider font-medium">{t(`options.${o.key}.description`)}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/20 transition-all shrink-0 relative z-10">
                      <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 border border-emerald-200/50 dark:border-emerald-700/50 flex items-center justify-center">
              <Building2 className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-[0.15em]">{t('corporate_portals')}</h2>
              <p className="text-[10px] text-slate-400 mt-0.5">Portales empresariales</p>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-700 to-transparent dark:to-transparent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {enterpriseOptions.map((option) => (
              <motion.div key={option.href} variants={itemVariants}>
                <Link href={option.href as any} className="group block" onClick={() => setNavigatingTo(option.href)}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "relative flex items-center gap-4 p-5 rounded-[1.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl transition-all duration-500 overflow-hidden",
                      "hover:bg-white/[0.05] hover:border-white/10",
                      option.borderHover
                    )}
                  >
                    {/* HUD corner accent */}
                    <div className="absolute top-0 right-0 w-6 h-6 pointer-events-none opacity-10 group-hover:opacity-60">
                      <div className="absolute top-2 right-2 w-1 h-1 bg-cyan-500/40 rounded-full" />
                      <div className="absolute top-2 right-2 w-[1px] h-2 bg-cyan-500/20" />
                      <div className="absolute top-2 right-2 w-2 h-[1px] bg-cyan-500/20" />
                    </div>

                    <div className={cn("h-11 w-11 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md text-white shrink-0 transition-transform group-hover:scale-110 duration-500", option.color)}>
                      {navigatingTo === option.href ? <Loader2 className="h-4 w-4 animate-spin" /> : <option.icon className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0 relative z-10">
                      <p className="text-sm font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors uppercase">{t(`options.${option.key}.label`)}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-snug line-clamp-1 uppercase tracking-widest font-bold">{t(`options.${option.key}.description`)}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0 relative z-10" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.div
          className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md p-6 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-cyan-400/[0.06] blur-[60px]" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-cyan-500/10 flex items-center justify-center border border-blue-200/40 dark:border-blue-700/40 shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-800 dark:text-slate-100">{t('full_ecosystem')}</p>
                <p className="text-[11px] text-slate-400">{t('ecosystem_desc')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/recuperar-cuenta" className="text-xs text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1.5">
                <KeyRound className="h-3.5 w-3.5" /> {t('recover_account')}
              </Link>
              <Link href="/register">
                <Button size="sm" className="rounded-xl text-xs font-bold px-6 shadow-md hover:shadow-lg transition-all h-10 bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-500">
                  <User className="mr-2 h-3.5 w-3.5" /> {t('create_account')}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center space-y-4 pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {[
              { label: "VEN-NIF", icon: ShieldCheck },
              { label: "SENIAT", icon: ShieldCheck },
              { label: "IGTF 3%", icon: ShieldCheck },
              { label: "LOTTT", icon: ShieldCheck },
            ].map((badge, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60 bg-white/40 dark:bg-slate-800/40">
                <badge.icon className="h-2.5 w-2.5" />
                {badge.label}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-slate-300 dark:text-slate-500 uppercase tracking-wide font-bold">
            <Globe className="h-3 w-3 inline mr-1.5" />
            {t('footer')}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
