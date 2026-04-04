"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { Landmark, Search, Loader2, Inbox, Printer, AlertTriangle, TrendingUp, Users, Clock, Plus, Trash2, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ModuleAutomation } from "@/components/module-automation";

interface CuentaCobrar {
  id: number;
  cliente: string;
  rif: string;
  factura: string;
  fecha: string;
  vencimiento: string;
  monto: string;
  saldo: string;
  estado: string;
}

export default function CuentasPorCobrarPage() {
  const { toast } = useToast();
  const [rows, setRows] = useState<CuentaCobrar[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ concepto: '', monto_original: '', fecha_emision: '', fecha_vencimiento: '' });

  const loadData = () => {
    setLoading(true);
    fetch('/api/contabilidad/records?type=cuentas_cobrar')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => setRows(d.rows ?? []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const filtered = useMemo(() => {
    return rows.filter(r =>
      !search || r.cliente?.toLowerCase().includes(search.toLowerCase()) || r.factura?.includes(search) || r.rif?.toLowerCase().includes(search.toLowerCase())
    );
  }, [rows, search]);

  const summary = useMemo(() => {
    const totalSaldo = rows.reduce((s, r) => s + (parseFloat(r.saldo) || 0), 0);
    const vencidas = rows.filter(r => r.estado === 'vencida');
    const totalVencido = vencidas.reduce((s, r) => s + (parseFloat(r.saldo) || 0), 0);
    return { totalSaldo, totalVencido, clientes: new Set(rows.map(r => r.cliente)).size, vencidas: vencidas.length };
  }, [rows]);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Está seguro de eliminar esta cuenta por cobrar?')) return;
    try {
      const res = await fetch(`/api/contabilidad/records?type=cuentas_cobrar&id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast({ title: "Eliminado", description: "Cuenta por cobrar eliminada." });
        loadData();
      } else {
        toast({ variant: "destructive", title: "Error", description: "No se pudo eliminar." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    }
  };

  const handleEdit = (row: CuentaCobrar) => {
    setEditingId(row.id);
    setFormData({
      concepto: row.cliente || '',
      monto_original: row.monto || '',
      fecha_emision: row.fecha || '',
      fecha_vencimiento: row.vencimiento || '',
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ concepto: '', monto_original: '', fecha_emision: '', fecha_vencimiento: '' });
  };

  const handleAdd = async () => {
    try {
      const monto = parseFloat(formData.monto_original);
      if (!formData.concepto || isNaN(monto) || monto <= 0) {
        toast({ variant: "destructive", title: "Datos incompletos", description: "Ingrese concepto y monto válidos." });
        return;
      }

      if (editingId) {
        const res = await fetch('/api/contabilidad/records', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'cuentas_cobrar',
            id: editingId,
            data: {
              concepto: formData.concepto,
              monto_original: monto,
              monto_pendiente: monto,
              fecha_emision: formData.fecha_emision || new Date().toISOString().split('T')[0],
              fecha_vencimiento: formData.fecha_vencimiento || null,
            },
          }),
        });
        if (res.ok) {
          toast({ title: "Actualizado", description: "Cuenta por cobrar actualizada." });
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
          type: 'cuentas_cobrar',
          data: {
            concepto: formData.concepto,
            monto_original: monto,
            monto_pendiente: monto,
            fecha_emision: formData.fecha_emision || new Date().toISOString().split('T')[0],
            fecha_vencimiento: formData.fecha_vencimiento || null,
            estado: 'pendiente',
          },
        }),
      });
      if (res.ok) {
        toast({ title: "Cuenta registrada", description: "Se ha registrado la cuenta por cobrar." });
        resetForm();
        loadData();
      } else {
        toast({ variant: "destructive", title: "Error" });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    }
  };

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad" label="Contabilidad" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">
              <Landmark className="h-3.5 w-3.5" /> Activos Corrientes
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Cuentas <span className="text-primary">por Cobrar</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Gestión de cartera · Seguimiento de cobros · Conciliación de ingresos</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => { if (showForm) resetForm(); else setShowForm(true); }} className="rounded-xl">
              <Plus className="mr-2 h-4 w-4" /> Nueva Cuenta
            </Button>
            <Button variant="outline" onClick={() => window.print()} className="rounded-xl">
              <Printer className="mr-2 h-4 w-4" /> Imprimir
            </Button>
          </div>
        </div>
      </header>

      {showForm && (
        <Card className="rounded-2xl border p-6">
          <h3 className="text-sm font-bold mb-4">{editingId ? 'Editar Cuenta por Cobrar' : 'Registrar Cuenta por Cobrar'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">Concepto</Label>
              <Input placeholder="Descripción de la cuenta" value={formData.concepto} onChange={e => setFormData({ ...formData, concepto: e.target.value })} className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">Monto (Bs.)</Label>
              <Input type="number" placeholder="0.00" value={formData.monto_original} onChange={e => setFormData({ ...formData, monto_original: e.target.value })} className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">Fecha Emisión</Label>
              <Input type="date" value={formData.fecha_emision} onChange={e => setFormData({ ...formData, fecha_emision: e.target.value })} className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">Fecha Vencimiento</Label>
              <Input type="date" value={formData.fecha_vencimiento} onChange={e => setFormData({ ...formData, fecha_vencimiento: e.target.value })} className="rounded-xl" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleAdd} className="rounded-xl">{editingId ? 'Actualizar' : 'Guardar'}</Button>
            <Button variant="ghost" onClick={resetForm} className="rounded-xl">Cancelar</Button>
          </div>
        </Card>
      )}

      {rows.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Total por Cobrar</span>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-black text-primary">{formatCurrency(summary.totalSaldo, 'Bs.')}</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Monto Vencido</span>
              <AlertTriangle className="h-4 w-4 text-rose-500" />
            </div>
            <p className="text-2xl font-black text-rose-500">{formatCurrency(summary.totalVencido, 'Bs.')}</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Clientes</span>
              <Users className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-black">{summary.clientes}</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Facturas Vencidas</span>
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
            <p className={cn("text-2xl font-black", summary.vencidas > 0 ? "text-amber-500" : "text-emerald-500")}>{summary.vencidas}</p>
          </Card>
        </div>
      )}

      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por cliente, RIF o factura..."
          className="pl-12 h-12 rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ModuleAutomation module="cuentas_por_cobrar" />

      <Card className="rounded-2xl border shadow-lg overflow-hidden">
        <CardHeader className="p-6 border-b bg-muted/30">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Landmark className="h-4 w-4 text-primary" /> Cartera de Cuentas por Cobrar
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-semibold">Cargando cartera...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">No tiene cuentas por cobrar registradas</p>
              <p className="text-xs text-muted-foreground/70">Registre cuentas por cobrar para gestionar su cartera.</p>
              <Button variant="outline" className="rounded-xl mt-2" onClick={() => setShowForm(true)}>
                <Plus className="mr-2 h-4 w-4" /> Registrar Primera Cuenta
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead className="pl-6 py-4 text-xs font-semibold">Cliente / RIF</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Factura</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Fecha</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Vencimiento</TableHead>
                  <TableHead className="text-right py-4 text-xs font-semibold">Monto</TableHead>
                  <TableHead className="text-right py-4 text-xs font-semibold">Saldo</TableHead>
                  <TableHead className="text-right py-4 text-xs font-semibold">Estado</TableHead>
                  <TableHead className="text-right pr-6 py-4 text-xs font-semibold">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id} className="hover:bg-muted/10">
                    <TableCell className="pl-6 py-4">
                      <p className="text-xs font-semibold">{r.cliente}</p>
                      <p className="text-[11px] font-mono text-primary mt-0.5">{r.rif || '—'}</p>
                    </TableCell>
                    <TableCell className="py-4 font-mono text-xs text-muted-foreground">{r.factura}</TableCell>
                    <TableCell className="py-4 text-xs text-muted-foreground">{r.fecha}</TableCell>
                    <TableCell className="py-4 text-xs text-muted-foreground">{r.vencimiento || '—'}</TableCell>
                    <TableCell className="text-right py-4 font-mono text-sm">{formatCurrency(parseFloat(r.monto) || 0, 'Bs.')}</TableCell>
                    <TableCell className="text-right py-4 font-mono text-sm font-bold">{formatCurrency(parseFloat(r.saldo) || 0, 'Bs.')}</TableCell>
                    <TableCell className="text-right py-4">
                      <Badge className={cn("text-[10px] font-semibold border-none",
                        r.estado === 'cobrada' ? 'bg-emerald-500/10 text-emerald-500' :
                        r.estado === 'vencida' ? 'bg-rose-500/10 text-rose-500' :
                        'bg-amber-500/10 text-amber-500'
                      )}>{r.estado}</Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-primary" onClick={() => handleEdit(r)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-rose-500" onClick={() => handleDelete(r.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
