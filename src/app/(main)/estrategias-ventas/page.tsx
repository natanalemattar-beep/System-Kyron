
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Package, Tag, Users, Zap } from "lucide-react";

const estrategias = [
    {
        icon: Package,
        titulo: "Crear un Combo 'Kit de Oficina Esencial'",
        descripcion: "Agrupa 'Resma de Papel', 'Caja de Bolígrafos' y 'Tóner' con un 10% de descuento. Esto incrementa el ticket promedio y rota productos de alta demanda.",
        impacto: "Aumento del 15% en ventas de productos de papelería.",
    },
    {
        icon: Tag,
        titulo: "Lanzar una Promoción 'Compra una Silla, llévate un Teclado con 50% Dto.'",
        descripcion: "Incentiva la compra de mobiliario de mayor valor (Sillas) apalancando la venta de accesorios con alto margen de ganancia como los teclados.",
        impacto: "Incremento del 25% en ventas de la categoría 'Mobiliario'.",
    },
    {
        icon: Users,
        titulo: "Implementar un Programa de Lealtad para Clientes Corporativos",
        descripcion: "Ofrece descuentos por volumen y compras recurrentes a clientes como 'Constructora XYZ'. Fomenta la retención y aumenta la frecuencia de compra.",
        impacto: "Aumento del 30% en la tasa de retención de clientes B2B.",
    },
];

export default function EstrategiasVentasPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Lightbulb className="h-8 w-8 text-yellow-400" />
            Estrategias para Aumentar Ventas
        </h1>
        <p className="text-muted-foreground mt-2">
          Sugerencias generadas por IA para impulsar el crecimiento de tu negocio.
        </p>
      </header>

      <div className="flex justify-center mb-8">
        <Button size="lg">
            <Zap className="mr-2" />
            Generar Nuevas Estrategias con IA
        </Button>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {estrategias.map((estrategia) => (
                <Card key={estrategia.titulo} className="flex flex-col bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-start gap-3">
                            <div className="p-3 rounded-lg bg-primary/10">
                               <estrategia.icon className="h-6 w-6 text-primary" />
                            </div>
                           <span>{estrategia.titulo}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground mb-4">{estrategia.descripcion}</p>
                        <p className="text-sm font-semibold text-green-500">Impacto Estimado: <span className="font-normal">{estrategia.impacto}</span></p>
                    </CardContent>
                    <CardContent>
                         <Button variant="outline" className="w-full">Implementar Estrategia</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}

    