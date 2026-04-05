"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  FileText, Download, Calendar, CircleCheck, Clock,
  Shield, BarChart3, TrendingUp, FileSpreadsheet, Send
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ConatelCompliancePanel } from "@/components/telecom/conatel-compliance-panel";
import { RecertificacionPanel, FIDETELCalculator } from "@/components/telecom/recertificacion-fidetel";

const REPORTES_HISTORICOS = [
  { id: "R1", periodo: "Q4 2025", tipo: "Trimestral", estado: "enviado", fechaGeneracion: "05/01/2026", fechaEnvio: "10/01/2026", formato: "SIT XML", lineasReportadas: 24, ingresosBrutos: "$12,450.00", contribucionFIDETEL: "$124.50" },
  { id: "R2", periodo: "Q3 2025", tipo: "Trimestral", estado: "enviado", fechaGeneracion: "02/10/2025", fechaEnvio: "08/10/2025", formato: "SIT XML", lineasReportadas: 22, ingresosBrutos: "$11,200.00", contribucionFIDETEL: "$112.00" },
  { id: "R3", periodo: "Q2 2025", tipo: "Trimestral", estado: "enviado", fechaGeneracion: "03/07/2025", fechaEnvio: "07/07/2025", formato: "SIT XML", lineasReportadas: 20, ingresosBrutos: "$10,800.00", contribucionFIDETEL: "$108.00" },
  { id: "R4", periodo: "Q1 2025", tipo: "Trimestral", estado: "enviado", fechaGeneracion: "04/04/2025", fechaEnvio: "09/04/2025", formato: "SIT XML", lineasReportadas: 18, ingresosBrutos: "$9,500.00", contribucionFIDETEL: "$95.00" },
];

const ESTADO_REPORTE = {
  enviado: { label: "Enviado", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  pendiente: { label: "Pendiente", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  borrador: { label: "Borrador", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
};

export default function ReportesConatelPage() {
  const { toast } = useToast();
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("2026-Q1");
  const [generando, setGenerando] = useState(false);

  const handleGenerarReporte = async () => {
    setGenerando(true);
    await new Promise(r => setTimeout(r, 2000));
    setGenerando(false);
    toast({
      title: "Reporte SIT Generado",
      description: `Reporte trimestral ${periodoSeleccionado} generado en formato compatible con el Sistema de Información de Telecomunicaciones.`,
      action: <CircleCheck className="h-4 w-4 text-emerald-500" />,
    });
  };

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="pt-6 pb-2">
        <div className="flex items-center gap-2 mb-1">
          <FileSpreadsheet className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Cumplimiento CONATEL</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Reportes Trimestrales CONATEL</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Generación de reportes para el Sistema de Información de Telecomunicaciones (SIT).</p>
      </header>

      <ConatelCompliancePanel tipo="empresa" />

      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">Generar Reporte SIT</CardTitle>
                <CardDescription className="text-[10px] text-muted-foreground">Formato compatible para carga manual en portal CONATEL</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Período</label>
              <Select value={periodoSeleccionado} onValueChange={setPeriodoSeleccionado}>
                <SelectTrigger className="h-10 rounded-xl text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026-Q1">Q1 2026 (Ene-Mar)</SelectItem>
                  <SelectItem value="2025-Q4">Q4 2025 (Oct-Dic)</SelectItem>
                  <SelectItem value="2025-Q3">Q3 2025 (Jul-Sep)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 rounded-xl bg-muted/10 border border-border/30 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Líneas activas</span>
                <span className="font-bold text-foreground">24</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Líneas personales</span>
                <span className="font-bold text-foreground">6</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Líneas corporativas</span>
                <span className="font-bold text-foreground">18</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Ingresos brutos estimados</span>
                <span className="font-bold text-primary">$13,200.00</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Contribución FIDETEL (1%)</span>
                <span className="font-bold text-amber-500">$132.00</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleGenerarReporte} disabled={generando} className="flex-1 h-10 rounded-xl text-xs font-semibold">
                {generando ? <Clock className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <FileSpreadsheet className="mr-1.5 h-3.5 w-3.5" />}
                {generando ? "Generando..." : "Generar XML SIT"}
              </Button>
              <Button variant="outline" className="h-10 rounded-xl text-xs font-semibold">
                <Download className="mr-1.5 h-3.5 w-3.5" /> CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">Resumen Trimestral</CardTitle>
                <CardDescription className="text-[10px] text-muted-foreground">Indicadores clave del período</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5 space-y-3">
            {[
              { label: "Tráfico Total", val: "1,245 GB", trend: "+8.2%", up: true },
              { label: "Ingresos por Servicios", val: "$13,200.00", trend: "+5.7%", up: true },
              { label: "Equipos Homologados", val: "24/24", trend: "100%", up: true },
              { label: "Incidentes de Red", val: "2", trend: "-33%", up: false },
              { label: "Cumplimiento Regulatorio", val: "98.5%", trend: "+1.2%", up: true },
              { label: "Contribución FIDETEL", val: "$132.00", trend: "—", up: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-muted/10 border border-border/30">
                <span className="text-xs text-muted-foreground">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground tabular-nums">{item.val}</span>
                  <Badge variant="outline" className={cn("text-[10px] px-1.5", item.up ? "text-emerald-500 border-emerald-500/20" : "text-rose-500 border-rose-500/20")}>
                    {item.up ? <TrendingUp className="h-2 w-2 mr-0.5" /> : null}
                    {item.trend}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <RecertificacionPanel />
      <FIDETELCalculator />

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">Historial de Reportes</CardTitle>
              <CardDescription className="text-[10px] text-muted-foreground">{REPORTES_HISTORICOS.length} reportes enviados</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/10 border-border/30 hover:bg-muted/10">
                  <TableHead className="pl-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Período</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Formato</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center">Líneas</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-right">Ingresos</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-right">FIDETEL</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center">Estado</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center">Envío</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-right pr-5"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {REPORTES_HISTORICOS.map((r) => (
                  <TableRow key={r.id} className="border-border/30 hover:bg-muted/5 transition-colors">
                    <TableCell className="pl-5 py-3 text-xs font-semibold text-foreground">{r.periodo}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[11px] px-1.5">{r.formato}</Badge>
                    </TableCell>
                    <TableCell className="text-center text-xs text-muted-foreground">{r.lineasReportadas}</TableCell>
                    <TableCell className="text-right text-xs font-bold text-foreground tabular-nums">{r.ingresosBrutos}</TableCell>
                    <TableCell className="text-right text-xs font-bold text-amber-500 tabular-nums">{r.contribucionFIDETEL}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="text-[11px] bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                        <CircleCheck className="h-2.5 w-2.5 mr-0.5" /> Enviado
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-[11px] text-muted-foreground">{r.fechaEnvio}</TableCell>
                    <TableCell className="text-right pr-5">
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md">
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
