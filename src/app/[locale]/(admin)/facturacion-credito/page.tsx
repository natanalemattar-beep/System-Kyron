"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, CirclePlus as PlusCircle, CircleCheck as CircleCheck, Activity, DollarSign, TriangleAlert, Clock, Users, Zap, Loader2, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/back-button";
import { motion } from "framer-motion";
import { useCurrency } from "@/lib/currency-context";
import { CurrencySelector } from "@/components/currency-selector";

interface CuentaCobrar {
  id: number;
  cliente: string;
  rif: string;
  factura: string;
  fecha: string;
  vencimiento: string;
  monto: string;
  saldo: string;
  estado: string;
}

const estadoBadge: Record<string, string> = {
  pendiente: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  vencida: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  pagada: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  parcial: "bg-blue-500/10 text-blue-500 border-blue-500/20",
};

export default function FacturacionCreditoPage() {
  const { toast } = useToast();
  const { format: fmtCur } = useCurrency();
  const [cuentas, setCuentas] = useState<CuentaCobrar[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(() => {
    setLoading(true);
    fetch('/api/contabilidad/records?type=cuentas_cobrar&limit=50')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => setCuentas(d.rows ?? []))
      .catch(() => setCuentas([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const pendientes = cuentas.filter(c => c.estado === 'pendiente');
  const vencidas = cuentas.filter(c => c.estado === 'vencida');
  const pagadas = cuentas.filter(c => c.estado === 'pagada');

  const totalPendiente = pendientes.reduce((s, c) => s + parseFloat(c.saldo || c.monto), 0);
  const totalVencido = vencidas.reduce((s, c) => s + parseFloat(c.saldo || c.monto), 0);
  const totalCobrado = pagadas.reduce((s, c) => s + parseFloat(c.monto), 0);
  const clientesUnicos = new Set(cuentas.map(c => c.cliente)).size;

  return (
    <div className="space-y-8 pb-20 relative">
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.03] blur-[150px]" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.03] blur-[120px]" />
      </div>

      <BackButton href="/facturacion" label="Centro de Facturación" />

      <motion.header
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold uppercase tracking-wide text-emerald-600 mb-4">
            <CreditCard className="h-3 w-3" /> CENTRO DE FINANCIAMIENTO
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase leading-[1.05]">
            Ventas{' '}
            <span className="bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500 bg-clip-text text-transparent italic">a Crédito</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-40 mt-2">Gestión BNPL • Cuentas por Cobrar 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <CurrencySelector />
        </div>
      </motion.header>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Por Cobrar", val: loading ? "—" : fmtCur(totalPendiente), icon: Clock, color: "text-amber-500", change: `${pendientes.length} facturas` },
          { label: "Vencido", val: loading ? "—" : fmtCur(totalVencido), icon: TriangleAlert, color: "text-rose-500", change: `${vencidas.length} vencidas` },
          { label: "Cobrado", val: loading ? "—" : fmtCur(totalCobrado), icon: CircleCheck, color: "text-emerald-500", change: "facturas pagadas" },
          { label: "Clientes", val: loading ? "—" : String(clientesUnicos), icon: Users, color: "text-blue-500", change: "con crédito activo" },
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i + 0.2, duration: 0.4 }}>
            <Card className="glass-card border-none bg-card/50 p-5 rounded-2xl group hover:scale-[1.02] transition-all duration-300">
              <div className="flex justify-between items-start mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50">{kpi.label}</p>
                <div className={cn("p-2 rounded-xl border transition-transform group-hover:scale-110",
                  kpi.color === "text-amber-500" ? "bg-amber-500/10 border-amber-500/15" :
                  kpi.color === "text-rose-500" ? "bg-rose-500/10 border-rose-500/15" :
                  kpi.color === "text-emerald-500" ? "bg-emerald-500/10 border-emerald-500/15" :
                  "bg-blue-500/10 border-blue-500/15"
                )}>
                  <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground tracking-tight">{kpi.val}</p>
              <p className="text-[10px] text-muted-foreground/50 font-bold mt-1">{kpi.change}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
        <CardHeader className="p-6 border-b border-border/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/15">
                <CreditCard className="h-4 w-4 text-emerald-500" />
              </div>
              <CardTitle className="text-sm font-bold uppercase tracking-widest">Cuentas por Cobrar</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-semibold">Cargando cuentas...</span>
            </div>
          ) : cuentas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10 opacity-30" />
              <p className="text-sm font-bold">Sin cuentas por cobrar</p>
              <p className="text-xs text-center max-w-xs">No hay facturas de crédito registradas. Las cuentas por cobrar aparecerán aquí cuando registres facturas con crédito.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/10 border-none">
                  <TableHead className="pl-6 py-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40">Cliente</TableHead>
                  <TableHead className="py-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40">Factura</TableHead>
                  <TableHead className="text-center py-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40">Vencimiento</TableHead>
                  <TableHead className="text-right py-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40">Saldo</TableHead>
                  <TableHead className="text-center pr-6 py-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cuentas.map(c => (
                  <TableRow key={c.id} className="border-border/20 hover:bg-muted/10 transition-all">
                    <TableCell className="pl-6 py-4">
                      <p className="font-bold text-xs text-foreground">{c.cliente}</p>
                      <p className="text-[11px] text-muted-foreground">{c.rif}</p>
                    </TableCell>
                    <TableCell className="text-xs font-mono text-primary font-bold">{c.factura}</TableCell>
                    <TableCell className="text-center text-xs text-muted-foreground">{c.vencimiento}</TableCell>
                    <TableCell className="text-right font-mono text-xs font-bold text-foreground">{fmtCur(parseFloat(c.saldo || c.monto))}</TableCell>
                    <TableCell className="text-center pr-6">
                      <Badge className={cn("text-[10px] font-bold capitalize", estadoBadge[c.estado] ?? "bg-muted/30")}>
                        {c.estado}
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
