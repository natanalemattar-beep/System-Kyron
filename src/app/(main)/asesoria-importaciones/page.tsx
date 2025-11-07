
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ship, FileText, Package, ArrowRight, Warehouse, Anchor, LandPlot, Handshake, Calculator } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";

const importSteps = [
    {
        step: 1,
        title: "Búsqueda y Verificación del Proveedor",
        description: "El primer paso es encontrar un proveedor confiable en el país de origen. Se negocian los términos de la compra y se confirma que el proveedor puede enviar la mercancía a nuestro almacén en origen.",
        icon: Handshake,
    },
    {
        step: 2,
        title: "Consolidación de Carga en Almacén",
        description: "Tu mercancía llega a nuestro almacén en el país de origen. Si tienes compras de múltiples proveedores, las agrupamos (consolidamos) en un solo envío para optimizar el costo del flete.",
        icon: Warehouse,
    },
    {
        step: 3,
        title: "Embarque y Transporte Marítimo",
        description: "Una vez consolidada, la carga se embarca en un contenedor y comienza su viaje marítimo hasta Venezuela. Se emite el Bill of Lading (BL).",
        icon: Anchor,
    },
    {
        step: 4,
        title: "Gestión Aduanal y Nacionalización",
        description: "A su llegada a Venezuela, nuestro equipo de agentes aduanales se encarga de todo el proceso de declaración, pago de impuestos y nacionalización de la mercancía.",
        icon: LandPlot,
    },
    {
        step: 5,
        title: "Entrega Final en Venezuela",
        description: "Una vez liberada la mercancía de la aduana, la transportamos a tu negocio o puedes retirarla en nuestros almacenes designados.",
        icon: Ship,
    },
];

const keyDocuments = [
    {
        title: "Factura Comercial (Commercial Invoice)",
        description: "Documento emitido por el proveedor que detalla la mercancía, su valor y las condiciones de venta. Es esencial para la declaración de aduanas.",
    },
    {
        title: "Lista de Empaque (Packing List)",
        description: "Describe el contenido exacto del envío: número de cajas, peso, dimensiones y descripción de los artículos. Facilita la inspección aduanal.",
    },
    {
        title: "Conocimiento de Embarque (Bill of Lading - BL)",
        description: "Es el contrato de transporte entre el exportador y la naviera. Funciona como un título de propiedad de la mercancía durante su tránsito.",
    },
];

export default function AsesoriaImportacionesPage() {
    const [peso, setPeso] = useState<number | "">("");
    const [volumen, setVolumen] = useState<number | "">("");
    const [valor, setValor] = useState<number | "">("");
    const [costoEstimado, setCostoEstimado] = useState<number | null>(null);

    const handleCalculate = () => {
        if (!peso || !volumen || !valor) return;
        // Fórmula de ejemplo: (Peso * Tasa) + (Volumen * TasaVol) + (Valor * Seguro)
        const costoCalculado = (Number(peso) * 15) + (Number(volumen) * 250) + (Number(valor) * 0.02);
        setCostoEstimado(costoCalculado);
    }

    return (
        <div className="p-4 md:p-8 space-y-12">
            <header className="text-center">
                <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
                    <Ship className="h-12 w-12" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight">Asesoría en Importaciones y Logística</h1>
                <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
                    Una guía integral sobre el proceso de importación, incluyendo consolidación de carga, documentación clave y optimización de costos.
                </p>
            </header>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Flujo de Trabajo del Proceso de Importación</CardTitle>
                    <CardDescription>Desde la compra hasta la entrega, estos son los pasos clave.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ol className="relative border-l border-border ml-6 space-y-12">
                        {importSteps.map((item) => (
                            <li key={item.step} className="ml-10">
                                <span className="absolute -left-5 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground ring-8 ring-background">
                                    <item.icon className="h-5 w-5"/>
                                </span>
                                <h3 className="font-semibold text-lg">{item.title}</h3>
                                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                            </li>
                        ))}
                    </ol>
                </CardContent>
            </Card>
            
            <div className="grid lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><FileText/>Documentación Clave</CardTitle>
                        <CardDescription>Estos tres documentos son la base de cualquier operación de importación.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {keyDocuments.map(doc => (
                            <div key={doc.title} className="p-4 bg-secondary/50 rounded-lg">
                                <h4 className="font-semibold">{doc.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{doc.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm">
                     <CardHeader>
                        <CardTitle className="flex items-center gap-3"><Package/>Carga Consolidada (LCL)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            La Carga Consolidada o "Less than Container Load" (LCL) es la solución perfecta para PYMES. Te permite importar tu mercancía sin tener que pagar por un contenedor completo, compartiendo el espacio y los costos con otros importadores.
                        </p>
                        <Alert className="mt-4">
                            <AlertTitle>Beneficio Principal</AlertTitle>
                            <AlertDescription>
                                Reduce drásticamente los costos de flete para envíos pequeños y medianos.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            </div>

             <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Calculator/>Calculadora de Costos de Importación</CardTitle>
                    <CardDescription>Obtén una estimación rápida de los costos de tu importación. Los valores son referenciales.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="peso">Peso Total (Kg)</Label>
                        <Input id="peso" type="number" placeholder="Ej: 150" value={peso} onChange={e => setPeso(Number(e.target.value))} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="volumen">Volumen Total (m³)</Label>
                        <Input id="volumen" type="number" placeholder="Ej: 1.5" value={volumen} onChange={e => setVolumen(Number(e.target.value))} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="valor">Valor FOB de la Mercancía (USD)</Label>
                        <Input id="valor" type="number" placeholder="Ej: 3000" value={valor} onChange={e => setValor(Number(e.target.value))} />
                    </div>
                </CardContent>
                 <CardFooter className="flex-col items-center gap-4 border-t pt-6">
                    <Button onClick={handleCalculate} className="w-full max-w-xs" disabled={!peso || !volumen || !valor}>Calcular Costo Estimado</Button>
                    {costoEstimado !== null && (
                        <div className="text-center p-4 bg-primary/10 rounded-lg w-full max-w-xs animate-in fade-in">
                            <p className="text-sm font-medium">Costo Estimado de Importación:</p>
                            <p className="text-3xl font-bold text-primary">{formatCurrency(costoEstimado, "USD")}</p>
                            <p className="text-xs text-muted-foreground mt-1">(Incluye flete, aduanas y seguro)</p>
                        </div>
                    )}
                 </CardFooter>
            </Card>

            <Card className="bg-primary/10 border-primary/20">
                <CardHeader>
                    <CardTitle>¿Listo para Importar?</CardTitle>
                    <CardDescription>Nuestro equipo de expertos está listo para asesorarte en cada paso del proceso y optimizar tus costos logísticos.</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button>Contactar a un Asesor <ArrowRight className="ml-2"/></Button>
                </CardFooter>
            </Card>
        </div>
    );
}
