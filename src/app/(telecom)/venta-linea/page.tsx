
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, CheckCircle, Smartphone, Zap, Search, CreditCard, Radio } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, cn } from "@/lib/utils";
import Image from "next/image";

const planes = [
    { id: "basico", nombre: "Plan Conecta", precio: 15, descripcion: "Llamadas ilimitadas, 10GB de datos." },
    { id: "plus", nombre: "Plan Global", precio: 25, descripcion: "Llamadas ilimitadas, 40GB de datos, roaming básico." },
    { id: "premium", nombre: "Plan Infinite", precio: 45, descripcion: "Todo ilimitado, 5G de ultra-alta velocidad, roaming total." },
];

const simTypes = [
    { id: "sim-fisica", name: "SIM Card Física", price: 5, image: "https://picsum.photos/seed/simcard/200/200", description: "Chip tradicional compatible con cualquier equipo." },
    { id: "esim", name: "eSIM (Digital)", price: 10, image: "https://picsum.photos/seed/esim/200/200", description: "Activación inmediata mediante código QR." },
];

export default function VentaLineaPage() {
    const { toast } = useToast();
    const [selectedPlan, setSelectedPlan] = useState<(typeof planes)[0] | null>(null);
    const [selectedSim, setSelectedSim] = useState<(typeof simTypes)[0] | null>(null);

    const handleActivate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPlan || !selectedSim) {
            toast({
                variant: "destructive",
                title: "Selección incompleta",
                description: "Debe seleccionar un plan y un tipo de SIM para continuar.",
            });
            return;
        }
        toast({
            title: "Activación en Proceso",
            description: `La línea ${selectedSim.id === 'esim' ? 'digital' : 'física'} está siendo configurada.`,
            action: <CheckCircle className="text-green-500" />
        });
    };

    const totalPrice = (selectedPlan?.precio || 0) + (selectedSim?.price || 0);

    return (
        <div className="space-y-10">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-black tracking-tighter flex items-center gap-3 italic">
                    <Radio className="h-10 w-10 text-primary" />
                    Activación de Líneas Kyron
                </h1>
                <p className="text-muted-foreground mt-2 font-medium">
                    Asignación inmediata de números telefónicos y servicios de datos 5G.
                </p>
            </header>

            <form onSubmit={handleActivate}>
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Customer Data */}
                        <Card className="bg-card/50 backdrop-blur-sm border-primary/5 rounded-[2rem] shadow-sm">
                            <CardHeader className="p-8 pb-4">
                                <CardTitle className="text-lg font-black uppercase tracking-tight">Registro de Titular</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 pt-0 space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Nombre Completo</Label>
                                        <Input placeholder="Ej: Juan Pérez" required className="h-12 rounded-xl bg-secondary/30 border-none focus-visible:ring-primary" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Identificación (V/E/J)</Label>
                                        <Input placeholder="Número de Documento" required className="h-12 rounded-xl bg-secondary/30 border-none focus-visible:ring-primary" />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                     <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Email para Activación</Label>
                                        <Input type="email" placeholder="cliente@kyron.com" required className="h-12 rounded-xl bg-secondary/30 border-none focus-visible:ring-primary" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Número a Asignar</Label>
                                        <div className="flex gap-2">
                                            <Input placeholder="Asignación Automática" className="h-12 rounded-xl bg-secondary/30 border-none" readOnly />
                                            <Button type="button" variant="outline" className="h-12 w-12 p-0 rounded-xl border-primary/10 hover:bg-primary/5"><Search className="h-4 w-4"/></Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* SIM Selection */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-black uppercase tracking-tight pl-4 italic">Selección de Medio de Conexión</h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {simTypes.map(sim => (
                                    <Card 
                                        key={sim.id}
                                        onClick={() => setSelectedSim(selectedSim?.id === sim.id ? null : sim)}
                                        className={cn(
                                            "cursor-pointer transition-all duration-500 rounded-[2rem] overflow-hidden group border-2",
                                            selectedSim?.id === sim.id ? "border-primary shadow-xl ring-4 ring-primary/5" : "border-transparent bg-card/50 hover:border-primary/20"
                                        )}
                                    >
                                        <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                                            <div className="w-24 h-24 relative rounded-2xl overflow-hidden mb-2">
                                                <Image src={sim.image} alt={sim.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-lg uppercase tracking-tight">{sim.name}</h4>
                                                <p className="text-[10px] text-muted-foreground font-medium uppercase mt-1">{sim.description}</p>
                                                <p className="text-primary font-black text-xl mt-2 italic">{formatCurrency(sim.price, 'USD')}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Plan Selection & Summary */}
                    <div className="lg:col-span-1 space-y-8">
                        <Card className="bg-card/50 backdrop-blur-sm border-primary/5 rounded-[2rem] shadow-xl sticky top-24">
                            <CardHeader className="p-8 pb-4">
                                <CardTitle className="text-lg font-black uppercase tracking-tight">Planes de Conectividad</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 pt-0 space-y-4">
                                <div className="space-y-3">
                                    {planes.map(plan => (
                                        <div 
                                            key={plan.id}
                                            onClick={() => setSelectedPlan(plan)}
                                            className={cn(
                                                "p-4 rounded-2xl cursor-pointer transition-all border-2 flex items-center justify-between gap-4",
                                                selectedPlan?.id === plan.id ? "bg-primary/5 border-primary shadow-inner" : "bg-secondary/30 border-transparent hover:border-primary/10"
                                            )}
                                        >
                                            <div className="flex-1">
                                                <p className="font-black text-xs uppercase tracking-tighter">{plan.nombre}</p>
                                                <p className="text-[10px] text-muted-foreground font-medium">{plan.descripcion}</p>
                                            </div>
                                            <p className="font-black text-primary italic text-sm">{formatCurrency(plan.precio, 'USD')}</p>
                                        </div>
                                    ))}
                                </div>
                                
                                <Separator className="my-6 border-primary/5" />
                                
                                <div className="space-y-4">
                                     <h4 className="text-[10px] font-black uppercase tracking-widest opacity-60">Detalle de Activación</h4>
                                    <div className="space-y-2 text-xs font-bold">
                                        {selectedPlan && <div className="flex justify-between"><span>MENSUALIDAD {selectedPlan.nombre.toUpperCase()}:</span><span>{formatCurrency(selectedPlan.precio, 'USD')}</span></div>}
                                        {selectedSim && <div className="flex justify-between"><span>COSTO DE {selectedSim.name.toUpperCase()}:</span><span>{formatCurrency(selectedSim.price, 'USD')}</span></div>}
                                        <div className="flex justify-between text-lg font-black pt-4 border-t border-primary/5 text-primary italic">
                                            <span>TOTAL INICIAL:</span>
                                            <span>{formatCurrency(totalPrice, 'USD')}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-8 pt-0">
                                <Button className="w-full text-sm font-black h-14 rounded-2xl shadow-xl btn-3d-primary" type="submit" disabled={!selectedPlan || !selectedSim}>
                                    <Zap className="mr-2 h-5 w-5"/>
                                    ACTIVAR LÍNEA 5G
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
