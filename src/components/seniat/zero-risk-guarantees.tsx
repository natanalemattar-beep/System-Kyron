
'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';

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
    <div className="bg-card/50 backdrop-blur-sm rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Garantías y Seguros de Cero Riesgo</h2>
          <p className="text-muted-foreground">Protección financiera absoluta</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-400">{formatCurrency(totalCoverage)}</div>
          <div className="text-sm text-muted-foreground">Cobertura Total</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-4">Garantías Financieras</h3>
          <div className="space-y-4">
            {guarantees.map((guarantee) => (
              <div key={guarantee.id} className="border border-border rounded-lg p-4">
                <h4 className="font-medium">{guarantee.provider}</h4>
                <p className="text-sm text-muted-foreground mt-1">{guarantee.coverage}</p>
                <div className="flex justify-between items-center text-xs mt-2">
                  <span className="font-semibold text-blue-400">{formatCurrency(guarantee.amount)}</span>
                  <span className="bg-green-900/50 text-green-300 px-2 py-1 rounded-full">{guarantee.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Garantías de Cero Riesgo</h3>
          <div className="space-y-4">
            {warranties.map((warranty) => (
              <div key={warranty.id} className="border border-green-800 bg-green-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-200">{warranty.warranty}</h4>
                <p className="text-sm text-green-300 mt-1">{warranty.coverage}</p>
                 <div className="text-xs text-green-400 mt-2">
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
