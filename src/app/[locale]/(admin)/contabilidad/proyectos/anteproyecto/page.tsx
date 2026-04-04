"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Loader2, Inbox, Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/back-button";

interface Anteproyecto {
  id: number;
  codigo: string;
  titulo: string;
  presupuesto: number;
  estado: string;
  fecha: string;
}

export default function AnteproyectoPage() {
  const [rows, setRows] = useState<Anteproyecto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contabilidad/records?type=anteproyectos")
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
          <FileText className="h-8 w-8 text-primary" />
          Gestión de Anteproyectos
        </h1>
        <p className="text-muted-foreground text-sm font-medium">
          Borradores y diseños técnicos — control de inversión.
        </p>
      </header>

      <div className="flex justify-end">
        <Button variant="outline" className="rounded-xl">
          <Download className="mr-2 h-4 w-4" /> Exportar
        </Button>
      </div>

      <Card className="border rounded-2xl shadow-sm overflow-hidden">
        <CardHeader className="border-b bg-muted/30 px-8 py-6">
          <CardTitle className="text-sm font-black uppercase tracking-widest text-foreground">
            Legajo de Anteproyectos
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-bold uppercase tracking-widest">Cargando anteproyectos...</span>
            </div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold uppercase tracking-widest">Sin anteproyectos registrados</p>
              <p className="text-xs text-muted-foreground/70">Los borradores y diseños técnicos aparecerán aquí al ser cargados.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="pl-8 font-bold text-[10px] uppercase">Título / Referencia</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Fecha</TableHead>
                  <TableHead className="text-right font-bold text-[10px] uppercase">Presupuesto Est.</TableHead>
                  <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">Estatus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((ant) => (
                  <TableRow key={ant.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-8">
                      <div className="flex flex-col">
                        <span className="font-bold text-xs">{ant.titulo}</span>
                        <span className="text-[9px] font-mono text-muted-foreground">{ant.codigo}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">{ant.fecha}</TableCell>
                    <TableCell className="text-right font-mono text-xs font-bold">
                      {formatCurrency(ant.presupuesto, "USD")}
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <Badge variant={ant.estado === "Aprobado" ? "default" : "secondary"} className="text-[9px] uppercase">
                        {ant.estado}
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
