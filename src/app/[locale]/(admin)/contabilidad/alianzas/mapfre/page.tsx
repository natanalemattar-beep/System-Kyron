"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Car, Loader2, Inbox, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/back-button";

interface PolizaVehiculo {
  id: number;
  placa: string;
  vehiculo: string;
  tipo: string;
  prima: string;
  valor: string;
  vencimiento: string;
  estado: string;
}

export default function MapfrePage() {
  const [rows, setRows] = useState<PolizaVehiculo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contabilidad/records?type=polizas_mapfre")
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
          <Car className="h-8 w-8 text-red-600" />
          Mapfre Seguros
        </h1>
        <p className="text-muted-foreground text-sm font-medium">
          Seguro de flota vehicular, accidentes laborales y cobertura patrimonial.
        </p>
      </header>

      <div className="rounded-2xl border border-red-200 bg-red-50 p-5 flex items-start gap-4">
        <Car className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
        <p className="text-sm text-red-800">
          Las primas de seguros vehiculares y patrimoniales con Mapfre se registran
          automáticamente en contabilidad para su correcta deducción fiscal.
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
              <p className="text-xs text-muted-foreground/70">Las pólizas vehiculares y patrimoniales con Mapfre aparecerán aquí.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="pl-8 font-bold text-[10px] uppercase">Placa</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Vehículo</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Tipo</TableHead>
                  <TableHead className="text-right font-bold text-[10px] uppercase">Prima</TableHead>
                  <TableHead className="text-right font-bold text-[10px] uppercase">Valor Asegurado</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Vencimiento</TableHead>
                  <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((v) => (
                  <TableRow key={v.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-8 font-mono text-xs font-bold">{v.placa}</TableCell>
                    <TableCell className="text-xs font-medium">{v.vehiculo}</TableCell>
                    <TableCell className="text-xs">{v.tipo}</TableCell>
                    <TableCell className="text-right font-mono text-xs">{v.prima}</TableCell>
                    <TableCell className="text-right font-mono text-xs">{v.valor}</TableCell>
                    <TableCell className="text-xs">{v.vencimiento}</TableCell>
                    <TableCell className="text-right pr-8">
                      <Badge variant={v.estado === "VIGENTE" ? "default" : "secondary"} className="text-[9px] uppercase">
                        {v.estado}
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
