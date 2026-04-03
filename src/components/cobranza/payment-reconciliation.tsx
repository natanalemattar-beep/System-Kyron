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
  cliente_rif: string | null;
};

export const PaymentReconciliation = () => {
  const { toast } = useToast();
  const [cuentas, setCuentas] = useState<CXC[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [processingId, setProcessingId] = useState<number | null>(null);

  const fetchCuentas = useCallback(async () => {
    try {
      const res = await fetch("/api/cuentas-por-cobrar");
      if (!res.ok) return;
      const data = await res.json();
      setCuentas(data.cuentas || []);
    } catch {} finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCuentas(); }, [fetchCuentas]);

  const handleCobrar = async (cxc: CXC) => {
    setProcessingId(cxc.id);
    try {
      const res = await fetch("/api/cuentas-por-cobrar", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: cxc.id, monto_abono: parseFloat(cxc.monto_pendiente) }),
      });
      if (res.ok) {
        toast({ title: "Pago conciliado", description: `${cxc.concepto} marcada como cobrada.` });
        await fetchCuentas();
      } else {
        toast({ variant: "destructive", title: "Error", description: "No se pudo conciliar el pago." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'cobrada': return 'bg-green-100 text-green-700';
      case 'parcial': return 'bg-blue-100 text-blue-700';
      case 'pendiente': return 'bg-yellow-100 text-yellow-700';
      case 'vencida': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredCuentas = filterStatus === 'all'
    ? cuentas
    : cuentas.filter(c => c.estado === filterStatus);

  const totalCobrado = cuentas.filter(c => c.estado === 'cobrada').reduce((s, c) => s + parseFloat(c.monto_original || '0'), 0);
  const totalPendiente = cuentas.filter(c => ['pendiente', 'parcial'].includes(c.estado)).reduce((s, c) => s + parseFloat(c.monto_pendiente || '0'), 0);
  const totalVencido = cuentas.filter(c => c.estado === 'vencida').reduce((s, c) => s + parseFloat(c.monto_pendiente || '0'), 0);

  if (loading) {
    return (
      <div className="bg-card/50 backdrop-blur-sm rounded-lg border p-6 flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Sistema de Pagos y Conciliación</h2>
          <p className="text-muted-foreground">Gestión de cobros y conciliación de cuentas por cobrar</p>
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border-input bg-background rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">Todos los estados</option>
            <option value="cobrada">Cobradas</option>
            <option value="pendiente">Pendientes</option>
            <option value="parcial">Parciales</option>
            <option value="vencida">Vencidas</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
          <div className="text-2xl font-bold text-green-600">{formatCurrency(totalCobrado, 'Bs.')}</div>
          <div className="text-sm text-green-500">Total Cobrado</div>
        </div>
        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
          <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalPendiente, 'Bs.')}</div>
          <div className="text-sm text-blue-500">Pendiente de Cobro</div>
        </div>
        <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
          <div className="text-2xl font-bold text-red-600">{formatCurrency(totalVencido, 'Bs.')}</div>
          <div className="text-sm text-red-500">Vencido</div>
        </div>
      </div>

      {filteredCuentas.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground/50">
          <p className="text-sm font-bold">Sin cuentas por cobrar registradas</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCuentas.map((cxc) => (
            <div key={cxc.id} className="border border-border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium">{cxc.cliente_nombre || cxc.concepto}</h4>
                  <p className="text-sm text-muted-foreground">{cxc.concepto}</p>
                  {cxc.cliente_rif && <p className="text-xs text-muted-foreground font-mono">{cxc.cliente_rif}</p>}
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{formatCurrency(parseFloat(cxc.monto_pendiente || '0'), 'Bs.')}</div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(cxc.estado)}`}>
                    {cxc.estado}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Monto Original:</span>
                  <div className="font-medium">{formatCurrency(parseFloat(cxc.monto_original || '0'), 'Bs.')}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Emisión:</span>
                  <div className="font-medium">{cxc.fecha_emision ? new Date(cxc.fecha_emision).toLocaleDateString("es-VE") : '—'}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Vencimiento:</span>
                  <div className={`font-medium ${cxc.estado === 'vencida' ? 'text-red-500' : ''}`}>
                    {cxc.fecha_vencimiento ? new Date(cxc.fecha_vencimiento).toLocaleDateString("es-VE") : '—'}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Moneda:</span>
                  <div className="font-medium">{cxc.moneda || 'VES'}</div>
                </div>
              </div>

              {cxc.estado !== 'cobrada' && (
                <div className="flex gap-2 justify-end">
                  <Button
                    onClick={() => handleCobrar(cxc)}
                    size="sm"
                    disabled={processingId === cxc.id}
                  >
                    {processingId === cxc.id ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Cobrar Total
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
