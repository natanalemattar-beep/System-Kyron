
"use client";

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';

interface CostCategory {
  id: string;
  name: string;
  type: 'fijo' | 'variable' | 'semivariable';
  budget: number;
  actual: number;
  variance: number;
  trend: 'up' | 'down' | 'stable';
  optimizationPotential: number;
  recommendations: string[];
}

interface CostAnalysis {
  totalBudget: number;
  totalActual: number;
  totalVariance: number;
  fixedCosts: number;
  variableCosts: number;
  costStructure: {
    personnel: number;
    technology: number;
    marketing: number;
    operations: number;
    administrative: number;
  };
}

export const CostOptimization = () => {
  const [costCategories, setCostCategories] = useState<CostCategory[]>([]);
  const [analysis, setAnalysis] = useState<CostAnalysis | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    const costData: CostCategory[] = [
      {
        id: 'cost-001',
        name: 'Personal y Nómina',
        type: 'fijo',
        budget: 120000,
        actual: 125000,
        variance: -5000,
        trend: 'up',
        optimizationPotential: 15,
        recommendations: [
          'Automatizar procesos repetitivos',
          'Revisar estructura organizacional',
          'Implementar home office estratégico'
        ]
      },
      {
        id: 'cost-002',
        name: 'Infraestructura Tecnológica',
        type: 'fijo',
        budget: 45000,
        actual: 42000,
        variance: 3000,
        trend: 'down',
        optimizationPotential: 8,
        recommendations: [
          'Migrar a cloud computing',
          'Consolidar licencias de software',
          'Optimizar recursos de hosting'
        ]
      },
      {
        id: 'cost-003',
        name: 'Marketing y Publicidad',
        type: 'variable',
        budget: 35000,
        actual: 38000,
        variance: -3000,
        trend: 'up',
        optimizationPotential: 25,
        recommendations: [
          'Enfocar en canales de mayor ROI',
          'Implementar marketing automation',
          'Optimizar campañas digitales'
        ]
      },
      {
        id: 'cost-004',
        name: 'Servicios Profesionales',
        type: 'semivariable',
        budget: 28000,
        actual: 22000,
        variance: 6000,
        trend: 'down',
        optimizationPotential: 5,
        recommendations: [
          'Internalizar servicios recurrentes',
          'Negociar tarifas por volumen',
          'Establecer contratos a largo plazo'
        ]
      },
      {
        id: 'cost-005',
        name: 'Gastos Operativos',
        type: 'variable',
        budget: 15000,
        actual: 18000,
        variance: -3000,
        trend: 'up',
        optimizationPotential: 20,
        recommendations: [
          'Implementar controles de gastos',
          'Digitalizar procesos operativos',
          'Optimizar logística y distribución'
        ]
      }
    ];

    setCostCategories(costData);

    const totalBudget = costData.reduce((sum, cat) => sum + cat.budget, 0);
    const totalActual = costData.reduce((sum, cat) => sum + cat.actual, 0);
    const totalVariance = totalBudget - totalActual;

    const analysisData: CostAnalysis = {
      totalBudget,
      totalActual,
      totalVariance,
      fixedCosts: costData
        .filter(cat => cat.type === 'fijo')
        .reduce((sum, cat) => sum + cat.actual, 0),
      variableCosts: costData
        .filter(cat => cat.type === 'variable' || cat.type === 'semivariable')
        .reduce((sum, cat) => sum + cat.actual, 0),
      costStructure: {
        personnel: costData.find(cat => cat.name === 'Personal y Nómina')?.actual || 0,
        technology: costData.find(cat => cat.name === 'Infraestructura Tecnológica')?.actual || 0,
        marketing: costData.find(cat => cat.name === 'Marketing y Publicidad')?.actual || 0,
        operations: costData.find(cat => cat.name === 'Gastos Operativos')?.actual || 0,
        administrative: costData.find(cat => cat.name === 'Servicios Profesionales')?.actual || 0
      }
    };
    
    setAnalysis(analysisData);
  }, []);

  const applyOptimization = (categoryId: string, savings: number) => {
    setCostCategories(categories => 
      categories.map(cat => 
        cat.id === categoryId 
          ? { 
              ...cat, 
              optimizationPotential: Math.max(0, cat.optimizationPotential - savings),
              recommendations: cat.recommendations.slice(1)
            }
          : cat
      )
    );
  };

  const getVarianceColor = (variance: number) => {
    return variance >= 0 ? 'text-green-400' : 'text-red-400';
  };

  const getOptimizationColor = (potential: number) => {
    if (potential >= 20) return 'text-red-400';
    if (potential >= 10) return 'text-yellow-400';
    return 'text-green-400';
  };

  const filteredCategories = selectedType === 'all' 
    ? costCategories 
    : costCategories.filter(cat => cat.type === selectedType);

  const totalOptimizationPotential = costCategories.reduce(
    (sum, cat) => sum + (cat.actual * cat.optimizationPotential / 100), 0
  );

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Optimizador de Costos</h2>
          <p className="text-muted-foreground">Análisis y recomendaciones para mejorar eficiencia</p>
        </div>
        <select 
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border-input bg-background rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">Todos</option>
          <option value="fijo">Fijos</option>
          <option value="variable">Variables</option>
          <option value="semivariable">Semivariables</option>
        </select>
      </div>

      {analysis && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-900/50 p-4 rounded-lg border border-blue-800">
            <div className="text-2xl font-bold text-blue-400">
              {formatCurrency(totalOptimizationPotential)}
            </div>
            <div className="text-sm text-blue-300">Potencial Ahorro</div>
          </div>
          <div className="bg-green-900/50 p-4 rounded-lg border border-green-800">
            <div className="text-2xl font-bold text-green-400">
              {analysis ? ((analysis.totalVariance / analysis.totalBudget) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-green-600">Varianza Total</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="text-2xl font-bold text-purple-600">
              {analysis ? ((analysis.fixedCosts / analysis.totalActual) * 100).toFixed(0) : 0}%
            </div>
            <div className="text-sm text-purple-300">Estructura Fija</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-4">Análisis por Categoría</h3>
          <div className="space-y-4">
            {filteredCategories.map((category) => (
              <div key={category.id} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{category.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-blue-900/50 text-blue-300 px-2 py-1 rounded-full text-xs capitalize">
                        {category.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        category.trend === 'up' ? 'bg-red-50 text-red-600' :
                        category.trend === 'down' ? 'bg-green-50 text-green-600' :
                        'bg-slate-200 text-slate-600'
                      }`}>
                        {category.trend === 'up' ? '↗' : category.trend === 'down' ? '↘' : '→'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">
                      {formatCurrency(category.actual)}
                    </div>
                    <div className={`text-sm ${getVarianceColor(category.variance)}`}>
                      {category.variance >= 0 ? '+' : ''}{formatCurrency(category.variance)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Presupuesto:</span>
                    <div className="font-medium">{formatCurrency(category.budget)}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Pot. Optimización:</span>
                    <div className={`font-medium ${getOptimizationColor(category.optimizationPotential)}`}>
                      {category.optimizationPotential}%
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <h5 className="text-xs font-medium text-muted-foreground mb-2">Recomendaciones:</h5>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {category.recommendations.slice(0, 2).map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-1">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => applyOptimization(category.id, 5)}
                  className="w-full bg-green-600 text-white py-2 rounded text-sm font-medium hover:bg-green-700"
                >
                  Aplicar Optimización (5%)
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {analysis && (
            <div className="bg-slate-100 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Estructura de Costos</h3>
              <div className="space-y-3">
                {Object.entries(analysis.costStructure).map(([category, amount]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 capitalize">{category}:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-blue-500"
                          style={{ 
                            width: `${(amount / analysis.totalActual) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {((amount / analysis.totalActual) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-yellow-900/50 border border-yellow-800 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-200 mb-3">🔄 Estrategias de Optimización</h3>
            <div className="space-y-3 text-sm text-yellow-300">
              <div className="flex justify-between">
                <span>Automatización de Procesos:</span>
                <span className="font-medium">Ahorro potencial: 15-25%</span>
              </div>
              <div className="flex justify-between">
                <span>Negociación con Proveedores:</span>
                <span className="font-medium">Ahorro potencial: 10-20%</span>
              </div>
              <div className="flex justify-between">
                <span>Digitalización Documental:</span>
                <span className="font-medium">Ahorro potencial: 8-15%</span>
              </div>
              <div className="flex justify-between">
                <span>Optimización Energética:</span>
                <span className="font-medium">Ahorro potencial: 5-12%</span>
              </div>
            </div>
          </div>

          <div className="bg-green-900/50 border border-green-800 rounded-lg p-4">
            <h3 className="font-semibold text-green-200 mb-3">📈 Proyección de Impacto</h3>
            <div className="space-y-2 text-sm text-green-600">
              <div className="flex justify-between">
                <span>Mejora margen neto:</span>
                <span className="font-medium">+{analysis ? ((totalOptimizationPotential / analysis.totalActual) * 100).toFixed(1) : 0}%</span>
              </div>
              <div className="flex justify-between">
                <span>Incremento ROI:</span>
                <span className="font-medium">+{(analysis ? (totalOptimizationPotential / analysis.totalActual * 50) : 0).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Reducción punto equilibrio:</span>
                <span className="font-medium">-{analysis ? ((totalOptimizationPotential / analysis.totalActual) * 100).toFixed(1) : 0}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
