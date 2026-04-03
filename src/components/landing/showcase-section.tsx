'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/use-device-performance';
import { Monitor, Smartphone, ShieldCheck, BookOpen, HelpCircle } from 'lucide-react';
import { ThemeImage } from '@/components/ui/theme-image';

const screenshots = [
  {
    darkSrc: '/images/landing/screenshot-portales-dark.jpg',
    lightSrc: '/images/landing/screenshot-portales-light.jpg',
    title: 'Selector de Portales',
    description: 'Acceso centralizado a todos los módulos con cifrado AES-256',
    icon: ShieldCheck,
    color: 'from-cyan-500 to-blue-500',
    accent: 'border-cyan-500/30',
    size: 'large' as const,
  },
  {
    darkSrc: '/images/landing/screenshot-contabilidad-dark.jpg',
    lightSrc: '/images/landing/screenshot-contabilidad-light.jpg',
    title: 'Acceso Seguro',
    description: 'Login especializado por módulo con verificación 2FA',
    icon: Monitor,
    color: 'from-blue-500 to-violet-500',
    accent: 'border-blue-500/30',
    size: 'medium' as const,
  },
  {
    darkSrc: '/images/landing/screenshot-registro-dark.jpg',
    lightSrc: '/images/landing/screenshot-registro-light.jpg',
    title: 'Registro Inteligente',
    description: 'Validación de cédula y RIF con consulta SAIME/SENIAT',
    icon: Smartphone,
    color: 'from-emerald-500 to-cyan-500',
    accent: 'border-emerald-500/30',
    size: 'medium' as const,
  },
  {
    darkSrc: '/images/landing/screenshot-guia-dark.jpg',
    lightSrc: '/images/landing/screenshot-guia-light.jpg',
    title: 'Guía Interactiva',
    description: 'Tutorial paso a paso para nuevos usuarios',
    icon: BookOpen,
    color: 'from-violet-500 to-purple-500',
    accent: 'border-violet-500/30',
    size: 'medium' as const,
  },
  {
    darkSrc: '/images/landing/screenshot-faq-dark.jpg',
    lightSrc: '/images/landing/screenshot-faq-light.jpg',
    title: 'Centro de Ayuda',
    description: '26 preguntas en 9 categorías especializadas',
    icon: HelpCircle,
    color: 'from-amber-500 to-orange-500',
    accent: 'border-amber-500/30',
    size: 'medium' as const,
  },
];

function ScreenshotCard({
  item,
  index,
  animate,
}: {
  item: typeof screenshots[0];
  index: number;
  animate: boolean;
}) {
  return (
    <motion.div
      className={cn(
        'group relative',
        item.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''
      )}
      initial={animate ? { opacity: 0, y: 30 } : undefined}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={cn(
        'relative rounded-2xl overflow-hidden border shadow-xl transition-all duration-500',
        'hover:-translate-y-1.5 hover:shadow-2xl',
        'bg-white/60',
        item.accent
      )}>
        <div className={cn(
          'absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 -z-[1]',
          `bg-gradient-to-br ${item.color}`
        )} />

        <div className="relative overflow-hidden">
          <ThemeImage
            darkSrc={item.darkSrc}
            lightSrc={item.lightSrc}
            alt={item.title}
            width={item.size === 'large' ? 800 : 640}
            height={item.size === 'large' ? 500 : 360}
            quality={90}
            className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
            loading="lazy"
            sizes={item.size === 'large' ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
          />
        </div>

        <div className="p-4 md:p-5">
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className={cn(
              'flex items-center justify-center w-7 h-7 rounded-lg',
              `bg-gradient-to-br ${item.color}`
            )}>
              <item.icon className="h-3.5 w-3.5 text-white" />
            </div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-tight">
              {item.title}
            </h3>
          </div>
          <p className="text-xs text-muted-foreground font-medium pl-9.5">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function ShowcaseSection() {
  const { tier } = useDevicePerformance();
  const animate = tier !== 'low';

  return (
    <section className="py-16 md:py-28 relative overflow-hidden bg-gradient-to-br from-cyan-50/60 via-teal-50/40 to-emerald-50/50">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-300/25 to-transparent" />
        <div className="absolute top-[15%] left-[5%] w-[500px] h-[500px] rounded-full bg-cyan-400/[0.07] blur-[120px]" />
        <div className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] rounded-full bg-emerald-400/[0.06] blur-[100px]" />
      </div>
      <div className="container mx-auto px-4 md:px-10 max-w-7xl">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={animate ? { opacity: 0, y: 20 } : undefined}
          whileInView={animate ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass-subtle text-[9px] font-black uppercase tracking-[0.3em] text-primary mx-auto mb-5">
            <Monitor className="h-3 w-3" /> Vista Previa de la Plataforma
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground uppercase leading-[1.1] mb-4">
            Conoce{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">
              System Kyron
            </span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto font-medium">
            Capturas reales de nuestra plataforma. Diseño profesional, seguridad de grado empresarial.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-auto gap-4 md:gap-5">
          {screenshots.map((item, idx) => (
            <ScreenshotCard key={item.title} item={item} index={idx} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
}
