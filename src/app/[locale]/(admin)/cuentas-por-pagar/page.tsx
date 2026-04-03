"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { HandCoins, ShieldCheck, Plus, RefreshCw, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type CXP = {
  id: number;
  concepto: string;
  monto_original: string;
  monto_pendiente: string;
  moneda: string;
  fecha_emision: string;
  fecha_vencimiento: string | null;
  estado: string;
  numero_factura_proveedor: string | null;
  proveedor_nombre: string | null;
  proveedor_rif: string | null;
};

type Stats = {
  total_pendiente: string;
  total_vencido: string;
  num_pendientes: number;
  num_vencidas: number;
};

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  pagada: "default",
  pendiente: "secondary",
  parcial: "secondary",
  vencida: "destructive",
};

export default function CuentasPorPagarPage() {
  const { toast } = useToast();
  const [cuentas, setCuentas] = useState<CXP[]>([]);
  const [stats, setStats] = useState<Stats>({ total_pendiente: "0", total_vencido: "0", num_pendientes: 0, num_vencidas: 0 });
  const [loading, setLoading] = useState(true);
  const [registroOpen, setRegistroOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ concepto: "", monto_original: "", moneda: "VES", fecha_emision: "", fecha_vencimiento: "", numero_factura: "" });

  const fetchCuentas = useCallback(async () => {
    try {
      const res = await fetch("/api/cuentas-por-pagar");
      if (!res.ok) return;
      const data = await res.json();
      setCuentas(data.cuentas || []);
      setStats(data.stats || {});
    } catch {} finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCuentas(); }, [fetchCuentas]);

  const handleRegistrar = async () => {
    if (!form.concepto || !form.monto_original || !form.fecha_emision) {
      toast({ variant: "destructive", title: "Campos requeridos", description: "Concepto, monto y fecha de emisión son obligatorios." });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/cuentas-por-pagar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          concepto: form.concepto,
          monto_original: form.monto_original,
          moneda: form.moneda,
          fecha_emision: form.fecha_emision,
          fecha_vencimiento: form.fecha_vencimiento || null,
          numero_factura_proveedor: form.numero_factura || null,
        }),
      });
      if (res.ok) {
        toast({ title: "REGISTRADO", description: "Cuenta por pagar registrada exitosamente." });
        setRegistroOpen(false);
        setForm({ concepto: "", monto_original: "", moneda: "VES", fecha_emision: "", fecha_vencimiento: "", numero_factura: "" });
        await fetchCuentas();
      } else {
        const err = await res.json().catch(() => ({}));
        toast({ variant: "destructive", title: "Error", description: err.error || "No se pudo registrar." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    } finally {
      setSaving(false);
    }
  };

  const handleLiquidar = async (cxp: CXP) => {
    try {
      const res = await fetch("/api/cuentas-por-pagar", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: cxp.id, monto_abono: parseFloat(cxp.monto_pendiente) }),
      });
      if (res.ok) {
        toast({ title: "PAGO PROCESADO", description: `Factura ${cxp.concepto} liquidada exitosamente.`, action: <ShieldCheck className="h-4 w-4 text-primary" /> });
        await fetchCuentas();
      } else {
        toast({ variant: "destructive", title: "Error", description: "No se pudo procesar el pago." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    }
  };

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
          <HandCoins className="h-3 w-3" /> NODO DE EGRESOS
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none">Cuentas <span className="text-primary italic">por Pagar</span></h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Gestión de Proveedores • Compromisos de Pago 2026</p>
      </header>

      <div className="flex justify-end">
        <Button onClick={() => setRegistroOpen(true)} className="rounded-xl h-11 px-6 font-black text-[10px] uppercase tracking-widest btn-3d-primary">
          <Plus className="mr-2 h-4 w-4" /> REGISTRAR CXP
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card border-none bg-card/40 p-8 rounded-[2rem]">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-4">Total Pendiente</p>
          <p className="text-4xl font-black italic text-foreground tracking-tight">{formatCurrency(parseFloat(stats.total_pendiente || "0"), "Bs.")}</p>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-8 rounded-[2rem]">
          <p className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-4">En Mora</p>
          <p className="text-4xl font-black italic text-rose-500 tracking-tight">{stats.num_vencidas} {stats.num_vencidas === 1 ? "Factura" : "Facturas"}</p>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-8 rounded-[2rem]">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-4">Pendientes</p>
          <p className="text-4xl font-black italic text-foreground tracking-tight">{stats.num_pendientes}</p>
        </Card>
      </div>

      <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
        <CardHeader className="p-10 border-b border-border/50">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Facturas Pendientes</CardTitle>
            <Button variant="outline" size="sm" className="rounded-xl" onClick={fetchCuentas}>
              <RefreshCw className="h-3 w-3 mr-2" /> Actualizar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : cuentas.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground/40">
              <HandCoins className="h-10 w-10 mx-auto mb-4 opacity-30" />
              <p className="text-[10px] font-black uppercase tracking-widest">Sin cuentas registradas</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 border-none">
                  <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Proveedor / Concepto</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Vencimiento</TableHead>
                  <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Monto</TableHead>
                  <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Pendiente</TableHead>
                  <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Estatus</TableHead>
                  <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cuentas.map((cxp) => (
                  <TableRow key={cxp.id} className="border-border/50 hover:bg-muted/20 transition-all group">
                    <TableCell className="pl-10 py-6">
                      <p className="font-black text-xs text-foreground/80 uppercase italic">{cxp.proveedor_nombre || cxp.concepto}</p>
                      <p className="text-[8px] font-mono text-muted-foreground font-bold uppercase">{cxp.numero_factura_proveedor || `CXP-${cxp.id}`}</p>
                    </TableCell>
                    <TableCell className="py-6 text-[10px] font-bold text-muted-foreground uppercase">{cxp.fecha_vencimiento || "—"}</TableCell>
                    <TableCell className="text-right py-6 font-mono text-sm font-black italic text-foreground/70">{formatCurrency(parseFloat(cxp.monto_original), "Bs.")}</TableCell>
                    <TableCell className="text-right py-6 font-mono text-sm font-black italic text-foreground/70">{formatCurrency(parseFloat(cxp.monto_pendiente), "Bs.")}</TableCell>
                    <TableCell className="text-center py-6">
                      <Badge variant={statusVariant[cxp.estado] || "secondary"} className="text-[8px] font-black uppercase tracking-widest h-6 px-3">{cxp.estado}</Badge>
                    </TableCell>
                    <TableCell className="text-right pr-10 py-6">
                      {cxp.estado !== "pagada" && (
                        <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest" onClick={() => handleLiquidar(cxp)}>Liquidar</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={registroOpen} onOpenChange={setRegistroOpen}>
        <DialogContent className="rounded-2xl max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-black uppercase tracking-tight">Registrar Cuenta por Pagar</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-foreground/60">Concepto / Proveedor *</label>
              <Input value={form.concepto} onChange={e => setForm(p => ({ ...p, concepto: e.target.value }))} placeholder="Ej: Suministros de oficina" className="h-11 rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-foreground/60">Monto (Bs.) *</label>
                <Input type="number" value={form.monto_original} onChange={e => setForm(p => ({ ...p, monto_original: e.target.value }))} placeholder="0.00" className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-foreground/60">N° Factura Proveedor</label>
                <Input value={form.numero_factura} onChange={e => setForm(p => ({ ...p, numero_factura: e.target.value }))} placeholder="FAC-001" className="h-11 rounded-xl" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-foreground/60">Fecha Emisión *</label>
                <Input type="date" value={form.fecha_emision} onChange={e => setForm(p => ({ ...p, fecha_emision: e.target.value }))} className="h-11 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-foreground/60">Fecha Vencimiento</label>
                <Input type="date" value={form.fecha_vencimiento} onChange={e => setForm(p => ({ ...p, fecha_vencimiento: e.target.value }))} className="h-11 rounded-xl" />
              </div>
            </div>
          </div>
          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={() => setRegistroOpen(false)} className="rounded-xl">CANCELAR</Button>
            <Button onClick={handleRegistrar} disabled={saving} className="rounded-xl btn-3d-primary font-black text-[10px] uppercase tracking-widest">
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
              {saving ? "GUARDANDO..." : "REGISTRAR"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
