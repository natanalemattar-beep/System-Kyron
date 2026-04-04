"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Heart, Loader2, Inbox, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/back-button";

interface Beneficiario {
  id: number;
  nombre: string;
  cargo: string;
  plan: string;
  beneficiarios: number;
  estado: string;
  vencimiento: string;
}

export default function ChevereSaludPage() {
  const [rows, setRows] = useState<Beneficiario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contabilidad/records?type=chevere_salud")
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
          <Heart className="h-8 w-8 text-rose-500" />
          Chévere Salud
        </h1>
        <p className="text-muted-foreground text-sm font-medium">
          Cobertura médica corporativa para empleados y directivos.
        </p>
      </header>

      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 flex items-start gap-4">
        <Heart className="h-5 w-5 text-rose-500 mt-0.5 shrink-0" />
        <p className="text-sm text-rose-800">
          Los costos de la cobertura médica corporativa con Chévere Salud se integran
          automáticamente en el módulo contable para su registro como gasto deducible
          conforme a la normativa venezolana.
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
              <span className="text-sm font-bold uppercase tracking-widest">Cargando beneficiarios...</span>
            </div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold uppercase tracking-widest">Sin beneficiarios registrados</p>
              <p className="text-xs text-muted-foreground/70">Los empleados cubiertos por Chévere Salud aparecerán aquí al ser registrados.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="pl-8 font-bold text-[10px] uppercase">Nombre</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Cargo</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Plan</TableHead>
                  <TableHead className="text-center font-bold text-[10px] uppercase">Beneficiarios</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Vencimiento</TableHead>
                  <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((e) => (
                  <TableRow key={e.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-8 text-xs font-bold">{e.nombre}</TableCell>
                    <TableCell className="text-xs">{e.cargo}</TableCell>
                    <TableCell className="text-xs font-medium">{e.plan}</TableCell>
                    <TableCell className="text-center text-xs">{e.beneficiarios}</TableCell>
                    <TableCell className="text-xs">{e.vencimiento}</TableCell>
                    <TableCell className="text-right pr-8">
                      <Badge variant={e.estado === "ACTIVO" ? "default" : "secondary"} className="text-[9px] uppercase">
                        {e.estado}
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
