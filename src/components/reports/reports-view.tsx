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
import { mockTransactions } from "@/lib/data";

const incomeStatementData = {
  revenue: mockTransactions.filter(t => t.category === "Income").reduce((sum, t) => sum + t.amount, 0),
  costOfGoodsSold: 5300,
  operatingExpenses: mockTransactions.filter(t => t.category !== "Income").reduce((sum, t) => sum + Math.abs(t.amount), 0),
};

const balanceSheetData = {
  assets: {
    cash: 25000,
    accountsReceivable: 7000,
    inventory: 12000,
  },
  liabilities: {
    accountsPayable: 8000,
    longTermDebt: 15000,
  },
  equity: {
    retainedEarnings: 21000,
  },
};

export function ReportsView() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: addDays(new Date(2024, 0, 1), 365),
  });
  
  const grossProfit = incomeStatementData.revenue - incomeStatementData.costOfGoodsSold;
  const netIncome = grossProfit - incomeStatementData.operatingExpenses;
  
  const totalAssets = Object.values(balanceSheetData.assets).reduce((s, v) => s + v, 0);
  const totalLiabilities = Object.values(balanceSheetData.liabilities).reduce((s, v) => s + v, 0);
  const totalEquity = Object.values(balanceSheetData.equity).reduce((s, v) => s + v, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
                <CardTitle>Report Center</CardTitle>
                <CardDescription>Select a report and date range.</CardDescription>
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
                    <span>Pick a date</span>
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
        <Tabs defaultValue="income-statement">
          <TabsList>
            <TabsTrigger value="income-statement">Income Statement</TabsTrigger>
            <TabsTrigger value="balance-sheet">Balance Sheet</TabsTrigger>
          </TabsList>
          <TabsContent value="income-statement" className="pt-4">
             <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">Revenue</TableCell>
                        <TableCell className="text-right">{formatCurrency(incomeStatementData.revenue)}</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell className="pl-8 text-muted-foreground">Cost of Goods Sold</TableCell>
                        <TableCell className="text-right text-muted-foreground">({formatCurrency(incomeStatementData.costOfGoodsSold)})</TableCell>
                    </TableRow>
                     <TableRow className="font-bold border-t">
                        <TableCell>Gross Profit</TableCell>
                        <TableCell className="text-right">{formatCurrency(grossProfit)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium pt-6">Operating Expenses</TableCell>
                        <TableCell className="text-right pt-6">{formatCurrency(incomeStatementData.operatingExpenses)}</TableCell>
                    </TableRow>
                     <TableRow className="font-bold border-t text-lg text-primary">
                        <TableCell>Net Income</TableCell>
                        <TableCell className="text-right">{formatCurrency(netIncome)}</TableCell>
                    </TableRow>
                </TableBody>
             </Table>
          </TabsContent>
          <TabsContent value="balance-sheet" className="pt-4">
             <Table>
                <TableHeader><TableRow><TableHead>Assets</TableHead><TableHead className="text-right"></TableHead></TableRow></TableHeader>
                <TableBody>
                    {Object.entries(balanceSheetData.assets).map(([key, value]) => (
                        <TableRow key={key}><TableCell className="pl-8 text-muted-foreground">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</TableCell><TableCell className="text-right">{formatCurrency(value)}</TableCell></TableRow>
                    ))}
                    <TableRow className="font-bold border-t"><TableCell>Total Assets</TableCell><TableCell className="text-right">{formatCurrency(totalAssets)}</TableCell></TableRow>
                </TableBody>
                <TableHeader><TableRow><TableHead className="pt-8">Liabilities</TableHead><TableHead className="text-right pt-8"></TableHead></TableRow></TableHeader>
                <TableBody>
                    {Object.entries(balanceSheetData.liabilities).map(([key, value]) => (
                        <TableRow key={key}><TableCell className="pl-8 text-muted-foreground">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</TableCell><TableCell className="text-right">{formatCurrency(value)}</TableCell></TableRow>
                    ))}
                    <TableRow className="font-bold border-t"><TableCell>Total Liabilities</TableCell><TableCell className="text-right">{formatCurrency(totalLiabilities)}</TableCell></TableRow>
                </TableBody>
                <TableHeader><TableRow><TableHead className="pt-8">Equity</TableHead><TableHead className="text-right pt-8"></TableHead></TableRow></TableHeader>
                <TableBody>
                    {Object.entries(balanceSheetData.equity).map(([key, value]) => (
                        <TableRow key={key}><TableCell className="pl-8 text-muted-foreground">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</TableCell><TableCell className="text-right">{formatCurrency(value)}</TableCell></TableRow>
                    ))}
                    <TableRow className="font-bold border-t"><TableCell>Total Equity</TableCell><TableCell className="text-right">{formatCurrency(totalEquity)}</TableCell></TableRow>
                </TableBody>
                 <TableBody>
                    <TableRow className="font-bold border-t text-lg text-primary"><TableCell>Total Liabilities & Equity</TableCell><TableCell className="text-right">{formatCurrency(totalLiabilities + totalEquity)}</TableCell></TableRow>
                 </TableBody>
             </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
