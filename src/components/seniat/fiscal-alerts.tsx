
'use client';

import { useState, useEffect } from 'react';

interface FiscalAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  status: 'active' | 'resolved';
  actionTaken?: string;
}

export const FiscalAlerts = () => {
  const [alerts, setAlerts] = useState<FiscalAlert[]>([]);

  useEffect(() => {
    const initialAlerts: FiscalAlert[] = [
      {
        id: 'alert-001',
        type: 'critical',
        message: 'Posible cambio en la ley de IVA detectado. Sistema adaptándose.',
        timestamp: new Date(),
        status: 'active',
        actionTaken: 'Monitoreo de Gaceta Oficial intensificado.'
      },
      {
        id: 'alert-002',
        type: 'warning',
        message: 'Intento de acceso no autorizado bloqueado desde IP 123.45.67.89.',
        timestamp: new Date(Date.now() - 3600000),
        status: 'resolved',
        actionTaken: 'IP añadida a la lista negra global.'
      },
      {
        id: 'alert-003',
        type: 'info',
        message: 'Actualización de seguridad programada para esta noche.',
        timestamp: new Date(),
        status: 'active'
      },
    ];
    setAlerts(initialAlerts);
  }, []);

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-900/50 border-red-500 text-red-200';
      case 'warning': return 'bg-yellow-900/50 border-yellow-500 text-yellow-200';
      case 'info': return 'bg-blue-900/50 border-blue-500 text-blue-200';
      default: return 'bg-gray-700';
    }
  };
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'critical': return '🔥';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '➡️';
    }
  }

  return (
    <div className="space-y-3">
      {alerts.filter(alert => alert.status === 'active').map(alert => (
        <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.type)}`}>
          <div className="flex items-start">
            <span className="text-xl mr-3">{getIcon(alert.type)}</span>
            <div>
              <p className="font-semibold">{alert.message}</p>
              <p className="text-xs opacity-75">
                {alert.timestamp.toLocaleTimeString()}
                {alert.actionTaken && ` | Acción: ${alert.actionTaken}`}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
