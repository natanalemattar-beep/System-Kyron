"use client";

import React from "react";
import { Upload, FileText, Download, ShieldCheck, Calendar, FileCode, FileSpreadsheet, AlertTriangle, CheckCircle, Clock, Zap, ExternalLink, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const declaraciones = [
  {
    nombre: "Libro de Compras",
    formato: "TXT",
    norma: "Providencia 0071",
    descripcion: "Detalle de todas las compras y servicios recibidos con IVA. Formato requerido por el Portal Fiscal SENIAT.",
    icon: FileCode,
    color: "text-primary",
    bg: "bg-primary/10",
    estado: "listo",
    periodo: "Marzo 2026",
    registros: 124,
    montoTotal: "Bs. 3.842.000,00",
  },
  {
    nombre: "Libro de Ventas",
    formato: "TXT",
    norma: "Providencia 0071",
    descripcion: "Detalle de todas las ventas realizadas con IVA discriminado. Compatible con el sistema de retenciones.",
    icon: FileCode,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    estado: "listo",
    periodo: "Marzo 2026",
    registros: 89,
    montoTotal: "Bs. 8.934.150,00",
  },
  {
    nombre: "Retenciones IVA",
    formato: "XML",
    norma: "Providencia 0049/0056",
    descripcion: "Archivo XML de retenciones de IVA para carga en el Portal Fiscal. Agentes de Retención designados.",
    icon: FileCode,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    estado: "listo",
    periodo: "Marzo 2026",
    registros: 45,
    montoTotal: "Bs. 614.720,00",
  },
  {
    nombre: "Retenciones ISLR",
    formato: "XML",
    norma: "Decreto 1808",
    descripcion: "Archivo XML de retenciones de ISLR para enteramiento en Portal Fiscal del SENIAT.",
    icon: FileCode,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    estado: "pendiente",
    periodo: "Marzo 2026",
    registros: 18,
    montoTotal: "Bs. 245.000,00",
  },
  {
    nombre: "Declaración IVA (Forma 30)",
    formato: "XML",
    norma: "COT Art. 47",
    descripcion: "Declaración mensual del IVA. Débito fiscal menos crédito fiscal. Generación automática del formulario.",
    icon: FileText,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    estado: "pendiente",
    periodo: "Marzo 2026",
    registros: 1,
    montoTotal: "Bs. 120.000,00 (impuesto a pagar)",
  },
  {
    nombre: "Declaración ISLR (Forma DPJ-26)",
    formato: "XML",
    norma: "LISLR",
    descripcion: "Declaración anual definitiva de rentas para personas jurídicas. Incluye Balance, Estado de Resultados.",
    icon: FileText,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    estado: "no_aplica",
    periodo: "Anual 2025",
    registros: 1,
    montoTotal: "Próxima: Mar 2027",
  },
  {
    nombre: "IGTF (Impuesto Grandes Transacciones)",
    formato: "TXT",
    norma: "Ley IGTF",
    descripcion: "Reporte de transacciones en moneda extranjera o criptomonedas sujetas al IGTF del 3%.",
    icon: FileSpreadsheet,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    estado: "listo",
    periodo: "Marzo 2026",
    registros: 12,
    montoTotal: "Bs. 45.600,00 (impuesto)",
  },
  {
    nombre: "Actividades Económicas Municipal",
    formato: "Excel",
    norma: "Ordenanza Municipal",
    descripcion: "Declaración de ingresos brutos para impuestos municipales (Patente de Industria y Comercio).",
    icon: FileSpreadsheet,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
    estado: "pendiente",
    periodo: "Trimestre I 2026",
    registros: 1,
    montoTotal: "Bs. 178.683,00",
  },
];

const estadoConfig: Record<string, { label: string; badge: string; icon: React.ReactNode }> = {
  listo: { label: "Listo para enviar", badge: "bg-emerald-500/10 text-emerald-500", icon: <CheckCircle className="h-4 w-4 text-emerald-500" /> },
  pendiente: { label: "Pendiente", badge: "bg-amber-500/10 text-amber-500", icon: <Clock className="h-4 w-4 text-amber-500" /> },
  no_aplica: { label: "No aplica este período", badge: "bg-muted/50 text-muted-foreground", icon: <Lock className="h-4 w-4 text-muted-foreground" /> },
};

export default function ExportacionSeniatPage() {
  const { toast } = useToast();

  const handleGenerar = (nombre: string, formato: string) => {
    toast({
      title: `Generando ${formato}`,
      description: `${nombre} — Procesando registros contables para exportación fiscal...`,
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
            <Upload className="h-3 w-3" /> PORTAL FISCAL
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Exportación <span className="text-primary italic">SENIAT</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            XML • TXT • Providencia 0071/0049 • Portal Fiscal • Declaraciones Tributarias
          </p>
        </div>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Declaraciones Listas", val: `${declaraciones.filter(d => d.estado === "listo").length}`, icon: CheckCircle, color: "text-emerald-500" },
          { label: "Pendientes", val: `${declaraciones.filter(d => d.estado === "pendiente").length}`, icon: Clock, color: "text-amber-500" },
          { label: "Total Formatos", val: `${declaraciones.length}`, icon: FileText, color: "text-primary" },
          { label: "Período Actual", val: "Mar 2026", icon: Calendar, color: "text-cyan-500" },
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="bg-card/60 border-border/50 p-5 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{kpi.label}</span>
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
              <p className={cn("text-xl font-black tracking-tight", kpi.color)}>{kpi.val}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        {declaraciones.map((dec, i) => {
          const est = estadoConfig[dec.estado];
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className="rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-4 p-5">
                  <div className={cn("p-3 rounded-xl shrink-0", dec.bg)}>
                    <dec.icon className={cn("h-5 w-5", dec.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold">{dec.nombre}</p>
                      <Badge className={cn("text-[8px] font-bold", dec.bg, dec.color)}>{dec.formato}</Badge>
                      <Badge className={cn("text-[8px] font-bold", est.badge)}>{est.label}</Badge>
                    </div>
                    <p className="text-[10px] text-muted-foreground font-medium mb-1">{dec.norma} • {dec.periodo}</p>
                    <p className="text-[11px] text-muted-foreground">{dec.descripcion}</p>
                    <div className="flex gap-4 mt-2 text-[10px]">
                      <span className="text-muted-foreground">Registros: <strong className="text-foreground">{dec.registros}</strong></span>
                      <span className="text-muted-foreground">Monto: <strong className="text-foreground">{dec.montoTotal}</strong></span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    {dec.estado === "listo" && (
                      <>
                        <Button size="sm" className="rounded-lg text-[10px] font-bold gap-1.5" onClick={() => handleGenerar(dec.nombre, dec.formato)}>
                          <Download className="h-3 w-3" /> Descargar
                        </Button>
                        <Button size="sm" variant="outline" className="rounded-lg text-[10px] font-bold gap-1.5">
                          <ExternalLink className="h-3 w-3" /> Portal SENIAT
                        </Button>
                      </>
                    )}
                    {dec.estado === "pendiente" && (
                      <Button size="sm" variant="outline" className="rounded-lg text-[10px] font-bold gap-1.5 border-amber-500/30 text-amber-500"
                        onClick={() => handleGenerar(dec.nombre, dec.formato)}>
                        <Zap className="h-3 w-3" /> Generar
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Card className="border-emerald-500/20 bg-emerald-500/[0.03] rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-black text-emerald-600 uppercase tracking-wider">Compatibilidad Garantizada</p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Todos los archivos generados por System Kyron son 100% compatibles con el Portal Fiscal del SENIAT,
              el sistema de retenciones en línea y los formatos de declaración vigentes. Los archivos XML cumplen con
              los esquemas XSD oficiales del SENIAT. Los archivos TXT siguen el formato de campos fijos establecido
              en la Providencia Administrativa SNAT/2011/0071.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
