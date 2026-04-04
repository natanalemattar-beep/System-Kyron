"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Search, ArrowRightLeft, Loader2, Inbox, Printer, Plus, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ModuleAutomation } from "@/components/module-automation";

interface Partida {
  cuenta: string;
  debe: string;
  haber: string;
}

interface Asiento {
  id: number;
  numero: string;
  fecha: string;
  descripcion: string;
  tipo: string;
  estado: string;
  totalDebe: string;
  totalHaber: string;
  partidas?: Partida[];
}

const tipoColor: Record<string, string> = {
  Ingreso: "bg-emerald-500/10 text-emerald-500",
  Gasto: "bg-rose-500/10 text-rose-500",
  Costo: "bg-amber-500/10 text-amber-500",
  Ajuste: "bg-violet-500/10 text-violet-500",
};

interface LineaForm {
  cuenta_codigo: string;
  cuenta_nombre: string;
  debe: string;
  haber: string;
}

export default function AsientosContablesPage() {
  const { toast } = useToast();
  const [rows, setRows] = useState<Asiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ fecha_asiento: '', concepto: '', tipo_operacion: 'Ajuste' });
  const [lineas, setLineas] = useState<LineaForm[]>([{ cuenta_codigo: '', cuenta_nombre: '', debe: '', haber: '' }, { cuenta_codigo: '', cuenta_nombre: '', debe: '', haber: '' }]);

  const loadData = () => {
    setLoading(true);
    fetch('/api/contabilidad/records?type=asientos')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => setRows(d.rows ?? []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const filtered = rows.filter(a =>
    !search || a.descripcion?.toLowerCase().includes(search.toLowerCase()) || a.numero?.toLowerCase().includes(search.toLowerCase())
  );

  const addLinea = () => setLineas([...lineas, { cuenta_codigo: '', cuenta_nombre: '', debe: '', haber: '' }]);

  const updateLinea = (idx: number, field: keyof LineaForm, value: string) => {
    const updated = [...lineas];
    updated[idx] = { ...updated[idx], [field]: value };
    setLineas(updated);
  };

  const totalDebe = lineas.reduce((s, l) => s + (parseFloat(l.debe) || 0), 0);
  const totalHaber = lineas.reduce((s, l) => s + (parseFloat(l.haber) || 0), 0);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Está seguro de eliminar este asiento contable?')) return;
    try {
      const res = await fetch(`/api/contabilidad/records?type=asientos&id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast({ title: "Eliminado", description: "Asiento contable eliminado." });
        loadData();
      } else {
        toast({ variant: "destructive", title: "Error", description: "No se pudo eliminar." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    }
  };

  const handleAdd = async () => {
    if (!formData.concepto || !formData.fecha_asiento) {
      toast({ variant: "destructive", title: "Datos incompletos", description: "Ingrese fecha y concepto." });
      return;
    }
    if (Math.abs(totalDebe - totalHaber) > 0.01) {
      toast({ variant: "destructive", title: "Desbalanceado", description: "El total del Debe debe ser igual al total del Haber." });
      return;
    }
    if (totalDebe === 0) {
      toast({ variant: "destructive", title: "Sin montos", description: "Ingrese al menos una línea con monto." });
      return;
    }
    try {
      const numero = `AST-${Date.now().toString(36).toUpperCase()}`;
      const res = await fetch('/api/contabilidad/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'asientos',
          data: {
            numero_asiento: numero,
            fecha_asiento: formData.fecha_asiento,
            concepto: formData.concepto,
            tipo_operacion: formData.tipo_operacion,
            total_debito: totalDebe,
            total_credito: totalHaber,
            estado: 'activo',
            partidas: lineas.filter(l => (parseFloat(l.debe) || 0) > 0 || (parseFloat(l.haber) || 0) > 0).map(l => ({
              cuenta_codigo: l.cuenta_codigo,
              cuenta_nombre: l.cuenta_nombre,
              debe: parseFloat(l.debe) || 0,
              haber: parseFloat(l.haber) || 0,
            })),
          },
        }),
      });
      if (res.ok) {
        toast({ title: "Asiento registrado", description: `Asiento ${numero} creado exitosamente.` });
        setShowForm(false);
        setFormData({ fecha_asiento: '', concepto: '', tipo_operacion: 'Ajuste' });
        setLineas([{ cuenta_codigo: '', cuenta_nombre: '', debe: '', haber: '' }, { cuenta_codigo: '', cuenta_nombre: '', debe: '', haber: '' }]);
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
              <ArrowRightLeft className="h-3.5 w-3.5" /> Partida Doble
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Asientos <span className="text-primary">Contables</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Registros de partida doble · Debe = Haber · Auditoría integrada</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowForm(!showForm)} className="rounded-xl">
              <Plus className="mr-2 h-4 w-4" /> Nuevo Asiento
            </Button>
            <Button variant="outline" onClick={() => window.print()} className="rounded-xl">
              <Printer className="mr-2 h-4 w-4" /> Imprimir
            </Button>
          </div>
        </div>
      </header>

      {showForm && (
        <Card className="rounded-2xl border p-6">
          <h3 className="text-sm font-bold mb-4">Crear Asiento Contable</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">Fecha</Label>
              <Input type="date" value={formData.fecha_asiento} onChange={e => setFormData({ ...formData, fecha_asiento: e.target.value })} className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">Concepto</Label>
              <Input placeholder="Descripción del asiento" value={formData.concepto} onChange={e => setFormData({ ...formData, concepto: e.target.value })} className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-muted-foreground">Tipo</Label>
              <select
                value={formData.tipo_operacion}
                onChange={e => setFormData({ ...formData, tipo_operacion: e.target.value })}
                className="w-full h-10 rounded-xl border bg-background px-3 text-sm"
              >
                <option value="Ingreso">Ingreso</option>
                <option value="Gasto">Gasto</option>
                <option value="Costo">Costo</option>
                <option value="Ajuste">Ajuste</option>
              </select>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[10px] font-bold">Código</TableHead>
                <TableHead className="text-[10px] font-bold">Cuenta</TableHead>
                <TableHead className="text-[10px] font-bold text-right">Debe</TableHead>
                <TableHead className="text-[10px] font-bold text-right">Haber</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lineas.map((l, i) => (
                <TableRow key={i}>
                  <TableCell><Input placeholder="1.1.02" value={l.cuenta_codigo} onChange={e => updateLinea(i, 'cuenta_codigo', e.target.value)} className="h-8 text-xs rounded-lg" /></TableCell>
                  <TableCell><Input placeholder="Bancos" value={l.cuenta_nombre} onChange={e => updateLinea(i, 'cuenta_nombre', e.target.value)} className="h-8 text-xs rounded-lg" /></TableCell>
                  <TableCell><Input type="number" placeholder="0.00" value={l.debe} onChange={e => updateLinea(i, 'debe', e.target.value)} className="h-8 text-xs rounded-lg text-right" /></TableCell>
                  <TableCell><Input type="number" placeholder="0.00" value={l.haber} onChange={e => updateLinea(i, 'haber', e.target.value)} className="h-8 text-xs rounded-lg text-right" /></TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2">
                <TableCell colSpan={2} className="text-xs font-bold">TOTALES</TableCell>
                <TableCell className={cn("text-xs font-mono font-bold text-right", Math.abs(totalDebe - totalHaber) > 0.01 ? "text-rose-500" : "text-emerald-600")}>{totalDebe.toFixed(2)}</TableCell>
                <TableCell className={cn("text-xs font-mono font-bold text-right", Math.abs(totalDebe - totalHaber) > 0.01 ? "text-rose-500" : "text-emerald-600")}>{totalHaber.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={addLinea} className="rounded-xl text-xs">+ Agregar Línea</Button>
            <div className="flex-1" />
            <Button onClick={handleAdd} className="rounded-xl">Guardar Asiento</Button>
            <Button variant="ghost" onClick={() => setShowForm(false)} className="rounded-xl">Cancelar</Button>
          </div>
        </Card>
      )}

      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar asiento por número o descripción..."
          className="pl-12 h-12 rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ModuleAutomation module="asientos_contables" />

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-semibold">Cargando asientos...</span>
        </div>
      ) : filtered.length === 0 ? (
        <Card className="rounded-2xl border">
          <CardContent className="p-0">
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">No tiene asientos contables registrados</p>
              <p className="text-xs text-muted-foreground/70">Cree asientos de partida doble para registrar sus operaciones contables.</p>
              <Button variant="outline" className="rounded-xl mt-2" onClick={() => setShowForm(true)}>
                <Plus className="mr-2 h-4 w-4" /> Crear Primer Asiento
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((asiento) => {
            const partidas = Array.isArray(asiento.partidas) ? asiento.partidas : [];
            return (
              <Card key={asiento.id} className="rounded-2xl border overflow-hidden hover:border-primary/30 transition-colors">
                <div
                  className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/20 transition-colors"
                  onClick={() => setExpandedId(expandedId === asiento.id ? null : asiento.id)}
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-primary">{asiento.numero}</span>
                      <Badge className={cn("text-[9px] font-bold border-none", tipoColor[asiento.tipo] || 'bg-muted text-muted-foreground')}>{asiento.tipo}</Badge>
                    </div>
                    <p className="text-xs text-foreground font-medium mt-0.5 truncate">{asiento.descripcion}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[11px] text-muted-foreground">{asiento.fecha}</p>
                    <p className="text-xs font-bold text-foreground">{parseFloat(asiento.totalDebe || '0').toLocaleString('es-VE', { minimumFractionDigits: 2 })} Bs.</p>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-500 text-[9px] font-bold border-none">{asiento.estado}</Badge>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-rose-500 shrink-0" onClick={(e) => { e.stopPropagation(); handleDelete(asiento.id); }}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                {expandedId === asiento.id && partidas.length > 0 && (
                  <div className="border-t bg-muted/10 p-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-[10px] font-bold">Cuenta</TableHead>
                          <TableHead className="text-[10px] font-bold text-right">Debe</TableHead>
                          <TableHead className="text-[10px] font-bold text-right">Haber</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {partidas.map((p, j) => (
                          <TableRow key={j}>
                            <TableCell className="text-xs">{p.cuenta}</TableCell>
                            <TableCell className="text-xs font-mono text-right text-emerald-600">{parseFloat(p.debe || '0') > 0 ? parseFloat(p.debe).toLocaleString('es-VE', { minimumFractionDigits: 2 }) : '—'}</TableCell>
                            <TableCell className="text-xs font-mono text-right text-rose-500">{parseFloat(p.haber || '0') > 0 ? parseFloat(p.haber).toLocaleString('es-VE', { minimumFractionDigits: 2 }) : '—'}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="border-t-2">
                          <TableCell className="text-xs font-bold">TOTALES</TableCell>
                          <TableCell className="text-xs font-mono font-bold text-right text-emerald-600">{parseFloat(asiento.totalDebe || '0').toLocaleString('es-VE', { minimumFractionDigits: 2 })}</TableCell>
                          <TableCell className="text-xs font-mono font-bold text-right text-rose-500">{parseFloat(asiento.totalHaber || '0').toLocaleString('es-VE', { minimumFractionDigits: 2 })}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
