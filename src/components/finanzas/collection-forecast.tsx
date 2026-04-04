"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { Loader2, Inbox } from "lucide-react";

interface ForecastItem {
  cliente: string;
  siete_dias: number;
  treinta_dias: number;
}

export const CollectionForecast = () => {
  const [data, setData] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analisis/cobranza')
      .then(r => r.ok ? r.json() : { data: [] })
      .then(d => setData(d.data ?? []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Pronóstico de Cobranza</CardTitle>
        <CardDescription>Cuentas por cobrar esperadas en el corto plazo.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8 gap-3 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Cargando pronóstico...</span>
          </div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground gap-2">
            <Inbox className="h-7 w-7 opacity-30" />
            <p className="text-sm font-semibold">Sin cuentas por cobrar pendientes</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-right">7 Días</TableHead>
                <TableHead className="text-right">30 Días</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map(item => (
                <TableRow key={item.cliente}>
                  <TableCell className="font-medium">{item.cliente}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.siete_dias, 'Bs.')}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.treinta_dias, 'Bs.')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
