'use client';

import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { User, Building2, ArrowRight, ChevronLeft, ShieldCheck, KeyRound, Lock, Fingerprint, Globe, Server, Zap, Shield, Signal, Banknote, Gavel, ShoppingCart, Users, Recycle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const optionKeys = [
  { key: 'personal', href: '/login-personal', icon: User, category: 'citizen', color: 'from-blue-500 to-indigo-600', iconBg: 'bg-blue-500', ring: 'hover:ring-blue-500/20' },
  { key: 'lines', href: '/login-linea', icon: Signal, category: 'citizen', color: 'from-cyan-500 to-blue-600', iconBg: 'bg-cyan-500', ring: 'hover:ring-cyan-500/20' },
  { key: 'accounting', href: '/login-empresa', icon: Banknote, category: 'corporate', color: 'from-emerald-500 to-teal-600', iconBg: 'bg-emerald-500', ring: 'hover:ring-emerald-500/20' },
  { key: 'legal', href: '/login-escritorio-juridico', icon: Gavel, category: 'corporate', color: 'from-violet-500 to-purple-600', iconBg: 'bg-violet-500', ring: 'hover:ring-violet-500/20' },
  { key: 'invoicing', href: '/login-ventas', icon: ShoppingCart, category: 'corporate', color: 'from-amber-500 to-orange-600', iconBg: 'bg-amber-500', ring: 'hover:ring-amber-500/20' },
  { key: 'partners', href: '/login-socios', icon: Users, category: 'corporate', color: 'from-slate-500 to-zinc-600', iconBg: 'bg-slate-500', ring: 'hover:ring-slate-500/20' },
  { key: 'sustainability', href: '/login-sostenibilidad', icon: Recycle, category: 'corporate', color: 'from-green-500 to-emerald-600', iconBg: 'bg-green-500', ring: 'hover:ring-green-500/20' },
];

export default function LoginSelectionPage() {
  const t = useTranslations('LoginPage');

  const personalOptions = optionKeys.filter(o => o.category === 'citizen');
  const enterpriseOptions = optionKeys.filter(o => o.category === 'corporate');

  return (
    <div className="min-h-screen flex flex-col items-center w-full relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/[0.03] to-transparent" />
        <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full bg-primary/[0.04] blur-[120px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.015]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="selGrid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#selGrid)"/>
        </svg>
      </div>

      <div className="w-full max-w-4xl px-4 md:px-8 py-6">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Button variant="ghost" asChild className="rounded-xl h-9 px-3 text-xs text-muted-foreground hover:text-foreground -ml-3">
            <Link href="/" className="flex items-center"><ChevronLeft className="mr-1.5 h-4 w-4" /> {t('back')}</Link>
          </Button>
        </motion.div>
      </div>

      <div className="w-full max-w-4xl px-4 md:px-8 pb-12">
        <motion.header
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/15 bg-primary/[0.04] text-primary text-[11px] font-semibold mb-6 backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5" /> {t('badge')}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-foreground leading-[1.1]">
            {t('title')}{' '}
            <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">{t('title_highlight')}</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.header>

        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-7 w-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <User className="h-3.5 w-3.5 text-blue-500" />
            </div>
            <h2 className="text-sm font-bold text-foreground">{t('citizen_portal')}</h2>
            <div className="h-px flex-1 bg-border/40" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {personalOptions.map((option, i) => (
              <motion.div
                key={option.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.06 }}
              >
                <Link href={option.href as any} className="group block">
                  <div className={cn(
                    "relative flex items-center gap-4 p-5 rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm",
                    "transition-all duration-300 hover:shadow-xl hover:shadow-black/[0.03] hover:border-border/60 hover:-translate-y-0.5",
                    "ring-0 hover:ring-4", option.ring
                  )}>
                    <div className={cn("h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg text-white shrink-0 transition-transform group-hover:scale-110 duration-300", option.color)}>
                      <option.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{t(`options.${option.key}.label`)}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{t(`options.${option.key}.description`)}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-7 w-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Building2 className="h-3.5 w-3.5 text-emerald-500" />
            </div>
            <h2 className="text-sm font-bold text-foreground">{t('corporate_portals')}</h2>
            <div className="h-px flex-1 bg-border/40" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {enterpriseOptions.map((option, i) => (
              <motion.div
                key={option.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
              >
                <Link href={option.href as any} className="group block">
                  <div className={cn(
                    "relative flex items-center gap-3.5 p-4 rounded-2xl border border-border/40 bg-card/80 backdrop-blur-sm",
                    "transition-all duration-300 hover:shadow-xl hover:shadow-black/[0.03] hover:border-border/60 hover:-translate-y-0.5",
                    "ring-0 hover:ring-4", option.ring
                  )}>
                    <div className={cn("h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md text-white shrink-0 transition-transform group-hover:scale-110 duration-300", option.color)}>
                      <option.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{t(`options.${option.key}.label`)}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug line-clamp-1">{t(`options.${option.key}.description`)}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm p-5 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-cyan-500/10 flex items-center justify-center border border-primary/10">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">{t('full_ecosystem')}</p>
                <p className="text-[11px] text-muted-foreground">{t('ecosystem_desc')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/recuperar-cuenta" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                <KeyRound className="h-3.5 w-3.5" /> {t('recover_account')}
              </Link>
              <Link href="/register">
                <Button size="sm" className="rounded-xl text-xs font-bold px-5 shadow-md hover:shadow-lg transition-all">
                  <User className="mr-2 h-3.5 w-3.5" /> {t('create_account')}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="text-center space-y-3 pb-4"
        >
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {["VEN-NIF", "SENIAT", "IGTF 3%", "LOTTT"].map((badge, i) => (
              <span key={i} className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/40 px-2.5 py-1 rounded-lg border border-border/20 bg-muted/20">
                {badge}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground/30 uppercase tracking-widest font-semibold">
            <Globe className="h-3 w-3 inline mr-1.5" />
            {t('footer')}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
