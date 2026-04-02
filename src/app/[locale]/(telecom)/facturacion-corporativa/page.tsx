"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  FileSpreadsheet, DollarSign, Calendar, Download, CircleCheck,
  Clock, Building2, TrendingUp, FileText, CreditCard
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const FACTURAS_CORP = [
  { id: "FC-001", periodo: "Marzo 2026", depto: "Ventas", lineas: 8, monto: 520, estado: "pendiente", vencimiento: "15/04/2026" },
  { id: "FC-002", periodo: "Marzo 2026", depto: "Marketing", lineas: 4, monto: 280, estado: "pendiente", vencimiento: "15/04/2026" },
  { id: "FC-003", periodo: "Marzo 2026", depto: "IT", lineas: 6, monto: 190, estado: "pagada", vencimiento: "15/04/2026" },
  { id: "FC-004", periodo: "Febrero 2026", depto: "Ventas", lineas: 8, monto: 495, estado: "pagada", vencimiento: "15/03/2026" },
  { id: "FC-005", periodo: "Febrero 2026", depto: "Marketing", lineas: 4, monto: 260, estado: "pagada", vencimiento: "15/03/2026" },
  { id: "FC-006", periodo: "Febrero 2026", depto: "RR.HH.", lineas: 3, monto: 115, estado: "pagada", vencimiento: "15/03/2026" },
  { id: "FC-007", periodo: "Enero 2026", depto: "Dirección", lineas: 3, monto: 250, estado: "pagada", vencimiento: "15/02/2026" },
  { id: "FC-008", periodo: "Enero 2026", depto: "Contabilidad", lineas: 2, monto: 80, estado: "pagada", vencimiento: "15/02/2026" },
];

const ESTADO_COLORS: Record<string, string> = {
  pendiente: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  pagada: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  vencida: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

export default function FacturacionCorporativaPage() {
  const { toast } = useToast();

  const totalPendiente = FACTURAS_CORP.filter(f => f.estado === "pendiente").reduce((s, f) => s + f.monto, 0);
  const totalPagado = FACTURAS_CORP.filter(f => f.estado === "pagada").reduce((s, f) => s + f.monto, 0);
  const facturasPendientes = FACTURAS_CORP.filter(f => f.estado === "pendiente").length;

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileSpreadsheet className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Mi Línea Empresa</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Facturación Corporativa</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Facturación consolidada por departamento y línea corporativa.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9 rounded-lg text-xs font-semibold"
            onClick={async () => { try { const res = await fetch('/api/solicitudes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categoria: 'telecom', subcategoria: 'exportando', descripcion: "Exportando" }) }); if (res.ok) toast({ title: "Exportando", description: "Generando reporte de facturación..." }); else toast({ title: "Error", variant: "destructive" }); } catch { toast({ title: "Error de conexión", variant: "destructive" }); } }}>
            <Download className="mr-1.5 h-3.5 w-3.5" /> Exportar
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Pendiente", val: formatCurrency(totalPendiente, 'USD'), icon: Clock, color: "text-amber-500", accent: "from-amber-500/20 to-amber-500/0", ring: "ring-amber-500/20", iconBg: "bg-amber-500/10" },
          { label: "Total Pagado", val: formatCurrency(totalPagado, 'USD'), icon: CircleCheck, color: "text-emerald-500", accent: "from-emerald-500/20 to-emerald-500/0", ring: "ring-emerald-500/20", iconBg: "bg-emerald-500/10" },
          { label: "Facturas Pendientes", val: `${facturasPendientes}`, icon: FileText, color: facturasPendientes > 0 ? "text-amber-500" : "text-emerald-500", accent: facturasPendientes > 0 ? "from-amber-500/20 to-amber-500/0" : "from-emerald-500/20 to-emerald-500/0", ring: facturasPendientes > 0 ? "ring-amber-500/20" : "ring-emerald-500/20", iconBg: facturasPendientes > 0 ? "bg-amber-500/10" : "bg-emerald-500/10" },
          { label: "Costo Promedio", val: formatCurrency(totalPagado / FACTURAS_CORP.filter(f => f.estado === 'pagada').length, 'USD'), icon: TrendingUp, color: "text-primary", accent: "from-primary/20 to-primary/0", ring: "ring-primary/20", iconBg: "bg-primary/10" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className={cn("kyron-surface p-4 rounded-xl ring-1 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden relative", stat.ring)}>
              <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r", stat.accent)} />
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                <div className={cn("p-1.5 rounded-lg", stat.iconBg)}><stat.icon className={cn("h-3 w-3", stat.color)} /></div>
              </div>
              <p className={cn("text-xl font-black tracking-tight", stat.color)}>{stat.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl overflow-hidden">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider opacity-70">Factura Consolidada — Marzo 2026</p>
            <p className="text-3xl font-black tracking-tight">{formatCurrency(totalPendiente, 'USD')}</p>
            <p className="text-[10px] opacity-60">Vencimiento: 15/04/2026 · {facturasPendientes} departamento(s)</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="rounded-xl font-bold text-xs h-11 px-6"
              onClick={async () => {
                try {
                  const res = await fetch('/api/solicitudes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categoria: 'telecom', subcategoria: 'pago_consolidado', descripcion: `Pago consolidado facturación corporativa` }) });
                  if (res.ok) { toast({ title: "Pago procesado", description: "Se ha registrado el pago consolidado.", action: <CircleCheck className="h-4 w-4 text-emerald-500" /> }); }
                  else { toast({ title: "Error", description: "No se pudo procesar", variant: "destructive" }); }
                } catch { toast({ title: "Error de conexión", variant: "destructive" }); }
              }}>
              <CreditCard className="mr-2 h-4 w-4" /> Pagar Todo
            </Button>
            <Button variant="outline" className="rounded-xl font-bold text-xs h-11 px-6 border-white/20 text-white hover:bg-white/10"
              onClick={async () => { try { const res = await fetch('/api/solicitudes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categoria: 'telecom', subcategoria: 'descarga', descripcion: "Descarga" }) }); if (res.ok) toast({ title: "Descarga", description: "Generando factura consolidada PDF..." }); else toast({ title: "Error", variant: "destructive" }); } catch { toast({ title: "Error de conexión", variant: "destructive" }); } }}>
              <Download className="mr-2 h-4 w-4" /> PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg"><Calendar className="h-4 w-4 text-primary" /></div>
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">Historial de Facturas</CardTitle>
              <CardDescription className="text-[10px] text-muted-foreground">{FACTURAS_CORP.length} facturas corporativas</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/10 border-border/30 hover:bg-muted/10">
                  <TableHead className="pl-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Nº</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Período</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Departamento</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center">Líneas</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-right">Monto</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center">Estado</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center">Vencimiento</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-right pr-5"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {FACTURAS_CORP.map((f) => (
                  <TableRow key={f.id} className="border-border/30 hover:bg-muted/5 transition-colors">
                    <TableCell className="pl-5 py-3 text-xs font-mono font-semibold text-foreground">{f.id}</TableCell>
                    <TableCell className="text-xs text-foreground">{f.periodo}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-semibold text-foreground">{f.depto}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-xs text-muted-foreground">{f.lineas}</TableCell>
                    <TableCell className="text-right text-sm font-bold text-foreground tabular-nums">{formatCurrency(f.monto, 'USD')}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className={cn("text-[10px] px-2 py-0.5", ESTADO_COLORS[f.estado])}>
                        {f.estado === "pendiente" ? "Pendiente" : "Pagada"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-[11px] text-muted-foreground">{f.vencimiento}</TableCell>
                    <TableCell className="text-right pr-5">
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md"
                        onClick={async () => { try { const res = await fetch('/api/solicitudes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categoria: 'telecom', subcategoria: 'descarga', descripcion: "Descarga" }) }); if (res.ok) toast({ title: "Descarga", description: `Generando PDF de ${f.id}...` }); else toast({ title: "Error", variant: "destructive" }); } catch { toast({ title: "Error de conexión", variant: "destructive" }); } }}>
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
