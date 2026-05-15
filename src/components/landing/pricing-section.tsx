'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollReveal } from "./scroll-reveal";
import { AIBudgetPlanner } from "./ai-budget-planner";
import {
  Users, User, Tablet, Calculator, Shield, Receipt, Leaf,
  ShieldCheck, Wifi, Monitor, Printer, Package, ArrowRight,
  Check, Sparkles, Zap, Star, Smartphone
} from 'lucide-react';

// ─── Route mapping per module ───────────────────────
const MODULE_ROUTES: Record<string, string> = {
  personal:       '/register/natural',
  milinea:        '/register/telecom',
  contable:       '/register/asesoria-contable',
  legal:          '/register/legal',
  tpv:            '/register/asesoria-contable?modulo=ventas',
  socios:         '/register/asesoria-contable?modulo=socios',
  sostenibilidad: '/register/sostenibilidad',
};

// ─── Icon mapping ──────────────────────────────────
const ICONS: Record<string, any> = {
  personal: Users,
  milinea: Tablet,
  milinea_corp: Smartphone,
  contable: Calculator,
  legal: Shield,
  tpv: Receipt,
  socios: Users,
  sostenibilidad: Leaf,
  caja: Monitor,
  impresora: Printer,
  kit: Package,
  solo: User,
  pro: Receipt,
  comerciante: Smartphone,
  negocio: Calculator,
  total: Users,
};

// ─── Fade animation ────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ═══════════════════════════════════════════════════
// COMPONENTES INTERNOS
// ═══════════════════════════════════════════════════

function SectionTitle({ badge, title, highlight, subtitle }: {
  badge: string; title: string; highlight?: string; subtitle: string;
}) {
  return (
    <div className="text-center mb-24 md:mb-32 space-y-8">
      <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-3xl mx-auto shadow-2xl">
        <Sparkles className="h-4 w-4 text-cyan-400" />
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-200/60">{badge}</span>
      </div>
      <h3 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black text-white leading-[0.9] tracking-tighter uppercase italic">
        {title}<br/>
        {highlight && (
          <span className="text-glow-cyan not-italic">{highlight}</span>
        )}
      </h3>
      <p className="text-xl text-white/30 font-medium max-w-2xl mx-auto leading-relaxed font-outfit">{subtitle}</p>
    </div>
  );
}

function PricingGraphs({ t }: { t: any }) {
  const chartData = [
    { label: 'Eficiencia Op.', val: 94, color: 'bg-cyan-500' },
    { label: 'Ahorro Fiscal', val: 78, color: 'bg-emerald-500' },
    { label: 'Retención Talento', val: 82, color: 'bg-blue-500' },
    { label: 'Conectividad', val: 99, color: 'bg-violet-500' },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-32 md:mb-48">
      <div className="space-y-8">
        <h3 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none transition-colors">
          {t('analytics_title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400">{t('analytics_highlight')}</span>
        </h3>
        <p className="text-lg text-slate-500 dark:text-white/40 leading-relaxed font-medium transition-colors">{t('analytics_subtitle')}</p>
        <div className="space-y-6 pt-4">
          {chartData.map((d) => (
            <div key={d.label} className="space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/60 transition-colors">
                <span>{d.label}</span>
                <span>{d.val}%</span>
              </div>
              <div className="h-3 w-full bg-black/[0.03] dark:bg-white/5 rounded-full overflow-hidden border border-black/5 dark:border-white/10 transition-colors">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${d.val}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={cn("h-full rounded-full shadow-lg", d.color)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative aspect-square md:aspect-video rounded-[3.5rem] overflow-hidden border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-8 md:p-12 flex items-center justify-center shadow-2xl transition-all">
          <div className="absolute inset-0 bg-grid-black/[0.01] dark:bg-grid-white/[0.02]" />
          <div className="relative z-10 w-full h-full flex items-end justify-between gap-3 md:gap-6">
              {[60, 45, 90, 65, 80, 55, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="flex-1 bg-gradient-to-t from-cyan-600/60 to-cyan-500 rounded-t-[1rem] relative group/bar"
                  >
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-all scale-90 group-hover/bar:scale-100 bg-slate-900 text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-xl">
                        Q{i+1}
                      </div>
                  </motion.div>
              ))}
          </div>
      </div>
    </div>
  );
}

function ModuleCard({ id, mod, index, t }: { id: string; mod: any; index: number; t: any }) {
  const Icon = ICONS[id] || Shield;
  
  // Official Pricing Logic 2026
  const PRECIOS: Record<string, number | null> = {
    personal: null,
    sostenibilidad: null,
    contable: 39.99,
    legal: 14.99,
    socios: 24.99,
    tpv: 0, // Included with hardware or other modules
    milinea: 6.99, // Starting price
    milinea_corp: 9.99, // Starting price
  };

  const precio = PRECIOS[id] ?? 0;
  const isFree = id === 'personal' || id === 'sostenibilidad';
  const isIncluded = id === 'tpv';

  const acentoClasses: Record<string, string> = {
    personal: 'text-emerald-400',
    milinea: 'text-cyan-400',
    milinea_corp: 'text-blue-400',
    contable: 'text-cyan-400',
    legal: 'text-amber-400',
    tpv: 'text-violet-400',
    socios: 'text-rose-400',
    sostenibilidad: 'text-emerald-400',
  };

  const glowClasses: Record<string, string> = {
    contable: 'shadow-[0_0_40px_rgba(34,211,238,0.1)] border-cyan-500/30',
    personal: 'shadow-[0_0_40px_rgba(16,185,129,0.05)]',
  };

  return (
    <ScrollReveal
      delay={index * 0.08}
      className={cn(
        'relative group p-10 flex flex-col transition-all duration-700 hover:-translate-y-3 h-full rounded-[3rem] overflow-hidden',
        'bg-white/[0.02] border border-white/10 backdrop-blur-3xl',
        glowClasses[id] || 'hover:border-white/20'
      )}
    >
      {/* Decorative HUD Corner */}
      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/10 group-hover:bg-cyan-400 transition-colors" />
        <div className="absolute top-4 right-8 w-4 h-[1px] bg-white/5" />
      </div>

      <div className="flex items-start justify-between mb-12">
        <div className={cn('h-16 w-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-6', 
          'bg-white/5 border border-white/10 group-hover:bg-white/10'
        )}>
          <Icon className={cn('h-8 w-8', acentoClasses[id])} />
        </div>
        {isFree ? (
          <div className="flex flex-col items-end">
            <span className="px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl shadow-lg">
              {t('free')}
            </span>
            <span className="text-[9px] text-emerald-400/50 font-black uppercase tracking-[0.3em] mt-3 italic animate-kyron-breathe">Siempre gratis</span>
          </div>
        ) : isIncluded ? (
          <span className="px-5 py-2.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl">
            INCLUIDO
          </span>
        ) : (
          <div className="text-right">
            <div className="flex items-baseline justify-end gap-1">
                <span className="text-xs font-black text-white/20 mr-1">$</span>
                <span className="text-5xl md:text-[clamp(2.5rem,5vw,3.5rem)] font-black text-white leading-none italic tracking-tighter drop-shadow-glow">
                    {Math.floor(precio as number)}
                    <span className="text-2xl opacity-40">.{String(precio).split('.')[1] || '00'}</span>
                </span>
            </div>
            <span className="text-[10px] text-white/10 font-black uppercase tracking-[0.4em] block mt-3">{t('per_month')}</span>
          </div>
        )}
      </div>

      <h4 className="text-2xl font-black text-white mb-4 tracking-tighter uppercase italic">{mod.name}</h4>
      <p className="text-base text-white/40 font-medium leading-relaxed flex-1 mb-10">{mod.desc}</p>

      {mod.tag && (
        <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em] mb-6 animate-pulse">{mod.tag}</p>
      )}

      <Button asChild className={cn(
        'w-full h-16 rounded-[1.25rem] font-black text-[12px] uppercase tracking-[0.4em] transition-all duration-500 hover:scale-[1.04] active:scale-[0.96] border-2 shadow-2xl',
        isFree
          ? 'bg-[#bfff00] text-black hover:bg-[#d4ff5e] border-[#bfff00] shadow-[0_15px_40px_rgba(191,255,0,0.25)]'
          : 'bg-white text-black hover:bg-cyan-50 border-white hover:border-cyan-200'
      )}>
        <Link href={(MODULE_ROUTES[id] ?? '/register') as any}>
          <span className="flex items-center">
            {isFree 
              ? (id === 'personal' ? t('cta_register_free') : t('cta_activate_free'))
              : (id === 'milinea' || id === 'milinea_corp' ? t('cta_select_plan') : t('cta_start'))
            } 
            <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-2 transition-transform" />
          </span>
        </Link>
      </Button>
    </ScrollReveal>
  );
}

// ═══════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════
export function PricingSection() {
  const t = useTranslations('PricingSection');
  
  const saasModules = t.raw('saas_modules');
  const planes5G = t.raw('planes_5g');
  const planes5GCorp = t.raw('planes_5g_corp');
  const hardware = t.raw('hardware');
  const combos = t.raw('combos');

  const hardwarePrices: Record<string, number> = { caja: 299, impresora: 149, kit: 399 };
  const planes5GPrices: Record<string, number> = { 
    basico: 6.99, 
    estandar: 7.99,
    plus: 9.99, 
    pro: 12.99, 
    ilimitado: 14.99 
  };
  const planes5GCorpPrices: Record<string, number> = {
    startup: 9.99,
    negocio: 12.99,
    corporativo: 14.99,
    ilimitado_corp: 19.99
  };
  const combosTotals: Record<string, number> = { solo: 0, pro: 39.99, comerciante: 14.99, negocio: 79.99, total: 149.99 };

  return (
    <section
      id="pricing"
      className="relative py-32 md:py-48 w-full overflow-hidden bg-transparent"
    >
      {/* Kyron Aurora Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-cyan-600/[0.05] blur-[160px] animate-mesh-drift" />
        <div className="absolute bottom-[10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-600/[0.04] blur-[140px] animate-mesh-drift" style={{ animationDelay: '-12s' }} />
      </div>

      <div className="container mx-auto px-4 md:px-10 lg:px-12 max-w-[1440px] relative z-10">

        {/* ──── MAIN HEADER ──── */}
        <motion.div
          className="text-center mb-24 md:mb-32"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md mb-8 mx-auto">
            <Zap className="h-4 w-4 text-cyan-600 dark:text-cyan-400 transition-colors" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-200/80 transition-colors">{t('badge')}</span>
          </div>
          <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black tracking-[-0.04em] text-slate-900 dark:text-white leading-[0.95] mb-8 transition-colors">
            {t('title')}<br />
            <span className="block text-glow-cyan mt-3 transition-all duration-500">{t('highlight')}</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 dark:text-white/40 max-w-2xl mx-auto font-medium leading-relaxed mb-12 transition-colors">
            {t('subtitle')}
          </p>

          <div className="flex flex-col items-center gap-8 mb-16">
            <Link href="/register">
              <Button className="h-16 px-16 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-[14px] uppercase tracking-[0.4em] shadow-[0_0_50px_rgba(34,211,238,0.3)] hover:scale-[1.05] transition-all border-none">
                {t('cta_try_free')}
              </Button>
            </Link>

            {/* Free note */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 backdrop-blur-sm">
              <Check className="h-4 w-4 text-emerald-400" strokeWidth={3} />
              <span className="text-xs font-black text-emerald-200 uppercase tracking-widest">
                {t('free_note')}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ──── KYRON ANALYTICS SECTION ──── */}
        <PricingGraphs t={t} />

        {/* ──── AI BUDGET PLANNER ──── */}
        <div className="mb-32 md:mb-48">
            <AIBudgetPlanner />
        </div>

        {/* ══════════════════════════════════════════
            BLOQUE 1 — MÓDULOS SAAS
        ══════════════════════════════════════════ */}
        <div className="mb-32 md:mb-48">
          <SectionTitle
            badge={t('modules_badge')}
            title={t('modules_title')}
            highlight={t('modules_highlight')}
            subtitle={t('modules_subtitle')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {Object.entries(saasModules).map(([id, mod], i) => (
              <ModuleCard key={id} id={id} mod={mod} index={i} t={t} />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            BLOQUE 2 — PLANES 5G
        ══════════════════════════════════════════ */}
        <div className="mb-32 md:mb-48">
          <SectionTitle
            badge={t('connectivity_badge')}
            title={t('connectivity_title')}
            highlight={t('connectivity_highlight')}
            subtitle={t('connectivity_subtitle')}
          />

          {/* Kyron Shield badge */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex items-center gap-4 px-8 py-5 rounded-3xl border border-blue-500/20 bg-blue-500/10 backdrop-blur-md">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <div className="text-left">
                <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">{t('shield_title')}</p>
                <p className="text-[10px] text-slate-500 dark:text-white/40 font-medium">{t('shield_desc')}</p>
              </div>
            </div>
          </div>

          {/* Personal Plans */}
          <div className="mb-20">
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 text-center mb-10">— PLANES PERSONALES —</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {Object.entries(planes5G).map(([id, plan]: [string, any], i) => (
                <motion.div
                  key={id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.08}
                  className={cn(
                    'relative p-8 flex flex-col transition-all duration-500 hover:-translate-y-2 rounded-3xl glass-system-kyron-interactive',
                    id === 'pro'
                      ? 'border-blue-500/40 bg-blue-500/5'
                      : 'border-white/5 bg-white/[0.02]'
                  )}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Wifi className="h-5 w-5 text-cyan-400" />
                    <h4 className={cn('text-sm font-black uppercase tracking-widest', 
                      id === 'basico' ? 'text-slate-300' : 
                      id === 'plus' ? 'text-cyan-300' : 
                      id === 'pro' ? 'text-blue-300' : 
                      id === 'estandar' ? 'text-emerald-300' : 'text-amber-300'
                    )}>{plan.name}</h4>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline justify-start gap-1">
                      <span className="text-xs font-black text-white/20 mr-1">$</span>
                      <span className="text-5xl md:text-[clamp(2.2rem,4vw,3.2rem)] font-black text-white tracking-tighter italic drop-shadow-glow">
                          {Math.floor(planes5GPrices[id])}
                          <span className="text-2xl opacity-40">.{String(planes5GPrices[id]).split('.')[1] || '00'}</span>
                      </span>
                      <span className="text-[10px] text-white/30 font-black uppercase tracking-widest ml-2">{t('per_month')}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-10 flex-1">
                    {[
                      { label: 'Datos', value: plan.datos },
                      { label: 'Minutos', value: plan.min },
                      { label: 'SMS', value: plan.sms },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between text-xs py-1 border-b border-white/5">
                        <span className="text-white/40 font-medium">{label}</span>
                        <span className="font-black text-white">{value}</span>
                      </div>
                    ))}
                  </div>

                  <Button asChild className="w-full h-12 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 hover:scale-[1.05] glass-liquid-hud text-white">
                    <Link href="/register">
                      {t('cta_start')} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Business Plans */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 text-center mb-10">— PLANES EMPRESARIALES —</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(planes5GCorp).map(([id, plan]: [string, any], i) => (
                <motion.div
                  key={id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.08}
                  className="relative p-8 flex flex-col transition-all duration-500 hover:-translate-y-2 rounded-3xl glass-system-kyron-interactive border-white/5 bg-white/[0.02]"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="h-5 w-5 text-emerald-400" />
                    <h4 className="text-sm font-black uppercase tracking-widest text-emerald-300">{plan.name}</h4>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline justify-start gap-1">
                      <span className="text-xs font-black text-white/20 mr-1">$</span>
                      <span className="text-5xl md:text-[clamp(2.2rem,4vw,3.2rem)] font-black text-white tracking-tighter italic drop-shadow-glow">
                          {Math.floor(planes5GCorpPrices[id])}
                          <span className="text-2xl opacity-40">.{String(planes5GCorpPrices[id]).split('.')[1] || '00'}</span>
                      </span>
                      <span className="text-[10px] text-white/30 font-black uppercase tracking-widest ml-2">{t('per_month')}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-10 flex-1">
                    {[
                      { label: 'Datos', value: plan.datos },
                      { label: 'Minutos', value: plan.min },
                      { label: 'SMS', value: plan.sms },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between text-xs py-1 border-b border-white/5">
                        <span className="text-white/40 font-medium">{label}</span>
                        <span className="font-black text-white">{value}</span>
                      </div>
                    ))}
                  </div>

                  <Button asChild className="w-full h-12 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 hover:scale-[1.05] glass-liquid-hud text-white">
                    <Link href="/register">
                      {t('cta_start')} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mi Línea note */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 p-8 rounded-3xl border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md flex items-start gap-5 max-w-4xl mx-auto"
          >
            <div className="h-12 w-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center shrink-0">
              <Smartphone className="h-6 w-6 text-cyan-400" />
            </div>
            <p className="text-sm text-white/50 font-medium leading-relaxed">
               {t('linea_note')}
            </p>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
            BLOQUE 3 — HARDWARE FISCAL
        ══════════════════════════════════════════ */}
        <div className="mb-32 md:mb-48">
          <SectionTitle
            badge={t('hardware_badge')}
            title={t('hardware_title')}
            highlight={t('hardware_highlight')}
            subtitle={t('hardware_subtitle')}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(hardware).map(([id, hw]: [string, any], i) => {
              const Icon = ICONS[id] || Package;
              return (
                <motion.div
                  key={id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.1}
                  className="rounded-3xl p-10 flex flex-col transition-all duration-500 hover:-translate-y-2 glass-system-kyron-interactive border-white/5"
                >
                  <div className="flex items-center gap-5 mb-8">
                    <div className="h-16 w-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-amber-500 dark:text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{hw.name}</h4>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 mt-1">
                        <Check className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-[8px] text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-widest">{t('seniat_certified')}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 dark:text-white/40 font-medium leading-relaxed flex-1 mb-8">{hw.desc}</p>

                  <div className="flex items-center justify-between pt-8 border-t border-black/5 dark:border-white/5">
                    <div>
                      <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em] mb-3">{t('one_time_payment')}</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-black text-white/20 mr-1">$</span>
                        <span className="text-4xl font-black text-white tracking-tighter italic drop-shadow-glow">
                            {hardwarePrices[id]}
                            <span className="text-xl opacity-30">.00</span>
                        </span>
                      </div>
                    </div>
                    <Button asChild className="h-14 px-10 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] bg-amber-500 hover:bg-amber-600 text-white dark:text-black shadow-lg transition-all hover:scale-[1.05] border-none">
                      <Link href="/#contacto">
                        {t('cta_start')} <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            BLOQUE 4 — COMBINACIONES
        ══════════════════════════════════════════ */}
        <div>
          <SectionTitle
            badge={t('combos_badge')}
            title={t('combos_title')}
            highlight={t('combos_highlight')}
            subtitle={t('combos_subtitle')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {Object.entries(combos).map(([id, combo]: [string, any], i) => {
              const Icon = ICONS[id] || Users;
              const colorClasses: Record<string, string> = {
                solo: 'border-emerald-500/25 bg-emerald-500/[0.04]',
                pro: 'border-violet-500/25 bg-violet-500/[0.04]',
                comerciante: 'border-cyan-500/25 bg-cyan-500/[0.04]',
                negocio: 'border-blue-500/25 bg-blue-500/[0.04]',
                total: 'border-rose-500/25 bg-rose-500/[0.04]',
              };
              const badgeColors: Record<string, string> = {
                solo: 'bg-emerald-500 text-white',
                negocio: 'bg-blue-500 text-white',
                total: 'bg-rose-500 text-white',
              };

              return (
                <motion.div
                  key={id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.08}
                  className={cn('rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 glass-system-kyron-interactive border-white/5', colorClasses[id]?.replace('border-', 'border-opacity-0 border-'))}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-slate-400 dark:text-white/60" />
                      </div>
                      <h4 className="text-base font-black text-slate-900 dark:text-white tracking-tight">{combo.profile}</h4>
                    </div>
                    {combo.badge && (
                      <span className={cn('text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shrink-0 border border-black/10 dark:border-white/20 shadow-lg', badgeColors[id] || 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white')}>
                        {combo.badge}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {combo.items.map((item: string, j: number) => (
                      <li key={j} className="flex items-center gap-3 text-xs text-slate-500 dark:text-white/50 font-medium">
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-white/20" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div>
                      <p className="text-[9px] text-white/20 font-black uppercase tracking-[0.2em] mb-1">{t('estimated_cost')}</p>
                      <p className="text-3xl font-black text-white tracking-tighter leading-none">
                        {combosTotals[id] === 0 ? (
                          <span className="text-emerald-400">{t('free')}</span>
                        ) : (
                          `$${combosTotals[id]?.toFixed(2)}`
                        )}
                      </p>
                    </div>
                    <Button asChild className="h-11 px-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all hover:scale-[1.03]">
                      <Link href="/register">
                        {t('cta_start')} <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Final trust note */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-24 text-center"
          >
            <div className="inline-grid grid-cols-2 md:grid-cols-4 gap-4 px-10 py-8 rounded-[2rem] border border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.02] backdrop-blur-md max-w-5xl mx-auto">
              <div className="flex flex-col items-center gap-3 p-4">
                <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" strokeWidth={3} />
                <span className="text-[10px] font-black text-slate-500 dark:text-white/40 uppercase tracking-widest text-center leading-tight">Cuenta Personal<br/>Siempre Gratis</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 border-l border-black/5 dark:border-white/5">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-[10px] font-black text-slate-500 dark:text-white/40 uppercase tracking-widest text-center leading-tight">Kyron Shield<br/>Integrado</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 border-l border-black/5 dark:border-white/5">
                <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-[10px] font-black text-slate-500 dark:text-white/40 uppercase tracking-widest text-center leading-tight">Sostenibilidad<br/>Certificada</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 border-l border-black/5 dark:border-white/5">
                <Star className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <span className="text-[10px] font-black text-slate-500 dark:text-white/40 uppercase tracking-widest text-center leading-tight">Sin Contratos<br/>Obligatorios</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
