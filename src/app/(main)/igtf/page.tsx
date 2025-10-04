
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Percent, Info, CheckCircle, Calculator } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const serviciosExonerados = [
    "Venta de alimentos y productos de primera necesidad (no procesados).",
    "Servicios de salud privados, como consultas médicas y hospitalización.",
    "Servicios educativos prestados por instituciones inscritas en el MPPE.",
    "Venta de medicamentos y equipos médicos.",
    "Transporte de pasajeros (terrestre, acuático y aéreo nacional).",
    "Venta de libros, revistas y periódicos.",
];

export default function IgtfExoneracionesPage() {
    const [montoBase, setMontoBase] = useState<number | "">("");
    const [montoIgtf, setMontoIgtf] = useState<number | null>(null);
    const tasaIgtf = 0.03; // 3%

    const handleCalculate = () => {
        if (montoBase) {
            setMontoIgtf(Number(montoBase) * tasaIgtf);
        }
    }

  return (
    <div className="p-4 md:p-8">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Percent className="h-8 w-8" />
            IGTF y Exoneraciones de IVA
        </h1>
        <p className="text-muted-foreground mt-2">
          Guía sobre el Impuesto a las Grandes Transacciones Financieras y las operaciones exentas de IVA.
        </p>
      </header>
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Info className="text-primary"/>¿Qué es el IGTF?</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    El Impuesto a las Grandes Transacciones Financieras (IGTF) es un tributo que grava ciertas operaciones realizadas por los "Sujetos Pasivos Especiales" (Contribuyentes Especiales). Generalmente, se aplica a los pagos realizados en moneda extranjera o criptomonedas dentro del sistema bancario nacional, así como a los pagos en bolívares a cuentas de un mismo titular en diferentes bancos. La alícuota actual es del 3%.
                </p>
            </CardContent>
        </Card>
         <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Calculadora de IGTF</CardTitle>
                <CardDescription>Estima el monto del IGTF para una transacción.</CardDescription>
            </CardHeader>
             <CardContent className="space-y-4">
                 <div className="space-y-2">
                     <Label htmlFor="monto-base">Monto del Pago (en Divisas o Cripto)</Label>
                     <Input 
                        id="monto-base" 
                        type="number" 
                        placeholder="Ej: 100.00" 
                        value={montoBase} 
                        onChange={(e) => setMontoBase(e.target.value === "" ? "" : Number(e.target.value))}
                     />
                 </div>
                  <Button onClick={handleCalculate} className="w-full"><Calculator className="mr-2"/>Calcular</Button>
             </CardContent>
            {montoIgtf !== null && (
                 <CardFooter className="flex flex-col items-start bg-secondary/50 p-4 rounded-b-xl">
                    <p className="font-semibold">Monto del IGTF (3%):</p>
                    <p className="text-2xl font-bold text-primary">{formatCurrency(montoIgtf, 'Bs.')}</p>
                    <p className="text-xs text-muted-foreground">Este monto debe ser percibido y enterado al SENIAT.</p>
                 </CardFooter>
             )}
         </Card>
         <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><CheckCircle className="text-green-500"/>Operaciones Exoneradas de IVA</CardTitle>
                <CardDescription>
                   No son las "empresas" las que están exoneradas, sino los bienes y servicios que venden. Si una empresa vende productos gravados y exonerados, solo facturará con IVA los primeros.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <h4 className="font-semibold mb-4">Principales Bienes y Servicios Exonerados en Venezuela:</h4>
                <ul className="space-y-3">
                    {serviciosExonerados.map((servicio, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span>{servicio}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
             <CardFooter>
                 <p className="text-xs text-muted-foreground">
                    Nuestro sistema permite configurar qué productos o servicios están exentos de IVA para automatizar el cálculo correcto en cada factura.
                 </p>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
