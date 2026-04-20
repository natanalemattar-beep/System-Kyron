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
    <section className="relative py-24 md:py-32 bg-[#02040a] scroll-mt-20 overflow-hidden">
      {/* Dynamic background effect */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-blue-500/[0.02] blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 md:px-10 lg:px-12 max-w-[1440px] relative z-10">
        {/* Header */}
        <ScrollReveal
          className="text-center mb-16 md:mb-20"
          delay={0.1}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 mx-auto transition-all duration-500 hover:bg-white/10">
            <Handshake className="h-4 w-4 text-cyan-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Aliados Estratégicos</span>
          </div>
          <h3 className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white tracking-tight mb-4 leading-none">
            Respaldado por las <span className="text-glow-cyan">mejores marcas</span>
          </h3>
          <p className="text-base text-white/30 font-medium max-w-xl mx-auto leading-relaxed">
            Infraestructura tecnológica de clase mundial para tu empresa y tus líneas telefónicas.
          </p>
        </ScrollReveal>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {PARTNERS.map((partner, i) => (
            <ScrollReveal
              key={partner.name}
              delay={0.15 + (i * 0.08)}
              className="group relative flex flex-col items-center text-center p-8 rounded-3xl glass-elite-interactive border-white/5 transition-all duration-500 h-full"
            >
              {/* Elegant Status Badge */}
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[7px] font-black uppercase tracking-[0.15em] text-amber-300 whitespace-nowrap z-20 shadow-glow-sm transition-all duration-500 group-hover:bg-amber-500/20">
                {partner.badge}
              </span>

              {/* Logo Container */}
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${partner.color} flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-white/10 relative overflow-hidden`}>
                {partner.logo ? (
                  <div className="relative w-12 h-12 filter grayscale group-hover:grayscale-0 transition-all duration-500">
                    <Image 
                      src={partner.logo} 
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span className={cn("text-lg font-black", partner.acento)}>
                    {partner.initials}
                  </span>
                )}
                
                {/* Visual Depth Overlay */}
                <div className="absolute inset-0 bg-slate-950/20 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
              </div>

              <p className="text-sm font-black text-white/80 group-hover:text-white transition-all tracking-tight leading-tight mb-2">
                {partner.name}
              </p>
              <p className="text-[10px] text-white/20 font-medium leading-relaxed group-hover:text-white/40 transition-all">
                {partner.description}
              </p>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-20 pt-10 border-t border-white/5 text-center">
          <p className="text-[10px] text-white/20 font-black tracking-[0.4em] uppercase">
            Más alianzas próximamente • Alianzas comerciales y tecnológicas
          </p>
        </div>
      </div>
    </section>
  );
}
