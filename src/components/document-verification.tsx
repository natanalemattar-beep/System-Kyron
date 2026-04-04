'use client';

import { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck, ShieldAlert, ShieldX, ShieldQuestion,
  Loader2, ChevronDown, ChevronUp, AlertTriangle,
  CheckCircle2, Info, X, Fingerprint, Eye, EyeOff,
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

export interface VerificationResult {
  veredicto: 'autentico' | 'sospechoso' | 'fraudulento' | 'no_determinado';
  confianza: number;
  puntaje_total: number;
  analisis: {
    integridad_archivo: AnalysisSection;
    consistencia_visual: AnalysisSection;
    calidad_imagen: CalidadImagenSection;
    metadatos: AnalysisSection;
    contenido: AnalysisSection;
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
    icon: ShieldCheck,
    label: 'Auténtico',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    glow: 'shadow-emerald-500/5',
    barColor: 'bg-emerald-500',
  },
  sospechoso: {
    icon: ShieldAlert,
    label: 'Sospechoso',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    glow: 'shadow-amber-500/5',
    barColor: 'bg-amber-500',
  },
  fraudulento: {
    icon: ShieldX,
    label: 'Fraudulento',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    glow: 'shadow-red-500/5',
    barColor: 'bg-red-500',
  },
  no_determinado: {
    icon: ShieldQuestion,
    label: 'No Determinado',
    color: 'text-slate-400',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/20',
    glow: 'shadow-slate-500/5',
    barColor: 'bg-slate-500',
  },
};

const NITIDEZ_CONFIG = {
  alta:     { label: 'Nitidez alta',    color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  media:    { label: 'Nitidez media',   color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
  baja:     { label: 'Imagen borrosa',  color: 'text-orange-400',  bg: 'bg-orange-500/10',  border: 'border-orange-500/20' },
  ilegible: { label: 'Ilegible',        color: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/20' },
};

function ScoreBar({ label, puntaje, estado }: { label: string; puntaje: number; estado: string }) {
  const barColor = estado === 'ok' ? 'bg-emerald-500' : estado === 'advertencia' ? 'bg-amber-500' : 'bg-red-500';
  const textColor = estado === 'ok' ? 'text-emerald-400' : estado === 'advertencia' ? 'text-amber-400' : 'text-red-400';

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">{label}</span>
        <span className={cn('text-xs font-black', textColor)}>{puntaje}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-700 ease-out', barColor)}
          style={{ width: `${puntaje}%` }}
        />
      </div>
    </div>
  );
}

function DetailsList({ section, label }: { section: AnalysisSection; label: string }) {
  const [open, setOpen] = useState(false);
  const statusIcon = section.estado === 'ok' ? CheckCircle2 : section.estado === 'advertencia' ? AlertTriangle : ShieldX;
  const StatusIcon = statusIcon;
  const statusColor = section.estado === 'ok' ? 'text-emerald-400' : section.estado === 'advertencia' ? 'text-amber-400' : 'text-red-400';

  return (
    <div className="border border-border/20 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-muted/10 transition-colors"
      >
        <StatusIcon className={cn('h-3.5 w-3.5 shrink-0', statusColor)} />
        <span className="flex-1 text-xs font-semibold text-foreground/80">{label}</span>
        <span className={cn('text-[10px] font-black', statusColor)}>{section.puntaje}%</span>
        {open
          ? <ChevronUp className="h-3 w-3 text-muted-foreground/40" />
          : <ChevronDown className="h-3 w-3 text-muted-foreground/40" />
        }
      </button>
      {open && (
        <div className="px-3 pb-3 space-y-1.5 border-t border-border/10">
          {section.detalles.map((d, i) => (
            <div key={i} className="flex items-start gap-2 pt-2">
              <Info className="h-3 w-3 text-muted-foreground/30 mt-0.5 shrink-0" />
              <p className="text-[11px] text-muted-foreground/70 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function DocumentVerification({
  filePath,
  originalName,
  mimeType,
  docCategory,
  documentoId,
  compact,
  autoVerify = false,
  onVerified,
}: DocumentVerificationProps) {
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState<VerificationResult | null>(null);
  const [error, setError]       = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const autoStarted             = useRef(false);

  const runVerify = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/verificar-documento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath, originalName, mimeType, docCategory, documentoId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Error al verificar');
        return;
      }
      setResult(data.resultado);
      setExpanded(true);
      onVerified?.(data.resultado);
    } catch {
      setError('Error de conexión al verificar el documento');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoVerify && !autoStarted.current && !result) {
      autoStarted.current = true;
      runVerify();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoVerify]);

  if (!result) {
    if (autoVerify && loading) {
      return (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/20 bg-muted/10">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-primary/60" />
          <span className="text-[11px] text-muted-foreground/70">Analizando documento...</span>
        </div>
      );
    }
    return (
      <div className="space-y-2">
        <Button
          onClick={runVerify}
          disabled={loading}
          variant="outline"
          size="sm"
          className={cn(
            'rounded-xl text-[10px] font-bold uppercase tracking-widest gap-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all',
            compact ? 'h-8 px-3' : 'h-9 px-4'
          )}
        >
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Fingerprint className="h-3.5 w-3.5" />}
          {loading ? 'Verificando...' : 'Verificar Autenticidad'}
        </Button>
        {error && (
          <p className="text-xs text-destructive flex items-center gap-1.5">
            <X className="h-3 w-3" /> {error}
          </p>
        )}
      </div>
    );
  }

  const config = VERDICT_CONFIG[result.veredicto];
  const VerdictIcon = config.icon;
  const calidad = result.analisis.calidad_imagen;
  const nitidezCfg = NITIDEZ_CONFIG[calidad?.nivel_nitidez ?? 'media'];

  if (compact && !expanded) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setExpanded(true)}
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all hover:shadow-md',
            config.bg, config.border, config.glow
          )}
        >
          <VerdictIcon className={cn('h-4 w-4', config.color)} />
          <span className={cn('text-[10px] font-black uppercase tracking-wider', config.color)}>
            {config.label}
          </span>
          <span className="text-[10px] font-bold text-muted-foreground/50">
            {result.puntaje_total}%
          </span>
        </button>
        {calidad && (
          <div className={cn(
            'flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[10px] font-bold uppercase tracking-wide',
            nitidezCfg.bg, nitidezCfg.border, nitidezCfg.color
          )}>
            {calidad.es_borrosa ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            {nitidezCfg.label}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn('rounded-2xl border overflow-hidden', config.border, config.bg)}>
      <div className="p-4 space-y-4">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center border', config.bg, config.border)}>
              <VerdictIcon className={cn('h-5 w-5', config.color)} />
            </div>
            <div>
              <p className={cn('text-sm font-black uppercase tracking-tight', config.color)}>
                {config.label}
              </p>
              <p className="text-[10px] text-muted-foreground/50">
                Confianza: {result.confianza}% &middot; Puntaje: {result.puntaje_total}/100
              </p>
            </div>
          </div>
          <button
            onClick={() => compact ? setExpanded(false) : setExpanded(!expanded)}
            className="p-1.5 rounded-lg hover:bg-muted/20 transition-colors"
          >
            {expanded
              ? <ChevronUp className="h-4 w-4 text-muted-foreground/40" />
              : <ChevronDown className="h-4 w-4 text-muted-foreground/40" />
            }
          </button>
        </div>

        {calidad && (
          <div className={cn(
            'flex items-center gap-2.5 px-3 py-2 rounded-xl border',
            nitidezCfg.bg, nitidezCfg.border
          )}>
            {calidad.es_borrosa
              ? <EyeOff className={cn('h-4 w-4 shrink-0', nitidezCfg.color)} />
              : <Eye    className={cn('h-4 w-4 shrink-0', nitidezCfg.color)} />
            }
            <div className="flex-1 min-w-0">
              <p className={cn('text-[11px] font-bold', nitidezCfg.color)}>
                {nitidezCfg.label}
                {calidad.nivel_nitidez === 'ilegible' && ' — Imagen ilegible'}
              </p>
              {calidad.detalles[0] && (
                <p className="text-[10px] text-muted-foreground/60 leading-tight mt-0.5 truncate">
                  {calidad.detalles[0]}
                </p>
              )}
            </div>
            <span className={cn('text-[11px] font-black shrink-0', nitidezCfg.color)}>
              {calidad.puntaje}%
            </span>
          </div>
        )}

        <p className="text-xs text-muted-foreground/70 leading-relaxed">{result.resumen}</p>

        <div className="grid grid-cols-2 gap-3">
          <ScoreBar label="Integridad"  puntaje={result.analisis.integridad_archivo.puntaje}  estado={result.analisis.integridad_archivo.estado} />
          <ScoreBar label="Visual"      puntaje={result.analisis.consistencia_visual.puntaje}  estado={result.analisis.consistencia_visual.estado} />
          <ScoreBar label="Metadatos"   puntaje={result.analisis.metadatos.puntaje}            estado={result.analisis.metadatos.estado} />
          <ScoreBar label="Contenido"   puntaje={result.analisis.contenido.puntaje}            estado={result.analisis.contenido.estado} />
        </div>

        {expanded && (
          <>
            {result.alertas.length > 0 && (
              <div className="space-y-2">
                <p className="text-[9px] font-black uppercase tracking-widest text-amber-400/70">Alertas</p>
                {result.alertas.map((a, i) => (
                  <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-xl bg-amber-500/5 border border-amber-500/10">
                    <AlertTriangle className="h-3 w-3 text-amber-400 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-amber-300/80 leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <DetailsList section={result.analisis.integridad_archivo} label="Integridad del Archivo" />
              <DetailsList section={result.analisis.consistencia_visual} label="Consistencia Visual" />
              {calidad && <DetailsList section={calidad} label="Calidad de Imagen" />}
              <DetailsList section={result.analisis.metadatos}           label="Metadatos" />
              <DetailsList section={result.analisis.contenido}           label="Contenido" />
            </div>

            {result.recomendaciones.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-[9px] font-black uppercase tracking-widest text-primary/50">Recomendaciones</p>
                {result.recomendaciones.map((r, i) => (
                  <p key={i} className="text-[11px] text-muted-foreground/60 flex items-start gap-2">
                    <CheckCircle2 className="h-3 w-3 text-primary/40 mt-0.5 shrink-0" /> {r}
                  </p>
                ))}
              </div>
            )}

            <div className="pt-2 border-t border-border/10">
              <p className="text-[9px] text-muted-foreground/30 font-mono">
                SHA-256: {result.hash_sha256.substring(0, 32)}...
              </p>
              <p className="text-[9px] text-muted-foreground/30">
                Verificado: {new Date(result.verificado_at).toLocaleString('es-VE')}
              </p>
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
    <div className={cn(
      'inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[9px] font-black uppercase tracking-wider',
      config.bg, config.border, config.color
    )}>
      <Icon className="h-3 w-3" />
      {config.label} ({puntaje}%)
    </div>
  );
}
