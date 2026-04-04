"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Wifi, Loader2, Inbox, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BackButton } from "@/components/back-button";

interface Factura {
  id: number;
  numero: string;
  cliente: string;
  monto: string;
  fecha: string;
  estado: string;
  tipo: string;
}

export default function FacturacionTelecomPage() {
  const [rows, setRows] = useState<Factura[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contabilidad/records?type=facturas_telecom")
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
          <h1 className="text-3xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
            <Wifi className="h-8 w-8 text-cyan-500" />
            Facturación Electrónica
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Sistema de facturación VEN-NIF con internet ilimitado incluido.
          </p>
        </div>
        <Button variant="outline" className="rounded-xl">
          <Download className="mr-2 h-4 w-4" /> Exportar
        </Button>
      </header>

      <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5 flex items-start gap-4">
        <Wifi className="h-5 w-5 text-cyan-600 mt-0.5 shrink-0" />
        <p className="text-sm text-cyan-800">
          El sistema de facturación opera con internet ilimitado incluido en la mensualidad.
          Emita y gestione facturas sin límite de volumen directamente desde la plataforma.
        </p>
      </div>

      <Card className="border rounded-2xl shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-bold uppercase tracking-widest">Cargando facturas...</span>
            </div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold uppercase tracking-widest">Sin facturas emitidas</p>
              <p className="text-xs text-muted-foreground/70">Las facturas electrónicas aparecerán aquí al ser generadas.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="pl-8 font-bold text-[10px] uppercase">N° Factura</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Cliente</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Tipo</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Fecha</TableHead>
                  <TableHead className="text-right font-bold text-[10px] uppercase">Monto</TableHead>
                  <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((f) => (
                  <TableRow key={f.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-8 font-mono text-xs font-bold">{f.numero}</TableCell>
                    <TableCell className="text-xs font-medium">{f.cliente}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-[8px] uppercase">{f.tipo}</Badge>
                    </TableCell>
                    <TableCell className="text-xs">{f.fecha}</TableCell>
                    <TableCell className="text-right font-mono text-xs font-bold">{f.monto}</TableCell>
                    <TableCell className="text-right pr-8">
                      <Badge variant={f.estado === "COBRADA" ? "default" : "secondary"} className="text-[9px] uppercase">
                        {f.estado}
                      </Badge>
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
