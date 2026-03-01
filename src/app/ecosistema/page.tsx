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
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn, formatCurrency } from "@/lib/utils";
import { Logo } from "@/components/logo";

// --- CONSTANTES ---
const COLORS = ['#0A2472', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800'];

export default function EcosistemaKyron() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const { toast } = useToast();

  // --- ESTADO SOSTENIBILIDAD ---
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
      }, ...prev.history].slice(0, 10)
    }));

    toast({
      title: "Reciclaje Exitoso",
      description: `Has depositado ${weight}kg de ${type}. +${points} puntos verdes.`,
    });
  };

  // --- COMPONENTES DE MÓDULOS ---

  const ModuleInicio = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Ingresos Mensuales" value="$ 450.000" trend="+12%" icon={ArrowUpRight} />
        <StatCard title="Gastos Operativos" value="$ 280.000" trend="-5%" icon={ArrowDownRight} variant="danger" />
        <StatCard title="Margen Neto" value="38%" icon={BarChart3} variant="accent" />
        <StatCard title="Riesgo Fiscal" value="0%" icon={ShieldCheck} variant="accent" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Reciclado Hoy" value={`${sustainabilityData.today.toFixed(1)} kg`} icon={Leaf} variant="accent" />
        <StatCard title="Puntos Verdes" value={sustainabilityData.points.toLocaleString()} icon={Zap} variant="accent" />
        <StatCard title="Árboles Salvados" value={sustainabilityData.trees} icon={History} variant="accent" />
        <StatCard title="CO₂ Evitado" value="320 kg" icon={Droplets} variant="accent" />
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

  const ModuleSostenibilidad = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-[#0A2472]">Gestión de Papelera Inteligente</h3>
        <Button onClick={simulateRecycling} className="btn-3d-secondary">
          <Recycle className="mr-2 h-4 w-4" /> Simular Reciclaje
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Reciclado Hoy" value={`${sustainabilityData.today.toFixed(1)} kg`} icon={Leaf} variant="accent" />
        <StatCard title="Meta Mensual" value={`${sustainabilityData.month} kg`} icon={Target} />
        <StatCard title="Puntos Acumulados" value={sustainabilityData.points.toLocaleString()} icon={Zap} variant="accent" />
        <StatCard title="Árboles Equivalentes" value={sustainabilityData.trees} icon={History} variant="accent" />
      </div>
      <Card className="glass-card border-none shadow-2xl">
        <CardHeader><CardTitle>Historial de Trazabilidad</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha/Hora</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Peso (kg)</TableHead>
                <TableHead className="text-right">Puntos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sustainabilityData.history.map(item => (
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
    </div>
  );

  const ModuleIdentidad = () => (
    <div className="flex flex-col items-center justify-center py-12 animate-in zoom-in duration-500">
      <motion.div 
        className="relative w-80 h-[480px] perspective-1000 group"
        whileHover={{ rotateY: 10, rotateX: 5 }}
      >
        <Card className="w-full h-full glass-card border-2 border-primary/20 rounded-[2.5rem] overflow-hidden flex flex-col items-center p-8 text-center shadow-[0_20px_50px_rgba(10,36,114,0.3)]">
          <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mb-6 border border-primary/10">
            <Logo className="h-16 w-16" />
          </div>
          <h3 className="text-2xl font-black tracking-tighter mb-1 text-primary">System Kyron</h3>
          <p className="text-[10px] uppercase font-black tracking-widest text-[#4CAF50] mb-8">Ecosistema Verificado</p>
          
          <div className="w-full space-y-4 text-left mb-8">
            <div className="space-y-1">
              <p className="text-[8px] uppercase font-black text-muted-foreground tracking-widest">Identificador Fiscal</p>
              <p className="text-xs font-bold font-mono">RIF: J-12345678-9</p>
            </div>
            <div className="space-y-1">
              <p className="text-[8px] uppercase font-black text-muted-foreground tracking-widest">Global ID</p>
              <p className="text-xs font-bold font-mono">RUN: 25.123.456-K</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl mb-8 shadow-inner border">
            <Image src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=kyron-identity-verified" alt="QR Identity" width={120} height={120} />
          </div>

          <div className="mt-auto flex gap-2 w-full">
            <Button className="flex-1 btn-3d-primary h-10 text-[10px] font-black uppercase">Compartir</Button>
            <Button variant="outline" className="flex-1 h-10 text-[10px] font-black uppercase rounded-xl">Blockchain</Button>
          </div>
        </Card>
      </motion.div>
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
              {activeTab === 'sostenibilidad' && <ModuleSostenibilidad />}
              {activeTab === 'identidad' && <ModuleIdentidad />}
              {!['inicio', 'sostenibilidad', 'identidad'].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
                  <div className="p-8 glass-card rounded-[3rem] shadow-2xl">
                    <LayoutDashboard className="h-20 w-20 text-[#0A2472]/20 mx-auto mb-4" />
                    <h3 className="text-2xl font-black text-[#0A2472] uppercase tracking-tighter">Módulo {activeTab}</h3>
                    <p className="text-slate-500 max-w-md mx-auto mt-4">Interfaz en proceso de sincronización con el núcleo central. Esta funcionalidad está disponible en la versión completa.</p>
                    <Button onClick={() => setActiveTab('inicio')} className="btn-3d-primary mt-8 px-8 h-12">Volver al Inicio</Button>
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

      {/* Floating Assistant */}
      <button 
        onClick={() => toast({ title: "System Kyron Assistant", description: "¿En qué puedo ayudarte hoy?" })}
        className="fixed bottom-8 right-8 h-16 w-16 bg-[#0A2472] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 group"
      >
        <MessageCircle className="h-8 w-8" />
        <span className="absolute right-20 bg-[#0A2472] text-white text-[10px] font-black px-4 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          ¿Necesitas ayuda?
        </span>
      </button>
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