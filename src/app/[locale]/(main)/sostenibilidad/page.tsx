"use client";

import { useState } from "react";
import { Recycle, Leaf, MapPin, Coins, ShieldCheck, Zap, Cpu, Battery, Wifi, Download, Activity, Terminal } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Image from "next/image";
import placeholderImagesData from "@/app/lib/placeholder-images.json";
const PlaceHolderImages = placeholderImagesData.placeholderImages;

const recyclingHistory = [
    { id: 1, fecha: "15/03/2026", tipo: "Papel", peso: "2.5 kg", ecr: "+50", bin: "Ameru IA - Sede A" },
    { id: 2, fecha: "12/03/2026", tipo: "Plástico", peso: "1.8 kg", ecr: "+36", bin: "Ameru IA - Sede B" },
    { id: 3, fecha: "10/03/2026", tipo: "Vidrio", peso: "3.2 kg", ecr: "+64", bin: "Ameru IA - Sede A" },
    { id: 4, fecha: "08/03/2026", tipo: "Aluminio", peso: "0.9 kg", ecr: "+27", bin: "Ameru IA - Sede C" },
];

export default function SostenibilidadPage() {
    const { toast } = useToast();
    const [balance] = useState(12450);
    const ameruImage = PlaceHolderImages.find(img => img.id === "ameru-ia-bin");

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-secondary/10 border border-secondary/20 text-[9px] font-black uppercase tracking-[0.3em] text-secondary mb-4">
                        <Leaf className="h-3 w-3" /> ÁREA SUSTENTABLE
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase">Impacto <span className="text-secondary italic">Ambiental</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mt-2">Gestión de Activos Verdes • Ameru IA Ecosystem 2026</p>
                </div>
                <Button variant="outline" className="h-10 px-6 rounded-xl text-[10px] font-bold uppercase tracking-wider" onClick={() => window.print()}>
                    <Download className="mr-2 h-3.5 w-3.5" /> Exportar Ledger
                </Button>
            </header>

            <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden group">
                <div className="p-6 md:p-10 grid lg:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Badge className="bg-secondary text-white border-none text-[8px] font-black px-3 py-1 uppercase tracking-[0.3em]">Hardware 3ra Gen</Badge>
                            <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase text-foreground leading-none">AMERU <span className="text-secondary">IA</span></h2>
                            <p className="text-sm text-muted-foreground leading-relaxed">La papelera inteligente definitiva para el sector privado. Clasificación autónoma con IA edge.</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Zap, label: "Inducción Magnética", desc: "Clasificación síncrona de metales y polímeros." },
                                { icon: Cpu, label: "Inferencia Edge", desc: "Visión artificial para validación en tiempo real." },
                            ].map((feat, i) => (
                                <div key={i} className="space-y-1.5">
                                    <div className="flex items-center gap-2 text-secondary">
                                        <feat.icon className="h-3.5 w-3.5" />
                                        <span className="text-[10px] font-black uppercase tracking-wider">{feat.label}</span>
                                    </div>
                                    <p className="text-[9px] text-muted-foreground/50 leading-snug">{feat.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <Button className="h-11 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-secondary hover:bg-secondary/90 text-white">ORDENAR DISPOSITIVO</Button>
                            <Button variant="outline" className="h-11 px-6 rounded-xl font-bold text-[10px] uppercase tracking-wider">FICHA TÉCNICA</Button>
                        </div>
                    </div>

                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/20 bg-muted/10 flex items-center justify-center group-hover:border-secondary/20 transition-all duration-500">
                        {ameruImage && (
                            <Image 
                                src={ameruImage.imageUrl} 
                                alt={ameruImage.description} 
                                fill 
                                className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                                data-ai-hint={ameruImage.imageHint}
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                        <div className="relative z-10 flex gap-6 text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/70 bg-background/60 backdrop-blur-md px-5 py-2 rounded-full border border-border/20">
                            <span className="flex items-center gap-2"><Battery className="h-3 w-3 text-secondary" /> 100% SOLAR</span>
                            <span className="flex items-center gap-2"><Wifi className="h-3 w-3 text-secondary" /> 5G NATIVE</span>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                {[
                    { label: "Saldo Eco-Créditos", val: `${balance.toLocaleString('en-US')} ECR`, icon: Coins, color: "text-secondary", bgColor: "bg-secondary/10 border-secondary/15", desc: "Listos para canje" },
                    { label: "CO₂ Mitigado", val: "340 KG", icon: Recycle, color: "text-blue-400", bgColor: "bg-blue-400/10 border-blue-400/15", desc: "Impacto certificado" },
                    { label: "Nodos Ameru IA", val: "12 ACTIVOS", icon: MapPin, color: "text-emerald-500", bgColor: "bg-emerald-500/10 border-emerald-500/15", desc: "Red La Guaira" },
                    { label: "Eficiencia Clasif.", val: "98.4%", icon: ShieldCheck, color: "text-primary", bgColor: "bg-primary/10 border-primary/15", desc: "Score de precisión" }
                ].map((kpi, i) => (
                    <Card key={i} className="glass-card border-none bg-card/50 p-5 rounded-2xl group hover:scale-[1.01] transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-[9px] font-black uppercase tracking-[0.15em] text-muted-foreground/40">{kpi.label}</p>
                            <div className={cn("p-1.5 rounded-lg border", kpi.bgColor)}>
                                <kpi.icon className={cn("h-3.5 w-3.5", kpi.color)} />
                            </div>
                        </div>
                        <p className="text-2xl font-black text-foreground tracking-tight">{kpi.val}</p>
                        <p className="text-[10px] text-muted-foreground/50 font-bold mt-1">{kpi.desc}</p>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-12">
                <Card className="lg:col-span-8 glass-card border-none rounded-2xl bg-card/50 overflow-hidden">
                    <CardHeader className="p-6 border-b border-border/30">
                        <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-foreground flex items-center gap-2">
                            <Activity className="h-3.5 w-3.5 text-secondary" /> Historial de Inyección Ameru IA
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/20 border-none">
                                    <TableHead className="pl-6 py-4 text-[9px] font-black uppercase tracking-wider opacity-30">Fecha / Nodo</TableHead>
                                    <TableHead className="py-4 text-[9px] font-black uppercase tracking-wider opacity-30">Activo</TableHead>
                                    <TableHead className="text-center py-4 text-[9px] font-black uppercase tracking-wider opacity-30">Peso</TableHead>
                                    <TableHead className="text-right pr-6 py-4 text-[9px] font-black uppercase tracking-wider opacity-30">Recompensa</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recyclingHistory.map((row) => (
                                    <TableRow key={row.id} className="border-border/20 hover:bg-muted/20 transition-colors group">
                                        <TableCell className="pl-6 py-4">
                                            <p className="font-bold text-xs text-foreground/80 group-hover:text-secondary transition-colors">{row.bin}</p>
                                            <p className="text-[9px] text-muted-foreground">{row.fecha}</p>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <Badge variant="outline" className="text-[8px] font-bold uppercase border-secondary/20 text-secondary bg-secondary/5">{row.tipo}</Badge>
                                        </TableCell>
                                        <TableCell className="text-center py-4 font-mono text-xs font-bold text-foreground/60">{row.peso}</TableCell>
                                        <TableCell className="text-right pr-6 py-4 font-black text-lg text-secondary tracking-tight">{row.ecr}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className="p-5 bg-muted/10 border-t border-border/20 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-[9px] font-bold uppercase text-muted-foreground/40">
                            <Terminal className="h-3.5 w-3.5" /> Sello Blockchain RFC 3161
                        </div>
                        <Button variant="outline" size="sm" className="h-8 px-4 rounded-xl text-[9px] font-bold uppercase tracking-wider">Ver Ledger</Button>
                    </CardFooter>
                </Card>

                <div className="lg:col-span-4 space-y-6">
                    <Card className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-6 border-none relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10"><Coins className="h-24 w-24" /></div>
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <h3 className="text-sm font-black uppercase tracking-tight mb-2">Canje de Activos</h3>
                        <p className="text-[11px] opacity-80 leading-relaxed mb-5">Utilice sus Eco-Créditos para liquidar facturas de telecomunicaciones o inyectar liquidez.</p>
                        <Button variant="secondary" size="sm" className="bg-white text-emerald-700 font-bold text-[10px] uppercase tracking-wider rounded-xl h-9 px-5 hover:bg-white/90">ACCEDER AL EXCHANGE</Button>
                    </Card>

                    <Card className="glass-card border-none p-5 rounded-2xl bg-card/50">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-6 flex items-center gap-2">
                            <Activity className="h-3.5 w-3.5" /> Telemetría Ameru IA
                        </h4>
                        <div className="space-y-4">
                            {[
                                { label: "Disponibilidad", val: "92%", color: "text-emerald-500" },
                                { label: "Capacidad de Red", val: "5G ACTIVA", color: "text-blue-400" },
                                { label: "Mantenimiento", val: "AL DÍA", color: "text-secondary" }
                            ].map((stat, i) => (
                                <div key={i} className="flex justify-between items-center border-b border-border/15 pb-3 last:border-none last:pb-0">
                                    <span className="text-[10px] font-bold text-muted-foreground">{stat.label}</span>
                                    <span className={cn("text-xs font-black uppercase", stat.color)}>{stat.val}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
