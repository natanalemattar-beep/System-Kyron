
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle, HelpCircle, Puzzle, ThumbsUp, ShieldCheck, ArrowRight, FileWarning } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const faqItems = [
    {
        question: "¿Qué es un sistema administrativo en Venezuela?",
        answer: "Es un software que gestiona procesos contables y de facturación, adaptado a la normativa del país, especialmente las exigencias del SENIAT."
    },
    {
        question: "¿Cuál es el mejor software administrativo homologado por el Seniat?",
        answer: "Depende de cada negocio, pero opciones como Hybrid LiteOS, Galac y Profit Plus destacan por cumplir con la providencia vigente. La elección debe basarse en el tamaño de la empresa y sus necesidades específicas."
    },
    {
        question: "¿Qué beneficios tiene para una pyme?",
        answer: "Ordena la facturación, controla inventarios, reduce errores humanos y, lo más importante, asegura el cumplimiento fiscal, lo que se traduce en tranquilidad."
    },
    {
        question: "¿Cuánto cuesta implementar un sistema administrativo?",
        answer: "Los precios varían según licencias, usuarios y soporte, pero lo importante es ver el costo como una inversión en seguridad y tranquilidad."
    },
    {
        question: "¿Se puede usar a distancia?",
        answer: "Sí, cada vez más soluciones ofrecen acceso remoto o son basadas en la nube, ideal para gerentes que necesitan revisar reportes desde cualquier lugar."
    }
];

const softwareComparison = [
  { name: "Saint (versión clásica)", homologated: "Parcial", focus: "Contabilidad y facturación básica", idealFor: "Comercios que ya lo manejan y no quieren cambiar aún" },
  { name: "Galac Administrativo", homologated: "Sí", focus: "Gestión integral administrativa y contable", idealFor: "Empresas medianas y grandes que buscan un ecosistema completo" },
  { name: "Profit Plus", homologated: "Sí", focus: "Administración + contabilidad", idealFor: "Negocios en crecimiento que necesitan escalabilidad" },
  { name: "Hybrid LiteOS", homologated: "Sí (Providencia 121)", focus: "Gestión administrativa práctica y flexible", idealFor: "Pymes y comerciantes que buscan simplicidad + confianza" },
  { name: "SAP Business One", homologated: "Sí (versión adaptada a Venezuela)", focus: "ERP corporativo", idealFor: "Grandes corporaciones con alto presupuesto" },
];


export default function SoftwareContablePage() {
  return (
    <div className="p-4 md:p-8 space-y-12">
       <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
            <Puzzle className="h-10 w-10 text-primary"/>
            Guía Completa para Elegir tu Sistema Administrativo
        </h1>
        <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
          En un entorno donde la inflación y los impuestos son retos constantes, contar con un sistema confiable no es un lujo: es un salvavidas que da control y tranquilidad al empresario.
        </p>
      </header>

      <Alert variant="destructive" className="max-w-4xl mx-auto">
          <FileWarning className="h-4 w-4"/>
          <AlertTitle>Advertencia Oficial del SENIAT</AlertTitle>
          <AlertDescription>
            Según la <strong>Providencia Administrativa N° SNAT/2024/000121</strong> (Gaceta Oficial N° 43.032), solo están autorizados los Software Homologados y sus versiones específicas. "Las versiones anteriores de estos sistemas y cualquier otra variante de los mismos no incluidos en esta lista <strong>NO ESTÁN AUTORIZADOS</strong>." El uso de software no homologado puede acarrear sanciones.
          </AlertDescription>
      </Alert>

      {/* Main Sections */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>¿Qué es un Sistema Administrativo y por qué es Clave en Venezuela?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Un sistema administrativo es un software que ayuda a manejar las operaciones de un negocio: facturación, inventario, contabilidad, compras y ventas. En Venezuela, su importancia es doble: no solo facilita la gestión interna, sino que también asegura el cumplimiento con las normativas del SENIAT, que exige que los programas estén homologados según la providencia vigente.
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Evolución de los Sistemas Administrativos en el País</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>El mercado venezolano ha visto varias etapas. Desde pioneros como <strong>Saint</strong> en los años 90, pasando por soluciones consolidadas como <strong>Galac y Profit Plus</strong>, hasta llegar a nuevas alternativas como <strong>Hybrid LiteOS</strong>, que responden mejor a la necesidad actual de simplicidad y cumplimiento legal.</p>
                    <p className="text-sm italic text-muted-foreground p-3 bg-secondary/30 rounded-lg">
                        "Comencé hace más de 25 años con Saint, cuando se usaba en DOS. Aprendí que la tecnología solo sirve si se adapta a la realidad del dueño de negocio: sus miedos, su forma de llevar cuentas y hasta su relación con el Seniat."
                    </p>
                </CardContent>
            </Card>
        </div>
        <Card className="lg:col-span-1 bg-primary/10 border-primary/20">
             <CardHeader>
                <CardTitle className="flex items-center gap-2"><ThumbsUp/> Beneficios Clave</CardTitle>
            </CardHeader>
             <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                    <div>
                        <h4 className="font-semibold">Control de Inventario y Facturación</h4>
                        <p className="text-xs text-muted-foreground">Evita pérdidas y factura sin errores.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                    <div>
                        <h4 className="font-semibold">Cumplimiento con el SENIAT</h4>
                        <p className="text-xs text-muted-foreground">La clave es usar software homologado para evitar multas.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                    <div>
                        <h4 className="font-semibold">Mayor Productividad</h4>
                        <p className="text-xs text-muted-foreground">Reduce errores humanos y enfócate en crecer.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                    <div>
                        <h4 className="font-semibold">Paz Mental</h4>
                        <p className="text-xs text-muted-foreground">Un buen sistema te da tranquilidad y control.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

       <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Comparativa de Sistemas Administrativos en Venezuela</CardTitle>
            <CardDescription>
                Según la Providencia Administrativa N° SNAT/2024/000121, solo el software homologado está autorizado. Esta tabla resume las opciones más comunes del mercado.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="overflow-x-auto">
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Software</TableHead>
                            <TableHead className="text-center">Homologado por Seniat</TableHead>
                            <TableHead>Enfoque Principal</TableHead>
                            <TableHead>Ideal para…</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {softwareComparison.map((item) => (
                            <TableRow key={item.name}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell className="text-center">
                                    {item.homologated.startsWith("Sí") ? 
                                    <Badge variant="default" className="bg-green-600 hover:bg-green-700"><Check className="mr-1 h-4 w-4"/> {item.homologated}</Badge> : 
                                    <Badge variant="secondary">{item.homologated}</Badge>
                                    }
                                </TableCell>
                                <TableCell>{item.focus}</TableCell>
                                <TableCell>{item.idealFor}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </CardContent>
       </Card>

      {/* FAQ */}
      <section>
         <h2 className="text-2xl font-semibold mb-8 text-center">Preguntas Frecuentes</h2>
         <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
                 <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>
                        <div className="flex items-center gap-3">
                            <HelpCircle className="h-5 w-5 text-primary" />
                            <span>{item.question}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-10">
                        {item.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </section>
      
       {/* Call to Action */}
       <Card className="bg-gradient-to-r from-primary/80 to-cyan-500/80 text-primary-foreground">
         <CardContent className="p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
                <h2 className="text-3xl font-bold">Da el Siguiente Paso con Tranquilidad</h2>
                <p className="mt-2 opacity-80 max-w-2xl">
                    Elegir un sistema administrativo en Venezuela no es solo una decisión técnica: es una inversión en tu tranquilidad y en el futuro de tu negocio.
                </p>
            </div>
             <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/80 shrink-0">
                Solicitar Asesoría Personalizada <ArrowRight className="ml-2"/>
            </Button>
         </CardContent>
       </Card>

    </div>
  );
}

    