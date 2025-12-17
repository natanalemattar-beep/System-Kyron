
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, BarChart2, Zap, BrainCircuit, Users } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";

const perfilData = {
    nombre: "Ana Pérez",
    cargo: "Gerente de Proyectos",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    puntuacionGeneral: 88,
    personalidad: "Ejecutor (ENTJ)",
    descripcionPersonalidad: "Líder natural, eficiente y estratégico. Disfruta resolviendo problemas complejos y guiando equipos hacia el éxito. A veces puede parecer impaciente con la ineficiencia.",
    competencias: [
        { subject: 'Liderazgo', A: 95, fullMark: 100 },
        { subject: 'Comunicación', A: 85, fullMark: 100 },
        { subject: 'Resol. de Problemas', A: 92, fullMark: 100 },
        { subject: 'Toma de Decisiones', A: 88, fullMark: 100 },
        { subject: 'Adaptabilidad', A: 78, fullMark: 100 },
        { subject: 'Trabajo en Equipo', A: 82, fullMark: 100 },
    ],
    puntosFuertes: ["Visión Estratégica", "Orientación a Resultados", "Organización"],
    areasMejora: ["Delegación Efectiva", "Escucha Activa", "Paciencia con los procesos"],
};


export default function AnalisisPersonalPage() {
    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <User className="h-8 w-8" />
                    Análisis de Perfil Psicológico y Competencias
                </h1>
                <p className="text-muted-foreground mt-2">
                    Evaluación de personalidad, habilidades y potencial de desarrollo.
                </p>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-8">
                    <Card className="bg-card/50 backdrop-blur-sm text-center">
                        <CardContent className="p-6">
                            <Avatar className="h-32 w-32 mx-auto mb-4 border-4 border-primary">
                                <AvatarImage src={perfilData.avatarUrl} alt={perfilData.nombre} />
                                <AvatarFallback>{perfilData.nombre.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h2 className="text-2xl font-bold">{perfilData.nombre}</h2>
                            <p className="text-primary font-medium">{perfilData.cargo}</p>
                        </CardContent>
                    </Card>
                     <Card className="bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BarChart2/>Puntuación General</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-6xl font-bold text-primary">{perfilData.puntuacionGeneral}</p>
                            <p className="text-muted-foreground">sobre 100</p>
                            <Progress value={perfilData.puntuacionGeneral} className="mt-4" />
                        </CardContent>
                    </Card>
                </div>
                 <div className="lg:col-span-2">
                    <Card className="bg-card/50 backdrop-blur-sm h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BrainCircuit/>Perfil de Personalidad: {perfilData.personalidad}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-6">{perfilData.descripcionPersonalidad}</p>
                            <div className="h-80">
                                <ChartContainer config={{}} className="w-full h-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart data={perfilData.competencias}>
                                            <PolarGrid />
                                            <PolarAngleAxis dataKey="subject" />
                                            <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                            <Radar name={perfilData.nombre} dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                                             <ChartTooltip
                                                cursor={{
                                                    stroke: "hsl(var(--primary))",
                                                    strokeWidth: 1,
                                                    fill: "hsl(var(--primary) / 0.1)",
                                                }}
                                                content={<ChartTooltipContent />}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Zap className="text-green-500"/>Puntos Fuertes</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-2">
                            {perfilData.puntosFuertes.map((item) => (
                                <li key={item} className="flex items-center gap-2 p-2 bg-secondary/50 rounded-md">{item}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                 <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Users className="text-yellow-500"/>Áreas de Mejora Sugeridas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {perfilData.areasMejora.map((item) => (
                                <li key={item} className="flex items-center gap-2 p-2 bg-secondary/50 rounded-md">{item}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

