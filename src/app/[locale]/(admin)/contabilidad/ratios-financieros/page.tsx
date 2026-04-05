"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3, TrendingUp, TrendingDown, DollarSign, PieChart, Activity,
  ArrowLeft, Shield, Zap, Target, Info, Calculator, Scale, Landmark,
  CheckCircle, AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { useToast } from "@/hooks/use-toast";

interface FinancialInputs {
  activoCorriente: string;
  pasivoCorriente: string;
  activoTotal: string;
  pasivoTotal: string;
  patrimonio: string;
  ventasNetas: string;
  costoVentas: string;
  utilidadNeta: string;
  inventario: string;
  cuentasCobrar: string;
  cuentasPagar: string;
  gastosFinancieros: string;
}

const emptyInputs: FinancialInputs = {
  activoCorriente: "",
  pasivoCorriente: "",
  activoTotal: "",
  pasivoTotal: "",
  patrimonio: "",
  ventasNetas: "",
  costoVentas: "",
  utilidadNeta: "",
  inventario: "",
  cuentasCobrar: "",
  cuentasPagar: "",
  gastosFinancieros: "",
};

const inputFields: { key: keyof FinancialInputs; label: string; placeholder: string; icon: React.ElementType }[] = [
  { key: "activoCorriente", label: "Activo Corriente", placeholder: "Ej: 500000", icon: DollarSign },
  { key: "pasivoCorriente", label: "Pasivo Corriente", placeholder: "Ej: 300000", icon: TrendingDown },
  { key: "activoTotal", label: "Activo Total", placeholder: "Ej: 1200000", icon: Landmark },
  { key: "pasivoTotal", label: "Pasivo Total", placeholder: "Ej: 600000", icon: Scale },
  { key: "patrimonio", label: "Patrimonio", placeholder: "Ej: 600000", icon: Shield },
  { key: "ventasNetas", label: "Ventas Netas", placeholder: "Ej: 800000", icon: TrendingUp },
  { key: "costoVentas", label: "Costo de Ventas", placeholder: "Ej: 500000", icon: Calculator },
  { key: "utilidadNeta", label: "Utilidad Neta", placeholder: "Ej: 120000", icon: Target },
  { key: "inventario", label: "Inventario", placeholder: "Ej: 150000", icon: BarChart3 },
  { key: "cuentasCobrar", label: "Cuentas por Cobrar", placeholder: "Ej: 200000", icon: Zap },
  { key: "cuentasPagar", label: "Cuentas por Pagar", placeholder: "Ej: 180000", icon: Activity },
  { key: "gastosFinancieros", label: "Gastos Financieros (opcional)", placeholder: "Ej: 50000", icon: PieChart },
];

type RatioStatus = "Saludable" | "Precaución" | "Crítico";

interface RatioResult {
  name: string;
  formula: string;
  value: number | null;
  displayValue: string;
  ideal: string;
  status: RatioStatus;
  progressValue: number;
  suffix?: string;
}

function getStatus(value: number | null, goodFn: (v: number) => boolean, warnFn: (v: number) => boolean): RatioStatus {
  if (value === null || isNaN(value) || !isFinite(value)) return "Crítico";
  if (goodFn(value)) return "Saludable";
  if (warnFn(value)) return "Precaución";
  return "Crítico";
}

function statusColor(s: RatioStatus) {
  if (s === "Saludable") return { badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", progress: "bg-emerald-500", text: "text-emerald-400" };
  if (s === "Precaución") return { badge: "bg-amber-500/15 text-amber-400 border-amber-500/30", progress: "bg-amber-500", text: "text-amber-400" };
  return { badge: "bg-rose-500/15 text-rose-400 border-rose-500/30", progress: "bg-rose-500", text: "text-rose-400" };
}

function statusIcon(s: RatioStatus) {
  if (s === "Saludable") return <CheckCircle className="h-3.5 w-3.5" />;
  if (s === "Precaución") return <AlertTriangle className="h-3.5 w-3.5" />;
  return <TrendingDown className="h-3.5 w-3.5" />;
}

function clampProgress(v: number | null, max: number): number {
  if (v === null || isNaN(v) || !isFinite(v)) return 0;
  return Math.min(Math.max((v / max) * 100, 0), 100);
}

function fmt(v: number | null, decimals = 2, suffix = ""): string {
  if (v === null || isNaN(v) || !isFinite(v)) return "—";
  return v.toFixed(decimals) + suffix;
}

function fmtCurrency(v: number | null): string {
  if (v === null || isNaN(v) || !isFinite(v)) return "—";
  return "Bs. " + v.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
};

export default function RatiosFinancierosPage() {
  const { toast } = useToast();
  const [inputs, setInputs] = useState<FinancialInputs>(emptyInputs);

  const n = (key: keyof FinancialInputs): number | null => {
    const v = parseFloat(inputs[key]);
    return isNaN(v) ? null : v;
  };

  const hasData = Object.entries(inputs).some(([k, v]) => k !== "gastosFinancieros" && v !== "");

  const liquidez = useMemo((): RatioResult[] => {
    const ac = n("activoCorriente"), pc = n("pasivoCorriente"), inv = n("inventario");
    const razonCorriente = ac !== null && pc !== null && pc !== 0 ? ac / pc : null;
    const pruebaAcida = ac !== null && pc !== null && inv !== null && pc !== 0 ? (ac - inv) / pc : null;
    const capitalTrabajo = ac !== null && pc !== null ? ac - pc : null;
    return [
      {
        name: "Razón Corriente",
        formula: "Activo Corriente / Pasivo Corriente",
        value: razonCorriente,
        displayValue: fmt(razonCorriente),
        ideal: "> 1.5",
        status: getStatus(razonCorriente, v => v >= 1.5, v => v >= 1.0),
        progressValue: clampProgress(razonCorriente, 3),
      },
      {
        name: "Prueba Ácida",
        formula: "(Activo Corriente - Inventario) / Pasivo Corriente",
        value: pruebaAcida,
        displayValue: fmt(pruebaAcida),
        ideal: "> 1.0",
        status: getStatus(pruebaAcida, v => v >= 1.0, v => v >= 0.7),
        progressValue: clampProgress(pruebaAcida, 2.5),
      },
      {
        name: "Capital de Trabajo",
        formula: "Activo Corriente - Pasivo Corriente",
        value: capitalTrabajo,
        displayValue: fmtCurrency(capitalTrabajo),
        ideal: "> 0",
        status: getStatus(capitalTrabajo, v => v > 0, v => v === 0),
        progressValue: capitalTrabajo !== null ? (capitalTrabajo > 0 ? 75 : capitalTrabajo === 0 ? 50 : 15) : 0,
      },
    ];
  }, [inputs]);

  const endeudamiento = useMemo((): RatioResult[] => {
    const pt = n("pasivoTotal"), at = n("activoTotal"), pat = n("patrimonio"), gf = n("gastosFinancieros"), un = n("utilidadNeta");
    const razonEnd = pt !== null && at !== null && at !== 0 ? pt / at : null;
    const apalancamiento = pt !== null && pat !== null && pat !== 0 ? pt / pat : null;
    const cobertura = gf !== null && gf !== 0 && un !== null ? (un + gf) / gf : null;
    const results: RatioResult[] = [
      {
        name: "Razón de Endeudamiento",
        formula: "Pasivo Total / Activo Total",
        value: razonEnd,
        displayValue: fmt(razonEnd),
        ideal: "< 0.6",
        status: getStatus(razonEnd, v => v < 0.6, v => v < 0.8),
        progressValue: clampProgress(razonEnd, 1.5),
      },
      {
        name: "Apalancamiento",
        formula: "Pasivo Total / Patrimonio",
        value: apalancamiento,
        displayValue: fmt(apalancamiento),
        ideal: "< 1.5",
        status: getStatus(apalancamiento, v => v < 1.5, v => v < 2.5),
        progressValue: clampProgress(apalancamiento, 4),
      },
    ];
    if (n("gastosFinancieros") !== null) {
      results.push({
        name: "Cobertura de Intereses",
        formula: "(Utilidad Neta + Gastos Financieros) / Gastos Financieros",
        value: cobertura,
        displayValue: fmt(cobertura) + "x",
        ideal: "> 3.0x",
        status: getStatus(cobertura, v => v >= 3, v => v >= 1.5),
        progressValue: clampProgress(cobertura, 8),
      });
    }
    return results;
  }, [inputs]);

  const rentabilidad = useMemo((): RatioResult[] => {
    const vn = n("ventasNetas"), cv = n("costoVentas"), un = n("utilidadNeta"), at = n("activoTotal"), pat = n("patrimonio");
    const margenBruto = vn !== null && cv !== null && vn !== 0 ? ((vn - cv) / vn) * 100 : null;
    const margenNeto = un !== null && vn !== null && vn !== 0 ? (un / vn) * 100 : null;
    const roa = un !== null && at !== null && at !== 0 ? (un / at) * 100 : null;
    const roe = un !== null && pat !== null && pat !== 0 ? (un / pat) * 100 : null;
    return [
      {
        name: "Margen Bruto",
        formula: "(Ventas - COGS) / Ventas × 100",
        value: margenBruto,
        displayValue: fmt(margenBruto, 1, "%"),
        ideal: "> 30%",
        status: getStatus(margenBruto, v => v >= 30, v => v >= 15),
        progressValue: clampProgress(margenBruto, 100),
      },
      {
        name: "Margen Neto",
        formula: "Utilidad Neta / Ventas × 100",
        value: margenNeto,
        displayValue: fmt(margenNeto, 1, "%"),
        ideal: "> 10%",
        status: getStatus(margenNeto, v => v >= 10, v => v >= 5),
        progressValue: clampProgress(margenNeto, 50),
      },
      {
        name: "ROA",
        formula: "Utilidad Neta / Activo Total × 100",
        value: roa,
        displayValue: fmt(roa, 1, "%"),
        ideal: "> 5%",
        status: getStatus(roa, v => v >= 5, v => v >= 2),
        progressValue: clampProgress(roa, 30),
      },
      {
        name: "ROE",
        formula: "Utilidad Neta / Patrimonio × 100",
        value: roe,
        displayValue: fmt(roe, 1, "%"),
        ideal: "> 15%",
        status: getStatus(roe, v => v >= 15, v => v >= 8),
        progressValue: clampProgress(roe, 50),
      },
    ];
  }, [inputs]);

  const eficiencia = useMemo((): RatioResult[] => {
    const cv = n("costoVentas"), inv = n("inventario"), vn = n("ventasNetas"), cxc = n("cuentasCobrar"), cxp = n("cuentasPagar");
    const rotInv = cv !== null && inv !== null && inv !== 0 ? cv / inv : null;
    const diasInv = rotInv !== null && rotInv !== 0 ? 365 / rotInv : null;
    const rotCxC = vn !== null && cxc !== null && cxc !== 0 ? vn / cxc : null;
    const diasCxC = rotCxC !== null && rotCxC !== 0 ? 365 / rotCxC : null;
    const rotCxP = cv !== null && cxp !== null && cxp !== 0 ? cv / cxp : null;
    const diasCxP = rotCxP !== null && rotCxP !== 0 ? 365 / rotCxP : null;
    const ciclo = diasInv !== null && diasCxC !== null && diasCxP !== null ? diasInv + diasCxC - diasCxP : null;
    return [
      {
        name: "Rotación de Inventario",
        formula: "Costo Ventas / Inventario",
        value: rotInv,
        displayValue: fmt(rotInv, 1) + " veces" + (diasInv !== null ? ` (${fmt(diasInv, 0)} días)` : ""),
        ideal: "> 6 veces",
        status: getStatus(rotInv, v => v >= 6, v => v >= 3),
        progressValue: clampProgress(rotInv, 15),
      },
      {
        name: "Rotación de CxC",
        formula: "Ventas / Cuentas por Cobrar",
        value: rotCxC,
        displayValue: fmt(rotCxC, 1) + " veces" + (diasCxC !== null ? ` (${fmt(diasCxC, 0)} días)` : ""),
        ideal: "> 8 veces",
        status: getStatus(rotCxC, v => v >= 8, v => v >= 4),
        progressValue: clampProgress(rotCxC, 20),
      },
      {
        name: "Rotación de CxP",
        formula: "Costo Ventas / Cuentas por Pagar",
        value: rotCxP,
        displayValue: fmt(rotCxP, 1) + " veces" + (diasCxP !== null ? ` (${fmt(diasCxP, 0)} días)` : ""),
        ideal: "4-8 veces",
        status: getStatus(rotCxP, v => v >= 4 && v <= 8, v => v >= 2),
        progressValue: clampProgress(rotCxP, 15),
      },
      {
        name: "Ciclo de Conversión de Efectivo",
        formula: "Días Inv + Días CxC - Días CxP",
        value: ciclo,
        displayValue: fmt(ciclo, 0) + " días",
        ideal: "< 60 días",
        status: getStatus(ciclo, v => v < 60, v => v < 120),
        progressValue: ciclo !== null ? clampProgress(Math.max(0, 180 - ciclo), 180) : 0,
      },
    ];
  }, [inputs]);

  const healthScore = useMemo(() => {
    if (!hasData) return null;
    const scores: number[] = [];
    const rc = liquidez[0]?.value;
    if (rc !== null && rc !== undefined) scores.push(Math.min(rc / 1.5, 1) * 100);
    const pa = liquidez[1]?.value;
    if (pa !== null && pa !== undefined) scores.push(Math.min(pa / 1.0, 1) * 100);
    const re = endeudamiento[0]?.value;
    if (re !== null && re !== undefined) scores.push(Math.min((1 - re) / 0.4, 1) * 100);
    const mb = rentabilidad[0]?.value;
    if (mb !== null && mb !== undefined) scores.push(Math.min(mb / 30, 1) * 100);
    const mn = rentabilidad[1]?.value;
    if (mn !== null && mn !== undefined) scores.push(Math.min(mn / 10, 1) * 100);
    const roe = rentabilidad[3]?.value;
    if (roe !== null && roe !== undefined) scores.push(Math.min(roe / 15, 1) * 100);
    if (scores.length === 0) return null;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, [liquidez, endeudamiento, rentabilidad, hasData]);

  const recommendations = useMemo(() => {
    const recs: { text: string; type: RatioStatus }[] = [];
    if (!hasData) return recs;
    const rc = liquidez[0]?.value;
    if (rc !== null && rc !== undefined && rc < 1.0) recs.push({ text: "La razón corriente está por debajo de 1.0. Considere aumentar activos corrientes o reducir pasivos a corto plazo.", type: "Crítico" });
    else if (rc !== null && rc !== undefined && rc < 1.5) recs.push({ text: "La razón corriente es aceptable pero podría mejorarse. Evalúe la gestión de capital de trabajo.", type: "Precaución" });
    const re = endeudamiento[0]?.value;
    if (re !== null && re !== undefined && re > 0.8) recs.push({ text: "El nivel de endeudamiento es alto. Considere reestructurar deuda o aumentar patrimonio.", type: "Crítico" });
    else if (re !== null && re !== undefined && re > 0.6) recs.push({ text: "El endeudamiento está en zona de precaución. Monitoree la capacidad de pago.", type: "Precaución" });
    const mn = rentabilidad[1]?.value;
    if (mn !== null && mn !== undefined && mn < 5) recs.push({ text: "El margen neto es bajo. Revise la estructura de costos y gastos operativos.", type: "Crítico" });
    else if (mn !== null && mn !== undefined && mn < 10) recs.push({ text: "El margen neto puede mejorarse. Analice oportunidades de eficiencia operativa.", type: "Precaución" });
    const ciclo = eficiencia[3]?.value;
    if (ciclo !== null && ciclo !== undefined && ciclo > 120) recs.push({ text: "El ciclo de conversión de efectivo es muy largo. Acelere cobros y optimice inventarios.", type: "Crítico" });
    else if (ciclo !== null && ciclo !== undefined && ciclo > 60) recs.push({ text: "El ciclo de conversión puede optimizarse. Negocie mejores plazos con proveedores.", type: "Precaución" });
    if (recs.length === 0 && hasData) recs.push({ text: "Los indicadores financieros están en niveles saludables. Mantenga la gestión actual.", type: "Saludable" });
    return recs;
  }, [liquidez, endeudamiento, rentabilidad, eficiencia, hasData]);

  const handleChange = (key: keyof FinancialInputs, value: string) => {
    const cleaned = value.replace(/[^0-9.-]/g, "");
    setInputs(prev => ({ ...prev, [key]: cleaned }));
  };

  const handleReset = () => {
    setInputs(emptyInputs);
    toast({ title: "Datos limpiados", description: "Todos los campos han sido reiniciados." });
  };

  function RatioCard({ ratio, index }: { ratio: RatioResult; index: number }) {
    const colors = statusColor(ratio.status);
    return (
      <motion.div custom={index} initial="hidden" animate="visible" variants={fadeIn}>
        <Card className="border border-border/50 rounded-2xl bg-card/50 backdrop-blur-sm hover:border-cyan-500/30 transition-all">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1 flex-1">
                <p className="text-sm font-bold text-foreground">{ratio.name}</p>
                <p className="text-[10px] text-muted-foreground font-mono">{ratio.formula}</p>
              </div>
              <Badge className={cn("text-[11px] font-bold border", colors.badge)}>
                {statusIcon(ratio.status)}
                <span className="ml-1">{ratio.status}</span>
              </Badge>
            </div>
            <div className="flex items-end justify-between">
              <p className={cn("text-2xl font-bold tracking-tight", ratio.value !== null ? colors.text : "text-muted-foreground")}>
                {ratio.displayValue}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <Info className="h-3 w-3" />
                <span>Ideal: {ratio.ideal}</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="h-2 w-full rounded-full bg-muted/50 overflow-hidden">
                <motion.div
                  className={cn("h-full rounded-full", colors.progress)}
                  initial={{ width: 0 }}
                  animate={{ width: `${ratio.progressValue}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const healthColor = healthScore !== null
    ? healthScore >= 70 ? "text-emerald-400" : healthScore >= 40 ? "text-amber-400" : "text-rose-400"
    : "text-muted-foreground";

  const healthBg = healthScore !== null
    ? healthScore >= 70 ? "bg-emerald-500" : healthScore >= 40 ? "bg-amber-500" : "bg-rose-500"
    : "bg-muted";

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-background">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Link href={"/contabilidad" as any} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan-400 transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Volver al Centro Contable
        </Link>
      </motion.div>

      <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-semibold uppercase tracking-widest text-cyan-400">
          <BarChart3 className="h-3 w-3" />
          RATIOS FINANCIEROS
        </div>
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight uppercase bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Ratios Financieros
        </h1>
        <p className="text-muted-foreground text-sm font-medium">
          Análisis de Liquidez, Solvencia, Rentabilidad y Eficiencia
        </p>
      </motion.header>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <Card className="border border-border/50 rounded-2xl bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold uppercase tracking-widest flex items-center gap-2">
                <Calculator className="h-4 w-4 text-cyan-400" />
                Datos Financieros (Bs.)
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs text-muted-foreground hover:text-rose-400">
                Limpiar todo
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {inputFields.map((field) => (
                <div key={field.key} className="space-y-1.5">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                    <field.icon className="h-3 w-3 text-cyan-400/60" />
                    {field.label}
                  </Label>
                  <Input
                    type="text"
                    inputMode="decimal"
                    placeholder={field.placeholder}
                    value={inputs[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="rounded-xl bg-muted/30 border-border/50 focus:border-cyan-500/50 text-sm font-mono"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {hasData && (
        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.2 }}>
            <Card className="border border-border/50 rounded-2xl bg-card/50 backdrop-blur-sm h-full">
              <CardContent className="p-6 space-y-4 flex flex-col items-center justify-center text-center">
                <div className="space-y-1">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Salud Financiera General</p>
                </div>
                <div className="relative">
                  <div className="w-28 h-28 rounded-full border-4 border-muted/30 flex items-center justify-center">
                    <p className={cn("text-3xl font-bold", healthColor)}>
                      {healthScore !== null ? `${healthScore}%` : "—"}
                    </p>
                  </div>
                </div>
                <div className="w-full">
                  <div className="h-2.5 w-full rounded-full bg-muted/50 overflow-hidden">
                    <motion.div
                      className={cn("h-full rounded-full", healthBg)}
                      initial={{ width: 0 }}
                      animate={{ width: `${healthScore ?? 0}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {healthScore !== null
                    ? healthScore >= 70 ? "La empresa muestra indicadores financieros sólidos"
                    : healthScore >= 40 ? "Algunos indicadores requieren atención"
                    : "Se detectan áreas críticas que requieren acción inmediata"
                    : "Ingrese datos para ver el diagnóstico"}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div className="lg:col-span-2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.3 }}>
            <Card className="border border-border/50 rounded-2xl bg-card/50 backdrop-blur-sm h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold uppercase tracking-widest flex items-center gap-2">
                  <Target className="h-4 w-4 text-cyan-400" />
                  Recomendaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recommendations.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-6">Ingrese datos financieros para recibir recomendaciones</p>
                ) : (
                  recommendations.map((rec, i) => {
                    const c = statusColor(rec.type);
                    return (
                      <motion.div key={i} custom={i} initial="hidden" animate="visible" variants={fadeIn}
                        className={cn("flex items-start gap-3 p-3 rounded-xl border", c.badge)}
                      >
                        <div className="mt-0.5">{statusIcon(rec.type)}</div>
                        <p className="text-xs leading-relaxed">{rec.text}</p>
                      </motion.div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <Tabs defaultValue="liquidez" className="space-y-6">
          <TabsList className="bg-muted/30 rounded-xl p-1 flex-wrap h-auto gap-1">
            <TabsTrigger value="liquidez" className="rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              <Shield className="h-3.5 w-3.5 mr-1.5" /> Liquidez
            </TabsTrigger>
            <TabsTrigger value="endeudamiento" className="rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              <Scale className="h-3.5 w-3.5 mr-1.5" /> Endeudamiento
            </TabsTrigger>
            <TabsTrigger value="rentabilidad" className="rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              <TrendingUp className="h-3.5 w-3.5 mr-1.5" /> Rentabilidad
            </TabsTrigger>
            <TabsTrigger value="eficiencia" className="rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              <Zap className="h-3.5 w-3.5 mr-1.5" /> Eficiencia
            </TabsTrigger>
          </TabsList>

          <TabsContent value="liquidez" className="space-y-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {liquidez.map((r, i) => <RatioCard key={r.name} ratio={r} index={i} />)}
            </div>
          </TabsContent>

          <TabsContent value="endeudamiento" className="space-y-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {endeudamiento.map((r, i) => <RatioCard key={r.name} ratio={r} index={i} />)}
            </div>
          </TabsContent>

          <TabsContent value="rentabilidad" className="space-y-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rentabilidad.map((r, i) => <RatioCard key={r.name} ratio={r} index={i} />)}
            </div>
          </TabsContent>

          <TabsContent value="eficiencia" className="space-y-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eficiencia.map((r, i) => <RatioCard key={r.name} ratio={r} index={i} />)}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {!hasData && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center py-12 space-y-3"
        >
          <PieChart className="h-12 w-12 text-muted-foreground/30 mx-auto" />
          <p className="text-sm text-muted-foreground font-medium">Ingrese los datos financieros de su empresa para calcular los ratios automáticamente</p>
          <p className="text-xs text-muted-foreground/60">Todos los cálculos se realizan en tiempo real sin necesidad de enviar datos</p>
        </motion.div>
      )}
    </div>
  );
}
