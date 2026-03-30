'use client';

import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { User, Building2, ArrowRight, ChevronLeft, ShieldCheck, KeyRound, Globe, Signal, Banknote, Gavel, ShoppingCart, Users, Recycle, Sparkles, Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';

const optionKeys = [
  { key: 'personal', href: '/login-personal', icon: User, category: 'citizen', color: 'from-blue-500 to-indigo-600', iconBg: 'bg-blue-500/10', textColor: 'text-blue-500', borderHover: 'hover:border-blue-500/30', shadow: 'hover:shadow-blue-500/8' },
  { key: 'lines', href: '/login-linea', icon: Signal, category: 'citizen', color: 'from-cyan-500 to-blue-600', iconBg: 'bg-cyan-500/10', textColor: 'text-cyan-500', borderHover: 'hover:border-cyan-500/30', shadow: 'hover:shadow-cyan-500/8' },
  { key: 'accounting', href: '/login-empresa', icon: Banknote, category: 'corporate', color: 'from-emerald-500 to-teal-600', iconBg: 'bg-emerald-500/10', textColor: 'text-emerald-500', borderHover: 'hover:border-emerald-500/30', shadow: 'hover:shadow-emerald-500/8' },
  { key: 'legal', href: '/login-escritorio-juridico', icon: Gavel, category: 'corporate', color: 'from-violet-500 to-purple-600', iconBg: 'bg-violet-500/10', textColor: 'text-violet-500', borderHover: 'hover:border-violet-500/30', shadow: 'hover:shadow-violet-500/8' },
  { key: 'invoicing', href: '/login-ventas', icon: ShoppingCart, category: 'corporate', color: 'from-amber-500 to-orange-600', iconBg: 'bg-amber-500/10', textColor: 'text-amber-500', borderHover: 'hover:border-amber-500/30', shadow: 'hover:shadow-amber-500/8' },
  { key: 'partners', href: '/login-socios', icon: Users, category: 'corporate', color: 'from-slate-500 to-zinc-600', iconBg: 'bg-slate-500/10', textColor: 'text-slate-500', borderHover: 'hover:border-slate-500/30', shadow: 'hover:shadow-slate-500/8' },
  { key: 'sustainability', href: '/login-sostenibilidad', icon: Recycle, category: 'corporate', color: 'from-green-500 to-emerald-600', iconBg: 'bg-green-500/10', textColor: 'text-green-500', borderHover: 'hover:border-green-500/30', shadow: 'hover:shadow-green-500/8' },
];

export default function LoginSelectionPage() {
  const t = useTranslations('LoginPage');

  const personalOptions = optionKeys.filter(o => o.category === 'citizen');
  const enterpriseOptions = optionKeys.filter(o => o.category === 'corporate');

  return (
    <div className="min-h-screen flex flex-col items-center w-full relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-primary/[0.04] to-transparent" />
        <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-primary/[0.06] blur-[150px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-cyan-500/[0.03] blur-[120px]" />
        <div className="absolute top-[40%] left-[5%] w-[300px] h-[300px] rounded-full bg-emerald-500/[0.03] blur-[100px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="selGrid" width="56" height="100" patternUnits="userSpaceOnUse"><path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66Z" fill="none" stroke="currentColor" strokeWidth="0.5" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#selGrid)"/>
        </svg>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-[heroFloat_8s_ease-in-out_infinite]"
            style={{
              width: 3 + (i % 3) * 2,
              height: 3 + (i % 3) * 2,
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 4) * 20}%`,
              background: i % 2 === 0
                ? 'linear-gradient(135deg, rgba(14,165,233,0.3), rgba(34,197,94,0.15))'
                : 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(14,165,233,0.15))',
              animationDelay: `${i * 1.5}s`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-5xl px-4 md:px-8 py-6">
        <Button variant="ghost" asChild className="rounded-xl h-9 px-3 text-xs text-muted-foreground hover:text-foreground -ml-3">
          <Link href="/" className="flex items-center"><ChevronLeft className="mr-1.5 h-4 w-4" /> {t('back')}</Link>
        </Button>
      </div>

      <div className="w-full max-w-5xl px-4 md:px-8 pb-12">
        <header className="text-center mb-14">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150" />
              <Logo className="h-14 w-14 relative drop-shadow-lg" />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/[0.06] text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-5 backdrop-blur-sm">
            <Lock className="h-3 w-3" /> {t('badge')}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-foreground leading-[1.1] uppercase">
            {t('title')}{' '}
            <span className="bg-gradient-to-r from-primary via-cyan-500 to-emerald-500 bg-clip-text text-transparent">{t('title_highlight')}</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </header>

        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-8 w-8 rounded-xl bg-blue-500/10 border border-blue-500/15 flex items-center justify-center">
              <User className="h-4 w-4 text-blue-500" />
            </div>
            <h2 className="text-xs font-black text-foreground uppercase tracking-[0.15em]">{t('citizen_portal')}</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {personalOptions.map((option) => (
              <Link key={option.href} href={option.href as any} className="group block">
                <div className={cn(
                  "relative flex items-center gap-4 p-5 rounded-2xl border border-border/30 bg-card/70 backdrop-blur-sm",
                  "transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                  option.borderHover, option.shadow
                )}>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-transparent group-hover:from-primary/[0.02] group-hover:to-transparent transition-all duration-500" />
                  <div className={cn("h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg text-white shrink-0 transition-all group-hover:scale-110 group-hover:shadow-xl duration-300", option.color)}>
                    <option.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0 relative z-10">
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{t(`options.${option.key}.label`)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{t(`options.${option.key}.description`)}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-muted/40 flex items-center justify-center group-hover:bg-primary/10 transition-all shrink-0 relative z-10">
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-8 w-8 rounded-xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center">
              <Building2 className="h-4 w-4 text-emerald-500" />
            </div>
            <h2 className="text-xs font-black text-foreground uppercase tracking-[0.15em]">{t('corporate_portals')}</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {enterpriseOptions.map((option) => (
              <Link key={option.href} href={option.href as any} className="group block">
                <div className={cn(
                  "relative flex items-center gap-3.5 p-4 rounded-2xl border border-border/30 bg-card/70 backdrop-blur-sm",
                  "transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                  option.borderHover, option.shadow
                )}>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-transparent group-hover:from-primary/[0.02] group-hover:to-transparent transition-all duration-500" />
                  <div className={cn("h-11 w-11 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md text-white shrink-0 transition-all group-hover:scale-110 group-hover:shadow-lg duration-300", option.color)}>
                    <option.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0 relative z-10">
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{t(`options.${option.key}.label`)}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug line-clamp-1">{t(`options.${option.key}.description`)}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 relative z-10" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="rounded-2xl border border-border/30 bg-card/60 backdrop-blur-sm p-6 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/10 to-cyan-500/10 flex items-center justify-center border border-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
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
                <Button size="sm" className="rounded-xl text-xs font-bold px-6 shadow-md hover:shadow-lg transition-all h-10">
                  <User className="mr-2 h-3.5 w-3.5" /> {t('create_account')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4 pb-6">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {[
              { label: "VEN-NIF", icon: ShieldCheck },
              { label: "SENIAT", icon: ShieldCheck },
              { label: "IGTF 3%", icon: ShieldCheck },
              { label: "LOTTT", icon: ShieldCheck },
            ].map((badge, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/40 px-3 py-1.5 rounded-lg border border-border/25 bg-muted/15">
                <badge.icon className="h-2.5 w-2.5" />
                {badge.label}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground/25 uppercase tracking-[0.3em] font-bold">
            <Globe className="h-3 w-3 inline mr-1.5" />
            {t('footer')}
          </p>
        </div>
      </div>
    </div>
  );
}
