
"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
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
import { Calendar as CalendarIcon } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { mockTransactions, mockMovableAssets, mockImmovableAssets } from "@/lib/data";

const incomeStatementData = {
  revenue: mockTransactions.filter(t => t.category === "Income").reduce((sum, t) => sum + t.amount, 0),
  costOfGoodsSold: 5300,
  operatingExpenses: mockTransactions.filter(t => t.category !== "Income").reduce((sum, t) => sum + Math.abs(t.amount), 0),
};

const balanceSheetData = {
  assets: {
    current: {
      cash: 25000,
      accountsReceivable: 7000,
      inventory: 12000,
    },
    nonCurrent: {
      propertyPlantEquipment: 180000,
      intangibleAssets: 15000,
    }
  },
  liabilities: {
    current: {
      accountsPayable: 8000,
      shortTermDebt: 5000,
    },
    nonCurrent: {
      longTermDebt: 15000,
    }
  },
  equity: {
    commonStock: 50000,
    retainedEarnings: 129000,
  },
};


export function ReportsView() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: addDays(new Date(2024, 0, 1), 365),
  });
  
  const grossProfit = incomeStatementData.revenue - incomeStatementData.costOfGoodsSold;
  const netIncome = grossProfit - incomeStatementData.operatingExpenses;
  
  const totalCurrentAssets = Object.values(balanceSheetData.assets.current).reduce((s, v) => s + v, 0);
  const totalNonCurrentAssets = Object.values(balanceSheetData.assets.nonCurrent).reduce((s, v) => s + v, 0);
  const totalAssets = totalCurrentAssets + totalNonCurrentAssets;
  
  const totalCurrentLiabilities = Object.values(balanceSheetData.liabilities.current).reduce((s, v) => s + v, 0);
  const totalNonCurrentLiabilities = Object.values(balanceSheetData.liabilities.nonCurrent).reduce((s, v) => s + v, 0);
  const totalLiabilities = totalCurrentLiabilities + totalNonCurrentLiabilities;
  
  const totalEquity = Object.values(balanceSheetData.equity).reduce((s, v) => s + v, 0);
  const totalLiabilitiesAndEquity = totalLiabilities + totalEquity;


  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
                <CardTitle>Centro de Reportes</CardTitle>
                <CardDescription>Selecciona un reporte y un rango de fechas.</CardDescription>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className="w-[300px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Elige una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="balance-sheet">
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
                        <TableCell className="font-medium">Ingresos (Revenue)</TableCell>
                        <TableCell className="text-right">{formatCurrency(incomeStatementData.revenue, 'Bs.')}</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="pl-8 text-muted-foreground">Costo de Bienes Vendidos</TableCell>
                        <TableCell className="text-right text-muted-foreground">({formatCurrency(incomeStatementData.costOfGoodsSold, 'Bs.')})</TableCell>
                    </TableRow>
                     <TableRow className="font-bold border-t">
                        <TableCell>Ganancia Bruta</TableCell>
                        <TableCell className="text-right">{formatCurrency(grossProfit, 'Bs.')}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium pt-6">Gastos Operativos</TableCell>
                        <TableCell className="text-right pt-6">({formatCurrency(incomeStatementData.operatingExpenses, 'Bs.')})</TableCell>
                    </TableRow>
                     <TableRow className="font-bold border-t text-lg text-primary">
                        <TableCell>Ingreso Neto (Ganancias y Pérdidas)</TableCell>
                        <TableCell className="text-right">{formatCurrency(netIncome, 'Bs.')}</TableCell>
                    </TableRow>
                </TableBody>
             </Table>
          </TabsContent>
          <TabsContent value="balance-sheet" className="pt-4">
             <div className="border rounded-lg p-4">
                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold">ESTADO DE SITUACIÓN</h3>
                    <p className="text-sm text-muted-foreground">Al 31 de Diciembre, 2024</p>
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
                    {/* Activos */}
                    <TableRow><TableCell className="font-bold text-base">ACTIVOS</TableCell><TableCell></TableCell></TableRow>
                    <TableRow><TableCell className="font-semibold pl-4">Activos Corrientes</TableCell><TableCell></TableCell></TableRow>
                    <TableRow><TableCell className="pl-8 text-muted-foreground">Efectivo y Equivalentes</TableCell><TableCell className="text-right">{formatCurrency(balanceSheetData.assets.current.cash, 'Bs.')}</TableCell></TableRow>
                    <TableRow><TableCell className="pl-8 text-muted-foreground">Cuentas por Cobrar</TableCell><TableCell className="text-right">{formatCurrency(balanceSheetData.assets.current.accountsReceivable, 'Bs.')}</TableCell></TableRow>
                    <TableRow><TableCell className="pl-8 text-muted-foreground">Inventario</TableCell><TableCell className="text-right">{formatCurrency(balanceSheetData.assets.current.inventory, 'Bs.')}</TableCell></TableRow>
                    <TableRow><TableCell className="font-semibold pl-4 border-t">Total Activos Corrientes</TableCell><TableCell className="text-right font-semibold border-t">{formatCurrency(totalCurrentAssets, 'Bs.')}</TableCell></TableRow>
                    
                    <TableRow><TableCell className="font-semibold pl-4 pt-4">Activos No Corrientes</TableCell><TableCell></TableCell></TableRow>
                    <TableRow><TableCell className="pl-8 text-muted-foreground">Propiedad, Planta y Equipo</TableCell><TableCell className="text-right">{formatCurrency(balanceSheetData.assets.nonCurrent.propertyPlantEquipment, 'Bs.')}</TableCell></TableRow>
                    <TableRow><TableCell className="pl-8 text-muted-foreground">Activos Intangibles</TableCell><TableCell className="text-right">{formatCurrency(balanceSheetData.assets.nonCurrent.intangibleAssets, 'Bs.')}</TableCell></TableRow>
                    <TableRow><TableCell className="font-semibold pl-4 border-t">Total Activos No Corrientes</TableCell><TableCell className="text-right font-semibold border-t">{formatCurrency(totalNonCurrentAssets, 'Bs.')}</TableCell></TableRow>
                    
                    <TableRow className="bg-secondary/50 font-bold text-lg"><TableCell>TOTAL ACTIVOS</TableCell><TableCell className="text-right">{formatCurrency(totalAssets, 'Bs.')}</TableCell></TableRow>

                    {/* Pasivos y Patrimonio */}
                    <TableRow><TableCell className="font-bold text-base pt-8">PASIVOS Y PATRIMONIO</TableCell><TableCell></TableCell></TableRow>
                    <TableRow><TableCell className="font-semibold pl-4">Pasivos Corrientes</TableCell><TableCell></TableCell></TableRow>
                    <TableRow><TableCell className="pl-8 text-muted-foreground">Cuentas por Pagar</TableCell><TableCell className="text-right">{formatCurrency(balanceSheetData.liabilities.current.accountsPayable, 'Bs.')}</TableCell></TableRow>
                    <TableRow><TableCell className="pl-8 text-muted-foreground">Deuda a Corto Plazo</TableCell><TableCell className="text-right">{formatCurrency(balanceSheetData.liabilities.current.shortTermDebt, 'Bs.')}</TableCell></TableRow>
                     <TableRow><TableCell className="font-semibold pl-4 border-t">Total Pasivos Corrientes</TableCell><TableCell className="text-right font-semibold border-t">{formatCurrency(totalCurrentLiabilities, 'Bs.')}</TableCell></TableRow>
                     
                    <TableRow><TableCell className="font-semibold pl-4 pt-4">Pasivos No Corrientes</TableCell><TableCell></TableCell></TableRow>
                    <TableRow><TableCell className="pl-8 text-muted-foreground">Deuda a Largo Plazo</TableCell><TableCell className="text-right">{formatCurrency(balanceSheetData.liabilities.nonCurrent.longTermDebt, 'Bs.')}</TableCell></TableRow>
                    <TableRow><TableCell className="font-semibold pl-4 border-t">Total Pasivos No Corrientes</TableCell><TableCell className="text-right font-semibold border-t">{formatCurrency(totalNonCurrentLiabilities, 'Bs.')}</TableCell></TableRow>

                    <TableRow className="bg-muted/40 font-bold"><TableCell className="pl-4">TOTAL PASIVOS</TableCell><TableCell className="text-right">{formatCurrency(totalLiabilities, 'Bs.')}</TableCell></TableRow>

                    <TableRow><TableCell className="font-semibold pl-4 pt-4">Patrimonio</TableCell><TableCell></TableCell></TableRow>
                    <TableRow><TableCell className="pl-8 text-muted-foreground">Capital Social</TableCell><TableCell className="text-right">{formatCurrency(balanceSheetData.equity.commonStock, 'Bs.')}</TableCell></TableRow>
                    <TableRow><TableCell className="pl-8 text-muted-foreground">Ganancias Retenidas</TableCell><TableCell className="text-right">{formatCurrency(balanceSheetData.equity.retainedEarnings, 'Bs.')}</TableCell></TableRow>
                    <TableRow className="bg-muted/40 font-bold"><TableCell className="pl-4">TOTAL PATRIMONIO</TableCell><TableCell className="text-right">{formatCurrency(totalEquity, 'Bs.')}</TableCell></TableRow>
                    
                    <TableRow className="bg-secondary/50 font-bold text-lg"><TableCell>TOTAL PASIVOS Y PATRIMONIO</TableCell><TableCell className="text-right">{formatCurrency(totalLiabilitiesAndEquity, 'Bs.')}</TableCell></TableRow>

                  </TableBody>
                </Table>
             </div>
          </TabsContent>
          <TabsContent value="depreciation-movable" className="pt-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Activo</TableHead>
                        <TableHead>Fecha de Compra</TableHead>
                        <TableHead className="text-right">Costo</TableHead>
                        <TableHead className="text-right">Vida Útil (Años)</TableHead>
                        <TableHead className="text-right">Depreciación Acumulada</TableHead>
                        <TableHead className="text-right">Valor Contable</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockMovableAssets.map(asset => (
                        <TableRow key={asset.id}>
                            <TableCell>{asset.name}</TableCell>
                            <TableCell>{asset.purchaseDate}</TableCell>
                            <TableCell className="text-right">{formatCurrency(asset.cost, 'Bs.')}</TableCell>
                            <TableCell className="text-right">{asset.usefulLife}</TableCell>
                            <TableCell className="text-right">{formatCurrency(asset.accumulatedDepreciation, 'Bs.')}</TableCell>
                            <TableCell className="text-right font-medium">{formatCurrency(asset.bookValue, 'Bs.')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="depreciation-immovable" className="pt-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Activo</TableHead>
                        <TableHead>Fecha de Compra</TableHead>
                        <TableHead className="text-right">Costo</TableHead>
                        <TableHead className="text-right">Vida Útil (Años)</TableHead>
                        <TableHead className="text-right">Depreciación Acumulada</TableHead>
                        <TableHead className="text-right">Valor Contable</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockImmovableAssets.map(asset => (
                        <TableRow key={asset.id}>
                            <TableCell>{asset.name}</TableCell>
                            <TableCell>{asset.purchaseDate}</TableCell>
                            <TableCell className="text-right">{formatCurrency(asset.cost, 'Bs.')}</TableCell>
                            <TableCell className="text-right">{asset.usefulLife}</TableCell>
                            <TableCell className="text-right">{formatCurrency(asset.accumulatedDepreciation, 'Bs.')}</TableCell>
                            <TableCell className="text-right font-medium">{formatCurrency(asset.bookValue, 'Bs.')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
