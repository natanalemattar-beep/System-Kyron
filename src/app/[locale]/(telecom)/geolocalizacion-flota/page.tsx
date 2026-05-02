"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  MapPin, Navigation, Signal, Search, RefreshCw, Eye,
  Truck, Users, CircleCheck, TriangleAlert, Clock, Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface DispositivoFlota {
  id: string;
  nombre: string;
  numero: string;
  departamento: string;
  ubicacion: string;
  coordenadas: { lat: number; lng: number };
  estadoConexion: "online" | "offline" | "en_movimiento";
  ultimaPosicion: string;
  bateria: number;
  velocidad: string;
}

const DISPOSITIVOS_FLOTA: DispositivoFlota[] = [
  { id: "D1", nombre: "Carlos Pérez", numero: "+58 412-1234567", departamento: "Ventas", ubicacion: "Caracas Centro, Av. Urdaneta", coordenadas: { lat: 10.4961, lng: -66.8988 }, estadoConexion: "online", ultimaPosicion: "Hace 2 min", bateria: 85, velocidad: "0 km/h" },
  { id: "D2", nombre: "María Gómez", numero: "+58 414-7654321", departamento: "Marketing", ubicacion: "Chacao, C.C. Sambil", coordenadas: { lat: 10.4867, lng: -66.8524 }, estadoConexion: "en_movimiento", ultimaPosicion: "Ahora", bateria: 62, velocidad: "45 km/h" },
  { id: "D3", nombre: "Juan Rodríguez", numero: "+58 416-9876543", departamento: "IT", ubicacion: "Los Ruices, Torre Kyron", coordenadas: { lat: 10.4923, lng: -66.8456 }, estadoConexion: "online", ultimaPosicion: "Hace 5 min", bateria: 93, velocidad: "0 km/h" },
  { id: "D4", nombre: "Ana Fernández", numero: "+58 424-5551234", departamento: "RR.HH.", ubicacion: "Altamira, Av. San Juan Bosco", coordenadas: { lat: 10.4989, lng: -66.8467 }, estadoConexion: "online", ultimaPosicion: "Hace 1 min", bateria: 78, velocidad: "0 km/h" },
  { id: "D5", nombre: "Luis Martínez", numero: "+58 426-1112223", departamento: "Logística", ubicacion: "Autopista Regional del Centro", coordenadas: { lat: 10.3456, lng: -67.0123 }, estadoConexion: "en_movimiento", ultimaPosicion: "Ahora", bateria: 54, velocidad: "85 km/h" },
  { id: "D6", nombre: "Pedro Suárez", numero: "+58 412-3334445", departamento: "Ventas", ubicacion: "Sin señal — última: Catia La Mar", coordenadas: { lat: 10.6012, lng: -66.9987 }, estadoConexion: "offline", ultimaPosicion: "Hace 45 min", bateria: 12, velocidad: "—" },
];

const ESTADO_CONEXION = {
  online: { label: "En Línea", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", dot: "bg-emerald-500" },
  en_movimiento: { label: "En Movimiento", color: "text-cyan-500", bg: "bg-cyan-500/10", border: "border-cyan-500/20", dot: "bg-cyan-500" },
  offline: { label: "Sin Conexión", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20", dot: "bg-rose-500" },
};

export default function GeolocalizacionFlotaPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const filtrados = DISPOSITIVOS_FLOTA.filter(d =>
    d.nombre.toLowerCase().includes(search.toLowerCase()) ||
    d.departamento.toLowerCase().includes(search.toLowerCase()) ||
    d.numero.includes(search)
  );

  const online = DISPOSITIVOS_FLOTA.filter(d => d.estadoConexion === "online").length;
  const enMovimiento = DISPOSITIVOS_FLOTA.filter(d => d.estadoConexion === "en_movimiento").length;
  const offline = DISPOSITIVOS_FLOTA.filter(d => d.estadoConexion === "offline").length;

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Navigation className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Flota Empresarial</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Geolocalización de Flota</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Ubicación en tiempo real de dispositivos corporativos.</p>
        </div>
        <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg text-xs font-semibold"
          onClick={() => toast({ title: "Mapa Actualizado", description: "Posiciones actualizadas en tiempo real." })}>
          <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Actualizar
        </Button>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Dispositivos", val: `${DISPOSITIVOS_FLOTA.length}`, icon: Users, color: "text-primary", accent: "from-primary/20 to-primary/0", ring: "ring-primary/20", iconBg: "bg-primary/10" },
          { label: "En Línea", val: `${online}`, icon: CircleCheck, color: "text-emerald-500", accent: "from-emerald-500/20 to-emerald-500/0", ring: "ring-emerald-500/20", iconBg: "bg-emerald-500/10" },
          { label: "En Movimiento", val: `${enMovimiento}`, icon: Truck, color: "text-cyan-500", accent: "from-cyan-500/20 to-cyan-500/0", ring: "ring-cyan-500/20", iconBg: "bg-cyan-500/10" },
          { label: "Sin Conexión", val: `${offline}`, icon: TriangleAlert, color: "text-rose-500", accent: "from-rose-500/20 to-rose-500/0", ring: "ring-rose-500/20", iconBg: "bg-rose-500/10" },
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

      <div className="grid lg:grid-cols-5 gap-5">
        <Card className="lg:col-span-3 bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><MapPin className="h-4 w-4 text-primary" /></div>
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">Mapa de Flota</CardTitle>
                <CardDescription className="text-[10px] text-muted-foreground">Posición GPS en tiempo real</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="relative w-full h-[350px] rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border/30 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="h-12 w-12 text-primary/20 mx-auto" />
                  <p className="text-xs text-muted-foreground">Mapa de geolocalización corporativa</p>
                  <p className="text-[10px] text-muted-foreground/50">Caracas y zona metropolitana</p>
                </div>
              </div>

              {DISPOSITIVOS_FLOTA.map((d, i) => {
                const config = ESTADO_CONEXION[d.estadoConexion];
                const positions = [
                  { top: "30%", left: "45%" }, { top: "40%", left: "60%" },
                  { top: "35%", left: "55%" }, { top: "45%", left: "50%" },
                  { top: "55%", left: "35%" }, { top: "25%", left: "70%" },
                ];
                return (
                  <motion.div
                    key={d.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="absolute group cursor-pointer"
                    style={positions[i]}
                    onClick={() => setSelectedDevice(d.id === selectedDevice ? null : d.id)}
                  >
                    <div className={cn("h-5 w-5 rounded-full ring-4 ring-opacity-30 flex items-center justify-center", config.dot)}>
                      {d.estadoConexion === "en_movimiento" && (
                        <div className={cn("absolute -inset-1 rounded-full animate-ping opacity-30", config.dot)} />
                      )}
                    </div>
                    <div className={cn(
                      "absolute -top-12 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg px-2.5 py-1.5 whitespace-nowrap z-10 shadow-lg transition-opacity",
                      selectedDevice === d.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )}>
                      <p className="text-[11px] font-bold text-foreground">{d.nombre}</p>
                      <p className="text-[10px] text-muted-foreground">{d.ubicacion.split(',')[0]}</p>
                      <p className="text-[10px] text-muted-foreground">{d.ultimaPosicion} · {d.velocidad}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-foreground">Dispositivos</CardTitle>
              <div className="relative w-40">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground/40" />
                <Input placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} className="h-7 pl-8 rounded-lg text-[10px]" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 max-h-[380px] overflow-y-auto">
            {filtrados.map((d) => {
              const config = ESTADO_CONEXION[d.estadoConexion];
              return (
                <div
                  key={d.id}
                  className={cn("px-4 py-3 border-b border-border/30 last:border-0 hover:bg-muted/5 transition-colors cursor-pointer", selectedDevice === d.id && "bg-primary/5")}
                  onClick={() => setSelectedDevice(d.id === selectedDevice ? null : d.id)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className={cn("h-2 w-2 rounded-full", config.dot)} />
                      <span className="text-xs font-semibold text-foreground">{d.nombre}</span>
                    </div>
                    <Badge variant="outline" className={cn("text-[10px] px-1.5", config.bg, config.color, config.border)}>
                      {config.label}
                    </Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground pl-4">{d.ubicacion}</p>
                  <div className="flex items-center gap-3 pl-4 mt-1">
                    <span className="text-[11px] text-muted-foreground">{d.departamento}</span>
                    <span className="text-[11px] text-muted-foreground">🔋 {d.bateria}%</span>
                    <span className="text-[11px] text-muted-foreground">{d.ultimaPosicion}</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <div className="p-4 rounded-xl bg-primary/5 border border-primary/15 flex items-start gap-3">
        <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-primary">Cumplimiento LOTEL Art. 190</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Los datos de geolocalización corporativa se almacenan cifrados y están sujetos a retención
            mínima de 12 meses conforme a la normativa. El acceso está restringido a personal autorizado
            y auditado en el log de cumplimiento.
          </p>
        </div>
      </div>
    </div>
  );
}
