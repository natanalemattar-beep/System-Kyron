
"use client";
import { BackButton } from "@/components/back-button";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserCheck, Download, Eye, ShieldCheck, Activity, Terminal, Users, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const socios = [
    { id: "S-001", nombre: "Carlos Mattar", cargo: "Presidente", participacion: "40%", estatus: "Verificado", lastAudit: "Hoy" },
    { id: "S-002", nombre: "Sebastián Garrido", cargo: "Director de Operaciones", participacion: "30%", estatus: "Verificado", lastAudit: "Hace 2 días" },
    { id: "S-003", nombre: "Marcos Sousa", cargo: "Director de Ingeniería", participacion: "30%", estatus: "Verificado", lastAudit: "Hace 1 semana" },
];

export default function CertificacionesSociosPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <UserCheck className="h-3 w-3" /> NODO DE IDENTIDAD
                    </div>
                <BackButton href="/contabilidad" label="Contabilidad" />
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Certificaciones <span className="text-primary italic">de Socios</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Registro de Accionistas • Validación Biométrica 2026</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    AUDITAR JUNTA
                </Button>
            </header>

            <div className="mb-10">
                <div className="relative max-w-lg">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                    <Input placeholder="Buscar por nombre o número de cédula..." className="pl-12 h-14 rounded-2xl bg-white/5 border-border text-xs font-bold uppercase tracking-widest" />
                </div>
            </div>

            <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Relación de Accionistas y Directivos</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 border-none">
                                <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Socio / Perfil</TableHead>
                                <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Cargo Institucional</TableHead>
                                <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Participación</TableHead>
                                <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Estatus ID</TableHead>
                                <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Acción</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {socios.map(socio => (
                                <TableRow key={socio.id} className="border-border/50 hover:bg-muted/20 transition-all group">
                                    <TableCell className="pl-10 py-6">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-10 w-10 border-2 border-primary/20 shadow-sm">
                                                <AvatarFallback className="font-black text-[10px] bg-primary text-white">{socio.nombre.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-black text-xs text-foreground/80 uppercase italic group-hover:text-primary transition-colors">{socio.nombre}</p>
                                                <p className="text-[8px] font-mono text-muted-foreground font-bold uppercase">{socio.id}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6 text-[10px] font-bold text-muted-foreground uppercase">{socio.cargo}</TableCell>
                                    <TableCell className="text-center py-6 font-black text-sm text-foreground/70 italic">{socio.participacion}</TableCell>
                                    <TableCell className="text-center py-6">
                                        <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-emerald-500/20 text-emerald-400 bg-emerald-500/5 h-6 px-3 rounded-lg">{socio.estatus}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-10 py-6">
                                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary" onClick={() => toast({ title: "EXPEDIENTE ABIERTO" })}>
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="p-10 border-t border-border bg-primary/5 flex justify-between items-center">
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40 italic">
                        <Terminal className="h-4 w-4" /> Protocolo KYC (Know Your Customer) Activo
                    </div>
                    <Button variant="outline" className="h-10 px-6 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest">Descargar Registro de Accionistas</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
