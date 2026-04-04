"use client";

import React, { useState, useEffect } from "react";
import { Lock, CheckCircle, Circle, AlertTriangle, Clock, ArrowRight, ShieldCheck, Zap, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Inbox } from "lucide-react";

const pasosPlantilla = [
  { numero: 1, titulo: "Verificación de Asientos Pendientes", desc: "Confirmar que todos los asientos contables del período están registrados y cuadran (Debe = Haber)." },
  { numero: 2, titulo: "Conciliación Bancaria", desc: "Verificar que los saldos contables coinciden con los estados de cuenta bancarios." },
  { numero: 3, titulo: "Depreciación del Período", desc: "Registrar la depreciación mensual de activos fijos según método establecido." },
  { numero: 4, titulo: "Provisiones y Ajustes", desc: "Registrar provisiones de cuentas incobrables, garantías, y ajustes por inflación si aplica." },
  { numero: 5, titulo: "Conciliación IVA", desc: "Verificar que IVA Crédito Fiscal y IVA Débito Fiscal cuadran con libros de compra y venta." },
  { numero: 6, titulo: "Validación de Retenciones", desc: "Confirmar retenciones IVA e ISLR enteradas al fisco y comprobantes emitidos." },
  { numero: 7, titulo: "Cierre de Cuentas de Resultado", desc: "Trasladar saldos de ingresos, costos y gastos a la cuenta de utilidad/pérdida del ejercicio." },
  { numero: 8, titulo: "Generación de Estados Financieros", desc: "Emitir Balance General, Estado de Resultados, Flujo de Efectivo y Movimiento de Patrimonio." },
  { numero: 9, titulo: "Sellado y Bloqueo del Período", desc: "Cerrar el período contable. Una vez sellado, no se podrán registrar movimientos en este período." },
];

interface PasoCierre {
  numero: number;
  titulo: string;
  desc: string;
  estado: string;
  detalle?: string;
}

export default function CierreContablePage() {
  const { toast } = useToast();
  const [pasos, setPasos] = useState<PasoCierre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contabilidad/records?type=cierre_contable')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => {
        const apiPasos = d.rows ?? [];
        if (apiPasos.length > 0) {
          setPasos(apiPasos);
        } else {
          setPasos(pasosPlantilla.map(p => ({ ...p, estado: "pendiente" })));
        }
      })
      .catch(() => setPasos(pasosPlantilla.map(p => ({ ...p, estado: "pendiente" }))))
      .finally(() => setLoading(false));
  }, []);

  const completados = pasos.filter(p => p.estado === "completado").length;
  const progreso = pasos.length > 0 ? (completados / pasos.length) * 100 : 0;

  const estadoIcon: Record<string, React.ReactNode> = {
    completado: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    en_progreso: <Clock className="h-5 w-5 text-amber-500" />,
    pendiente: <Circle className="h-5 w-5 text-muted-foreground/30" />,
  };

  const estadoBadge: Record<string, string> = {
    completado: "bg-emerald-500/10 text-emerald-500",
    en_progreso: "bg-amber-500/10 text-amber-500",
    pendiente: "bg-muted/50 text-muted-foreground",
  };

  const handleEjecutar = async (paso: number) => {
    try {
      const res = await fetch("/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoria: "contabilidad", subcategoria: "cierre_contable", descripcion: `Ejecutar paso ${paso} del cierre contable` }),
      });
      if (res.ok) toast({ title: `Paso ${paso} solicitado`, description: "Procesando validaciones contables..." });
      else toast({ variant: "destructive", title: "Error" });
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    }
  };

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad" label="Contabilidad" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">
              <Lock className="h-3.5 w-3.5" /> Cierre Contable
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Cierre <span className="text-primary">Contable</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Asistente guiado · 9 pasos · Validación automática · Sellado de período</p>
          </div>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-semibold">Cargando estado del cierre...</span>
        </div>
      ) : (
        <>
          <Card className="rounded-2xl border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-bold">Progreso del Cierre</p>
                <p className="text-[11px] text-muted-foreground">{completados} de {pasos.length} pasos completados</p>
              </div>
              <span className="text-2xl font-black text-primary">{progreso.toFixed(0)}%</span>
            </div>
            <Progress value={progreso} className="h-3 rounded-full" />
          </Card>

          <div className="space-y-4">
            {pasos.map((paso) => (
              <Card key={paso.numero} className={cn(
                "rounded-2xl border overflow-hidden transition-all",
                paso.estado === "en_progreso" && "ring-2 ring-amber-500/30",
                paso.estado === "completado" && "opacity-80"
              )}>
                <div className="flex items-start gap-4 p-5">
                  <div className="shrink-0 mt-0.5">
                    {estadoIcon[paso.estado] || estadoIcon.pendiente}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold text-muted-foreground">PASO {paso.numero}</span>
                      <Badge className={cn("text-[9px] font-bold border-none", estadoBadge[paso.estado] || estadoBadge.pendiente)}>
                        {paso.estado === "completado" ? "Completado" : paso.estado === "en_progreso" ? "En Progreso" : "Pendiente"}
                      </Badge>
                    </div>
                    <p className="text-sm font-bold text-foreground">{paso.titulo}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{paso.desc}</p>
                    {paso.detalle && (
                      <p className="text-[10px] font-medium text-primary mt-1.5 bg-primary/5 px-2 py-1 rounded-lg inline-block">{paso.detalle}</p>
                    )}
                  </div>
                  <div className="shrink-0">
                    {paso.estado === "pendiente" && (
                      <Button size="sm" className="rounded-xl text-xs" onClick={() => handleEjecutar(paso.numero)}>
                        <Zap className="mr-1 h-3 w-3" /> Ejecutar
                      </Button>
                    )}
                    {paso.estado === "en_progreso" && (
                      <Button size="sm" variant="outline" className="rounded-xl text-xs border-amber-500/30 text-amber-500" onClick={() => handleEjecutar(paso.numero)}>
                        <ArrowRight className="mr-1 h-3 w-3" /> Continuar
                      </Button>
                    )}
                    {paso.estado === "completado" && (
                      <ShieldCheck className="h-5 w-5 text-emerald-500" />
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="border-rose-500/20 bg-rose-500/[0.03] rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-rose-600 dark:text-rose-400">Advertencia de Cierre</p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                  Una vez sellado el período, no se podrán registrar, modificar ni eliminar asientos contables de ese mes. Esta acción es irreversible.
                </p>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
