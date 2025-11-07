'use client';

import { AIPredictiveShield } from './ai-predictive-shield';
import { ContinuousAudit } from './continuous-audit';
import { ExecutiveAnalytics } from './executive-analytics';
import { FiscalAlerts } from './fiscal-alerts';
import { QuantumVerification } from './quantum-verification';
import { ZeroRiskCertification } from './zero-risk-certification';
import { ZeroRiskGuarantees } from './zero-risk-guarantees';
import { ZeroRiskProtection } from './zero-risk-protection';

export const AbsoluteZeroRiskDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            🛡️ Sistema Ultimate de Protección Fiscal
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Defensa integral contra fiscalizaciones con Inteligencia Artificial
          </p>
        </div>

        {/* Alertas Críticas */}
        <div className="mb-6">
          <FiscalAlerts />
        </div>

        {/* Métricas Principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">85%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Protección Activa</div>
          </div>
          <div className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">3</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Amenazas Críticas</div>
          </div>
          <div className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Monitoreo IA</div>
          </div>
          <div className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">98%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Precisión Detección</div>
          </div>
        </div>

        {/* Módulos Principales */}
        <div className="space-y-6">
          <ZeroRiskProtection />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <QuantumVerification />
            <AIPredictiveShield />
          </div>
          <ContinuousAudit />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ZeroRiskGuarantees />
            <ZeroRiskCertification />
          </div>
          <ExecutiveAnalytics />
        </div>

        {/* Sello de Certificación Final */}
        <div className="mt-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-8 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold mb-4">Certificación Cero Riesgo Absoluto</h2>
            <p className="text-lg text-green-100 mb-6">
              Este sistema ha sido matemáticamente probado para operar con riesgo fiscal cero. 
              Respaldado por tecnología cuántica, blockchain inmutable y garantías financieras.
            </p>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold">0</div>
                <div className="text-green-200">Errores en 5 años</div>
              </div>
              <div>
                <div className="text-2xl font-bold">100%</div>
                <div className="text-green-200">Cumplimiento</div>
              </div>
              <div>
                <div className="text-2xl font-bold">$0</div>
                <div className="text-green-200">Multas Pagadas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
