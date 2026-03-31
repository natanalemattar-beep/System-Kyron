"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Zap, Bot, Activity, Play, Pause, History, RefreshCw,
  CheckCircle2, XCircle, Clock, Loader2, ChevronDown, ChevronUp,
  Timer, AlertTriangle, Database, Shield, FileText, Bell, Trash2, BarChart3
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger_type: string;
  trigger_config: { interval_hours?: number; label?: string };
  action_type: string;
  enabled: boolean;
  last_run_at: string | null;
  next_run_at: string | null;
  run_count: number;
  fail_count: number;
  avg_duration_ms: number | null;
}

interface AutomationLog {
  id: string;
  rule_id: string;
  rule_name: string;
  action_type: string;
  status: string;
  started_at: string;
  finished_at: string | null;
  duration_ms: number | null;
  result_summary: string | null;
  error_message: string | null;
}

interface AutomationStats {
  totalRules: number;
  activeRules: number;
  totalRuns: number;
  totalFailures: number;
  avgDurationMs: number;
  totalExecutions: number;
  minutesSaved: number;
  recentLogs: AutomationLog[];
}

const ACTION_ICONS: Record<string, typeof Zap> = {
  bcv_sync: RefreshCw,
  fiscal_alerts: Bell,
  db_health_check: Database,
  blockchain_batch_anchor: Shield,
  session_cleanup: Trash2,
  invoice_reminders: FileText,
  activity_digest: BarChart3,
};

function formatDuration(ms: number | null): string {
  if (!ms) return '—';
  if (ms < 1000) return `${Math.round(ms)}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60000).toFixed(1)}min`;
}

function formatRelativeTime(dateStr: string | null): string {
  if (!dateStr) return 'Nunca';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Ahora mismo';
  if (mins < 60) return `Hace ${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `Hace ${hrs}h`;
  return `Hace ${Math.floor(hrs / 24)}d`;
}

export default function AutomatizacionesPage() {
  const { toast } = useToast();
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [stats, setStats] = useState<AutomationStats | null>(null);
  const [logs, setLogs] = useState<AutomationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState<string | null>(null);
  const [showLogs, setShowLogs] = useState(false);
  const [expandedRule, setExpandedRule] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [rulesRes, statsRes, logsRes] = await Promise.all([
        fetch('/api/automations'),
        fetch('/api/automations?action=stats'),
        fetch('/api/automations?action=logs&limit=30'),
      ]);
      const rulesData = await rulesRes.json();
      const statsData = await statsRes.json();
      const logsData = await logsRes.json();
      setRules(rulesData.rules || []);
      setStats(statsData);
      setLogs(logsData.logs || []);
    } catch {
      toast({ title: "Error", description: "No se pudieron cargar las automatizaciones", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const executeRule = async (ruleId: string) => {
    setExecuting(ruleId);
    try {
      const res = await fetch('/api/automations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'execute', rule_id: ruleId }),
      });
      const data = await res.json();
      if (data.log?.status === 'success') {
        toast({ title: "EJECUTADO", description: data.log.result_summary || 'Automatización completada' });
      } else {
        toast({ title: "ERROR", description: data.log?.error_message || 'Error en ejecución', variant: "destructive" });
      }
      await fetchData();
    } catch {
      toast({ title: "Error", description: "Fallo en la ejecución", variant: "destructive" });
    } finally {
      setExecuting(null);
    }
  };

  const toggleRule = async (ruleId: string) => {
    try {
      await fetch('/api/automations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle', rule_id: ruleId }),
      });
      await fetchData();
      toast({ title: "ACTUALIZADO", description: "Estado de automatización actualizado" });
    } catch {
      toast({ title: "Error", description: "No se pudo cambiar el estado", variant: "destructive" });
    }
  };

  const runAll = async () => {
    setExecuting('all');
    try {
      const res = await fetch('/api/automations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'run_scheduled' }),
      });
      const data = await res.json();
      toast({ title: "CICLO COMPLETO", description: `${data.executed || 0} automatización(es) ejecutada(s)` });
      await fetchData();
    } catch {
      toast({ title: "Error", description: "Fallo en ejecución masiva", variant: "destructive" });
    } finally {
      setExecuting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const successRate = stats && stats.totalRuns > 0
    ? Math.round(((stats.totalRuns - stats.totalFailures) / stats.totalRuns) * 100)
    : 100;

  return (
    <div className="space-y-12 pb-20">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
          <Zap className="h-3 w-3" /> MOTOR DE AUTOMATIZACIÓN
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none">
          Automatizaciones <span className="text-primary italic">REALES</span>
        </h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">
          Ejecución en Vivo • Base de Datos • System Kyron v2.9
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="glass-card border-none bg-card/40 p-6 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Bot className="h-20 w-20" /></div>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-2">Reglas Activas</p>
          <p className="text-3xl font-black italic text-primary tracking-tight">{stats?.activeRules || 0}</p>
          <p className="text-[8px] text-muted-foreground mt-1">de {stats?.totalRules || 0} totales</p>
        </Card>

        <Card className="glass-card border-none bg-card/40 p-6 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Activity className="h-20 w-20" /></div>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-2">Ejecuciones Totales</p>
          <p className="text-3xl font-black italic text-foreground tracking-tight">{stats?.totalExecutions || 0}</p>
          <p className="text-[8px] text-muted-foreground mt-1">{stats?.totalRuns || 0} desde reglas</p>
        </Card>

        <Card className="glass-card border-none bg-card/40 p-6 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Timer className="h-20 w-20" /></div>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-2">Tiempo Procesado</p>
          <p className="text-3xl font-black italic text-foreground tracking-tight">
            {stats?.minutesSaved ? `${stats.minutesSaved.toFixed(1)}` : '0'}
          </p>
          <p className="text-[8px] text-muted-foreground mt-1">minutos de ejecución</p>
        </Card>

        <Card className="glass-card border-none bg-card/40 p-6 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><CheckCircle2 className="h-20 w-20" /></div>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-2">Tasa de Éxito</p>
          <p className={`text-3xl font-black italic tracking-tight ${successRate >= 90 ? 'text-emerald-400' : successRate >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
            {successRate}%
          </p>
          <p className="text-[8px] text-muted-foreground mt-1">{stats?.totalFailures || 0} fallo(s)</p>
        </Card>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Reglas de Automatización</h2>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="text-[9px] font-black uppercase tracking-wider"
                onClick={() => setShowLogs(!showLogs)}
              >
                <History className="h-3 w-3 mr-2" />
                {showLogs ? 'Reglas' : 'Historial'}
              </Button>
              <Button
                size="sm"
                className="text-[9px] font-black uppercase tracking-wider bg-primary"
                onClick={runAll}
                disabled={executing === 'all'}
              >
                {executing === 'all' ? <Loader2 className="h-3 w-3 mr-2 animate-spin" /> : <Play className="h-3 w-3 mr-2" />}
                Ejecutar Todas
              </Button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!showLogs ? (
              <motion.div key="rules" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                {rules.map(rule => {
                  const Icon = ACTION_ICONS[rule.action_type] || Zap;
                  const isExpanded = expandedRule === rule.id;
                  const ruleLogs = logs.filter(l => l.rule_id === rule.id).slice(0, 5);

                  return (
                    <Card key={rule.id} className={`glass-card border-none rounded-[2rem] overflow-hidden shadow-xl transition-all ${!rule.enabled ? 'opacity-50' : ''}`}>
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div className="flex items-center gap-4 flex-1">
                            <div className={`p-3 rounded-xl ${rule.enabled ? 'bg-primary/10' : 'bg-muted/20'}`}>
                              <Icon className={`h-5 w-5 ${rule.enabled ? 'text-primary' : 'text-muted-foreground'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-black text-sm uppercase text-foreground/90">{rule.name}</h3>
                              <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{rule.description}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="text-[8px] font-bold text-muted-foreground/60 uppercase">
                                  <Clock className="h-2.5 w-2.5 inline mr-1" />
                                  {(rule.trigger_config as { label?: string })?.label || rule.trigger_type}
                                </span>
                                <span className="text-[8px] font-bold text-muted-foreground/60 uppercase">
                                  Último: {formatRelativeTime(rule.last_run_at)}
                                </span>
                                <span className="text-[8px] font-bold text-muted-foreground/60 uppercase">
                                  Runs: {rule.run_count}
                                </span>
                                {rule.fail_count > 0 && (
                                  <span className="text-[8px] font-bold text-red-400/80 uppercase">
                                    <AlertTriangle className="h-2.5 w-2.5 inline mr-0.5" />
                                    {rule.fail_count} fallo(s)
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {rule.avg_duration_ms && (
                              <Badge variant="outline" className="text-[8px] font-bold px-2 py-0.5">
                                ~{formatDuration(rule.avg_duration_ms)}
                              </Badge>
                            )}
                            <Badge className={`text-[8px] font-black px-3 border-none ${rule.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                              {rule.enabled ? 'ACTIVA' : 'PAUSADA'}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => toggleRule(rule.id)}
                              title={rule.enabled ? 'Pausar' : 'Activar'}
                            >
                              {rule.enabled ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-primary"
                              onClick={() => executeRule(rule.id)}
                              disabled={executing === rule.id}
                              title="Ejecutar ahora"
                            >
                              {executing === rule.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setExpandedRule(isExpanded ? null : rule.id)}
                            >
                              {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                            </Button>
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 border-t border-border/30 pt-4">
                              <p className="text-[9px] font-black uppercase tracking-wider text-muted-foreground/50 mb-3">
                                Últimas Ejecuciones
                              </p>
                              {ruleLogs.length === 0 ? (
                                <p className="text-[10px] text-muted-foreground/40 italic">Sin ejecuciones registradas</p>
                              ) : (
                                <div className="space-y-2">
                                  {ruleLogs.map(log => (
                                    <div key={log.id} className="flex items-center gap-3 text-[10px] p-2 rounded-lg bg-white/5">
                                      {log.status === 'success' ? (
                                        <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                                      ) : log.status === 'error' ? (
                                        <XCircle className="h-3 w-3 text-red-400 shrink-0" />
                                      ) : (
                                        <Loader2 className="h-3 w-3 text-yellow-400 animate-spin shrink-0" />
                                      )}
                                      <span className="text-muted-foreground/60 shrink-0">
                                        {new Date(log.started_at).toLocaleString('es-VE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                                      </span>
                                      <span className="flex-1 truncate">
                                        {log.status === 'success' ? log.result_summary : log.error_message || 'En ejecución...'}
                                      </span>
                                      <span className="text-muted-foreground/40 shrink-0">{formatDuration(log.duration_ms)}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div key="logs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Card className="glass-card border-none rounded-[2rem] overflow-hidden shadow-xl">
                  <CardHeader className="p-6 border-b border-border/30">
                    <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-primary italic">
                      Historial de Ejecuciones — Últimas 30
                    </CardTitle>
                  </CardHeader>
                  <div className="p-6 space-y-2 max-h-[600px] overflow-y-auto">
                    {logs.length === 0 ? (
                      <p className="text-center text-muted-foreground/40 text-sm py-10">Sin ejecuciones registradas</p>
                    ) : logs.map(log => (
                      <div key={log.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                        {log.status === 'success' ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        ) : log.status === 'error' ? (
                          <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                        ) : (
                          <Loader2 className="h-4 w-4 text-yellow-400 animate-spin shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-bold text-foreground/80">{log.rule_name}</p>
                          <p className="text-[9px] text-muted-foreground/50 truncate">
                            {log.status === 'success' ? log.result_summary : log.error_message || 'En ejecución...'}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[9px] text-muted-foreground/60">
                            {new Date(log.started_at).toLocaleString('es-VE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <p className="text-[8px] text-muted-foreground/40">{formatDuration(log.duration_ms)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-primary text-primary-foreground rounded-[2rem] p-8 relative overflow-hidden shadow-glow border-none">
            <div className="absolute top-0 right-0 p-6 opacity-10"><Zap className="h-24 w-24" /></div>
            <h3 className="text-xl font-black uppercase italic tracking-tight mb-4">Motor Activo</h3>
            <p className="text-xs font-bold opacity-80 leading-relaxed mb-6">
              El motor de automatización ejecuta reglas programadas cada hora. Cada ejecución se registra en la base de datos con su resultado, duración y estado.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-[10px] font-bold opacity-70">
                <span>Intervalo del motor</span><span>1 hora</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold opacity-70">
                <span>Reglas registradas</span><span>{rules.length}</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold opacity-70">
                <span>Velocidad promedio</span><span>{formatDuration(stats?.avgDurationMs || 0)}</span>
              </div>
            </div>
            <Button
              variant="secondary"
              className="w-full h-11 bg-white text-primary font-black uppercase text-[9px] tracking-widest rounded-xl shadow-xl"
              onClick={runAll}
              disabled={executing === 'all'}
            >
              {executing === 'all' ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Play className="h-4 w-4 mr-2" />}
              Ejecutar Ciclo Manual
            </Button>
          </Card>

          <Card className="glass-card border-none rounded-[2rem] p-6 shadow-xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50 mb-4">Último Ciclo</h3>
            {logs.length > 0 ? (
              <div className="space-y-3">
                {logs.slice(0, 5).map(log => (
                  <div key={log.id} className="flex items-center gap-2">
                    {log.status === 'success' ? (
                      <div className="h-2 w-2 rounded-full bg-emerald-400" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-red-400" />
                    )}
                    <span className="text-[10px] font-bold text-foreground/70 flex-1 truncate">{log.rule_name}</span>
                    <span className="text-[8px] text-muted-foreground/40">{formatDuration(log.duration_ms)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[10px] text-muted-foreground/40 italic">Sin ejecuciones aún</p>
            )}
          </Card>

          <Card className="glass-card border-none rounded-[2rem] p-6 shadow-xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50 mb-4">Tipos de Automatización</h3>
            <div className="space-y-2">
              {[
                { label: 'Tasas de Cambio', icon: RefreshCw, color: 'text-blue-400' },
                { label: 'Alertas Fiscales', icon: Bell, color: 'text-yellow-400' },
                { label: 'Salud del Sistema', icon: Database, color: 'text-emerald-400' },
                { label: 'Blockchain', icon: Shield, color: 'text-violet-400' },
                { label: 'Cobranza', icon: FileText, color: 'text-orange-400' },
                { label: 'Limpieza', icon: Trash2, color: 'text-red-400' },
                { label: 'Reportes', icon: BarChart3, color: 'text-cyan-400' },
              ].map(t => (
                <div key={t.label} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <t.icon className={`h-3.5 w-3.5 ${t.color}`} />
                  <span className="text-[10px] font-bold text-foreground/60">{t.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
