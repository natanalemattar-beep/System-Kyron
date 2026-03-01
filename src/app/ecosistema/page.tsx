
"use client";

import React, { useState, useEffect } from 'react';
import { 
  Home, BarChart3, Users, Scale, Leaf, Droplets, Wallet, 
  Wrench, ShieldCheck, ShoppingBag, Fingerprint, Cog, 
  Bell, Search, Menu, X, Plus, ArrowUpRight, ArrowDownRight, 
  CheckCircle2, AlertTriangle, Info, MapPin, Printer, Download,
  Smartphone, Share2, MessageCircle, ChevronRight, Send, History, Recycle
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
import Image from 'next/image';

// --- PALETA DE COLORES ---
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

const recyclingMix = [
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

const suppliers = [
  { name: "Inversiones Los Andes C.A.", rif: "J-12345678-9", status: "Activo", lastVal: "20/02/2026", risk: "Bajo" },
  { name: "Construcciones Mérida", rif: "J-98765432-1", status: "En revisión", lastVal: "15/02/2026", risk: "Medio" },
  { name: "Suministros Globales", rif: "J-45678912-3", status: "Suspendido", lastVal: "01/02/2026", risk: "Alto" },
];

// --- COMPONENTE PRINCIPAL ---
export default function EcosistemaKyron() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [currentDate, setCurrentDate] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const { toast } = useToast();

  // Sostenibilidad State
  const [recyclingToday, setRecyclingToday] = useState(245);
  const [greenPoints, setGreenPoints] = useState(12450);
  const [treesSaved, setTreesSaved] = useState(18);
  const [recyclingHistory, setRecyclingHistory] = useState([
    { date: "2026-02-28 14:20", type: "Papel", weight: 0.3, points: 5 },
    { date: "2026-02-28 13:45", type: "Plástico", weight: 1.2, points: 15 },
    { date: "2026-02-28 11:10", type: "Cartón", weight: 5.0, points: 50 },
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
    if (recyclingToday % 50 < (recyclingToday + randomWeight) % 50) {
      setTreesSaved(prev => prev + 1);
    }

    const newEntry = {
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
      <aside className={`bg-[#0A2472] text-white flex flex-col transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="bg-white p-1.5 rounded-lg shadow-lg">
            <ShieldCheck className="text-[#0A2472] h-6 w-6" />
          </div>
          {isSidebarOpen && <span className="font-black text-xl tracking-tighter">System Kyron</span>}
        </div>
        
        <nav className="flex-grow py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-white/10 border border-white/20 shadow-inner' 
                : 'hover:bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              <item.icon className={`h-5 w-5 ${activeTab === item.id ? 'text-[#4CAF50]' : ''}`} />
              {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
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
        <header className="h-16 border-b bg-white/60 backdrop-blur-md flex items-center justify-between px-8 z-10">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Ecosistema Corporativo</span>
            <h2 className="text-sm font-medium text-slate-600 capitalize">{currentDate}</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 px-4 py-1.5 bg-slate-100 rounded-full border">
              <span className="text-xs font-bold text-slate-500">Bienvenido,</span>
              <span className="text-xs font-black text-[#0A2472]">Empresa Ejemplo C.A.</span>
            </div>
            
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="absolute top-1 right-1 bg-[#F44336] text-white text-[8px] font-black h-4 w-4 flex items-center justify-center rounded-full border-2 border-white">3</span>
              </Button>
            </div>

            <Avatar className="h-9 w-9 border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform">
              <AvatarImage src="" />
              <AvatarFallback className="bg-[#0A2472] text-white font-black text-xs">EE</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* MAIN MODULE RENDERER */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          {activeTab === 'inicio' && <ModuleInicio />}
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
        </div>

        <footer className="p-4 bg-white/40 backdrop-blur-sm border-t text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            © 2026 System Kyron • Inteligencia Empresarial & Sostenibilidad • v2.0.0 (Gold Release)
          </p>
        </footer>

        {/* FLOATING ASISTENTE */}
        <button className="fixed bottom-24 right-8 bg-[#0A2472] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50 group border-4 border-white/20">
          <MessageCircle className="h-6 w-6" />
          <span className="absolute right-16 bottom-2 bg-white text-[#0A2472] px-4 py-2 rounded-2xl rounded-br-none shadow-xl text-xs font-bold w-48 opacity-0 group-hover:opacity-100 transition-opacity">
            ¿Necesitas ayuda? System Kyron está aquí.
          </span>
        </button>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(10, 36, 114, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(10, 36, 114, 0.2); }
        .glass-card { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 16px; box-shadow: 0 8px 32px 0 rgba(10, 36, 114, 0.05); }
        .animate-float { animation: float 3s ease-in-out infinite; }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-5px); } 100% { transform: translateY(0px); } }
      `}</style>
    </div>
  );
}

// --- SUB-MÓDULOS ---

function ModuleInicio() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-[#0A2472] tracking-tighter">Panel de Control Estratégico</h3>
        <Badge variant="outline" className="bg-[#4CAF50]/10 text-[#4CAF50] border-[#4CAF50]/20 font-bold px-4 py-1">Operación Estable</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Ingresos Mensuales" value="$ 450.000" trend="+12%" icon={ArrowUpRight} />
        <StatCard title="Gastos Operativos" value="$ 280.000" trend="-5%" icon={ArrowDownRight} variant="danger" />
        <StatCard title="Margen Neto" value="38%" trend="Estable" icon={BarChart3} variant="accent" />
        <StatCard title="Riesgo Fiscal" value="0%" trend="Seguro" icon={ShieldCheck} variant="accent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Reciclado Hoy" value="245 kg" icon={Leaf} variant="accent" />
        <StatCard title="Puntos Verdes" value="12.450" icon={Recycle} variant="accent" />
        <StatCard title="Árboles Salvados" value="18" icon={AreaChart} variant="accent" />
        <StatCard title="CO₂ Evitado" value="320 kg" icon={Droplets} variant="accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glass-card">
          <CardHeader>
            <CardTitle className="text-[#0A2472]">Desempeño Financiero</CardTitle>
            <CardDescription>Comparativa semestral de flujo de caja</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financialHistory}>
                <defs>
                  <linearGradient id="colorIng" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A2472" stopOpacity={0.3}/>
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
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="ingresos" stroke="#0A2472" strokeWidth={3} fillOpacity={1} fill="url(#colorIng)" />
                <Area type="monotone" dataKey="gastos" stroke="#F44336" strokeWidth={2} fillOpacity={1} fill="url(#colorGas)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-[#0A2472]">Composición de Residuos</CardTitle>
            <CardDescription>Distribución por tipo de material</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={recyclingMix} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {recyclingMix.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.chart[index % COLORS.chart.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-[#0A2472]">Actividad Reciente del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Acción</TableHead>
                <TableHead>Módulo</TableHead>
                <TableHead className="text-right">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-xs">Hoy, 14:20</TableCell>
                <TableCell className="font-bold">Factura #F-2026-452 emitida</TableCell>
                <TableCell><Badge variant="secondary">Contabilidad</Badge></TableCell>
                <TableCell className="text-right"><CheckCircle2 className="text-[#4CAF50] ml-auto h-4 w-4" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-xs">Hoy, 13:10</TableCell>
                <TableCell className="font-bold">Reciclaje de Papel registrado</TableCell>
                <TableCell><Badge variant="secondary">Sostenibilidad</Badge></TableCell>
                <TableCell className="text-right"><CheckCircle2 className="text-[#4CAF50] ml-auto h-4 w-4" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-xs">Hoy, 09:30</TableCell>
                <TableCell className="font-bold">Nómina Q1 Marzo 2026 procesada</TableCell>
                <TableCell><Badge variant="secondary">RR.HH.</Badge></TableCell>
                <TableCell className="text-right"><CheckCircle2 className="text-[#4CAF50] ml-auto h-4 w-4" /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value, trend, icon: Icon, variant = 'primary' }: any) {
  const colorClass = variant === 'accent' ? 'text-[#4CAF50]' : variant === 'danger' ? 'text-[#F44336]' : 'text-[#0A2472]';
  return (
    <Card className="glass-card hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden border-none shadow-lg">
      <div className={`h-1.5 w-full ${variant === 'accent' ? 'bg-[#4CAF50]' : variant === 'danger' ? 'bg-[#F44336]' : 'bg-[#0A2472]'}`} />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</p>
          <Icon className={`h-4 w-4 ${colorClass}`} />
        </div>
        <h4 className={`text-2xl font-black ${colorClass} tracking-tight`}>{value}</h4>
        {trend && <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Tendencia: <span className={trend.startsWith('+') ? 'text-green-500' : trend.startsWith('-') ? 'text-red-500' : ''}>{trend}</span></p>}
      </CardContent>
    </Card>
  );
}

function ModuleContabilidad() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-[#0A2472] tracking-tighter">Gestión Contable y Fiscal</h3>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-[#0A2472]/20"><Download className="mr-2 h-4 w-4" /> Exportar Libro</Button>
          <Button className="bg-[#0A2472] hover:bg-[#0A2472]/90 rounded-xl"><Plus className="mr-2 h-4 w-4" /> Nueva Factura</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card p-6 flex flex-col items-center text-center">
          <div className="p-3 bg-[#0A2472]/10 rounded-full mb-3 text-[#0A2472]"><History className="h-6 w-6"/></div>
          <p className="text-xs font-bold text-slate-400 uppercase">Declaraciones Mes</p>
          <h4 className="text-2xl font-black">15</h4>
        </Card>
        <Card className="glass-card p-6 flex flex-col items-center text-center">
          <div className="p-3 bg-[#4CAF50]/10 rounded-full mb-3 text-[#4CAF50]"><ArrowUpRight className="h-6 w-6"/></div>
          <p className="text-xs font-bold text-slate-400 uppercase">Facturas Emitidas</p>
          <h4 className="text-2xl font-black">234</h4>
        </Card>
        <Card className="glass-card p-6 flex flex-col items-center text-center">
          <div className="p-3 bg-[#F44336]/10 rounded-full mb-3 text-[#F44336]"><ArrowDownRight className="h-6 w-6"/></div>
          <p className="text-xs font-bold text-slate-400 uppercase">Facturas Recibidas</p>
          <h4 className="text-2xl font-black">187</h4>
        </Card>
        <Card className="glass-card p-6 flex flex-col items-center text-center bg-[#F44336]/5 border-[#F44336]/20">
          <div className="p-3 bg-[#F44336]/10 rounded-full mb-3 text-[#F44336]"><AlertTriangle className="h-6 w-6"/></div>
          <p className="text-xs font-bold text-[#F44336] uppercase">Próximo Vencimiento</p>
          <h4 className="text-lg font-black">IVA (15/03/2026)</h4>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glass-card">
          <CardHeader>
            <CardTitle className="text-[#0A2472]">Libro de Ventas Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {['F-452', 'F-451', 'F-450', 'F-449', 'F-448'].map((num, i) => (
                  <TableRow key={num}>
                    <TableCell className="font-mono font-bold text-[#0A2472]">{num}</TableCell>
                    <TableCell>Distribuidora El Éxito C.A.</TableCell>
                    <TableCell>28/02/2026</TableCell>
                    <TableCell className="font-bold">$ 1.250,00</TableCell>
                    <TableCell><Badge className={i % 3 === 0 ? 'bg-yellow-500' : 'bg-green-500'}>{i % 3 === 0 ? 'Pendiente' : 'Pagado'}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-[#0A2472]">Calendario Fiscal</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-6">
              <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black uppercase text-slate-400 mb-4">
                <span>Lu</span><span>Ma</span><span>Mi</span><span>Ju</span><span>Vi</span><span>Sa</span><span>Do</span>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({length: 31}).map((_, i) => (
                  <div key={i} className={`h-8 w-8 flex items-center justify-center rounded-lg text-xs font-bold ${
                    [15, 22, 30].includes(i+1) ? 'bg-[#F44336] text-white' : 'hover:bg-slate-100 text-slate-600'
                  }`}>
                    {i+1}
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-xs"><div className="h-2 w-2 rounded-full bg-[#F44336]"/> Declaración de IVA</div>
                <div className="flex items-center gap-2 text-xs"><div className="h-2 w-2 rounded-full bg-[#F44336]"/> ISLR Trimestral</div>
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
        <h3 className="text-2xl font-black text-[#0A2472] tracking-tighter">Gestión de Talento Humano</h3>
        <Button className="bg-[#0A2472] rounded-xl"><Plus className="mr-2 h-4 w-4" /> Nuevo Empleado</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Empleados Activos" value="124" icon={Users} />
        <StatCard title="Nómina Mensual" value="$ 85.000" icon={Wallet} />
        <StatCard title="Vacaciones Solicitadas" value="7" icon={Leaf} variant="warning" />
        <StatCard title="Prestaciones" value="100%" icon={CheckCircle2} variant="accent" />
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-[#0A2472]">Nómina de Personal</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empleado</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Ingreso</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialEmployees.map(emp => (
                <TableRow key={emp.id}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="h-8 w-8"><AvatarFallback className="bg-[#4CAF50] text-white text-[10px] font-bold">{emp.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                    <span className="font-bold">{emp.name}</span>
                  </TableCell>
                  <TableCell>{emp.role}</TableCell>
                  <TableCell><Badge variant="secondary">{emp.dept}</Badge></TableCell>
                  <TableCell className="text-xs text-slate-500">{emp.date}</TableCell>
                  <TableCell className="text-right"><Button variant="ghost" size="sm" className="text-[#0A2472] font-bold">Ver Perfil</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function ModuleJuridico() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-[#0A2472] tracking-tighter">Control Jurídico y Normativo</h3>
        <Button className="bg-[#0A2472] rounded-xl">Generar Reporte de Cumplimiento</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#4CAF50]/10 border border-[#4CAF50]/20 p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-[#4CAF50]/20 rounded-full text-[#4CAF50]"><CheckCircle2 /></div>
          <div><p className="text-xs font-bold text-[#4CAF50] uppercase">Alertas</p><h4 className="text-lg font-black text-[#4CAF50]">Ninguna multa activa</h4></div>
        </div>
        <div className="bg-[#FFC107]/10 border border-[#FFC107]/20 p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-[#FFC107]/20 rounded-full text-[#FFC107]"><History /></div>
          <div><p className="text-xs font-bold text-[#FFC107] uppercase">Contratos</p><h4 className="text-lg font-black text-[#FFC107]">3 por renovar</h4></div>
        </div>
        <div className="bg-[#0A2472]/10 border border-[#0A2472]/20 p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-[#0A2472]/20 rounded-full text-[#0A2472]"><Plus /></div>
          <div><p className="text-xs font-bold text-[#0A2472] uppercase">Firma</p><h4 className="text-lg font-black text-[#0A2472]">5 documentos pendientes</h4></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-card">
          <CardHeader><CardTitle className="text-[#0A2472]">Biblioteca de Contratos</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Contrato Alquiler Sede Central', 'Servicios IT Outsourcing', 'Convenio Aliado Banesco'].map((c, i) => (
                <div key={c} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div><p className="font-bold text-sm">{c}</p><p className="text-[10px] text-slate-400 font-bold uppercase">Expira: 31/12/2026</p></div>
                  <Badge variant={i === 1 ? 'outline' : 'default'} className={i === 1 ? 'text-yellow-600 border-yellow-200' : 'bg-green-500'}>{i === 1 ? 'Por Vencer' : 'Vigente'}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader><CardTitle className="text-[#0A2472]">Checklist de Cumplimiento</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Ley de IVA (Providencia 0071)', 'Cumplimiento LOTTT', 'Registro SAREN actualizado', 'Habilitación Sanitaria'].map((item, i) => (
                <div key={item} className="flex items-center gap-3">
                  <div className={`h-5 w-5 rounded border-2 flex items-center justify-center ${i < 3 ? 'bg-[#4CAF50] border-[#4CAF50]' : 'border-slate-300'}`}>
                    {i < 3 && <CheckCircle2 className="h-3 w-3 text-white" />}
                  </div>
                  <span className={`text-sm ${i < 3 ? 'text-slate-700 font-medium' : 'text-slate-400 italic'}`}>{item}</span>
                </div>
              ))}
            </div>
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
        <h3 className="text-2xl font-black text-[#4CAF50] tracking-tighter flex items-center gap-3">
          <Recycle className="h-8 w-8" /> 
          Papelera Inteligente & Sostenibilidad
        </h3>
        <Button onClick={simulate} className="bg-[#4CAF50] hover:bg-[#4CAF50]/90 rounded-xl shadow-lg animate-float">
          <Plus className="mr-2 h-4 w-4" /> Simular Reciclaje
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Reciclado Hoy" value={`${today.toFixed(1)} kg`} icon={Leaf} variant="accent" />
        <StatCard title="Reciclado Mes" value="3.450 kg" icon={AreaChart} variant="accent" />
        <StatCard title="Puntos Verdes" value={points.toLocaleString()} icon={Recycle} variant="accent" />
        <StatCard title="Equivalencia" value={`${trees} Árboles`} icon={History} variant="accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glass-card">
          <CardHeader>
            <CardTitle className="text-[#0A2472] flex items-center gap-2"><History className="h-5 w-5" /> Historial de Depósitos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha/Hora</TableHead>
                  <TableHead>Material</TableHead>
                  <TableHead>Peso</TableHead>
                  <TableHead className="text-right">Puntos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((h: any, i: number) => (
                  <TableRow key={i} className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <TableCell className="text-[10px] font-bold text-slate-400">{h.date}</TableCell>
                    <TableCell><Badge variant="outline" className="border-[#4CAF50]/20 text-[#4CAF50] font-bold">{h.type}</Badge></TableCell>
                    <TableCell className="font-medium">{h.weight} kg</TableCell>
                    <TableCell className="text-right text-[#4CAF50] font-black">+{h.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="glass-card bg-[#4CAF50]/5 border-[#4CAF50]/20">
            <CardHeader><CardTitle className="text-sm font-black uppercase text-[#4CAF50] tracking-widest">Estado Papelera</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><div className="flex justify-between text-xs font-bold mb-1"><span>Capacidad</span><span>72%</span></div><Progress value={72} className="h-2" /></div>
              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl border border-[#4CAF50]/10">
                <div className="h-3 w-3 rounded-full bg-[#4CAF50] animate-pulse" />
                <p className="text-xs font-medium text-slate-600">Último reciclaje: hace 5 minutos - Papel (0.3 kg)</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest">Catálogo de Canjes</h4>
            {[
              { t: "Descuento 10% en proveedores", p: 500 },
              { t: "Kit Ecológico Corporativo", p: 300 }
            ].map(item => (
              <Card key={item.t} className="glass-card p-4 hover:border-[#4CAF50]/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div><p className="font-bold text-xs leading-tight">{item.t}</p><p className="text-[#4CAF50] font-black text-sm">{item.p} Pts</p></div>
                  <Button size="sm" className="bg-[#4CAF50] hover:bg-[#4CAF50]/90 h-8 rounded-lg text-[10px] font-black">CANJEAR</Button>
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
        <h3 className="text-2xl font-black text-[#0A2472] tracking-tighter">Monitoreo de Activos (Petróleo)</h3>
        <Badge className="bg-[#F44336] animate-pulse">1 Alerta Activa</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Card className="lg:col-span-3 glass-card relative min-h-[500px] bg-[#0A2472]/5 overflow-hidden">
          <CardHeader className="absolute top-0 left-0 z-10">
            <CardTitle className="text-xs font-black uppercase text-[#0A2472] tracking-[0.2em]">Mapa de Activos Estratégicos</CardTitle>
          </CardHeader>
          {/* SIMULACIÓN DE MAPA */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[80%] h-[80%] opacity-40 grayscale contrast-125 brightness-75">
               <Image src="https://picsum.photos/seed/map/800/600" alt="Mapa" layout="fill" className="rounded-2xl object-cover" />
            </div>
            {/* MARCADORES */}
            <div className="absolute top-1/2 left-[40%] cursor-pointer group">
              <div className="bg-[#4CAF50] h-4 w-4 rounded-full border-2 border-white shadow-lg animate-bounce" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#0A2472] text-white p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity text-[10px] shadow-2xl">
                <p className="font-black uppercase tracking-widest mb-1 border-b border-white/10 pb-1">Pozo Ayacucho 07</p>
                <div className="space-y-1 mt-2">
                  <div className="flex justify-between"><span>Producción:</span><span className="font-bold">4.500 bpd</span></div>
                  <div className="flex justify-between"><span>Presión:</span><span className="text-green-400 font-bold">3.200 psi</span></div>
                  <div className="flex justify-between"><span>Temp:</span><span className="text-yellow-400 font-bold">85°C</span></div>
                </div>
              </div>
            </div>
            <div className="absolute top-[30%] left-[65%] cursor-pointer group">
              <div className="bg-[#F44336] h-4 w-4 rounded-full border-2 border-white shadow-lg animate-ping" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white p-3 rounded-xl border-2 border-[#F44336] text-[10px] shadow-2xl">
                <p className="font-black uppercase tracking-widest mb-1 border-b border-red-100 pb-1 text-[#F44336]">Pozo Oriente 12</p>
                <p className="font-bold text-slate-600 mt-2">ALERTA: Presión crítica detectada (4.800 psi)</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest">Estado de Infraestructura</h4>
          {[
            { n: "Refinería El Palito", s: "98%", v: "green" },
            { n: "Terminal Jose", s: "100%", v: "green" },
            { n: "Pozo Oriente 12", s: "45%", v: "red" },
            { n: "Estación San Tomé", s: "82%", v: "yellow" }
          ].map(asset => (
            <div key={asset.n} className="p-4 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div><p className="text-xs font-bold leading-none mb-1">{asset.n}</p><p className="text-[10px] text-slate-400 font-bold">Eficiencia: {asset.s}</p></div>
              <div className={`h-3 w-3 rounded-full ${asset.v === 'green' ? 'bg-[#4CAF50]' : asset.v === 'red' ? 'bg-[#F44336]' : 'bg-[#FFC107]'}`} />
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
        <h3 className="text-2xl font-black text-[#0A2472] tracking-tighter">Gestión de Tesorería Multi-Banco</h3>
        <Button className="bg-[#0A2472] rounded-xl">Conciliación Bancaria</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { b: "Banesco", bs: "45.678", usd: "1.250" },
          { b: "Provincial", bs: "23.456", usd: "800" },
          { b: "Mercantil", bs: "67.890", usd: "2.100" },
          { b: "Bancaribe", bs: "12.345", usd: "0" }
        ].map(bank => (
          <Card key={bank.b} className="glass-card p-6 border-l-4 border-l-[#0A2472]">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{bank.b}</p>
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-500">Bs. <span className="text-lg text-slate-800">{bank.bs}</span></p>
              <p className="text-xs font-bold text-slate-500">$ <span className="text-lg text-[#4CAF50]">{bank.usd}</span></p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="glass-card">
        <CardHeader><CardTitle className="text-[#0A2472]">Movimientos de Cuenta (Hoy)</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Banco</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-right">Monto Bs.</TableHead>
                <TableHead className="text-right">Monto $</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-bold">Banesco</TableCell>
                <TableCell>Pago de Nómina Q1</TableCell>
                <TableCell className="text-right text-red-500 font-bold">- Bs. 12.000,00</TableCell>
                <TableCell className="text-right">- $ 300,00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Mercantil</TableCell>
                <TableCell>Transferencia Recibida #452</TableCell>
                <TableCell className="text-right text-green-500 font-bold">+ Bs. 5.400,00</TableCell>
                <TableCell className="text-right">+ $ 135,00</TableCell>
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
        <h3 className="text-2xl font-black text-[#0A2472] tracking-tighter">Mantenimiento Predictivo IA</h3>
        <Badge variant="secondary" className="bg-[#FFC107]/10 text-[#FFC107] border-[#FFC107]/20 font-bold">2 Equipos en Atención</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: "Taladro TX-100", health: 98, status: "green", time: "150h" },
          { name: "Bomba B-45", health: 72, status: "yellow", time: "7 días" },
          { name: "Compresor C-22", health: 45, status: "red", time: "INMEDIATO" },
          { name: "Generador G-03", health: 95, status: "green", time: "240h" }
        ].map(item => (
          <Card key={item.name} className="glass-card p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-bold text-slate-400 uppercase leading-tight">{item.name}</p>
              <div className={`h-2 w-2 rounded-full ${item.status === 'green' ? 'bg-[#4CAF50]' : item.status === 'red' ? 'bg-[#F44336]' : 'bg-[#FFC107]'}`} />
            </div>
            <h4 className="text-3xl font-black mb-2">{item.health}%</h4>
            <Progress value={item.health} className={`h-2 mb-4 ${item.status === 'red' ? 'bg-red-100' : ''}`} />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mant. Sugerido: <span className={item.status === 'red' ? 'text-[#F44336]' : ''}>{item.time}</span></p>
          </Card>
        ))}
      </div>

      <div className="bg-[#0A2472] text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 translate-x-12" />
        <h4 className="text-xl font-bold mb-4 flex items-center gap-3"><Wrench className="text-[#4CAF50]" /> Recomendación del Motor IA</h4>
        <p className="text-lg font-light leading-relaxed max-w-2xl opacity-90">
          Se ha detectado una anomalía térmica en los rodamientos del <span className="font-bold underline decoration-[#4CAF50]">Compresor C-22</span>. La probabilidad de falla mecánica catastrófica es del <span className="text-[#F44336] font-bold">85% en las próximas 24 horas</span>. 
          <br /><br />
          <span className="text-[#4CAF50] font-bold">Acción Sugerida:</span> Detener equipo y sustituir sellos antes del 20/04/2026.
        </p>
        <Button className="mt-8 bg-[#4CAF50] hover:bg-[#4CAF50]/90 text-white font-black px-8 py-6 rounded-2xl shadow-xl">GENERAR ORDEN DE TRABAJO</Button>
      </div>
    </div>
  );
}

function ModuleFiscalizacion() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-[#0A2472] tracking-tighter">Fiscalización de Proveedores</h3>
        <Button className="bg-[#0A2472] rounded-xl">Portal de Autoservicio Proveedores</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Proveedores Activos" value="47" icon={Users} />
        <StatCard title="Proveedores en Riesgo" value="3" icon={AlertTriangle} variant="danger" />
        <StatCard title="Documentos por Vencer" value="8" icon={History} variant="warning" />
      </div>

      <Card className="glass-card">
        <CardHeader><CardTitle className="text-[#0A2472]">Validación de Terceros (KYC/KYB)</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proveedor</TableHead>
                <TableHead>RIF</TableHead>
                <TableHead>Estatus Fiscal</TableHead>
                <TableHead>Riesgo</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map(s => (
                <TableRow key={s.rif}>
                  <TableCell className="font-bold">{s.name}</TableCell>
                  <TableCell className="font-mono text-xs">{s.rif}</TableCell>
                  <TableCell>
                    <Badge className={s.status === 'Activo' ? 'bg-green-500' : s.status === 'Suspendido' ? 'bg-red-500' : 'bg-yellow-500'}>
                      {s.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${s.risk === 'Bajo' ? 'bg-green-500' : s.risk === 'Alto' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                      <span className="text-xs font-bold">{s.risk}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right"><Button variant="ghost" size="sm" className="font-bold text-[#0A2472]">Auditar Documentos</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function ModuleTienda({ cartCount, addToCart }: any) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-[#0A2472] tracking-tighter">Marketplace de Equipos Homologados</h3>
        <div className="relative">
          <Button variant="outline" className="rounded-full border-[#0A2472]/20 h-12 w-12 p-0 relative">
            <ShoppingBag className="h-5 w-5 text-[#0A2472]" />
            <span className="absolute -top-1 -right-1 bg-[#4CAF50] text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">{cartCount}</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[
          { n: "Samsung Galaxy A54", p: "320", i: Smartphone },
          { n: "Tablet Pro 11\"", p: "450", i: Smartphone },
          { n: "Router Fibra 6G", p: "85", i: ShoppingBag },
          { n: "Monitor IPS 27\"", p: "190", i: BarChart3 }
        ].map(p => (
          <Card key={p.n} className="glass-card group hover:scale-105 transition-all overflow-hidden border-none shadow-md">
            <div className="h-40 bg-slate-100 flex items-center justify-center group-hover:bg-[#0A2472]/5 transition-colors">
              <p.i className="h-16 w-16 text-slate-300 group-hover:text-[#0A2472]/40 transition-colors" />
            </div>
            <CardContent className="p-4">
              <div className="flex items-center gap-1 text-[#4CAF50] mb-1"><CheckCircle2 className="h-3 w-3" /><span className="text-[8px] font-black uppercase tracking-widest">Homologado CONATEL</span></div>
              <h4 className="text-sm font-black text-slate-800 leading-tight mb-2">{p.n}</h4>
              <p className="text-lg font-black text-[#0A2472]">$ {p.p}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button onClick={addToCart} className="w-full bg-[#0A2472] hover:bg-[#4CAF50] text-[10px] font-black uppercase tracking-widest rounded-xl transition-colors">Adquirir con Aliado</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ModuleIdentidad() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 flex flex-col items-center">
      <h3 className="text-2xl font-black text-[#0A2472] tracking-tighter self-start">Identidad Digital Soberana</h3>
      
      {/* 3D IDENTITY CARD */}
      <div className="relative w-full max-w-md h-64 mt-12 [perspective:1000px] group">
        <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(10deg)_rotateX(5deg)] shadow-2xl rounded-[2rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A2472] to-[#1e3a8a] p-8 text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
            <div className="flex justify-between items-start mb-12">
              <div className="flex items-center gap-2">
                <div className="bg-white p-1 rounded-md"><ShieldCheck className="text-[#0A2472] h-4 w-4" /></div>
                <span className="text-sm font-black uppercase tracking-tighter">System Kyron ID</span>
              </div>
              <Badge className="bg-[#4CAF50] border-none text-[8px] font-black tracking-widest uppercase">Verified</Badge>
            </div>
            <div className="space-y-1">
              <h4 className="text-2xl font-black tracking-tight">Empresa Ejemplo C.A.</h4>
              <p className="text-xs font-bold text-white/60 font-mono tracking-widest uppercase">RIF: J-12345678-9</p>
            </div>
            <div className="mt-8 flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Blockchain Anchor</p>
                <p className="text-[10px] font-mono text-white/80">0x4f2a...9e1b</p>
              </div>
              <div className="bg-white p-1.5 rounded-lg shadow-inner">
                <Image src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://systemkyron.com/verify/example" alt="QR" width={48} height={48} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <Button variant="outline" className="rounded-xl border-[#0A2472]/20 text-[#0A2472] font-bold"><Share2 className="mr-2 h-4 w-4" /> Compartir</Button>
        <Button variant="outline" className="rounded-xl border-[#0A2472]/20 text-[#0A2472] font-bold"><Download className="mr-2 h-4 w-4" /> Exportar PDF</Button>
        <Button className="bg-[#0A2472] rounded-xl"><ShieldCheck className="mr-2 h-4 w-4" /> Verificar Blockchain</Button>
      </div>

      <div className="w-full max-w-2xl mt-12 space-y-4">
        <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest">Credenciales Verificables</h4>
        {[
          { t: "Certificado de Solvencia Fiscal", d: "28/02/2026", s: "Válido" },
          { t: "Licencia de Operación Industrial", d: "10/01/2026", s: "Válido" },
          { t: "Sello de Sostenibilidad Kyron", d: "15/02/2026", s: "Válido" }
        ].map(cred => (
          <div key={cred.t} className="p-4 bg-white rounded-2xl border flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg"><CheckCircle2 className="h-5 w-5" /></div>
              <div><p className="font-bold text-sm leading-tight">{cred.t}</p><p className="text-[10px] text-slate-400 font-bold uppercase">Sellado: {cred.d}</p></div>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-100 bg-green-50">{cred.s}</Badge>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="glass-card">
          <CardHeader><CardTitle>Perfil de Empresa</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2"><Label>Nombre Legal</Label><Input defaultValue="Empresa Ejemplo C.A." /></div>
            <div className="grid gap-2"><Label>RIF</Label><Input defaultValue="J-12345678-9" /></div>
            <div className="grid gap-2"><Label>Correo Notificaciones</Label><Input defaultValue="admin@ejemplo.com" /></div>
            <Button className="bg-[#0A2472]">Actualizar Perfil</Button>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader><CardTitle>Preferencias del Sistema</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between"><div><p className="font-bold text-sm">Modo Oscuro</p><p className="text-xs text-slate-400 font-bold">Optimiza el ahorro de energía</p></div><Badge variant="outline">Desactivado</Badge></div>
            <div className="flex items-center justify-between"><div><p className="font-bold text-sm">IA Predictiva</p><p className="text-xs text-slate-400 font-bold">Activa alertas automáticas</p></div><Badge className="bg-[#4CAF50]">Activo</Badge></div>
            <div className="flex items-center justify-between"><div><p className="font-bold text-sm">Respaldos Diarios</p><p className="text-xs text-slate-400 font-bold">Sincronización con la nube</p></div><Badge className="bg-[#4CAF50]">Activo</Badge></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
