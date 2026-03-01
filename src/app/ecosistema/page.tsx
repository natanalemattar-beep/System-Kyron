"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Home, BarChart3, Users, Scale, Leaf, Droplets, Wallet, 
  Wrench, ShieldCheck, ShoppingBag, Fingerprint, Cog, 
  Bell, Search, Menu, X, Plus, ArrowUpRight, ArrowDownRight, 
  CheckCircle2, AlertTriangle, Info, MapPin, Printer, Download,
  Smartphone, Share2, MessageCircle, ChevronRight, Send, History, Recycle,
  Trash2, CreditCard, LayoutDashboard, Database, Server, BrainCircuit,
  Zap, Award, Globe, Key, Lock, Layers, Target, Calculator, Gift, Heart, Calendar,
  Activity, Thermometer, Gauge, Cpu, Radio, Box, Package, ShieldAlert
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn, formatCurrency } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";

const COLORS = ['#0A2472', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800'];

export default function EcosistemaKyron() {
  const [activeTab, setActiveTab] = useState('inicio');
  const { toast } = useToast();

  const user = { name: "Director Ejecutivo", email: "ceo@kyron.com", fallback: "CE" };

  // Mock navigation groups for the header
  const headerNavGroups = [
    {
        title: "Operaciones",
        icon: Cog,
        items: [
            { href: "#", label: "Producción Petróleo", icon: Droplets },
            { href: "#", label: "Mantenimiento Preventivo", icon: Wrench },
            { href: "#", label: "Logística y Tienda", icon: ShoppingBag },
        ]
    },
    {
        title: "Finanzas",
        icon: Wallet,
        items: [
            { href: "#", label: "Consolidado Bancario", icon: Landmark },
            { href: "#", label: "Cuentas por Cobrar", icon: BarChart3 },
            { href: "#", label: "Flujo de Caja IA", icon: TrendingUp },
        ]
    },
    {
        title: "Legal",
        icon: Scale,
        items: [
            { href: "#", label: "Escritorio Jurídico", icon: Gavel },
            { href: "#", label: "Fiscalización SENIAT", icon: ShieldCheck },
            { href: "#", label: "Identidad Digital", icon: Fingerprint },
        ]
    }
  ];

  const [sustainabilityData, setSustainabilityData] = useState({
    today: 245,
    month: 3450,
    points: 12450,
    trees: 18,
    history: [
      { id: 1, date: "2026-03-01 14:20", type: "Papel", weight: 1.2, points: 60 },
      { id: 2, date: "2026-03-01 13:10", type: "Plástico", weight: 0.5, points: 25 },
      { id: 3, date: "2026-03-01 11:45", type: "Vidrio", weight: 2.1, points: 100 },
    ]
  });

  const simulateRecycling = () => {
    const weights = [0.3, 0.5, 1.2, 0.8];
    const types = ["Papel", "Plástico", "Vidrio", "Metal"];
    const weight = weights[Math.floor(Math.random() * weights.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const points = Math.round(weight * 50);

    setSustainabilityData(prev => ({
      ...prev,
      today: prev.today + weight,
      points: prev.points + points,
      history: [{
        id: Date.now(),
        date: new Date().toLocaleString(),
        type,
        weight,
        points
      }, ...prev.history].slice(0, 5)
    }));

    toast({
      title: "Reciclaje Procesado",
      description: `Se han registrado ${weight}kg de ${type}. Puntos acreditados.`,
    });
  };

  const ModuleInicio = () => (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Liquidez Total" value="Bs. 12.4M" trend="+8.2%" icon={Wallet} />
        <StatCard title="Producción Hoy" value="85.4k BPD" trend="+1.5%" icon={Droplets} />
        <StatCard title="Estatus Fiscal" value="Cero Riesgo" icon={ShieldCheck} variant="accent" />
        <StatCard title="Puntos Verdes" value="12.450" icon={Recycle} variant="accent" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 crystal-panel border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
                <BarChart3 className="text-primary" />
                Desempeño del Ecosistema
            </CardTitle>
            <CardDescription>Consolidado operativo de los últimos 6 meses.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { m: 'Oct', i: 380, g: 240 }, { m: 'Nov', i: 410, g: 255 }, { m: 'Dic', i: 450, g: 230 },
                { m: 'Ene', i: 480, g: 290 }, { m: 'Feb', i: 520, g: 260 }, { m: 'Mar', i: 580, g: 280 }
              ]}>
                <defs>
                    <linearGradient id="colorI" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0A2472" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0A2472" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="m" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="i" stroke="#0A2472" strokeWidth={3} fill="url(#colorI)" />
                <Area type="monotone" dataKey="g" stroke="#4CAF50" strokeWidth={3} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
            <Card className="crystal-panel border-none">
                <CardHeader><CardTitle className="text-sm font-black uppercase tracking-widest text-primary/60">Alertas de Misión</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-red-500/10 border border-red-500/20">
                        <ShieldAlert className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-black uppercase tracking-tight text-red-600">Presión Crítica</p>
                            <p className="text-[10px] text-muted-foreground leading-tight">Pozo 12 (Zulia) reporta anomalía en cabezal de flujo.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20">
                        <Calendar className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-black uppercase tracking-tight text-orange-600">Mantenimiento Pendiente</p>
                            <p className="text-[10px] text-muted-foreground leading-tight">Bomba B-45 requiere cambio de sellos antes del 20/04.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <Card className="bg-[#0A2472] text-white border-none shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10"><Fingerprint className="h-32 w-32" /></div>
                <CardHeader>
                    <CardTitle className="text-lg font-black uppercase tracking-tighter">Identidad 3D</CardTitle>
                    <CardDescription className="text-white/60 text-xs">Empresa Verificada Blockchain</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">RIF Jurídico</p>
                        <p className="text-xl font-mono font-bold tracking-tighter">J-12345678-9</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="secondary" className="w-full btn-3d-secondary h-10">Ver Credenciales</Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background text-slate-900 overflow-hidden">
      <AppSidebar />
      
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <AppHeader user={user} navGroups={headerNavGroups} dashboardHref="/ecosistema" />
        
        <main className="flex-1 container mx-auto p-6 md:p-10 pt-24 md:pt-28 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
            >
              {activeTab === 'inicio' && <ModuleInicio />}
              
              {/* Module: Sostenibilidad */}
              {activeTab === 'sostenibilidad' && (
                <div className="space-y-8">
                    <div className="flex justify-between items-center bg-white/50 p-6 rounded-[2rem] border shadow-sm">
                        <div>
                            <h2 className="text-3xl font-black tracking-tighter">SOSTENIBILIDAD INTELIGENTE</h2>
                            <p className="text-muted-foreground font-medium">Gestión de residuos y economía circular impulsada por IA.</p>
                        </div>
                        <Button onClick={simulateRecycling} className="btn-3d-secondary h-12 px-8">
                            <Recycle className="mr-2 h-4 w-4" /> SIMULAR RECICLAJE
                        </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <StatCard title="Reciclado Hoy" value={`${sustainabilityData.today.toFixed(1)} kg`} icon={Leaf} variant="accent" />
                        <StatCard title="Puntos Acumulados" value={sustainabilityData.points.toLocaleString()} icon={Zap} variant="accent" />
                        <StatCard title="Meta Mensual" value={`${sustainabilityData.month} kg`} icon={Target} />
                        <StatCard title="Árboles Salvados" value={sustainabilityData.trees} icon={History} variant="accent" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Card className="lg:col-span-2 crystal-panel border-none">
                            <CardHeader><CardTitle>Trazabilidad de Residuos</CardTitle></CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-secondary/30">
                                            <TableHead className="font-black">Fecha / Hora</TableHead>
                                            <TableHead className="font-black">Material</TableHead>
                                            <TableHead className="text-center font-black">Peso</TableHead>
                                            <TableHead className="text-right font-black">Puntos</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sustainabilityData.history.map((item: any) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-mono text-[10px]">{item.date}</TableCell>
                                                <TableCell><Badge variant="secondary" className="rounded-xl px-3">{item.type}</Badge></TableCell>
                                                <TableCell className="text-center font-bold">{item.weight} kg</TableCell>
                                                <TableCell className="text-right font-black text-green-600">+{item.points}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                        <Card className="crystal-panel border-none overflow-hidden">
                            <CardHeader className="bg-primary/5"><CardTitle>Distribución de Recolección</CardTitle></CardHeader>
                            <CardContent className="h-64 mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={[{n:'Papel', v:60}, {n:'Plástico', v:25}, {n:'Vidrio', v:10}, {n:'Metal', v:5}]} dataKey="v" innerRadius={60} outerRadius={80} paddingAngle={5}>
                                            {COLORS.map((c, i) => <Cell key={i} fill={c} />)}
                                        </Pie>
                                        <Tooltip />
                                        <Legend verticalAlign="bottom" height={36}/>
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>
              )}

              {/* Placeholder for other tabs */}
              {!['inicio', 'sostenibilidad'].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
                  <div className="p-12 crystal-panel rounded-[3rem] max-w-2xl relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 opacity-5 group-hover:rotate-12 transition-transform duration-700"><Logo className="h-64 w-64" /></div>
                    <LayoutDashboard className="h-24 w-24 text-primary/20 mx-auto mb-6" />
                    <h3 className="text-4xl font-black text-primary uppercase tracking-tighter">Módulo en Sincronización</h3>
                    <p className="text-slate-500 text-lg leading-relaxed mt-4">La interfaz del módulo <strong>{activeTab}</strong> está siendo calibrada con el núcleo central de System Kyron. Las innovaciones visuales y la telemetría 3D estarán activas en breve.</p>
                    <div className="flex justify-center gap-4 mt-10">
                        <Button onClick={() => setActiveTab('inicio')} className="btn-3d-primary px-10 h-12">VOLVER AL INICIO</Button>
                        <Button variant="outline" className="rounded-2xl h-12 px-10 border-2 font-black uppercase tracking-widest text-[10px]">Soporte Técnico</Button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="h-16 border-t bg-background/80 backdrop-blur-md flex items-center justify-center px-10">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] text-center">
            System Kyron v2.0 • 2026 • © Todos los derechos reservados • Misión Crítica
          </p>
        </footer>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon: Icon, variant = 'primary' }: any) {
  const colorClass = variant === 'accent' ? 'text-[#4CAF50]' : 'text-[#0A2472]';
  const bgClass = variant === 'accent' ? 'bg-green-500/5' : 'bg-primary/5';
  
  return (
    <Card className="crystal-panel hover:scale-[1.02] transition-all duration-500 border-none group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Icon className="h-16 w-16" /></div>
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{title}</p>
          <div className={cn("p-3 rounded-2xl", bgClass, colorClass)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="flex items-end gap-3">
            <h4 className={cn("text-3xl font-black tracking-tighter leading-none", colorClass)}>{value}</h4>
            {trend && (
                <div className={cn(
                    "flex items-center text-[10px] font-black px-2 py-0.5 rounded-lg mb-1",
                    trend.startsWith('+') ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
                )}>
                    {trend}
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}