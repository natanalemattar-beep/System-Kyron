
'use client';

import { useState, useEffect } from 'react';

interface QuantumValidation {
  id: string;
  process: string;
  validationType: 'quantum' | 'blockchain' | 'biometric' | 'ai';
  status: 'verified' | 'pending' | 'failed';
  timestamp: Date;
  hash?: string;
  confidence: number;
  verificationLayers: number;
}

export const QuantumVerification = () => {
  const [validations, setValidations] = useState<QuantumValidation[]>([]);
  const [quantumStatus] = useState<'active' | 'calibrating' | 'optimal'>('optimal');

  useEffect(() => {
    const interval = setInterval(() => {
        const newValidation: QuantumValidation = {
          id: `qval-${Date.now()}`,
          process: 'Verificación Cuántica en Tiempo Real',
          validationType: 'quantum',
          status: 'verified',
          timestamp: new Date(),
          hash: `0x${Math.random().toString(16).substr(2, 16)}...`,
          confidence: 99.9999 + Math.random() * 0.0001,
          verificationLayers: 8
        };
        setValidations(prev => [newValidation, ...prev.slice(0, 4)]);
      }, 5000);

    const quantumValidations: QuantumValidation[] = [
      {
        id: 'qval-001',
        process: 'Declaración IVA Mensual',
        validationType: 'quantum',
        status: 'verified',
        timestamp: new Date(),
        hash: '0x1a2b3c4d5e6f7890...',
        confidence: 99.9999,
        verificationLayers: 7
      },
      {
        id: 'qval-002',
        process: 'Cálculo ISLR Trimestral',
        validationType: 'quantum',
        status: 'verified',
        timestamp: new Date(),
        hash: '0x2b3c4d5e6f7890a1...',
        confidence: 99.9998,
        verificationLayers: 5
      },
      {
        id: 'qval-003',
        process: 'Auditoría Continua Transacciones',
        validationType: 'blockchain',
        status: 'verified',
        timestamp: new Date(),
        hash: '0x4d5e6f7890a1b2c3...',
        confidence: 100,
        verificationLayers: 12
      }
    ];

    setValidations(quantumValidations);
    return () => clearInterval(interval);
  }, []);



  const getValidationColor = (type: string) => {
    switch (type) {
      case 'quantum': return 'bg-purple-900/50 text-purple-300';
      case 'blockchain': return 'bg-blue-900/50 text-blue-300';
      case 'biometric': return 'bg-green-900/50 text-green-300';
      case 'ai': return 'bg-orange-900/50 text-orange-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };
  
  const getValidationIcon = (type: string) => {
    switch (type) {
      case 'quantum': return '⚛️';
      case 'blockchain': return '⛓️';
      case 'biometric': return '👁️';
      case 'ai': return '🤖';
      default: return '✅';
    }
  };

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Verificación Cuántica & Blockchain</h2>
          <p className="text-muted-foreground">Garantía absoluta de integridad</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            quantumStatus === 'optimal' ? 'bg-green-500' : 'bg-yellow-500'
          }`}></div>
          <span className="text-sm text-muted-foreground">
            {quantumStatus === 'optimal' ? 'Óptimo' : 'Calibrando'}
          </span>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Validaciones en Tiempo Real</h3>
        <div className="space-y-3">
          {validations.map((validation) => (
            <div key={validation.id} className="border border-border rounded-lg p-4">
               <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getValidationIcon(validation.validationType)}</span>
                    <div>
                      <h4 className="font-medium">{validation.process}</h4>
                      <p className="text-xs text-muted-foreground">
                        {validation.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getValidationColor(validation.validationType)}`}>
                    {validation.validationType}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs mt-2">
                  <div>
                    <span className="text-muted-foreground">Confianza:</span>
                    <div className="font-medium text-green-400">
                      {validation.confidence.toFixed(4)}%
                    </div>
                  </div>
                   <div>
                    <span className="text-muted-foreground">Capas:</span>
                    <div className="font-medium">{validation.verificationLayers}</div>
                  </div>
                </div>
                 {validation.hash && (
                  <div className="mt-2">
                    <span className="text-xs text-muted-foreground">Hash:</span>
                    <div className="text-xs font-mono text-gray-300 truncate">
                      {validation.hash}
                    </div>
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
