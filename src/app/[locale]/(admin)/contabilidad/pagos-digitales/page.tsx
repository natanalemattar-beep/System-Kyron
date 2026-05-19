"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Smartphone, Loader2, Inbox, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BackButton } from "@/components/back-button";
import { useToast } from "@/hooks/use-toast";

interface Transaccion {
  id: number;
  cedula: string;
  nombre: string;
  banco: string;
  monto: string;
  referencia: string;
  hora: string;
  estado: string;
  metodo: string;
}

export default function PagosDigitalesPage() {
  const { toast } = useToast();
  const [rows, setRows] = useState<Transaccion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contabilidad/records?type=pagos_digitales")
      .then((r) => (r.ok ? r.json() : { rows: [] }))
      .then((d) => setRows(d.rows ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const verificarPago = async () => {
    try {
      const res = await fetch("/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoria: "pagos", subcategoria: "verificacion_pago_movil", descripcion: "Verificación de pago móvil en tiempo real" }),
      });
      if (res.ok) {
        toast({ title: "Solicitud enviada", description: "Verificación de pago registrada." });
      } else {
        toast({ variant: "destructive", title: "Error", description: "No se pudo verificar el pago." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-background">
      <BackButton href="/contabilidad" label="Volver al Centro Contable" />

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground uppercase tracking-tight flex items-center gap-3">
            <Smartphone className="h-8 w-8 text-primary" />
            Pagos Digitales y Móviles
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            PayPal · Zinli · Zelle · Tarjetas · Binance · Pago Móvil Verificado.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl" onClick={verificarPago}>
            Verificar Pago Móvil
          </Button>
          <Button variant="outline" className="rounded-xl">
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
        </div>
      </header>

      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 flex items-start gap-4">
        <Smartphone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
        <p className="text-sm text-foreground/80">
          El sistema consulta las APIs bancarias en tiempo real para confirmar pagos móviles,
          acreditar automáticamente y registrar el asiento contable con IVA y retenciones calculadas.
        </p>
      </div>

      <Card className="border rounded-2xl shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-bold uppercase tracking-widest">Cargando transacciones...</span>
            </div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold uppercase tracking-widest">Sin transacciones registradas</p>
              <p className="text-xs text-muted-foreground/70">Los pagos digitales y móviles aparecerán aquí al ser procesados.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="pl-8 font-bold text-[10px] uppercase">Cédula/RIF</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Cliente</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Método</TableHead>
                  <TableHead className="text-right font-bold text-[10px] uppercase">Monto</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Referencia</TableHead>
                  <TableHead className="font-bold text-[10px] uppercase">Hora</TableHead>
                  <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((p) => (
                  <TableRow key={p.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="pl-8 font-mono text-xs">{p.cedula}</TableCell>
                    <TableCell className="text-xs font-medium">{p.nombre}</TableCell>
                    <TableCell className="text-xs">{p.metodo}</TableCell>
                    <TableCell className="text-right font-mono text-xs font-bold text-emerald-600">{p.monto}</TableCell>
                    <TableCell className="text-xs font-mono">{p.referencia}</TableCell>
                    <TableCell className="text-xs">{p.hora}</TableCell>
                    <TableCell className="text-right pr-8">
                      <Badge variant={p.estado === "VERIFICADO" ? "default" : "secondary"} className="text-[11px] uppercase">
                        {p.estado}
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
