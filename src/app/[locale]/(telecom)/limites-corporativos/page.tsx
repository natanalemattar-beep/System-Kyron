"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  SlidersHorizontal, Users, Shield, Save, CircleCheck,
  AlertTriangle, TrendingUp, Wifi, Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const EMPLEADOS = [
  { id: "E1", nombre: "Carlos Pérez", depto: "Ventas", numero: "+58 412-1234567", limiteGB: 30, usoGB: 12.5, limiteVoz: 500, usoVoz: 230 },
  { id: "E2", nombre: "María Gómez", depto: "Marketing", numero: "+58 414-7654321", limiteGB: 20, usoGB: 18.2, limiteVoz: 300, usoVoz: 280 },
  { id: "E3", nombre: "Juan Rodríguez", depto: "IT", numero: "+58 416-9876543", limiteGB: 50, usoGB: 5.3, limiteVoz: 200, usoVoz: 45 },
  { id: "E4", nombre: "Ana Fernández", depto: "RR.HH.", numero: "+58 424-5551234", limiteGB: 10, usoGB: 9.8, limiteVoz: 300, usoVoz: 190 },
  { id: "E5", nombre: "Luis Martínez", depto: "Ventas", numero: "+58 426-1112223", limiteGB: 50, usoGB: 45.0, limiteVoz: 500, usoVoz: 410 },
  { id: "E6", nombre: "Sandra López", depto: "Contabilidad", numero: "+58 412-3334455", limiteGB: 15, usoGB: 8.7, limiteVoz: 200, usoVoz: 120 },
];

const POLITICAS = [
  { nombre: "Ejecutivo", datosGB: 50, vozMin: 500, roaming: true, color: "text-amber-500", bg: "bg-amber-500/10" },
  { nombre: "Estándar", datosGB: 20, vozMin: 300, roaming: false, color: "text-primary", bg: "bg-primary/10" },
  { nombre: "Básico", datosGB: 10, vozMin: 200, roaming: false, color: "text-muted-foreground", bg: "bg-muted/20" },
];

export default function LimitesCorporativosPage() {
  const { toast } = useToast();
  const [limites, setLimites] = useState(() =>
    Object.fromEntries(EMPLEADOS.map(e => [e.id, { datos: e.limiteGB, voz: e.limiteVoz }]))
  );

  const handleGuardar = () => {
    toast({
      title: "Límites actualizados",
      description: "Los nuevos límites se aplicarán en el próximo ciclo de facturación.",
      action: <CircleCheck className="h-4 w-4 text-emerald-500" />,
    });
  };

  const alertas = EMPLEADOS.filter(e => (e.usoGB / e.limiteGB) > 0.9).length;

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Mi Línea Empresa</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Límites por Empleado</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Configura límites de datos y voz por cada línea corporativa.</p>
        </div>
        <Button onClick={handleGuardar} size="sm" className="h-9 px-4 rounded-lg text-xs font-semibold shadow-sm">
          <Save className="mr-1.5 h-3.5 w-3.5" /> Guardar Cambios
        </Button>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Líneas Activas", val: `${EMPLEADOS.length}`, icon: Users, color: "text-primary", accent: "from-primary/20 to-primary/0", ring: "ring-primary/20", iconBg: "bg-primary/10" },
          { label: "Datos Asignados", val: `${EMPLEADOS.reduce((s, e) => s + e.limiteGB, 0)} GB`, icon: Wifi, color: "text-cyan-500", accent: "from-cyan-500/20 to-cyan-500/0", ring: "ring-cyan-500/20", iconBg: "bg-cyan-500/10" },
          { label: "Uso Promedio", val: `${(EMPLEADOS.reduce((s, e) => s + (e.usoGB / e.limiteGB) * 100, 0) / EMPLEADOS.length).toFixed(0)}%`, icon: TrendingUp, color: "text-emerald-500", accent: "from-emerald-500/20 to-emerald-500/0", ring: "ring-emerald-500/20", iconBg: "bg-emerald-500/10" },
          { label: "Alertas Exceso", val: `${alertas}`, icon: AlertTriangle, color: alertas > 0 ? "text-rose-500" : "text-emerald-500", accent: alertas > 0 ? "from-rose-500/20 to-rose-500/0" : "from-emerald-500/20 to-emerald-500/0", ring: alertas > 0 ? "ring-rose-500/20" : "ring-emerald-500/20", iconBg: alertas > 0 ? "bg-rose-500/10" : "bg-emerald-500/10" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className={cn("kyron-surface p-4 rounded-xl ring-1 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden relative", stat.ring)}>
              <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r", stat.accent)} />
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                <div className={cn("p-1.5 rounded-lg", stat.iconBg)}>
                  <stat.icon className={cn("h-3 w-3", stat.color)} />
                </div>
              </div>
              <p className={cn("text-xl font-black tracking-tight", stat.color)}>{stat.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-2">
        {POLITICAS.map((p, i) => (
          <Card key={i} className="bg-card/60 border border-border/50 rounded-xl">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={cn("p-2.5 rounded-xl", p.bg)}>
                <Shield className={cn("h-5 w-5", p.color)} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-foreground">{p.nombre}</p>
                <p className="text-[10px] text-muted-foreground">{p.datosGB} GB · {p.vozMin} min · {p.roaming ? 'Roaming' : 'Sin Roaming'}</p>
              </div>
              <Badge variant="outline" className={cn("text-[9px]", p.color)}>{p.nombre}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50">
          <CardTitle className="text-sm font-semibold text-foreground">Configurar Límites Individuales</CardTitle>
          <CardDescription className="text-[10px] text-muted-foreground">Ajusta el límite de datos y minutos de voz por empleado</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/10 border-border/30 hover:bg-muted/10">
                  <TableHead className="pl-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Empleado</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Número</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center">Uso Datos</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center">Límite Datos (GB)</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center">Uso Voz</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center">Límite Voz (min)</TableHead>
                  <TableHead className="py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {EMPLEADOS.map((e) => {
                  const pctDatos = (e.usoGB / e.limiteGB) * 100;
                  const pctVoz = (e.usoVoz / e.limiteVoz) * 100;
                  const excedido = pctDatos > 90 || pctVoz > 90;
                  return (
                    <TableRow key={e.id} className="border-border/30 hover:bg-muted/5 transition-colors">
                      <TableCell className="pl-5 py-3">
                        <p className="text-xs font-semibold text-foreground">{e.nombre}</p>
                        <p className="text-[10px] text-muted-foreground">{e.depto}</p>
                      </TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">{e.numero}</TableCell>
                      <TableCell className="text-center">
                        <div className="space-y-1 max-w-[80px] mx-auto">
                          <p className={cn("text-[11px] font-bold tabular-nums", pctDatos > 90 ? "text-rose-500" : "text-foreground")}>{e.usoGB}/{e.limiteGB} GB</p>
                          <div className="h-1 w-full bg-muted/30 rounded-full overflow-hidden">
                            <div className={cn("h-full rounded-full", pctDatos > 90 ? "bg-rose-500" : "bg-primary")} style={{ width: `${Math.min(pctDatos, 100)}%` }} />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          min="1"
                          value={limites[e.id]?.datos || e.limiteGB}
                          onChange={ev => setLimites(l => ({ ...l, [e.id]: { ...l[e.id], datos: parseInt(ev.target.value) || 0 } }))}
                          className="h-8 w-20 text-center text-xs rounded-lg mx-auto"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <p className={cn("text-[11px] font-bold tabular-nums", pctVoz > 90 ? "text-rose-500" : "text-foreground")}>{e.usoVoz}/{e.limiteVoz}</p>
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          min="1"
                          value={limites[e.id]?.voz || e.limiteVoz}
                          onChange={ev => setLimites(l => ({ ...l, [e.id]: { ...l[e.id], voz: parseInt(ev.target.value) || 0 } }))}
                          className="h-8 w-20 text-center text-xs rounded-lg mx-auto"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        {excedido ? (
                          <Badge variant="destructive" className="text-[9px] bg-rose-500/10 text-rose-500 border-rose-500/20">Excedido</Badge>
                        ) : (
                          <Badge variant="outline" className="text-[9px] text-emerald-500 border-emerald-500/20">Normal</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
