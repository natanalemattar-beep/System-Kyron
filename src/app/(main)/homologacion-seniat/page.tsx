
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Download, CheckCircle, FileWarning, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const requisitosClave = [
    {
        titulo: "Emisión de Facturas y Documentos Fiscales",
        descripcion: "El software debe ser capaz de generar facturas, notas de débito y notas de crédito en formato electrónico, cumpliendo con todos los campos y la estructura exigida por el SENIAT."
    },
    {
        titulo: "Libro de Ventas y Compras",
        descripcion: "Generación automática de los libros de IVA (compras y ventas) en el formato correcto, listos para ser presentados o declarados ante la administración tributaria."
    },
    {
        titulo: "Inalterabilidad de los Registros",
        descripcion: "El sistema debe garantizar que, una vez emitida una factura, esta no pueda ser modificada, asegurando la integridad de los datos."
    },
    {
        titulo: "Mecanismos de Auditoría",
        descripcion: "Debe incluir un registro o log de todas las operaciones fiscales realizadas, permitiendo una trazabilidad completa en caso de una fiscalización."
    },
    {
        titulo: "Adaptación a la Normativa Vigente",
        descripcion: "Capacidad para manejar la moneda de cuenta según las directrices del Cencoex, la reconversión monetaria y adaptarse a cambios en las alícuotas de impuestos."
    }
];


export default function HomologacionSeniatPage() {
    const { toast } = useToast();

    const handleDownloadDemo = () => {
        const demoContent = `
Bienvenido a la versión de prueba de System C.M.S.

Esta es una simulación de nuestro sistema de gestión integral. Durante 15 días, tendrás acceso a las siguientes funcionalidades:

- Módulo de Facturación (Homologado SENIAT)
- Gestión de Inventario
- Cuentas por Cobrar y Pagar
- Generación de Reportes Básicos

¡Gracias por tu interés!
        `;
        const blob = new Blob([demoContent], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'System_CMS_Demo.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "Descarga Iniciada",
            description: "Tu versión de prueba de 15 días ha comenzado a descargarse.",
        });
    };

    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                    Homologación SENIAT (Providencia 121)
                </h1>
                <p className="text-muted-foreground mt-2">
                    Guía sobre los requisitos y procedimientos para que un software administrativo sea aprobado por el SENIAT.
                </p>
            </header>

            <Alert variant="destructive">
                <FileWarning className="h-4 w-4" />
                <AlertTitle>Importancia de la Homologación</AlertTitle>
                <AlertDescription>
                    Utilizar un sistema administrativo o de facturación no homologado por el SENIAT puede acarrear severas sanciones, multas y el cierre temporal del establecimiento. La **Providencia Administrativa N° SNAT/2024/000121** establece claramente que solo las versiones de software listadas oficialmente están autorizadas.
                </AlertDescription>
            </Alert>
            
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card className="bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Requisitos Clave para la Homologación</CardTitle>
                            <CardDescription>
                                Un software debe cumplir con los siguientes requisitos técnicos y funcionales para ser homologado:
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {requisitosClave.map(requisito => (
                                <div key={requisito.titulo} className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                                    <div>
                                        <h4 className="font-semibold">{requisito.titulo}</h4>
                                        <p className="text-sm text-muted-foreground">{requisito.descripcion}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-8">
                    <Card className="bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Procedimiento de Homologación</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ol className="list-decimal list-inside space-y-3 text-sm text-muted-foreground">
                                <li>La casa de software presenta una solicitud formal ante el SENIAT.</li>
                                <li>Se somete el software a una serie de pruebas técnicas y funcionales por parte de los auditores del SENIAT.</li>
                                <li>Se verifica el cumplimiento de todas las providencias administrativas vigentes.</li>
                                <li>Si el software cumple, se emite la Providencia Administrativa de Homologación, que se publica en Gaceta Oficial.</li>
                            </ol>
                        </CardContent>
                    </Card>
                     <Card className="bg-primary/10 border-primary/20">
                        <CardHeader>
                            <CardTitle>Descarga tu Demo</CardTitle>
                            <CardDescription>Prueba nuestro sistema homologado por 15 días.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Explora las funcionalidades clave y comprueba por qué System C.M.S es la mejor opción para tu negocio.
                            </p>
                            <Button className="w-full" onClick={handleDownloadDemo}>
                                <Download className="mr-2" />
                                Descargar Demo (15 Días)
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
