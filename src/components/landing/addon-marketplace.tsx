'use client';

import { motion } from 'framer-motion';
import { 
  Plus, Fingerprint, FileText, Heart, 
  Scale, PieChart, MessageSquare, Users 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const addons = [
  {
    id: 'saime',
    name: 'Módulo SAIME',
    desc: 'Sincronización de identidad y datos biométricos en tiempo real.',
    price: '9.99',
    icon: Fingerprint,
    color: 'blue'
  },
  {
    id: 'seniat',
    name: 'SENIAT Pro',
    desc: 'Herramientas avanzadas de tributación y cierre fiscal automático.',
    price: '14.99',
    icon: FileText,
    color: 'amber'
  },
  {
    id: 'rrhh',
    name: 'IVSS / FAOV Sync',
    desc: 'Gestión automatizada de aportes y solvencias ante entes laborales.',
    price: '12.99',
    icon: Heart,
    color: 'rose'
  },
  {
    id: 'legal',
    name: 'Asistente Legal AI',
    desc: 'Consultoría jurídica 24/7 con base en la LOTTT y leyes venezolanas.',
    price: '19.99',
    icon: Scale,
    color: 'purple'
  },
  {
    id: 'analytics',
    name: 'CFO Analytics',
    desc: 'Dashboards financieros avanzados para toma de decisiones estratégica.',
    price: '14.99',
    icon: PieChart,
    color: 'emerald'
  },
  {
    id: 'whatsapp',
    name: 'Alertas WhatsApp',
    desc: 'Notificaciones automáticas a clientes y empleados vía WhatsApp.',
    price: '4.99',
    icon: MessageSquare,
    color: 'green'
  },
  {
    id: 'users',
    name: 'Multi-Usuario+',
    desc: 'Añade 5 puestos de trabajo adicionales con permisos granulares.',
    price: '7.99',
    icon: Users,
    color: 'indigo'
  }
];

export function AddonMarketplace() {
  return (
    <div className="mt-20">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-black text-white mb-2 tracking-tight uppercase">Módulos Individuales</h3>
        <p className="text-slate-400 text-sm font-medium">¿Solo necesitas una herramienta? Agrégala a tu plan base o cómprala por separado.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {addons.map((addon, index) => (
          <motion.div
            key={addon.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group relative rounded-2xl border border-white/5 bg-white/[0.03] p-6 hover:bg-white/[0.07] hover:border-white/10 transition-all duration-300 overflow-hidden"
          >
            {/* Glossy background effect */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
            
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg",
                addon.color === 'blue' && "bg-blue-500/20 text-blue-400",
                addon.color === 'amber' && "bg-amber-500/20 text-amber-400",
                addon.color === 'rose' && "bg-rose-500/20 text-rose-400",
                addon.color === 'purple' && "bg-purple-500/20 text-purple-400",
                addon.color === 'emerald' && "bg-emerald-500/20 text-emerald-400",
                addon.color === 'green' && "bg-green-500/20 text-green-400",
                addon.color === 'indigo' && "bg-indigo-500/20 text-indigo-400",
              )}>
                <addon.icon className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white uppercase tracking-tight">{addon.name}</h4>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-6 h-12 overflow-hidden">
              {addon.desc}
            </p>

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-white">${addon.price}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">/mes</span>
              </div>
              <Button size="sm" className="h-8 w-8 rounded-lg p-0 bg-white/5 hover:bg-white/10 text-white">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}

        {/* Custom Solution Card */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.4 }}
           className="col-span-1 md:col-span-1 lg:col-span-1 rounded-2xl border-2 border-dashed border-white/10 bg-transparent p-6 flex flex-col items-center justify-center text-center group hover:border-blue-500/30 transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Plus className="w-5 h-5 text-slate-500" />
          </div>
          <h4 className="text-sm font-bold text-slate-400 mb-1">Traje a Medida</h4>
          <p className="text-[10px] text-slate-500 leading-tight">¿Necesitas algo único? Contacta a nuestro equipo.</p>
        </motion.div>
      </div>
    </div>
  );
}
