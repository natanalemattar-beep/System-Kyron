
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
  School
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const kpiData = [
    { title: "Total de Empleados", value: "58", icon: Users },
    { title: "Nuevas Contrataciones", value: "4", icon: UserPlus },
    { title: "Costo de Nómina", value: formatCurrency(28500, 'Bs.'), icon: DollarSign },
];

const employeeDistribution = [
  { name: 'Ventas', count: 15 },
  { name: 'Tecnología', count: 12 },
  { name: 'Administración', count: 8 },
  { name: 'Soporte', count: 10 },
  { name: 'Diseño', count: 7 },
  { name: 'Gerencia', count: 6 },
];

const chartConfig = {
  count: {
    label: "Empleados",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const complianceAlerts = [
    { text: "3 Contratos de trabajo próximos a vencer.", icon: FileWarning, color: "text-orange-400" },
    { text: "Actualización de política de vacaciones pendiente.", icon: CalendarCheck2, color: "text-blue-400" },
];

export default function RecursosHumanosPage() {
  return (
    <div className="space-y-12 pb-20 px-6 md:px-10">
      
      <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-secondary pl-8 py-2 mt-10">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20 text-[9px] font-black uppercase tracking-[0.4em] text-secondary shadow-glow-secondary mb-4">
                <Briefcase className="h-3 w-3" /> NODO DE TALENTO
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Gestión de <span className="text-secondary italic">Talento y Cultura</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">Cumplimiento LOTTT & LOPNNA • Blindaje Laboral Activo</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white">
                Reporte Trimestral IVSS
            </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-card border-none h-full bg-white/[0.02] p-2 rounded-[2rem]">
                  <CardHeader className="pb-2">
                      <CardTitle className="text-[10px] font-black uppercase tracking-widest text-secondary/60 flex items-center gap-2">
                          <kpi.icon className="h-3.5 w-3.5" />
                          {kpi.title}
                      </CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-3xl font-black italic text-white tracking-tighter">{kpi.value}</p>
                  </CardContent>
              </Card>
            </motion.div>
        ))}
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 space-y-10">
            <Card className="glass-card border-none rounded-[3rem] bg-white/[0.01] overflow-hidden">
                <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary/10 rounded-2xl">
                      <Users className="h-6 w-6 text-secondary"/>
                    </div>
                    <div>
                        <CardTitle className="text-xl font-black uppercase italic tracking-tighter">Distribución de Capital Humano</CardTitle>
                        <CardDescription className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Métricas por unidad organizativa</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="h-80 p-10">
                    <ChartContainer config={chartConfig} className="w-full h-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={employeeDistribution}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" stroke="#475569" fontSize={10} fontWeight="900" tickLine={false} axisLine={false}/>
                            <YAxis stroke="#475569" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} />
                            <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: 'rgba(255,255,255,0.05)', opacity: 0.5 }}/>
                            <Bar dataKey="count" name="Empleados" fill="#22c55e" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card className="glass-card border-none p-10 rounded-[3rem] bg-white/[0.02]">
                <CardHeader className="p-0 mb-8">
                    <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white">Concepto Maestro: Gestión de Talento y LOTTT</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-8">
                    <p className="text-lg font-bold italic text-white/60 leading-relaxed text-justify">
                        La administración integral del capital humano en Kyron está centrada en el cumplimiento riguroso de la **LOTTT** y la **LOPNNA**. El motor de nómina garantiza que cada cálculo de salarios, beneficios, retenciones de ley (IVSS, FAOV, INCES) y la nueva contribución de **Protección de Pensiones** sea legalmente inatacable. Centralizamos el expediente digital bajo cifrado de alta fidelidad, asegurando que la preexistencia de documentos soporte cualquier fiscalización laboral.
                    </p>
                    <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-inner">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-secondary mb-8 flex items-center gap-3">
                            <Terminal className="h-4 w-4" /> Protocolo de Nómina Maestra
                        </h4>
                        <div className="text-sm font-bold italic text-white/70 leading-relaxed text-justify space-y-4">
                            <div className="flex gap-6 items-start">
                                <span className="font-black text-xs text-secondary">[1]</span>
                                <span>Enrolamiento de trabajador con validación biométrica de carga familiar (LOPNNA).</span>
                            </div>
                            <div className="flex gap-6 items-start">
                                <span className="font-black text-xs text-secondary">[2]</span>
                                <span>Parametrización de beneficios contractuales y deducciones de ley automáticas.</span>
                            </div>
                            <div className="flex gap-6 items-start">
                                <span className="font-black text-xs text-secondary">[3]</span>
                                <span>Generación del Ledger de Nómina para auditoría inmutable de pagos.</span>
                            </div>
                            <div className="flex gap-6 items-start">
                                <span className="font-black text-xs text-secondary">[4]</span>
                                <span>Despacho de recibos con sellado digital y generación de archivos TXT gubernamentales.</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="p-0 pt-10 border-t border-white/5 mt-10 flex justify-between items-center">
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-white/20">
                        <ShieldCheck className="h-4 w-4 text-secondary" /> CUMPLIMIENTO LABORAL VERIFICADO 2026
                    </div>
                    <Badge variant="outline" className="border-secondary/20 text-secondary text-[8px] font-black px-4 py-1.5 rounded-lg shadow-glow-secondary uppercase tracking-widest">Misión Crítica</Badge>
                </CardFooter>
            </Card>
         </div>

          <div className="space-y-8">
              <Card className="glass-card border-none bg-white/[0.02] rounded-[2.5rem] p-8">
                <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-secondary flex items-center gap-3">
                        <Activity className="h-4 w-4" /> Alertas de Cumplimiento
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                    {complianceAlerts.map(alert => (
                         <div key={alert.text} className="flex items-start gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-2xl group hover:bg-white/10 transition-all">
                            <alert.icon className={`h-5 w-5 mt-0.5 shrink-0 ${alert.color}`} />
                            <p className="text-xs font-bold text-white/70 group-hover:text-white uppercase leading-snug">{alert.text}</p>
                        </div>
                    ))}
                </CardContent>
              </Card>

               <Card className="bg-[#050505] border border-white/10 rounded-[2.5rem] overflow-hidden group">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-lg font-black uppercase italic tracking-tighter text-white">Nodos Operativos</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 flex flex-col gap-3">
                    <Button asChild className="w-full h-12 rounded-xl bg-white/[0.03] border border-white/10 text-white hover:bg-secondary hover:text-black font-black uppercase text-[10px] tracking-widest transition-all">
                        <Link href="/nominas"><ArrowRight className="mr-3 h-4 w-4"/>GESTIONAR NÓMINAS</Link>
                    </Button>
                     <Button asChild className="w-full h-12 rounded-xl bg-white/[0.03] border border-white/10 text-white hover:bg-primary hover:text-white font-black uppercase text-[10px] tracking-widest transition-all">
                        <Link href="/reclutamiento"><ArrowRight className="mr-3 h-4 w-4"/>PORTAL RECLUTAMIENTO</Link>
                    </Button>
                    <Button asChild className="w-full h-12 rounded-xl btn-3d-secondary mt-4 font-black uppercase text-[10px] tracking-widest">
                        <Link href="/academia-kyron"><School className="mr-3 h-4 w-4"/>ACADEMIA KYRON</Link>
                    </Button>
                </CardContent>
              </Card>

              <Card className="glass-card border-none bg-blue-600/10 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center">
                    <Scale className="h-12 w-12 text-blue-400 mb-6 animate-pulse" />
                    <CardTitle className="text-xl font-black uppercase italic text-white mb-2">Soporte Legal LOTTT</CardTitle>
                    <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em] mb-8">Consultoría jurídica IA especializada</p>
                    <Button variant="outline" className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest border-blue-500/20 text-blue-400 hover:bg-blue-500/10">SOLICITAR DICTAMEN</Button>
              </Card>
          </div>
       </div>

    </div>
  );
}
