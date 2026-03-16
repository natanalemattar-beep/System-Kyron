
"use client";

import {
  Briefcase,
  Users,
  DollarSign,
  UserPlus,
  ArrowRight,
  FileWarning,
  CalendarCheck2,
  ShieldCheck,
  Terminal,
  Calculator,
  Scale,
  Activity,
  School,
  FileText,
  Zap,
  TrendingUp,
  Heart
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const kpiData = [
    { title: "Personal Activo", value: "58", icon: Users, color: "text-secondary" },
    { title: "Nuevos Ingresos", value: "4", icon: UserPlus, color: "text-blue-400" },
    { title: "Carga de Nómina", value: formatCurrency(28500, 'Bs.'), icon: DollarSign, color: "text-emerald-400" },
];

const employeeDistribution = [
  { name: 'Ventas', count: 15 },
  { name: 'Tecnología', count: 12 },
  { name: 'Admin', count: 8 },
  { name: 'Soporte', count: 10 },
  { name: 'Diseño', count: 7 },
  { name: 'Gerencia', count: 6 },
];

const chartConfig = {
  count: {
    label: "Empleados",
    color: "hsl(var(--secondary))",
  },
} satisfies ChartConfig;

export default function RecursosHumanosPage() {
  return (
    <div className="space-y-10 pb-20 px-4 md:px-10">
      
      {/* Header Estilo Nodo */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-4 border-secondary pl-8 py-2 mt-10">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20 text-[9px] font-black uppercase tracking-[0.4em] text-secondary shadow-glow-secondary mb-4">
                <Briefcase className="h-3 w-3" /> NODO DE TALENTO
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Centro de <span className="text-secondary italic">Cultura y Personal</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">Gestión de Capital Humano • Protocolo LOTTT 2026</p>
        </div>
        <div className="flex gap-3">
            <Badge variant="outline" className="h-12 px-6 rounded-xl border-secondary/20 bg-secondary/5 text-secondary flex items-center gap-3">
                <Activity className="h-4 w-4 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">Sincronización Activa</span>
            </Badge>
        </div>
      </header>

      {/* KPIs de Alta Densidad */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-card border-none bg-white/[0.02] p-6 rounded-[2rem] shadow-xl group hover:bg-white/[0.04]">
                  <div className="flex justify-between items-start mb-6">
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{kpi.title}</p>
                      <div className={cn("p-2 rounded-lg border border-white/5 bg-white/5 group-hover:scale-110 transition-transform", kpi.color)}>
                          <kpi.icon className="h-4 w-4" />
                      </div>
                  </div>
                  <p className="text-3xl font-black italic text-white tracking-tighter">{kpi.value}</p>
              </Card>
            </motion.div>
        ))}
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Gráfico de Distribución */}
         <div className="lg:col-span-8 space-y-10">
            <Card className="glass-card border-none rounded-[3rem] bg-white/[0.01] overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white">Estructura por Departamentos</CardTitle>
                        <CardDescription className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Balance de fuerza laboral 2026</CardDescription>
                    </div>
                    <Button variant="ghost" className="h-10 px-4 rounded-xl border border-white/5 text-[9px] font-black uppercase tracking-widest text-white/40">Detalle Completo</Button>
                  </div>
                </CardHeader>
                <CardContent className="h-[350px] p-10">
                    <ChartContainer config={chartConfig} className="w-full h-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={employeeDistribution}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" stroke="#475569" fontSize={10} fontWeight="900" tickLine={false} axisLine={false}/>
                            <YAxis stroke="#475569" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} />
                            <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: 'rgba(255,255,255,0.05)', opacity: 0.5 }} />
                            <Bar dataKey="count" name="Empleados" fill="#22c55e" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="glass-card border-none p-10 rounded-[3rem] bg-white/[0.02] border-l-4 border-secondary shadow-xl">
                    <h3 className="text-lg font-black uppercase italic tracking-tighter text-white mb-6 flex items-center gap-3">
                        <Zap className="h-5 w-5 text-secondary" /> Pulso de Nómina
                    </h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                <span className="text-white/40">Ciclo: Q1 Marzo</span>
                                <span className="text-secondary">85% Procesado</span>
                            </div>
                            <Progress value={85} className="h-2 bg-white/5" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                <p className="text-[8px] font-black text-white/20 uppercase mb-1">Pagos Exitosos</p>
                                <p className="text-lg font-black text-white italic">49 / 58</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                <p className="text-[8px] font-black text-white/20 uppercase mb-1">Pendientes</p>
                                <p className="text-lg font-black text-secondary italic">09</p>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="glass-card border-none p-10 rounded-[3rem] bg-white/[0.02] shadow-xl">
                    <h3 className="text-lg font-black uppercase italic tracking-tighter text-white mb-6 flex items-center gap-3">
                        <Heart className="h-5 w-5 text-rose-500" /> Clima Organizacional
                    </h3>
                    <div className="space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="text-4xl font-black italic text-white tracking-tighter shadow-glow-secondary">94%</div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase text-emerald-400">Nivel de Satisfacción</p>
                                <p className="text-[8px] font-bold text-white/20 uppercase">Basado en 42 respuestas de la IA</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />)}
                            <span className="text-[9px] font-black text-white/40 uppercase ml-2 tracking-widest">Excelente</span>
                        </div>
                    </div>
                </Card>
            </div>
         </div>

          {/* Lateral de Control */}
          <div className="lg:col-span-4 space-y-8">
              <Card className="glass-card border-none bg-white/[0.02] rounded-[2.5rem] p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:rotate-12 transition-transform duration-700"><ShieldCheck className="h-32 w-32" /></div>
                <CardHeader className="p-0 mb-8">
                    <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-secondary flex items-center gap-3">
                        <Activity className="h-4 w-4" /> Alertas de Cumplimiento
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                    {[
                        { text: "3 Contratos por vencer", icon: FileWarning, color: "text-amber-500", bg: "bg-amber-500/5" },
                        { text: "Política Vacacional v2.6", icon: CalendarCheck2, color: "text-blue-400", bg: "bg-blue-400/5" }
                    ].map((alert, i) => (
                         <div key={i} className={cn("flex items-start gap-4 p-4 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all", alert.bg)}>
                            <alert.icon className={cn("h-5 w-5 mt-0.5 shrink-0", alert.color)} />
                            <p className="text-xs font-bold text-white/70 uppercase leading-snug">{alert.text}</p>
                        </div>
                    ))}
                </CardContent>
              </Card>

               <Card className="bg-[#050505] border border-white/10 rounded-[3rem] overflow-hidden group shadow-2xl">
                <CardHeader className="p-10 pb-6">
                    <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white">Gestión Directa</CardTitle>
                    <CardDescription className="text-[9px] font-bold uppercase text-white/30 tracking-[0.2em]">Protocolos de Ejecución</CardDescription>
                </CardHeader>
                <CardContent className="p-10 pt-0 space-y-3">
                    <Button asChild className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/10 text-white hover:bg-secondary hover:text-black font-black uppercase text-[10px] tracking-widest transition-all shadow-xl group">
                        <Link href="/nominas" className="flex items-center justify-between w-full">
                            <span className="flex items-center gap-3"><Users className="h-4 w-4 text-secondary group-hover:text-black"/> NÓMINA GLOBAL</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                     <Button asChild className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/10 text-white hover:bg-primary hover:text-white font-black uppercase text-[10px] tracking-widest transition-all shadow-xl group">
                        <Link href="/contabilidad/rrhh/certificados-laborales" className="flex items-center justify-between w-full">
                            <span className="flex items-center gap-3"><FileSignature className="h-4 w-4 text-primary group-hover:text-white"/> CONSTANCIAS</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button asChild className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/10 text-white hover:bg-white hover:text-black font-black uppercase text-[10px] tracking-widest transition-all shadow-xl group">
                        <Link href="/prestaciones-sociales" className="flex items-center justify-between w-full">
                            <span className="flex items-center gap-3"><Calculator className="h-4 w-4 opacity-40 group-hover:opacity-100"/> LIQUIDACIONES</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </CardContent>
                <CardFooter className="p-8 bg-secondary/5 border-t border-white/5 flex justify-center">
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase text-secondary/40 italic">
                        <Terminal className="h-4 w-4" /> Nodo Personal v2.6.5
                    </div>
                </CardFooter>
              </Card>

              <Card className="glass-card border-none bg-blue-600/10 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Scale className="h-14 w-14 text-blue-400 mb-6 animate-pulse relative z-10" />
                    <h3 className="text-2xl font-black uppercase italic text-white mb-2 tracking-tighter relative z-10">Asesoría Laboral</h3>
                    <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em] mb-8 relative z-10">Consultoría Estratégica LOTTT</p>
                    <Button variant="outline" className="w-full h-12 rounded-xl font-black text-[10px] uppercase tracking-widest border-blue-500/20 text-blue-400 hover:bg-blue-500/10 relative z-10">SOLICITAR DICTAMEN</Button>
              </Card>
          </div>
       </div>

    </div>
  );
}

function Star(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
