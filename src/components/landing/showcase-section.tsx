'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/use-device-performance';
import { Monitor, Smartphone, ShieldCheck, BookOpen, HelpCircle, Eye } from 'lucide-react';
import { ThemeImage } from '@/components/ui/theme-image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const screenshotsMeta = [
  {
    darkSrc: '/images/landing/screenshot-portales-dark.jpg',
    lightSrc: '/images/landing/screenshot-portales-light.jpg',
    icon: ShieldCheck,
    color: 'from-cyan-500 to-blue-500',
    accent: 'border-cyan-500/20',
    glowColor: 'rgba(6,182,212,0.15)',
    size: 'large' as const,
  },
  {
    darkSrc: '/images/landing/screenshot-contabilidad-dark.jpg',
    lightSrc: '/images/landing/screenshot-contabilidad-light.jpg',
    icon: Monitor,
    color: 'from-blue-500 to-violet-500',
    accent: 'border-blue-500/20',
    glowColor: 'rgba(59,130,246,0.15)',
    size: 'medium' as const,
  },
  {
    darkSrc: '/images/landing/screenshot-registro-dark.jpg',
    lightSrc: '/images/landing/screenshot-registro-light.jpg',
    icon: Smartphone,
    color: 'from-emerald-500 to-cyan-500',
    accent: 'border-emerald-500/20',
    glowColor: 'rgba(16,185,129,0.15)',
    size: 'medium' as const,
  },
  {
    darkSrc: '/images/landing/screenshot-guia-dark.jpg',
    lightSrc: '/images/landing/screenshot-guia-light.jpg',
    icon: BookOpen,
    color: 'from-violet-500 to-purple-500',
    accent: 'border-violet-500/20',
    glowColor: 'rgba(139,92,246,0.15)',
    size: 'medium' as const,
  },
  {
    darkSrc: '/images/landing/screenshot-faq-dark.jpg',
    lightSrc: '/images/landing/screenshot-faq-light.jpg',
    icon: HelpCircle,
    color: 'from-amber-500 to-orange-500',
    accent: 'border-amber-500/20',
    glowColor: 'rgba(245,158,11,0.15)',
    size: 'medium' as const,
  },
];

function ScreenshotCard({
  item,
  index,
  animate,
  title,
  description,
  previewLabel,
}: {
  item: typeof screenshotsMeta[0];
  index: number;
  animate: boolean;
  title: string;
  description: string;
  previewLabel: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        'group relative',
        item.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''
      )}
      initial={animate ? { opacity: 0, y: 35, scale: 0.95 } : undefined}
      whileInView={animate ? { opacity: 1, y: 0, scale: 1 } : undefined}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={cn(
        'relative rounded-2xl overflow-hidden border transition-all duration-500',
        'hover:-translate-y-2 hover:shadow-2xl',
        'bg-card/50 backdrop-blur-sm',
        item.accent,
        hovered && 'border-primary/30'
      )}
        style={hovered ? { boxShadow: `0 25px 60px -12px ${item.glowColor}` } : undefined}
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative overflow-hidden">
          <ThemeImage
            darkSrc={item.darkSrc}
            lightSrc={item.lightSrc}
            alt={title}
            width={item.size === 'large' ? 800 : 640}
            height={item.size === 'large' ? 500 : 360}
            quality={75}
            className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
            sizes={item.size === 'large' ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md text-[9px] font-bold uppercase tracking-wider text-foreground/80">
              <Eye className="h-3 w-3" />
              {previewLabel}
            </div>
          </div>
        </div>

        <div className="p-4 md:p-5">
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className={cn(
              'flex items-center justify-center w-8 h-8 rounded-xl shadow-md',
              `bg-gradient-to-br ${item.color}`
            )}>
              <item.icon className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-tight">
                {title}
              </h3>
              <p className="text-[10px] text-muted-foreground font-medium">
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
  const screenshots = t.raw('screenshots') as Array<{ title: string; description: string }>;

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-cyan-50/60 via-teal-50/40 to-emerald-50/50 dark:from-[hsl(224,28%,9%)] dark:via-[hsl(224,24%,8%)] dark:to-[hsl(224,28%,10%)]">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-300/30 dark:via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-300/25 dark:via-transparent to-transparent" />
        <div className="absolute top-[15%] left-[5%] w-[500px] h-[500px] rounded-full bg-cyan-400/[0.07] dark:bg-cyan-500/[0.03] blur-[120px]" />
        <div className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] rounded-full bg-emerald-400/[0.06] dark:bg-emerald-500/[0.03] blur-[100px]" />
      </div>
      <div className="container mx-auto px-4 md:px-10 max-w-7xl">
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial={animate ? { opacity: 0, y: 30 } : undefined}
          whileInView={animate ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass-subtle text-[11px] font-semibold uppercase tracking-widest text-primary mx-auto mb-6">
            <Monitor className="h-3.5 w-3.5" /> {t('badge')}
          </div>
          <h2 className="text-[clamp(1.75rem,5vw,3.75rem)] font-bold tracking-tight text-foreground uppercase leading-[1.05] mb-4">
            {t('title_prefix')}{' '}
            <span className="liquid-glass-text italic">
              {t('title_highlight')}
            </span>
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto font-medium">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-auto gap-4 md:gap-6">
          {screenshotsMeta.map((item, idx) => (
            <ScreenshotCard
              key={idx}
              item={item}
              index={idx}
              animate={animate}
              title={screenshots[idx]?.title ?? ''}
              description={screenshots[idx]?.description ?? ''}
              previewLabel={t('preview')}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
