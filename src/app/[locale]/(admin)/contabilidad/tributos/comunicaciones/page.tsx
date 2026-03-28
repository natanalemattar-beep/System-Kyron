
"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Printer, CircleCheck as CheckCircle, MailOpen, Terminal, ArrowLeft, Search, ChevronDown, User, Lock, ShieldCheck, X, Activity, Smartphone, Recycle, Gavel, Globe, Zap } from "lucide-react";
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
    { id: "sapi", name: "SAPI", address: "Servicio Autónomo de la Propiedad Intelectual (SAPI)\nDirección de Marcas y Patentes" },
    { id: "conatel", name: "CONATEL", address: "Comisión Nacional de Telecomunicaciones (CONATEL)\nGerencia de Habilitaciones" },
    { id: "ameru", name: "AMERU IA", address: "Ameru IA - Gestión Ambiental\nFundación Kyron para la Sostenibilidad" },
    { id: "telecom_ops", name: "OPERADORAS TELECOM", address: "Gerencia de Interconexión\nOperadoras de Telefonía (Movistar / Digitel / Movilnet)" },
    { id: "saren", name: "SAREN", address: "Servicio Autónomo de Registros y Notarías (SAREN)\nRegistro Mercantil / Notaría Pública" },
    { id: "minec", name: "MINEC", address: "Ministerio del Poder Popular para el Ecosocialismo (MINEC)\nDirección de Gestión de Residuos" },
    { id: "ivss", name: "IVSS", address: "Instituto Venezolano de los Seguros Sociales (IVSS)\nDirección de Afiliación" },
];

export default function ComunicacionesPage() {
    const { toast } = useToast();
    const [institucionId, setInstitucionId] = useState("seniat");
    const [tipoCarta, setTipoCarta] = useState("solicitud");
    const [searchQuery, setSearchQuery] = useState("");
    const [isSigned, setIsSigned] = useState(false);
    const [data, setData] = useState({
        empresa: "System Kyron, C.A.",
        rif: "J-50328471-6",
        representante: "Carlos Mattar",
        cedula: "V-32.855.496",
        periodo: "Marzo 2026",
        motivo: "Requerimiento de servicios y cumplimiento normativo.",
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

    const getLetterContent = () => {
        const header = `Caracas, ${formatDate(data.fecha)}\n\nCiudadanos\n${selectedInst.address}\nPresente.-\n\n`;
        
        if (institucionId === 'ameru') {
            return header + `Asunto: Solicitud de Despliegue de Nodos Ameru IA\n\nPor la presente, actuando en nombre de ${data.empresa}, me dirijo a ustedes para formalizar nuestra solicitud de despliegue de los sistemas de reciclaje inteligente Ameru IA en nuestras instalaciones comerciales. Buscamos integrar la tecnología de inducción magnética para la trazabilidad de nuestros activos verdes y la acumulación de Eco-Créditos.\n\nAgradecemos la asignación de un técnico para la evaluación de campo.\n\nAtentamente,\n\n\n\n`;
        }

        if (institucionId === 'telecom_ops') {
            return header + `Asunto: Solicitud de Convenio de Conectividad 5G y eSIM\n\nCumplo con el deber de solicitar formalmente el acceso al protocolo de aprovisionamiento masivo de perfiles eSIM para nuestra flota corporativa. Nuestra meta es garantizar la latencia cero en nuestras operaciones fiscales mediante el estándar 5G gestionado por el ecosistema Kyron.\n\nSin más a que hacer referencia.\n\nAtentamente,\n\n\n\n`;
        }

        if (institucionId === 'sapi') {
            return header + `Asunto: Solicitud de Registro de Propiedad Industrial\n\nAcudo ante su autoridad para iniciar el trámite de registro referente a la marca/patente: "SYSTEM KYRON / AMERU IA". Adjuntamos la memoria descriptiva técnica y los pliegos de reivindicaciones correspondientes para su evaluación técnica.\n\nAtentamente,\n\n\n\n`;
        }

        if (institucionId === 'conatel') {
            return header + `Asunto: Solicitud de Habilitación / Permiso de Red\n\nEn cumplimiento con la Ley Orgánica de Telecomunicaciones, solicitamos la actualización de nuestra habilitación general para la prestación de servicios digitales avanzados. Anexamos el proyecto técnico de red y las garantías de fiel cumplimiento.\n\nAtentamente,\n\n\n\n`;
        }

        return header + `Asunto: Comunicación de Deberes Formales\n\nYo, ${data.representante}, titular de la Cédula de Identidad N° ${data.cedula}, actuando en mi carácter de Representante Legal de la empresa ${data.empresa}, portadora del RIF ${data.rif}, me dirijo a ustedes en la oportunidad de hacer de su conocimiento el cumplimiento de nuestras obligaciones referentes al periodo: ${data.periodo}.\n\nEsta notificación se realiza en cumplimiento de los estándares de transparencia del sistema.\n\nAtentamente,\n\n\n\n`;
    };

    const handleAction = (action: string) => {
        if (action === 'registro') {
            setIsSigned(true);
            toast({
                title: "PROTOCOLO DE FIRMA ACTIVADO",
                description: "Documento sellado y registrado en el Ledger Kyron.",
                action: <CheckCircle className="text-primary h-4 w-4" />
            });
            return;
        }
        if (action === 'impresion') {
            window.print();
        }
    };

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                <MailOpen className="h-3 w-3" /> NODO DE CORRESPONDENCIA
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Centro de <span className="text-primary italic">Comunicaciones</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Notificaciones Estratégicas • Despacho v2.6</p>
        </div>
        <Button variant="ghost" asChild className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary">
            <Link href="/contabilidad/tributos"><ArrowLeft className="mr-2 h-4 w-4" /> VOLVER</Link>
        </Button>
      </header>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5 space-y-8">
            <Card className="glass-card border-none rounded-[3rem] bg-card/40 p-10 shadow-2xl">
                <CardHeader className="p-0 mb-8">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Configuración de Solicitud</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-6">
                    
                    <div className="space-y-3">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Institución / Empresa Destino</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full h-12 rounded-xl bg-white/5 border-border justify-between px-4 text-xs font-bold uppercase">
                                    {selectedInst.name}
                                    <ChevronDown className="h-4 w-4 opacity-40" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-0 bg-card border-border rounded-2xl overflow-hidden shadow-2xl">
                                <div className="p-3 border-b border-border bg-muted/30">
                                    <div className="relative">
                                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                                        <Input 
                                            placeholder="Buscar ente..." 
                                            className="h-8 pl-7 text-[10px] bg-background border-border rounded-lg font-bold uppercase tracking-widest"
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
                                                    institucionId === inst.id ? "bg-primary text-white shadow-glow-sm" : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
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

                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-xl shadow-inner border border-primary/20">
                                <User className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase text-primary mb-1">Representante</p>
                                <p className="text-xs font-black uppercase italic text-foreground leading-none">{data.representante}</p>
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
                            <h4 className="text-lg font-black italic uppercase tracking-tighter leading-none text-slate-900">{data.empresa}</h4>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">RIF: {data.rif}</p>
                        </div>
                    </div>
                    <Badge variant="outline" className="border-slate-900 text-slate-900 text-[8px] font-black uppercase px-3 h-6 rounded-lg">EXPEDIENTE MAESTRO</Badge>
                </header>

                <div className="whitespace-pre-wrap text-base md:text-lg text-justify leading-relaxed relative z-10 flex-grow text-slate-800">
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
                                <p className="font-black text-xs uppercase tracking-tight text-slate-900">{data.representante}</p>
                                <p className="text-[9px] uppercase font-bold opacity-40">Representante Legal</p>
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-right"
                            >
                                <div className="p-2 border-2 border-slate-900 rounded-2xl bg-white shadow-inner inline-block">
                                    <Image 
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=KYRON-STRAT-ID-${data.rif}-${data.fecha}&bgcolor=ffffff&color=000000&margin=1`} 
                                        alt="QR Verificacion" 
                                        width={90} 
                                        height={90} 
                                        className="grayscale"
                                    />
                                </div>
                                <p className="text-[7px] font-black uppercase mt-3 opacity-40 tracking-[0.3em] text-slate-900">Integridad Digital Sellada</p>
                            </motion.div>
                        </>
                    ) : (
                        <div className="w-full flex flex-col items-center">
                            <div className="w-64 h-[1px] bg-slate-900 mb-4" />
                            <p className="font-black text-xs uppercase tracking-tight text-slate-900">{data.representante}</p>
                            <p className="text-[9px] uppercase font-bold opacity-40 italic">Firma en Físico Requerida</p>
                        </div>
                    )}
                </div>

                <footer className="mt-20 pt-8 border-t border-slate-100 flex justify-between items-center gap-8 no-print relative z-10">
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase text-slate-400 italic">
                        <Terminal className="h-4 w-4" /> TRANSMISIÓN AUTORIZADA KYRON
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="h-10 rounded-xl border-slate-200 text-slate-600 text-[9px] font-black uppercase tracking-widest" onClick={() => handleAction('impresion')}>
                            <Printer className="mr-2 h-3.5 w-3.5" /> IMPRIMIR
                        </Button>
                        <Button variant="outline" className="h-10 rounded-xl border-slate-200 text-slate-600 text-[9px] font-black uppercase tracking-widest">
                            <Download className="mr-2 h-3.5 w-3.5" /> BAJAR .DOC
                        </Button>
                    </div>
                </footer>
            </Card>
        </div>
      </div>
    </div>
  );
}
