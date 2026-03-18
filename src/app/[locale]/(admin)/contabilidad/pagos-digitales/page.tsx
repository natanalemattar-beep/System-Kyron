"use client";

import React, { useState } from "react";
import { CreditCard, Smartphone, Wallet, CheckCircle, Zap, Activity, Clock, Shield, ArrowRight, TrendingUp, RefreshCw } from "lucide-react";
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
    transacciones: 142,
    monto: "Bs. 58.430,00",
    comision: "2.5%",
    redes: ["Visa", "Mastercard", "American Express"],
    estado: "ACTIVO",
  },
  {
    tipo: "Tarjeta de Débito",
    icon: CreditCard,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    transacciones: 213,
    monto: "Bs. 31.200,50",
    comision: "1.0%",
    redes: ["Visa Débito", "Maestro", "Electron"],
    estado: "ACTIVO",
  },
  {
    tipo: "Billetera Virtual",
    icon: Wallet,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    transacciones: 87,
    monto: "Bs. 15.700,00",
    comision: "0.5%",
    redes: ["Reserve", "Zinli", "PayPal", "Binance Pay"],
    estado: "ACTIVO",
  },
  {
    tipo: "Pago Móvil",
    icon: Smartphone,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    transacciones: 318,
    monto: "Bs. 42.960,00",
    comision: "0%",
    redes: ["Banesco", "Mercantil", "BNC", "Venezuela", "BOD"],
    estado: "ACTIVO",
  },
];

const pagoMovilRecientes = [
  { cedula: "V-12.345.678", banco: "Banesco", monto: "Bs. 1.500,00", ref: "REF-8821", hora: "11:34 AM", estado: "VERIFICADO" },
  { cedula: "V-24.567.890", banco: "Mercantil", monto: "Bs. 3.200,00", ref: "REF-8822", hora: "11:41 AM", estado: "VERIFICADO" },
  { cedula: "V-18.234.567", banco: "BNC", monto: "Bs. 750,00", ref: "REF-8823", hora: "12:02 PM", estado: "VERIFICADO" },
  { cedula: "V-30.111.222", banco: "Venezuela", monto: "Bs. 5.000,00", ref: "REF-8824", hora: "12:18 PM", estado: "PENDIENTE" },
];

export default function PagosDigitalesPage() {
  const { toast } = useToast();
  const [verifying, setVerifying] = useState(false);

  const verificarPago = () => {
    setVerifying(true);
    toast({ title: "VERIFICANDO PAGO MÓVIL", description: "Consultando API bancaria en tiempo real..." });
    setTimeout(() => {
      setVerifying(false);
      toast({ title: "PAGO VERIFICADO ✓", description: "Ref REF-8824 confirmada. Acreditación inmediata al sistema." });
    }, 2000);
  };

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <Smartphone className="h-3 w-3" /> PAGOS DIGITALES INTEGRADOS
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            PAGOS <span className="text-primary italic">DIGITALES</span> Y MÓVILES
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Tarjetas • Billeteras Virtuales • Pago Móvil Verificado Automáticamente
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2" onClick={verificarPago} disabled={verifying}>
            {verifying ? <RefreshCw className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
            VERIFICAR PAGO MÓVIL
          </Button>
        </div>
      </header>

      <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 flex items-start gap-5">
        <div className="p-3 bg-primary/10 rounded-xl shrink-0">
          <Zap className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-[11px] font-black uppercase text-primary tracking-widest mb-1">Verificación Automática Inmediata</p>
          <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed">
            El sistema verifica en tiempo real los pagos móviles recibidos. Al confirmar la referencia bancaria, la acreditación se aplica de inmediato en la cuenta del cliente dentro del sistema, facilitando el proceso de venta sin demoras.
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
                <Badge className={cn("text-[7px] font-black px-2 py-0.5 border-none uppercase", m.bg, m.color)}>
                  {m.estado}
                </Badge>
              </div>
              <div>
                <p className={cn("text-[11px] font-black uppercase italic tracking-tight", m.color)}>{m.tipo}</p>
                <p className="text-xl font-black italic text-foreground mt-1">{m.monto}</p>
                <p className="text-[9px] font-bold text-muted-foreground uppercase mt-0.5">{m.transacciones} transacciones hoy</p>
              </div>
              <div>
                <p className="text-[8px] font-black uppercase text-muted-foreground/60 mb-2">Redes aceptadas</p>
                <div className="flex flex-wrap gap-1">
                  {m.redes.map((r, j) => (
                    <span key={j} className={cn("text-[7px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest", m.bg, m.color)}>
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
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60 italic">Pago Móvil – Verificación en Tiempo Real</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <Card className="glass-card border-none bg-card/40 rounded-2xl overflow-hidden shadow-sm">
          <div className="divide-y divide-border">
            <div className="grid grid-cols-6 px-6 py-3 bg-muted/30">
              {["Cédula", "Banco", "Monto", "Referencia", "Hora", "Estado"].map((h) => (
                <p key={h} className="text-[8px] font-black uppercase text-muted-foreground/60 tracking-widest">{h}</p>
              ))}
            </div>
            {pagoMovilRecientes.map((p, i) => (
              <div key={i} className="grid grid-cols-6 items-center px-6 py-4 hover:bg-muted/30 transition-colors">
                <p className="text-[10px] font-black uppercase text-foreground/80">{p.cedula}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">{p.banco}</p>
                <p className="text-[10px] font-black italic text-emerald-600">{p.monto}</p>
                <p className="text-[9px] font-bold text-muted-foreground uppercase">{p.ref}</p>
                <p className="text-[9px] font-bold text-muted-foreground uppercase">{p.hora}</p>
                <Badge className={cn("text-[7px] font-black px-2 py-0.5 border-none uppercase w-fit", p.estado === "VERIFICADO" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600")}>
                  {p.estado}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
