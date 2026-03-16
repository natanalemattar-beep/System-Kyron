
"use client";

import React from "react";
import { Link } from "@/navigation";
import { 
  Wallet, 
  ArrowLeft, 
  TrendingUp, 
  HandCoins, 
  Activity, 
  ChevronRight,
  BookOpen,
  ArrowRight,
  Landmark,
  ShieldCheck
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function CuentasPage() {
  const quickAccess = [
    { 
      label: "CUENTAS POR COBRAR", 
      href: "/contabilidad/cuentas-por-cobrar", 
      icon: TrendingUp, 
      color: "text-primary",
      desc: "Auditoría de activos y cartera de clientes."
    },
    { 
      label: "CUENTAS POR PAGAR", 
      href: "/contabilidad/cuentas-por-pagar", 
      icon: HandCoins, 
      color: "text-rose-500",
      desc: "Control de compromisos y pasivos maestros."
    },
    { 
      label: "ANÁLISIS DE CAJA", 
      href: "/contabilidad/analisis-caja", 
      icon: Activity, 
      color: "text-emerald-500",
      desc: "Monitoreo de liquidez y flujos síncronos."
    },
  ];

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3 shadow-glow-sm">
            <Landmark className="h-3 w-3" /> NODO DE TESORERÍA
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic italic-shadow">
            Gestión de <span className="text-primary">Cuentas</span>
          </h1>
          <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest opacity-60">Administración Financiera y Bancaria 2026</p>
        </div>
        <Button variant="ghost" asChild className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all">
          <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4"/> VOLVER</Link>
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {quickAccess.map((item, i) => (
          <Link key={i} href={item.href as any} className="block group">
            <Card className="glass-card border-none bg-card/40 p-10 flex flex-col justify-between group shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] min-h-[220px]">
              <div className="space-y-6">
                <div className="p-4 bg-muted rounded-2xl w-fit border border-border group-hover:bg-primary/10 group-hover:border-primary/20 transition-all shadow-inner">
                  <item.icon className={cn("h-8 w-8 transition-all", item.color)} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black uppercase italic tracking-tighter text-white group-hover:text-primary transition-colors">{item.label}</h3>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">{item.desc}</p>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <ChevronRight className="h-5 w-5" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="glass-card border-none bg-[#050505] p-10 rounded-[3rem] relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-all"><Wallet className="h-32 w-32 text-primary" /></div>
            <div className="relative z-10 space-y-6">
                <div className="space-y-1">
                    <Badge className="bg-primary text-white border-none text-[8px] font-black px-4 uppercase tracking-widest">Liquidación</Badge>
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Conciliación Bancaria</h3>
                </div>
                <p className="text-xs font-bold text-white/30 uppercase leading-relaxed max-w-sm">
                    Sincronización síncrona con el Libro Mayor para verificar la correspondencia entre extractos bancarios y registros contables.
                </p>
                <Button className="rounded-xl h-12 px-8 btn-3d-primary font-black uppercase text-[10px] tracking-widest shadow-xl">INICIAR CONCILIACIÓN</Button>
            </div>
        </Card>

        <Card className="glass-card border-none bg-emerald-500/5 border-l-4 border-emerald-500 p-10 rounded-[3rem] shadow-2xl flex flex-col justify-center">
            <div className="flex items-center gap-6 mb-6">
                <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                    <ShieldCheck className="h-8 w-8 text-emerald-500" />
                </div>
                <div className="space-y-1">
                    <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">Blindaje de Cuentas</h3>
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Certificado Kyron v2.6</p>
                </div>
            </div>
            <p className="text-sm font-medium italic text-white/60 leading-relaxed uppercase">
                "Todas las cuentas registradas operan bajo el protocolo de integridad digital, asegurando que cada movimiento esté respaldado por un documento fiscal válido."
            </p>
        </Card>
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
        <Card className="bg-primary border-none rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl group cursor-pointer">
          <Link href="/contabilidad/cuentas/todas" className="absolute inset-0 z-20" />
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
            <BookOpen className="h-64 w-64" />
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <Badge className="bg-white/20 text-white border-none text-[10px] font-black uppercase tracking-[0.4em] px-4 py-1.5 rounded-lg">Legajo Maestro</Badge>
              <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none italic-shadow text-white">REPOSITORIO <br/> DE CUENTAS</h3>
              <p className="text-lg font-medium opacity-80 leading-relaxed uppercase italic text-white/70">Acceda a la biblioteca completa de módulos bancarios, anticipos y flujos de efectivo auditados.</p>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-black uppercase text-[11px] tracking-[0.2em] h-16 px-12 rounded-2xl shadow-2xl border-none relative z-30 pointer-events-none">
                EXPLORAR TODO EL NODO <ArrowRight className="ml-4 h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
