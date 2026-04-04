"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Loader2, Inbox, Download, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/back-button";

interface Manual {
  id: number;
  codigo: string;
  titulo: string;
  descripcion: string;
  estado: string;
  ultima_revision: string;
  responsable: string;
}

export default function IsoManualsPage() {
  const [rows, setRows] = useState<Manual[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/contabilidad/records?type=manuales_iso")
      .then((r) => (r.ok ? r.json() : { rows: [] }))
      .then((d) => setRows(d.rows ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = rows.filter(
    (m) =>
      m.titulo?.toLowerCase().includes(search.toLowerCase()) ||
      m.codigo?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-background">
      <BackButton href="/contabilidad" label="Volver al Centro Contable" />

      <header className="space-y-1">
        <h1 className="text-3xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-emerald-600" />
          Manuales ISO 9001
        </h1>
        <p className="text-muted-foreground text-sm font-medium">
          Sistema de Gestión de Calidad — Certificación ISO 9001:2015.
        </p>
      </header>

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 flex items-start gap-4">
        <ShieldCheck className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
        <p className="text-sm text-emerald-800">
          Los manuales y procedimientos del SGC se gestionan conforme al estándar
          ISO 9001:2015. Cada documento es revisado periódicamente para garantizar
          el cumplimiento normativo y la mejora continua.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar manual o procedimiento..."
            className="pl-10 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="rounded-xl">
          <Download className="mr-2 h-4 w-4" /> Exportar
        </Button>
      </div>

      <Card className="border rounded-2xl shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-bold uppercase tracking-widest">Cargando manuales...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold uppercase tracking-widest">Sin manuales registrados</p>
              <p className="text-xs text-muted-foreground/70">Los manuales y procedimientos ISO 9001 aparecerán aquí al ser cargados.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="pl-8 font-bold text-[10px] uppercase">Código</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Título</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Responsable</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Última Revisión</TableHead>
                  <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((m) => (
                  <TableRow key={m.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-8 font-mono text-xs font-bold">{m.codigo}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold">{m.titulo}</span>
                        <span className="text-[10px] text-muted-foreground">{m.descripcion}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">{m.responsable}</TableCell>
                    <TableCell className="text-xs">{m.ultima_revision}</TableCell>
                    <TableCell className="text-right pr-8">
                      <Badge variant="default" className="text-[9px] uppercase">{m.estado}</Badge>
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
