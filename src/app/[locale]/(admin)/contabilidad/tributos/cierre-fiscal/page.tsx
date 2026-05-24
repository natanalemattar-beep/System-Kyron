"use client";

import { useState } from "react";
import { Link } from "@/navigation";
import { FileText, ShieldCheck, CircleCheck, Circle, Clock, ArrowRight, Zap, TriangleAlert, Calendar, Landmark, Percent, Banknote, CreditCard, Briefcase, Receipt, CheckCircle2, AlertTriangle, Info, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const pasosFiscales = [
  {
    numero: 1, categoria: "ISLR",
    titulo: "Conciliación de Retenciones ISLR",
    desc: "Verificar que las retenciones ISLR practicadas (1%, 2%, 3%, 5%) coinciden con los comprobantes emitidos y enterados al SENIAT.",
    ente: "SENIAT",
    vence: "31/03",
  },
  {
    numero: 2, categoria: "ISLR",
    titulo: "Declaración Definitiva de Renta",
    desc: "Preparar y presentar la declaración definitiva del ISLR del ejercicio fiscal. Incluir ingresos, costos, gastos y créditos fiscales.",
    ente: "SENIAT",
    vence: "31/03",
  },
  {
    numero: 3, categoria: "IVA",
    titulo: "Conciliación IVA Anual",
    desc: "Cuadrar IVA Débito Fiscal vs IVA Crédito Fiscal del ejercicio completo. Verificar libros de compra y venta.",
    ente: "SENIAT",
    vence: "31/03",
  },
  {
    numero: 4, categoria: "IVA",
    titulo: "Declaración IVA Trimestre Nov-Dic",
    desc: "Presentar última declaración IVA del ejercicio. Incluir ajustes por diferencias de cambio si aplica.",
    ente: "SENIAT",
    vence: "15/01",
  },
  {
    numero: 5, categoria: "IGTF",
    titulo: "Conciliación IGTF Anual",
    desc: "Revisar y cuadrar las transacciones en divisas del ejercicio. Verificar retenciones IGTF al 3%.",
    ente: "SENIAT",
    vence: "31/03",
  },
  {
    numero: 6, categoria: "RETENCIONES",
    titulo: "Certificados de Retención",
    desc: "Emitir y entregar certificados de retención IVA e ISLR a proveedores y contratistas. Respaldo digital.",
    ente: "SENIAT",
    vence: "31/03",
  },
  {
    numero: 7, categoria: "PATRIMONIO",
    titulo: "Declaración IGP (si aplica)",
    desc: "Si el patrimonio neto supera 30.000 UT, presentar declaración del Impuesto a Grandes Patrimonios.",
    ente: "SENIAT",
    vence: "31/03",
  },
  {
    numero: 8, categoria: "MUNICIPAL",
    titulo: "Declaración Municipal Anual",
    desc: "Presentar declaración definitiva de Impuesto a Actividades Económicas (ISAE) en el municipio sede.",
    ente: "Alcaldía",
    vence: "31/01",
  },
  {
    numero: 9, categoria: "PARAFISCAL",
    titulo: "Aportes Parafiscales Anuales",
    desc: "Conciliar aportes parafiscales (INCES, FAOV, LPH, SENCE) del ejercicio completo.",
    ente: "Varios",
    vence: "15/02",
  },
  {
    numero: 10, categoria: "LABORAL",
    titulo: "Certificado de Solvencia Laboral",
    desc: "Gestionar certificado de solvencia laboral ante el Ministerio del Trabajo. Requisito para cierre fiscal.",
    ente: "MPPT",
    vence: "31/03",
  },
  {
    numero: 11, categoria: "PRECIOS",
    titulo: "Declaración de Precios de Transferencia",
    desc: "Si aplica, preparar informe de precios de transferencia para operaciones con partes vinculadas en el exterior.",
    ente: "SENIAT",
    vence: "30/06",
  },
  {
    numero: 12, categoria: "CIERRE",
    titulo: "Sellado y Certificación Fiscal",
    desc: "Sellar el ejercicio fiscal. Generar certificación de cierre con código QR y sello electrónico SENIAT.",
    ente: "SENIAT",
    vence: "31/03",
  },
];

const categorias = ["ISLR", "IVA", "IGTF", "RETENCIONES", "PATRIMONIO", "MUNICIPAL", "PARAFISCAL", "LABORAL", "PRECIOS", "CIERRE"];

export default function CierreFiscalPage() {
  const { toast } = useToast();
  const [pasos, setPasos] = useState(() =>
    pasosFiscales.map(p => ({ ...p, estado: "pendiente" }))
  );

  const completados = pasos.filter(p => p.estado === "completado").length;
  const progreso = pasos.length > 0 ? (completados / pasos.length) * 100 : 0;

  const estadoIcon: Record<string, React.ReactNode> = {
    completado: <CircleCheck className="h-5 w-5 text-emerald-500" />,
    en_progreso: <Clock className="h-5 w-5 text-amber-500" />,
    pendiente: <Circle className="h-5 w-5 text-muted-foreground/30" />,
  };

  const estadoBadge: Record<string, string> = {
    completado: "bg-emerald-500/10 text-emerald-500",
    en_progreso: "bg-amber-500/10 text-amber-500",
    pendiente: "bg-muted/50 text-muted-foreground",
  };

  const categoriaColor: Record<string, string> = {
    ISLR: "border-t-blue-500/30",
    IVA: "border-t-amber-500/30",
    IGTF: "border-t-emerald-500/30",
    RETENCIONES: "border-t-purple-500/30",
    PATRIMONIO: "border-t-rose-500/30",
    MUNICIPAL: "border-t-cyan-500/30",
    PARAFISCAL: "border-t-orange-500/30",
    LABORAL: "border-t-teal-500/30",
    PRECIOS: "border-t-indigo-500/30",
    CIERRE: "border-t-green-500/30",
  };

  const toggleEstado = (idx: number) => {
    setPasos(prev => prev.map((p, i) => {
      if (i !== idx) return p;
      if (p.estado === "pendiente") return { ...p, estado: "en_progreso" };
      if (p.estado === "en_progreso") return { ...p, estado: "completado" };
      return { ...p, estado: "pendiente" };
    }));
  };

  const handleEjecutarTodo = () => {
    toast({ title: "Cierre Fiscal Iniciado", description: "Procesando todas las declaraciones fiscales pendientes..." });
  };

  const stepsByCategory = categorias.map(cat => ({
    categoria: cat,
    pasos: pasos.filter(p => p.categoria === cat),
  })).filter(g => g.pasos.length > 0);

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad/tributos" label="Tributos" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] font-semibold uppercase tracking-wide text-amber-500 mb-3">
              <Landmark className="h-3.5 w-3.5" /> Cierre Fiscal {new Date().getFullYear() - 1}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Cierre <span className="text-amber-500">Fiscal</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {pasos.length} obligaciones · SENIAT · Alcaldía · Ministerios · Cierre del ejercicio {new Date().getFullYear() - 1}
            </p>
          </div>
          <Button className="rounded-xl text-xs h-10" onClick={handleEjecutarTodo}>
            <Zap className="mr-2 h-4 w-4" /> Iniciar Cierre Fiscal
          </Button>
        </div>
      </header>

      <Card className="rounded-2xl border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-bold">Progreso del Cierre Fiscal</p>
            <p className="text-[11px] text-muted-foreground">{completados} de {pasos.length} obligaciones completadas</p>
          </div>
          <span className="text-2xl font-bold text-amber-500">{progreso.toFixed(0)}%</span>
        </div>
        <Progress value={progreso} className="h-3 rounded-full" />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categorias.map(cat => {
          const catPasos = pasos.filter(p => p.categoria === cat);
          const catDone = catPasos.filter(p => p.estado === "completado").length;
          return (
            <Card key={cat} className={`rounded-2xl border ${categoriaColor[cat] || "border-t-border"} pt-4`}>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{cat}</span>
                  <span className="text-xs font-medium text-muted-foreground">{catDone}/{catPasos.length}</span>
                </div>
                {catPasos.map((paso, i) => (
                  <button key={i} onClick={() => toggleEstado(pasos.indexOf(paso))}
                    className="w-full flex items-start gap-3 p-3 rounded-xl border border-border/50 bg-card hover:bg-muted/20 transition-all text-left">
                    {estadoIcon[paso.estado] || estadoIcon.pendiente}
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold ${paso.estado === "completado" ? "text-muted-foreground line-through" : "text-foreground"}`}>
                        {paso.titulo}
                      </p>
                      <p className="text-[10px] text-muted-foreground/60 mt-0.5">{paso.desc}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[9px] font-bold text-muted-foreground/40 uppercase">{paso.ente}</span>
                        <span className="text-[9px] font-bold text-amber-500/60">Vence: {paso.vence}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-amber-500/20 bg-amber-500/[0.03] rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <TriangleAlert className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Advertencia de Cierre Fiscal</p>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
              Vence el 31 de marzo de {new Date().getFullYear()}. Una vez cerrado no se podrán modificar declaraciones de ese ejercicio. Asegúrate de tener todos los soportes contables y fiscales.
            </p>
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-border/50">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Info className="h-4 w-4 text-muted-foreground/40" />
          Complementa con <Link href="/contabilidad/cierre-contable" className="text-primary hover:underline font-medium">Cierre Contable</Link>
        </div>
        <Link href="/contabilidad/tributos/calendario-fiscal" className="flex items-center gap-1 text-xs text-primary font-medium hover:underline">
          Calendario Fiscal <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
