'use client';

import { useState, useEffect } from 'react';

interface AuditLog {
  id: string;
  timestamp: Date;
  transaction: string;
  type: 'IVA' | 'ISLR' | 'Nómina' | 'Retenciones';
  status: 'verified' | 'warning' | 'error';
  details: string;
  correctionAction?: string;
}

export const ContinuousAudit = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [totalTransactions, setTotalTransactions] = useState(12456);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalTransactions(prev => prev + Math.floor(Math.random() * 5));
      const newLog: AuditLog = {
        id: `audit-${Date.now()}`,
        timestamp: new Date(),
        transaction: `TRN-${Math.floor(Math.random() * 100000)}`,
        type: ['IVA', 'ISLR', 'Nómina', 'Retenciones'][Math.floor(Math.random() * 4)] as any,
        status: 'verified',
        details: 'Verificación automática exitosa'
      };
      setAuditLogs(prev => [newLog, ...prev.slice(0, 4)]);
    }, 3000);

    const initialLogs: AuditLog[] = [
      {
        id: 'audit-001',
        timestamp: new Date(),
        transaction: 'TRN-12345',
        type: 'IVA',
        status: 'verified',
        details: 'Débito Fiscal y Crédito Fiscal coinciden'
      },
      {
        id: 'audit-002',
        timestamp: new Date(Date.now() - 60000),
        transaction: 'TRN-12346',
        type: 'Nómina',
        status: 'warning',
        details: 'Cálculo de bono vacacional inconsistente',
        correctionAction: 'Ajuste automático aplicado'
      },
      {
        id: 'audit-003',
        timestamp: new Date(Date.now() - 120000),
        transaction: 'TRN-12347',
        type: 'ISLR',
        status: 'verified',
        details: 'Retención de ISLR correcta'
      }
    ];
    setAuditLogs(initialLogs);

    return () => clearInterval(interval);
  }, []);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Auditoría Continua 24/7</h2>
          <p className="text-gray-600 dark:text-gray-300">Monitoreo y corrección automática de transacciones</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalTransactions.toLocaleString()}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Transacciones Verificadas</div>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Registro de Auditoría en Vivo</h3>
        <div className="space-y-3">
          {auditLogs.map((log) => (
            <div key={log.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{log.timestamp.toLocaleTimeString()}</span>
                  <span className="font-mono text-xs text-gray-700 dark:text-gray-300">{log.transaction}</span>
                  <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full text-xs">
                    {log.type}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                  {log.status === 'verified' ? 'Verificado' : log.status === 'warning' ? 'Advertencia' : 'Error'}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{log.details}</p>
              {log.correctionAction && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  <strong>Acción:</strong> {log.correctionAction}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
