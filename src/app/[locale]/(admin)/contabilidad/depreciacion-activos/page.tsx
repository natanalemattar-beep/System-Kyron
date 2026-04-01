"use client";

import React from "react";
import { HardDrive, TrendingDown, Calendar, Download, Plus, Calculator, ShieldCheck, AlertTriangle, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const activos = [
  {
    codigo: "AF-001",
    nombre: "Servidor Dell PowerEdge R750",
    categoria: "Equipo de Computación",
    fechaAdquisicion: "15/01/2024",
    costoOriginal: "Bs. 450.000,00",
    vidaUtil: "5 años",
    metodo: "Línea Recta",
    depAcumulada: "Bs. 202.500,00",
    depMensual: "Bs. 7.500,00",
    valorLibros: "Bs. 247.500,00",
    porcentajeDepreciado: 45,
  },
  {
    codigo: "AF-002",
    nombre: "Estación de Trabajo HP Z8 (x8)",
    categoria: "Equipo de Computación",
    fechaAdquisicion: "01/03/2024",
    costoOriginal: "Bs. 800.000,00",
    vidaUtil: "5 años",
    metodo: "Línea Recta",
    depAcumulada: "Bs. 326.666,67",
    depMensual: "Bs. 13.333,33",
    valorLibros: "Bs. 473.333,33",
    porcentajeDepreciado: 41,
  },
  {
    codigo: "AF-003",
    nombre: "Mobiliario de Oficina Premium",
    categoria: "Mobiliario",
    fechaAdquisicion: "01/06/2023",
    costoOriginal: "Bs. 350.000,00",
    vidaUtil: "10 años",
    metodo: "Línea Recta",
    depAcumulada: "Bs. 99.166,67",
    depMensual: "Bs. 2.916,67",
    valorLibros: "Bs. 250.833,33",
    porcentajeDepreciado: 28,
  },
  {
    codigo: "AF-004",
    nombre: "Vehículo Toyota Hilux 2024",
    categoria: "Vehículos",
    fechaAdquisicion: "15/04/2024",
    costoOriginal: "Bs. 1.200.000,00",
    vidaUtil: "5 años",
    metodo: "Línea Recta",
    depAcumulada: "Bs. 480.000,00",
    depMensual: "Bs. 20.000,00",
    valorLibros: "Bs. 720.000,00",
    porcentajeDepreciado: 40,
  },
  {
    codigo: "AF-005",
    nombre: "Sistema de Aire Acondicionado Central",
    categoria: "Instalaciones",
    fechaAdquisicion: "01/01/2024",
    costoOriginal: "Bs. 280.000,00",
    vidaUtil: "15 años",
    metodo: "Línea Recta",
    depAcumulada: "Bs. 42.000,00",
    depMensual: "Bs. 1.555,56",
    valorLibros: "Bs. 238.000,00",
    porcentajeDepreciado: 15,
  },
  {
    codigo: "AF-006",
    nombre: "Software ERP Licencia Perpetua",
    categoria: "Intangibles",
    fechaAdquisicion: "01/07/2024",
    costoOriginal: "Bs. 420.000,00",
    vidaUtil: "3 años",
    metodo: "Línea Recta",
    depAcumulada: "Bs. 126.000,00",
    depMensual: "Bs. 11.666,67",
    valorLibros: "Bs. 294.000,00",
    porcentajeDepreciado: 30,
  },
];

export default function DepreciacionActivosPage() {
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
            <HardDrive className="h-3 w-3" /> ACTIVOS FIJOS
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Depreciación de <span className="text-primary italic">Activos</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            VEN-NIF • Línea Recta / Doble Saldo • Valores Fiscales • ISLR Art. 27
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2">
            <Download className="h-4 w-4" /> EXPORTAR
          </Button>
          <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2">
            <Plus className="h-4 w-4" /> NUEVO ACTIVO
          </Button>
        </div>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Costo Total Activos", val: "Bs. 3.500.000", icon: HardDrive, color: "text-primary" },
          { label: "Dep. Acumulada", val: "Bs. 1.276.334", icon: TrendingDown, color: "text-rose-500" },
          { label: "Valor en Libros", val: "Bs. 2.223.666", icon: Calculator, color: "text-emerald-500" },
          { label: "Dep. Mensual", val: "Bs. 56.972", icon: Calendar, color: "text-amber-500" },
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

      <Card className="rounded-2xl overflow-hidden">
        <CardHeader className="p-5 border-b bg-muted/20">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs font-black uppercase tracking-widest">Cuadro de Depreciación</CardTitle>
            <Button size="sm" className="rounded-lg text-[10px] font-bold gap-1.5"
              onClick={() => toast({ title: "Calculando", description: "Procesando depreciación del mes..." })}>
              <Zap className="h-3 w-3" /> Calcular Mes Actual
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="text-[9px] uppercase tracking-widest">
                <TableHead>Código</TableHead>
                <TableHead>Activo</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Costo Original</TableHead>
                <TableHead>Vida Útil</TableHead>
                <TableHead>Dep. Acumulada</TableHead>
                <TableHead>Dep. Mensual</TableHead>
                <TableHead>Valor Libros</TableHead>
                <TableHead>%</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activos.map((activo) => (
                <TableRow key={activo.codigo} className="hover:bg-muted/20">
                  <TableCell className="font-mono text-[11px] font-bold text-primary">{activo.codigo}</TableCell>
                  <TableCell className="text-xs font-medium max-w-[200px]">
                    <p className="truncate">{activo.nombre}</p>
                    <p className="text-[9px] text-muted-foreground">{activo.metodo} • Desde: {activo.fechaAdquisicion}</p>
                  </TableCell>
                  <TableCell>
                    <Badge className="text-[8px] font-bold bg-muted/50">{activo.categoria}</Badge>
                  </TableCell>
                  <TableCell className="text-xs font-mono">{activo.costoOriginal}</TableCell>
                  <TableCell className="text-xs text-center">{activo.vidaUtil}</TableCell>
                  <TableCell className="text-xs font-mono text-rose-500">{activo.depAcumulada}</TableCell>
                  <TableCell className="text-xs font-mono text-amber-500">{activo.depMensual}</TableCell>
                  <TableCell className="text-xs font-mono font-bold">{activo.valorLibros}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={activo.porcentajeDepreciado} className="h-1.5 w-16" />
                      <span className="text-[10px] font-mono">{activo.porcentajeDepreciado}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-primary/[0.03] rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-black text-primary uppercase tracking-wider">Cumplimiento Fiscal — ISLR Art. 27</p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Las tasas y métodos de depreciación cumplen con lo establecido en el Art. 27 de la Ley de ISLR y el Reglamento de la LISLR.
              Equipos de computación: 5 años (20%). Mobiliario: 10 años (10%). Vehículos: 5 años (20%). Edificaciones: 20 años (5%).
              Los activos intangibles se amortizan según su vida útil estimada o duración de la licencia.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
