
"use client";

import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    CheckCircle, 
    Clock, 
    ShieldAlert, 
    Fingerprint, 
    ArrowRight, 
    Activity, 
    Sparkles, 
    Home, 
    FileText, 
    Recycle, 
    Smartphone,
    CreditCard,
    Zap,
    Download,
    Eye,
    Bell,
    Settings,
    MoreHorizontal,
    HeartPulse,
    Search
} from 'lucide-react';
import { Link } from "@/navigation";
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate, cn, formatCurrency } from "@/lib/utils";

const kpiData = [
  { title: "Mis Documentos", value: "4 Activos", icon: FileText, desc: "RIF vence en 15d", color: "text-blue-400", bg: "bg-blue-400/5" },
  { title: "Mi Línea Kyron", value: "Activa", icon: CheckCircle, desc: "+58 424-1234567", color: "text-emerald-400", bg: "bg-emerald-400/5" },
  { title: "Mis Puntos", value: "1,250 pts", icon: Recycle, desc: "340kg CO₂ ahorrado", color: "text-secondary", bg: "bg-secondary/10" },
];

const misDocumentos = [
    { id: "V-32.855.496", doc: "Cédula de Identidad", estado: "Vigente", vencimiento: "2031", validez: "OK" },
    { id: "J-12345678-9", doc: "RIF Personal", estado: "Por Renovar", vencimiento: "15 días", validez: "Alert" },
    { id: "PAS-V00123", doc: "Pasaporte", estado: "Vigente", vencimiento: "2028", validez: "OK" },
    { id: "MS-9988", doc: "Carnet de Salud", estado: "Vigente", vencimiento: "2026", validez: "OK" },
];

export default function DashboardPersonalPage() {
  return (
    <div className="space-y-12 w-full animate-in fade-in duration-700 px-6 md:px-10 pb-20">
      
      {/* CABECERA PERSONAL */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-4 border-primary pl-8 py-2">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[9px] font-black uppercase tracking-[0.4em] border border-primary/10">
                <ShieldAlert className="h-3 w-3" /> IDENTIDAD VERIFICADA
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none text-white italic-shadow flex items-center gap-4">
                ¡Hola, Carlos! <span className="not-italic">👋</span>
            </h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">Último acceso: Hoy 9:30 AM • Área Personal</p>
        </div>
        
        <div className="flex gap-3">
            <Button asChild variant="outline" size="icon" className="h-12 w-12 rounded-xl border-white/5 bg-white/5 hover:bg-white/10 transition-all">
                <Link href="/notificaciones"><Bell className="h-5 w-5 text-white/40" /></Link>
            </Button>
            <Button asChild variant="outline" size="icon" className="h-12 w-12 rounded-xl border-white/5 bg-white/5 hover:bg-white/10 transition-all">
                <Link href="/seguridad"><Settings className="h-5 w-5 text-white/40" /></Link>
            </Button>
        </div>
      </header>
      
      {/* TARJETAS KPI */}
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
        {/* IDENTIDAD DIGITAL */}
        <Card className="lg:col-span-8 bg-white/[0.01] border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <CardHeader className="p-10 border-b border-white/5 flex flex-row items-center justify-between bg-white/[0.01]">
                <div className="space-y-1">
                    <CardTitle className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-4 text-white">
                        <Fingerprint className="text-primary h-6 w-6" /> Mis Documentos Oficiales
                    </CardTitle>
                    <p className="text-[9px] font-bold uppercase text-white/20 tracking-widest italic">Expedientes activos y seguros</p>
                </div>
                <Button variant="ghost" asChild size="sm" className="text-[9px] font-black uppercase tracking-widest text-primary hover:text-white">
                    <Link href="/documentos">Gestionar Todo</Link>
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-white/[0.01] border-none">
                            <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Documento</TableHead>
                            <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Estado</TableHead>
                            <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Vigencia</TableHead>
                            <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Acción</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {misDocumentos.map((doc, idx) => (
                            <TableRow key={idx} className="hover:bg-white/[0.02] border-white/5 transition-all">
                                <TableCell className="pl-10 py-6">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-black uppercase tracking-tight text-white/80">{doc.doc}</span>
                                        <span className="text-[9px] text-primary font-bold tracking-widest font-mono italic">{doc.id}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-6">
                                    <Badge variant="outline" className={cn(
                                        "text-[8px] font-black uppercase tracking-widest h-6 px-3 rounded-lg",
                                        doc.estado === "Vigente" ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/5" : "border-amber-500/20 text-amber-400 bg-amber-500/5"
                                    )}>{doc.estado}</Badge>
                                </TableCell>
                                <TableCell className="py-6 text-[10px] font-bold text-white/30 uppercase">{doc.vencimiento}</TableCell>
                                <TableCell className="text-right pr-10 py-6">
                                    <Button variant="ghost" size="sm" className="h-9 rounded-xl hover:bg-primary/10 hover:text-primary font-black text-[9px] uppercase tracking-widest transition-all">
                                        {doc.estado === "Por Renovar" ? "Renovar" : "Ver"}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-8">
           {/* TU LÍNEA KYRON */}
           <Card className="border-none bg-primary text-primary-foreground rounded-[2.5rem] overflow-hidden relative group p-1 shadow-2xl">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-all duration-1000">
                    <Smartphone className="h-32 w-32" />
                </div>
                <div className="p-8 space-y-6 relative z-10 bg-primary rounded-[2.4rem]">
                    <div className="space-y-1">
                        <CardTitle className="text-2xl font-black uppercase italic tracking-tighter leading-none text-white">Mi Línea de Datos</CardTitle>
                        <p className="text-[9px] font-bold uppercase tracking-[0.4em] opacity-40 text-white">Consumo en Tiempo Real</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                            <span>Plan: 12GB / 30GB</span>
                            <span className="italic">40%</span>
                        </div>
                        <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                            <div className="h-full w-[40%] bg-white shadow-glow" />
                        </div>
                        <p className="text-[10px] leading-relaxed font-bold italic opacity-80 uppercase">
                            Estado: <span className="text-white underline underline-offset-4">Conexión Segura</span>
                        </p>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                            <Button variant="secondary" className="h-10 text-[8px] font-black bg-white text-primary hover:bg-white/90 rounded-xl uppercase tracking-tighter">Recargar</Button>
                            <Button variant="outline" className="h-10 text-[8px] font-black border-white/20 text-white hover:bg-white/10 rounded-xl uppercase tracking-tighter">Detalles</Button>
                        </div>
                    </div>
                </div>
           </Card>

           {/* ECO-CRÉDITOS */}
           <Card className="bg-white/[0.02] border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group border-l-4 border-secondary">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Recycle className="h-20 w-20" /></div>
                <h3 className="text-sm font-black text-secondary uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                    <Sparkles className="h-4 w-4" /> Mis Puntos Acumulados
                </h3>
                <div className="space-y-6">
                    <div>
                        <p className="text-4xl font-black italic tracking-tighter text-white">1,250</p>
                        <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mt-1">Disponibles para canje</p>
                    </div>
                    <Button asChild variant="outline" className="w-full h-12 rounded-xl border-secondary/20 text-secondary hover:bg-secondary/10 font-black text-[9px] uppercase tracking-widest">
                        <Link href="/tarjeta-reciclaje">USAR MIS PUNTOS</Link>
                    </Button>
                </div>
           </Card>
        </div>
      </div>

      {/* ALERTAS PERSONALES */}
      <Card className="bg-rose-500/5 border border-rose-500/20 rounded-[2rem] p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5"><Bell className="h-32 w-32" /></div>
          <h3 className="text-lg font-black uppercase italic tracking-tighter text-rose-500 mb-6 flex items-center gap-3">
              <Bell className="h-5 w-5" /> Avisos Importantes
          </h3>
          <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="flex items-center gap-4">
                      <ShieldAlert className="h-5 w-5 text-amber-500" />
                      <span className="text-xs font-bold text-white/80 uppercase">Actualización de RIF requerida (15 días)</span>
                  </div>
                  <Button size="sm" className="btn-3d-primary h-8 px-4 text-[8px] font-black uppercase">RENOVAR</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="flex items-center gap-4">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <span className="text-xs font-bold text-white/80 uppercase">Nuevo beneficio: 2x1 en puntos de reciclaje este mes</span>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 px-4 text-[8px] font-black uppercase text-white/40">VER MÁS</Button>
              </div>
          </div>
      </Card>

      {/* OTROS SERVICIOS */}
      <section className="space-y-8 pt-10">
          <div className="flex items-center gap-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Acceso a otros Módulos</h2>
              <div className="h-px flex-1 bg-white/5"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                  { label: "Empresa", icon: CreditCard, color: "text-blue-400" },
                  { label: "Contabilidad", icon: BarChart3, color: "text-primary" },
                  { label: "Recursos Humanos", icon: Users, color: "text-emerald-400" },
                  { label: "Área Legal", icon: Scale, color: "text-secondary" }
              ].map((serv, i) => (
                  <Card key={i} className="bg-white/[0.01] border-white/5 rounded-[1.5rem] p-6 hover:bg-white/[0.03] transition-all cursor-pointer group text-center">
                      <div className={cn("p-3 rounded-xl bg-white/5 border border-white/5 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform", serv.color)}>
                          <serv.icon className="h-5 w-5" />
                      </div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">{serv.label}</p>
                  </Card>
              ))}
          </div>
      </section>
    </div>
  );
}
