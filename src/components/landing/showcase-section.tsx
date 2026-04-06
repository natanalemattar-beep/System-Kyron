'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/use-device-performance';
import { Monitor, Smartphone, ShieldCheck, BookOpen, HelpCircle, Eye } from 'lucide-react';
import { ThemeImage } from '@/components/ui/theme-image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const screenshotConfigs = [
  {
    darkSrc: '/images/landing/screenshot-portales-dark.jpg',
    lightSrc: '/images/landing/screenshot-portales-light.jpg',
    icon: ShieldCheck,
    gradient: 'from-cyan-500 to-blue-600',
    border: 'border-cyan-500/15',
    glowColor: 'rgba(6,182,212,0.15)',
    size: 'large' as const,
  },
  {
    darkSrc: '/images/landing/screenshot-contabilidad-dark.jpg',
    lightSrc: '/images/landing/screenshot-contabilidad-light.jpg',
    icon: Monitor,
    gradient: 'from-blue-500 to-violet-600',
    border: 'border-blue-500/15',
    glowColor: 'rgba(59,130,246,0.15)',
    size: 'medium' as const,
  },
  {
    darkSrc: '/images/landing/screenshot-registro-dark.jpg',
    lightSrc: '/images/landing/screenshot-registro-light.jpg',
    icon: Smartphone,
    gradient: 'from-emerald-500 to-cyan-600',
    border: 'border-emerald-500/15',
    glowColor: 'rgba(16,185,129,0.15)',
    size: 'medium' as const,
  },
  {
    darkSrc: '/images/landing/screenshot-guia-dark.jpg',
    lightSrc: '/images/landing/screenshot-guia-light.jpg',
    icon: BookOpen,
    gradient: 'from-violet-500 to-purple-600',
    border: 'border-violet-500/15',
    glowColor: 'rgba(139,92,246,0.15)',
    size: 'medium' as const,
  },
  {
    darkSrc: '/images/landing/screenshot-faq-dark.jpg',
    lightSrc: '/images/landing/screenshot-faq-light.jpg',
    icon: HelpCircle,
    gradient: 'from-amber-500 to-orange-600',
    border: 'border-amber-500/15',
    glowColor: 'rgba(245,158,11,0.15)',
    size: 'medium' as const,
  },
];

function ScreenshotCard({
  config,
  title,
  description,
  previewLabel,
  index,
  animate,
}: {
  config: typeof screenshotConfigs[0];
  title: string;
  description: string;
  previewLabel: string;
  index: number;
  animate: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        'group relative',
        config.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''
      )}
      initial={animate ? { opacity: 0, y: 40, scale: 0.93 } : undefined}
      whileInView={animate ? { opacity: 1, y: 0, scale: 1 } : undefined}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={cn(
        'relative rounded-2xl overflow-hidden border-2 transition-all duration-700',
        'hover:-translate-y-3 hover:shadow-2xl',
        'bg-white/[0.02] backdrop-blur-sm',
        config.border,
        hovered && 'border-white/[0.15]'
      )}
        style={hovered ? { boxShadow: `0 30px 70px -15px ${config.glowColor}` } : undefined}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative overflow-hidden">
          <ThemeImage
            darkSrc={config.darkSrc}
            lightSrc={config.lightSrc}
            alt={title}
            width={config.size === 'large' ? 800 : 640}
            height={config.size === 'large' ? 500 : 360}
            quality={75}
            className="w-full h-auto transition-transform duration-1000 group-hover:scale-[1.05]"
            loading="lazy"
            sizes={config.size === 'large' ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-3 group-hover:translate-y-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-xl text-[9px] font-bold uppercase tracking-[0.15em] text-foreground/80">
              <Eye className="h-3 w-3" />
              {previewLabel}
            </div>
          </div>
        </div>

        <div className="p-5 md:p-6">
          <div className="flex items-center gap-3">
            <div className={cn(
              'flex items-center justify-center w-9 h-9 rounded-xl shadow-lg',
              `bg-gradient-to-br ${config.gradient}`
            )}>
              <config.icon className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-tight">
                {title}
              </h3>
              <p className="text-[10px] text-muted-foreground/40 font-medium">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ShowcaseSection() {
  const { tier } = useDevicePerformance();
  const animate = tier !== 'low';
  const t = useTranslations('ShowcaseSection');
  const screenshots = t.raw('screenshots') as { title: string; description: string }[];

  return (
    <section className="py-24 md:py-36 relative overflow-hidden bg-gradient-to-br from-cyan-50/60 via-teal-50/40 to-emerald-50/50 dark:from-[#060a14] dark:via-[#080d18] dark:to-[#060a14]">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/15 to-transparent" />
        <div className="absolute top-[15%] left-[5%] w-[500px] h-[500px] rounded-full bg-cyan-500/[0.03] blur-[150px]" />
        <div className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] rounded-full bg-emerald-500/[0.03] blur-[120px]" />
      </div>
      <div className="container mx-auto px-4 md:px-10 max-w-7xl">
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={animate ? { opacity: 0, y: 40 } : undefined}
          whileInView={animate ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-500 dark:text-cyan-400 mx-auto mb-6">
            <Monitor className="h-3.5 w-3.5" /> {t('badge')}
          </div>
          <h2 className="text-[clamp(1.5rem,4.5vw,3.75rem)] font-bold tracking-tight text-foreground uppercase leading-[1.05] mb-4 break-words">
            {t('title_prefix')}{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              {t('title_highlight')}
            </span>
          </h2>
          <p className="text-base text-muted-foreground/60 max-w-2xl mx-auto font-medium">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-auto gap-4 md:gap-6">
          {screenshots.map((item, idx) => (
            <ScreenshotCard
              key={idx}
              config={screenshotConfigs[idx]}
              title={item.title}
              description={item.description}
              previewLabel={t('preview')}
              index={idx}
              animate={animate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
