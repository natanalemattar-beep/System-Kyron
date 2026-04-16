'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, ShieldCheck, Zap, Bot, Eye, Sparkles, Lock } from 'lucide-react';

import { Link } from '@/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const PricingFeatureTable = dynamic(() => import('./pricing-feature-table').then(m => m.PricingFeatureTable), {
  ssr: false,
  loading: () => <div className="h-96 w-full animate-pulse bg-white/5 rounded-3xl mt-20" />
});

const AddonMarketplace = dynamic(() => import('./addon-marketplace').then(m => m.AddonMarketplace), {
  ssr: false
});



const plans = [
  {
    name: 'Start / Básico',
    description: 'Para Pymes y Profesionales Independientes',
    price: '29.99',
    popular: false,
    icon: ShieldCheck,
    features: [
      'Contabilidad base y facturación',
      'Conexión SAIME / SENIAT nivel 1',
      'Gestión de hasta 5 empleados',
      'Panel de reportes básicos',
      'Soporte por correo electrónico'
    ],
    cta: 'Comenzar Gratis'
  },
  {
    name: 'Business / Corporativo',
    description: 'Empresas en crecimiento y consolidación',
    price: '89.99',
    popular: true,
    icon: Zap,
    features: [
      'Todo lo del plan Start',
      'RRHH y Nómina completa (IVSS/FAOV)',
      'IA Jurídica y análisis de contratos',
      'Notificaciones por WhatsApp',
      'Bóveda digital de documentos (50GB)',
      'Soporte prioritario 24/7'
    ],
    cta: 'Elegir Corporativo'
  },
  {
    name: 'Elite / Enterprise',
    description: 'Holdings y empresas de alto volumen',
    price: '199.99',
    popular: false,
    icon: Bot,
    features: [
      'Todo lo del plan Business',
      'Empleados y Facturas Ilimitadas',
      'Dashboards personalizados a medida',
      'Acceso API y Webhooks',
      'Bóveda digital ilimitada',
      'Consultoría estratégica de IA'
    ],
    cta: 'Contactar Ventas'
  }
];

export function PricingSection() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section id="pricing" className="relative py-24 sm:py-32 w-full bg-slate-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[800px] h-[800px] rounded-full bg-blue-600/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-600/[0.03] blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500/50" />
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Modelos de Inversión</span>
            </div>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-blue-500/50" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white mb-8"
          >
            Potencia tu empresa con <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Cero Fricción Económica</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg leading-relaxed text-slate-400 font-medium max-w-2xl mx-auto"
          >
            Estructuras de costos diseñadas para la escalabilidad. Desde pymes hasta holdings globales, optimizamos tu rentabilidad con IA de grado empresarial.
          </motion.p>
        </div>

        <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              className={cn(
                "rounded-[2.5rem] p-8 xl:p-10 border transition-all duration-500 hover:-translate-y-3 relative group",
                plan.popular 
                  ? "bg-gradient-to-br from-blue-900/20 via-slate-900/40 to-indigo-900/20 border-blue-500/30 shadow-2xl shadow-blue-500/20" 
                  : "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04] shadow-xl"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="relative group/tag">
                    <div className="absolute inset-0 bg-blue-500 blur-lg opacity-40 group-hover/tag:opacity-60 transition-opacity" />
                    <span className="relative bg-blue-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">
                      Líder en Suscripción
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-5 mb-8">
                 <div className={cn(
                   "w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl ring-1",
                   plan.popular 
                    ? "bg-blue-500 text-white ring-blue-400/50" 
                    : "bg-slate-900 text-slate-400 ring-white/10"
                 )}>
                   <plan.icon className="w-7 h-7" />
                 </div>
                 <div>
                    <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{plan.name}</h3>
                    <p className="text-[11px] font-bold text-slate-500 leading-tight uppercase tracking-widest">{plan.description}</p>
                 </div>
              </div>

              <div className="mb-10 flex items-baseline gap-x-2">
                <span className="text-6xl font-black tracking-tighter text-white">${plan.price}</span>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest">USD</span>
                  <span className="text-xs font-bold text-slate-500 uppercase leading-none">/ mes</span>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {plan.features.slice(0, 5).map((feature) => (
                  <div key={feature} className="flex gap-x-3 items-center">
                    <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-blue-400" strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                asChild 
                className={cn(
                  "w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:scale-[1.03] active:scale-95",
                  plan.popular 
                    ? "bg-blue-500 hover:bg-blue-600 text-white shadow-xl shadow-blue-500/40 border-b-4 border-blue-700" 
                    : "bg-white/10 hover:bg-white/20 text-white border-b-4 border-white/5"
                )}
              >
                <Link href="/registro">
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Action Toggle and Secondary Components */}
        <div className="mt-20 flex flex-col items-center">
          <Button
            variant="ghost"
            onClick={() => setShowDetails(!showDetails)}
            className="group flex items-center gap-3 text-slate-400 hover:text-white transition-all text-sm font-black uppercase tracking-widest py-6 px-10 rounded-full bg-white/5 border border-white/5 hover:bg-white/10"
          >
            <Eye className={cn("w-5 h-5 transition-transform", showDetails && "rotate-180")} />
            {showDetails ? 'Ocultar Comparativa' : 'Ver Comparativa Detallada'}
          </Button>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full overflow-hidden"
              >
                <PricingFeatureTable />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Individual Modules Section */}
        <AddonMarketplace />

        {/* Reliability note */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            <Lock className="w-3 h-3 text-emerald-500" />
            Pagos procesados de forma segura con encriptación militar de 256 bits
          </div>
        </div>
      </div>
    </section>
  );
}


