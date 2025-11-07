
"use client";

import { AbsoluteZeroRiskDashboard } from '@/components/seniat/absolute-zero-risk-dashboard';
import { ZeroRiskProtection } from '@/components/seniat/zero-risk-protection';
import { QuantumVerification } from '@/components/seniat/quantum-verification';
import { ZeroRiskGuarantees } from '@/components/seniat/zero-risk-guarantees';
import { AIPredictiveShield } from '@/components/seniat/ai-predictive-shield';
import { ZeroRiskCertification } from '@/components/seniat/zero-risk-certification';

export default function ZeroRiskPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Épico */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-6 shadow-2xl">
            <span className="text-3xl font-bold text-white">0%</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🛡️ Cero Riesgo Fiscal Absoluto
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sistema certificado con garantía matemática de cero riesgo. 
            Protección cuántica, blockchain y seguros multimillonarios.
          </p>
        </div>

        {/* Módulos Principales */}
        <div className="space-y-8">
          <ZeroRiskProtection />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <QuantumVerification />
            <ZeroRiskGuarantees />
          </div>
          <AIPredictiveShield />
          <ZeroRiskCertification />
        </div>
      </div>
    </div>
  );
}
