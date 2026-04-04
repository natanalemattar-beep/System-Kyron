"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Search, ArrowRightLeft, Loader2, Inbox, Printer, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";

interface Asiento {
  numero: string;
  fecha: string;
  descripcion: string;
  tipo: string;
  estado: string;
  totalDebe: string;
  totalHaber: string;
  partidas?: { cuenta: string; debe: string; haber: string }[];
}

const tipoColor: Record<string, string> = {
  Ingreso: "bg-emerald-500/10 text-emerald-500",
  Gasto: "bg-rose-500/10 text-rose-500",
  Costo: "bg-amber-500/10 text-amber-500",
  Ajuste: "bg-violet-500/10 text-violet-500",
};

export default function AsientosContablesPage() {
  const [rows, setRows] = useState<Asiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/contabilidad/records?type=asientos')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => setRows(d.rows ?? []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = rows.filter(a =>
    !search || a.descripcion?.toLowerCase().includes(search.toLowerCase()) || a.numero?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad" label="Contabilidad" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">
              <ArrowRightLeft className="h-3.5 w-3.5" /> Partida Doble
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Asientos <span className="text-primary">Contables</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Registros de partida doble · Debe = Haber · Auditoría integrada</p>
          </div>
          <Button variant="outline" onClick={() => window.print()} className="rounded-xl">
            <Printer className="mr-2 h-4 w-4" /> Imprimir
          </Button>
        </div>
      </header>

      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar asiento por número o descripción..."
          className="pl-12 h-12 rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-semibold">Cargando asientos...</span>
        </div>
      ) : filtered.length === 0 ? (
        <Card className="rounded-2xl border">
          <CardContent className="p-0">
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">Sin asientos contables</p>
              <p className="text-xs text-muted-foreground/70">Los asientos aparecerán al registrar operaciones contables.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((asiento) => (
            <Card key={asiento.numero} className="rounded-2xl border overflow-hidden hover:border-primary/30 transition-colors">
              <div
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/20 transition-colors"
                onClick={() => setExpandedId(expandedId === asiento.numero ? null : asiento.numero)}
              >
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary">{asiento.numero}</span>
                    <Badge className={cn("text-[9px] font-bold border-none", tipoColor[asiento.tipo] || 'bg-muted text-muted-foreground')}>{asiento.tipo}</Badge>
                  </div>
                  <p className="text-xs text-foreground font-medium mt-0.5 truncate">{asiento.descripcion}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[11px] text-muted-foreground">{asiento.fecha}</p>
                  <p className="text-xs font-bold text-foreground">{asiento.totalDebe}</p>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-500 text-[9px] font-bold border-none">{asiento.estado}</Badge>
              </div>
              {expandedId === asiento.numero && asiento.partidas && (
                <div className="border-t bg-muted/10 p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-[10px] font-bold">Cuenta</TableHead>
                        <TableHead className="text-[10px] font-bold text-right">Debe</TableHead>
                        <TableHead className="text-[10px] font-bold text-right">Haber</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {asiento.partidas.map((p, j) => (
                        <TableRow key={j}>
                          <TableCell className="text-xs">{p.cuenta}</TableCell>
                          <TableCell className="text-xs font-mono text-right text-emerald-600">{p.debe || '—'}</TableCell>
                          <TableCell className="text-xs font-mono text-right text-rose-500">{p.haber || '—'}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="border-t-2">
                        <TableCell className="text-xs font-bold">TOTALES</TableCell>
                        <TableCell className="text-xs font-mono font-bold text-right text-emerald-600">{asiento.totalDebe}</TableCell>
                        <TableCell className="text-xs font-mono font-bold text-right text-rose-500">{asiento.totalHaber}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
