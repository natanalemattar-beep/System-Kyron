
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileWarning, ShieldCheck } from "lucide-react";

const softwareList = [
    { rif: "J000126518", empresa: "COMPAÑÍA ANÓNIMA EMPRESA CINES UNIDOS", sistema: "VISTA", version: "5.0.12.26", categoria: "Gestión de cines y salas de entretenimiento." },
    { rif: "J001871985", empresa: "ALIMENTOS ARCOS DORADOS C.A.", sistema: "NEWPOS", version: "3.5", categoria: "Punto de venta (POS) para cadenas de comida rápida McDonald's." },
    { rif: "J301850971", empresa: "PAPELERÍA LA NUBE AZUL, C.A.", sistema: "SISTEMA ADMINISTRATIVO OFIMANIA (SAP)", version: "1.0", categoria: "Gestión administrativa integral (ERP) con módulo de punto de venta (POS) para ventas directas." },
    { rif: "J305125430", empresa: "INFOTAX INFORMÁTICA TRIBUTARIA S.A.", sistema: "GALAC SISTEMA ADMINISTRATIVO SAW", version: "30.0", categoria: "Gestión administrativa integral (ERP) con módulo de punto de venta (POS) para ventas directas." },
    { rif: "J506491060", empresa: "SAINT ENTERPRISE 2.0 C.A.", sistema: "SAINT ENTERPRISE ADMINISTRATIVO", version: "9.7.5.0", categoria: "Gestión administrativa integral (ERP) con módulo de punto de venta (POS) para ventas directas." },
    { rif: "J296717508", empresa: "TECNOLAB SISTEMAS 21", sistema: "INFOLAB", version: "2.0.a", categoria: "Gestión operativa de laboratorios, incluyendo facturación, control de muestras y resultados." },
    { rif: "J308016284", empresa: "A2SOFTWAY C.A.", sistema: "A2 PUNTO DE VENTA", version: "10.00.0ALX", categoria: "Gestión de punto de venta (POS) para ventas directas." },
    { rif: "J308016284", empresa: "A2SOFTWAY C.A.", sistema: "A2 HERRAMIENTA ADMINISTRATIVA CONFIGURABLE MODULO DE VENTA (HAC)", version: "13.01.0ALX", categoria: "Gestión administrativa integral (ERP) con módulo de punto de venta (POS) para ventas directas." },
    { rif: "J308016284", empresa: "A2SOFTWAY C.A.", sistema: "A2 ADMINISTRATIVO BASICO MODULO DE VENTAS", version: "10.0.1ALX", categoria: "Gestión administrativa integral (ERP) con módulo de punto de venta (POS) para ventas directas." },
    { rif: "J309827316", empresa: "SMS CONSULTORES C.A.", sistema: "SISTEMA OASIS", version: "12.0.2.5", categoria: "Sistema integral para la administración empresarial, gestión de operaciones, facturación (POS) e inventario." },
    { rif: "J294813488", empresa: "SISTEMAS D3XD C.A.", sistema: "D3XD CLÍNICAS ADMINISTRATIVO", version: "1.1.18", categoria: "Gestión administrativa integral (ERP) para clínicas y centros de salud." },
    { rif: "J294813488", empresa: "SISTEMAS D3XD C.A.", sistema: "D3Xd Gym", version: "1.0.10", categoria: "Gestión administrativa integral (ERP) para gimnasios." },
    { rif: "J294813488", empresa: "SISTEMAS D3XD C.A.", sistema: "GISIN3", version: "1.1.35", categoria: "Gestión administrativa integral (ERP) con módulo de punto de venta (POS) para ventas directas." },
    { rif: "J307928220", empresa: "KLK SISTEMAS, C.A.", sistema: "KLK POS", version: "4.0.1.7", categoria: "Sistema integral para la administración empresarial, gestión de operaciones, facturación (POS) e inventario." },
    { rif: "J299295760", empresa: "WINLEDGER INTERNACIONAL C.A.", sistema: "SOFTWARE WINLEDGER FACTURACIÓN Y PRODUCTOS", version: "2025.2.405", categoria: "Gestión administrativa integral (ERP) para ventas directas." },
    { rif: "J297059172", empresa: "CORPORACION VNET C.A.", sistema: "BUSINESS CENTRAL", version: "25.3.28755.29171", categoria: "Gestión administrativa integral (ERP) para proveedores de servicios de Internet, incluyendo administración de clientes, planes y facturación." },
    { rif: "J505724347", empresa: "TOTAL APLICACIONES L.C.A.", sistema: "SIMPLITPOS", version: "4.2.06.04", categoria: "Gestión administrativa integral (ERP) con módulo de punto de venta (POS) para ventas directas." },
    { rif: "J402385358", empresa: "THE FACTORY HKA VENEZUELA C.A.", sistema: "HKA FE (PORTAL WEB Y API DE EMISION DE DOCUMENTOS)", version: "1.1", categoria: "Portal web y API para emisión de facturas y otros documentos Fiscales." },
    { rif: "J316353737", empresa: "PROCERT ITFB, C.A.", sistema: "SIGECE (PORTAL WEB DE EMISION DE DOCUMENTOS)", version: "1.2", categoria: "Portal web para emisión de facturas y otros documentos Fiscales." },
    { rif: "J314584855", empresa: "INSITE VENEZUELA, C.A.", sistema: "HYBRID LITEPRO", version: "4", categoria: "Gestión administrativa integral (ERP) con módulo de punto de venta (POS) para ventas directas." },
    { rif: "J314584855", empresa: "INSITE VENEZUELA, C.A.", sistema: "HYBRID LITEOS", version: "3", categoria: "Gestión administrativa integral (ERP) con módulo de punto de venta (POS) para ventas directas." },
];


export default function HomologacionSeniatPage() {
    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                    Software y Versiones Autorizadas por el SENIAT
                </h1>
                <p className="text-muted-foreground mt-2">
                    Listado oficial para la emisión de facturas y otros documentos fiscales.
                </p>
            </header>

            <Alert variant="destructive" className="bg-destructive/10">
                <FileWarning className="h-4 w-4" />
                <AlertTitle>¡Atención Contribuyente!</AlertTitle>
                <AlertDescription>
                    <p>Según la <strong>Providencia Administrativa N° SNAT/2024/000121</strong>, publicada en la Gaceta Oficial N° 43.032 del 19 de diciembre de 2024, solo están autorizados los Software Homologados y sus versiones específicas indicadas en esta lista.</p>
                    <p className="font-bold mt-2">"Las versiones anteriores de estos sistemas, cualquier otra variante de los mismos y aquellos sistemas no mencionados en esta lista NO ESTAN AUTORIZADOS."</p>
                </AlertDescription>
            </Alert>
            
            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Listado de Software de Facturación Homologado</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>RIF</TableHead>
                                    <TableHead>Empresa</TableHead>
                                    <TableHead>Sistema</TableHead>
                                    <TableHead>Versión</TableHead>
                                    <TableHead>Categoría</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {softwareList.map((item) => (
                                    <TableRow key={item.rif + item.sistema}>
                                        <TableCell className="font-mono">{item.rif}</TableCell>
                                        <TableCell className="font-medium">{item.empresa}</TableCell>
                                        <TableCell>{item.sistema}</TableCell>
                                        <TableCell className="font-semibold">{item.version}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{item.categoria}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
