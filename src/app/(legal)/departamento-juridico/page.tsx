
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gavel, FileSignature, ShieldCheck, Scale, ArrowRight, Building, Network } from "lucide-react";
import Link from "next/link";

const responsabilidades = [
    {
        icon: FileSignature,
        titulo: "Gestión de Contratos",
        descripcion: "Redacción, revisión y administración de todos los contratos comerciales, laborales y de servicios.",
        href: "/modelo-contrato"
    },
    {
        icon: ShieldCheck,
        titulo: "Cumplimiento Normativo (Compliance)",
        descripcion: "Asegurar que la empresa opere dentro del marco legal vigente, incluyendo normativas del SENIAT, IVSS, y la Ley de Protección de Pensiones.",
        href: "/cumplimiento"
    },
    {
        icon: Scale,
        titulo: "Gestión de Litigios y Poderes",
        descripcion: "Manejo de disputas legales, coordinación con abogados externos y administración de los poderes de representación de la empresa.",
        href: "/poderes-representacion"
    },
    {
        icon: Building,
        titulo: "Asesoría Estratégica",
        descripcion: "Proporcionar orientación legal a la dirección sobre nuevas líneas de negocio, fusiones, adquisiciones y gestión de riesgos.",
        href: "/analisis-estrategico"
    },
    {
        icon: Network,
        titulo: "Holding y Estructura Organizativa",
        descripcion: "Gestionar la estructura de socios, empresas del holding y la organización de los departamentos clave para el cumplimiento y la operación.",
        href: "/poderes-representacion"
    }
];

export default function DepartamentoJuridicoPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Gavel className="h-8 w-8" />
            Departamento Jurídico
        </h1>
        <p className="text-muted-foreground mt-2">
          Centro de operaciones para la gestión legal, cumplimiento y estrategia corporativa.
        </p>
      </header>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {responsabilidades.map((item) => (
            <Card key={item.titulo} className="flex flex-col bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex-row items-start gap-4">
                     <div className="p-3 bg-primary/10 rounded-lg">
                        <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle>{item.titulo}</CardTitle>
                        <CardDescription className="pt-1">{item.descripcion}</CardDescription>
                    </div>
                </CardHeader>
                <CardFooter className="mt-auto">
                    <Button asChild className="w-full">
                        <Link href={item.href}>
                            Gestionar Módulo <ArrowRight className="ml-2"/>
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
