
"use client";

import { ProfitabilityAnalyzer } from '@/components/rentabilidad/profitability-analyzer';
import { CostOptimization } from '@/components/rentabilidad/cost-optimization';
import { GrowthStrategies } from '@/components/rentabilidad/growth-strategies';

export default function SustainableProfitabilityDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            💰 Sistema de Sostenibilidad Rentable
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Estrategias integradas para crecimiento sostenible y rentabilidad a largo plazo
          </p>
        </div>

        {/* KPIs Principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">24.8%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Margen Neto</div>
          </div>
          <div className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">18.5%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Crecimiento Anual</div>
          </div>
          <div className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">42%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">ROI</div>
          </div>
          <div className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">85%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Eficiencia Operativa</div>
          </div>
        </div>

        {/* Módulos Principales */}
        <div className="space-y-6">
          <ProfitabilityAnalyzer />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CostOptimization />
            <GrowthStrategies />
          </div>
        </div>

        {/* Resumen Ejecutivo */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Estado de Sostenibilidad Rentable</h3>
              <p className="text-blue-100 text-lg">
                Sistema operando con optimización máxima. Todas las métricas indican crecimiento sostenible.
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">📈</div>
              <div className="text-sm text-blue-200">Crecimiento Sostenible</div>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-xl font-bold">$285K</div>
              <div className="text-xs text-blue-200">Optimización Costos</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">$150K</div>
              <div className="text-xs text-blue-200">Ingresos Incrementales</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">18%</div>
              <div className="text-xs text-blue-200">Mejora Productividad</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">95%</div>
              <div className="text-xs text-blue-200">Satisfacción Clientes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
