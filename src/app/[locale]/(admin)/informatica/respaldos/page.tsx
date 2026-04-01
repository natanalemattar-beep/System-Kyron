"use client";

import React from "react";
import { FolderArchive, HardDrive, Cloud, CheckCircle, Clock, Download, Calendar, Shield, AlertTriangle, Zap, RefreshCw, Database, Server } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const respaldos = [
  {
    nombre: "Base de Datos Producción",
    tipo: "Incremental",
    frecuencia: "Cada 6 horas",
    ultimoRespaldo: "01/04/2026 03:00",
    proximoRespaldo: "01/04/2026 09:00",
    tamano: "2.4 GB",
    destino: "AWS S3 + Local NAS",
    retencion: "90 días",
    estado: "exitoso",
    cifrado: true,
  },
  {
    nombre: "Archivos del Sistema",
    tipo: "Completo",
    frecuencia: "Diario 02:00 AM",
    ultimoRespaldo: "01/04/2026 02:00",
    proximoRespaldo: "02/04/2026 02:00",
    tamano: "48.5 GB",
    destino: "NAS Local (RAID 5)",
    retencion: "30 días",
    estado: "exitoso",
    cifrado: true,
  },
  {
    nombre: "Documentos Fiscales SENIAT",
    tipo: "Completo",
    frecuencia: "Diario 01:00 AM",
    ultimoRespaldo: "01/04/2026 01:00",
    proximoRespaldo: "02/04/2026 01:00",
    tamano: "12.8 GB",
    destino: "AWS S3 (Cifrado AES-256)",
    retencion: "10 años (fiscal)",
    estado: "exitoso",
    cifrado: true,
  },
  {
    nombre: "Correo Electrónico",
    tipo: "Incremental",
    frecuencia: "Cada 12 horas",
    ultimoRespaldo: "31/03/2026 23:00",
    proximoRespaldo: "01/04/2026 11:00",
    tamano: "18.2 GB",
    destino: "Google Vault + Local",
    retencion: "5 años",
    estado: "exitoso",
    cifrado: true,
  },
  {
    nombre: "Máquinas Virtuales",
    tipo: "Snapshot",
    frecuencia: "Semanal (Domingo)",
    ultimoRespaldo: "30/03/2026 04:00",
    proximoRespaldo: "06/04/2026 04:00",
    tamano: "320 GB",
    destino: "SAN + Offsite DC",
    retencion: "60 días",
    estado: "exitoso",
    cifrado: false,
  },
  {
    nombre: "Configuraciones de Red",
    tipo: "Completo",
    frecuencia: "Semanal",
    ultimoRespaldo: "30/03/2026 05:00",
    proximoRespaldo: "06/04/2026 05:00",
    tamano: "245 MB",
    destino: "Git + NAS",
    retencion: "365 días",
    estado: "exitoso",
    cifrado: true,
  },
];

export default function RespaldosPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <FolderArchive className="h-3 w-3" /> RESPALDOS Y BACKUP
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Respaldos y <span className="text-primary italic">Recuperación</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Backup Automático • Cifrado AES-256 • DR Plan • Retención Legal
          </p>
        </div>
        <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2"
          onClick={() => toast({ title: "Respaldo Manual Iniciado", description: "Ejecutando respaldo completo de todos los sistemas..." })}>
          <Zap className="h-4 w-4" /> RESPALDO AHORA
        </Button>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Último Respaldo", val: "Hoy 03:00", icon: Clock, color: "text-emerald-500" },
          { label: "Total Respaldado", val: "402 GB", icon: HardDrive, color: "text-primary" },
          { label: "Exitosos (30d)", val: "100%", icon: CheckCircle, color: "text-emerald-500" },
          { label: "Cloud Storage", val: "1.2 TB", icon: Cloud, color: "text-cyan-500" },
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="bg-card/60 border-border/50 p-5 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{kpi.label}</span>
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
              <p className={cn("text-xl font-black tracking-tight", kpi.color)}>{kpi.val}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        {respaldos.map((resp, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Card className="rounded-xl overflow-hidden">
              <div className="flex items-start gap-4 p-5">
                <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                  {resp.tipo === "Snapshot" ? <Server className="h-5 w-5 text-primary" /> :
                   resp.destino.includes("AWS") ? <Cloud className="h-5 w-5 text-cyan-500" /> :
                   <Database className="h-5 w-5 text-primary" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-bold">{resp.nombre}</p>
                    <Badge className="bg-emerald-500/10 text-emerald-500 text-[8px] font-bold gap-1">
                      <CheckCircle className="h-3 w-3" /> {resp.estado}
                    </Badge>
                    <Badge className="text-[8px] font-bold bg-muted/30">{resp.tipo}</Badge>
                    {resp.cifrado && <Badge className="text-[8px] font-bold bg-violet-500/10 text-violet-500"><Shield className="h-3 w-3 mr-0.5" /> Cifrado</Badge>}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                    <div>
                      <p className="text-[9px] text-muted-foreground uppercase">Frecuencia</p>
                      <p className="text-[11px] font-medium">{resp.frecuencia}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground uppercase">Último</p>
                      <p className="text-[11px] font-medium">{resp.ultimoRespaldo}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground uppercase">Tamaño</p>
                      <p className="text-[11px] font-medium">{resp.tamano}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-muted-foreground uppercase">Retención</p>
                      <p className="text-[11px] font-medium">{resp.retencion}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2">Destino: {resp.destino}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <Button size="sm" variant="outline" className="rounded-lg text-[10px] font-bold gap-1.5">
                    <RefreshCw className="h-3 w-3" /> Ejecutar
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-lg text-[10px] font-bold gap-1.5">
                    <Download className="h-3 w-3" /> Restaurar
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="border-emerald-500/20 bg-emerald-500/[0.03] rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-black text-emerald-600 uppercase tracking-wider">Plan de Recuperación ante Desastres (DR)</p>
            <p className="text-[11px] text-muted-foreground mt-1">
              System Kyron mantiene una política de respaldos 3-2-1: tres copias de cada dato, en dos medios diferentes,
              con una copia fuera del sitio (cloud). Los documentos fiscales tienen retención de 10 años conforme al
              COT Art. 56. El RPO (Recovery Point Objective) es de 6 horas y el RTO (Recovery Time Objective) es de 4 horas.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
