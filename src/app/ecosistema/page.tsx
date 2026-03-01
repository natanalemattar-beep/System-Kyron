"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Droplets, Wallet, ShieldCheck, Recycle, Fingerprint,
  ChevronRight, Zap, ShieldAlert, LayoutDashboard, Calendar, Network, Cpu, Box, Activity
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
      title: "DATOS PROCESADOS",
      description: `Inyectando ${weight}kg de ${type} al sistema de trazabilidad.`,
    });
  };

  return (
    <div className="flex min-h-screen bg-background overflow-hidden hud-grid">
      <AppSidebar />
      
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <AppHeader user={user} dashboardHref="/ecosistema" />
        
        <main className="flex-1 container mx-auto p-6 md:p-10 pt-24 md:pt-28 overflow-y-auto custom-scrollbar">
          <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 border-l-4 border-primary pl-6 py-2">
                <div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic italic-shadow">Centro de Mando</h2>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.3em]">Monitoreo de Ecosistema Integrado • 2026</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10">Sincronizar Datos</Button>
                    <Button className="btn-3d-primary h-12 px-6">Terminal Global</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Capital Consolidado" value="Bs. 12.4M" trend="+8.2%" icon={Wallet} />
                <StatCard title="Telemetría Energía" value="85.4k BPD" trend="+1.5%" icon={Droplets} />
                <StatCard title="Integridad Fiscal" value="Cero Riesgo" icon={ShieldCheck} variant="accent" />
                <StatCard title="Activos Verdes" value={sustainabilityData.points.toLocaleString()} icon={Recycle} variant="accent" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <Card className="lg:col-span-2 titanium-card rounded-3xl overflow-hidden relative glow-border">
                  <div className="absolute top-4 right-6 flex items-center gap-2 text-[8px] font-black text-primary animate-pulse">
                    <Activity className="h-3 w-3" /> TRANSMISIÓN EN VIVO
                  </div>
                  <CardHeader className="pb-0">
                    <CardTitle className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                        <BarChart3 className="text-primary h-6 w-6" />
                        RENDIMIENTO TRANSACCIONAL IA
                    </CardTitle>
                    <CardDescription className="text-[10px] font-bold uppercase tracking-widest opacity-40">Análisis vectorial de flujos operativos</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px] pt-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { m: 'Oct', i: 380, g: 240 }, { m: 'Nov', i: 410, g: 255 }, { m: 'Dic', i: 450, g: 230 },
                        { m: 'Ene', i: 480, g: 290 }, { m: 'Feb', i: 520, g: 260 }, { m: 'Mar', i: 580, g: 280 }
                      ]}>
                        <defs>
                            <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="m" axisLine={false} tickLine={false} stroke="#475569" fontSize={10} fontWeight="900" />
                        <YAxis axisLine={false} tickLine={false} stroke="#475569" fontSize={10} fontWeight="900" />
                        <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '10px' }} />
                        <Area type="monotone" dataKey="i" stroke="#2563eb" strokeWidth={4} fill="url(#colorPrimary)" />
                        <Area type="monotone" dataKey="g" stroke="#22c55e" strokeWidth={4} fill="transparent" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <div className="space-y-8">
                    <Card className="titanium-card rounded-3xl glow-border">
                        <CardHeader><CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Alertas de Protocolo</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="group flex items-start gap-4 p-5 rounded-2xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-colors">
                                <ShieldAlert className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-[11px] font-black uppercase tracking-tight text-red-500">Divergencia Fiscal</p>
                                    <p className="text-[10px] text-muted-foreground leading-tight mt-1">Se detectó una inconsistencia en la retención del IVA. IA aplicando corrección.</p>
                                </div>
                            </div>
                            <div className="group flex items-start gap-4 p-5 rounded-2xl bg-orange-500/5 border border-orange-500/10 hover:bg-orange-500/10 transition-colors">
                                <Calendar className="h-6 w-6 text-orange-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-[11px] font-black uppercase tracking-tight text-orange-500">Ciclo de Renovación</p>
                                    <p className="text-[10px] text-muted-foreground leading-tight mt-1">La licencia CONATEL CON-001 entra en ventana de renovación en 48h.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-[#050505] text-white border border-white/5 shadow-2xl overflow-hidden relative rounded-3xl group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity"><Fingerprint className="h-40 w-40" /></div>
                        <CardHeader className="relative z-10">
                            <CardTitle className="text-xl font-black uppercase tracking-tighter">IDENTIDAD 3D</CardTitle>
                            <CardDescription className="text-primary text-[10px] font-bold uppercase tracking-widest">Blockchain Validated</CardDescription>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
                                <p className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-1">RIF CORPORATIVO</p>
                                <p className="text-2xl font-mono font-bold tracking-tighter">J-12345678-9</p>
                            </div>
                        </CardContent>
                        <CardFooter className="relative z-10">
                            <Button variant="secondary" className="w-full btn-3d-secondary h-12">AUTENTICAR CREDENCIALES</Button>
                        </CardFooter>
                    </Card>
                </div>
              </div>

              {/* Botón de Acción de Reciclaje */}
              <div className="flex flex-col items-center justify-center py-12 space-y-6">
                  <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.5em] text-white/20">
                    <div className="h-px w-20 bg-white/10" />
                    ACCIÓN AMBIENTAL BLOCKCHAIN
                    <div className="h-px w-20 bg-white/10" />
                  </div>
                  <Button onClick={simulateRecycling} size="lg" className="h-24 px-16 rounded-full btn-3d-secondary shadow-[0_0_80px_-20px_rgba(34,197,94,0.4)] text-xl font-black group">
                      <Recycle className="mr-4 h-8 w-8 group-hover:rotate-180 transition-transform duration-700" />
                      INYECTAR ACTIVOS VERDES
                  </Button>
              </div>
            </motion.div>
        </main>

        <footer className="h-16 border-t border-white/5 bg-background/80 backdrop-blur-md flex items-center justify-between px-10">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Latencia: 14ms</span>
            <div className="h-1 w-1 rounded-full bg-secondary" />
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Cifrado: AES-256</span>
          </div>
          <p className="text-[9px] font-black text-white/10 uppercase tracking-[0.6em]">
            SYSTEM KYRON MASTER TERMINAL • 2026
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
    <Card className="titanium-card group relative overflow-hidden rounded-3xl glow-border hover:scale-[1.02] transition-all duration-500">
      <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-all"><Icon className="h-20 w-20" /></div>
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-8">
          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">{title}</p>
          <div className={cn("p-4 rounded-2xl border transition-all group-hover:rotate-6", bgClass, colorClass, variant === 'accent' ? 'border-secondary/20' : 'border-primary/20')}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <div className="flex items-end gap-4">
            <h4 className={cn("text-4xl font-black tracking-tighter leading-none italic", colorClass)}>{value}</h4>
            {trend && (
                <div className={cn(
                    "flex items-center text-[9px] font-black px-2 py-1 rounded-lg mb-1",
                    trend.startsWith('+') ? 'bg-secondary/10 text-secondary' : 'bg-red-500/10 text-red-500'
                )}>
                    {trend}
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}