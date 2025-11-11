
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sparkles, Bot, Video, UserCheck, Package, Lightbulb, ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const marketingTrends = [
    {
        icon: Bot,
        title: "Inteligencia Artificial (IA) y Automatización",
        points: ["IA Generativa para creación rápida de contenido y anuncios.", "Hiper-Automatización de flujos de trabajo multicanal basada en comportamiento."]
    },
    {
        icon: Video,
        title: "Experiencia de Contenido Inmersivo y Corto",
        points: ["Video Marketing Corto (TikTok, Reels) para máxima visibilidad.", "Realidad Aumentada (AR) para 'probar' productos virtualmente.", "Social Commerce para compras directas en redes sociales."]
    },
    {
        icon: UserCheck,
        title: "Personalización Extrema y Data Ética",
        points: ["Uso de Zero-Party Data (datos directos del cliente) para experiencias personalizadas.", "Comunicar un compromiso real con la sostenibilidad y la transparencia."]
    }
];

const innovativeProducts = [
    {
        niche: "Tecnología Inteligente / Domótica",
        products: "Iluminación LED Inteligente, Enchufes y Sensores WiFi, Cámaras de seguridad con IA.",
        why: "Alto margen, demanda constante por confort y eficiencia energética. Tendencia de 'Smart Home'."
    },
    {
        niche: "Salud y Bienestar (Self-Care)",
        products: "Dispositivos de terapia de percusión (pistolas de masaje), gadgets terapéuticos, difusores de aceites esenciales inteligentes.",
        why: "Crecimiento impulsado por la conciencia sobre la salud. Atractivo margen en productos de 'calidad percibida'."
    },
    {
        niche: "Productos para Mascotas (Pet Tech)",
        products: "Comederos y bebederos automáticos, Collares rastreadores GPS, Juguetes interactivos con IA.",
        why: "Dueños invierten cada vez más en tecnología que mejora la vida de sus mascotas y brinda tranquilidad."
    },
    {
        niche: "Accesorios de Nicho para Móviles",
        products: "Cargadores Inalámbricos de Alta Velocidad, Soportes Magnéticos para autos, Gadgets de privacidad para laptop.",
        why: "Artículos de bajo volumen y alto margen. La gente actualiza accesorios con más frecuencia que los teléfonos."
    },
    {
        niche: "Estilo de Vida y Moda Sostenible",
        products: "Ropa y accesorios hechos con materiales reciclados o éticos (algodón orgánico, bambú).",
        why: "Satisface la creciente demanda de los consumidores por productos con responsabilidad social y ecológica."
    }
];


export default function MarketingInnovadorPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
            <Sparkles className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Marketing Innovador y Productos de Nicho</h1>
        <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
          Un resumen de las principales tendencias de marketing digital y una selección de productos de nicho con alto potencial para importar y comercializar.
        </p>
      </header>
      
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Tendencias de Marketing Actual (2025)</CardTitle>
            <CardDescription>El marketing actual se centra en la IA, la personalización extrema y la autenticidad para combatir la saturación de contenido.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketingTrends.map(trend => (
                <div key={trend.title} className="p-6 bg-secondary/50 rounded-lg">
                    <trend.icon className="h-8 w-8 text-primary mb-4"/>
                    <h3 className="font-semibold text-lg">{trend.title}</h3>
                    <ul className="mt-2 space-y-2 text-sm text-muted-foreground list-disc pl-4">
                        {trend.points.map(point => <li key={point}>{point}</li>)}
                    </ul>
                </div>
            ))}
        </CardContent>
      </Card>
      
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Package/>Productos Innovadores y de Nicho para Importar</CardTitle>
            <CardDescription>Los mejores productos tienen un alto margen, bajo costo de envío y apuntan a nichos en crecimiento.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[25%]">Nicho de Producto</TableHead>
                            <TableHead className="w-[35%]">Productos con Potencial</TableHead>
                            <TableHead className="w-[40%]">¿Por Qué Son Innovadores/Rentables?</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {innovativeProducts.map(prod => (
                            <TableRow key={prod.niche}>
                                <TableCell className="font-semibold">{prod.niche}</TableCell>
                                <TableCell>{prod.products}</TableCell>
                                <TableCell>{prod.why}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </CardContent>
      </Card>
      
      <Alert>
        <Lightbulb className="h-4 w-4"/>
        <AlertTitle>Consejo Estratégico para la Innovación</AlertTitle>
        <AlertDescription>
            <p>El verdadero potencial está en usar las tendencias de marketing para vender los productos importados. Por ejemplo: Importa auriculares inalámbricos de oído abierto (tendencia tecnológica) y promociónalos usando videos cortos en TikTok mostrando a un usuario probándolos mientras hace ejercicio o trabaja (video marketing + autenticidad).</p>
            <Button variant="link" className="p-0 h-auto mt-4 text-sm">
                Delinear una estrategia de marketing inicial <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
