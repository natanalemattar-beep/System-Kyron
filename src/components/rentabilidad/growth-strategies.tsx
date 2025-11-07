
"use client";

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';

interface GrowthStrategy {
  id: string;
  name: string;
  type: 'upselling' | 'crosselling' | 'new_markets' | 'pricing' | 'efficiency';
  description: string;
  potentialRevenue: number;
  implementationCost: number;
  timeline: 'short' | 'medium' | 'long';
  successProbability: number;
  impact: 'high' | 'medium' | 'low';
  status: 'planned' | 'in_progress' | 'completed';
}

interface PricingStrategy {
  product: string;
  currentPrice: number;
  proposedPrice: number;
  priceElasticity: number;
  expectedVolumeChange: number;
  revenueImpact: number;
  marginImpact: number;
}

export const GrowthStrategies = () => {
  const [strategies, setStrategies] = useState<GrowthStrategy[]>([]);
  const [pricingStrategies, setPricingStrategies] = useState<PricingStrategy[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    const strategyData: GrowthStrategy[] = [
      {
        id: 'strat-001',
        name: 'Programa de Lealtad Premium',
        type: 'upselling',
        description: 'Implementar programa de beneficios para clientes recurrentes',
        potentialRevenue: 75000,
        implementationCost: 15000,
        timeline: 'short',
        successProbability: 80,
        impact: 'high',
        status: 'planned'
      },
      {
        id: 'strat-002',
        name: 'Expansión a Mercado PYME',
        type: 'new_markets',
        description: 'Desarrollar versión económica para pequeñas empresas',
        potentialRevenue: 120000,
        implementationCost: 45000,
        timeline: 'medium',
        successProbability: 65,
        impact: 'high',
        status: 'in_progress'
      },
      {
        id: 'strat-003',
        name: 'Optimización de Precios Dinámica',
        type: 'pricing',
        description: 'Implementar sistema de precios basado en demanda y valor',
        potentialRevenue: 50000,
        implementationCost: 8000,
        timeline: 'short',
        successProbability: 75,
        impact: 'medium',
        status: 'planned'
      },
      {
        id: 'strat-004',
        name: 'Paquetes de Servicios Integrados',
        type: 'crosselling',
        description: 'Crear bundles de productos y servicios complementarios',
        potentialRevenue: 60000,
        implementationCost: 12000,
        timeline: 'short',
        successProbability: 70,
        impact: 'medium',
        status: 'in_progress'
      }
    ];
    setStrategies(strategyData);

    const pricingData: PricingStrategy[] = [
      {
        product: 'Software Empresarial Premium',
        currentPrice: 299,
        proposedPrice: 349,
        priceElasticity: -1.2,
        expectedVolumeChange: -8,
        revenueImpact: 23520,
        marginImpact: 18
      },
      {
        product: 'Sistema de Facturación Básico',
        currentPrice: 99,
        proposedPrice: 119,
        priceElasticity: -0.8,
        expectedVolumeChange: -5,
        revenueImpact: 15680,
        marginImpact: 22
      },
      {
        product: 'Consultoría Fiscal Avanzada',
        currentPrice: 150,
        proposedPrice: 175,
        priceElasticity: -0.6,
        expectedVolumeChange: -3,
        revenueImpact: 18900,
        marginImpact: 15
      }
    ];
    setPricingStrategies(pricingData);
  }, []);

  const startStrategy = (strategyId: string) => {
    setStrategies(strategies.map(strat => 
      strat.id === strategyId 
        ? { ...strat, status: 'in_progress' }
        : strat
    ));
  };

  const completeStrategy = (strategyId: string) => {
    setStrategies(strategies.map(strat => 
      strat.id === strategyId 
        ? { ...strat, status: 'completed' }
        : strat
    ));
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300';
      case 'low': return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getTimelineColor = (timeline: string) => {
    switch (timeline) {
      case 'short': return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300';
      case 'long': return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300';
      case 'in_progress': return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300';
      case 'planned': return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const filteredStrategies = selectedType === 'all' 
    ? strategies 
    : strategies.filter(strat => strat.type === selectedType);

  const totalPotentialRevenue = strategies.reduce((sum, strat) => sum + strat.potentialRevenue, 0);
  const totalImplementationCost = strategies.reduce((sum, strat) => sum + strat.implementationCost, 0);
  const totalROI = ((totalPotentialRevenue - totalImplementationCost) / totalImplementationCost) * 100;

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Estrategias de Crecimiento</h2>
          <p className="text-muted-foreground">Planes para incrementar rentabilidad y mercado</p>
        </div>
        <select 
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">Todas</option>
          <option value="upselling">Upselling</option>
          <option value="crosselling">Cross-selling</option>
          <option value="new_markets">Nuevos Mercados</option>
          <option value="pricing">Pricing</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 dark:bg-green-900/50 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatCurrency(totalPotentialRevenue)}
          </div>
          <div className="text-sm text-green-800 dark:text-green-300">Potencial Ingresos</div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {totalROI.toFixed(0)}%
          </div>
          <div className="text-sm text-blue-800 dark:text-blue-300">ROI Esperado</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/50 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {strategies.filter(s => s.status === 'in_progress').length}
          </div>
          <div className="text-sm text-purple-800 dark:text-purple-300">En Ejecución</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Estrategias de Crecimiento</h3>
          <div className="space-y-4">
            {filteredStrategies.map((strategy) => (
              <div key={strategy.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{strategy.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{strategy.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-2 py-1 rounded-full text-xs ${getImpactColor(strategy.impact)}`}>
                      {strategy.impact === 'high' ? 'Alto' : 'Medio'} Impacto
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(strategy.status)}`}>
                      {strategy.status === 'completed' ? 'Completado' : strategy.status === 'in_progress' ? 'En Progreso' : 'Planificado'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Pot. Ingresos:</span>
                    <div className="font-medium text-green-600 dark:text-green-400">
                      {formatCurrency(strategy.potentialRevenue)}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Prob. Éxito:</span>
                    <div className="font-medium">{strategy.successProbability}%</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {strategy.status === 'planned' && (
                    <button
                      onClick={() => startStrategy(strategy.id)}
                      className="flex-1 bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700"
                    >
                      Iniciar
                    </button>
                  )}
                  {strategy.status === 'in_progress' && (
                    <button
                      onClick={() => completeStrategy(strategy.id)}
                      className="flex-1 bg-green-600 text-white py-2 rounded text-sm font-medium hover:bg-green-700"
                    >
                      Completar
                    </button>
                  )}
                   <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                    Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Optimización de Precios</h3>
            <div className="space-y-4">
              {pricingStrategies.map((strategy) => (
                <div key={strategy.product} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">{strategy.product}</h4>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Precio Actual:</span>
                      <div className="font-medium">{formatCurrency(strategy.currentPrice)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Precio Propuesto:</span>
                      <div className="font-medium text-green-600 dark:text-green-400">{formatCurrency(strategy.proposedPrice)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cambio Volumen:</span>
                      <div className={`font-medium ${strategy.expectedVolumeChange < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                        {strategy.expectedVolumeChange}%
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Impacto Ingresos:</span>
                      <div className="font-medium text-green-600 dark:text-green-400">
                        +{formatCurrency(strategy.revenueImpact)}
                      </div>
                    </div>
                  </div>

                  <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700">
                    Aplicar Nuevo Precio
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
