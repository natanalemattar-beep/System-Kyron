"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Scale, Loader2, Inbox, Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/back-button";

interface DeclaracionIVA {
  id: number;
  periodo: string;
  fecha: string;
  base: string;
  iva: string;
  credito: string;
  debito: string;
  estado: string;
}

export default function HomologacionPage() {
  const [rows, setRows] = useState<DeclaracionIVA[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contabilidad/records?type=declaraciones_iva")
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
            <Scale className="h-8 w-8 text-emerald-600" />
            Homologación de Equipos
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Declaraciones IVA y homologación fiscal ante el SENIAT.
          </p>
        </div>
        <Button variant="outline" className="rounded-xl">
          <Download className="mr-2 h-4 w-4" /> Exportar
        </Button>
      </header>

      <Card className="border rounded-2xl shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-bold uppercase tracking-widest">Cargando declaraciones...</span>
            </div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold uppercase tracking-widest">Sin declaraciones registradas</p>
              <p className="text-xs text-muted-foreground/70">Las declaraciones IVA aparecerán aquí al ser registradas en el sistema.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="pl-8 font-bold text-[10px] uppercase">Período</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Fecha</TableHead>
                  <TableHead className="text-right font-bold text-[10px] uppercase">Base Imponible</TableHead>
                  <TableHead className="text-right font-bold text-[10px] uppercase">Crédito Fiscal</TableHead>
                  <TableHead className="text-right font-bold text-[10px] uppercase">Débito Fiscal</TableHead>
                  <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((d) => (
                  <TableRow key={d.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-8 font-bold text-xs">{d.periodo}</TableCell>
                    <TableCell className="text-xs">{d.fecha}</TableCell>
                    <TableCell className="text-right font-mono text-xs">{formatCurrency(parseFloat(d.base), "Bs.")}</TableCell>
                    <TableCell className="text-right font-mono text-xs text-emerald-600">{formatCurrency(parseFloat(d.credito), "Bs.")}</TableCell>
                    <TableCell className="text-right font-mono text-xs text-rose-600">{formatCurrency(parseFloat(d.debito), "Bs.")}</TableCell>
                    <TableCell className="text-right pr-8">
                      <Badge variant={d.estado === "declarada" ? "default" : "secondary"} className="text-[9px] uppercase">{d.estado}</Badge>
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
