"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Hammer, Loader2, Inbox, Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BackButton } from "@/components/back-button";

interface Proyecto {
  id: number;
  codigo: string;
  nombre: string;
  progreso: number;
  presupuesto: number;
  fecha_limite: string;
  estado: string;
}

export default function ProyectoMaestroPage() {
  const [rows, setRows] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contabilidad/records?type=proyectos")
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
          <Hammer className="h-8 w-8 text-primary" />
          Gestión de Proyectos
        </h1>
        <p className="text-muted-foreground text-sm font-medium">
          Control de ejecución presupuestaria y seguimiento de hitos.
        </p>
      </header>

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
              <span className="text-sm font-bold uppercase tracking-widest">Cargando proyectos...</span>
            </div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold uppercase tracking-widest">Sin proyectos registrados</p>
              <p className="text-xs text-muted-foreground/70">Los proyectos en ejecución aparecerán aquí al ser cargados en el sistema.</p>
            </div>
          ) : (
            <div className="divide-y">
              {rows.map((pro) => (
                <div key={pro.id} className="p-6 md:p-8 space-y-4 hover:bg-muted/30 transition-colors">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <Badge variant={pro.estado === "Completado" ? "default" : "secondary"} className="text-[9px] uppercase">
                          {pro.estado}
                        </Badge>
                        <span className="font-mono text-[10px] text-muted-foreground">{pro.codigo}</span>
                      </div>
                      <h3 className="text-lg font-black uppercase tracking-tight">{pro.nombre}</h3>
                      <p className="text-xs text-muted-foreground">Fecha límite: {pro.fecha_limite}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Presupuesto</p>
                      <p className="text-2xl font-black text-primary">{formatCurrency(pro.presupuesto, "USD")}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Progreso</span>
                      <span className="font-bold">{pro.progreso}%</span>
                    </div>
                    <Progress value={pro.progreso} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
