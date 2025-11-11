
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building, Eye, PlusCircle, Download, BookOpen, HandCoins, ShoppingCart, Gavel, DollarSign, TrendingUp, BarChart, Rocket, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

const holdingData = [
    { id: 1, nombre: "Ana Pérez", rol: "Socio / Director", cedula: "V-12.345.678", participacion: "50%" },
    { id: 2, nombre: "Luis Gómez", rol: "Socio / Director", cedula: "V-18.765.432", participacion: "50%" },
];

const holdingCompanies = [
    { id: 1, nombre: "Empresa Filial A, C.A.", rif: "J-23456789-0", rol: "Subsidiaria", jurisdiccion: "Nacional" },
    { id: 2, nombre: "Servicios Integrados B, S.A.", rif: "J-34567890-1", rol: "Aliada Estratégica", jurisdiccion: "Nacional" },
    { id: 3, nombre: "International Holdings LLC", rif: "N/A", rol: "Casa Matriz", jurisdiccion: "Internacional" },
];

const kpiData = [
    { title: "Ingresos Consolidados (YTD)", value: formatCurrency(1250000, 'Bs.'), icon: DollarSign },
    { title: "Margen Neto Consolidado", value: "18.5%", icon: TrendingUp },
    { title: "Activos Totales del Holding", value: formatCurrency(2800000, 'Bs.'), icon: BarChart },
];


export default function DashboardSociosPage() {

    return (
        <div className="space-y-12">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <Users className="h-8 w-8" />
                    Dashboard de Socios y Holding
                </h1>
                <p className="text-muted-foreground mt-2">
                    Visión general de la estructura de propiedad, empresas del grupo y acceso a todos los módulos del sistema.
                </p>
            </header>
            
            {/* KPIs Consolidados */}
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

            <Card className="bg-primary/10 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-primary"><Rocket/>Planes de Crecimiento</CardTitle>
                    <CardDescription>
                       Accede a la hoja de ruta estratégica con las iniciativas clave para la expansión y rentabilidad de la empresa.
                    </CardDescription>
                </CardHeader>
                 <CardFooter>
                    <Button asChild>
                        <Link href="/planes-crecimiento">
                            Ver Planes de Crecimiento <ArrowRight className="ml-2"/>
                        </Link>
                    </Button>
                </CardFooter>
            </Card>


             <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building className="h-6 w-6 text-primary" />
                        Visión General del Sistema
                    </CardTitle>
                    <CardDescription>
                       Acceso y descarga de reportes consolidados de todos los departamentos y módulos del sistema.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <QuickAccess />
                </CardContent>
            </Card>


            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-6 w-6 text-primary" />
                        Holding de Representantes y Socios
                    </CardTitle>
                    <CardDescription>
                        Detalle de la participación accionaria de los representantes legales y socios.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Rol</TableHead>
                                <TableHead>Cédula / RIF</TableHead>
                                <TableHead className="text-right">Participación (%)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {holdingData.map((socio) => (
                                <TableRow key={socio.id}>
                                    <TableCell className="font-medium">{socio.nombre}</TableCell>
                                    <TableCell>{socio.rol}</TableCell>
                                    <TableCell>{socio.cedula}</TableCell>
                                    <TableCell className="text-right font-semibold">{socio.participacion}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building className="h-6 w-6 text-primary" />
                        Listado de Empresas del Holding
                    </CardTitle>
                    <CardDescription>
                        Detalle de las empresas que componen el holding y acceso a sus estados financieros.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Razón Social</TableHead>
                                <TableHead>RIF</TableHead>
                                <TableHead>Rol en el Holding</TableHead>
                                <TableHead>Jurisdicción</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {holdingCompanies.map((company) => (
                                <TableRow key={company.id}>
                                    <TableCell className="font-medium">{company.nombre}</TableCell>
                                    <TableCell>{company.rif}</TableCell>
                                    <TableCell>{company.rol}</TableCell>
                                    <TableCell>
                                        <Badge variant={company.jurisdiccion === 'Nacional' ? 'secondary' : 'outline'}>
                                            {company.jurisdiccion}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">
                                            <Eye className="mr-2 h-4 w-4" />
                                            Ver Estados de Cuenta
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <Button variant="secondary">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Añadir Empresa al Holding
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
