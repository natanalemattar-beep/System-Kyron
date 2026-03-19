
"use client";

import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { addDays, format, differenceInYears } from "date-fns";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardData {
  ingresos: number;
  gastos: number;
  utilidadNeta: number;
  liquidezTotal: number;
  cuentasCobrar: number;
  cuentasPagar: number;
}

interface InventarioItem {
  id: number;
  nombre: string;
  categoria: string;
  costo_unitario: string;
  stock_actual: number;
  created_at: string;
}

function computeDepreciation(costoTotal: number, vidaUtil: number, fechaCompra: string) {
  const years = differenceInYears(new Date(), new Date(fechaCompra));
  const depAnual = costoTotal / vidaUtil;
  const acumulada = Math.min(depAnual * Math.max(years, 0), costoTotal);
  return { acumulada, valorContable: costoTotal - acumulada };
}

export function ReportsView() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: addDays(new Date(new Date().getFullYear(), 0, 1), 365),
  });

  const [dashData, setDashData] = useState<DashboardData | null>(null);
  const [inventario, setInventario] = useState<InventarioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('/api/dashboard').then(r => r.ok ? r.json() : null),
      fetch('/api/inventario').then(r => r.ok ? r.json() : { items: [] }),
    ]).then(([dash, inv]) => {
      setDashData(dash);
      setInventario(inv?.items ?? []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const ingresos = dashData?.ingresos ?? 0;
  const gastos = dashData?.gastos ?? 0;
  const costoBienes = gastos * 0.35;
  const gastosOp = gastos * 0.65;
  const gananciaBruta = ingresos - costoBienes;
  const ingresoNeto = gananciaBruta - gastosOp;

  const liquidez = dashData?.liquidezTotal ?? 0;
  const cxc = dashData?.cuentasCobrar ?? 0;
  const cxp = dashData?.cuentasPagar ?? 0;
  const valorInventario = inventario.reduce((s, i) => s + parseFloat(i.costo_unitario) * i.stock_actual, 0);

  const totalCurrentAssets = liquidez + cxc + valorInventario;
  const totalNonCurrentAssets = inventario.reduce((s, i) => {
    const total = parseFloat(i.costo_unitario) * i.stock_actual;
    const { valorContable } = computeDepreciation(total, 5, i.created_at);
    return s + valorContable;
  }, 0);
  const totalAssets = totalCurrentAssets + totalNonCurrentAssets;

  const totalCurrentLiabilities = cxp;
  const totalEquity = Math.max(totalAssets - totalCurrentLiabilities, 0);

  const muebles = inventario.filter(i => !['inmueble', 'terreno', 'edificio'].includes((i.categoria ?? '').toLowerCase()));
  const inmuebles = inventario.filter(i => ['inmueble', 'terreno', 'edificio'].includes((i.categoria ?? '').toLowerCase()));

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <CardTitle>Centro de Reportes</CardTitle>
            <CardDescription>Reportes financieros generados desde la base de datos en tiempo real.</CardDescription>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button id="date" variant={"outline"} className="w-[300px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>{format(date.from, "LLL dd, y")} — {format(date.to, "LLL dd, y")}</>
                  ) : format(date.from, "LLL dd, y")
                ) : <span>Elige una fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3 py-8">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <Tabs defaultValue="income-statement">
            <TabsList className="flex-wrap h-auto justify-start">
              <TabsTrigger value="income-statement">Estado de Resultados</TabsTrigger>
              <TabsTrigger value="balance-sheet">Balance General</TabsTrigger>
              <TabsTrigger value="depreciation-movable">Depreciación (Bienes Muebles)</TabsTrigger>
              <TabsTrigger value="depreciation-immovable">Depreciación (Bienes Inmuebles)</TabsTrigger>
            </TabsList>

            <TabsContent value="income-statement" className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Ingresos Totales</TableCell>
                    <TableCell className="text-right">{formatCurrency(ingresos, 'Bs.')}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-8 text-muted-foreground">Costo de Bienes Vendidos (est. 35%)</TableCell>
                    <TableCell className="text-right text-muted-foreground">({formatCurrency(costoBienes, 'Bs.')})</TableCell>
                  </TableRow>
                  <TableRow className="font-bold border-t">
                    <TableCell>Ganancia Bruta</TableCell>
                    <TableCell className="text-right">{formatCurrency(gananciaBruta, 'Bs.')}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium pt-6">Gastos Operativos</TableCell>
                    <TableCell className="text-right pt-6">({formatCurrency(gastosOp, 'Bs.')})</TableCell>
                  </TableRow>
                  <TableRow className={`font-bold border-t text-lg ${ingresoNeto >= 0 ? 'text-primary' : 'text-destructive'}`}>
                    <TableCell>Ingreso Neto (Ganancias y Pérdidas)</TableCell>
                    <TableCell className="text-right">{formatCurrency(ingresoNeto, 'Bs.')}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="balance-sheet" className="pt-4">
              <div className="border rounded-lg p-4">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold">ESTADO DE SITUACIÓN</h3>
                  <p className="text-sm text-muted-foreground">Al {format(new Date(), "dd 'de' MMMM, yyyy")}</p>
                  <p className="text-xs text-muted-foreground">(Valores expresados en Bs.)</p>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-2/3">Descripción</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell className="font-bold text-base">ACTIVOS</TableCell><TableCell></TableCell></TableRow>
                    <TableRow><TableCell className="font-semibold pl-4">Activos Corrientes</TableCell><TableCell></TableCell></TableRow>
                    <TableRow><TableCell className="pl-8 text-muted-foreground">Efectivo y Equivalentes (saldo bancario)</TableCell><TableCell className="text-right">{formatCurrency(liquidez, 'Bs.')}</TableCell></TableRow>
                    <TableRow><TableCell className="pl-8 text-muted-foreground">Cuentas por Cobrar</TableCell><TableCell className="text-right">{formatCurrency(cxc, 'Bs.')}</TableCell></TableRow>
                    <TableRow><TableCell className="pl-8 text-muted-foreground">Inventario</TableCell><TableCell className="text-right">{formatCurrency(valorInventario, 'Bs.')}</TableCell></TableRow>
                    <TableRow><TableCell className="font-semibold pl-4 border-t">Total Activos Corrientes</TableCell><TableCell className="text-right font-semibold border-t">{formatCurrency(totalCurrentAssets, 'Bs.')}</TableCell></TableRow>
                    <TableRow><TableCell className="font-semibold pl-4 pt-4">Activos No Corrientes (Valor Contable Neto)</TableCell><TableCell className="text-right pt-4">{formatCurrency(totalNonCurrentAssets, 'Bs.')}</TableCell></TableRow>
                    <TableRow className="bg-secondary/50 font-bold text-lg"><TableCell>TOTAL ACTIVOS</TableCell><TableCell className="text-right">{formatCurrency(totalAssets, 'Bs.')}</TableCell></TableRow>
                    <TableRow><TableCell className="font-bold text-base pt-8">PASIVOS Y PATRIMONIO</TableCell><TableCell></TableCell></TableRow>
                    <TableRow><TableCell className="pl-8 text-muted-foreground">Cuentas por Pagar</TableCell><TableCell className="text-right">{formatCurrency(totalCurrentLiabilities, 'Bs.')}</TableCell></TableRow>
                    <TableRow className="bg-muted/40 font-bold"><TableCell className="pl-4">TOTAL PASIVOS</TableCell><TableCell className="text-right">{formatCurrency(totalCurrentLiabilities, 'Bs.')}</TableCell></TableRow>
                    <TableRow><TableCell className="pl-8 text-muted-foreground">Patrimonio Neto (Activos − Pasivos)</TableCell><TableCell className="text-right">{formatCurrency(totalEquity, 'Bs.')}</TableCell></TableRow>
                    <TableRow className="bg-secondary/50 font-bold text-lg"><TableCell>TOTAL PASIVOS Y PATRIMONIO</TableCell><TableCell className="text-right">{formatCurrency(totalCurrentLiabilities + totalEquity, 'Bs.')}</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="depreciation-movable" className="pt-4">
              {muebles.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No hay bienes muebles registrados en inventario.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Activo</TableHead>
                      <TableHead>Fecha de Ingreso</TableHead>
                      <TableHead className="text-right">Costo</TableHead>
                      <TableHead className="text-right">Vida Útil (Años)</TableHead>
                      <TableHead className="text-right">Depreciación Acumulada</TableHead>
                      <TableHead className="text-right">Valor Contable</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {muebles.map(item => {
                      const costoTotal = parseFloat(item.costo_unitario) * item.stock_actual;
                      const vidaUtil = 5;
                      const { acumulada, valorContable } = computeDepreciation(costoTotal, vidaUtil, item.created_at);
                      return (
                        <TableRow key={item.id}>
                          <TableCell>{item.nombre}</TableCell>
                          <TableCell>{format(new Date(item.created_at), 'dd/MM/yyyy')}</TableCell>
                          <TableCell className="text-right">{formatCurrency(costoTotal, 'Bs.')}</TableCell>
                          <TableCell className="text-right">{vidaUtil}</TableCell>
                          <TableCell className="text-right">{formatCurrency(acumulada, 'Bs.')}</TableCell>
                          <TableCell className="text-right font-medium">{formatCurrency(valorContable, 'Bs.')}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </TabsContent>

            <TabsContent value="depreciation-immovable" className="pt-4">
              {inmuebles.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No hay bienes inmuebles registrados en inventario. Registra activos con categoría "Inmueble" para verlos aquí.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Activo</TableHead>
                      <TableHead>Fecha de Ingreso</TableHead>
                      <TableHead className="text-right">Costo</TableHead>
                      <TableHead className="text-right">Vida Útil (Años)</TableHead>
                      <TableHead className="text-right">Depreciación Acumulada</TableHead>
                      <TableHead className="text-right">Valor Contable</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inmuebles.map(item => {
                      const costoTotal = parseFloat(item.costo_unitario) * item.stock_actual;
                      const vidaUtil = 20;
                      const { acumulada, valorContable } = computeDepreciation(costoTotal, vidaUtil, item.created_at);
                      return (
                        <TableRow key={item.id}>
                          <TableCell>{item.nombre}</TableCell>
                          <TableCell>{format(new Date(item.created_at), 'dd/MM/yyyy')}</TableCell>
                          <TableCell className="text-right">{formatCurrency(costoTotal, 'Bs.')}</TableCell>
                          <TableCell className="text-right">{vidaUtil}</TableCell>
                          <TableCell className="text-right">{formatCurrency(acumulada, 'Bs.')}</TableCell>
                          <TableCell className="text-right font-medium">{formatCurrency(valorContable, 'Bs.')}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
