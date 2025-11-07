
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lightbulb, Package, Target, ShoppingCart, TrendingUp } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const marketingDeProductos = [
    "Definir el posicionamiento de la marca.",
    "Elaborar el mensaje y los canales de comunicación.",
    "Monitorear el rendimiento del producto post-lanzamiento."
];

const estrategiasDeMarketing = [
    "Incluye las '4 P' del marketing: Producto, Precio, Plaza (distribución) y Promoción.",
    "Utiliza tácticas como SEO, marketing de contenidos, redes sociales, e influencers.",
];


export default function MarketingProductosVsEstrategiasPage() {
  return (
    <div className="space-y-8">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Lightbulb className="h-8 w-8" />
            Marketing de Productos vs. Estrategias de Marketing
        </h1>
        <p className="text-muted-foreground mt-2">
          Comprende la diferencia clave entre el enfoque táctico en un producto y el plan estratégico general.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Package className="text-primary"/>Marketing de Productos</CardTitle>
                <CardDescription>
                    Es el proceso de llevar un producto al mercado, incluyendo la comprensión del público objetivo y la colaboración entre los equipos de producto, marketing y ventas.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <h4 className="font-semibold mb-2">Componentes Clave:</h4>
                 <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {marketingDeProductos.map(item => <li key={item}>{item}</li>)}
                 </ul>
            </CardContent>
        </Card>
         <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><TrendingUp className="text-primary"/>Estrategias de Marketing</CardTitle>
                 <CardDescription>
                    Es un plan integral que describe cómo una empresa promocionará sus productos y servicios para alcanzar objetivos como el crecimiento de ingresos y la visibilidad de la marca.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <h4 className="font-semibold mb-2">Componentes Clave:</h4>
                 <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {estrategiasDeMarketing.map(item => <li key={item}>{item}</li>)}
                 </ul>
            </CardContent>
        </Card>
      </div>

       <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Diferencias Fundamentales</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/4">Aspecto</TableHead>
                        <TableHead className="w-2/5 font-semibold text-primary">Marketing de Productos</TableHead>
                        <TableHead className="w-2/5 font-semibold text-primary">Estrategias de Marketing</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-semibold">Definición</TableCell>
                        <TableCell>Proceso de llevar un producto específico al mercado.</TableCell>
                        <TableCell>Plan integral para promocionar todos los productos/servicios.</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="font-semibold">Enfoque</TableCell>
                        <TableCell>Centrado en un producto específico y su alineación con el cliente.</TableCell>
                        <TableCell>Amplio, abarcando toda la mezcla de marketing (4 P's).</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="font-semibold">Componentes</TableCell>
                        <TableCell>Posicionamiento, mensaje, canales, rendimiento del producto.</TableCell>
                        <TableCell>Producto, Precio, Plaza, Promoción.</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="font-semibold">Ejemplos</TableCell>
                        <TableCell>Definir que un nuevo software es "la solución más fácil para PYMES".</TableCell>
                        <TableCell>Lanzar una campaña en redes sociales y ajustar precios para ganar cuota de mercado.</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
       </Card>
       
       <Alert>
            <Target className="h-4 w-4"/>
            <AlertTitle>Conclusión Estratégica</AlertTitle>
            <AlertDescription>
                Ambos son cruciales y están interconectados. El **Marketing de Productos** sienta las bases (define QUÉ es el producto y para QUIÉN), mientras que las **Estrategias de Marketing** construyen sobre esa base (definen CÓMO se venderá y promocionará a gran escala). Un buen marketing de productos hace que las estrategias de marketing sean mucho más efectivas.
            </AlertDescription>
       </Alert>
    </div>
  );
}
