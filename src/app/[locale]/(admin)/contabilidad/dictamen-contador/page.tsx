"use client";

import React from "react";
import { Award, FileText, Download, ShieldCheck, User, Calendar, CheckCircle, Stamp, Pen, BookOpen, Printer, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const informes = [
  {
    tipo: "Dictamen del Contador Público Independiente",
    subtipo: "Opinión Sin Salvedades (Limpio)",
    desc: "Informe donde el Contador Público Independiente expresa su opinión sobre la razonabilidad de los estados financieros de conformidad con VEN-NIF.",
    icon: Award,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    estado: "vigente",
    fecha: "31/12/2025",
    auditor: "CPC. Roberto García V.",
    colegio: "C.C.P. del Distrito Capital — Nº 45.218",
  },
  {
    tipo: "Informe de Compilación",
    subtipo: "Preparación de Estados Financieros",
    desc: "Informe emitido cuando el contador compila los estados financieros a partir de los registros del cliente sin realizar auditoría.",
    icon: BookOpen,
    color: "text-primary",
    bg: "bg-primary/10",
    estado: "vigente",
    fecha: "31/03/2026",
    auditor: "CPC. Roberto García V.",
    colegio: "C.C.P. del Distrito Capital — Nº 45.218",
  },
  {
    tipo: "Informe Fiscal",
    subtipo: "Cumplimiento de Deberes Formales SENIAT",
    desc: "Informe que certifica el cumplimiento de los deberes formales tributarios: libros, retenciones, declaraciones, facturación legal.",
    icon: ShieldCheck,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    estado: "en_proceso",
    fecha: "Pendiente",
    auditor: "CPC. Roberto García V.",
    colegio: "C.C.P. del Distrito Capital — Nº 45.218",
  },
  {
    tipo: "Certificación de Ingresos",
    subtipo: "Para Trámites Bancarios / Licitaciones",
    desc: "Certificación de ingresos suscrita por Contador Público Colegiado para presentación ante entidades financieras o procesos de licitación.",
    icon: Stamp,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    estado: "vigente",
    fecha: "01/04/2026",
    auditor: "CPC. Roberto García V.",
    colegio: "C.C.P. del Distrito Capital — Nº 45.218",
  },
];

const estadoConfig: Record<string, { label: string; badge: string }> = {
  vigente: { label: "Vigente", badge: "bg-emerald-500/10 text-emerald-500" },
  en_proceso: { label: "En Proceso", badge: "bg-amber-500/10 text-amber-500" },
  vencido: { label: "Vencido", badge: "bg-rose-500/10 text-rose-500" },
};

const deberesFormales = [
  { deber: "Libros de Compra y Venta al día", cumple: true },
  { deber: "Facturación conforme Providencia 0071", cumple: true },
  { deber: "Retenciones IVA enteradas oportunamente", cumple: true },
  { deber: "Retenciones ISLR enteradas oportunamente", cumple: true },
  { deber: "Declaraciones IVA mensuales presentadas", cumple: true },
  { deber: "Declaración ISLR anual presentada", cumple: true },
  { deber: "RIF actualizado y vigente", cumple: true },
  { deber: "Libros contables legalizados", cumple: true },
  { deber: "Registro de Activos Revaluados (RAR)", cumple: false },
  { deber: "IGTF declarado y pagado", cumple: true },
];

export default function DictamenContadorPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <Award className="h-3 w-3" /> DICTAMEN PROFESIONAL
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Dictamen del <span className="text-primary italic">Contador</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Opinión CPC • Informes de Auditoría • Certificaciones • Cumplimiento FCCPV
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2">
            <Printer className="h-4 w-4" /> IMPRIMIR
          </Button>
          <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2">
            <Pen className="h-4 w-4" /> NUEVO INFORME
          </Button>
        </div>
      </motion.header>

      <Card className="rounded-2xl p-6 bg-muted/10 border-primary/10">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-bold">CPC. Roberto García Villamizar</p>
            <p className="text-[10px] text-muted-foreground">Contador Público Colegiado — C.C.P. del Distrito Capital Nº 45.218</p>
            <p className="text-[10px] text-muted-foreground">Inscrito en el Registro de Contadores Públicos del SENIAT</p>
            <p className="text-[10px] text-muted-foreground">Normas de Auditoría Generalmente Aceptadas (NAGA) / VEN-NIF</p>
          </div>
        </div>
      </Card>

      <div className="space-y-5">
        {informes.map((informe, i) => {
          const est = estadoConfig[informe.estado];
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className="rounded-xl overflow-hidden">
                <div className="flex items-start gap-4 p-5">
                  <div className={cn("p-3 rounded-xl shrink-0", informe.bg)}>
                    <informe.icon className={cn("h-6 w-6", informe.color)} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold">{informe.tipo}</p>
                      <Badge className={cn("text-[8px] font-bold", est.badge)}>{est.label}</Badge>
                    </div>
                    <p className="text-[10px] font-medium text-primary mb-1">{informe.subtipo}</p>
                    <p className="text-[11px] text-muted-foreground">{informe.desc}</p>
                    <div className="flex gap-4 mt-2 text-[10px] text-muted-foreground">
                      <span><Calendar className="h-3 w-3 inline mr-1" />Fecha: {informe.fecha}</span>
                      <span><User className="h-3 w-3 inline mr-1" />{informe.auditor}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <Button size="sm" variant="outline" className="rounded-lg text-[10px] font-bold gap-1.5">
                      <Eye className="h-3 w-3" /> Ver
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-lg text-[10px] font-bold gap-1.5">
                      <Download className="h-3 w-3" /> PDF
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Card className="rounded-2xl overflow-hidden">
        <CardHeader className="p-5 border-b bg-muted/20">
          <CardTitle className="text-xs font-black uppercase tracking-widest">Cumplimiento de Deberes Formales Tributarios</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {deberesFormales.map((deber, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/10 border border-border/30">
                {deber.cumple ? (
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-amber-500 shrink-0" />
                )}
                <span className={cn("text-xs", deber.cumple ? "text-foreground" : "text-amber-500 font-medium")}>
                  {deber.deber}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-primary/[0.03] rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-black text-primary uppercase tracking-wider">Normativa Aplicable</p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Los dictámenes e informes se emiten conforme a las Normas Internacionales de Auditoría (NIA/ISA),
              las Normas de Auditoría Generalmente Aceptadas en Venezuela (NAGA-VE), los Principios de Contabilidad
              Generalmente Aceptados (VEN-NIF) y las regulaciones de la Federación de Colegios de Contadores Públicos
              de Venezuela (FCCPV). Sistema Kyron facilita la generación de la información base requerida por el auditor.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
