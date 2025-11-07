
'use client';

import { useState, useEffect } from 'react';

interface ZeroRiskControl {
  id: string;
  name: string;
  category: 'preventivo' | 'detectivo' | 'correctivo' | 'predictivo';
  effectiveness: number;
  automation: number;
  coverage: number;
  status: 'active' | 'optimizing' | 'pending';
  lastVerified: Date;
  failureProbability: number;
}

interface RiskElimination {
  riskId: string;
  riskName: string;
  eliminationDate: Date;
  method: string;
}

export const ZeroRiskProtection = () => {
  const [controls, setControls] = useState<ZeroRiskControl[]>([]);
  const [eliminatedRisks, setEliminatedRisks] = useState<RiskElimination[]>([]);

  useEffect(() => {
    loadZeroRiskControls();
    loadEliminatedRisks();
  }, []);

  const loadZeroRiskControls = () => {
    const zeroRiskControls: ZeroRiskControl[] = [
      {
        id: 'control-001',
        name: 'Validación Triple de Declaraciones',
        category: 'preventivo',
        effectiveness: 100,
        automation: 100,
        coverage: 100,
        status: 'active',
        lastVerified: new Date(),
        failureProbability: 0.001
      },
      {
        id: 'control-002',
        name: 'Monitoreo en Tiempo Real',
        category: 'detectivo',
        effectiveness: 99.99,
        automation: 100,
        coverage: 100,
        status: 'active',
        lastVerified: new Date(),
        failureProbability: 0.0001
      },
      {
        id: 'control-003',
        name: 'IA Predictiva de Cambios Normativos',
        category: 'predictivo',
        effectiveness: 98,
        automation: 90,
        coverage: 95,
        status: 'optimizing',
        lastVerified: new Date(),
        failureProbability: 0.01
      },
       {
        id: 'control-004',
        name: 'Blockchain de Evidencias',
        category: 'preventivo',
        effectiveness: 100,
        automation: 100,
        coverage: 100,
        status: 'active',
        lastVerified: new Date(),
        failureProbability: 0
      },
    ];
    setControls(zeroRiskControls);
  };
  
  const loadEliminatedRisks = () => {
      const eliminated: RiskElimination[] = [
      {
        riskId: 'risk-001',
        riskName: 'Error en Cálculo de Impuestos',
        eliminationDate: new Date('2024-01-15'),
        method: 'Algoritmo de verificación triple con IA',
      },
      {
        riskId: 'risk-002',
        riskName: 'Omisión de Declaraciones',
        eliminationDate: new Date('2024-02-01'),
        method: 'Sistema de recordatorios automáticos con 5 capas',
      },
    ];
     setEliminatedRisks(eliminated);
  };

  const systemRisk = (1 - controls.reduce((acc, control) => acc * (1 - control.failureProbability / 100), 1)) * 100;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
       <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-4">
          <span className="text-3xl font-bold text-white">0%</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sistema de Cero Riesgo Fiscal</h2>
        <p className="text-gray-600 text-lg">
          Protección absoluta mediante controles redundantes
        </p>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">Controles de Protección Activos</h3>
          <div className="space-y-4">
            {controls.map((control) => (
              <div key={control.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{control.name}</h4>
                    <p className="text-sm text-gray-600 mt-1 capitalize">{control.category}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    control.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {control.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                        <span className="text-gray-500">Efectividad:</span>
                        <div className="font-medium">{control.effectiveness}%</div>
                    </div>
                     <div>
                        <span className="text-gray-500">Automat.:</span>
                        <div className="font-medium">{control.automation}%</div>
                    </div>
                     <div>
                        <span className="text-gray-500">Cobertura:</span>
                        <div className="font-medium">{control.coverage}%</div>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>

         <div>
          <h3 className="text-xl font-bold text-gray-900 mb-6">Riesgos Completamente Eliminados</h3>
          <div className="space-y-4">
            {eliminatedRisks.map((risk) => (
              <div key={risk.riskId} className="border border-green-200 bg-green-50 rounded-lg p-4">
                 <h4 className="font-semibold text-green-900">{risk.riskName}</h4>
                <p className="text-sm text-green-700 mt-1">{risk.method}</p>
                 <div className="text-xs text-green-600 mt-2">
                  Eliminado: {risk.eliminationDate.toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
