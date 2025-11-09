
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gavel, FileSignature, BookOpen, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const kpiData = [
    { title: "Contratos Activos", value: "42", icon: FileSignature },
    { title: "Trámites Pendientes", value: "8", icon: Clock },
    { title: "Documentos en Archivo", value: "256", icon: BookOpen },
];

const quickAccessModules = [
    { href: "/modelo-contrato", label: "Redactar Nuevo Contrato", icon: FileSignature },
    { href: "/poderes-representacion", label: "Gestionar Poderes", icon: Gavel },
    { href: "/recursos-fiscales", label: "Consultar Jurisprudencia", icon: BookOpen },
    { href: "/legalizacion-empresa", label: "Iniciar Trámite de Legalización", icon: Gavel },
];

const recentDocuments = [
    { title: "Contrato de Servicio con Cliente A", type: "Contrato", date: "Hace 2 horas" },
    { title: "Poder General para Socio B", type: "Poder", date: "Hace 1 día" },
    { title: "Acta de Asamblea Extraordinaria", type: "Documento Legal", date: "Hace 3 días" },
];

export default function EscritorioJuridicoPage() {
  return (
    <div className="space-y-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Gavel className="h-8 w-8" />
            Escritorio Jurídico
        </h1>
        <p className="text-muted-foreground mt-2">
          Centro de mando para la gestión legal y corporativa.
        </p>
      </header>

      {/* KPIs */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {kpiData.map(kpi => (
            <Card key={kpi.title} className="bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                    <kpi.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                </CardContent>
            </Card>
        ))}
      </div>

       <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Acceso Rápido a Módulos Legales</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
                {quickAccessModules.map((mod, index) => (
                    <Button key={index} asChild variant="outline" className="w-full justify-start h-16 text-base p-4">
                        <Link href={mod.href}>
                            <mod.icon className="mr-3 h-6 w-6"/>
                            {mod.label}
                        </Link>
                    </Button>
                ))}
            </CardContent>
        </Card>
         <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Documentos Recientes</CardTitle>
            </CardHeader>
            <CardContent>
                 <ul className="space-y-4">
                    {recentDocuments.map((doc, index) => (
                        <li key={index} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                            <FileText className="h-5 w-5 text-primary shrink-0" />
                            <div className="flex-1">
                                <p className="text-sm font-semibold truncate">{doc.title}</p>
                                <p className="text-xs text-muted-foreground">{doc.date}</p>
                            </div>
                            <Button size="sm" variant="ghost"><ArrowRight className="h-4 w-4"/></Button>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
