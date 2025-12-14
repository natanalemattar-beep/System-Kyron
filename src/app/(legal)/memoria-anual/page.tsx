
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { Download, Printer } from "lucide-react";
import { Logo } from "@/components/logo";

const companyInfo = {
    name: "Tu Empresa, C.A.",
    rif: "J-12345678-9",
};

const reportDate = "Al 31 de Diciembre de 2023";

const balanceSheet = {
  assets: [
    { name: "Efectivo y equivalentes de efectivo", amount: 150000 },
    { name: "Cuentas por cobrar comerciales", amount: 75000 },
    { name: "Inventarios", amount: 120000 },
    { name: "Total Activos Corrientes", amount: 345000, isTotal: true },
    { name: "Propiedades, planta y equipo, neto", amount: 550000 },
    { name: "Activos intangibles", amount: 50000 },
    { name: "Total Activos No Corrientes", amount: 600000, isTotal: true },
    { name: "TOTAL ACTIVOS", amount: 945000, isTotal: true, isGrandTotal: true },
  ],
  liabilities: [
    { name: "Cuentas por pagar comerciales", amount: 85000 },
    { name: "Otras cuentas por pagar", amount: 40000 },
    { name: "Total Pasivos Corrientes", amount: 125000, isTotal: true },
    { name: "Préstamos bancarios a largo plazo", amount: 100000 },
    { name: "Total Pasivos No Corrientes", amount: 100000, isTotal: true },
    { name: "TOTAL PASIVOS", amount: 225000, isTotal: true, isGrandTotal: true },
  ],
  equity: [
    { name: "Capital Social Pagado", amount: 300000 },
    { name: "Reservas Legales", amount: 150000 },
    { name: "Resultados Acumulados", amount: 270000 },
    { name: "TOTAL PATRIMONIO", amount: 720000, isTotal: true, isGrandTotal: true },
    { name: "TOTAL PASIVO Y PATRIMONIO", amount: 945000, isTotal: true, isGrandTotal: true },
  ],
};

const incomeStatement = {
  revenue: 850000,
  costOfSales: -450000,
  grossProfit: 400000,
  operatingExpenses: -200000,
  operatingIncome: 200000,
  incomeTax: -68000,
  netIncome: 132000,
};

const cashFlowStatement = {
    operatingActivities: {
        netIncome: 132000,
        depreciation: 25000,
        changeInAccountsReceivable: -15000,
        changeInInventory: -20000,
        changeInAccountsPayable: 10000,
        netCash: 132000,
    },
    investingActivities: {
        purchaseOfEquipment: -50000,
        netCash: -50000,
    },
    financingActivities: {
        loanRepayment: -20000,
        issuanceOfStock: 0,
        netCash: -20000,
    },
    netIncrease: 62000,
    cashAtBeginning: 88000,
    cashAtEnd: 150000,
};

export default function MemoriaAnualPage() {

    const handlePrint = () => {
        window.print();
    }

  return (
    <div>
        <style>
            {`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #printable-content, #printable-content * {
                        visibility: visible;
                    }
                    #printable-content {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                }
            `}
        </style>
        <header className="mb-8 flex items-center justify-between print:hidden">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Memoria Anual</h1>
                <p className="text-muted-foreground mt-2">
                Informe anual de gestión y estados financieros consolidados.
                </p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" onClick={handlePrint}><Printer className="mr-2"/> Imprimir</Button>
                <Button onClick={handlePrint}><Download className="mr-2"/> Descargar PDF</Button>
            </div>
        </header>

         {/* A4-like container for printing */}
        <div id="printable-content" className="p-8 md:p-12 bg-white dark:bg-slate-950 shadow-lg rounded-lg print:shadow-none print:p-0">

            {/* Page 1: Cover */}
            <div className="h-[29.7cm] flex flex-col justify-between border-b-2 border-dashed print:border-none pb-12">
                 <header className="flex items-center gap-4">
                    <Logo className="h-16 w-16" />
                    <div>
                        <h1 className="text-2xl font-bold">{companyInfo.name}</h1>
                        <p className="text-muted-foreground">{companyInfo.rif}</p>
                    </div>
                </header>
                 <div className="text-center">
                    <h2 className="text-5xl font-bold tracking-tight">Memoria y Cuenta</h2>
                    <h3 className="text-6xl font-extrabold text-primary tracking-wider mt-2">2023</h3>
                    <p className="mt-4 text-lg text-muted-foreground">Estados Financieros Consolidados</p>
                </div>
                 <footer className="text-center text-sm text-muted-foreground">
                    <p>{companyInfo.name}</p>
                    <p>Caracas, Venezuela</p>
                </footer>
            </div>

            {/* Page 2: Financial Statements */}
            <div className="pt-12">
                 <Card className="border-none shadow-none">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Estado de Situación Financiera Consolidado</CardTitle>
                        <CardDescription>{reportDate}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-2/3">Descripción</TableHead>
                                    <TableHead className="text-right">Monto (Bs.)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow><TableCell className="font-bold text-lg">ACTIVOS</TableCell><TableCell></TableCell></TableRow>
                                {balanceSheet.assets.map(item => (
                                    <TableRow key={item.name} className={item.isTotal ? 'font-bold' : ''}>
                                        <TableCell className={item.isGrandTotal ? 'text-xl' : item.isTotal ? 'pl-8' : 'pl-12 text-muted-foreground'}>{item.name}</TableCell>
                                        <TableCell className={`text-right ${item.isGrandTotal ? 'text-xl' : ''}`}>{formatCurrency(item.amount, 'Bs.')}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow><TableCell className="font-bold text-lg pt-8">PASIVOS Y PATRIMONIO</TableCell><TableCell></TableCell></TableRow>
                                <TableRow><TableCell className="font-semibold pl-4">Pasivos</TableCell><TableCell></TableCell></TableRow>
                                 {balanceSheet.liabilities.map(item => (
                                    <TableRow key={item.name} className={item.isTotal ? 'font-bold' : ''}>
                                        <TableCell className={item.isGrandTotal ? 'text-lg' : item.isTotal ? 'pl-8' : 'pl-12 text-muted-foreground'}>{item.name}</TableCell>
                                        <TableCell className={`text-right ${item.isGrandTotal ? 'text-lg' : ''}`}>{formatCurrency(item.amount, 'Bs.')}</TableCell>
                                    </TableRow>
                                ))}
                                 <TableRow><TableCell className="font-semibold pl-4 pt-4">Patrimonio</TableCell><TableCell></TableCell></TableRow>
                                 {balanceSheet.equity.map(item => (
                                    <TableRow key={item.name} className={item.isTotal ? 'font-bold' : ''}>
                                        <TableCell className={item.isGrandTotal ? 'text-xl' : item.isTotal ? 'pl-8' : 'pl-12 text-muted-foreground'}>{item.name}</TableCell>
                                        <TableCell className={`text-right ${item.isGrandTotal ? 'text-xl' : ''}`}>{formatCurrency(item.amount, 'Bs.')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                 <Card className="border-none shadow-none mt-12">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Estado de Resultados Consolidado</CardTitle>
                        <CardDescription>{reportDate}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableBody>
                                <TableRow><TableCell>Ingresos por Ventas</TableCell><TableCell className="text-right">{formatCurrency(incomeStatement.revenue)}</TableCell></TableRow>
                                <TableRow><TableCell>Costo de Ventas</TableCell><TableCell className="text-right">({formatCurrency(Math.abs(incomeStatement.costOfSales))})</TableCell></TableRow>
                                <TableRow className="font-bold border-t"><TableCell>Ganancia Bruta</TableCell><TableCell className="text-right">{formatCurrency(incomeStatement.grossProfit)}</TableCell></TableRow>
                                <TableRow className="pt-4"><TableCell>Gastos Operativos</TableCell><TableCell className="text-right">({formatCurrency(Math.abs(incomeStatement.operatingExpenses))})</TableCell></TableRow>
                                <TableRow className="font-bold"><TableCell>Ganancia en Operaciones</TableCell><TableCell className="text-right">{formatCurrency(incomeStatement.operatingIncome)}</TableCell></TableRow>
                                <TableRow><TableCell>Impuesto Sobre la Renta</TableCell><TableCell className="text-right">({formatCurrency(Math.abs(incomeStatement.incomeTax))})</TableCell></TableRow>
                                <TableRow className="font-bold border-t text-xl text-primary"><TableCell>Utilidad Neta del Ejercicio</TableCell><TableCell className="text-right">{formatCurrency(incomeStatement.netIncome)}</TableCell></TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-none mt-12">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Estado de Flujo de Efectivo Consolidado</CardTitle>
                        <CardDescription>{reportDate}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableBody>
                                <TableRow><TableCell className="font-semibold">Flujo de Efectivo de Actividades Operativas</TableCell><TableCell></TableCell></TableRow>
                                <TableRow><TableCell className="pl-8 text-muted-foreground">Utilidad Neta</TableCell><TableCell className="text-right">{formatCurrency(cashFlowStatement.operatingActivities.netIncome)}</TableCell></TableRow>
                                <TableRow><TableCell className="pl-8 text-muted-foreground">Depreciación</TableCell><TableCell className="text-right">{formatCurrency(cashFlowStatement.operatingActivities.depreciation)}</TableCell></TableRow>
                                <TableRow><TableCell className="pl-8 text-muted-foreground">Cambios en Cuentas por Cobrar/Pagar</TableCell><TableCell className="text-right">{formatCurrency(cashFlowStatement.operatingActivities.changeInAccountsReceivable + cashFlowStatement.operatingActivities.changeInAccountsPayable)}</TableCell></TableRow>
                                <TableRow className="font-medium border-t"><TableCell className="pl-4">Efectivo Neto de Operaciones</TableCell><TableCell className="text-right">{formatCurrency(cashFlowStatement.operatingActivities.netCash)}</TableCell></TableRow>
                                
                                <TableRow><TableCell className="font-semibold pt-4">Flujo de Efectivo de Actividades de Inversión</TableCell><TableCell></TableCell></TableRow>
                                <TableRow><TableCell className="pl-8 text-muted-foreground">Compra de Equipo</TableCell><TableCell className="text-right">({formatCurrency(Math.abs(cashFlowStatement.investingActivities.purchaseOfEquipment))})</TableCell></TableRow>
                                <TableRow className="font-medium border-t"><TableCell className="pl-4">Efectivo Neto de Inversiones</TableCell><TableCell className="text-right">({formatCurrency(Math.abs(cashFlowStatement.investingActivities.netCash))})</TableCell></TableRow>
                                
                                <TableRow><TableCell className="font-semibold pt-4">Flujo de Efectivo de Actividades de Financiación</TableCell><TableCell></TableCell></TableRow>
                                <TableRow><TableCell className="pl-8 text-muted-foreground">Pago de Préstamos</TableCell><TableCell className="text-right">({formatCurrency(Math.abs(cashFlowStatement.financingActivities.loanRepayment))})</TableCell></TableRow>
                                <TableRow className="font-medium border-t"><TableCell className="pl-4">Efectivo Neto de Financiación</TableCell><TableCell className="text-right">({formatCurrency(Math.abs(cashFlowStatement.financingActivities.netCash))})</TableCell></TableRow>

                                <TableRow><TableCell className="font-bold pt-4">Aumento Neto de Efectivo</TableCell><TableCell className="text-right font-bold pt-4">{formatCurrency(cashFlowStatement.netIncrease)}</TableCell></TableRow>
                                <TableRow><TableCell className="text-muted-foreground">Efectivo al Inicio del Período</TableCell><TableCell className="text-right text-muted-foreground">{formatCurrency(cashFlowStatement.cashAtBeginning)}</TableCell></TableRow>
                                <TableRow className="font-bold text-lg border-t text-primary"><TableCell>Efectivo al Final del Período</TableCell><TableCell className="text-right">{formatCurrency(cashFlowStatement.cashAtEnd)}</TableCell></TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                
                 <div className="mt-16 prose prose-sm dark:prose-invert max-w-none text-justify">
                    <h3 className="text-center text-xl font-bold">Notas a los Estados Financieros</h3>
                    <h4>1. Base de Preparación</h4>
                    <p>Los estados financieros consolidados han sido preparados de acuerdo con los Principios de Contabilidad Generalmente Aceptados en Venezuela (VEN-NIF).</p>
                    <h4>2. Políticas Contables Significativas</h4>
                    <p><strong>a) Moneda de presentación:</strong> Los estados financieros se presentan en Bolívares (Bs.), la moneda de curso legal en Venezuela. <strong>b) Inventarios:</strong> Se valoran al costo o al valor neto de realización, el que sea menor, utilizando el método de promedio ponderado.</p>
                </div>

                <div className="grid grid-cols-2 gap-24 pt-32">
                    <div className="text-center">
                        <p className="border-t-2 border-foreground pt-2">Presidente</p>
                    </div>
                    <div className="text-center">
                        <p className="border-t-2 border-foreground pt-2">Contador Público Colegiado</p>
                    </div>
                </div>

                 <footer className="text-center text-xs text-muted-foreground mt-24">
                    <p>Página 2 de 2</p>
                </footer>
            </div>

        </div>

    </div>
  );
}
