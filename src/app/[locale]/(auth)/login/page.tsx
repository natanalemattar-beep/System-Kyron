'use client';

import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { User, Building2, ArrowRight, ChevronLeft, ShieldCheck, KeyRound, Lock, Fingerprint, Globe, Server, Zap, Shield, Signal, Banknote, Gavel, ShoppingCart, Users, Recycle } from 'lucide-react';
import { useTranslations } from 'next-intl';

const optionKeys = [
  { key: 'personal', href: '/login-personal', icon: User, category: 'citizen' },
  { key: 'lines', href: '/login-linea', icon: Signal, category: 'citizen' },
  { key: 'accounting', href: '/login-empresa', icon: Banknote, category: 'corporate' },
  { key: 'legal', href: '/login-escritorio-juridico', icon: Gavel, category: 'corporate' },
  { key: 'invoicing', href: '/login-ventas', icon: ShoppingCart, category: 'corporate' },
  { key: 'partners', href: '/login-socios', icon: Users, category: 'corporate' },
  { key: 'sustainability', href: '/login-sostenibilidad', icon: Recycle, category: 'corporate' },
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
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full bg-emerald-500/3 blur-[80px]" />
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
                <div className="flex items-center gap-4 p-5 rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-200">
                  <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors border border-primary/5">
                    <option.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{t(`options.${option.key}.label`)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{t(`options.${option.key}.description`)}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-colors shrink-0" />
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
                <div className="flex items-center gap-4 p-5 rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-200">
                  <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors border border-primary/5">
                    <option.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{t(`options.${option.key}.label`)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug line-clamp-1">{t(`options.${option.key}.description`)}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-colors shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="rounded-2xl border border-border/30 bg-card/30 p-6 mb-8">
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
                <Button size="sm" className="rounded-xl text-[9px] font-black uppercase tracking-widest px-5">
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
