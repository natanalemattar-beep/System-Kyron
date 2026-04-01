"use client";

import React, { useState } from "react";
import { BookOpen, Plus, Search, ArrowRightLeft, Calendar, Download, Filter, ShieldCheck, Zap, Eye, Hash } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const asientos = [
  {
    numero: "AST-000042",
    fecha: "01/04/2026",
    descripcion: "Venta de mercancía al contado — FAC-000089",
    tipo: "Ingreso",
    estado: "Contabilizado",
    partidas: [
      { cuenta: "1.1.01 Efectivo y Equivalentes", debe: "Bs. 1.450.000,00", haber: "" },
      { cuenta: "4.1 Ingresos por Ventas", debe: "", haber: "Bs. 1.250.000,00" },
      { cuenta: "2.1.02 IVA Débito Fiscal (16%)", debe: "", haber: "Bs. 200.000,00" },
    ],
    totalDebe: "Bs. 1.450.000,00",
    totalHaber: "Bs. 1.450.000,00",
  },
  {
    numero: "AST-000041",
    fecha: "31/03/2026",
    descripcion: "Pago de nómina quincenal — Marzo 2da quincena",
    tipo: "Gasto",
    estado: "Contabilizado",
    partidas: [
      { cuenta: "6.1 Gastos de Administración", debe: "Bs. 600.000,00", haber: "" },
      { cuenta: "6.2 Gastos de Ventas", debe: "Bs. 300.000,00", haber: "" },
      { cuenta: "2.1.04 Retenciones ISLR por Pagar", debe: "", haber: "Bs. 45.000,00" },
      { cuenta: "2.1.06 Aportes IVSS/FAOV/INCES", debe: "", haber: "Bs. 90.000,00" },
      { cuenta: "1.1.02 Bancos Nacionales", debe: "", haber: "Bs. 765.000,00" },
    ],
    totalDebe: "Bs. 900.000,00",
    totalHaber: "Bs. 900.000,00",
  },
  {
    numero: "AST-000040",
    fecha: "30/03/2026",
    descripcion: "Compra de inventario a crédito — Proveedor ABC C.A.",
    tipo: "Costo",
    estado: "Contabilizado",
    partidas: [
      { cuenta: "1.1.04 Inventarios", debe: "Bs. 800.000,00", haber: "" },
      { cuenta: "1.1.05 IVA Crédito Fiscal", debe: "Bs. 128.000,00", haber: "" },
      { cuenta: "2.1.01 Cuentas por Pagar Proveedores", debe: "", haber: "Bs. 928.000,00" },
    ],
    totalDebe: "Bs. 928.000,00",
    totalHaber: "Bs. 928.000,00",
  },
  {
    numero: "AST-000039",
    fecha: "28/03/2026",
    descripcion: "Depreciación mensual — Equipos de computación y mobiliario",
    tipo: "Ajuste",
    estado: "Contabilizado",
    partidas: [
      { cuenta: "6.4 Depreciación y Amortización", debe: "Bs. 25.554,58", haber: "" },
      { cuenta: "1.2.02 Depreciación Acumulada", debe: "", haber: "Bs. 25.554,58" },
    ],
    totalDebe: "Bs. 25.554,58",
    totalHaber: "Bs. 25.554,58",
  },
  {
    numero: "AST-000038",
    fecha: "25/03/2026",
    descripcion: "Pago de servicios públicos — CORPOELEC, Hidrocapital, CANTV",
    tipo: "Gasto",
    estado: "Contabilizado",
    partidas: [
      { cuenta: "6.1 Gastos de Administración", debe: "Bs. 45.000,00", haber: "" },
      { cuenta: "1.1.02 Bancos Nacionales", debe: "", haber: "Bs. 45.000,00" },
    ],
    totalDebe: "Bs. 45.000,00",
    totalHaber: "Bs. 45.000,00",
  },
];

const tipoColor: Record<string, string> = {
  Ingreso: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Gasto: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  Costo: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Ajuste: "bg-violet-500/10 text-violet-500 border-violet-500/20",
};

export default function AsientosContablesPage() {
  const { toast } = useToast();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <ArrowRightLeft className="h-3 w-3" /> PARTIDA DOBLE
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Asientos <span className="text-primary italic">Contables</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Registros de Partida Doble • Debe = Haber • Auditoría Integrada
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2">
            <Download className="h-4 w-4" /> EXPORTAR
          </Button>
          <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2">
            <Plus className="h-4 w-4" /> NUEVO ASIENTO
          </Button>
        </div>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Asientos del Mes", val: "42", icon: BookOpen, color: "text-primary" },
          { label: "Total Debe", val: "Bs. 18.450.320", icon: ArrowRightLeft, color: "text-emerald-500" },
          { label: "Total Haber", val: "Bs. 18.450.320", icon: ArrowRightLeft, color: "text-emerald-500" },
          { label: "Diferencia", val: "Bs. 0,00", icon: ShieldCheck, color: "text-emerald-500" },
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

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar asiento por número, descripción o cuenta..." className="pl-10 h-11 rounded-xl" />
      </div>

      <div className="space-y-4">
        {asientos.map((asiento, i) => (
          <motion.div key={asiento.numero} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Card className="rounded-xl overflow-hidden border-border/50 hover:border-primary/30 transition-colors">
              <div
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/20 transition-colors"
                onClick={() => setExpandedId(expandedId === asiento.numero ? null : asiento.numero)}
              >
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Hash className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary">{asiento.numero}</span>
                    <Badge className={cn("text-[8px] font-bold", tipoColor[asiento.tipo])}>{asiento.tipo}</Badge>
                  </div>
                  <p className="text-xs text-foreground font-medium mt-0.5 truncate">{asiento.descripcion}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] text-muted-foreground">{asiento.fecha}</p>
                  <p className="text-xs font-bold text-foreground">{asiento.totalDebe}</p>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-500 text-[8px]">{asiento.estado}</Badge>
              </div>
              {expandedId === asiento.numero && (
                <div className="border-t bg-muted/10 p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-[10px] font-bold uppercase">Cuenta</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase text-right">Debe</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase text-right">Haber</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {asiento.partidas.map((p, j) => (
                        <TableRow key={j}>
                          <TableCell className="text-xs font-medium">{p.cuenta}</TableCell>
                          <TableCell className="text-xs font-mono text-right text-emerald-600">{p.debe}</TableCell>
                          <TableCell className="text-xs font-mono text-right text-rose-500">{p.haber}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="border-t-2 border-foreground/20">
                        <TableCell className="text-xs font-black uppercase">TOTALES</TableCell>
                        <TableCell className="text-xs font-mono font-black text-right text-emerald-600">{asiento.totalDebe}</TableCell>
                        <TableCell className="text-xs font-mono font-black text-right text-rose-500">{asiento.totalHaber}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
