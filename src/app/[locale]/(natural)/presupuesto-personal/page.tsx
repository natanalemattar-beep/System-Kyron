"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Wallet, TrendingUp, TrendingDown, PiggyBank, ShoppingBag, Home, Car, Utensils, Heart, Smartphone, Plus, Trash2, ArrowLeft, Activity, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { useToast } from "@/hooks/use-toast";

interface IncomeRow {
  id: string;
  source: string;
  amount: number;
}

interface ExpenseRow {
  id: string;
  category: string;
  description: string;
  amount: number;
}

const incomeTypes = [
  { value: "salario", label: "Salario" },
  { value: "freelance", label: "Freelance" },
  { value: "negocio", label: "Negocio Propio" },
  { value: "inversiones", label: "Inversiones" },
  { value: "otro", label: "Otro" },
];

const expenseCategories = [
  { value: "vivienda", label: "Vivienda", icon: Home, color: "text-blue-500", bg: "bg-blue-500" },
  { value: "alimentacion", label: "Alimentación", icon: Utensils, color: "text-orange-500", bg: "bg-orange-500" },
  { value: "transporte", label: "Transporte", icon: Car, color: "text-cyan-500", bg: "bg-cyan-500" },
  { value: "salud", label: "Salud", icon: Heart, color: "text-red-500", bg: "bg-red-500" },
  { value: "telecomunicaciones", label: "Telecomunicaciones", icon: Smartphone, color: "text-indigo-500", bg: "bg-indigo-500" },
  { value: "educacion", label: "Educación", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500" },
  { value: "servicios", label: "Servicios", icon: DollarSign, color: "text-yellow-500", bg: "bg-yellow-500" },
  { value: "entretenimiento", label: "Entretenimiento", icon: Wallet, color: "text-pink-500", bg: "bg-pink-500" },
  { value: "ahorro", label: "Ahorro", icon: PiggyBank, color: "text-violet-500", bg: "bg-violet-500" },
  { value: "otros", label: "Otros", icon: ShoppingBag, color: "text-gray-400", bg: "bg-gray-400" },
];

const categoryLimits: Record<string, { max: number; label: string }> = {
  vivienda: { max: 30, label: "vivienda" },
  alimentacion: { max: 25, label: "alimentación" },
  transporte: { max: 15, label: "transporte" },
  entretenimiento: { max: 10, label: "entretenimiento" },
  telecomunicaciones: { max: 5, label: "telecomunicaciones" },
};

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

export default function PresupuestoPersonalPage() {
  const { toast } = useToast();

  const [incomes, setIncomes] = useState<IncomeRow[]>([
    { id: generateId(), source: "salario", amount: 0 },
  ]);

  const [expenses, setExpenses] = useState<ExpenseRow[]>([
    { id: generateId(), category: "vivienda", description: "", amount: 0 },
  ]);

  const totalIncome = incomes.reduce((sum, i) => sum + (i.amount || 0), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
  const expenseRatio = totalIncome > 0 ? Math.min((totalExpenses / totalIncome) * 100, 100) : 0;

  const categoryTotals = expenseCategories.map((cat) => {
    const total = expenses
      .filter((e) => e.category === cat.value)
      .reduce((sum, e) => sum + (e.amount || 0), 0);
    const percentage = totalExpenses > 0 ? (total / totalExpenses) * 100 : 0;
    const incomePercentage = totalIncome > 0 ? (total / totalIncome) * 100 : 0;
    return { ...cat, total, percentage, incomePercentage };
  }).filter((c) => c.total > 0);

  const tips: string[] = [];
  categoryTotals.forEach((cat) => {
    const limit = categoryLimits[cat.value];
    if (limit && cat.incomePercentage > limit.max) {
      tips.push(`Tu gasto en ${limit.label} (${cat.incomePercentage.toFixed(1)}%) supera el ${limit.max}% recomendado de tus ingresos.`);
    }
  });
  if (savingsRate < 10 && totalIncome > 0) {
    tips.push("Tu tasa de ahorro es menor al 10%. Se recomienda ahorrar al menos un 20% de tus ingresos.");
  }
  if (savingsRate >= 20 && totalIncome > 0) {
    tips.push("¡Excelente! Tu tasa de ahorro supera el 20% recomendado. ¡Sigue así!");
  }
  if (balance < 0) {
    tips.push("⚠️ Tus gastos superan tus ingresos. Revisa tu presupuesto para evitar deudas.");
  }
  if (totalIncome > 0 && totalExpenses === 0) {
    tips.push("Agrega tus gastos mensuales para obtener un análisis completo de tu presupuesto.");
  }

  const addIncome = () => {
    setIncomes((prev) => [...prev, { id: generateId(), source: "salario", amount: 0 }]);
    toast({ title: "Ingreso agregado", description: "Completa los datos del nuevo ingreso" });
  };

  const removeIncome = (id: string) => {
    if (incomes.length <= 1) return;
    setIncomes((prev) => prev.filter((i) => i.id !== id));
  };

  const updateIncome = (id: string, field: keyof IncomeRow, value: string | number) => {
    setIncomes((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const addExpense = () => {
    setExpenses((prev) => [...prev, { id: generateId(), category: "otros", description: "", amount: 0 }]);
    toast({ title: "Gasto agregado", description: "Completa los datos del nuevo gasto" });
  };

  const removeExpense = (id: string) => {
    if (expenses.length <= 1) return;
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const updateExpense = (id: string, field: keyof ExpenseRow, value: string | number) => {
    setExpenses((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const getCategoryIcon = (value: string) => {
    const cat = expenseCategories.find((c) => c.value === value);
    return cat ? cat.icon : ShoppingBag;
  };

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto px-4">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-violet-500/[0.04] via-card to-card p-6 sm:p-8 mt-6"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
        <div className="relative">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="mb-4 gap-2 text-muted-foreground hover:text-foreground text-xs">
              <ArrowLeft className="h-4 w-4" /> Volver al Dashboard
            </Button>
          </Link>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
              <Wallet className="h-7 w-7 text-violet-500" />
            </div>
            <div className="space-y-1 flex-1">
              <Badge className="text-[7px] bg-violet-500/10 text-violet-400 border-violet-500/20 uppercase tracking-widest font-bold mb-2">
                Presupuesto Personal
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent">
                Presupuesto Personal
              </h1>
              <p className="text-sm text-muted-foreground font-medium">
                Planifica tus Ingresos, Gastos y Metas de Ahorro
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="lg:col-span-2 space-y-6"
        >
          <Card className="rounded-2xl border border-border/30 bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-500" /> Ingresos Mensuales
                </CardTitle>
                <Button variant="outline" size="sm" onClick={addIncome} className="h-7 gap-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg">
                  <Plus className="h-3 w-3" /> Agregar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {incomes.map((income, idx) => (
                <motion.div
                  key={income.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-end gap-3 p-3 rounded-xl bg-muted/20 border border-border/15"
                >
                  <div className="flex-1 space-y-1.5">
                    <Label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-wider">Fuente</Label>
                    <Select value={income.source} onValueChange={(v) => updateIncome(income.id, "source", v)}>
                      <SelectTrigger className="h-9 rounded-lg text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {incomeTypes.map((t) => (
                          <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <Label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-wider">Monto (Bs.)</Label>
                    <Input
                      type="number"
                      min={0}
                      placeholder="0.00"
                      value={income.amount || ""}
                      onChange={(e) => updateIncome(income.id, "amount", parseFloat(e.target.value) || 0)}
                      className="h-9 rounded-lg text-xs"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeIncome(income.id)}
                    disabled={incomes.length <= 1}
                    className="h-9 w-9 p-0 text-muted-foreground/40 hover:text-red-500 shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border/30 bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-red-500" /> Gastos Mensuales
                </CardTitle>
                <Button variant="outline" size="sm" onClick={addExpense} className="h-7 gap-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg">
                  <Plus className="h-3 w-3" /> Agregar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {expenses.map((expense, idx) => {
                const CatIcon = getCategoryIcon(expense.category);
                return (
                  <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-end gap-3 p-3 rounded-xl bg-muted/20 border border-border/15"
                  >
                    <div className="p-2 rounded-lg bg-muted/30 self-center shrink-0">
                      <CatIcon className="h-4 w-4 text-muted-foreground/60" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <Label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-wider">Categoría</Label>
                      <Select value={expense.category} onValueChange={(v) => updateExpense(expense.id, "category", v)}>
                        <SelectTrigger className="h-9 rounded-lg text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {expenseCategories.map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              <span className="flex items-center gap-2">
                                <c.icon className={cn("h-3.5 w-3.5", c.color)} />
                                {c.label}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <Label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-wider">Descripción</Label>
                      <Input
                        placeholder="Ej: Alquiler"
                        value={expense.description}
                        onChange={(e) => updateExpense(expense.id, "description", e.target.value)}
                        className="h-9 rounded-lg text-xs"
                      />
                    </div>
                    <div className="w-28 space-y-1.5 shrink-0">
                      <Label className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-wider">Monto (Bs.)</Label>
                      <Input
                        type="number"
                        min={0}
                        placeholder="0.00"
                        value={expense.amount || ""}
                        onChange={(e) => updateExpense(expense.id, "amount", parseFloat(e.target.value) || 0)}
                        className="h-9 rounded-lg text-xs"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExpense(expense.id)}
                      disabled={expenses.length <= 1}
                      className="h-9 w-9 p-0 text-muted-foreground/40 hover:text-red-500 shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <Card className="rounded-2xl border border-border/30 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                <Activity className="h-4 w-4 text-violet-500" /> Resumen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/10">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                    <span className="text-[11px] font-bold text-foreground">Total Ingresos</span>
                  </div>
                  <span className="text-sm font-bold text-emerald-500">
                    Bs. {totalIncome.toLocaleString("es-VE", { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-red-500/[0.04] border border-red-500/10">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    <span className="text-[11px] font-bold text-foreground">Total Gastos</span>
                  </div>
                  <span className="text-sm font-bold text-red-500">
                    Bs. {totalExpenses.toLocaleString("es-VE", { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className={cn(
                  "flex items-center justify-between p-3 rounded-xl border",
                  balance >= 0 ? "bg-emerald-500/[0.04] border-emerald-500/10" : "bg-red-500/[0.04] border-red-500/10"
                )}>
                  <div className="flex items-center gap-2">
                    <DollarSign className={cn("h-4 w-4", balance >= 0 ? "text-emerald-500" : "text-red-500")} />
                    <span className="text-[11px] font-bold text-foreground">Balance</span>
                  </div>
                  <span className={cn("text-sm font-bold", balance >= 0 ? "text-emerald-500" : "text-red-500")}>
                    Bs. {balance.toLocaleString("es-VE", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider">Tasa de Ahorro</span>
                  <span className={cn(
                    "text-sm font-bold",
                    savingsRate >= 20 ? "text-emerald-500" : savingsRate >= 10 ? "text-amber-500" : "text-red-500"
                  )}>
                    {savingsRate.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider">Gastos / Ingresos</span>
                  <span className={cn(
                    "text-xs font-bold",
                    expenseRatio <= 70 ? "text-emerald-500" : expenseRatio <= 90 ? "text-amber-500" : "text-red-500"
                  )}>
                    {expenseRatio.toFixed(1)}%
                  </span>
                </div>
                <Progress
                  value={expenseRatio}
                  className="h-2.5 rounded-full"
                />
                <p className="text-[11px] text-muted-foreground/40">
                  {expenseRatio <= 70
                    ? "Buen control de gastos"
                    : expenseRatio <= 90
                    ? "Gastos moderados, considera reducir"
                    : "Gastos elevados, revisa tu presupuesto"}
                </p>
              </div>
            </CardContent>
          </Card>

          {categoryTotals.length > 0 && (
            <Card className="rounded-2xl border border-border/30 bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                  <PiggyBank className="h-4 w-4 text-violet-500" /> Desglose por Categoría
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categoryTotals.map((cat) => {
                  const CatIcon = cat.icon;
                  return (
                    <div key={cat.value} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CatIcon className={cn("h-3.5 w-3.5", cat.color)} />
                          <span className="text-[10px] font-bold text-foreground">{cat.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-muted-foreground/50">{cat.percentage.toFixed(1)}%</span>
                          <span className="text-[10px] font-bold text-foreground">
                            Bs. {cat.total.toLocaleString("es-VE", { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-muted/20 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${cat.percentage}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className={cn("h-full rounded-full", cat.bg)}
                        />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {tips.length > 0 && (
            <Card className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.02]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-violet-500" /> Consejos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {tips.map((tip, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-2.5 rounded-lg bg-muted/10 border border-border/10"
                  >
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{tip}</p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
