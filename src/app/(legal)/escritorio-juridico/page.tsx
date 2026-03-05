
"use client";

import { 
  Gavel, 
  FileSignature, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  PlusCircle, 
  Download,
  Eye,
  FileText,
  Search,
  Scale,
  Activity,
  Lock,
  Wand2,
  Terminal,
  ArrowRight
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

const kpiData = [
  { title: "Contratos Activos", value: "24", icon: FileSignature, color: "text-blue-400", bg: "bg-blue-400/5" },
  { title: "Alertas Críticas", value: "3", icon: AlertTriangle, color: "text-rose-400", bg: "bg-rose-400/5" },
  { title: "Poderes Vigentes", value: "8", icon: ShieldCheck, color: "text-emerald-400", bg: "bg-emerald-400/5" },
  { title: "Trámites en Curso", value: "5", icon: Clock, color: "text-purple-400", bg: "bg-purple-400/5" },
];

const expedientesRecientes = [
  { id: "EXP-2024-001", asunto: "Renovación Marca Kyron", fecha: "25/07/2024", estado: "En Revisión", prioridad: "Alta" },
  { id: "EXP-2024-042", asunto: "Contrato Servicios TechSolutions", fecha: "22/07/2024", estado: "Aprobado", prioridad: "Media" },
  { id: "EXP-2024-015", asunto: "Poder Judicial Especial - Chacao", fecha: "18/07/2024", estado: "Vencido", prioridad: "Crítica" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  "En Revisión": "secondary",
  "Aprobado": "default",
  "Vencido": "destructive",
};

export default function EscritorioJuridicoPage() {
  return (
    <div className="space-y-12 pb-20 px-6 md:px-10">
      
      <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-slate-500 pl-8 py-2 mt-10">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-500/10 border border-slate-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 shadow-glow mb-4">
                <Gavel className="h-3 w-3" /> NODO LEGAL
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Centro de <span className="text-slate-400 italic">Mando Jurídico</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">Bóveda de Documentos Inmutables • Compliance Hub 2026</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white">
            <Download className="mr-2 h-4 w-4" /> Exportar Auditoría
          </Button>
          <Button size="sm" className="btn-3d-primary h-12 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl">
            <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Expediente
          </Button>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card border-none bg-white/[0.02] p-2 rounded-[2rem]">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-white/30">{kpi.title}</CardTitle>
                <div className={cn("p-2 rounded-lg border border-white/5", kpi.bg)}>
                    <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="text-3xl font-black italic text-white tracking-tighter leading-none">{kpi.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        <Card className="lg:col-span-8 glass-card border-none rounded-[3rem] bg-white/[0.01] overflow-hidden">
          <CardHeader className="p-10 border-b border-white/5 flex flex-col md:flex-row justify-between items-center bg-white/[0.01]">
            <div className="space-y-1">
                <CardTitle className="text-xl font-black uppercase italic tracking-tighter">Expedientes y Trámites</CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Seguimiento de gestiones ante registros y notarías</CardDescription>
            </div>
            <div className="relative w-full md:w-64 mt-4 md:mt-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                <Input placeholder="Buscar en el Ledger..." className="pl-10 h-11 rounded-xl bg-white/5 border-white/10 text-xs font-bold" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-white/[0.02] border-none">
                  <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest text-white/20">Ref. Operativa</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest text-white/20">Asunto Institucional</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest text-white/20">Fecha</TableHead>
                  <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest text-white/20">Estatus</TableHead>
                  <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest text-white/20">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expedientesRecientes.map((exp) => (
                  <TableRow key={exp.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <TableCell className="pl-10 py-6 font-mono text-[10px] font-black text-primary italic">{exp.id}</TableCell>
                    <TableCell className="py-6 font-black uppercase text-xs text-white/80 group-hover:text-white">{exp.asunto}</TableCell>
                    <TableCell className="py-6 text-[10px] font-bold text-white/30 uppercase">{exp.fecha}</TableCell>
                    <TableCell className="text-center py-6">
                      <Badge variant={statusVariant[exp.estado]} className="text-[8px] font-black uppercase tracking-widest h-6 px-3 rounded-lg">{exp.estado}</Badge>
                    </TableCell>
                    <TableCell className="text-right pr-10 py-6">
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t border-white/5 bg-white/[0.01] p-6 flex justify-center">
            <Button variant="link" asChild className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-primary transition-all">
              <Link href="/poderes-representacion" className="flex items-center">
                ACCEDER AL ARCHIVO HISTÓRICO <ArrowRight className="ml-3 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="lg:col-span-4 space-y-10">
          <Card className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-glow border-none group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-all duration-1000">
                <Wand2 className="h-32 w-32" />
            </div>
            <div className="relative z-10">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4">Generador Jurídico IA</h3>
                <p className="text-xs font-bold opacity-80 leading-relaxed uppercase mb-8">Redacción automatizada de borradores legales homologados 2026.</p>
            </div>
            <Button asChild className="w-full h-12 text-[9px] font-black bg-white text-primary hover:bg-white/90 rounded-xl uppercase tracking-widest relative z-10 shadow-2xl">
                <Link href="/generador-documentos">NUEVO CONTRATO <ArrowRight className="ml-2 h-4 w-4"/></Link>
            </Button>
          </Card>

          <Card className="glass-card border-none bg-white/[0.02] rounded-[2.5rem] p-8">
            <CardHeader className="p-0 mb-6">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4" /> Vencimientos Próximos
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="flex items-start gap-5 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10 group hover:bg-amber-500/10 transition-all">
                <Clock className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Poder de Administración</p>
                  <p className="text-[9px] font-bold text-white/40 uppercase">Vence en 12 días (A. Pérez)</p>
                </div>
              </div>
              <div className="flex items-start gap-5 p-5 rounded-2xl bg-rose-500/5 border border-rose-500/10 group hover:bg-rose-500/10 transition-all">
                <AlertTriangle className="h-6 w-6 text-rose-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Habilitación CONATEL</p>
                  <p className="text-[9px] font-black text-rose-500 uppercase italic">VENCIDA (CON-003)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SECCIÓN DETALLADA DE INTELIGENCIA TÉCNICA (JURÍDICO) */}
      <Card className="glass-card border-none p-12 md:p-20 rounded-[4rem] bg-white/[0.02] mt-20 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-500/40 to-transparent"></div>
          <div className="grid lg:grid-cols-12 gap-16 md:gap-24 relative z-10">
              <div className="lg:col-span-5 space-y-10">
                  <div className="flex items-center gap-6">
                      <Logo className="h-16 w-16 drop-shadow-glow" />
                      <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                          Bóveda <br/> <span className="text-slate-500">Jurídica</span>
                      </h2>
                  </div>
                  <p className="text-xl font-bold italic text-white/60 leading-relaxed text-justify border-l-4 border-slate-500/20 pl-10">
                      Archivo digital de grado legal para el resguardo inmutable de los activos jurídicos de la empresa. Centraliza Actas Constitutivas, Modificaciones de Estatutos, Poderes de Representación y Registros de Marca ante el SAPI. El sistema actúa como un Oficial de Cumplimiento IA, garantizando que la preexistencia de documentos sea legalmente inatacable.
                  </p>
                  <div className="flex items-center gap-10 pt-6 text-[9px] font-black uppercase tracking-[0.5em] text-white/10">
                      <span className="flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> RFC 3161 TIMESTAMP</span>
                      <span className="flex items-center gap-2"><Lock className="h-3 w-3" /> ZERO-KNOWLEDGE</span>
                  </div>
              </div>

              <div className="lg:col-span-7 space-y-12">
                  <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 shadow-inner">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400 mb-10 flex items-center gap-3">
                          <Terminal className="h-4 w-4" /> Protocolo de Custodia Legal
                      </h4>
                      <div className="text-sm font-bold italic text-white/70 leading-relaxed text-justify space-y-6">
                          <div className="flex gap-8 items-start">
                              <span className="font-black text-xs text-slate-500">[1]</span>
                              <span>Digitalización de instrumentos legales con metadatos de clasificación por expediente (SAREN/SAPI).</span>
                          </div>
                          <div className="flex gap-8 items-start">
                              <span className="font-black text-xs text-slate-500">[2]</span>
                              <span>Configuración de alertas predictivas para evitar el cese de facultades de representantes legales.</span>
                          </div>
                          <div className="flex gap-8 items-start">
                              <span className="font-black text-xs text-slate-500">[3]</span>
                              <span>Cifrado de archivos en reposo: desencriptación exclusiva mediante llave biométrica del titular.</span>
                          </div>
                          <div className="flex gap-8 items-start">
                              <span className="font-black text-xs text-slate-500">[4]</span>
                              <span>Sincronización síncrona con el Registro de Accionistas y Holding de Empresas.</span>
                          </div>
                      </div>
                  </div>
                  
                  <Card className="bg-slate-500/5 border border-slate-500/20 p-10 rounded-[3rem] flex items-center justify-between">
                      <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Estado de Bóveda</p>
                          <p className="text-2xl font-black text-white italic tracking-tighter uppercase">INTEGRIDAD 100%</p>
                      </div>
                      <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30 text-[9px] font-black px-6 py-2 rounded-xl shadow-glow uppercase">Secure Node Active</Badge>
                  </Card>
              </div>
          </div>
      </Card>
    </div>
  );
}
