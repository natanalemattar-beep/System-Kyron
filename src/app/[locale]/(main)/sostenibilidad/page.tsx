
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
    Download, 
    Share2, 
    Award, 
    CheckCircle, 
    Activity, 
    Lock,
    Zap,
    Filter,
    FileText,
    QrCode,
    Sparkles,
    Search,
    ChevronRight,
    Loader2,
    ArrowRight
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line 
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription, 
    DialogFooter 
} from "@/components/ui/dialog";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// --- Mock Data ---
const kpiData = [
    { title: "Saldo Eco-Créditos", value: "1,250 ECR", icon: Coins, color: "text-secondary", bg: "bg-secondary/10", desc: "+120 esta semana" },
    { title: "CO₂ Evitado", value: "340 kg", icon: Droplets, color: "text-blue-400", bg: "bg-blue-400/10", desc: "Equiv. a 5 vuelos cortos" },
    { title: "Árboles Salvados", value: "18", icon: TreePine, color: "text-emerald-500", bg: "bg-emerald-500/10", desc: "Impacto forestal directo" },
    { title: "Residuos Reciclados", value: "245 kg", icon: Recycle, color: "text-orange-400", bg: "bg-orange-400/10", desc: "Total recolectado" },
];

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
    { id: 1, fecha: "15/03/2026", tipo: "Papel", peso: "2.5 kg", ecr: "+50", bin: "Bin Plaza Catia" },
    { id: 2, fecha: "12/03/2026", tipo: "Plástico", peso: "1.8 kg", ecr: "+36", bin: "Bin Col. Gabriela Mistral" },
    { id: 3, fecha: "10/03/2026", tipo: "Vidrio", peso: "3.2 kg", ecr: "+64", bin: "Bin Mercado La Guaira" },
    { id: 4, fecha: "08/03/2026", tipo: "Metal", peso: "0.5 kg", ecr: "+10", bin: "Bin Plaza Bolívar" },
];

const marketOrders = [
    { type: "Compra", qty: "500 ECR", price: "$1.20", user: "Inversiones Polar", status: "Activa" },
    { type: "Venta", qty: "300 ECR", price: "$1.15", user: "Grupo BOD", status: "Activa" },
    { type: "Compra", qty: "200 ECR", price: "$1.18", user: "Panadería El Trigal", status: "Completada" },
];

const achievements = [
    { id: 1, title: "Reciclador Novato", target: "50 kg", current: 50, unlocked: true, icon: "🥉" },
    { id: 2, title: "Guardián del Planeta", target: "200 kg", current: 150, unlocked: false, icon: "🥈" },
    { id: 3, title: "Héroe Ambiental", target: "500 kg", current: 225, unlocked: false, icon: "🥇" },
];

const chartConfig = {
    credits: { label: "Eco-Créditos", color: "hsl(var(--secondary))" },
} satisfies ChartConfig;

export default function SostenibilidadPage() {
    const { toast } = useToast();
    const [selectedBin, setSelectedBin] = useState<string | null>(null);
    const [isMarketModalOpen, setIsMarketModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSimulation = (msg: string) => {
        toast({ title: "SIMULACIÓN ACTIVA", description: msg });
    };

    const handleMarketAction = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsMarketModalOpen(false);
            toast({
                title: "ORDEN PROCESADA",
                description: "La operación se ha registrado en el Ledger. El mercado estará operativo próximamente.",
                action: <CheckCircle className="text-secondary h-4 w-4" />
            });
        }, 1500);
    };

    return (
        <div className="space-y-12 pb-20 px-6 md:px-10">
            {/* --- Header --- */}
            <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-secondary pl-8 py-2 mt-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20 text-[9px] font-black uppercase tracking-[0.4em] text-secondary shadow-glow-secondary mb-4">
                        <Leaf className="h-3 w-3" /> ÁREA AMBIENTAL
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Portal de <span className="text-secondary italic">Sostenibilidad</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">Gestión de Eco-Créditos • Trazabilidad Inmutable v2.6</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/5 text-foreground" onClick={() => handleSimulation("Función disponible en la próxima actualización.")}>
                        <Download className="mr-2 h-4 w-4" /> Exportar Auditoría
                    </Button>
                    <Button className="btn-3d-secondary h-12 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl">
                        <Zap className="mr-2 h-4 w-4" /> Activar Sensores
                    </Button>
                </div>
            </header>

            {/* --- KPI Cards --- */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {kpiData.map((kpi, index) => (
                    <motion.div key={kpi.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem]">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
                                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{kpi.title}</CardTitle>
                                <div className={cn("p-2 rounded-lg border border-border/50 shadow-inner", kpi.bg)}>
                                    <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 pt-0">
                                <div className="text-3xl font-black italic text-foreground tracking-tighter leading-none mb-2">{kpi.value}</div>
                                <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">{kpi.desc}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* --- Charts Section --- */}
            <div className="grid gap-10 lg:grid-cols-12">
                <Card className="lg:col-span-8 glass-card border-none rounded-[3rem] bg-card/20 overflow-hidden shadow-2xl">
                    <CardHeader className="p-10 border-b border-border/5 bg-card/10">
                        <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground flex items-center gap-4">
                            <TrendingUp className="text-secondary h-6 w-6" /> Evolución de Activos Verdes
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-10 h-[350px]">
                        <ChartContainer config={chartConfig} className="w-full h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={evolutionData}>
                                    <defs>
                                        <linearGradient id="colorECR" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00A86B" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#00A86B" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                                    <XAxis dataKey="month" stroke="#475569" fontSize={10} fontWeight="900" axisLine={false} tickLine={false} tickMargin={10} />
                                    <YAxis stroke="#475569" fontSize={10} fontWeight="900" axisLine={false} tickLine={false} />
                                    <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                                    <Area type="monotone" dataKey="credits" stroke="#00A86B" strokeWidth={4} fillOpacity={1} fill="url(#colorECR)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-4 glass-card border-none rounded-[3rem] bg-card/20 flex flex-col items-center justify-center p-10 text-center shadow-2xl">
                    <CardHeader className="p-0 mb-8">
                        <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/40 italic">Distribución de Residuos</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 w-full h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={distributionData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value">
                                    {distributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: 'none', borderRadius: '12px', fontSize: '10px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                    <CardFooter className="p-0 grid grid-cols-2 gap-4 w-full">
                        {distributionData.map(item => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-[9px] font-black uppercase text-muted-foreground/60 tracking-widest">{item.name} {item.value}%</span>
                            </div>
                        ))}
                    </CardFooter>
                </Card>
            </div>

            {/* --- History & Map --- */}
            <div className="grid gap-10 lg:grid-cols-12">
                <Card className="lg:col-span-7 glass-card border-none rounded-[3rem] bg-card/20 overflow-hidden shadow-2xl">
                    <CardHeader className="p-10 border-b border-border/5 flex justify-between items-center bg-card/10">
                        <div className="space-y-1">
                            <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground">Historial de Reciclaje</CardTitle>
                            <p className="text-[9px] font-bold uppercase opacity-30 tracking-widest">Validación de Pesaje por IA</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-foreground/5" onClick={() => handleSimulation("Función de exportación próximamente.")}><Filter className="h-4 w-4" /></Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/30 border-none">
                                    <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Fecha</TableHead>
                                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Tipo</TableHead>
                                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Peso</TableHead>
                                    <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Eco-Créditos</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recyclingHistory.map((row) => (
                                    <TableRow key={row.id} className="border-border/5 hover:bg-foreground/5 transition-colors group">
                                        <TableCell className="pl-10 py-6 text-[10px] font-bold text-muted-foreground/60 uppercase">{row.fecha}</TableCell>
                                        <TableCell className="py-6 font-black uppercase text-xs text-foreground/80 group-hover:text-foreground">{row.tipo}</TableCell>
                                        <TableCell className="py-6 font-mono text-xs text-muted-foreground/60">{row.peso}</TableCell>
                                        <TableCell className="text-right pr-10 py-6 font-black text-secondary italic tracking-tighter text-base">{row.ecr}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-5 glass-card border-none rounded-[3rem] bg-card/20 p-1 shadow-2xl relative overflow-hidden">
                    <div className="p-10 space-y-6">
                        <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground">Smart Bins Cercanos</h3>
                        <p className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Estado de los Puntos de Recolección</p>
                        
                        <div className="relative aspect-square bg-muted/30 rounded-[2.5rem] border border-border/50 overflow-hidden group">
                            {/* SVG Map Mockup */}
                            <svg viewBox="0 0 400 400" className="w-full h-full opacity-20">
                                <path d="M50 100 Q 150 50 350 150 T 350 350" stroke="currentColor" strokeWidth="2" fill="none" />
                                <path d="M100 350 Q 200 300 300 350" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                            
                            {/* Pulse Markers */}
                            {[
                                { x: 80, y: 120, id: " Plaza Catia" },
                                { x: 250, y: 80, id: " Puerto La Guaira" },
                                { x: 180, y: 250, id: " Col. Gabriela Mistral" },
                                { x: 320, y: 300, id: " Av. Soublette" },
                                { x: 120, y: 340, id: " Plaza Bolívar" }
                            ].map((bin, i) => (
                                <motion.button
                                    key={i}
                                    className="absolute p-2 bg-secondary rounded-full shadow-glow-secondary z-10"
                                    style={{ left: `${bin.x}px`, top: `${bin.y}px` }}
                                    whileHover={{ scale: 1.5 }}
                                    onClick={() => setSelectedBin(bin.id)}
                                >
                                    <MapPin className="h-3 w-3 text-secondary-foreground" />
                                    <div className="absolute inset-0 bg-secondary rounded-full animate-ping opacity-40" />
                                </motion.button>
                            ))}

                            <div className="absolute bottom-6 left-6 right-6">
                                <AnimatePresence mode="wait">
                                    {selectedBin ? (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="p-4 bg-background/80 backdrop-blur-md rounded-2xl border border-border flex justify-between items-center shadow-lg">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black uppercase text-secondary italic">Smart Bin {selectedBin}</p>
                                                <p className="text-[8px] font-bold text-muted-foreground/60 uppercase">🟢 Activo • 60% Disponible</p>
                                            </div>
                                            <Button variant="link" className="text-[8px] font-black uppercase tracking-widest text-primary p-0 h-auto" onClick={() => handleSimulation("Trazando ruta al Smart Bin...")}>VER RUTA</Button>
                                        </motion.div>
                                    ) : (
                                        <p className="text-center text-[8px] font-bold text-muted-foreground/30 uppercase tracking-widest italic">Seleccione un punto en el mapa</p>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* --- Market Exchange --- */}
            <div className="grid gap-10 lg:grid-cols-12">
                <Card className="lg:col-span-8 glass-card border-none rounded-[3rem] bg-card/20 overflow-hidden shadow-2xl">
                    <CardHeader className="p-10 border-b border-border/5 flex flex-row justify-between items-center bg-card/10">
                        <div className="space-y-1">
                            <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground">Mercado de Eco-Créditos</CardTitle>
                            <p className="text-[9px] font-bold uppercase opacity-30 tracking-widest italic">Exchange Transparente de Bonos Verdes</p>
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" className="rounded-xl h-10 px-6 text-[9px] font-black uppercase tracking-widest btn-3d-secondary" onClick={() => setIsMarketModalOpen(true)}>VENDER ECR</Button>
                            <Button size="sm" variant="outline" className="rounded-xl h-10 px-6 text-[9px] font-black uppercase tracking-widest border-primary/40 text-primary" onClick={() => setIsMarketModalOpen(true)}>COMPRAR ECR</Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/30 border-none">
                                    <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Orden</TableHead>
                                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Cantidad</TableHead>
                                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Precio (USD)</TableHead>
                                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Empresa</TableHead>
                                    <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Estado</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {marketOrders.map((order, i) => (
                                    <TableRow key={i} className="border-border/5 hover:bg-foreground/5 transition-all">
                                        <TableCell className="pl-10 py-6">
                                            <span className={cn("text-[9px] font-black uppercase px-2 h-5 rounded flex items-center w-fit", order.type === 'Compra' ? "bg-primary/20 text-primary" : "bg-rose-500/20 text-rose-400")}>{order.type}</span>
                                        </TableCell>
                                        <TableCell className="py-6 font-black italic text-foreground/80">{order.qty}</TableCell>
                                        <TableCell className="py-6 font-mono font-bold text-secondary">{order.price}</TableCell>
                                        <TableCell className="py-6 text-[10px] font-black uppercase text-muted-foreground/60">{order.user}</TableCell>
                                        <TableCell className="text-right pr-10 py-6">
                                            <Badge variant={order.status === 'Completada' ? 'default' : 'outline'} className="text-[8px] font-black uppercase px-3 h-6 rounded-lg">{order.status}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-4 glass-card border-none rounded-[3rem] bg-card/20 p-10 shadow-2xl flex flex-col justify-between">
                    <div className="space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/40 italic">Valor ECR (USD)</h3>
                        <div className="h-40 w-full bg-muted/30 rounded-2xl p-4 border border-border relative overflow-hidden group">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={[ {v: 1.12}, {v: 1.15}, {v: 1.10}, {v: 1.22}, {v: 1.18}, {v: 1.25} ]}>
                                    <Line type="step" dataKey="v" stroke="#00A86B" strokeWidth={3} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                            <div className="absolute top-4 right-4 text-secondary font-black italic text-lg">$ 1.25</div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between text-[10px] font-black uppercase text-muted-foreground/40"><span>Capitalización:</span> <span className="text-muted-foreground">$ 1.5M</span></div>
                            <div className="flex justify-between text-[10px] font-black uppercase text-muted-foreground/40"><span>Volumen 24h:</span> <span className="text-muted-foreground">45k ECR</span></div>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full h-12 rounded-xl mt-8 border-border bg-card/10 font-black text-[9px] uppercase tracking-widest text-muted-foreground/60 group hover:text-foreground hover:bg-card/30" onClick={() => handleSimulation("Abriendo estadísticas completas...")}>ANÁLISIS TÉCNICO <ArrowUpRight className="ml-2 h-3 w-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"/></Button>
                </Card>
            </div>

            {/* --- Achievements & Certificates --- */}
            <div className="grid gap-10 lg:grid-cols-12">
                <Card className="lg:col-span-6 glass-card border-none rounded-[3rem] bg-card/20 p-10 shadow-2xl">
                    <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground mb-8 flex items-center gap-4">
                        <Award className="text-amber-400 h-6 w-6" /> Logros y Reconocimientos
                    </h3>
                    <div className="space-y-8">
                        {achievements.map(ach => (
                            <div key={ach.id} className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <span className="text-2xl">{ach.icon}</span>
                                        <div className="space-y-0.5">
                                            <p className={cn("text-xs font-black uppercase tracking-tight", ach.unlocked ? "text-foreground" : "text-muted-foreground/30")}>{ach.title}</p>
                                            <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">{ach.unlocked ? "Desbloqueado" : `Meta: ${ach.target}`}</p>
                                        </div>
                                    </div>
                                    {ach.unlocked && <CheckCircle className="h-4 w-4 text-secondary" />}
                                </div>
                                {!ach.unlocked && (
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-[8px] font-black text-secondary/60 uppercase"><span>Progreso</span> <span>{Math.round((ach.current / parseInt(ach.target)) * 100)}%</span></div>
                                        <Progress value={(ach.current / parseInt(ach.target)) * 100} className="h-1.5 bg-muted/20 border border-border/50" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="lg:col-span-6 glass-card border-none rounded-[3rem] bg-card/20 p-10 shadow-2xl">
                    <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground mb-8 flex items-center gap-4">
                        <FileText className="text-primary h-6 w-6" /> Certificados Ambientales
                    </h3>
                    <div className="space-y-4">
                        {[
                            { name: "Certificado de Carbono Neutral", date: "Marzo 2026", ref: "CN-2026-03" },
                            { name: "Certificado de Reciclaje", date: "Q1 2026", ref: "REC-2026-Q1" },
                        ].map((cert, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-muted/30 border border-border flex justify-between items-center group hover:border-primary/20 transition-all">
                                <div className="flex items-center gap-6">
                                    <div className="p-3 bg-primary/10 rounded-xl"><FileText className="h-5 w-5 text-primary" /></div>
                                    <div>
                                        <p className="text-xs font-black uppercase italic text-foreground/90">{cert.name}</p>
                                        <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">{cert.date} • REF: {cert.ref}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-foreground/5" onClick={() => handleSimulation("Generando PDF de certificado...")}><Download className="h-4 w-4" /></Button>
                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-foreground/5" onClick={() => handleSimulation("Compartiendo certificado en red...")}><Share2 className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <CardFooter className="p-0 pt-10 flex justify-center border-t border-border/50 mt-10">
                        <div className="flex items-center gap-4 opacity-20">
                            <QrCode className="h-12 w-12" />
                            <div className="text-left">
                                <p className="text-[10px] font-black uppercase tracking-widest leading-none">Validación On-Chain</p>
                                <p className="text-[8px] font-bold uppercase mt-1">Escanee para verificar autenticidad</p>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>

            {/* --- Market Modal --- */}
            <Dialog open={isMarketModalOpen} onOpenChange={setIsMarketModalOpen}>
                <DialogContent className="rounded-[3rem] bg-card/95 backdrop-blur-3xl border-border p-10">
                    <DialogHeader className="mb-8">
                        <div className="p-3 bg-secondary/10 rounded-2xl w-fit mb-4">
                            <Sparkles className="h-8 w-8 text-secondary" />
                        </div>
                        <DialogTitle className="text-3xl font-black italic uppercase tracking-tighter text-foreground leading-none">Orden de <br/> Eco-Exchange</DialogTitle>
                        <DialogDescription className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary/60">Configuración de Transacción en Tiempo Real</DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Cantidad de Eco-Créditos (ECR)</Label>
                            <div className="relative">
                                <Input type="number" placeholder="0" className="h-14 bg-muted/30 border-border rounded-2xl pl-12 text-lg font-black italic text-foreground" />
                                <Coins className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">Precio Unitario (USD)</Label>
                            <div className="relative">
                                <Input type="number" placeholder="1.25" className="h-14 bg-muted/30 border-border rounded-2xl pl-12 text-lg font-black italic text-foreground" />
                                <Zap className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl bg-muted/20 border border-border space-y-2">
                            <div className="flex justify-between text-[10px] font-black uppercase text-muted-foreground/40"><span>Total Proyectado:</span> <span className="text-muted-foreground/80">$ 0.00</span></div>
                            <div className="flex justify-between text-[10px] font-black uppercase text-muted-foreground/40"><span>Comisión Ecosistema (1%):</span> <span className="text-muted-foreground/80">$ 0.00</span></div>
                        </div>
                    </div>

                    <DialogFooter className="mt-10 flex flex-col gap-4">
                        <Button className="w-full h-16 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl btn-3d-secondary italic" onClick={handleMarketAction} disabled={isProcessing}>
                            {isProcessing ? <Loader2 className="animate-spin mr-3 h-5 w-5"/> : <CheckCircle className="mr-3 h-5 w-5"/>}
                            {isProcessing ? "SELLANDO LEDGER..." : "CONFIRMAR ORDEN"}
                        </Button>
                        <Button variant="ghost" className="w-full h-12 text-[10px] font-black uppercase text-muted-foreground/40 hover:text-foreground" onClick={() => setIsMarketModalOpen(false)}>Cancelar Operación</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* --- Footer Branding --- */}
            <footer className="mt-20 pt-10 border-t border-border/20 flex flex-col items-center gap-6 text-center opacity-40">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[1.5em] italic">SOSTENIBILIDAD MAESTRA • MK-2.6</p>
                <div className="flex gap-10 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    <span>Carlos Mattar</span>
                    <span>Sebastián Garrido</span>
                    <span>Marcos Sousa</span>
                </div>
            </footer>
        </div>
    );
}
