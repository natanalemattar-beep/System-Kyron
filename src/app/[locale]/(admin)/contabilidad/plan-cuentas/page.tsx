"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Search, ChevronRight, ChevronDown, Hash, Loader2, Inbox, Printer } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";

type Cuenta = {
  codigo: string;
  nombre: string;
  tipo: string;
  naturaleza: string;
  nivel: number;
  saldo?: string;
  subcuentas?: Cuenta[];
};

const tipoColors: Record<string, { text: string; bg: string }> = {
  activo: { text: "text-primary", bg: "bg-primary/10" },
  pasivo: { text: "text-rose-500", bg: "bg-rose-500/10" },
  patrimonio: { text: "text-violet-500", bg: "bg-violet-500/10" },
  ingreso: { text: "text-emerald-500", bg: "bg-emerald-500/10" },
  costo: { text: "text-amber-500", bg: "bg-amber-500/10" },
  gasto: { text: "text-orange-500", bg: "bg-orange-500/10" },
  orden: { text: "text-cyan-500", bg: "bg-cyan-500/10" },
};

function CuentaRow({ cuenta, depth = 0 }: { cuenta: Cuenta; depth?: number }) {
  const [open, setOpen] = useState(depth < 2);
  const hasSub = cuenta.subcuentas && cuenta.subcuentas.length > 0;
  const tc = tipoColors[cuenta.tipo] || tipoColors.activo;

  return (
    <>
      <div
        className={cn(
          "flex items-center gap-2 py-2.5 px-4 hover:bg-muted/30 transition-colors cursor-pointer border-b border-border/30",
          depth === 0 && "bg-muted/20 font-bold"
        )}
        style={{ paddingLeft: `${16 + depth * 24}px` }}
        onClick={() => hasSub && setOpen(!open)}
      >
        <div className="w-5 flex items-center justify-center">
          {hasSub ? (
            open ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          ) : (
            <Hash className="h-3 w-3 text-muted-foreground/40" />
          )}
        </div>
        <span className="font-mono text-[11px] text-muted-foreground w-16 shrink-0">{cuenta.codigo}</span>
        <span className={cn("flex-1 text-xs", depth === 0 ? "font-black uppercase tracking-wide" : "font-medium")}>{cuenta.nombre}</span>
        <Badge className={cn("text-[8px] font-bold uppercase border-none", tc.bg, tc.text)}>{cuenta.naturaleza}</Badge>
        {cuenta.saldo && (
          <span className={cn("text-xs font-mono font-bold w-40 text-right", tc.text)}>{cuenta.saldo}</span>
        )}
      </div>
      {open && hasSub && cuenta.subcuentas!.map(sub => (
        <CuentaRow key={sub.codigo} cuenta={sub} depth={depth + 1} />
      ))}
    </>
  );
}

export default function PlanCuentasPage() {
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch('/api/contabilidad/records?type=plan_cuentas')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => setCuentas(d.rows ?? []))
      .catch(() => setCuentas([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = cuentas.filter(c =>
    !search || c.nombre.toLowerCase().includes(search.toLowerCase()) || c.codigo.includes(search)
  );

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad" label="Contabilidad" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">
              <BookOpen className="h-3.5 w-3.5" /> Catálogo Contable
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Plan de <span className="text-primary">Cuentas</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">VEN-NIF · Catálogo configurable · Partida doble</p>
          </div>
          <Button variant="outline" onClick={() => window.print()} className="rounded-xl">
            <Printer className="mr-2 h-4 w-4" /> Imprimir
          </Button>
        </div>
      </header>

      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar cuenta por código o nombre..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-12 h-12 rounded-xl"
        />
      </div>

      <Card className="rounded-2xl border shadow-lg overflow-hidden">
        <CardHeader className="p-6 border-b bg-muted/30">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" /> Estructura del Plan de Cuentas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-semibold">Cargando plan de cuentas...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">Sin plan de cuentas configurado</p>
              <p className="text-xs text-muted-foreground/70">Configure el plan de cuentas VEN-NIF para comenzar a registrar operaciones.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 px-4 py-2 bg-muted/10 border-b text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                <span className="w-5" />
                <span className="w-16">Código</span>
                <span className="flex-1">Nombre de la Cuenta</span>
                <span className="w-20 text-center">Naturaleza</span>
                <span className="w-40 text-right">Saldo</span>
              </div>
              {filtered.map(cuenta => (
                <CuentaRow key={cuenta.codigo} cuenta={cuenta} />
              ))}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
