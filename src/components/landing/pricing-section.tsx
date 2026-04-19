'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Sparkles, Lock, ChevronDown, ChevronUp, User, BookOpen, Users, Gavel, Briefcase, Phone, BarChart3, Building2 } from 'lucide-react';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';

// ─── Tipos ────────────────────────────────────────
interface ModulePlan {
  nombre: string;
  precio: number;   // USD/mes
  features: string[];
  popular?: boolean;
}

interface Module {
  id: string;
  nombre: string;
  descripcion: string;
  icon: React.ElementType;
  color: string;         // Tailwind accent color key
  plans: [ModulePlan, ModulePlan, ModulePlan]; // Básico | Pro | Enterprise
}

// ─── Datos de módulos ──────────────────────────────
const MODULES: Module[] = [
  {
    id: 'telecom',
    nombre: 'Mi Línea (Telecom)',
    descripcion: 'Líneas móviles personales y corporativas, eSIM, MDM y control de flotas Venezuela.',
    icon: Phone,
    color: 'cyan',
    plans: [
      {
        nombre: 'Básico',
        precio: 5,
        features: ['1-3 líneas móviles', 'Datos 4G LTE', 'WhatsApp y redes sociales', 'eSIM compatible', 'Panel básico de control'],
      },
      {
        nombre: 'Profesional',
        precio: 18,
        popular: true,
        features: ['Hasta 15 líneas', 'MDM corporativo', 'eSIM múltiple', 'Panel en tiempo real', 'Bloqueo/activación remota', 'Reportes de consumo'],
      },
      {
        nombre: 'Enterprise',
        precio: 39,
        features: ['Líneas ilimitadas', 'MDM avanzado + GPS flota', 'API de gestión', 'White-label disponible', 'SLA 99.9% garantizado', 'Soporte 24/7 dedicado'],
      },
    ],
  },
  {
    id: 'contable',
    nombre: 'Asesoría Contable',
    descripcion: 'Contabilidad, facturación SENIAT y declaraciones bajo normas VEN-NIF.',
    icon: BookOpen,
    color: 'blue',
    plans: [
      {
        nombre: 'Básico',
        precio: 9,
        features: ['Contabilidad básica', 'Hasta 100 facturas/mes', 'Alertas SENIAT (10/mes)', 'Reportes mensuales (3)'],
      },
      {
        nombre: 'Profesional',
        precio: 24,
        popular: true,
        features: ['Todo en Básico', 'Hasta 500 facturas/mes', 'Alertas SENIAT ilimitadas', 'Asistencia VEN-NIF completa', 'Declaraciones asistidas (12/año)', 'Exportación Excel'],
      },
      {
        nombre: 'Enterprise',
        precio: 49,
        features: ['Todo en Profesional', 'Facturas ilimitadas', 'Multi-empresa', 'Auditoría fiscal IA', 'Soporte prioritario 24/7', 'API de integración'],
      },
    ],
  },
  {
    id: 'socios',
    nombre: 'Socios y Directivos',
    descripcion: 'Gestión de accionistas, juntas directivas, actas y libros societarios.',
    icon: Users,
    color: 'violet',
    plans: [
      {
        nombre: 'Básico',
        precio: 7,
        features: ['Hasta 5 socios', 'Libro de actas digital', 'Actas de asamblea (5/mes)', 'Reportes básicos'],
      },
      {
        nombre: 'Profesional',
        precio: 19,
        popular: true,
        features: ['Hasta 20 socios', 'Libro de actas ilimitado', 'Actas ilimitadas', 'Firma electrónica', 'Histórico completo', 'Alertas de vencimientos'],
      },
      {
        nombre: 'Enterprise',
        precio: 39,
        features: ['Socios ilimitados', 'Multi-empresa', 'Blockchain de trazabilidad', 'Resoluciones y poderes', 'Soporte legal integrado', 'API corporativa'],
      },
    ],
  },
  {
    id: 'juridico',
    nombre: 'Asesoría Jurídica',
    descripcion: 'Gestión de contratos, consultas legales y cumplimiento normativo venezolano.',
    icon: Gavel,
    color: 'amber',
    plans: [
      {
        nombre: 'Básico',
        precio: 12,
        features: ['5 contratos/mes', 'Plantillas legales básicas', 'Alertas normativas (5/mes)', 'Consultas IA legal (20/mes)'],
      },
      {
        nombre: 'Profesional',
        precio: 29,
        popular: true,
        features: ['30 contratos/mes', 'Plantillas personalizadas', 'Alertas normativas ilimitadas', 'Consultas IA legal (100/mes)', 'Análisis de riesgo legal', 'Vencimientos automáticos'],
      },
      {
        nombre: 'Enterprise',
        precio: 59,
        features: ['Contratos ilimitados', 'IA legal avanzada sin límite', 'Bufete virtual integrado', 'Due diligence automatizado', 'Acceso a base jurisprudencial', 'Soporte jurídico humano'],
      },
    ],
  },
  {
    id: 'rrhh',
    nombre: 'RRHH y Nómina',
    descripcion: 'Gestión de empleados, nómina LOTTT, IVSS, FAOV y beneficios.',
    icon: Briefcase,
    color: 'emerald',
    plans: [
      {
        nombre: 'Básico',
        precio: 11,
        features: ['Hasta 10 empleados', 'Nómina mensual', 'Cálculo IVSS/FAOV básico', 'Recibos de pago PDF'],
      },
      {
        nombre: 'Profesional',
        precio: 27,
        popular: true,
        features: ['Hasta 50 empleados', 'Nómina quincenal/mensual', 'IVSS/FAOV/LPH completo', 'Vacaciones y utilidades IA', 'Control de asistencia', 'Expedientes digitales'],
      },
      {
        nombre: 'Enterprise',
        precio: 55,
        features: ['Empleados ilimitados', 'Multi-sede', 'Declaraciones automáticas', 'Integración BCV/SENIAT', 'Analítica de RR.HH.', 'API nómina'],
      },
    ],
  },
  {
    id: 'ventas',
    nombre: 'Sistema de Ventas',
    descripcion: 'CRM, pipeline de ventas, presupuestos y seguimiento de clientes.',
    icon: BarChart3,
    color: 'rose',
    plans: [
      {
        nombre: 'Básico',
        precio: 8,
        features: ['Hasta 50 clientes', 'Pipeline básico', '20 presupuestos/mes', 'Reportes semanales'],
      },
      {
        nombre: 'Profesional',
        precio: 19,
        popular: true,
        features: ['Hasta 500 clientes', 'CRM avanzado', 'Presupuestos ilimitados', 'Automatización de seguimiento', 'Integración facturación', 'Alertas de oportunidades'],
      },
      {
        nombre: 'Enterprise',
        precio: 39,
        features: ['Clientes ilimitados', 'IA de scoring de ventas', 'Multi-vendedor', 'Forecasting con IA', 'API CRM', 'Integración multicanal'],
      },
    ],
  },
];

// ─── Colores por módulo ────────────────────────────
const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string; ring: string }> = {
  blue:    { bg: 'bg-blue-500/10',    border: 'border-blue-500/30',    text: 'text-blue-400',    badge: 'bg-blue-500',    ring: 'ring-blue-500/30' },
  violet:  { bg: 'bg-violet-500/10',  border: 'border-violet-500/30',  text: 'text-violet-400',  badge: 'bg-violet-500',  ring: 'ring-violet-500/30' },
  amber:   { bg: 'bg-amber-500/10',   border: 'border-amber-500/30',   text: 'text-amber-400',   badge: 'bg-amber-500',   ring: 'ring-amber-500/30' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', badge: 'bg-emerald-500', ring: 'ring-emerald-500/30' },
  cyan:    { bg: 'bg-cyan-500/10',    border: 'border-cyan-500/30',    text: 'text-cyan-400',    badge: 'bg-cyan-500',    ring: 'ring-cyan-500/30' },
  rose:    { bg: 'bg-rose-500/10',    border: 'border-rose-500/30',    text: 'text-rose-400',    badge: 'bg-rose-500',    ring: 'ring-rose-500/30' },
};

// ─── Componentes ──────────────────────────────────
function PlanCard({ plan, color, moduleId }: { plan: ModulePlan; color: string; moduleId: string }) {
  const c = COLOR_MAP[color];
  return (
    <div className={cn(
      'relative rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 flex flex-col',
      plan.popular
        ? `${c.bg} ${c.border} shadow-lg ring-1 ${c.ring}`
        : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.14]'
    )}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className={cn('text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg', c.badge)}>
            Más Popular
          </span>
        </div>
      )}

      <div className="mb-4">
        <p className={cn('text-[10px] font-black uppercase tracking-widest mb-1', plan.popular ? c.text : 'text-white/40')}>{plan.nombre}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-white">${plan.precio}</span>
          <span className="text-xs text-white/30 font-medium">/mes</span>
        </div>
      </div>

      <ul className="space-y-2.5 mb-6 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[11px] text-white/65">
            <Check className={cn('h-3.5 w-3.5 mt-0.5 shrink-0', plan.popular ? c.text : 'text-white/30')} strokeWidth={3} />
            {f}
          </li>
        ))}
      </ul>

      <Button asChild className={cn(
        'w-full h-11 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:scale-[1.02]',
        plan.popular
          ? `${c.badge} hover:opacity-90 text-white shadow-lg`
          : 'bg-slate-700/70 hover:bg-slate-600/80 text-white/80 border border-slate-600/40'
      )}>
        <Link href="/registro">
          Contratar <ArrowRight className="w-3 h-3 ml-1.5" />
        </Link>
      </Button>
    </div>
  );
}

function ModuleSection({ mod }: { mod: Module }) {
  const c = COLOR_MAP[mod.color];
  const Icon = mod.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      {/* Module Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className={cn('p-3 rounded-2xl border', c.bg, c.border)}>
          <Icon className={cn('h-6 w-6', c.text)} />
        </div>
        <div>
          <h3 className="text-xl font-black text-white tracking-tight">{mod.nombre}</h3>
          <p className="text-[11px] text-white/40 font-medium">{mod.descripcion}</p>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {mod.plans.map((plan, i) => (
          <PlanCard key={i} plan={plan} color={mod.color} moduleId={mod.id} />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────
export function PricingSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleModules = showAll ? MODULES : MODULES.slice(0, 3);

  return (
    <section id="pricing" className="relative py-24 sm:py-32 w-full bg-slate-950 overflow-hidden scroll-mt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-slate-950 to-violet-950/20 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[700px] h-[700px] rounded-full bg-blue-600/[0.04] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/[0.04] blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">

        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500/50" />
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Precios por Módulo</span>
            </div>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-blue-500/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6"
          >
            Solo pagas lo que <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400">realmente usas</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-slate-400 font-medium max-w-xl mx-auto"
          >
            Cada módulo tiene su propio plan. Elige solo lo que necesitas y escala cuando quieras.
          </motion.p>
        </div>

        {/* Free Personal Account Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-16 rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-emerald-900/20 via-slate-900/40 to-teal-900/20 p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-5">
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/20">
              <User className="h-8 w-8 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl font-black text-white">Cuenta Personal</span>
                <span className="bg-emerald-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">100% Gratis</span>
              </div>
              <p className="text-sm text-white/50 font-medium max-w-md">
                Dashboard personal, tasa BCV en vivo, consultas RIF, alertas SENIAT básicas y chat IA — sin costo, para siempre. Sin tarjeta de crédito.
              </p>
            </div>
          </div>
          <Button asChild className="shrink-0 h-12 px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/30">
            <Link href="/registro">
              Crear Cuenta Gratis <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Module Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30">Módulos de Pago</span>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>

        {/* Modules */}
        {visibleModules.map((mod) => (
          <ModuleSection key={mod.id} mod={mod} />
        ))}

        {/* Show More / Less Toggle */}
        {MODULES.length > 3 && (
          <div className="flex justify-center mt-4 mb-12">
            <Button
              variant="ghost"
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2.5 text-white/70 hover:text-white transition-all text-xs font-black uppercase tracking-widest py-5 px-10 rounded-full bg-slate-800/60 border border-white/[0.1] hover:bg-slate-700/80 hover:border-white/[0.2] shadow-lg"
            >
              {showAll ? (
                <><ChevronUp className="w-4 h-4" /> Ver menos módulos</>
              ) : (
                <><ChevronDown className="w-4 h-4" /> Ver los {MODULES.length - 3} módulos restantes</>
              )}
            </Button>
          </div>
        )}

        {/* Bundle CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.06]">
              <Building2 className="h-6 w-6 text-white/60" />
            </div>
            <div>
              <p className="font-black text-white text-base">¿Necesitas múltiples módulos?</p>
              <p className="text-[11px] text-white/40 font-medium">Habla con nuestro equipo y arma un paquete empresarial a medida con descuentos por volumen.</p>
            </div>
          </div>
          <Button asChild variant="outline" className="shrink-0 h-11 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest border-white/[0.1] text-white/80 hover:bg-white/[0.06] bg-transparent">
            <Link href="#contacto">
              Contactar a Ventas <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Link>
          </Button>
        </motion.div>

        {/* Trust note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.02] border border-white/[0.04] text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            <Lock className="w-3 h-3 text-emerald-500" />
            Pagos seguros · Cancela cuando quieras · Sin contratos anuales obligatorios
          </div>
        </div>
      </div>
    </section>
  );
}
