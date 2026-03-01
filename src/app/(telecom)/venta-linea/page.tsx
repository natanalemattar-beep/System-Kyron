"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, User, Mail, Home, CheckCircle, CreditCard, Smartphone, Zap, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

const planes = [
    { id: "basico", nombre: "Plan Básico", precio: 20, descripcion: "Llamadas ilimitadas, 5GB de datos." },
    { id: "plus", nombre: "Plan Plus", precio: 30, descripcion: "Llamadas ilimitadas, 20GB de datos, roaming básico." },
    { id: "premium", nombre: "Plan Premium", precio: 50, descripcion: "Todo ilimitado, roaming internacional completo." },
];

const dispositivos = [
    { id: "kyron-pro", name: "Kyron Pro X", price: 299, image: "https://picsum.photos/seed/kyronphone/200/200" },
    { id: "kyron-max", name: "Kyron Max Ultra", price: 450, image: "https://picsum.photos/seed/phone2/200/200" },
];

export default function VentaLineaPage() {
    const { toast } = useToast();
    const [selectedPlan, setSelectedPlan] = useState<(typeof planes)[0] | null>(null);
    const [selectedDevice, setSelectedDevice] = useState<(typeof dispositivos)[0] | null>(null);

    const handleActivate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPlan) {
            toast({
                variant: "destructive",
                title: "Error de Configuración",
                description: "Debe seleccionar un plan de comunicación para continuar.",
            });
            return;
        }
        toast({
            title: "Operación Exitosa",
            description: "La línea ha sido activada y el dispositivo ha sido asignado al cliente.",
            action: <CheckCircle className="text-green-500" />
        });
    };

    const totalPrice = (selectedPlan?.precio || 0) + (selectedDevice?.price || 0);

    return (
        <div className="space-y-10">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-black tracking-tighter flex items-center gap-3 italic">
                    <Phone className="h-10 w-10 text-primary" />
                    Telecom & Dispositivos
                </h1>
                <p className="text-muted-foreground mt-2 font-medium">
                    Activación de líneas, asignación de números y comercialización de smartphones de alta gama.
                </p>
            </header>

            <form onSubmit={handleActivate}>
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Customer Data */}
                        <Card className="bg-card/50 backdrop-blur-sm border-primary/5 rounded-[2rem] shadow-sm">
                            <CardHeader className="p-8 pb-4">
                                <CardTitle className="text-lg font-black uppercase tracking-tight">Registro de Cliente</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 pt-0 space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Nombres y Apellidos</Label>
                                        <Input placeholder="Nombre Completo" required className="h-12 rounded-xl bg-secondary/30 border-none focus-visible:ring-primary" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Identificación (V/E/J)</Label>
                                        <Input placeholder="Número de Documento" required className="h-12 rounded-xl bg-secondary/30 border-none focus-visible:ring-primary" />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                     <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Email Corporativo</Label>
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

                        {/* Device Selection */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-black uppercase tracking-tight pl-4 italic">Selección de Dispositivo</h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {dispositivos.map(device => (
                                    <Card 
                                        key={device.id}
                                        onClick={() => setSelectedDevice(selectedDevice?.id === device.id ? null : device)}
                                        className={cn(
                                            "cursor-pointer transition-all duration-500 rounded-[2rem] overflow-hidden group border-2",
                                            selectedDevice?.id === device.id ? "border-primary shadow-xl ring-4 ring-primary/5" : "border-transparent bg-card/50 hover:border-primary/20"
                                        )}
                                    >
                                        <CardContent className="p-0 aspect-video relative overflow-hidden">
                                            <Image src={device.image} alt={device.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                            <div className="absolute bottom-4 left-6">
                                                <p className="text-white font-black text-xl italic">{device.name}</p>
                                                <p className="text-primary-foreground font-bold text-sm">{formatCurrency(device.price, 'USD')}</p>
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
                                <CardTitle className="text-lg font-black uppercase tracking-tight">Planes de Datos</CardTitle>
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
                                            <div>
                                                <p className="font-black text-xs uppercase tracking-tighter">{plan.nombre}</p>
                                                <p className="text-[10px] text-muted-foreground font-medium">{plan.descripcion}</p>
                                            </div>
                                            <p className="font-black text-primary italic text-sm">{formatCurrency(plan.precio, 'USD')}</p>
                                        </div>
                                    ))}
                                </div>
                                
                                <Separator className="my-6 border-primary/5" />
                                
                                <div className="space-y-4">
                                     <h4 className="text-[10px] font-black uppercase tracking-widest opacity-60">Resumen de Activación</h4>
                                    <div className="space-y-2 text-xs font-bold">
                                        {selectedPlan && <div className="flex justify-between"><span>SERVICIO {selectedPlan.nombre.toUpperCase()}:</span><span>{formatCurrency(selectedPlan.precio, 'USD')}</span></div>}
                                        {selectedDevice && <div className="flex justify-between"><span>EQUIPO {selectedDevice.name.toUpperCase()}:</span><span>{formatCurrency(selectedDevice.price, 'USD')}</span></div>}
                                        <div className="flex justify-between text-lg font-black pt-4 border-t border-primary/5 text-primary italic">
                                            <span>TOTAL:</span>
                                            <span>{formatCurrency(totalPrice, 'USD')}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-8 pt-0">
                                <Button className="w-full text-sm font-black h-14 rounded-2xl shadow-xl btn-3d-primary" type="submit" disabled={!selectedPlan}>
                                    <Zap className="mr-2 h-5 w-5"/>
                                    CONFIRMAR ACTIVACIÓN
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}