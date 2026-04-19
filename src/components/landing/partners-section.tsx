'use client';

import { motion } from 'framer-motion';
import { Handshake } from 'lucide-react';

const PARTNERS = [
  {
    name: 'Samsung',
    description: 'Dispositivos certificados',
    logo: null,
    initials: 'SAM',
    color: 'from-blue-600 to-blue-800',
    active: true,
  },
  {
    name: 'Xiaomi',
    description: 'Partner de distribución',
    logo: null,
    initials: 'MI',
    color: 'from-orange-500 to-red-600',
    active: true,
  },
  {
    name: 'Motorola',
    description: 'Integración eSIM',
    logo: null,
    initials: 'MOTO',
    color: 'from-slate-500 to-slate-700',
    active: true,
  },
  {
    name: 'Apple',
    description: 'eSIM compatible',
    logo: null,
    initials: '🍎',
    color: 'from-gray-600 to-gray-800',
    active: true,
  },
  {
    name: 'HKA Factory',
    description: 'Infraestructura local',
    logo: null,
    initials: 'HKA',
    color: 'from-indigo-600 to-violet-700',
    active: true,
  },
  {
    name: 'Ameru.AI',
    description: 'IA corporativa',
    logo: null,
    initials: 'AI',
    color: 'from-emerald-500 to-teal-700',
    badge: 'En desarrollo',
    active: false,
  },
];

export function PartnersSection() {
  return (
    <section className="relative py-16 bg-slate-950/80 border-y border-white/[0.05] overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 via-transparent to-violet-950/20 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-10 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] mb-5">
            <Handshake className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">Aliados Estratégicos</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
            Respaldado por las <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">mejores marcas</span>
          </h3>
          <p className="text-sm text-white/40 font-medium max-w-lg mx-auto">
            Infraestructura tecnológica de clase mundial para tu empresa y tus líneas telefónicas.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative flex flex-col items-center text-center p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Badge for "coming soon" */}
              {partner.badge && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-[8px] font-black uppercase tracking-widest text-violet-400 whitespace-nowrap">
                  {partner.badge}
                </span>
              )}

              {/* Logo / Initials */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${partner.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300 ${!partner.active ? 'opacity-60' : ''}`}>
                <span className="text-sm font-black text-white">
                  {partner.initials}
                </span>
              </div>

              <p className="text-xs font-black text-white/80 group-hover:text-white transition-colors leading-tight">
                {partner.name}
              </p>
              <p className="text-[9px] text-white/35 font-medium mt-1 leading-tight">
                {partner.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-[10px] text-white/25 font-medium mt-10 tracking-wider uppercase">
          Más alianzas próximamente • Alianzas comerciales y tecnológicas
        </p>
      </div>
    </section>
  );
}
