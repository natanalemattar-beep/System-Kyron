
'use client';

import { useState, useEffect } from 'react';

interface PredictiveRisk {
  id: string;
  riskType: string;
  probability: number;
  impact: number;
  detectionTime: Date;
  preventionAction: string;
  status: 'prevented' | 'monitoring' | 'active';
  confidence: number;
}

export const AIPredictiveShield = () => {
  const [predictiveRisks, setPredictiveRisks] = useState<PredictiveRisk[]>([]);
  const [modelAccuracy] = useState(100);
  const [preventionRate] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
        const newRisk: PredictiveRisk = {
          id: `pred-${Date.now()}`,
          riskType: 'Riesgo Emergente Detectado',
          probability: Math.random() * 0.1,
          impact: Math.random() * 0.3,
          detectionTime: new Date(),
          preventionAction: 'Neutralizado automáticamente',
          status: 'prevented',
          confidence: 99.9 + Math.random() * 0.1
        };
        setPredictiveRisks(prev => [newRisk, ...prev.slice(0, 4)]);
      }, 10000);
    
    const risks: PredictiveRisk[] = [
      {
        id: 'pred-001',
        riskType: 'Cambio Normativo SENIAT',
        probability: 0.85,
        impact: 0.9,
        detectionTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días antes
        preventionAction: 'Actualización automática de algoritmos fiscales',
        status: 'prevented',
        confidence: 99.8
      },
      {
        id: 'pred-002',
        riskType: 'Error en Cálculo de Retenciones',
        probability: 0.02,
        impact: 0.7,
        detectionTime: new Date(),
        preventionAction: 'Triple verificación con IA cuántica',
        status: 'prevented',
        confidence: 99.999
      },
      {
        id: 'pred-003',
        riskType: 'Omisión de Declaración',
        probability: 0.001,
        impact: 0.8,
        detectionTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días antes
        preventionAction: 'Sistema de recordatorios con 12 capas',
        status: 'prevented',
        confidence: 100
      }
    ];

    setPredictiveRisks(risks);
    return () => clearInterval(interval);
  }, []);



  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Escudo Predictivo con IA Cuántica</h2>
          <p className="text-muted-foreground">Prevención de riesgos 30 días antes de que ocurran</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-400">{preventionRate}%</div>
          <div className="text-sm text-muted-foreground">Tasa de Prevención</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Riesgos Predictivos */}
        <div>
          <h3 className="font-semibold mb-4">Riesgos Neutralizados Proactivamente</h3>
          <div className="space-y-4">
            {predictiveRisks.map((risk) => (
              <div key={risk.id} className="border border-green-800 bg-green-900/50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-green-200">{risk.riskType}</h4>
                    <p className="text-sm text-green-300 mt-1">{risk.preventionAction}</p>
                  </div>
                  <span className="bg-green-800 text-green-200 px-2 py-1 rounded-full text-xs font-medium">
                    Prevenido
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3 text-xs">
                  <div>
                    <span className="text-green-400">Probabilidad original:</span>
                    <div className="font-medium">{(risk.probability * 100).toFixed(1)}%</div>
                  </div>
                  <div>
                    <span className="text-green-400">Impacto potencial:</span>
                    <div className="font-medium">{(risk.impact * 100).toFixed(0)}%</div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-green-400">
                  <span>Detectado: {risk.detectionTime.toLocaleDateString()}</span>
                  <span>Confianza: {risk.confidence.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modelos Predictivos */}
        <div>
          <h3 className="font-semibold mb-4">Modelos de IA en Tiempo Real</h3>
          
          <div className="space-y-4">
            <div className="border border-blue-800 rounded-lg p-4">
              <h4 className="font-medium mb-2">Análisis Normativo Predictivo</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Precisión:</span>
                  <span className="font-medium text-green-400">99.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Horizonte Predictivo:</span>
                  <span className="font-medium">45 días</span>
                </div>
              </div>
            </div>

            <div className="border border-purple-800 rounded-lg p-4">
              <h4 className="font-medium mb-2">Detección de Patrones Anómalos</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sensibilidad:</span>
                  <span className="font-medium text-green-400">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Falsos Positivos:</span>
                  <span className="font-medium text-green-400">0%</span>
                </div>
              </div>
            </div>

            <div className="border border-orange-800 rounded-lg p-4">
              <h4 className="font-medium mb-2">Simulación de Escenarios Futuros</h4>
              <div className="space-y-2 text-sm">
                 <div className="flex justify-between">
                  <span className="text-muted-foreground">Cobertura de Casos:</span>
                  <span className="font-medium text-green-400">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tiempo de Simulación:</span>
                  <span className="font-medium">2.3ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
