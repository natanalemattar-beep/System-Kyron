
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, ShieldCheck, Cpu, GitBranch, TrendingUp, CheckCircle, Rocket, Eye } from "lucide-react";

const competitors = [
    { name: "Saint, Profit Plus", strength: "Extrema robustez, consolidados en grandes empresas.", weakness: "Interfaz compleja, curva de aprendizaje alta, menor agilidad en la nube." },
    { name: "A2 Softway", strength: "Fuerte presencia en retail y puntos de venta, buena red de soporte.", weakness: "Menos enfocado en la nube y en integraciones modernas vía API." },
    { name: "Galac", strength: "Excelente reputación en cumplimiento fiscal y contable.", weakness: "Interfaz tradicionalmente centrada en el contador, menos en la experiencia de usuario gerencial." },
    { name: "Odoo, SAP (Internacionales)", strength: "Plataformas ERP muy potentes y modulares.", weakness: "Costo de implementación y licenciamiento muy elevado; requieren una compleja adaptación a la normativa venezolana." },
];

const differentiators = [
    {
        icon: GitBranch,
        title: "Ecosistema Integrado (Hardware + Software)",
        description: "A diferencia de la competencia, no solo ofrecemos un software, sino un ecosistema donde el hardware (Papelera Inteligente) y el software (Sistema de Gestión) se retroalimentan. Esto crea barreras de entrada, múltiples flujos de ingreso y un valor único para el cliente."
    },
    {
        icon: Cpu,
        title: "Inteligencia Artificial Proactiva",
        description: "Mientras otros sistemas automatizan tareas, nosotros vamos un paso más allá. Nuestra IA no solo procesa datos, sino que predice flujos de caja, anticipa riesgos fiscales y sugiere estrategias de optimización, convirtiendo la contabilidad en una herramienta de inteligencia de negocio."
    },
    {
        icon: ShieldCheck,
        title: "Garantía de Cero Riesgo Fiscal",
        description: "Esta es nuestra propuesta de valor más audaz. Mediante una arquitectura de auditoría continua, IA predictiva y blockchain, ofrecemos una garantía de cumplimiento que ningún competidor puede igualar, eliminando el principal 'dolor' del empresario venezolano."
    }
];

const roadmap = [
    {
        phase: "Fase 1: Sistema Administrativo Robusto (Actual)",
        description: "Un sistema SaaS completo que iguala o supera las funcionalidades clave de la competencia (facturación, inventario, contabilidad) pero con una interfaz moderna y una experiencia de usuario superior.",
        status: "Completado"
    },
    {
        phase: "Fase 2: Plataforma Inteligente (En Desarrollo)",
        description: "Integración profunda de los módulos de IA: análisis de sentimiento, extracción de datos de documentos y motor de recomendaciones para ventas y optimización de costos.",
        status: "En Progreso"
    },
    {
        phase: "Fase 3: Ecosistema Predictivo y Autónomo (Futuro)",
        description: "Implementación de la contabilidad predictiva, el escudo fiscal proactivo y la integración total del ecosistema de hardware/software, posicionándonos como una plataforma de inteligencia de negocio (BI).",
        status: "Planificado"
    }
];

export default function AnalisisCompetitivoPage() {
    return (
        <div className="space-y-12">
            <header className="text-center">
                <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
                    <Zap className="h-12 w-12" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight">Análisis Competitivo y Estrategia de Producto</h1>
                <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
                    Cómo System C.M.S. se diferencia de la competencia y nuestra visión para el futuro de la gestión empresarial.
                </p>
            </header>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>El Panorama Competitivo en Venezuela</CardTitle>
                    <CardDescription>Un resumen de los principales actores del mercado de software administrativo.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    {competitors.map(comp => (
                        <div key={comp.name} className="p-4 bg-secondary/50 rounded-lg">
                            <h3 className="font-bold text-lg text-foreground">{comp.name}</h3>
                            <p className="text-sm mt-2"><strong className="text-green-500">Fortaleza:</strong> {comp.strength}</p>
                            <p className="text-sm mt-1"><strong className="text-red-500">Debilidad:</strong> {comp.weakness}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Nuestros Diferenciadores Clave: El "Foso" Competitivo</CardTitle>
                    <CardDescription>No competimos en las mismas reglas. Creamos una categoría nueva.</CardDescription>
                </CardHeader>
                <CardContent className="grid lg:grid-cols-3 gap-8">
                    {differentiators.map(diff => (
                        <div key={diff.title} className="p-6 border rounded-xl flex flex-col items-center text-center">
                            <div className="p-4 bg-primary/10 rounded-full mb-4">
                                <diff.icon className="h-10 w-10 text-primary" />
                            </div>
                            <h3 className="font-semibold text-xl">{diff.title}</h3>
                            <p className="text-muted-foreground text-sm mt-2">{diff.description}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

             <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Rocket className="h-6 w-6"/>Roadmap de Producto: Nuestra Visión Evolutiva</CardTitle>
                    <CardDescription>De un sistema administrativo a una plataforma de inteligencia de negocio autónoma.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative border-l-2 border-primary/20 pl-8 space-y-12 py-4">
                        {roadmap.map(item => (
                            <div key={item.phase} className="relative">
                                <div className={`absolute -left-[3.2rem] top-1 flex items-center justify-center w-12 h-12 rounded-full ${item.status === 'Completado' ? 'bg-green-500' : item.status === 'En Progreso' ? 'bg-blue-500' : 'bg-muted-foreground'}`}>
                                    {item.status === 'Completado' ? <CheckCircle className="text-white"/> : <Eye className="text-white"/>}
                                </div>
                                <p className={`text-sm font-semibold ${item.status === 'Completado' ? 'text-green-500' : item.status === 'En Progreso' ? 'text-blue-500' : 'text-muted-foreground'}`}>{item.status.toUpperCase()}</p>
                                <h3 className="font-bold text-xl text-foreground">{item.phase}</h3>
                                <p className="text-muted-foreground mt-1">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

             <Card className="bg-primary/10 border-primary/20 text-center">
                <CardHeader>
                    <CardTitle>Conclusión Estratégica</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xl max-w-3xl mx-auto">
                        Nuestra estrategia no es competir, sino <strong className="text-primary">redefinir el mercado</strong>. Al integrar hardware, software e IA en un ecosistema que ofrece tranquilidad fiscal, creamos una ventaja competitiva que es extremadamente difícil de replicar, asegurando nuestro liderazgo y crecimiento a largo plazo.
                    </p>
                </CardContent>
            </Card>

        </div>
    );
}
