'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { 
  Gavel, FileCheck, Search, Scale, 
  Lightbulb, ShieldCheck,
  Info, Clock, CircleCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function IntellectualPropertyPage() {
  const t = useTranslations('IntellectualProperty');

  const requests = [
    {
      id: 'SK-TRADEMARK-01',
      title: 'Registro de Marca: System Kyron',
      status: 'En Proceso (Búsqueda)',
      description: 'Protección de nombre y logo comercial para software y servicios tecnológicos (Clases 9, 35 y 42).',
      date: '07/05/2026',
      progress: 25,
      type: 'Marcas',
      icon: ShieldCheck,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10'
    },
    {
      id: 'SK-PATENT-01',
      title: 'Patente de Invención: Papelera Inteligente',
      status: 'En Preparación',
      description: 'Sistema mecánico y electrónico para clasificación de residuos con integración de Eco-Créditos.',
      date: '07/05/2026',
      progress: 10,
      type: 'Patentes',
      icon: Lightbulb,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    {
      id: 'SK-COPYRIGHT-01',
      title: 'Derecho de Autor: Código System Kyron',
      status: 'En Proceso',
      description: 'Registro de software, arquitectura de base de datos y algoritmos de IA bajo la Ley de Derecho de Autor.',
      date: '07/05/2026',
      progress: 15,
      type: 'Derecho de Autor',
      icon: FileCheck,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10'
    }
  ];

  return (
    <div className="min-h-screen bg-[#040810] text-white pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-4">
            <Gavel className="h-3 w-3" />
            {t('badge')}
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            {t('title_rest')} <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{t('title_highlight')}</span>
          </h1>
          <p className="text-muted-foreground/60 max-w-2xl text-lg">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Benefits/Ley de Emprendimiento Alert */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] backdrop-blur-md flex flex-col md:flex-row items-center gap-6"
        >
          <div className="h-14 w-14 rounded-2xl bg-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
            <Scale className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">{t('rne_benefit_title')}</h3>
            <p className="text-muted-foreground/70 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t('rne_benefit_desc').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </div>
          <div className="shrink-0 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black">
            {t('rne_applied')}
          </div>
        </motion.div>

        {/* Requests List */}
        <div className="space-y-6">
          {requests.map((req, idx) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
              className="p-6 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", req.bg)}>
                  <req.icon className={cn("h-8 w-8", req.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 block mb-1">{req.id}</span>
                      <h2 className="text-xl font-black uppercase tracking-tight">{req.title}</h2>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.05]">
                      <Clock className="h-3 w-3 text-cyan-400" />
                      <span className="text-[10px] font-black uppercase">{req.status}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground/50 mb-6 max-w-2xl leading-relaxed">
                    {req.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground/30">
                      <span>Progreso de Registro</span>
                      <span>{req.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${req.progress}%` }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className={cn("h-full bg-gradient-to-r", req.type === 'Marcas' ? 'from-cyan-400 to-blue-500' : req.type === 'Patentes' ? 'from-emerald-400 to-green-600' : 'from-violet-400 to-purple-600')} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Next Steps / Info Section */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl border border-white/[0.05] bg-gradient-to-br from-white/[0.03] to-transparent">
            <Info className="h-8 w-8 text-cyan-400 mb-4" />
            <h4 className="text-lg font-bold mb-2">{t('how_it_works_title')}</h4>
            <p className="text-sm text-muted-foreground/50 leading-relaxed">
              {t('how_it_works_desc')}
            </p>
          </div>
          <div className="p-8 rounded-2xl border border-white/[0.05] bg-gradient-to-br from-white/[0.03] to-transparent">
            <Search className="h-8 w-8 text-emerald-400 mb-4" />
            <h4 className="text-lg font-bold mb-2">{t('next_step_title')}</h4>
            <p className="text-sm text-muted-foreground/50 leading-relaxed mb-4">
              {t('next_step_desc')}
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
              <CircleCheck className="h-4 w-4" />
              {t('docs_sent')}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
