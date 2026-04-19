'use client';

import { motion } from 'framer-motion';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollReveal, ScrollRevealGroup } from "./scroll-reveal";
import {
  User, Phone, Calculator, Scale, Receipt, Users, Leaf,
  Shield, Wifi, Monitor, Printer, Package, ArrowRight,
  Check, Sparkles, ChevronRight, Zap, Star,
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

// ─── Fade animation ────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── 1. MÓDULOS SAAS ──────────────────────────────
interface SaasModule {
  id: string;
  icon: React.ElementType;
  nombre: string;
  descripcion: string;
  precio: number | null; // null = gratis
  etiqueta?: string;
  color: string;
  acento: string;
  popular?: boolean;
}

const SAAS_MODULES: SaasModule[] = [
  {
    id: 'personal',
    icon: User,
    nombre: 'Cuenta Personal',
    descripcion: 'Bóveda biométrica 3D, firma digital, certificados de ingreso y protección familiar LOPNNA.',
    precio: null,
    etiqueta: '100% Gratis · Para siempre',
    color: 'from-emerald-500/15 to-teal-500/10',
    acento: 'text-emerald-400',
  },
  {
    id: 'milinea',
    icon: Phone,
    nombre: 'Mi Línea 5G',
    descripcion: 'Gestión de tu línea telefónica dentro de la plataforma. No incluye plan de datos — solo la administración inteligente.',
    precio: 5,
    color: 'from-cyan-500/15 to-blue-500/10',
    acento: 'text-cyan-400',
  },
  {
    id: 'contable',
    icon: Calculator,
    nombre: 'Asesoría Contable',
    descripcion: 'Contabilidad completa (IVA, ISLR, IGTF, libros SENIAT) + RRHH (nómina, prestaciones) + Marketing con IA predictiva.',
    precio: 60,
    color: 'from-blue-500/15 to-indigo-500/10',
    acento: 'text-blue-400',
    popular: true,
  },
  {
    id: 'legal',
    icon: Scale,
    nombre: 'Asesoría Legal',
    descripcion: 'Kyron Voice (IA legal), contratos, permisología integral (483+ trámites) y directorio de 58 organismos venezolanos.',
    precio: 25,
    color: 'from-amber-500/15 to-orange-500/10',
    acento: 'text-amber-400',
  },
  {
    id: 'tpv',
    icon: Receipt,
    nombre: 'Facturación TPV',
    descripcion: 'Punto de venta multimoneda (VES/USD/EUR), inventario, notas de crédito/débito e integración con hardware fiscal homologado.',
    precio: 15,
    color: 'from-violet-500/15 to-purple-500/10',
    acento: 'text-violet-400',
  },
  {
    id: 'socios',
    icon: Users,
    nombre: 'Socios y Directivos',
    descripcion: 'Consolidación financiera, BI predictivo, dashboard para holdings y reparto automatizado de utilidades.',
    precio: 40,
    color: 'from-rose-500/15 to-pink-500/10',
    acento: 'text-rose-400',
  },
  {
    id: 'sostenibilidad',
    icon: Leaf,
    nombre: 'Sostenibilidad',
    descripcion: 'Smart Bins con tecnología de inducción magnética (alianza Ameru.AI) y Eco‑Créditos por reciclaje.',
    precio: null,
    etiqueta: 'Gratis · Con tu cuenta',
    color: 'from-green-500/15 to-lime-500/10',
    acento: 'text-green-400',
  },
];

// ─── 2. PLANES 5G ─────────────────────────────────
interface Plan5G {
  nombre: string;
  datos: string;
  minutos: string;
  sms: string;
  precio: number;
  popular?: boolean;
  color: string;
}

const PLANES_5G: Plan5G[] = [
  { nombre: 'Básico',      datos: '4 GB',       minutos: '200',        sms: '400',        precio: 11.25, color: 'text-slate-300' },
  { nombre: 'Plus',        datos: '10 GB',      minutos: '400',        sms: '800',        precio: 17.99, color: 'text-cyan-300' },
  { nombre: 'Pro',         datos: '25 GB',      minutos: '600',        sms: '1200',       precio: 24.49, popular: true, color: 'text-blue-300' },
  { nombre: 'Empresarial', datos: '30 GB',      minutos: '500',        sms: '500',        precio: 25.00, color: 'text-violet-300' },
  { nombre: 'Ilimitado',   datos: 'Ilimitado',  minutos: 'Ilimitado',  sms: 'Ilimitado',  precio: 30.00, color: 'text-amber-300' },
];

// ─── 3. HARDWARE FISCAL ───────────────────────────
interface Hardware {
  icon: React.ElementType;
  nombre: string;
  descripcion: string;
  precio: number;
  homologacion: string;
}

const HARDWARE: Hardware[] = [
  { icon: Monitor,  nombre: 'Caja Auto-pago',            descripcion: 'Terminal de autoservicio con pantalla táctil y lector integrado.',   precio: 350, homologacion: 'SENIAT ✅' },
  { icon: Printer,  nombre: 'Impresora Fiscal',          descripcion: 'Impresora fiscal certificada para emisión de facturas homologadas.',  precio: 200, homologacion: 'SENIAT ✅' },
  { icon: Package,  nombre: 'Kit TPV Completo',          descripcion: 'Caja + impresora + software preinstalado. Solución llave en mano.',    precio: 500, homologacion: 'SENIAT ✅' },
];

// ─── 4. COMBINACIONES ─────────────────────────────
const COMBOS = [
  {
    perfil: 'Persona sola',
    icon: User,
    items: ['Cuenta Personal', 'Sostenibilidad'],
    total: 0,
    color: 'border-emerald-500/25 bg-emerald-500/[0.04]',
    badge: 'Totalmente gratis',
    badgeColor: 'bg-emerald-500 text-white',
  },
  {
    perfil: 'Profesional que factura',
    icon: Receipt,
    items: ['Cuenta Personal', 'Facturación TPV ($15)'],
    total: 15,
    color: 'border-violet-500/25 bg-violet-500/[0.04]',
    badge: null,
    badgeColor: '',
  },
  {
    perfil: 'Comerciante con línea',
    icon: Phone,
    items: ['Cuenta Personal', 'Mi Línea 5G ($5)', 'Plan Básico 5G ($11.25)'],
    total: 16.25,
    color: 'border-cyan-500/25 bg-cyan-500/[0.04]',
    badge: null,
    badgeColor: '',
  },
  {
    perfil: 'Negocio completo',
    icon: Calculator,
    items: ['Cuenta Personal', 'Asesoría Contable ($60)', 'Facturación TPV ($15)', 'Mi Línea 5G ($5)', 'Plan Pro 5G ($24.49)'],
    total: 104.49,
    color: 'border-blue-500/25 bg-blue-500/[0.04]',
    badge: 'Más popular',
    badgeColor: 'bg-blue-500 text-white',
  },
  {
    perfil: 'Empresa con socios y legal',
    icon: Users,
    items: ['Todo lo anterior', '+ Socios y Directivos ($40)', '+ Asesoría Legal ($25)', '+ Plan Empresarial ($25)'],
    total: 194.49,
    color: 'border-rose-500/25 bg-rose-500/[0.04]',
    badge: 'Paquete total',
    badgeColor: 'bg-rose-500 text-white',
  },
];

// ═══════════════════════════════════════════════════
// COMPONENTES INTERNOS
// ═══════════════════════════════════════════════════

function SectionTitle({ badge, title, highlight, subtitle }: {
  badge: string; title: string; highlight?: string; subtitle: string;
}) {
  return (
    <div className="text-center mb-14">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00FF00]/20 bg-[#00FF00]/[0.06] mb-5">
        <Sparkles className="h-3 w-3 text-[#00FF00]" />
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#00FF00]/80">{badge}</span>
      </div>
      <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3">
        {title}{' '}
        {highlight && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            {highlight}
          </span>
        )}
      </h3>
      <p className="text-sm text-white/50 font-medium max-w-xl mx-auto">{subtitle}</p>
    </div>
  );
}

function ModuleCard({ mod, index }: { mod: SaasModule; index: number }) {
  const Icon = mod.icon;
  const isFree = mod.precio === null;

  return (
    <ScrollReveal
      delay={index * 0.08}
      className={cn(
        'relative group rounded-2xl border p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl h-full',
        mod.popular
          ? 'border-blue-500/40 shadow-lg shadow-blue-500/10'
          : 'border-white/[0.07] hover:border-white/[0.14]',
        `bg-gradient-to-br ${mod.color}`
      )}
    >
      {mod.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-3 py-1 bg-blue-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
            ⭐ Más Completo
          </span>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className={cn('p-3 rounded-xl bg-white/[0.06] border border-white/[0.08]')}>
          <Icon className={cn('h-5 w-5', mod.acento)} />
        </div>
        {isFree ? (
          <span className="px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[9px] font-black uppercase tracking-wider rounded-full">
            GRATIS
          </span>
        ) : (
          <div className="text-right">
            <span className="text-2xl font-black text-white">${mod.precio}</span>
            <span className="text-[10px] text-white/35 font-medium block">/mes</span>
          </div>
        )}
      </div>

      <h4 className="text-base font-black text-white mb-2 leading-tight">{mod.nombre}</h4>
      <p className="text-xs text-white/55 font-medium leading-relaxed flex-1 mb-5">{mod.descripcion}</p>

      {mod.etiqueta && (
        <p className="text-[10px] font-bold text-emerald-400/80 mb-3 tracking-wide">{mod.etiqueta}</p>
      )}

      <Button asChild className={cn(
        'w-full h-10 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:scale-[1.02]',
        isFree
          ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30'
          : 'bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/[0.1]'
      )}>
        <Link href={(MODULE_ROUTES[mod.id] ?? '/register') as any}>
          {isFree ? 'Crear Cuenta Gratis' : 'Activar Módulo'} <ArrowRight className="w-3 h-3 ml-1.5" />
        </Link>
      </Button>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════
export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative py-24 sm:py-32 w-full overflow-hidden scroll-mt-20"
      style={{ background: 'linear-gradient(135deg, #050d1f 0%, #0a2472 40%, #050d1f 100%)' }}
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #0a2472 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #00FF00 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">

        {/* ──── MAIN HEADER ──── */}
        <motion.div
          className="text-center mb-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border mb-6"
            style={{ borderColor: 'rgba(0,255,0,0.25)', background: 'rgba(0,255,0,0.06)' }}>
            <Zap className="h-3.5 w-3.5" style={{ color: '#00FF00' }} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: '#00FF00' }}>
              Planes y Precios
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-5">
            Elige solo lo que<br />
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #00FF00, #00d4ff)' }}>
              realmente necesitas
            </span>
          </h2>
          <p className="text-lg text-white/50 font-medium max-w-2xl mx-auto">
            Módulos independientes + planes de líneas 5G + hardware fiscal certificado. Sin contratos anuales obligatorios.
          </p>

          {/* Free note */}
          <div className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/[0.06]">
            <Check className="h-3.5 w-3.5 text-emerald-400" strokeWidth={3} />
            <span className="text-xs font-bold text-emerald-300">
              La Cuenta Personal y Sostenibilidad son gratis para siempre · Kyron Shield incluido en todos los planes 5G
            </span>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════
            BLOQUE 1 — MÓDULOS SAAS
        ══════════════════════════════════════════ */}
        <div className="mb-24">
          <SectionTitle
            badge="Módulos SaaS"
            title="Activa solo los módulos"
            highlight="que tu negocio necesita"
            subtitle="Precio fijo mensual. Sin sorpresas. Cancela cuando quieras."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {SAAS_MODULES.map((mod, i) => (
              <ModuleCard key={mod.id} mod={mod} index={i} />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            BLOQUE 2 — PLANES 5G
        ══════════════════════════════════════════ */}
        <div className="mb-24">
          <SectionTitle
            badge="Conectividad 5G"
            title="Planes de líneas"
            highlight="5G con Kyron Shield"
            subtitle="Cada plan incluye 3 seguros: reposición de equipo, perito forense SENIAT y abogado en 1h + llamadas verificadas anti-estafa."
          />

          {/* Kyron Shield badge */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-blue-500/30 bg-blue-500/[0.07]">
              <Shield className="h-5 w-5 text-blue-400" />
              <div className="text-left">
                <p className="text-xs font-black text-white">Kyron Shield incluido en todos los planes</p>
                <p className="text-[10px] text-white/45 font-medium">Reposición de equipo · Perito forense SENIAT · Abogado en 1h · Anti-estafa</p>
              </div>
            </div>
          </div>

          {/* Plans cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {PLANES_5G.map((plan, i) => (
              <motion.div
                key={plan.nombre}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.08}
                className={cn(
                  'relative rounded-2xl border p-6 flex flex-col transition-all duration-300 hover:-translate-y-1',
                  plan.popular
                    ? 'border-blue-500/40 bg-gradient-to-br from-blue-900/30 to-slate-900/40 shadow-xl shadow-blue-500/15'
                    : 'border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.04]'
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-blue-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                      Más Elegido
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2 mb-4">
                  <Wifi className="h-4 w-4 text-cyan-400" />
                  <h4 className={cn('text-sm font-black', plan.color)}>{plan.nombre}</h4>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">${plan.precio.toFixed(2)}</span>
                    <span className="text-[10px] text-white/35">/mes</span>
                  </div>
                </div>

                {/* Specs */}
                <div className="space-y-2.5 mb-6 flex-1">
                  {[
                    { label: 'Datos', value: plan.datos },
                    { label: 'Minutos', value: plan.minutos },
                    { label: 'SMS', value: plan.sms },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between text-xs">
                      <span className="text-white/40 font-medium">{label}</span>
                      <span className={cn('font-black', plan.color)}>{value}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-white/[0.05]">
                    <div className="flex items-center gap-1.5 text-[10px] text-blue-400/80 font-bold">
                      <Shield className="h-3 w-3" />
                      Kyron Shield incluido
                    </div>
                  </div>
                </div>

                <Button asChild className={cn(
                  'w-full h-10 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:scale-[1.02]',
                  plan.popular
                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/40'
                    : 'bg-white/[0.07] hover:bg-white/[0.14] text-white border border-white/[0.1]'
                )}>
                  <Link href="/registro">
                    Contratar <ArrowRight className="w-3 h-3 ml-1.5" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Mi Línea note */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 p-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.04] flex items-start gap-3"
          >
            <Phone className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-xs text-white/60 font-medium">
              <span className="text-cyan-400 font-black">¿Ya tienes línea con otro operador?</span>{' '}
              Contrata solo el módulo "Mi Línea 5G" por <span className="text-white font-black">$5/mes</span> para gestionar tu línea existente dentro de System Kyron, con todas las herramientas de administración y seguridad.
            </p>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
            BLOQUE 3 — HARDWARE FISCAL
        ══════════════════════════════════════════ */}
        <div className="mb-24">
          <SectionTitle
            badge="Hardware Fiscal"
            title="Equipo certificado"
            highlight="SENIAT"
            subtitle="Pago único. Sin mensualidad. Entrega en todo Venezuela."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HARDWARE.map((hw, i) => {
              const Icon = hw.icon;
              return (
                <motion.div
                  key={hw.nombre}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.1}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-amber-500/30 hover:bg-amber-500/[0.03] transition-all duration-300 hover:-translate-y-1 p-7 flex flex-col"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <Icon className="h-6 w-6 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-white leading-tight">{hw.nombre}</h4>
                      <p className="text-[10px] text-amber-400 font-bold mt-0.5">{hw.homologacion}</p>
                    </div>
                  </div>

                  <p className="text-xs text-white/55 font-medium leading-relaxed flex-1 mb-6">{hw.descripcion}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                    <div>
                      <p className="text-[10px] text-white/30 font-medium uppercase tracking-widest">Precio único</p>
                      <p className="text-2xl font-black text-white">${hw.precio}</p>
                    </div>
                    <Button asChild className="h-10 px-5 rounded-xl font-black text-[10px] uppercase tracking-widest bg-amber-500 hover:bg-amber-600 text-black shadow-lg shadow-amber-500/30 transition-all hover:scale-[1.02]">
                      <Link href="#contacto">
                        Cotizar <ArrowRight className="w-3 h-3 ml-1.5" />
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
            badge="Ejemplos de uso"
            title="¿Cuánto pagarías"
            highlight="según tu perfil?"
            subtitle="Combina solo los módulos que necesitas. Siempre puedes agregar o quitar más adelante."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {COMBOS.map((combo, i) => {
              const Icon = combo.icon;
              return (
                <motion.div
                  key={combo.perfil}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.08}
                  className={cn('rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1', combo.color)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08]">
                        <Icon className="h-4 w-4 text-white/60" />
                      </div>
                      <h4 className="text-sm font-black text-white leading-tight">{combo.perfil}</h4>
                    </div>
                    {combo.badge && (
                      <span className={cn('text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shrink-0', combo.badgeColor)}>
                        {combo.badge}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-2 mb-5">
                    {combo.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-[11px] text-white/60 font-medium">
                        <ChevronRight className="h-3 w-3 text-white/25 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <div>
                      <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold">Total mensual</p>
                      <p className="text-2xl font-black text-white">
                        {combo.total === 0 ? (
                          <span className="text-emerald-400">$0</span>
                        ) : (
                          `$${combo.total.toFixed(2)}`
                        )}
                      </p>
                    </div>
                    <Button asChild className="h-9 px-4 rounded-xl font-black text-[9px] uppercase tracking-widest bg-white/[0.08] hover:bg-white/[0.16] text-white border border-white/[0.1] transition-all hover:scale-[1.02]">
                      <Link href="/registro">
                        Empezar <ArrowRight className="w-3 h-3 ml-1" />
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
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 px-8 py-5 rounded-3xl border border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2 text-xs font-bold text-white/50">
                <Check className="h-3.5 w-3.5 text-emerald-400" strokeWidth={3} />
                Cuenta Personal siempre gratis
              </div>
              <div className="h-px w-full sm:h-6 sm:w-px bg-white/[0.08]" />
              <div className="flex items-center gap-2 text-xs font-bold text-white/50">
                <Shield className="h-3.5 w-3.5 text-blue-400" />
                Kyron Shield incluido en planes 5G
              </div>
              <div className="h-px w-full sm:h-6 sm:w-px bg-white/[0.08]" />
              <div className="flex items-center gap-2 text-xs font-bold text-white/50">
                <Leaf className="h-3.5 w-3.5 text-green-400" />
                Sostenibilidad gratis para siempre
              </div>
              <div className="h-px w-full sm:h-6 sm:w-px bg-white/[0.08]" />
              <div className="flex items-center gap-2 text-xs font-bold text-white/50">
                <Star className="h-3.5 w-3.5 text-amber-400" />
                Sin contratos anuales obligatorios
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
