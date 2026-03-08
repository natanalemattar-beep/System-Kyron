
"use client";

import {
  Signal,
  ArrowRight,
  ShieldCheck,
  Activity,
  Radio,
  Lock,
  Zap,
  Globe,
  Cpu,
  Database,
  FileText
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { formatDate, cn } from "@/lib/utils";
import { Link } from '@/navigation';
import { Logo } from "@/components/logo";

const initialComplianceStatus = [
    { id: "CON-001", name: "Concesión de Espectro Radioeléctrico", expires: "2028-03-20", status: "Vigente" },
    { id: "CON-002", name: "Licencia de Proveedor de Servicios (ISP)", expires: "2028-04-01", status: "Vigente" },
    { id: "CON-003", name: "Habilitación Postal", expires: "2024-06-01", status: "Vencida" },
];

const statusVariant: { [key: string]: { text: string, color: string } } = {
  Vigente: { text: "ACTIVO", color: "text-green-400" },
  Vencida: { text: "EN REVISIÓN", color: "text-red-400" },
  "Por Vencer": { text: "AVISO", color: "text-yellow-400" },
};

export default function DashboardTelecomPage() {
    const licenciaVencida = initialComplianceStatus.find(l => l.status === 'Vencida');

  return (
    <div className="space-y-12 pb-20 px-6 md:px-10">
      
      <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-amber-500 pl-8 py-2 mt-10">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-amber-500 shadow-glow mb-4">
                <Signal className="h-3 w-3" /> ÁREA TÉCNICA
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Gestión de <span className="text-amber-500 italic">Conectividad</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">Infraestructura Digital • Servicios 5G</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white">
                Estado de la Red
            </Button>
        </div>
      </header>
      
       {licenciaVencida && (
           <Alert variant="destructive" className="mb-10 bg-destructive/10 border-l-4 border-destructive rounded-[2rem] p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform"><Activity className="h-20 w-20" /></div>
                <AlertTitle className="ml-12 font-black uppercase tracking-widest text-lg">AVISO DE VENCIMIENTO CRÍTICO</AlertTitle>
                <AlertDescription className="ml-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mt-4">
                    <span className="text-sm font-bold text-white/70 italic uppercase">Su licencia "{licenciaVencida.name}" ha vencido el {formatDate(licenciaVencida.expires)}. Inicie el trámite para evitar sanciones.</span>
                    <Button asChild variant="destructive" className="h-12 px-8 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-2xl">
                       <Link href="/conatel/licenses">INICIAR RENOVACIÓN</Link>
                    </Button>
                </AlertDescription>
            </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
               <Card className="glass-card border-none rounded-[3rem] bg-white/[0.01] overflow-hidden shadow-2xl">
                    <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
                        <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white flex items-center gap-4">
                            <Radio className="h-6 w-6 text-amber-500" /> Resumen de Licencias (CONATEL)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                        <TableHeader>
                            <TableRow className="bg-white/[0.02] border-none">
                                <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest text-white/30">Habilitación / Permiso</TableHead>
                                <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest text-white/30">Estado</TableHead>
                                <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest text-white/30">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {initialComplianceStatus.map(item => (
                                <TableRow key={item.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                                    <TableCell className="pl-10 py-6">
                                        <p className="font-black text-sm text-white/80 uppercase italic tracking-tight">{item.name}</p>
                                        <p className="text-[9px] font-mono font-bold text-white/20 uppercase mt-1">ID: {item.id} • VENCE: {formatDate(item.expires)}</p>
                                    </TableCell>
                                    <TableCell className="py-6">
                                       <span className={cn("font-black text-[10px] tracking-widest uppercase italic", statusVariant[item.status as keyof typeof statusVariant].color)}>
                                          {statusVariant[item.status as keyof typeof statusVariant].text}
                                       </span>
                                    </TableCell>
                                    <TableCell className="text-right pr-10 py-6">
                                        <Button asChild variant="outline" size="sm" className="rounded-lg h-9 px-4 text-[9px] font-black uppercase tracking-widest border-white/10 hover:bg-white/5">
                                            <Link href="/conatel/licenses">GESTIONAR</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </CardContent>
                </Card>
          </div>
          
          <div className="lg:col-span-5">
             <Card className="glass-card border-none bg-amber-500/5 rounded-[3rem] p-10 border border-amber-500/10">
                <CardHeader className="p-0 mb-8">
                    <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white">Información de Contacto Oficial</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-6 text-xs font-bold uppercase tracking-widest text-white/40 leading-relaxed">
                    <h4 className="text-amber-500 font-black text-sm mb-4 italic underline decoration-amber-500/30 underline-offset-8">[ REQUISITOS DE PRESENTACIÓN ]</h4>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-4"><div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div> <span><strong className="text-white/70">Lugar:</strong> Oficina de Atención al Ciudadano, Caracas.</span></li>
                        <li className="flex items-center gap-4"><div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div> <span><strong className="text-white/70">Horario:</strong> L-V, 08:00 - 16:30.</span></li>
                        <li className="flex items-center gap-4"><div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div> <span><strong className="text-white/70">Identidad:</strong> Requiere validación del representante legal.</span></li>
                        <li className="flex items-center gap-4"><div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div> <span><strong className="text-white/70">Base Legal:</strong> Ley de Telecomunicaciones vigente.</span></li>
                    </ul>
                </CardContent>
             </Card>
          </div>
       </div>

       <Card className="glass-card border-none p-12 md:p-20 rounded-[4rem] bg-white/[0.02] mt-20 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>
          <div className="grid lg:grid-cols-12 gap-16 md:gap-24 relative z-10">
              <div className="lg:col-span-5 space-y-10">
                  <div className="flex items-center gap-6">
                      <Logo className="h-16 w-16 drop-shadow-glow" />
                      <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
                          Red de Datos <br/> <span className="text-amber-500">Empresarial</span>
                      </h2>
                  </div>
                  <p className="text-xl font-bold italic text-white/60 leading-relaxed text-justify border-l-4 border-amber-500/20 pl-10">
                      Infraestructura de conectividad profesional basada en estándares internacionales. Kyron gestiona de forma inteligente las líneas de su empresa mediante activación remota de eSIM, asegurando comunicaciones protegidas para sus operaciones diarias y la seguridad de sus datos corporativos.
                  </p>
                  <div className="flex items-center gap-10 pt-6 text-[9px] font-black uppercase tracking-[0.5em] text-white/10">
                      <span className="flex items-center gap-2"><Globe className="h-3 w-3" /> ESTÁNDAR GLOBAL</span>
                      <span className="flex items-center gap-2"><Cpu className="h-3 w-3" /> ACTIVACIÓN SEGURA</span>
                  </div>
              </div>

              <div className="lg:col-span-7 space-y-12">
                  <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 shadow-inner">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-amber-400 mb-10 flex items-center gap-3">
                          <Activity className="h-4 w-4" /> Gestión de Servicios Digitales
                      </h4>
                      <div className="text-sm font-bold italic text-white/70 leading-relaxed text-justify space-y-6">
                          <div className="flex gap-8 items-start">
                              <span className="font-black text-xs text-amber-500">[1]</span>
                              <span>Asignación de números y planes de datos mediante activación remota.</span>
                          </div>
                          <div className="flex gap-8 items-start">
                              <span className="font-black text-xs text-amber-500">[2]</span>
                              <span>Configuración de redes privadas para el tráfico administrativo seguro.</span>
                          </div>
                          <div className="flex gap-8 items-start">
                              <span className="font-black text-xs text-amber-500">[3]</span>
                              <span>Prioridad de red para garantizar el funcionamiento de los sistemas contables.</span>
                          </div>
                          <div className="flex gap-8 items-start">
                              <span className="font-black text-xs text-amber-500">[4]</span>
                              <span>Administración centralizada de dispositivos móviles de la empresa.</span>
                          </div>
                      </div>
                  </div>
                  
                  <Card className="bg-amber-500/5 border border-amber-500/20 p-10 rounded-[3rem] flex items-center justify-between">
                      <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400">Estado de la Red</p>
                          <p className="text-2xl font-black text-white italic tracking-tighter uppercase">FUNCIONANDO</p>
                      </div>
                      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[9px] font-black px-6 py-2 rounded-xl shadow-glow-secondary uppercase">Alta Velocidad</Badge>
                  </Card>
              </div>
          </div>
      </Card>
    </div>
  );
}
