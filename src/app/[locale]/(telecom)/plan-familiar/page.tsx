"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Users, Plus, CircleCheck, Share2, Shield, Wifi, Phone,
  DollarSign, ArrowLeftRight, UserPlus, Settings, Crown
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const MIEMBROS_FAMILIA = [
  { id: "F1", nombre: "Carlos (Titular)", numero: "+58 412-1234567", plan: "Global 40GB", datosUsados: 12.5, datosAsignados: 20, rol: "titular", activo: true },
  { id: "F2", nombre: "María (Esposa)", numero: "+58 414-7654321", plan: "Familiar", datosUsados: 8.3, datosAsignados: 10, rol: "miembro", activo: true },
  { id: "F3", nombre: "Andrés (Hijo)", numero: "+58 416-9876543", plan: "Familiar", datosUsados: 15.2, datosAsignados: 8, rol: "menor", activo: true },
  { id: "F4", nombre: "Sofía (Hija)", numero: "+58 424-5551234", plan: "Familiar", datosUsados: 3.1, datosAsignados: 5, rol: "menor", activo: true },
];

const CONTROLES_PARENTALES = [
  { nombre: "Filtro de contenido adulto", activo: true, aplica: ["Andrés", "Sofía"] },
  { nombre: "Límite horario (22:00-07:00)", activo: true, aplica: ["Andrés", "Sofía"] },
  { nombre: "Bloqueo de compras in-app", activo: true, aplica: ["Sofía"] },
  { nombre: "Ubicación en tiempo real", activo: true, aplica: ["Andrés", "Sofía"] },
  { nombre: "Restricción de redes sociales", activo: false, aplica: ["Sofía"] },
];

export default function PlanFamiliarPage() {
  const { toast } = useToast();
  const datosCompartidosTotal = 43;
  const datosUsadosTotal = MIEMBROS_FAMILIA.reduce((s, m) => s + m.datosUsados, 0);

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Mi Línea Personal</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Plan Familiar</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Agrupa líneas del hogar con cuota compartida y control parental.</p>
        </div>
        <Button size="sm" className="h-9 px-4 rounded-lg text-xs font-semibold shadow-sm"
          onClick={() => toast({ title: "Agregar Miembro", description: "Función de agregar nuevo miembro al plan familiar." })}>
          <UserPlus className="mr-1.5 h-3.5 w-3.5" /> Agregar Miembro
        </Button>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Miembros", val: `${MIEMBROS_FAMILIA.length}`, icon: Users, color: "text-primary", accent: "from-primary/20 to-primary/0", ring: "ring-primary/20", iconBg: "bg-primary/10" },
          { label: "Datos Compartidos", val: `${datosCompartidosTotal} GB`, icon: Share2, color: "text-cyan-500", accent: "from-cyan-500/20 to-cyan-500/0", ring: "ring-cyan-500/20", iconBg: "bg-cyan-500/10" },
          { label: "Datos Usados", val: `${datosUsadosTotal.toFixed(1)} GB`, icon: Wifi, color: "text-emerald-500", accent: "from-emerald-500/20 to-emerald-500/0", ring: "ring-emerald-500/20", iconBg: "bg-emerald-500/10" },
          { label: "Gasto Mensual", val: "$42.00", icon: DollarSign, color: "text-amber-500", accent: "from-amber-500/20 to-amber-500/0", ring: "ring-amber-500/20", iconBg: "bg-amber-500/10" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className={cn("kyron-surface p-4 rounded-xl ring-1 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden relative", stat.ring)}>
              <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r", stat.accent)} />
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                <div className={cn("p-1.5 rounded-lg", stat.iconBg)}><stat.icon className={cn("h-3 w-3", stat.color)} /></div>
              </div>
              <p className={cn("text-xl font-bold tracking-tight", stat.color)}>{stat.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-cyan-500/5 border border-primary/20 rounded-xl overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><Share2 className="h-4 w-4 text-primary" /></div>
              <div>
                <p className="text-sm font-bold text-foreground">Cuota de Datos Compartida</p>
                <p className="text-[10px] text-muted-foreground">{datosUsadosTotal.toFixed(1)} GB usados de {datosCompartidosTotal} GB</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-primary">{((datosUsadosTotal / datosCompartidosTotal) * 100).toFixed(0)}%</span>
          </div>
          <div className="h-3 w-full bg-muted/30 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-500 transition-all" style={{ width: `${(datosUsadosTotal / datosCompartidosTotal) * 100}%` }} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MIEMBROS_FAMILIA.map((m) => {
          const pctUso = (m.datosUsados / m.datosAsignados) * 100;
          const excedido = pctUso > 100;
          return (
            <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-card/60 border border-border/50 rounded-xl hover:-translate-y-0.5 transition-all duration-300">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", m.rol === "titular" ? "bg-primary/10" : m.rol === "menor" ? "bg-amber-500/10" : "bg-cyan-500/10")}>
                        {m.rol === "titular" ? <Crown className="h-5 w-5 text-primary" /> : <Users className="h-5 w-5 text-cyan-500" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{m.nombre}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">{m.numero}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={cn("text-[11px]", m.rol === "titular" ? "text-primary border-primary/20" : m.rol === "menor" ? "text-amber-500 border-amber-500/20" : "text-cyan-500 border-cyan-500/20")}>
                      {m.rol === "titular" ? "Titular" : m.rol === "menor" ? "Menor" : "Miembro"}
                    </Badge>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-muted-foreground">Datos: {m.datosUsados} / {m.datosAsignados} GB</span>
                      <span className={cn("font-bold", excedido ? "text-rose-500" : "text-foreground")}>{Math.min(pctUso, 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", excedido ? "bg-rose-500" : "bg-primary")} style={{ width: `${Math.min(pctUso, 100)}%` }} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 rounded-lg text-[11px] flex-1"
                      onClick={() => toast({ title: "Compartir Datos", description: `Transferir datos a ${m.nombre}` })}>
                      <ArrowLeftRight className="mr-1 h-3 w-3" /> Compartir
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 rounded-lg text-[11px] flex-1"
                      onClick={() => toast({ title: "Ajustar", description: `Configurar límites de ${m.nombre}` })}>
                      <Settings className="mr-1 h-3 w-3" /> Ajustar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg"><Shield className="h-4 w-4 text-amber-500" /></div>
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">Control Parental</CardTitle>
              <CardDescription className="text-[10px] text-muted-foreground">Restricciones aplicadas a líneas de menores</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5 space-y-2">
          {CONTROLES_PARENTALES.map((c, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/10 border border-border/30">
              <div>
                <p className="text-xs font-semibold text-foreground">{c.nombre}</p>
                <p className="text-[11px] text-muted-foreground">Aplica a: {c.aplica.join(", ")}</p>
              </div>
              <Badge variant="outline" className={cn("text-[11px]", c.activo ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/10" : "text-muted-foreground border-border")}>
                {c.activo ? "Activo" : "Inactivo"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
