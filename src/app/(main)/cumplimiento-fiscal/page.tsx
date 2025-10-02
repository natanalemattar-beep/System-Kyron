
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ShieldCheck, CheckCircle, Send, FileText, BarChart, HardDrive, Wrench } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const features = [
    {
        icon: FileText,
        title: "Sistema de facturación electrónica válido ante el SENIAT",
    },
    {
        icon: BarChart,
        title: "Gestión integral: ventas, compras, inventario, cuentas y más",
    },
     {
        icon: HardDrive,
        title: "Cotización consultiva basada en el tipo y tamaño de tu negocio",
    },
    {
        icon: Wrench,
        title: "Soporte técnico profesional en Monagas, Caracas y todo el país",
    },
];

export default function CumplimientoFiscalPage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Solicitud Recibida",
            description: "Gracias por tu interés. En breve, uno de nuestros especialistas te contactará para agendar una demostración.",
            action: <CheckCircle className="text-green-500" />
        });
    }

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            Cumplimiento Fiscal y Soluciones Administrativas
        </h1>
        <p className="text-muted-foreground mt-2">
          Evita sanciones del SENIAT con una solución homologada y adaptada a las necesidades de tu empresa.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">¿Qué incluye nuestra propuesta?</h2>
            <p className="text-muted-foreground">
                Te ofrecemos una solución completa para garantizar tu tranquilidad fiscal y optimizar la gestión de tu negocio, cumpliendo con la <strong>Providencia SNAT/2024/000121</strong>.
            </p>
            <div className="space-y-4">
                {features.map(feature => (
                    <div key={feature.title} className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                        <feature.icon className="h-6 w-6 text-green-500 mt-1 shrink-0"/>
                        <span className="font-medium">{feature.title}</span>
                    </div>
                ))}
            </div>
        </div>

        <Card>
            <CardHeader className="text-center">
                <CardTitle>Solicita una Demostración Gratuita</CardTitle>
                <CardDescription>
                    Descubre cómo podemos ayudarte. Agenda una demostración virtual por Anydesk, sin compromiso.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre y Apellido</Label>
                        <Input id="nombre" placeholder="Tu nombre" required/>
                    </div>
                    <div className="space-y-2">
                         <Label htmlFor="empresa">Nombre de la Empresa</Label>
                         <Input id="empresa" placeholder="Tu empresa" required/>
                    </div>
                     <div className="space-y-2">
                         <Label htmlFor="email">Correo Electrónico</Label>
                         <Input id="email" type="email" placeholder="tu@correo.com" required/>
                    </div>
                    <div className="space-y-2">
                         <Label htmlFor="telefono">Teléfono de Contacto</Label>
                         <Input id="telefono" type="tel" placeholder="0412-1234567" required/>
                    </div>
                    <Button type="submit" className="w-full">
                        <Send className="mr-2"/>
                        Solicitar Cotización y Demo
                    </Button>
                </form>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

    
