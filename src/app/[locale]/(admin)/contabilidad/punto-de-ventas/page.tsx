"use client";

import React, { useState } from "react";
import { Store, CreditCard, Smartphone, TrendingUp, Activity, CheckCircle, AlertCircle, Zap, Download, BarChart2, DollarSign, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const terminales = [
  { id: "POS-001", ubicacion: "Caja Principal", modelo: "Verifone VX520", ventas: 128, monto: "Bs. 45.320,00", estado: "ACTIVO", bateria: 92 },
  { id: "POS-002", ubicacion: "Caja Secundaria", modelo: "Ingenico Move 5000", ventas: 74, monto: "Bs. 23.100,50", estado: "ACTIVO", bateria: 67 },
  { id: "POS-003", ubicacion: "Sala de Ventas", modelo: "Verifone VX680", ventas: 55, monto: "Bs. 18.450,00", estado: "ACTIVO", bateria: 45 },
  { id: "POS-004", ubicacion: "Depósito", modelo: "Inalámbrico PAX A920", ventas: 12, monto: "Bs. 4.200,00", estado: "INACTIVO", bateria: 15 },
];

const ventasHoy = [
  { hora: "08:32", concepto: "Venta #4421 – Contado", monto: "+ Bs. 1.200,00", metodo: "TARJETA DÉBITO", terminal: "POS-001" },
  { hora: "09:10", concepto: "Venta #4422 – Crédito", monto: "+ Bs. 3.500,00", metodo: "TARJETA CRÉDITO", terminal: "POS-001" },
  { hora: "10:45", concepto: "Venta #4423 – Contado", monto: "+ Bs. 850,00", metodo: "EFECTIVO", terminal: "POS-002" },
  { hora: "11:20", concepto: "Venta #4424 – Pago Móvil", monto: "+ Bs. 2.100,00", metodo: "PAGO MÓVIL", terminal: "POS-003" },
  { hora: "12:05", concepto: "Devolución #4420", monto: "- Bs. 450,00", metodo: "TARJETA DÉBITO", terminal: "POS-001" },
];

export default function PuntoDeVentasPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-emerald-500 pl-8 py-2 mt-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-3">
            <Store className="h-3 w-3" /> GESTIÓN PUNTO DE VENTAS
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            PUNTO DE <span className="text-emerald-500 italic">VENTAS</span> INTEGRAL
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            4 Terminales • Tarjetas • Pago Móvil • Efectivo
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2">
            <Download className="h-4 w-4" /> REPORTE DIARIO
          </Button>
          <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
            <Zap className="h-4 w-4" /> NUEVA VENTA
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Ventas Hoy", val: "Bs. 91.070,50", icon: DollarSign, color: "text-emerald-500" },
          { label: "Transacciones", val: "269 Operaciones", icon: Activity, color: "text-primary" },
          { label: "Terminales Activas", val: "3 / 4", icon: Store, color: "text-amber-500" },
          { label: "Última Venta", val: "Hace 8 min", icon: Clock, color: "text-muted-foreground" },
        ].map((kpi, i) => (
          <Card key={i} className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
              <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{kpi.label}</CardTitle>
              <div className="p-2.5 rounded-xl bg-muted border border-border group-hover:scale-110 transition-transform">
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="text-xl font-black italic tracking-tighter text-foreground">{kpi.val}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-emerald-500/10 rounded-xl"><Store className="h-5 w-5 text-emerald-500" /></div>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60 italic">Terminales POS</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {terminales.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className={cn("glass-card border bg-card/40 rounded-2xl p-6 space-y-4 hover:shadow-xl transition-all", t.estado === "ACTIVO" ? "border-emerald-500/20" : "border-rose-500/20")}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-tight italic text-foreground">{t.id}</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase mt-0.5">{t.ubicacion}</p>
                  </div>
                  <Badge className={cn("text-[7px] font-black px-2 py-0.5 border-none uppercase tracking-widest", t.estado === "ACTIVO" ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600")}>
                    {t.estado}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-black italic text-foreground">{t.monto}</p>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase">{t.ventas} ventas hoy</p>
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase text-muted-foreground/60 mb-1">{t.modelo}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[8px] font-black uppercase text-muted-foreground/60">
                      <span>Batería</span><span>{t.bateria}%</span>
                    </div>
                    <Progress value={t.bateria} className={cn("h-1", t.bateria < 20 ? "text-rose-500" : "")} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-xl"><Activity className="h-5 w-5 text-primary" /></div>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60 italic">Ventas del Día</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <Card className="glass-card border-none bg-card/40 rounded-2xl overflow-hidden shadow-sm">
          <div className="divide-y divide-border">
            {ventasHoy.map((v, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-[9px] font-black text-muted-foreground uppercase w-12">{v.hora}</span>
                  <div>
                    <p className="text-[10px] font-black uppercase text-foreground/80">{v.concepto}</p>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase">{v.terminal} · {v.metodo}</p>
                  </div>
                </div>
                <p className={cn("text-[11px] font-black italic", v.monto.startsWith("+") ? "text-emerald-600" : "text-rose-600")}>{v.monto}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
