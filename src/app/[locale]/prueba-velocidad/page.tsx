'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Zap, ArrowRight, Play, CheckCircle2, Shield,
  Clock, BarChart2, Sparkles, ChevronRight, RotateCcw, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

const EXAMPLES = [
  '¿Cuánto IVA retengo a un contribuyente especial?',
  '¿Cuáles son los aportes al IVSS en Venezuela?',
  '¿Cómo calculo el bono vacacional según la LOTTT?',
  '¿Qué es el IGTF y a qué tasa aplica?',
  '¿Cuándo se declara el ISLR en Venezuela?',
];

const COMPETITOR_COLORS = [
  'bg-orange-500/50',
  'bg-red-500/40',
  'bg-rose-600/35',
];

interface Competitor {
  name: string;
  time: number;
}

interface SpeedResult {
  kyronTime: number;
  text: string;
  competitors: Competitor[];
}

function formatTime(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

export default function PruebaVelocidadPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SpeedResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result) {
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [result]);

  async function runTest(text?: string) {
    const q = (text ?? query).trim();
    if (!q || loading) return;

    setQuery(q);
    setError(null);
    setResult(null);
    setLoading(true);
    setElapsed(0);

    const start = Date.now();
    timerRef.current = setInterval(() => setElapsed(Date.now() - start), 50);

    try {
      const res = await fetch('/api/ai/speed-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });

      if (timerRef.current) clearInterval(timerRef.current);

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error ejecutando la prueba.');
        return;
      }

      setResult(data);
    } catch {
      setError('Error de conexión. Verifica tu internet e intenta de nuevo.');
    } finally {
      if (timerRef.current) clearInterval(timerRef.current);
      setLoading(false);
    }
  }

  function reset() {
    setResult(null);
    setError(null);
    setQuery('');
    setElapsed(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  const allTimes = result ? [result.kyronTime, ...result.competitors.map(c => c.time)] : [];
  const maxTime = allTimes.length ? Math.max(...allTimes) : 1;

  return (
    <div className="min-h-screen bg-[#060a14] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#060a14]/90 backdrop-blur-xl px-4 sm:px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="rounded-xl h-9 w-9 border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] text-foreground/60 hover:text-foreground shrink-0"
            >
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <Link href="/" className="flex items-center gap-2.5">
              <Logo className="h-8 w-8" />
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground leading-none">System Kyron</p>
                <p className="text-[9px] text-muted-foreground/40 uppercase tracking-[0.15em] leading-none mt-0.5">Prueba de Velocidad</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400 px-3 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/[0.06]">
              <Zap className="h-3 w-3" />
              Benchmark Real
            </span>
            <Button
              asChild
              size="sm"
              className="kyron-gradient-bg text-white text-[11px] font-bold tracking-wide h-8 px-4 rounded-xl border-0 shadow-md"
            >
              <Link href="/login">
                Comenzar <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 sm:py-10 space-y-8">
        {/* Hero */}
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/[0.06]">
            <Zap className="h-3.5 w-3.5 text-yellow-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/60">Benchmark en Vivo</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            System Kyron vs{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              ERPs Tradicionales
            </span>
          </h1>
          <p className="text-sm text-muted-foreground/60 max-w-lg mx-auto leading-relaxed">
            Escribe una consulta fiscal o empresarial y comprueba en tiempo real cuánto tarda Kyron frente a los ERPs más usados del mercado.
          </p>

          {/* Stats strip */}
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            {[
              { value: '90%', label: 'Reducción en tiempo fiscal', color: 'text-cyan-400' },
              { value: '3x', label: 'Más rápido que ERPs genéricos', color: 'text-yellow-400' },
              { value: '99.9%', label: 'Disponibilidad garantizada', color: 'text-emerald-400' },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <span className={cn('text-lg font-black tabular-nums', stat.color)}>{stat.value}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/40 max-w-[80px] leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Input / Test form */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <form
            onSubmit={e => { e.preventDefault(); runTest(); }}
            className="flex gap-2"
          >
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Escribe tu consulta fiscal o empresarial..."
              disabled={loading}
              maxLength={300}
              className="flex-1 bg-white/[0.04] border border-white/[0.08] focus:border-yellow-500/40 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/30 outline-none transition-colors disabled:opacity-50"
            />
            <Button
              type="submit"
              disabled={loading || !query.trim()}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold border-0 rounded-xl h-auto px-5 py-3.5 text-[11px] tracking-wide uppercase shrink-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-yellow-500/20"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Zap className="h-3.5 w-3.5 animate-pulse" />
                  {(elapsed / 1000).toFixed(1)}s
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Play className="h-3.5 w-3.5" />
                  Probar
                </span>
              )}
            </Button>
          </form>

          {/* Example queries */}
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex, i) => (
              <button
                key={i}
                type="button"
                onClick={() => runTest(ex)}
                disabled={loading}
                className="text-[11px] text-muted-foreground/50 hover:text-foreground/70 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-yellow-500/20 rounded-lg px-3 py-1.5 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {ex}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Live timer during loading */}
        {loading && (
          <motion.div
            className="text-center py-10 space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 rounded-full border-2 border-yellow-500/20" />
              <div className="absolute inset-0 rounded-full border-2 border-t-yellow-400 border-transparent animate-spin" />
              <Zap className="absolute inset-0 m-auto h-7 w-7 text-yellow-400" />
            </div>
            <div className="space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
                Midiendo velocidad...
              </p>
              <p className="text-4xl font-black text-yellow-400 tabular-nums tracking-tight">
                {(elapsed / 1000).toFixed(2)}s
              </p>
              <p className="text-[10px] text-muted-foreground/30">
                Kyron procesando tu consulta en tiempo real
              </p>
            </div>
          </motion.div>
        )}

        {/* Error */}
        {error && !loading && (
          <motion.div
            className="text-center py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-sm text-red-400 font-medium bg-red-500/[0.06] border border-red-500/20 rounded-xl px-4 py-3">
              {error}
            </p>
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              ref={resultsRef}
              className="space-y-5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Speed comparison bars */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
                    <BarChart2 className="h-3.5 w-3.5" />
                    Comparativa de Velocidad
                  </h2>
                  <button
                    onClick={reset}
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/40 hover:text-foreground/60 transition-colors"
                  >
                    <RotateCcw className="h-3 w-3" /> Nueva prueba
                  </button>
                </div>

                {/* Kyron bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-black text-foreground">System Kyron</span>
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <Zap className="h-2.5 w-2.5" /> MÁS RÁPIDO
                      </span>
                    </div>
                    <span className="text-base font-black text-emerald-400 tabular-nums">
                      {formatTime(result.kyronTime)}
                    </span>
                  </div>
                  <div className="h-4 bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-green-400 relative"
                      initial={{ width: 0 }}
                      animate={{ width: `${(result.kyronTime / maxTime) * 100}%` }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-full" />
                    </motion.div>
                  </div>
                </div>

                {/* Separator */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-white/[0.05]" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/30">vs. competidores</span>
                  <div className="flex-1 h-px bg-white/[0.05]" />
                </div>

                {/* Competitor bars */}
                {result.competitors.map((comp, i) => (
                  <div key={comp.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-muted-foreground/55">{comp.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-muted-foreground/40 tabular-nums">
                          {(comp.time / result.kyronTime).toFixed(1)}x más lento
                        </span>
                        <span className="text-sm font-bold text-muted-foreground/50 tabular-nums">
                          {formatTime(comp.time)}
                        </span>
                      </div>
                    </div>
                    <div className="h-4 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div
                        className={cn('h-full rounded-full relative', COMPETITOR_COLORS[i])}
                        initial={{ width: 0 }}
                        animate={{ width: `${(comp.time / maxTime) * 100}%` }}
                        transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-full" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Kyron's actual response */}
              <div className="rounded-2xl border border-cyan-500/10 bg-gradient-to-br from-cyan-500/[0.04] to-transparent p-6 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">Respuesta de Kyron</p>
                    <p className="text-[9px] text-emerald-400 font-semibold">{result.kyronTime}ms · Gemini 2.5 Flash</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                  {result.text}
                </p>
              </div>

              {/* CTA */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="text-center sm:text-left">
                  <p className="font-black text-foreground text-lg tracking-tight">¿Impresionado con la velocidad?</p>
                  <p className="text-sm text-muted-foreground/55 mt-1 leading-relaxed">
                    Accede a todos los módulos contables, fiscal, RRHH y legal sin límites.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Button
                    onClick={reset}
                    variant="outline"
                    className="rounded-xl border-white/[0.1] bg-white/[0.02] text-foreground/70 hover:bg-white/[0.05] h-11 px-5 text-[11px] font-bold tracking-wide uppercase"
                  >
                    <RotateCcw className="h-3.5 w-3.5 mr-2" /> Otra prueba
                  </Button>
                  <Button
                    asChild
                    className="kyron-gradient-bg text-white border-0 rounded-xl font-bold tracking-wide h-11 px-6 shadow-lg text-[11px] uppercase"
                  >
                    <Link href="/login">
                      Comenzar Gratis <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust footer */}
        <motion.div
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/25 pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="flex items-center gap-1.5">
            <Shield className="h-3 w-3 text-emerald-400/40" />
            Respuesta real de IA, no simulada
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-cyan-400/40" />
            Tiempos competidores basados en benchmarks publicados
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3 w-3 text-violet-400/40" />
            Sin registro requerido
          </span>
        </motion.div>
      </main>
    </div>
  );
}
