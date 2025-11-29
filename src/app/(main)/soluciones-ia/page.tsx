
"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BrainCircuit, FileScan, ListTree, ArrowRight, Bot, Loader2, Smile, Frown, Meh, BadgeCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzeSentiment, type AnalyzeSentimentOutput } from "@/ai/flows/sentiment-analysis";
import { Progress } from "@/components/ui/progress";

const iaSolutions = [
    {
        title: "Extracción Automática de Datos",
        description: "Sube facturas, recibos o cualquier documento y nuestra IA extraerá la información clave por ti, ahorrándote horas de trabajo manual.",
        icon: FileScan,
        href: "/data-entry"
    },
    {
        title: "Categorización de Transacciones",
        description: "Conecta tus cuentas y la IA categorizará automáticamente tus ingresos y gastos para un análisis financiero claro y sin esfuerzo.",
        icon: ListTree,
        href: "/transactions"
    },
];

export default function SolucionesIAPage() {
    const [textToAnalyze, setTextToAnalyze] = useState("");
    const [analysisResult, setAnalysisResult] = useState<AnalyzeSentimentOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleAnalyze = async () => {
        if (!textToAnalyze.trim()) {
            toast({
                variant: "destructive",
                title: "Texto Vacío",
                description: "Por favor, introduce texto para analizar."
            });
            return;
        }
        
        setIsLoading(true);
        setAnalysisResult(null);

        try {
            const result = await analyzeSentiment({ textToAnalyze });
            if (result && 'sentiment' in result && 'confidence' in result) {
                setAnalysisResult(result);
            } else {
                 toast({
                    variant: "destructive",
                    title: "Error en el Análisis",
                    description: (result as any).error || "No se pudo obtener una respuesta válida del servicio de IA.",
                });
            }
        } catch (error) {
             toast({
                variant: "destructive",
                title: "Error inesperado",
                description: "Ocurrió un problema al conectar con el servicio de IA.",
            });
        }
        
        setIsLoading(false);
    };
    
    const getSentimentInfo = (sentiment: "Positivo" | "Negativo" | "Neutral" | undefined) => {
        switch (sentiment) {
            case "Positivo":
                return { icon: <Smile className="h-16 w-16 text-green-400" />, color: "bg-green-500/10 border-green-500/20", textColor: "text-green-400" };
            case "Negativo":
                return { icon: <Frown className="h-16 w-16 text-red-400" />, color: "bg-red-500/10 border-red-500/20", textColor: "text-red-400" };
            case "Neutral":
                return { icon: <Meh className="h-16 w-16 text-yellow-400" />, color: "bg-yellow-500/10 border-yellow-500/20", textColor: "text-yellow-400" };
            default:
                 return { icon: null, color: "", textColor: "" };
        }
    };

    const sentimentInfo = getSentimentInfo(analysisResult?.sentiment);

    return (
        <div className="space-y-12">
            <header className="text-center">
                <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
                    <BrainCircuit className="h-12 w-12" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight">Soluciones con Inteligencia Artificial</h1>
                <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
                    Automatiza tareas, obtén análisis inteligentes y toma decisiones más rápidas para potenciar tu negocio.
                </p>
            </header>

            <div className="grid gap-8 md:grid-cols-2">
                {iaSolutions.map(solution => (
                    <Card key={solution.title} className="flex flex-col bg-card/80">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <solution.icon className="h-8 w-8 text-primary"/>
                                </div>
                                <CardTitle className="text-xl">{solution.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <CardDescription>{solution.description}</CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href={solution.href}>
                                    Probar ahora <ArrowRight className="ml-2 h-4 w-4"/>
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Card className="bg-card/80">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <Bot className="h-6 w-6 text-primary"/>
                        Análisis de Sentimiento de Clientes
                    </CardTitle>
                    <CardDescription>
                        Pega una reseña, un comentario o cualquier texto de un cliente para analizar su opinión al instante.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="sentiment-text" className="font-medium">Texto a Analizar</Label>
                            <Textarea 
                                id="sentiment-text" 
                                placeholder="Ej: 'El servicio fue excelente, pero el producto llegó tarde.'" 
                                className="min-h-[200px]"
                                value={textToAnalyze}
                                onChange={(e) => setTextToAnalyze(e.target.value)}
                            />
                        </div>
                        <Button onClick={handleAnalyze} disabled={isLoading} className="w-full h-11">
                            {isLoading ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <BrainCircuit className="mr-2 h-5 w-5" />
                            )}
                            Analizar Sentimiento
                        </Button>
                    </div>
                    <div className={`flex items-center justify-center p-6 rounded-lg transition-colors duration-300 ${analysisResult ? sentimentInfo.color : 'bg-secondary'}`}>
                        {!analysisResult && !isLoading && (
                             <div className="text-center text-muted-foreground">
                                <Bot className="h-16 w-16 mx-auto mb-4 opacity-50"/>
                                <p className="font-medium">El resultado del análisis aparecerá aquí.</p>
                            </div>
                        )}
                        {isLoading && (
                            <div className="text-center">
                                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                                <p className="mt-4 text-muted-foreground font-semibold">Analizando...</p>
                            </div>
                        )}
                        {analysisResult && (
                            <div className="text-center space-y-4 w-full animate-in fade-in duration-500">
                                {sentimentInfo.icon}
                                <div>
                                    <p className={`text-5xl font-bold ${sentimentInfo.textColor}`}>{analysisResult.sentiment}</p>
                                    <div className="mt-4 space-y-2">
                                        <p className="text-sm font-medium">Confianza del Análisis</p>
                                        <Progress value={analysisResult.confidence * 100} className="w-full" />
                                        <p className="font-bold text-lg">{Math.round(analysisResult.confidence * 100)}%</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
            
             <Card className="bg-primary/10 border-primary/20 text-center">
                <CardHeader>
                    <CardTitle>¿Necesitas más poder?</CardTitle>
                    <CardDescription>
                        Podemos desarrollar soluciones de IA a medida para las necesidades específicas de tu empresa.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button>Solicitar una Demo Personalizada <ArrowRight className="ml-2"/></Button>
                </CardContent>
            </Card>
        </div>
    );
}
