"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Zap, Activity, Play, Pause, History, RefreshCw,
  CircleCheck, XCircle, Clock, Loader2, ChevronDown, ChevronUp,
  AlertTriangle, Database, Shield, FileText, Bell, Trash2, ChartColumn,
  Mail, Scale
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
  regulatory_alerts: Scale,
  db_health_check: Database,
  blockchain_batch_anchor: Shield,
  session_cleanup: Trash2,
  invoice_reminders: FileText,
  activity_digest: ChartColumn,
  email_automation: Mail,
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

      if (!rulesRes.ok || !statsRes.ok || !logsRes.ok) {
        const failedRes = [rulesRes, statsRes, logsRes].find(r => !r.ok);
        if (failedRes?.status === 401) {
          toast({ title: "Sesión expirada", description: "Inicia sesión nuevamente", variant: "destructive" });
          return;
        }
        throw new Error(`Error del servidor: ${failedRes?.status}`);
      }

      const rulesData = await rulesRes.json();
      const statsData = await statsRes.json();
      const logsData = await logsRes.json();
      setRules(rulesData.rules || []);
      setStats(statsData);
      setLogs(logsData.logs || []);
    } catch (err) {
      console.error('[automatizaciones] Error loading data:', err);
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
        toast({ title: "Ejecutado", description: data.log.result_summary || 'Automatización completada' });
      } else {
        toast({ title: "Error", description: data.log?.error_message || 'Error en ejecución', variant: "destructive" });
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
      toast({ title: "Actualizado", description: "Estado de automatización actualizado" });
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
      toast({ title: "Ciclo completo", description: `${data.executed || 0} automatización(es) ejecutada(s)` });
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
    <div className="space-y-8 pb-16">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pt-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="h-5 w-5 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Automatizaciones
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Reglas programadas que se ejecutan automáticamente en el sistema
          </p>
        </div>
        <Button
          size="sm"
          onClick={runAll}
          disabled={executing === 'all'}
        >
          {executing === 'all' ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Play className="h-4 w-4 mr-2" />}
          Ejecutar todas
        </Button>
      </header>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {[
          { label: "Reglas activas", value: `${stats?.activeRules || 0}`, sub: `de ${stats?.totalRules || 0}`, color: "text-primary" },
          { label: "Ejecuciones", value: `${stats?.totalExecutions || 0}`, sub: `${stats?.totalRuns || 0} programadas`, color: "text-foreground" },
          { label: "Tiempo total", value: stats?.minutesSaved ? `${stats.minutesSaved.toFixed(1)} min` : '0 min', sub: "de procesamiento", color: "text-foreground" },
          { label: "Tasa de éxito", value: `${successRate}%`, sub: `${stats?.totalFailures || 0} fallo(s)`, color: successRate >= 90 ? 'text-emerald-500' : successRate >= 70 ? 'text-amber-500' : 'text-red-500' },
        ].map((m) => (
          <Card key={m.label} className="p-5">
            <p className="text-xs font-medium text-muted-foreground mb-1">{m.label}</p>
            <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">{m.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">
              {showLogs ? 'Historial de ejecuciones' : 'Reglas de automatización'}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => setShowLogs(!showLogs)}
            >
              <History className="h-3.5 w-3.5 mr-1.5" />
              {showLogs ? 'Ver reglas' : 'Ver historial'}
            </Button>
          </div>

          <AnimatePresence mode="wait">
            {!showLogs ? (
              <motion.div key="rules" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                {rules.map(rule => {
                  const Icon = ACTION_ICONS[rule.action_type] || Zap;
                  const isExpanded = expandedRule === rule.id;
                  const ruleLogs = logs.filter(l => l.rule_id === rule.id).slice(0, 5);

                  return (
                    <Card key={rule.id} className={`overflow-hidden transition-opacity ${!rule.enabled ? 'opacity-50' : ''}`}>
                      <div className="p-4 md:p-5">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className={`p-2.5 rounded-lg shrink-0 ${rule.enabled ? 'bg-primary/10' : 'bg-muted'}`}>
                              <Icon className={`h-4 w-4 ${rule.enabled ? 'text-primary' : 'text-muted-foreground'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm text-foreground">{rule.name}</h3>
                              <p className="text-xs text-muted-foreground mt-0.5 truncate">{rule.description}</p>
                              <div className="flex flex-wrap items-center gap-3 mt-1.5">
                                <span className="text-[11px] text-muted-foreground/70 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {(rule.trigger_config as { label?: string })?.label || rule.trigger_type}
                                </span>
                                <span className="text-[11px] text-muted-foreground/70">
                                  Último: {formatRelativeTime(rule.last_run_at)}
                                </span>
                                <span className="text-[11px] text-muted-foreground/70">
                                  {rule.run_count} ejecuciones
                                </span>
                                {rule.fail_count > 0 && (
                                  <span className="text-[11px] text-red-500 flex items-center gap-0.5">
                                    <AlertTriangle className="h-3 w-3" />
                                    {rule.fail_count} fallo(s)
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {rule.avg_duration_ms != null && rule.avg_duration_ms > 0 && (
                              <Badge variant="outline" className="text-[10px] px-2 py-0.5 font-normal">
                                ~{formatDuration(rule.avg_duration_ms)}
                              </Badge>
                            )}
                            <Badge variant={rule.enabled ? 'default' : 'secondary'} className="text-[10px] px-2">
                              {rule.enabled ? 'Activa' : 'Pausada'}
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
                            <div className="px-5 pb-4 border-t pt-3">
                              <p className="text-xs font-medium text-muted-foreground mb-2">
                                Últimas ejecuciones
                              </p>
                              {ruleLogs.length === 0 ? (
                                <p className="text-xs text-muted-foreground/60">Sin ejecuciones registradas</p>
                              ) : (
                                <div className="space-y-1.5">
                                  {ruleLogs.map(log => (
                                    <div key={log.id} className="flex items-center gap-2.5 text-xs p-2 rounded-md bg-muted/50">
                                      {log.status === 'success' ? (
                                        <CircleCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                      ) : log.status === 'error' ? (
                                        <XCircle className="h-3.5 w-3.5 text-red-500 shrink-0" />
                                      ) : (
                                        <Loader2 className="h-3.5 w-3.5 text-amber-500 animate-spin shrink-0" />
                                      )}
                                      <span className="text-muted-foreground shrink-0">
                                        {new Date(log.started_at).toLocaleString('es-VE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                                      </span>
                                      <span className="flex-1 truncate text-foreground/80">
                                        {log.status === 'success' ? log.result_summary : log.error_message || 'En ejecución...'}
                                      </span>
                                      <span className="text-muted-foreground/60 shrink-0">{formatDuration(log.duration_ms)}</span>
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
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold">
                      Historial — Últimas 30 ejecuciones
                    </CardTitle>
                  </CardHeader>
                  <div className="px-6 pb-6 space-y-1.5 max-h-[600px] overflow-y-auto">
                    {logs.length === 0 ? (
                      <p className="text-center text-muted-foreground text-sm py-10">Sin ejecuciones registradas</p>
                    ) : logs.map(log => (
                      <div key={log.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors">
                        {log.status === 'success' ? (
                          <CircleCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                        ) : log.status === 'error' ? (
                          <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                        ) : (
                          <Loader2 className="h-4 w-4 text-amber-500 animate-spin shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground">{log.rule_name}</p>
                          <p className="text-[11px] text-muted-foreground truncate">
                            {log.status === 'success' ? log.result_summary : log.error_message || 'En ejecución...'}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[11px] text-muted-foreground">
                            {new Date(log.started_at).toLocaleString('es-VE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <p className="text-[10px] text-muted-foreground/60">{formatDuration(log.duration_ms)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <Card className="bg-primary text-primary-foreground p-6">
            <h3 className="text-base font-semibold mb-2">Estado del motor</h3>
            <p className="text-xs opacity-80 leading-relaxed mb-5">
              Las reglas programadas se ejecutan automáticamente cada hora. Cada ejecución queda registrada con su resultado y duración.
            </p>
            <div className="space-y-2.5 mb-5">
              <div className="flex justify-between text-xs opacity-80">
                <span>Intervalo</span><span>1 hora</span>
              </div>
              <div className="flex justify-between text-xs opacity-80">
                <span>Reglas registradas</span><span>{rules.length}</span>
              </div>
              <div className="flex justify-between text-xs opacity-80">
                <span>Duración promedio</span><span>{formatDuration(stats?.avgDurationMs || 0)}</span>
              </div>
            </div>
            <Button
              variant="secondary"
              className="w-full"
              onClick={runAll}
              disabled={executing === 'all'}
            >
              {executing === 'all' ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Play className="h-4 w-4 mr-2" />}
              Ejecutar ciclo manual
            </Button>
          </Card>

          <Card className="p-5">
            <h3 className="text-xs font-medium text-muted-foreground mb-3">Últimas ejecuciones</h3>
            {logs.length > 0 ? (
              <div className="space-y-2">
                {logs.slice(0, 5).map(log => (
                  <div key={log.id} className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full shrink-0 ${log.status === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    <span className="text-xs text-foreground/80 flex-1 truncate">{log.rule_name}</span>
                    <span className="text-[10px] text-muted-foreground">{formatDuration(log.duration_ms)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Sin ejecuciones aún</p>
            )}
          </Card>

          <Card className="p-5">
            <h3 className="text-xs font-medium text-muted-foreground mb-3">Tipos de automatización</h3>
            <div className="space-y-1">
              {[
                { label: 'Tasas de cambio BCV', icon: RefreshCw, color: 'text-blue-500' },
                { label: 'Alertas fiscales', icon: Bell, color: 'text-amber-500' },
                { label: 'Monitor regulatorio', icon: Scale, color: 'text-amber-600' },
                { label: 'Salud del sistema', icon: Database, color: 'text-emerald-500' },
                { label: 'Blockchain', icon: Shield, color: 'text-violet-500' },
                { label: 'Cobranza', icon: FileText, color: 'text-orange-500' },
                { label: 'Emails automáticos', icon: Mail, color: 'text-pink-500' },
                { label: 'Limpieza', icon: Trash2, color: 'text-red-500' },
                { label: 'Reportes', icon: ChartColumn, color: 'text-cyan-500' },
              ].map(t => (
                <div key={t.label} className="flex items-center gap-2.5 py-1.5 px-2 rounded-md hover:bg-muted/50 transition-colors">
                  <t.icon className={`h-3.5 w-3.5 ${t.color}`} />
                  <span className="text-xs text-foreground/70">{t.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
