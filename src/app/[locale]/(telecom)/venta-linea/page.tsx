
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleCheck as CheckCircle, Search, Radio, Zap } from "lucide-react";
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
        <div className="space-y-8 w-full px-4 md:px-10 pb-20">
            <header className="mb-8 border-l-4 border-primary pl-6 md:pl-8 py-2">
                <h1 className="text-2xl md:text-4xl font-black tracking-tighter flex items-center gap-3 italic text-foreground uppercase">
                    <Radio className="h-8 w-8 text-primary" />
                    Activación de Líneas Kyron
                </h1>
                <p className="text-muted-foreground mt-2 text-xs md:text-sm font-medium uppercase tracking-widest opacity-60">
                    Asignación inmediata de números telefónicos y servicios de datos 5G.
                </p>
            </header>

            <form onSubmit={handleActivate} className="w-full">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="bg-white/[0.02] border-white/5 rounded-[2rem] shadow-sm overflow-hidden">
                            <CardHeader className="p-6 md:p-8 pb-4 bg-white/[0.01]">
                                <CardTitle className="text-sm font-black uppercase tracking-widest text-primary">Registro de Titular</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 md:p-8 pt-6 space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Nombre Completo</Label>
                                        <Input placeholder="Ej: Juan Pérez" required className="h-11 rounded-xl bg-white/[0.03] border-white/10 focus-visible:ring-primary text-xs text-white" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Identificación (V/E/J)</Label>
                                        <Input placeholder="Número de Documento" required className="h-11 rounded-xl bg-white/[0.03] border-white/10 focus-visible:ring-primary text-xs text-white" />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                     <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Email para Activación</Label>
                                        <Input type="email" placeholder="cliente@kyron.com" required className="h-11 rounded-xl bg-white/[0.03] border-white/10 focus-visible:ring-primary text-xs text-white" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Número a Asignar</Label>
                                        <div className="flex gap-2">
                                            <Input placeholder="Asignación Automática" className="h-11 rounded-xl bg-white/[0.03] border-white/10 text-xs text-white" readOnly />
                                            <Button type="button" variant="outline" className="h-11 w-11 p-0 rounded-xl border-white/10 hover:bg-white/5"><Search className="h-4 w-4"/></Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-foreground/40 pl-4 italic">Medio de Conexión</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {simTypes.map(sim => (
                                    <Card 
                                        key={sim.id}
                                        onClick={() => setSelectedSim(selectedSim?.id === sim.id ? null : sim)}
                                        className={cn(
                                            "cursor-pointer transition-all duration-500 rounded-[2rem] overflow-hidden group border-2 bg-white/[0.02]",
                                            selectedSim?.id === sim.id ? "border-primary shadow-xl ring-4 ring-primary/5" : "border-white/5 hover:border-primary/20"
                                        )}
                                    >
                                        <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                                            <div className="w-20 h-20 relative rounded-2xl overflow-hidden mb-2 border border-white/5">
                                                <Image src={sim.image} alt={sim.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-sm uppercase tracking-tight text-white">{sim.name}</h4>
                                                <p className="text-[9px] text-muted-foreground font-bold uppercase mt-1 opacity-50">{sim.description}</p>
                                                <p className="text-primary font-black text-lg mt-2 italic">{formatCurrency(sim.price, 'USD')}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="bg-white/[0.02] border-white/5 rounded-[2rem] shadow-xl sticky top-24">
                            <CardHeader className="p-6 md:p-8 pb-4">
                                <CardTitle className="text-sm font-black uppercase tracking-widest text-primary">Resumen</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 md:p-8 pt-0 space-y-4">
                                <div className="space-y-2">
                                    {planes.map(plan => (
                                        <div 
                                            key={plan.id}
                                            onClick={() => setSelectedPlan(plan)}
                                            className={cn(
                                                "p-4 rounded-xl cursor-pointer transition-all border flex items-center justify-between gap-4",
                                                selectedPlan?.id === plan.id ? "bg-primary/10 border-primary/40 shadow-inner" : "bg-white/[0.03] border-white/5 hover:border-primary/20"
                                            )}
                                        >
                                            <div className="flex-1">
                                                <p className="font-black text-[10px] uppercase tracking-tight text-white/90">{plan.nombre}</p>
                                                <p className="text-[8px] text-muted-foreground font-bold uppercase opacity-40">{plan.descripcion}</p>
                                            </div>
                                            <p className="font-black text-primary italic text-xs">{formatCurrency(plan.precio, 'USD')}</p>
                                        </div>
                                    ))}
                                </div>
                                
                                <Separator className="my-6 border-white/5" />
                                
                                <div className="space-y-4">
                                    <div className="space-y-2 text-[10px] font-black uppercase tracking-widest text-white/30">
                                        {selectedPlan && <div className="flex justify-between"><span>Mensualidad:</span><span className="text-white/60">{formatCurrency(selectedPlan.precio, 'USD')}</span></div>}
                                        {selectedSim && <div className="flex justify-between"><span>Costo SIM:</span><span className="text-white/60">{formatCurrency(selectedSim.price, 'USD')}</span></div>}
                                        <div className="flex justify-between text-base font-black pt-4 border-t border-white/5 text-primary italic">
                                            <span>Total:</span>
                                            <span>{formatCurrency(totalPrice, 'USD')}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-6 md:p-8 pt-0">
                                <Button className="w-full text-[10px] font-black h-12 rounded-xl shadow-xl btn-3d-primary" type="submit" disabled={!selectedPlan || !selectedSim}>
                                    <Zap className="mr-2 h-4 w-4"/>
                                    ACTIVAR LÍNEA
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
