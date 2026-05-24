"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  ShieldCheck, Users, DollarSign, Calendar, Download, Send,
  Loader2, CircleCheck, TriangleAlert, Search, ChevronRight,
  FileText, Building2, CreditCard, ArrowRight, Sparkles, BrainCircuit,
  Clock, AlertTriangle, CheckCircle2, X, UserCheck, Receipt, Landmark,
  BarChart3, Info
} from "lucide-react";

const IVSS_RATES = {
  patronal: "9% - 11%",
  trabajador: "4%",
  salarioMinimo: "$150",
  topeSalarial: "$1.300",
};

export default function IvssSeguroSocialPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [aportes, setAportes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"empleados" | "aportes" | "calcular" | "ai">("empleados");
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [calculo, setCalculo] = useState<any>(null);
  const [calculoLoading, setCalculoLoading] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState<Array<{ role: string; content: string }>>([
    { role: "ai", content: "¡Hola! Soy **Kyron IVSS**. Puedo ayudarte a gestionar el Seguro Social de tus empleados.\n\nPrueba decirme algo como:\n• *\"Registra a María Pérez en el IVSS\"*\n• *\"Calcula el aporte para Juan con salario de $400\"*\n• *\"Qué empleados están registrados?\"*\n• *\"Genera certificado de solvencia\"*" }
  ]);
  const [aiLoading, setAiLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const aiInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMessages]);

  useEffect(() => {
    if (successMsg) setTimeout(() => setSuccessMsg(null), 4000);
  }, [successMsg]);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch("/api/rrhh/ivss");
      const json = await res.json();
      if (json.success) {
        setEmployees(json.employees || []);
        setAportes(json.aportes || []);
      }
    } catch (e) {
      console.error("Error fetching IVSS data:", e);
    } finally {
      setLoading(false);
    }
  }

  async function handleCalculate(empleadoId: number) {
    const emp = employees.find((e: any) => e.id === empleadoId);
    if (!emp) return;
    setCalculoLoading(true);
    try {
      const res = await fetch("/api/rrhh/ivss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "calcular", empleado_id: empleadoId, salario_base: emp.salario_base }),
      });
      const json = await res.json();
      if (json.success) setCalculo(json.calculo);
    } catch (e) {
      console.error(e);
    } finally {
      setCalculoLoading(false);
    }
  }

  async function handleAiSend() {
    const trimmed = aiInput.trim();
    if (!trimmed || aiLoading) return;
    setAiMessages(prev => [...prev, { role: "user", content: trimmed }]);
    setAiInput("");
    setAiLoading(true);
    try {
      const res = await fetch("/api/rrhh/ivss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "ai", mensaje: trimmed, empleados }),
      });
      const json = await res.json();
      if (json.success) {
        setAiMessages(prev => [...prev, { role: "ai", content: json.respuesta || "Procesado correctamente." }]);
        if (json.exito) fetchData();
      } else {
        setAiMessages(prev => [...prev, { role: "ai", content: json.error || "No pude procesar tu solicitud. Intenta de nuevo." }]);
      }
    } catch {
      setAiMessages(prev => [...prev, { role: "ai", content: "Error de conexión. Revisa tu señal." }]);
    } finally {
      setAiLoading(false);
    }
  }

  const filteredEmployees = employees.filter((e: any) =>
    `${e.nombre} ${e.apellido} ${e.cedula}`.toLowerCase().includes(search.toLowerCase())
  );

  function fmt(n: number) { return "$" + Number(n || 0).toFixed(2); }

  const stats = [
    { label: "Empleados Registrados", value: employees.length, icon: Users, color: "border-t-blue-500/30 text-blue-400" },
    { label: "Aportes este Mes", value: aportes.filter((a: any) => a.periodo === new Date().toISOString().slice(0, 7)).length, icon: Calendar, color: "border-t-emerald-500/30 text-emerald-400" },
    { label: "Aportes Patronales (est.)", value: fmt(employees.reduce((s: number, e: any) => s + Math.min(Math.max(e.salario_base || 0, 150), 1300) * 0.09, 0)), icon: Building2, color: "border-t-amber-500/30 text-amber-400" },
    { label: "Al Día", value: employees.filter((e: any) => e.ultimo_aporte).length + "/" + employees.length, icon: CheckCircle2, color: "border-t-emerald-500/30 text-emerald-400" },
  ];

  return (
    <div className="space-y-6">
      {successMsg && (
        <div className="fixed top-6 right-6 z-50 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-3 flex items-center gap-3 shadow-lg backdrop-blur-md">
          <CircleCheck className="h-5 w-5 text-emerald-400" />
          <span className="text-sm font-medium text-emerald-300">{successMsg}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">IVSS Seguro Social</h1>
            <p className="text-xs text-muted-foreground">Gestión inteligente del Seguro Social obligatorio</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setAiOpen(!aiOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-[11px] font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-600/20">
            <BrainCircuit className="h-4 w-4" /> Kyron IVSS
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div key={i} className={`rounded-xl border border-border bg-card px-4 py-4 shadow-sm shadow-black/[0.02] border-t-2 ${s.color.split(" ")[0]}`}>
            <div className="flex items-center justify-between mb-1">
              <s.icon className={`h-4 w-4 ${s.color.split(" ")[1]}`} />
            </div>
            <p className="text-xl font-bold tracking-tight text-foreground">{s.value}</p>
            <p className="text-[11px] text-muted-foreground font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-muted/20 p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-7 w-1 rounded-full bg-blue-500/40" />
          <div className="flex items-center gap-2 flex-1">
            {(["empleados", "aportes", "calcular"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${tab === t ? "bg-card border border-border text-foreground shadow-sm" : "text-muted-foreground/50 hover:text-foreground/70"}`}>
                {t === "empleados" ? "Empleados" : t === "aportes" ? "Aportes" : "Calcular"}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." className="h-9 w-48 rounded-lg border border-border bg-card pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/40" />
          </div>
        </div>

        {tab === "empleados" && (
          <div className="space-y-2">
            {loading ? (
              <div className="py-16 text-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground/30 mx-auto" /></div>
            ) : filteredEmployees.length === 0 ? (
              <div className="py-16 text-center">
                <Users className="h-10 w-10 text-muted-foreground/20 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground/50 font-medium">No hay empleados registrados</p>
              </div>
            ) : filteredEmployees.map((emp: any) => (
              <div key={emp.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card shadow-sm shadow-black/[0.02] hover:shadow-md transition-shadow">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <UserCheck className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{emp.nombre} {emp.apellido}</p>
                  <p className="text-[11px] text-muted-foreground">V-{emp.cedula} · {emp.cargo || "Sin cargo"} · {fmt(emp.salario_base)}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p className="text-[11px] font-medium text-muted-foreground">{emp.aportes_count || 0} aportes</p>
                    <p className={`text-[10px] font-medium ${emp.ultimo_aporte ? "text-emerald-400/60" : "text-amber-400/60"}`}>
                      {emp.ultimo_aporte ? `Último: ${emp.ultimo_aporte.slice(0, 7)}` : "Sin aportes"}
                    </p>
                  </div>
                  <button onClick={() => { setSelectedEmployee(emp); handleCalculate(emp.id); setTab("calcular"); }}
                    className="h-8 w-8 rounded-lg bg-muted/30 border border-border/50 flex items-center justify-center hover:bg-muted/50 transition-colors">
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "aportes" && (
          <div className="space-y-2">
            {aportes.length === 0 ? (
              <div className="py-16 text-center">
                <Receipt className="h-10 w-10 text-muted-foreground/20 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground/50 font-medium">No hay aportes registrados</p>
              </div>
            ) : aportes.map((a: any, i: number) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card shadow-sm shadow-black/[0.02]">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${a.pagado ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-amber-500/10 border border-amber-500/20"}`}>
                  {a.pagado ? <CheckCircle2 className="h-5 w-5 text-emerald-400" /> : <Clock className="h-5 w-5 text-amber-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{a.nombre} {a.apellido}</p>
                  <p className="text-[11px] text-muted-foreground">Periodo: {a.periodo} · Base: {fmt(a.base_calculo)}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-foreground">{fmt(a.monto_patronal + a.monto_empleado)}</p>
                  <p className={`text-[10px] font-medium ${a.pagado ? "text-emerald-400/60" : "text-amber-400/60"}`}>
                    {a.pagado ? "Pagado" : "Pendiente"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "calcular" && (
          <div className="max-w-lg">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm shadow-black/[0.02]">
              <h3 className="text-sm font-semibold text-foreground mb-4">Calcular Aporte IVSS</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-medium text-muted-foreground mb-1 block">Empleado</label>
                  <select value={selectedEmployee?.id || ""} onChange={e => {
                    const emp = employees.find((x: any) => x.id === Number(e.target.value));
                    setSelectedEmployee(emp);
                    if (emp) handleCalculate(emp.id);
                  }} className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:border-primary/40">
                    <option value="">Seleccionar empleado...</option>
                    {employees.map((e: any) => (
                      <option key={e.id} value={e.id}>{e.nombre} {e.apellido} · V-{e.cedula}</option>
                    ))}
                  </select>
                </div>
                {calculoLoading && <div className="py-4 text-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground/30 mx-auto" /></div>}
                {calculo && !calculoLoading && (
                  <div className="rounded-xl bg-muted/30 border border-border/50 p-4 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-border/50">
                      <span className="text-xs font-medium text-muted-foreground">Período</span>
                      <span className="text-sm font-bold text-foreground">{calculo.mes}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-muted-foreground">Salario base</span>
                      <span className="text-sm font-bold text-foreground">{fmt(calculo.salario_base)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-muted-foreground">Aporte patronal (9%)</span>
                      <span className="text-sm font-bold text-blue-400">{fmt(calculo.aporte_patronal)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-muted-foreground">Aporte trabajador (4%)</span>
                      <span className="text-sm font-bold text-amber-400">{fmt(calculo.aporte_trabajador)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-border/50">
                      <span className="text-xs font-bold text-foreground">Total</span>
                      <span className="text-base font-black text-emerald-400">{fmt(calculo.total)}</span>
                    </div>
                  </div>
                )}
                {!selectedEmployee && !calculoLoading && (
                  <div className="py-6 text-center">
                    <Info className="h-8 w-8 text-muted-foreground/20 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground/50 font-medium">Selecciona un empleado para calcular su aporte IVSS</p>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-border bg-card p-4 shadow-sm shadow-black/[0.02]">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-muted-foreground/40" />
                <p className="text-[11px] font-semibold text-muted-foreground">Tasas IVSS 2026</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded-lg bg-muted/20"><span className="text-muted-foreground/60">Patronal:</span> <span className="text-foreground font-medium">{IVSS_RATES.patronal}</span></div>
                <div className="p-2 rounded-lg bg-muted/20"><span className="text-muted-foreground/60">Trabajador:</span> <span className="text-foreground font-medium">{IVSS_RATES.trabajador}</span></div>
                <div className="p-2 rounded-lg bg-muted/20"><span className="text-muted-foreground/60">Salario mínimo:</span> <span className="text-foreground font-medium">{IVSS_RATES.salarioMinimo}</span></div>
                <div className="p-2 rounded-lg bg-muted/20"><span className="text-muted-foreground/60">Tope salarial:</span> <span className="text-foreground font-medium">{IVSS_RATES.topeSalarial}</span></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-muted/20 p-5">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Resumen de Aportes por Periodo</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-2 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Periodo</th>
                <th className="text-left py-2 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Empleado</th>
                <th className="text-right py-2 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Patronal</th>
                <th className="text-right py-2 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Trabajador</th>
                <th className="text-right py-2 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Total</th>
                <th className="text-center py-2 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody>
              {aportes.slice(0, 10).map((a: any, i: number) => (
                <tr key={i} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                  <td className="py-2.5 px-3 text-xs text-foreground">{a.periodo}</td>
                  <td className="py-2.5 px-3 text-xs text-foreground">{a.nombre} {a.apellido}</td>
                  <td className="py-2.5 px-3 text-xs text-right text-foreground">{fmt(a.monto_patronal)}</td>
                  <td className="py-2.5 px-3 text-xs text-right text-foreground">{fmt(a.monto_empleado)}</td>
                  <td className="py-2.5 px-3 text-xs text-right font-bold text-foreground">{fmt((a.monto_patronal||0) + (a.monto_empleado||0))}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${a.pagado ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                      {a.pagado ? "Pagado" : "Pendiente"}
                    </span>
                  </td>
                </tr>
              ))}
              {aportes.length === 0 && (
                <tr><td colSpan={6} className="py-8 text-center text-xs text-muted-foreground/40">Sin datos de aportes</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {aiOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] max-h-[600px] rounded-2xl overflow-hidden flex flex-col border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white/20 flex items-center justify-center">
                <BrainCircuit className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Kyron IVSS</h3>
                <p className="text-[8px] text-white/60 font-black uppercase tracking-wider">Asistente Seguro Social</p>
              </div>
            </div>
            <button onClick={() => setAiOpen(false)} className="h-8 w-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <X className="h-4 w-4 text-white" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] max-h-[400px]">
            {aiMessages.map((msg, i) => (
              <div key={i} className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "ai" && (
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mr-2 mt-1 shrink-0">
                    <BrainCircuit className="h-4 w-4 text-white" />
                  </div>
                )}
                <div className={`max-w-[85%] p-3 rounded-xl text-[13px] leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-white rounded-tr-sm"
                    : "bg-muted/30 border border-border/50 text-foreground rounded-tl-sm"
                }`}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}
            {aiLoading && (
              <div className="flex justify-start">
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mr-2 mt-1 shrink-0">
                  <BrainCircuit className="h-4 w-4 text-white" />
                </div>
                <div className="bg-muted/30 border border-border/50 p-3 rounded-xl rounded-tl-sm">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
                    <span className="text-xs text-muted-foreground/60">Procesando...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-border/50 bg-muted/10">
            <div className="flex items-center gap-2">
              <input ref={aiInputRef} value={aiInput} onChange={e => setAiInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAiSend(); } }}
                placeholder="Ej: Registra a Juan Pérez..." className="flex-1 h-10 rounded-xl bg-muted/30 border border-border/50 px-4 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/40" />
              <button onClick={handleAiSend} disabled={aiLoading || !aiInput.trim()}
                className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 flex items-center justify-center disabled:opacity-30 transition-all shadow-lg shadow-blue-600/20">
                <Send className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {!aiOpen && (
        <button onClick={() => setAiOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-2xl hover:shadow-blue-600/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95">
          <BrainCircuit className="h-7 w-7 text-white" />
        </button>
      )}
    </div>
  );
}
