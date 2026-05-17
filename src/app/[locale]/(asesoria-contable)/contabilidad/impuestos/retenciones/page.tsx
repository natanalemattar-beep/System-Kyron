"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Loader2, Inbox, Download, Filter } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/back-button";

interface Retencion {
  id: number;
  fecha: string;
  proveedor: string;
  rif: string;
  tipo: string;
  base: string;
  pct: string;
  monto: string;
  comprobante: string;
}

export default function RetencionesPage() {
  const [rows, setRows] = useState<Retencion[]>([]);
  const [summary, setSummary] = useState<{ total_iva: string; total_islr: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contabilidad/records?type=retenciones")
      .then((r) => (r.ok ? r.json() : { rows: [], summary: null }))
      .then((d) => { setRows(d.rows ?? []); setSummary(d.summary ?? null); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-background">
      <BackButton href="/contabilidad" label="Volver al Centro Contable" />

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground uppercase tracking-tight flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-emerald-600" />
            Retenciones (IVA e ISLR)
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Registro y emisión de comprobantes de retención a proveedores.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl">
            <Filter className="mr-2 h-4 w-4" /> Filtrar
          </Button>
          <Button variant="outline" className="rounded-xl">
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border rounded-2xl shadow-sm p-8">
          <p className="text-[10px] font-semibold uppercase text-muted-foreground mb-1">Total Retenido IVA (Mes)</p>
          <p className="text-3xl font-bold text-foreground">
            {loading ? "..." : formatCurrency(parseFloat(summary?.total_iva ?? "0"), "Bs.")}
          </p>
        </Card>
        <Card className="border rounded-2xl shadow-sm p-8">
          <p className="text-[10px] font-semibold uppercase text-muted-foreground mb-1">Total Retenido ISLR (Mes)</p>
          <p className="text-3xl font-bold text-emerald-600">
            {loading ? "..." : formatCurrency(parseFloat(summary?.total_islr ?? "0"), "Bs.")}
          </p>
        </Card>
      </div>

      <Card className="border rounded-2xl shadow-sm overflow-hidden">
        <CardHeader className="border-b bg-muted/30 px-8 py-6">
          <CardTitle className="text-sm font-semibold uppercase tracking-widest text-foreground">
            Relación de Retenciones Practicadas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-bold uppercase tracking-widest">Cargando retenciones...</span>
            </div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold uppercase tracking-widest">Sin retenciones registradas</p>
              <p className="text-xs text-muted-foreground/70">Las retenciones aparecerán aquí al registrar comprobantes.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="pl-8 font-bold text-[10px] uppercase">Fecha</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Proveedor</TableHead>
                  <TableHead className="text-center font-bold text-[10px] uppercase">Tipo</TableHead>
                  <TableHead className="text-right font-bold text-[10px] uppercase">Base</TableHead>
                  <TableHead className="text-center font-bold text-[10px] uppercase">%</TableHead>
                  <TableHead className="text-right font-bold text-[10px] uppercase">Retenido</TableHead>
                  <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-8 text-xs">{r.fecha}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-xs">{r.proveedor}</span>
                        <span className="text-[11px] text-muted-foreground">{r.rif}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={r.tipo === "IVA" ? "default" : "secondary"} className="text-[11px] uppercase">{r.tipo}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs">{formatCurrency(parseFloat(r.base), "Bs.")}</TableCell>
                    <TableCell className="text-center font-semibold text-xs">{String(r.pct).replace("%", "")}%</TableCell>
                    <TableCell className="text-right font-mono text-xs font-bold text-emerald-600">{formatCurrency(parseFloat(r.monto), "Bs.")}</TableCell>
                    <TableCell className="text-right pr-8">
                      <Button variant="ghost" size="sm" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Download className="h-4 w-4" />
                      </Button>
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
