
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, Landmark, Banknote, Percent, ShieldCheck, Stamp, Scale, Activity, Zap } from "lucide-react";
import { Link } from "@/navigation";
import { motion } from "framer-motion";

const tramites = [
    { title: "Declaración de IVA", desc: "Liquidación mensual de débito y crédito fiscal.", icon: FileText, href: "/declaracion-iva" },
    { title: "Comprobantes AR-C", desc: "Generación de retenciones de ISLR de personal.", icon: Banknote, href: "/islr-arc" },
    { title: "Libros Fiscales", desc: "Registro diario bajo Providencia 0071.", icon: Landmark, href: "/libro-compra-venta" },
    { title: "IGTF y Exoneraciones", desc: "Cálculo del 3% y gestión de Gaceta 6.952.", icon: Percent, href: "/gaceta-6952" },
    { title: "Timbres Fiscales", desc: "Estimación de tasas para trámites oficiales.", icon: Stamp, href: "/permisos" },
    { title: "Cero Riesgo Fiscal", desc: "Auditoría preventiva y blindaje preventivo.", icon: ShieldCheck, href: "/zero-risk" }
];

export default function TramitesFiscalesPage() {
  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <Scale className="h-3 w-3" /> NODO DE CUMPLIMIENTO
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Trámites <span className="text-primary italic">Fiscales</span></h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Oficina Virtual de Impuestos • Sincronización SENIAT 2026</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tramites.map((tramite, i) => (
            <motion.div key={tramite.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] h-full flex flex-col justify-between shadow-2xl group hover:border-primary/30">
                    <div className="space-y-6">
                        <div className="p-4 bg-primary/10 rounded-2xl w-fit border border-primary/20 group-hover:scale-110 transition-transform">
                            <tramite.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-black uppercase italic tracking-tight text-foreground mb-2">{tramite.title}</CardTitle>
                            <CardDescription className="text-xs font-bold text-muted-foreground/60 uppercase leading-relaxed">{tramite.desc}</CardDescription>
                        </div>
                    </div>
                    <CardFooter className="p-0 pt-10">
                        <Button asChild variant="outline" className="w-full h-12 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest group-hover:bg-primary group-hover:text-white transition-all">
                            <Link href={tramite.href as any}>
                                Iniciar Gestión <ArrowRight className="ml-3 h-4 w-4" />
                            </Link>
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
                <h3 className="text-3xl font-black uppercase italic tracking-tight">Asistente de Auditoría 24/7</h3>
                <p className="text-lg font-medium opacity-90 italic leading-relaxed">Active el supervisor IA para validar cada transacción en tiempo real y evitar multas por errores de forma o fondo.</p>
                <Button variant="secondary" className="h-14 px-10 rounded-2xl bg-white text-primary font-black uppercase text-xs tracking-widest shadow-2xl">ACTIVAR PROTECCIÓN</Button>
            </div>
            <div className="hidden md:flex justify-center">
                <Activity className="h-40 w-40 text-white/20 animate-pulse" />
            </div>
        </div>
      </Card>
    </div>
  );
}
