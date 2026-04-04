"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  UserCheck, Calculator, CircleCheck, Clock,
  Fingerprint, ShieldCheck, DollarSign, FileText, RefreshCw, Inbox
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface LineaTitular {
  id: number;
  numero: string;
  titular: string | null;
  departamento: string | null;
  activa: boolean;
  fecha_activacion: string | null;
}

const ESTADO_VERIF = {
  vigente: { label: "Vigente", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  pendiente: { label: "Pendiente", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  vencida: { label: "Vencida", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" },
};

function calcEstado(fechaActivacion: string | null): keyof typeof ESTADO_VERIF {
  if (!fechaActivacion) return "pendiente";
  const meses = (Date.now() - new Date(fechaActivacion).getTime()) / (1000 * 60 * 60 * 24 * 30);
  if (meses > 12) return "vencida";
  if (meses > 6) return "pendiente";
  return "vigente";
}

function fmtDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("es-VE");
}

export function RecertificacionPanel() {
  const { toast } = useToast();
  const [verificando, setVerificando] = useState<number | null>(null);
  const [lineas, setLineas] = useState<LineaTitular[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/telecom")
      .then(r => r.json())
      .then(d => setLineas((d.lineas ?? []).filter((l: LineaTitular) => !!l.titular)))
      .catch(() => setLineas([]))
      .finally(() => setLoading(false));
  }, []);

  const handleVerificar = async (linea: LineaTitular) => {
    setVerificando(linea.id);
    await new Promise(r => setTimeout(r, 1500));
    setVerificando(null);
    toast({
      title: "Verificación Iniciada",
      description: `Proceso de recertificación iniciado para ${linea.titular} (${linea.numero}). Se notificará al titular.`,
      action: <CircleCheck className="h-4 w-4 text-emerald-500" />,
    });
  };

  const vigentes = lineas.filter(l => calcEstado(l.fecha_activacion) === "vigente").length;
  const pendientes = lineas.filter(l => calcEstado(l.fecha_activacion) === "pendiente").length;
  const vencidas = lineas.filter(l => calcEstado(l.fecha_activacion) === "vencida").length;

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

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground/40" />
          </div>
        ) : lineas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2 text-center">
            <Inbox className="h-10 w-10 text-muted-foreground/30" />
            <p className="text-xs text-muted-foreground">No hay líneas con titular asignado</p>
            <p className="text-[10px] text-muted-foreground/60">Asigna titulares en el módulo de Flota</p>
          </div>
        ) : (
          <div className="space-y-2">
            {lineas.map((linea) => {
              const estado = calcEstado(linea.fecha_activacion);
              const config = ESTADO_VERIF[estado];
              return (
                <div key={linea.id} className="p-3 rounded-xl bg-muted/10 border border-border/30 flex items-center justify-between hover:bg-muted/15 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <UserCheck className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{linea.titular ?? "—"}</p>
                      <p className="text-[10px] text-muted-foreground">{linea.departamento ?? "Sin departamento"} · {linea.numero}</p>
                      <p className="text-[9px] text-muted-foreground mt-0.5">
                        Activación: {fmtDate(linea.fecha_activacion)}
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
                      disabled={verificando === linea.id}
                      onClick={() => handleVerificar(linea)}
                    >
                      {verificando === linea.id ? <RefreshCw className="h-3 w-3 animate-spin" /> : <ShieldCheck className="h-3 w-3" />}
                      <span className="ml-1">{verificando === linea.id ? "Verificando..." : "Verificar"}</span>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function FIDETELCalculator() {
  const { toast } = useToast();
  const [ingresosBrutos, setIngresosBrutos] = useState("");
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

export function RecertificacionInfo() {
  return (
    <div className="p-4 rounded-xl bg-muted/10 border border-border/30 space-y-2">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-primary" />
        <p className="text-xs font-semibold text-foreground">Cronograma de Recertificación</p>
      </div>
      <p className="text-[10px] text-muted-foreground leading-relaxed">
        La recertificación de titulares de líneas telefónicas es obligatoria cada 6 meses
        según resolución CONATEL. Los titulares recibirán notificación automática 30 días
        antes del vencimiento.
      </p>
    </div>
  );
}
