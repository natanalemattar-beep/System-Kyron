"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, ArrowLeft, FileText, AlertTriangle, CheckCircle, Clock, XCircle, Download, ExternalLink, Search, ChevronDown, ChevronRight, Building2 } from "lucide-react";
import { Link } from "@/navigation";
import { PasswordGate } from "@/components/password-gate";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { UpdateBanner } from "@/components/brand/update-banner";

type Estado = "completado" | "pendiente" | "critico" | "no_iniciado";
type Prioridad = "alta" | "media" | "baja";

type PermisoEntry = {
  organismo: string;
  organismoId: string;
  permiso: string;
  permisoId: string;
  descripcion: string;
  estado: Estado;
  prioridad: Prioridad;
  baseLegal?: string;
  vigencia: string;
  observacion?: string;
  requisitos: string[];
};

const STATUS_KEY = "sk-cm-permisos-status";

function loadStatus(): Record<string, { estado: Estado; prioridad: Prioridad }> {
  try {
    const raw = localStorage.getItem(STATUS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveStatus(status: Record<string, { estado: Estado; prioridad: Prioridad }>) {
  try { localStorage.setItem(STATUS_KEY, JSON.stringify(status)); } catch {}
}

const organismosLabel: Record<string, string> = {
  SENIAT: "SENIAT",
  SAPI: "SAPI",
  SENCAMER: "SENCAMER",
  INTT: "INTT",
  INSALUD: "INSALUD",
  "MIN-COMERCIO": "MINISTERIO DE COMERCIO",
  "MIN-COMERCIO-EXT": "MINISTERIO DE COMERCIO EXTERIOR",
  "MIN-TRABAJO": "MINISTERIO DEL TRABAJO",
  IVSS: "IVSS / FAOV / INCES",
  BCV: "BCV",
  SUNDDE: "SUNDDE",
  "CUERPO-BOMBEROS": "CUERPO DE BOMBEROS",
  "MIN-AMBIENTE": "MINISTERIO DEL AMBIENTE",
  INPSASEL: "INPSASEL",
  SAREN: "SAREN",
};

const organismosIcon: Record<string, any> = {
  SENIAT: "🏛️",
  SAPI: "©️",
  SENCAMER: "✅",
  INTT: "🚛",
  INSALUD: "⚕️",
};

const estadoConfig: Record<Estado, { icon: any; label: string; classes: string }> = {
  completado: { icon: CheckCircle, label: "Completado", classes: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  pendiente: { icon: Clock, label: "Pendiente", classes: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  critico: { icon: XCircle, label: "Crítico", classes: "bg-red-500/10 text-red-500 border-red-500/20" },
  no_iniciado: { icon: AlertTriangle, label: "No Iniciado", classes: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
};

const prioridadConfig: Record<Prioridad, string> = {
  alta: "bg-red-500/10 text-red-400 border-red-500/20",
  media: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  baja: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

function EstadoBadge({ estado, onClick }: { estado: Estado; onClick?: () => void }) {
  const c = estadoConfig[estado];
  const Icon = c.icon;
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all hover:scale-105 ${c.classes}`}>
      <Icon className="h-3 w-3" /> {c.label}
    </button>
  );
}

function PrioridadBadge({ prioridad, onClick }: { prioridad: Prioridad; onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider cursor-pointer hover:scale-105 transition-all ${prioridadConfig[prioridad]}`}>
      {prioridad}
    </button>
  );
}

const nextEstado: Record<Estado, Estado> = {
  completado: "pendiente",
  pendiente: "critico",
  critico: "no_iniciado",
  no_iniciado: "completado",
};

const nextPrioridad: Record<Prioridad, Prioridad> = {
  alta: "media",
  media: "baja",
  baja: "alta",
};

export default function PermisosEmprendimientoCarlosMattarPage() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const [permisos, setPermisos] = useState<PermisoEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<Record<string, { estado: Estado; prioridad: Prioridad }>>({});
  const [search, setSearch] = useState("");
  const [filterOrg, setFilterOrg] = useState("todos");
  const [filterEstado, setFilterEstado] = useState<Estado | "todos">("todos");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const saved = loadStatus();
    setStatus(saved);
    fetch("/api/permisologia/catalogo?limit=5000")
      .then(r => r.json())
      .then(data => {
        const items: any[] = data.items || [];
        const mapped: PermisoEntry[] = items.map((item: any) => {
          const p = item.permiso;
          const org = item.org;
          const savedState = saved[p.id];
          return {
            organismo: organismosLabel[org.id] || org.siglas || org.nombre,
            organismoId: org.id,
            permiso: p.nombre,
            permisoId: p.id,
            descripcion: p.descripcion,
            estado: savedState?.estado || "no_iniciado",
            prioridad: savedState?.prioridad || "media",
            baseLegal: p.baseLegal,
            vigencia: p.vigencia ? `${p.vigencia} meses` : "Indefinida",
            requisitos: p.requisitosInscripcion || [],
          };
        });
        setPermisos(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleEstado = (id: string) => {
    setStatus(prev => {
      const current = prev[id] || { estado: "no_iniciado" as Estado, prioridad: "media" as Prioridad };
      const next = { ...current, estado: nextEstado[current.estado] };
      const newStatus = { ...prev, [id]: next };
      saveStatus(newStatus);
      return newStatus;
    });
    setPermisos(prev => prev.map(p => p.permisoId === id ? { ...p, estado: nextEstado[p.estado] } : p));
  };

  const togglePrioridad = (id: string) => {
    setStatus(prev => {
      const current = prev[id] || { estado: "no_iniciado" as Estado, prioridad: "media" as Prioridad };
      const next = { ...current, prioridad: nextPrioridad[current.prioridad] };
      const newStatus = { ...prev, [id]: next };
      saveStatus(newStatus);
      return newStatus;
    });
    setPermisos(prev => prev.map(p => p.permisoId === id ? { ...p, prioridad: nextPrioridad[p.prioridad] } : p));
  };

  const toggleExpanded = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const grouped = permisos.reduce((acc, p) => {
    if (filterEstado !== "todos" && p.estado !== filterEstado) return acc;
    if (filterOrg !== "todos" && p.organismoId !== filterOrg) return acc;
    if (search) {
      const q = search.toLowerCase();
      if (!p.permiso.toLowerCase().includes(q) && !p.descripcion.toLowerCase().includes(q) && !p.organismo.toLowerCase().includes(q)) return acc;
    }
    const key = p.organismoId;
    if (!acc[key]) acc[key] = { organismo: p.organismo, organismoId: p.organismoId, items: [] };
    acc[key].items.push(p);
    return acc;
  }, {} as Record<string, { organismo: string; organismoId: string; items: PermisoEntry[] }>);

  const grupos = Object.values(grouped).sort((a, b) => a.organismo.localeCompare(b.organismo));
  const total = permisos.length;
  const completados = permisos.filter(p => p.estado === "completado").length;
  const pendientes = permisos.filter(p => p.estado === "pendiente").length;
  const criticos = permisos.filter(p => p.estado === "critico").length;
  const noIniciados = permisos.filter(p => p.estado === "no_iniciado").length;
  const alertasActivas = permisos.filter(p => p.estado !== "completado").sort((a, b) => {
    const order: Record<string, number> = { critico: 0, pendiente: 1, no_iniciado: 2 };
    const pa = order[a.estado] ?? 3;
    const pb = order[b.estado] ?? 3;
    if (pa !== pb) return pa - pb;
    const prio: Record<string, number> = { alta: 0, media: 1, baja: 2 };
    return (prio[a.prioridad] ?? 3) - (prio[b.prioridad] ?? 3);
  });
  const totalAlertas = alertasActivas.length;

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <PasswordGate title="Permisos Requeridos — Emprendimiento Carlos Mattar">
    <div className="min-h-screen bg-background text-foreground font-[family-name:var(--font-outfit)]">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0"
             style={{ backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.04)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.04)'} 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="absolute top-[-5%] right-[-5%] w-[700px] h-[700px] bg-amber-600/8 dark:bg-amber-600/8 bg-amber-200/40 blur-[200px] rounded-full" />
        <div className="absolute bottom-[5%] left-[-5%] w-[600px] h-[600px] bg-orange-500/5 dark:bg-orange-500/5 bg-orange-200/30 blur-[180px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-24">
        {!loading && total > 800 && (
          <div className="mb-6 p-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 flex items-start gap-3">
            <Building2 className="h-5 w-5 text-cyan-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-foreground mb-0.5">Catálogo de Permisos Venezuela — {total} registros</p>
              <p className="text-[11px] text-muted-foreground">Matriz completa de todos los permisos, licencias y habilitaciones disponibles para Emprendimiento Carlos Mattar. Haz clic en los badges de estado/prioridad para cambiar su valor.</p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link href="/brand-kit" className="inline-flex items-center gap-2 text-muted-foreground hover:text-amber-500 dark:hover:text-amber-400 transition-colors text-sm font-bold">
            <ArrowLeft className="h-4 w-4" />
            Volver a Brand Kit
          </Link>
        </div>

        <div className={`inline-flex items-center gap-2.5 px-5 py-2 rounded-full border backdrop-blur-md mb-6 ${
          criticos > 0
            ? 'bg-red-500/10 border-red-500/20'
            : totalAlertas > 0
              ? 'bg-amber-500/10 border-amber-500/20'
              : 'bg-emerald-500/10 border-emerald-500/20'
        }`}>
          {criticos > 0
            ? <XCircle className="h-4 w-4 text-red-500" />
            : totalAlertas > 0
              ? <AlertTriangle className="h-4 w-4 text-amber-500" />
              : <CheckCircle className="h-4 w-4 text-emerald-500" />
          }
          <span className={`text-[11px] font-black uppercase tracking-[0.15em] ${
            criticos > 0 ? 'text-red-500' : totalAlertas > 0 ? 'text-amber-500' : 'text-emerald-500'
          }`}>
            {criticos > 0 ? `ALERTA · ${criticos} CRÍTICAS` : totalAlertas > 0 ? `${totalAlertas} PENDIENTES` : 'TODO COMPLETADO'}
          </span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-foreground mb-2">
            Permisos Requeridos —{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Emprendimiento Carlos Mattar</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Matriz completa de permisos, licencias y habilitaciones de Venezuela aplicables a importación y distribución. 
            RIF <strong className="text-foreground">J-50832149-9</strong>.
            {loading && <span className="ml-2 text-amber-500">Cargando catálogo...</span>}
          </p>
        </div>

        <UpdateBanner />

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-center">
            <CheckCircle className="h-6 w-6 text-emerald-500 mx-auto mb-1" />
            <p className="text-2xl font-black text-emerald-500">{completados}</p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Completados</p>
          </div>
          <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 text-center">
            <Clock className="h-6 w-6 text-amber-500 mx-auto mb-1" />
            <p className="text-2xl font-black text-amber-500">{pendientes}</p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Pendientes</p>
          </div>
          <div className="p-4 rounded-2xl border border-red-500/20 bg-red-500/5 text-center">
            <XCircle className="h-6 w-6 text-red-500 mx-auto mb-1" />
            <p className="text-2xl font-black text-red-500">{criticos}</p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Críticos</p>
          </div>
          <div className="p-4 rounded-2xl border border-slate-500/20 bg-slate-500/5 text-center">
            <AlertTriangle className="h-6 w-6 text-slate-400 mx-auto mb-1" />
            <p className="text-2xl font-black text-slate-400">{noIniciados}</p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">No Iniciados</p>
          </div>
        </div>

        {totalAlertas > 0 && (
          <div className={`mb-8 p-5 rounded-2xl border flex items-start gap-3 ${
            criticos > 0
              ? 'border-red-500/20 bg-red-500/5'
              : pendientes > 0
                ? 'border-amber-500/20 bg-amber-500/5'
                : 'border-slate-500/20 bg-slate-500/5'
          }`}>
            {criticos > 0
              ? <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              : <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            }
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground mb-1">
                {criticos > 0
                  ? `Alertas Activas (${criticos} críticas, ${totalAlertas - criticos} pendientes)`
                  : `Permisos Pendientes (${totalAlertas} por gestionar)`
                }
              </p>
              <ul className="space-y-1 text-[12px] text-muted-foreground">
                {alertasActivas.slice(0, 5).map((p, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      p.estado === 'critico' ? 'bg-red-500' :
                      p.estado === 'pendiente' ? 'bg-amber-500' : 'bg-slate-400'
                    }`} />
                    <span className="truncate">
                      <strong>{p.permiso}</strong>
                      <span className="text-muted-foreground/50 mx-1">—</span>
                      {p.organismo}
                    </span>
                  </li>
                ))}
                {totalAlertas > 5 && (
                  <li className="text-[10px] text-muted-foreground/50">
                    ...y {totalAlertas - 5} más
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
            <Input
              placeholder="Buscar permiso, organismo..."
              className="pl-11 h-11 rounded-xl border-border/30 text-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            value={filterOrg}
            onChange={e => setFilterOrg(e.target.value)}
            className="h-11 px-4 rounded-xl border border-border/30 bg-background text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
          >
            <option value="todos">Todos los organismos</option>
            {[...new Set(permisos.map(p => p.organismoId))].sort().map(org => (
              <option key={org} value={org}>{organismosLabel[org] || org}</option>
            ))}
          </select>
          <select
            value={filterEstado}
            onChange={e => setFilterEstado(e.target.value as Estado | "todos")}
            className="h-11 px-4 rounded-xl border border-border/30 bg-background text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
          >
            <option value="todos">Todos los estados</option>
            <option value="completado">Completado</option>
            <option value="pendiente">Pendiente</option>
            <option value="critico">Crítico</option>
            <option value="no_iniciado">No Iniciado</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
              <p className="text-sm text-muted-foreground">Cargando catálogo de permisos...</p>
            </div>
          </div>
        ) : (
          <>
            <p className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-wider mb-4">
              {grupos.reduce((s, g) => s + g.items.length, 0)} permisos en {grupos.length} organismos
            </p>

            <div className="space-y-4">
              {grupos.map(grupo => (
                <div key={grupo.organismoId} className="rounded-2xl border border-border/40 bg-card/30 overflow-hidden">
                  <div className="px-5 py-3 bg-card/50 border-b border-border/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-bold text-foreground">{grupo.organismo}</span>
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground/50 uppercase">{grupo.items.length} permisos</span>
                  </div>
                  <div className="divide-y divide-border/10">
                    {grupo.items.map(p => (
                      <div key={p.permisoId} className="px-5 py-4 hover:bg-card/40 transition-all">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-bold text-foreground mb-0.5">{p.permiso}</h3>
                            <p className="text-[11px] text-muted-foreground/70">{p.descripcion}</p>
                            {expanded.has(p.permisoId) && (
                              <div className="mt-3 space-y-1">
                                {p.baseLegal && <p className="text-[10px] text-muted-foreground/50"><span className="font-bold text-amber-500/70">Base Legal:</span> {p.baseLegal}</p>}
                                <p className="text-[10px] text-muted-foreground/50"><span className="font-bold text-amber-500/70">Vigencia:</span> {p.vigencia}</p>
                                {p.requisitos.length > 0 && (
                                  <details className="mt-2" open>
                                    <summary className="text-[10px] font-bold text-muted-foreground hover:text-foreground cursor-pointer uppercase tracking-wider">Requisitos ({p.requisitos.length})</summary>
                                    <ul className="mt-1 space-y-0.5">
                                      {p.requisitos.map((r, j) => (
                                        <li key={j} className="flex items-start gap-2 text-[10px] text-muted-foreground/60"><span className="text-amber-500/60 mt-0.5 shrink-0">•</span> {r}</li>
                                      ))}
                                    </ul>
                                  </details>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <PrioridadBadge prioridad={p.prioridad} onClick={() => togglePrioridad(p.permisoId)} />
                            <EstadoBadge estado={p.estado} onClick={() => toggleEstado(p.permisoId)} />
                            <button onClick={() => toggleExpanded(p.permisoId)} className="p-1 rounded-lg hover:bg-muted/50 transition-all">
                              {expanded.has(p.permisoId) ? <ChevronDown className="h-4 w-4 text-muted-foreground/40" /> : <ChevronRight className="h-4 w-4 text-muted-foreground/40" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-10 text-center">
          <p className="text-[10px] text-muted-foreground">
            Haz clic en los badges de Estado o Prioridad para cambiarlos. Los cambios se guardan localmente.
          </p>
          <p className="text-[10px] text-muted-foreground mt-1">
            Emprendimiento Carlos Mattar — RIF J-50832149-9 | System Kyron
          </p>
        </div>
      </main>
    </div>
    </PasswordGate>
  );
}
