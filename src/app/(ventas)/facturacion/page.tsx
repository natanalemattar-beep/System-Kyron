
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, TabletSmartphone, CreditCard, Receipt, FilePlus, FileMinus, ShieldAlert, CheckCircle, Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const facturacionModules = [
    {
        title: "Punto de Venta (TPV)",
        description: "Interfaz rápida y visual para procesar ventas en tiempo real, integrada con el inventario y la facturación.",
        icon: TabletSmartphone,
        href: "/ventas/punto-de-venta"
    },
    {
        title: "Facturación a Crédito",
        description: "Gestiona ventas con financiamiento, controla las cuentas por cobrar y maneja plataformas como Cashea.",
        icon: CreditCard,
        href: "/ventas/facturacion-credito"
    },
    {
        title: "Facturas Proforma",
        description: "Crea y envía cotizaciones o facturas preliminares a tus clientes antes de la venta final.",
        icon: Receipt,
        href: "/ventas/proformas"
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
        title: "Validación Exitosa",
        description: "Se han corregido 3 discrepancias en RIF e IGTF.",
        action: <CheckCircle className="text-green-500 h-4 w-4" />
      });
    }, 2500);
  };

  return (
    <div className="space-y-8">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Centro de Facturación
        </h1>
        <p className="text-muted-foreground mt-2">
          Gestiona todo el ciclo de vida de tus documentos de venta, desde la cotización hasta el cobro.
        </p>
      </header>

      {/* Nueva Funcionalidad: Control Inteligente de Facturas */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Card className="bg-card/50 backdrop-blur-sm border-orange-500/20">
          <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-orange-500">
                <ShieldAlert className="h-5 w-5" />
                Control Inteligente de Facturas
              </CardTitle>
              <CardDescription>Auditoría preventiva de documentos fiscales.</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-2xl font-black">3</p>
                <p className="text-[10px] font-bold uppercase opacity-40">Alertas</p>
              </div>
              <Button 
                onClick={handleAutoCorrect} 
                disabled={isCorrecting}
                className="btn-3d-primary rounded-xl"
              >
                {isCorrecting ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Clock className="mr-2 h-4 w-4" />}
                Revisar y corregir automáticamente
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl">
                <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-2">Historial de Correcciones</p>
                <ul className="text-[10px] space-y-1 font-medium opacity-60">
                  <li>• Ajuste automático de IGTF en Factura #0045</li>
                  <li>• Validación de RIF inactivo para Cliente "Tech Solutions"</li>
                  <li>• Recalculación de base imponible en Nota #0012</li>
                </ul>
              </div>
              <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-center justify-center text-center">
                <div className="space-y-1">
                  <p className="text-xs font-black text-primary">REPORTE AL AGENTE FISCAL</p>
                  <p className="text-[10px] opacity-60">Todas las correcciones han sido notificadas al nodo de contabilidad.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {facturacionModules.map((module) => (
            <Card key={module.title} className="flex flex-col bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <module.icon className="h-6 w-6 text-primary" />
                        {module.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <CardDescription>{module.description}</CardDescription>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href={module.href}>
                            Acceder <ArrowRight className="ml-2 h-4 w-4"/>
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
