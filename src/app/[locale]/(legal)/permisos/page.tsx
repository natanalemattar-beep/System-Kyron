
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CirclePlus as PlusCircle, Download, Eye, Gavel, ShieldCheck, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { initialPermisos } from "@/lib/permisos-data";
import { formatDate, cn } from "@/lib/utils";

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Vigente: "default",
  "Por Vencer": "secondary",
  Vencido: "destructive",
  "En Renovación": "outline",
};

export default function PermisosPage() {
  const [permisos] = useState(initialPermisos);
  const { toast } = useToast();

  const groupedPermisos = permisos.reduce((acc, permiso) => {
    const emisor = permiso.emisor;
    if (!acc[emisor]) acc[emisor] = [];
    acc[emisor].push(permiso);
    return acc;
  }, {} as Record<string, typeof initialPermisos>);

  return (
    <div className="space-y-10 pb-20">
      <header className="border-l-4 border-primary pl-8 py-2 mt-6 md:mt-10">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-3">
                <Gavel className="h-3 w-3" /> NODO DE CUMPLIMIENTO
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Trámites y <span className="text-primary italic">Permisos</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-1 md:mt-2 italic">Monitor de Licencias v2.8.5 · Registro Centralizado</p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {[
            { label: "Total Permisos", value: String(permisos.length), color: "text-primary", bg: "bg-primary/10", icon: ShieldCheck },
            { label: "Vigentes", value: String(permisos.filter(p => p.estado === 'Vigente').length), color: "text-emerald-500", bg: "bg-emerald-500/10", icon: Activity },
            { label: "Por Vencer", value: String(permisos.filter(p => p.estado === 'Por Vencer' || p.estado === 'Vencido').length), color: "text-amber-500", bg: "bg-amber-500/10", icon: ShieldCheck },
        ].map((kpi, i) => (
            <Card key={i} className="glass-card border-none bg-card/40 rounded-2xl p-5 md:p-6">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{kpi.label}</span>
                    <div className={cn("p-2 rounded-xl", kpi.bg)}><kpi.icon className={cn("h-4 w-4", kpi.color)} /></div>
                </div>
                <p className={cn("text-2xl font-black italic tracking-tighter", kpi.color)}>{kpi.value}</p>
            </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-8 glass-card border-none rounded-2xl bg-card/40 overflow-hidden shadow-md">
            <CardHeader className="p-6 md:p-8 border-b border-border/30">
                <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-foreground/60">Directorio de Habilitaciones</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                    {Object.entries(groupedPermisos).map(([emisor, lista]) => (
                        <AccordionItem value={emisor} key={emisor} className="border-border/30">
                            <AccordionTrigger className="px-6 md:px-8 py-5 hover:bg-muted/30 transition-all">
                                <div className="flex justify-between items-center w-full pr-6">
                                    <span className="font-black uppercase italic tracking-tighter text-foreground/80">{emisor}</span>
                                    <Badge className="bg-muted border-border text-[8px] font-black uppercase px-3">{lista.length} ITEMS</Badge>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-0">
                                <Table>
                                    <TableBody>
                                        {lista.map(p => (
                                            <TableRow key={p.id} className="border-none hover:bg-muted/20">
                                                <TableCell className="pl-8 md:pl-12 py-4 text-[10px] font-black text-primary italic uppercase">{p.id}</TableCell>
                                                <TableCell className="py-4 font-bold text-foreground/60 text-xs uppercase">{p.tipo}</TableCell>
                                                <TableCell className="py-4">
                                                    <Badge variant={statusVariant[p.estado]} className="text-[8px] font-black uppercase tracking-widest">{p.estado}</Badge>
                                                </TableCell>
                                                <TableCell className="text-right pr-6 md:pr-8 py-4">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-muted/40">
                                                        <Eye className="h-4 w-4 text-muted-foreground/40" />
                                                    </Button>
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
        </Card>

        <div className="lg:col-span-4 space-y-6">
            <Card className="bg-primary text-primary-foreground rounded-2xl p-8 relative overflow-hidden shadow-lg border-none group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Activity className="h-24 w-24" /></div>
                <h3 className="text-xl font-black uppercase italic tracking-tighter mb-3">Nueva Solicitud</h3>
                <p className="text-xs font-bold opacity-80 leading-relaxed uppercase mb-6">Inicie el protocolo de gestión ante nuevos entes emisores.</p>
                <Button className="w-full h-11 text-[9px] font-black bg-white text-primary hover:bg-white/90 rounded-xl uppercase tracking-widest relative z-10 shadow-lg">
                    <PlusCircle className="mr-3 h-4 w-4" /> REGISTRAR TRÁMITE
                </Button>
            </Card>

            <Card className="glass-card border-none bg-amber-500/5 rounded-2xl p-6 border border-amber-500/10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 mb-4 flex items-center gap-3 italic">
                    <ShieldCheck className="h-4 w-4" /> Alerta de Vencimiento
                </h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-relaxed">
                    El sistema ha detectado {permisos.filter(p => p.estado === 'Por Vencer').length} permisos en ventana de renovación. Verifique el módulo de tareas para evitar la extinción de derechos.
                </p>
            </Card>

            <Card className="glass-card border-none bg-card/40 rounded-2xl p-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/60 mb-4">Entes Emisores</h4>
                <div className="space-y-2">
                    {Object.entries(groupedPermisos).map(([emisor, lista]) => (
                        <div key={emisor} className="flex items-center justify-between p-2.5 rounded-xl bg-muted/30">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/70">{emisor}</span>
                            <Badge variant="outline" className="text-[8px]">{lista.length}</Badge>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
