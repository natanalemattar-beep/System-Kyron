"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  UserCheck, Calculator, CircleCheck, AlertTriangle, Clock,
  Fingerprint, ShieldCheck, DollarSign, FileText, RefreshCw, Percent
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface TitularLinea {
  id: string;
  nombre: string;
  cedula: string;
  cargo: string;
  departamento: string;
  lineaAsignada: string;
  ultimaVerificacion: string;
  estadoVerificacion: "vigente" | "pendiente" | "vencida";
  proximaVerificacion: string;
}

const MOCK_TITULARES: TitularLinea[] = [
  { id: "T1", nombre: "Carlos Pérez", cedula: "V-18.234.567", cargo: "Gerente de Ventas", departamento: "Ventas", lineaAsignada: "+58 412-1234567", ultimaVerificacion: "15/01/2026", estadoVerificacion: "vigente", proximaVerificacion: "15/07/2026" },
  { id: "T2", nombre: "María Gómez", cedula: "V-20.456.789", cargo: "Coordinadora Marketing", departamento: "Marketing", lineaAsignada: "+58 414-7654321", ultimaVerificacion: "01/10/2025", estadoVerificacion: "pendiente", proximaVerificacion: "01/04/2026" },
  { id: "T3", nombre: "Juan Rodríguez", cedula: "V-19.876.543", cargo: "Analista IT", departamento: "IT", lineaAsignada: "+58 416-9876543", ultimaVerificacion: "20/02/2026", estadoVerificacion: "vigente", proximaVerificacion: "20/08/2026" },
  { id: "T4", nombre: "Ana Fernández", cedula: "V-21.345.678", cargo: "Directora RRHH", departamento: "RR.HH.", lineaAsignada: "+58 424-5551234", ultimaVerificacion: "10/08/2025", estadoVerificacion: "vencida", proximaVerificacion: "10/02/2026" },
  { id: "T5", nombre: "Luis Martínez", cedula: "V-17.654.321", cargo: "Director Comercial", departamento: "Ventas", lineaAsignada: "+58 426-1112223", ultimaVerificacion: "05/12/2025", estadoVerificacion: "vigente", proximaVerificacion: "05/06/2026" },
];

const ESTADO_VERIF = {
  vigente: { label: "Vigente", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  pendiente: { label: "Pendiente", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  vencida: { label: "Vencida", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" },
};

export function RecertificacionPanel() {
  const { toast } = useToast();
  const [verificando, setVerificando] = useState<string | null>(null);

  const handleVerificar = async (titular: TitularLinea) => {
    setVerificando(titular.id);
    await new Promise(r => setTimeout(r, 1500));
    setVerificando(null);
    toast({
      title: "Verificación Iniciada",
      description: `Proceso de recertificación iniciado para ${titular.nombre} (${titular.cedula}). Se notificará al titular.`,
      action: <CircleCheck className="h-4 w-4 text-emerald-500" />,
    });
  };

  const vigentes = MOCK_TITULARES.filter(t => t.estadoVerificacion === "vigente").length;
  const pendientes = MOCK_TITULARES.filter(t => t.estadoVerificacion === "pendiente").length;
  const vencidas = MOCK_TITULARES.filter(t => t.estadoVerificacion === "vencida").length;

  return (
    <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
      <CardHeader className="px-5 py-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg ring-1 ring-primary/20">
              <Fingerprint className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">
                Recertificación de Titulares
              </CardTitle>
              <CardDescription className="text-[10px] text-muted-foreground">
                Verificación periódica de identidad · Normativa antifraude CONATEL
              </CardDescription>
            </div>
          </div>
          <Button variant="outline" size="sm" className="h-8 rounded-lg text-[10px]">
            <RefreshCw className="mr-1.5 h-3 w-3" /> Recertificar Masivo
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-center">
            <p className="text-lg font-black text-emerald-500">{vigentes}</p>
            <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Vigentes</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/15 text-center">
            <p className="text-lg font-black text-amber-500">{pendientes}</p>
            <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Pendientes</p>
          </div>
          <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/15 text-center">
            <p className="text-lg font-black text-rose-500">{vencidas}</p>
            <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Vencidas</p>
          </div>
        </div>

        <div className="space-y-2">
          {MOCK_TITULARES.map((titular) => {
            const config = ESTADO_VERIF[titular.estadoVerificacion];
            return (
              <div key={titular.id} className="p-3 rounded-xl bg-muted/10 border border-border/30 flex items-center justify-between hover:bg-muted/15 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <UserCheck className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{titular.nombre}</p>
                    <p className="text-[10px] text-muted-foreground">{titular.cedula} · {titular.departamento} · {titular.lineaAsignada}</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">
                      Última: {titular.ultimaVerificacion} · Próxima: {titular.proximaVerificacion}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={cn("text-[9px] px-2 py-0.5", config.bg, config.color, config.border)}>
                    {config.label}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 rounded-lg text-[9px]"
                    disabled={verificando === titular.id}
                    onClick={() => handleVerificar(titular)}
                  >
                    {verificando === titular.id ? <RefreshCw className="h-3 w-3 animate-spin" /> : <ShieldCheck className="h-3 w-3" />}
                    <span className="ml-1">{verificando === titular.id ? "Verificando..." : "Verificar"}</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function FIDETELCalculator() {
  const { toast } = useToast();
  const [ingresosBrutos, setIngresosBrutos] = useState("1500000");
  const [porcentaje, setPorcentaje] = useState("1");
  const [periodo, setPeriodo] = useState("2026-Q1");

  const ingresosNum = parseFloat(ingresosBrutos) || 0;
  const pctNum = parseFloat(porcentaje) || 0;
  const contribucion = (ingresosNum * pctNum) / 100;

  const handleGenerar = () => {
    toast({
      title: "Cálculo FIDETEL Generado",
      description: `Contribución de ${formatCurrency(contribucion, 'VES')} (${pctNum}% sobre ${formatCurrency(ingresosNum, 'VES')}) para ${periodo}.`,
      action: <CircleCheck className="h-4 w-4 text-emerald-500" />,
    });
  };

  return (
    <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
      <CardHeader className="px-5 py-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-lg ring-1 ring-amber-500/20">
            <Calculator className="h-4 w-4 text-amber-500" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold text-foreground">
              Contribución FIDETEL
            </CardTitle>
            <CardDescription className="text-[10px] text-muted-foreground">
              Fondo de Investigación y Desarrollo de las Telecomunicaciones · LOTEL Art. 148
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Ingresos Brutos (Bs.)</Label>
            <Input
              type="number"
              value={ingresosBrutos}
              onChange={e => setIngresosBrutos(e.target.value)}
              className="h-10 rounded-xl text-sm font-mono"
              placeholder="0.00"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Porcentaje (%)</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                min="0.1"
                max="5"
                step="0.1"
                value={porcentaje}
                onChange={e => setPorcentaje(e.target.value)}
                className="h-10 rounded-xl text-sm font-mono flex-1"
              />
              <div className="flex gap-1">
                {["0.5", "1", "2"].map(p => (
                  <Button
                    key={p}
                    variant={porcentaje === p ? "default" : "outline"}
                    size="sm"
                    className="h-10 w-12 rounded-xl text-[10px] font-bold"
                    onClick={() => setPorcentaje(p)}
                  >
                    {p}%
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Período Fiscal</Label>
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="h-10 rounded-xl text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026-Q1">Q1 2026 (Ene-Mar)</SelectItem>
              <SelectItem value="2026-Q2">Q2 2026 (Abr-Jun)</SelectItem>
              <SelectItem value="2026-Q3">Q3 2026 (Jul-Sep)</SelectItem>
              <SelectItem value="2026-Q4">Q4 2026 (Oct-Dic)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-amber-500/5 border border-primary/15 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Base Imponible</span>
            <span className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(ingresosNum, 'VES')}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Tasa Aplicable</span>
            <span className="text-sm font-bold text-primary tabular-nums">{pctNum}%</span>
          </div>
          <div className="h-px bg-border/50" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground">Contribución FIDETEL</span>
            <span className="text-lg font-black text-primary tabular-nums">{formatCurrency(contribucion, 'VES')}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleGenerar} className="flex-1 h-10 rounded-xl text-xs font-semibold">
            <FileText className="mr-1.5 h-3.5 w-3.5" /> Generar Planilla
          </Button>
          <Button variant="outline" className="h-10 rounded-xl text-xs font-semibold">
            <DollarSign className="mr-1.5 h-3.5 w-3.5" /> Historial
          </Button>
        </div>

        <div className="p-3 rounded-xl bg-muted/10 border border-border/30">
          <p className="text-[9px] text-muted-foreground leading-relaxed">
            <strong>Base Legal:</strong> Art. 148-152 LOTEL (G.O. 39.610). La contribución especial al FIDETEL
            se calcula sobre los ingresos brutos del operador. El porcentaje es fijado por CONATEL
            según el tipo de servicio (0.5% - 2%). El pago es trimestral.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
