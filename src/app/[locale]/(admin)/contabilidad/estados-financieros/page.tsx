"use client";

import React, { useState, useEffect } from "react";
import { FileText, TrendingUp, Activity, Wallet, BookOpen, Landmark, ShieldCheck, Loader2, Inbox, Printer, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const tiposEstados = [
  {
    titulo: "Balance General",
    subtitulo: "Estado de Situación Financiera",
    desc: "Activos, pasivos y patrimonio al cierre del período. Formato VEN-NIF / NIC 1.",
    icon: Landmark,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    badge: "VEN-NIF",
  },
  {
    titulo: "Estado de Resultados",
    subtitulo: "Ganancias y Pérdidas",
    desc: "Ingresos, costos, gastos y utilidad neta del período. Conforme NIC 1 / Sección 5 NIIF PYMES.",
    icon: TrendingUp,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    badge: "PERÍODO",
  },
  {
    titulo: "Flujo de Efectivo",
    subtitulo: "Estado de Flujos de Efectivo",
    desc: "Movimientos de caja por actividades operativas, inversión y financiamiento. NIC 7.",
    icon: Activity,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    badge: "NIC 7",
  },
  {
    titulo: "Movimiento del Patrimonio",
    subtitulo: "Cambios en el Patrimonio Neto",
    desc: "Variaciones del capital social, reservas, utilidades retenidas y superávit. NIC 1.",
    icon: Wallet,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    badge: "PATRIMONIO",
  },
  {
    titulo: "Notas a los Estados Financieros",
    subtitulo: "Revelaciones y Políticas Contables",
    desc: "Notas explicativas, políticas contables significativas y revelaciones requeridas. NIC 1 párr. 112-138.",
    icon: BookOpen,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    badge: "NOTAS",
  },
];

export default function EstadosFinancierosPage() {
  const { toast } = useToast();

  const handleGenerar = async (titulo: string) => {
    try {
      const res = await fetch("/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoria: "contabilidad", subcategoria: "estado_financiero", descripcion: `Generación de ${titulo}` }),
      });
      if (res.ok) toast({ title: "Solicitud registrada", description: `${titulo} solicitado para generación.` });
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
              <FileText className="h-3.5 w-3.5" /> Estados Financieros
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Estados <span className="text-primary">Financieros</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">VEN-NIF · NIIF PYMES · NIC 1 / NIC 7 · Providencia 0071</p>
          </div>
          <Button variant="outline" onClick={() => window.print()} className="rounded-xl">
            <Printer className="mr-2 h-4 w-4" /> Imprimir
          </Button>
        </div>
      </header>

      <div className="space-y-4">
        {tiposEstados.map((ef, i) => (
          <Card key={i} className={cn("border rounded-2xl overflow-hidden", ef.border)}>
            <CardHeader className="p-6 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={cn("p-3 rounded-xl border", ef.bg, ef.border)}>
                    <ef.icon className={cn("h-6 w-6", ef.color)} />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold">{ef.titulo}</CardTitle>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{ef.subtitulo}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">{ef.desc}</p>
                  </div>
                </div>
                <Badge className={cn("text-[9px] font-bold border-none", ef.bg, ef.color)}>{ef.badge}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-2">
              <Button size="sm" className="rounded-xl text-xs" onClick={() => handleGenerar(ef.titulo)}>
                Solicitar Generación
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Conformidad VEN-NIF</p>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
              Los estados financieros se generan conforme a las Normas Venezolanas de Información Financiera (VEN-NIF), las Normas Internacionales de Contabilidad (NIC 1, NIC 7) y las NIIF para PYMES. Incluyen todas las revelaciones obligatorias para presentación ante SENIAT, bancos, socios y auditores externos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
