
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building, CirclePlus as PlusCircle, Download, FileText, Activity, MapPin, Zap } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const activos = [
    { id: "INM-001", tipo: "Oficina", ubicacion: "Torre Kyron, Caracas", area: "120 m²", valor: 150000, estado: "En Uso" },
    { id: "INM-002", tipo: "Almacén", ubicacion: "Zona Industrial, Valencia", area: "500 m²", valor: 250000, estado: "En Uso" },
];

export default function ActivosInmobiliariosPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-12 pb-20">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                <Building className="h-3 w-3" /> NODO PATRIMONIAL
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Gestión <span className="text-primary italic">Inmobiliaria</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Registro de Propiedades • Valoración de Activos 2026</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground" onClick={() => toast({ title: "REPORTE GENERADO" })}>
                <Download className="mr-2 h-4 w-4" /> EXPORTAR INVENTARIO
            </Button>
            <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                <PlusCircle className="mr-2 h-4 w-4" /> REGISTRAR BIEN
            </Button>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Zap className="h-24 w-24" /></div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Valor Patrimonial Total</p>
            <p className="text-4xl font-black italic text-primary tracking-tight shadow-glow-text">{formatCurrency(400000, 'USD')}</p>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Activity className="h-24 w-24" /></div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Mantenimiento Preventivo</p>
            <p className="text-4xl font-black italic text-foreground tracking-tight">AL DÍA</p>
        </Card>
      </div>

      <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Relación de Bienes Inmuebles</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/30 border-none">
                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Activo / ID</TableHead>
                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Ubicación Geográfica</TableHead>
                        <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Área</TableHead>
                        <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Estatus</TableHead>
                        <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Valor Contable</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {activos.map(activo => (
                        <TableRow key={activo.id} className="border-border/50 hover:bg-muted/20 transition-all group">
                            <TableCell className="pl-10 py-6">
                                <p className="font-black text-xs text-foreground/80 uppercase italic group-hover:text-primary transition-colors">{activo.tipo}</p>
                                <p className="text-[8px] font-mono text-muted-foreground font-bold uppercase tracking-widest">{activo.id}</p>
                            </TableCell>
                            <TableCell className="py-6">
                                <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase leading-tight">
                                    <MapPin className="h-3 w-3 text-primary/40" />
                                    {activo.ubicacion}
                                </div>
                            </TableCell>
                            <TableCell className="text-center py-6 font-mono text-xs font-bold text-foreground/60">{activo.area}</TableCell>
                            <TableCell className="text-center py-6">
                                <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-emerald-500/20 text-emerald-400 bg-emerald-500/5 h-6 px-3 rounded-lg">{activo.estado}</Badge>
                            </TableCell>
                            <TableCell className="text-right pr-10 py-6 font-mono text-sm font-black italic text-foreground/70">{formatCurrency(activo.valor, 'USD')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
