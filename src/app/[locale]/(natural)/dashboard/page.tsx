
"use client";

import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    CheckCircle, 
    ShieldAlert, 
    Fingerprint, 
    ArrowRight, 
    FileText, 
    Recycle, 
    Smartphone,
    Bell,
    Settings,
    ShieldCheck,
    Zap,
    History
} from 'lucide-react';
import { Link } from "@/navigation";
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate, cn } from "@/lib/utils";

const kpiData = [
  { title: "Mis Documentos", value: "4 Activos", icon: FileText, desc: "RIF vence en 15 días", color: "text-blue-400", bg: "bg-blue-400/5" },
  { title: "Mi Línea 5G", value: "12.4 GB", icon: Smartphone, desc: "Saldo: $ 15.00", color: "text-primary", bg: "bg-primary/10" },
  { title: "Eco-Créditos", value: "1,250 pts", icon: Recycle, desc: "340kg CO₂ evitado", color: "text-secondary", bg: "bg-secondary/10" },
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
                <Link href="/cuenta-personal/certificados-ingreso" className="flex items-center gap-2"><FileText className="h-4 w-4" /> Certificados de Ingreso</Link>
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
                      <p className="text-3xl font-black tracking-tighter italic text-white/90 leading-none mb-3">{kpi.value}</p>
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
                        <Fingerprint className="text-primary h-6 w-6" /> Mis Documentos
                    </CardTitle>
                    <p className="text-[9px] font-bold uppercase text-white/20 tracking-widest italic">Archivo Personal Protegido</p>
                </div>
                <Button variant="ghost" asChild size="sm" className="text-[9px] font-black uppercase tracking-widest text-primary hover:text-white">
                    <Link href="/documentos">Ver Todo</Link>
                </Button>
            </CardHeader>
            <CardContent className="p-0 text-center py-20 opacity-40">
                <History className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em]">Sincronizando con Bóveda de Documentos...</p>
            </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-8">
           <Card className="border-none bg-primary text-primary-foreground rounded-[2.5rem] overflow-hidden relative group p-1 shadow-2xl">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-all duration-1000">
                    <Zap className="h-32 w-32" />
                </div>
                <div className="p-8 space-y-6 relative z-10 bg-primary rounded-[2.4rem]">
                    <div className="space-y-1">
                        <CardTitle className="text-2xl font-black uppercase italic tracking-tighter leading-none text-white">Mi Línea 5G</CardTitle>
                        <p className="text-[9px] font-bold uppercase tracking-[0.4em] opacity-40 text-white">Consumo de Datos Pro</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                            <span>Uso: 12.4GB / 30GB</span>
                            <span className="italic">41%</span>
                        </div>
                        <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                            <div className="h-full w-[41%] bg-white shadow-glow" />
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-4">
                            <Button variant="secondary" asChild className="h-10 text-[8px] font-black bg-white text-primary hover:bg-white/90 rounded-xl uppercase tracking-tighter">
                                <Link href="/mi-linea">RECARGAR</Link>
                            </Button>
                            <Button variant="outline" asChild className="h-10 text-[8px] font-black border-white/20 text-white hover:bg-white/10 rounded-xl uppercase tracking-tighter">
                                <Link href="/mi-linea">DETALLES</Link>
                            </Button>
                        </div>
                    </div>
                </div>
           </Card>

           <Card className="bg-white/[0.02] border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group border-l-4 border-secondary">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Recycle className="h-20 w-20" /></div>
                <h3 className="text-sm font-black text-secondary uppercase tracking-[0.3em] mb-6 flex items-center gap-3 text-white">
                    Eco-Créditos Acumulados
                </h3>
                <div className="space-y-6">
                    <div>
                        <p className="text-4xl font-black italic tracking-tighter text-white">1,250</p>
                        <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mt-1">Disponibles para canje</p>
                    </div>
                    <Button asChild variant="outline" className="w-full h-12 rounded-xl border-secondary/20 text-secondary hover:bg-secondary/10 font-black text-[9px] uppercase tracking-widest">
                        <Link href="/tarjeta-reciclaje">VER RECOMPENSAS</Link>
                    </Button>
                </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
