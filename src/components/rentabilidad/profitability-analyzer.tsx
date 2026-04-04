"use client";

import { useState, useEffect } from 'react';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { Loader2, Inbox, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ProfitabilityMetric {
  id: string;
  categoria: string;
  nombre: string;
  ingresos: number;
  costos: number;
  margen: number;
  tendencia: 'up' | 'down' | 'stable';
}

const getTrendIcon = (t: string) => t === 'up' ? <TrendingUp className="h-4 w-4 text-green-400" /> : t === 'down' ? <TrendingDown className="h-4 w-4 text-red-400" /> : <Minus className="h-4 w-4 text-gray-400" />;
const getProfitabilityColor = (margen: number) => margen >= 40 ? 'text-green-400' : margen >= 20 ? 'text-yellow-400' : 'text-red-400';

export const ProfitabilityAnalyzer = () => {
  const [metrics, setMetrics] = useState<ProfitabilityMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [timeFrame, setTimeFrame] = useState<'month' | 'quarter' | 'year'>('quarter');

  useEffect(() => {
    setLoading(true);
    fetch(`/api/analisis/rentabilidad?timeFrame=${timeFrame}`)
      .then(r => r.ok ? r.json() : { data: [] })
      .then(d => setMetrics(d.data ?? []))
      .catch(() => setMetrics([]))
      .finally(() => setLoading(false));
  }, [timeFrame]);

  const categories = ['all', ...Array.from(new Set(metrics.map(m => m.categoria)))];
  const filtered = selectedCategory === 'all' ? metrics : metrics.filter(m => m.categoria === selectedCategory);

  const totalIngresos = metrics.reduce((s, m) => s + m.ingresos, 0);
  const totalCostos = metrics.reduce((s, m) => s + m.costos, 0);
  const margenGlobal = totalIngresos > 0 ? ((totalIngresos - totalCostos) / totalIngresos) * 100 : 0;

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Analizador de Rentabilidad</h2>
          <p className="text-muted-foreground">Análisis detallado de márgenes y contribución por segmento</p>
        </div>
        <div className="flex gap-3">
          <select value={timeFrame} onChange={e => setTimeFrame(e.target.value as 'month' | 'quarter' | 'year')} className="border-input bg-background rounded-lg px-3 py-2 text-sm">
            <option value="month">Mes Actual</option>
            <option value="quarter">Trimestre</option>
            <option value="year">Año</option>
          </select>
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="border-input bg-background rounded-lg px-3 py-2 text-sm">
            {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'Todos' : c}</option>)}
          </select>
        </div>
      </div>

      {!loading && metrics.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Ingresos Totales</p>
            <p className="text-xl font-bold text-primary">{formatCurrency(totalIngresos, 'Bs.')}</p>
          </div>
          <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
            <p className="text-xs text-muted-foreground mb-1">Costos Totales</p>
            <p className="text-xl font-bold text-destructive">{formatCurrency(totalCostos, 'Bs.')}</p>
          </div>
          <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
            <p className="text-xs text-muted-foreground mb-1">Margen Global</p>
            <p className={`text-xl font-bold ${getProfitabilityColor(margenGlobal)}`}>{margenGlobal.toFixed(1)}%</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12 gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Analizando rentabilidad...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-3">
          <Inbox className="h-10 w-10 opacity-30" />
          <p className="font-semibold">Sin datos de rentabilidad</p>
          <p className="text-sm text-center">Registra facturas y costos para ver el análisis de rentabilidad por segmento.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(m => (
            <div key={m.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-border hover:border-border/70 transition-all">
              <div className="flex items-center gap-3">
                {getTrendIcon(m.tendencia)}
                <div>
                  <p className="font-semibold text-sm">{m.nombre}</p>
                  <p className="text-xs text-muted-foreground capitalize">{m.categoria}</p>
                </div>
              </div>
              <div className="flex gap-6 text-right">
                <div>
                  <p className="text-xs text-muted-foreground">Ingresos</p>
                  <p className="text-sm font-bold">{formatCurrency(m.ingresos, 'Bs.')}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Costos</p>
                  <p className="text-sm font-bold text-destructive">{formatCurrency(m.costos, 'Bs.')}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Margen</p>
                  <p className={`text-sm font-bold ${getProfitabilityColor(m.margen)}`}>{m.margen.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
