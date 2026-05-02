"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield, TriangleAlert, CircleCheck, Clock, RefreshCw,
  FileText, Calendar, Bell, ExternalLink, ChevronDown, ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type EstadoHomologacion = "verificado" | "pendiente" | "rechazado";

interface PermisoConatel {
  id: string;
  nombre: string;
  numero: string;
  estado: "vigente" | "por_vencer" | "vencido" | "en_tramite";
  fechaEmision: string;
  fechaVencimiento: string;
  diasRestantes: number;
}

interface ConatelCompliancePanelProps {
  tipo: "personal" | "empresa";
  estadoHomologacion?: EstadoHomologacion;
  permisos?: PermisoConatel[];
  habilitacionAdministrativa?: {
    estado: "activa" | "suspendida" | "en_proceso";
    numero: string;
    vigencia: string;
  };
}

const ESTADO_HOMOLOGACION_CONFIG = {
  verificado: { label: "Verificado CONATEL", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: CircleCheck },
  pendiente: { label: "Pendiente Verificación", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", icon: Clock },
  rechazado: { label: "Rechazado", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20", icon: TriangleAlert },
};

const ESTADO_PERMISO_CONFIG = {
  vigente: { label: "Vigente", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  por_vencer: { label: "Por Vencer", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  vencido: { label: "Vencido", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" },
  en_tramite: { label: "En Trámite", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
};

const PERMISOS_PERSONAL: PermisoConatel[] = [
  { id: "P1", nombre: "Habilitación Servicio Móvil", numero: "HAB-2024-001234", estado: "vigente", fechaEmision: "15/01/2025", fechaVencimiento: "15/01/2027", diasRestantes: 651 },
  { id: "P2", nombre: "Registro de Equipos", numero: "REQ-2024-005678", estado: "vigente", fechaEmision: "01/03/2025", fechaVencimiento: "01/03/2026", diasRestantes: 331 },
];

const PERMISOS_EMPRESA: PermisoConatel[] = [
  { id: "P1", nombre: "Habilitación Administrativa ISP", numero: "HAB-ADM-2024-0012", estado: "vigente", fechaEmision: "01/06/2024", fechaVencimiento: "01/06/2026", diasRestantes: 423 },
  { id: "P2", nombre: "Concesión Espectro 5G", numero: "ESP-5G-2024-0034", estado: "vigente", fechaEmision: "15/03/2025", fechaVencimiento: "15/03/2030", diasRestantes: 1807 },
  { id: "P3", nombre: "Licencia Red Privada Corp.", numero: "RED-PRI-2025-0089", estado: "por_vencer", fechaEmision: "10/01/2025", fechaVencimiento: "10/07/2026", diasRestantes: 97 },
  { id: "P4", nombre: "Permiso VoIP Corporativo", numero: "VOIP-2025-0456", estado: "en_tramite", fechaEmision: "—", fechaVencimiento: "—", diasRestantes: 0 },
];

export function ConatelCompliancePanel({
  tipo,
  estadoHomologacion = "verificado",
  permisos,
  habilitacionAdministrativa,
}: ConatelCompliancePanelProps) {
  const [expanded, setExpanded] = useState(false);

  const permisosData = permisos || (tipo === "empresa" ? PERMISOS_EMPRESA : PERMISOS_PERSONAL);
  const homoConfig = ESTADO_HOMOLOGACION_CONFIG[estadoHomologacion];
  const HomoIcon = homoConfig.icon;

  const habilitacion = habilitacionAdministrativa || {
    estado: "activa" as const,
    numero: tipo === "empresa" ? "HAB-ADM-2024-0012" : "HAB-PER-2024-7890",
    vigencia: tipo === "empresa" ? "01/06/2026" : "15/01/2027",
  };

  const permisosVigentes = permisosData.filter(p => p.estado === "vigente").length;
  const permisosPorVencer = permisosData.filter(p => p.estado === "por_vencer").length;
  const permisosVencidos = permisosData.filter(p => p.estado === "vencido").length;
  const alertasRenovacion = permisosData.filter(p => p.diasRestantes > 0 && p.diasRestantes <= 90).length;

  return (
    <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
      <CardHeader className="px-5 py-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg ring-1 ring-primary/20">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">
                Cumplimiento CONATEL
              </CardTitle>
              <CardDescription className="text-[10px] text-muted-foreground">
                Ley Orgánica de Telecomunicaciones · G.O. 39.610
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn("text-[10px] px-2.5 py-0.5 font-semibold", homoConfig.bg, homoConfig.color, homoConfig.border)}>
              <HomoIcon className="h-3 w-3 mr-1" />
              {homoConfig.label}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-md"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Habilitación", val: habilitacion.estado === "activa" ? "Activa" : habilitacion.estado === "suspendida" ? "Suspendida" : "En Proceso", color: habilitacion.estado === "activa" ? "text-emerald-500" : "text-amber-500", icon: Shield },
            { label: "Permisos Vigentes", val: `${permisosVigentes}/${permisosData.length}`, color: "text-primary", icon: CircleCheck },
            { label: "Alertas Renovación", val: `${alertasRenovacion}`, color: alertasRenovacion > 0 ? "text-amber-500" : "text-emerald-500", icon: Bell },
            { label: "Vencidos", val: `${permisosVencidos}`, color: permisosVencidos > 0 ? "text-rose-500" : "text-emerald-500", icon: TriangleAlert },
          ].map((stat, i) => (
            <div key={i} className="p-3 rounded-xl bg-muted/10 border border-border/30 space-y-1">
              <div className="flex items-center gap-1.5">
                <stat.icon className={cn("h-3 w-3", stat.color)} />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
              </div>
              <p className={cn("text-lg font-bold", stat.color)}>{stat.val}</p>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-xl bg-primary/5 border border-primary/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <FileText className="h-3.5 w-3.5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Habilitación Administrativa</p>
              <p className="text-[10px] text-muted-foreground font-mono">{habilitacion.numero}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground">Vigencia hasta</p>
            <p className="text-xs font-bold text-primary">{habilitacion.vigencia}</p>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 overflow-hidden"
            >
              <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground pt-1">
                Permisos y Licencias
              </h4>
              {permisosData.map((permiso) => {
                const config = ESTADO_PERMISO_CONFIG[permiso.estado];
                return (
                  <div key={permiso.id} className="p-3 rounded-xl bg-muted/10 border border-border/30 flex items-center justify-between hover:bg-muted/15 transition-colors">
                    <div className="space-y-0.5">
                      <p className="text-xs font-semibold text-foreground">{permiso.nombre}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">{permiso.numero}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[11px] text-muted-foreground">
                          <Calendar className="h-2.5 w-2.5 inline mr-0.5" /> {permiso.fechaEmision} — {permiso.fechaVencimiento}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {permiso.diasRestantes > 0 && permiso.diasRestantes <= 90 && (
                        <Badge variant="outline" className="text-[11px] bg-amber-500/10 text-amber-500 border-amber-500/20">
                          <Bell className="h-2.5 w-2.5 mr-0.5" /> {permiso.diasRestantes}d
                        </Badge>
                      )}
                      <Badge variant="outline" className={cn("text-[11px] px-2 py-0.5", config.bg, config.color, config.border)}>
                        {config.label}
                      </Badge>
                    </div>
                  </div>
                );
              })}

              {permisosPorVencer > 0 && (
                <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/15 flex items-start gap-3">
                  <TriangleAlert className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-amber-500">Alerta de Renovación</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {permisosPorVencer} permiso(s) requieren renovación en los próximos 90 días.
                      Inicie el proceso ante CONATEL para evitar interrupciones del servicio.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <Button variant="outline" size="sm" className="h-8 rounded-lg text-[10px] flex-1">
                  <RefreshCw className="mr-1.5 h-3 w-3" /> Solicitar Renovación
                </Button>
                <Button variant="outline" size="sm" className="h-8 rounded-lg text-[10px] flex-1">
                  <ExternalLink className="mr-1.5 h-3 w-3" /> Portal CONATEL
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
