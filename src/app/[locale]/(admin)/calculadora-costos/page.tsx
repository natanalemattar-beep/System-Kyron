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
  Calculator,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  PieChart,
  ArrowLeft,
  Activity,
  Building,
  Users,
  Zap,
  Truck,
  Plus,
  Trash2,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { useToast } from "@/hooks/use-toast";
import { BackButton } from "@/components/back-button";

interface CostRow {
  id: string;
  label: string;
  amount: number;
}

const defaultFixedCosts: CostRow[] = [
  { id: "f1", label: "Alquiler", amount: 0 },
  { id: "f2", label: "Nómina", amount: 0 },
  { id: "f3", label: "Servicios (agua/luz/internet)", amount: 0 },
  { id: "f4", label: "Seguros", amount: 0 },
  { id: "f5", label: "Software/Licencias", amount: 0 },
  { id: "f6", label: "Otros", amount: 0 },
];

const defaultVariableCosts: CostRow[] = [
  { id: "v1", label: "Materia Prima", amount: 0 },
  { id: "v2", label: "Comisiones", amount: 0 },
  { id: "v3", label: "Transporte", amount: 0 },
  { id: "v4", label: "Empaque", amount: 0 },
  { id: "v5", label: "Impuestos variables", amount: 0 },
  { id: "v6", label: "Otros", amount: 0 },
];

let idCounter = 100;

export default function CalculadoraCostosPage() {
  const { toast } = useToast();
  const [fixedCosts, setFixedCosts] = useState<CostRow[]>(defaultFixedCosts);
  const [variableCosts, setVariableCosts] = useState<CostRow[]>(defaultVariableCosts);
  const [revenue, setRevenue] = useState(0);
  const [avgPrice, setAvgPrice] = useState(0);
  const [unitsSold, setUnitsSold] = useState(0);

  const totalFixed = useMemo(() => fixedCosts.reduce((s, r) => s + r.amount, 0), [fixedCosts]);
  const totalVariable = useMemo(() => variableCosts.reduce((s, r) => s + r.amount, 0), [variableCosts]);
  const totalCost = totalFixed + totalVariable;
  const margin = revenue > 0 ? ((revenue - totalCost) / revenue) * 100 : 0;
  const variableUnitCost = unitsSold > 0 ? totalVariable / unitsSold : 0;
  const breakEvenUnits = avgPrice - variableUnitCost > 0 ? Math.ceil(totalFixed / (avgPrice - variableUnitCost)) : 0;
  const costRevenueRatio = revenue > 0 ? Math.min((totalCost / revenue) * 100, 100) : 0;
  const fixedRatio = totalCost > 0 ? (totalFixed / totalCost) * 100 : 0;

  const updateFixed = (id: string, field: "label" | "amount", value: string | number) => {
    setFixedCosts((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: field === "amount" ? Number(value) || 0 : value } : r))
    );
  };

  const updateVariable = (id: string, field: "label" | "amount", value: string | number) => {
    setVariableCosts((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: field === "amount" ? Number(value) || 0 : value } : r))
    );
  };

  const addFixed = () => {
    idCounter++;
    setFixedCosts((prev) => [...prev, { id: `f${idCounter}`, label: "", amount: 0 }]);
  };

  const addVariable = () => {
    idCounter++;
    setVariableCosts((prev) => [...prev, { id: `v${idCounter}`, label: "", amount: 0 }]);
  };

  const removeFixed = (id: string) => {
    if (fixedCosts.length <= 1) return;
    setFixedCosts((prev) => prev.filter((r) => r.id !== id));
  };

  const removeVariable = (id: string) => {
    if (variableCosts.length <= 1) return;
    setVariableCosts((prev) => prev.filter((r) => r.id !== id));
  };

  const allCosts = [
    ...fixedCosts.filter((r) => r.amount > 0).map((r) => ({ ...r, type: "fijo" })),
    ...variableCosts.filter((r) => r.amount > 0).map((r) => ({ ...r, type: "variable" })),
  ];

  const formatBs = (v: number) => `Bs ${v.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="space-y-8 pb-20 relative">
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-amber-500/[0.03] blur-[150px]" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full bg-amber-500/[0.02] blur-[120px]" />
      </div>

      <div>
        <BackButton href="/dashboard-empresa" label="Dashboard" />
        <motion.header
          className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-semibold uppercase tracking-wide text-amber-500 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Activity className="h-3 w-3 animate-pulse" /> COSTOS OPERATIVOS
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase leading-[1.05]">
              Calculadora de{" "}
              <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 bg-clip-text text-transparent italic">
                Costos
              </span>
            </h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-40 mt-2">
              Análisis de Punto de Equilibrio y Márgenes de Ganancia
            </p>
          </div>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Badge variant="outline" className="rounded-full border-amber-500/20 text-amber-500 text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5">
              <Calculator className="h-3 w-3 mr-1.5" /> Tiempo Real
            </Badge>
          </motion.div>
        </motion.header>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        {[
          { label: "Costos Fijos", value: totalFixed, icon: Building, color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/15" },
          { label: "Costos Variables", value: totalVariable, icon: Truck, color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/15" },
          { label: "Costo Total", value: totalCost, icon: BarChart3, color: "text-rose-500", bg: "bg-rose-500/10 border-rose-500/15" },
          {
            label: "Margen de Ganancia",
            value: margin,
            isPercent: true,
            icon: margin >= 0 ? TrendingUp : TrendingDown,
            color: margin >= 0 ? "text-emerald-500" : "text-rose-500",
            bg: margin >= 0 ? "bg-emerald-500/10 border-emerald-500/15" : "bg-rose-500/10 border-rose-500/15",
          },
          { label: "Punto de Equilibrio", value: breakEvenUnits, isUnits: true, icon: Target, color: "text-violet-500", bg: "bg-violet-500/10 border-violet-500/15" },
        ].map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i + 0.2, duration: 0.4 }}
            className={i >= 3 ? "col-span-1" : ""}
          >
            <Card className="glass-card border-none bg-card/50 p-5 rounded-2xl group hover:scale-[1.02] transition-all duration-300 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br from-transparent to-current opacity-[0.03] group-hover:opacity-[0.06] transition-opacity" />
              <div className="flex justify-between items-start mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50">{kpi.label}</p>
                <div className={cn("p-2 rounded-xl border transition-all duration-300 group-hover:scale-110", kpi.bg)}>
                  <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                </div>
              </div>
              <p className={cn("text-2xl lg:text-3xl font-bold tracking-tight", kpi.color)}>
                {kpi.isPercent
                  ? `${margin.toFixed(1)}%`
                  : kpi.isUnits
                  ? `${breakEvenUnits.toLocaleString("es-VE")} uds`
                  : formatBs(kpi.value)}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {revenue > 0 && totalCost > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card border-none bg-card/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/50">Costos vs Ingresos</p>
              <p className="text-[10px] font-bold text-muted-foreground">{costRevenueRatio.toFixed(1)}% utilizado</p>
            </div>
            <Progress value={costRevenueRatio} className="h-3 rounded-full" />
            <div className="flex justify-between mt-2">
              <span className="text-[11px] text-muted-foreground">Costos: {formatBs(totalCost)}</span>
              <span className="text-[11px] text-muted-foreground">Ingresos: {formatBs(revenue)}</span>
            </div>
          </Card>
        </motion.div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
            <CardHeader className="p-6 border-b border-border/30">
              <CardTitle className="text-xs font-semibold uppercase tracking-wide text-foreground flex items-center gap-2">
                <PieChart className="h-3.5 w-3.5 text-amber-500" />
                Estructura de Costos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="fijos" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 rounded-xl bg-muted/30">
                  <TabsTrigger value="fijos" className="rounded-lg text-[10px] font-semibold uppercase tracking-wider data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-500">
                    <Building className="h-3.5 w-3.5 mr-1.5" /> Costos Fijos
                  </TabsTrigger>
                  <TabsTrigger value="variables" className="rounded-lg text-[10px] font-semibold uppercase tracking-wider data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-500">
                    <Truck className="h-3.5 w-3.5 mr-1.5" /> Costos Variables
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="fijos" className="space-y-3">
                  {fixedCosts.map((row) => (
                    <div key={row.id} className="flex items-center gap-3 group/row">
                      <div className="flex-1">
                        <Input
                          value={row.label}
                          onChange={(e) => updateFixed(row.id, "label", e.target.value)}
                          placeholder="Concepto"
                          className="h-10 rounded-xl bg-muted/20 border-border/30 text-xs font-medium focus:border-blue-500/40"
                        />
                      </div>
                      <div className="w-40">
                        <div className="relative">
                          <Input
                            type="number"
                            value={row.amount || ""}
                            onChange={(e) => updateFixed(row.id, "amount", e.target.value)}
                            placeholder="0.00"
                            className="h-10 rounded-xl bg-muted/20 border-border/30 text-xs font-bold pr-16 text-right focus:border-blue-500/40"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-muted-foreground/40">Bs/mes</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFixed(row.id)}
                        className="h-10 w-10 rounded-xl text-muted-foreground/30 hover:text-rose-500 hover:bg-rose-500/10 opacity-0 group-hover/row:opacity-100 transition-all"
                        disabled={fixedCosts.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={addFixed}
                    className="w-full rounded-xl h-10 text-[10px] font-bold uppercase tracking-wider border-dashed border-blue-500/20 text-blue-500 hover:bg-blue-500/5 hover:border-blue-500/40 mt-2"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1.5" /> Agregar Costo Fijo
                  </Button>
                  <div className="flex justify-between items-center pt-3 border-t border-border/20">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-500">Total Costos Fijos</span>
                    <span className="text-sm font-bold text-blue-500">{formatBs(totalFixed)}</span>
                  </div>
                </TabsContent>

                <TabsContent value="variables" className="space-y-3">
                  {variableCosts.map((row) => (
                    <div key={row.id} className="flex items-center gap-3 group/row">
                      <div className="flex-1">
                        <Input
                          value={row.label}
                          onChange={(e) => updateVariable(row.id, "label", e.target.value)}
                          placeholder="Concepto"
                          className="h-10 rounded-xl bg-muted/20 border-border/30 text-xs font-medium focus:border-amber-500/40"
                        />
                      </div>
                      <div className="w-40">
                        <div className="relative">
                          <Input
                            type="number"
                            value={row.amount || ""}
                            onChange={(e) => updateVariable(row.id, "amount", e.target.value)}
                            placeholder="0.00"
                            className="h-10 rounded-xl bg-muted/20 border-border/30 text-xs font-bold pr-16 text-right focus:border-amber-500/40"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-muted-foreground/40">Bs/mes</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeVariable(row.id)}
                        className="h-10 w-10 rounded-xl text-muted-foreground/30 hover:text-rose-500 hover:bg-rose-500/10 opacity-0 group-hover/row:opacity-100 transition-all"
                        disabled={variableCosts.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={addVariable}
                    className="w-full rounded-xl h-10 text-[10px] font-bold uppercase tracking-wider border-dashed border-amber-500/20 text-amber-500 hover:bg-amber-500/5 hover:border-amber-500/40 mt-2"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1.5" /> Agregar Costo Variable
                  </Button>
                  <div className="flex justify-between items-center pt-3 border-t border-border/20">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-500">Total Costos Variables</span>
                    <span className="text-sm font-bold text-amber-500">{formatBs(totalVariable)}</span>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
            <CardHeader className="p-6 border-b border-border/30">
              <CardTitle className="text-xs font-semibold uppercase tracking-wide text-foreground flex items-center gap-2">
                <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                Ingresos Estimados
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Ingreso Mensual Estimado</Label>
                <div className="relative">
                  <Input
                    type="number"
                    value={revenue || ""}
                    onChange={(e) => setRevenue(Number(e.target.value) || 0)}
                    placeholder="0.00"
                    className="h-11 rounded-xl bg-muted/20 border-border/30 text-sm font-bold pr-10 text-right focus:border-emerald-500/40"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-muted-foreground/40">Bs</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Precio Promedio de Venta</Label>
                <div className="relative">
                  <Input
                    type="number"
                    value={avgPrice || ""}
                    onChange={(e) => setAvgPrice(Number(e.target.value) || 0)}
                    placeholder="0.00"
                    className="h-11 rounded-xl bg-muted/20 border-border/30 text-sm font-bold pr-10 text-right focus:border-emerald-500/40"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-muted-foreground/40">Bs</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Unidades Vendidas / Mes</Label>
                <Input
                  type="number"
                  value={unitsSold || ""}
                  onChange={(e) => setUnitsSold(Number(e.target.value) || 0)}
                  placeholder="0"
                  className="h-11 rounded-xl bg-muted/20 border-border/30 text-sm font-bold text-right focus:border-emerald-500/40"
                />
              </div>
            </CardContent>
          </Card>

          {(margin < 20 && revenue > 0 && totalCost > 0) || (fixedRatio > 60 && totalCost > 0) ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="rounded-2xl border-amber-500/20 bg-gradient-to-br from-amber-500/[0.06] to-orange-500/[0.04] overflow-hidden">
                <CardHeader className="p-5 pb-0">
                  <CardTitle className="text-xs font-semibold uppercase tracking-wide text-amber-500 flex items-center gap-2">
                    <Zap className="h-3.5 w-3.5" />
                    Recomendaciones
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-3">
                  {margin < 20 && revenue > 0 && totalCost > 0 && (
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-500/5 border border-rose-500/10">
                      <TrendingDown className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[11px] font-bold text-rose-400">Margen bajo ({margin.toFixed(1)}%)</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          Tu margen está por debajo del 20%. Considera aumentar precios o reducir costos operativos.
                        </p>
                      </div>
                    </div>
                  )}
                  {fixedRatio > 60 && totalCost > 0 && (
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                      <Building className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[11px] font-bold text-amber-400">Costos fijos elevados ({fixedRatio.toFixed(1)}%)</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          Los costos fijos superan el 60% del total. Revisa opciones de renegociación o alternativas más eficientes.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ) : null}
        </motion.div>
      </div>

      {allCosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
            <CardHeader className="p-6 border-b border-border/30">
              <CardTitle className="text-xs font-semibold uppercase tracking-wide text-foreground flex items-center gap-2">
                <BarChart3 className="h-3.5 w-3.5 text-amber-500" />
                Distribución de Costos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {allCosts.map((cost) => {
                const pct = totalCost > 0 ? (cost.amount / totalCost) * 100 : 0;
                return (
                  <div key={cost.id} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-foreground">{cost.label || "Sin nombre"}</span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0 rounded-md border",
                            cost.type === "fijo"
                              ? "border-blue-500/20 text-blue-500"
                              : "border-amber-500/20 text-amber-500"
                          )}
                        >
                          {cost.type === "fijo" ? "Fijo" : "Variable"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-muted-foreground">{formatBs(cost.amount)}</span>
                        <span className="text-[10px] font-bold text-foreground w-12 text-right">{pct.toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted/30 overflow-hidden">
                      <motion.div
                        className={cn(
                          "h-full rounded-full",
                          cost.type === "fijo" ? "bg-blue-500/60" : "bg-amber-500/60"
                        )}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
