"use client";

import React, { useState, useEffect } from "react";
import { RefreshCw, Building2, Banknote, TrendingUp, Clock, Loader2, Inbox, AlertTriangle, Plus, Trash2, Pencil, Upload } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/back-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ModuleAutomation } from "@/components/module-automation";
import { ImportMovimientos } from "@/components/import-movimientos";
import { BankConnect } from "@/components/bank-connect";

interface CuentaBancaria {
  id: number;
  banco: string;
  cuenta: string;
  tipo_cuenta: string;
  titular: string;
  saldo: string;
  saldo_disponible: string;
  estado: boolean;
  movimientos: number;
  match: number;
}

interface Movimiento {
  id: number;
  fecha: string;
  concepto: string;
  monto: string;
  banco: string;
  tipo: string;
  referencia: string;
  conciliado: boolean;
}

export default function ConciliacionBancariaPage() {
  const { toast } = useToast();
  const [cuentas, setCuentas] = useState<CuentaBancaria[]>([]);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ banco: '', codigo_banco: '', numero_cuenta: '', tipo_cuenta: 'corriente', titular: '', saldo_actual: '' });

  const loadData = () => {
    setLoading(true);
    Promise.all([
      fetch('/api/contabilidad/records?type=cuentas_bancarias').then(r => r.ok ? r.json() : { rows: [] }),
      fetch('/api/contabilidad/records?type=movimientos_bancarios').then(r => r.ok ? r.json() : { rows: [] }),
    ])
      .then(([c, m]) => {
        setCuentas(c.rows ?? []);
        setMovimientos(m.rows ?? []);
      })
      .catch(() => {
        setCuentas([]);
        setMovimientos([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch("/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoria: "contabilidad", subcategoria: "conciliacion_bancaria", descripcion: "Sincronización y conciliación bancaria" }),
      });
      if (res.ok) {
        toast({ title: "Solicitud registrada", description: "La conciliación bancaria ha sido solicitada." });
      } else {
        toast({ variant: "destructive", title: "Error", description: "No se pudo iniciar la conciliación." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDeleteCuenta = async (id: number) => {
    if (!confirm('¿Está seguro de eliminar esta cuenta bancaria?')) return;
    try {
      const res = await fetch(`/api/contabilidad/records?type=cuentas_bancarias&id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast({ title: "Eliminada", description: "Cuenta bancaria eliminada." });
        loadData();
      } else {
        toast({ variant: "destructive", title: "Error", description: "No se pudo eliminar." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    }
  };

  const handleEditCuenta = (b: CuentaBancaria) => {
    setEditingId(b.id);
    setFormData({
      banco: b.banco || '',
      codigo_banco: '',
      numero_cuenta: b.cuenta || '',
      tipo_cuenta: b.tipo || 'corriente',
      titular: '',
      saldo_actual: String(b.saldo || ''),
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ banco: '', codigo_banco: '', numero_cuenta: '', tipo_cuenta: 'corriente', titular: '', saldo_actual: '' });
  };

  const handleAddCuenta = async () => {
    try {
      if (editingId) {
        const res = await fetch('/api/contabilidad/records', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'cuentas_bancarias',
            id: editingId,
            data: {
              banco: formData.banco,
              codigo_banco: formData.codigo_banco,
              numero_cuenta: formData.numero_cuenta,
              tipo_cuenta: formData.tipo_cuenta,
              titular: formData.titular,
              saldo_actual: parseFloat(formData.saldo_actual) || 0,
              saldo_disponible: parseFloat(formData.saldo_actual) || 0,
            },
          }),
        });
        if (res.ok) {
          toast({ title: "Actualizado", description: "Cuenta bancaria actualizada." });
          resetForm();
          loadData();
        } else {
          toast({ variant: "destructive", title: "Error al actualizar" });
        }
        return;
      }

      const res = await fetch('/api/contabilidad/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'cuentas_bancarias',
          data: {
            banco: formData.banco,
            codigo_banco: formData.codigo_banco,
            numero_cuenta: formData.numero_cuenta,
            tipo_cuenta: formData.tipo_cuenta,
            titular: formData.titular,
            saldo_actual: parseFloat(formData.saldo_actual) || 0,
            saldo_disponible: parseFloat(formData.saldo_actual) || 0,
          },
        }),
      });
      if (res.ok) {
        toast({ title: "Cuenta registrada", description: "La cuenta bancaria se ha añadido correctamente." });
        resetForm();
        loadData();
      } else {
        toast({ variant: "destructive", title: "Error", description: "No se pudo registrar la cuenta." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    }
  };

  const formatNum = (v: string | number) => {
    const n = typeof v === 'string' ? parseFloat(v) : v;
    return isNaN(n) ? '0,00' : n.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad" label="Contabilidad" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-3">
              <RefreshCw className="h-3.5 w-3.5" /> Conciliación Bancaria
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Gestión y <span className="text-blue-500">Conciliación</span> Bancaria
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Sincronización de cuentas bancarias · Control de movimientos</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <BankConnect
              cuentas={cuentas.map(c => ({ id: c.id, banco: c.banco, cuenta: c.cuenta }))}
              onSyncComplete={loadData}
            />
            <ImportMovimientos
              cuentas={cuentas.map(c => ({ id: c.id, banco: c.banco, cuenta: c.cuenta }))}
              onImportComplete={loadData}
            />
            <Button variant="outline" onClick={() => { if (showForm) resetForm(); else setShowForm(true); }} className="rounded-xl">
              <Plus className="mr-2 h-4 w-4" /> Nueva Cuenta
            </Button>
            <Button onClick={handleSync} disabled={isSyncing} className="rounded-xl">
              {isSyncing ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
              Solicitar Conciliación
            </Button>
          </div>
        </div>
      </header>

      {showForm && (
        <Card className="rounded-2xl border p-6">
          <h3 className="text-sm font-bold mb-4">{editingId ? 'Editar Cuenta Bancaria' : 'Registrar Cuenta Bancaria'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">Banco</Label>
              <Input placeholder="Ej: Banesco" value={formData.banco} onChange={e => setFormData({ ...formData, banco: e.target.value })} className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">Código Banco</Label>
              <Input placeholder="Ej: 0134" value={formData.codigo_banco} onChange={e => setFormData({ ...formData, codigo_banco: e.target.value })} className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">Número de Cuenta</Label>
              <Input placeholder="20 dígitos" value={formData.numero_cuenta} onChange={e => setFormData({ ...formData, numero_cuenta: e.target.value })} className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">Tipo</Label>
              <Select value={formData.tipo_cuenta} onValueChange={v => setFormData({ ...formData, tipo_cuenta: v })}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="corriente">Corriente</SelectItem>
                  <SelectItem value="ahorro">Ahorro</SelectItem>
                  <SelectItem value="corriente_en_dolares">Corriente en Dólares</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">Titular</Label>
              <Input placeholder="Nombre del titular" value={formData.titular} onChange={e => setFormData({ ...formData, titular: e.target.value })} className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">Saldo Inicial (Bs.)</Label>
              <Input type="number" placeholder="0.00" value={formData.saldo_actual} onChange={e => setFormData({ ...formData, saldo_actual: e.target.value })} className="rounded-xl" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleAddCuenta} className="rounded-xl">{editingId ? 'Actualizar' : 'Guardar Cuenta'}</Button>
            <Button variant="ghost" onClick={resetForm} className="rounded-xl">Cancelar</Button>
          </div>
        </Card>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-semibold">Cargando datos bancarios...</span>
        </div>
      ) : cuentas.length === 0 && movimientos.length === 0 ? (
        <Card className="rounded-2xl border">
          <CardContent className="p-0">
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">No tiene cuentas bancarias registradas</p>
              <p className="text-xs text-muted-foreground/70">Registre sus cuentas bancarias para comenzar la conciliación.</p>
              <Button variant="outline" className="rounded-xl mt-2" onClick={() => setShowForm(true)}>
                <Plus className="mr-2 h-4 w-4" /> Registrar Primera Cuenta
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {cuentas.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-blue-500" />
                <h2 className="text-sm font-bold text-muted-foreground">Cuentas Bancarias</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cuentas.map((b) => (
                  <Card key={b.id} className="rounded-2xl border p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-bold">{b.banco}</p>
                        <p className="text-[11px] font-mono text-muted-foreground mt-0.5">{b.cuenta}</p>
                      </div>
                      <Badge className={cn("text-[10px] font-semibold border-none",
                        b.match >= 80 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                      )}>
                        {b.match >= 80 ? 'CONCILIADO' : 'PENDIENTE'}
                      </Badge>
                    </div>
                    <p className="text-lg font-black">{formatNum(b.saldo)} Bs.</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{b.movimientos} movimientos · {b.match}% conciliado</p>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-muted-foreground hover:text-primary" onClick={() => handleEditCuenta(b)}>
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-muted-foreground hover:text-rose-500" onClick={() => handleDeleteCuenta(b.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {movimientos.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-sm font-bold text-muted-foreground">Movimientos Recientes</h2>
              <Card className="rounded-2xl border overflow-hidden">
                <div className="divide-y divide-border">
                  {movimientos.slice(0, 20).map((m) => (
                    <div key={m.id} className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-2 h-2 rounded-full shrink-0", m.tipo === "credito" ? "bg-emerald-500" : "bg-rose-500")} />
                        <div>
                          <p className="text-xs font-semibold">{m.concepto}</p>
                          <p className="text-[11px] text-muted-foreground">{m.fecha} · {m.banco}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {m.conciliado && <Badge className="bg-emerald-500/10 text-emerald-500 text-[9px] border-none">Conciliado</Badge>}
                        <p className={cn("text-sm font-bold", m.tipo === "credito" ? "text-emerald-500" : "text-rose-500")}>
                          {m.tipo === "credito" ? "+" : "-"} {formatNum(m.monto)} Bs.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>
          )}
        </>
      )}

      <ModuleAutomation module="conciliacion_bancaria" />

      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Nota</p>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
              La conciliación bancaria requiere la integración con los portales bancarios correspondientes. Los datos mostrados provienen del registro interno del sistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
