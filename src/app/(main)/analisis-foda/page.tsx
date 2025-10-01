
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Zap, TrendingUp, AlertTriangle, ShieldAlert, ArrowRight, Lightbulb } from "lucide-react";

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

const estrategias = {
    fo: "Estrategia FO (Ofensiva): Lanzar una plataforma de e-commerce robusta para clientes corporativos, aprovechando la marca y la cartera de clientes existente para vender la nueva línea de tecnología de oficina.",
    da: "Estrategia DA (Supervivencia): Diversificar la base de proveedores y capacitar al equipo en ventas digitales para reducir la dependencia y competir eficazmente contra nuevos actores del mercado.",
}


export default function AnalisisFodaPage() {
  return (
    <div className="p-4 md:p-8">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Briefcase className="h-8 w-8" />
            Análisis FODA y Estratégico
        </h1>
        <p className="text-muted-foreground mt-2">
          Diagnóstico de la situación interna y externa de la empresa para la toma de decisiones.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fortalezas */}
        <Card className="bg-green-600/5 border-green-600/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-green-400"><Zap />Fortalezas</CardTitle>
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

        {/* Oportunidades */}
        <Card className="bg-blue-600/5 border-blue-600/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-blue-400"><TrendingUp />Oportunidades</CardTitle>
            </CardHeader>
            <CardContent>
                 <ul className="space-y-3">
                    {fodaData.oportunidades.map(item => (
                        <li key={item.text} className="flex items-start gap-3">
                            <item.icon className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                            <span>{item.text}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>

        {/* Debilidades */}
        <Card className="bg-orange-600/5 border-orange-600/20">
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

        {/* Amenazas */}
        <Card className="bg-red-600/5 border-red-600/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-red-400"><ShieldAlert />Amenazas</CardTitle>
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

       <Card className="mt-8 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3"><Lightbulb className="text-yellow-400"/>Estrategias Cruzadas Sugeridas</CardTitle>
          <CardDescription>
            Acciones recomendadas basadas en el cruce de los cuadrantes del análisis FODA para maximizar oportunidades y minimizar riesgos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="p-4 rounded-lg bg-green-600/10 border border-green-600/20">
                <h4 className="font-semibold text-green-400 mb-2">Estrategia FO (Maxi-Maxi): Usar Fortalezas para Aprovechar Oportunidades</h4>
                <p className="text-sm">{estrategias.fo}</p>
            </div>
             <div className="p-4 rounded-lg bg-red-600/10 border border-red-600/20">
                <h4 className="font-semibold text-red-400 mb-2">Estrategia DA (Mini-Mini): Minimizar Debilidades y Neutralizar Amenazas</h4>
                <p className="text-sm">{estrategias.da}</p>
            </div>
             <Button variant="outline" className="w-full md:w-auto">
                Ver más estrategias (FA, DO) <ArrowRight className="ml-2"/>
            </Button>
        </CardContent>
      </Card>

    </div>
  );
}
