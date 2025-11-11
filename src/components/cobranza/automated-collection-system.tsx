
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

interface CollectionCampaign {
  id: string;
  name: string;
  targetSegment: string;
  channels: string[];
  messageTemplate: string;
  schedule: {
    startDate: Date;
    frequency: string;
    bestTime: string;
  };
  status: 'active' | 'paused' | 'completed';
  results: {
    sent: number;
    delivered: number;
    responded: number;
    paid: number;
    conversionRate: number;
  };
}

interface CommunicationLog {
  id: string;
  clientId: string;
  clientName: string;
  channel: 'email' | 'sms' | 'whatsapp' | 'llamada';
  type: 'recordatorio' | 'aviso' | 'urgente' | 'negociacion';
  status: 'sent' | 'delivered' | 'read' | 'responded';
  timestamp: Date;
  message: string;
  response?: string;
}

export const AutomatedCollectionSystem = () => {
  const [campaigns, setCampaigns] = useState<CollectionCampaign[]>([]);
  const [communications, setCommunications] = useState<CommunicationLog[]>([]);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    targetSegment: 'empresarial',
    channels: [] as string[],
    message: ''
  });

  useEffect(() => {
    const campaignData: CollectionCampaign[] = [
      {
        id: 'camp-001',
        name: 'Recordatorio Mensual Empresas',
        targetSegment: 'empresarial',
        channels: ['email', 'whatsapp'],
        messageTemplate: 'Estimado cliente, le recordamos su pago pendiente de ${amount} con vencimiento ${dueDate}',
        schedule: {
          startDate: new Date('2024-06-01'),
          frequency: 'mensual',
          bestTime: '10:00 AM'
        },
        status: 'active',
        results: {
          sent: 45,
          delivered: 42,
          responded: 28,
          paid: 25,
          conversionRate: 89.3
        }
      },
      {
        id: 'camp-002',
        name: 'Campaña PYME Semanal',
        targetSegment: 'pyme',
        channels: ['sms', 'whatsapp'],
        messageTemplate: 'Hola! Su pago de ${amount} vence pronto. ¿Necesita ayuda?',
        schedule: {
          startDate: new Date('2024-05-20'),
          frequency: 'semanal',
          bestTime: '2:00 PM'
        },
        status: 'active',
        results: {
          sent: 120,
          delivered: 115,
          responded: 65,
          paid: 58,
          conversionRate: 89.2
        }
      }
    ];

    setCampaigns(campaignData);

    const logs: CommunicationLog[] = [
      {
        id: 'comm-001',
        clientId: 'cl-001',
        clientName: 'TechSolutions Corp',
        channel: 'email',
        type: 'recordatorio',
        status: 'read',
        timestamp: new Date('2024-05-28T10:00:00'),
        message: 'Recordatorio de pago pendiente - $15,000 - Vence 15/06/2024',
        response: 'Pago programado para el 10/06'
      },
      {
        id: 'comm-002',
        clientId: 'cl-002',
        clientName: 'Distribuidora La Económica',
        channel: 'whatsapp',
        type: 'aviso',
        status: 'read',
        timestamp: new Date('2024-05-29T14:30:00'),
        message: 'Hola! Su pago de $12,000 vence el 05/06. ¿Todo bien?',
        response: 'Sí, pagaré el 03/06'
      },
      {
        id: 'comm-003',
        clientId: 'cl-003',
        clientName: 'Constructora Norte',
        channel: 'llamada',
        type: 'urgente',
        status: 'responded',
        timestamp: new Date('2024-05-30T11:15:00'),
        message: 'Llamada urgente: pago vencido de $45,000',
        response: 'Solicitaremos prórroga'
      }
    ];

    setCommunications(logs);
  }, []);

  const createCampaign = () => {
    if (newCampaign.name && newCampaign.channels.length > 0 && newCampaign.message) {
      const campaign: CollectionCampaign = {
        id: `camp-${Date.now()}`,
        name: newCampaign.name,
        targetSegment: newCampaign.targetSegment,
        channels: newCampaign.channels,
        messageTemplate: newCampaign.message,
        schedule: {
          startDate: new Date(),
          frequency: 'semanal',
          bestTime: '10:00 AM'
        },
        status: 'active',
        results: { sent: 0, delivered: 0, responded: 0, paid: 0, conversionRate: 0 }
      };

      setCampaigns([...campaigns, campaign]);
      setNewCampaign({ name: '', targetSegment: 'empresarial', channels: [], message: '' });
    }
  };

  const sendImmediateCommunication = (clientId: string, channel: string) => {
    const client = communications.find(c => c.clientId === clientId);
    if (client) {
      const newComm: CommunicationLog = {
        id: `comm-${Date.now()}`,
        clientId,
        clientName: client.clientName,
        channel: channel as any,
        type: 'recordatorio',
        status: 'sent',
        timestamp: new Date(),
        message: `Recordatorio inmediato enviado por ${channel}`
      };

      setCommunications([newComm, ...communications]);
    }
  };

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Sistema de Cobranza Automatizada</h2>
          <p className="text-muted-foreground">Comunicación omnicanal y campañas inteligentes</p>
        </div>
        <Button variant="default">+ Nueva Campaña</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-4">Campañas de Cobranza</h3>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{campaign.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-blue-900/50 text-blue-300 px-2 py-1 rounded-full text-xs">
                        {campaign.targetSegment}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        campaign.status === 'active' 
                          ? 'bg-green-900/50 text-green-300' 
                          : 'bg-gray-700 text-gray-300'
                      }`}>
                        {campaign.status === 'active' ? 'Activa' : 'Pausada'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-400">
                      {campaign.results.conversionRate}%
                    </div>
                    <div className="text-xs text-muted-foreground">Conversión</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Canales:</span>
                    <div className="font-medium">
                      {campaign.channels.map(ch => 
                        ch === 'email' ? '📧' :
                        ch === 'sms' ? '💬' :
                        ch === 'whatsapp' ? '💚' : '📞'
                      ).join(' ')}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Frecuencia:</span>
                    <div className="font-medium">{campaign.schedule.frequency}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Enviados: {campaign.results.sent}</span>
                  <span>Pagados: {campaign.results.paid}</span>
                  <span>Éxito: {campaign.results.conversionRate}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Comunicaciones Recientes</h3>
          <div className="space-y-3">
            {communications.map((comm) => (
              <div key={comm.id} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{comm.clientName}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        comm.channel === 'email' ? 'bg-blue-900/50 text-blue-300' :
                        comm.channel === 'sms' ? 'bg-gray-700 text-gray-300' :
                        comm.channel === 'whatsapp' ? 'bg-green-900/50 text-green-300' :
                        'bg-purple-900/50 text-purple-300'
                      }`}>
                        {comm.channel}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        comm.status === 'read' ? 'bg-green-900/50 text-green-300' :
                        comm.status === 'responded' ? 'bg-blue-900/50 text-blue-300' :
                        'bg-gray-700 text-gray-300'
                      }`}>
                        {comm.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    {typeof comm.timestamp.toLocaleTimeString === 'function' ? comm.timestamp.toLocaleTimeString() : ''}
                  </div>
                </div>

                <div className="text-sm text-gray-400 mb-2">
                  {comm.message}
                </div>

                {comm.response && (
                  <div className="bg-background rounded-lg p-2 text-sm">
                    <strong>Respuesta:</strong> {comm.response}
                  </div>
                )}

                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => sendImmediateCommunication(comm.clientId, 'whatsapp')}
                    className="text-green-400 text-sm"
                  >
                    Reenviar
                  </button>
                  <button className="text-blue-400 text-sm">
                    Llamar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
