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
  Activity, Thermometer, Gauge, Cpu, Radio, Box
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

const COLORS = ['#0A2472', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800'];

export default function EcosistemaKyron() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toast } = useToast();

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

  const [oilAssets, setOilAssets] = useState([
    { id: 1, name: "Pozo 12 (Zulia)", bpd: 1250, pressure: "2450 psi", temp: "85°C", status: "optimal" },
    { id: 2, name: "Refinería Amuay", bpd: 45000, pressure: "1850 psi", temp: "120°C", status: "warning" },
    { id: 3, name: "Estación Bachaquero", bpd: 8500, pressure: "2100 psi", temp: "72°C", status: "optimal" },
  ]);

  const [selectedAsset, setSelectedAsset] = useState(oilAssets[0]);

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
      }, ...prev.history].slice(0, 10)
    }));

    toast({
      title: "Reciclaje Exitoso",
      description: `Has depositado ${weight}kg de ${type}. +${points} puntos verdes.`,
    });
  };

  const ModuleInicio = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Ingresos Mensuales" value="$ 450.000" trend="+12%" icon={ArrowUpRight} />
        <StatCard title="Gastos Operativos" value="$ 280.000" trend="-5%" icon={ArrowDownRight} variant="danger" />
        <StatCard title="Margen Neto" value="38%" icon={BarChart3} variant="accent" />
        <StatCard title="Riesgo Fiscal" value="0%" icon={ShieldCheck} variant="accent" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glass-card border-none shadow-2xl">
          <CardHeader><CardTitle>Evolución Financiera</CardTitle></CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { m: 'Sep', i: 380, g: 240 }, { m: 'Oct', i: 410, g: 255 }, { m: 'Nov', i: 395, g: 230 },
                { m: 'Dic', i: 480, g: 290 }, { m: 'Ene', i: 420, g: 260 }, { m: 'Feb', i: 450, g: 280 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="m" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="i" stroke="#0A2472" fill="#0A2472" fillOpacity={0.1} />
                <Area type="monotone" dataKey="g" stroke="#F44336" fill="#F44336" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="glass-card border-none shadow-2xl">
          <CardHeader><CardTitle>Distribución de Residuos</CardTitle></CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{n:'Papel', v:60}, {n:'Plástico', v:25}, {n:'Vidrio', v:10}, {n:'Metal', v:5}]} dataKey="v" innerRadius={60} outerRadius={80} paddingAngle={5}>
                  {COLORS.map((c, i) => <Cell key={i} fill={c} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden text-slate-900 font-sans">
      {/* SIDEBAR */}
      <aside className={cn(
        "bg-[#0A2472] text-white flex flex-col transition-all duration-500 z-30 shadow-2xl",
        isSidebarOpen ? 'w-72' : 'w-24'
      )}>
        <div className="p-8 flex items-center gap-4 border-b border-white/5">
          <div className="bg-white p-2 rounded-2xl shadow-xl shrink-0">
            <Logo className="text-[#0A2472] h-8 w-8" />
          </div>
          {isSidebarOpen && <span className="font-black text-xl tracking-tighter uppercase italic opacity-90">Kyron</span>}
        </div>
        
        <nav className="flex-grow py-8 px-4 space-y-2 overflow-y-auto">
          {[
            { id: 'inicio', label: 'Inicio', icon: Home },
            { id: 'contabilidad', label: 'Contabilidad', icon: BarChart3 },
            { id: 'rrhh', label: 'RR.HH.', icon: Users },
            { id: 'juridico', label: 'Jurídico', icon: Scale },
            { id: 'sostenibilidad', label: 'Sostenibilidad', icon: Recycle },
            { id: 'petroleo', label: 'Petróleo', icon: Droplets },
            { id: 'tesoreria', label: 'Tesoreria', icon: Wallet },
            { id: 'mantenimiento', label: 'Mantenimiento', icon: Wrench },
            { id: 'fiscalizacion', label: 'Fiscalización', icon: ShieldCheck },
            { id: 'tienda', label: 'Tienda', icon: ShoppingBag },
            { id: 'identidad', label: 'Identidad Digital', icon: Fingerprint },
            { id: 'configuracion', label: 'Configuración', icon: Cog },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group relative",
                activeTab === item.id 
                ? 'bg-white/10 border-l-4 border-[#4CAF50]' 
                : 'hover:bg-white/5 text-slate-400 hover:text-white'
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", activeTab === item.id ? 'text-[#4CAF50]' : '')} />
              {isSidebarOpen && <span className="text-sm font-black uppercase tracking-widest">{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="h-20 border-b bg-white/40 backdrop-blur-md flex items-center justify-between px-10 z-20">
          <div className="flex flex-col">
            <h2 className="text-[10px] font-black text-[#0A2472] uppercase tracking-[0.3em] mb-1">
              {new Date().toLocaleDateString('es-VE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h2>
            <p className="text-sm font-bold text-slate-500">Bienvenido, Empresa Ejemplo C.A.</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-[#0A2472]/5">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 bg-red-500 text-white text-[8px] font-black h-4 w-4 flex items-center justify-center rounded-full border-2 border-white">3</span>
              </Button>
            </div>
            <Avatar className="h-10 w-10 border-2 border-[#0A2472]/10 shadow-lg">
              <AvatarFallback className="bg-[#0A2472] text-white font-black text-xs">EC</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10">
          <AnimatePresence mode="wait">
            <div key={activeTab}>
              {activeTab === 'inicio' && <ModuleInicio />}
              {activeTab === 'sostenibilidad' && <ModuleSostenibilidad sustainabilityData={sustainabilityData} simulateRecycling={simulateRecycling} />}
              {/* Other modules would go here */}
              {!['inicio', 'sostenibilidad'].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
                  <div className="p-8 glass-card rounded-[3rem] shadow-2xl">
                    <LayoutDashboard className="h-20 w-20 text-[#0A2472]/20 mx-auto mb-4" />
                    <h3 className="text-2xl font-black text-[#0A2472] uppercase tracking-tighter">Módulo {activeTab}</h3>
                    <p className="text-slate-500 max-w-md mx-auto mt-4">Interfaz en proceso de sincronización con el núcleo central de Kyron. El diseño 3D y la telemetría están siendo activados.</p>
                    <Button onClick={() => setActiveTab('inicio')} className="btn-3d-primary mt-8 px-8 h-12 text-xs font-black uppercase">Volver al Inicio</Button>
                  </div>
                </div>
              )}
            </div>
          </AnimatePresence>
        </div>

        <footer className="h-12 border-t bg-white/40 flex items-center justify-center px-10 text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">
          System Kyron v2.0 • 2026 • © Todos los derechos reservados
        </footer>
      </main>
    </div>
  );
}

function StatCard({ title, value, trend, icon: Icon, variant = 'primary' }: any) {
  const colorClass = variant === 'accent' ? 'text-[#4CAF50]' : variant === 'danger' ? 'text-[#F44336]' : 'text-[#0A2472]';
  return (
    <Card className="glass-card hover:scale-[1.02] transition-all duration-300 border-none group relative overflow-hidden shadow-2xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</p>
          <div className={cn("p-2 rounded-xl bg-slate-50", colorClass)}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <h4 className={cn("text-2xl font-black tracking-tighter mb-1", colorClass)}>{value}</h4>
        {trend && <p className="text-[10px] font-bold text-slate-400">Tendencia: <span className={trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}>{trend}</span></p>}
      </CardContent>
    </Card>
  );
}

function ModuleSostenibilidad({ sustainabilityData, simulateRecycling }: any) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-[#0A2472]">Sostenibilidad: Papelera Inteligente</h3>
        <Button onClick={simulateRecycling} className="btn-3d-secondary px-8 h-12 text-xs font-black uppercase">
          <Recycle className="mr-2 h-4 w-4" /> Simular Reciclaje
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Reciclado Hoy" value={`${sustainabilityData.today.toFixed(1)} kg`} icon={Leaf} variant="accent" />
        <StatCard title="Meta Mensual" value={`${sustainabilityData.month} kg`} icon={Target} />
        <StatCard title="Puntos Acumulados" value={sustainabilityData.points.toLocaleString()} icon={Zap} variant="accent" />
        <StatCard title="Árboles Salvados" value={sustainabilityData.trees} icon={History} variant="accent" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-card border-none shadow-2xl">
          <CardHeader><CardTitle>Historial de Trazabilidad</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Material</TableHead>
                  <TableHead>Peso</TableHead>
                  <TableHead className="text-right">Puntos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sustainabilityData.history.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-xs">{item.date}</TableCell>
                    <TableCell><Badge variant="secondary">{item.type}</Badge></TableCell>
                    <TableCell className="font-mono">{item.weight} kg</TableCell>
                    <TableCell className="text-right font-bold text-[#4CAF50]">+{item.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="glass-card border-none shadow-2xl">
          <CardHeader><CardTitle>Catálogo de Canjes Verdes</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {[
              { n: 'Bono Factura 5%', p: 5000, i: Gift },
              { n: 'Crédito Cashea Plus', p: 8000, i: Award },
              { n: 'Kit Oficina Eco', p: 3000, i: ShoppingBag },
              { n: 'Donación Fundación', p: 1000, i: Heart },
            ].map(item => (
              <div key={item.n} className="p-4 border rounded-2xl flex flex-col items-center text-center gap-2 hover:bg-primary/5 transition-colors">
                <item.i className="h-8 w-8 text-primary" />
                <p className="text-sm font-bold">{item.n}</p>
                <p className="text-xs text-muted-foreground">{item.p} pts</p>
                <Button variant="outline" size="sm" className="w-full mt-2 rounded-xl">Canjear</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}