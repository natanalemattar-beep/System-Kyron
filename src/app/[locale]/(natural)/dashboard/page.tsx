
"use client";

import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    CheckCircle, 
    ShieldAlert, 
    Fingerprint, 
    ArrowRight, 
    FileText, 
    Bell,
    Settings,
    ShieldCheck,
    History
} from 'lucide-react';
import { Link } from "@/navigation";
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate, cn } from "@/lib/utils";

const kpiData = [
  { title: "Mis Documentos", value: "4 Activos", icon: FileText, desc: "RIF vence en 15 días", color: "text-blue-400", bg: "bg-blue-400/5" },
  { title: "ID Digital", value: "VERIFICADA", icon: Fingerprint, desc: "Acceso Nivel 5", color: "text-primary", bg: "bg-primary/10" },
  { title: "Trámites", value: "2 en curso", icon: History, desc: "Partida de Nacimiento", color: "text-emerald-400", bg: "bg-emerald-400/5" },
];

export default function DashboardPersonalPage() {
  return (
    <div className="space-y-12 w-full animate-in fade-in duration-700 px-6 md:px-10 pb-20">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-4 border-primary pl-8 py-2">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[9px] font-black uppercase tracking-[0.4em] border border-primary/10">
                <ShieldCheck className="h-3 w-3" /> IDENTIDAD VERIFICADA
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none text-white italic-shadow">¡Hola, Carlos!</h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">Acceso Seguro • Gestión Personal 2.6</p>
        </div>
        
        <div className="flex gap-3">
            <Button asChild variant="outline" className="h-12 px-6 rounded-xl border-white/5 bg-white/5 text-white/60 font-black text-[9px] uppercase tracking-widest hover:bg-white/10">
                <Link href="/tarjeta-digital" className="flex items-center gap-2"><UserCircleIcon className="h-4 w-4" /> Mi ID Digital</Link>
            </Button>
            <Button asChild variant="outline" size="icon" className="h-12 w-12 rounded-xl border-white/5 bg-white/5 hover:bg-white/10 transition-all">
                <Link href="/notificaciones"><Bell className="h-5 w-5 text-white/40" /></Link>
            </Button>
        </div>
      </header>
      
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/[0.02] border-white/5 rounded-[2rem] overflow-hidden group hover:bg-white/[0.04] transition-all duration-500 shadow-xl">
                  <CardContent className="p-8">
                      <div className="flex justify-between items-center mb-8">
                        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20">{kpi.title}</p>
                        <div className={cn("p-3 rounded-xl border border-white/5 transition-all group-hover:-rotate-6", kpi.bg)}>
                            <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                        </div>
                      </div>
                      <p className="text-2xl font-black italic text-white/90 leading-none mb-3 uppercase">{kpi.value}</p>
                      <p className={cn("text-[10px] font-bold uppercase tracking-widest", kpi.title === "Mis Documentos" ? "text-amber-400" : "text-white/30")}>{kpi.desc}</p>
                  </CardContent>
              </Card>
            </motion.div>
        ))}
      </div>

      <div className="grid gap-10 grid-cols-1 lg:grid-cols-12">
        <Card className="lg:col-span-8 bg-white/[0.01] border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <CardHeader className="p-10 border-b border-white/5 flex flex-row items-center justify-between bg-white/[0.01]">
                <div className="space-y-1">
                    <CardTitle className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-4 text-white">
                        <Fingerprint className="text-primary h-6 w-6" /> Mis Documentos Recientes
                    </CardTitle>
                    <p className="text-[9px] font-bold uppercase text-white/20 tracking-widest italic">Archivo Personal Protegido</p>
                </div>
                <Button variant="ghost" asChild size="sm" className="text-[9px] font-black uppercase tracking-widest text-primary hover:text-white">
                    <Link href="/documentos">Ver Todo</Link>
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-white/[0.02] border-none">
                            <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest text-white/30">Documento</TableHead>
                            <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest text-white/30">Fecha</TableHead>
                            <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest text-white/30">Acción</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[
                            { name: "Cédula de Identidad", date: "15/01/2024", type: "Identidad" },
                            { name: "RIF Personal", date: "20/05/2024", type: "Fiscal" },
                        ].map((doc, i) => (
                            <TableRow key={i} className="border-white/5 hover:bg-white/[0.02] transition-colors">
                                <TableCell className="pl-10 py-6 font-black text-xs text-white/80 uppercase italic">{doc.name}</TableCell>
                                <TableCell className="py-6 text-[10px] font-bold text-white/30 uppercase">{doc.date}</TableCell>
                                <TableCell className="text-right pr-10">
                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 text-primary">
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-8">
           <Card className="glass-card border-none bg-white/[0.02] rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group border-l-4 border-primary">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><ShieldCheck className="h-20 w-20" /></div>
                <h3 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-6 flex items-center gap-3 text-white">
                    Protección de Datos
                </h3>
                <div className="space-y-6">
                    <p className="text-xs font-medium text-white/40 leading-relaxed uppercase">
                        Su identidad está sellada mediante el protocolo Kyron v2.6. Sus documentos civiles residen en un nodo de almacenamiento cifrado inaccesible para terceros.
                    </p>
                    <Button asChild variant="outline" className="w-full h-12 rounded-xl border-primary/20 text-primary hover:bg-primary/10 font-black text-[9px] uppercase tracking-widest">
                        <Link href="/seguridad">GESTIONAR PRIVACIDAD</Link>
                    </Button>
                </div>
           </Card>

           <Card className="border shadow-sm bg-card/50 backdrop-blur-sm rounded-[2rem]">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Avisos del Sistema</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 flex items-start gap-3">
                        <ShieldAlert className="h-4 w-4 text-red-500 mt-0.5" />
                        <div className="text-[10px]">
                            <p className="font-black text-red-500 uppercase">Actualización de RIF</p>
                            <p className="text-red-400/70 mt-1 font-medium leading-tight uppercase">Su registro fiscal requiere actualización antes del cierre del periodo.</p>
                        </div>
                    </div>
                </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

function UserCircleIcon(props: any) {
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
            <circle cx="12" cy="10" r="3" />
            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
        </svg>
    )
}
