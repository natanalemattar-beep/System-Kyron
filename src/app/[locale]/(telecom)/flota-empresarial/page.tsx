
"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Signal, Users, Activity, DollarSign, TriangleAlert as AlertTriangle, ArrowLeft, Download, Search, CircleCheck as CheckCircle, CirclePlus as PlusCircle, FileText, Zap, ShieldCheck, ChartBar as BarChart3, Terminal, Smartphone, Shield, Printer, Recycle, ExternalLink, Loader2, Inbox } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "@/navigation";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ConatelCompliancePanel } from "@/components/telecom/conatel-compliance-panel";
import { ReservaDatosPanel } from "@/components/telecom/reserva-datos-panel";

interface LineaTelecom {
  id: number;
  numero: string;
  operadora: string;
  tipo_linea: string;
  titular: string | null;
  cedula_titular: string | null;
  plan_contratado: string | null;
  monto_plan: string;
  moneda_plan: string;
  activa: boolean;
  uso_datos_gb: string;
  limite_datos_gb: string | null;
}

interface TelecomStats {
  total: number;
  activas: number;
  gastoTotal: number;
  alertas: number;
}

export default function FlotaEmpresarialPage() {
    const { toast } = useToast();
    const [lineas, setLineas] = useState<LineaTelecom[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const loadData = useCallback(() => {
        setLoading(true);
        fetch('/api/telecom')
            .then(r => r.ok ? r.json() : { lineas: [] })
            .then(d => setLineas(d.lineas ?? []))
            .catch(() => setLineas([]))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => { loadData(); }, [loadData]);

    const filtered = lineas.filter(l =>
        !searchTerm ||
        l.titular?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.numero.includes(searchTerm) ||
        l.operadora.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats: TelecomStats = {
        total: lineas.length,
        activas: lineas.filter(l => l.activa).length,
        gastoTotal: lineas.reduce((s, l) => s + (parseFloat(l.monto_plan) || 0), 0),
        alertas: lineas.filter(l => {
            const uso = parseFloat(l.uso_datos_gb) || 0;
            const limite = parseFloat(l.limite_datos_gb ?? '0') || 0;
            return limite > 0 && uso / limite > 0.9;
        }).length,
    };

    return (
        <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen font-sans text-foreground">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-10 border-l-8 border-primary pl-6 md:pl-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wider text-primary shadow-sm mb-4">
                        <Signal className="h-3 w-3" /> ÁREA CORPORATIVA
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary uppercase leading-none">Gestión <span className="text-secondary italic">de Flota</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-60 mt-2 italic">MI LÍNEA 5G • Control Central de Flota</p>
                </div>
                <div className="flex gap-3 no-print">
                    <Button variant="outline" asChild className="h-12 px-6 rounded-xl border-border bg-card text-primary text-[10px] font-semibold uppercase tracking-widest hover:bg-muted/50 transition-all">
                        <Link href="/login-linea"><ArrowLeft className="mr-3 h-4 w-4" /> VOLVER</Link>
                    </Button>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-10 rounded-xl font-semibold text-[10px] uppercase tracking-widest shadow-xl" onClick={() => toast({ title: "Exportando...", description: "Preparando reporte Excel de la flota." })}>
                        <Download className="mr-3 h-4 w-4" /> EXPORTAR EXCEL
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Líneas Activas", val: loading ? "—" : String(stats.activas), icon: Users, color: "text-primary", accent: "from-primary/20 to-primary/0", iconBg: "bg-primary/10", ring: "ring-primary/20" },
                    { label: "Total Líneas", val: loading ? "—" : String(stats.total), icon: Activity, color: "text-secondary", accent: "from-secondary/20 to-secondary/0", iconBg: "bg-secondary/10", ring: "ring-secondary/20" },
                    { label: "Gasto Total", val: loading ? "—" : formatCurrency(stats.gastoTotal, 'USD'), icon: DollarSign, color: "text-amber-500", accent: "from-amber-500/20 to-amber-500/0", iconBg: "bg-amber-500/10", ring: "ring-amber-500/20" },
                    { label: "Alertas Críticas", val: loading ? "—" : String(stats.alertas), icon: AlertTriangle, color: stats.alertas > 0 ? "text-rose-500" : "text-emerald-500", accent: stats.alertas > 0 ? "from-rose-500/20 to-rose-500/0" : "from-emerald-500/20 to-emerald-500/0", iconBg: stats.alertas > 0 ? "bg-rose-500/10" : "bg-emerald-500/10", ring: stats.alertas > 0 ? "ring-rose-500/20" : "ring-emerald-500/20" },
                ].map((stat, i) => (
                    <div key={i} className={cn("kyron-surface p-6 rounded-2xl ring-1 relative overflow-hidden group hover:-translate-y-0.5 transition-all duration-300", stat.ring)}>
                        <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r", stat.accent)} />
                        <div className="flex items-center justify-between mb-4 relative">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                            <div className={cn("p-2 rounded-xl", stat.iconBg)}>
                                <stat.icon className={cn("h-3.5 w-3.5", stat.color)} />
                            </div>
                        </div>
                        <p className={cn("text-2xl font-bold tracking-tight relative", stat.color)}>{stat.val}</p>
                    </div>
                ))}
            </div>

            <Card className="border-none shadow-sm rounded-2xl bg-card overflow-hidden">
                <CardHeader className="p-10 border-b border-border/30 flex flex-col md:flex-row justify-between items-center bg-muted/10">
                    <div className="space-y-1 text-center md:text-left">
                        <CardTitle className="text-2xl font-semibold uppercase italic tracking-tight text-primary">Listado de Líneas Corporativas</CardTitle>
                        <CardDescription className="text-[10px] font-bold uppercase text-muted-foreground">Control individual de activos móviles</CardDescription>
                    </div>
                    <div className="flex items-center gap-3 mt-6 md:mt-0">
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                            <Input placeholder="Buscar por titular o número..." className="pl-12 h-12 rounded-xl bg-card border-border text-xs font-bold uppercase tracking-widest" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                        <Button asChild className="h-12 px-6 rounded-xl btn-3d-primary font-semibold text-[10px] uppercase tracking-widest whitespace-nowrap">
                            <Link href="/mi-linea"><PlusCircle className="mr-2 h-4 w-4" /> AGREGAR</Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span className="text-sm font-semibold uppercase tracking-widest">Cargando flota...</span>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
                            <Inbox className="h-12 w-12 opacity-30" />
                            <p className="text-sm font-semibold uppercase tracking-widest">Sin líneas registradas</p>
                            <p className="text-xs text-muted-foreground/60 text-center max-w-sm">Aún no has registrado líneas en tu flota empresarial. Agrega la primera desde el panel de Mi Línea.</p>
                            <Button asChild size="sm" className="mt-2 rounded-xl">
                                <Link href="/mi-linea"><PlusCircle className="mr-2 h-3.5 w-3.5" /> Registrar Línea</Link>
                            </Button>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/20 border-none">
                                    <TableHead className="pl-10 py-5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Titular / Operadora</TableHead>
                                    <TableHead className="py-5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground text-center">Número</TableHead>
                                    <TableHead className="py-5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Plan</TableHead>
                                    <TableHead className="py-5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground text-right">Uso Datos</TableHead>
                                    <TableHead className="py-5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground text-center">Estado</TableHead>
                                    <TableHead className="text-right pr-10 py-5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Monto</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map((l) => {
                                    const uso = parseFloat(l.uso_datos_gb) || 0;
                                    const limite = parseFloat(l.limite_datos_gb ?? '0') || 0;
                                    const isExceeded = limite > 0 && uso / limite > 0.9;
                                    return (
                                    <TableRow key={l.id} className="border-border/30 hover:bg-muted/10 transition-all group">
                                        <TableCell className="pl-10 py-6">
                                            <p className="font-semibold text-xs text-foreground uppercase italic group-hover:text-primary transition-colors">{l.titular ?? 'Sin asignar'}</p>
                                            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{l.operadora} · {l.tipo_linea}</p>
                                        </TableCell>
                                        <TableCell className="text-center font-mono text-xs font-bold text-primary">{l.numero}</TableCell>
                                        <TableCell className="text-[10px] font-semibold uppercase text-muted-foreground">{l.plan_contratado ?? '—'}</TableCell>
                                        <TableCell className="text-right">
                                            {limite > 0 ? (
                                                <div className="space-y-1">
                                                    <p className={cn("font-semibold text-xs italic", isExceeded ? "text-rose-500" : "text-secondary")}>{uso.toFixed(1)} / {limite} GB</p>
                                                    <div className="h-1 w-full bg-muted/30 rounded-full overflow-hidden">
                                                        <div className={cn("h-full", isExceeded ? "bg-rose-500" : "bg-secondary")} style={{ width: `${Math.min((uso / limite) * 100, 100)}%` }} />
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-muted-foreground">{uso.toFixed(1)} GB</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {l.activa ? (
                                                <Badge variant="outline" className="text-[10px] font-semibold uppercase text-secondary border-secondary/20 px-3">ACTIVA</Badge>
                                            ) : (
                                                <Badge variant="destructive" className="text-[10px] font-semibold uppercase px-3">INACTIVA</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right pr-10 font-mono text-xs font-bold text-foreground">
                                            {formatCurrency(parseFloat(l.monto_plan) || 0, l.moneda_plan as 'USD' | 'Bs.')}
                                        </TableCell>
                                    </TableRow>
                                )})}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
                <CardFooter className="p-10 border-t border-border/30 bg-muted/10 flex justify-between items-center">
                    <div className="flex items-center gap-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider italic">
                        <Terminal className="h-4 w-4 text-primary" /> Protocolo de Gestión de Red GSMA
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-xl h-10 px-6 text-[11px] font-semibold uppercase tracking-widest border-border" onClick={() => toast({ title: "Redirigiendo...", description: "Abriendo gestor de límites corporativos." })}>Ajustar Límites</Button>
                    </div>
                </CardFooter>
            </Card>

            <Card className="border-none shadow-sm rounded-2xl bg-card overflow-hidden">
                <CardHeader className="p-10 border-b border-border/30 bg-gradient-to-r from-primary/5 to-transparent">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="flex items-center gap-5">
                            <div className="relative p-4 rounded-2xl bg-primary">
                                <Smartphone className="h-8 w-8 text-primary-foreground" />
                                <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary flex items-center justify-center">
                                    <CheckCircle className="h-3 w-3 text-primary" />
                                </div>
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-semibold uppercase italic tracking-tight text-primary">Gestión de Homologación por IMEI</CardTitle>
                                <CardDescription className="text-[10px] font-bold uppercase text-muted-foreground mt-1 tracking-widest">Verificación CONATEL · Flota Corporativa</CardDescription>
                            </div>
                        </div>
                        <div className="md:ml-auto">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/10 border border-secondary/30 text-[10px] font-semibold uppercase tracking-widest text-secondary">
                                <Shield className="h-3.5 w-3.5 text-secondary" /> IMEI HOMOLOGADO ✅
                            </span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-10">
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                        Antes de activar cualquier línea corporativa, verificamos el IMEI de cada equipo contra la base de CONATEL.
                        Garantizamos que todos los teléfonos de tu flota estén homologados, evitando bloqueos masivos.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { text: "Verificación automática de IMEI", icon: CheckCircle },
                            { text: "Reporte mensual de equipos homologados por empleado", icon: FileText },
                            { text: "Gestión centralizada: altas, bajas y cambios de equipo sin perder la línea", icon: ShieldCheck },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-muted/20 border border-border/40 group hover:border-secondary/30 hover:bg-secondary/5 transition-all">
                                <item.icon className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                                <p className="text-xs font-bold text-foreground uppercase tracking-tight">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <ConatelCompliancePanel />
            <ReservaDatosPanel />
        </div>
    );
}
