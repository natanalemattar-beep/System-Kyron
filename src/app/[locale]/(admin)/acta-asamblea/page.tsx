
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Signature as FileSignature, Printer, Download, CircleCheck as CheckCircle, Gavel, Activity, Terminal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";

export default function ActaAsambleaPage() {
    const { toast } = useToast();
    const [tipo, setTipo] = useState("ordinaria");
    const [fecha, setFecha] = useState(new Date().toISOString().substring(0, 10));

    const handleAction = (action: string) => {
        toast({
            title: `PROTOCOLO ${action.toUpperCase()} ACTIVADO`,
            description: "Documento procesado bajo cifrado legal.",
            action: <CheckCircle className="text-primary h-4 w-4" />
        });
    };

  return (
    <div className="space-y-12 pb-20">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <Gavel className="h-3 w-3" /> NODO REGISTRAL
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Actas <span className="text-primary italic">de Asamblea</span></h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Gobierno Corporativo • Libros de Accionistas 2026</p>
      </header>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
            <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Generador de Acta Inteligente</CardTitle>
                </CardHeader>
                <CardContent className="p-10 space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Tipo de Asamblea</Label>
                            <Select value={tipo} onValueChange={setTipo}>
                                <SelectTrigger className="h-12 rounded-xl bg-white/5 border-border font-bold uppercase"><SelectValue /></SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="ordinaria" className="uppercase text-xs font-bold">Ordinaria</SelectItem>
                                    <SelectItem value="extraordinaria" className="uppercase text-xs font-bold">Extraordinaria</SelectItem>
                                    <SelectItem value="junta" className="uppercase text-xs font-bold">Junta Directiva</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-3">
                            <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Fecha de Sesión</Label>
                            <Input type="date" value={fecha} onChange={e => setFecha(e.target.value)} className="h-12 rounded-xl bg-white/5 border-border font-mono text-xs" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 ml-1">Deliberaciones y Acuerdos</Label>
                        <Textarea placeholder="Describa los puntos tratados y las decisiones tomadas..." className="bg-white/5 border-border rounded-2xl p-6 min-h-[200px] text-xs font-bold uppercase" />
                    </div>
                </CardContent>
                <CardFooter className="p-10 bg-primary/5 border-t border-border flex justify-between items-center">
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40 italic">
                        <Terminal className="h-4 w-4" /> Validado por Kyron Legal
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="h-12 px-6 rounded-xl border-border bg-card/50 text-[9px] font-black uppercase tracking-widest" onClick={() => handleAction('impresión')}>
                            <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
                        </Button>
                        <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black uppercase text-[9px] tracking-widest shadow-xl" onClick={() => handleAction('registro')}>
                            REGISTRAR Y SELLAR
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
            <Card className="glass-card border-none p-10 rounded-[3rem] bg-card/40 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000"><FileSignature className="h-32 w-32" /></div>
                <h3 className="text-xl font-black uppercase italic tracking-tight text-foreground mb-6">Custodia de Libros</h3>
                <p className="text-xs font-bold text-muted-foreground/60 leading-relaxed uppercase mb-8 text-justify">
                    De conformidad con el Código de Comercio, cada acta registrada en System Kyron genera una huella digital inmutable que certifica la fecha y hora de la asamblea ante auditorías del SAREN.
                </p>
                <div className="p-6 rounded-2xl bg-white/5 border border-border shadow-inner">
                    <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-primary mb-2">
                        <span>Integridad de Bóveda</span>
                        <span>Verificada</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary shadow-glow" style={{ width: '100%' }} />
                    </div>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
