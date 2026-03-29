'use client';

import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { User, Building2, ArrowRight, ChevronLeft, ShieldCheck, KeyRound, Lock, Fingerprint, Globe, Server, Zap, Shield, Signal, Banknote, Gavel, ShoppingCart, Users, Recycle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const optionKeys = [
  { key: 'personal', href: '/login-personal', icon: User, category: 'citizen', gradient: 'from-blue-600 to-indigo-700', glow: 'group-hover:shadow-blue-500/25' },
  { key: 'lines', href: '/login-linea', icon: Signal, category: 'citizen', gradient: 'from-cyan-600 to-blue-700', glow: 'group-hover:shadow-cyan-500/25' },
  { key: 'accounting', href: '/login-empresa', icon: Banknote, category: 'corporate', gradient: 'from-emerald-600 to-teal-700', glow: 'group-hover:shadow-emerald-500/20' },
  { key: 'legal', href: '/login-escritorio-juridico', icon: Gavel, category: 'corporate', gradient: 'from-purple-700 to-violet-800', glow: 'group-hover:shadow-purple-500/20' },
  { key: 'invoicing', href: '/login-ventas', icon: ShoppingCart, category: 'corporate', gradient: 'from-amber-600 to-orange-700', glow: 'group-hover:shadow-amber-500/20' },
  { key: 'partners', href: '/login-socios', icon: Users, category: 'corporate', gradient: 'from-slate-700 to-zinc-800', glow: 'group-hover:shadow-slate-500/20' },
  { key: 'sustainability', href: '/login-sostenibilidad', icon: Recycle, category: 'corporate', gradient: 'from-green-600 to-emerald-700', glow: 'group-hover:shadow-green-500/20' },
];

export default function LoginSelectionPage() {
  const t = useTranslations('LoginPage');

  const personalOptions = optionKeys.filter(o => o.category === 'citizen');
  const enterpriseOptions = optionKeys.filter(o => o.category === 'corporate');

  const securityBadges = [
    { icon: Lock, textKey: 'e2e' as const },
    { icon: Fingerprint, textKey: 'biometrics' as const },
    { icon: Shield, textKey: 'two_fa' as const },
    { icon: Server, textKey: 'uptime' as const },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 w-full relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[150px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/6 blur-[130px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/3 blur-[200px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,hsl(var(--background))_70%)]" />
      </div>

      <div className="w-full max-w-5xl">
        <div className="mb-6">
          <Button variant="ghost" asChild className="rounded-xl h-9 px-3 text-xs text-muted-foreground hover:text-foreground">
            <Link href="/" className="flex items-center"><ChevronLeft className="mr-1.5 h-4 w-4" /> {t('back')}</Link>
          </Button>
        </div>

        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold mb-5">
            <ShieldCheck className="h-3.5 w-3.5" /> {t('badge')}
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3 text-foreground">
            {t('title')} <span className="text-primary italic">{t('title_highlight')}</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-lg mx-auto">
            {t('subtitle')}
          </p>
        </header>

        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-10 flex-wrap">
          {securityBadges.map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 text-muted-foreground/50">
              <item.icon className="h-3 w-3" />
              <span className="text-[9px] font-bold uppercase tracking-widest">{t(item.textKey)}</span>
            </div>
          ))}
        </div>

        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-border/50" />
            <h2 className="text-xs font-bold text-muted-foreground flex items-center gap-2">
              <User className="h-3.5 w-3.5" /> {t('citizen_portal')}
            </h2>
            <div className="h-px flex-1 bg-border/50" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personalOptions.map((option) => (
              <Link key={option.href} href={option.href as any} className="group block">
                <div className={cn("flex items-center gap-4 p-5 rounded-2xl border border-border/50 bg-card hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-xl", option.glow)}>
                  <div className={cn("p-3 rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform group-hover:scale-110 duration-300", option.gradient)}>
                    <option.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{t(`options.${option.key}.label`)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{t(`options.${option.key}.description`)}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-border/50" />
            <h2 className="text-xs font-bold text-muted-foreground flex items-center gap-2">
              <Building2 className="h-3.5 w-3.5" /> {t('corporate_portals')}
            </h2>
            <div className="h-px flex-1 bg-border/50" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enterpriseOptions.map((option) => (
              <Link key={option.href} href={option.href as any} className="group block">
                <div className={cn("flex items-center gap-4 p-5 rounded-2xl border border-border/50 bg-card hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-xl", option.glow)}>
                  <div className={cn("p-3 rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform group-hover:scale-110 duration-300", option.gradient)}>
                    <option.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{t(`options.${option.key}.label`)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug line-clamp-1">{t(`options.${option.key}.description`)}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="rounded-2xl border border-primary/10 bg-gradient-to-r from-primary/5 via-transparent to-cyan-500/5 p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/70">{t('full_ecosystem')}</p>
                <p className="text-[9px] text-muted-foreground">{t('ecosystem_desc')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/recuperar-cuenta" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                <KeyRound className="h-3.5 w-3.5" /> {t('recover_account')}
              </Link>
              <Link href="/register">
                <Button size="sm" className="rounded-xl text-[9px] font-black uppercase tracking-widest px-5 shadow-lg hover:shadow-xl transition-all">
                  <User className="mr-2 h-3.5 w-3.5" /> {t('create_account')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center space-y-2 pb-4">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {["VEN-NIF", "SENIAT", "IGTF 3%", "LOTTT"].map((badge, i) => (
              <span key={i} className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/40 px-2 py-0.5 rounded-full border border-border/20">
                {badge}
              </span>
            ))}
          </div>
          <p className="text-[9px] text-muted-foreground/40 uppercase tracking-widest font-bold">
            <Globe className="h-3 w-3 inline mr-1" />
            {t('footer')}
          </p>
        </div>
      </div>
    </div>
  );
}
