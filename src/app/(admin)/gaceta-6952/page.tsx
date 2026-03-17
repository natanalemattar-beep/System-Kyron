
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Scale, Loader as Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { consultGaceta6952, type GacetaConsultantOutput } from "@/ai/flows/gaceta-6952-consultant";

export default function Gaceta6952Page() {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<GacetaConsultantOutput | null>(null);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setResponse(null);

        try {
            const result = await consultGaceta6952({ query });
            setResponse(result);
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Error en la Consulta",
                description: "No se pudo obtener una respuesta del asistente. Inténtalo de nuevo."
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <header className="text-center">
                <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-2">
                    <Scale className="h-8 w-8" />
                    Asistente Consultor de la Gaceta 6.952
                </h1>
                <p className="text-muted-foreground mt-2">
                    Realiza tus consultas sobre los Decretos 5.196, 5.197 y 5.198.
                </p>
            </header>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="flex gap-4">
                        <Input 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Ej: ¿Qué necesito para no pagar IVA si traigo repuestos?"
                            disabled={isLoading}
                        />
                        <Button type="submit" disabled={isLoading || !query.trim()}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin"/> : "Consultar"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {isLoading && (
                <div className="text-center p-8">
                    <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary"/>
                    <p className="mt-4 text-muted-foreground">Analizando tu consulta...</p>
                </div>
            )}

            {response && (
                 <Card className="bg-card/80 backdrop-blur-sm animate-in fade-in">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                           <Sparkles className="h-5 w-5 text-yellow-400"/>
                           Respuesta del Asistente
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm dark:prose-invert max-w-none text-justify whitespace-pre-wrap">
                        {response}
                    </CardContent>
                </Card>
            )}

        </div>
    );
}
