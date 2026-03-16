
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, PlusCircle, CheckCircle, FileText, Activity, Terminal, Ship } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function MinisterioComercioExteriorPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Globe className="h-3 w-3" /> NODO EXPORTADOR
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Comercio <span className="text-primary italic">Exterior</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Registro de Exportadores y Promoción de Inversiones • 2026</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    NUEVA EXPORTACIÓN
                </Button>
            </header>

            <div className="grid gap-8 md:grid-cols-3">
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Ship className="h-16 w-16" /></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Registro RUSAD</p>
                    <p className="text-3xl font-black italic text-foreground tracking-tighter">ACTIVO</p>
                </Card>
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Globe className="h-16 w-16" /></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Destinos Autorizados</p>
                    <p className="text-3xl font-black italic text-foreground tracking-tighter">12 PAÍSES</p>
                </Card>
                <Card className="glass-card border-none bg-emerald-500/5 p-8 rounded-[2.5rem] shadow-xl border-l-4 border-emerald-500">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/60 mb-4">Incentivos Fiscales</p>
                    <p className="text-3xl font-black italic text-emerald-500 tracking-tighter">APLICADOS</p>
                </Card>
            </div>

            <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl mt-10">
                <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Dossier para Exportación</CardTitle>
                </CardHeader>
                <CardContent className="p-10">
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Documentación Base</h4>
                            <ul className="space-y-4">
                                {["Certificado de Origen", "Factura Comercial Internacional", "Lista de Empaque", "Certificación Sanitaria (si aplica)"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-foreground/60">
                                        <CheckCircle className="h-4 w-4 text-primary" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-border shadow-inner">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-6 flex items-center gap-3 italic">
                                <Terminal className="h-4 w-4" /> Validación Kyron Port
                            </h4>
                            <p className="text-[10px] font-bold text-muted-foreground/60 uppercase leading-relaxed text-justify">
                                "El motor de comercio exterior valida síncronamente los códigos arancelarios contra el sistema armonizado de la OMA para garantizar el 0% de errores en aduana."
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
