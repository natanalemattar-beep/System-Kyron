"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TrendingUp, FileWarning, HelpCircle, CheckCircle, ListOrdered, Calculator } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const calculoSimplificado = [
    { paso: 1, titulo: "Excluir Cuentas no Monetarias", descripcion: "Se identifican y excluyen del Estado de Situación Financiera las cuentas que no son monetarias, como inventarios, activos fijos, y el patrimonio." },
    { paso: 2, titulo: "Calcular la Posición Monetaria Neta", descripcion: "Se restan los Pasivos Monetarios de los Activos Monetarios. Si el resultado es positivo, hay una pérdida por inflación. Si es negativo, hay una ganancia." },
    { paso: 3, titulo: "Aplicar el Factor de Inflación", descripcion: "La Posición Monetaria Neta se multiplica por el Índice Nacional de Precios al Consumidor (INPC) del período para determinar el monto del ajuste." },
];

export default function AjustePorInflacionPage() {

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <TrendingUp className="h-8 w-8" />
            Ajuste por Inflación Fiscal
        </h1>
        <p className="text-muted-foreground mt-2">
          Guía sobre el Reajuste por Inflación Fiscal (RIPF) y sus implicaciones para contribuyentes del ISLR.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><HelpCircle className="text-primary"/>¿Qué es el Ajuste por Inflación Fiscal?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Es un procedimiento obligatorio establecido en la Ley de Impuesto Sobre la Renta (LISLR) que busca sincerar la información financiera de una empresa para reflejar los efectos de la inflación. Su objetivo es calcular la ganancia o pérdida monetaria que una entidad experimenta por mantener activos y pasivos monetarios en un entorno inflacionario. Este ajuste es crucial porque determina una base más realista para el cálculo del ISLR.
                    </p>
                </CardContent>
            </Card>
             <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>¿Quiénes Deben Realizar el Ajuste?</CardTitle>
                </CardHeader>
                <CardContent>
                     <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span>Las personas jurídicas y entidades que realizan actividades comerciales, industriales, bancarias, financieras o de seguros.</span>
                        </li>
                         <li className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span>Personas que se dedican a la explotación de minas, hidrocarburos y actividades conexas.</span>
                        </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span>Contribuyentes que, aunque no se dediquen a las actividades anteriores, utilizan los principios de contabilidad generalmente aceptados para determinar sus ingresos.</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Alert variant="destructive">
                <FileWarning className="h-4 w-4" />
                <AlertTitle>Importancia del Ajuste</AlertTitle>
                <AlertDescription>
                    No realizar el ajuste por inflación o hacerlo de forma incorrecta puede resultar en la determinación de un impuesto erróneo y acarrear sanciones por parte del SENIAT.
                </AlertDescription>
            </Alert>
        </div>
      </div>
      
       <Card className="mt-8 bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="flex items-center gap-3"><ListOrdered/>Proceso de Cálculo Simplificado</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculoSimplificado.map(paso => (
                <div key={paso.paso} className="p-4 bg-secondary/50 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">Paso {paso.paso}: {paso.titulo}</h3>
                    <p className="text-sm text-muted-foreground">{paso.descripcion}</p>
                </div>
            ))}
        </CardContent>
        <CardFooter>
            <p className="text-xs text-muted-foreground">
                Nota: Este es un resumen simplificado. El proceso completo involucra múltiples ajustes a las partidas no monetarias y el cálculo del Reajuste Regular y Extraordinario. Nuestro sistema automatiza este complejo cálculo.
            </p>
        </CardFooter>
       </Card>

    </div>
  );
}

