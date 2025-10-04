
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Stamp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const tasas = {
    "SENIAT": 0.02, // 2%
    "SAREN": 0.05, // 5%
    "SAPI": 0.03, // 3%
    "Alcaldías": 0.01, // 1%
    "Gobernación": 0.01, // 1%
};

export default function TimbresFiscalesPage() {
    const [organismo, setOrganismo] = useState<keyof typeof tasas | "">("");
    const [montoBase, setMontoBase] = useState<number | "">("");
    const [montoCalculado, setMontoCalculado] = useState<number | null>(null);

    const handleCalculate = () => {
        if (organismo && montoBase) {
            const tasa = tasas[organismo];
            const calculado = Number(montoBase) * tasa;
            setMontoCalculado(calculado);
        } else {
            setMontoCalculado(null);
        }
    };


  return (
    <div className="p-4 md:p-8">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Stamp className="h-8 w-8" />
            Cálculo de Timbres Fiscales
        </h1>
        <p className="text-muted-foreground mt-2">
          Calcula el monto de los timbres fiscales para trámites en distintos organismos.
        </p>
      </header>
      <div className="flex justify-center">
        <Card className="w-full max-w-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
            <CardTitle>Calculadora de Timbres</CardTitle>
            <CardDescription>
                Selecciona el organismo e ingresa el monto base del trámite para calcular el costo.
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="organismo">Organismo</Label>
                    <Select onValueChange={(value) => setOrganismo(value as keyof typeof tasas)}>
                        <SelectTrigger id="organismo">
                            <SelectValue placeholder="Selecciona un organismo" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(tasas).map(key => (
                                <SelectItem key={key} value={key}>{key}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="monto-base">Monto Base del Trámite (Bs.)</Label>
                    <Input 
                        id="monto-base" 
                        type="number" 
                        placeholder="Ej: 5000" 
                        value={montoBase}
                        onChange={(e) => setMontoBase(e.target.value === '' ? '' : Number(e.target.value))}
                    />
                </div>
                 <Button className="w-full" onClick={handleCalculate} disabled={!organismo || !montoBase}>
                    <Calculator className="mr-2" />
                    Calcular Monto
                </Button>
            </CardContent>

            {montoCalculado !== null && (
                <CardFooter className="flex flex-col items-start bg-secondary/30 p-6">
                    <h3 className="text-lg font-semibold">Resultado del Cálculo</h3>
                    <div className="w-full mt-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Monto Base:</span>
                            <span>{formatCurrency(Number(montoBase), 'Bs.')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Organismo:</span>
                            <span>{organismo}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">Tasa Aplicada:</span>
                            <span>{tasas[organismo! as keyof typeof tasas] * 100}%</span>
                        </div>
                         <div className="flex justify-between font-bold text-base mt-2 border-t pt-2 border-primary/50">
                            <span className="text-primary">Monto del Timbre Fiscal:</span>
                            <span className="text-primary">{formatCurrency(montoCalculado, 'Bs.')}</span>
                        </div>
                    </div>
                </CardFooter>
            )}
        </Card>
      </div>
    </div>
  );
}

    
