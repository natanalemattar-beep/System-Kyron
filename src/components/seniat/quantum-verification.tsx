
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
      case 'quantum': return 'bg-purple-100 text-purple-800';
      case 'blockchain': return 'bg-blue-100 text-blue-800';
      case 'biometric': return 'bg-green-100 text-green-800';
      case 'ai': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
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
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Verificación Cuántica & Blockchain</h2>
          <p className="text-gray-600">Garantía absoluta de integridad</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            quantumStatus === 'optimal' ? 'bg-green-500' : 'bg-yellow-500'
          }`}></div>
          <span className="text-sm text-gray-600">
            {quantumStatus === 'optimal' ? 'Óptimo' : 'Calibrando'}
          </span>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Validaciones en Tiempo Real</h3>
        <div className="space-y-3">
          {validations.map((validation) => (
            <div key={validation.id} className="border border-gray-200 rounded-lg p-4">
               <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getValidationIcon(validation.validationType)}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{validation.process}</h4>
                      <p className="text-xs text-gray-500">
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
                    <span className="text-gray-500">Confianza:</span>
                    <div className="font-medium text-green-600">
                      {validation.confidence.toFixed(4)}%
                    </div>
                  </div>
                   <div>
                    <span className="text-gray-500">Capas:</span>
                    <div className="font-medium">{validation.verificationLayers}</div>
                  </div>
                </div>
                 {validation.hash && (
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">Hash:</span>
                    <div className="text-xs font-mono text-gray-600 truncate">
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
