'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2, Inbox, TrendingUp } from 'lucide-react';

interface SummaryData {
  totalIngresos: number;
  totalCostos: number;
  margenBruto: number;
  meses: { name: string; ingresos: number; egresos: number }[];
}

export const ExecutiveAnalytics = () => {
  const [data, setData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/analisis/cash-flow').then(r => r.ok ? r.json() : { data: [] }),
      fetch('/api/analisis/costos').then(r => r.ok ? r.json() : { total_costos: '0', margen_bruto: '0' }),
    ])
      .then(([cf, costos]) => {
        const meses = (cf.data ?? []).map((m: Record<string, unknown>) => ({
          name: m.mes as string,
          ingresos: m.ingresos as number,
          egresos: m.egresos as number,
        }));
        const totalIngresos = meses.reduce((s: number, m: { ingresos: number }) => s + m.ingresos, 0);
        const totalCostos = parseFloat(costos.total_costos ?? '0') || 0;
        const margenBruto = parseFloat(costos.margen_bruto ?? '0') || 0;
        setData({ totalIngresos, totalCostos, margenBruto, meses });
      })
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Análisis Ejecutivo</h2>
          <p className="text-muted-foreground">Inteligencia de negocio para la toma de decisiones</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Cargando análisis ejecutivo...</span>
        </div>
      ) : !data || data.meses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-3">
          <Inbox className="h-10 w-10 opacity-30" />
          <p className="font-semibold">Sin datos ejecutivos disponibles</p>
          <p className="text-sm text-center">Registra facturas y cuentas por pagar para ver el análisis ejecutivo de rentabilidad.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-background rounded-lg p-4">
            <h3 className="font-semibold mb-4">Evolución Ingresos vs Egresos</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={data.meses}>
                <XAxis dataKey="name" fontSize={12} stroke="#6b7280" />
                <YAxis fontSize={12} stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(20,20,20,0.8)', border: '1px solid #333', backdropFilter: 'blur(5px)', color: '#fff' }} />
                <Area type="monotone" dataKey="ingresos" stroke="#10b981" fill="#d1fae5" fillOpacity={0.2} />
                <Area type="monotone" dataKey="egresos" stroke="#ef4444" fill="#fee2e2" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resumen Financiero</h3>
            <div className="space-y-3">
              <div className="bg-emerald-900/20 p-4 rounded-lg border border-emerald-800 text-center">
                <div className="text-2xl font-bold text-emerald-400">{formatCurrency(data.totalIngresos, 'Bs.')}</div>
                <div className="text-sm text-emerald-300">Total Ingresos</div>
              </div>
              <div className="bg-red-900/20 p-4 rounded-lg border border-red-800 text-center">
                <div className="text-2xl font-bold text-red-400">{formatCurrency(data.totalCostos, 'Bs.')}</div>
                <div className="text-sm text-red-300">Total Costos</div>
              </div>
              <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800 text-center">
                <div className="text-2xl font-bold text-blue-400">{data.margenBruto.toFixed(1)}%</div>
                <div className="text-sm text-blue-300">Margen Bruto</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
