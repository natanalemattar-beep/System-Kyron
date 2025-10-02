
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Briefcase, DollarSign, ArrowRight, Landmark } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const fundamentosNomina = [
    { title: "Marco Legal", description: "Basado en la LOTTT y las providencias del SENIAT para garantizar el cumplimiento." },
    { title: "Períodos de Pago", description: "Configurado para pagos quincenales, cumpliendo con el estándar legal venezolano." },
    { title: "Deducciones Obligatorias", description: "Cálculo automático de SSO, RPE (Paro Forzoso), FAOV (LPH) e INCES." },
];

const softwareFeatures = [
    { title: "Gestión de Personal", description: "Centraliza los datos de todos los empleados en un solo lugar." },
    { title: "Procesamiento de Nómina", description: "Automatiza el cálculo de sueldos, bonos y deducciones." },
    { title: "Gestión de Tiempo y Asistencia", description: "Controla las horas trabajadas, extras y ausencias." },
    { title: "Reclutamiento (ATS)", description: "Sistema de seguimiento de candidatos para optimizar la contratación." },
    { title: "Gestión del Desempeño", description: "Evalúa el rendimiento y establece objetivos de crecimiento." },
    { title: "Analítica y Reportes", description: "Dashboards en tiempo real para la toma de decisiones estratégicas." },
];

const serviciosOfertados = [
    { title: "Outsourcing Completo de Nómina", description: "Delegue todo el proceso de nómina, desde la recopilación de datos hasta la declaración de impuestos." },
    { title: "Consultoría y Asesoría en RRHH", description: "Reciba orientación experta en legislación laboral, transformación de procesos y movilidad global." },
    { title: "Soporte y Cumplimiento Continuo", description: "Garantice que su sistema esté siempre actualizado con las últimas regulaciones y reciba soporte técnico." },
];

const pricingPlans = [
    { plan: "Business", precio: "40-60", usuarios: "50-500", features: "Gestión de RRHH y nómina." },
    { plan: "Enterprise", precio: "60-80", usuarios: "500+", features: "Funciones avanzadas e integración de datos." },
];

export default function RecursosHumanosPage() {
  return (
    <div className="space-y-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Users className="h-8 w-8" />
            Dashboard de Recursos Humanos y Nómina
        </h1>
        <p className="text-muted-foreground mt-2">
          Visión general de los servicios, características y fundamentos legales para la gestión de personal en Venezuela.
        </p>
      </header>

      {/* Fundamentos de la Nómina */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="flex items-center gap-3"><Landmark className="h-6 w-6 text-primary"/>Fundamentos de la Nómina en Venezuela 🇻🇪</CardTitle>
            <CardDescription>Elementos clave que nuestro sistema maneja para garantizar el cumplimiento legal.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fundamentosNomina.map(item => (
                <div key={item.title} className="p-4 bg-secondary rounded-lg">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
            ))}
        </CardContent>
      </Card>

      {/* Características del Software */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Módulos y Características del Sistema</CardTitle>
            <CardDescription>Un ecosistema completo para la gestión del talento humano.</CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="space-y-3">
                {softwareFeatures.map(feature => (
                    <li key={feature.title} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                        <div>
                            <h4 className="font-medium">{feature.title}</h4>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </CardContent>
      </Card>
      
       {/* Servicios Ofertados */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Nuestra Oferta de Servicios</CardTitle>
            <CardDescription>Nos adaptamos a las necesidades de tu empresa, desde la externalización completa hasta la asesoría estratégica.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6">
            {serviciosOfertados.map(service => (
                 <Card key={service.title} className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                    </CardContent>
                </Card>
            ))}
        </CardContent>
      </Card>

       {/* Planes y Precios */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="flex items-center gap-3"><DollarSign className="h-6 w-6 text-primary"/>Planes y Precios</CardTitle>
            <CardDescription>Modelos de precios transparentes y escalables. Contacta con nosotros para una cotización detallada de implementación y soporte.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Plan</TableHead>
                        <TableHead>Precio (USD/mes)</TableHead>
                        <TableHead>Nro. de Usuarios</TableHead>
                        <TableHead>Características Principales</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pricingPlans.map(plan => (
                        <TableRow key={plan.plan}>
                            <TableCell className="font-bold">{plan.plan}</TableCell>
                            <TableCell>${plan.precio}</TableCell>
                            <TableCell>{plan.usuarios}</TableCell>
                            <TableCell>{plan.features}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline">
                                    Solicitar Plan <ArrowRight className="ml-2 h-4 w-4"/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
