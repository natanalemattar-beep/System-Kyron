
"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Printer, CheckCircle, MailOpen, Activity, Terminal, ArrowLeft, Send, Landmark, Building2, Gavel, Radio, Recycle, Zap } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import { Link } from "@/navigation";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";

const institutions = [
    { id: "seniat", name: "SENIAT", address: "Servicio Nacional Integrado de Administración Aduanera y Tributaria (SENIAT)\nUnidad de Tributos Internos" },
    { id: "saren", name: "SAREN", address: "Servicio Autónomo de Registros y Notarías (SAREN)\nRegistro Mercantil / Notaría Pública" },
    { id: "sapi", name: "SAPI", address: "Servicio Autónomo de la Propiedad Intelectual (SAPI)\nDirección de Marcas y Patentes" },
    { id: "minec", name: "MINEC", address: "Ministerio del Poder Popular para el Ecosocialismo (MINEC)\nDirección de Gestión de Residuos" },
    { id: "intt", name: "INTT", address: "Instituto Nacional de Transporte Terrestre (INTT)\nDirección de Carga" },
    { id: "mintur", name: "MINTUR", address: "Ministerio del Poder Popular para el Turismo (MINTUR)\nRegistro Turístico Nacional" },
];

export default function ComunicacionesSeniatPage() {
    const { toast } = useToast();
    const [institucionId, setInstitucionId] = useState("seniat");
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

    const selectedInst = useMemo(() => institutions.find(i => i.id === institucionId) || institutions[0], [institucionId]);

    const handleAction = (action: string) => {
        if (action === 'descarga') {
            handleDownloadWord();
            return;
        }
        toast({
            title: `PROTOCOLO ${action.toUpperCase()} ACTIVADO`,
            description: "Comunicación procesada bajo cifrado legal.",
            action: <CheckCircle className="text-primary h-4 w-4" />
        });
    };

    const getLetterContent = () => {
        const header = `Caracas, ${formatDate(data.fecha)}\n\nCiudadanos\n${selectedInst.address}\nPresente.-\n\n`;
        
        if (tipoCarta === 'inactividad') {
            return header + `Asunto: Comunicación de Inactividad Comercial\n\nYo, ${data.representante}, titular de la Cédula de Identidad N° ${data.cedula}, actuando en mi carácter de Representante Legal de la empresa ${data.empresa}, portadora del RIF ${data.rif}, me dirijo a ustedes en la oportunidad de hacer de su conocimiento que mi representada NO PRESENTÓ ACTIVIDAD COMERCIAL (Ventas ni Compras) durante el periodo comprendido: ${data.periodo}.\n\nEsta notificación se realiza en cumplimiento de los deberes formales para mantener actualizado el expediente administrativo de la entidad ante esta institución.\n\nSin más a que hacer referencia, queda de ustedes.\n\nAtentamente,\n\n_________________________\n${data.representante}\nC.I: ${data.cedula}\nRepresentante Legal`;
        }

        return header + `Asunto: Notificación de Cierre de Actividades\n\nYo, ${data.representante}, titular de la Cédula de Identidad N° ${data.cedula}, actuando en mi carácter de Representante Legal de la empresa ${data.empresa}, portadora del RIF ${data.rif}, cumplo con el deber formal de notificar ante este órgano el CIERRE ${tipoCarta === 'cierre_definitivo' ? 'DEFINITIVO' : 'TEMPORAL'} de nuestras actividades económicas a partir de la fecha: ${formatDate(data.fecha)}.\n\nMotivo del cierre: ${data.motivo}\n\nSolicito se realicen las anotaciones correspondientes en el expediente de mi representada, de conformidad con lo establecido en las leyes vigentes de la República.\n\nAtentamente,\n\n_________________________\n${data.representante}\nC.I: ${data.cedula}\nRepresentante Legal`;
    };

    const handleDownloadWord = () => {
        const content = getLetterContent();
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>Comunicación Oficial</title><style>body { font-family: 'Times New Roman', serif; padding: 20pt; }</style></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + `<div style="text-align: justify; line-height: 1.5;">${content.replace(/\n/g, '<br/>')}</div>` + footer;

        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = `Comunicacion_${selectedInst.name}_${data.empresa.replace(/\s+/g, '_')}.doc`;
        fileDownload.click();
        document.body.removeChild(fileDownload);

        toast({
            title: "DESCARGA INICIADA",
            description: "El documento ha sido exportado en formato Word.",
            action: <CheckCircle className="text-emerald-500 h-4 w-4" />
        });
    };

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                <MailOpen className="h-3 w-3" /> NODO DE CORRESPONDENCIA
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow text-white">Centro de <span className="text-primary italic">Comunicaciones</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Notificaciones Institucionales • Protocolo de Despacho 2026</p>
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
                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Institución Destino</Label>
                        <Select value={institucionId} onValueChange={setInstitucionId}>
                            <SelectTrigger className="h-12 rounded-xl bg-white/5 border-border font-bold uppercase">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                {institutions.map(inst => (
                                    <SelectItem key={inst.id} value={inst.id} className="uppercase text-xs font-bold">{inst.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Tipo de Comunicación</Label>
                        <Select value={tipoCarta} onValueChange={setTipoCarta}>
                            <SelectTrigger className="h-12 rounded-xl bg-white/5 border-border font-bold uppercase">
                                <SelectValue />
                            </SelectTrigger>
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
                            className="h-12 rounded-xl bg-white/5 border-border font-bold text-white"
                        />
                    </div>

                    {(tipoCarta === 'cierre_temporal' || tipoCarta === 'cierre_definitivo') && (
                        <div className="space-y-3 animate-in fade-in">
                            <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Motivo del Cierre</Label>
                            <Textarea 
                                value={data.motivo} 
                                onChange={e => setData({...data, motivo: e.target.value})}
                                className="bg-white/5 border-border rounded-xl p-4 text-xs font-bold uppercase text-white"
                            />
                        </div>
                    )}

                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                        <p className="text-[8px] font-black text-primary uppercase tracking-widest mb-4">Firmante Autorizado</p>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-xl shadow-inner border border-primary/20">
                                <UserIcon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase italic text-white">{data.representante}</p>
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
            <Card className="border-none rounded-[3.5rem] bg-white p-12 md:p-20 shadow-2xl relative overflow-hidden font-serif text-slate-900 min-h-[800px] flex flex-col">
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

                <div className="whitespace-pre-wrap text-sm md:text-base text-justify leading-relaxed relative z-10 flex-grow">
                    {getLetterContent()}
                </div>

                <footer className="mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 no-print relative z-10">
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase text-slate-400 italic">
                        <Terminal className="h-4 w-4" /> SELLADO ELECTRÓNICO ACTIVO
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="h-10 rounded-xl border-slate-200 text-slate-600 text-[9px] font-black uppercase tracking-widest" onClick={() => window.print()}>
                            <Printer className="mr-2 h-3.5 w-3.5" /> IMPRIMIR
                        </Button>
                        <Button variant="outline" className="h-10 rounded-xl border-slate-200 text-slate-600 text-[9px] font-black uppercase tracking-widest" onClick={() => handleAction('descarga')}>
                            <Download className="mr-2 h-3.5 w-3.5" /> DESCARGAR .DOC
                        </Button>
                    </div>
                </footer>
            </Card>
        </div>
      </div>
    </div>
  );
}

function UserIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}
