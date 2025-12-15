
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, Landmark, Banknote, Percent, Shield, Stamp, Scale, ShieldCheck } from "lucide-react";
import Link from "next/link";

const tramites = [
    {
        title: "Declaración de IVA",
        description: "Prepara, declara y paga el Impuesto al Valor Agregado.",
        icon: FileText,
        href: "/admin/declaracion-iva"
    },
    {
        title: "Declaración Estimada (Personal)",
        description: "Genera y consulta los comprobantes de retención de ISLR (AR-C) de tus empleados.",
        icon: Banknote,
        href: "/admin/islr-arc"
    },
    {
        title: "Libro de Compras y Ventas",
        description: "Registra y consulta tus operaciones fiscales diarias exigidas por el SENIAT.",
        icon: Landmark,
        href: "/admin/libro-compra-venta"
    },
    {
        title: "Protección de Pensiones",
        description: "Declara y paga la contribución especial para la protección de las pensiones.",
        icon: Shield,
        href: "/admin/proteccion-pensiones"
    },
    {
        title: "IGTF y Exoneraciones",
        description: "Calcula el IGTF y consulta las operaciones exentas de IVA.",
        icon: Percent,
        href: "/admin/igtf"
    },
    {
        title: "Timbres Fiscales",
        description: "Estima el costo de los timbres fiscales para diversos trámites.",
        icon: Stamp,
        href: "/admin/timbres-fiscales"
    },
     {
        title: "Cumplimiento Fiscal",
        description: "Guía de soluciones administrativas homologadas para evitar sanciones.",
        icon: ShieldCheck,
        href: "/admin/cumplimiento-fiscal"
    },
    {
        title: "Recursos Fiscales y Gacetas",
        description: "Consulta jurisprudencia, gacetas, leyes y providencias administrativas.",
        icon: Scale,
        href: "/admin/recursos-fiscales"
    }
];

export default function TramitesFiscalesPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Centro de Trámites Fiscales
        </h1>
        <p className="text-muted-foreground mt-2">
          Accede a todos los módulos de gestión de impuestos y obligaciones tributarias desde un solo lugar.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tramites.map((tramite) => (
            <Card key={tramite.title} className="flex flex-col bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <tramite.icon className="h-6 w-6 text-primary" />
                        {tramite.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <CardDescription>{tramite.description}</CardDescription>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full">
                        <Link href={tramite.href}>
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
