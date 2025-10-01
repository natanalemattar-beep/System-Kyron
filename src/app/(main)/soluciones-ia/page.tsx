
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


const iaSolutions = [
    {
        title: "Extracción Automática de Datos",
        description: "Sube facturas, recibos o cualquier documento y nuestra IA extraerá la información clave por ti.",
        icon: FileScan,
        href: "/data-entry"
    },
    {
        title: "Categorización de Transacciones",
        description: "Conecta tus cuentas y la IA categorizará automáticamente tus ingresos y gastos para un análisis financiero claro.",
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

        const result = await analyzeSentiment({ textToAnalyze });
        
        if ('error' in result) {
            toast({
                variant: "destructive",
                title: "Error en el Análisis",
                description: result.error,
            });
        } else {
            setAnalysisResult(result);
        }
        
        setIsLoading(false);
    };
    
    const getSentimentIcon = (sentiment: "Positivo" | "Negativo" | "Neutral" | undefined) => {
        switch (sentiment) {
            case "Positivo":
                return <Smile className="h-10 w-10 text-green-500" />;
            case "Negativo":
                return <Frown className="h-10 w-10 text-red-500" />;
            case "Neutral":
                return <Meh className="h-10 w-10 text-yellow-500" />;
            default:
                return null;
        }
    };

    return (
        <div className="p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <BrainCircuit className="h-8 w-8 text-primary" />
                    Soluciones con Inteligencia Artificial
                </h1>
                <p className="text-muted-foreground mt-2">
                    Automatiza tareas y obtén análisis inteligentes para potenciar tu negocio.
                </p>
            </header>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Módulos existentes */}
                {iaSolutions.map(solution => (
                    <Card key={solution.title} className="bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <solution.icon className="h-6 w-6 text-primary"/>
                                <span>{solution.title}</span>
                            </CardTitle>
                            <CardDescription>{solution.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant="outline">
                                <Link href={solution.href}>
                                    Ir al Módulo <ArrowRight className="ml-2 h-4 w-4"/>
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Nuevo Módulo: Análisis de Sentimiento */}
            <Card className="mt-8 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <Bot className="h-6 w-6 text-primary"/>
                        Análisis de Sentimiento de Clientes
                    </CardTitle>
                    <CardDescription>
                        Pega una reseña, un comentario o cualquier texto de un cliente para analizar su sentimiento.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="sentiment-text">Texto a Analizar</Label>
                            <Textarea 
                                id="sentiment-text" 
                                placeholder="Ej: 'El servicio fue excelente, pero el producto llegó tarde.'" 
                                className="min-h-[150px]"
                                value={textToAnalyze}
                                onChange={(e) => setTextToAnalyze(e.target.value)}
                            />
                        </div>
                        <Button onClick={handleAnalyze} disabled={isLoading} className="w-full">
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <BrainCircuit className="mr-2 h-4 w-4" />
                            )}
                            Analizar Sentimiento
                        </Button>
                    </div>
                    <div className="flex items-center justify-center p-6 bg-secondary/30 rounded-lg">
                        {!analysisResult && !isLoading && (
                             <div className="text-center text-muted-foreground">
                                <p>El resultado del análisis aparecerá aquí.</p>
                            </div>
                        )}
                        {isLoading && (
                            <div className="text-center">
                                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                                <p className="mt-4 text-muted-foreground">Analizando...</p>
                            </div>
                        )}
                        {analysisResult && (
                            <div className="text-center space-y-4">
                                {getSentimentIcon(analysisResult.sentiment)}
                                <div>
                                    <p className="text-3xl font-bold">{analysisResult.sentiment}</p>
                                    <div className="flex items-center justify-center gap-2 text-sm text-green-500 font-medium mt-2">
                                        <BadgeCheck className="h-4 w-4" />
                                        <span>Confianza del {Math.round(analysisResult.confidence * 100)}%</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
                 <CardFooter>
                    <p className="text-xs text-muted-foreground">
                        Esta herramienta es ideal para analizar rápidamente feedback de clientes, comentarios en redes sociales o resultados de encuestas.
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
