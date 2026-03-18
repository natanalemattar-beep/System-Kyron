"use client";

import React, { useState } from "react";
import { CreditCard, Smartphone, Wallet, CheckCircle, Zap, Activity, Clock, Shield, ArrowRight, TrendingUp, RefreshCw, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const mediosPago = [
  {
    tipo: "Tarjeta de Crédito",
    icon: CreditCard,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    transacciones: 312,
    monto: "Bs. 1.248.430,00",
    usd: "≈ $24.750 USD",
    comision: "2.5% + IGTF",
    redes: ["Visa", "Mastercard", "American Express", "Diners Club"],
    estado: "ACTIVO",
  },
  {
    tipo: "Tarjeta de Débito",
    icon: CreditCard,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    transacciones: 548,
    monto: "Bs. 892.100,00",
    usd: "≈ $17.692 USD",
    comision: "1.0% + IVA",
    redes: ["Visa Débito", "Maestro Electron", "MasterCard Débito"],
    estado: "ACTIVO",
  },
  {
    tipo: "Billeteras Virtuales",
    icon: Wallet,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    transacciones: 187,
    monto: "$18.420 USD",
    usd: "Bs. 928.289,00 (BCV)",
    comision: "0.5% promedio",
    redes: ["Zelle", "Reserve", "Binance Pay", "PayPal", "USDT TRC-20"],
    estado: "ACTIVO",
  },
  {
    tipo: "Pago Móvil Verificado",
    icon: Smartphone,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    transacciones: 1284,
    monto: "Bs. 2.140.830,00",
    usd: "≈ $42.435 USD",
    comision: "0% comisión",
    redes: ["BdV 0102", "Banesco 0134", "Mercantil 0105", "BBVA 0108", "BNC 0191", "BOD 0116", "Bancaribe 0128"],
    estado: "ACTIVO",
  },
];

const pagoMovilRecientes = [
  { cedula: "V-12.345.678", nombre: "María Alejandra García", banco: "Banesco (0134)", monto: "Bs. 48.500,00", ref: "202603180001", hora: "08:12 AM", estado: "VERIFICADO", segundos: 2 },
  { cedula: "J-30.456.789-1", nombre: "Dist. El Sol C.A.", banco: "BdV (0102)", monto: "Bs. 148.300,00", ref: "202603180002", hora: "09:34 AM", estado: "VERIFICADO", segundos: 3 },
  { cedula: "V-18.234.567", nombre: "Carlos Eduardo Pérez", banco: "Mercantil (0105)", monto: "Bs. 22.750,00", ref: "202603180003", hora: "10:18 AM", estado: "VERIFICADO", segundos: 2 },
  { cedula: "V-24.891.234", nombre: "Ana Isabel Rojas", banco: "BNC (0191)", monto: "Bs. 9.840,00", ref: "202603180004", hora: "11:02 AM", estado: "VERIFICADO", segundos: 4 },
  { cedula: "J-29.112.345-9", nombre: "Tech Solutions S.A.", banco: "BBVA (0108)", monto: "Bs. 312.000,00", ref: "202603180005", hora: "11:47 AM", estado: "VERIFICADO", segundos: 3 },
  { cedula: "V-30.111.222", nombre: "Pedro Andrés Gómez", banco: "BOD (0116)", monto: "Bs. 65.400,00", ref: "202603180006", hora: "12:30 PM", estado: "PENDIENTE", segundos: null },
];

export default function PagosDigitalesPage() {
  const { toast } = useToast();
  const [verifying, setVerifying] = useState(false);

  const verificarPago = () => {
    setVerifying(true);
    toast({ title: "VERIFICANDO PAGO MÓVIL", description: "Consultando API bancaria BOD en tiempo real..." });
    setTimeout(() => {
      setVerifying(false);
      toast({ title: "✓ PAGO VERIFICADO", description: "Ref. 202603180006 · Bs. 65.400,00 · BOD (0116). Acreditado en sistema." });
    }, 2200);
  };

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <Smartphone className="h-3 w-3" /> PAGOS DIGITALES · VERIFICACIÓN AUTOMÁTICA
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            PAGOS <span className="text-primary italic">DIGITALES</span> Y MÓVILES
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Tarjetas · Zelle · Reserve · Binance · Pago Móvil Verificado en 3 seg · Todos los Bancos VE
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2" onClick={verificarPago} disabled={verifying}>
            {verifying ? <RefreshCw className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
            VERIFICAR PAGO MÓVIL
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Ingresado Hoy Bs.", val: "Bs. 5.309.649,00", icon: DollarSign, color: "text-emerald-500" },
          { label: "Equivalente USD", val: "$105.340 USD", icon: TrendingUp, color: "text-primary" },
          { label: "Transacciones", val: "2.331 Hoy", icon: Activity, color: "text-violet-500" },
          { label: "Tasa BCV Hoy", val: "Bs. 50,45 / $", icon: Clock, color: "text-amber-500" },
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

      <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 flex items-start gap-5">
        <div className="p-3 bg-primary/10 rounded-xl shrink-0">
          <Zap className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-[11px] font-black uppercase text-primary tracking-widest mb-1">Verificación Automática Inmediata – Pago Móvil</p>
          <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed">
            El sistema consulta en tiempo real las APIs bancarias de BdV, Banesco, Mercantil, BBVA Provincial, BNC, BOD y Bancaribe. En menos de 3 segundos confirma la referencia, acredita el pago en la cuenta del cliente y registra el asiento contable automáticamente. IVA y retenciones calculadas al instante.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {mediosPago.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className={cn("glass-card border bg-card/40 rounded-2xl p-6 space-y-5 hover:shadow-xl transition-all", m.border)}>
              <div className="flex items-start justify-between">
                <div className={cn("p-3 rounded-xl", m.bg)}>
                  <m.icon className={cn("h-5 w-5", m.color)} />
                </div>
                <Badge className={cn("text-[7px] font-black px-2 py-0.5 border-none uppercase", m.bg, m.color)}>{m.estado}</Badge>
              </div>
              <div>
                <p className={cn("text-[11px] font-black uppercase italic tracking-tight", m.color)}>{m.tipo}</p>
                <p className="text-lg font-black italic text-foreground mt-1">{m.monto}</p>
                <p className={cn("text-[9px] font-black italic mt-0.5", m.color)}>{m.usd}</p>
                <p className="text-[9px] font-bold text-muted-foreground uppercase mt-1">{m.transacciones} operaciones hoy</p>
              </div>
              <div>
                <p className="text-[8px] font-black uppercase text-muted-foreground/60 mb-2">Métodos / redes</p>
                <div className="flex flex-wrap gap-1">
                  {m.redes.map((r, j) => (
                    <span key={j} className={cn("text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest", m.bg, m.color)}>
                      {r}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-black text-muted-foreground/60 uppercase">Comisión: {m.comision}</span>
                <Shield className="h-3 w-3 text-emerald-500" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-xl"><Smartphone className="h-5 w-5 text-primary" /></div>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60 italic">Pago Móvil – Log de Verificación en Tiempo Real – Hoy 18/03/2026</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <Card className="glass-card border-none bg-card/40 rounded-2xl overflow-hidden shadow-sm">
          <div className="divide-y divide-border">
            <div className="grid grid-cols-7 px-6 py-3 bg-muted/30">
              {["Cédula/RIF", "Cliente", "Banco", "Monto Bs.", "Referencia", "Hora", "Estado"].map((h) => (
                <p key={h} className="text-[8px] font-black uppercase text-muted-foreground/60 tracking-widest">{h}</p>
              ))}
            </div>
            {pagoMovilRecientes.map((p, i) => (
              <div key={i} className="grid grid-cols-7 items-center px-6 py-4 hover:bg-muted/30 transition-colors">
                <p className="text-[9px] font-black uppercase text-foreground/80">{p.cedula}</p>
                <p className="text-[9px] font-bold text-foreground/60 uppercase">{p.nombre}</p>
                <p className="text-[9px] font-bold text-muted-foreground uppercase">{p.banco}</p>
                <p className="text-[10px] font-black italic text-emerald-600">{p.monto}</p>
                <p className="text-[8px] font-bold text-muted-foreground uppercase">{p.ref}</p>
                <p className="text-[9px] font-bold text-muted-foreground uppercase">{p.hora}</p>
                <div className="flex items-center gap-2">
                  <Badge className={cn("text-[7px] font-black px-2 py-0.5 border-none uppercase w-fit", p.estado === "VERIFICADO" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600")}>
                    {p.estado}
                  </Badge>
                  {p.segundos && <span className="text-[7px] font-black text-muted-foreground/40 uppercase">{p.segundos}s</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
