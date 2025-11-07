
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, UploadCloud, Eraser, Download, Save, Ruler, Layers, PaintBucket, Calculator, Loader2 } from "lucide-react";
import { FileInputTrigger } from "@/components/file-input-trigger";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";

const materiales = [
    { id: 'piso-ceramica', nombre: 'Piso de Cerámica', costoM2: 25 },
    { id: 'piso-porcelanato', nombre: 'Piso de Porcelanato', costoM2: 45 },
    { id: 'pintura-caucho', nombre: 'Pintura de Caucho (Galón)', costoM2: 8 },
    { id: 'pintura-satinada', nombre: 'Pintura Satinada (Galón)', costoM2: 12 },
];

export default function IngenieriaIAPage() {
    const { toast } = useToast();
    const [localImage, setLocalImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [planoGenerado, setPlanoGenerado] = useState<string | null>(null);
    const [areaCalculada, setAreaCalculada] = useState<number | null>(null);
    const [materialSeleccionado, setMaterialSeleccionado] = useState<string>('');
    const [costoTotal, setCostoTotal] = useState<number | null>(null);

    const handleFileSelect = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setLocalImage(e.target?.result as string);
            setPlanoGenerado(null);
            setAreaCalculada(null);
            setCostoTotal(null);
        };
        reader.readAsDataURL(file);
    };

    const handleGeneratePlano = () => {
        if (!localImage) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Por favor, sube una imagen del local primero.',
            });
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            // Simulación de la generación del plano
            setPlanoGenerado("https://picsum.photos/seed/floorplan/800/600");
            const generatedArea = Math.floor(Math.random() * (150 - 50 + 1) + 50); // Area aleatoria entre 50 y 150 m2
            setAreaCalculada(generatedArea);
            setIsLoading(false);
            toast({
                title: 'Plano Generado Exitosamente',
                description: `Se ha generado un plano a escala con un área estimada de ${generatedArea} m².`,
            });
        }, 2000);
    };
    
    const handleCalculateCost = () => {
        if (areaCalculada && materialSeleccionado) {
            const material = materiales.find(m => m.id === materialSeleccionado);
            if (material) {
                setCostoTotal(areaCalculada * material.costoM2);
            }
        }
    }

    return (
        <div className="p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Cpu className="h-8 w-8" />
                    Ingeniería Asistida por IA: Generador de Planos
                </h1>
                <p className="text-muted-foreground mt-2">
                    Sube una foto de tu local o espacio y nuestra IA generará un plano a escala para ti.
                </p>
            </header>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Panel de Carga y Visualización */}
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>1. Carga de Imagen</CardTitle>
                        <CardDescription>Sube una imagen clara del espacio que deseas planificar.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FileInputTrigger onFileSelect={handleFileSelect}>
                            <div className="w-full aspect-video bg-secondary rounded-lg overflow-hidden flex items-center justify-center border-2 border-dashed cursor-pointer hover:border-primary transition-all">
                                {localImage ? (
                                    <Image src={localImage} alt="Local cargado" layout="fill" objectFit="cover" />
                                ) : (
                                    <div className="text-center text-muted-foreground">
                                        <UploadCloud className="h-12 w-12 mx-auto mb-2" />
                                        <p>Haz clic o arrastra una imagen aquí</p>
                                    </div>
                                )}
                            </div>
                        </FileInputTrigger>
                         <Button onClick={handleGeneratePlano} disabled={!localImage || isLoading} className="w-full mt-4">
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Cpu className="mr-2 h-4 w-4" />
                            )}
                            {isLoading ? "Generando Plano..." : "Generar Plano con IA"}
                        </Button>
                    </CardContent>
                </Card>

                {/* Panel de Resultados */}
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>2. Plano Generado y Herramientas</CardTitle>
                        <CardDescription>Visualiza el plano generado y utiliza las herramientas de edición.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full aspect-video bg-secondary rounded-lg overflow-hidden flex items-center justify-center border">
                           {planoGenerado ? (
                                <Image src={planoGenerado} alt="Plano generado" layout="fill" objectFit="contain" className="p-4"/>
                           ) : (
                                <p className="text-muted-foreground text-center">El plano aparecerá aquí una vez generado.</p>
                           )}
                        </div>
                        {planoGenerado && (
                            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                                <Button variant="outline"><Ruler className="mr-2"/>Añadir Cotas</Button>
                                <Button variant="outline"><Eraser className="mr-2"/>Editar Plano</Button>
                                <Button variant="outline"><Save className="mr-2"/>Guardar</Button>
                                <Button><Download className="mr-2"/>Exportar</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Panel de Presupuesto */}
                {planoGenerado && areaCalculada && (
                     <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm animate-in fade-in duration-500">
                        <CardHeader>
                            <CardTitle>3. Presupuesto de Materiales</CardTitle>
                            <CardDescription>Calcula un presupuesto estimado para tu remodelación.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6 items-end">
                            <div className="space-y-4">
                                <div className="p-4 bg-secondary rounded-lg">
                                    <p className="text-sm text-muted-foreground">Área Calculada por IA</p>
                                    <p className="text-3xl font-bold">{areaCalculada} m²</p>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="material-select">Seleccionar Material</Label>
                                    <select
                                        id="material-select"
                                        value={materialSeleccionado}
                                        onChange={(e) => setMaterialSeleccionado(e.target.value)}
                                        className="w-full h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                                    >
                                        <option value="">Seleccione...</option>
                                        {materiales.map(m => (
                                            <option key={m.id} value={m.id}>{m.nombre} ({formatCurrency(m.costoM2, '$')}/m²)</option>
                                        ))}
                                    </select>
                                </div>
                                 <Button onClick={handleCalculateCost} className="w-full">
                                    <Calculator className="mr-2"/>
                                    Calcular Costo
                                </Button>
                            </div>
                            {costoTotal !== null && (
                                <div className="p-6 bg-green-600/10 border border-green-500/20 rounded-lg text-center animate-in fade-in">
                                    <p className="text-lg font-semibold text-green-700">Costo Total Estimado</p>
                                    <p className="text-5xl font-bold text-green-600">{formatCurrency(costoTotal, '$')}</p>
                                    <p className="text-xs text-muted-foreground mt-2">Basado en {areaCalculada} m² de {materiales.find(m => m.id === materialSeleccionado)?.nombre}.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
