"use client";

import { useState, useEffect, useCallback } from 'react';
import { Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

type CXC = {
  id: number;
  concepto: string;
  monto_original: string;
  monto_pendiente: string;
  moneda: string;
  fecha_emision: string;
  fecha_vencimiento: string | null;
  estado: string;
  cliente_id: number | null;
  cliente_nombre: string | null;
  cliente_rif: string | null;
  cliente_telefono: string | null;
  cliente_email: string | null;
};

type Stats = {
  total_pendiente: string;
  total_vencido: string;
  num_pendientes: number;
  num_vencidas: number;
};

interface ClientPortfolio {
  clienteId: number | null;
  nombre: string;
  rif: string | null;
  email: string | null;
  telefono: string | null;
  totalDeuda: number;
  cuentasPendientes: number;
  cuentasVencidas: number;
  riskLevel: 'bajo' | 'medio' | 'alto' | 'critico';
}

export const IntelligentPortfolioManager = () => {
  const [portfolios, setPortfolios] = useState<ClientPortfolio[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'analytics'>('grid');

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/cuentas-por-cobrar");
      if (!res.ok) return;
      const data = await res.json();
      const cuentas: CXC[] = data.cuentas || [];
      setStats(data.stats || null);

      const grouped: Record<string, ClientPortfolio> = {};
      for (const c of cuentas) {
        const key = c.cliente_id ? String(c.cliente_id) : `sin-${c.id}`;
        if (!grouped[key]) {
          grouped[key] = {
            clienteId: c.cliente_id,
            nombre: c.cliente_nombre || c.concepto,
            rif: c.cliente_rif,
            email: c.cliente_email,
            telefono: c.cliente_telefono,
            totalDeuda: 0,
            cuentasPendientes: 0,
            cuentasVencidas: 0,
            riskLevel: 'bajo',
          };
        }
        grouped[key].totalDeuda += parseFloat(c.monto_pendiente || '0');
        if (['pendiente', 'parcial'].includes(c.estado)) grouped[key].cuentasPendientes++;
        if (c.estado === 'vencida') grouped[key].cuentasVencidas++;
      }

      for (const p of Object.values(grouped)) {
        if (p.cuentasVencidas > 2 || p.totalDeuda > 100000) p.riskLevel = 'critico';
        else if (p.cuentasVencidas > 0 || p.totalDeuda > 50000) p.riskLevel = 'alto';
        else if (p.totalDeuda > 20000) p.riskLevel = 'medio';
        else p.riskLevel = 'bajo';
      }

      setPortfolios(Object.values(grouped));
    } catch {} finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'bajo': return 'bg-green-100 text-green-800';
      case 'medio': return 'bg-yellow-100 text-yellow-800';
      case 'alto': return 'bg-orange-100 text-orange-800';
      case 'critico': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPortfolios = selectedSegment === 'all'
    ? portfolios
    : portfolios.filter(p => p.riskLevel === selectedSegment);

  const totalCartera = portfolios.reduce((s, p) => s + p.totalDeuda, 0);
  const totalVencido = parseFloat(stats?.total_vencido || '0');
  const eficiencia = totalCartera > 0 ? ((totalCartera - totalVencido) / totalCartera) * 100 : 100;

  const riskDist = {
    bajo: portfolios.filter(p => p.riskLevel === 'bajo').length,
    medio: portfolios.filter(p => p.riskLevel === 'medio').length,
    alto: portfolios.filter(p => p.riskLevel === 'alto').length,
    critico: portfolios.filter(p => p.riskLevel === 'critico').length,
  };

  if (loading) {
    return (
      <div className="bg-card/50 backdrop-blur-sm rounded-lg border p-6 flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Gestor Inteligente de Cartera</h2>
          <p className="text-muted-foreground">Análisis y gestión proactiva de cobranza</p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e.target.value)}
            className="border-input bg-background rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">Todos los niveles</option>
            <option value="bajo">Riesgo Bajo</option>
            <option value="medio">Riesgo Medio</option>
            <option value="alto">Riesgo Alto</option>
            <option value="critico">Riesgo Crítico</option>
          </select>
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded text-sm ${viewMode === 'grid' ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
            >
              Lista
            </button>
            <button
              onClick={() => setViewMode('analytics')}
              className={`px-3 py-1 rounded text-sm ${viewMode === 'analytics' ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
            >
              Analytics
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalCartera, 'Bs.')}</div>
              <div className="text-sm text-blue-500">Cartera Total</div>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <div className="text-2xl font-bold text-green-600">{eficiencia.toFixed(0)}%</div>
              <div className="text-sm text-green-500">Eficiencia Cobranza</div>
            </div>
            <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
              <div className="text-2xl font-bold text-orange-600">{formatCurrency(totalVencido, 'Bs.')}</div>
              <div className="text-sm text-orange-500">En Mora</div>
            </div>
            <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-600">{portfolios.length}</div>
              <div className="text-sm text-purple-500">Clientes en Cartera</div>
            </div>
          </div>

          {filteredPortfolios.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground/50">
              <p className="text-sm font-bold">Sin clientes en cartera</p>
              <p className="text-xs mt-1">Las cuentas por cobrar registradas aparecerán aquí agrupadas por cliente</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPortfolios.map((client, i) => (
                <div key={i} className="border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {client.nombre.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{client.nombre}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {client.rif && <span className="text-xs text-muted-foreground font-mono">{client.rif}</span>}
                          <span className={`px-2 py-1 rounded-full text-xs ${getRiskColor(client.riskLevel)}`}>
                            Riesgo {client.riskLevel}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{formatCurrency(client.totalDeuda, 'Bs.')}</div>
                      <div className="text-sm text-muted-foreground">Deuda actual</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Pendientes:</span>
                      <div className="font-medium">{client.cuentasPendientes}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Vencidas:</span>
                      <div className={`font-medium ${client.cuentasVencidas > 0 ? 'text-red-500' : 'text-foreground'}`}>{client.cuentasVencidas}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <div className="font-medium text-xs truncate">{client.email || '—'}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Teléfono:</span>
                      <div className="font-medium">{client.telefono || '—'}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-background rounded-lg p-6">
            <h3 className="font-semibold mb-4">Distribución de Riesgo</h3>
            <div className="space-y-3">
              {Object.entries(riskDist).map(([risk, count]) => (
                <div key={risk} className="flex items-center justify-between">
                  <span className="capitalize text-muted-foreground">{risk}:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          risk === 'bajo' ? 'bg-green-500' :
                          risk === 'medio' ? 'bg-yellow-500' :
                          risk === 'alto' ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: portfolios.length > 0 ? `${(count / portfolios.length) * 100}%` : '0%' }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-background rounded-lg p-6">
            <h3 className="font-semibold mb-4">Resumen de Cartera</h3>
            <div className="space-y-4">
              <div className="flex justify-between"><span className="text-muted-foreground">Total Cartera:</span><span className="font-bold">{formatCurrency(totalCartera, 'Bs.')}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">En Mora:</span><span className="font-bold text-red-500">{formatCurrency(totalVencido, 'Bs.')}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Eficiencia:</span><span className="font-bold text-green-600">{eficiencia.toFixed(1)}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Clientes:</span><span className="font-bold">{portfolios.length}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
