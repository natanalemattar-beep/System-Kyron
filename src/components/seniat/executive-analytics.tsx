'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface FinancialImpact {
  id: string;
  scenario: string;
  impactType: 'savings' | 'revenue_gain' | 'cost_avoidance';
  amount: number;
  probability: number;
}

interface TaxOptimization {
  id: string;
  optimization: string;
  status: 'applied' | 'pending' | 'rejected';
  impact: number;
  complexity: 'low' | 'medium' | 'high';
}

const chartData = [
  { name: 'Ene', riesgo: 12, optimizacion: 20 },
  { name: 'Feb', riesgo: 10, optimizacion: 25 },
  { name: 'Mar', riesgo: 8, optimizacion: 30 },
  { name: 'Abr', riesgo: 5, optimizacion: 35 },
  { name: 'May', riesgo: 2, optimizacion: 40 },
  { name: 'Jun', riesgo: 0.1, optimizacion: 45 },
];

export const ExecutiveAnalytics = () => {
  const [financialImpacts, setFinancialImpacts] = useState<FinancialImpact[]>([]);
  const [optimizations, setOptimizations] = useState<TaxOptimization[]>([]);
  const [totalRiskExposure] = useState(15000);

  useEffect(() => {
    const impacts: FinancialImpact[] = [
      {
        id: 'impact-001',
        scenario: 'Prevención de multa por declaración tardía',
        impactType: 'cost_avoidance',
        amount: 25000,
        probability: 99.9
      },
      {
        id: 'impact-002',
        scenario: 'Optimización de deducciones fiscales',
        impactType: 'savings',
        amount: 18000,
        probability: 95
      }
    ];
    setFinancialImpacts(impacts);

    const taxOptimizations: TaxOptimization[] = [
      {
        id: 'opt-001',
        optimization: 'Aplicar crédito fiscal por inversión en tecnología',
        status: 'applied',
        impact: 12000,
        complexity: 'medium'
      },
      {
        id: 'opt-002',
        optimization: 'Reestructuración de depreciación de activos',
        status: 'pending',
        impact: 8000,
        complexity: 'high'
      }
    ];
    setOptimizations(taxOptimizations);
  }, []);

  const totalFinancialImpact = financialImpacts.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Análisis Ejecutivo</h2>
          <p className="text-gray-600 dark:text-gray-300">Inteligencia de negocio para la toma de decisiones</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico */}
        <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Evolución Riesgo vs Optimización</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
              <XAxis dataKey="name" fontSize={12} stroke="#6b7280" />
              <YAxis fontSize={12} stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  border: '1px solid #e5e7eb',
                  backdropFilter: 'blur(5px)'
                }}
              />
              <Area type="monotone" dataKey="riesgo" stackId="1" stroke="#ef4444" fill="#fee2e2" />
              <Area type="monotone" dataKey="optimizacion" stackId="1" stroke="#10b981" fill="#d1fae5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Impacto Financiero */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Impacto Financiero Proyectado</h3>
          <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg border border-blue-200 dark:border-blue-800 text-center mb-4">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(totalFinancialImpact)}
            </div>
            <div className="text-sm text-blue-800 dark:text-blue-300">Impacto Total Anual</div>
          </div>
          <div className="space-y-3">
            {financialImpacts.map(impact => (
              <div key={impact.id} className="text-sm">
                <div className="flex justify-between">
                  <span>{impact.scenario}</span>
                  <span className="font-medium">{formatCurrency(impact.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
