'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Loader2, Inbox, TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';

interface SummaryData {
  totalIngresos: number;
  totalCostos: number;
  margenBruto: number;
  utilidad: number;
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
        const utilidad = totalIngresos - totalCostos;
        setData({ totalIngresos, totalCostos, margenBruto, utilidad, meses });
      })
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-[215.9mm] h-[279.4mm] bg-card/50 backdrop-blur-sm rounded-xl border shadow-sm p-8 mx-auto flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Cargando análisis ejecutivo...</span>
        </div>
      </div>
    );
  }

  if (!data || data.meses.length === 0) {
    return (
      <div className="w-[215.9mm] h-[279.4mm] bg-card/50 backdrop-blur-sm rounded-xl border shadow-sm p-8 mx-auto flex flex-col items-center justify-center text-muted-foreground gap-3">
        <Inbox className="h-10 w-10 opacity-30" />
        <p className="font-semibold">Sin datos ejecutivos disponibles</p>
        <p className="text-sm text-center">Registra facturas y cuentas por pagar para ver el análisis ejecutivo de rentabilidad.</p>
      </div>
    );
  }

  const ultimoMes = data.meses[data.meses.length - 1];
  const penultimoMes = data.meses.length > 1 ? data.meses[data.meses.length - 2] : null;
  const tendenciaIngresos = penultimoMes && ultimoMes.ingresos >= penultimoMes.ingresos;
  const promedioMensual = data.totalIngresos / data.meses.length;

  return (
    <div className="w-[215.9mm] h-[279.4mm] bg-white dark:bg-card rounded-xl border shadow-lg mx-auto overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-700 text-white p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Resumen Ejecutivo</h2>
            <p className="text-slate-300 text-sm mt-1">Análisis financiero integral • {data.meses.length} meses analizados</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">Período</p>
            <p className="text-sm font-medium">{data.meses[0].name} - {ultimoMes.name}</p>
          </div>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-4 gap-4 p-6 pb-4">
        <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Total Ingresos</span>
          </div>
          <p className="text-xl font-bold text-emerald-700 dark:text-emerald-400">{formatCurrency(data.totalIngresos, 'Bs.')}</p>
          <div className="flex items-center gap-1 mt-1">
            {tendenciaIngresos ? (
              <TrendingUp className="h-3 w-3 text-emerald-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500" />
            )}
            <span className="text-xs text-emerald-600 dark:text-emerald-400">Prom. {formatCurrency(promedioMensual, 'Bs.')}/mes</span>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-4 border border-red-200 dark:border-red-800">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
            <span className="text-xs font-medium text-red-700 dark:text-red-300">Total Costos</span>
          </div>
          <p className="text-xl font-bold text-red-700 dark:text-red-400">{formatCurrency(data.totalCostos, 'Bs.')}</p>
          <p className="text-xs text-red-600 dark:text-red-400 mt-1">{((data.totalCostos / data.totalIngresos) * 100).toFixed(1)}% de ingresos</p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-2">
            <Percent className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Margen Bruto</span>
          </div>
          <p className="text-xl font-bold text-blue-700 dark:text-blue-400">{data.margenBruto.toFixed(1)}%</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">{data.margenBruto >= 20 ? 'Saludable' : data.margenBruto >= 10 ? 'Moderado' : 'Bajo'}</p>
        </div>

        <div className={`${data.utilidad >= 0 ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800' : 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800'} rounded-lg p-4 border`}>
          <div className="flex items-center gap-2 mb-2">
            {data.utilidad >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            )}
            <span className="text-xs font-medium text-green-700 dark:text-green-300">Utilidad Neta</span>
          </div>
          <p className={`text-xl font-bold ${data.utilidad >= 0 ? 'text-green-700 dark:text-green-400' : 'text-orange-700 dark:text-orange-400'}`}>{formatCurrency(data.utilidad, 'Bs.')}</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">{data.utilidad >= 0 ? 'Ganancia' : 'Pérdida'}</p>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 px-6 pb-4 grid grid-cols-3 gap-6">
        {/* Gráfico */}
        <div className="col-span-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700 flex flex-col">
          <h3 className="font-semibold text-sm text-slate-700 dark:text-slate-300 mb-3">Evolución Mensual: Ingresos vs Egresos</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.meses} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorEgresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" fontSize={11} stroke="#94a3b8" tickMargin={5} />
                <YAxis fontSize={11} stroke="#94a3b8" tickMargin={5} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15,23,42,0.95)', 
                    border: '1px solid #334155', 
                    borderRadius: '8px', 
                    color: '#fff',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }} 
                  formatter={(value: number) => [formatCurrency(value, 'Bs.'), '']}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="ingresos" stroke="#10b981" fill="url(#colorIngresos)" strokeWidth={2} name="Ingresos" />
                <Area type="monotone" dataKey="egresos" stroke="#ef4444" fill="url(#colorEgresos)" strokeWidth={2} name="Egresos" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabla Resumen Mensual */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700 flex flex-col">
          <h3 className="font-semibold text-sm text-slate-700 dark:text-slate-300 mb-3">Detalle Mensual</h3>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-2 text-slate-500 font-medium">Mes</th>
                  <th className="text-right py-2 text-slate-500 font-medium">Ingresos</th>
                  <th className="text-right py-2 text-slate-500 font-medium">Egresos</th>
                  <th className="text-right py-2 text-slate-500 font-medium">Balance</th>
                </tr>
              </thead>
              <tbody>
                {data.meses.map((mes, i) => {
                  const balance = mes.ingresos - mes.egresos;
                  return (
                    <tr key={i} className="border-b border-slate-100 dark:border-slate-800 last:border-0">
                      <td className="py-2 text-slate-700 dark:text-slate-300">{mes.name}</td>
                      <td className="py-2 text-right text-emerald-600 dark:text-emerald-400 font-medium">{formatCurrency(mes.ingresos, 'Bs.').replace('Bs.', '')}</td>
                      <td className="py-2 text-right text-red-600 dark:text-red-400 font-medium">{formatCurrency(mes.egresos, 'Bs.').replace('Bs.', '')}</td>
                      <td className={`py-2 text-right font-medium ${balance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                        {formatCurrency(balance, 'Bs.').replace('Bs.', '')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 px-6 py-3">
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>Reporte generado automáticamente por Sistema Kyron</span>
          <span>{new Date().toLocaleDateString('es-VE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
};
