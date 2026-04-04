"use client";

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';
import { Loader2, Inbox, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface CostItem {
  id: string;
  nombre: string;
  tipo: string;
  monto: number;
}

const getTrendIcon = (t: string) => t === 'up' ? <TrendingUp className="h-4 w-4 text-red-400" /> : t === 'down' ? <TrendingDown className="h-4 w-4 text-green-400" /> : <Minus className="h-4 w-4 text-gray-400" />;

export const CostOptimization = () => {
  const [costs, setCosts] = useState<CostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    fetch('/api/analisis/costos')
      .then(r => r.ok ? r.json() : { desglose: [] })
      .then(d => {
        const items: CostItem[] = (d.desglose ?? []).map((item: { name: string; value: number }, i: number) => ({
          id: `cost-${i}`,
          nombre: item.name,
          tipo: 'variable',
          monto: item.value,
        }));
        setCosts(items);
      })
      .catch(() => setCosts([]))
      .finally(() => setLoading(false));
  }, []);

  const types = ['all', ...Array.from(new Set(costs.map(c => c.tipo)))];
  const filtered = selectedType === 'all' ? costs : costs.filter(c => c.tipo === selectedType);
  const total = costs.reduce((s, c) => s + c.monto, 0);

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Optimización de Costos</h2>
          <p className="text-muted-foreground">Análisis y oportunidades de reducción de gastos</p>
        </div>
        <select value={selectedType} onChange={e => setSelectedType(e.target.value)} className="border-input bg-background rounded-lg px-3 py-2 text-sm">
          {types.map(t => <option key={t} value={t}>{t === 'all' ? 'Todos' : t}</option>)}
        </select>
      </div>

      {!loading && costs.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
            <p className="text-xs text-muted-foreground mb-1">Total Costos Registrados</p>
            <p className="text-xl font-bold text-destructive">{formatCurrency(total, 'Bs.')}</p>
          </div>
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Categorías Detectadas</p>
            <p className="text-xl font-bold text-primary">{costs.length}</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12 gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Analizando costos...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-3">
          <Inbox className="h-10 w-10 opacity-30" />
          <p className="font-semibold">Sin costos registrados</p>
          <p className="text-sm text-center">Registra cuentas por pagar para ver el análisis de optimización de costos.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(c => (
            <div key={c.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-border hover:border-border/70 transition-all">
              <div className="flex items-center gap-3">
                {getTrendIcon('stable')}
                <div>
                  <p className="font-semibold text-sm">{c.nombre}</p>
                  <p className="text-xs text-muted-foreground capitalize">{c.tipo}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-destructive">{formatCurrency(c.monto, 'Bs.')}</p>
                <p className="text-xs text-muted-foreground">{total > 0 ? `${((c.monto / total) * 100).toFixed(1)}% del total` : '—'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
