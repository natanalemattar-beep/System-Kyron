"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Store, Loader2, Inbox, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BackButton } from "@/components/back-button";

interface Venta {
  id: number;
  hora: string;
  concepto: string;
  monto: string;
  metodo: string;
  terminal: string;
}

export default function PuntoDeVentasPage() {
  const [rows, setRows] = useState<Venta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contabilidad/records?type=punto_ventas")
      .then((r) => (r.ok ? r.json() : { rows: [] }))
      .then((d) => setRows(d.rows ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-background">
      <BackButton href="/contabilidad" label="Volver al Centro Contable" />

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground uppercase tracking-tight flex items-center gap-3">
            <Store className="h-8 w-8 text-emerald-500" />
            Punto de Ventas
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Terminales POS — Tarjetas · Pago Móvil · Efectivo.
          </p>
        </div>
        <Button variant="outline" className="rounded-xl">
          <Download className="mr-2 h-4 w-4" /> Reporte Diario
        </Button>
      </header>

      <Card className="border rounded-2xl shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-bold uppercase tracking-widest">Cargando ventas...</span>
            </div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold uppercase tracking-widest">Sin ventas registradas hoy</p>
              <p className="text-xs text-muted-foreground/70">Las transacciones de punto de venta aparecerán aquí en tiempo real.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="pl-8 font-bold text-[10px] uppercase">Hora</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Concepto</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Método</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Terminal</TableHead>
                  <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((v) => (
                  <TableRow key={v.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-8 text-xs font-mono">{v.hora}</TableCell>
                    <TableCell className="text-xs font-medium">{v.concepto}</TableCell>
                    <TableCell className="text-xs">{v.metodo}</TableCell>
                    <TableCell className="text-xs font-mono">{v.terminal}</TableCell>
                    <TableCell className={cn("text-right pr-8 font-mono text-xs font-bold", v.monto.startsWith("-") ? "text-rose-600" : "text-emerald-600")}>
                      {v.monto}
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
