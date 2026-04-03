'use client';

import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { User, Building2, ArrowRight, ChevronLeft, ShieldCheck, KeyRound, Globe, Signal, Smartphone, Banknote, Gavel, ShoppingCart, Users, Recycle, Sparkles, Lock, Zap, Fingerprint, Shield, Cpu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';
import { motion } from 'framer-motion';
import { useState } from 'react';

const optionKeys = [
  { key: 'personal', href: '/login-personal', icon: User, category: 'citizen', color: 'from-blue-500 to-indigo-600', iconBg: 'bg-blue-500/10', textColor: 'text-blue-600', borderHover: 'hover:border-blue-400/50', shadow: 'hover:shadow-blue-500/8', glow: 'rgba(59,130,246,0.12)' },
  { key: 'lines_personal', href: '/login-linea?type=personal', icon: Smartphone, category: 'citizen', color: 'from-cyan-500 to-blue-600', iconBg: 'bg-cyan-500/10', textColor: 'text-cyan-600', borderHover: 'hover:border-cyan-400/50', shadow: 'hover:shadow-cyan-500/8', glow: 'rgba(6,182,212,0.12)' },
  { key: 'lines_business', href: '/login-linea?type=empresa', icon: Signal, category: 'citizen', color: 'from-amber-500 to-orange-600', iconBg: 'bg-amber-500/10', textColor: 'text-amber-600', borderHover: 'hover:border-amber-400/50', shadow: 'hover:shadow-amber-500/8', glow: 'rgba(245,158,11,0.12)' },
  { key: 'accounting', href: '/login-empresa', icon: Banknote, category: 'corporate', color: 'from-emerald-500 to-teal-600', iconBg: 'bg-emerald-500/10', textColor: 'text-emerald-600', borderHover: 'hover:border-emerald-400/50', shadow: 'hover:shadow-emerald-500/8', glow: 'rgba(16,185,129,0.12)' },
  { key: 'legal', href: '/login-escritorio-juridico', icon: Gavel, category: 'corporate', color: 'from-violet-500 to-purple-600', iconBg: 'bg-violet-500/10', textColor: 'text-violet-600', borderHover: 'hover:border-violet-400/50', shadow: 'hover:shadow-violet-500/8', glow: 'rgba(139,92,246,0.12)' },
  { key: 'invoicing', href: '/login-ventas', icon: ShoppingCart, category: 'corporate', color: 'from-amber-500 to-orange-600', iconBg: 'bg-amber-500/10', textColor: 'text-amber-600', borderHover: 'hover:border-amber-400/50', shadow: 'hover:shadow-amber-500/8', glow: 'rgba(245,158,11,0.12)' },
  { key: 'partners', href: '/login-socios', icon: Users, category: 'corporate', color: 'from-slate-500 to-zinc-600', iconBg: 'bg-slate-500/10', textColor: 'text-slate-600', borderHover: 'hover:border-slate-400/50', shadow: 'hover:shadow-slate-500/8', glow: 'rgba(100,116,139,0.12)' },
  { key: 'sustainability', href: '/login-sostenibilidad', icon: Recycle, category: 'corporate', color: 'from-green-500 to-emerald-600', iconBg: 'bg-green-500/10', textColor: 'text-green-600', borderHover: 'hover:border-green-400/50', shadow: 'hover:shadow-green-500/8', glow: 'rgba(34,197,94,0.12)' },
  { key: 'it', href: '/login-informatica', icon: Cpu, category: 'corporate', color: 'from-cyan-500 to-teal-600', iconBg: 'bg-cyan-500/10', textColor: 'text-cyan-600', borderHover: 'hover:border-cyan-400/50', shadow: 'hover:shadow-cyan-500/8', glow: 'rgba(6,182,212,0.12)' },
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
  const personalOptions = optionKeys.filter(o => o.category === 'citizen');
  const enterpriseOptions = optionKeys.filter(o => o.category === 'corporate');

  return (
    <div className="min-h-screen flex flex-col items-center w-full relative bg-gradient-to-b from-[#eef4fb] via-[#e8f0fe] to-[#dde8f8]">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-blue-400/10 blur-[180px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-emerald-400/10 blur-[160px] animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute top-[50%] left-[0%] w-[400px] h-[400px] rounded-full bg-cyan-400/8 blur-[140px] animate-[pulse_12s_ease-in-out_infinite]" />
        <div className="absolute top-[20%] right-[15%] w-[350px] h-[350px] rounded-full bg-teal-400/8 blur-[130px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="selGrid" width="56" height="100" patternUnits="userSpaceOnUse"><path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66Z" fill="none" stroke="#64748b" strokeWidth="0.5" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#selGrid)"/>
        </svg>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.15, 0.35, 0.15],
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
            style={{
              width: 3 + (i % 4) * 2,
              height: 3 + (i % 4) * 2,
              left: `${8 + i * 12}%`,
              top: `${15 + (i % 5) * 18}%`,
              background: i % 3 === 0
                ? 'linear-gradient(135deg, rgba(14,165,233,0.3), rgba(34,197,94,0.15))'
                : i % 3 === 1
                ? 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(139,92,246,0.15))'
                : 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(6,182,212,0.15))',
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-5xl px-4 md:px-8 py-6">
        <Button variant="ghost" asChild className="rounded-xl h-9 px-3 text-xs text-slate-400 hover:text-slate-700 hover:bg-slate-100 -ml-3">
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
              <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/15 to-cyan-500/15 border border-blue-200/50 flex items-center justify-center backdrop-blur-sm">
                <Logo className="h-10 w-10 relative drop-shadow-lg" />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-300/40 bg-cyan-50 text-cyan-700 text-[10px] font-black uppercase tracking-[0.2em] mb-5 backdrop-blur-sm">
              <Lock className="h-3 w-3" /> {t('badge')}
            </div>
          </motion.div>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-800 leading-[1.1] uppercase"
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
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200/50 flex items-center justify-center">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xs font-black text-slate-800 uppercase tracking-[0.15em]">{t('citizen_portal')}</h2>
              <p className="text-[10px] text-slate-400 mt-0.5">Servicios para ciudadanos</p>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {personalOptions.map((option) => (
              <motion.div key={option.href} variants={itemVariants}>
                <Link href={option.href as any} className="group block">
                  <div
                    className={cn(
                      "relative flex items-center gap-4 p-5 rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-md",
                      "transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                      option.borderHover, option.shadow
                    )}
                    style={{ '--card-glow': option.glow } as React.CSSProperties}
                    onMouseEnter={() => setHoveredKey(option.key)}
                    onMouseLeave={() => setHoveredKey(null)}
                  >
                    <div className={cn(
                      "absolute inset-0 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100",
                    )} style={{ boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.8), 0 8px 40px -12px ${option.glow}` }} />
                    <div className={cn("h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg text-white shrink-0 transition-all group-hover:scale-110 group-hover:shadow-xl duration-300", option.color)}>
                      <option.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0 relative z-10">
                      <p className="text-[13px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{t(`options.${option.key}.label`)}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed line-clamp-2">{t(`options.${option.key}.description`)}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-all shrink-0 relative z-10">
                      <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
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
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 border border-emerald-200/50 flex items-center justify-center">
              <Building2 className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xs font-black text-slate-800 uppercase tracking-[0.15em]">{t('corporate_portals')}</h2>
              <p className="text-[10px] text-slate-400 mt-0.5">Portales empresariales</p>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {enterpriseOptions.map((option) => (
              <motion.div key={option.href} variants={itemVariants}>
                <Link href={option.href as any} className="group block">
                  <div
                    className={cn(
                      "relative flex items-center gap-3.5 p-4 rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-md",
                      "transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                      option.borderHover, option.shadow
                    )}
                    onMouseEnter={() => setHoveredKey(option.key)}
                    onMouseLeave={() => setHoveredKey(null)}
                  >
                    <div className={cn(
                      "absolute inset-0 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100",
                    )} style={{ boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.8), 0 8px 40px -12px ${option.glow}` }} />
                    <div className={cn("h-11 w-11 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md text-white shrink-0 transition-all group-hover:scale-110 group-hover:shadow-lg duration-300", option.color)}>
                      <option.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0 relative z-10">
                      <p className="text-[13px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{t(`options.${option.key}.label`)}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug line-clamp-1">{t(`options.${option.key}.description`)}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0 relative z-10" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.div
          className="rounded-2xl border border-slate-200/80 bg-white/60 backdrop-blur-md p-6 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-cyan-400/[0.06] blur-[60px]" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-cyan-500/10 flex items-center justify-center border border-blue-200/40 shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-800">{t('full_ecosystem')}</p>
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
              <span key={i} className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 rounded-lg border border-slate-200/60 bg-white/40">
                <badge.icon className="h-2.5 w-2.5" />
                {badge.label}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-slate-300 uppercase tracking-[0.3em] font-bold">
            <Globe className="h-3 w-3 inline mr-1.5" />
            {t('footer')}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
