
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, User, Mail, Home, CheckCircle, CreditCard, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

const planes = [
    { id: "basico", nombre: "Plan Básico", precio: 20, descripcion: "Llamadas ilimitadas, 5GB de datos." },
    { id: "plus", nombre: "Plan Plus", precio: 30, descripcion: "Llamadas ilimitadas, 20GB de datos, roaming básico." },
    { id: "premium", nombre: "Plan Premium", precio: 50, descripcion: "Todo ilimitado, roaming internacional completo." },
];

export default function VentaLineaPage() {
    const { toast } = useToast();
    const [selectedPlan, setSelectedPlan] = useState<(typeof planes)[0] | null>(null);

    const handleActivate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPlan) {
            toast({
                variant: "destructive",
                title: "Seleccione un Plan",
                description: "Debe seleccionar un plan antes de activar la línea.",
            });
            return;
        }
        toast({
            title: "Línea Activada Exitosamente",
            description: "La nueva línea telefónica ha sido activada y el cobro ha sido procesado.",
            action: <CheckCircle className="text-green-500" />
        });
    };

    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Phone className="h-8 w-8" />
                    Venta y Activación de Líneas Telefónicas
                </h1>
                <p className="text-muted-foreground mt-2">
                    Registra un nuevo cliente y activa su plan de telefonía.
                </p>
            </header>

            <form onSubmit={handleActivate}>
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Customer Data */}
                    <div className="lg:col-span-2">
                        <Card className="bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>Datos del Cliente</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="nombre" className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground"/> Nombres y Apellidos</Label>
                                        <Input id="nombre" placeholder="Ej: Juan Pérez" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cedula">Cédula de Identidad</Label>
                                        <Input id="cedula" placeholder="Ej: V-12345678" required />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                     <div className="space-y-2">
                                        <Label htmlFor="email" className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground"/> Correo Electrónico</Label>
                                        <Input id="email" type="email" placeholder="cliente@email.com" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="telefono" className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground"/> Número de Teléfono (Nuevo)</Label>
                                        <Input id="telefono" type="tel" placeholder="Ej: 0412-1234567" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="direccion" className="flex items-center gap-2"><Home className="h-4 w-4 text-muted-foreground"/> Dirección de Habitación</Label>
                                    <Input id="direccion" placeholder="Ej: Av. Principal, Res. Centro, Apto 1, Caracas" required />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Plan Selection & Payment */}
                    <div className="lg:col-span-1">
                        <Card className="bg-card/50 backdrop-blur-sm sticky top-24">
                            <CardHeader>
                                <CardTitle>Selección de Plan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    {planes.map(plan => (
                                        <Card 
                                            key={plan.id}
                                            onClick={() => setSelectedPlan(plan)}
                                            className={`cursor-pointer transition-all ${selectedPlan?.id === plan.id ? 'border-primary ring-2 ring-primary' : 'hover:border-muted-foreground/50'}`}
                                        >
                                            <CardContent className="p-4">
                                                <h4 className="font-semibold">{plan.nombre}</h4>
                                                <p className="text-sm text-muted-foreground">{plan.descripcion}</p>
                                                <p className="text-lg font-bold text-primary mt-2">{formatCurrency(plan.precio, 'USD')}/mes</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                                
                                {selectedPlan && (
                                     <div className="pt-4 border-t animate-in fade-in">
                                         <h4 className="font-semibold text-lg mb-2">Resumen de Pago</h4>
                                        <div className="p-4 bg-secondary/50 rounded-lg space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Plan Seleccionado:</span>
                                                <span className="font-medium">{selectedPlan.nombre}</span>
                                            </div>
                                             <div className="flex justify-between">
                                                <span className="text-muted-foreground">Costo Mensual:</span>
                                                <span className="font-medium">{formatCurrency(selectedPlan.precio, 'USD')}</span>
                                            </div>
                                             <div className="flex justify-between font-bold text-xl pt-2 border-t">
                                                <span className="text-primary">TOTAL A PAGAR:</span>
                                                <span className="text-primary">{formatCurrency(selectedPlan.precio, 'USD')}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full text-lg h-12" type="submit">
                                    <CheckCircle className="mr-2"/>
                                    Activar Línea y Procesar Pago
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
