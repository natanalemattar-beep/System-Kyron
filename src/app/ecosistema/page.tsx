
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

const wasteDistribution = [
  { name: 'Papel', value: 60 },
  { name: 'Plástico', value: 25 },
  { name: 'Vidrio', value: 10 },
  { name: 'Metal', value: 5 },
];

// --- COMPONENTES AUXILIARES ---

function StatCard({ title, value, trend, icon: Icon, variant = 'primary' }: any) {
  const colorClass = variant === 'accent' ? 'text-[#4CAF50]' : variant === 'danger' ? 'text-[#F44336]' : 'text-[#0A2472]';
  const bgColor = variant === 'accent' ? 'bg-[#4CAF50]' : variant === 'danger' ? 'bg-[#F44336]' : 'bg-[#0A2472]';
  
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="glass-card hover:scale-[1.02] transition-all duration-300 border-none shadow-xl overflow-hidden group relative">
        <div className={cn("absolute top-0 left-0 h-1 w-full opacity-20", bgColor)} />
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">{title}</p>
            <div className={cn("p-2 rounded-xl bg-slate-50 group-hover:scale-110 transition-transform", colorClass)}>
              <Icon className="h-4 w-4" />
            </div>
          </div>
          <h4 className={cn("text-2xl font-black tracking-tighter mb-1", colorClass)}>{value}</h4>
          {trend && (
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Tendencia: <span className={trend.startsWith('+') ? 'text-green-500' : trend.startsWith('-') ? 'text-red-500' : ''}>{trend}</span>
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// --- MÓDULO INICIO ---
function ModuleInicio() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h3 className="text-3xl font-black text-[#0A2472] tracking-tighter">Panel de Control Estratégico</h3>
        <p className="text-sm text-muted-foreground font-medium">Resumen consolidado del rendimiento corporativo y ambiental.</p>
      </div>

      {/* Fila 1: KPIs Generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Ingresos Mensuales" value="$ 450.000" trend="+12%" icon={ArrowUpRight} />
        <StatCard title="Gastos Operativos" value="$ 280.000" trend="-5%" icon={ArrowDownRight} variant="danger" />
        <StatCard title="Margen Neto" value="38%" icon={BarChart3} variant="accent" />
        <StatCard title="Riesgo Fiscal" value="0%" icon={ShieldCheck} variant="accent" />
      </div>

      {/* Fila 2: KPIs Sostenibilidad */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Reciclado Hoy" value="245 kg" icon={Leaf} variant="accent" />
        <StatCard title="Puntos Verdes" value="12.450" icon={Zap} variant="accent" />
        <StatCard title="Árboles Salvados" value="18" icon={History} variant="accent" />
        <StatCard title="CO₂ Evitado" value="320 kg" icon={Droplets} variant="accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gráfico Líneas */}
        <Card className="lg:col-span-2 glass-card border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="text-[#0A2472] flex items-center gap-2 font-black text-lg">
              <AreaChart className="h-5 w-5 text-primary"/> Desempeño Financiero
            </CardTitle>
            <CardDescription className="font-medium">Evolución de ingresos vs gastos (Últimos 6 meses)</CardDescription>
          </CardHeader>
          <CardContent className="h-[320px]">
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
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}} />
                <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', fontWeight: 'bold'}} />
                <Area type="monotone" dataKey="ingresos" stroke="#0A2472" strokeWidth={4} fillOpacity={1} fill="url(#colorIng)" />
                <Area type="monotone" dataKey="gastos" stroke="#F44336" strokeWidth={3} fillOpacity={1} fill="url(#colorGas)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico Pastel */}
        <Card className="glass-card border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="text-[#0A2472] flex items-center gap-2 font-black text-lg">
              <Recycle className="h-5 w-5 text-accent"/> Distribución de Residuos
            </CardTitle>
            <CardDescription className="font-medium">Materiales procesados por tipo</CardDescription>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={wasteDistribution} innerRadius={70} outerRadius={100} paddingAngle={8} dataKey="value">
                  {wasteDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.chart[index % COLORS.chart.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{fontWeight: 'bold', fontSize: '12px'}} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabla Actividad Reciente */}
      <Card className="glass-card border-none shadow-2xl overflow-hidden">
        <CardHeader className="bg-[#0A2472]/5 border-b border-slate-100">
          <CardTitle className="text-[#0A2472] flex items-center gap-2 font-black">
            <History className="h-5 w-5"/> Actividad Reciente del Sistema
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="pl-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Fecha</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400">Descripción de Acción</TableHead>
                <TableHead className="text-right pr-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { date: "Hoy, 14:20", desc: "Factura Fiscal #F-2026-452 emitida exitosamente", status: "Completado" },
                { date: "Hoy, 13:10", desc: "Reciclaje de Papel (1.2kg) registrado en Sede Caracas", status: "Completado" },
                { date: "Hoy, 09:30", desc: "Nómina Q1 Marzo 2026 procesada para 124 empleados", status: "Completado" },
                { date: "Ayer, 17:45", desc: "Contrato TechSolutions renovado por Asesoría Legal", status: "Completado" },
                { date: "Ayer, 11:20", desc: "Mantenimiento preventivo Bomba B-45 iniciado", status: "En Proceso" }
              ].map((row, i) => (
                <TableRow key={i} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="pl-8 text-xs text-slate-400 font-black uppercase">{row.date}</TableCell>
                  <TableCell className="font-bold text-slate-700 text-sm">{row.desc}</TableCell>
                  <TableCell className="text-right pr-8">
                    <Badge variant="outline" className={cn(
                      "font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-lg border-none shadow-sm",
                      row.status === "Completado" ? "text-green-600 bg-green-50" : "text-yellow-600 bg-yellow-50"
                    )}>
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

// --- COMPONENTE MAESTRO ---
export default function EcosistemaKyron() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [currentDate, setCurrentDate] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(new Date().toLocaleDateString('es-ES', options));
  }, []);

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

  const handleDemoClick = () => {
    toast({
      title: "Funcionalidad en Demostración",
      description: "Esta acción está simulada para fines de visualización del ecosistema Kyron.",
    });
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden text-slate-900 font-sans selection:bg-primary/10">
      {/* --- SIDEBAR --- */}
      <aside className={cn(
        "bg-[#0A2472] text-white flex flex-col transition-all duration-500 z-30 shadow-2xl relative",
        isSidebarOpen ? 'w-72' : 'w-24'
      )}>
        <div className="p-8 flex items-center gap-4 border-b border-white/5">
          <div className="bg-white p-2 rounded-2xl shadow-2xl shrink-0">
            <Zap className="text-[#0A2472] h-7 w-7" />
          </div>
          {isSidebarOpen && <span className="font-black text-2xl tracking-tighter uppercase italic opacity-90">Kyron</span>}
        </div>
        
        <nav className="flex-grow py-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                activeTab === item.id 
                ? 'bg-white/10 border border-white/10 shadow-inner' 
                : 'hover:bg-white/5 text-slate-400 hover:text-white'
              )}
            >
              {activeTab === item.id && <motion.div layoutId="active-pill" className="absolute left-0 w-1 h-6 bg-[#4CAF50] rounded-r-full" />}
              <item.icon className={cn("h-5 w-5 shrink-0 transition-transform group-hover:scale-110", activeTab === item.id ? 'text-[#4CAF50]' : '')} />
              {isSidebarOpen && <span className="text-sm font-black uppercase tracking-widest whitespace-nowrap">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center h-12 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </aside>

      {/* --- CONTENT AREA --- */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(10,36,114,0.03),transparent_50%)]">
        {/* HEADER */}
        <header className="h-20 border-b bg-white/40 backdrop-blur-2xl flex items-center justify-between px-10 z-20 shadow-sm">
          <div className="flex flex-col">
            <h2 className="text-xs font-black text-[#0A2472] uppercase tracking-[0.3em] mb-1">{currentDate}</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-500 italic">Bienvenido,</span>
              <span className="text-sm font-black text-slate-800">Empresa Ejemplo C.A.</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-[#0A2472]/5 rounded-full border border-[#0A2472]/5">
              <Search className="h-4 w-4 text-slate-400" />
              <input type="text" placeholder="Buscar en el ecosistema..." className="bg-transparent border-none text-xs font-bold outline-none w-48 placeholder:text-slate-400" />
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-2xl hover:bg-[#0A2472]/5 transition-colors" onClick={handleDemoClick}>
                <Bell className="h-6 w-6 text-slate-600" />
                <span className="absolute top-3 right-3 bg-[#F44336] text-white text-[9px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-lg">3</span>
              </Button>

              <div className="h-10 w-px bg-slate-200" />

              <div className="flex items-center gap-3 cursor-pointer group" onClick={handleDemoClick}>
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-black text-slate-800 leading-none mb-1">Adm. General</p>
                  <p className="text-[10px] font-bold text-[#4CAF50] uppercase tracking-widest">En Línea</p>
                </div>
                <Avatar className="h-12 w-12 border-2 border-white shadow-xl group-hover:scale-105 transition-transform">
                  <AvatarFallback className="bg-gradient-to-br from-[#0A2472] to-[#1e3a8a] text-white font-black text-sm">AD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN RENDERER */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {activeTab === 'inicio' && <ModuleInicio />}
              {activeTab !== 'inicio' && (
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                  <div className="p-8 bg-white/50 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-white/20">
                    <LayoutDashboard className="h-20 w-20 text-[#0A2472]/20 mx-auto mb-6" />
                    <h3 className="text-3xl font-black text-[#0A2472] tracking-tighter uppercase italic">Módulo {activeTab}</h3>
                    <p className="text-slate-500 font-medium max-w-md mt-4">Estamos preparando la interfaz de este módulo. <br/>Pronto estará disponible en la Fase 2 del desarrollo.</p>
                    <Button className="mt-8 bg-[#0A2472] rounded-2xl h-12 px-8 font-black shadow-xl" onClick={() => setActiveTab('inicio')}>Volver al Inicio</Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <footer className="h-12 border-t bg-white/40 backdrop-blur-md flex items-center justify-center px-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] z-20">
          System Kyron v2.0 • 2026 • © Todos los derechos reservados
        </footer>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(10, 36, 114, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(10, 36, 114, 0.2); }
        .glass-card { background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 32px; box-shadow: 0 20px 50px rgba(10, 36, 114, 0.05); }
      `}</style>
    </div>
  );
}
