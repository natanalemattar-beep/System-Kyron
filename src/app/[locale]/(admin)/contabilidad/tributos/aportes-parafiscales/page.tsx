
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Calculator, Activity, Landmark, Percent, Zap, Building2, Terminal, Download, ClipboardList, Copy, CircleCheck as CheckCircle2, Clock, TriangleAlert as AlertTriangle, ArrowLeft, HeartPulse, UserX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/navigation";
import { cn, formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const parafiscales = [
    { 
        id: "ivss", 
        name: "IVSS (Seguro Social)", 
        logo: Landmark, 
        rates: { patronal: "9% - 11%", empleado: "4%" }, 
        base: "Tope: 5 Salarios Mínimos", 
        legal: "Ley del Seguro Social",
        bank: "Banco de Venezuela",
        account: "0102-0345-67-8901234567",
        rif: "G-20000001-0",
        documents: ["Planilla 14-02", "Copia RIF", "Registro Mercantil", "Cédula Representante"],
        color: "text-blue-500", 
        bg: "bg-blue-500/10",
        status: "Activo"
    },
    { 
        id: "faov", 
        name: "FAOV (Vivienda)", 
        logo: Activity, 
        rates: { patronal: "2%", empleado: "1%" }, 
        base: "Salario Integral (Sin tope)", 
        legal: "Ley de Vivienda",
        bank: "Banesco",
        account: "0134-0001-22-0000987654",
        rif: "G-20000002-0",
        documents: ["Registro en BANAVIH", "Nómina Mensual", "Comprobante de Pago"],
        color: "text-emerald-500", 
        bg: "bg-emerald-500/10",
        status: "Activo"
    },
    { 
        id: "inces", 
        name: "INCES (Capacitación)", 
        logo: ShieldCheck, 
        rates: { patronal: "2%", empleado: "0.5%" }, 
        base: "Nómina (5+ empleados)", 
        legal: "Ley del INCES",
        bank: "Mercantil",
        account: "0105-0001-22-0000112233",
        rif: "G-20000003-0",
        documents: ["Inscripción INCES", "Listado de Aprendices", "Declaración Trimestral"],
        color: "text-amber-500", 
        bg: "bg-amber-500/10",
        status: "Activo"
    },
    { 
        id: "paro_forzoso", 
        name: "Paro Forzoso", 
        logo: UserX, 
        rates: { patronal: "2%", empleado: "0.5%" }, 
        base: "Tope: 10 Salarios Mínimos", 
        legal: "Ley del Régimen Prestacional de Empleo",
        bank: "Banco de Venezuela",
        account: "0102-0345-67-8901234567",
        rif: "G-20000001-0",
        documents: ["Planilla de Egreso", "Registro de Empresa", "Listado de Cotizantes"],
        color: "text-rose-500", 
        bg: "bg-rose-500/10",
        status: "Activo"
    },
    { 
        id: "lopcymat", 
        name: "LOPCYMAT (Salud Laboral)", 
        logo: HeartPulse, 
        rates: { patronal: "0.75% - 10%", empleado: "0%" }, 
        base: "Nómina Mensual s/riesgo", 
        legal: "LOPCYMAT",
        bank: "Banco de Venezuela (INPSASEL)",
        account: "0102-0001-22-0000777888",
        rif: "G-20000004-0",
        documents: ["Registro INPSASEL", "Programa de Seguridad", "Delegados de Prevención"],
        color: "text-purple-500", 
        bg: "bg-purple-500/10",
        status: "Activo"
    }
];

export default function AportesParafiscalesPage() {
    const { toast } = useToast();
    const [selectedTab, setSelectedTab] = useState("ivss");

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "COPIADO",
            description: `${label} al portapapeles.`,
        });
    };

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Building2 className="h-3 w-3" /> NODO DE SEGURIDAD SOCIAL
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Aportes <span className="text-primary italic">Parafiscales</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">IVSS • FAOV • INCES • PARO FORZOSO • LOPCYMAT • 2026</p>
                </div>
                <Button variant="ghost" asChild className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary">
                    <Link href="/contabilidad/tributos"><ArrowLeft className="mr-2 h-4 w-4" /> VOLVER AL HUB</Link>
                </Button>
            </header>

            <Tabs defaultValue="ivss" onValueChange={setSelectedTab} className="w-full">
                <TabsList className="flex h-16 bg-white border border-border rounded-[2rem] p-2 mb-12 shadow-inner overflow-x-auto no-scrollbar">
                    {parafiscales.map(p => (
                        <TabsTrigger key={p.id} value={p.id} className="flex-1 rounded-2xl font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all min-w-[120px]">
                            {p.name.split(' (')[0]}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {parafiscales.map(p => (
                    <TabsContent key={p.id} value={p.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid gap-10 lg:grid-cols-12">
                            {/* Información Técnica */}
                            <div className="lg:col-span-7 space-y-10">
                                <Card className="glass-card border-none rounded-[3rem] bg-white p-10 shadow-2xl">
                                    <div className="flex justify-between items-start mb-10">
                                        <div className="flex items-center gap-6">
                                            <div className={cn("p-5 rounded-[2rem] border border-border shadow-inner", p.bg)}>
                                                <p.logo className={cn("h-8 w-8", p.color)} />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black uppercase italic tracking-tight text-slate-800">{p.name}</h3>
                                                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">{p.legal}</p>
                                            </div>
                                        </div>
                                        <Badge className="bg-emerald-500/20 text-emerald-400 border-none h-7 px-4 text-[9px] font-black uppercase tracking-widest">{p.status}</Badge>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-10">
                                        <div className="space-y-6">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Tasas Vigentes</h4>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                                                    <span className="text-[9px] font-bold text-slate-500 uppercase">Patronal</span>
                                                    <span className="text-sm font-black text-slate-800">{p.rates.patronal}</span>
                                                </div>
                                                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                                                    <span className="text-[9px] font-bold text-slate-500 uppercase">Empleado</span>
                                                    <span className="text-sm font-black text-slate-800">{p.rates.empleado}</span>
                                                </div>
                                                <div className="pt-2">
                                                    <p className="text-[8px] font-black text-primary uppercase tracking-widest mb-1">Base de Cálculo</p>
                                                    <p className="text-xs font-bold text-slate-600">{p.base}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Requisitos de Inscripción</h4>
                                            <ul className="space-y-3">
                                                {p.documents.map((doc, i) => (
                                                    <li key={i} className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase leading-snug">
                                                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" /> {doc}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-10 pt-10 border-t border-slate-100">
                                        <Button className="w-full h-14 rounded-2xl btn-3d-primary font-black uppercase text-[10px] tracking-widest shadow-xl" onClick={async () => { try { const res = await fetch('/api/solicitudes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categoria: 'tributos', subcategoria: 'registro_parafiscal', descripcion: 'Solicitud de trámite de registro parafiscal' }) }); if (res.ok) toast({ title: "TRÁMITE INICIADO", description: "Su solicitud de registro parafiscal ha sido recibida. Un asesor le contactará." }); else toast({ title: "Error", description: "No se pudo registrar", variant: "destructive" }); } catch { toast({ title: "Error de conexión", variant: "destructive" }); } }}>INICIAR TRÁMITE DE REGISTRO</Button>
                                    </div>
                                </Card>
                            </div>

                            {/* Datos de Pago y Gestión */}
                            <div className="lg:col-span-5 space-y-10">
                                <Card className="glass-card border-none rounded-[3rem] bg-[#0A2472] p-10 text-white shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Landmark className="h-32 w-32" /></div>
                                    <div className="relative z-10 space-y-8">
                                        <h3 className="text-xl font-black uppercase italic tracking-tight text-[#00A86B]">Datos de Liquidación</h3>
                                        
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-40">Banco Receptor</p>
                                                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 group/item">
                                                    <span className="text-xs font-bold uppercase">{p.bank}</span>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={() => copyToClipboard(p.bank, "Banco")}><Copy className="h-3 w-3" /></Button>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-40">Nro. de Cuenta</p>
                                                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 group/item">
                                                    <span className="text-xs font-mono font-bold">{p.account}</span>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={() => copyToClipboard(p.account, "Cuenta")}><Copy className="h-3 w-3" /></Button>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-40">RIF del Ente</p>
                                                <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 group/item">
                                                    <span className="text-xs font-mono font-bold">{p.rif}</span>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={() => copyToClipboard(p.rif, "RIF")}><Copy className="h-3 w-3" /></Button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 bg-black/40 rounded-[2rem] border border-white/5 flex flex-col items-center gap-4 text-center">
                                            <p className="text-[10px] font-black text-[#00A86B] uppercase tracking-widest italic">Autorización de Pago</p>
                                            <Button variant="secondary" className="w-full bg-white text-[#0A2472] font-black uppercase text-[9px] tracking-widest h-12 rounded-xl shadow-xl" onClick={async () => { try { const res = await fetch('/api/solicitudes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categoria: 'tributos', subcategoria: 'pago_parafiscal_wallet', descripcion: 'Pago parafiscal con Kyron Wallet' }) }); if (res.ok) toast({ title: "KYRON WALLET", description: "Sincronizando con billetera digital. Recibirá confirmación por correo." }); else toast({ title: "Error", description: "No se pudo procesar", variant: "destructive" }); } catch { toast({ title: "Error de conexión", variant: "destructive" }); } }}>PAGAR CON KYRON WALLET</Button>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="glass-card border-none rounded-[2.5rem] bg-white p-8 shadow-xl">
                                    <div className="flex items-center gap-4 mb-6">
                                        <Clock className="h-6 w-6 text-amber-500 animate-pulse" />
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-800">Próxima Renovación</h4>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase">Última:</span>
                                            <span className="text-xs font-black text-slate-600">15/01/2024</span>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase">Vencimiento:</span>
                                            <span className="text-sm font-black text-primary italic">15/01/2025</span>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                ))}
            </Tabs>

            <Card className="glass-card border-none p-10 rounded-[3rem] bg-white/[0.02] shadow-2xl mt-10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-10 flex items-center gap-3 italic">
                    <Terminal className="h-4 w-4" /> Telemetría de Cumplimiento Proactiva
                </h4>
                <p className="text-xs font-bold text-muted-foreground/60 leading-relaxed uppercase max-w-3xl">
                    System Kyron audita cada aporte calculado contra la nómina activa para garantizar la solvencia absoluta ante el Ministerio del Trabajo y el IVSS. El sistema genera los archivos de carga masiva (.txt / .csv) para los portales oficiales de forma síncrona.
                </p>
            </Card>
        </div>
    );
}
