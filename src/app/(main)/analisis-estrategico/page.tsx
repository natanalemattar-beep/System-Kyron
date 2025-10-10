
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Zap, TrendingUp, AlertTriangle, ShieldAlert, ArrowRight, Lightbulb, Puzzle, Layers, Scale } from "lucide-react";

const fodaData = {
    fortalezas: [
        { icon: Zap, text: "Marca reconocida en el sector de papelería y suministros." },
        { icon: Zap, text: "Cartera de clientes corporativos leales y recurrentes." },
        { icon: Zap, text: "Sistema de gestión integrado (System C.R.S) que optimiza operaciones." },
    ],
    oportunidades: [
        { icon: TrendingUp, text: "Crecimiento del sector e-commerce para ventas B2B." },
        { icon: TrendingUp, text: "Demanda de soluciones de digitalización de documentos." },
        { icon: TrendingUp, text: "Posibilidad de expandir la línea de productos a tecnología de oficina." },
    ],
    debilidades: [
        { icon: AlertTriangle, text: "Dependencia de un número reducido de proveedores clave." },
        { icon: AlertTriangle, text: "Canal de ventas online poco desarrollado en comparación con la tienda física." },
        { icon: AlertTriangle, text: "Capacitación del personal enfocada principalmente en ventas tradicionales." },
    ],
    amenazas: [
        { icon: ShieldAlert, text: "Entrada de nuevos competidores con precios agresivos y enfoque digital." },
        { icon: ShieldAlert, text: "Fluctuaciones en la tasa de cambio que afectan los costos de importación." },
        { icon: ShieldAlert, text: "Cambios regulatorios en la normativa de importación de tecnología." },
    ]
};

const estrategiasCAME = {
    fo: "Lanzar una plataforma de e-commerce robusta para clientes corporativos, aprovechando la marca y la cartera de clientes existente para vender la nueva línea de tecnología de oficina.",
    da: "Diversificar la base de proveedores y capacitar al equipo en ventas digitales para reducir la dependencia y competir eficazmente contra nuevos actores del mercado.",
}

const pestleData = [
    { factor: "Político", descripcion: "Nuevas regulaciones de importación podrían afectar la disponibilidad de productos tecnológicos." },
    { factor: "Económico", descripcion: "La fluctuación de la tasa de cambio impacta directamente en los costos de adquisición de mercancía." },
    { factor: "Social", descripcion: "Aumento de la demanda de productos sostenibles y ecológicos por parte de los consumidores." },
    { factor: "Tecnológico", descripcion: "Crecimiento del e-commerce y la necesidad de digitalización en los procesos de venta." },
    { factor: "Legal", descripcion: "Cambios en la Ley de Protección de Datos que afectan la gestión de la información de clientes." },
    { factor: "Ambiental", descripcion: "Preferencia por proveedores con certificaciones de manejo forestal responsable." },
];


export default function AnalisisEstrategicoPage() {
  return (
    <div className="space-y-12">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Briefcase className="h-8 w-8" />
            Centro de Análisis Estratégico
        </h1>
        <p className="text-muted-foreground mt-2">
          Herramientas para el diagnóstico interno y externo de tu empresa.
        </p>
      </header>

        {/* Sección FODA */}
        <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">Paso 1: Diagnóstico Interno y Externo (FODA)</h2>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-green-500"><Zap />Fortalezas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {fodaData.fortalezas.map(item => (
                                <li key={item.text} className="flex items-start gap-3">
                                    <item.icon className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-primary"><TrendingUp />Oportunidades</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {fodaData.oportunidades.map(item => (
                                <li key={item.text} className="flex items-start gap-3">
                                    <item.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-orange-400"><AlertTriangle />Debilidades</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {fodaData.debilidades.map(item => (
                                <li key={item.text} className="flex items-start gap-3">
                                    <item.icon className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-red-500"><ShieldAlert />Amenazas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {fodaData.amenazas.map(item => (
                                <li key={item.text} className="flex items-start gap-3">
                                    <item.icon className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </section>

        {/* Sección CAME */}
        <section>
             <h2 className="text-2xl font-semibold mb-4 text-center">Paso 2: Definición de Estrategias (CAME)</h2>
             <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                <CardTitle className="flex items-center gap-3"><Puzzle className="text-primary"/>Análisis CAME: De la Reflexión a la Acción</CardTitle>
                <CardDescription>
                    El análisis CAME (Corregir, Afrontar, Mantener, Explotar) traduce los hallazgos del FODA en estrategias concretas.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-4 rounded-lg bg-secondary">
                        <h4 className="font-semibold text-primary mb-2">Estrategia Ofensiva (Fortalezas + Oportunidades): Explotar</h4>
                        <p className="text-sm">{estrategiasCAME.fo}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary">
                        <h4 className="font-semibold text-primary mb-2">Estrategia de Supervivencia (Debilidades + Amenazas): Afrontar</h4>
                        <p className="text-sm">{estrategiasCAME.da}</p>
                    </div>
                    <Button variant="outline" className="w-full md:w-auto">
                        Ver más estrategias (Adaptativas y Defensivas) <ArrowRight className="ml-2"/>
                    </Button>
                </CardContent>
            </Card>
        </section>

        {/* Sección PESTLE */}
        <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">Paso 3: Análisis del Macroentorno (PESTLE)</h2>
             <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Layers className="text-primary"/>Análisis PESTLE: Entendiendo el Contexto General</CardTitle>
                    <CardDescription>
                        Evalúa los factores Políticos, Económicos, Sociales, Tecnológicos, Legales y Ambientales que impactan tu negocio.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {pestleData.map(item => (
                        <div key={item.factor} className="p-3 rounded-lg bg-secondary flex items-start gap-4">
                            <span className="font-bold text-primary w-28">{item.factor}:</span>
                            <p className="text-sm flex-1">{item.descripcion}</p>
                        </div>
                    ))}
                     <div className="text-sm text-muted-foreground pt-4 text-center">
                        <p>Otras herramientas complementarias a considerar son las <span className="font-semibold">Cinco Fuerzas de Porter</span> para analizar la competencia en el sector.</p>
                    </div>
                </CardContent>
            </Card>
        </section>

    </div>
  );
}

    