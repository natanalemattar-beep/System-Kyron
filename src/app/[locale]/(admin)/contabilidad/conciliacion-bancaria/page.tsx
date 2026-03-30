"use client";

import React, { useState } from "react";
import { RefreshCw, CheckCircle, AlertTriangle, Building2, Banknote, TrendingUp, Clock, Download, Filter, Zap, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const bancos = [
  {
    nombre: "Banco de Venezuela",
    cuenta: "0102-0254-81-0000012234",
    saldo: "Bs. 1.248.430,00",
    usd: "≈ $24.968 USD",
    movimientos: 128,
    estado: "CONCILIADO",
    match: 100,
    color: "text-red-600",
    bg: "bg-red-600/10",
    border: "border-red-600/20",
  },
  {
    nombre: "Banesco",
    cuenta: "0134-0251-54-2512348821",
    saldo: "Bs. 894.750,00",
    usd: "≈ $17.895 USD",
    movimientos: 84,
    estado: "CONCILIADO",
    match: 99,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  {
    nombre: "Mercantil",
    cuenta: "0105-0081-41-1081234567",
    saldo: "Bs. 512.100,00",
    usd: "≈ $10.242 USD",
    movimientos: 61,
    estado: "PENDIENTE",
    match: 82,
    color: "text-blue-600",
    bg: "bg-blue-600/10",
    border: "border-blue-600/20",
  },
  {
    nombre: "BBVA Provincial",
    cuenta: "0108-0171-81-0100012345",
    saldo: "Bs. 192.040,00",
    usd: "≈ $3.840 USD",
    movimientos: 33,
    estado: "CONCILIADO",
    match: 100,
    color: "text-cyan-600",
    bg: "bg-cyan-600/10",
    border: "border-cyan-600/20",
  },
  {
    nombre: "BNC",
    cuenta: "0191-0037-14-2100234512",
    saldo: "Bs. 78.220,00",
    usd: "≈ $1.564 USD",
    movimientos: 18,
    estado: "CONCILIADO",
    match: 97,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    nombre: "BOD",
    cuenta: "0116-0102-51-2100123456",
    saldo: "Bs. 45.300,00",
    usd: "≈ $906 USD",
    movimientos: 12,
    estado: "CONCILIADO",
    match: 100,
    color: "text-emerald-600",
    bg: "bg-emerald-600/10",
    border: "border-emerald-600/20",
  },
];

const movimientosRecientes = [
  { fecha: "18/03/2026", concepto: "Transferencia entrante – Distribuidora El Sol C.A.", monto: "+ Bs. 148.500,00", banco: "BdV", tipo: "CRÉDITO", estado: "CONCILIADO" },
  { fecha: "18/03/2026", concepto: "Pago SENIAT – Retención IVA 75% Marzo", monto: "- Bs. 84.320,00", banco: "Banesco", tipo: "DÉBITO", estado: "CONCILIADO" },
  { fecha: "18/03/2026", concepto: "Cobro POS Terminal 001 – Ventas diarias", monto: "+ Bs. 62.400,00", banco: "Mercantil", tipo: "CRÉDITO", estado: "CONCILIADO" },
  { fecha: "17/03/2026", concepto: "Nómina empleados – Período 01-15/03/2026", monto: "- Bs. 312.000,00", banco: "BdV", tipo: "DÉBITO", estado: "CONCILIADO" },
  { fecha: "17/03/2026", concepto: "Pago proveedor – Ferretería Central C.A. (RIF J-00123456-7)", monto: "- Bs. 94.200,00", banco: "Banesco", tipo: "DÉBITO", estado: "CONCILIADO" },
  { fecha: "16/03/2026", concepto: "Transferencia pendiente – Grupo Inversiones del Norte", monto: "- Bs. 45.000,00", banco: "Mercantil", tipo: "DÉBITO", estado: "PENDIENTE" },
  { fecha: "16/03/2026", concepto: "Cobro Zelle $2,800 a tasa BCV Bs. 50.45", monto: "+ Bs. 141.260,00", banco: "BdV", tipo: "CRÉDITO", estado: "CONCILIADO" },
  { fecha: "15/03/2026", concepto: "IGTF 3% – Operaciones divisas febrero", monto: "- Bs. 28.440,00", banco: "Banesco", tipo: "DÉBITO", estado: "CONCILIADO" },
];

export default function ConciliacionBancariaPage() {
  const { toast } = useToast();
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    toast({ title: "SINCRONIZANDO BANCOS", description: "Conectando con BCV, Banesco, Mercantil, BdV, BBVA Provincial, BNC, BOD..." });
    setTimeout(() => {
      setIsSyncing(false);
      toast({ title: "CONCILIACIÓN COMPLETADA", description: "6 bancos sincronizados. 1 diferencia en Mercantil (Bs. 45.000). Revisión recomendada." });
    }, 2800);
  };

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-blue-500 pl-8 py-2 mt-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-blue-500 mb-3">
            <RefreshCw className="h-3 w-3" /> CONCILIACIÓN BANCARIA AUTOMÁTICA · 6 BANCOS
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            GESTIÓN Y <span className="text-blue-500 italic">CONCILIACIÓN</span> BANCARIA
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            BdV · Banesco · Mercantil · BBVA Provincial · BNC · BOD · Actualización en Tiempo Real
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2">
            <Download className="h-4 w-4" /> EXPORTAR EXCEL
          </Button>
          <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2" onClick={handleSync} disabled={isSyncing}>
            {isSyncing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            SINCRONIZAR BANCOS
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Saldo Consolidado Bs.", val: "Bs. 2.970.840,00", icon: Banknote, color: "text-blue-500" },
          { label: "Equivalente USD (BCV)", val: "$59.416 USD", icon: TrendingUp, color: "text-emerald-500" },
          { label: "Conciliación Global", val: "97.8%", icon: CheckCircle, color: "text-emerald-500" },
          { label: "Última Sincronización", val: "Hoy 12:34 PM", icon: Clock, color: "text-primary" },
        ].map((kpi, i) => (
          <Card key={i} className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
              <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{kpi.label}</CardTitle>
              <div className="p-2.5 rounded-xl bg-muted border border-border group-hover:scale-110 transition-transform">
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="text-xl font-black italic tracking-tight text-foreground">{kpi.val}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-500/10 rounded-xl"><Building2 className="h-5 w-5 text-blue-500" /></div>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60 italic">Cuentas Bancarias Corporativas</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bancos.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className={cn("glass-card border bg-card/40 rounded-2xl p-6 space-y-4 hover:shadow-xl transition-all", b.border)}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className={cn("text-[11px] font-black uppercase tracking-tight italic", b.color)}>{b.nombre}</p>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase mt-0.5">{b.cuenta}</p>
                  </div>
                  <Badge className={cn("text-[7px] font-black px-2 py-0.5 border-none uppercase tracking-widest", b.bg, b.color)}>
                    {b.estado}
                  </Badge>
                </div>
                <div>
                  <p className="text-lg font-black italic text-foreground">{b.saldo}</p>
                  <p className={cn("text-[9px] font-black italic mt-0.5", b.color)}>{b.usd}</p>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase mt-1">{b.movimientos} movimientos este mes</p>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[8px] font-black uppercase text-muted-foreground/60">
                    <span>Conciliación</span><span>{b.match}%</span>
                  </div>
                  <Progress value={b.match} className="h-1 bg-muted" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-xl"><Zap className="h-5 w-5 text-primary" /></div>
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60 italic">Movimientos Recientes – Marzo 2026</h2>
          </div>
          <Button variant="outline" size="sm" className="text-[9px] font-black uppercase tracking-widest gap-2">
            <Filter className="h-3 w-3" /> FILTRAR
          </Button>
        </div>
        <Card className="glass-card border-none bg-card/40 rounded-2xl overflow-hidden shadow-sm">
          <div className="divide-y divide-border">
            {movimientosRecientes.map((m, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={cn("w-2 h-2 rounded-full shrink-0", m.tipo === "CRÉDITO" ? "bg-emerald-500" : "bg-rose-500")} />
                  <div>
                    <p className="text-[10px] font-black uppercase text-foreground/80">{m.concepto}</p>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase">{m.fecha} · {m.banco}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <p className={cn("text-[11px] font-black italic", m.tipo === "CRÉDITO" ? "text-emerald-600" : "text-rose-600")}>{m.monto}</p>
                  <Badge className={cn("text-[7px] font-black px-2 py-0.5 border-none uppercase tracking-widest hidden md:block", m.estado === "CONCILIADO" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600")}>
                    {m.estado}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
