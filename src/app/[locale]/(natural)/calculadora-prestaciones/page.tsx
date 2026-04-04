"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Calendar, DollarSign, Briefcase, Clock, Award, TrendingUp, ArrowLeft, Activity, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { useToast } from "@/hooks/use-toast";

interface ResultadoPrestaciones {
  anosServicio: number;
  mesesServicio: number;
  diasServicio: number;
  salarioDiario: number;
  salarioIntegralDiario: number;
  alicuotaUtilidades: number;
  alicuotaBonoVacacional: number;
  diasAntiguedad: number;
  montoAntiguedad: number;
  diasAntiguedadAdicional: number;
  montoAntiguedadAdicional: number;
  diasVacaciones: number;
  montoVacaciones: number;
  diasBonoVacacional: number;
  montoBonoVacacional: number;
  diasUtilidades: number;
  montoUtilidades: number;
  interesesPrestaciones: number;
  totalPrestaciones: number;
}

function calcularDiferenciaTiempo(inicio: Date, fin: Date) {
  let anos = fin.getFullYear() - inicio.getFullYear();
  let meses = fin.getMonth() - inicio.getMonth();
  let dias = fin.getDate() - inicio.getDate();

  if (dias < 0) {
    meses--;
    const ultimoDiaMesAnterior = new Date(fin.getFullYear(), fin.getMonth(), 0).getDate();
    dias += ultimoDiaMesAnterior;
  }
  if (meses < 0) {
    anos--;
    meses += 12;
  }
  return { anos: Math.max(0, anos), meses: Math.max(0, meses), dias: Math.max(0, dias) };
}

function calcularTrimestresCompletos(inicio: Date, fin: Date): number {
  const diffMs = fin.getTime() - inicio.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  const meses = diffDays / 30.4375;
  return Math.floor(meses / 3);
}

function formatBs(value: number): string {
  return new Intl.NumberFormat("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function AnimatedNumber({ value, prefix = "Bs. " }: { value: number; prefix?: string }) {
  return (
    <motion.span
      key={value.toFixed(2)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="tabular-nums"
    >
      {prefix}{formatBs(value)}
    </motion.span>
  );
}

export default function CalculadoraPrestacionesPage() {
  const { toast } = useToast();

  const [salarioMensual, setSalarioMensual] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [fechaCalculo, setFechaCalculo] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [incluirUtilidades, setIncluirUtilidades] = useState(true);
  const [diasUtilidades, setDiasUtilidades] = useState("60");
  const [incluirBonoVacacional, setIncluirBonoVacacional] = useState(true);
  const [diasBonoVacacionalInput, setDiasBonoVacacionalInput] = useState("");
  const [tasaInteres, setTasaInteres] = useState("12");

  const inputsValidos = useMemo(() => {
    const sal = parseFloat(salarioMensual);
    if (!sal || sal <= 0) return false;
    if (!fechaIngreso || !fechaCalculo) return false;
    const fi = new Date(fechaIngreso);
    const fc = new Date(fechaCalculo);
    if (isNaN(fi.getTime()) || isNaN(fc.getTime())) return false;
    if (fi >= fc) return false;
    return true;
  }, [salarioMensual, fechaIngreso, fechaCalculo]);

  const resultado: ResultadoPrestaciones | null = useMemo(() => {
    if (!inputsValidos) return null;

    const salario = parseFloat(salarioMensual);
    const fi = new Date(fechaIngreso);
    const fc = new Date(fechaCalculo);
    const diff = calcularDiferenciaTiempo(fi, fc);
    const anosCompletos = diff.anos;
    const salarioDiario = salario / 30;

    const diasUtilInput = incluirUtilidades ? Math.min(120, Math.max(15, parseInt(diasUtilidades) || 60)) : 0;
    const diasBonoVacAnosServicio = anosCompletos >= 1
      ? Math.min(30, 15 + (anosCompletos - 1))
      : 15;
    const diasBonoVacInput = incluirBonoVacacional
      ? (diasBonoVacacionalInput ? Math.min(30, Math.max(15, parseInt(diasBonoVacacionalInput) || diasBonoVacAnosServicio)) : diasBonoVacAnosServicio)
      : 0;

    const alicuotaUtilidades = incluirUtilidades ? (salarioDiario * diasUtilInput) / 360 : 0;
    const alicuotaBonoVacacional = incluirBonoVacacional ? (salarioDiario * diasBonoVacInput) / 360 : 0;
    const salarioIntegralDiario = salarioDiario + alicuotaUtilidades + alicuotaBonoVacacional;

    const trimestres = calcularTrimestresCompletos(fi, fc);
    const diasAntiguedad = trimestres * 15;
    const montoAntiguedad = diasAntiguedad * salarioIntegralDiario;

    let diasAntiguedadAdicional = 0;
    if (anosCompletos >= 2) {
      for (let i = 2; i <= anosCompletos; i++) {
        const adicionalAnual = Math.min(30, (i - 1) * 2);
        diasAntiguedadAdicional += adicionalAnual;
      }
    }
    const montoAntiguedadAdicional = diasAntiguedadAdicional * salarioIntegralDiario;

    const diasVacaciones = anosCompletos >= 1
      ? Math.min(30, 15 + (anosCompletos - 1))
      : 15;
    const montoVacaciones = diasVacaciones * salarioDiario;

    const diasBonoVacacional = diasBonoVacAnosServicio;
    const montoBonoVacacional = diasBonoVacacional * salarioDiario;

    const montoUtilidades = diasUtilInput * salarioDiario;

    const totalBase = montoAntiguedad + montoAntiguedadAdicional;
    const tasa = parseFloat(tasaInteres) || 12;
    const diffMs = fc.getTime() - fi.getTime();
    const anosDecimal = diffMs / (1000 * 60 * 60 * 24 * 365.25);
    const interesesPrestaciones = totalBase * (tasa / 100) * Math.min(anosDecimal, anosCompletos > 0 ? anosCompletos : anosDecimal);

    const totalPrestaciones = montoAntiguedad + montoAntiguedadAdicional + montoVacaciones + montoBonoVacacional + montoUtilidades + interesesPrestaciones;

    return {
      anosServicio: diff.anos,
      mesesServicio: diff.meses,
      diasServicio: diff.dias,
      salarioDiario,
      salarioIntegralDiario,
      alicuotaUtilidades,
      alicuotaBonoVacacional,
      diasAntiguedad,
      montoAntiguedad,
      diasAntiguedadAdicional,
      montoAntiguedadAdicional,
      diasVacaciones,
      montoVacaciones,
      diasBonoVacacional,
      montoBonoVacacional,
      diasUtilidades: diasUtilInput,
      montoUtilidades,
      interesesPrestaciones,
      totalPrestaciones,
    };
  }, [salarioMensual, fechaIngreso, fechaCalculo, incluirUtilidades, diasUtilidades, incluirBonoVacacional, diasBonoVacacionalInput, tasaInteres, inputsValidos]);

  const handleCalcular = () => {
    if (!inputsValidos) {
      toast({
        title: "Datos incompletos",
        description: "Por favor completa todos los campos requeridos correctamente.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Cálculo realizado",
      description: "Las prestaciones sociales han sido calculadas según la LOTTT.",
    });
  };

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto px-4">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-emerald-500/[0.04] via-card to-card p-6 sm:p-8 mt-6"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
        <div className="relative">
          <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground/60 hover:text-emerald-500 transition-colors mb-4 font-medium uppercase tracking-widest">
            <ArrowLeft className="h-3 w-3" /> Volver al Dashboard
          </Link>
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Calculator className="h-7 w-7 text-emerald-500" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="text-[8px] bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-bold uppercase tracking-wider">
                  PRESTACIONES LOTTT
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                  Calculadora de Prestaciones Sociales
                </span>
              </h1>
              <p className="text-sm text-muted-foreground font-medium">
                Cálculo de Prestaciones Sociales según la Ley Orgánica del Trabajo
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      <Tabs defaultValue="datos" className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <TabsList className="w-full grid grid-cols-2 h-11 rounded-xl bg-muted/20 border border-border/20">
            <TabsTrigger value="datos" className="rounded-lg text-xs font-bold gap-2 data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-500">
              <Briefcase className="h-3.5 w-3.5" /> Datos del Trabajador
            </TabsTrigger>
            <TabsTrigger value="resultados" className="rounded-lg text-xs font-bold gap-2 data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-500">
              <TrendingUp className="h-3.5 w-3.5" /> Resultados
            </TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value="datos" className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card className="rounded-2xl border border-border/30 bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-emerald-500" /> Información Salarial
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="salario" className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-wider">
                    Salario Mensual (Bs)
                  </Label>
                  <Input
                    id="salario"
                    type="number"
                    placeholder="Ej: 130.00"
                    value={salarioMensual}
                    onChange={(e) => setSalarioMensual(e.target.value)}
                    className="h-11 rounded-xl bg-muted/10 border-border/20 text-foreground placeholder:text-muted-foreground/30"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fechaIngreso" className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-wider">
                      Fecha de Ingreso
                    </Label>
                    <Input
                      id="fechaIngreso"
                      type="date"
                      value={fechaIngreso}
                      onChange={(e) => setFechaIngreso(e.target.value)}
                      className="h-11 rounded-xl bg-muted/10 border-border/20 text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fechaCalculo" className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-wider">
                      Fecha de Cálculo
                    </Label>
                    <Input
                      id="fechaCalculo"
                      type="date"
                      value={fechaCalculo}
                      onChange={(e) => setFechaCalculo(e.target.value)}
                      className="h-11 rounded-xl bg-muted/10 border-border/20 text-foreground"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="rounded-2xl border border-border/30 bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Award className="h-4 w-4 text-emerald-500" /> Alícuotas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border/15">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg", incluirUtilidades ? "bg-emerald-500/10" : "bg-muted/30")}>
                      <Activity className={cn("h-4 w-4", incluirUtilidades ? "text-emerald-500" : "text-muted-foreground/40")} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-foreground">Incluir Alícuota de Utilidades</p>
                      <p className="text-[9px] text-muted-foreground/60">Art. 131-132 LOTTT (15 a 120 días)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {incluirUtilidades && (
                      <Input
                        type="number"
                        min="15"
                        max="120"
                        value={diasUtilidades}
                        onChange={(e) => setDiasUtilidades(e.target.value)}
                        className="w-20 h-8 rounded-lg bg-muted/10 border-border/20 text-xs text-center"
                        placeholder="Días"
                      />
                    )}
                    <Button
                      variant={incluirUtilidades ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIncluirUtilidades(!incluirUtilidades)}
                      className={cn(
                        "h-8 text-[10px] font-bold rounded-lg min-w-[50px]",
                        incluirUtilidades ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""
                      )}
                    >
                      {incluirUtilidades ? "Sí" : "No"}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border/15">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg", incluirBonoVacacional ? "bg-emerald-500/10" : "bg-muted/30")}>
                      <Calendar className={cn("h-4 w-4", incluirBonoVacacional ? "text-emerald-500" : "text-muted-foreground/40")} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-foreground">Incluir Alícuota de Bono Vacacional</p>
                      <p className="text-[9px] text-muted-foreground/60">Art. 192 LOTTT (15 días base + 1 por año)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {incluirBonoVacacional && (
                      <Input
                        type="number"
                        min="15"
                        max="30"
                        value={diasBonoVacacionalInput}
                        onChange={(e) => setDiasBonoVacacionalInput(e.target.value)}
                        className="w-20 h-8 rounded-lg bg-muted/10 border-border/20 text-xs text-center"
                        placeholder="Auto"
                      />
                    )}
                    <Button
                      variant={incluirBonoVacacional ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIncluirBonoVacacional(!incluirBonoVacacional)}
                      className={cn(
                        "h-8 text-[10px] font-bold rounded-lg min-w-[50px]",
                        incluirBonoVacacional ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""
                      )}
                    >
                      {incluirBonoVacacional ? "Sí" : "No"}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tasaInteres" className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-wider">
                    Tasa de Interés sobre Prestaciones (% anual BCV)
                  </Label>
                  <Input
                    id="tasaInteres"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={tasaInteres}
                    onChange={(e) => setTasaInteres(e.target.value)}
                    className="h-11 rounded-xl bg-muted/10 border-border/20 text-foreground w-32"
                    placeholder="12"
                  />
                  <p className="text-[9px] text-muted-foreground/50 flex items-center gap-1">
                    <Info className="h-3 w-3" /> Tasa de referencia del Banco Central de Venezuela
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Button
              onClick={handleCalcular}
              className="w-full h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm gap-2"
            >
              <Calculator className="h-4 w-4" /> Calcular Prestaciones Sociales
            </Button>
          </motion.div>
        </TabsContent>

        <TabsContent value="resultados" className="space-y-6">
          <AnimatePresence mode="wait">
            {!resultado ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="rounded-2xl border border-border/30 bg-card">
                  <CardContent className="p-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-muted/20 border border-border/20 flex items-center justify-center mx-auto">
                      <Calculator className="h-8 w-8 text-muted-foreground/30" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Sin datos para calcular</p>
                      <p className="text-[11px] text-muted-foreground/50 mt-1">
                        Completa los datos del trabajador en la pestaña anterior para ver el cálculo de prestaciones sociales.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="space-y-6"
              >
                <Card className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.04] via-card to-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-emerald-500" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-wider">Total Prestaciones</p>
                          <p className="text-2xl sm:text-3xl font-black text-emerald-500">
                            <AnimatedNumber value={resultado.totalPrestaciones} />
                          </p>
                        </div>
                      </div>
                      <Badge className="text-[8px] bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-bold">
                        LOTTT
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-4">
                      <div className="p-3 rounded-xl bg-muted/10 border border-border/15 text-center">
                        <p className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-wider">Años</p>
                        <motion.p
                          key={resultado.anosServicio}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="text-xl font-black text-foreground"
                        >
                          {resultado.anosServicio}
                        </motion.p>
                      </div>
                      <div className="p-3 rounded-xl bg-muted/10 border border-border/15 text-center">
                        <p className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-wider">Meses</p>
                        <motion.p
                          key={resultado.mesesServicio}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="text-xl font-black text-foreground"
                        >
                          {resultado.mesesServicio}
                        </motion.p>
                      </div>
                      <div className="p-3 rounded-xl bg-muted/10 border border-border/15 text-center">
                        <p className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-wider">Días</p>
                        <motion.p
                          key={resultado.diasServicio}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="text-xl font-black text-foreground"
                        >
                          {resultado.diasServicio}
                        </motion.p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid sm:grid-cols-2 gap-4">
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <Card className="rounded-2xl border border-border/30 bg-card h-full">
                      <CardContent className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-emerald-500/10">
                              <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                            </div>
                            <p className="text-[11px] font-bold text-foreground">Salario Diario</p>
                          </div>
                        </div>
                        <p className="text-lg font-black text-emerald-500">
                          <AnimatedNumber value={resultado.salarioDiario} />
                        </p>
                        <div className="space-y-1 border-t border-border/15 pt-2">
                          <div className="flex justify-between text-[9px]">
                            <span className="text-muted-foreground/50">Alícuota Utilidades</span>
                            <span className="text-foreground font-bold">Bs. {formatBs(resultado.alicuotaUtilidades)}</span>
                          </div>
                          <div className="flex justify-between text-[9px]">
                            <span className="text-muted-foreground/50">Alícuota Bono Vac.</span>
                            <span className="text-foreground font-bold">Bs. {formatBs(resultado.alicuotaBonoVacacional)}</span>
                          </div>
                          <div className="flex justify-between text-[10px] border-t border-border/15 pt-1 mt-1">
                            <span className="text-muted-foreground/70 font-bold">Salario Integral</span>
                            <span className="text-emerald-500 font-black">Bs. {formatBs(resultado.salarioIntegralDiario)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                    <Card className="rounded-2xl border border-emerald-500/20 bg-card h-full">
                      <CardContent className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-emerald-500/10">
                              <Briefcase className="h-3.5 w-3.5 text-emerald-500" />
                            </div>
                            <p className="text-[11px] font-bold text-foreground">Antigüedad</p>
                          </div>
                          <Badge variant="outline" className="text-[7px] border-emerald-500/20 text-emerald-500">Art. 142</Badge>
                        </div>
                        <p className="text-lg font-black text-emerald-500">
                          <AnimatedNumber value={resultado.montoAntiguedad} />
                        </p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px]">
                            <span className="text-muted-foreground/50">Trimestres × 15 días</span>
                            <span className="text-foreground font-bold">{resultado.diasAntiguedad} días</span>
                          </div>
                          {resultado.diasAntiguedadAdicional > 0 && (
                            <>
                              <div className="flex justify-between text-[9px]">
                                <span className="text-muted-foreground/50">Días adicionales</span>
                                <span className="text-amber-500 font-bold">+{resultado.diasAntiguedadAdicional} días</span>
                              </div>
                              <div className="flex justify-between text-[9px]">
                                <span className="text-muted-foreground/50">Monto adicional</span>
                                <span className="text-amber-500 font-bold">Bs. {formatBs(resultado.montoAntiguedadAdicional)}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Card className="rounded-2xl border border-border/30 bg-card h-full">
                      <CardContent className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-emerald-500/10">
                              <Calendar className="h-3.5 w-3.5 text-emerald-500" />
                            </div>
                            <p className="text-[11px] font-bold text-foreground">Vacaciones</p>
                          </div>
                          <Badge variant="outline" className="text-[7px] border-emerald-500/20 text-emerald-500">Art. 190</Badge>
                        </div>
                        <p className="text-lg font-black text-emerald-500">
                          <AnimatedNumber value={resultado.montoVacaciones} />
                        </p>
                        <div className="flex justify-between text-[9px]">
                          <span className="text-muted-foreground/50">Días correspondientes</span>
                          <span className="text-foreground font-bold">{resultado.diasVacaciones} días</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                    <Card className="rounded-2xl border border-border/30 bg-card h-full">
                      <CardContent className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-emerald-500/10">
                              <Award className="h-3.5 w-3.5 text-emerald-500" />
                            </div>
                            <p className="text-[11px] font-bold text-foreground">Bono Vacacional</p>
                          </div>
                          <Badge variant="outline" className="text-[7px] border-emerald-500/20 text-emerald-500">Art. 192</Badge>
                        </div>
                        <p className="text-lg font-black text-emerald-500">
                          <AnimatedNumber value={resultado.montoBonoVacacional} />
                        </p>
                        <div className="flex justify-between text-[9px]">
                          <span className="text-muted-foreground/50">Días correspondientes</span>
                          <span className="text-foreground font-bold">{resultado.diasBonoVacacional} días</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <Card className="rounded-2xl border border-border/30 bg-card h-full">
                      <CardContent className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-amber-500/10">
                              <Activity className="h-3.5 w-3.5 text-amber-500" />
                            </div>
                            <p className="text-[11px] font-bold text-foreground">Utilidades</p>
                          </div>
                          <Badge variant="outline" className="text-[7px] border-amber-500/20 text-amber-500">Art. 131-132</Badge>
                        </div>
                        <p className="text-lg font-black text-amber-500">
                          <AnimatedNumber value={resultado.montoUtilidades} />
                        </p>
                        <div className="flex justify-between text-[9px]">
                          <span className="text-muted-foreground/50">Días de utilidades</span>
                          <span className="text-foreground font-bold">{resultado.diasUtilidades} días</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                    <Card className="rounded-2xl border border-border/30 bg-card h-full">
                      <CardContent className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-amber-500/10">
                              <TrendingUp className="h-3.5 w-3.5 text-amber-500" />
                            </div>
                            <p className="text-[11px] font-bold text-foreground">Intereses s/ Prestaciones</p>
                          </div>
                          <Badge variant="outline" className="text-[7px] border-amber-500/20 text-amber-500">BCV {tasaInteres}%</Badge>
                        </div>
                        <p className="text-lg font-black text-amber-500">
                          <AnimatedNumber value={resultado.interesesPrestaciones} />
                        </p>
                        <div className="flex justify-between text-[9px]">
                          <span className="text-muted-foreground/50">Tasa anual aplicada</span>
                          <span className="text-foreground font-bold">{tasaInteres}%</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <Card className="rounded-2xl border border-border/30 bg-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                        <Info className="h-4 w-4 text-emerald-500" /> Desglose Completo
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[
                          { label: "Antigüedad (Art. 142)", value: resultado.montoAntiguedad, dias: resultado.diasAntiguedad, color: "emerald" as const },
                          { label: "Antigüedad Adicional (Art. 142)", value: resultado.montoAntiguedadAdicional, dias: resultado.diasAntiguedadAdicional, color: "emerald" as const },
                          { label: "Vacaciones (Art. 190)", value: resultado.montoVacaciones, dias: resultado.diasVacaciones, color: "emerald" as const },
                          { label: "Bono Vacacional (Art. 192)", value: resultado.montoBonoVacacional, dias: resultado.diasBonoVacacional, color: "emerald" as const },
                          { label: "Utilidades (Art. 131-132)", value: resultado.montoUtilidades, dias: resultado.diasUtilidades, color: "amber" as const },
                          { label: "Intereses s/ Prestaciones", value: resultado.interesesPrestaciones, dias: null, color: "amber" as const },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-3 rounded-xl bg-muted/10 border border-border/10"
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-2 h-2 rounded-full",
                                item.color === "emerald" ? "bg-emerald-500" : "bg-amber-500"
                              )} />
                              <div>
                                <p className="text-[10px] font-bold text-foreground">{item.label}</p>
                                {item.dias !== null && (
                                  <p className="text-[8px] text-muted-foreground/40">{item.dias} días</p>
                                )}
                              </div>
                            </div>
                            <p className={cn(
                              "text-sm font-black",
                              item.color === "emerald" ? "text-emerald-500" : "text-amber-500"
                            )}>
                              Bs. {formatBs(item.value)}
                            </p>
                          </div>
                        ))}

                        <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/20 mt-2">
                          <div className="flex items-center gap-3">
                            <Clock className="h-4 w-4 text-emerald-500" />
                            <p className="text-sm font-black text-foreground">TOTAL PRESTACIONES</p>
                          </div>
                          <p className="text-lg font-black text-emerald-500">
                            Bs. {formatBs(resultado.totalPrestaciones)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </div>
  );
}