"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type CXC = {
  id: number;
  concepto: string;
  monto_original: string;
  monto_pendiente: string;
  moneda: string;
  fecha_emision: string;
  fecha_vencimiento: string | null;
  estado: string;
  cliente_nombre: string | null;
  cliente_telefono: string | null;
  cliente_email: string | null;
};

interface CollectionAction {
  cxcId: number;
  clientName: string;
  concepto: string;
  montoPendiente: number;
  estado: string;
  vencimiento: string | null;
  email: string | null;
  telefono: string | null;
  urgency: 'normal' | 'urgente' | 'critico';
}

export const AutomatedCollectionSystem = () => {
  const { toast } = useToast();
  const [actions, setActions] = useState<CollectionAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingId, setSendingId] = useState<number | null>(null);

  const fetchCuentas = useCallback(async () => {
    try {
      const res = await fetch("/api/cuentas-por-cobrar");
      if (!res.ok) return;
      const data = await res.json();
      const cuentas: CXC[] = data.cuentas || [];

      const pending = cuentas
        .filter(c => ['pendiente', 'parcial', 'vencida'].includes(c.estado))
        .map(c => {
          let urgency: 'normal' | 'urgente' | 'critico' = 'normal';
          if (c.estado === 'vencida') urgency = 'critico';
          else if (c.fecha_vencimiento) {
            const days = Math.ceil((new Date(c.fecha_vencimiento).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
            if (days <= 7) urgency = 'urgente';
          }
          return {
            cxcId: c.id,
            clientName: c.cliente_nombre || 'Sin cliente',
            concepto: c.concepto,
            montoPendiente: parseFloat(c.monto_pendiente || '0'),
            estado: c.estado,
            vencimiento: c.fecha_vencimiento,
            email: c.cliente_email,
            telefono: c.cliente_telefono,
            urgency,
          };
        })
        .sort((a, b) => {
          const order = { critico: 0, urgente: 1, normal: 2 };
          return order[a.urgency] - order[b.urgency];
        });

      setActions(pending);
    } catch {} finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCuentas(); }, [fetchCuentas]);

  const handleSendReminder = async (action: CollectionAction) => {
    setSendingId(action.cxcId);
    try {
      const res = await fetch("/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoria: "cobranza",
          subcategoria: "recordatorio",
          descripcion: `Recordatorio de cobro a ${action.clientName}: ${action.concepto} — ${formatCurrency(action.montoPendiente, 'Bs.')}`,
          metadata: {
            cxc_id: action.cxcId,
            cliente: action.clientName,
            monto: action.montoPendiente,
            email: action.email,
            telefono: action.telefono,
          },
        }),
      });
      if (res.ok) {
        toast({ title: "Recordatorio enviado", description: `Notificación registrada para ${action.clientName}.` });
      } else {
        toast({ variant: "destructive", title: "Error", description: "No se pudo registrar el recordatorio." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    } finally {
      setSendingId(null);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critico': return 'bg-red-100 text-red-700 border-red-200';
      case 'urgente': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case 'critico': return 'Vencido';
      case 'urgente': return 'Próximo a vencer';
      default: return 'Normal';
    }
  };

  if (loading) {
    return (
      <div className="bg-card/50 backdrop-blur-sm rounded-lg border p-6 flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const criticos = actions.filter(a => a.urgency === 'critico').length;
  const urgentes = actions.filter(a => a.urgency === 'urgente').length;
  const totalPendiente = actions.reduce((s, a) => s + a.montoPendiente, 0);

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Sistema de Cobranza Automatizada</h2>
          <p className="text-muted-foreground">Gestión de recordatorios y seguimiento de cobros pendientes</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
          <div className="text-2xl font-bold text-primary">{actions.length}</div>
          <div className="text-sm text-primary/70">Cuentas Pendientes</div>
        </div>
        <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
          <div className="text-2xl font-bold text-red-600">{criticos}</div>
          <div className="text-sm text-red-500">Vencidas</div>
        </div>
        <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
          <div className="text-2xl font-bold text-orange-600">{urgentes}</div>
          <div className="text-sm text-orange-500">Próximas a Vencer</div>
        </div>
        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
          <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalPendiente, 'Bs.')}</div>
          <div className="text-sm text-blue-500">Total por Cobrar</div>
        </div>
      </div>

      {actions.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground/50">
          <p className="text-sm font-bold">Sin cuentas pendientes de cobro</p>
          <p className="text-xs mt-1">Todas las cuentas por cobrar están al día</p>
        </div>
      ) : (
        <div className="space-y-4">
          {actions.map((action) => (
            <div key={action.cxcId} className="border border-border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium">{action.clientName}</h4>
                  <p className="text-sm text-muted-foreground">{action.concepto}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getUrgencyColor(action.urgency)}`}>
                      {getUrgencyLabel(action.urgency)}
                    </span>
                    {action.email && <span className="text-xs text-muted-foreground">{action.email}</span>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{formatCurrency(action.montoPendiente, 'Bs.')}</div>
                  <div className="text-xs text-muted-foreground">
                    {action.vencimiento ? `Vence: ${new Date(action.vencimiento).toLocaleDateString("es-VE")}` : 'Sin vencimiento'}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendReminder(action)}
                  disabled={sendingId === action.cxcId}
                >
                  {sendingId === action.cxcId ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Enviar Recordatorio
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
