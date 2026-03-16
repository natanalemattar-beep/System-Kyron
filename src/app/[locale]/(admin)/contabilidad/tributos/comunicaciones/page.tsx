
"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    FileText, 
    Download, 
    Printer, 
    CheckCircle, 
    MailOpen, 
    Terminal, 
    ArrowLeft, 
    Search, 
    ChevronDown,
    User,
    Lock,
    ShieldCheck,
    X,
    Activity
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn, formatDate, formatCurrency } from "@/lib/utils";
import { Link } from "@/navigation";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const institutions = [
    { id: "seniat", name: "SENIAT", address: "Servicio Nacional Integrado de Administración Aduanera y Tributaria (SENIAT)\nUnidad de Tributos Internos" },
    { id: "saren", name: "SAREN", address: "Servicio Autónomo de Registros y Notarías (SAREN)\nRegistro Mercantil / Notaría Pública" },
    { id: "sapi", name: "SAPI", address: "Servicio Autónomo de la Propiedad Intelectual (SAPI)\nDirección de Marcas y Patentes" },
    { id: "minec", name: "MINEC", address: "Ministerio del Poder Popular para el Ecosocialismo (MINEC)\nDirección de Gestión de Residuos" },
    { id: "intt", name: "INTT", address: "Instituto Nacional de Transporte Terrestre (INTT)\nDirección de Carga" },
    { id: "mintur", name: "MINTUR", address: "Ministerio del Poder Popular para el Turismo (MINTUR)\nRegistro Turístico Nacional" },
    { id: "ivss", name: "IVSS", address: "Instituto Venezolano de los Seguros Sociales (IVSS)\nDirección de Afiliación y Prestaciones" },
    { id: "banavih", name: "BANAVIH", address: "Banco Nacional de Vivienda y Hábitat (BANAVIH)\nGerencia de Fiscalización (FAOV)" },
    { id: "inces", name: "INCES", address: "Instituto Nacional de Capacitación y Educación Socialista (INCES)\nUnidad de Tributos" },
    { id: "inpsasel", name: "INPSASEL", address: "Instituto Nacional de Prevención, Salud y Seguridad Laborales (INPSASEL)\nGerencia de Salud de los Trabajadores" },
    { id: "min_trabajo", name: "MIN. TRABAJO", address: "Ministerio del Poder Popular para el Proceso Social de Trabajo\nInspectoría del Trabajo" },
    { id: "sudeban", name: "SUDEBAN", address: "Superintendencia de las Instituciones del Sector Bancario (SUDEBAN)\nUnidad de Inteligencia Financiera" },
    { id: "sunavi", name: "SUNAVI", address: "Superintendencia Nacional de Arrendamiento de Vivienda (SUNAVI)\nDirección de Registro" },
    { id: "sunacrip", name: "SUNACRIP", address: "Superintendencia Nacional de Criptoactivos y Actividades Conexas (SUNACRIP)\nDirección de Fiscalización" },
    { id: "alcaldia", name: "ALCALDÍA MUNICIPAL", address: "Alcaldía Municipal\nDirección de Hacienda y Tributos" },
    { id: "gobernacion", name: "GOBERNACIÓN", address: "Gobernación Estadal\nDirección de Administración y Finanzas" },
    { id: "fona", name: "FONA", address: "Fondo Nacional Antidrogas (FONA)\nUnidad de Recaudación" },
    { id: "fonacit", name: "FONACIT", address: "Fondo Nacional de Ciencia, Tecnología e Innovación (FONACIT)\nUnidad de LOCTI" },
    { id: "comex", name: "MIN. COMERCIO EXT.", address: "Ministerio del Poder Popular de Comercio Exterior e Inversión Internacional\nDirección de Exportaciones" },
    { id: "industria", name: "MIN. INDUSTRIAS", address: "Ministerio del Poder Popular de Industrias y Producción Nacional\nRegistro Industrial" },
];

export default function ComunicacionesPage() {
    const { toast } = useToast();
    const [institucionId, setInstitucionId] = useState("seniat");
    const [tipoCarta, setTipoCarta] = useState("inactividad");
    const [searchQuery, setSearchQuery] = useState("");
    const [isSigned, setIsSigned] = useState(false);
    const [data, setData] = useState({
        empresa: "System Kyron, C.A.",
        rif: "J-12345678-9",
        representante: "Carlos Mattar",
        cedula: "V-32.855.496",
        periodo: "Marzo 2026",
        motivo: "Reestructuración operativa interna.",
        fecha: new Date().toISOString().substring(0, 10),
    });

    useEffect(() => {
        setIsSigned(false);
    }, [institucionId, tipoCarta, data]);

    const filteredInstitutions = useMemo(() => {
        return institutions.filter(inst => 
            inst.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const selectedInst = useMemo(() => institutions.find(i => i.id === institucionId) || institutions[0], [institucionId]);

    const handleAction = (action: string) => {
        if (action === 'registro') {
            setIsSigned(true);
            toast({
                title: "PROTOCOLO DE FIRMA COMPLETADO",
                description: "Documento sellado y registrado en el Ledger Kyron.",
                action: <CheckCircle className="text-primary h-4 w-4" />
            });
            return;
        }
        if (action === 'descarga') {
            handleDownloadWord();
            return;
        }
        if (action === 'impresion') {
            window.print();
        }
    };

    const getLetterContent = () => {
        const header = `Caracas, ${formatDate(data.fecha)}\n\nCiudadanos\n${selectedInst.address}\nPresente.-\n\n`;
        
        if (tipoCarta === 'inactividad') {
            return header + `Asunto: Comunicación de Inactividad Comercial\n\nYo, ${data.representante}, titular de la Cédula de Identidad N° ${data.cedula}, actuando en mi carácter de Representante Legal de la empresa ${data.empresa}, portadora del RIF ${data.rif}, me dirijo a ustedes en la oportunidad de hacer de su conocimiento que mi representada NO PRESENTÓ ACTIVIDAD COMERCIAL durante el periodo comprendido: ${data.periodo}.\n\nEsta notificación se realiza en cumplimiento de los deberes formales para mantener actualizado el expediente administrativo de la entidad ante esta institución.\n\nSin más a que hacer referencia.\n\nAtentamente,\n\n\n\n`;
        }

        return header + `Asunto: Notificación de Cierre de Actividades\n\nYo, ${data.representante}, titular de la Cédula de Identidad N° ${data.cedula}, actuando en mi carácter de Representante Legal de la empresa ${data.empresa}, portadora del RIF ${data.rif}, cumplo con el deber formal de notificar ante este órgano el CIERRE ${tipoCarta === 'cierre_definitivo' ? 'DEFINITIVO' : 'TEMPORAL'} de nuestras actividades económicas a partir de la fecha: ${formatDate(data.fecha)}.\n\nMotivo: ${data.motivo}\n\nSolicito se realicen las anotaciones correspondientes en el expediente de mi representada.\n\nAtentamente,\n\n\n\n`;
    };

    const handleDownloadWord = () => {
        const letterBody = getLetterContent();
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=KYRON-VALID-ID-${data.rif}-${data.fecha}&bgcolor=ffffff&color=000000&margin=1`;
        const signatureImg = "https://picsum.photos/seed/signature-kyron/200/100";

        const docHtml = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head>
                <meta charset='utf-8'>
                <title>Comunicación Oficial - System Kyron</title>
                <style>
                    @page { size: 8.5in 11in; margin: 1in; }
                    body { font-family: 'Times New Roman', Times, serif; color: #0f172a; line-height: 1.5; padding: 0; }
                    .header-table { width: 100%; border-bottom: 2pt solid #000000; margin-bottom: 30pt; padding-bottom: 10pt; }
                    .company-name { font-size: 14pt; font-weight: bold; text-transform: uppercase; margin: 0; }
                    .company-rif { font-size: 10pt; color: #64748b; margin: 0; }
                    .letter-body { text-align: justify; font-size: 12pt; white-space: pre-wrap; margin-bottom: 40pt; }
                    .footer-table { width: 100%; margin-top: 50pt; }
                    .signature-line { border-top: 1pt solid #000000; width: 200pt; margin-top: 10pt; padding-top: 5pt; text-align: center; }
                    .signature-img { width: 120pt; height: 60pt; margin-bottom: -10pt; }
                    .qr-container { text-align: right; }
                    .qr-img { width: 80pt; height: 80pt; border: 1pt solid #e2e8f0; padding: 2pt; }
                </style>
            </head>
            <body>
                <table class="header-table">
                    <tr>
                        <td style="width: 60pt; vertical-align: middle;">
                            <div style="width: 40pt; height: 40pt; background-color: #000; border-radius: 8pt;"></div>
                        </td>
                        <td style="vertical-align: middle;">
                            <p class="company-name">${data.empresa}</p>
                            <p class="company-rif">RIF: ${data.rif}</p>
                        </td>
                        <td style="text-align: right; vertical-align: top;">
                            <span style="font-size: 8pt; font-weight: bold; border: 1pt solid #000; padding: 2pt 8pt; border-radius: 4pt;">OFICIAL</span>
                        </td>
                    </tr>
                </table>

                <div class="letter-body">${letterBody.replace(/\n/g, '<br/>')}</div>

                <table class="footer-table">
                    <tr>
                        <td style="vertical-align: bottom; width: 60%;">
                            <div style="text-align: center; width: 200pt;">
                                ${isSigned ? `<img src="${signatureImg}" class="signature-img" />` : `<div style="height: 60pt;"></div>`}
                                <div class="signature-line">
                                    <p style="margin: 0; font-weight: bold; font-size: 10pt;">${data.representante}</p>
                                    <p style="margin: 0; font-size: 8pt; color: #64748b;">C.I: ${data.cedula}</p>
                                    <p style="margin: 0; font-size: 8pt; color: #64748b;">${isSigned ? 'Representante Legal' : 'Firma en Físico'}</p>
                                </div>
                            </div>
                        </td>
                        <td class="qr-container" style="vertical-align: bottom;">
                            ${isSigned ? `<img src="${qrUrl}" class="qr-img" />` : ''}
                            <p style="font-size: 6pt; color: #94a3b8; margin-top: 5pt; text-transform: uppercase;">${isSigned ? 'Integridad Digital Sellada' : ''}</p>
                        </td>
                    </tr>
                </table>

                <div style="margin-top: 100pt; border-top: 1pt solid #e2e8f0; padding-top: 10pt; text-align: center;">
                    <p style="font-size: 8pt; color: #94a3b8; text-transform: uppercase; letter-spacing: 2pt;">System Kyron v2.6.5 • Transmisión Autorizada</p>
                </div>
            </body>
            </html>
        `;

        const blob = new Blob(['\ufeff', docHtml], { type: 'application/vnd.ms-word' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Comunicacion_${selectedInst.name}_${tipoCarta}_Kyron.doc`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({ title: "DESCARGA COMPLETADA", description: "El documento Word ha sido generado con éxito." });
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
            <Link href="/contabilidad/tributos"><ArrowLeft className="mr-2 h-4 w-4" /> VOLVER</Link>
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
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full h-12 rounded-xl bg-white/5 border-border justify-between px-4 text-xs font-bold uppercase">
                                    {selectedInst.name}
                                    <ChevronDown className="h-4 w-4 opacity-40" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0 bg-black/95 border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
                                <div className="p-3 border-b border-white/5 bg-white/5">
                                    <div className="relative">
                                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-white/40" />
                                        <Input 
                                            placeholder="Buscar ente..." 
                                            className="h-8 pl-7 text-[10px] bg-black/40 border-white/10 rounded-lg text-white font-bold uppercase tracking-widest"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <ScrollArea className="h-[250px]">
                                    <div className="p-2">
                                        {filteredInstitutions.map((inst) => (
                                            <button
                                                key={inst.id}
                                                onClick={() => { setInstitucionId(inst.id); setSearchQuery(""); }}
                                                className={cn(
                                                    "w-full text-left px-4 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                                                    institucionId === inst.id ? "bg-primary text-white" : "text-white/40 hover:bg-white/5 hover:text-white"
                                                )}
                                            >
                                                {inst.name}
                                            </button>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Tipo de Comunicación</Label>
                        <Select value={tipoCarta} onValueChange={setTipoCarta}>
                            <SelectTrigger className="h-12 rounded-xl bg-white/5 border-border font-bold uppercase text-xs">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl bg-black border-white/10">
                                <SelectItem value="inactividad" className="uppercase text-[10px] font-black">Carta de Inactividad</SelectItem>
                                <SelectItem value="cierre_temporal" className="uppercase text-[10px] font-black">Cierre Temporal</SelectItem>
                                <SelectItem value="cierre_definitivo" className="uppercase text-[10px] font-black">Cierre Definitivo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Referencia Temporal</Label>
                        <Input 
                            value={tipoCarta === 'inactividad' ? data.periodo : data.fecha} 
                            onChange={e => setData({...data, [tipoCarta === 'inactividad' ? 'periodo' : 'fecha']: e.target.value})} 
                            className="h-12 rounded-xl bg-white/5 border-border font-bold text-white text-xs"
                        />
                    </div>

                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-xl shadow-inner border border-primary/20">
                                <User className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase text-primary mb-1">Representante</p>
                                <p className="text-xs font-black uppercase italic text-white leading-none">{data.representante}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="p-0 pt-10">
                    <Button 
                        className={cn(
                            "w-full h-14 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl transition-all duration-500",
                            isSigned ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "btn-3d-primary"
                        )} 
                        onClick={() => handleAction('registro')}
                    >
                        {isSigned ? (
                            <span className="flex items-center gap-3"><ShieldCheck className="h-5 w-5" /> DOCUMENTO SELLADO</span>
                        ) : (
                            <span className="flex items-center gap-3"><CheckCircle className="h-5 w-5" /> SELLAR Y REGISTRAR</span>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>

        <div className="lg:col-span-7">
            <Card className="border-none rounded-[3.5rem] bg-white p-12 md:p-20 shadow-2xl relative overflow-hidden font-serif text-slate-900 min-h-[850px] flex flex-col">
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
                    <Badge variant="outline" className="border-slate-900 text-slate-900 text-[8px] font-black uppercase px-3 h-6 rounded-lg">OFICIAL</Badge>
                </header>

                <div className="whitespace-pre-wrap text-base md:text-lg text-justify leading-relaxed relative z-10 flex-grow">
                    {getLetterContent()}
                </div>

                <div className="mt-10 pt-10 flex justify-between items-end relative z-10 min-h-[180px]">
                    {isSigned ? (
                        <>
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center"
                            >
                                <div className="relative mb-4">
                                    <Image 
                                        src="https://picsum.photos/seed/signature-kyron/200/100" 
                                        alt="Firma" 
                                        width={160} 
                                        height={80} 
                                        className="mix-blend-multiply opacity-90 brightness-90 contrast-125"
                                    />
                                    <div className="absolute -top-6 -right-10 w-28 h-28 border-4 border-primary/20 rounded-full flex items-center justify-center rotate-12 pointer-events-none bg-primary/5 backdrop-blur-[1px]">
                                        <div className="text-center p-2">
                                            <Logo className="h-10 w-10 opacity-40 grayscale mb-1" />
                                            <p className="text-[6px] font-black uppercase text-primary/40 leading-none">VALIDADO<br/>KYRON 2026</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-56 h-[1.5px] bg-slate-900 mb-2" />
                                <p className="font-black text-xs uppercase tracking-tight">{data.representante}</p>
                                <p className="text-[9px] uppercase font-bold opacity-40">C.I: {data.cedula}</p>
                                <p className="text-[9px] uppercase font-bold opacity-40">Representante Legal</p>
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-right"
                            >
                                <div className="p-2 border-2 border-slate-100 rounded-2xl bg-white shadow-inner inline-block">
                                    <Image 
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=KYRON-VALID-ID-${data.rif}-${data.fecha}&bgcolor=ffffff&color=000000&margin=1`} 
                                        alt="QR Verificacion" 
                                        width={90} 
                                        height={90} 
                                        className="grayscale"
                                    />
                                </div>
                                <p className="text-[7px] font-black uppercase mt-3 opacity-20 tracking-[0.3em]">Integridad Digital Sellada</p>
                            </motion.div>
                        </>
                    ) : (
                        <div className="w-full flex flex-col items-center">
                            <div className="w-64 h-[1px] bg-slate-900 mb-4" />
                            <p className="font-black text-xs uppercase tracking-tight text-slate-900">{data.representante}</p>
                            <p className="text-[9px] uppercase font-bold opacity-40">C.I: {data.cedula}</p>
                            <p className="text-[9px] uppercase font-bold opacity-40 italic">Firma en Físico</p>
                        </div>
                    )}
                </div>

                <footer className="mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 no-print relative z-10">
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase text-slate-400 italic">
                        <Terminal className="h-4 w-4" /> TRANSMISIÓN AUTORIZADA KYRON
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="h-10 rounded-xl border-slate-200 text-slate-600 text-[9px] font-black uppercase tracking-widest" onClick={() => handleAction('impresion')}>
                            <Printer className="mr-2 h-3.5 w-3.5" /> IMPRIMIR
                        </Button>
                        <Button variant="outline" className="h-10 rounded-xl border-slate-200 text-slate-600 text-[9px] font-black uppercase tracking-widest" onClick={() => handleAction('descarga')}>
                            <Download className="mr-2 h-3.5 w-3.5" /> BAJAR WORD (.DOC)
                        </Button>
                    </div>
                </footer>
            </Card>
        </div>
      </div>
    </div>
  );
}
