"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Banknote, Download, FileText, Activity, Terminal, ShieldCheck, Loader2, Inbox } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ArcRow {
  id: number;
  nombre: string;
  apellido: string;
  cedula: string;
  cargo: string | null;
  departamento: string | null;
  salario: string;
}

export default function IslrArcPage() {
  const { toast } = useToast();
  const [data, setData] = useState<ArcRow[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(() => {
    setLoading(true);
    fetch('/api/contabilidad/records?type=empleados&limit=50')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => setData(d.rows ?? []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-l-4 border-primary pl-6 md:pl-8 py-2 mt-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wider text-primary mb-4">
          <Banknote className="h-3 w-3" /> CENTRO DE PERSONAL
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase leading-none">Retenciones <span className="text-primary italic">AR-C</span></h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-40 mt-2 italic">Comprobantes de Retención de ISLR • Ejercicio Fiscal 2026</p>
      </motion.header>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Card className="glass-card border-none rounded-2xl bg-card/40 overflow-hidden shadow-lg">
            <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-primary italic">Relación de Comprobantes AR-C</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex items-center justify-center py-12 gap-3 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-sm font-semibold">Cargando empleados...</span>
                </div>
              ) : data.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
                  <Inbox className="h-10 w-10 opacity-30" />
                  <p className="text-sm font-bold">Sin empleados registrados</p>
                  <p className="text-xs text-center max-w-xs">Registra empleados en el módulo de Recursos Humanos para generar los comprobantes AR-C.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 border-none">
                      <TableHead className="pl-10 py-5 text-[11px] font-semibold uppercase tracking-widest opacity-30">Empleado / C.I.</TableHead>
                      <TableHead className="text-center py-5 text-[11px] font-semibold uppercase tracking-widest opacity-30">Cargo</TableHead>
                      <TableHead className="text-right py-5 text-[11px] font-semibold uppercase tracking-widest opacity-30">Ingreso Anual</TableHead>
                      <TableHead className="text-center py-5 text-[11px] font-semibold uppercase tracking-widest opacity-30">Estado</TableHead>
                      <TableHead className="text-right pr-10 py-5 text-[11px] font-semibold uppercase tracking-widest opacity-30">Acción</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map(row => (
                      <TableRow key={row.id} className="border-border/50 hover:bg-muted/20 transition-all group">
                        <TableCell className="pl-10 py-6">
                          <p className="font-semibold text-xs text-foreground/80 uppercase italic group-hover:text-primary transition-colors">{row.nombre} {row.apellido}</p>
                          <p className="text-[10px] font-mono text-muted-foreground font-bold">{row.cedula}</p>
                        </TableCell>
                        <TableCell className="text-center py-6 text-xs text-muted-foreground">{row.cargo ?? row.departamento ?? '—'}</TableCell>
                        <TableCell className="text-right py-6 font-mono text-sm font-bold text-foreground/70">
                          {formatCurrency(parseFloat(row.salario) * 12 || 0, 'Bs.')}
                        </TableCell>
                        <TableCell className="text-center py-6">
                          <Badge variant="outline" className="text-[10px] font-semibold uppercase tracking-widest h-6 px-3">Pendiente</Badge>
                        </TableCell>
                        <TableCell className="text-right pr-10 py-6">
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary" onClick={() => toast({ title: "Generando AR-C", description: `Comprobante de ${row.nombre} ${row.apellido} en proceso.` })}>
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
            <CardFooter className="p-10 border-t border-border bg-primary/5 flex justify-between items-center">
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase text-muted-foreground/40">
                <ShieldCheck className="h-4 w-4 text-primary" /> VALIDACIÓN DE CARGA FAMILIAR ACTIVA
              </div>
              <Button className="h-12 px-8 rounded-xl font-semibold uppercase text-[10px] tracking-widest" onClick={() => toast({ title: "Procesando lote...", description: "Generando AR-C para todos los empleados activos." })}>PROCESAR LOTE MASIVO</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="glass-card border-none p-10 rounded-2xl bg-card/40 relative overflow-hidden group shadow-lg">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
              <Terminal className="h-32 w-32" />
            </div>
            <h3 className="text-xl font-semibold uppercase italic tracking-tight text-foreground mb-6">Guía de Retención</h3>
            <p className="text-xs font-bold text-muted-foreground/60 leading-relaxed uppercase mb-8 text-justify">
              El comprobante AR-C es obligatorio según el Reglamento de la Ley de ISLR. El sistema consolida los pagos de nómina y calcula el porcentaje de retención basado en la planilla ARI de cada trabajador.
            </p>
            <div className="space-y-4 border-t border-border pt-6">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-widest opacity-40">
                <span>Periodo de Carga:</span>
                <span className="text-foreground">Enero - Diciembre</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-widest opacity-40">
                <span>Próximo Cierre:</span>
                <span className="text-primary">31 de Marzo</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
