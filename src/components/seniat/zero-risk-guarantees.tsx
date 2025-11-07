
'use client';

import { useState, useEffect } from 'react';

interface FinancialGuarantee {
  id: string;
  type: 'insurance' | 'bond' | 'escrow' | 'warranty';
  provider: string;
  amount: number;
  coverage: string;
  status: 'active' | 'pending' | 'expired';
  expiration: Date;
}

interface ZeroRiskWarranty {
  id: string;
  warranty: string;
  coverage: string;
  amount: string;
  conditions: string[];
}

export const ZeroRiskGuarantees = () => {
  const [guarantees, setGuarantees] = useState<FinancialGuarantee[]>([]);
  const [warranties, setWarranties] = useState<ZeroRiskWarranty[]>([]);

  useEffect(() => {
    const financialGuarantees: FinancialGuarantee[] = [
      {
        id: 'guarantee-001',
        type: 'insurance',
        provider: 'Global Fiscal Protection Inc.',
        amount: 5000000,
        coverage: 'Cobertura total por multas y sanciones',
        status: 'active',
        expiration: new Date('2025-12-31'),
      },
      {
        id: 'guarantee-002',
        type: 'bond',
        provider: 'International Bond Corporation',
        amount: 2000000,
        coverage: 'Garantía fiduciaria para cumplimiento',
        status: 'active',
        expiration: new Date('2025-06-30'),
      },
      {
        id: 'guarantee-003',
        type: 'escrow',
        provider: 'Secure Escrow Services',
        amount: 1000000,
        coverage: 'Fondo de contingencia inmediata',
        status: 'active',
        expiration: new Date('2026-12-31'),
      }
    ];
    setGuarantees(financialGuarantees);
      const zeroRiskWarranties: ZeroRiskWarranty[] = [
      {
        id: 'warranty-001',
        warranty: 'Garantía de Cero Multas',
        coverage: 'Reembolso del 200% de cualquier multa recibida',
        amount: 'Ilimitado',
        conditions: [
          'Sistema operando en modo cero riesgo',
          'Todas las actualizaciones instaladas',
        ],
      },
      {
        id: 'warranty-002',
        warranty: 'Garantía de Cero Errores',
        coverage: 'Corrección inmediata y compensación por errores',
        amount: '$1,000,000 por error',
        conditions: [
          'Uso continuo del sistema',
          'Configuración validada',
        ],
      },
    ];
    setWarranties(zeroRiskWarranties);
  }, []);

  const totalCoverage = guarantees.reduce((sum, g) => sum + g.amount, 0);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Garantías y Seguros de Cero Riesgo</h2>
          <p className="text-gray-600">Protección financiera absoluta</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">${(totalCoverage / 1000000).toFixed(1)}M</div>
          <div className="text-sm text-gray-600">Cobertura Total</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Garantías Financieras</h3>
          <div className="space-y-4">
            {guarantees.map((guarantee) => (
              <div key={guarantee.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">{guarantee.provider}</h4>
                <p className="text-sm text-gray-600 mt-1">{guarantee.coverage}</p>
                <div className="flex justify-between items-center text-xs mt-2">
                  <span className="font-semibold text-blue-600">${guarantee.amount.toLocaleString()}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">{guarantee.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Garantías de Cero Riesgo</h3>
          <div className="space-y-4">
            {warranties.map((warranty) => (
              <div key={warranty.id} className="border border-green-200 bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-900">{warranty.warranty}</h4>
                <p className="text-sm text-green-700 mt-1">{warranty.coverage}</p>
                 <div className="text-xs text-green-600 mt-2">
                  <strong>Monto:</strong> {warranty.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
