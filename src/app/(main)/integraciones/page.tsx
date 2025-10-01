

"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cog, Repeat, ShoppingCart, CreditCard, Landmark, MessageSquare, Cloud } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const integraciones = [
    {
        icon: Repeat,
        titulo: "Sistemas ERP y CRM",
        descripcion: "Sincroniza tus datos de clientes, facturas, inventario y contabilidad con sistemas como SAP, Salesforce u Odoo.",
    },
    {
        icon: ShoppingCart,
        titulo: "Plataformas de E-commerce",
        descripcion: "Conecta tu tienda en Shopify, WooCommerce o Tiendanube para automatizar la facturación y actualizar el stock en tiempo real.",
    },
    {
        icon: CreditCard,
        titulo: "Pasarelas de Pago",
        descripcion: "Integra Stripe, PayPal o MercadoPago para procesar pagos en línea de forma segura y conciliar transacciones automáticamente.",
    },
    {
        icon: Landmark,
        titulo: "Bancos Nacionales",
        descripcion: "Conecta tus cuentas bancarias para realizar conciliaciones automáticas y tener una visión clara de tu flujo de caja.",
    },
    {
        icon: MessageSquare,
        titulo: "Herramientas de Comunicación",
        descripcion: "Envía notificaciones de facturas, recordatorios de pago y alertas de inventario a través de WhatsApp Business o Slack.",
    },
    {
        icon: Cloud,
        titulo: "Almacenamiento en la Nube",
        descripcion: "Guarda y sincroniza automáticamente copias de seguridad de tus documentos fiscales y contables en Google Drive o Dropbox.",
    },
]

export default function IntegracionesPage() {
  const { toast } = useToast();

  const handleConnect = (titulo: string) => {
    toast({
        title: "Conexión en Proceso",
        description: `Se ha iniciado el proceso para conectar con ${titulo}.`,
    })
  }

  return (
    <div className="p-4 md:p-8">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Cog className="h-8 w-8" />
            Integraciones y Conexiones
        </h1>
        <p className="text-muted-foreground mt-2">
          Conecta System C.M.S con tus herramientas favoritas para automatizar flujos de trabajo.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {integraciones.map((item) => (
            <Card key={item.titulo} className="flex flex-col bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex-row items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle>{item.titulo}</CardTitle>
                        <CardDescription className="pt-1">{item.descripcion}</CardDescription>
                    </div>
                </CardHeader>
                <CardFooter className="mt-auto">
                    <Button variant="outline" className="w-full" onClick={() => handleConnect(item.titulo)}>
                        Conectar
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
