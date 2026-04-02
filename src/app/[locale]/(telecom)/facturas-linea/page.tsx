"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Receipt, FileText, DollarSign, Clock, CircleCheck,
  Download, Eye, Filter, Loader2, Calendar
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

type FacturaTelecom = {
  id: number;
  linea_id: number | null;
  periodo: string;
  fecha_emision: string;
  fecha_vencimiento: string | null;
  monto: string;
  moneda: string;
  estado: string;
  numero_factura: string | null;
  linea_numero: string | null;
  operadora: string | null;
};

const ESTADO_COLORS: Record<string, string> = {
  pendiente: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  pagada: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  vencida: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  en_disputa: "bg-orange-500/10 text-orange-500 border-orange-500/20",
};

const ESTADO_LABELS: Record<string, string> = {
  pendiente: "Pendiente",
  pagada: "Pagada",
  vencida: "Vencida",
  en_disputa: "En Disputa",
};

export default function FacturasLineaPage() {
  const { toast } = useToast();
  const [facturas, setFacturas] = useState<FacturaTelecom[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<string>("todas");

  const fetchFacturas = useCallback(async () => {
    try {
      const res = await fetch("/api/telecom");
      if (!res.ok) throw new Error("Error al cargar");
      const data = await res.json();
      setFacturas(data.facturas || []);
    } catch {
      toast({ variant: "destructive", title: "Error", description: "No se pudieron cargar las facturas." });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchFacturas(); }, [fetchFacturas]);

  const facturasFiltradas = filtro === "todas" ? facturas : facturas.filter(f => f.estado === filtro);
  const totalPendiente = facturas.filter(f => f.estado === "pendiente").reduce((s, f) => s + parseFloat(f.monto || "0"), 0);
  const totalPagado = facturas.filter(f => f.estado === "pagada").reduce((s, f) => s + parseFloat(f.monto || "0"), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto" />
          <p className="text-xs text-muted-foreground">Cargando facturas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="pt-6 pb-2">
        <div className="flex items-center gap-2 mb-1">
          <Receipt className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Mi Línea Personal</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Mis Facturas</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Historial de facturación de tus líneas telefónicas.</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Facturas", val: `${facturas.length}`, icon: FileText, color: "text-primary", accent: "from-primary/20 to-primary/0", ring: "ring-primary/20", iconBg: "bg-primary/10" },
          { label: "Pendientes", val: `${facturas.filter(f => f.estado === 'pendiente').length}`, icon: Clock, color: "text-amber-500", accent: "from-amber-500/20 to-amber-500/0", ring: "ring-amber-500/20", iconBg: "bg-amber-500/10" },
          { label: "Monto Pendiente", val: formatCurrency(totalPendiente, 'USD'), icon: DollarSign, color: "text-rose-500", accent: "from-rose-500/20 to-rose-500/0", ring: "ring-rose-500/20", iconBg: "bg-rose-500/10" },
          { label: "Total Pagado", val: formatCurrency(totalPagado, 'USD'), icon: CircleCheck, color: "text-emerald-500", accent: "from-emerald-500/20 to-emerald-500/0", ring: "ring-emerald-500/20", iconBg: "bg-emerald-500/10" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className={cn("kyron-surface p-4 rounded-xl ring-1 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden relative", stat.ring)}>
              <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r", stat.accent)} />
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                <div className={cn("p-1.5 rounded-lg", stat.iconBg)}>
                  <stat.icon className={cn("h-3 w-3", stat.color)} />
                </div>
              </div>
              <p className={cn("text-xl font-black tracking-tight", stat.color)}>{stat.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">Historial de Facturas</CardTitle>
              <CardDescription className="text-[10px] text-muted-foreground">
                {facturasFiltradas.length} factura{facturasFiltradas.length !== 1 ? 's' : ''}
              </CardDescription>
            </div>
          </div>
          <div className="flex gap-1.5">
            {["todas", "pendiente", "pagada", "vencida"].map(f => (
              <Button
                key={f}
                variant={filtro === f ? "default" : "outline"}
                size="sm"
                className="h-7 px-2.5 rounded-lg text-[10px] font-semibold"
                onClick={() => setFiltro(f)}
              >
                {f === "todas" ? "Todas" : ESTADO_LABELS[f]}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {facturasFiltradas.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Receipt className="h-8 w-8 text-muted-foreground/30 mx-auto" />
              <p className="text-sm text-muted-foreground/60">No hay facturas registradas</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/10 border-border/30 hover:bg-muted/10">
                    <TableHead className="pl-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Nº Factura</TableHead>
                    <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Período</TableHead>
                    <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Línea</TableHead>
                    <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-right">Monto</TableHead>
                    <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center">Estado</TableHead>
                    <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center">Vencimiento</TableHead>
                    <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-right pr-5"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facturasFiltradas.map((f) => (
                    <TableRow key={f.id} className="border-border/30 hover:bg-muted/5 transition-colors">
                      <TableCell className="pl-5 py-3 text-xs font-mono font-semibold text-foreground">
                        {f.numero_factura || `FAC-${String(f.id).padStart(5, '0')}`}
                      </TableCell>
                      <TableCell className="text-xs text-foreground">{f.periodo}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {f.linea_numero || '—'} {f.operadora ? `(${f.operadora})` : ''}
                      </TableCell>
                      <TableCell className="text-right text-sm font-bold text-foreground tabular-nums">
                        {formatCurrency(parseFloat(f.monto || '0'), f.moneda || 'USD')}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={cn("text-[10px] px-2 py-0.5", ESTADO_COLORS[f.estado] || '')}>
                          {ESTADO_LABELS[f.estado] || f.estado}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center text-[11px] text-muted-foreground">
                        {f.fecha_vencimiento ? new Date(f.fecha_vencimiento).toLocaleDateString('es-VE') : '—'}
                      </TableCell>
                      <TableCell className="text-right pr-5">
                        <div className="flex gap-1 justify-end">
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md" onClick={async () => { try { const res = await fetch('/api/solicitudes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categoria: 'telecom', subcategoria: 'factura', descripcion: "Factura" }) }); if (res.ok) toast({ title: "Factura", description: `Visualizando factura ${f.numero_factura || f.id}` }); else toast({ title: "Error", variant: "destructive" }); } catch { toast({ title: "Error de conexión", variant: "destructive" }); } }}>
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md" onClick={async () => { try { const res = await fetch('/api/solicitudes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categoria: 'telecom', subcategoria: 'descarga', descripcion: "Descarga" }) }); if (res.ok) toast({ title: "Descarga", description: "Generando PDF..." }); else toast({ title: "Error", variant: "destructive" }); } catch { toast({ title: "Error de conexión", variant: "destructive" }); } }}>
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
