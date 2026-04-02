"use client";

import React, { useState } from "react";
import { BookOpen, Plus, Search, ChevronRight, ChevronDown, Folder, FolderOpen, Hash, Download, Upload, Filter, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type Cuenta = {
  codigo: string;
  nombre: string;
  tipo: "activo" | "pasivo" | "patrimonio" | "ingreso" | "gasto" | "costo" | "orden";
  naturaleza: "deudora" | "acreedora";
  nivel: number;
  subcuentas?: Cuenta[];
  saldo?: string;
};

const planCuentas: Cuenta[] = [
  {
    codigo: "1", nombre: "ACTIVOS", tipo: "activo", naturaleza: "deudora", nivel: 1, saldo: "Bs. 12.458.320,00",
    subcuentas: [
      {
        codigo: "1.1", nombre: "Activo Corriente", tipo: "activo", naturaleza: "deudora", nivel: 2, saldo: "Bs. 8.234.100,00",
        subcuentas: [
          { codigo: "1.1.01", nombre: "Efectivo y Equivalentes", tipo: "activo", naturaleza: "deudora", nivel: 3, saldo: "Bs. 2.847.320,00" },
          { codigo: "1.1.02", nombre: "Bancos Nacionales", tipo: "activo", naturaleza: "deudora", nivel: 3, saldo: "Bs. 3.452.630,00" },
          { codigo: "1.1.03", nombre: "Cuentas por Cobrar Comerciales", tipo: "activo", naturaleza: "deudora", nivel: 3, saldo: "Bs. 934.150,00" },
          { codigo: "1.1.04", nombre: "Inventarios", tipo: "activo", naturaleza: "deudora", nivel: 3, saldo: "Bs. 800.000,00" },
          { codigo: "1.1.05", nombre: "IVA Crédito Fiscal", tipo: "activo", naturaleza: "deudora", nivel: 3, saldo: "Bs. 200.000,00" },
        ],
      },
      {
        codigo: "1.2", nombre: "Activo No Corriente", tipo: "activo", naturaleza: "deudora", nivel: 2, saldo: "Bs. 4.224.220,00",
        subcuentas: [
          { codigo: "1.2.01", nombre: "Propiedad, Planta y Equipo", tipo: "activo", naturaleza: "deudora", nivel: 3, saldo: "Bs. 3.500.000,00" },
          { codigo: "1.2.02", nombre: "Depreciación Acumulada", tipo: "activo", naturaleza: "acreedora", nivel: 3, saldo: "-Bs. 875.780,00" },
          { codigo: "1.2.03", nombre: "Activos Intangibles", tipo: "activo", naturaleza: "deudora", nivel: 3, saldo: "Bs. 600.000,00" },
          { codigo: "1.2.04", nombre: "Inversiones a Largo Plazo", tipo: "activo", naturaleza: "deudora", nivel: 3, saldo: "Bs. 1.000.000,00" },
        ],
      },
    ],
  },
  {
    codigo: "2", nombre: "PASIVOS", tipo: "pasivo", naturaleza: "acreedora", nivel: 1, saldo: "Bs. 5.124.800,00",
    subcuentas: [
      {
        codigo: "2.1", nombre: "Pasivo Corriente", tipo: "pasivo", naturaleza: "acreedora", nivel: 2, saldo: "Bs. 3.624.800,00",
        subcuentas: [
          { codigo: "2.1.01", nombre: "Cuentas por Pagar Proveedores", tipo: "pasivo", naturaleza: "acreedora", nivel: 3, saldo: "Bs. 412.800,00" },
          { codigo: "2.1.02", nombre: "IVA Débito Fiscal", tipo: "pasivo", naturaleza: "acreedora", nivel: 3, saldo: "Bs. 320.000,00" },
          { codigo: "2.1.03", nombre: "Retenciones IVA por Pagar", tipo: "pasivo", naturaleza: "acreedora", nivel: 3, saldo: "Bs. 180.000,00" },
          { codigo: "2.1.04", nombre: "Retenciones ISLR por Pagar", tipo: "pasivo", naturaleza: "acreedora", nivel: 3, saldo: "Bs. 150.000,00" },
          { codigo: "2.1.05", nombre: "Nómina por Pagar", tipo: "pasivo", naturaleza: "acreedora", nivel: 3, saldo: "Bs. 1.200.000,00" },
          { codigo: "2.1.06", nombre: "Aportes IVSS/FAOV/INCES por Pagar", tipo: "pasivo", naturaleza: "acreedora", nivel: 3, saldo: "Bs. 362.000,00" },
          { codigo: "2.1.07", nombre: "Prestaciones Sociales por Pagar", tipo: "pasivo", naturaleza: "acreedora", nivel: 3, saldo: "Bs. 1.000.000,00" },
        ],
      },
      {
        codigo: "2.2", nombre: "Pasivo No Corriente", tipo: "pasivo", naturaleza: "acreedora", nivel: 2, saldo: "Bs. 1.500.000,00",
        subcuentas: [
          { codigo: "2.2.01", nombre: "Préstamos Bancarios L/P", tipo: "pasivo", naturaleza: "acreedora", nivel: 3, saldo: "Bs. 1.500.000,00" },
        ],
      },
    ],
  },
  {
    codigo: "3", nombre: "PATRIMONIO", tipo: "patrimonio", naturaleza: "acreedora", nivel: 1, saldo: "Bs. 7.333.520,00",
    subcuentas: [
      { codigo: "3.1", nombre: "Capital Social", tipo: "patrimonio", naturaleza: "acreedora", nivel: 2, saldo: "Bs. 5.000.000,00" },
      { codigo: "3.2", nombre: "Reserva Legal (5%)", tipo: "patrimonio", naturaleza: "acreedora", nivel: 2, saldo: "Bs. 500.000,00" },
      { codigo: "3.3", nombre: "Utilidades No Distribuidas", tipo: "patrimonio", naturaleza: "acreedora", nivel: 2, saldo: "Bs. 1.833.520,00" },
    ],
  },
  {
    codigo: "4", nombre: "INGRESOS", tipo: "ingreso", naturaleza: "acreedora", nivel: 1, saldo: "Bs. 8.934.150,00",
    subcuentas: [
      { codigo: "4.1", nombre: "Ingresos por Ventas", tipo: "ingreso", naturaleza: "acreedora", nivel: 2, saldo: "Bs. 7.500.000,00" },
      { codigo: "4.2", nombre: "Ingresos por Servicios", tipo: "ingreso", naturaleza: "acreedora", nivel: 2, saldo: "Bs. 1.200.000,00" },
      { codigo: "4.3", nombre: "Otros Ingresos", tipo: "ingreso", naturaleza: "acreedora", nivel: 2, saldo: "Bs. 234.150,00" },
    ],
  },
  {
    codigo: "5", nombre: "COSTOS", tipo: "costo", naturaleza: "deudora", nivel: 1, saldo: "Bs. 4.467.075,00",
    subcuentas: [
      { codigo: "5.1", nombre: "Costo de Ventas", tipo: "costo", naturaleza: "deudora", nivel: 2, saldo: "Bs. 4.467.075,00" },
    ],
  },
  {
    codigo: "6", nombre: "GASTOS", tipo: "gasto", naturaleza: "deudora", nivel: 1, saldo: "Bs. 2.286.655,00",
    subcuentas: [
      { codigo: "6.1", nombre: "Gastos de Administración", tipo: "gasto", naturaleza: "deudora", nivel: 2, saldo: "Bs. 1.200.000,00" },
      { codigo: "6.2", nombre: "Gastos de Ventas", tipo: "gasto", naturaleza: "deudora", nivel: 2, saldo: "Bs. 600.000,00" },
      { codigo: "6.3", nombre: "Gastos Financieros", tipo: "gasto", naturaleza: "deudora", nivel: 2, saldo: "Bs. 180.000,00" },
      { codigo: "6.4", nombre: "Depreciación y Amortización", tipo: "gasto", naturaleza: "deudora", nivel: 2, saldo: "Bs. 306.655,00" },
    ],
  },
];

const tipoColors: Record<string, { text: string; bg: string }> = {
  activo: { text: "text-primary", bg: "bg-primary/10" },
  pasivo: { text: "text-rose-500", bg: "bg-rose-500/10" },
  patrimonio: { text: "text-violet-500", bg: "bg-violet-500/10" },
  ingreso: { text: "text-emerald-500", bg: "bg-emerald-500/10" },
  costo: { text: "text-amber-500", bg: "bg-amber-500/10" },
  gasto: { text: "text-orange-500", bg: "bg-orange-500/10" },
  orden: { text: "text-cyan-500", bg: "bg-cyan-500/10" },
};

function CuentaRow({ cuenta, depth = 0 }: { cuenta: Cuenta; depth?: number }) {
  const [open, setOpen] = useState(depth < 2);
  const hasSub = cuenta.subcuentas && cuenta.subcuentas.length > 0;
  const tc = tipoColors[cuenta.tipo] || tipoColors.activo;

  return (
    <>
      <div
        className={cn(
          "flex items-center gap-2 py-2.5 px-4 hover:bg-muted/30 transition-colors cursor-pointer border-b border-border/30",
          depth === 0 && "bg-muted/20 font-bold"
        )}
        style={{ paddingLeft: `${16 + depth * 24}px` }}
        onClick={() => hasSub && setOpen(!open)}
      >
        <div className="w-5 flex items-center justify-center">
          {hasSub ? (
            open ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          ) : (
            <Hash className="h-3 w-3 text-muted-foreground/40" />
          )}
        </div>
        <span className="font-mono text-[11px] text-muted-foreground w-16 shrink-0">{cuenta.codigo}</span>
        <span className={cn("flex-1 text-xs", depth === 0 ? "font-black uppercase tracking-wide" : "font-medium")}>{cuenta.nombre}</span>
        <Badge className={cn("text-[8px] font-bold uppercase", tc.bg, tc.text)}>{cuenta.naturaleza}</Badge>
        {cuenta.saldo && (
          <span className={cn("text-xs font-mono font-bold w-40 text-right", tc.text)}>{cuenta.saldo}</span>
        )}
      </div>
      {open && hasSub && cuenta.subcuentas!.map(sub => (
        <CuentaRow key={sub.codigo} cuenta={sub} depth={depth + 1} />
      ))}
    </>
  );
}

export default function PlanCuentasPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <BookOpen className="h-3 w-3" /> CATÁLOGO CONTABLE
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Plan de <span className="text-primary italic">Cuentas</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            VEN-NIF • Catálogo Configurable • Partida Doble
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2">
            <Upload className="h-4 w-4" /> IMPORTAR
          </Button>
          <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2">
            <Plus className="h-4 w-4" /> NUEVA CUENTA
          </Button>
        </div>
      </motion.header>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {Object.entries(tipoColors).map(([tipo, colors]) => (
          <div key={tipo} className={cn("p-3 rounded-xl border", colors.bg)}>
            <p className={cn("text-[9px] font-black uppercase tracking-widest", colors.text)}>{tipo}</p>
            <p className="text-lg font-bold text-foreground mt-1">
              {planCuentas.find(c => c.tipo === tipo)?.subcuentas?.length ?? 0}
            </p>
          </div>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Buscar cuenta por código o nombre..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-10 h-11 rounded-xl"
        />
      </div>

      <Card className="rounded-2xl overflow-hidden">
        <CardHeader className="p-4 bg-muted/20 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs font-black uppercase tracking-widest">Estructura del Plan de Cuentas</CardTitle>
            <Button variant="outline" size="sm" className="text-[10px] font-bold gap-1.5 rounded-lg">
              <Download className="h-3 w-3" /> Exportar Excel
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center gap-2 px-4 py-2 bg-muted/10 border-b text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
            <span className="w-5" />
            <span className="w-16">Código</span>
            <span className="flex-1">Nombre de la Cuenta</span>
            <span className="w-20 text-center">Naturaleza</span>
            <span className="w-40 text-right">Saldo</span>
          </div>
          {planCuentas
            .filter(c => !search || c.nombre.toLowerCase().includes(search.toLowerCase()) || c.codigo.includes(search))
            .map(cuenta => (
              <CuentaRow key={cuenta.codigo} cuenta={cuenta} />
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
