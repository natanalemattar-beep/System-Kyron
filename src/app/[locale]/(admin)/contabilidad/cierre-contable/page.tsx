"use client";

import React, { useState } from "react";
import { Lock, CheckCircle, Circle, AlertTriangle, Clock, ArrowRight, ShieldCheck, Zap, Calendar, BarChart3, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const pasosCierre = [
  {
    numero: 1,
    titulo: "Verificación de Asientos Pendientes",
    desc: "Confirmar que todos los asientos contables del período están registrados y cuadran (Debe = Haber).",
    estado: "completado",
    detalle: "42 asientos verificados. Diferencia: Bs. 0,00",
  },
  {
    numero: 2,
    titulo: "Conciliación Bancaria",
    desc: "Verificar que los saldos contables coinciden con los estados de cuenta bancarios.",
    estado: "completado",
    detalle: "5 cuentas bancarias conciliadas. Match: 99.8%",
  },
  {
    numero: 3,
    titulo: "Depreciación del Período",
    desc: "Registrar la depreciación mensual de activos fijos según método establecido.",
    estado: "completado",
    detalle: "Depreciación registrada: Bs. 25.554,58",
  },
  {
    numero: 4,
    titulo: "Provisiones y Ajustes",
    desc: "Registrar provisiones de cuentas incobrables, garantías, y ajustes por inflación si aplica.",
    estado: "en_progreso",
    detalle: "Provisión cuentas incobrables: pendiente de cálculo",
  },
  {
    numero: 5,
    titulo: "Conciliación IVA",
    desc: "Verificar que IVA Crédito Fiscal y IVA Débito Fiscal cuadran con libros de compra y venta.",
    estado: "pendiente",
    detalle: "",
  },
  {
    numero: 6,
    titulo: "Validación de Retenciones",
    desc: "Confirmar retenciones IVA e ISLR enteradas al fisco y comprobantes emitidos.",
    estado: "pendiente",
    detalle: "",
  },
  {
    numero: 7,
    titulo: "Cierre de Cuentas de Resultado",
    desc: "Trasladar saldos de ingresos, costos y gastos a la cuenta de utilidad/pérdida del ejercicio.",
    estado: "pendiente",
    detalle: "",
  },
  {
    numero: 8,
    titulo: "Generación de Estados Financieros",
    desc: "Emitir Balance General, Estado de Resultados, Flujo de Efectivo y Movimiento de Patrimonio.",
    estado: "pendiente",
    detalle: "",
  },
  {
    numero: 9,
    titulo: "Sellado y Bloqueo del Período",
    desc: "Cerrar el período contable. Una vez sellado, no se podrán registrar movimientos en este período.",
    estado: "pendiente",
    detalle: "",
  },
];

const estadoIcon: Record<string, React.ReactNode> = {
  completado: <CheckCircle className="h-5 w-5 text-emerald-500" />,
  en_progreso: <Clock className="h-5 w-5 text-amber-500 animate-pulse" />,
  pendiente: <Circle className="h-5 w-5 text-muted-foreground/30" />,
};

const estadoBadge: Record<string, string> = {
  completado: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  en_progreso: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  pendiente: "bg-muted/50 text-muted-foreground border-border",
};

export default function CierreContablePage() {
  const { toast } = useToast();
  const completados = pasosCierre.filter(p => p.estado === "completado").length;
  const progreso = (completados / pasosCierre.length) * 100;

  const handleEjecutar = (paso: number) => {
    toast({
      title: `Ejecutando Paso ${paso}`,
      description: "Procesando validaciones contables...",
    });
  };

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <Lock className="h-3 w-3" /> CIERRE CONTABLE
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Cierre <span className="text-primary italic">Contable</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Asistente Guiado • 9 Pasos • Validación Automática • Sellado de Período
          </p>
        </div>
        <Badge className="text-sm font-bold bg-primary/10 text-primary px-4 py-2 rounded-xl">
          <Calendar className="h-4 w-4 mr-2" /> Marzo 2026
        </Badge>
      </motion.header>

      <Card className="rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-bold">Progreso del Cierre</p>
            <p className="text-[10px] text-muted-foreground">{completados} de {pasosCierre.length} pasos completados</p>
          </div>
          <span className="text-2xl font-black text-primary">{progreso.toFixed(0)}%</span>
        </div>
        <Progress value={progreso} className="h-3 rounded-full" />
      </Card>

      <div className="space-y-4">
        {pasosCierre.map((paso, i) => (
          <motion.div key={paso.numero} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
            <Card className={cn(
              "rounded-xl overflow-hidden transition-all",
              paso.estado === "en_progreso" && "ring-2 ring-amber-500/30",
              paso.estado === "completado" && "opacity-80"
            )}>
              <div className="flex items-start gap-4 p-5">
                <div className="shrink-0 mt-0.5">
                  {estadoIcon[paso.estado]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold text-muted-foreground">PASO {paso.numero}</span>
                    <Badge className={cn("text-[8px] font-bold uppercase", estadoBadge[paso.estado])}>
                      {paso.estado === "completado" ? "Completado" : paso.estado === "en_progreso" ? "En Progreso" : "Pendiente"}
                    </Badge>
                  </div>
                  <p className="text-sm font-bold text-foreground">{paso.titulo}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{paso.desc}</p>
                  {paso.detalle && (
                    <p className="text-[10px] font-medium text-primary mt-1.5 bg-primary/5 px-2 py-1 rounded inline-block">{paso.detalle}</p>
                  )}
                </div>
                <div className="shrink-0">
                  {paso.estado === "pendiente" && (
                    <Button size="sm" className="rounded-lg text-[10px] font-bold gap-1.5" onClick={() => handleEjecutar(paso.numero)}>
                      <Zap className="h-3 w-3" /> Ejecutar
                    </Button>
                  )}
                  {paso.estado === "en_progreso" && (
                    <Button size="sm" variant="outline" className="rounded-lg text-[10px] font-bold gap-1.5 border-amber-500/30 text-amber-500" onClick={() => handleEjecutar(paso.numero)}>
                      <ArrowRight className="h-3 w-3" /> Continuar
                    </Button>
                  )}
                  {paso.estado === "completado" && (
                    <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="border-rose-500/20 bg-rose-500/[0.03] rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-black text-rose-600 uppercase tracking-wider">Advertencia de Cierre</p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Una vez sellado el período, no se podrán registrar, modificar ni eliminar asientos contables de ese mes.
              Todos los documentos fiscales (facturas, NC, ND) ya son inmutables desde su emisión. El cierre contable
              bloquea adicionalmente los asientos manuales y ajustes del período. Esta acción es irreversible.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
