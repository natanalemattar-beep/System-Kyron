
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Wand as Wand2, Loader as Loader2, Download, Printer, ShieldCheck, Gavel, Scale } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateLegalDocument } from "@/ai/flows/legal-document-generator";

export default function GeneradorDocumentosPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [documentType, setDocumentType] = useState("");
    const [parties, setParties] = useState("");
    const [clauses, setClauses] = useState("");
    const [result, setResult] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!documentType || !parties) {
            toast({ variant: "destructive", title: "Datos incompletos", description: "Por favor define el tipo de documento y las partes involucradas." });
            return;
        }
        setIsLoading(true);
        try {
            const doc = await generateLegalDocument({ documentType, parties, specificClauses: clauses });
            setResult(doc);
            toast({ title: "Documento Generado", description: "Borrador legal listo para revisión técnica." });
        } catch (error) {
            toast({ variant: "destructive", title: "Error en el Nodo IA", description: "No se pudo generar el documento. Intenta de nuevo." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-12 w-full px-6 md:px-16 pb-20">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                    <Scale className="h-3 w-3" /> NODO JURÍDICO IA
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white italic-shadow">Generador de <span className="text-primary">Contratos</span></h1>
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest opacity-40">Redacción Automatizada de Grado Legal • 2026</p>
            </header>

            <div className="grid lg:grid-cols-5 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="glass-card border-none p-8 rounded-[2.5rem] bg-white/[0.02]">
                        <CardHeader className="p-0 mb-8">
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-3">
                                <Gavel className="h-4 w-4" /> Parámetros de Redacción
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-6">
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Tipo de Instrumento Legal</Label>
                                <Select onValueChange={setDocumentType}>
                                    <SelectTrigger className="h-12 rounded-xl bg-white/5 border-white/10 font-bold">
                                        <SelectValue placeholder="Seleccione..." />
                                    </SelectTrigger>
                                    <SelectContent className="bg-black border-white/10 rounded-xl">
                                        <SelectItem value="Contrato de Arrendamiento">Contrato de Arrendamiento</SelectItem>
                                        <SelectItem value="Compraventa de Vehículo">Compraventa de Vehículo</SelectItem>
                                        <SelectItem value="Acuerdo de Confidencialidad (NDA)">Acuerdo de Confidencialidad (NDA)</SelectItem>
                                        <SelectItem value="Poder Especial">Poder Especial</SelectItem>
                                        <SelectItem value="Acta de Asamblea">Acta de Asamblea</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Partes Involucradas (Nombres, C.I., RIF)</Label>
                                <Textarea 
                                    className="bg-white/5 border-white/10 rounded-xl font-medium min-h-[100px]" 
                                    placeholder="Ej: Inversiones Kyron (RIF: J-50328471-6) y Juan Pérez (V-18745632)"
                                    onChange={(e) => setParties(e.target.value)}
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Cláusulas Específicas / Montos / Fechas</Label>
                                <Textarea 
                                    className="bg-white/5 border-white/10 rounded-xl font-medium min-h-[80px]" 
                                    placeholder="Ej: Canon de $500 mensuales, duración 1 año..."
                                    onChange={(e) => setClauses(e.target.value)}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="p-0 pt-8">
                            <Button 
                                className="w-full h-14 rounded-2xl btn-3d-primary font-black text-xs uppercase tracking-widest shadow-2xl"
                                onClick={handleGenerate}
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader2 className="animate-spin mr-2"/> : <Wand2 className="mr-2 h-5 w-5"/>}
                                GENERAR BORRADOR MAESTRO
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                <div className="lg:col-span-3">
                    {result ? (
                        <Card className="glass-card border-none rounded-[3rem] bg-white/[0.01] h-full flex flex-col overflow-hidden">
                            <CardHeader className="p-10 border-b border-white/5 flex flex-row justify-between items-center bg-white/[0.01]">
                                <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-white">Vista Previa del Instrumento</CardTitle>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon" className="rounded-xl" onClick={() => window.print()}><Printer className="h-4 w-4"/></Button>
                                    <Button variant="outline" size="icon" className="rounded-xl" onClick={() => {
                                        const blob = new Blob([result ?? ""], { type: "text/plain;charset=utf-8" });
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement("a");
                                        a.href = url;
                                        a.download = `${documentType.replace(/\s+/g, "_")}_borrador.txt`;
                                        a.click();
                                        URL.revokeObjectURL(url);
                                        toast({ title: "DESCARGA INICIADA", description: "Borrador exportado como archivo de texto." });
                                    }}><Download className="h-4 w-4"/></Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-10 flex-grow overflow-y-auto custom-scrollbar">
                                <div className="prose prose-invert prose-sm max-w-none text-justify whitespace-pre-wrap font-serif leading-relaxed text-white/80">
                                    {result}
                                </div>
                            </CardContent>
                            <CardFooter className="p-8 bg-primary/5 border-t border-white/5 flex justify-between items-center">
                                <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-primary">
                                    <ShieldCheck className="h-4 w-4" /> Validado por Protocolo Legal IA
                                </div>
                                <Button className="rounded-xl h-10 px-8 text-[9px] font-black uppercase tracking-widest" onClick={async () => {
                                    try {
                                        const res = await fetch("/api/documentos-juridicos", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({
                                                tipo: "contrato",
                                                titulo: documentType || "Borrador Legal IA",
                                                descripcion: result?.substring(0, 500) ?? "",
                                                partes: parties ? parties.split(",").map((p: string) => p.trim()) : null,
                                                estado: "borrador",
                                            }),
                                        });
                                        if (res.ok) {
                                            toast({ title: "GUARDADO EN BÓVEDA", description: "Documento almacenado en el archivo jurídico." });
                                        } else {
                                            toast({ variant: "destructive", title: "Error", description: "No se pudo guardar. Inicie sesión primero." });
                                        }
                                    } catch {
                                        toast({ variant: "destructive", title: "Error", description: "Error de conexión." });
                                    }
                                }}>GUARDAR EN BÓVEDA</Button>
                            </CardFooter>
                        </Card>
                    ) : (
                        <div className="h-full rounded-[3rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-12 bg-white/[0.01]">
                            <FileText className="h-20 w-20 text-white/5 mb-6" />
                            <p className="text-white/20 font-black uppercase tracking-[0.4em] text-sm italic">Esperando inyección de parámetros legales...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
