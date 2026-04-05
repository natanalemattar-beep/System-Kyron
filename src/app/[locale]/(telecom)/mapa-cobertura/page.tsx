"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin, Signal, Wifi, Zap, Globe, Navigation
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const ZONAS_COBERTURA = [
  { zona: "Caracas Centro", tipo5G: true, tipo4G: true, tipo3G: true, calidad: 98, latencia: "8ms", estado: "excelente" },
  { zona: "Caracas Este", tipo5G: true, tipo4G: true, tipo3G: true, calidad: 95, latencia: "12ms", estado: "excelente" },
  { zona: "Maracaibo", tipo5G: true, tipo4G: true, tipo3G: true, calidad: 92, latencia: "15ms", estado: "buena" },
  { zona: "Valencia", tipo5G: true, tipo4G: true, tipo3G: true, calidad: 90, latencia: "18ms", estado: "buena" },
  { zona: "Barquisimeto", tipo5G: false, tipo4G: true, tipo3G: true, calidad: 85, latencia: "22ms", estado: "buena" },
  { zona: "Puerto La Cruz", tipo5G: false, tipo4G: true, tipo3G: true, calidad: 82, latencia: "25ms", estado: "regular" },
  { zona: "Mérida", tipo5G: false, tipo4G: true, tipo3G: true, calidad: 78, latencia: "30ms", estado: "regular" },
  { zona: "San Cristóbal", tipo5G: false, tipo4G: true, tipo3G: true, calidad: 75, latencia: "35ms", estado: "regular" },
];

const ESTADO_CALIDAD = {
  excelente: { color: "text-emerald-500", bg: "bg-emerald-500", ring: "ring-emerald-500/30" },
  buena: { color: "text-cyan-500", bg: "bg-cyan-500", ring: "ring-cyan-500/30" },
  regular: { color: "text-amber-500", bg: "bg-amber-500", ring: "ring-amber-500/30" },
  deficiente: { color: "text-rose-500", bg: "bg-rose-500", ring: "ring-rose-500/30" },
};

export default function MapaCoberturaPage() {
  const { toast } = useToast();
  const [filtroRed, setFiltroRed] = useState<"todas" | "5G" | "4G" | "3G">("todas");

  const zonasFiltradas = ZONAS_COBERTURA.filter(z => {
    if (filtroRed === "5G") return z.tipo5G;
    if (filtroRed === "4G") return z.tipo4G;
    if (filtroRed === "3G") return z.tipo3G;
    return true;
  });

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="pt-6 pb-2">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Mi Línea Personal</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Mapa de Cobertura</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Reporte de cobertura y calidad de red por zona geográfica.</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Cobertura 5G", val: `${ZONAS_COBERTURA.filter(z => z.tipo5G).length} zonas`, icon: Zap, color: "text-primary", accent: "from-primary/20 to-primary/0", ring: "ring-primary/20", iconBg: "bg-primary/10" },
          { label: "Cobertura 4G", val: `${ZONAS_COBERTURA.filter(z => z.tipo4G).length} zonas`, icon: Signal, color: "text-cyan-500", accent: "from-cyan-500/20 to-cyan-500/0", ring: "ring-cyan-500/20", iconBg: "bg-cyan-500/10" },
          { label: "Calidad Promedio", val: `${(ZONAS_COBERTURA.reduce((s, z) => s + z.calidad, 0) / ZONAS_COBERTURA.length).toFixed(0)}%`, icon: Wifi, color: "text-emerald-500", accent: "from-emerald-500/20 to-emerald-500/0", ring: "ring-emerald-500/20", iconBg: "bg-emerald-500/10" },
          { label: "Tu Ubicación", val: "5G SA", icon: Navigation, color: "text-amber-500", accent: "from-amber-500/20 to-amber-500/0", ring: "ring-amber-500/20", iconBg: "bg-amber-500/10" },
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

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><Globe className="h-4 w-4 text-primary" /></div>
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">Mapa de Cobertura Interactivo</CardTitle>
                <CardDescription className="text-[10px] text-muted-foreground">Zonas 5G, 4G y 3G en Venezuela</CardDescription>
              </div>
            </div>
            <div className="flex gap-1.5">
              {(["todas", "5G", "4G", "3G"] as const).map(f => (
                <Button key={f} variant={filtroRed === f ? "default" : "outline"} size="sm" className="h-7 px-2.5 rounded-lg text-[10px] font-semibold"
                  onClick={() => setFiltroRed(f)}>
                  {f === "todas" ? "Todas" : f}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <div className="relative w-full h-[300px] rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border/30 overflow-hidden mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2">
                <Globe className="h-12 w-12 text-primary/20 mx-auto" />
                <p className="text-xs text-muted-foreground">Mapa interactivo de cobertura</p>
                <p className="text-[10px] text-muted-foreground/50">Basado en datos de red Kyron 5G Venezuela</p>
              </div>
            </div>

            {ZONAS_COBERTURA.slice(0, 6).map((zona, i) => {
              const positions = [
                { top: "25%", left: "45%" }, { top: "30%", left: "55%" },
                { top: "45%", left: "25%" }, { top: "40%", left: "42%" },
                { top: "55%", left: "35%" }, { top: "50%", left: "60%" },
              ];
              const pos = positions[i];
              const calConf = ESTADO_CALIDAD[zona.estado as keyof typeof ESTADO_CALIDAD];
              return (
                <motion.div
                  key={zona.zona}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="absolute group cursor-pointer"
                  style={pos}
                >
                  <div className={cn("h-4 w-4 rounded-full ring-4", calConf.bg, calConf.ring)}>
                    <div className={cn("absolute -inset-1 rounded-full animate-ping opacity-30", calConf.bg)} />
                  </div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border rounded-lg px-2 py-1 whitespace-nowrap z-10 shadow-lg">
                    <p className="text-[11px] font-bold text-foreground">{zona.zona}</p>
                    <p className="text-[10px] text-muted-foreground">{zona.tipo5G ? "5G" : "4G"} · {zona.calidad}%</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 justify-center mb-4">
            {[
              { label: "5G", color: "bg-primary" },
              { label: "4G LTE", color: "bg-cyan-500" },
              { label: "3G", color: "bg-amber-500" },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className={cn("h-2.5 w-2.5 rounded-full", l.color)} />
                <span className="text-[10px] text-muted-foreground font-semibold">{l.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50">
          <CardTitle className="text-sm font-semibold text-foreground">Detalle por Zona</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {zonasFiltradas.map((zona, i) => {
            const calConf = ESTADO_CALIDAD[zona.estado as keyof typeof ESTADO_CALIDAD];
            return (
              <div key={i} className="flex items-center justify-between px-5 py-3.5 border-b border-border/30 last:border-0 hover:bg-muted/5 transition-colors">
                <div className="flex items-center gap-3">
                  <MapPin className={cn("h-4 w-4", calConf.color)} />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{zona.zona}</p>
                    <div className="flex gap-1.5 mt-0.5">
                      {zona.tipo5G && <Badge variant="outline" className="text-[10px] px-1 py-0 bg-primary/10 text-primary border-primary/20">5G</Badge>}
                      {zona.tipo4G && <Badge variant="outline" className="text-[10px] px-1 py-0 bg-cyan-500/10 text-cyan-500 border-cyan-500/20">4G</Badge>}
                      {zona.tipo3G && <Badge variant="outline" className="text-[10px] px-1 py-0 bg-amber-500/10 text-amber-500 border-amber-500/20">3G</Badge>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={cn("text-sm font-bold", calConf.color)}>{zona.calidad}%</p>
                    <p className="text-[11px] text-muted-foreground">Latencia: {zona.latencia}</p>
                  </div>
                  <div className="h-2 w-24 bg-muted/30 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", calConf.bg)} style={{ width: `${zona.calidad}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
