"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calculator, DollarSign, Receipt, Percent, Building, ArrowLeft, Activity, FileText, AlertTriangle, CheckCircle, Info, TrendingUp, Landmark, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { BackButton } from "@/components/back-button";

const fmt = (n: number) => n.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const ISLR_ACTIVITIES = [
  { value: "honorarios_natural", label: "Honorarios profesionales (Persona Natural)", rate: 0.03, hasSubstraendo: true },
  { value: "honorarios_juridica", label: "Honorarios profesionales (Persona Jurídica)", rate: 0.05, hasSubstraendo: false },
  { value: "arrendamiento", label: "Arrendamiento", rate: 0.05, hasSubstraendo: false },
  { value: "comisiones", label: "Comisiones", rate: 0.05, hasSubstraendo: false },
  { value: "servicios", label: "Servicios", rate: 0.02, hasSubstraendo: false },
  { value: "publicidad", label: "Publicidad y propaganda", rate: 0.05, hasSubstraendo: false },
  { value: "transporte", label: "Transporte", rate: 0.01, hasSubstraendo: false },
] as const;

export default function SimuladorFiscalPage() {
  const { toast } = useToast();

  const [ivaBase, setIvaBase] = useState("");
  const [ivaExento, setIvaExento] = useState(false);
  const [ivaReducido, setIvaReducido] = useState(false);
  const [ivaReverse, setIvaReverse] = useState(false);
  const [ivaTotal, setIvaTotal] = useState("");

  const [igtfMonto, setIgtfMonto] = useState("");
  const [igtfMetodo, setIgtfMetodo] = useState("divisas");

  const [islrMonto, setIslrMonto] = useState("");
  const [islrActividad, setIslrActividad] = useState("honorarios_natural");
  const [islrUT, setIslrUT] = useState("9");

  const [retIvaMonto, setRetIvaMonto] = useState("");
  const [retIvaAgente, setRetIvaAgente] = useState("especial");

  const [resumenMonto, setResumenMonto] = useState("");
  const [resumenIva, setResumenIva] = useState(true);
  const [resumenIgtf, setResumenIgtf] = useState(false);
  const [resumenIslr, setResumenIslr] = useState(false);
  const [resumenRetIva, setResumenRetIva] = useState(false);
  const [resumenMetodoPago, setResumenMetodoPago] = useState("divisas");
  const [resumenIslrActividad, setResumenIslrActividad] = useState("servicios");
  const [resumenRetIvaAgente, setResumenRetIvaAgente] = useState("especial");

  const ivaRate = ivaExento ? 0 : ivaReducido ? 0.08 : 0.16;

  const ivaCalc = useMemo(() => {
    if (ivaReverse) {
      const total = parseFloat(ivaTotal) || 0;
      if (ivaExento) return { base: total, iva: 0, total };
      const base = total / (1 + ivaRate);
      const iva = total - base;
      return { base, iva, total };
    }
    const base = parseFloat(ivaBase) || 0;
    const iva = ivaExento ? 0 : base * ivaRate;
    return { base, iva, total: base + iva };
  }, [ivaBase, ivaTotal, ivaExento, ivaReducido, ivaReverse, ivaRate]);

  const igtfCalc = useMemo(() => {
    const monto = parseFloat(igtfMonto) || 0;
    const aplica = igtfMetodo !== "bolivares";
    const igtf = aplica ? monto * 0.03 : 0;
    return { monto, igtf, total: monto + igtf, aplica };
  }, [igtfMonto, igtfMetodo]);

  const islrCalc = useMemo(() => {
    const monto = parseFloat(islrMonto) || 0;
    const ut = parseFloat(islrUT) || 9;
    const actividad = ISLR_ACTIVITIES.find(a => a.value === islrActividad)!;
    let sustraendo = 0;
    let retencion = 0;

    if (actividad.hasSubstraendo) {
      const umbral = 83.334 * ut;
      sustraendo = umbral * actividad.rate;
      retencion = Math.max(0, monto * actividad.rate - sustraendo);
    } else {
      retencion = monto * actividad.rate;
    }

    return { base: monto, sustraendo, retencion, neto: monto - retencion, rate: actividad.rate, ut };
  }, [islrMonto, islrActividad, islrUT]);

  const retIvaCalc = useMemo(() => {
    const montoIva = parseFloat(retIvaMonto) || 0;
    const porcentaje = retIvaAgente === "especial" ? 0.75 : 1.0;
    const retenido = montoIva * porcentaje;
    return { montoIva, retenido, porPagar: montoIva - retenido, porcentaje };
  }, [retIvaMonto, retIvaAgente]);

  const resumenCalc = useMemo(() => {
    const base = parseFloat(resumenMonto) || 0;
    const ivaRate16 = 0.16;
    const iva = resumenIva ? base * ivaRate16 : 0;
    const subtotalConIva = base + iva;

    const aplicaIgtf = resumenIgtf && resumenMetodoPago !== "bolivares";
    const igtf = aplicaIgtf ? subtotalConIva * 0.03 : 0;

    const ut = parseFloat(islrUT) || 9;
    const actividadRes = ISLR_ACTIVITIES.find(a => a.value === resumenIslrActividad)!;
    let retIslr = 0;
    if (resumenIslr) {
      if (actividadRes.hasSubstraendo) {
        const umbral = 83.334 * ut;
        const sustraendo = umbral * actividadRes.rate;
        retIslr = Math.max(0, base * actividadRes.rate - sustraendo);
      } else {
        retIslr = base * actividadRes.rate;
      }
    }

    const porcentajeRetIva = resumenRetIvaAgente === "especial" ? 0.75 : 1.0;
    const retIva = resumenRetIva ? iva * porcentajeRetIva : 0;

    const totalBruto = subtotalConIva + igtf;
    const totalRetenciones = retIslr + retIva;
    const netoCobrar = totalBruto - totalRetenciones;

    return { base, iva, igtf, retIslr, retIva, totalBruto, totalRetenciones, netoCobrar };
  }, [resumenMonto, resumenIva, resumenIgtf, resumenIslr, resumenRetIva, resumenMetodoPago, resumenIslrActividad, resumenRetIvaAgente, islrUT]);

  const handleCopy = (label: string, value: number) => {
    navigator.clipboard.writeText(fmt(value));
    toast({ title: `${label} copiado`, description: `Bs. ${fmt(value)}` });
  };

  const ResultRow = ({ label, value, accent, bold, icon: Icon }: { label: string; value: number; accent?: boolean; bold?: boolean; icon?: any }) => (
    <div className={cn(
      "flex items-center justify-between py-2.5 px-3 rounded-lg transition-all",
      accent ? "bg-emerald-500/10 border border-emerald-500/20" : "hover:bg-white/[0.02]",
      bold && "border-t border-border/30 mt-1"
    )}>
      <div className="flex items-center gap-2">
        {Icon && <Icon className={cn("h-3.5 w-3.5", accent ? "text-emerald-400" : "text-muted-foreground")} />}
        <span className={cn("text-xs", bold ? "font-semibold uppercase tracking-wider" : "text-muted-foreground font-medium")}>{label}</span>
      </div>
      <button
        onClick={() => handleCopy(label, value)}
        className={cn(
          "font-mono text-sm tabular-nums hover:text-emerald-400 transition-colors cursor-pointer",
          bold ? "font-bold text-base" : "font-semibold",
          accent && "text-emerald-400"
        )}
      >
        Bs. {fmt(value)}
      </button>
    </div>
  );

  return (
    <div className="space-y-8 pb-20 relative">
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.04] blur-[150px]" />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-emerald-600/[0.03] blur-[120px]" />
      </div>

      <div>
        <BackButton href="/facturacion" label="Centro de Facturación" />
        <motion.header
          className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold uppercase tracking-wide text-emerald-400 mb-4">
              <ShieldCheck className="h-3 w-3" /> SIMULADOR FISCAL
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase leading-[1.05]">
              Simulador{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent italic">Fiscal</span>
            </h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-40 mt-2">
              IVA • IGTF • ISLR • Retenciones — Cálculo Integral de Impuestos Venezuela
            </p>
          </div>
        </motion.header>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-4 md:grid-cols-4"
      >
        {[
          { label: "IVA General", value: "16%", icon: Percent, color: "emerald" },
          { label: "IVA Reducido", value: "8%", icon: Receipt, color: "blue" },
          { label: "IGTF", value: "3%", icon: DollarSign, color: "amber" },
          { label: "ISLR Servicios", value: "1-5%", icon: Landmark, color: "purple" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] hover:bg-emerald-500/[0.06] transition-all group">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/15 shrink-0 transition-transform group-hover:scale-110">
              <item.icon className="h-4 w-4 text-emerald-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{item.label}</p>
              <p className="text-lg font-bold text-foreground">{item.value}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs defaultValue="iva" className="w-full">
          <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-card/50 border border-border/30 rounded-xl p-1.5">
            <TabsTrigger value="iva" className="flex-1 min-w-[120px] text-[10px] font-bold uppercase tracking-wider rounded-lg data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-400">
              <Calculator className="h-3.5 w-3.5 mr-1.5" /> IVA
            </TabsTrigger>
            <TabsTrigger value="igtf" className="flex-1 min-w-[120px] text-[10px] font-bold uppercase tracking-wider rounded-lg data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-400">
              <DollarSign className="h-3.5 w-3.5 mr-1.5" /> IGTF
            </TabsTrigger>
            <TabsTrigger value="islr" className="flex-1 min-w-[120px] text-[10px] font-bold uppercase tracking-wider rounded-lg data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-400">
              <Landmark className="h-3.5 w-3.5 mr-1.5" /> Ret. ISLR
            </TabsTrigger>
            <TabsTrigger value="ret-iva" className="flex-1 min-w-[120px] text-[10px] font-bold uppercase tracking-wider rounded-lg data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-400">
              <Receipt className="h-3.5 w-3.5 mr-1.5" /> Ret. IVA
            </TabsTrigger>
            <TabsTrigger value="resumen" className="flex-1 min-w-[120px] text-[10px] font-bold uppercase tracking-wider rounded-lg data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-400">
              <FileText className="h-3.5 w-3.5 mr-1.5" /> Resumen
            </TabsTrigger>
          </TabsList>

          <TabsContent value="iva" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
                <CardHeader className="p-6 border-b border-border/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/15">
                      <Calculator className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <CardTitle className="text-xs font-semibold uppercase tracking-wide">Calculadora IVA</CardTitle>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Alícuota General 16% • Reducida 8%</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border/20 bg-white/[0.02]">
                    <div className="flex items-center gap-2">
                      <Activity className="h-3.5 w-3.5 text-muted-foreground" />
                      <Label className="text-xs font-bold">Cálculo inverso (desde Total)</Label>
                    </div>
                    <Switch checked={ivaReverse} onCheckedChange={(v) => { setIvaReverse(v); setIvaBase(""); setIvaTotal(""); }} />
                  </div>

                  {ivaReverse ? (
                    <div className="space-y-2">
                      <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Total con IVA (Bs.)</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={ivaTotal}
                        onChange={(e) => setIvaTotal(e.target.value)}
                        className="font-mono text-lg h-12 bg-white/[0.03] border-border/30 rounded-xl"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Monto Base sin IVA (Bs.)</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={ivaBase}
                        onChange={(e) => setIvaBase(e.target.value)}
                        className="font-mono text-lg h-12 bg-white/[0.03] border-border/30 rounded-xl"
                      />
                    </div>
                  )}

                  <div className="flex gap-4">
                    <div className="flex items-center justify-between flex-1 p-3 rounded-lg border border-border/20 bg-white/[0.02]">
                      <Label className="text-xs font-bold">¿Exento?</Label>
                      <Switch checked={ivaExento} onCheckedChange={(v) => { setIvaExento(v); if (v) setIvaReducido(false); }} />
                    </div>
                    <div className="flex items-center justify-between flex-1 p-3 rounded-lg border border-border/20 bg-white/[0.02]">
                      <Label className="text-xs font-bold">¿Reducido (8%)?</Label>
                      <Switch checked={ivaReducido} onCheckedChange={(v) => { setIvaReducido(v); if (v) setIvaExento(false); }} disabled={ivaExento} />
                    </div>
                  </div>

                  {ivaExento && (
                    <div className="flex items-start gap-2 p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
                      <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-amber-300/80">Operación exenta de IVA conforme al Art. 19 de la Ley del IVA.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
                <CardHeader className="p-6 border-b border-border/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/15">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <CardTitle className="text-xs font-semibold uppercase tracking-wide">Resultado IVA</CardTitle>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Tasa aplicada: {ivaExento ? "Exento" : ivaReducido ? "8% Reducida" : "16% General"}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-1">
                  <ResultRow label="Base Imponible" value={ivaCalc.base} icon={FileText} />
                  <ResultRow label={`IVA (${ivaExento ? "0" : ivaReducido ? "8" : "16"}%)`} value={ivaCalc.iva} icon={Percent} />
                  <ResultRow label="Total con IVA" value={ivaCalc.total} accent bold icon={DollarSign} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="igtf" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
                <CardHeader className="p-6 border-b border-border/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/15">
                      <DollarSign className="h-4 w-4 text-amber-500" />
                    </div>
                    <div>
                      <CardTitle className="text-xs font-semibold uppercase tracking-wide">Calculadora IGTF</CardTitle>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Impuesto a Grandes Transacciones Financieras — 3%</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Monto de la Operación (Bs.)</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={igtfMonto}
                      onChange={(e) => setIgtfMonto(e.target.value)}
                      className="font-mono text-lg h-12 bg-white/[0.03] border-border/30 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Método de Pago</Label>
                    <Select value={igtfMetodo} onValueChange={setIgtfMetodo}>
                      <SelectTrigger className="h-12 bg-white/[0.03] border-border/30 rounded-xl font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="divisas">Divisas (USD, EUR, etc.)</SelectItem>
                        <SelectItem value="criptomonedas">Criptomonedas</SelectItem>
                        <SelectItem value="bolivares">Bolívares (Bs.)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {igtfMetodo === "bolivares" && (
                    <div className="flex items-start gap-2 p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
                      <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-emerald-300/80">Pagos en Bolívares NO generan IGTF. El impuesto solo aplica a operaciones en divisas o criptomonedas.</p>
                    </div>
                  )}

                  {igtfMetodo !== "bolivares" && (
                    <div className="flex items-start gap-2 p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
                      <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-amber-300/80">IGTF del 3% aplica sobre pagos en {igtfMetodo === "divisas" ? "divisas" : "criptomonedas"} (Decreto N° 4.647).</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
                <CardHeader className="p-6 border-b border-border/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/15">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <CardTitle className="text-xs font-semibold uppercase tracking-wide">Resultado IGTF</CardTitle>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {igtfCalc.aplica ? "IGTF 3% aplicable" : "Sin IGTF (pago en Bs.)"}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-1">
                  <ResultRow label="Monto Operación" value={igtfCalc.monto} icon={FileText} />
                  <ResultRow label="IGTF (3%)" value={igtfCalc.igtf} icon={Percent} />
                  <ResultRow label="Total a Pagar" value={igtfCalc.total} accent bold icon={DollarSign} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="islr" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
                <CardHeader className="p-6 border-b border-border/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/15">
                      <Landmark className="h-4 w-4 text-purple-500" />
                    </div>
                    <div>
                      <CardTitle className="text-xs font-semibold uppercase tracking-wide">Retención ISLR</CardTitle>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Decreto 1.808 — Retenciones en la fuente</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Monto del Pago (Bs.)</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={islrMonto}
                      onChange={(e) => setIslrMonto(e.target.value)}
                      className="font-mono text-lg h-12 bg-white/[0.03] border-border/30 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Tipo de Actividad</Label>
                    <Select value={islrActividad} onValueChange={setIslrActividad}>
                      <SelectTrigger className="h-12 bg-white/[0.03] border-border/30 rounded-xl font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ISLR_ACTIVITIES.map(a => (
                          <SelectItem key={a.value} value={a.value}>
                            {a.label} — {(a.rate * 100).toFixed(0)}%
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Valor de la Unidad Tributaria (Bs.)</Label>
                    <Input
                      type="number"
                      placeholder="9.00"
                      value={islrUT}
                      onChange={(e) => setIslrUT(e.target.value)}
                      className="font-mono text-lg h-12 bg-white/[0.03] border-border/30 rounded-xl"
                    />
                  </div>

                  {islrActividad === "honorarios_natural" && (
                    <div className="flex items-start gap-2 p-3 rounded-lg border border-purple-500/20 bg-purple-500/5">
                      <Info className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-purple-300/80">
                        Para personas naturales se aplica sustraendo: 83.334 UT × {islrUT} Bs. = Bs. {fmt(83.334 * (parseFloat(islrUT) || 9))} (umbral).
                        Retención = (Monto × {((ISLR_ACTIVITIES.find(a => a.value === islrActividad)?.rate || 0) * 100).toFixed(0)}%) − Sustraendo.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
                <CardHeader className="p-6 border-b border-border/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/15">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <CardTitle className="text-xs font-semibold uppercase tracking-wide">Resultado ISLR</CardTitle>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Tasa: {((ISLR_ACTIVITIES.find(a => a.value === islrActividad)?.rate || 0) * 100).toFixed(0)}% • UT: Bs. {islrUT}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-1">
                  <ResultRow label="Base del Pago" value={islrCalc.base} icon={FileText} />
                  {islrCalc.sustraendo > 0 && (
                    <ResultRow label="Sustraendo" value={islrCalc.sustraendo} icon={Info} />
                  )}
                  <ResultRow label={`Retención ISLR (${(islrCalc.rate * 100).toFixed(0)}%)`} value={islrCalc.retencion} icon={Percent} />
                  <ResultRow label="Neto a Pagar" value={islrCalc.neto} accent bold icon={DollarSign} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ret-iva" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
                <CardHeader className="p-6 border-b border-border/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/15">
                      <Receipt className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <CardTitle className="text-xs font-semibold uppercase tracking-wide">Retención IVA</CardTitle>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Providencia SNAT/2015/0049</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Monto IVA de la Factura (Bs.)</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={retIvaMonto}
                      onChange={(e) => setRetIvaMonto(e.target.value)}
                      className="font-mono text-lg h-12 bg-white/[0.03] border-border/30 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Tipo de Agente de Retención</Label>
                    <Select value={retIvaAgente} onValueChange={setRetIvaAgente}>
                      <SelectTrigger className="h-12 bg-white/[0.03] border-border/30 rounded-xl font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="especial">Contribuyente Especial — 75%</SelectItem>
                        <SelectItem value="general">Agente General — 100%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-start gap-2 p-3 rounded-lg border border-blue-500/20 bg-blue-500/5">
                    <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-blue-300/80">
                      {retIvaAgente === "especial"
                        ? "Los Contribuyentes Especiales retienen el 75% del IVA facturado y el proveedor paga el 25% restante al fisco."
                        : "Los Agentes de Retención generales retienen el 100% del IVA facturado."}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
                <CardHeader className="p-6 border-b border-border/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/15">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <CardTitle className="text-xs font-semibold uppercase tracking-wide">Resultado Retención IVA</CardTitle>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Retención: {retIvaAgente === "especial" ? "75%" : "100%"}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-1">
                  <ResultRow label="IVA Facturado" value={retIvaCalc.montoIva} icon={FileText} />
                  <ResultRow label={`IVA Retenido (${retIvaAgente === "especial" ? "75" : "100"}%)`} value={retIvaCalc.retenido} icon={Percent} />
                  <ResultRow label="IVA por Pagar al Fisco" value={retIvaCalc.porPagar} accent bold icon={DollarSign} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resumen" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
                <CardHeader className="p-6 border-b border-border/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/15">
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <CardTitle className="text-xs font-semibold uppercase tracking-wide">Resumen Completo</CardTitle>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Desglose integral de impuestos</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Monto de la Operación (Bs.)</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={resumenMonto}
                      onChange={(e) => setResumenMonto(e.target.value)}
                      className="font-mono text-lg h-12 bg-white/[0.03] border-border/30 rounded-xl"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Impuestos Aplicables</Label>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/20 bg-white/[0.02]">
                      <div className="flex items-center gap-2">
                        <Percent className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-xs font-bold">IVA (16%)</span>
                      </div>
                      <Switch checked={resumenIva} onCheckedChange={setResumenIva} />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/20 bg-white/[0.02]">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-3.5 w-3.5 text-amber-400" />
                        <span className="text-xs font-bold">IGTF (3%)</span>
                      </div>
                      <Switch checked={resumenIgtf} onCheckedChange={setResumenIgtf} />
                    </div>

                    {resumenIgtf && (
                      <Select value={resumenMetodoPago} onValueChange={setResumenMetodoPago}>
                        <SelectTrigger className="h-10 bg-white/[0.03] border-border/30 rounded-xl font-medium text-xs ml-6">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="divisas">Divisas</SelectItem>
                          <SelectItem value="criptomonedas">Criptomonedas</SelectItem>
                          <SelectItem value="bolivares">Bolívares</SelectItem>
                        </SelectContent>
                      </Select>
                    )}

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/20 bg-white/[0.02]">
                      <div className="flex items-center gap-2">
                        <Landmark className="h-3.5 w-3.5 text-purple-400" />
                        <span className="text-xs font-bold">Retención ISLR</span>
                      </div>
                      <Switch checked={resumenIslr} onCheckedChange={setResumenIslr} />
                    </div>

                    {resumenIslr && (
                      <Select value={resumenIslrActividad} onValueChange={setResumenIslrActividad}>
                        <SelectTrigger className="h-10 bg-white/[0.03] border-border/30 rounded-xl font-medium text-xs ml-6">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ISLR_ACTIVITIES.map(a => (
                            <SelectItem key={a.value} value={a.value}>
                              {a.label} — {(a.rate * 100).toFixed(0)}%
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    <div className="flex items-center justify-between p-3 rounded-lg border border-border/20 bg-white/[0.02]">
                      <div className="flex items-center gap-2">
                        <Receipt className="h-3.5 w-3.5 text-blue-400" />
                        <span className="text-xs font-bold">Retención IVA</span>
                      </div>
                      <Switch checked={resumenRetIva} onCheckedChange={setResumenRetIva} />
                    </div>

                    {resumenRetIva && (
                      <Select value={resumenRetIvaAgente} onValueChange={setResumenRetIvaAgente}>
                        <SelectTrigger className="h-10 bg-white/[0.03] border-border/30 rounded-xl font-medium text-xs ml-6">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="especial">Contribuyente Especial — 75%</SelectItem>
                          <SelectItem value="general">Agente General — 100%</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
                <CardHeader className="p-6 border-b border-border/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/15">
                      <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <CardTitle className="text-xs font-semibold uppercase tracking-wide">Desglose Total</CardTitle>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Resultado integral de la operación</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-1">
                  <ResultRow label="Base Imponible" value={resumenCalc.base} icon={FileText} />
                  {resumenIva && (
                    <ResultRow label="IVA (16%)" value={resumenCalc.iva} icon={Percent} />
                  )}
                  {resumenIgtf && resumenMetodoPago !== "bolivares" && (
                    <ResultRow label="IGTF (3%)" value={resumenCalc.igtf} icon={DollarSign} />
                  )}

                  <div className="py-1">
                    <ResultRow label="Total Bruto" value={resumenCalc.totalBruto} bold icon={TrendingUp} />
                  </div>

                  {resumenIslr && (
                    <ResultRow label={`(-) Ret. ISLR (${((ISLR_ACTIVITIES.find(a => a.value === resumenIslrActividad)?.rate || 0) * 100).toFixed(0)}%)`} value={resumenCalc.retIslr} icon={Landmark} />
                  )}
                  {resumenRetIva && (
                    <ResultRow label={`(-) Ret. IVA (${resumenRetIvaAgente === "especial" ? "75" : "100"}%)`} value={resumenCalc.retIva} icon={Receipt} />
                  )}

                  {(resumenIslr || resumenRetIva) && (
                    <ResultRow label="Total Retenciones" value={resumenCalc.totalRetenciones} icon={AlertTriangle} />
                  )}

                  <div className="pt-2">
                    <ResultRow label="Neto a Cobrar" value={resumenCalc.netoCobrar} accent bold icon={CheckCircle} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
          <CardHeader className="p-6 border-b border-border/20">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/15">
                <Info className="h-4 w-4 text-emerald-500" />
              </div>
              <div>
                <CardTitle className="text-xs font-semibold uppercase tracking-wide">Referencia Legal</CardTitle>
                <p className="text-[10px] text-muted-foreground mt-0.5">Base normativa de los cálculos</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "IVA 16%", desc: "Ley del IVA — Gaceta Oficial N° 6.507", icon: Percent },
                { title: "IGTF 3%", desc: "Decreto N° 4.647 — Transacciones en divisas", icon: DollarSign },
                { title: "ISLR", desc: "Decreto 1.808 — Retenciones en la fuente", icon: Landmark },
                { title: "Ret. IVA", desc: "Providencia SNAT/2015/0049", icon: Receipt },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border/15 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/15 shrink-0 transition-transform group-hover:scale-110">
                    <item.icon className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{item.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}