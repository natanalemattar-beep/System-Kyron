"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Calculator, DollarSign, FileText, Gavel, ArrowLeft, TrendingUp, Receipt, Percent, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";

const CASE_TYPES = [
  { value: "civil", label: "Civil", minPct: 10, maxPct: 15, icon: Scale },
  { value: "penal", label: "Penal", minPct: 10, maxPct: 15, icon: Gavel },
  { value: "laboral", label: "Laboral", minPct: 10, maxPct: 20, icon: FileText },
  { value: "mercantil", label: "Mercantil", minPct: 12, maxPct: 18, icon: TrendingUp },
  { value: "tributario", label: "Tributario", minPct: 15, maxPct: 25, icon: Receipt },
  { value: "administrativo", label: "Administrativo", minPct: 10, maxPct: 15, icon: FileText },
  { value: "familia", label: "Familia", minPct: 10, maxPct: 15, icon: Scale },
] as const;

const COMPLEXITY_LEVELS = [
  { value: "baja", label: "Baja", multiplier: 0.8, color: "text-emerald-400" },
  { value: "media", label: "Media", multiplier: 1.0, color: "text-amber-400" },
  { value: "alta", label: "Alta", multiplier: 1.3, color: "text-orange-400" },
  { value: "muy_alta", label: "Muy Alta", multiplier: 1.6, color: "text-rose-400" },
] as const;

const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD ($)", symbol: "$" },
  { value: "BS", label: "Bs. (Bolívares)", symbol: "Bs." },
] as const;

function formatCurrency(amount: number, currency: string): string {
  if (currency === "USD") {
    return `$ ${amount.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `Bs. ${amount.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function CalculadoraHonorariosPage() {
  const { toast } = useToast();
  const [caseType, setCaseType] = useState("");
  const [amount, setAmount] = useState("");
  const [complexity, setComplexity] = useState("");
  const [currency, setCurrency] = useState("USD");

  const calculation = useMemo(() => {
    const parsedAmount = parseFloat(amount.replace(/,/g, ""));
    if (!caseType || !complexity || !parsedAmount || parsedAmount <= 0) return null;

    const caseConfig = CASE_TYPES.find(c => c.value === caseType);
    const complexityConfig = COMPLEXITY_LEVELS.find(c => c.value === complexity);
    if (!caseConfig || !complexityConfig) return null;

    const avgPct = (caseConfig.minPct + caseConfig.maxPct) / 2;
    const baseFee = (parsedAmount * avgPct) / 100;
    const adjustedFee = baseFee * complexityConfig.multiplier;
    const expenses = adjustedFee * 0.15;
    const subtotal = adjustedFee + expenses;
    const iva = subtotal * 0.16;
    const igtf = currency === "USD" ? subtotal * 0.03 : 0;
    const total = subtotal + iva + igtf;

    return {
      parsedAmount,
      avgPct,
      baseFee: adjustedFee,
      expenses,
      subtotal,
      iva,
      igtf,
      total,
      caseLabel: caseConfig.label,
      complexityLabel: complexityConfig.label,
      complexityMultiplier: complexityConfig.multiplier,
      minPct: caseConfig.minPct,
      maxPct: caseConfig.maxPct,
    };
  }, [caseType, amount, complexity, currency]);

  const handleGenerate = () => {
    if (!calculation) {
      toast({ variant: "destructive", title: "Datos incompletos", description: "Complete todos los campos para generar el presupuesto." });
      return;
    }
    toast({
      title: "PRESUPUESTO GENERADO",
      description: `Honorarios ${calculation.caseLabel}: ${formatCurrency(calculation.total, currency)} — Documento listo para descarga.`,
    });
  };

  const handleReset = () => {
    setCaseType("");
    setAmount("");
    setComplexity("");
    setCurrency("USD");
  };

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-l-4 border-amber-500 pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-[11px] font-semibold uppercase tracking-wider text-amber-400 mb-3">
            <Scale className="h-3 w-3" /> HONORARIOS PROFESIONALES
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase leading-none">
            Calculadora de{" "}
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent italic">
              Honorarios
            </span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-40 mt-2 italic">
            Calculadora basada en el Baremo del Colegio de Abogados de Venezuela
          </p>
        </div>
        <Button asChild variant="outline" className="h-12 px-6 rounded-xl font-bold text-[11px] uppercase tracking-widest border-amber-500/20 text-amber-400 hover:bg-amber-500/10">
          <Link href="/escritorio-juridico"><ArrowLeft className="mr-2 h-4 w-4" /> ESCRITORIO JURÍDICO</Link>
        </Button>
      </motion.header>

      <Tabs defaultValue="calculadora" className="w-full">
        <TabsList className="bg-card/50 border border-border/40 rounded-xl p-1 h-auto">
          <TabsTrigger value="calculadora" className="rounded-lg text-[11px] font-semibold uppercase tracking-widest data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400 px-6 py-3">
            <Calculator className="mr-2 h-3.5 w-3.5" /> Calculadora
          </TabsTrigger>
          <TabsTrigger value="baremo" className="rounded-lg text-[11px] font-semibold uppercase tracking-widest data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400 px-6 py-3">
            <FileText className="mr-2 h-3.5 w-3.5" /> Tabla de Baremo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculadora" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3 space-y-6"
            >
              <Card className="glass-card border-none bg-card/40 rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-semibold uppercase tracking-widest text-foreground/80 flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-amber-400" />
                    Datos del Caso
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-[11px] font-semibold uppercase tracking-widest opacity-60">Tipo de Caso *</Label>
                    <Select value={caseType} onValueChange={setCaseType}>
                      <SelectTrigger className="h-12 rounded-xl bg-muted/30 border-border">
                        <SelectValue placeholder="Seleccione el tipo de caso" />
                      </SelectTrigger>
                      <SelectContent>
                        {CASE_TYPES.map(ct => (
                          <SelectItem key={ct.value} value={ct.value}>
                            <span className="flex items-center gap-2">
                              <ct.icon className="h-3.5 w-3.5 text-amber-400" />
                              {ct.label} ({ct.minPct}% - {ct.maxPct}%)
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[11px] font-semibold uppercase tracking-widest opacity-60">Monto en Litigio *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-400/60" />
                        <Input
                          type="text"
                          inputMode="decimal"
                          placeholder="0.00"
                          value={amount}
                          onChange={e => {
                            const val = e.target.value.replace(/[^0-9.,]/g, "");
                            setAmount(val);
                          }}
                          className="pl-10 h-12 rounded-xl bg-muted/30 border-border text-lg font-bold"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[11px] font-semibold uppercase tracking-widest opacity-60">Moneda *</Label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger className="h-12 rounded-xl bg-muted/30 border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CURRENCY_OPTIONS.map(c => (
                            <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[11px] font-semibold uppercase tracking-widest opacity-60">Complejidad del Caso *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {COMPLEXITY_LEVELS.map(cl => (
                        <button
                          key={cl.value}
                          onClick={() => setComplexity(cl.value)}
                          className={cn(
                            "p-4 rounded-xl border-2 transition-all text-center",
                            complexity === cl.value
                              ? "border-amber-500 bg-amber-500/10"
                              : "border-border/40 bg-muted/20 hover:border-border"
                          )}
                        >
                          <p className={cn("text-lg font-bold", complexity === cl.value ? "text-amber-400" : "text-foreground/60")}>
                            {cl.multiplier}x
                          </p>
                          <p className={cn("text-[11px] font-semibold uppercase tracking-widest mt-1", complexity === cl.value ? cl.color : "text-muted-foreground/50")}>
                            {cl.label}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={handleGenerate}
                      disabled={!calculation}
                      className="flex-1 h-12 rounded-xl font-bold text-[11px] uppercase tracking-widest bg-amber-500 hover:bg-amber-600 text-black"
                    >
                      <FileText className="mr-2 h-4 w-4" /> Generar Presupuesto
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="h-12 px-6 rounded-xl font-bold text-[11px] uppercase tracking-widest border-border/40"
                    >
                      Limpiar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="glass-card border-none bg-card/40 rounded-2xl sticky top-6">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-semibold uppercase tracking-widest text-foreground/80 flex items-center gap-2">
                    <Receipt className="h-4 w-4 text-amber-400" />
                    Desglose de Honorarios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimatePresence mode="wait">
                    {calculation ? (
                      <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px] font-semibold uppercase tracking-widest">
                            {calculation.caseLabel}
                          </Badge>
                          <Badge className="bg-muted/30 text-muted-foreground border-border/40 text-[10px] font-semibold uppercase tracking-widest">
                            {calculation.complexityLabel} ({calculation.complexityMultiplier}x)
                          </Badge>
                        </div>

                        <div className="space-y-3">
                          <ResultRow
                            label="Monto en Litigio"
                            value={formatCurrency(calculation.parsedAmount, currency)}
                            sublabel={`Base: ${calculation.minPct}%-${calculation.maxPct}% (promedio ${calculation.avgPct}%)`}
                          />
                          <div className="border-t border-border/20 my-2" />
                          <ResultRow
                            label="Honorarios Base"
                            value={formatCurrency(calculation.baseFee, currency)}
                            sublabel={`${calculation.avgPct}% × ${calculation.complexityMultiplier}x`}
                            highlight
                          />
                          <ResultRow
                            label="Gastos Estimados (15%)"
                            value={formatCurrency(calculation.expenses, currency)}
                          />
                          <ResultRow
                            label="IVA (16%)"
                            value={formatCurrency(calculation.iva, currency)}
                          />
                          {calculation.igtf > 0 && (
                            <ResultRow
                              label="IGTF (3% USD)"
                              value={formatCurrency(calculation.igtf, currency)}
                              sublabel="Impuesto a Grandes Transacciones Financieras"
                            />
                          )}
                          <div className="border-t-2 border-amber-500/30 my-3" />
                          <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center"
                          >
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-400/60 mb-1">Total Estimado</p>
                            <motion.p
                              key={calculation.total}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-3xl font-bold text-amber-400"
                            >
                              {formatCurrency(calculation.total, currency)}
                            </motion.p>
                          </motion.div>
                        </div>

                        <div className="flex items-start gap-2 mt-4 p-3 rounded-xl bg-muted/20 border border-border/20">
                          <Info className="h-3.5 w-3.5 text-muted-foreground/50 mt-0.5 shrink-0" />
                          <p className="text-[11px] text-muted-foreground/50 leading-relaxed">
                            Cálculo referencial basado en el Baremo del Colegio de Abogados de Venezuela. Los montos finales pueden variar según acuerdo entre las partes.
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-12"
                      >
                        <Calculator className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40">
                          Complete los datos del caso para ver el desglose
                        </p>
                        <p className="text-[11px] text-muted-foreground/30 mt-2">
                          Tipo de caso • Monto • Complejidad
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="baremo" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-card border-none bg-card/40 rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-semibold uppercase tracking-widest text-foreground/80 flex items-center gap-2">
                  <Percent className="h-4 w-4 text-amber-400" />
                  Baremo de Honorarios — Colegio de Abogados de Venezuela
                </CardTitle>
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/40 mt-1">
                  Porcentajes aplicables según tipo de procedimiento y complejidad
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-border/30">
                        <th className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 py-3 px-4">Tipo de Caso</th>
                        <th className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 py-3 px-4 text-center">% Mínimo</th>
                        <th className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 py-3 px-4 text-center">% Máximo</th>
                        <th className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60 py-3 px-4 text-center">% Promedio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CASE_TYPES.map((ct, i) => (
                        <motion.tr
                          key={ct.value}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="border-b border-border/10 hover:bg-muted/10 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <span className="flex items-center gap-2">
                              <ct.icon className="h-3.5 w-3.5 text-amber-400" />
                              <span className="text-sm font-bold text-foreground/80">{ct.label}</span>
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-sm font-bold text-emerald-400">{ct.minPct}%</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-sm font-bold text-rose-400">{ct.maxPct}%</span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-sm font-bold text-amber-400">{(ct.minPct + ct.maxPct) / 2}%</span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 space-y-4">
                  <h3 className="text-[10px] font-semibold uppercase tracking-widest text-foreground/60">Multiplicadores por Complejidad</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {COMPLEXITY_LEVELS.map((cl, i) => (
                      <motion.div
                        key={cl.value}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className="p-4 rounded-xl bg-muted/20 border border-border/20 text-center"
                      >
                        <p className={cn("text-2xl font-bold", cl.color)}>{cl.multiplier}x</p>
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50 mt-1">{cl.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <h3 className="text-[10px] font-semibold uppercase tracking-widest text-foreground/60">Cargos Adicionales</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: "Gastos Estimados", pct: "15%", desc: "Gastos de gestión, notaría, traslados" },
                      { label: "IVA", pct: "16%", desc: "Impuesto al Valor Agregado" },
                      { label: "IGTF", pct: "3%", desc: "Solo aplica para pagos en divisas (USD)" },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.05 }}
                        className="p-4 rounded-xl bg-muted/20 border border-border/20"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground/60">{item.label}</p>
                          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[11px] font-bold">{item.pct}</Badge>
                        </div>
                        <p className="text-[11px] text-muted-foreground/50">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ResultRow({ label, value, sublabel, highlight }: { label: string; value: string; sublabel?: string; highlight?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className={cn("text-[10px] font-semibold uppercase tracking-widest", highlight ? "text-amber-400" : "text-muted-foreground/60")}>
          {label}
        </p>
        {sublabel && (
          <p className="text-[10px] text-muted-foreground/40 mt-0.5">{sublabel}</p>
        )}
      </div>
      <p className={cn("text-sm font-bold tabular-nums", highlight ? "text-amber-400" : "text-foreground/80")}>
        {value}
      </p>
    </div>
  );
}
