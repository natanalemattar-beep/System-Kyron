
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CirclePlus as PlusCircle, Download, Eye, Gavel, ShieldCheck, Activity, Terminal, FileText, Printer, ArrowRight, CircleCheck as CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { initialPermisos } from "@/lib/permisos-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Logo } from "@/components/logo";
import { formatDate } from "@/lib/utils";

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Vigente: "default",
  "Por Vencer": "secondary",
  Vencido: "destructive",
  "En Renovación": "outline",
};

export default function PermisosPage() {
  const [permisos] = useState(initialPermisos);
  const { toast } = useToast();
  const [selectedPermiso, setSelectedPermiso] = useState<any>(null);

  const groupedPermisos = permisos.reduce((acc, permiso) => {
    const emisor = permiso.emisor;
    if (!acc[emisor]) acc[emisor] = [];
    acc[emisor].push(permiso);
    return acc;
  }, {} as Record<string, typeof initialPermisos>);

  const getLetterTemplate = (p: any) => {
    const fecha = new Date().toLocaleDateString('es-VE', { day: 'numeric', month: 'long', year: 'numeric' });
    return `
Caracas, ${fecha}

Ciudadanos
${p.emisor}
Presente.-

Asunto: Solicitud de trámite para ${p.tipo}

Yo, [Nombre del Representante], titular de la Cédula de Identidad N° [Cédula], actuando en mi carácter de Representante Legal de la empresa System Kyron, C.A., portadora del RIF J-12345678-9, me dirijo a ustedes con el debido respeto para solicitar formalmente el procesamiento del trámite referente a: "${p.tipo}".

Adjuntamos a esta comunicación los recaudos exigidos por su institución para la validación técnica correspondiente.

Sin más a que hacer referencia, queda de ustedes.

Atentamente,

_________________________
Firma Autorizada
System Kyron, C.A.
    `;
  };

  const handleDownload = (p: any) => {
    toast({
        title: "GENERANDO DOCUMENTO",
        description: `Carta para ${p.emisor} lista para descarga.`,
        action: <CheckCircle className="text-emerald-500 h-4 w-4" />
    });
  };

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                <ShieldCheck className="h-3 w-3" /> NODO REGISTRAL
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Gestión de <span className="text-primary italic">Permisología</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">Bóveda de Licencias y Habilitaciones • 2026</p>
        </div>
        <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
            <PlusCircle className="mr-3 h-4 w-4" /> NUEVA LICENCIA
        </Button>
      </header>

      <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
        <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Directorio de Entes y Habilitaciones</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">
                {Object.entries(groupedPermisos).map(([emisor, lista]) => (
                    <AccordionItem value={emisor} key={emisor} className="border-white/5">
                        <AccordionTrigger className="px-10 py-6 hover:bg-white/[0.02] transition-all">
                            <div className="flex justify-between items-center w-full pr-10">
                                <span className="font-black uppercase italic tracking-tighter text-white/80">{emisor}</span>
                                <Badge className="bg-white/5 border-white/10 text-[8px] font-black uppercase px-3">{lista.length} REGISTROS</Badge>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-0">
                            <Table>
                                <TableBody>
                                    {lista.map(p => (
                                        <TableRow key={p.id} className="border-none hover:bg-white/[0.01]">
                                            <TableCell className="pl-14 py-5 text-[10px] font-black text-primary italic uppercase">{p.id}</TableCell>
                                            <TableCell className="py-5 font-bold text-white/60 text-xs uppercase">{p.tipo}</TableCell>
                                            <TableCell className="py-5 text-center">
                                                <Badge variant={statusVariant[p.estado] || 'default'} className="text-[8px] font-black uppercase tracking-widest h-6 px-3">{p.estado}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right pr-10 py-5">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="h-10 px-4 rounded-xl hover:bg-primary/10 text-primary font-black uppercase text-[9px] tracking-widest" onClick={() => setSelectedPermiso(p)}>
                                                            <FileText className="mr-2 h-3.5 w-3.5" /> GENERAR CARTA
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-4xl rounded-[3rem] bg-card/95 backdrop-blur-3xl border-white/10 p-0 overflow-hidden">
                                                        <div className="p-8 border-b border-white/5 bg-primary/5">
                                                            <DialogHeader>
                                                                <DialogTitle className="text-xl font-black uppercase italic text-white">Generador de Comunicación Oficial</DialogTitle>
                                                                <DialogDescription className="text-[10px] font-bold uppercase text-primary/60">Destino: {p.emisor}</DialogDescription>
                                                            </DialogHeader>
                                                        </div>
                                                        <div className="p-10 bg-white m-8 rounded-[2rem] shadow-inner font-serif text-slate-900 relative overflow-hidden">
                                                            <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
                                                                <Logo className="h-64 w-64 grayscale rotate-12" />
                                                            </div>
                                                            <header className="flex justify-between items-center mb-10 border-b border-slate-200 pb-6 relative z-10">
                                                                <Logo className="h-12 w-12" />
                                                                <div className="text-right">
                                                                    <p className="font-black text-xs uppercase italic">System Kyron, C.A.</p>
                                                                    <p className="text-[8px] font-bold uppercase">RIF: J-12345678-9</p>
                                                                </div>
                                                            </header>
                                                            <div className="whitespace-pre-wrap text-sm leading-relaxed relative z-10 text-justify">
                                                                {getLetterTemplate(p)}
                                                            </div>
                                                        </div>
                                                        <DialogFooter className="p-8 border-t border-white/5 bg-white/[0.01]">
                                                            <Button variant="outline" className="rounded-xl h-12 px-6 border-white/10 text-white/40 font-black uppercase text-[9px]" onClick={() => window.print()}>
                                                                <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
                                                            </Button>
                                                            <Button className="rounded-xl h-12 px-8 btn-3d-primary font-black uppercase text-[9px]" onClick={() => handleDownload(p)}>
                                                                <Download className="mr-2 h-4 w-4" /> DESCARGAR WORD
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </CardContent>
        <CardFooter className="p-10 bg-primary/5 border-t border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40 italic">
                <Terminal className="h-4 w-4" /> Sincronización con Expediente Maestro v2.6.5
            </div>
            <Badge variant="outline" className="border-primary/20 text-primary text-[8px] font-black px-4 py-1.5 rounded-lg shadow-glow-sm uppercase tracking-widest">Protocolo Activo</Badge>
        </CardFooter>
      </Card>
    </div>
  );
}
