"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import {
  BookOpen, ArrowLeft, Search, Printer, Loader2, Inbox,
  TrendingUp, TrendingDown, Scale, Wallet, Landmark, ArrowRight
} from "lucide-react";

interface CuentaMayor {
  id: number;
  codigo: string;
  nombre: string;
  naturaleza: string;
  grupo: string;
  saldo_debe: number;
  saldo_haber: number;
}

export default function LibroMayorPage() {
  const [rows, setRows] = useState<CuentaMayor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterGrupo, setFilterGrupo] = useState<string>("todos");

  useEffect(() => {
    fetch('/api/contabilidad/records?type=cuentas_mayor')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => setRows(d.rows ?? []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, []);

  const grupos = useMemo(() => [...new Set(rows.map(c => c.grupo))], [rows]);

  const filtered = useMemo(() => {
    return rows.filter(c => {
      const matchSearch = !search ||
        c.nombre?.toLowerCase().includes(search.toLowerCase()) ||
        c.codigo?.includes(search);
      const matchGrupo = filterGrupo === "todos" || c.grupo === filterGrupo;
      return matchSearch && matchGrupo;
    });
  }, [rows, search, filterGrupo]);

  const getSaldo = (c: CuentaMayor) => {
    return c.naturaleza === 'deudora'
      ? (c.saldo_debe || 0) - (c.saldo_haber || 0)
      : (c.saldo_haber || 0) - (c.saldo_debe || 0);
  };

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad/libros" label="Libros Contables" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">
              <BookOpen className="h-3.5 w-3.5" /> Libro Obligatorio · Art. 34 C. Comercio
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Libro <span className="text-primary">Mayor</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Mayores analíticos por cuenta · Saldos en tiempo real · VEN-NIF</p>
          </div>
          <Button variant="outline" onClick={() => window.print()} className="rounded-xl">
            <Printer className="mr-2 h-4 w-4" /> Imprimir
          </Button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cuenta por código o nombre..."
            className="pl-12 h-12 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {grupos.length > 0 && (
          <Select value={filterGrupo} onValueChange={setFilterGrupo}>
            <SelectTrigger className="w-[250px] h-12 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los grupos</SelectItem>
              {grupos.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
        )}
      </div>

      <Card className="rounded-2xl border shadow-lg overflow-hidden">
        <CardHeader className="p-6 border-b bg-muted/30">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Scale className="h-4 w-4 text-primary" /> Plan de Cuentas — Saldos al Cierre
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-semibold">Cargando cuentas...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">Sin cuentas registradas</p>
              <p className="text-xs text-muted-foreground/70">Las cuentas aparecerán aquí al configurar el plan de cuentas.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead className="pl-6 py-4 text-xs font-semibold">Código</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Cuenta</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Grupo</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Naturaleza</TableHead>
                  <TableHead className="text-right pr-6 py-4 text-xs font-semibold">Saldo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => {
                  const saldo = getSaldo(c);
                  return (
                    <TableRow key={c.id || c.codigo} className="hover:bg-muted/10">
                      <TableCell className="pl-6 py-4 font-mono text-xs font-bold text-primary">{c.codigo}</TableCell>
                      <TableCell className="py-4 text-xs font-semibold">{c.nombre}</TableCell>
                      <TableCell className="py-4">
                        <Badge className="text-[10px] font-semibold border-none bg-muted text-muted-foreground">{c.grupo}</Badge>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge className={cn("text-[10px] font-semibold border-none",
                          c.naturaleza === 'deudora' ? 'bg-blue-500/10 text-blue-500' : 'bg-violet-500/10 text-violet-500'
                        )}>
                          {c.naturaleza}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6 py-4">
                        <span className={cn("font-mono text-sm font-bold", saldo >= 0 ? "text-emerald-500" : "text-rose-500")}>
                          {formatCurrency(Math.abs(saldo), 'Bs.')}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
        {rows.length > 0 && (
          <CardFooter className="p-6 border-t">
            <p className="text-xs text-muted-foreground">{filtered.length} cuentas · Saldos sincronizados con Libro Diario</p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
