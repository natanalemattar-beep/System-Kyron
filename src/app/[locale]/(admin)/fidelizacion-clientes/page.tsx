"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { Heart, Send, Star, Activity, Inbox, Loader as Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface TopCliente {
  id: string;
  name: string;
  totalPurchases: number;
  invoiceCount: number;
  score: number;
}

interface CarteraStats {
  retencion: string;
  churnRate: string;
}

export default function FidelizacionClientesPage() {
    const { toast } = useToast();
    const [customers, setCustomers] = useState<TopCliente[]>([]);
    const [stats, setStats] = useState<CarteraStats>({ retencion: "—", churnRate: "—" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const load = async () => {
        try {
          const res = await fetch("/api/clientes/top");
          if (res.ok) {
            const data = await res.json();
            setCustomers(data.customers || []);
            setStats(data.stats || { retencion: "—", churnRate: "—" });
          }
        } catch { /* silent */ }
        setLoading(false);
      };
      load();
    }, []);

    return (
        <div className="space-y-12 pb-20">
            <header className="border-l-4 border-secondary pl-8 py-2 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20 text-[9px] font-black uppercase tracking-[0.4em] text-secondary shadow-glow-secondary mb-4">
                    <Heart className="h-3 w-3" /> CENTRO DE LEALTAD
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Fidelización <span className="text-secondary italic">de Clientes</span></h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Análisis de Retención • Customer Lifetime Value</p>
            </header>

            <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10 flex flex-row justify-between items-center">
                            <div>
                                <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-secondary italic">Top Clientes Recurrentes</CardTitle>
                                <CardDescription className="text-[9px] font-bold uppercase opacity-30 mt-1">Ranking por volumen y cumplimiento</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          {loading ? (
                            <div className="flex items-center justify-center py-20">
                              <Loader2 className="animate-spin h-5 w-5 text-muted-foreground/40" />
                            </div>
                          ) : customers.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-3">
                              <div className="p-4 rounded-2xl bg-muted/30 border border-border/30">
                                <Inbox className="h-8 w-8 text-muted-foreground/30" />
                              </div>
                              <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-wider">Sin clientes registrados</p>
                              <p className="text-[10px] text-muted-foreground/30">Los clientes aparecerán aquí conforme se registren facturas</p>
                            </div>
                          ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30 border-none">
                                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Cliente / Cuenta</TableHead>
                                        <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Órdenes</TableHead>
                                        <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Total Compra</TableHead>
                                        <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Kyron Score</TableHead>
                                        <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Acción</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {customers.map(c => (
                                        <TableRow key={c.id} className="border-border/50 hover:bg-muted/20 transition-all group">
                                            <TableCell className="pl-10 py-6">
                                                <p className="font-black text-xs text-foreground/80 uppercase italic">{c.name}</p>
                                                <p className="text-[8px] font-mono text-secondary font-bold uppercase tracking-widest">{c.id}</p>
                                            </TableCell>
                                            <TableCell className="text-center py-6 font-bold text-sm text-foreground/60">{c.invoiceCount}</TableCell>
                                            <TableCell className="text-right py-6 font-mono text-sm font-black italic text-foreground/70">{formatCurrency(c.totalPurchases, 'Bs.')}</TableCell>
                                            <TableCell className="text-center py-6">
                                                <Badge className="bg-secondary/20 text-secondary border-none h-6 px-3 text-[9px] font-black">{c.score} PTS</Badge>
                                            </TableCell>
                                            <TableCell className="text-right pr-10 py-6">
                                                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-secondary/10 text-secondary" onClick={() => toast({ title: "COMUNICADO ENVIADO" })}>
                                                    <Send className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                          )}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <Card className="bg-secondary text-secondary-foreground rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-glow-secondary border-none group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Star className="h-32 w-32" /></div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tight mb-4">Programa de Premiación</h3>
                        <p className="text-xs font-bold opacity-80 leading-relaxed uppercase mb-8">Automatice el envío de agradecimientos y beneficios exclusivos a sus clientes VIP.</p>
                        <Button className="w-full h-12 bg-white text-secondary hover:bg-white/90 font-black uppercase text-[10px] tracking-widest rounded-xl shadow-2xl">CONFIGURAR CAMPAÑA</Button>
                    </Card>

                    <Card className="glass-card border-none p-10 rounded-[3rem] bg-card/40 shadow-2xl">
                        <div className="flex items-center gap-4 mb-8">
                            <Activity className="h-6 w-6 text-primary" />
                            <h4 className="text-xs font-black uppercase tracking-widest text-foreground">Estado de Cartera</h4>
                        </div>
                        <div className="space-y-6">
                            <div className="flex justify-between items-end border-b border-border pb-4">
                                <span className="text-[9px] font-bold text-muted-foreground uppercase">Retención</span>
                                <span className="text-xl font-black text-emerald-500 italic">{stats.retencion}</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-[9px] font-bold text-muted-foreground uppercase">Churn Rate</span>
                                <span className="text-xl font-black text-rose-500 italic">{stats.churnRate}</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
