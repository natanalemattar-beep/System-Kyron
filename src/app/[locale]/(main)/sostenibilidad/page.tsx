
"use client";

import { useState } from "react";
import { 
    Recycle, 
    Leaf, 
    TrendingUp, 
    TreePine, 
    Droplets, 
    MapPin, 
    Coins, 
    ArrowUpRight, 
    ArrowDownRight, 
    RefreshCw, 
    ShieldCheck, 
    Zap, 
    Box,
    Sparkles,
    Search,
    ChevronRight,
    Loader2,
    ArrowRight,
    Smartphone,
    CreditCard,
    Globe,
    Cpu,
    Battery,
    Wifi,
    Download
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription, 
    DialogFooter,
    DialogTrigger
} from "@/components/ui/dialog";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";

// --- Mock Data ---
const evolutionData = [
    { month: "Ene", credits: 850 },
    { month: "Feb", credits: 920 },
    { month: "Mar", credits: 1100 },
    { month: "Abr", credits: 980 },
    { month: "May", credits: 1250 },
    { month: "Jun", credits: 1300 },
];

const distributionData = [
    { name: "Papel", value: 45, color: "#0A2472" },
    { name: "Plástico", value: 30, color: "#00A86B" },
    { name: "Vidrio", value: 15, color: "#0ea5e9" },
    { name: "Metal", value: 10, color: "#f97316" },
];

const recyclingHistory = [
    { id: 1, fecha: "15/03/2026", tipo: "Papel", peso: "2.5 kg", ecr: "+50", bin: "Ameru IA - Sede A" },
    { id: 2, fecha: "12/03/2026", tipo: "Plástico", peso: "1.8 kg", ecr: "+36", bin: "Ameru IA - Sede B" },
    { id: 3, fecha: "10/03/2026", tipo: "Vidrio", peso: "3.2 kg", ecr: "+64", bin: "Ameru IA - Sede A" },
];

const chartConfig = {
    credits: { label: "Eco-Créditos", color: "hsl(var(--secondary))" },
} satisfies ChartConfig;

export default function SostenibilidadPage() {
    const { toast } = useToast();
    const [balance, setBalance] = useState(12450);

    return (
        <div className="space-y-12 pb-20 px-6 md:px-10">
            {/* --- Header --- */}
            <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-secondary pl-8 py-2 mt-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20 text-[9px] font-black uppercase tracking-[0.4em] text-secondary shadow-glow-secondary mb-4">
                        <Leaf className="h-3 w-3" /> ÁREA SUSTENTABLE
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow text-white">Impacto <span className="text-secondary italic">Ambiental</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">Gestión de Activos Verdes • Ameru IA Ecosystem 2026</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/5 text-foreground" onClick={() => window.print()}>
                        <Download className="mr-2 h-4 w-4" /> Exportar Ledger
                    </Button>
                </div>
            </header>

            {/* --- Hero Ameru IA --- */}
            <Card className="glass-card border-none bg-gradient-to-br from-emerald-600/20 via-black to-black p-1 shadow-2xl rounded-[3.5rem] overflow-hidden group">
                <div className="p-8 md:p-12 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <Badge className="bg-secondary text-white border-none text-[8px] font-black px-4 py-1 uppercase tracking-[0.4em] shadow-glow-secondary">Hardware Avanzado</Badge>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white leading-none">AMERU <span className="text-secondary">IA</span></h2>
                            <p className="text-lg font-medium italic text-white/60 leading-relaxed uppercase">La papelera inteligente definitiva para el sector privado venezolano.</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-secondary">
                                    <Zap className="h-4 w-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Inducción Magnética</span>
                                </div>
                                <p className="text-[9px] font-bold text-white/30 uppercase leading-snug">Clasificación síncrona de metales y polímeros.</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-secondary">
                                    <Cpu className="h-4 w-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Inferencia Edge</span>
                                </div>
                                <p className="text-[9px] font-bold text-white/30 uppercase leading-snug">Visión artificial para validación de pesaje en tiempo real.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button className="btn-3d-secondary h-14 px-10 rounded-2xl font-black text-xs uppercase tracking-widest">ORDENAR DISPOSITIVO</Button>
                            <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/10 bg-white/5 text-white font-black text-[10px] uppercase tracking-widest">FICHA TÉCNICA</Button>
                        </div>
                    </div>

                    <div className="relative aspect-square md:aspect-video rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/[0.02] shadow-inner flex items-center justify-center group-hover:bg-white/[0.05] transition-all duration-1000">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,168,107,0.1)_0,transparent_70%)]" />
                        <div className="relative z-10 text-center space-y-6">
                            <Recycle className="h-32 w-32 md:h-48 md:w-48 text-secondary/20 animate-spin-slow" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Logo className="h-16 w-16 md:h-24 md:w-24 drop-shadow-glow-secondary" />
                            </div>
                            <div className="flex justify-center gap-8 text-[9px] font-black uppercase tracking-[0.5em] text-white/10">
                                <span className="flex items-center gap-2"><Battery className="h-3 w-3" /> 100% SOLAR</span>
                                <span className="flex items-center gap-2"><Wifi className="h-3 w-3" /> 5G NATIVE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* --- KPIs --- */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: "Saldo Eco-Créditos", val: `${balance.toLocaleString()} ECR`, icon: Coins, color: "text-secondary", desc: "Listos para canje" },
                    { label: "CO₂ Mitigado", val: "340 KG", icon: Droplets, color: "text-blue-400", desc: "Impacto certificado" },
                    { label: "Nodos Ameru IA", val: "12 ACTIVOS", icon: MapPin, color: "text-emerald-500", desc: "Red La Guaira" },
                    { label: "Eficiencia Clasif.", val: "98.4%", icon: ShieldCheck, color: "text-primary", desc: "Score de precisión" }
                ].map((kpi, i) => (
                    <Card key={i} className="glass-card border-none bg-card/40 p-6 rounded-[2rem] shadow-xl group hover:scale-[1.02] transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">{kpi.label}</p>
                            <div className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover:bg-white/10 transition-all">
                                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                            </div>
                        </div>
                        <p className="text-3xl font-black italic text-white tracking-tighter mb-2">{kpi.val}</p>
                        <p className="text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest">{kpi.desc}</p>
                    </Card>
                ))}
            </div>

            {/* --- Main Analytics --- */}
            <div className="grid gap-10 lg:grid-cols-12">
                <Card className="lg:col-span-8 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                    <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                        <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-secondary italic">Historial de Inyección Ameru IA</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/30 border-none">
                                    <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Fecha / Nodo</TableHead>
                                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Activo</TableHead>
                                    <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Peso</TableHead>
                                    <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Recompensa ECR</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recyclingHistory.map((row) => (
                                    <TableRow key={row.id} className="border-border/50 hover:bg-muted/20 transition-all group">
                                        <TableCell className="pl-10 py-6">
                                            <p className="font-black text-xs text-foreground/80 uppercase italic group-hover:text-secondary transition-colors">{row.bin}</p>
                                            <p className="text-[8px] font-bold text-muted-foreground uppercase">{row.fecha}</p>
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <Badge variant="outline" className="text-[8px] font-black uppercase border-secondary/20 text-secondary bg-secondary/5">{row.tipo}</Badge>
                                        </TableCell>
                                        <TableCell className="text-center py-6 font-mono text-xs font-bold text-foreground/60">{row.peso}</TableCell>
                                        <TableCell className="text-right pr-10 py-6 font-black text-lg text-secondary italic tracking-tighter">{row.ecr}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className="p-10 bg-secondary/5 border-t border-border flex justify-between items-center">
                        <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40 italic">
                            <Terminal className="h-4 w-4" /> Sello Inmutable Blockchain RFC 3161
                        </div>
                        <Button variant="outline" className="h-10 px-6 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest">Ver Ledger Completo</Button>
                    </CardFooter>
                </Card>

                <div className="lg:col-span-4 space-y-10">
                    <Card className="bg-secondary text-secondary-foreground rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-glow-secondary border-none group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Coins className="h-32 w-32" /></div>
                        <div>
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6">Canje de Activos</h3>
                            <p className="text-sm font-bold opacity-80 leading-relaxed uppercase mb-8">Utilice sus Eco-Créditos acumulados para liquidar facturas de telecomunicaciones o inyectar liquidez a su cuenta bancaria.</p>
                        </div>
                        <Button variant="secondary" className="w-full h-12 bg-white text-secondary font-black uppercase text-[10px] tracking-widest rounded-xl shadow-2xl">ACCEDER AL EXCHANGE</Button>
                    </Card>

                    <Card className="glass-card border-none p-10 rounded-[3rem] bg-card/40 shadow-2xl">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-secondary mb-10 flex items-center gap-3 italic">
                            <Activity className="h-4 w-4" /> Telemetría Ameru IA
                        </h4>
                        <div className="space-y-6">
                            {[
                                { label: "Disponibilidad", val: "92%", color: "text-emerald-500" },
                                { label: "Capacidad de Red", val: "5G ACTIVA", color: "text-blue-400" },
                                { label: "Mantenimiento", val: "AL DÍA", color: "text-secondary" }
                            ].map((stat, i) => (
                                <div key={i} className="flex justify-between items-end border-b border-border pb-4 last:border-none">
                                    <span className="text-[9px] font-bold text-muted-foreground uppercase">{stat.label}</span>
                                    <span className={cn("text-xs font-black italic uppercase", stat.color)}>{stat.val}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
