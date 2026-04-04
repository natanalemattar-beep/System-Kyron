"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Wifi, Signal, Activity, Zap, Globe, Clock,
  ArrowDown, ArrowUp, RefreshCw, CheckCircle,
  AlertTriangle, XCircle, ArrowLeft, Server, Gauge
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

type TestResult = {
  download: number;
  upload: number;
  ping: number;
  jitter: number;
  timestamp: Date;
  quality: "excelente" | "buena" | "regular" | "deficiente";
};

type DiagnosticCheck = {
  label: string;
  icon: typeof Server;
  status: "pending" | "running" | "done";
};

const DIAGNOSTIC_STEPS: { label: string; icon: typeof Server }[] = [
  { label: "Conexión al servidor", icon: Server },
  { label: "Resolución DNS", icon: Globe },
  { label: "Latencia de red", icon: Clock },
  { label: "Velocidad de descarga", icon: ArrowDown },
  { label: "Velocidad de subida", icon: ArrowUp },
  { label: "Estabilidad de conexión", icon: Activity },
];

function getQuality(download: number, ping: number): TestResult["quality"] {
  if (download > 50 && ping < 30) return "excelente";
  if (download >= 20 && ping <= 50) return "buena";
  if (download >= 5 && ping <= 80) return "regular";
  return "deficiente";
}

const QUALITY_CONFIG = {
  excelente: { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", label: "Excelente", icon: CheckCircle },
  buena: { color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", label: "Buena", icon: CheckCircle },
  regular: { color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", label: "Regular", icon: AlertTriangle },
  deficiente: { color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30", label: "Deficiente", icon: XCircle },
};

function getRecommendations(result: TestResult): string[] {
  const tips: string[] = [];
  if (result.download > 50) tips.push("Tu velocidad es ideal para videollamadas HD y streaming 4K");
  else if (result.download > 20) tips.push("Tu velocidad es adecuada para streaming HD y videollamadas");
  else if (result.download > 5) tips.push("Tu velocidad permite navegación básica y streaming en SD");
  else tips.push("Tu velocidad es muy baja, considera contactar a tu proveedor");

  if (result.ping > 50) tips.push("Considera revisar tu router si el ping supera 50ms");
  else tips.push("Tu latencia es excelente para gaming y videollamadas");

  if (result.jitter > 10) tips.push("El jitter elevado puede causar cortes en llamadas VoIP");
  if (result.upload < 5) tips.push("La velocidad de subida baja puede afectar videoconferencias");
  if (result.download > 30 && result.ping < 40) tips.push("Tu conexión es apta para trabajo remoto sin interrupciones");

  return tips;
}

function AnimatedCounter({ value, duration = 1500, suffix = "" }: { value: number; duration?: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value * 10) / 10);
      if (progress < 1) ref.current = requestAnimationFrame(animate);
    };
    ref.current = requestAnimationFrame(animate);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [value, duration]);

  return <>{display.toFixed(1)}{suffix}</>;
}

export default function DiagnosticoRedPage() {
  const { toast } = useToast();
  const [testing, setTesting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentResult, setCurrentResult] = useState<TestResult | null>(null);
  const [history, setHistory] = useState<TestResult[]>([]);
  const [checks, setChecks] = useState<DiagnosticCheck[]>(
    DIAGNOSTIC_STEPS.map((s) => ({ ...s, status: "pending" }))
  );
  const [phase, setPhase] = useState<"idle" | "testing" | "done">("idle");

  const runDiagnostic = useCallback(async () => {
    setTesting(true);
    setProgress(0);
    setPhase("testing");
    setCurrentResult(null);
    setChecks(DIAGNOSTIC_STEPS.map((s) => ({ ...s, status: "pending" })));

    for (let i = 0; i < DIAGNOSTIC_STEPS.length; i++) {
      setChecks((prev) =>
        prev.map((c, idx) => (idx === i ? { ...c, status: "running" } : c))
      );

      const stepDuration = 600 + Math.random() * 800;
      const startProgress = (i / DIAGNOSTIC_STEPS.length) * 100;
      const endProgress = ((i + 1) / DIAGNOSTIC_STEPS.length) * 100;
      const startTime = Date.now();

      await new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const stepProgress = Math.min(elapsed / stepDuration, 1);
          setProgress(startProgress + (endProgress - startProgress) * stepProgress);
          if (stepProgress >= 1) {
            clearInterval(interval);
            resolve();
          }
        }, 30);
      });

      setChecks((prev) =>
        prev.map((c, idx) => (idx === i ? { ...c, status: "done" } : c))
      );
    }

    const download = Math.round((5 + Math.random() * 95) * 10) / 10;
    const upload = Math.round((2 + Math.random() * 48) * 10) / 10;
    const ping = Math.round(10 + Math.random() * 70);
    const jitter = Math.round((1 + Math.random() * 14) * 10) / 10;
    const quality = getQuality(download, ping);

    const result: TestResult = {
      download,
      upload,
      ping,
      jitter,
      timestamp: new Date(),
      quality,
    };

    setCurrentResult(result);
    setHistory((prev) => [result, ...prev].slice(0, 3));
    setProgress(100);
    setPhase("done");
    setTesting(false);

    toast({
      title: "Diagnóstico completado",
      description: `Calidad: ${QUALITY_CONFIG[quality].label} · ${download} Mbps descarga`,
    });
  }, [toast]);

  const qualityConfig = currentResult ? QUALITY_CONFIG[currentResult.quality] : null;

  const gaugeRadius = 90;
  const gaugeCircumference = 2 * Math.PI * gaugeRadius;
  const gaugeDash = (progress / 100) * gaugeCircumference;
  const gaugeColor =
    progress < 33 ? "#3b82f6" : progress < 66 ? "#06b6d4" : "#10b981";

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="pt-6 pb-2">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/mi-linea">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Wifi className="h-4 w-4 text-blue-400" />
              <Badge variant="outline" className="text-[9px] font-bold tracking-widest border-blue-500/30 text-blue-400 bg-blue-500/10">
                DIAGNÓSTICO DE RED
              </Badge>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Velocidad, Latencia y Calidad
              </span>
              <span className="text-foreground"> de tu Conexión</span>
            </h1>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
              <CardHeader className="border-b border-border/50 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Gauge className="h-4 w-4 text-blue-400" />
                    </div>
                    <CardTitle className="text-sm font-semibold">Test de Velocidad</CardTitle>
                  </div>
                  {phase === "done" && (
                    <Button
                      onClick={runDiagnostic}
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs gap-1.5 rounded-lg"
                      disabled={testing}
                    >
                      <RefreshCw className={cn("h-3 w-3", testing && "animate-spin")} />
                      Repetir
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="py-8">
                <div className="flex flex-col items-center">
                  <div className="relative w-[220px] h-[220px] mb-6">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                      <circle
                        cx="100"
                        cy="100"
                        r={gaugeRadius}
                        fill="none"
                        stroke="currentColor"
                        className="text-muted/20"
                        strokeWidth="8"
                      />
                      <motion.circle
                        cx="100"
                        cy="100"
                        r={gaugeRadius}
                        fill="none"
                        stroke={gaugeColor}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={gaugeCircumference}
                        strokeDashoffset={gaugeCircumference - gaugeDash}
                        initial={{ strokeDashoffset: gaugeCircumference }}
                        animate={{ strokeDashoffset: gaugeCircumference - gaugeDash }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      {phase === "idle" && (
                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center">
                          <Signal className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">Listo para iniciar</p>
                        </motion.div>
                      )}
                      {phase === "testing" && (
                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center">
                          <p className="text-3xl font-black tabular-nums text-foreground">
                            {Math.round(progress)}%
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-1">Analizando...</p>
                        </motion.div>
                      )}
                      {phase === "done" && currentResult && (
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", damping: 15 }}
                          className="text-center"
                        >
                          <p className="text-3xl font-black tabular-nums text-foreground">
                            <AnimatedCounter value={currentResult.download} suffix="" />
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">Mbps ↓</p>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {phase === "idle" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                      <Button
                        onClick={runDiagnostic}
                        size="lg"
                        className="h-12 px-8 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-500/20"
                      >
                        <Zap className="mr-2 h-4 w-4" />
                        Iniciar Diagnóstico
                      </Button>
                    </motion.div>
                  )}

                  {phase === "done" && currentResult && qualityConfig && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="w-full max-w-md space-y-4"
                    >
                      <div className={cn("flex items-center justify-center gap-2 p-3 rounded-xl border", qualityConfig.bg, qualityConfig.border)}>
                        <qualityConfig.icon className={cn("h-5 w-5", qualityConfig.color)} />
                        <span className={cn("text-sm font-bold", qualityConfig.color)}>
                          Calidad: {qualityConfig.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: "Descarga", value: currentResult.download, unit: "Mbps", icon: ArrowDown, color: "text-cyan-400" },
                          { label: "Subida", value: currentResult.upload, unit: "Mbps", icon: ArrowUp, color: "text-blue-400" },
                          { label: "Ping", value: currentResult.ping, unit: "ms", icon: Clock, color: "text-amber-400" },
                          { label: "Jitter", value: currentResult.jitter, unit: "ms", icon: Activity, color: "text-purple-400" },
                        ].map((metric, i) => (
                          <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            className="kyron-surface p-3 rounded-xl ring-1 ring-border/30"
                          >
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <metric.icon className={cn("h-3 w-3", metric.color)} />
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                {metric.label}
                              </span>
                            </div>
                            <p className={cn("text-lg font-black tabular-nums", metric.color)}>
                              <AnimatedCounter value={metric.value} duration={1200} suffix={` ${metric.unit}`} />
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {phase === "done" && currentResult && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
                <CardHeader className="border-b border-border/50 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <Zap className="h-4 w-4 text-emerald-400" />
                    </div>
                    <CardTitle className="text-sm font-semibold">Recomendaciones</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="py-4">
                  <div className="space-y-2">
                    {getRecommendations(currentResult).map((tip, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                        className="flex items-start gap-2.5 p-2.5 rounded-lg bg-muted/10"
                      >
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-foreground/80">{tip}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
              <CardHeader className="border-b border-border/50 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Server className="h-4 w-4 text-blue-400" />
                  </div>
                  <CardTitle className="text-sm font-semibold">Diagnóstico</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="py-4">
                <div className="space-y-1">
                  {checks.map((check, i) => (
                    <motion.div
                      key={check.label}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/5 transition-colors"
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        {check.status === "pending" && (
                          <div className="h-2 w-2 rounded-full bg-muted-foreground/20" />
                        )}
                        {check.status === "running" && (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <RefreshCw className="h-3.5 w-3.5 text-blue-400" />
                          </motion.div>
                        )}
                        {check.status === "done" && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 10 }}>
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                          </motion.div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-1">
                        <check.icon className={cn(
                          "h-3 w-3",
                          check.status === "done" ? "text-foreground/70" :
                          check.status === "running" ? "text-blue-400" :
                          "text-muted-foreground/40"
                        )} />
                        <span className={cn(
                          "text-xs",
                          check.status === "done" ? "text-foreground/80" :
                          check.status === "running" ? "text-foreground font-medium" :
                          "text-muted-foreground/50"
                        )}>
                          {check.label}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {phase === "testing" && (
                  <div className="mt-4">
                    <Progress value={progress} className="h-1.5" />
                    <p className="text-[10px] text-muted-foreground mt-2 text-center">
                      Ejecutando pruebas de red...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
              <CardHeader className="border-b border-border/50 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Clock className="h-4 w-4 text-purple-400" />
                  </div>
                  <CardTitle className="text-sm font-semibold">Historial</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="py-4">
                {history.length === 0 ? (
                  <div className="text-center py-6">
                    <Signal className="h-6 w-6 text-muted-foreground/20 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground/50">Sin pruebas realizadas</p>
                    <p className="text-[10px] text-muted-foreground/30 mt-1">Inicia un diagnóstico para ver resultados</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <AnimatePresence>
                      {history.map((result, i) => {
                        const qc = QUALITY_CONFIG[result.quality];
                        return (
                          <motion.div
                            key={result.timestamp.getTime()}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="kyron-surface p-3 rounded-xl ring-1 ring-border/30"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline" className={cn("text-[9px] font-bold", qc.bg, qc.border, qc.color)}>
                                {qc.label}
                              </Badge>
                              <span className="text-[9px] text-muted-foreground tabular-nums">
                                {result.timestamp.toLocaleTimeString("es-VE", { hour: "2-digit", minute: "2-digit" })}
                              </span>
                            </div>
                            <div className="grid grid-cols-4 gap-1">
                              {[
                                { label: "↓", value: `${result.download}`, unit: "Mbps" },
                                { label: "↑", value: `${result.upload}`, unit: "Mbps" },
                                { label: "Ping", value: `${result.ping}`, unit: "ms" },
                                { label: "Jit", value: `${result.jitter}`, unit: "ms" },
                              ].map((m) => (
                                <div key={m.label} className="text-center">
                                  <p className="text-[9px] text-muted-foreground">{m.label}</p>
                                  <p className="text-[11px] font-bold tabular-nums text-foreground">{m.value}</p>
                                  <p className="text-[8px] text-muted-foreground/50">{m.unit}</p>
                                </div>
                              ))}
                            </div>
                            {i === 0 && history.length > 1 && (
                              <div className="mt-2 pt-2 border-t border-border/20">
                                <div className="flex items-center justify-center gap-1">
                                  {result.download > history[1].download ? (
                                    <ArrowUp className="h-2.5 w-2.5 text-emerald-400" />
                                  ) : (
                                    <ArrowDown className="h-2.5 w-2.5 text-rose-400" />
                                  )}
                                  <span className={cn(
                                    "text-[9px] font-medium",
                                    result.download > history[1].download ? "text-emerald-400" : "text-rose-400"
                                  )}>
                                    {Math.abs(result.download - history[1].download).toFixed(1)} Mbps vs anterior
                                  </span>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
