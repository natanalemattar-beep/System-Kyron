"use client";

import React, { useState } from "react";
import { Heart, Users, Shield, CheckCircle, Phone, FileText, Activity, Clock, ArrowRight, Zap, Download } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const planes = [
  {
    nombre: "Individual",
    precio: "Bs. 800/mes",
    cobertura: ["Consultas médicas ilimitadas", "Urgencias 24/7", "Laboratorio clínico", "Radiología digital"],
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    border: "border-rose-400/20",
  },
  {
    nombre: "Familiar",
    precio: "Bs. 2.200/mes",
    cobertura: ["Todo del plan Individual", "Hasta 5 beneficiarios", "Odontología básica", "Medicina preventiva", "Telemedicina"],
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    destacado: true,
  },
  {
    nombre: "Corporativo",
    precio: "Bs. 1.500/mes por empleado",
    cobertura: ["Cobertura completa para empleados", "Medicina ocupacional", "Exámenes pre-empleo", "Póliza de accidentes laborales", "Odontología completa", "Óptica incluida"],
    color: "text-rose-600",
    bg: "bg-rose-600/10",
    border: "border-rose-600/20",
  },
];

const empleadosAsegurados = [
  { nombre: "Juan Martínez", cargo: "Gerente", plan: "Corporativo", beneficiarios: 3, estado: "ACTIVO", vencimiento: "31/12/2026" },
  { nombre: "Sofía López", cargo: "Contadora", plan: "Corporativo", beneficiarios: 2, estado: "ACTIVO", vencimiento: "31/12/2026" },
  { nombre: "Pedro Gómez", cargo: "Vendedor", plan: "Corporativo", beneficiarios: 4, estado: "ACTIVO", vencimiento: "31/12/2026" },
  { nombre: "Laura Sánchez", cargo: "RRHH", plan: "Corporativo", beneficiarios: 1, estado: "ACTIVO", vencimiento: "31/12/2026" },
];

export default function ChervereSaludPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-rose-500 pl-8 py-2 mt-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-rose-500 mb-3">
            <Heart className="h-3 w-3" /> ALIANZA ESTRATÉGICA • SALUD
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            CHÉVERE <span className="text-rose-500 italic">SALUD</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Servicio Médico Empresarial • Empleados y Directivos
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2">
            <Download className="h-4 w-4" /> PÓLIZAS
          </Button>
          <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2 bg-rose-600 hover:bg-rose-700 text-white">
            <Heart className="h-4 w-4" /> AGREGAR BENEFICIARIO
          </Button>
        </div>
      </header>

      <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/5 flex items-start gap-5">
        <div className="p-3 bg-rose-500/10 rounded-xl shrink-0">
          <Heart className="h-6 w-6 text-rose-500" />
        </div>
        <div>
          <p className="text-[11px] font-black uppercase text-rose-500 tracking-widest mb-1">Alianza Chévere Salud – Cobertura Médica Integral</p>
          <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed">
            A través de nuestra alianza con Chévere Salud, tu empresa puede acceder a planes de salud corporativos para empleados y directivos, con cobertura integral en consultas, emergencias, laboratorio, odontología y medicina preventiva. La gestión y el costo se integran directamente en el módulo contable.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Empleados Cubiertos", val: "23 Personas", icon: Users, color: "text-rose-500" },
          { label: "Beneficiarios Totales", val: "67 Personas", icon: Heart, color: "text-rose-400" },
          { label: "Costo Mensual", val: "Bs. 34.500,00", icon: FileText, color: "text-primary" },
          { label: "Consultas Este Mes", val: "14 Servicios", icon: Activity, color: "text-emerald-500" },
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
          <div className="p-2 bg-rose-500/10 rounded-xl"><Shield className="h-5 w-5 text-rose-500" /></div>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60 italic">Planes Disponibles</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {planes.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className={cn("glass-card border bg-card/40 rounded-2xl p-8 space-y-6 hover:shadow-xl transition-all", p.border, p.destacado && "ring-2 ring-rose-500/30")}>
                {p.destacado && <Badge className="bg-rose-500 text-white border-none text-[8px] font-black px-4 py-1 uppercase tracking-widest w-fit">MÁS POPULAR</Badge>}
                <div>
                  <p className={cn("text-[11px] font-black uppercase italic tracking-tight", p.color)}>{p.nombre}</p>
                  <p className="text-2xl font-black italic text-foreground mt-2">{p.precio}</p>
                </div>
                <div className="space-y-3">
                  {p.cobertura.map((item, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <CheckCircle className={cn("h-3.5 w-3.5 shrink-0", p.color)} />
                      <p className="text-[9px] font-bold text-muted-foreground uppercase">{item}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className={cn("w-full h-10 rounded-xl font-black text-[9px] uppercase tracking-widest border", p.border, p.color)}>
                  CONTRATAR
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-xl"><Users className="h-5 w-5 text-primary" /></div>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60 italic">Empleados Asegurados</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <Card className="glass-card border-none bg-card/40 rounded-2xl overflow-hidden shadow-sm">
          <div className="divide-y divide-border">
            {empleadosAsegurados.map((e, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-rose-500/10 rounded-xl">
                    <Heart className="h-4 w-4 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-foreground/80">{e.nombre}</p>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase">{e.cargo} · {e.beneficiarios} beneficiarios</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-[9px] font-black text-muted-foreground uppercase hidden md:block">Vence: {e.vencimiento}</p>
                  <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[7px] font-black px-2 py-0.5 uppercase">
                    {e.estado}
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
