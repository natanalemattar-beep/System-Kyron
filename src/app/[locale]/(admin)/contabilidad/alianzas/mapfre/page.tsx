"use client";

import React from "react";
import { Car, Shield, FileText, CheckCircle, TrendingUp, Clock, Download, Activity, AlertTriangle, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const polizasVehiculos = [
  { placa: "AA-123-BB", vehiculo: "Toyota Hilux 2023", tipo: "CASCO TOTAL", prima: "Bs. 4.800/año", valor: "Bs. 280.000", vence: "20/11/2026", estado: "VIGENTE" },
  { placa: "CC-456-DD", vehiculo: "Ford Explorer 2022", tipo: "CASCO TOTAL", prima: "Bs. 3.600/año", valor: "Bs. 210.000", vence: "05/09/2026", estado: "VIGENTE" },
  { placa: "EE-789-FF", vehiculo: "Chevrolet Spark 2021", tipo: "RC CIVIL", prima: "Bs. 800/año", valor: "Bs. 45.000", vence: "14/04/2026", estado: "PRÓXIMO A VENCER" },
  { placa: "GG-012-HH", vehiculo: "Mitsubishi L200 2024", tipo: "CASCO TOTAL", prima: "Bs. 5.200/año", valor: "Bs. 320.000", vence: "12/02/2027", estado: "VIGENTE" },
];

const tiposCobertura = [
  {
    nombre: "Responsabilidad Civil",
    descripcion: "Cobertura obligatoria por daños a terceros en accidentes de tránsito",
    precio: "Desde Bs. 800/año",
    icon: Shield,
    color: "text-red-600",
    bg: "bg-red-600/10",
    border: "border-red-600/20",
  },
  {
    nombre: "Casco Total",
    descripcion: "Protección integral del vehículo: robo, pérdida total, daños por accidente",
    precio: "Desde Bs. 2.400/año",
    icon: Car,
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    destacado: true,
  },
  {
    nombre: "Seguro Patrimonial",
    descripcion: "Cobertura de bienes inmuebles, equipos y activos fijos empresariales",
    precio: "Desde Bs. 3.800/año",
    icon: FileText,
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
  },
];

export default function MapfrePage() {
  const { toast } = useToast();

  const reporteSiniestro = () => {
    toast({ title: "REPORTE DE SINIESTRO", description: "Formulario enviado a Mapfre. Un ajustador se contactará en 24h." });
  };

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-red-600 pl-8 py-2 mt-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-600/10 border border-red-600/20 text-[9px] font-black uppercase tracking-[0.4em] text-red-600 mb-3">
            <Car className="h-3 w-3" /> ALIANZA ESTRATÉGICA • MAPFRE
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            MAPFRE <span className="text-red-600 italic">SEGUROS</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Vehículos • Accidentes • Cobertura Patrimonial Empresarial
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2">
            <Download className="h-4 w-4" /> PÓLIZAS PDF
          </Button>
          <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2 bg-red-700 hover:bg-red-800 text-white" onClick={reporteSiniestro}>
            <AlertTriangle className="h-4 w-4" /> REPORTAR SINIESTRO
          </Button>
        </div>
      </header>

      <div className="p-6 rounded-2xl border border-red-600/20 bg-red-600/5 flex items-start gap-5">
        <div className="p-3 bg-red-600/10 rounded-xl shrink-0">
          <Shield className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <p className="text-[11px] font-black uppercase text-red-600 tracking-widest mb-1">Alianza Mapfre – Protección de Flota y Patrimonio</p>
          <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed">
            A través de nuestra alianza con Mapfre, gestiona el seguro de toda la flota vehicular de tu empresa, pólizas contra accidentes laborales y cobertura patrimonial de activos. Las primas se registran automáticamente en contabilidad para su correcta deducción fiscal.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Vehículos Asegurados", val: "4 Unidades", icon: Car, color: "text-red-600" },
          { label: "Valor Asegurado", val: "Bs. 855.000", icon: TrendingUp, color: "text-emerald-500" },
          { label: "Prima Total Anual", val: "Bs. 14.400,00", icon: FileText, color: "text-primary" },
          { label: "Próx. Vencimiento", val: "14/04/2026", icon: Clock, color: "text-amber-500" },
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
          <div className="p-2 bg-red-600/10 rounded-xl"><Shield className="h-5 w-5 text-red-600" /></div>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60 italic">Tipos de Cobertura</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {tiposCobertura.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className={cn("glass-card border bg-card/40 rounded-2xl p-8 space-y-5 hover:shadow-xl transition-all", c.border, c.destacado && "ring-2 ring-red-500/30")}>
                {c.destacado && <Badge className="bg-red-600 text-white border-none text-[8px] font-black px-4 py-1 uppercase tracking-widest w-fit">MÁS CONTRATADO</Badge>}
                <div className={cn("p-4 rounded-2xl w-fit", c.bg)}>
                  <c.icon className={cn("h-6 w-6", c.color)} />
                </div>
                <div>
                  <p className={cn("text-sm font-black uppercase italic tracking-tight", c.color)}>{c.nombre}</p>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase leading-snug mt-2">{c.descripcion}</p>
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase text-muted-foreground/60">Precio referencial</p>
                  <p className={cn("text-[11px] font-black italic mt-0.5", c.color)}>{c.precio}</p>
                </div>
                <Button variant="outline" className={cn("w-full h-10 rounded-xl font-black text-[9px] uppercase tracking-widest border", c.border, c.color)}>
                  SOLICITAR COTIZACIÓN
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-xl"><Car className="h-5 w-5 text-primary" /></div>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60 italic">Flota Vehicular Asegurada</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <Card className="glass-card border-none bg-card/40 rounded-2xl overflow-hidden shadow-sm">
          <div className="divide-y divide-border">
            {polizasVehiculos.map((v, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-red-600/10 rounded-xl">
                    <Car className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-foreground/80">{v.vehiculo}</p>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase">{v.placa} · {v.tipo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden md:block">
                    <p className="text-[9px] font-black text-red-600 italic">{v.prima}</p>
                    <p className="text-[8px] font-bold text-muted-foreground/60 uppercase">Vence: {v.vence}</p>
                  </div>
                  <Badge className={cn("text-[7px] font-black px-2 py-0.5 border-none uppercase", v.estado === "VIGENTE" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600")}>
                    {v.estado}
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
