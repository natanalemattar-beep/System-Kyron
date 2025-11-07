
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Swords, UserPlus, Handshake, Users, Repeat, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const porterForces = [
    {
        force: "Rivalidad entre Competidores Existentes",
        icon: Swords,
        description: "Analiza la intensidad de la competencia directa en el mercado. Una alta rivalidad reduce la rentabilidad.",
        highPressureFactors: ["Muchos competidores del mismo tamaño.", "Crecimiento lento del sector.", "Productos poco diferenciados (guerra de precios)."],
        application: "En el sector de software administrativo en Venezuela, la rivalidad es alta (Saint, A2, Profit Plus). La diferenciación debe venir por el servicio, la facilidad de uso y el cumplimiento fiscal garantizado."
    },
    {
        force: "Amenaza de Nuevos Entrantes",
        icon: UserPlus,
        description: "Evalúa qué tan fácil es para nuevas empresas entrar a tu mercado. Si es fácil, la rentabilidad puede bajar.",
        highPressureFactors: ["Baja inversión inicial requerida.", "Pocas regulaciones o barreras legales.", "Fácil acceso a proveedores y canales de distribución."],
        application: "La barrera de entrada para un software homologado por el SENIAT es alta debido al costo de desarrollo y al complejo proceso de certificación, lo que es una ventaja competitiva."
    },
    {
        force: "Poder de Negociación de los Proveedores",
        icon: Handshake,
        description: "Mide la capacidad de los proveedores para imponer precios y condiciones. Si tienen mucho poder, pueden reducir tus márgenes.",
        highPressureFactors: ["Pocos proveedores de una materia prima clave.", "Costo alto para cambiar de proveedor.", "El proveedor ofrece un insumo único o muy diferenciado."],
        application: "Para el hardware de las papeleras inteligentes, la dependencia de proveedores de componentes electrónicos (sensores, chips) puede ser un riesgo. Es clave diversificar y negociar a largo plazo."
    },
    {
        force: "Poder de Negociación de los Compradores",
        icon: Users,
        description: "Analiza el poder de los clientes para exigir precios más bajos o mejores condiciones.",
        highPressureFactors: ["Pocos clientes que compran en grandes volúmenes.", "Productos estándar, sin diferenciación.", "El cliente puede fabricar el producto por sí mismo."],
        application: "Para el software SaaS, el poder de los clientes es moderado. Aunque hay alternativas, la migración de datos y la curva de aprendizaje de un nuevo sistema crea un costo de cambio que los retiene."
    },
    {
        force: "Amenaza de Productos Sustitutos",
        icon: Repeat,
        description: "Evalúa la probabilidad de que los clientes encuentren una forma diferente de hacer lo que tu producto hace.",
        highPressureFactors: ["Existen sustitutos con mejor precio o rendimiento.", "Bajo costo para el cliente al cambiar al sustituto."],
        application: "Un sustituto para el software contable podría ser un contador externo que lleve los libros manualmente en Excel. La amenaza se mitiga demostrando el ahorro de tiempo y la reducción de errores del software."
    }
];


export default function NivelCompetenciaPage() {

  return (
    <div className="p-4 md:p-8 space-y-12">
      <header className="mb-8 text-center">
        <div className="inline-block p-4 bg-primary/10 text-primary rounded-full mb-4">
            <Swords className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Nivel de Competencia: Análisis de las 5 Fuerzas de Porter</h1>
        <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
          Una herramienta estratégica esencial para entender la estructura de tu industria y anticipar los movimientos de la competencia.
        </p>
      </header>
      
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Las 5 Fuerzas que Moldean tu Mercado</CardTitle>
            <CardDescription>
                Este modelo, creado por Michael Porter, permite analizar qué tan atractiva es una industria y detectar oportunidades y amenazas.
            </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {porterForces.map((force) => (
                <div key={force.force} className="p-6 bg-secondary/50 rounded-lg">
                    <force.icon className="h-8 w-8 text-primary mb-4"/>
                    <h3 className="font-semibold text-lg">{force.force}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{force.description}</p>
                </div>
            ))}
        </CardContent>
      </Card>
      
       <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Análisis Detallado y Aplicación Práctica</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
            {porterForces.map((force, index) => (
                 <div key={index} className="p-6 rounded-lg border">
                    <h3 className="font-semibold text-xl mb-4 flex items-center gap-3">
                        <force.icon className="h-6 w-6 text-primary"/>
                        {force.force}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-medium mb-2">Factores de Alta Presión:</h4>
                            <ul className="space-y-2 text-sm">
                                {force.highPressureFactors.map(factor => (
                                    <li key={factor} className="flex items-start gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0"/> 
                                        <span>{factor}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-4 bg-secondary/30 rounded-md">
                            <h4 className="font-medium mb-2">Aplicación a "System C.M.S":</h4>
                            <p className="text-sm text-muted-foreground">{force.application}</p>
                        </div>
                    </div>
                </div>
            ))}
        </CardContent>
       </Card>
       
       <Alert>
        <AlertTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5"/>
            Conclusión Estratégica
        </AlertTitle>
        <AlertDescription>
          <p>Un análisis de las 5 Fuerzas revela que, si bien el mercado de software es competitivo, existen barreras de entrada regulatorias (homologación) y costos de cambio para el cliente que pueden ser explotados. La estrategia debe centrarse en la diferenciación a través de un servicio superior, la facilidad de uso y un ecosistema de productos integrados (Hardware + Software) que cree una barrera competitiva difícil de imitar.</p>
           <Button asChild variant="link" className="p-0 h-auto mt-2">
                <Link href="/analisis-estrategico">Ver Análisis FODA y CAME <ArrowRight className="h-4 w-4 ml-1"/></Link>
            </Button>
        </AlertDescription>
      </Alert>

    </div>
  );
}
