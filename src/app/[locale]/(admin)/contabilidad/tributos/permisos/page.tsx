
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Download, Eye, Gavel, ShieldCheck, Activity, Terminal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { initialPermisos } from "@/lib/permisos-data";

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Vigente: "default",
  "Por Vencer": "secondary",
  Vencido: "destructive",
  "En Renovación": "outline",
};

export default function PermisosTributosPage() {
  const [permisos] = useState(initialPermisos);
  const { toast } = useToast();

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <ShieldCheck className="h-3 w-3" /> NODO SAPI
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Propiedad <span className="text-primary italic">Intelectual (SAPI)</span></h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">Marcas, Patentes y Derechos de Autor • 2026</p>
      </header>

      <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
        <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Registro de Activos Intangibles</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/30 border-none">
                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Referencia</TableHead>
                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Tipo de Permiso</TableHead>
                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Estado</TableHead>
                        <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Acción</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {permisos.filter(p => p.emisor === 'SAPI').map(p => (
                        <TableRow key={p.id} className="border-border/50 hover:bg-white/[0.01]">
                            <TableCell className="pl-10 py-6 text-[10px] font-black text-primary italic uppercase">{p.id}</TableCell>
                            <TableCell className="py-6 font-bold text-white/60 text-xs uppercase">{p.tipo}</TableCell>
                            <TableCell className="py-6 text-center">
                                <Badge variant={statusVariant[p.estado] || 'default'} className="text-[8px] font-black uppercase tracking-widest h-6 px-3">{p.estado}</Badge>
                            </TableCell>
                            <TableCell className="text-right pr-10 py-6">
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white/5">
                                    <Eye className="h-4 w-4 text-white/20" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
        <CardFooter className="p-10 bg-primary/5 border-t border-border flex justify-between items-center">
            <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40 italic">
                <Terminal className="h-4 w-4" /> Protección de Activos Tecnológicos Activa
            </div>
            <Button className="h-12 px-8 rounded-xl btn-3d-primary font-black uppercase text-[10px] tracking-widest">NUEVA PATENTE</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
