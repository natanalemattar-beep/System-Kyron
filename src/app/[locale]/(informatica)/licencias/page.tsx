"use client";

import React from "react";
import { FileCheck, Plus, Download, AlertTriangle, CheckCircle, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

const licencias = [
  { software: "Microsoft 365 Business Premium", proveedor: "Microsoft", tipo: "Suscripción", cantidad: 47, costoMensual: "USD 1,034", vencimiento: "Auto-renovación", estado: "vigente" },
  { software: "Windows Server 2022 Datacenter", proveedor: "Microsoft", tipo: "Perpetua", cantidad: 4, costoMensual: "—", vencimiento: "Sin expiración", estado: "vigente" },
  { software: "Adobe Creative Cloud", proveedor: "Adobe", tipo: "Suscripción", cantidad: 8, costoMensual: "USD 440", vencimiento: "15/06/2026", estado: "vigente" },
  { software: "Kaspersky Endpoint Security", proveedor: "Kaspersky", tipo: "Suscripción", cantidad: 55, costoMensual: "USD 275", vencimiento: "30/04/2026", estado: "por_vencer" },
  { software: "SAP Business One (Módulos)", proveedor: "SAP", tipo: "Perpetua + Mant.", cantidad: 1, costoMensual: "USD 450", vencimiento: "Mantenimiento anual", estado: "vigente" },
  { software: "Zoom Business", proveedor: "Zoom", tipo: "Suscripción", cantidad: 15, costoMensual: "USD 300", vencimiento: "01/07/2026", estado: "vigente" },
  { software: "AutoCAD LT", proveedor: "Autodesk", tipo: "Suscripción", cantidad: 3, costoMensual: "USD 165", vencimiento: "01/09/2026", estado: "vigente" },
  { software: "PostgreSQL Enterprise", proveedor: "Open Source", tipo: "Community", cantidad: 4, costoMensual: "USD 0", vencimiento: "—", estado: "vigente" },
  { software: "Let's Encrypt SSL", proveedor: "ISRG", tipo: "Gratuita", cantidad: 12, costoMensual: "USD 0", vencimiento: "Auto-renovación 90d", estado: "vigente" },
];

const estadoConfig: Record<string, { label: string; badge: string }> = {
  vigente: { label: "Vigente", badge: "bg-emerald-500/10 text-emerald-500" },
  por_vencer: { label: "Por Vencer", badge: "bg-amber-500/10 text-amber-500" },
  vencida: { label: "Vencida", badge: "bg-rose-500/10 text-rose-500" },
};

export default function LicenciasPage() {
  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wider text-primary mb-3">
            <FileCheck className="h-3 w-3" /> GESTIÓN DE LICENCIAS
          </div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground uppercase leading-none">
            Licencias de <span className="text-primary italic">Software</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mt-2 italic">
            Inventario • Vencimientos • Costos • Cumplimiento Legal
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-semibold uppercase tracking-widest gap-2">
            <Download className="h-4 w-4" /> EXPORTAR
          </Button>
          <Button className="h-12 px-8 rounded-xl font-semibold text-[10px] uppercase tracking-widest shadow-lg gap-2">
            <Plus className="h-4 w-4" /> NUEVA LICENCIA
          </Button>
        </div>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Total Licencias", val: licencias.length.toString(), icon: FileCheck, color: "text-primary" },
          { label: "Costo Mensual", val: "USD 2,664", icon: DollarSign, color: "text-amber-500" },
          { label: "Vigentes", val: licencias.filter(l => l.estado === "vigente").length.toString(), icon: CheckCircle, color: "text-emerald-500" },
          { label: "Por Vencer", val: licencias.filter(l => l.estado === "por_vencer").length.toString(), icon: AlertTriangle, color: "text-amber-500" },
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="bg-card/60 border-border/50 p-5 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{kpi.label}</span>
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
              <p className={cn("text-xl font-bold tracking-tight", kpi.color)}>{kpi.val}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="rounded-2xl overflow-hidden">
        <CardHeader className="p-5 border-b bg-muted/10">
          <CardTitle className="text-xs font-semibold uppercase tracking-widest">Inventario de Licencias</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="text-[11px] uppercase tracking-widest">
                <TableHead>Software</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-center">Cant.</TableHead>
                <TableHead>Costo/Mes</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {licencias.map((lic, i) => {
                const est = estadoConfig[lic.estado];
                return (
                  <TableRow key={i} className="hover:bg-muted/20">
                    <TableCell className="text-xs font-bold">{lic.software}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{lic.proveedor}</TableCell>
                    <TableCell><Badge className="text-[10px] font-bold bg-muted/30">{lic.tipo}</Badge></TableCell>
                    <TableCell className="text-center text-xs font-bold">{lic.cantidad}</TableCell>
                    <TableCell className="text-xs font-mono">{lic.costoMensual}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{lic.vencimiento}</TableCell>
                    <TableCell><Badge className={cn("text-[10px] font-bold", est.badge)}>{est.label}</Badge></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {licencias.some(l => l.estado === "por_vencer") && (
        <Card className="border-amber-500/20 bg-amber-500/[0.03] rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">Licencias por Vencer</p>
              <p className="text-[11px] text-muted-foreground mt-1">
                {licencias.filter(l => l.estado === "por_vencer").map(l => l.software).join(", ")} — vence pronto.
                Se recomienda iniciar el proceso de renovación con antelación para evitar interrupciones del servicio.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
