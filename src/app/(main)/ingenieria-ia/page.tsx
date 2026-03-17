
"use client";

import { useState, useRef, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, CloudUpload as UploadCloud, Download, Save, Ruler, Calculator, Loader as Loader2, Plus, Trash2, ArrowDown } from "lucide-react";
import { FileInputTrigger } from "@/components/file-input-trigger";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const materialesDisponibles = [
    { id: 'porcelanato-60x60', nombre: 'Porcelanato 60x60', unidad: 'm²', costo: 22 },
    { id: 'ceramica-45x45', nombre: 'Cerámica Nacional 45x45', unidad: 'm²', costo: 15 },
    { id: 'pintura-caucho', nombre: 'Pintura de Caucho (Galón)', unidad: 'gal', costo: 20, rendimiento: 40 }, // rendimiento en m² por galón
    { id: 'pintura-satinada', nombre: 'Pintura Satinada (Galón)', unidad: 'gal', costo: 35, rendimiento: 35 },
];

type BudgetItem = {
    id: number;
    descripcion: string;
    unidad: string;
    cantidad: number;
    costoUnitario: number;
    total: number;
};

export default function IngenieriaIAPage() {
    const { toast } = useToast();
    const [localImage, setLocalImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [planoGenerado, setPlanoGenerado] = useState<string | null>(null);
    
    // State for material calculation
    const [largo, setLargo] = useState<number>(0);
    const [ancho, setAncho] = useState<number>(0);
    const [materialId, setMaterialId] = useState<string>('');
    const areaCalculada = largo * ancho;

    // State for budget
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
    const [costoManoObra, setCostoManoObra] = useState<number>(0);

    const handleFileSelect = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => setLocalImage(e.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleGeneratePlano = () => {
        if (!localImage) {
            toast({ variant: 'destructive', title: 'Error', description: 'Por favor, sube una imagen del local primero.' });
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            setPlanoGenerado("https://picsum.photos/seed/floorplan-detailed/800/600");
            setIsLoading(false);
            toast({ title: 'Plano Generado', description: 'Se ha generado un plano a escala. Ahora puedes calcular los materiales.' });
        }, 2000);
    };

    const handleAddMaterialToBudget = () => {
        if (!materialId || areaCalculada <= 0) {
            toast({ variant: 'destructive', title: 'Faltan Datos', description: 'Por favor, introduce las medidas y selecciona un material.' });
            return;
        }
        const material = materialesDisponibles.find(m => m.id === materialId);
        if (!material) return;
        
        let cantidad = areaCalculada;
        let unidad = `m²`;
        if (material.rendimiento) { // Si es pintura
            cantidad = Math.ceil(areaCalculada / material.rendimiento);
            unidad = 'gal';
        }

        const nuevoItem: BudgetItem = {
            id: Date.now(),
            descripcion: material.nombre,
            unidad: unidad,
            cantidad: parseFloat(cantidad.toFixed(2)),
            costoUnitario: material.costo,
            total: parseFloat((cantidad * material.costo).toFixed(2)),
        };

        setBudgetItems(prev => [...prev, nuevoItem]);
        toast({ title: "Material Agregado", description: `${material.nombre} ha sido añadido al presupuesto.` });
    };

    const handleRemoveBudgetItem = (id: number) => {
        setBudgetItems(prev => prev.filter(item => item.id !== id));
    };

    const totalMateriales = useMemo(() => budgetItems.reduce((sum, item) => sum + item.total, 0), [budgetItems]);

    const handleCalculateManoDeObra = () => {
        const costoManoDeObraEstimado = totalMateriales * 0.40; // Ejemplo: 40% del costo de materiales
        setCostoManoObra(costoManoDeObraEstimado);
    };

    const totalProyecto = totalMateriales + costoManoObra;

    return (
        <div className="p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Cpu className="h-8 w-8" />
                    Sistema de Ingeniería: Planificación y Presupuesto
                </h1>
                <p className="text-muted-foreground mt-2">
                    Genera planos a partir de imágenes, calcula materiales y elabora presupuestos de construcción detallados.
                </p>
            </header>

            <div className="space-y-8">
                {/* --- PASO 1: PLANO --- */}
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Paso 1: Carga y Generación de Plano</CardTitle>
                    </CardHeader>
                    <CardContent className="grid lg:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                             <FileInputTrigger onFileSelect={handleFileSelect}>
                                <div className="w-full aspect-video bg-secondary rounded-lg overflow-hidden flex items-center justify-center border-2 border-dashed cursor-pointer hover:border-primary transition-all">
                                    {localImage ? (
                                        <Image src={localImage} alt="Local cargado" layout="fill" objectFit="cover" />
                                    ) : (
                                        <div className="text-center text-muted-foreground">
                                            <UploadCloud className="h-12 w-12 mx-auto mb-2" />
                                            <p>Haz clic o arrastra una foto del local</p>
                                        </div>
                                    )}
                                </div>
                            </FileInputTrigger>
                             <Button onClick={handleGeneratePlano} disabled={!localImage || isLoading} className="w-full">
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Cpu className="mr-2 h-4 w-4" />}
                                {isLoading ? "Generando Plano..." : "Generar Plano con IA"}
                            </Button>
                        </div>
                        <div className="w-full aspect-video bg-secondary rounded-lg overflow-hidden flex items-center justify-center border">
                            {planoGenerado ? (
                                <Image src={planoGenerado} alt="Plano generado" layout="fill" objectFit="contain" className="p-2"/>
                            ) : (
                                <p className="text-muted-foreground text-center p-4">El plano a escala generado por la IA aparecerá aquí.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* --- PASO 2: CÁLCULO DE MATERIALES --- */}
                {planoGenerado && (
                    <Card className="bg-card/50 backdrop-blur-sm animate-in fade-in duration-500">
                        <CardHeader>
                            <CardTitle>Paso 2: Cálculo de Materiales por Área</CardTitle>
                            <CardDescription>Define un área (piso, pared, etc.), selecciona el material y añádelo al presupuesto.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
                            <div className="space-y-2">
                                <Label htmlFor="largo">Largo (m)</Label>
                                <Input id="largo" type="number" placeholder="Ej: 10" onChange={(e) => setLargo(Number(e.target.value))} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ancho">Ancho (m)</Label>
                                <Input id="ancho" type="number" placeholder="Ej: 5" onChange={(e) => setAncho(Number(e.target.value))} />
                            </div>
                            <div className="space-y-2">
                                <Label>Área Calculada</Label>
                                <div className="h-10 flex items-center px-3 rounded-md border bg-muted font-mono">{areaCalculada.toFixed(2)} m²</div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="material-select">Material</Label>
                                <Select onValueChange={setMaterialId}>
                                    <SelectTrigger id="material-select"><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                                    <SelectContent>
                                        {materialesDisponibles.map(m => (
                                            <SelectItem key={m.id} value={m.id}>{m.nombre}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button onClick={handleAddMaterialToBudget} className="h-10">
                                <Plus className="mr-2"/> Añadir al Presupuesto
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* --- PASO 3: PRESUPUESTO DEL PROYECTO --- */}
                {budgetItems.length > 0 && (
                     <Card className="bg-card/50 backdrop-blur-sm animate-in fade-in duration-500">
                        <CardHeader>
                            <CardTitle>Paso 3: Presupuesto del Proyecto</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader><TableRow><TableHead>Descripción</TableHead><TableHead>Unidad</TableHead><TableHead>Cantidad</TableHead><TableHead>Costo Unit.</TableHead><TableHead className="text-right">Total</TableHead><TableHead></TableHead></TableRow></TableHeader>
                                <TableBody>
                                    {budgetItems.map(item => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.descripcion}</TableCell>
                                            <TableCell>{item.unidad}</TableCell>
                                            <TableCell>{item.cantidad}</TableCell>
                                            <TableCell>{formatCurrency(item.costoUnitario, '$')}</TableCell>
                                            <TableCell className="text-right font-semibold">{formatCurrency(item.total, '$')}</TableCell>
                                            <TableCell><Button variant="ghost" size="icon" onClick={() => handleRemoveBudgetItem(item.id)}><Trash2 className="h-4 w-4 text-destructive"/></Button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Separator className="my-4"/>
                            <div className="space-y-4">
                                <div className="flex justify-end items-center gap-4">
                                    <Button variant="outline" onClick={handleCalculateManoDeObra}>Calcular Mano de Obra (40%)</Button>
                                </div>
                                 <div className="p-6 rounded-lg bg-secondary space-y-4">
                                    <div className="flex justify-between text-lg"><span className="text-muted-foreground">Total Materiales:</span><span className="font-bold">{formatCurrency(totalMateriales, '$')}</span></div>
                                    <div className="flex justify-between text-lg"><span className="text-muted-foreground">Costo Mano de Obra (Estimado):</span><span className="font-bold">{formatCurrency(costoManoObra, '$')}</span></div>
                                    <Separator/>
                                    <div className="flex justify-between text-2xl font-bold text-primary"><span >Presupuesto Total del Proyecto:</span><span>{formatCurrency(totalProyecto, '$')}</span></div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="gap-2">
                            <Button><Download className="mr-2"/> Exportar Presupuesto</Button>
                            <Button variant="secondary"><Save className="mr-2"/> Guardar Proyecto</Button>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </div>
    );
}
