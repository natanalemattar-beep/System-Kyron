
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleCheck as CheckCircle, CreditCard, Banknote, Smartphone, Globe, ShieldCheck, Activity, Terminal, Wallet, Building2, Landmark, DollarSign, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const paymentGateways = [
    {
        name: "PayPal",
        description: "Cobros y pagos internacionales. Ideal para clientes en el exterior y freelancers venezolanos.",
        fees: "3.49% + $0.49 por transacción",
        status: "Configurado",
        icon: Globe,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        borderColor: "border-blue-500/20",
        currencies: ["USD", "EUR", "GBP"],
    },
    {
        name: "Zinli",
        description: "Billetera digital venezolana para pagos rápidos en USD sin comisiones internas.",
        fees: "0% transferencias internas",
        status: "Activo",
        icon: Wallet,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        borderColor: "border-emerald-500/20",
        currencies: ["USD"],
    },
    {
        name: "Zelle",
        description: "Transferencias bancarias instantáneas desde cuentas en EE.UU. Sin comisiones.",
        fees: "0% (Comisión cero)",
        status: "Activo",
        icon: DollarSign,
        color: "text-violet-500",
        bg: "bg-violet-500/10",
        borderColor: "border-violet-500/20",
        currencies: ["USD"],
    },
    {
        name: "Pago Móvil / C2P",
        description: "Liquidación inmediata para el mercado nacional. Todos los bancos de Venezuela conectados.",
        fees: "0% (Comisión bancaria base)",
        status: "Activo",
        icon: Smartphone,
        color: "text-primary",
        bg: "bg-primary/10",
        borderColor: "border-primary/20",
        currencies: ["VES"],
    },
    {
        name: "Transferencia Bancaria VE",
        description: "Transferencias entre cuentas nacionales. BdV, Banesco, Mercantil, Provincial, BNC, BOD.",
        fees: "0% (Sin comisión)",
        status: "Activo",
        icon: Landmark,
        color: "text-cyan-500",
        bg: "bg-cyan-500/10",
        borderColor: "border-cyan-500/20",
        currencies: ["VES"],
    },
    {
        name: "Binance Pay / Cripto",
        description: "Pagos en criptomonedas: USDT, USDC, BTC. Conversión automática a VES o USD.",
        fees: "0.5% conversión cripto",
        status: "Configurado",
        icon: Zap,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        borderColor: "border-amber-500/20",
        currencies: ["USDT", "USDC", "BTC"],
    },
    {
        name: "Tarjeta Débito/Crédito",
        description: "Visa, MasterCard, AMEX en bolívares o divisas. POS físico y virtual integrado.",
        fees: "2.5% + IVA (nacional)",
        status: "Activo",
        icon: CreditCard,
        color: "text-rose-500",
        bg: "bg-rose-500/10",
        borderColor: "border-rose-500/20",
        currencies: ["VES", "USD"],
    },
    {
        name: "Kyron Digital Wallet",
        description: "Transferencias internas inmediatas entre nodos del ecosistema sin fricción.",
        fees: "0% Transferencia interna",
        status: "Primario",
        icon: ShieldCheck,
        color: "text-primary",
        bg: "bg-primary/10",
        borderColor: "border-primary/20",
        currencies: ["VES", "USD", "EUR"],
    },
];

const bancosVenezuela = [
    { nombre: "Banco de Venezuela", codigo: "0102", tipo: "Universal" },
    { nombre: "Banesco", codigo: "0134", tipo: "Universal" },
    { nombre: "Mercantil", codigo: "0105", tipo: "Universal" },
    { nombre: "BBVA Provincial", codigo: "0108", tipo: "Universal" },
    { nombre: "BNC", codigo: "0191", tipo: "Comercial" },
    { nombre: "BOD", codigo: "0116", tipo: "Universal" },
    { nombre: "Bancaribe", codigo: "0128", tipo: "Universal" },
    { nombre: "Banco Exterior", codigo: "0115", tipo: "Universal" },
    { nombre: "Banco Plaza", codigo: "0138", tipo: "Comercial" },
    { nombre: "Banco Caroní", codigo: "0128", tipo: "Microfinanzas" },
    { nombre: "Bancrecer", codigo: "0168", tipo: "Microfinanzas" },
    { nombre: "BanFANB", codigo: "0177", tipo: "Especial" },
];

export default function PasarelasDePagoPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                    <CreditCard className="h-3 w-3" /> NODO DE LIQUIDACIÓN
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Pasarelas <span className="text-primary italic">de Pago</span></h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Omnicanalidad Financiera • PayPal · Zinli · Zelle · Pago Móvil · Bancos VE · Cripto</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {paymentGateways.map((gateway, i) => (
                    <motion.div key={gateway.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                        <Card className={`glass-card border bg-card/40 p-8 rounded-[2rem] h-full flex flex-col justify-between shadow-xl relative overflow-hidden group ${gateway.borderColor}`}>
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:rotate-12 transition-transform duration-1000"><gateway.icon className="h-20 w-20" /></div>
                            <div className="space-y-5 relative z-10">
                                <div className="flex justify-between items-start">
                                    <div className={`p-3 rounded-2xl border ${gateway.bg} ${gateway.borderColor}`}>
                                        <gateway.icon className={`h-5 w-5 ${gateway.color}`} />
                                    </div>
                                    <Badge className={`${gateway.bg} ${gateway.color} border-none text-[7px] font-black uppercase px-2`}>{gateway.status}</Badge>
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-black uppercase italic tracking-tighter mb-1">{gateway.name}</CardTitle>
                                    <CardDescription className="text-[10px] font-bold text-muted-foreground/60 uppercase leading-relaxed">{gateway.description}</CardDescription>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {gateway.currencies.map(c => (
                                        <span key={c} className={`text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest ${gateway.bg} ${gateway.color}`}>{c}</span>
                                    ))}
                                </div>
                                <div className="pt-4 border-t border-border/30">
                                    <p className="text-[8px] font-black uppercase text-muted-foreground/40 tracking-widest mb-1">Comisión</p>
                                    <p className="text-xs font-mono font-bold text-foreground/80">{gateway.fees}</p>
                                </div>
                            </div>
                            <CardFooter className="p-0 pt-6 mt-auto">
                                <Button variant="outline" className={`w-full h-11 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest ${gateway.color}`} onClick={() => toast({ title: `${gateway.name.toUpperCase()} CONFIGURADO`, description: `Pasarela ${gateway.name} activa y lista para recibir pagos.` })}>
                                    Configurar Nodo
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <Card className="glass-card border-none bg-card/40 rounded-[3rem] overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                            <Landmark className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Entidades Bancarias Conectadas</CardTitle>
                            <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest mt-1">Red de Bancos Venezolanos • Pago Móvil & Transferencias</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-10">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {bancosVenezuela.map((banco, i) => (
                            <motion.div key={banco.codigo + banco.nombre} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}>
                                <div className="p-5 rounded-2xl bg-white/[0.03] border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all group cursor-default">
                                    <div className="flex items-center justify-between mb-3">
                                        <Building2 className="h-4 w-4 text-primary/60 group-hover:text-primary transition-colors" />
                                        <span className="text-[7px] font-black text-muted-foreground/40 uppercase tracking-widest font-mono">{banco.codigo}</span>
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-tight text-foreground/80">{banco.nombre}</p>
                                    <p className="text-[8px] font-bold text-muted-foreground/40 uppercase mt-1">{banco.tipo}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="glass-card border-none bg-white/[0.02] p-12 rounded-[4rem] relative overflow-hidden shadow-2xl">
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
                            <li className="flex gap-6"><span className="text-primary">[1]</span> Captura de fondos multimoneda: VES, USD, EUR, USDT.</li>
                            <li className="flex gap-6"><span className="text-primary">[2]</span> Validación automática de IGTF (3%) en operaciones en divisas.</li>
                            <li className="flex gap-6"><span className="text-primary">[3]</span> Conciliación bancaria automática en T+0.</li>
                            <li className="flex gap-6"><span className="text-primary">[4]</span> PayPal / Zinli / Zelle acreditados con tasa BCV del día.</li>
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    );
}
