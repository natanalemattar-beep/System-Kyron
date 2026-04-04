"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Phone, Loader2, Inbox, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BackButton } from "@/components/back-button";

interface Linea {
  id: number;
  numero: string;
  titular: string;
  extension: string;
  minutos: number;
  plan: string;
  estado: string;
}

export default function TelefoniaCorporativaPage() {
  const [rows, setRows] = useState<Linea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contabilidad/records?type=telefonia_corporativa")
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
            <Phone className="h-8 w-8 text-indigo-500" />
            Telefonía Corporativa
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Líneas telefónicas con planes integrados — PBX · Extensiones · Reportes.
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
              <span className="text-sm font-bold uppercase tracking-widest">Cargando líneas...</span>
            </div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold uppercase tracking-widest">Sin líneas corporativas registradas</p>
              <p className="text-xs text-muted-foreground/70">Las líneas telefónicas corporativas aparecerán aquí al ser configuradas.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="pl-8 font-bold text-[10px] uppercase">Número</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Titular</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Extensión</TableHead>
                  <TableHead className="text-right font-bold text-[10px] uppercase">Minutos Usados</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Plan</TableHead>
                  <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((l) => (
                  <TableRow key={l.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-8 font-mono text-xs font-bold">{l.numero}</TableCell>
                    <TableCell className="text-xs font-medium">{l.titular}</TableCell>
                    <TableCell className="text-xs font-mono">{l.extension}</TableCell>
                    <TableCell className="text-right text-xs">{l.minutos} min</TableCell>
                    <TableCell className="text-xs">{l.plan}</TableCell>
                    <TableCell className="text-right pr-8">
                      <Badge variant={l.estado === "ACTIVA" ? "default" : "secondary"} className="text-[9px] uppercase">
                        {l.estado}
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
