"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Zap, Play, Pause, ChevronDown, ChevronUp, CheckCircle2, XCircle,
  Clock, Loader2, AlertTriangle, RefreshCw, Bell, Database, Shield,
  Trash2, FileText, BarChart3, Mail
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger_type: string;
  trigger_config: { interval_hours?: number; label?: string };
  action_type: string;
  enabled: boolean;
  module: string | null;
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

const ACTION_ICONS: Record<string, typeof Zap> = {
  bcv_sync: RefreshCw,
  fiscal_alerts: Bell,
  db_health_check: Database,
  blockchain_batch_anchor: Shield,
  session_cleanup: Trash2,
  invoice_reminders: FileText,
  activity_digest: BarChart3,
  regulatory_alerts: Bell,
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

interface ModuleAutomationProps {
  module: string;
}

export function ModuleAutomation({ module }: ModuleAutomationProps) {
  const { toast } = useToast();
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [logs, setLogs] = useState<AutomationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(true);
  const [expandedRule, setExpandedRule] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [rulesRes, logsRes] = await Promise.all([
        fetch(`/api/automations?module=${module}`),
        fetch(`/api/automations?action=logs&module=${module}&limit=20`),
      ]);
      const rulesData = await rulesRes.json();
      const logsData = await logsRes.json();
      setRules(rulesData.rules || []);
      setLogs(logsData.logs || []);
    } catch {
      setRules([]);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, [module]);

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

  if (loading) {
    return null;
  }

  if (rules.length === 0) {
    return null;
  }

  const totalRuns = rules.reduce((s, r) => s + r.run_count, 0);
  const totalFails = rules.reduce((s, r) => s + r.fail_count, 0);
  const successRate = totalRuns > 0 ? Math.round(((totalRuns - totalFails) / totalRuns) * 100) : 100;

  return (
    <Card className="rounded-2xl border overflow-hidden">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">
              MODO AUTOMATIZACIÓN
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {rules.length} regla(s) · Éxito: {successRate}% · {totalRuns} ejecución(es)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {rules.every(r => r.enabled) ? (
            <Badge className="text-[10px] font-bold px-2 border-none bg-emerald-500/20 text-emerald-400">ACTIVAS</Badge>
          ) : rules.some(r => r.enabled) ? (
            <Badge className="text-[10px] font-bold px-2 border-none bg-amber-500/20 text-amber-400">PARCIAL</Badge>
          ) : (
            <Badge className="text-[10px] font-bold px-2 border-none bg-red-500/20 text-red-400">PAUSADAS</Badge>
          )}
          {collapsed ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronUp className="h-4 w-4 text-muted-foreground" />}
        </div>
      </button>

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t px-5 pb-5 space-y-4">
              {rules.map(rule => {
                const Icon = ACTION_ICONS[rule.action_type] || Zap;
                const isExpanded = expandedRule === rule.id;
                const ruleLogs = logs.filter(l => l.rule_id === rule.id).slice(0, 5);
                const ruleSuccessRate = rule.run_count > 0
                  ? Math.round(((rule.run_count - rule.fail_count) / rule.run_count) * 100)
                  : 100;

                return (
                  <div key={rule.id} className={`rounded-xl border p-4 transition-all ${!rule.enabled ? 'opacity-50' : ''}`}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`p-2 rounded-lg ${rule.enabled ? 'bg-primary/10' : 'bg-muted/20'}`}>
                          <Icon className={`h-4 w-4 ${rule.enabled ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-xs uppercase text-foreground/90">{rule.name}</h4>
                          <p className="text-[10px] text-muted-foreground truncate">{rule.description}</p>
                          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                            <span className="text-[10px] font-bold text-muted-foreground/60 uppercase">
                              <Clock className="h-2.5 w-2.5 inline mr-0.5" />
                              {rule.trigger_config?.label || rule.trigger_type}
                            </span>
                            <span className="text-[10px] font-bold text-muted-foreground/60 uppercase">
                              Último: {formatRelativeTime(rule.last_run_at)}
                            </span>
                            <span className="text-[10px] font-bold text-muted-foreground/60 uppercase">
                              Éxito: {ruleSuccessRate}%
                            </span>
                            {rule.fail_count > 0 && (
                              <span className="text-[10px] font-bold text-red-400/80 uppercase">
                                <AlertTriangle className="h-2.5 w-2.5 inline mr-0.5" />
                                {rule.fail_count} fallo(s)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Badge className={`text-[10px] font-bold px-2 border-none ${rule.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                          {rule.enabled ? 'ACTIVA' : 'PAUSADA'}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => toggleRule(rule.id)}
                          title={rule.enabled ? 'Pausar' : 'Activar'}
                        >
                          {rule.enabled ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-primary"
                          onClick={() => executeRule(rule.id)}
                          disabled={executing === rule.id}
                          title="Ejecutar ahora"
                        >
                          {executing === rule.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => setExpandedRule(isExpanded ? null : rule.id)}
                        >
                          {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        </Button>
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
                          <div className="mt-3 pt-3 border-t border-border/30">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50 mb-2">
                              Últimas Ejecuciones
                            </p>
                            {ruleLogs.length === 0 ? (
                              <p className="text-[10px] text-muted-foreground/40 italic">Sin ejecuciones registradas</p>
                            ) : (
                              <div className="space-y-1.5">
                                {ruleLogs.map(log => (
                                  <div key={log.id} className="flex items-center gap-2 text-[10px] p-1.5 rounded-lg bg-muted/30">
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
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
