"use client";

import React, { useState } from 'react';
import { 
  BarChart3, Droplets, Wallet, ShieldCheck, Recycle, Fingerprint,
  Activity, Calendar, ShieldAlert, Radio
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import { AppHeader } from "@/components/app-header";
import { motion } from 'framer-motion';
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
    <div className="flex min-h-screen bg-[#020202] overflow-hidden hud-grid">
      <div className="flex-1 flex flex-col min-h-screen">
        <AppHeader user={user} dashboardHref="/ecosistema" />
        
        <main className="flex-1 w-full p-4 md:p-12 pt-20 md:pt-32 overflow-y-auto custom-scrollbar pb-24">
          <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 md:space-y-16 w-full"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 border-l-4 md:border-l-8 border-primary pl-4 md:pl-10 py-2">
                <div>
                    <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase italic italic-shadow leading-none">Ecosistema</h2>
                    <p className="text-[8px] md:text-[10px] font-black text-primary uppercase tracking-[0.4em] md:tracking-[0.6em] mt-3 md:mt-4 opacity-80">Terminal de Operaciones Globales • 2026</p>
                </div>
                <div className="flex gap-2 md:gap-3">
                    <Button variant="outline" className="h-9 md:h-10 px-4 md:px-6 rounded-xl text-[8px] md:text-[9px] font-black uppercase tracking-widest border-white/10 bg-white/5 hover:bg-white/10 transition-all">Sincronización</Button>
                    <Button className="btn-3d-primary h-9 md:h-10 px-6 md:px-8">Acceso Nivel 5</Button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatCard title="Liquidez" value="Bs. 12.4M" trend="+8.2%" icon={Wallet} />
                <StatCard title="Telemetría" value="85.4k BPD" trend="+1.5%" icon={Droplets} />
                <StatCard title="Riesgo" value="0.000%" icon={ShieldCheck} variant="accent" />
                <StatCard title="Eco-Créditos" value={sustainabilityData.points.toLocaleString()} icon={Recycle} variant="accent" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
                <Card className="lg:col-span-2 titanium-card rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative group">
                  <div className="absolute top-4 md:top-6 right-4 md:right-8 flex items-center gap-2 md:gap-3 text-[8px] md:text-[9px] font-black text-primary animate-pulse uppercase tracking-widest">
                    <Activity className="h-3 md:h-3.5 w-3 md:w-3.5" /> Transmisión Activa
                  </div>
                  <CardHeader className="p-6 md:p-10 pb-0">
                    <CardTitle className="text-xl md:text-2xl font-black uppercase tracking-tighter flex items-center gap-3 md:gap-4">
                        <BarChart3 className="text-primary h-5 w-5 md:h-6 md:w-6" />
                        Flujo IA
                    </CardTitle>
                    <CardDescription className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] opacity-30 mt-1 md:mt-2">Métricas vectoriales de rendimiento</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[250px] md:h-[400px] p-4 md:p-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { m: 'Oct', i: 380, g: 240 }, { m: 'Nov', i: 410, g: 255 }, { m: 'Dic', i: 450, g: 230 },
                        { m: 'Ene', i: 480, g: 290 }, { m: 'Feb', i: 520, g: 260 }, { m: 'Mar', i: 580, g: 280 }
                      ]}>
                        <defs>
                            <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="m" axisLine={false} tickLine={false} stroke="#475569" fontSize={9} fontWeight="900" />
                        <YAxis axisLine={false} tickLine={false} stroke="#475569" fontSize={9} fontWeight="900" />
                        <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '9px', fontWeight: '900' }} />
                        <Area type="monotone" dataKey="i" stroke="#2563eb" strokeWidth={3} fill="url(#colorPrimary)" />
                        <Area type="monotone" dataKey="g" stroke="#22c55e" strokeWidth={3} fill="transparent" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <div className="space-y-6 md:space-y-8">
                    <Card className="titanium-card rounded-[1.5rem] md:rounded-[2rem] border-l-4 border-red-500">
                        <CardHeader className="p-6 md:p-8 pb-3 md:pb-4"><CardTitle className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-primary">Alertas</CardTitle></CardHeader>
                        <CardContent className="px-6 md:px-8 pb-6 md:pb-8 space-y-4">
                            <div className="group flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-colors">
                                <ShieldAlert className="h-5 w-5 md:h-6 md:w-6 text-red-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-[10px] md:text-[11px] font-black uppercase tracking-tighter text-red-500">Anomalía Detectada</p>
                                    <p className="text-[9px] md:text-[10px] text-muted-foreground leading-tight mt-1 font-medium">Inconsistencia en retención IVA periodo 03-2026.</p>
                                </div>
                            </div>
                            <div className="group flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 hover:bg-orange-500/10 transition-colors">
                                <Calendar className="h-5 w-5 md:h-6 md:w-6 text-orange-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-[10px] md:text-[11px] font-black uppercase tracking-tighter text-orange-500">Mantenimiento</p>
                                    <p className="text-[9px] md:text-[10px] text-muted-foreground leading-tight mt-1 font-medium">Habilitación CONATEL CON-003 vence en 48h.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-[#050505] text-white border border-white/5 shadow-2xl overflow-hidden relative rounded-[1.5rem] md:rounded-[2rem] group">
                        <div className="absolute top-0 right-0 p-6 md:p-8 opacity-5 group-hover:opacity-10 transition-all duration-700"><Fingerprint className="h-24 w-24 md:h-32 md:w-32" /></div>
                        <CardHeader className="p-6 md:p-8 relative z-10">
                            <CardTitle className="text-xl md:text-2xl font-black uppercase tracking-tighter italic">Línea Kyron</CardTitle>
                            <CardDescription className="text-primary text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] mt-1">Conectividad 5G</CardDescription>
                        </CardHeader>
                        <CardFooter className="p-6 md:p-8 pt-0 relative z-10">
                            <Button variant="secondary" className="w-full h-10 md:h-12 text-[8px] md:text-[9px] font-black uppercase tracking-widest btn-3d-secondary">Asignar Número</Button>
                        </CardFooter>
                    </Card>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-10 md:py-16 space-y-6 md:space-y-8 bg-white/5 rounded-[2rem] md:rounded-[3rem] border border-white/5 mx-2">
                  <div className="flex items-center gap-4 md:gap-6 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-white/20 px-4 text-center">
                    <div className="h-[1px] w-10 md:w-16 bg-white/10 hidden xs:block" />
                    Activos Verdes Blockchain
                    <div className="h-[1px] w-10 md:w-16 bg-white/10 hidden xs:block" />
                  </div>
                  <Button onClick={simulateRecycling} size="lg" className="h-16 md:h-20 px-8 md:px-12 rounded-2xl btn-3d-secondary shadow-[0_0_60px_-20px_rgba(34,197,94,0.3)] text-sm md:text-lg font-black group relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      <Recycle className="mr-3 md:mr-4 h-5 w-5 md:h-6 md:w-6 group-hover:rotate-180 transition-transform duration-1000 relative z-10" />
                      <span className="relative z-10">INYECTAR TRAZABILIDAD</span>
                  </Button>
              </div>
            </motion.div>
        </main>

        <footer className="h-14 md:h-16 border-t border-white/5 bg-black/40 backdrop-blur-2xl flex items-center justify-between px-4 md:px-12 shrink-0">
          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex flex-col">
                <span className="text-[7px] md:text-[9px] font-black text-white/20 uppercase tracking-[0.2em] md:tracking-[0.4em]">Latencia</span>
                <span className="text-[8px] md:text-[10px] font-mono font-bold text-secondary">14ms</span>
            </div>
            <div className="h-6 w-px bg-white/5" />
            <div className="flex flex-col">
                <span className="text-[7px] md:text-[9px] font-black text-white/20 uppercase tracking-[0.2em] md:tracking-[0.4em]">Cifrado</span>
                <span className="text-[8px] md:text-[10px] font-mono font-bold text-primary">AES-512</span>
            </div>
          </div>
          <p className="text-[7px] md:text-[9px] font-black text-white/10 uppercase tracking-[0.4em] md:tracking-[0.8em] text-right">
            System Kyron Master Console
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
    <Card className="titanium-card group relative overflow-hidden rounded-[1.2rem] md:rounded-[1.5rem] hover:scale-[1.02] transition-all duration-500 shadow-xl">
      <div className="absolute top-0 right-0 p-4 md:p-6 opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-700"><Icon className="h-12 w-12 md:h-16 md:w-16" /></div>
      <CardContent className="p-4 md:p-8">
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <p className="text-[7px] md:text-[9px] font-black text-white/30 uppercase tracking-[0.3em] md:tracking-[0.4em]">{title}</p>
          <div className={cn("p-1.5 md:p-3 rounded-lg md:rounded-xl border transition-all duration-500 group-hover:-rotate-6", bgClass, colorClass, variant === 'accent' ? 'border-secondary/20' : 'border-primary/20')}>
            <Icon className="h-3.5 w-3.5 md:h-5 md:w-5" />
          </div>
        </div>
        <div className="flex flex-wrap items-end gap-2 md:gap-4">
            <h4 className={cn("text-lg md:text-3xl font-black tracking-tighter leading-none italic", colorClass)}>{value}</h4>
            {trend && (
                <div className={cn(
                    "flex items-center text-[6px] md:text-[8px] font-black px-1.5 py-0.5 rounded-md border",
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
