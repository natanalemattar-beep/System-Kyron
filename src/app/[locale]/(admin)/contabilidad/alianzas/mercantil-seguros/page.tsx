"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Shield, Loader2, Inbox, Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/back-button";

interface Poliza {
  id: number;
  numero: string;
  tipo: string;
  cobertura: string;
  prima: string;
  vencimiento: string;
  estado: string;
}

export default function MercantilSegurosPage() {
  const [rows, setRows] = useState<Poliza[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contabilidad/records?type=polizas_mercantil")
      .then((r) => (r.ok ? r.json() : { rows: [] }))
      .then((d) => setRows(d.rows ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-background">
      <BackButton href="/contabilidad" label="Volver al Centro Contable" />

      <header className="space-y-1">
        <h1 className="text-3xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
          <Shield className="h-8 w-8 text-blue-600" />
          Mercantil Seguros
        </h1>
        <p className="text-muted-foreground text-sm font-medium">
          Pólizas de responsabilidad civil, activos, riesgo laboral y salud colectiva.
        </p>
      </header>

      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 flex items-start gap-4">
        <Shield className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
        <p className="text-sm text-blue-800">
          Las pólizas contratadas con Mercantil Seguros se registran automáticamente
          en el módulo contable para su correcta deducción fiscal conforme a la
          normativa VEN-NIF.
        </p>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" className="rounded-xl">
          <Download className="mr-2 h-4 w-4" /> Exportar
        </Button>
      </div>

      <Card className="border rounded-2xl shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-bold uppercase tracking-widest">Cargando pólizas...</span>
            </div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold uppercase tracking-widest">Sin pólizas registradas</p>
              <p className="text-xs text-muted-foreground/70">Las pólizas con Mercantil Seguros aparecerán aquí al ser registradas.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="pl-8 font-bold text-[10px] uppercase">N° Póliza</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Tipo</TableHead>
                  <TableHead className="text-right font-bold text-[10px] uppercase">Cobertura</TableHead>
                  <TableHead className="text-right font-bold text-[10px] uppercase">Prima</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Vencimiento</TableHead>
                  <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((p) => (
                  <TableRow key={p.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-8 font-mono text-xs font-bold">{p.numero}</TableCell>
                    <TableCell className="text-xs font-medium">{p.tipo}</TableCell>
                    <TableCell className="text-right font-mono text-xs">{p.cobertura}</TableCell>
                    <TableCell className="text-right font-mono text-xs">{p.prima}</TableCell>
                    <TableCell className="text-xs">{p.vencimiento}</TableCell>
                    <TableCell className="text-right pr-8">
                      <Badge variant={p.estado === "VIGENTE" ? "default" : "secondary"} className="text-[9px] uppercase">
                        {p.estado}
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
