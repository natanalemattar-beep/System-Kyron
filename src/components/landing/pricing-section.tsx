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
  size?: 'small' | 'medium' | 'large';
}

const SAAS_MODULES: SaasModule[] = [
  {
    id: 'contable',
    icon: Calculator,
    nombre: 'Asesoría Contable',
    descripcion: 'La solución definitiva VEN-NIF. Contabilidad en tiempo real (IVA 16%, ISLR, IGTF 3%, libros SENIAT), gestión de nómina LOTTT masiva con liquidaciones automáticas y marketing predictivo impulsado por IA para detectar nichos de mercado.',
    precio: 60,
    color: 'from-blue-500 via-cyan-500 to-emerald-400',
    acento: 'text-blue-400',
    popular: true,
    size: 'large',
  },
  {
    id: 'personal',
    icon: User,
    nombre: 'Cuenta Personal',
    descripcion: 'Bóveda biométrica 3D ultra-segura para resguardo de identidad con validez legal.',
    precio: null,
    etiqueta: '100% Gratis · Para siempre',
    color: 'from-emerald-500 to-teal-500',
    acento: 'text-emerald-400',
    size: 'small',
  },
  {
    id: 'milinea',
    icon: Phone,
    nombre: 'Mi Línea 5G',
    descripcion: 'Control absoluto 5G, gestión de eSIM y telemetría de red con Kyron Shield.',
    precio: 3,
    color: 'from-cyan-500 to-blue-500',
    acento: 'text-cyan-400',
    size: 'small',
  },
  {
    id: 'legal',
    icon: Scale,
    nombre: 'Asesoría Legal',
    descripcion: 'Potenciada por Claude 3.5 Sonnet. Kyron Voice para consultas legales por voz, redacción automática de contratos con validez jurídica y gestión de 483+ trámites administrativos.',
    precio: 25,
    color: 'from-amber-500 via-orange-500 to-yellow-500',
    acento: 'text-amber-400',
    size: 'medium',
  },
  {
    id: 'tpv',
    icon: Receipt,
    nombre: 'Facturación TPV',
    descripcion: 'Punto de Venta multimoneda inteligente con integración SENIAT profunda.',
    precio: 15,
    color: 'from-violet-500 to-purple-500',
    acento: 'text-violet-400',
    size: 'small',
  },
  {
    id: 'socios',
    icon: Users,
    nombre: 'Socios y Directivos',
    descripcion: 'Centro de mando para Holdings y Juntas Directivas. BI predictivo y consolidación financiera multi-empresa.',
    precio: 40,
    color: 'from-rose-500 to-pink-500',
    acento: 'text-rose-400',
    size: 'medium',
  },
  {
    id: 'sostenibilidad',
    icon: Leaf,
    nombre: 'Sostenibilidad',
    descripcion: 'Líder en tecnología ambiental con Smart Bins de inducción magnética y Eco‑Créditos certificados.',
    precio: null,
    etiqueta: 'Gratis · Con tu cuenta',
    color: 'from-green-500 to-lime-500',
    acento: 'text-green-400',
    size: 'small',
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
  { nombre: 'Básico',      datos: '4 GB',       minutos: '200',        sms: '400',        precio: 11.25, color: 'text-white' },
  { nombre: 'Plus',        datos: '10 GB',      minutos: '400',        sms: '800',        precio: 17.99, color: 'text-white' },
  { nombre: 'Pro',         datos: '25 GB',      minutos: '600',        sms: '1200',       precio: 24.49, popular: true, color: 'text-white' },
  { nombre: 'Empresarial', datos: '30 GB',      minutos: '500',        sms: '500',        precio: 25.00, color: 'text-white' },
  { nombre: 'Ilimitado',   datos: 'Ilimitado',  minutos: 'Ilimitado',  sms: 'Ilimitado',  precio: 30.00, color: 'text-white' },
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
    <div className="text-center mb-16 md:mb-20">
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm mb-6 mx-auto transition-transform hover:scale-105 duration-500">
        <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-200/60">{badge}</span>
      </div>
      <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-none">
        {title}{' '}
        {highlight && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 block sm:inline mt-2 sm:mt-0">
            {highlight}
          </span>
        )}
      </h3>
      <p className="text-base text-white/30 font-medium max-w-xl mx-auto leading-relaxed">{subtitle}</p>
    </div>
  );
}

function ModuleCard({ mod, index }: { mod: SaasModule; index: number }) {
  const Icon = mod.icon;
  const isFree = mod.precio === null;
  const route = MODULE_ROUTES[mod.id] || '/register';

  return (
    <ScrollReveal
      delay={index * 0.08}
      className={cn(
        'relative group p-8 flex flex-col transition-all duration-700 h-full rounded-[2.5rem] overflow-hidden',
        mod.size === 'large' ? 'lg:col-span-2 lg:row-span-2 bg-[#0a1025] border-blue-500/30' : 
        mod.size === 'medium' ? 'lg:col-span-2 bg-white/[0.02] border-white/5 shadow-2xl' : 
        'bg-white/[0.01] border-white/5 hover:border-white/10 shadow-lg'
      )}
    >
      {/* Decorative Border Beam HUD (Top-right) */}
      <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute top-6 right-6 w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
        <div className="absolute top-6 right-6 w-8 h-[1px] bg-white/10" />
        <div className="absolute top-6 right-6 h-8 w-[1px] bg-white/10" />
      </div>

      <div className="flex items-start justify-between mb-10 relative z-10">
        <div className={cn(
          'h-16 w-16 rounded-2xl flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 shadow-2xl', 
          mod.size === 'large' ? 'bg-blue-500/20 border-blue-500/40' : 'bg-white/5 border border-white/10 group-hover:bg-white/10'
        )}>
          <Icon className={cn(mod.size === 'large' ? 'h-8 w-8' : 'h-6 w-6', mod.acento)} />
        </div>
        
        {isFree ? (
          <span className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-[0.2em] rounded-full backdrop-blur-md">
            Soberanía Gratis
          </span>
        ) : (
          <div className="text-right">
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-sm font-black text-white/30 uppercase tracking-widest leading-none">$</span>
              <span className="text-4xl font-black text-white leading-none tracking-tighter">{mod.precio}</span>
            </div>
            <span className="text-[9px] text-white/20 font-black uppercase tracking-[0.2em] block mt-2">Suscripción Mensual</span>
          </div>
        )}
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <h4 className={cn(
          "font-black text-white mb-4 tracking-tight flex items-center gap-3",
          mod.size === 'large' ? 'text-3xl lg:text-4xl' : 'text-xl'
        )}>
          {mod.nombre}
          {mod.popular && <div className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />}
        </h4>
        
        <p className={cn(
          "text-white/40 font-medium leading-relaxed mb-10",
          mod.size === 'large' ? 'text-lg lg:text-xl' : 'text-xs'
        )}>
          {mod.descripcion}
        </p>

        <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
          <Button asChild className={cn(
            'h-12 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-500 group-hover:scale-[1.05] shadow-xl',
            mod.size === 'large' ? 'px-10 bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20' : 'px-8 bg-white/5 hover:bg-white/10 text-white border border-white/10'
          )}>
            <Link href={route} className="flex items-center gap-3">
              Activar Módulo <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          {mod.popular && (
            <div className="hidden sm:flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest">Recomendado</span>
            </div>
          )}
        </div>
      </div>

      {/* Mouse Reactive Gradient Glow */}
      <div className={cn(
        "absolute -bottom-24 -right-24 w-80 h-80 blur-[120px] opacity-0 group-hover:opacity-20 transition-opacity duration-1000 bg-gradient-to-br",
        mod.color
      )} />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay" />
    </ScrollReveal>
  );
}


// ═══════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════
export function PricingSection({ category = 'all' }: { category?: 'software' | 'telecom' | 'hardware' | 'all' }) {
  const showSoftware = category === 'software' || category === 'all';
  const showTelecom = category === 'telecom' || category === 'all';
  const showHardware = category === 'hardware' || category === 'all';
  
  // Custom titles based on category
  const headerTitle = category === 'software' ? 'Módulos SaaS' : 
                      category === 'telecom' ? 'Líneas y 5G' : 
                      category === 'hardware' ? 'Hardware Fiscal' : 
                      'Elige solo lo que';
  
  const headerHighlight = category === 'all' ? 'realmente necesitas' : '';
  const headerSubtitle = category === 'software' ? 'Activa los módulos que tu negocio necesita. Precio fijo mensual.' :
                         category === 'telecom' ? 'Planes de líneas 5G con Kyron Shield incluido.' :
                         category === 'hardware' ? 'Equipo certificado por el SENIAT. Pago único.' :
                         'Módulos independientes + planes de líneas 5G + hardware fiscal certificado. Sin contratos anuales obligatorios.';
  return (
    <section
      id="pricing"
      className="relative py-32 md:py-48 w-full overflow-hidden scroll-mt-20 bg-[#050816]"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/[0.04] blur-[150px] animate-mesh-drift" />
        <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/[0.03] blur-[150px]" />
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
            <Zap className="h-4 w-4 text-cyan-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-200/80">Planes y Precios</span>
          </div>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black tracking-[-0.04em] text-white leading-[0.95] mb-8">
            {headerTitle}<br />
            {headerHighlight && (
              <span className="block text-glow-cyan mt-2">{headerHighlight}</span>
            )}
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            {headerSubtitle}
          </p>

          {/* Free note */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 backdrop-blur-sm">
            <Check className="h-4 w-4 text-emerald-400" strokeWidth={3} />
            <span className="text-xs font-black text-emerald-200 uppercase tracking-widest">
              La Cuenta Personal y Sostenibilidad son gratis para siempre
            </span>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════
            BLOQUE 1 — MÓDULOS SAAS
        ══════════════════════════════════════════ */}
        {showSoftware && (
        <div className="mb-32 md:mb-48">
          <SectionTitle
            badge="Módulos SaaS"
            title="Activa solo los módulos"
            highlight="que tu negocio necesita"
            subtitle="Precio fijo mensual. Sin sorpresas. Cancela cuando quieras."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 auto-rows-fr">
            {SAAS_MODULES.map((mod, i) => (
              <ModuleCard key={mod.id} mod={mod} index={i} />
            ))}
          </div>
        </div>
        )}

        {/* ══════════════════════════════════════════
            BLOQUE 2 — PLANES 5G
        ══════════════════════════════════════════ */}
        {showTelecom && (
        <div className="mb-32 md:mb-48">
          <SectionTitle
            badge="Conectividad 5G"
            title="Planes de líneas"
            highlight="5G con Kyron Shield"
            subtitle="Cada plan incluye 3 seguros: reposición de equipo, perito forense SENIAT y abogado en 1h."
          />

          {/* Kyron Shield badge */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex items-center gap-4 px-8 py-5 rounded-3xl border border-blue-500/20 bg-blue-500/10 backdrop-blur-md">
              <Shield className="h-6 w-6 text-blue-400" />
              <div className="text-left">
                <p className="text-xs font-black text-white uppercase tracking-widest">Kyron Shield incluido</p>
                <p className="text-[10px] text-white/40 font-medium">Reposición de equipo · Perito forense SENIAT · Abogado en 1h</p>
              </div>
            </div>
          </div>

          {/* Plans cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {PLANES_5G.map((plan, i) => (
              <motion.div
                key={plan.nombre}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.08}
                className={cn(
                  'relative p-8 flex flex-col transition-all duration-500 hover:-translate-y-2 rounded-3xl glass-elite-interactive',
                  plan.popular
                    ? 'border-blue-500/40 bg-blue-500/5'
                    : 'border-white/5 bg-white/[0.02]'
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <span className="px-4 py-1.5 bg-blue-500 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg border border-white/20">
                      MÁS ELEGIDO
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <Wifi className="h-5 w-5 text-cyan-400" />
                  <h4 className={cn('text-sm font-black uppercase tracking-widest', plan.color)}>{plan.nombre}</h4>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white tracking-tighter">${plan.precio.toFixed(2)}</span>
                    <span className="text-[10px] text-white/30 font-black uppercase tracking-widest ml-1">/mes</span>
                  </div>
                </div>

                {/* Specs */}
                <div className="space-y-4 mb-10 flex-1">
                  {[
                    { label: 'Datos', value: plan.datos },
                    { label: 'Minutos', value: plan.minutos },
                    { label: 'SMS', value: plan.sms },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between text-xs py-1 border-b border-white/5">
                      <span className="text-white/40 font-medium">{label}</span>
                      <span className={cn('font-black', plan.color)}>{value}</span>
                    </div>
                  ))}
                </div>

                <Button asChild className={cn(
                  'w-full h-11 rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] transition-all duration-500 hover:scale-[1.03]',
                  plan.popular
                    ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                )}>
                  <Link href="/registro">
                    Contratar <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
            className="mt-12 p-8 rounded-3xl border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md flex items-start gap-5 max-w-4xl mx-auto"
          >
            <div className="h-12 w-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center shrink-0">
              <Phone className="h-6 w-6 text-cyan-400" />
            </div>
            <p className="text-sm text-white/50 font-medium leading-relaxed">
              <span className="text-cyan-400 font-black uppercase tracking-widest block mb-1">¿Ya tienes línea con otro operador?</span>{' '}
              Contrata solo el módulo "Mi Línea 5G" por <span className="text-white font-black">$3/mes</span> para gestionar tu línea existente dentro de System Kyron, con todas las herramientas de administración y seguridad empresarial.
            </p>
          </motion.div>
        </div>
        )}

        {/* ══════════════════════════════════════════
            BLOQUE 3 — HARDWARE FISCAL
        ══════════════════════════════════════════ */}
        {showHardware && (
        <div className="mb-32 md:mb-48">
          <SectionTitle
            badge="Hardware Fiscal"
            title="Equipo certificado"
            highlight="SENIAT"
            subtitle="Pago único. Sin mensualidad. Entrega en todo Venezuela."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  className="rounded-3xl p-10 flex flex-col transition-all duration-500 hover:-translate-y-2 glass-elite-interactive border-white/5"
                >
                  <div className="flex items-center gap-5 mb-8">
                    <div className="h-16 w-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white tracking-tight">{hw.nombre}</h4>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 mt-1">
                        <Check className="h-2.5 w-2.5 text-emerald-400" />
                        <span className="text-[8px] text-emerald-400 font-black uppercase tracking-widest">SENIAT Certificado</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-white/40 font-medium leading-relaxed flex-1 mb-8">{hw.descripcion}</p>

                  <div className="flex items-center justify-between pt-8 border-t border-white/5">
                    <div>
                      <p className="text-[9px] text-white/20 font-black uppercase tracking-[0.2em] mb-1">Inversión única</p>
                      <p className="text-3xl font-black text-white tracking-tighter">${hw.precio}</p>
                    </div>
                    <Button asChild className="h-12 px-8 rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] bg-amber-500 hover:bg-amber-600 text-black shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.03]">
                      <Link href="#contacto">
                        Cotizar <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        )}

        {/* ══════════════════════════════════════════
            BLOQUE 4 — COMBINACIONES
        ══════════════════════════════════════════ */}
        {category === 'all' && (
        <div>
          <SectionTitle
            badge="Personalización"
            title="Escalabilidad"
            highlight="sin límites"
            subtitle="Combina módulos según tu perfil. Crece con nosotros."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
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
                  className={cn('rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 glass-elite-interactive border-white/5', combo.color.replace('border-', 'border-opacity-0 border-'))}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-white/60" />
                      </div>
                      <h4 className="text-base font-black text-white tracking-tight">{combo.perfil}</h4>
                    </div>
                    {combo.badge && (
                      <span className={cn('text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shrink-0 border border-white/20 shadow-lg', combo.badgeColor)}>
                        {combo.badge}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {combo.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-xs text-white/50 font-medium">
                        <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div>
                      <p className="text-[9px] text-white/20 font-black uppercase tracking-[0.2em] mb-1">Costo Estimado</p>
                      <p className="text-3xl font-black text-white tracking-tighter leading-none">
                        {combo.total === 0 ? (
                          <span className="text-emerald-400">Gratis</span>
                        ) : (
                          `$${combo.total.toFixed(2)}`
                        )}
                      </p>
                    </div>
                    <Button asChild className="h-11 px-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all hover:scale-[1.03]">
                      <Link href="/registro">
                        Iniciar <ArrowRight className="w-4 h-4 ml-2" />
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
            <div className="inline-grid grid-cols-2 md:grid-cols-4 gap-4 px-10 py-8 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-md max-w-5xl mx-auto">
              <div className="flex flex-col items-center gap-3 p-4">
                <Check className="h-5 w-5 text-emerald-400" strokeWidth={3} />
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest text-center leading-tight">Cuenta Personal<br/>Sempre Gratis</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 border-l border-white/5">
                <Shield className="h-5 w-5 text-blue-400" />
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest text-center leading-tight">Kyron Shield<br/>Integrado</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 border-l border-white/5">
                <Leaf className="h-5 w-5 text-green-400" />
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest text-center leading-tight">Sostenibilidad<br/>Certificada</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 border-l border-white/5">
                <Star className="h-5 w-5 text-amber-400" />
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest text-center leading-tight">Sin Contratos<br/>Obligatorios</span>
              </div>
            </div>
          </motion.div>
        </div>
        )}
      </div>
    </section>
  );
}
