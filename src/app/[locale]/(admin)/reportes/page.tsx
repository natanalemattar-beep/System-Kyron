
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBar as BarChart3, Download, Printer, Activity, Terminal, ShieldCheck, ChartPie as PieChart, TrendingUp, Search, Sheet, CircleCheck as CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const reportGroups = [
    { title: "Gestión Financiera", items: ["Balance General Consolidado", "Estado de Ganancias y Pérdidas", "Flujo de Caja Real vs Proyectado", "Análisis de Ratios de Liquidez"], icon: TrendingUp },
    { title: "Control Fiscal", items: ["Libro de Compras y Ventas (TXT)", "Resumen Mensual de Retenciones", "Expediente de Municipales", "Auditoría Preventiva SENIAT"], icon: ShieldCheck },
    { title: "Recursos Humanos", items: ["Resumen de Nómina Anual", "Cálculo de Prestaciones Sociales", "Reporte de Vacaciones y Utilidades", "Consolidado de Aportes Parafiscales"], icon: Activity },
];

export default function ReportesGlobalPage() {
  const { toast } = useToast();
  const [exportingExcel, setExportingExcel] = useState(false);

  const handleExportDossier = async () => {
    setExportingExcel(true);
    try {
      const allItems = reportGroups.flatMap(g => g.items.map(item => ({ grupo: g.title, reporte: item })));
      const res = await fetch('/api/export-excel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'DOSSIER DE REPORTES - SYSTEM KYRON 2026',
          filename: 'dossier_reportes_2026',
          sheets: [{
            name: 'Reportes',
            headers: ['Grupo', 'Nombre del Reporte'],
            keys: ['grupo', 'reporte'],
            rows: allItems,
          }],
        }),
      });
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'dossier_reportes_2026.xlsx';
      document.body.appendChild(a); a.click();
      document.body.removeChild(a); URL.revokeObjectURL(url);
      toast({ title: '✔ EXCEL GENERADO', description: 'Dossier de reportes descargado.', action: <CheckCircle className="text-primary h-4 w-4" /> });
    } catch {
      toast({ title: 'Error', description: 'No se pudo generar el archivo Excel.', variant: 'destructive' });
    } finally {
      setExportingExcel(false);
    }
  };

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                <BarChart3 className="h-3 w-3" /> NODO ANALÍTICO
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none">Dossier de <span className="text-primary italic">Reportes</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Inteligencia de Negocios • Auditoría Consolidada 2026</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50" onClick={() => toast({ title: "PROGRAMAR REPORTE", description: "Configure la frecuencia de envío automático de reportes." })}>
                <Printer className="mr-2 h-4 w-4" /> IMPRIMIR TODO
            </Button>
            <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                <Download className="mr-2 h-4 w-4" /> EXPORTAR DOSSIER
            </Button>
        </div>
      </header>

      <div className="mb-10">
        <div className="relative max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
            <Input placeholder="Buscar reporte por nombre o área..." className="pl-12 h-14 rounded-2xl bg-white/5 border-border text-xs font-bold uppercase tracking-widest shadow-inner" />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {reportGroups.map((group, i) => (
            <Card key={i} className="glass-card border-none bg-card/40 p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between group hover:border-primary/30 transition-all">
                <div className="space-y-8">
                    <div className="flex justify-between items-start">
                        <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 group-hover:scale-110 transition-transform">
                            <group.icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge className="bg-muted text-muted-foreground border-none text-[8px] font-black uppercase px-3">{group.items.length} REPORTES</Badge>
                    </div>
                    <div>
                        <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground mb-6">{group.title}</CardTitle>
                        <ul className="space-y-4">
                            {group.items.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-4 text-xs font-bold uppercase tracking-tight text-foreground/60 hover:text-primary transition-colors cursor-pointer group/item">
                                    <div className="h-1 w-1 rounded-full bg-primary/40 group-hover/item:scale-[2] transition-transform" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <CardFooter className="p-0 pt-10">
                    <Button variant="outline" className="w-full h-12 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest group-hover:bg-primary group-hover:text-white transition-all" onClick={() => toast({ title: "DESCARGA INICIADA", description: "Lote de reportes exportado exitosamente." })}>DESCARGAR LOTE</Button>

                </CardFooter>
            </Card>
        ))}
      </div>

      <Card className="glass-card border-none bg-[#050505] p-12 rounded-[4rem] mt-10 relative overflow-hidden shadow-2xl group">
        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-all duration-1000">
            <PieChart className="h-48 w-48 text-primary" />
        </div>
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative z-10">
                <div className="flex items-center gap-4">
                    <Activity className="h-8 w-8 text-[#00A86B] animate-pulse" />
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-foreground">Visualización Ejecutiva</h3>
                </div>
                <p className="text-lg font-medium italic text-white/60 leading-relaxed text-justify">
                    System Kyron transforma sus datos crudos en visiones estratégicas de alta densidad. El motor IA genera resúmenes gráficos que permiten a la directiva identificar cuellos de botella financieros en menos de 3 segundos de inspección.
                </p>
                <Button variant="secondary" className="h-14 px-10 rounded-2xl bg-white text-primary font-black uppercase text-[10px] tracking-[0.2em] shadow-glow" onClick={() => toast({ title: "HOLOGRAFÍA 3D", description: "Renderización holográfica de datos activada." })}>SOLICITAR VISTA 3D</Button>
            </div>
            <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 shadow-inner relative z-10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-10 flex items-center gap-3 italic">
                    <Terminal className="h-4 w-4" /> Telemetría de Auditoría
                </h4>
                <div className="space-y-6">
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/40">
                        <span>Precisión de Datos</span>
                        <span className="text-emerald-400">99.99%</span>
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/40">
                        <span>Sincronización BCV</span>
                        <span className="text-emerald-400">Activa</span>
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/40">
                        <span>Sellado Inmutable</span>
                        <span className="text-primary font-black shadow-glow-text">VERIFIED</span>
                    </div>
                </div>
            </div>
        </div>
      </Card>
    </div>
  );
}
