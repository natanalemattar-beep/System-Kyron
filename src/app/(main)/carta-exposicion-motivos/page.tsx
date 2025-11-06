
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Lightbulb, Send, FileText, CheckCircle, Bot, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const recaudos = [
    {
        titulo: "1. Introducción: ¿Quién Eres?",
        descripcion: "Preséntate a ti o a tu empresa de forma concisa. Incluye tu nombre, tu rol y el nombre de tu proyecto o compañía.",
    },
    {
        titulo: "2. Objetivo Claro: ¿Qué Buscas?",
        descripcion: "Indica directamente tu intención: 'Me gustaría proponer una charla sobre...', 'Estamos interesados en explorar oportunidades de patrocinio para...', etc.",
    },
    {
        titulo: "3. Justificación: ¿Por Qué Tú?",
        descripcion: "Este es el núcleo. Explica por qué eres la persona o empresa ideal. Menciona tu experiencia, los logros de tu proyecto o el valor que tu marca puede aportar al evento.",
    },
    {
        titulo: "4. Propuesta de Valor: ¿Qué Aportas?",
        descripcion: "Detalla tu propuesta. Si es una charla, incluye un título y 2-3 puntos clave. Si es un patrocinio, sugiere cómo tu marca puede enriquecer la experiencia de los asistentes.",
    },
    {
        titulo: "5. Cierre y Llamada a la Acción",
        descripcion: "Agradece la consideración y sugiere un siguiente paso claro, como 'Quedo a su disposición para agendar una llamada y discutir más a fondo esta propuesta'.",
    },
];

export default function CartaExposicionMotivosPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: "Propuesta Enviada para Revisión",
                description: "Hemos recibido tu borrador. En breve, nuestra IA te enviará sugerencias de mejora a tu correo.",
                action: <CheckCircle className="text-green-500"/>
            })
        }, 1500);
    }

  return (
    <div className="space-y-12">
        <header className="text-center">
            <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
                <Lightbulb className="h-12 w-12" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Carta de Exposición de Motivos</h1>
            <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
              Guía para redactar una propuesta de alto impacto para eventos, inversores o socios estratégicos como el Startup Venezuela Summit.
            </p>
        </header>

         <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Los 5 Recaudos de una Propuesta Exitosa</CardTitle>
                <CardDescription>
                    Una carta de exposición de motivos no es solo un correo; es tu pitch de venta en formato escrito. Sigue esta estructura para asegurar que tu mensaje sea claro, profesional y convincente.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recaudos.map((rec, index) => (
                    <div key={rec.titulo} className={`p-4 rounded-lg bg-secondary/50 ${index >= 3 ? 'md:col-span-1 lg:col-span-1' : ''} ${index === 3 ? 'lg:col-start-2' : ''}`}>
                        <h3 className="font-semibold mb-2">{rec.titulo}</h3>
                        <p className="text-sm text-muted-foreground">{rec.descripcion}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
        
        <div className="grid lg:grid-cols-5 gap-8">
             <Card className="lg:col-span-3 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><FileText/> Plantilla: Modelo de Carta</CardTitle>
                    <CardDescription>Utiliza esta plantilla como punto de partida. Personalízala con tu información.</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm dark:prose-invert text-muted-foreground max-w-none">
                    <p><strong>Asunto:</strong> Propuesta de [Tu Objetivo: Charla / Patrocinio] para el Startup Venezuela Summit</p>
                    <p>Estimado equipo del Startup Venezuela Summit,</p>
                    <p>Mi nombre es [Tu Nombre], [Tu Cargo] en [Tu Empresa/Proyecto]. Les escribo con gran interés en participar en la próxima edición de su prestigioso evento.</p>
                    <p>Nuestro objetivo es [Explica tu objetivo: 'contribuir con una ponencia sobre...', 'explorar una alianza como patrocinadores para...'].</p>
                    <p>En [Tu Empresa], hemos [Menciona un logro clave, ej: 'desarrollado una solución que reduce los costos operativos en un 30%'] y creemos que nuestra experiencia en [Tu Área de Expertise] aportaría un valor inmenso a los asistentes, quienes están buscando activamente soluciones innovadoras.</p>
                    <p>Nuestra propuesta concreta es [Detalla tu propuesta. Ej: 'una charla de 30 minutos titulada "IA para la Optimización de PYMES", cubriendo temas como X, Y, y Z' o 'un patrocinio categoría ORO que incluiría un stand interactivo y...' ].</p>
                    <p>Agradezco de antemano su tiempo y consideración. Quedo a su entera disposición para una llamada o reunión donde podría ampliar los detalles de esta propuesta.</p>
                    <p>Atentamente,<br/>[Tu Nombre]</p>
                </CardContent>
            </Card>

            <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Redacta tu Propuesta Aquí</CardTitle>
                    <CardDescription>Utiliza el formulario para crear un borrador y enviarlo para una revisión inicial.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="objetivo">¿Cuál es tu objetivo?</Label>
                            <Select required>
                                <SelectTrigger id="objetivo">
                                    <SelectValue placeholder="Selecciona una opción..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ponente">Ser Ponente (Speaker)</SelectItem>
                                    <SelectItem value="patrocinador">Patrocinar el Evento</SelectItem>
                                    <SelectItem value="media">Alianza de Medios</SelectItem>
                                    <SelectItem value="otro">Otro</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="propuesta-borrador">Escribe el cuerpo de tu propuesta</Label>
                            <Textarea id="propuesta-borrador" placeholder="Estimado equipo del Startup Venezuela Summit..." rows={10} required/>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                             {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="mr-2 h-4 w-4" />
                            )}
                            Enviar y Recibir Feedback con IA
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    </div>
  );
}
