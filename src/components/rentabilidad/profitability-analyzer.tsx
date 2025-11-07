
"use client";

import { useState, useEffect } from 'react';
import { formatCurrency, formatPercentage } from '@/lib/utils';

interface ProfitabilityMetric {
  id: string;
  category: 'producto' | 'cliente' | 'servicio' | 'proyecto';
  name: string;
  revenue: number;
  directCost: number;
  indirectCost: number;
  grossMargin: number;
  netMargin: number;
  contribution: number;
  profitabilityIndex: number; // 0-100
  trend: 'up' | 'down' | 'stable';
}

interface ProfitabilityAnalysis {
  totalRevenue: number;
  totalCost: number;
  grossProfit: number;
  netProfit: number;
  overallMargin: number;
  breakEvenPoint: number;
  roi: number;
  bestPerformers: ProfitabilityMetric[];
  improvementOpportunities: ProfitabilityMetric[];
}

export const ProfitabilityAnalyzer = () => {
  const [metrics, setMetrics] = useState<ProfitabilityMetric[]>([]);
  const [analysis, setAnalysis] = useState<ProfitabilityAnalysis | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [timeFrame, setTimeFrame] = useState<'month' | 'quarter' | 'year'>('quarter');

  useEffect(() => {
    const profitabilityData: ProfitabilityMetric[] = [
      {
        id: 'prod-001',
        category: 'producto',
        name: 'Software Empresarial Premium',
        revenue: 150000,
        directCost: 45000,
        indirectCost: 30000,
        grossMargin: 70,
        netMargin: 50,
        contribution: 75000,
        profitabilityIndex: 85,
        trend: 'up'
      },
      {
        id: 'prod-002',
        category: 'producto',
        name: 'Sistema de Facturación Básico',
        revenue: 80000,
        directCost: 35000,
        indirectCost: 25000,
        grossMargin: 56,
        netMargin: 25,
        contribution: 20000,
        profitabilityIndex: 45,
        trend: 'stable'
      },
      {
        id: 'cli-001',
        category: 'cliente',
        name: 'TechSolutions Corp',
        revenue: 120000,
        directCost: 40000,
        indirectCost: 28000,
        grossMargin: 67,
        netMargin: 43,
        contribution: 52000,
        profitabilityIndex: 78,
        trend: 'up'
      },
      {
        id: 'cli-002',
        category: 'cliente',
        name: 'Constructora Norte',
        revenue: 180000,
        directCost: 120000,
        indirectCost: 45000,
        grossMargin: 33,
        netMargin: 8,
        contribution: 15000,
        profitabilityIndex: 22,
        trend: 'down'
      },
      {
        id: 'serv-001',
        category: 'servicio',
        name: 'Consultoría Fiscal Avanzada',
        revenue: 90000,
        directCost: 25000,
        indirectCost: 20000,
        grossMargin: 72,
        netMargin: 50,
        contribution: 45000,
        profitabilityIndex: 88,
        trend: 'up'
      }
    ];

    setMetrics(profitabilityData);

    const totalRevenue = profitabilityData.reduce((sum, m) => sum + m.revenue, 0);
    const totalDirectCost = profitabilityData.reduce((sum, m) => sum + m.directCost, 0);
    const totalIndirectCost = profitabilityData.reduce((sum, m) => sum + m.indirectCost, 0);
    const grossProfit = totalRevenue - totalDirectCost;
    const netProfit = grossProfit - totalIndirectCost;

    const analysisData: ProfitabilityAnalysis = {
      totalRevenue,
      totalCost: totalDirectCost + totalIndirectCost,
      grossProfit,
      netProfit,
      overallMargin: (netProfit / totalRevenue),
      breakEvenPoint: totalIndirectCost / (grossProfit / totalRevenue),
      roi: (netProfit / (totalDirectCost + totalIndirectCost)),
      bestPerformers: profitabilityData
        .filter(m => m.profitabilityIndex >= 70)
        .sort((a, b) => b.profitabilityIndex - a.profitabilityIndex)
        .slice(0, 3),
      improvementOpportunities: profitabilityData
        .filter(m => m.profitabilityIndex <= 40)
        .sort((a, b) => a.profitabilityIndex - b.profitabilityIndex)
        .slice(0, 3)
    };

    setAnalysis(analysisData);
  }, [timeFrame]);

  const getProfitabilityColor = (index: number) => {
    if (index >= 70) return 'text-green-600 dark:text-green-400';
    if (index >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→';
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600 dark:text-green-400' : 
           trend === 'down' ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400';
  };

  const filteredMetrics = selectedCategory === 'all' 
    ? metrics 
    : metrics.filter(metric => metric.category === selectedCategory);

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Analizador de Rentabilidad</h2>
          <p className="text-muted-foreground">Análisis detallado de márgenes y contribución por segmento</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value as any)}
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-3 py-2 text-sm"
          >
            <option value="month">Mes Actual</option>
            <option value="quarter">Trimestre</option>
            <option value="year">Año</option>
          </select>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">Todas las categorías</option>
            <option value="producto">Productos</option>
            <option value="cliente">Clientes</option>
            <option value="servicio">Servicios</option>
            <option value="proyecto">Proyectos</option>
          </select>
        </div>
      </div>

      {analysis && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 dark:bg-green-900/50 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatPercentage(analysis.overallMargin)}
            </div>
            <div className="text-sm text-green-800 dark:text-green-300">Margen Neto</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(analysis.netProfit)}
            </div>
            <div className="text-sm text-blue-800 dark:text-blue-300">Utilidad Neta</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/50 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {formatPercentage(analysis.roi)}
            </div>
            <div className="text-sm text-purple-800 dark:text-purple-300">ROI</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/50 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {formatCurrency(analysis.breakEvenPoint)}
            </div>
            <div className="text-sm text-orange-800 dark:text-orange-300">Punto Equilibrio</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Análisis de Rentabilidad</h3>
          <div className="space-y-4">
            {filteredMetrics.map((metric) => (
              <div key={metric.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{metric.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs capitalize">
                        {metric.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getTrendColor(metric.trend)}`}>
                        {getTrendIcon(metric.trend)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getProfitabilityColor(metric.profitabilityIndex)}`}>
                      {metric.profitabilityIndex}
                    </div>
                    <div className="text-xs text-muted-foreground">Índice Rent.</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Ingresos:</span>
                    <div className="font-medium">{formatCurrency(metric.revenue)}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Contribución:</span>
                    <div className="font-medium text-green-600 dark:text-green-400">
                      {formatCurrency(metric.contribution)}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Margen Bruto:</span>
                    <div className="font-medium">{metric.grossMargin}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Margen Neto:</span>
                    <div className="font-medium">{metric.netMargin}%</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className='text-muted-foreground'>Rentabilidad</span>
                      <span>{metric.profitabilityIndex}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          metric.profitabilityIndex >= 70 ? 'bg-green-500' :
                          metric.profitabilityIndex >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${metric.profitabilityIndex}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {analysis?.bestPerformers && (
            <div className="bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 dark:text-green-200 mb-3">🏆 Mejores Performers</h3>
              <div className="space-y-3">
                {analysis.bestPerformers.map((performer) => (
                  <div key={performer.id} className="flex justify-between items-center">
                    <span className="text-sm text-green-800 dark:text-green-300">{performer.name}</span>
                    <div className="text-right">
                      <div className="font-bold text-green-600 dark:text-green-400">{performer.profitabilityIndex}</div>
                      <div className="text-xs text-green-600 dark:text-green-400">Índice</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {analysis?.improvementOpportunities && (
            <div className="bg-yellow-50 dark:bg-yellow-900/50 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-3">💡 Oportunidades de Mejora</h3>
              <div className="space-y-3">
                {analysis.improvementOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-yellow-800 dark:text-yellow-300">{opportunity.name}</div>
                      <div className="text-xs text-yellow-600 dark:text-yellow-400">
                        Margen: {opportunity.netMargin}%
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-yellow-600 dark:text-yellow-400">{opportunity.profitabilityIndex}</div>
                      <div className="text-xs text-yellow-600 dark:text-yellow-400">Índice</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {analysis && (
            <div className="bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">📊 Análisis de Sensibilidad</h3>
                <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-blue-700 dark:text-blue-300">+10% Precio → Utilidad:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                    +{formatPercentage(0.15)}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-blue-700 dark:text-blue-300">-10% Costos → Utilidad:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                    +{formatPercentage(0.12)}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-blue-700 dark:text-blue-300">+15% Volumen → Utilidad:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                    +{formatPercentage(0.18)}
                    </span>
                </div>
                </div>
            </div>
            )}

          <div className="bg-purple-50 dark:bg-purple-900/50 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 dark:text-purple-200 mb-3">🎯 Recomendaciones Estratégicas</h3>
            <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-300">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Enfocar recursos en productos con índice > 70</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Revisar estructura de costos en productos con índice {"<"} 40</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Implementar upselling en clientes rentables</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Optimizar asignación de costos indirectos</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
