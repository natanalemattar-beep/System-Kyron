
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Landmark, FileText, Banknote, Percent, 
    ShieldCheck, Calendar, Gavel, History,
    ArrowRight, Activity, Zap, Bot, CreditCard,
    Building2, Users, Printer, FolderArchive
} from "lucide-react";
import { Link } from "@/navigation";
import { motion } from "framer-motion";

const tributosModules = [
    { title: "Seguridad Social", desc: "IVSS, FAOV, INCES y LOPCYMAT.", icon: Users, href: "/contabilidad/tributos/aportes-parafiscales" },
    { title: "Protección Pensiones", desc: "Contribución del 9% (G.O. 6.806).", icon: ShieldCheck, href: "/contabilidad/tributos/proteccion-pensiones" },
    { title: "Retenciones ISLR", desc: "Honorarios, arrendamientos y más.", icon: Banknote, href: "/contabilidad/tributos/retenciones-islr" },
    { title: "Retenciones IVA", desc: "Control de agentes y el 75%.", icon: Percent, href: "/contabilidad/tributos/retenciones-iva" },
    { title: "Impuesto IGTF", desc: "Gestión del 3% en divisas.", icon: CreditCard, href: "/contabilidad/tributos/igtf" },
    { title: "Impuestos Municipales", desc: "Actividad económica y patentes.", icon: Building2, href: "/contabilidad/tributos/municipales" },
    { title: "Calendario Fiscal 2026", desc: "Vencimientos por terminal RIF.", icon: Calendar, href: "/contabilidad/tributos/calendario-fiscal" },
    { title: "Multas y Sanciones", desc: "Simulador de riesgos según COT.", icon: Gavel, href: "/contabilidad/tributos/multas" },
    { title: "Homologación SENIAT", desc: "Control de equipos fiscales.", icon: Printer, href: "/contabilidad/tributos/homologacion" },
    { title: "Archivo Maestro", desc: "Dossier histórico de declaraciones.", icon: FolderArchive, href: "/contabilidad/tributos/declaraciones-anteriores" },
];

export default function TributosHubPage() {
  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <Landmark className="h-3 w-3" /> ÁREA TRIBUTARIA
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Gestión <span className="text-primary italic">de Tributos</span></h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Oficina Virtual de Impuestos y Parafiscales • 2026</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tributosModules.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] h-full flex flex-col justify-between shadow-2xl group hover:border-primary/30 transition-all">
                    <div className="space-y-6">
                        <div className="p-4 bg-primary/10 rounded-2xl w-fit border border-primary/20 group-hover:scale-110 transition-transform">
                            <item.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-black uppercase italic tracking-tighter text-foreground mb-2 leading-tight">{item.title}</CardTitle>
                            <CardDescription className="text-[10px] font-bold text-muted-foreground/60 uppercase leading-relaxed">{item.desc}</CardDescription>
                        </div>
                    </div>
                    <CardFooter className="p-0 pt-10">
                        <Button asChild variant="outline" className="w-full h-12 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest group-hover:bg-primary group-hover:text-white transition-all">
                            <Link href={item.href as any}>GESTIONAR <ArrowRight className="ml-3 h-4 w-4" /></Link>
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        ))}
      </div>

      <Card className="bg-primary text-primary-foreground rounded-[3rem] p-12 relative overflow-hidden shadow-glow border-none group mt-10">
        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Zap className="h-48 w-48" /></div>
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-tight">Blindaje Fiscal Automático</h3>
                <p className="text-lg font-medium opacity-90 italic leading-relaxed">System Kyron audita cada factura y aporte parafiscal en tiempo real, garantizando el cumplimiento del 100% de las obligaciones legales venezolanas.</p>
                <Button variant="secondary" className="h-14 px-10 rounded-2xl bg-white text-primary font-black uppercase text-xs tracking-widest shadow-2xl" onClick={() => alert("Asistente Fiscal IA Activado")}>ACTIVAR SUPERVISOR</Button>
            </div>
            <div className="hidden md:flex justify-center">
                <ShieldCheck className="h-40 w-40 text-white/20 animate-pulse" />
            </div>
        </div>
      </Card>
    </div>
  );
}
