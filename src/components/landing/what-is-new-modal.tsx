'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Sparkles, X, CheckCircle2, Zap, Bot, Bug, Database, 
  FileText, Activity, Globe, Cpu, ArrowUpRight, RefreshCw,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CURRENT_VERSION = '2.0.0';
const LS_KEY = 'sk-whats-new-version';

type ChangeCategory = 'feature' | 'improvement' | 'fix' | 'ai';

interface ChangelogEntry {
  icon: any;
  color: string;
  bg: string;
  category: ChangeCategory;
  title: string;
  description: string;
}

const updates: ChangelogEntry[] = [
  // === AI AGENTE ===
  {
    icon: Bot,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    category: 'ai',
    title: 'Agente IA con herramientas reales',
    description: 'El asistente Kyron ahora ejecuta acciones reales en tu empresa: crea facturas, registra empleados, cierra períodos fiscales, calcula nóminas y más — todo desde el chat.',
  },
  {
    icon: Database,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    category: 'ai',
    title: 'query_database — SQL en lenguaje natural',
    description: 'Pregúntale a la IA cualquier cosa sobre tus datos: "cuántos empleados tengo?", "muéstrame las facturas de abril", "dime el total de gastos" — ella consulta la BD directamente.',
  },
  {
    icon: FileText,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    category: 'ai',
    title: 'Generación de documentos instantánea',
    description: 'Cartas laborales, constancias, permisos, actas, reportes, certificados — la IA genera documentos profesionales al instante.',
  },
  {
    icon: Activity,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    category: 'ai',
    title: '11 herramientas de operación empresarial',
    description: 'Dashboard financiero, cierre fiscal, nómina, empleados, declaraciones ISLR/IVA, alertas, tasas BCV, estado del sistema, acciones operativas.',
  },
  {
    icon: Zap,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    category: 'ai',
    title: 'Peticiones múltiples secuenciales',
    description: '"Haz el cierre fiscal y calcula la nómina" — la IA ejecuta cada paso en orden y te entrega un resumen completo.',
  },

  // === MEJORAS ===
  {
    icon: Globe,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    category: 'improvement',
    title: 'Imágenes locales, sin dependencias externas',
    description: 'Eliminamos todas las imágenes de Unsplash que daban 404. Ahora todo carga desde el servidor.',
  },
  {
    icon: Cpu,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    category: 'improvement',
    title: 'Límites 4x más grandes para la IA',
    description: 'De 1,024 a 4,096 tokens de respuesta. De 4,000 a 8,000 caracteres por mensaje. Historial de 16,000 caracteres.',
  },
  {
    icon: RefreshCw,
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    category: 'improvement',
    title: 'Reintentos inteligentes con backoff',
    description: 'La IA reintenta automáticamente errores transitorios y rate limits con exponential backoff. Sin timeouts muertos.',
  },
  {
    icon: Shield,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    category: 'improvement',
    title: 'Race conditions eliminadas',
    description: 'El rotador de API keys ahora es atómico. No más colisiones en peticiones concurrentes.',
  },

  // === BUG FIXES ===
  {
    icon: Bug,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    category: 'fix',
    title: 'Error 500 en chat IA — RESUELTO',
    description: 'El endpoint agent-chat devolvía 500 genérico. Ahora clasifica errores (429, 503, 500) y da mensajes claros.',
  },
  {
    icon: Bug,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    category: 'fix',
    title: 'Redirects rotos por módulo — RESUELTO',
    description: 'Había 5 copias del mapa de rutas con valores distintos. Centralizado en UNA fuente de verdad.',
  },
  {
    icon: Bug,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    category: 'fix',
    title: '404 en imágenes del landing — RESUELTO',
    description: 'Las imágenes de Unsplash fueron reemplazadas por assets locales que siempre funcionan.',
  },
];

export function WhatIsNewModal({ forceOpen, onClose }: { forceOpen?: boolean; onClose?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<ChangeCategory | 'all'>('all');
  const hasAutoShown = useRef(false);

  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
      return;
    }
    if (hasAutoShown.current) return;
    try {
      const seen = localStorage.getItem(LS_KEY);
      if (seen !== CURRENT_VERSION) {
        setIsOpen(true);
        hasAutoShown.current = true;
      }
    } catch {}
  }, [forceOpen]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
    try {
      localStorage.setItem(LS_KEY, CURRENT_VERSION);
    } catch {}
  };

  const filtered = filter === 'all' ? updates : updates.filter((u) => u.category === filter);

  if (!isOpen) return null;

  const counts = {
    all: updates.length,
    ai: updates.filter((u) => u.category === 'ai').length,
    improvement: updates.filter((u) => u.category === 'improvement').length,
    fix: updates.filter((u) => u.category === 'fix').length,
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div onClick={handleClose} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-background border border-border dark:border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-kyron-cyan/20 via-kyron-cyan/5 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="p-6 sm:p-8 relative shrink-0">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground/40 hover:text-foreground transition-all"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-kyron-cyan/30 to-blue-500/20 flex items-center justify-center shadow-lg shadow-kyron-cyan/10">
              <Sparkles className="h-6 w-6 text-kyron-cyan" />
            </div>
            <div>
              <Badge
                variant="outline"
                className="text-[10px] font-black uppercase tracking-widest text-kyron-cyan border-kyron-cyan/30 px-2.5 py-1"
              >
                Update v{CURRENT_VERSION}
              </Badge>
              <h2 className="text-2xl font-black text-foreground uppercase tracking-tight mt-1">
                Revolución Kyron
              </h2>
              <p className="text-xs text-muted-foreground/50 mt-0.5">
                12 cambios masivos — IA operativa, bugs eliminados, plataforma reforzada
              </p>
            </div>
          </div>

          {/* Filter chips */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {(['all', 'ai', 'improvement', 'fix'] as const).map((key) => {
              const labels: Record<string, string> = {
                all: 'Todo',
                ai: 'IA',
                improvement: 'Mejoras',
                fix: 'Bug fixes',
              };
              return (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border transition-all ${
                    filter === key
                      ? 'bg-kyron-cyan/20 border-kyron-cyan/40 text-kyron-cyan'
                      : 'bg-muted/30 border-border dark:border-white/5 text-muted-foreground/60 hover:text-foreground'
                  }`}
                >
                  {labels[key]} ({counts[key]})
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-6 sm:px-8 pb-6 sm:pb-8 space-y-3 scrollbar-thin">
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground/40 text-center py-8">
              No hay cambios en esta categoría.
            </p>
          )}
          {filtered.map((update) => (
            <div
              key={update.title}
              className="flex gap-4 p-4 rounded-2xl bg-muted/30 dark:bg-white/[0.03] border border-border dark:border-white/5 hover:bg-muted/50 dark:hover:bg-white/[0.06] transition-all group"
            >
              <div
                className={`h-10 w-10 rounded-xl ${update.bg} flex items-center justify-center shrink-0 ring-1 ring-white/5`}
              >
                <update.icon className={`h-5 w-5 ${update.color}`} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-bold text-foreground leading-tight">{update.title}</p>
                  <Badge
                    variant="outline"
                    className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0 ${
                      update.category === 'ai'
                        ? 'text-emerald-500 border-emerald-500/30'
                        : update.category === 'improvement'
                        ? 'text-sky-500 border-sky-500/30'
                        : 'text-orange-500 border-orange-500/30'
                    }`}
                  >
                    {update.category === 'ai'
                      ? 'IA'
                      : update.category === 'improvement'
                      ? 'mejora'
                      : 'fix'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground/50 leading-relaxed">
                  {update.description}
                </p>
              </div>
              <ArrowUpRight
                className={`h-4 w-4 mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-all text-muted-foreground/30`}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-6 sm:p-8 pt-0 shrink-0">
          <Button
            onClick={handleClose}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-kyron-cyan/90 to-blue-600/90 hover:from-kyron-cyan hover:to-blue-600 text-white font-black uppercase text-[11px] tracking-widest group shadow-xl shadow-kyron-cyan/20"
          >
            Explorar las novedades
            <CheckCircle2 className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ChangelogTrigger({ onOpen }: { onOpen: () => void }) {
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem(LS_KEY);
      if (seen !== CURRENT_VERSION) setHasNew(true);
    } catch {}
  }, []);

  return (
    <button
      onClick={onOpen}
      className="relative flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/30 hover:text-kyron-cyan transition-all"
    >
      <Sparkles className="h-3 w-3" />
      v{CURRENT_VERSION}
      {hasNew && (
        <span className="absolute -top-1 -right-2 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-kyron-cyan opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-kyron-cyan" />
        </span>
      )}
    </button>
  );
}
