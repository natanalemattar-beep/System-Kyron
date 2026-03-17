
"use client";

import { Briefcase, Users, DollarSign, UserPlus, ArrowRight, FileWarning, CalendarCheck2, ShieldCheck, Activity, Zap, Heart, Scale, BrainCircuit, School, Terminal, CircleCheck as CheckCircle, Stethoscope, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { formatCurrency, cn } from "@/lib/utils";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const kpiData = [
    { title: "Personal Activo", value: "58", icon: Users, color: "text-secondary" },
    { title: "Nuevos Ingresos", value: "4", icon: UserPlus, color: "text-blue-500" },
    { title: "Carga de Nómina", value: formatCurrency(28500, 'Bs.'), icon: DollarSign, color: "text-emerald-500" },
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
  count: { label: "Empleados", color: "hsl(var(--secondary))" },
} satisfies ChartConfig;

export default function RecursosHumanosPage() {
  return (
    <div className="space-y-10 pb-20">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-4 border-secondary pl-8 py-2 mt-10">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20 text-[9px] font-black uppercase tracking-[0.4em] text-secondary shadow-glow-secondary mb-4">
                <Briefcase className="h-3 w-3" /> ÁREA DE TALENTO
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Centro de <span className="text-secondary italic">Cultura y Personal</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">Gestión de Capital Humano • Protocolo LOTTT 2026</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground">
                <Activity className="mr-2 h-4 w-4" /> Telemetría Clima
            </Button>
            <Button className="btn-3d-secondary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                <PlusCircle className="mr-2 h-4 w-4" /> NUEVA SOLICITUD
            </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-card border-none bg-card/40 p-6 rounded-[2rem] shadow-xl group hover:bg-white/[0.05]">
                  <div className="flex justify-between items-start mb-6">
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{kpi.title}</p>
                      <div className={cn("p-2 rounded-lg border border-border group-hover:scale-110 transition-transform", kpi.color)}>
                          <kpi.icon className="h-4 w-4" />
                      </div>
                  </div>
                  <p className="text-3xl font-black italic text-foreground tracking-tighter">{kpi.value}</p>
              </Card>
            </motion.div>
        ))}
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <div className="lg:col-span-8 space-y-10">
            <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground">Distribución de Fuerza Laboral</CardTitle>
                        <CardDescription className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Balance de capital humano por área operativa</CardDescription>
                    </div>
                    <Button variant="ghost" className="h-10 px-4 rounded-xl border border-border text-[9px] font-black uppercase tracking-widest text-muted-foreground">Detalle Auditoría</Button>
                  </div>
                </CardHeader>
                <CardContent className="h-[350px] p-10">
                    <ChartContainer config={chartConfig} className="w-full h-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={employeeDistribution}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                            <XAxis dataKey="name" stroke="#475569" fontSize={10} fontWeight="900" tickLine={false} axisLine={false}/>
                            <YAxis stroke="#475569" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="count" name="Empleados" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="glass-card border-none p-10 rounded-[3rem] bg-card/40 border-l-4 border-emerald-500 shadow-xl">
                    <h3 className="text-lg font-black uppercase italic tracking-tighter text-foreground mb-6 flex items-center gap-3">
                        <ShieldCheck className="h-5 w-5 text-emerald-500" /> Cumplimiento LOPCYMAT
                    </h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                <span className="text-muted-foreground/60">Programa de Seguridad</span>
                                <span className="text-emerald-500">100% AL DÍA</span>
                            </div>
                            <Progress value={100} className="h-2 bg-muted" />
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                            <Stethoscope className="h-5 w-5 text-emerald-500" />
                            <p className="text-[10px] font-bold text-foreground/70 uppercase">Delegados de prevención activos en todas las áreas.</p>
                        </div>
                    </div>
                </Card>

                <Card className="glass-card border-none p-10 rounded-[3rem] bg-card/40 shadow-xl">
                    <h3 className="text-lg font-black uppercase italic tracking-tighter text-foreground mb-6 flex items-center gap-3">
                        <BrainCircuit className="h-5 w-5 text-primary" /> Inteligencia Emocional
                    </h3>
                    <div className="space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="text-4xl font-black italic text-primary tracking-tighter shadow-glow-sm">94%</div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase text-primary">Score de Relaciones</p>
                                <p className="text-[8px] font-bold text-muted-foreground uppercase">Análisis de interacciones y liderazgo</p>
                            </div>
                        </div>
                        <Button variant="outline" asChild className="w-full h-10 rounded-xl border-primary/20 text-primary font-black uppercase text-[9px] tracking-widest hover:bg-primary/5 transition-all">
                            <Link href="/clima-organizacional">Ver Panel de Liderazgo</Link>
                        </Button>
                    </div>
                </Card>
            </div>
         </div>

          <div className="lg:col-span-4 space-y-8">
              <Card className="glass-card border-none bg-card/40 rounded-[2.5rem] p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:rotate-12 transition-transform duration-700"><ShieldCheck className="h-32 w-32" /></div>
                <CardHeader className="p-0 mb-8">
                    <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-secondary flex items-center gap-3 italic">
                        <Activity className="h-4 w-4" /> Alertas del Nodo
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                    {[
                        { text: "3 Contratos próximos a vencer", icon: FileWarning, color: "text-rose-500", bg: "bg-rose-500/5" },
                        { text: "Actualización de Planilla ARI Q2", icon: CalendarCheck2, color: "text-blue-500", bg: "bg-blue-500/5" }
                    ].map((alert, i) => (
                         <div key={i} className={cn("flex items-start gap-4 p-4 rounded-2xl border border-border group hover:bg-muted/20 transition-all", alert.bg)}>
                            <alert.icon className={cn("h-5 w-5 mt-0.5 shrink-0", alert.color)} />
                            <p className="text-[10px] font-bold text-foreground/70 uppercase leading-snug">{alert.text}</p>
                        </div>
                    ))}
                </CardContent>
              </Card>

               <Card className="bg-[#050505] border border-white/10 rounded-[3rem] overflow-hidden group shadow-2xl">
                <CardHeader className="p-10 pb-6">
                    <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white">Protocolos Activos</CardTitle>
                    <CardDescription className="text-[9px] font-bold uppercase text-white/30 tracking-[0.2em]">Gestión de Personal v2.6.5</CardDescription>
                </CardHeader>
                <CardContent className="p-10 pt-0 space-y-3">
                    {[
                        { label: "Nómina y Beneficios", href: "/nominas", icon: Calculator, color: "text-emerald-500" },
                        { label: "Reclutamiento e Inducción", href: "/reclutamiento", icon: UserPlus, color: "text-blue-400" },
                        { label: "Desarrollo Personal", href: "/desarrollo-personal", icon: School, color: "text-primary" },
                        { label: "Prestaciones Sociales", href: "/prestaciones-sociales", icon: Scale, color: "text-secondary" },
                    ].map(item => (
                        <Button key={item.label} asChild className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/10 text-white hover:bg-white/10 font-black uppercase text-[10px] tracking-widest transition-all group">
                            <Link href={item.href as any} className="flex items-center justify-between w-full">
                                <span className="flex items-center gap-3">
                                    <item.icon className={cn("h-4 w-4", item.color)} />
                                    {item.label}
                                </span>
                                <ArrowRight className="h-4 w-4 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </Link>
                        </Button>
                    ))}
                </CardContent>
                <CardFooter className="p-8 bg-white/5 border-t border-white/5 flex justify-center">
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40 italic">
                        <Terminal className="h-4 w-4" /> Nodo Talento • CM|SG|MS
                    </div>
                </CardFooter>
              </Card>
          </div>
       </div>
    </div>
  );
}

function PlusCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  )
}
