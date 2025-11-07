
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, Info, Lightbulb, Search, Droplets, Microscope, Mountain, TestTube2, XCircle } from "lucide-react";

const loQueSiSePuede = [
    {
        title: "Color del Suelo",
        icon: Droplets,
        points: [
            "Suelos oscuros (marrón oscuro a negro): Generalmente indican un alto contenido de materia orgánica, lo que es bueno para la fertilidad y la retención de agua.",
            "Suelos rojizos o amarillentos: Suelen contener óxidos de hierro. Los suelos rojos suelen estar bien drenados, mientras que los amarillos pueden indicar un drenaje moderado.",
            "Suelos grisáceos o azulados/verdosos: Son una señal de alerta, indicando saturación de agua permanente y falta de oxígeno (condiciones anóxicas)."
        ]
    },
    {
        title: "Textura (Estimación Visual)",
        icon: Microscope,
        points: [
            "Partículas grandes y redondeadas: Podría ser un suelo arenoso, que se siente áspero.",
            "Denso y con grietas al secarse: Es probable que sea un suelo arcilloso.",
            "Estructura migajosa: Indica un suelo franco, ideal por su equilibrio."
        ]
    },
    {
        title: "Estructura y Porosidad",
        icon: Mountain,
        points: [
            "Presencia de grumos (estructura granular): Ideal para el crecimiento de raíces y la aireación.",
            "Aspecto masivo y duro: Indica un suelo compactado sin estructura."
        ]
    }
];

const loQueNoSePuede = [
    { title: "pH (Acidez/Alcalinidad)", icon: TestTube2, description: "Es fundamental para saber qué plantas cultivar. Se mide con un kit o en laboratorio." },
    { title: "Nutrientes Específicos (N-P-K)", icon: TestTube2, description: "Imposible saber los niveles de Nitrógeno, Fósforo, Potasio y micronutrientes." },
    { title: "Contaminantes", icon: TestTube2, description: "Metales pesados, residuos de hidrocarburos, etc., son invisibles a simple vista." },
];

const comoTomarFoto = [
    "Toma una Foto del Perfil: Haz un hoyo de 20-30 cm y fotografía el corte limpio para ver las capas (horizontes).",
    "Incluye un Objeto como Escala: Pon una moneda o tu mano al lado para dar una idea del tamaño.",
    "Muestra la Vegetación Actual: Las plantas que crecen en el suelo son un gran indicador de su salud.",
    "Proporciona Contexto: Indica la ubicación geográfica y para qué quieres usar el suelo (huerto, cultivo, etc.)."
];

export default function AnalisisSueloFotoPage() {
  return (
    <div className="space-y-12">
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <Search className="h-8 w-8" />
                Análisis de Suelo por Fotografía
            </h1>
            <p className="text-muted-foreground mt-2">
                Guía de diagnóstico visual para una evaluación preliminar de la salud y características del suelo.
            </p>
        </header>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Info className="text-primary"/>¿Qué se puede analizar con una foto?</CardTitle>
                <CardDescription>
                   Una foto es una herramienta de "diagnóstico rápido" en el campo, no un examen médico completo. Permite una evaluación cualitativa preliminar.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {loQueSiSePuede.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={item.title}>
                            <AccordionTrigger>
                                <div className="flex items-center gap-3 font-semibold">
                                    <item.icon className="h-5 w-5 text-primary"/>
                                    <span>{item.title}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                               <ul className="pl-10 space-y-3 text-muted-foreground">
                                   {item.points.map(point => (
                                       <li key={point} className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-1 shrink-0"/>
                                            <span>{point}</span>
                                       </li>
                                   ))}
                               </ul>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>

         <Alert variant="destructive">
            <XCircle className="h-4 w-4"/>
            <AlertTitle>Lo que NO puedes analizar con una foto</AlertTitle>
            <AlertDescription>
                <p className="mb-4">Una foto no puede reemplazar un análisis de laboratorio para mediciones químicas precisas.</p>
                <div className="grid md:grid-cols-3 gap-4">
                {loQueNoSePuede.map(item => (
                    <div key={item.title} className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 shrink-0"/>
                        <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-xs">{item.description}</p>
                        </div>
                    </div>
                ))}
                </div>
            </AlertDescription>
        </Alert>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Guía para una Foto Útil</CardTitle>
                <CardDescription>Para que un experto pueda ayudarte, sigue estos consejos al tomar la foto.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {comoTomarFoto.map((item, index) => (
                        <li key={index} className="flex items-start gap-4 p-3 bg-secondary/50 rounded-lg">
                           <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">{index + 1}</div>
                           <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
        
        <Card className="bg-primary/10 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Lightbulb/>Recomendación Final</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg">
                   Usa la foto para una primera evaluación. Si detectas algo preocupante o si planeas un cultivo de alto valor, **confirma siempre tus sospechas con un análisis profesional de suelo** en un laboratorio especializado.
                </p>
            </CardContent>
        </Card>
    </div>
  );
}
