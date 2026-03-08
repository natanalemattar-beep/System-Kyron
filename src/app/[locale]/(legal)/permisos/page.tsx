
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Download, Eye, Gavel, ShieldCheck, Activity } from "lucide-react";
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
    <div className="space-y-12 pb-20">
      <header className="border-l-4 border-slate-500 pl-8 py-2 mt-10">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-500/10 border border-slate-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 shadow-glow mb-4">
                <Gavel className="h-3 w-3" /> NODO DE CUMPLIMIENTO
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Trámites y <span className="text-slate-400 italic">Permisos</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">Monitor de Licencias v2.6 • Registro Centralizado</p>
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-12">
        <Card className="lg:col-span-8 glass-card border-none rounded-[3rem] bg-white/[0.01] overflow-hidden shadow-2xl">
            <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
                <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-slate-400">Directorio de Habilitaciones</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                    {Object.entries(groupedPermisos).map(([emisor, lista]) => (
                        <AccordionItem value={emisor} key={emisor} className="border-white/5">
                            <AccordionTrigger className="px-10 py-6 hover:bg-white/[0.02] transition-all">
                                <div className="flex justify-between items-center w-full pr-10">
                                    <span className="font-black uppercase italic tracking-tighter text-white/80">{emisor}</span>
                                    <Badge className="bg-white/5 border-white/10 text-[8px] font-black uppercase px-3">{lista.length} ITEMS</Badge>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-0">
                                <Table>
                                    <TableBody>
                                        {lista.map(p => (
                                            <TableRow key={p.id} className="border-none hover:bg-white/[0.01]">
                                                <TableCell className="pl-14 py-5 text-[10px] font-black text-primary italic uppercase">{p.id}</TableCell>
                                                <TableCell className="py-5 font-bold text-white/60 text-xs uppercase">{p.tipo}</TableCell>
                                                <TableCell className="py-5">
                                                    <Badge variant={statusVariant[p.estado]} className="text-[8px] font-black uppercase tracking-widest">{p.estado}</Badge>
                                                </TableCell>
                                                <TableCell className="text-right pr-10 py-5">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white/5">
                                                        <Eye className="h-4 w-4 text-white/20" />
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

        <div className="lg:col-span-4 space-y-10">
            <Card className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 relative overflow-hidden shadow-glow border-none group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Activity className="h-32 w-32" /></div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4">Nueva Solicitud</h3>
                <p className="text-xs font-bold opacity-80 leading-relaxed uppercase mb-8">Inicie el protocolo de gestión ante nuevos entes emisores.</p>
                <Button className="w-full h-12 text-[9px] font-black bg-white text-primary hover:bg-white/90 rounded-xl uppercase tracking-widest relative z-10 shadow-2xl">
                    <PlusCircle className="mr-3 h-4 w-4" /> REGISTRAR TRÁMITE
                </Button>
            </Card>

            <Card className="glass-card border-none bg-amber-500/5 rounded-[2.5rem] p-8 border border-amber-500/10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 mb-6 flex items-center gap-3 italic">
                    <ShieldCheck className="h-4 w-4" /> Alerta de Vencimiento
                </h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 leading-relaxed text-justify">
                    El sistema ha detectado 2 permisos en ventana de renovación. Verifique el módulo de tareas para evitar la extinción de derechos.
                </p>
            </Card>
        </div>
      </div>
    </div>
  );
}
