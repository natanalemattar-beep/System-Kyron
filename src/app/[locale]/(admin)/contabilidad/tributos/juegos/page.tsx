
"use client";
import { BackButton } from "@/components/back-button";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, Download, Calculator, CircleCheck as CheckCircle, Activity, Terminal, Landmark, Coins } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function JuegosAzarPage() {
    const { toast } = useToast();
    const [regOpen, setRegOpen] = useState(false);
    const [regForm, setRegForm] = useState({ tipo: "mesa", descripcion: "", monto_bruto: "", alicuota: "36" });

    const handleRegistrar = () => {
      if (!regForm.monto_bruto) { toast({ variant: "destructive", title: "Campo requerido", description: "Ingrese el monto bruto." }); return; }
      const impuesto = parseFloat(regForm.monto_bruto) * parseFloat(regForm.alicuota) / 100;
      toast({ title: "APUESTA REGISTRADA", description: `${regForm.tipo.toUpperCase()} — Bs. ${parseFloat(regForm.monto_bruto).toFixed(2)} · Impuesto: Bs. ${impuesto.toFixed(2)}` });
      setRegForm({ tipo: "mesa", descripcion: "", monto_bruto: "", alicuota: "36" });
      setRegOpen(false);
    };

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10 bg-[#f5f7fa] min-h-screen">
            <header className="border-l-4 border-purple-600 pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-600/10 border border-purple-600/20 text-[9px] font-black uppercase tracking-[0.4em] text-purple-600 shadow-sm mb-4">
                        <Zap className="h-3 w-3" /> CENTRO AZAR
                    </div>
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Actividades <span className="text-purple-600 italic">de Juegos</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Impuesto a Casinos y Bingos • Liquidación Mensual</p>
                </div>
                <Dialog open={regOpen} onOpenChange={setRegOpen}>
                  <DialogTrigger asChild>
                    <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl bg-purple-600 hover:bg-purple-700 border-none">
                      REGISTRAR APUESTA
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border rounded-2xl max-w-md">
                    <DialogHeader><DialogTitle className="text-lg font-black uppercase tracking-tight">Registrar Actividad de Juegos</DialogTitle></DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black uppercase tracking-widest opacity-60">Tipo de Actividad</Label>
                        <Select value={regForm.tipo} onValueChange={v => setRegForm(f => ({ ...f, tipo: v }))}>
                          <SelectTrigger className="h-11 rounded-xl bg-muted/30 border-border"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mesa">Mesa de Juego</SelectItem>
                            <SelectItem value="maquina">Máquina Tragamonedas</SelectItem>
                            <SelectItem value="bingo">Bingo</SelectItem>
                            <SelectItem value="apuesta-online">Apuesta Online</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-[9px] font-black uppercase tracking-widest opacity-60">Monto Bruto (Bs.) *</Label>
                          <Input type="number" placeholder="0.00" value={regForm.monto_bruto} onChange={e => setRegForm(f => ({ ...f, monto_bruto: e.target.value }))} className="h-11 rounded-xl bg-muted/30 border-border" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[9px] font-black uppercase tracking-widest opacity-60">Alícuota (%)</Label>
                          <Input type="number" value={regForm.alicuota} onChange={e => setRegForm(f => ({ ...f, alicuota: e.target.value }))} className="h-11 rounded-xl bg-muted/30 border-border" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[9px] font-black uppercase tracking-widest opacity-60">Descripción</Label>
                        <Input placeholder="Detalle de la operación" value={regForm.descripcion} onChange={e => setRegForm(f => ({ ...f, descripcion: e.target.value }))} className="h-11 rounded-xl bg-muted/30 border-border" />
                      </div>
                      {regForm.monto_bruto && (
                        <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
                          <div className="flex justify-between text-[10px] font-bold text-muted-foreground mb-1">
                            <span>Monto Bruto</span><span>Bs. {parseFloat(regForm.monto_bruto || "0").toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-xs font-black text-purple-600 pt-2 border-t border-purple-500/10">
                            <span>Impuesto ({regForm.alicuota}%)</span><span>Bs. {(parseFloat(regForm.monto_bruto || "0") * parseFloat(regForm.alicuota || "0") / 100).toFixed(2)}</span>
                          </div>
                        </div>
                      )}
                      <Button onClick={handleRegistrar} className="w-full h-12 rounded-xl font-black uppercase text-[10px] tracking-widest bg-purple-600 hover:bg-purple-700">REGISTRAR ACTIVIDAD</Button>
                    </div>
                  </DialogContent>
                </Dialog>
            </header>

            <div className="grid gap-10 lg:grid-cols-3">
                <Card className="glass-card border-none bg-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Coins className="h-24 w-24" /></div>
                    <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-purple-600">Monto Gravado (Mes)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <p className="text-4xl font-black italic text-foreground tracking-tight">Bs. 85.000,00</p>
                        <p className="text-[8px] font-bold uppercase text-muted-foreground mt-4 italic">Alícuota según Ley de Impuesto a Juegos</p>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2 glass-card border-none bg-white p-8 rounded-[3rem] shadow-xl overflow-hidden">
                    <CardHeader className="p-0 mb-8 flex flex-row justify-between items-center">
                        <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-purple-600 italic">Obligaciones Mensuales</CardTitle>
                        <Badge variant="outline" className="border-purple-200 text-purple-600">Ejercicio 2026</Badge>
                    </CardHeader>
                    <CardContent className="p-0 space-y-6 text-xs font-bold uppercase tracking-widest text-slate-500 leading-relaxed text-justify">
                        <p>Los operadores de juegos de azar deben declarar y pagar el impuesto correspondiente dentro de los lapsos fijados en el calendario de Sujetos Pasivos Especiales. El sistema calcula la carga basándose en los ingresos brutos de las mesas de juego y apuestas online.</p>
                        <div className="flex items-center gap-3 text-[9px] font-black uppercase text-slate-400">
                            <Terminal className="h-4 w-4 text-purple-600" /> Protocolo de Fiscalización Activo
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
