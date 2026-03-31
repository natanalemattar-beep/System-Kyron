
"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Signal, Users, Activity, DollarSign, TriangleAlert as AlertTriangle, ArrowLeft, Download, Search, MoveHorizontal as MoreHorizontal, CircleCheck as CheckCircle, CirclePlus as PlusCircle, FileText, Zap, Clock, ShieldCheck, ChartBar as BarChart3, Terminal, Smartphone, Shield, Printer, Recycle, ExternalLink } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Link } from "@/navigation";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const lineas = [
  { id: "L1", empleado: "Carlos Pérez", depto: "Ventas", numero: "+58 412-1234567", plan: "Ilimitado", consumo: 12.5, limite: 30, estado: "Activa" },
  { id: "L2", empleado: "María Gómez", depto: "Marketing", numero: "+58 414-7654321", plan: "20GB", consumo: 18.2, limite: 20, estado: "Activa" },
  { id: "L3", empleado: "Juan Rodríguez", depto: "IT", numero: "+58 416-9876543", plan: "30GB", consumo: 5.3, limite: 30, estado: "Activa" },
  { id: "L4", empleado: "Ana Fernández", depto: "RR.HH.", numero: "+58 424-5551234", plan: "10GB", consumo: 9.8, limite: 10, estado: "Activa" },
  { id: "L5", empleado: "Luis Martínez", depto: "Ventas", numero: "+58 426-1112223", plan: "Ilimitado", consumo: 45.0, limite: 50, estado: "Activa" },
];

const chartData = [
  { month: "Oct", gb: 280 },
  { month: "Nov", gb: 310 },
  { month: "Dic", gb: 345 },
  { month: "Ene", gb: 320 },
  { month: "Feb", gb: 335 },
  { month: "Mar", gb: 345 },
];

const chartConfig = {
  gb: { label: "Consumo (GB)", color: "#00A86B" },
} satisfies ChartConfig;

export default function FlotaEmpresarialPage() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");

    const handleAction = (msg: string) => {
        toast({
            title: "COMANDO RECIBIDO",
            description: msg,
            action: <CheckCircle className="h-4 w-4 text-[#00A86B]" />
        });
    };

    return (
        <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen font-sans text-foreground">
            {/* --- HEADER --- */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-10 border-l-8 border-primary pl-6 md:pl-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-sm mb-4">
                        <Signal className="h-3 w-3" /> ÁREA CORPORATIVA
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary uppercase leading-none">Gestión <span className="text-secondary italic">de Flota</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-60 mt-2 italic">MI LÍNEA 5G • Control Maestro Empresarial</p>
                </div>
                <div className="flex gap-3 no-print">
                    <Button variant="outline" asChild className="h-12 px-6 rounded-xl border-border bg-card text-primary text-[10px] font-black uppercase tracking-widest hover:bg-muted/50 transition-all">
                        <Link href="/login-linea"><ArrowLeft className="mr-3 h-4 w-4" /> VOLVER</Link>
                    </Button>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">
                        <Download className="mr-3 h-4 w-4" /> EXPORTAR EXCEL
                    </Button>
                </div>
            </header>

            {/* --- KPIs --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Líneas Activas", val: "24", icon: Users, color: "text-primary", accent: "from-primary/20 to-primary/0", iconBg: "bg-primary/10", ring: "ring-primary/20" },
                    { label: "Consumo Mes", val: "345 GB", icon: Activity, color: "text-secondary", accent: "from-secondary/20 to-secondary/0", iconBg: "bg-secondary/10", ring: "ring-secondary/20" },
                    { label: "Gasto Acumulado", val: "$ 1.245,00", icon: DollarSign, color: "text-kyron-gold", accent: "from-kyron-gold/20 to-kyron-gold/0", iconBg: "bg-kyron-gold/10", ring: "ring-kyron-gold/20" },
                    { label: "Alertas Críticas", val: "3", icon: AlertTriangle, color: "text-rose-500", accent: "from-rose-500/20 to-rose-500/0", iconBg: "bg-rose-500/10", ring: "ring-rose-500/20" },
                ].map((stat, i) => (
                    <div key={i} className={cn("kyron-surface p-6 rounded-2xl ring-1 relative overflow-hidden group hover:-translate-y-0.5 transition-all duration-300", stat.ring)}>
                        <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r", stat.accent)} />
                        <div className={cn("absolute -top-6 -right-6 w-16 h-16 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity bg-gradient-to-br", stat.accent)} />
                        <div className="flex items-center justify-between mb-4 relative">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                            <div className={cn("p-2 rounded-xl", stat.iconBg)}>
                                <stat.icon className={cn("h-3.5 w-3.5", stat.color)} />
                            </div>
                        </div>
                        <p className={cn("text-2xl font-black italic tracking-tight relative", stat.color)}>{stat.val}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* --- GRÁFICO DE CONSUMO --- */}
                <Card className="lg:col-span-8 border-none shadow-sm rounded-[2.5rem] bg-card overflow-hidden flex flex-col">
                    <CardHeader className="p-10 border-b border-border/30 flex flex-row justify-between items-center bg-muted/10">
                        <div>
                            <CardTitle className="text-xl font-black uppercase italic tracking-tight text-primary">Evolución de Consumo</CardTitle>
                            <CardDescription className="text-[10px] font-bold uppercase text-muted-foreground mt-1">Tráfico de datos consolidado (Últimos 6 meses)</CardDescription>
                        </div>
                        <BarChart3 className="h-6 w-6 text-secondary opacity-30" />
                    </CardHeader>
                    <CardContent className="p-10 flex-grow h-[350px]">
                        <ChartContainer config={chartConfig} className="w-full h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorGb" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.25}/>
                                            <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.08)" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-muted-foreground" fontSize={10} fontWeight="900" />
                                    <YAxis axisLine={false} tickLine={false} className="text-muted-foreground" fontSize={10} fontWeight="900" />
                                    <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                                    <Area type="monotone" dataKey="gb" stroke="hsl(var(--secondary))" strokeWidth={4} fillOpacity={1} fill="url(#colorGb)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* --- FACTURACIÓN CONSOLIDADA --- */}
                <Card className="lg:col-span-4 border-none shadow-xl rounded-[2.5rem] bg-primary text-primary-foreground p-10 flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-all duration-1000">
                        <FileText className="h-48 w-48" />
                    </div>
                    <div className="relative z-10 space-y-8">
                        <div>
                            <h3 className="text-3xl font-black uppercase italic tracking-tight leading-none mb-2">Facturación <br/> <span className="text-secondary">Marzo 2026</span></h3>
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Resumen Maestro de Egresos</p>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                                <p className="text-[9px] font-black uppercase text-secondary mb-2 tracking-widest">Total a Pagar</p>
                                <p className="text-4xl font-black italic tracking-tight">$ 1.245,00</p>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                                <span>Vencimiento:</span>
                                <span>15 / 04 / 2026</span>
                            </div>
                        </div>

                        <Button className="w-full h-14 rounded-2xl bg-secondary text-secondary-foreground hover:bg-secondary/90 font-black uppercase text-xs tracking-widest shadow-2xl transition-all" onClick={() => handleAction("Generando factura digital (.pdf)...")}>
                            DESCARGAR FACTURA
                        </Button>
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/5 relative z-10 flex items-center justify-center gap-3">
                        <ShieldCheck className="h-4 w-4 text-secondary" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">Pago Seguro Certificado</span>
                    </div>
                </Card>
            </div>

            {/* --- GESTIÓN DE FLOTA --- */}
            <Card className="border-none shadow-sm rounded-[3rem] bg-card overflow-hidden">
                <CardHeader className="p-10 border-b border-border/30 flex flex-col md:flex-row justify-between items-center bg-muted/10">
                    <div className="space-y-1 text-center md:text-left">
                        <CardTitle className="text-2xl font-black uppercase italic tracking-tight text-primary">Listado de Líneas Corporativas</CardTitle>
                        <CardDescription className="text-[10px] font-bold uppercase text-muted-foreground">Control individual de activos móviles</CardDescription>
                    </div>
                    <div className="relative w-full md:w-80 mt-6 md:mt-0">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                        <Input placeholder="Buscar por empleado o número..." className="pl-12 h-12 rounded-xl bg-card border-border text-xs font-bold uppercase tracking-widest" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/20 border-none">
                                <TableHead className="pl-10 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Empleado / Depto</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Número</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Plan</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Consumo (GB)</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Límite</TableHead>
                                <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Estado</TableHead>
                                <TableHead className="text-right pr-10 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {lineas.map((l) => {
                                const isExceeded = l.consumo > l.limite * 0.9;
                                return (
                                <TableRow key={l.id} className="border-border/30 hover:bg-muted/10 transition-all group">
                                    <TableCell className="pl-10 py-6">
                                        <p className="font-black text-xs text-foreground uppercase italic group-hover:text-primary transition-colors">{l.empleado}</p>
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{l.depto}</p>
                                    </TableCell>
                                    <TableCell className="text-center font-mono text-xs font-bold text-primary">{l.numero}</TableCell>
                                    <TableCell className="text-[10px] font-black uppercase text-muted-foreground">{l.plan}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="space-y-1">
                                            <p className={cn("font-black text-xs italic", isExceeded ? "text-rose-500" : "text-secondary")}>{l.consumo} / {l.limite} GB</p>
                                            <div className="h-1 w-full bg-muted/30 rounded-full overflow-hidden">
                                                <div className={cn("h-full", isExceeded ? "bg-rose-500" : "bg-secondary")} style={{ width: `${(l.consumo / l.limite) * 100}%` }} />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {isExceeded ? (
                                            <Badge variant="destructive" className="text-[8px] font-black uppercase bg-rose-500/10 text-rose-500 border-rose-500/20 px-3">EXCEDIDO</Badge>
                                        ) : (
                                            <Badge variant="outline" className="text-[8px] font-black uppercase text-secondary border-secondary/20 px-3">NORMAL</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-secondary shadow-glow-secondary animate-pulse" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{l.estado}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-10">
                                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-primary" onClick={() => handleAction(`Editando línea de ${l.empleado}...`)}>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="p-10 border-t border-border/30 bg-muted/10 flex justify-between items-center">
                    <div className="flex items-center gap-4 text-[9px] font-black text-muted-foreground uppercase tracking-[0.4em] italic">
                        <Terminal className="h-4 w-4 text-primary" /> Protocolo de Gestión de Red GSMA
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-xl h-10 px-6 text-[9px] font-black uppercase tracking-widest border-border" onClick={() => handleAction("Abriendo gestor de límites...")}>Ajustar Límites</Button>
                        <Button className="rounded-xl h-10 px-8 btn-3d-secondary font-black uppercase text-[9px] tracking-widest" onClick={() => handleAction("Abriendo modal de recarga masiva...")}>Recarga Masiva</Button>
                    </div>
                </CardFooter>
            </Card>

            {/* ===== GESTIÓN DE HOMOLOGACIÓN POR IMEI ===== */}
            <Card className="border-none shadow-sm rounded-[3rem] bg-card overflow-hidden">
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
                                <CardTitle className="text-2xl font-black uppercase italic tracking-tight text-primary">
                                    Gestión de Homologación por IMEI
                                </CardTitle>
                                <CardDescription className="text-[10px] font-bold uppercase text-muted-foreground mt-1 tracking-widest">
                                    Verificación CONATEL · Flota Corporativa
                                </CardDescription>
                            </div>
                        </div>
                        <div className="md:ml-auto">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/10 border border-secondary/30 text-[10px] font-black uppercase tracking-widest text-secondary">
                                <Shield className="h-3.5 w-3.5 text-secondary" />
                                IMEI HOMOLOGADO ✅
                            </span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-10">
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                        Antes de activar cualquier línea corporativa, verificamos el IMEI de cada equipo contra la base de CONATEL.
                        Garantizamos que todos los teléfonos de tu flota estén homologados, evitando bloqueos masivos.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 mb-10">
                        {[
                            { text: "Verificación automática de IMEI", icon: CheckCircle },
                            { text: "Reporte mensual de equipos homologados por empleado", icon: FileText },
                            { text: "Gestión centralizada: altas, bajas y cambios de equipo sin perder la línea", icon: ShieldCheck },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-muted/20 border border-border/40 group hover:border-secondary/30 hover:bg-secondary/5 transition-all">
                                <item.icon className="h-5 w-5 text-secondary shrink-0 mt-0.5 drop-shadow-[0_0_6px_hsl(var(--secondary))]" />
                                <p className="text-xs font-bold text-foreground uppercase tracking-tight">{item.text}</p>
                            </div>
                        ))}
                    </div>
                    <Button
                        className="h-12 px-8 rounded-xl font-black uppercase text-[10px] tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl transition-all"
                        onClick={() => toast({ title: "SOLICITUD PROCESADA", description: "Su solicitud de flota ha sido registrada." })}
                    >
                        <Shield className="mr-3 h-4 w-4" />
                        Verificar Flota
                    </Button>
                </CardContent>
            </Card>

            {/* ===== ALIADOS ESTRATÉGICOS ===== */}
            <section className="space-y-10">
                <div className="text-center space-y-3 pt-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-2">
                        <ExternalLink className="h-3 w-3" /> Aliados Estratégicos
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tight text-primary">
                        Trabajamos con los <span className="text-secondary">mejores fabricantes</span>
                    </h2>
                    <p className="text-muted-foreground text-sm font-medium max-w-xl mx-auto">
                        Equipos homologados, soporte garantizado y precios corporativos.
                    </p>
                </div>

                {/* Teléfonos y Tablets */}
                <div className="space-y-5">
                    <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-primary" />
                        <h3 className="text-sm font-black uppercase tracking-[0.4em] text-primary">Teléfonos y Tablets</h3>
                        <div className="flex-1 h-px bg-border" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {["Samsung", "Xiaomi", "Motorola", "Huawei", "Apple"].map((brand) => (
                            <div
                                key={brand}
                                title="Equipo homologado – Consultar disponibilidad"
                                className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border/40 shadow-sm hover:shadow-md hover:border-secondary/30 hover:scale-[1.02] transition-all cursor-pointer"
                            >
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Smartphone className="h-6 w-6 text-primary opacity-60" />
                                </div>
                                <p className="text-xs font-black uppercase tracking-widest text-foreground">{brand}</p>
                                <span className="text-[8px] font-black uppercase px-2 py-1 rounded-md border tracking-wider text-secondary border-secondary/25 bg-secondary/5">
                                    ✅ Homologado CONATEL
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Máquinas Fiscales */}
                <div className="space-y-5">
                    <div className="flex items-center gap-3">
                        <Printer className="h-5 w-5 text-primary" />
                        <h3 className="text-sm font-black uppercase tracking-[0.4em] text-primary">Máquinas Fiscales e Impresoras</h3>
                        <div className="flex-1 h-px bg-border" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {["The Factory HKA", "Epson", "Hasar", "Bixolon"].map((brand) => (
                            <div
                                key={brand}
                                title="Equipo homologado – Consultar disponibilidad"
                                className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border/40 shadow-sm hover:shadow-md hover:border-amber-300/40 hover:scale-[1.02] transition-all cursor-pointer"
                            >
                                <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                    <Printer className="h-6 w-6 text-amber-500 opacity-80" />
                                </div>
                                <p className="text-xs font-black uppercase tracking-widest text-foreground text-center leading-tight">{brand}</p>
                                <span className="text-[8px] font-black uppercase px-2 py-1 rounded-md border tracking-wider text-amber-500 bg-amber-500/10 border-amber-500/25">
                                    ✅ Compatible SENIAT
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Papeleras Inteligentes */}
                <div className="space-y-5">
                    <div className="flex items-center gap-3">
                        <Recycle className="h-5 w-5 text-emerald-500" />
                        <h3 className="text-sm font-black uppercase tracking-[0.4em] text-primary">Papeleras Inteligentes</h3>
                        <div className="flex-1 h-px bg-border" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div
                            title="Equipo homologado – Consultar disponibilidad"
                            className="group flex flex-col gap-4 p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-card border border-emerald-500/15 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer col-span-1 sm:col-span-2 lg:col-span-1"
                        >
                            <div className="flex items-center justify-between">
                                <div className="h-12 w-12 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                                    <Recycle className="h-6 w-6 text-emerald-500" />
                                </div>
                                <span className="text-[8px] font-black uppercase px-3 py-1.5 rounded-md border tracking-wider text-emerald-500 bg-emerald-500/10 border-emerald-500/25">
                                    🤝 Alianza en Desarrollo
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-black uppercase tracking-widest text-foreground">Ameru.AI</p>
                                <p className="text-xs font-medium text-muted-foreground mt-2 leading-relaxed">
                                    Tecnología de inducción magnética y visión artificial, 99% precisión.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center pt-4">
                    <Button
                        className="h-14 px-12 rounded-2xl font-black uppercase text-xs tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl transition-all"
                        onClick={() => toast({ title: "SOLICITUD PROCESADA", description: "Su solicitud de flota ha sido registrada." })}
                    >
                        <ExternalLink className="mr-3 h-4 w-4" />
                        Ver Catálogo Completo de Equipos
                    </Button>
                </div>
            </section>

            <footer className="text-center pt-10 border-t border-border/30">
                <p className="text-[10px] font-black uppercase tracking-[1em] text-muted-foreground/40 italic">SYSTEM KYRON • CORPORATE FLEET CONTROL • 2026</p>
            </footer>
        </div>
    );
}
