
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

interface PortfolioClient {
  id: string;
  name: string;
  segment: 'premium' | 'empresarial' | 'pyme' | 'individual';
  totalDebt: number;
  currentDebt: number;
  paymentHistory: number; // 0-100%
  riskLevel: 'bajo' | 'medio' | 'alto' | 'critico';
  lastPayment: Date;
  nextPayment: Date;
  contact: {
    email: string;
    phone: string;
    preferredChannel: 'email' | 'sms' | 'whatsapp' | 'llamada';
  };
  paymentBehavior: {
    averageDelay: number;
    paymentFrequency: string;
    preferredMethod: string;
  };
}

interface PortfolioMetrics {
  totalPortfolio: number;
  currentDebt: number;
  overdueDebt: number;
  collectionEfficiency: number;
  averageCollectionTime: number;
  riskDistribution: {
    bajo: number;
    medio: number;
    alto: number;
    critico: number;
  };
}

export const IntelligentPortfolioManager = () => {
  const [clients, setClients] = useState<PortfolioClient[]>([]);
  const [metrics, setMetrics] = useState<PortfolioMetrics | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'analytics'>('grid');

  useEffect(() => {
    const portfolioData: PortfolioClient[] = [
      {
        id: 'cl-001',
        name: 'TechSolutions Corp',
        segment: 'empresarial',
        totalDebt: 50000,
        currentDebt: 15000,
        paymentHistory: 95,
        riskLevel: 'bajo',
        lastPayment: new Date('2024-05-15'),
        nextPayment: new Date('2024-06-15'),
        contact: {
          email: 'finanzas@techsolutions.com',
          phone: '+58 412-555-0101',
          preferredChannel: 'email'
        },
        paymentBehavior: {
          averageDelay: 2,
          paymentFrequency: 'mensual',
          preferredMethod: 'transferencia'
        }
      },
      {
        id: 'cl-002',
        name: 'Distribuidora La Económica',
        segment: 'pyme',
        totalDebt: 25000,
        currentDebt: 12000,
        paymentHistory: 75,
        riskLevel: 'medio',
        lastPayment: new Date('2024-05-20'),
        nextPayment: new Date('2024-06-05'),
        contact: {
          email: 'cobranza@leconomica.com',
          phone: '+58 414-555-0202',
          preferredChannel: 'whatsapp'
        },
        paymentBehavior: {
          averageDelay: 7,
          paymentFrequency: 'quincenal',
          preferredMethod: 'punto_venta'
        }
      },
      {
        id: 'cl-003',
        name: 'Constructora Norte',
        segment: 'empresarial',
        totalDebt: 150000,
        currentDebt: 45000,
        paymentHistory: 60,
        riskLevel: 'alto',
        lastPayment: new Date('2024-04-30'),
        nextPayment: new Date('2024-05-30'),
        contact: {
          email: 'contabilidad@constructoranorte.com',
          phone: '+58 416-555-0303',
          preferredChannel: 'llamada'
        },
        paymentBehavior: {
          averageDelay: 15,
          paymentFrequency: 'mensual',
          preferredMethod: 'transferencia'
        }
      },
      {
        id: 'cl-004',
        name: 'Consultores Asociados',
        segment: 'premium',
        totalDebt: 75000,
        currentDebt: 20000,
        paymentHistory: 98,
        riskLevel: 'bajo',
        lastPayment: new Date('2024-05-28'),
        nextPayment: new Date('2024-06-28'),
        contact: {
          email: 'admin@consultoresasociados.com',
          phone: '+58 424-555-0404',
          preferredChannel: 'email'
        },
        paymentBehavior: {
          averageDelay: 0,
          paymentFrequency: 'mensual',
          preferredMethod: 'tarjeta_credito'
        }
      }
    ];

    setClients(portfolioData);

    const totalPortfolio = portfolioData.reduce((sum, client) => sum + client.totalDebt, 0);
    const currentDebt = portfolioData.reduce((sum, client) => sum + client.currentDebt, 0);
    const overdueDebt = portfolioData
      .filter(client => new Date(client.nextPayment) < new Date())
      .reduce((sum, client) => sum + client.currentDebt, 0);

    const metricsData: PortfolioMetrics = {
      totalPortfolio,
      currentDebt,
      overdueDebt,
      collectionEfficiency: ((currentDebt - overdueDebt) / currentDebt) * 100,
      averageCollectionTime: 15, // días
      riskDistribution: {
        bajo: portfolioData.filter(c => c.riskLevel === 'bajo').length,
        medio: portfolioData.filter(c => c.riskLevel === 'medio').length,
        alto: portfolioData.filter(c => c.riskLevel === 'alto').length,
        critico: portfolioData.filter(c => c.riskLevel === 'critico').length
      }
    };

    setMetrics(metricsData);
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'bajo': return 'bg-green-100 text-green-800';
      case 'medio': return 'bg-yellow-100 text-yellow-800';
      case 'alto': return 'bg-orange-100 text-orange-800';
      case 'critico': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'empresarial': return 'bg-blue-100 text-blue-800';
      case 'pyme': return 'bg-green-100 text-green-800';
      case 'individual': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredClients = selectedSegment === 'all' 
    ? clients 
    : clients.filter(client => client.segment === selectedSegment);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Gestor Inteligente de Cartera</h2>
          <p className="text-muted-foreground">Análisis predictivo y gestión proactiva de cobranza</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">Todos los segmentos</option>
            <option value="premium">Premium</option>
            <option value="empresarial">Empresarial</option>
            <option value="pyme">PYME</option>
            <option value="individual">Individual</option>
          </select>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded text-sm ${
                viewMode === 'grid' 
                  ? 'bg-white shadow-sm text-gray-900' 
                  : 'text-gray-600'
              }`}
            >
              Lista
            </button>
            <button
              onClick={() => setViewMode('analytics')}
              className={`px-3 py-1 rounded text-sm ${
                viewMode === 'analytics' 
                  ? 'bg-white shadow-sm text-gray-900' 
                  : 'text-gray-600'
              }`}
            >
              Analytics
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <>
          {metrics && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">
                  ${(metrics.totalPortfolio / 1000).toFixed(0)}K
                </div>
                <div className="text-sm text-blue-800">Cartera Total</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {metrics.collectionEfficiency.toFixed(0)}%
                </div>
                <div className="text-sm text-green-800">Eficiencia Cobranza</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="text-2xl font-bold text-orange-600">
                  ${(metrics.overdueDebt / 1000).toFixed(0)}K
                </div>
                <div className="text-sm text-orange-800">En Mora</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">
                  {metrics.averageCollectionTime}d
                </div>
                <div className="text-sm text-purple-800">Promedio Cobro</div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {filteredClients.map((client) => (
              <div key={client.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{client.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${getSegmentColor(client.segment)}`}>
                          {client.segment}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getRiskColor(client.riskLevel)}`}>
                          Riesgo {client.riskLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      ${client.currentDebt.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Deuda actual</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Historial pago:</span>
                    <div className="font-medium">{client.paymentHistory}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Último pago:</span>
                    <div className="font-medium">{client.lastPayment.toLocaleDateString()}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Próximo pago:</span>
                    <div className={`font-medium ${
                      new Date(client.nextPayment) < new Date() 
                        ? 'text-red-600' 
                        : 'text-gray-900'
                    }`}>
                      {client.nextPayment.toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Canal preferido:</span>
                    <div className="font-medium capitalize">{client.contact.preferredChannel}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    Retraso promedio: {client.paymentBehavior.averageDelay} días
                  </div>
                  <div className="flex gap-2">
                    <Button variant="default" size="sm">Contactar</Button>
                    <Button variant="outline" size="sm">Ver Detalles</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Distribución de Riesgo</h3>
            {metrics && (
              <div className="space-y-3">
                {Object.entries(metrics.riskDistribution).map(([risk, count]) => (
                  <div key={risk} className="flex items-center justify-between">
                    <span className="capitalize text-gray-700">{risk}:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            risk === 'bajo' ? 'bg-green-500' :
                            risk === 'medio' ? 'bg-yellow-500' :
                            risk === 'alto' ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${(count / clients.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Eficiencia por Segmento</h3>
            <div className="space-y-4">
              {['premium', 'empresarial', 'pyme', 'individual'].map(segment => {
                const segmentClients = clients.filter(c => c.segment === segment);
                const efficiency = segmentClients.length > 0 
                  ? segmentClients.reduce((sum, c) => sum + c.paymentHistory, 0) / segmentClients.length
                  : 0;
                
                return (
                  <div key={segment} className="flex items-center justify-between">
                    <span className="capitalize text-gray-700">{segment}:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${efficiency}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{efficiency.toFixed(0)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
