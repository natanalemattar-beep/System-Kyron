"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MailOpen, Printer, ChevronDown, Search, Info, ChevronRight, AlertTriangle, FileText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn, formatDate } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BackButton } from "@/components/back-button";

const institutions = [
    { id: "seniat", name: "SENIAT", address: "Servicio Nacional Integrado de Administración Aduanera y Tributaria (SENIAT)\nUnidad de Tributos Internos" },
    { id: "conatel", name: "CONATEL", address: "Comisión Nacional de Telecomunicaciones (CONATEL)\nGerencia de Habilitaciones" },
    { id: "saren", name: "SAREN", address: "Servicio Autónomo de Registros y Notarías (SAREN)\nRegistro Mercantil / Notaría Pública" },
    { id: "ivss", name: "IVSS", address: "Instituto Venezolano de los Seguros Sociales (IVSS)\nDirección de Afiliación" },
    { id: "inces", name: "INCES", address: "Instituto Nacional de Capacitación y Educación Socialista (INCES)\nGerencia Regional" },
    { id: "banavih", name: "BANAVIH", address: "Banco Nacional de Vivienda y Hábitat (BANAVIH)\nGerencia de Aportes" },
    { id: "inpsasel", name: "INPSASEL", address: "Instituto Nacional de Prevención, Salud y Seguridad Laborales (INPSASEL)\nDirección Regional" },
];

export default function ComunicacionesPage() {
    const { toast } = useToast();
    const [institucionId, setInstitucionId] = useState("seniat");
    const [searchQuery, setSearchQuery] = useState("");
    const [data, setData] = useState({
        empresa: "",
        rif: "",
        representante: "",
        cedula: "",
        motivo: "",
        fecha: new Date().toISOString().substring(0, 10),
    });

    useEffect(() => {
        fetch('/api/auth/me')
            .then(r => r.ok ? r.json() : null)
            .then(d => {
                if (d?.user) {
                    setData(prev => ({
                        ...prev,
                        representante: d.user.nombre || '',
                        cedula: d.user.cedula || '',
                        empresa: d.user.empresa || '',
                        rif: d.user.rif || '',
                    }));
                }
            })
            .catch(() => {});
    }, []);

    const filteredInstitutions = useMemo(() => {
        return institutions.filter(inst =>
            inst.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const selectedInst = useMemo(() => institutions.find(i => i.id === institucionId) || institutions[0], [institucionId]);

    const letterContent = useMemo(() => {
        const empresaText = data.empresa || '[Nombre de la Empresa]';
        const rifText = data.rif || '[RIF]';
        const repText = data.representante || '[Representante Legal]';
        const cedText = data.cedula || '[Cédula]';
        const motivoText = data.motivo || 'Comunicación de deberes formales y cumplimiento normativo.';

        return `Caracas, ${formatDate(data.fecha)}\n\nCiudadanos\n${selectedInst.address}\nPresente.-\n\nAsunto: Comunicación Institucional\n\nYo, ${repText}, titular de la Cédula de Identidad N° ${cedText}, actuando en mi carácter de Representante Legal de la empresa ${empresaText}, portadora del RIF ${rifText}, me dirijo a ustedes en la oportunidad de hacer de su conocimiento lo siguiente:\n\n${motivoText}\n\nSin más a que hacer referencia, quedo a la orden.\n\nAtentamente,\n\n\n\n________________________\n${repText}\nRepresentante Legal`;
    }, [data, selectedInst]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
            <header className="pt-8 space-y-4">
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-semibold uppercase tracking-wide text-primary mb-3">
                        <MailOpen className="h-3.5 w-3.5" /> Comunicaciones
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Centro de <span className="text-primary">Comunicaciones</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Generador de cartas institucionales para entes gubernamentales.</p>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-5 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <FileText className="h-4 w-4 text-primary" />
                                Configuración
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-muted-foreground">Institución Destino</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full h-11 rounded-xl justify-between px-4 text-xs font-bold">
                                            {selectedInst.name}
                                            <ChevronDown className="h-4 w-4 opacity-40" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[300px] p-0 rounded-xl overflow-hidden">
                                        <div className="p-3 border-b">
                                            <div className="relative">
                                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
                                                <Input placeholder="Buscar..." className="h-8 pl-7 text-xs rounded-lg" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                                            </div>
                                        </div>
                                        <ScrollArea className="h-[200px]">
                                            <div className="p-2">
                                                {filteredInstitutions.map(inst => (
                                                    <button key={inst.id} onClick={() => { setInstitucionId(inst.id); setSearchQuery(""); }} className={cn("w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all", institucionId === inst.id ? "bg-primary text-white" : "hover:bg-muted/50")}>
                                                        {inst.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-muted-foreground">Empresa</Label>
                                    <Input value={data.empresa} onChange={e => setData(d => ({ ...d, empresa: e.target.value }))} placeholder="Nombre de la empresa" className="h-10 rounded-xl text-xs" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-muted-foreground">RIF</Label>
                                    <Input value={data.rif} onChange={e => setData(d => ({ ...d, rif: e.target.value }))} placeholder="J-00000000-0" className="h-10 rounded-xl text-xs" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-muted-foreground">Representante Legal</Label>
                                    <Input value={data.representante} onChange={e => setData(d => ({ ...d, representante: e.target.value }))} placeholder="Nombre completo" className="h-10 rounded-xl text-xs" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-muted-foreground">Cédula</Label>
                                    <Input value={data.cedula} onChange={e => setData(d => ({ ...d, cedula: e.target.value }))} placeholder="V-00.000.000" className="h-10 rounded-xl text-xs" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-muted-foreground">Fecha</Label>
                                <Input type="date" value={data.fecha} onChange={e => setData(d => ({ ...d, fecha: e.target.value }))} className="h-10 rounded-xl text-xs" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-muted-foreground">Motivo / Contenido</Label>
                                <Textarea value={data.motivo} onChange={e => setData(d => ({ ...d, motivo: e.target.value }))} placeholder="Describa el motivo de la comunicación..." className="rounded-xl text-xs min-h-[100px]" />
                            </div>

                            <Button onClick={handlePrint} variant="outline" className="w-full h-11 rounded-xl text-xs font-bold">
                                <Printer className="mr-2 h-4 w-4" />
                                Imprimir Carta
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-7 space-y-6">
                    <Card className="rounded-2xl shadow-lg border bg-white dark:bg-card min-h-[600px]">
                        <CardContent className="p-10 md:p-14">
                            <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground font-serif">
                                {letterContent}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Aviso</p>
                                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                                    Este generador crea borradores de comunicaciones institucionales. El documento final debe ser revisado, firmado y presentado según los requisitos de cada institución.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
