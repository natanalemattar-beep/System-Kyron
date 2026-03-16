
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Printer, CheckCircle, MailOpen, Activity, Terminal, ArrowLeft, Send } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import { Link } from "@/navigation";

export default function ComunicacionesSeniatPage() {
    const { toast } = useToast();
    const [tipoCarta, setTipoCarta] = useState("inactividad");
    const [data, setData] = useState({
        empresa: "System Kyron, C.A.",
        rif: "J-12345678-9",
        representante: "Carlos Mattar",
        cedula: "V-32.855.496",
        periodo: "Enero - Marzo 2026",
        motivo: "Cese de actividades comerciales por reestructuración operativa.",
        fecha: new Date().toISOString().substring(0, 10),
    });

    const handleAction = (action: string) => {
        toast({
            title: `PROTOCOLO ${action.toUpperCase()} ACTIVADO`,
            description: "Comunicación procesada bajo cifrado legal.",
            action: <CheckCircle className="text-primary h-4 w-4" />
        });
    };

    const getInactividadContent = () => `
Caracas, ${formatDate(data.fecha)}

Ciudadanos
Servicio Nacional Integrado de Administración Aduanera y Tributaria (SENIAT)
Unidad de Tributos Internos
Presente.-

Asunto: Comunicación de Inactividad Comercial

Yo, ${data.representante}, titular de la Cédula de Identidad N° ${data.cedula}, actuando en mi carácter de Representante Legal de la empresa ${data.empresa}, portadora del RIF ${data.rif}, me dirijo a ustedes en la oportunidad de hacer de su conocimiento que mi representada NO PRESENTÓ ACTIVIDAD COMERCIAL (Ventas ni Compras) durante el periodo comprendido: ${data.periodo}.

Esta notificación se realiza en cumplimiento de los deberes formales para mantener actualizado el expediente administrativo de la entidad ante esta institución.

Sin más a que hacer referencia, queda de ustedes.

Atentamente,

_________________________
${data.representante}
C.I: ${data.cedula}
Representante Legal
`;

    const getCierreContent = () => `
Caracas, ${formatDate(data.fecha)}

Ciudadanos
Servicio Nacional Integrado de Administración Aduanera y Tributaria (SENIAT)
División de Recaudación / Registro de Información Fiscal
Presente.-

Asunto: Notificación de Cierre de Actividades

Yo, ${data.representante}, titular de la Cédula de Identidad N° ${data.cedula}, actuando en mi carácter de Representante Legal de la empresa ${data.empresa}, portadora del RIF ${data.rif}, cumplo con el deber formal de notificar ante este órgano el CIERRE ${tipoCarta === 'cierre_definitivo' ? 'DEFINITIVO' : 'TEMPORAL'} de nuestras actividades económicas a partir de la fecha: ${formatDate(data.fecha)}.

Motivo del cierre: ${data.motivo}

Solicito se realicen las anotaciones correspondientes en el Registro Único de Información Fiscal (RIF) de mi representada, de conformidad con lo establecido en el Código Orgánico Tributario.

Atentamente,

_________________________
${data.representante}
C.I: ${data.cedula}
Representante Legal
`;

    const currentContent = tipoCarta === 'inactividad' ? getInactividadContent() : getCierreContent();

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                <MailOpen className="h-3 w-3" /> NODO DE CORRESPONDENCIA
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Comunicaciones <span className="text-primary italic">Oficiales</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Notificaciones ante el SENIAT • Protocolo de Despacho 2026</p>
        </div>
        <Button variant="ghost" asChild className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary">
            <Link href="/contabilidad/tributos"><ArrowLeft className="mr-2 h-4 w-4" /> VOLVER AL CENTRO</Link>
        </Button>
      </header>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5 space-y-8">
            <Card className="glass-card border-none rounded-[3rem] bg-card/40 p-10 shadow-2xl">
                <CardHeader className="p-0 mb-8">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Configuración de Carta</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-6">
                    <div className="space-y-3">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Tipo de Comunicación</Label>
                        <Select value={tipoCarta} onValueChange={setTipoCarta}>
                            <SelectTrigger className="h-12 rounded-xl bg-white/5 border-border font-bold uppercase"><SelectValue /></SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="inactividad" className="uppercase text-xs font-bold">Carta de Inactividad</SelectItem>
                                <SelectItem value="cierre_temporal" className="uppercase text-xs font-bold">Cierre Temporal</SelectItem>
                                <SelectItem value="cierre_definitivo" className="uppercase text-xs font-bold">Cierre Definitivo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Periodo o Fecha Efectiva</Label>
                        <Input 
                            value={tipoCarta === 'inactividad' ? data.periodo : data.fecha} 
                            onChange={e => setData({...data, [tipoCarta === 'inactividad' ? 'periodo' : 'fecha']: e.target.value})} 
                            className="h-12 rounded-xl bg-white/5 border-border font-bold"
                        />
                    </div>

                    {(tipoCarta === 'cierre_temporal' || tipoCarta === 'cierre_definitivo') && (
                        <div className="space-y-3 animate-in fade-in">
                            <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Motivo del Cierre</Label>
                            <Textarea 
                                value={data.motivo} 
                                onChange={e => setData({...data, motivo: e.target.value})}
                                className="bg-white/5 border-border rounded-xl p-4 text-xs font-bold uppercase"
                            />
                        </div>
                    )}

                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                        <p className="text-[8px] font-black text-primary uppercase tracking-widest mb-4">Firmante Autorizado</p>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-xl"><User className="h-4 w-4 text-primary" /></div>
                            <div>
                                <p className="text-xs font-black uppercase italic text-foreground">{data.representante}</p>
                                <p className="text-[9px] font-bold text-muted-foreground uppercase">{data.cedula}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="p-0 pt-10">
                    <Button className="w-full h-14 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest shadow-xl" onClick={() => handleAction('registro')}>
                        <CheckCircle className="mr-3 h-5 w-5" /> VALIDAR Y SELLAR
                    </Button>
                </CardFooter>
            </Card>
        </div>

        <div className="lg:col-span-7">
            <Card className="glass-card border-none rounded-[3.5rem] bg-white p-12 md:p-20 shadow-2xl relative overflow-hidden font-serif text-slate-900">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none flex items-center justify-center">
                    <Logo className="h-full w-full rotate-12 scale-150 grayscale" />
                </div>
                
                <header className="flex justify-between items-start mb-16 border-b-2 border-slate-900 pb-8 relative z-10">
                    <div className="flex items-center gap-4">
                        <Logo className="h-14 w-14" />
                        <div>
                            <h4 className="text-lg font-black italic uppercase tracking-tighter leading-none">{data.empresa}</h4>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">RIF: {data.rif}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <Badge variant="outline" className="border-slate-900 text-slate-900 text-[8px] font-black uppercase px-3 h-6 rounded-lg">OFICIAL</Badge>
                    </div>
                </header>

                <div className="whitespace-pre-wrap text-sm md:text-base text-justify leading-relaxed relative z-10 min-h-[400px]">
                    {currentContent}
                </div>

                <footer className="mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 no-print relative z-10">
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase text-slate-400 italic">
                        <Terminal className="h-4 w-4" /> SELLADO ELECTRÓNICO ACTIVO
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="h-10 rounded-xl border-slate-200 text-slate-600 text-[9px] font-black uppercase" onClick={() => window.print()}>
                            <Printer className="mr-2 h-3.5 w-3.5" /> IMPRIMIR
                        </Button>
                        <Button variant="outline" className="h-10 rounded-xl border-slate-200 text-slate-600 text-[9px] font-black uppercase" onClick={() => handleAction('descarga')}>
                            <Download className="mr-2 h-3.5 w-3.5" /> DESCARGAR PDF
                        </Button>
                    </div>
                </footer>
            </Card>
        </div>
      </div>
    </div>
  );
}

function User({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}
