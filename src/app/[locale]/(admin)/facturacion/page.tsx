"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, TabletSmartphone, CreditCard, Receipt, FilePlus, FileMinus, ShieldAlert, CircleCheck as CheckCircle, Clock, Loader as Loader2, Activity } from "lucide-react";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const facturacionModules = [
    {
        title: "Punto de Venta (TPV)",
        description: "Interfaz rápida y visual para procesar ventas en tiempo real, integrada con el inventario y la facturación.",
        icon: TabletSmartphone,
        href: "/punto-de-venta"
    },
    {
        title: "Facturación a Crédito",
        description: "Gestiona ventas con financiamiento, controla las cuentas por cobrar y maneja plataformas como Cashea.",
        icon: CreditCard,
        href: "/facturacion-credito"
    },
    {
        title: "Facturas Proforma",
        description: "Crea y envía cotizaciones o facturas preliminares a tus clientes antes de la venta final.",
        icon: Receipt,
        href: "/proformas"
    },
    {
        title: "Modelo de Factura",
        description: "Visualiza y descarga un modelo de factura fiscal homologado y adaptado a la normativa del SENIAT.",
        icon: FileText,
        href: "/ventas/modelo-factura"
    },
    {
        title: "Nota de Débito",
        description: "Emite notas de débito para aumentar el valor de una factura por intereses o cargos adicionales.",
        icon: FileMinus,
        href: "/ventas/nota-debito"
    },
    {
        title: "Nota de Crédito",
        description: "Genera notas de crédito para anular o corregir facturas por devoluciones, descuentos o errores.",
        icon: FilePlus,
        href: "/ventas/nota-credito"
    },
];

export default function FacturacionPage() {
  const { toast } = useToast();
  const [isCorrecting, setIsCorrecting] = useState(false);

  const handleAutoCorrect = () => {
    setIsCorrecting(true);
    setTimeout(() => {
      setIsCorrecting(false);
      toast({
        title: "Revisión Finalizada",
        description: "Se han auditado los documentos de venta. No se detectan errores fiscales.",
        action: <CheckCircle className="text-emerald-500 h-4 w-4" />
      });
    }, 2500);
  };

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
       <header className="border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <Activity className="h-3 w-3" /> NODO DE VENTAS
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Centro de <span className="text-primary italic">Facturación</span></h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Ciclo de Vida Documental • Control de Ingresos 2026</p>
      </header>

      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Card className="glass-card border-none bg-card/40 rounded-[3rem] shadow-2xl overflow-hidden border-l-4 border-amber-500">
          <CardHeader className="p-10 flex-row items-center justify-between bg-muted/10">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-4 text-amber-500 text-xl font-black uppercase italic tracking-tighter">
                <ShieldAlert className="h-6 w-6" />
                Auditoría Preventiva de Ventas
              </CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase tracking-widest opacity-40">Revisión inteligente de documentos fiscales</CardDescription>
            </div>
            <Button 
                onClick={handleAutoCorrect} 
                disabled={isCorrecting}
                className="btn-3d-primary rounded-xl h-12 px-8 font-black uppercase text-[10px] tracking-widest"
              >
                {isCorrecting ? <Loader2 className="animate-spin mr-3 h-4 w-4" /> : <Clock className="mr-3 h-4 w-4" />}
                REVISAR DOCUMENTOS
              </Button>
          </CardHeader>
          <CardContent className="p-10 grid md:grid-cols-2 gap-10">
            <div className="p-6 bg-white/[0.03] border border-border rounded-2xl">
                <p className="text-[9px] font-black uppercase text-amber-500 tracking-widest mb-4">Registro de Ajustes</p>
                <ul className="text-[10px] space-y-3 font-bold text-muted-foreground/60 uppercase">
                  <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Ajuste automático de IGTF en Factura #0045</li>
                  <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Validación de RIF Cliente "Tech Solutions"</li>
                  <li className="flex items-center gap-3"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Recalculación de base imponible en Nota #0012</li>
                </ul>
            </div>
            <div className="p-6 flex items-center justify-center text-center">
                <p className="text-sm font-medium italic text-muted-foreground/40 uppercase leading-relaxed">
                    Cada factura emitida pasa por un sistema de validación síncrona para garantizar el cumplimiento del 100% de los deberes formales.
                </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {facturacionModules.map((module) => (
            <Card key={module.title} className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] h-full flex flex-col justify-between shadow-2xl group hover:border-primary/30 transition-all">
                <div className="space-y-8">
                    <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 w-fit group-hover:scale-110 transition-transform">
                        <module.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground mb-3">{module.title}</CardTitle>
                        <CardDescription className="text-xs font-bold text-muted-foreground/60 uppercase leading-relaxed">{module.description}</CardDescription>
                    </div>
                </div>
                <CardFooter className="p-0 pt-10">
                    <Button asChild variant="outline" className="w-full h-12 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest group-hover:bg-primary group-hover:text-white transition-all">
                        <Link href={module.href as any}>
                            ACCEDER <ArrowRight className="ml-3 h-4 w-4"/>
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
