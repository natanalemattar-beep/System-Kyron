"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Droplets, Wallet, ShieldCheck, Recycle, Fingerprint,
  ChevronRight, Zap, ShieldAlert, LayoutDashboard, Calendar, Network, Cpu, Box, Activity,
  Search, Bell, Info, ArrowUpRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

export default function EcosistemaKyron() {
  const { toast } = useToast();
  const user = { name: "OPERADOR CENTRAL", email: "noc@kyron.com", fallback: "OC" };

  const [sustainabilityData, setSustainabilityData] = useState({
    today: 245,
    month: 3450,
    points: 12450,
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
      title: "PROTOCOLO DE INYECCIÓN ACTIVO",
      description: `Transmitiendo ${weight}kg de ${type} al ledger inmutable.`,
    });
  };

  return (
    <div className="flex min-h-screen bg-background overflow-hidden hud-grid">
      <AppSidebar />
      
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <AppHeader user={user} dashboardHref="/ecosistema" />
        
        <main className="flex-1 container mx-auto p-6 md:p-12 pt-24 md:pt-32 overflow-y-auto custom-scrollbar">
          <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-16"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 border-l-8 border-primary pl-10 py-4">
                <div>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic italic-shadow leading-none">Centro de Mando</h2>
                    <p className="text-sm font-black text-primary uppercase tracking-[0.6em] mt-4">Terminal de Operaciones Globales • 2026</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="h-16 px-10 rounded-lg text-[11px] font-black uppercase tracking-widest border-white/10 bg-white/5 hover:bg-white/10 transition-all">Sincronización Total</Button>
                    <Button className="btn-3d-primary h-16 px-10">Acceso Nivel 5</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard title="Liquidez Consolidada" value="Bs. 12.4M" trend="+8.2%" icon={Wallet} />
                <StatCard title="Telemetría Crudo" value="85.4k BPD" trend="+1.5%" icon={Droplets} />
                <StatCard title="Riesgo Fiscal" value="0.000%" icon={ShieldCheck} variant="accent" />
                <StatCard title="Eco-Créditos" value={sustainabilityData.points.toLocaleString()} icon={Recycle} variant="accent" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <Card className="lg:col-span-2 titanium-card rounded-2xl overflow-hidden relative group">
                  <div className="absolute top-6 right-8 flex items-center gap-3 text-[10px] font-black text-primary animate-pulse">
                    <Activity className="h-4 w-4" /> TRANSMISIÓN DE DATOS ACTIVA
                  </div>
                  <CardHeader className="p-10 pb-0">
                    <CardTitle className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
                        <BarChart3 className="text-primary h-8 w-8" />
                        Flujo Transaccional IA
                    </CardTitle>
                    <CardDescription className="text-[11px] font-bold uppercase tracking-[0.4em] opacity-30 mt-2">Métricas vectoriales de rendimiento operativo</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[450px] p-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { m: 'Oct', i: 380, g: 240 }, { m: 'Nov', i: 410, g: 255 }, { m: 'Dic', i: 450, g: 230 },
                        { m: 'Ene', i: 480, g: 290 }, { m: 'Feb', i: 520, g: 260 }, { m: 'Mar', i: 580, g: 280 }
                      ]}>
                        <defs>
                            <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="m" axisLine={false} tickLine={false} stroke="#475569" fontSize={11} fontWeight="900" />
                        <YAxis axisLine={false} tickLine={false} stroke="#475569" fontSize={11} fontWeight="900" />
                        <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0px', fontSize: '11px', fontWeight: '900' }} />
                        <Area type="monotone" dataKey="i" stroke="#2563eb" strokeWidth={6} fill="url(#colorPrimary)" />
                        <Area type="monotone" dataKey="g" stroke="#22c55e" strokeWidth={6} fill="transparent" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <div className="space-y-10">
                    <Card className="titanium-card rounded-2xl border-l-4 border-red-500">
                        <CardHeader className="p-8 pb-4"><CardTitle className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">Alertas de Sistema</CardTitle></CardHeader>
                        <CardContent className="px-8 pb-8 space-y-6">
                            <div className="group flex items-start gap-5 p-6 rounded-lg bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-colors">
                                <ShieldAlert className="h-8 w-8 text-red-500 shrink-0 mt-1" />
                                <div>
                                    <p className="text-[12px] font-black uppercase tracking-tighter text-red-500">Anomalía Detectada</p>
                                    <p className="text-[11px] text-muted-foreground leading-tight mt-2 font-medium">Inconsistencia en retención IVA periodo 03-2026. Motor IA aplicando protocolo de autocorrección.</p>
                                </div>
                            </div>
                            <div className="group flex items-start gap-5 p-6 rounded-lg bg-orange-500/5 border border-orange-500/10 hover:bg-orange-500/10 transition-colors">
                                <Calendar className="h-8 w-8 text-orange-500 shrink-0 mt-1" />
                                <div>
                                    <p className="text-[12px] font-black uppercase tracking-tighter text-orange-500">Mantenimiento Preventivo</p>
                                    <p className="text-[11px] text-muted-foreground leading-tight mt-2 font-medium">Habilitación CONATEL CON-003 en ventana de renovación crítica (48h).</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-[#050505] text-white border border-white/10 shadow-2xl overflow-hidden relative rounded-2xl group">
                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-20 transition-all duration-700"><Fingerprint className="h-48 w-48" /></div>
                        <CardHeader className="p-8 relative z-10">
                            <CardTitle className="text-3xl font-black uppercase tracking-tighter italic">ID DIGITAL 3D</CardTitle>
                            <CardDescription className="text-primary text-[11px] font-black uppercase tracking-[0.4em] mt-2">Ledger Validated</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 relative z-10">
                            <div className="p-6 bg-white/5 rounded-lg border border-white/10 backdrop-blur-3xl shadow-inner">
                                <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 mb-2">Identificador Maestro</p>
                                <p className="text-3xl font-mono font-black tracking-tighter text-white/90">J-12345678-9</p>
                            </div>
                        </CardContent>
                        <CardFooter className="p-8 pt-0 relative z-10">
                            <Button variant="secondary" className="w-full btn-3d-secondary h-16 text-xs">AUTENTICACIÓN BIOMÉTRICA</Button>
                        </CardFooter>
                    </Card>
                </div>
              </div>

              {/* Botón de Acción de Reciclaje */}
              <div className="flex flex-col items-center justify-center py-20 space-y-10 bg-white/5 rounded-[3rem] border border-white/5">
                  <div className="flex items-center gap-8 text-sm font-black uppercase tracking-[0.8em] text-white/20">
                    <div className="h-[2px] w-24 bg-white/10" />
                    ACTIVOS VERDES BLOCKCHAIN
                    <div className="h-[2px] w-24 bg-white/10" />
                  </div>
                  <Button onClick={simulateRecycling} size="lg" className="h-32 px-20 rounded-full btn-3d-secondary shadow-[0_0_100px_-20px_rgba(34,197,94,0.5)] text-2xl font-black group relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      <Recycle className="mr-6 h-10 w-10 group-hover:rotate-180 transition-transform duration-1000 relative z-10" />
                      <span className="relative z-10">INYECTAR TRAZABILIDAD</span>
                  </Button>
              </div>
            </motion.div>
        </main>

        <footer className="h-20 border-t border-white/5 bg-black/40 backdrop-blur-2xl flex items-center justify-between px-12">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Latencia</span>
                <span className="text-xs font-mono font-bold text-secondary">14ms</span>
            </div>
            <div className="h-8 w-px bg-white/5" />
            <div className="flex flex-col">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Cifrado</span>
                <span className="text-xs font-mono font-bold text-primary">AES-XTS-512</span>
            </div>
          </div>
          <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.8em]">
            SYSTEM KYRON MASTER CONSOLE • MK-2
          </p>
        </footer>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon: Icon, variant = 'primary' }: any) {
  const colorClass = variant === 'accent' ? 'text-secondary' : 'text-primary';
  const bgClass = variant === 'accent' ? 'bg-secondary/10' : 'bg-primary/10';
  
  return (
    <Card className="titanium-card group relative overflow-hidden rounded-2xl hover:scale-[1.05] transition-all duration-500">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.1] transition-all duration-700"><Icon className="h-24 w-24" /></div>
      <CardContent className="p-10">
        <div className="flex items-center justify-between mb-10">
          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em]">{title}</p>
          <div className={cn("p-5 rounded-xl border transition-all duration-500 group-hover:-rotate-12", bgClass, colorClass, variant === 'accent' ? 'border-secondary/20' : 'border-primary/20')}>
            <Icon className="h-8 w-8" />
          </div>
        </div>
        <div className="flex items-end gap-6">
            <h4 className={cn("text-5xl font-black tracking-tighter leading-none italic", colorClass)}>{value}</h4>
            {trend && (
                <div className={cn(
                    "flex items-center text-[10px] font-black px-3 py-1.5 rounded-md mb-1 border",
                    trend.startsWith('+') ? 'bg-secondary/10 text-secondary border-secondary/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                )}>
                    {trend}
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}