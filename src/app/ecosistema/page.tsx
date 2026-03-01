
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Home, BarChart3, Users, Scale, Leaf, Droplets, Wallet, 
  Wrench, ShieldCheck, ShoppingBag, Fingerprint, Cog, 
  Bell, Search, Menu, X, Plus, ArrowUpRight, ArrowDownRight, 
  CheckCircle2, AlertTriangle, Info, MapPin, Printer, Download,
  Smartphone, Share2, MessageCircle, ChevronRight, Send, History, Recycle,
  Trash2, CreditCard, LayoutDashboard, Database, Server, BrainCircuit,
  Zap, Award, Globe, Key, Lock, Layers, Target, Calculator, Gift, Heart, Calendar
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
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn, formatCurrency } from "@/lib/utils";

// --- PALETA Y CONSTANTES ---
const COLORS = {
  primary: '#0A2472',
  accent: '#4CAF50',
  danger: '#F44336',
  warning: '#FFC107',
  chart: ['#0A2472', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800']
};

// --- MOCK DATA ---
const financialHistory = [
  { month: 'Sep', ingresos: 380000, gastos: 240000 },
  { month: 'Oct', ingresos: 410000, gastos: 255000 },
  { month: 'Nov', ingresos: 395000, gastos: 230000 },
  { month: 'Dic', ingresos: 480000, gastos: 290000 },
  { month: 'Ene', ingresos: 420000, gastos: 260000 },
  { month: 'Feb', ingresos: 450000, gastos: 280000 },
];

const initialRecyclingMix = [
  { name: 'Papel', value: 60 },
  { name: 'Plástico', value: 25 },
  { name: 'Vidrio', value: 10 },
  { name: 'Metal', value: 5 },
];

const initialEmployees = [
  { id: 1, name: "Ana Pérez", role: "Gerente de Finanzas", dept: "Administración", date: "10/01/2020", status: "Activo" },
  { id: 2, name: "Carlos Ruiz", role: "Ingeniero de Procesos", dept: "Operaciones", date: "15/03/2021", status: "Activo" },
  { id: 3, name: "Maria Elena", role: "Analista RR.HH.", dept: "RR.HH.", date: "22/06/2022", status: "Activo" },
  { id: 4, name: "Jose Castillo", role: "Abogado Senior", dept: "Jurídico", date: "05/11/2022", status: "Activo" },
];

const products = [
  { id: 1, name: "Samsung Galaxy A54", price: 320, brand: "Samsung", image: "https://picsum.photos/seed/phone1/200/200" },
  { id: 2, name: "Tablet Pro 11\"", price: 450, brand: "Apple", image: "https://picsum.photos/seed/tablet1/200/200" },
  { id: 3, name: "Router Fibra 6G", price: 85, brand: "TP-Link", image: "https://picsum.photos/seed/router1/200/200" },
  { id: 4, name: "Monitor IPS 27\"", price: 190, brand: "Dell", image: "https://picsum.photos/seed/monitor1/200/200" },
];

// --- COMPONENTE PRINCIPAL ---
export default function EcosistemaKyron() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [currentDate, setCurrentDate] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [asistenteOpen, setAsistenteOpen] = useState(false);
  const { toast } = useToast();

  // Sostenibilidad Global State
  const [recyclingToday, setRecyclingToday] = useState(245);
  const [greenPoints, setGreenPoints] = useState(12450);
  const [treesSaved, setTreesSaved] = useState(18);
  const [co2Saved, setCo2Saved] = useState(320);
  const [recyclingHistory, setRecyclingHistory] = useState([
    { id: 1, date: "2026-02-28 14:20", type: "Papel", weight: 0.3, points: 5 },
    { id: 2, date: "2026-02-28 13:45", type: "Plástico", weight: 1.2, points: 15 },
    { id: 3, date: "2026-02-28 11:10", type: "Vidrio", weight: 5.0, points: 50 },
  ]);

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(new Date().toLocaleDateString('es-ES', options));
  }, []);

  const simulateRecycling = () => {
    const types = ["Papel", "Plástico", "Vidrio", "Metal"];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomWeight = parseFloat((Math.random() * 2).toFixed(2));
    const randomPoints = Math.floor(randomWeight * 10);

    setRecyclingToday(prev => prev + randomWeight);
    setGreenPoints(prev => prev + randomPoints);
    setCo2Saved(prev => prev + (randomWeight * 1.5));
    if (recyclingToday % 50 < (recyclingToday + randomWeight) % 50) {
      setTreesSaved(prev => prev + 1);
    }

    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleString('es-VE', { hour12: false }).replace(',', ''),
      type: randomType,
      weight: randomWeight,
      points: randomPoints
    };

    setRecyclingHistory(prev => [newEntry, ...prev.slice(0, 9)]);
    
    toast({
      title: "♻️ Reciclaje Registrado",
      description: `Se han procesado ${randomWeight}kg de ${randomType}. +${randomPoints} puntos acumulados.`,
    });
  };

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'contabilidad', label: 'Contabilidad', icon: BarChart3 },
    { id: 'rrhh', label: 'RR.HH.', icon: Users },
    { id: 'juridico', label: 'Jurídico', icon: Scale },
    { id: 'sostenibilidad', label: 'Sostenibilidad', icon: Leaf },
    { id: 'petroleo', label: 'Petróleo', icon: Droplets },
    { id: 'tesoreria', label: 'Tesorería', icon: Wallet },
    { id: 'mantenimiento', label: 'Mantenimiento', icon: Wrench },
    { id: 'fiscalizacion', label: 'Fiscalización', icon: ShieldCheck },
    { id: 'tienda', label: 'Tienda', icon: ShoppingBag },
    { id: 'identidad', label: 'Identidad Digital', icon: Fingerprint },
    { id: 'configuracion', label: 'Configuración', icon: Cog },
  ];

  return (
    <div className="flex h-screen w-full bg-[#f4f7f9] overflow-hidden text-slate-900 font-sans">
      {/* --- SIDEBAR --- */}
      <aside className={cn(
        "bg-[#0A2472] text-white flex flex-col transition-all duration-300 z-30 shadow-2xl",
        isSidebarOpen ? 'w-64' : 'w-20'
      )}>
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="bg-white p-1.5 rounded-lg shadow-lg shrink-0">
            <Zap className="text-[#0A2472] h-6 w-6" />
          </div>
          {isSidebarOpen && <span className="font-black text-xl tracking-tighter uppercase italic">System Kyron</span>}
        </div>
        
        <nav className="flex-grow py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200",
                activeTab === item.id 
                ? 'bg-white/10 border border-white/20 shadow-inner' 
                : 'hover:bg-white/5 text-slate-300 hover:text-white'
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", activeTab === item.id ? 'text-[#4CAF50]' : '')} />
              {isSidebarOpen && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </aside>

      {/* --- CONTENT AREA --- */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(76,175,80,0.05),transparent_40%)]">
        {/* HEADER */}
        <header className="h-16 border-b bg-white/60 backdrop-blur-md flex items-center justify-between px-8 z-20">
          <div className="flex flex-col">
            <h2 className="text-xs font-medium text-slate-600 capitalize">{currentDate}</h2>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1">Bienvenido, Empresa Ejemplo C.A.</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative h-10 w-10">
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="absolute top-2 right-2 bg-[#F44336] text-white text-[8px] font-black h-4 w-4 flex items-center justify-center rounded-full border-2 border-white">3</span>
              </Button>
            </div>

            <Avatar className="h-10 w-10 border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform">
              <AvatarFallback className="bg-[#0A2472] text-white font-black text-xs">EE</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* MAIN MODULE RENDERER */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'inicio' && <ModuleInicio todayRecycling={recyclingToday} greenPoints={greenPoints} trees={treesSaved} co2={co2Saved} />}
              {activeTab === 'contabilidad' && <ModuleContabilidad />}
              {activeTab === 'rrhh' && <ModuleRRHH />}
              {activeTab === 'juridico' && <ModuleJuridico />}
              {activeTab === 'sostenibilidad' && <ModuleSostenibilidad simulate={simulateRecycling} history={recyclingHistory} points={greenPoints} today={recyclingToday} trees={treesSaved} />}
              {activeTab === 'petroleo' && <ModulePetroleo />}
              {activeTab === 'tesoreria' && <ModuleTesoreria />}
              {activeTab === 'mantenimiento' && <ModuleMantenimiento />}
              {activeTab === 'fiscalizacion' && <ModuleFiscalizacion />}
              {activeTab === 'tienda' && <ModuleTienda cartCount={cartCount} addToCart={() => setCartCount(c => c + 1)} />}
              {activeTab === 'identidad' && <ModuleIdentidad />}
              {activeTab === 'configuracion' && <ModuleConfiguracion />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ASISTENTE VIRTUAL */}
        <div className="fixed bottom-8 right-8 z-50">
          <AnimatePresence>
            {asistenteOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="absolute bottom-20 right-0 w-80 bg-card/95 backdrop-blur-2xl border shadow-2xl rounded-3xl overflow-hidden"
              >
                <div className="bg-[#0A2472] p-4 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5 text-[#4CAF50] animate-pulse" />
                    <span className="text-sm font-black uppercase tracking-widest">Kyron Assistant</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10" onClick={() => setAsistenteOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-6 h-64 overflow-y-auto space-y-4 text-sm">
                  <div className="bg-secondary p-3 rounded-2xl rounded-bl-none text-slate-700">
                    Hola, soy tu asistente inteligente. ¿Necesitas ayuda? System Kyron está aquí para optimizar tu gestión.
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="justify-start h-9 text-xs rounded-xl" onClick={() => toast({title: "Consulta", description: "Analizando estados financieros..."})}>
                      ¿Cómo va la rentabilidad?
                    </Button>
                    <Button variant="outline" className="justify-start h-9 text-xs rounded-xl" onClick={() => toast({title: "Alerta", description: "Verificando cumplimiento SENIAT..."})}>
                      ¿Tengo trámites pendientes?
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Button 
            onClick={() => setAsistenteOpen(!asistenteOpen)}
            className="h-14 w-14 rounded-full bg-[#0A2472] hover:scale-110 transition-all shadow-2xl border-4 border-white/20 p-0"
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </Button>
        </div>

        <footer className="h-10 border-t bg-white/40 backdrop-blur-sm flex items-center justify-center px-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          © 2026 System Kyron v2.0 • Todos los derechos reservados
        </footer>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(10, 36, 114, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(10, 36, 114, 0.2); }
        .glass-card { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 24px; box-shadow: 0 8px 32px 0 rgba(10, 36, 114, 0.05); }
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-5px); } 100% { transform: translateY(0px); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

// --- SUB-MÓDULOS ---

function ModuleInicio({ todayRecycling, greenPoints, trees, co2 }: any) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-black text-[#0A2472] tracking-tighter">Panel de Control Estratégico</h3>
        <p className="text-sm text-muted-foreground">Resumen consolidado del rendimiento corporativo.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Ingresos Mensuales" value="$ 450.000" trend="+12%" icon={ArrowUpRight} />
        <StatCard title="Gastos Operativos" value="$ 280.000" trend="-5%" icon={ArrowDownRight} variant="danger" />
        <StatCard title="Margen Neto" value="38%" icon={BarChart3} variant="accent" />
        <StatCard title="Riesgo Fiscal" value="0%" icon={ShieldCheck} variant="accent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Reciclado Hoy" value={`${todayRecycling.toFixed(1)} kg`} icon={Leaf} variant="accent" />
        <StatCard title="Puntos Verdes" value={greenPoints.toLocaleString()} icon={Zap} variant="accent" />
        <StatCard title="Árboles Salvados" value={trees} icon={History} variant="accent" />
        <StatCard title="CO₂ Evitado" value={`${co2.toFixed(1)} kg`} icon={Droplets} variant="accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glass-card border-none">
          <CardHeader>
            <CardTitle className="text-[#0A2472] flex items-center gap-2"><AreaChart className="h-5 w-5"/> Desempeño Financiero</CardTitle>
            <CardDescription>Evolución de ingresos vs gastos (Últimos 6 meses)</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financialHistory}>
                <defs>
                  <linearGradient id="colorIng" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A2472" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0A2472" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F44336" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#F44336" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="ingresos" stroke="#0A2472" strokeWidth={3} fillOpacity={1} fill="url(#colorIng)" />
                <Area type="monotone" dataKey="gastos" stroke="#F44336" strokeWidth={2} fillOpacity={1} fill="url(#colorGas)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="text-[#0A2472] flex items-center gap-2"><Recycle className="h-5 w-5"/> Mezcla de Residuos</CardTitle>
            <CardDescription>Distribución por tipo de material</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={initialRecyclingMix} innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="value">
                  {initialRecyclingMix.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.chart[index % COLORS.chart.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card border-none overflow-hidden">
        <CardHeader className="bg-[#0A2472]/5">
          <CardTitle className="text-[#0A2472] flex items-center gap-2"><History className="h-5 w-5"/> Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="pl-6">Fecha</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-right pr-6">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { date: "Hoy, 14:20", desc: "Factura #F-2026-452 emitida", status: "Completado" },
                { date: "Hoy, 13:10", desc: "Reciclaje de Papel registrado", status: "Completado" },
                { date: "Hoy, 09:30", desc: "Nómina Q1 Marzo 2026 procesada", status: "Completado" },
                { date: "Ayer, 17:45", desc: "Contrato TechSolutions renovado", status: "Completado" },
                { date: "Ayer, 11:20", desc: "Mantenimiento preventivo Bomba B-45", status: "En Proceso" }
              ].map((row, i) => (
                <TableRow key={i} className="hover:bg-slate-50/50">
                  <TableCell className="pl-6 text-xs text-slate-400 font-bold uppercase">{row.date}</TableCell>
                  <TableCell className="font-medium text-slate-700">{row.desc}</TableCell>
                  <TableCell className="text-right pr-6">
                    <Badge variant="outline" className={row.status === "Completado" ? "text-green-600 border-green-200 bg-green-50" : "text-yellow-600 border-yellow-200 bg-yellow-50"}>
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value, trend, icon: Icon, variant = 'primary' }: any) {
  const colorClass = variant === 'accent' ? 'text-[#4CAF50]' : variant === 'danger' ? 'text-[#F44336]' : 'text-[#0A2472]';
  const bgColor = variant === 'accent' ? 'bg-[#4CAF50]' : variant === 'danger' ? 'bg-[#F44336]' : 'bg-[#0A2472]';
  return (
    <Card className="glass-card hover:scale-[1.02] transition-all duration-300 border-none shadow-xl overflow-hidden group">
      <div className={cn("h-1.5 w-full", bgColor)} />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{title}</p>
          <div className={cn("p-2 rounded-lg bg-slate-50 group-hover:scale-110 transition-transform", colorClass)}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <h4 className={cn("text-2xl font-black tracking-tight mb-1", colorClass)}>{value}</h4>
        {trend && (
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Trend: <span className={trend.startsWith('+') ? 'text-green-500' : trend.startsWith('-') ? 'text-red-500' : ''}>{trend}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function ModuleContabilidad() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-[#0A2472] tracking-tighter">Centro de Contabilidad</h3>
          <p className="text-sm text-muted-foreground">Gestión de libros, facturación y tributos.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-[#0A2472]/20 h-11 px-6 font-bold"><Download className="mr-2 h-4 w-4" /> Exportar Libro</Button>
          <Button className="bg-[#0A2472] hover:bg-[#0A2472]/90 rounded-xl h-11 px-6 font-bold shadow-lg"><Plus className="mr-2 h-4 w-4" /> Nueva Factura</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card p-6 flex flex-col items-center text-center border-none shadow-lg">
          <div className="p-4 bg-[#0A2472]/5 rounded-2xl mb-4 text-[#0A2472]"><Calculator className="h-8 w-8"/></div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Declaraciones Mes</p>
          <h4 className="text-3xl font-black text-[#0A2472]">15</h4>
        </Card>
        <Card className="glass-card p-6 flex flex-col items-center text-center border-none shadow-lg">
          <div className="p-4 bg-[#4CAF50]/5 rounded-2xl mb-4 text-[#4CAF50]"><ArrowUpRight className="h-8 w-8"/></div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Facturas Emitidas</p>
          <h4 className="text-3xl font-black text-[#4CAF50]">234</h4>
        </Card>
        <Card className="glass-card p-6 flex flex-col items-center text-center border-none shadow-lg">
          <div className="p-4 bg-[#F44336]/5 rounded-2xl mb-4 text-[#F44336]"><ArrowDownRight className="h-8 w-8"/></div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Facturas Recibidas</p>
          <h4 className="text-3xl font-black text-[#4CAF50]">187</h4>
        </Card>
        <Card className="glass-card p-6 flex flex-col items-center text-center bg-red-50 border border-red-100 shadow-lg">
          <div className="p-4 bg-red-100/50 rounded-2xl mb-4 text-red-600"><AlertTriangle className="h-8 w-8"/></div>
          <p className="text-xs font-black text-red-400 uppercase tracking-widest mb-1">Vencimiento IVA</p>
          <h4 className="text-xl font-black text-red-600">15/03/2026</h4>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glass-card border-none shadow-xl overflow-hidden">
          <CardHeader className="bg-[#0A2472]/5">
            <CardTitle className="text-[#0A2472]">Últimas Facturas</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="pl-6">Número</TableHead>
                  <TableHead>Cliente/Proveedor</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                  <TableHead className="text-right pr-6">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { num: 'F-452', client: 'Distribuidora El Éxito', date: '28/02/2026', amount: 1250, status: 'Pagado' },
                  { num: 'F-451', client: 'Inversiones Los Andes', date: '27/02/2026', amount: 3400, status: 'Pendiente' },
                  { num: 'F-450', client: 'Suministros Globales', date: '26/02/2026', amount: 890, status: 'Pagado' },
                  { num: 'F-449', client: 'TechSolutions LLC', date: '25/02/2026', amount: 5600, status: 'Anulado' }
                ].map((inv, i) => (
                  <TableRow key={inv.num} className="hover:bg-slate-50/50">
                    <TableCell className="pl-6 font-mono font-bold text-[#0A2472]">{inv.num}</TableCell>
                    <TableCell className="font-medium">{inv.client}</TableCell>
                    <TableCell className="text-xs">{inv.date}</TableCell>
                    <TableCell className="text-right font-bold text-slate-700">{formatCurrency(inv.amount, "USD")}</TableCell>
                    <TableCell className="text-right pr-6">
                      <Badge className={cn(
                        "rounded-full px-3",
                        inv.status === 'Pagado' ? 'bg-green-500' : inv.status === 'Pendiente' ? 'bg-yellow-500' : 'bg-red-500'
                      )}>{inv.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-[#0A2472] flex items-center gap-2"><Calendar className="h-5 w-5"/> Calendario Fiscal</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black uppercase text-slate-400 mb-4">
              <span>Lu</span><span>Ma</span><span>Mi</span><span>Ju</span><span>Vi</span><span>Sa</span><span>Do</span>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({length: 31}).map((_, i) => (
                <div key={i} className={cn(
                  "h-9 w-full flex items-center justify-center rounded-xl text-xs font-bold transition-all cursor-default",
                  [15, 22, 30].includes(i+1) ? 'bg-red-500 text-white shadow-lg shadow-red-200' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                )}>
                  {i+1}
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-2xl border border-red-100">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"/>
                <p className="text-xs font-bold text-red-700">IVA Mensual (Marzo)</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-2xl border border-red-100">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"/>
                <p className="text-xs font-bold text-red-700">ISLR Trimestral</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ModuleRRHH() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-[#0A2472] tracking-tighter">Gestión de Talento Humano</h3>
          <p className="text-sm text-muted-foreground">Administración de nómina, personal y beneficios.</p>
        </div>
        <Button className="bg-[#0A2472] rounded-xl h-11 px-6 font-bold shadow-lg"><Plus className="mr-2 h-4 w-4" /> Nuevo Empleado</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Empleados Activos" value="124" icon={Users} />
        <StatCard title="Nómina Mensual" value="$ 85.000" icon={Wallet} />
        <StatCard title="Vacaciones Solicitadas" value="7" icon={Leaf} variant="warning" />
        <StatCard title="Prestaciones Calculadas" value="100%" icon={CheckCircle2} variant="accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glass-card border-none shadow-xl overflow-hidden">
          <CardHeader className="bg-[#0A2472]/5">
            <CardTitle className="text-[#0A2472]">Listado de Personal</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="pl-6">Empleado</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead className="text-right pr-6">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialEmployees.map(emp => (
                  <TableRow key={emp.id} className="hover:bg-slate-50/50">
                    <TableCell className="pl-6 flex items-center gap-3 py-4">
                      <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                        <AvatarFallback className="bg-slate-100 text-[#0A2472] font-black text-xs">{emp.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-black text-sm text-slate-700 leading-none mb-1">{emp.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Ingreso: {emp.date}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium">{emp.role}</TableCell>
                    <TableCell><Badge variant="secondary" className="rounded-full bg-slate-100 text-slate-600 border-none">{emp.dept}</Badge></TableCell>
                    <TableCell className="text-right pr-6"><Button variant="ghost" size="sm" className="text-[#0A2472] font-black hover:bg-[#0A2472]/5">Ver Perfil</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="glass-card border-none shadow-xl">
            <CardHeader><CardTitle className="text-[#0A2472] flex items-center gap-2"><BarChart3 className="h-5 w-5"/> Distribución</CardTitle></CardHeader>
            <CardContent className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Adm', val: 12 }, { name: 'Tec', val: 45 }, { name: 'Ops', val: 38 }, { name: 'Ven', val: 29 }
                ]}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <Bar dataKey="val" fill="#0A2472" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-card border-none shadow-xl bg-yellow-50/50">
            <CardHeader><CardTitle className="text-yellow-700 text-sm font-black uppercase tracking-widest">Solicitudes Pendientes</CardTitle></CardHeader>
            <CardContent className="space-y-4 pt-0">
              {[
                { name: "Andrés Rojas", type: "Permiso Médico", date: "05/03" },
                { name: "Lucia Gil", type: "Vacaciones", date: "12/03" }
              ].map((req, i) => (
                <div key={i} className="p-4 bg-white rounded-2xl shadow-sm border border-yellow-100">
                  <div className="flex justify-between items-start mb-3">
                    <div><p className="font-bold text-sm">{req.name}</p><p className="text-[10px] font-bold text-slate-400 uppercase">{req.type} - {req.date}</p></div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-[#4CAF50] hover:bg-[#4CAF50]/90 rounded-lg text-[10px] font-black">APROBAR</Button>
                    <Button size="sm" variant="outline" className="flex-1 rounded-lg text-[10px] font-black border-red-200 text-red-500 hover:bg-red-50">RECHAZAR</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ModuleJuridico() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-[#0A2472] tracking-tighter">Gobierno Corporativo y Legal</h3>
          <p className="text-sm text-muted-foreground">Control de cumplimiento, contratos y riesgos.</p>
        </div>
        <Button className="bg-[#0A2472] rounded-xl h-11 font-black shadow-lg">Generar Reporte de Cumplimiento</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 border border-green-100 p-6 rounded-[2rem] flex items-center gap-5 shadow-sm">
          <div className="p-4 bg-green-500 rounded-2xl text-white shadow-lg shadow-green-200"><CheckCircle2 /></div>
          <div><p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Alertas Legales</p><h4 className="text-lg font-black text-green-700">Cero multas activas</h4></div>
        </div>
        <div className="bg-yellow-50 border border-yellow-100 p-6 rounded-[2rem] flex items-center gap-5 shadow-sm">
          <div className="p-4 bg-yellow-500 rounded-2xl text-white shadow-lg shadow-yellow-200"><History /></div>
          <div><p className="text-[10px] font-black text-yellow-600 uppercase tracking-widest">Renovaciones</p><h4 className="text-lg font-black text-yellow-700">3 contratos próximos</h4></div>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-[2rem] flex items-center gap-5 shadow-sm">
          <div className="p-4 bg-[#0A2472] rounded-2xl text-white shadow-lg shadow-blue-200"><FileSignature /></div>
          <div><p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Documentos</p><h4 className="text-lg font-black text-blue-700">5 firmas pendientes</h4></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-card border-none shadow-xl">
          <CardHeader><CardTitle className="text-[#0A2472] flex items-center gap-2"><BookOpen className="h-5 w-5"/> Biblioteca de Contratos</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {[
                { name: 'Contrato Alquiler Sede Central', date: '31/12/2026', status: 'Vigente' },
                { name: 'Servicios IT Outsourcing', date: '15/04/2026', status: 'Por Vencer' },
                { name: 'Convenio Aliado Banesco', date: '20/02/2027', status: 'Vigente' },
                { name: 'Licencia de Software SAP', date: '01/01/2026', status: 'Vencido' }
              ].map((c, i) => (
                <div key={c.name} className="flex items-center justify-between p-5 bg-white/50 rounded-[1.5rem] border border-slate-100 hover:border-primary/20 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-slate-100 rounded-xl group-hover:bg-primary/5 transition-colors"><FileText className="h-5 w-5 text-slate-400 group-hover:text-primary"/></div>
                    <div><p className="font-bold text-sm text-slate-700">{c.name}</p><p className="text-[10px] text-slate-400 font-bold uppercase">Expira: {c.date}</p></div>
                  </div>
                  <Badge className={cn(
                    "rounded-full px-3",
                    c.status === 'Vigente' ? 'bg-green-500' : c.status === 'Por Vencer' ? 'bg-yellow-500' : 'bg-red-500'
                  )}>{c.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-xl">
          <CardHeader><CardTitle className="text-[#0A2472] flex items-center gap-2"><ShieldCheck className="h-5 w-5"/> Cumplimiento Normativo</CardTitle></CardHeader>
          <CardContent className="space-y-6 pt-4">
            {[
              { item: 'Ley de IVA (Providencia 0071)', desc: 'Validación de formatos fiscales y control de series.', done: true },
              { item: 'Cumplimiento LOTTT', desc: 'Cálculo correcto de horas extras y beneficios.', done: true },
              { item: 'Registro SAREN actualizado', desc: 'Última acta de asamblea inscrita en registro.', done: true },
              { item: 'Habilitación Sanitaria', desc: 'Renovación de permisos para comedor corporativo.', done: false }
            ].map((item, i) => (
              <div key={item.item} className="flex items-start gap-4">
                <div className={cn(
                  "h-6 w-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-1 transition-all",
                  item.done ? 'bg-[#4CAF50] border-[#4CAF50] shadow-lg shadow-green-100' : 'border-slate-300 bg-white'
                )}>
                  {item.done && <CheckCircle2 className="h-4 w-4 text-white" />}
                </div>
                <div>
                  <p className={cn("text-sm font-black", item.done ? 'text-slate-700' : 'text-slate-400')}>{item.item}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
            <Separator className="bg-slate-100"/>
            <Button variant="ghost" className="w-full h-12 text-[#0A2472] font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl hover:bg-primary/5">
              Auditar todo el ecosistema <ChevronRight className="ml-2 h-4 w-4"/>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ModuleSostenibilidad({ simulate, history, points, today, trees }: any) {
  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-[#4CAF50] tracking-tighter flex items-center gap-3">
            <Recycle className="h-8 w-8" /> 
            Sostenibilidad Inteligente
          </h3>
          <p className="text-sm text-muted-foreground">Gestión automatizada de residuos y huella de carbono.</p>
        </div>
        <Button onClick={simulate} className="bg-[#4CAF50] hover:bg-[#4CAF50]/90 rounded-2xl h-12 px-8 font-black shadow-xl animate-float">
          <Plus className="mr-2 h-5 w-5" /> SIMULAR RECICLAJE
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Reciclado Hoy" value={`${today.toFixed(1)} kg`} icon={Leaf} variant="accent" />
        <StatCard title="Reciclado Mes" value="3.450 kg" icon={AreaChart} variant="accent" />
        <StatCard title="Puntos Verdes" value={points.toLocaleString()} icon={Zap} variant="accent" />
        <StatCard title="Equivalencia" value={`${trees} Árboles`} icon={History} variant="accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glass-card border-none shadow-2xl overflow-hidden">
          <CardHeader className="bg-[#4CAF50]/5">
            <CardTitle className="text-[#0A2472] flex items-center gap-2"><History className="h-5 w-5 text-[#4CAF50]" /> Historial de Depósitos</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="pl-6">Fecha/Hora</TableHead>
                  <TableHead>Material</TableHead>
                  <TableHead>Peso</TableHead>
                  <TableHead className="text-right pr-6">Puntos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((h: any) => (
                  <TableRow key={h.id} className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <TableCell className="pl-6 text-[10px] font-bold text-slate-400 uppercase">{h.date}</TableCell>
                    <TableCell><Badge variant="outline" className="border-[#4CAF50]/20 text-[#4CAF50] font-bold rounded-lg">{h.type}</Badge></TableCell>
                    <TableCell className="font-bold text-slate-700">{h.weight} kg</TableCell>
                    <TableCell className="text-right pr-6 text-[#4CAF50] font-black">+{h.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="glass-card border-none shadow-xl bg-[#4CAF50]/5 overflow-hidden">
            <div className="h-1 bg-[#4CAF50] w-full" />
            <CardHeader className="pb-2"><CardTitle className="text-xs font-black uppercase text-[#4CAF50] tracking-widest">Simulación Papelera</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-600"><span>Capacidad actual</span><span>72%</span></div>
                <Progress value={72} className="h-3 bg-white" />
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/80 rounded-[1.5rem] border border-[#4CAF50]/10 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-[#4CAF50] animate-ping" />
                <div className="text-xs">
                  <p className="font-black text-[#0A2472] uppercase tracking-tighter">Último reciclaje</p>
                  <p className="font-medium text-slate-500">Hace 5 min - Papel (0.3 kg)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Canje de Recompensas</h4>
            {[
              { t: "Descuento 10% Proveedores", p: 500, icon: ShoppingBag },
              { t: "Donación a Fundación", p: 200, icon: Heart },
              { t: "Kit Ecológico", p: 300, icon: Gift }
            ].map(item => (
              <Card key={item.t} className="glass-card p-4 hover:border-[#4CAF50]/50 transition-all cursor-pointer group shadow-lg border-none">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#4CAF50]/10 rounded-lg text-[#4CAF50] group-hover:scale-110 transition-transform"><item.icon className="h-4 w-4"/></div>
                    <div><p className="font-black text-xs text-slate-700 leading-tight">{item.t}</p><p className="text-[#4CAF50] font-black text-sm">{item.p} Pts</p></div>
                  </div>
                  <Button size="sm" className="bg-[#4CAF50] hover:bg-[#4CAF50]/90 h-8 rounded-lg text-[9px] font-black tracking-widest px-4 shadow-lg shadow-green-100">CANJEAR</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ModulePetroleo() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-[#0A2472] tracking-tighter flex items-center gap-3">
            <Droplets className="h-8 w-8 text-[#0A2472]" /> 
            Gemelo Digital: Activos Energéticos
          </h3>
          <p className="text-sm text-muted-foreground">Monitoreo de infraestructura y telemetría avanzada.</p>
        </div>
        <Badge className="bg-[#F44336] animate-pulse px-4 py-1.5 rounded-full font-bold">ALERTA: PRESIÓN POZO 12</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Card className="lg:col-span-3 glass-card relative min-h-[500px] bg-slate-900 border-none shadow-2xl overflow-hidden rounded-[2.5rem]">
          {/* SIMULACIÓN DE MAPA */}
          <div className="absolute inset-0 bg-[#050505]">
            <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/map/1200/800')] bg-cover bg-center grayscale mix-blend-overlay" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,36,114,0.3),transparent_70%)]" />
            
            {/* MARCADORES */}
            <div className="absolute top-[40%] left-[30%] cursor-pointer group">
              <div className="relative">
                <div className="bg-[#4CAF50] h-4 w-4 rounded-full border-2 border-white shadow-lg animate-bounce" />
                <div className="absolute top-0 left-0 bg-[#4CAF50]/30 h-4 w-4 rounded-full animate-ping" />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-56 bg-card/95 backdrop-blur-xl p-5 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-2xl border border-white/20 translate-y-2 group-hover:translate-y-0">
                <div className="flex items-center gap-2 mb-3 border-b pb-2">
                  <Server className="h-4 w-4 text-[#4CAF50]"/>
                  <span className="text-[10px] font-black uppercase text-[#0A2472] tracking-[0.2em]">Pozo Ayacucho 07</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs"><span className="text-slate-400">Producción:</span><span className="font-black">4.500 bpd</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-400">Presión:</span><span className="text-green-500 font-black">3.200 psi</span></div>
                  <div className="flex justify-between text-xs"><span className="text-slate-400">Temp:</span><span className="text-yellow-500 font-black">85°C</span></div>
                </div>
              </div>
            </div>

            <div className="absolute top-[25%] left-[60%] cursor-pointer group">
              <div className="relative">
                <div className="bg-[#F44336] h-4 w-4 rounded-full border-2 border-white shadow-lg" />
                <div className="absolute top-0 left-0 bg-[#F44336]/50 h-4 w-4 rounded-full animate-ping" />
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-56 bg-white p-5 rounded-[1.5rem] border-2 border-red-100 shadow-2xl">
                <div className="flex items-center gap-2 mb-3 border-b border-red-50 pb-2">
                  <AlertTriangle className="h-4 w-4 text-[#F44336]"/>
                  <span className="text-[10px] font-black uppercase text-[#F44336] tracking-[0.2em]">Pozo Oriente 12</span>
                </div>
                <p className="text-xs font-bold text-slate-600">Presión anormal detectada. Revisar válvulas de alivio.</p>
              </div>
            </div>
          </div>
          
          <div className="absolute top-6 left-6 z-10 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"/>
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Sincronización Satelital Activa</span>
          </div>
        </Card>

        <div className="space-y-6">
          <h4 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Estatus de Activos</h4>
          {[
            { n: "Refinería El Palito", s: "🟢 Normal", p: "98%" },
            { n: "Terminal Jose", s: "🟢 Normal", p: "100%" },
            { n: "Pozo Oriente 12", s: "🔴 Alerta", p: "45%" },
            { n: "Estación San Tomé", s: "🟡 Revisión", p: "82%" }
          ].map(asset => (
            <div key={asset.n} className="p-5 bg-white rounded-2xl shadow-lg border border-slate-50 flex items-center justify-between hover:scale-[1.02] transition-transform cursor-pointer">
              <div><p className="text-sm font-black text-slate-700 leading-none mb-1">{asset.n}</p><p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Capacidad: {asset.p}</p></div>
              <span className="text-xs font-bold">{asset.s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ModuleTesoreria() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-[#0A2472] tracking-tighter">Tesorería Multi-Divisa</h3>
          <p className="text-sm text-muted-foreground">Consolidado bancario y flujo de efectivo en tiempo real.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl h-11 font-bold">Nueva Transferencia</Button>
          <Button className="bg-[#0A2472] rounded-xl h-11 font-bold shadow-lg">Conciliación Bancaria</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { b: "Banesco", bs: "45.678", usd: "1.250" },
          { b: "Provincial", bs: "23.456", usd: "800" },
          { b: "Mercantil", bs: "67.890", usd: "2.100" },
          { b: "Bancaribe", bs: "12.345", usd: "0" }
        ].map(bank => (
          <Card key={bank.b} className="glass-card p-6 border-l-4 border-l-[#0A2472] shadow-xl border-none">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">🏦 {bank.b}</p>
            <div className="space-y-2">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">Saldo VES</p>
                <p className="text-lg font-black text-slate-800 tracking-tighter">Bs. {bank.bs}</p>
              </div>
              <Separator className="opacity-50" />
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">Saldo USD</p>
                <p className="text-lg font-black text-[#4CAF50] tracking-tighter">$ {bank.usd}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="glass-card border-none shadow-2xl overflow-hidden">
        <CardHeader className="bg-[#0A2472]/5">
          <CardTitle className="text-[#0A2472]">Últimos Movimientos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="pl-6">Fecha</TableHead>
                <TableHead>Banco</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-right">Monto Bs.</TableHead>
                <TableHead className="text-right pr-6">Monto $</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-slate-50/50">
                <TableCell className="pl-6 text-xs font-bold text-slate-400 uppercase">Hoy, 10:00</TableCell>
                <TableCell className="font-bold text-slate-700">Banesco</TableCell>
                <TableCell className="text-sm">Pago de Nómina Q1</TableCell>
                <TableCell className="text-right text-red-500 font-black">- Bs. 12.000</TableCell>
                <TableCell className="text-right pr-6 font-medium text-slate-500">- $ 300</TableCell>
              </TableRow>
              <TableRow className="hover:bg-slate-50/50">
                <TableCell className="pl-6 text-xs font-bold text-slate-400 uppercase">Ayer, 15:30</TableCell>
                <TableCell className="font-bold text-slate-700">Mercantil</TableCell>
                <TableCell className="text-sm">Transferencia Recibida #452</TableCell>
                <TableCell className="text-right text-green-500 font-black">+ Bs. 5.400</TableCell>
                <TableCell className="text-right pr-6 font-black text-[#4CAF50]">+ $ 135</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function ModuleMantenimiento() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-[#0A2472] tracking-tighter">Mantenimiento Predictivo</h3>
          <p className="text-sm text-muted-foreground">Estado de salud de activos críticos y prevención de fallas.</p>
        </div>
        <Badge className="bg-[#FFC107] text-[#0A2472] px-4 py-1.5 rounded-full font-black">2 ALERTAS DE PRECAUCIÓN</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: "Taladro TX-100", health: 98, status: "green", time: "150h" },
          { name: "Bomba B-45", health: 72, status: "yellow", time: "7 días" },
          { name: "Compresor C-22", health: 45, status: "red", time: "URGENTE" },
          { name: "Generador G-03", health: 95, status: "green", time: "240h" }
        ].map(item => (
          <Card key={item.name} className="glass-card border-none shadow-xl p-6 group transition-all hover:-translate-y-1">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-primary/5 transition-colors">
                <Wrench className={cn(
                  "h-6 w-6",
                  item.status === 'green' ? 'text-[#4CAF50]' : item.status === 'red' ? 'text-[#F44336]' : 'text-[#FFC107]'
                )} />
              </div>
              <div className={cn("h-2.5 w-2.5 rounded-full shadow-inner", 
                item.status === 'green' ? 'bg-[#4CAF50]' : item.status === 'red' ? 'bg-[#F44336]' : 'bg-[#FFC107]'
              )} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{item.name}</p>
            <h4 className="text-4xl font-black mb-4 tracking-tighter">{item.health}%</h4>
            <div className="space-y-3">
              <Progress value={item.health} className="h-2 bg-slate-100" />
              <div className="flex justify-between text-[10px] font-black uppercase tracking-wider text-slate-400">
                <span>Próx. Mant.</span>
                <span className={item.status === 'red' ? 'text-[#F44336]' : 'text-slate-600'}>{item.time}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="p-8 rounded-[2.5rem] bg-[#0A2472] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
          <BrainCircuit className="h-48 w-48" />
        </div>
        <div className="max-w-xl relative z-10">
          <h4 className="text-2xl font-black mb-4 tracking-tight">Recomendación IA del Sistema</h4>
          <p className="text-lg font-light leading-relaxed opacity-90">
            "Cambiar sellos de la bomba B-45 antes del 20/04/2026. Se detecta un incremento de vibración del 15% en el último turno."
          </p>
        </div>
        <Button className="bg-[#4CAF50] hover:bg-[#4CAF50]/90 text-white font-black px-8 h-14 rounded-2xl shadow-xl shrink-0">GENERAR ORDEN DE TRABAJO</Button>
      </div>
    </div>
  );
}

function ModuleFiscalizacion() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-[#0A2472] tracking-tighter">Fiscalización de Proveedores</h3>
          <p className="text-sm text-muted-foreground">Monitoreo de cumplimiento de terceros y validación de documentos.</p>
        </div>
        <Button className="bg-[#0A2472] rounded-xl h-11 font-black shadow-lg"><Plus className="mr-2 h-4 w-4"/> Registrar Proveedor</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Proveedores Activos" value="47" icon={Users} />
        <StatCard title="En Riesgo Fiscal" value="3" icon={AlertTriangle} variant="danger" />
        <StatCard title="Docs por Vencer" value="8" icon={History} variant="warning" />
      </div>

      <Card className="glass-card border-none shadow-2xl overflow-hidden">
        <CardHeader className="bg-[#0A2472]/5">
          <CardTitle className="text-[#0A2472]">Tabla de Proveedores</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="pl-6">Nombre</TableHead>
                <TableHead>RIF</TableHead>
                <TableHead>Estatus</TableHead>
                <TableHead>Última Validación</TableHead>
                <TableHead className="text-right pr-6">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { n: "Inversiones Los Andes C.A.", r: "J-12345678-9", s: "Activo", v: "20/02/2026", c: "green" },
                { n: "Construcciones Mérida", r: "J-98765432-1", s: "En revisión", v: "15/02/2026", c: "yellow" },
                { n: "Suministros Globales", r: "J-45678912-3", s: "Suspendido", v: "01/02/2026", c: "red" }
              ].map(s => (
                <TableRow key={s.r} className="hover:bg-slate-50/50">
                  <TableCell className="pl-6 font-black text-slate-700">{s.n}</TableCell>
                  <TableCell className="font-mono text-xs font-bold text-slate-400">{s.r}</TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "rounded-full px-3",
                      s.c === 'green' ? 'bg-green-500' : s.c === 'red' ? 'bg-red-500' : 'bg-yellow-500'
                    )}>
                      {s.s}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-medium text-slate-500">{s.v}</TableCell>
                  <TableCell className="text-right pr-6"><Button variant="ghost" size="sm" className="font-black text-[#0A2472] hover:bg-[#0A2472]/5">VER DETALLE</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="p-8 rounded-[2.5rem] bg-amber-50 border-2 border-amber-100 flex items-start gap-6 shadow-sm">
        <div className="p-4 bg-amber-500 rounded-3xl text-white shadow-xl shadow-amber-200"><AlertTriangle className="h-8 w-8"/></div>
        <div>
          <h4 className="text-xl font-black text-amber-800 mb-2">Alertas Recientes</h4>
          <ul className="space-y-2">
            <li className="text-sm text-amber-700 font-medium">• Factura #F001 de Inversiones Los Andes no concilia con declaración fiscal.</li>
            <li className="text-sm text-amber-700 font-medium">• RIF de proveedor Suministros Globales suspendido por SENIAT.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ModuleTienda({ cartCount, addToCart }: any) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-[#0A2472] tracking-tighter">Marketplace Corporativo</h3>
          <p className="text-sm text-muted-foreground">Equipos homologados por CONATEL para tu empresa.</p>
        </div>
        <div className="relative">
          <Button className="rounded-2xl bg-[#0A2472] hover:bg-[#0A2472]/90 h-12 px-6 font-bold shadow-xl relative group">
            <ShoppingBag className="mr-2 h-5 w-5" /> Carrito de Compras
            <span className="absolute -top-2 -right-2 bg-[#4CAF50] text-white text-[10px] font-black h-6 w-6 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-in zoom-in duration-300">{cartCount}</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(p => (
          <Card key={p.id} className="glass-card border-none shadow-xl group hover:scale-[1.03] transition-all duration-300 overflow-hidden rounded-[2rem]">
            <div className="h-48 bg-slate-50 relative flex items-center justify-center group-hover:bg-[#0A2472]/5 transition-colors p-8">
              <Image src={p.image} alt={p.name} layout="fill" className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-4 left-4">
                <Badge className="bg-[#4CAF50] text-white border-none text-[8px] font-black uppercase tracking-widest">Homologado</Badge>
              </div>
            </div>
            <CardContent className="p-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{p.brand}</p>
              <h4 className="text-sm font-black text-slate-800 leading-tight mb-4">{p.name}</h4>
              <p className="text-xl font-black text-[#0A2472]">{formatCurrency(p.price, "USD")}</p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button onClick={addToCart} className="w-full bg-[#0A2472] hover:bg-[#4CAF50] text-[10px] font-black uppercase tracking-widest rounded-xl transition-all h-10 shadow-lg shadow-blue-100">ADQUIRIR CON ALIADO</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 text-center">
        <h4 className="text-xs font-black uppercase text-slate-400 tracking-[0.3em] mb-8">Nuestros Aliados Estratégicos</h4>
        <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-40">
          {['BANESCO', 'DAKA', 'IVOO', 'MOVISTAR'].map(logo => (
            <span key={logo} className="text-2xl font-black tracking-tighter">{logo}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ModuleIdentidad() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 flex flex-col items-center">
      <div className="self-start w-full mb-8">
        <h3 className="text-2xl font-black text-[#0A2472] tracking-tighter">Identidad Digital Corporativa</h3>
        <p className="text-sm text-muted-foreground">Credenciales empresariales selladas en Blockchain.</p>
      </div>
      
      {/* 3D IDENTITY CARD */}
      <div className="relative w-full max-w-md h-64 mt-8 [perspective:1000px] group">
        <motion.div 
          className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(10deg)_rotateX(5deg)] shadow-[0_30px_60px_-15px_rgba(10,36,114,0.3)] rounded-[2.5rem] overflow-hidden"
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A2472] via-[#1e3a8a] to-[#0A2472] p-10 text-white">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-20 translate-x-20 blur-2xl" />
            
            <div className="flex justify-between items-start mb-12">
              <div className="flex items-center gap-3">
                <div className="bg-white p-1.5 rounded-lg shadow-lg"><Zap className="text-[#0A2472] h-5 w-5" /></div>
                <span className="text-lg font-black uppercase tracking-tighter">KYRON ID</span>
              </div>
              <Badge className="bg-[#4CAF50] border-none text-[10px] font-black tracking-widest uppercase px-4 py-1 shadow-lg shadow-green-900/20">VERIFIED</Badge>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-3xl font-black tracking-tight leading-none">Empresa Ejemplo C.A.</h4>
              <p className="text-sm font-bold text-white/60 font-mono tracking-widest uppercase">RIF: J-12345678-9</p>
            </div>
            
            <div className="mt-10 flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em]">Blockchain Anchor</p>
                <p className="text-xs font-mono text-white/80 bg-white/5 px-2 py-1 rounded-md border border-white/10">0x4f2a...9e1b</p>
              </div>
              <div className="bg-white p-2 rounded-2xl shadow-2xl border-4 border-white/10">
                <Image src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://systemkyron.com/verify/example" alt="QR" width={60} height={60} className="rounded-lg"/>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-wrap gap-4 mt-12 justify-center">
        <Button variant="outline" className="rounded-2xl border-[#0A2472]/20 text-[#0A2472] font-black h-12 px-8 hover:bg-primary/5 transition-all"><Share2 className="mr-2 h-4 w-4" /> COMPARTIR</Button>
        <Button variant="outline" className="rounded-2xl border-[#0A2472]/20 text-[#0A2472] font-black h-12 px-8 hover:bg-primary/5 transition-all"><Download className="mr-2 h-4 w-4" /> EXPORTAR PDF</Button>
        <Button className="bg-[#0A2472] hover:bg-[#0A2472]/90 rounded-2xl h-12 px-10 font-black shadow-2xl"><ShieldCheck className="mr-2 h-5 w-5 text-[#4CAF50]" /> VERIFICAR BLOCKCHAIN</Button>
      </div>

      <div className="w-full max-w-2xl mt-16 space-y-6">
        <h4 className="text-xs font-black uppercase text-slate-400 tracking-[0.3em] ml-2">Credenciales Verificables</h4>
        {[
          { t: "Certificado de Solvencia Fiscal", d: "28/02/2026", s: "Válido", icon: ShieldCheck },
          { t: "Licencia de Operación Industrial", d: "10/01/2026", s: "Válido", icon: Award },
          { t: "Sello de Sostenibilidad Kyron", d: "15/02/2026", s: "Válido", icon: Leaf }
        ].map(cred => (
          <div key={cred.t} className="p-6 bg-white rounded-[2rem] border-2 border-slate-50 flex items-center justify-between shadow-sm hover:border-primary/10 transition-all cursor-default">
            <div className="flex items-center gap-5">
              <div className="p-3 bg-green-50 text-[#4CAF50] rounded-2xl"><cred.icon className="h-6 w-6" /></div>
              <div><p className="font-black text-slate-700 leading-tight mb-1">{cred.t}</p><p className="text-[10px] text-slate-400 font-bold uppercase">Sellado en red: {cred.d}</p></div>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-100 bg-green-50 rounded-full px-4 font-black text-[10px]">{cred.s}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModuleConfiguracion() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h3 className="text-2xl font-black text-[#0A2472] tracking-tighter">Configuración del Ecosistema</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Card className="glass-card border-none shadow-xl overflow-hidden rounded-[2.5rem]">
          <CardHeader className="bg-slate-50 p-8"><CardTitle className="text-lg font-black text-[#0A2472] uppercase tracking-widest">Perfil de Empresa</CardTitle></CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid gap-3"><Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Nombre Legal</Label><Input defaultValue="Empresa Ejemplo C.A." className="h-12 rounded-xl bg-slate-50/50" /></div>
            <div className="grid gap-3"><Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Registro de Información Fiscal (RIF)</Label><Input defaultValue="J-12345678-9" className="h-12 rounded-xl bg-slate-50/50" /></div>
            <div className="grid gap-3"><Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Correo de Notificaciones</Label><Input defaultValue="admin@ejemplo.com" className="h-12 rounded-xl bg-slate-50/50" /></div>
            <Button className="bg-[#0A2472] w-full h-12 rounded-2xl font-black shadow-lg">ACTUALIZAR PERFIL</Button>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-none shadow-xl overflow-hidden rounded-[2.5rem]">
          <CardHeader className="bg-slate-50 p-8"><CardTitle className="text-lg font-black text-[#0A2472] uppercase tracking-widest">Preferencias del Sistema</CardTitle></CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="flex items-center justify-between">
              <div><p className="font-black text-slate-700 text-sm">Modo Oscuro</p><p className="text-[10px] text-slate-400 font-bold uppercase">Optimiza el ahorro de energía</p></div>
              <Badge variant="outline" className="rounded-full px-4">Desactivado</Badge>
            </div>
            <Separator className="opacity-50"/>
            <div className="flex items-center justify-between">
              <div><p className="font-black text-slate-700 text-sm">IA Predictiva</p><p className="text-[10px] text-slate-400 font-bold uppercase">Activa alertas preventivas</p></div>
              <Badge className="bg-[#4CAF50] rounded-full px-4">Activo</Badge>
            </div>
            <Separator className="opacity-50"/>
            <div className="flex items-center justify-between">
              <div><p className="font-black text-slate-700 text-sm">Sellado Blockchain</p><p className="text-[10px] text-slate-400 font-bold uppercase">Inmutabilidad de registros</p></div>
              <Badge className="bg-[#4CAF50] rounded-full px-4">Activo</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
