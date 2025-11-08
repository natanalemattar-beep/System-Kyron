
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building, Eye, PlusCircle, Download, BookOpen, HandCoins, ShoppingCart, Gavel } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";

const holdingData = [
    { id: 1, nombre: "Ana Pérez", rol: "Socio / Director", cedula: "V-12.345.678", participacion: "50%" },
    { id: 2, nombre: "Luis Gómez", rol: "Socio / Director", cedula: "V-18.765.432", participacion: "50%" },
];

const holdingCompanies = [
    { id: 1, nombre: "Empresa Filial A, C.A.", rif: "J-23456789-0", rol: "Subsidiaria", jurisdiccion: "Nacional" },
    { id: 2, nombre: "Servicios Integrados B, S.A.", rif: "J-34567890-1", rol: "Aliada Estratégica", jurisdiccion: "Nacional" },
    { id: 3, nombre: "International Holdings LLC", rif: "N/A", rol: "Casa Matriz", jurisdiccion: "Internacional" },
];

const systemModules = [
    {
        title: "Finanzas y Contabilidad",
        icon: BookOpen,
        description: "Acceso completo a libros contables, estados financieros, declaraciones de impuestos, cuentas por cobrar/pagar y análisis de rentabilidad.",
        qrData: "reporte-completo-finanzas"
    },
    {
        title: "Recursos Humanos",
        icon: Users,
        description: "Visión total de la nómina, contratos, gestión de personal, libros de registro laboral y cumplimiento de obligaciones parafiscales.",
        qrData: "reporte-completo-rrhh"
    },
    {
        title: "Ventas y Marketing",
        icon: ShoppingCart,
        description: "Análisis de ventas por producto/sucursal, rendimiento del TPV, estructura de costos y estrategias de marketing.",
        qrData: "reporte-completo-ventas"
    },
    {
        title: "Gestión Jurídica y Cumplimiento",
        icon: Gavel,
        description: "Control de permisos y licencias, gestión de contratos, poderes de representación y seguimiento de trámites legales.",
        qrData: "reporte-completo-legal"
    },
]

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
            
             <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building className="h-6 w-6 text-primary" />
                        Visión General de la Empresa
                    </CardTitle>
                    <CardDescription>
                       Acceso y descarga de reportes consolidados de todos los departamentos y módulos del sistema.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    {systemModules.map(mod => (
                        <Card key={mod.title} className="bg-secondary/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <mod.icon className="h-6 w-6 text-primary"/>
                                    {mod.title}
                                </CardTitle>
                                <CardDescription>{mod.description}</CardDescription>
                            </CardHeader>
                            <CardFooter className="flex items-center justify-between gap-4">
                                <Button className="w-full">
                                    <Download className="mr-2 h-4 w-4"/>
                                    Ver Reporte Completo
                                </Button>
                                <div className="p-1 bg-white rounded-md">
                                    <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${mod.qrData}`} alt={`QR for ${mod.title}`} width={40} height={40} />
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
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
