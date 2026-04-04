"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ShieldQuestion, ShieldCheck, TriangleAlert as AlertTriangle, Activity, Terminal, ShieldAlert, Loader2, Inbox, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface RiesgoItem {
  area: string;
  desc: string;
  impacto: string;
  prob: string;
  score: number;
  id: string;
}

interface RiesgoData {
  score_global: number;
  riesgos_cxc: RiesgoItem[];
  riesgos_cxp: RiesgoItem[];
}

export default function AnalisisRiesgoPage() {
  const { toast } = useToast();
  const [data, setData] = useState<RiesgoData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(() => {
    setLoading(true);
    fetch('/api/analisis/riesgo')
      .then(r => r.ok ? r.json() : null)
      .then(d => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const scoreGlobal = data?.score_global ?? 0;
  const allRiesgos = [...(data?.riesgos_cxc ?? []), ...(data?.riesgos_cxp ?? [])];

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
            <p className="text-4xl md:text-5xl font-black italic text-rose-500 tracking-tight leading-none">
              {loading ? "—" : scoreGlobal.toFixed(1)}
            </p>
            <p className="text-[9px] font-bold uppercase opacity-40 mt-2">Sobre 10 Puntos</p>
          </div>
          <Progress value={loading ? 0 : scoreGlobal * 10} className="h-3 bg-rose-500/10" />
          <p className="mt-6 text-xs font-black uppercase tracking-widest text-rose-600">
            {scoreGlobal === 0 ? "SIN RIESGOS DETECTADOS" : scoreGlobal < 5 ? "RIESGO BAJO" : scoreGlobal < 7.5 ? "RIESGO MODERADO" : "RIESGO ALTO"}
          </p>
        </Card>

        <Card className="lg:col-span-8 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
          <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Matriz de Riesgos Identificados</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12 gap-3 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-xs font-semibold">Calculando riesgos...</span>
              </div>
            ) : allRiesgos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
                <ShieldCheck className="h-10 w-10 opacity-30 text-emerald-500" />
                <p className="text-sm font-bold">Sin riesgos detectados</p>
                <p className="text-xs text-center max-w-xs">
                  No se detectaron facturas vencidas ni cuentas en mora. Mantén tus cuentas al día para mantener este nivel.
                </p>
              </div>
            ) : (
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
                  {allRiesgos.map((r, idx) => (
                    <TableRow key={idx} className="border-border/50 hover:bg-muted/20 transition-all">
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
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <Card className="glass-card border-none p-10 rounded-[3rem] bg-emerald-500/5 border-l-4 border-emerald-500">
          <h3 className="text-xl font-black uppercase italic tracking-tight text-emerald-500 mb-6 flex items-center gap-4">
            <ShieldCheck className="h-6 w-6" /> Plan de Mitigación
          </h3>
          <p className="text-sm font-bold uppercase italic text-muted-foreground/60 leading-relaxed text-justify mb-8">
            {allRiesgos.length === 0
              ? "No hay riesgos activos. Mantén tus facturas al día, gestiona tus cuentas por cobrar y diversifica tus proveedores para mantener un perfil de riesgo bajo."
              : "Diversifica proveedores para reducir dependencia operativa. Implementa cobertura cambiaria para facturas en mora. Gestiona las cuentas vencidas identificadas."}
          </p>
          <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-emerald-600">
            <span>Riesgos Activos:</span>
            <span>{allRiesgos.length} DETECTADOS</span>
          </div>
          <Progress value={allRiesgos.length === 0 ? 100 : Math.max(0, 100 - allRiesgos.length * 15)} className="h-2 mt-2 bg-emerald-500/10" />
        </Card>

        <Card className="glass-card border-none p-10 rounded-[3rem] bg-white/[0.02] shadow-2xl">
          <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-10 flex items-center gap-3">
            <Terminal className="h-4 w-4" /> Recomendación IA
          </h4>
          <div className="text-xs font-bold italic text-muted-foreground space-y-6">
            <div className="flex gap-6 items-start">
              <span className="font-black text-xs text-primary">»</span>
              <span>Implementar cobertura cambiaria (Forward) para facturas en mora de proveedores internacionales.</span>
            </div>
            <div className="flex gap-6 items-start">
              <span className="font-black text-xs text-primary">»</span>
              <span>Sincronizar el arqueo de caja con el ledger blockchain para eliminar riesgo de merma.</span>
            </div>
            <div className="flex gap-6 items-start">
              <span className="font-black text-xs text-primary">»</span>
              <span>Monitorear semanalmente las cuentas por cobrar vencidas para mitigar riesgo de incobrabilidad.</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
