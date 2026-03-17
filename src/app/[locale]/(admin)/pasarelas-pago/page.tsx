
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleCheck as CheckCircle, CreditCard, Banknote, Smartphone, Globe, ShieldCheck, Activity, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const paymentGateways = [
    {
        name: "Stripe",
        description: "Protocolo global para tarjetas de crédito y débito. Ideal para expansión internacional.",
        fees: "2.9% + 30¢ por transacción",
        status: "Configurado",
        icon: Globe
    },
    {
        name: "Pago Móvil / VES",
        description: "Liquidación inmediata para el mercado nacional. Sin comisiones de intermediarios.",
        fees: "0% (Comisión bancaria base)",
        status: "Activo",
        icon: Smartphone
    },
    {
        name: "Kyron Digital Wallet",
        description: "Transferencias internas inmediatas entre nodos del ecosistema sin fricción.",
        fees: "0% Transferencia interna",
        status: "Primario",
        icon: ShieldCheck
    }
];

export default function PasarelasDePagoPage() {
    return (
        <div className="space-y-12 pb-20">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                    <CreditCard className="h-3 w-3" /> NODO DE LIQUIDACIÓN
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Pasarelas <span className="text-primary italic">de Pago</span></h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Omnicanalidad Financiera • Terminales de Cobro 2026</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paymentGateways.map((gateway, i) => (
                    <motion.div key={gateway.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                        <Card className="glass-card border-none bg-card/40 p-10 rounded-[3rem] h-full flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000"><gateway.icon className="h-24 w-24" /></div>
                            <div className="space-y-6 relative z-10">
                                <div className="flex justify-between items-start">
                                    <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                                        <gateway.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black uppercase px-3">{gateway.status}</Badge>
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-black uppercase italic tracking-tighter mb-2">{gateway.name}</CardTitle>
                                    <CardDescription className="text-xs font-bold text-muted-foreground/60 uppercase leading-relaxed">{gateway.description}</CardDescription>
                                </div>
                                <div className="pt-6 border-t border-border/50">
                                    <p className="text-[8px] font-black uppercase text-primary tracking-widest mb-1">Comisión Operativa</p>
                                    <p className="text-sm font-mono font-bold text-foreground/80">{gateway.fees}</p>
                                </div>
                            </div>
                            <CardFooter className="p-0 pt-10 mt-auto">
                                <Button variant="outline" className="w-full h-12 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest">Configurar Nodo</Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <Card className="glass-card border-none bg-white/[0.02] p-12 rounded-[4rem] mt-10 relative overflow-hidden shadow-2xl">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <ShieldCheck className="h-8 w-8 text-primary animate-pulse" />
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Seguridad de Grado Militar</h3>
                        </div>
                        <p className="text-lg font-medium italic text-white/60 leading-relaxed text-justify">
                            Todas las transacciones procesadas a través del Ecosistema Kyron están protegidas por cifrado AES-512 y selladas en el Ledger inmutable. Garantizamos 0% de fraude en transacciones certificadas.
                        </p>
                        <div className="flex items-center gap-10 text-[9px] font-black uppercase tracking-[0.5em] text-white/10">
                            <span className="flex items-center gap-2"><Activity className="h-3 w-3" /> PCI DSS COMPLIANT</span>
                            <span className="flex items-center gap-2"><Terminal className="h-3 w-3" /> SSL TLS 1.3</span>
                        </div>
                    </div>
                    <div className="p-10 rounded-[3rem] bg-black/40 border border-white/5 shadow-inner">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-10 flex items-center gap-3">
                            <Terminal className="h-4 w-4" /> Protocolo de Liquidación
                        </h4>
                        <ul className="text-xs font-bold italic text-white/70 space-y-6">
                            <li className="flex gap-6"><span className="text-primary">[1]</span> Captura de fondos en multimoneda.</li>
                            <li className="flex gap-6"><span className="text-primary">[2]</span> Validación automática de IGTF (3%).</li>
                            <li className="flex gap-6"><span className="text-primary">[3]</span> Conciliación bancaria en T+0.</li>
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    );
}
