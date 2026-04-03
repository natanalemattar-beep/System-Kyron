
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ShieldQuestion, ShieldCheck, TriangleAlert as AlertTriangle, Activity, Terminal, ShieldAlert } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";

const riesgos = [
    { id: "R001", area: "Operacional", desc: "Dependencia de un solo proveedor.", impacto: "Alto", prob: "Media", score: 8 },
    { id: "R002", area: "Financiero", desc: "Fluctuaciones en tasa de cambio.", impacto: "Alto", prob: "Alta", score: 9 },
    { id: "R003", area: "Legal", desc: "Cambios en normativa de importación.", impacto: "Medio", prob: "Media", score: 6 },
];

export default function AnalisisRiesgoPage() {
  return (
    <div className="space-y-12 pb-20">
      <header className="border-l-4 border-rose-500 pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-rose-500 shadow-glow mb-4">
            <ShieldAlert className="h-3 w-3" /> CENTRO DE MITIGACIÓN
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Gestión <span className="text-rose-500 italic">de Riesgo</span></h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Mapa de Calor • Protocolos de Contingencia 2026</p>
      </header>

      <div className="grid gap-10 lg:grid-cols-12">
        <Card className="lg:col-span-4 glass-card border-none bg-rose-500/5 p-10 rounded-[3rem] text-center shadow-2xl flex flex-col justify-center border-l-4 border-rose-500">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-500/60 mb-6">Nivel de Exposición Global</p>
            <div className="relative inline-block mb-6">
                <p className="text-4xl md:text-5xl font-black italic text-rose-500 tracking-tight leading-none shadow-glow">7.5</p>
                <p className="text-[9px] font-bold uppercase opacity-40 mt-2">Sobre 10 Puntos</p>
            </div>
            <Progress value={75} className="h-3 bg-rose-500/10" />
            <p className="mt-6 text-xs font-black uppercase tracking-widest text-rose-600">RIESGO MODERADO-ALTO</p>
        </Card>

        <Card className="lg:col-span-8 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
            <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Matriz de Riesgos Identificados</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/30 border-none">
                            <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Área / ID</TableHead>
                            <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Descripción</TableHead>
                            <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Impacto</TableHead>
                            <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Probabilidad</TableHead>
                            <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Score</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {riesgos.map(r => (
                            <TableRow key={r.id} className="border-border/50 hover:bg-muted/20 transition-all">
                                <TableCell className="pl-10 py-6">
                                    <p className="font-black text-xs text-foreground/80 uppercase italic">{r.area}</p>
                                    <p className="text-[8px] font-mono text-primary font-bold uppercase tracking-widest">{r.id}</p>
                                </TableCell>
                                <TableCell className="py-6 text-[10px] font-bold text-muted-foreground uppercase leading-tight max-w-[200px]">{r.desc}</TableCell>
                                <TableCell className="text-center py-6">
                                    <Badge variant={r.impacto === 'Alto' ? 'destructive' : 'default'} className="text-[8px] font-black uppercase">{r.impacto}</Badge>
                                </TableCell>
                                <TableCell className="text-center py-6">
                                    <Badge variant="outline" className="text-[8px] font-black uppercase">{r.prob}</Badge>
                                </TableCell>
                                <TableCell className="text-right pr-10 py-6 font-black text-lg text-rose-500 italic">{r.score}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <Card className="glass-card border-none p-10 rounded-[3rem] bg-emerald-500/5 border-l-4 border-emerald-500">
            <h3 className="text-xl font-black uppercase italic tracking-tight text-emerald-500 mb-6 flex items-center gap-4">
                <ShieldCheck className="h-6 w-6" /> Plan de Mitigación
            </h3>
            <p className="text-sm font-bold uppercase italic text-muted-foreground/60 leading-relaxed text-justify mb-8">
                Iniciado protocolo de diversificación de proveedores para el SKU "KYRON-BIN-01". Se ha contactado a 2 alternativas regionales para reducir la dependencia operativa.
            </p>
            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-emerald-600">
                <span>Progreso del Plan:</span>
                <span>40% COMPLETADO</span>
            </div>
            <Progress value={40} className="h-2 mt-2 bg-emerald-500/10" />
        </Card>

        <Card className="glass-card border-none p-10 rounded-[3rem] bg-white/[0.02] shadow-2xl">
            <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-10 flex items-center gap-3">
                <Terminal className="h-4 w-4" /> Recomendación IA
            </h4>
            <div className="text-xs font-bold italic text-white/70 space-y-6">
                <div className="flex gap-6 items-start">
                    <span className="font-black text-xs text-primary">»</span>
                    <span>Implementar cobertura cambiaria (Forward) para facturas en mora de proveedores internacionales.</span>
                </div>
                <div className="flex gap-6 items-start">
                    <span className="font-black text-xs text-primary">»</span>
                    <span>Sincronizar el arqueo de caja con el ledger blockchain para eliminar riesgo de merma.</span>
                </div>
            </div>
        </Card>
      </div>
    </div>
  );
}
