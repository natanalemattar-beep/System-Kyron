
"use client";

import { Users, Building, DollarSign, TrendingUp, LayoutDashboard, Network, Cpu, Zap, ArrowRight, Download, TriangleAlert as AlertTriangle, ChartLine as LineChart, ChartBar as BarChart, ChartBar as BarChart3 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { QuickAccess } from "@/components/dashboard/quick-access";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { adminNavGroups } from "@/components/app-sidebar-nav-items";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const kpiData = [
  { title: "Empresas en el Holding", value: "5", icon: Building },
  { title: "Ingresos Consolidados (Mes)", value: formatCurrency(250000, 'Bs.'), icon: DollarSign },
  { title: "Rentabilidad Neta (Grupo)", value: "22.5%", icon: TrendingUp },
];

const holdingStructure = [
    { id: 1, empresa: "TRAMITEX C.A.", participacion: "100%", rol: "Casa Matriz", rendimiento: "Positivo", dashboard: "/dashboard-empresa" },
    { id: 2, empresa: "Logística Express", participacion: "60%", rol: "Subsidiaria", rendimiento: "Estable", dashboard: "#" },
    { id: 3, empresa: "Inversiones Futuro", participacion: "30%", rol: "Aliada Estratégica", rendimiento: "Positivo", dashboard: "#" },
];

const rendimientoVariant: { [key: string]: "default" | "secondary" | "outline" } = {
  Positivo: "default",
  Estable: "secondary",
  Negativo: "outline",
};

export default function DashboardSociosPage() {
  const { toast } = useToast();
  const [simulation, setSimulation] = useState<string | null>(null);

  const runSimulation = (type: string) => {
    setSimulation(null);
    setTimeout(() => {
      setSimulation(type);
      toast({
        title: "Simulación Completada",
        description: "El gemelo digital ha proyectado los resultados del escenario.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <Users className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            Centro de Mando del Holding
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Supervisión estratégica del grupo empresarial y acceso total al ecosistema.</p>
      </header>

      {/* Nueva Funcionalidad: Gemelo Digital */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="glass-card border-primary/20 overflow-hidden bg-white/[0.02]">
          <CardHeader className="p-8 border-b border-white/5 bg-primary/5">
            <CardTitle className="flex items-center gap-3 text-2xl font-black uppercase italic tracking-tighter">
              <Cpu className="h-8 w-8 text-primary" />
              Simulador Estratégico (Gemelo Digital)
            </CardTitle>
            <CardDescription className="text-primary font-bold uppercase text-[10px] tracking-[0.2em]">Modelado predictivo de decisiones financieras.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Seleccionar Escenario</h4>
                <Button 
                  onClick={() => runSimulation("sucursales")} 
                  variant="outline" 
                  className="w-full justify-start h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-primary/10 hover:border-primary/40 group"
                >
                  <Building className="mr-4 h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <p className="text-xs font-bold">¿Qué pasa si abro 3 nuevas sucursales?</p>
                    <p className="text-[10px] opacity-40 uppercase">Análisis de expansión física</p>
                  </div>
                </Button>
                <Button 
                  onClick={() => runSimulation("ventas")} 
                  variant="outline" 
                  className="w-full justify-start h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-primary/10 hover:border-primary/40 group"
                >
                  <TrendingUp className="mr-4 h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <p className="text-xs font-bold">Simular aumento de ventas del 20%</p>
                    <p className="text-[10px] opacity-40 uppercase">Proyección de rentabilidad neta</p>
                  </div>
                </Button>
                <Button 
                  onClick={() => runSimulation("crisis")} 
                  variant="outline" 
                  className="w-full justify-start h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-rose-500/10 hover:border-rose-500/40 group"
                >
                  <AlertTriangle className="mr-4 h-5 w-5 text-rose-500 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <p className="text-xs font-bold">Escenario de crisis: caída del 15%</p>
                    <p className="text-[10px] opacity-40 uppercase">Plan de contingencia y liquidez</p>
                  </div>
                </Button>
              </div>

              <div className="lg:col-span-8 bg-black/40 rounded-[2rem] p-8 border border-white/5 min-h-[300px] flex items-center justify-center text-center">
                <AnimatePresence mode="wait">
                  {simulation ? (
                    <motion.div key={simulation} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-8">
                      <div className="flex justify-between items-end">
                        <div className="text-left">
                          <h5 className="text-2xl font-black uppercase italic text-primary">Resultados Proyectados</h5>
                          <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Horizonte: 12 meses • Confianza: 94%</p>
                        </div>
                        <Button size="sm" variant="outline" className="rounded-xl border-primary/20 text-primary">
                          <Download className="mr-2 h-4 w-4" /> Exportar Informe PDF
                        </Button>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                          <p className="text-[9px] font-black uppercase text-muted-foreground mb-2">Impacto Caja</p>
                          <p className={cn("text-xl font-bold", simulation === "crisis" ? "text-rose-500" : "text-emerald-500")}>
                            {simulation === "sucursales" ? "-$45,000" : simulation === "ventas" ? "+$120,000" : "-$80,000"}
                          </p>
                        </div>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                          <p className="text-[9px] font-black uppercase text-muted-foreground mb-2">Rentabilidad</p>
                          <p className={cn("text-xl font-bold", simulation === "crisis" ? "text-rose-500" : "text-emerald-500")}>
                            {simulation === "sucursales" ? "+12%" : simulation === "ventas" ? "+28%" : "-15%"}
                          </p>
                        </div>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                          <p className="text-[9px] font-black uppercase text-muted-foreground mb-2">Escalabilidad</p>
                          <p className="text-xl font-bold text-primary">Tier {simulation === "sucursales" ? "A+" : simulation === "ventas" ? "S" : "C"}</p>
                        </div>
                      </div>

                      <div className="h-32 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center p-4">
                        {simulation === "ventas" ? <TrendingUp className="h-16 w-full text-emerald-500 opacity-20" /> : <BarChart3 className="h-16 w-full text-primary opacity-20" />}
                        <p className="absolute text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Visualización Vectorial Activa</p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="space-y-4 opacity-20 italic">
                      <Zap className="h-16 w-16 mx-auto" />
                      <p className="text-[10px] font-black uppercase tracking-[0.4em]">Esperando parámetros de inyección...</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpiData.map((kpi, index) => (
            <div
              key={kpi.title}
            >
              <Card className="bg-card/80 backdrop-blur-sm h-full">
                  <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <kpi.icon className="h-4 w-4 text-muted-foreground" />
                          {kpi.title}
                      </CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-3xl font-bold">{kpi.value}</p>
                  </CardContent>
              </Card>
            </div>
          ))}
      </div>

       <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Network className="h-6 w-6 text-primary"/>
                </div>
                Organigrama del Holding
              </CardTitle>
              <CardDescription>Vista de la estructura de propiedad y rendimiento de cada entidad.</CardDescription>
          </CardHeader>
          <CardContent>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Empresa</TableHead>
                          <TableHead>Rol</TableHead>
                          <TableHead className="text-center">Participación</TableHead>
                          <TableHead className="text-center">Rendimiento</TableHead>
                           <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {holdingStructure.map(emp => (
                          <TableRow key={emp.id}>
                              <TableCell className="font-medium">{emp.empresa}</TableCell>
                              <TableCell>{emp.rol}</TableCell>
                              <TableCell className="text-center font-semibold">{emp.participacion}</TableCell>
                              <TableCell className="text-center">
                                  <Badge variant={rendimientoVariant[emp.rendimiento as keyof typeof rendimientoVariant]}>{emp.rendimiento}</Badge>
                              </TableCell>
                               <TableCell className="text-right">
                                  <Button asChild variant="outline" size="sm">
                                      <Link href={emp.dashboard}>Acceder a Dashboard</Link>
                                  </Button>
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </CardContent>
      </Card>

      {/* Quick Access Modules */}
      <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Acceso a Módulos del Ecosistema</h2>
          <QuickAccess />
      </div>
    </div>
  );
}
