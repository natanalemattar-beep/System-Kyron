"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ScanLine, Smartphone, QrCode, Shield, Plus, Trash2,
  CircleCheck, Download, RefreshCw, Signal, Wifi
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const ESIMS_ACTIVAS = [
  {
    id: "esim-001",
    nombre: "Línea Principal",
    numero: "+58 412-1234567",
    operadora: "Movistar",
    plan: "Plan Global 40GB",
    estado: "activa",
    fechaActivacion: "15/01/2026",
    iccid: "8958020000000000001",
  },
  {
    id: "esim-002",
    nombre: "Datos Adicionales",
    numero: "+58 414-9876543",
    operadora: "Digitel",
    plan: "Solo Datos 20GB",
    estado: "activa",
    fechaActivacion: "01/03/2026",
    iccid: "8958020000000000002",
  },
];

const PASOS_ACTIVACION = [
  { paso: 1, titulo: "Solicitar eSIM", desc: "Genera un perfil digital desde esta plataforma." },
  { paso: 2, titulo: "Escanear QR", desc: "Abre la cámara de tu dispositivo y escanea el código QR." },
  { paso: 3, titulo: "Configurar APN", desc: "El equipo configura automáticamente la red 5G." },
  { paso: 4, titulo: "Activar Línea", desc: "Tu eSIM estará operativa en menos de 5 minutos." },
];

export default function ESimPage() {
  const { toast } = useToast();
  const [activando, setActivando] = useState(false);

  const handleNuevaEsim = async () => {
    setActivando(true);
    try {
      const res = await fetch("/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoria: "telecom", subcategoria: "esim", descripcion: "Solicitud de nueva eSIM digital" }),
      });
      if (res.ok) {
        toast({ title: "Solicitud registrada", description: "Tu nueva eSIM está siendo generada. Recibirás el código QR por correo.", action: <CircleCheck className="h-4 w-4 text-emerald-500" /> });
      } else {
        toast({ variant: "destructive", title: "Error", description: "No se pudo procesar la solicitud." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    } finally {
      setActivando(false);
    }
  };

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ScanLine className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Mi Línea Personal</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">eSIM Digital</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Gestión de tus perfiles eSIM con activación instantánea.</p>
        </div>
        <Button onClick={handleNuevaEsim} disabled={activando} size="sm" className="h-9 px-4 rounded-lg text-xs font-semibold shadow-sm">
          {activando ? <RefreshCw className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Plus className="mr-1.5 h-3.5 w-3.5" />}
          {activando ? "Generando..." : "Nueva eSIM"}
        </Button>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "eSIMs Activas", val: "2", icon: ScanLine, color: "text-primary", accent: "from-primary/20 to-primary/0", ring: "ring-primary/20", iconBg: "bg-primary/10" },
          { label: "Dispositivos", val: "2", icon: Smartphone, color: "text-cyan-500", accent: "from-cyan-500/20 to-cyan-500/0", ring: "ring-cyan-500/20", iconBg: "bg-cyan-500/10" },
          { label: "Capacidad Total", val: "60 GB", icon: Wifi, color: "text-emerald-500", accent: "from-emerald-500/20 to-emerald-500/0", ring: "ring-emerald-500/20", iconBg: "bg-emerald-500/10" },
          { label: "Red", val: "5G SA", icon: Signal, color: "text-amber-500", accent: "from-amber-500/20 to-amber-500/0", ring: "ring-amber-500/20", iconBg: "bg-amber-500/10" },
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

      <div className="grid lg:grid-cols-2 gap-5">
        {ESIMS_ACTIVAS.map((esim) => (
          <motion.div key={esim.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden hover:-translate-y-0.5 transition-all duration-300">
              <CardHeader className="px-5 py-4 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-primary/10 rounded-xl ring-1 ring-primary/20">
                      <ScanLine className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-bold text-foreground">{esim.nombre}</CardTitle>
                      <CardDescription className="text-[10px] text-muted-foreground font-mono">{esim.numero}</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px]">
                    Activa
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Operadora</p>
                    <p className="text-xs font-semibold text-foreground">{esim.operadora}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Plan</p>
                    <p className="text-xs font-semibold text-foreground">{esim.plan}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Activación</p>
                    <p className="text-xs font-semibold text-foreground">{esim.fechaActivacion}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">ICCID</p>
                    <p className="text-[10px] font-mono text-muted-foreground">{esim.iccid}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button variant="outline" size="sm" className="rounded-lg text-[10px] h-8 flex-1" onClick={async () => { try { const res = await fetch('/api/solicitudes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categoria: 'telecom', subcategoria: 'qr_generado', descripcion: "QR generado" }) }); if (res.ok) toast({ title: "QR generado", description: `Código QR de ${esim.nombre} listo.` }); else toast({ title: "Error", variant: "destructive" }); } catch { toast({ title: "Error de conexión", variant: "destructive" }); } }}>
                    <QrCode className="mr-1.5 h-3 w-3" /> Ver QR
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-lg text-[10px] h-8 flex-1" onClick={async () => { try { const res = await fetch('/api/solicitudes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categoria: 'telecom', subcategoria: 'perfil_descargado', descripcion: "Perfil descargado" }) }); if (res.ok) toast({ title: "Perfil descargado", description: "Archivo .esim generado." }); else toast({ title: "Error", variant: "destructive" }); } catch { toast({ title: "Error de conexión", variant: "destructive" }); } }}>
                    <Download className="mr-1.5 h-3 w-3" /> Descargar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">Cómo Activar tu eSIM</CardTitle>
              <CardDescription className="text-[10px] text-muted-foreground">Proceso de activación en 4 pasos</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PASOS_ACTIVACION.map((p, i) => (
              <div key={i} className="relative p-4 rounded-xl bg-muted/20 border border-border/40 space-y-2">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-black text-primary">{p.paso}</span>
                </div>
                <h3 className="text-xs font-bold text-foreground">{p.titulo}</h3>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
