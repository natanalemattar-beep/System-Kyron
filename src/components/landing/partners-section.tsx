import { motion } from 'framer-motion';
import { Handshake } from 'lucide-react';
import Image from 'next/image';
import { ScrollReveal, ScrollRevealGroup } from "./scroll-reveal";
import { cn } from "@/lib/utils";

const PARTNERS = [
  {
    name: 'Samsung',
    description: 'Dispositivos certificados',
    logo: '/images/partners/samsung.png',
    initials: 'SAM',
    color: 'from-[#1428A0]/10 to-[#1428A0]/20',
    acento: 'text-[#1428A0]',
    active: false,
    badge: 'En desarrollo',
  },
  {
    name: 'Xiaomi',
    description: 'Partner de distribución',
    logo: '/images/partners/xiaomi.png',
    initials: 'MI',
    color: 'from-[#FF6700]/10 to-[#FF6700]/20',
    acento: 'text-[#FF6700]',
    active: false,
    badge: 'En desarrollo',
  },
  {
    name: 'Motorola',
    description: 'Integración eSIM',
    logo: '/images/partners/motorola.png',
    initials: 'MOTO',
    color: 'from-[#5C92FA]/10 to-[#5C92FA]/20',
    acento: 'text-[#5C92FA]',
    active: false,
    badge: 'En desarrollo',
  },
  {
    name: 'Apple',
    description: 'eSIM compatible',
    logo: '/images/partners/apple.png',
    initials: '🍎',
    color: 'from-gray-500/10 to-gray-800/20',
    acento: 'text-gray-400',
    active: false,
    badge: 'En desarrollo',
  },
  {
    name: 'HKA Factory',
    description: 'Infraestructura fiscal',
    logo: '/images/partners/hka.png',
    initials: 'HKA',
    color: 'from-[#0055A4]/10 to-[#F29100]/10',
    acento: 'text-[#0055A4]',
    active: false,
    badge: 'En desarrollo',
  },
  {
    name: 'Ameru.AI',
    description: 'IA corporativa',
    logo: '/images/partners/ameru.png',
    initials: 'AI',
    color: 'from-[#2ECC71]/10 to-[#27AE60]/20',
    acento: 'text-[#2ECC71]',
    active: false,
    badge: 'En desarrollo',
  },
];

export function PartnersSection() {
  return (
    <section className="relative py-16 bg-slate-950/80 border-y border-white/[0.05] overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 via-transparent to-violet-950/20 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-10 max-w-7xl relative z-10">
        {/* Header */}
        <ScrollReveal
          className="text-center mb-12"
          delay={0.1}
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
        </ScrollReveal>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {PARTNERS.map((partner, i) => (
            <ScrollReveal
              key={partner.name}
              delay={0.15 + (i * 0.08)}
              className="group relative flex flex-col items-center text-center p-5 rounded-2xl border border-white/[0.06] bg-white/5 hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-1 h-full"
            >
              {/* Badge for "En desarrollo" */}
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-[8px] font-black uppercase tracking-widest text-violet-400 whitespace-nowrap z-20">
                {partner.badge}
              </span>

              {/* Logo Image */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${partner.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-all duration-300 border border-white/5 relative overflow-hidden`}>
                {partner.logo ? (
                  <div className="relative w-10 h-10 filter grayscale group-hover:grayscale-0 transition-all duration-300">
                    <Image 
                      src={partner.logo} 
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span className={cn("text-sm font-black", partner.acento)}>
                    {partner.initials}
                  </span>
                )}
                
                {/* Overlay for inactive state */}
                <div className="absolute inset-0 bg-slate-950/40 pointer-events-none group-hover:bg-transparent transition-colors duration-300" />
              </div>

              <p className="text-[11px] font-black text-white/80 group-hover:text-white transition-colors leading-tight">
                {partner.name}
              </p>
              <p className="text-[9px] text-white/35 font-medium mt-1 leading-tight group-hover:text-white/50 transition-colors">
                {partner.description}
              </p>
            </ScrollReveal>
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
