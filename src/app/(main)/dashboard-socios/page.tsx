
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building, Eye, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


const holdingData = [
    { id: 1, nombre: "Ana Pérez", rol: "Socio / Director", cedula: "V-12.345.678", participacion: "50%" },
    { id: 2, nombre: "Luis Gómez", rol: "Socio / Director", cedula: "V-18.765.432", participacion: "50%" },
];

const holdingCompanies = [
    { id: 1, nombre: "Empresa Filial A, C.A.", rif: "J-23456789-0", rol: "Subsidiaria", jurisdiccion: "Nacional" },
    { id: 2, nombre: "Servicios Integrados B, S.A.", rif: "J-34567890-1", rol: "Aliada Estratégica", jurisdiccion: "Nacional" },
    { id: 3, nombre: "International Holdings LLC", rif: "N/A", rol: "Casa Matriz", jurisdiccion: "Internacional" },
];


export default function DashboardSociosPage() {

    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Users className="h-8 w-8" />
                    Dashboard de Socios y Holding
                </h1>
                <p className="text-muted-foreground mt-2">
                    Visión general de la estructura de propiedad, empresas del grupo y rendimiento financiero.
                </p>
            </header>

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
