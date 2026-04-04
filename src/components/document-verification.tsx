'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ShieldCheck, ShieldAlert, ShieldX, ShieldQuestion,
  Loader2, ChevronDown, ChevronUp, AlertTriangle,
  CheckCircle2, Info, X, Fingerprint, Eye, EyeOff,
  Brain, Cpu, Zap, Search, FileSearch, Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnalysisSection {
  puntaje: number;
  estado: 'ok' | 'advertencia' | 'critico';
  detalles: string[];
}

interface CalidadImagenSection extends AnalysisSection {
  es_borrosa: boolean;
  nivel_nitidez: 'alta' | 'media' | 'baja' | 'ilegible';
}

interface AIProviderResult {
  provider: 'claude' | 'openai' | 'gemini';
  disponible: boolean;
  visual_puntaje: number;
  calidad_puntaje: number;
  contenido_puntaje: number;
  es_borrosa: boolean;
  nivel_nitidez: string;
  veredicto_individual: string;
  alertas: string[];
  detalles_clave: string[];
  resumen: string;
  error?: string;
}

export interface VerificationResult {
  veredicto: 'autentico' | 'sospechoso' | 'fraudulento' | 'no_determinado';
  confianza: number;
  puntaje_total: number;
  consenso_ia: {
    total_ias: number;
    ias_coinciden: number;
    nivel: 'unanime' | 'mayoria' | 'dividido' | 'unico';
    proveedores: AIProviderResult[];
  };
  analisis: {
    integridad_archivo: AnalysisSection;
    consistencia_visual: AnalysisSection;
    calidad_imagen: CalidadImagenSection;
    metadatos: AnalysisSection;
    contenido: AnalysisSection;
    forense: AnalysisSection;
  };
  alertas: string[];
  recomendaciones: string[];
  resumen: string;
  hash_sha256: string;
  verificado_at: string;
}

interface DocumentVerificationProps {
  filePath: string;
  originalName: string;
  mimeType: string;
  docCategory: string;
  documentoId?: number;
  compact?: boolean;
  autoVerify?: boolean;
  onVerified?: (result: VerificationResult) => void;
}

const VERDICT_CONFIG = {
  autentico: {
    icon: ShieldCheck, label: 'Auténtico',
    color: 'text-emerald-400', bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20', glow: 'shadow-emerald-500/20',
    barColor: 'bg-emerald-500', ringColor: 'ring-emerald-500/30',
    gradient: 'from-emerald-500/20 to-emerald-600/5',
  },
  sospechoso: {
    icon: ShieldAlert, label: 'Sospechoso',
    color: 'text-amber-400', bg: 'bg-amber-500/10',
    border: 'border-amber-500/20', glow: 'shadow-amber-500/20',
    barColor: 'bg-amber-500', ringColor: 'ring-amber-500/30',
    gradient: 'from-amber-500/20 to-amber-600/5',
  },
  fraudulento: {
    icon: ShieldX, label: 'Fraudulento',
    color: 'text-red-400', bg: 'bg-red-500/10',
    border: 'border-red-500/20', glow: 'shadow-red-500/20',
    barColor: 'bg-red-500', ringColor: 'ring-red-500/30',
    gradient: 'from-red-500/20 to-red-600/5',
  },
  no_determinado: {
    icon: ShieldQuestion, label: 'No Determinado',
    color: 'text-slate-400', bg: 'bg-slate-500/10',
    border: 'border-slate-500/20', glow: 'shadow-slate-500/20',
    barColor: 'bg-slate-500', ringColor: 'ring-slate-500/30',
    gradient: 'from-slate-500/20 to-slate-600/5',
  },
};

const NITIDEZ_CONFIG = {
  alta:     { label: 'Nitidez alta',   color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: Eye },
  media:    { label: 'Nitidez media',  color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20',    icon: Eye },
  baja:     { label: 'Borrosa',        color: 'text-orange-400',  bg: 'bg-orange-500/10',  border: 'border-orange-500/20',  icon: EyeOff },
  ilegible: { label: 'Ilegible',       color: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/20',     icon: EyeOff },
};

const CONSENSO_CONFIG = {
  unanime: { label: 'Consenso unánime', color: 'text-emerald-400', bg: 'bg-emerald-500/8', border: 'border-emerald-500/20' },
  mayoria: { label: 'Consenso mayoritario', color: 'text-blue-400', bg: 'bg-blue-500/8', border: 'border-blue-500/20' },
  dividido: { label: 'Opiniones divididas', color: 'text-amber-400', bg: 'bg-amber-500/8', border: 'border-amber-500/20' },
  unico: { label: 'Análisis único', color: 'text-slate-400', bg: 'bg-slate-500/8', border: 'border-slate-500/20' },
};

const AI_ICONS: Record<string, { icon: typeof Brain; name: string }> = {
  claude: { icon: Brain, name: 'Claude' },
  openai: { icon: Zap, name: 'OpenAI' },
  gemini: { icon: Cpu, name: 'Gemini' },
};

const SCAN_STAGES = [
  { label: 'Verificando integridad del archivo...', icon: Lock },
  { label: 'Análisis forense de estructura...', icon: FileSearch },
  { label: 'Verificación visual con 3 IAs...', icon: Brain },
  { label: 'Validación cruzada y consenso...', icon: Search },
];

function ScoreBar({ label, puntaje, estado }: { label: string; puntaje: number; estado: string }) {
  const barColor = estado === 'ok' ? 'bg-emerald-500' : estado === 'advertencia' ? 'bg-amber-500' : 'bg-red-500';
  const textColor = estado === 'ok' ? 'text-emerald-400' : estado === 'advertencia' ? 'text-amber-400' : 'text-red-400';
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{label}</span>
        <span className={cn('text-[11px] font-black tabular-nums', textColor)}>{puntaje}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted/20 overflow-hidden">
        <div className={cn('h-full rounded-full transition-all duration-1000 ease-out', barColor)} style={{ width: `${puntaje}%` }} />
      </div>
    </div>
  );
}

function DetailsList({ section, label }: { section: AnalysisSection; label: string }) {
  const [open, setOpen] = useState(false);
  const StatusIcon = section.estado === 'ok' ? CheckCircle2 : section.estado === 'advertencia' ? AlertTriangle : ShieldX;
  const statusColor = section.estado === 'ok' ? 'text-emerald-400' : section.estado === 'advertencia' ? 'text-amber-400' : 'text-red-400';
  return (
    <div className="border border-border/15 rounded-xl overflow-hidden bg-card/30">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-muted/10 transition-colors">
        <StatusIcon className={cn('h-3.5 w-3.5 shrink-0', statusColor)} />
        <span className="flex-1 text-[11px] font-semibold text-foreground/80">{label}</span>
        <span className={cn('text-[10px] font-black tabular-nums', statusColor)}>{section.puntaje}%</span>
        {open ? <ChevronUp className="h-3 w-3 text-muted-foreground/30" /> : <ChevronDown className="h-3 w-3 text-muted-foreground/30" />}
      </button>
      {open && (
        <div className="px-3 pb-2.5 space-y-1 border-t border-border/10">
          {section.detalles.map((d, i) => (
            <div key={i} className="flex items-start gap-2 pt-1.5">
              <Info className="h-2.5 w-2.5 text-muted-foreground/25 mt-0.5 shrink-0" />
              <p className="text-[10px] text-muted-foreground/65 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ScanningAnimation({ stage }: { stage: number }) {
  return (
    <div className="space-y-3 p-3 rounded-xl border border-primary/15 bg-primary/5">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Loader2 className="h-4 w-4 animate-spin text-primary/70" />
          <div className="absolute inset-0 animate-ping opacity-20"><Loader2 className="h-4 w-4 text-primary" /></div>
        </div>
        <span className="text-[11px] font-bold text-primary/80">Análisis forense en progreso</span>
      </div>
      <div className="space-y-1.5">
        {SCAN_STAGES.map((s, i) => {
          const StageIcon = s.icon;
          const isDone = i < stage;
          const isCurrent = i === stage;
          return (
            <div key={i} className={cn('flex items-center gap-2 px-2 py-1 rounded-lg transition-all duration-500',
              isDone ? 'opacity-50' : isCurrent ? 'bg-primary/8' : 'opacity-25'
            )}>
              {isDone ? (
                <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
              ) : isCurrent ? (
                <StageIcon className="h-3 w-3 text-primary animate-pulse shrink-0" />
              ) : (
                <StageIcon className="h-3 w-3 text-muted-foreground/30 shrink-0" />
              )}
              <span className={cn('text-[10px]',
                isDone ? 'text-emerald-400/70 line-through' : isCurrent ? 'text-primary/90 font-semibold' : 'text-muted-foreground/40'
              )}>{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AIConsensusPanel({ consenso }: { consenso: VerificationResult['consenso_ia'] }) {
  const cfg = CONSENSO_CONFIG[consenso.nivel];
  const activos = consenso.proveedores.filter(p => p.disponible);

  if (activos.length === 0) return null;

  return (
    <div className={cn('rounded-xl border p-3 space-y-2.5', cfg.bg, cfg.border)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className={cn('h-3.5 w-3.5', cfg.color)} />
          <span className={cn('text-[10px] font-black uppercase tracking-widest', cfg.color)}>{cfg.label}</span>
        </div>
        <span className={cn('text-[10px] font-bold tabular-nums', cfg.color)}>
          {consenso.ias_coinciden}/{consenso.total_ias} IAs
        </span>
      </div>

      <div className="grid gap-1.5">
        {consenso.proveedores.map((p) => {
          const ai = AI_ICONS[p.provider] || AI_ICONS.claude;
          const AIIcon = ai.icon;
          const vCfg = VERDICT_CONFIG[p.veredicto_individual as keyof typeof VERDICT_CONFIG] || VERDICT_CONFIG.no_determinado;
          return (
            <div key={p.provider} className={cn(
              'flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all',
              p.disponible ? 'border-border/15 bg-card/30' : 'border-red-500/10 bg-red-500/5 opacity-50'
            )}>
              <AIIcon className={cn('h-3 w-3 shrink-0', p.disponible ? 'text-primary/60' : 'text-red-400/50')} />
              <span className="text-[10px] font-bold text-foreground/70 w-12">{ai.name}</span>
              {p.disponible ? (
                <>
                  <div className={cn('flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-black uppercase', vCfg.bg, vCfg.color)}>
                    {p.veredicto_individual === 'autentico' ? '✓' : p.veredicto_individual === 'fraudulento' ? '✗' : '?'} {p.veredicto_individual}
                  </div>
                  <div className="flex-1" />
                  <span className="text-[9px] text-muted-foreground/50 tabular-nums">
                    V:{p.visual_puntaje} C:{p.calidad_puntaje} T:{p.contenido_puntaje}
                  </span>
                </>
              ) : (
                <span className="text-[9px] text-red-400/50">No disponible</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DocumentVerification({
  filePath, originalName, mimeType, docCategory, documentoId,
  compact, autoVerify = false, onVerified,
}: DocumentVerificationProps) {
  const [loading, setLoading]     = useState(false);
  const [result, setResult]       = useState<VerificationResult | null>(null);
  const [error, setError]         = useState<string | null>(null);
  const [expanded, setExpanded]   = useState(false);
  const [scanStage, setScanStage] = useState(0);
  const autoStarted               = useRef(false);
  const stageInterval              = useRef<ReturnType<typeof setInterval> | null>(null);

  const runVerify = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    setScanStage(0);

    stageInterval.current = setInterval(() => {
      setScanStage(prev => (prev < SCAN_STAGES.length - 1 ? prev + 1 : prev));
    }, 2800);

    try {
      const res = await fetch('/api/verificar-documento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath, originalName, mimeType, docCategory, documentoId }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Error al verificar'); return; }
      setResult(data.resultado);
      setExpanded(true);
      onVerified?.(data.resultado);
    } catch {
      setError('Error de conexión al verificar el documento');
    } finally {
      setLoading(false);
      if (stageInterval.current) clearInterval(stageInterval.current);
    }
  }, [loading, filePath, originalName, mimeType, docCategory, documentoId, onVerified]);

  useEffect(() => {
    if (autoVerify && !autoStarted.current && !result) {
      autoStarted.current = true;
      runVerify();
    }
  }, [autoVerify, result, runVerify]);

  useEffect(() => {
    return () => { if (stageInterval.current) clearInterval(stageInterval.current); };
  }, []);

  if (!result) {
    if (loading) return <ScanningAnimation stage={scanStage} />;
    return (
      <div className="space-y-2">
        <Button onClick={runVerify} disabled={loading} variant="outline" size="sm"
          className={cn('rounded-xl text-[10px] font-bold uppercase tracking-widest gap-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5', compact ? 'h-8 px-3' : 'h-9 px-4')}>
          <Fingerprint className="h-3.5 w-3.5" />
          Verificar Autenticidad
        </Button>
        {error && <p className="text-xs text-destructive flex items-center gap-1.5"><X className="h-3 w-3" /> {error}</p>}
      </div>
    );
  }

  const config = VERDICT_CONFIG[result.veredicto];
  const VerdictIcon = config.icon;
  const calidad = result.analisis.calidad_imagen;
  const nitidezCfg = NITIDEZ_CONFIG[calidad?.nivel_nitidez ?? 'media'];
  const NitidezIcon = nitidezCfg.icon;

  if (compact && !expanded) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <button onClick={() => setExpanded(true)}
          className={cn('flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all hover:shadow-lg', config.bg, config.border)}>
          <VerdictIcon className={cn('h-4 w-4', config.color)} />
          <span className={cn('text-[10px] font-black uppercase tracking-wider', config.color)}>{config.label}</span>
          <span className="text-[10px] font-bold text-muted-foreground/50 tabular-nums">{result.puntaje_total}%</span>
        </button>
        {calidad && (
          <div className={cn('flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[10px] font-bold uppercase tracking-wide', nitidezCfg.bg, nitidezCfg.border, nitidezCfg.color)}>
            <NitidezIcon className="h-3 w-3" />
            {nitidezCfg.label}
          </div>
        )}
        {result.consenso_ia.total_ias > 0 && (
          <div className={cn('flex items-center gap-1 px-2 py-1.5 rounded-xl border text-[10px] font-bold',
            CONSENSO_CONFIG[result.consenso_ia.nivel].bg, CONSENSO_CONFIG[result.consenso_ia.nivel].border, CONSENSO_CONFIG[result.consenso_ia.nivel].color)}>
            <Brain className="h-3 w-3" />
            {result.consenso_ia.ias_coinciden}/{result.consenso_ia.total_ias}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn('rounded-2xl border overflow-hidden shadow-lg', config.border, 'bg-card/50 backdrop-blur-sm')}>
      <div className={cn('h-1 bg-gradient-to-r', config.gradient)} />

      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center border-2 ring-2', config.bg, config.border, config.ringColor)}>
              <VerdictIcon className={cn('h-5.5 w-5.5', config.color)} />
            </div>
            <div>
              <p className={cn('text-sm font-black uppercase tracking-tight', config.color)}>{config.label}</p>
              <p className="text-[10px] text-muted-foreground/50 tabular-nums">
                Confianza: {result.confianza}% · Puntaje: {result.puntaje_total}/100
              </p>
            </div>
          </div>
          <button onClick={() => compact ? setExpanded(false) : setExpanded(!expanded)} className="p-1.5 rounded-lg hover:bg-muted/20 transition-colors">
            {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground/40" /> : <ChevronDown className="h-4 w-4 text-muted-foreground/40" />}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {calidad && (
            <div className={cn('flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border', nitidezCfg.bg, nitidezCfg.border)}>
              <NitidezIcon className={cn('h-3.5 w-3.5', nitidezCfg.color)} />
              <span className={cn('text-[10px] font-bold', nitidezCfg.color)}>{nitidezCfg.label}</span>
              <span className={cn('text-[10px] font-black tabular-nums', nitidezCfg.color)}>{calidad.puntaje}%</span>
            </div>
          )}
          {result.consenso_ia.total_ias > 0 && (() => {
            const cCfg = CONSENSO_CONFIG[result.consenso_ia.nivel];
            return (
              <div className={cn('flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border', cCfg.bg, cCfg.border)}>
                <Brain className={cn('h-3.5 w-3.5', cCfg.color)} />
                <span className={cn('text-[10px] font-bold', cCfg.color)}>
                  {result.consenso_ia.ias_coinciden}/{result.consenso_ia.total_ias} IAs
                </span>
              </div>
            );
          })()}
        </div>

        <p className="text-[11px] text-muted-foreground/70 leading-relaxed">{result.resumen}</p>

        <div className="grid grid-cols-3 gap-2.5">
          <ScoreBar label="Integridad" puntaje={result.analisis.integridad_archivo.puntaje} estado={result.analisis.integridad_archivo.estado} />
          <ScoreBar label="Visual" puntaje={result.analisis.consistencia_visual.puntaje} estado={result.analisis.consistencia_visual.estado} />
          <ScoreBar label="Forense" puntaje={result.analisis.forense.puntaje} estado={result.analisis.forense.estado} />
          <ScoreBar label="Calidad" puntaje={calidad?.puntaje ?? 0} estado={calidad?.estado ?? 'advertencia'} />
          <ScoreBar label="Metadatos" puntaje={result.analisis.metadatos.puntaje} estado={result.analisis.metadatos.estado} />
          <ScoreBar label="Contenido" puntaje={result.analisis.contenido.puntaje} estado={result.analisis.contenido.estado} />
        </div>

        {expanded && (
          <>
            {result.alertas.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-[9px] font-black uppercase tracking-widest text-amber-400/60">Alertas</p>
                {result.alertas.map((a, i) => (
                  <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-xl bg-amber-500/5 border border-amber-500/10">
                    <AlertTriangle className="h-3 w-3 text-amber-400 mt-0.5 shrink-0" />
                    <p className="text-[10px] text-amber-300/80 leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            )}

            <AIConsensusPanel consenso={result.consenso_ia} />

            <div className="space-y-1.5">
              <DetailsList section={result.analisis.integridad_archivo} label="Integridad del Archivo" />
              <DetailsList section={result.analisis.consistencia_visual} label="Consistencia Visual" />
              {calidad && <DetailsList section={calidad} label="Calidad de Imagen" />}
              <DetailsList section={result.analisis.forense} label="Análisis Forense" />
              <DetailsList section={result.analisis.metadatos} label="Metadatos" />
              <DetailsList section={result.analisis.contenido} label="Contenido" />
            </div>

            {result.recomendaciones.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-[9px] font-black uppercase tracking-widest text-primary/40">Recomendaciones</p>
                {result.recomendaciones.map((r, i) => (
                  <p key={i} className="text-[10px] text-muted-foreground/55 flex items-start gap-2">
                    <CheckCircle2 className="h-3 w-3 text-primary/35 mt-0.5 shrink-0" /> {r}
                  </p>
                ))}
              </div>
            )}

            <div className="pt-2 border-t border-border/10 flex items-center justify-between">
              <div>
                <p className="text-[8px] text-muted-foreground/25 font-mono">SHA-256: {result.hash_sha256.substring(0, 32)}...</p>
                <p className="text-[8px] text-muted-foreground/25">
                  {new Date(result.verificado_at).toLocaleString('es-VE')}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {result.consenso_ia.proveedores.filter(p => p.disponible).map(p => {
                  const ai = AI_ICONS[p.provider];
                  const AIIcon = ai?.icon || Brain;
                  return <AIIcon key={p.provider} className="h-2.5 w-2.5 text-muted-foreground/20" />;
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function VerificationBadge({ veredicto, puntaje }: { veredicto: string; puntaje: number }) {
  const config = VERDICT_CONFIG[veredicto as keyof typeof VERDICT_CONFIG] || VERDICT_CONFIG.no_determinado;
  const Icon = config.icon;
  return (
    <div className={cn('inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[9px] font-black uppercase tracking-wider', config.bg, config.border, config.color)}>
      <Icon className="h-3 w-3" />
      {config.label} ({puntaje}%)
    </div>
  );
}
