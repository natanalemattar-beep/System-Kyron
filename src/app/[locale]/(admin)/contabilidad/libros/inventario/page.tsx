"use client";

import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Box, CirclePlus as PlusCircle, ArrowLeft, TriangleAlert as AlertTriangle, RefreshCw, ChartBar as BarChart3 } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const mockInventario = [
  { cod: "PROD-001", nombre: "Impresora Fiscal Térmica", cat: "Hardware", stock: 12, min: 15, precio: 350, mov: "10/03/2026" },
  { cod: "PROD-002", nombre: "Resma de Papel Carta", cat: "Suministros", stock: 150, min: 50, precio: 8.5, mov: "12/03/2026" },
  { cod: "PROD-003", nombre: "Punto de Venta Inalámbrico", cat: "Hardware", stock: 5, min: 10, precio: 280, mov: "08/03/2026" },
  { cod: "PROD-004", nombre: "Tóner de Repuesto", cat: "Consumibles", stock: 25, min: 20, precio: 85, mov: "11/03/2026" },
  { cod: "PROD-005", nombre: "Lector de Código Barras", cat: "Hardware", stock: 30, min: 10, precio: 95, mov: "05/03/2026" },
];

export default function LibroInventarioPage() {
  const handleAction = (msg: string) => alert(msg);

  return (
    <div className="p-6 md:p-12 bg-[#f5f7fa] min-h-screen space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <Button variant="ghost" asChild className="p-0 h-auto text-[#0A2472] hover:bg-transparent mb-2">
            <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4"/> Volver al Centro Contable</Link>
          </Button>
          <h1 className="text-3xl font-black text-[#0A2472] uppercase tracking-tighter flex items-center gap-3">
            <Box className="h-8 w-8 text-[#00A86B]" />
            Libro de Inventario
          </h1>
          <p className="text-slate-500 font-medium text-sm">Control de existencias y valoración de activos circulantes.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-[#0A2472] text-[#0A2472]" onClick={() => handleAction("Calculando valoración total del almacén...")}>
            <BarChart3 className="mr-2 h-4 w-4" /> Valoración Total
          </Button>
          <Button className="bg-[#0A2472] hover:bg-blue-900 rounded-xl" onClick={() => handleAction("Registrando entrada de mercancía...")}>
            <PlusCircle className="mr-2 h-4 w-4" /> Registrar Movimiento
          </Button>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm rounded-2xl bg-white p-6">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Total SKUs</p>
          <p className="text-xl font-black text-[#0A2472]">45 Productos</p>
        </Card>
        <Card className="border-none shadow-sm rounded-2xl bg-white p-6">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Valor en Almacén</p>
          <p className="text-xl font-black text-[#00A86B]">{formatCurrency(125400, 'Bs.')}</p>
        </Card>
        <Card className="border-none shadow-sm rounded-2xl bg-white p-6 border-l-4 border-rose-500">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Alertas de Stock</p>
          <p className="text-xl font-black text-rose-500">2 Items Críticos</p>
        </Card>
      </div>

      <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardHeader className="p-8 border-b bg-slate-50/50 flex flex-row justify-between items-center">
          <CardTitle className="text-sm font-black uppercase tracking-widest text-[#0A2472]">Kardex de Existencias</CardTitle>
          <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-slate-400" onClick={() => handleAction("Sincronizando con Punto de Venta...")}>
            <RefreshCw className="mr-2 h-3 w-3" /> Sincronizar
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="pl-8 font-bold text-[10px] uppercase">Código</TableHead>
                <TableHead className="font-bold text-[10px] uppercase">Producto</TableHead>
                <TableHead className="font-bold text-[10px] uppercase">Categoría</TableHead>
                <TableHead className="text-center font-bold text-[10px] uppercase">Stock</TableHead>
                <TableHead className="text-center font-bold text-[10px] uppercase">Mínimo</TableHead>
                <TableHead className="text-right font-bold text-[10px] uppercase">Precio Unit.</TableHead>
                <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInventario.map((item) => (
                <TableRow key={item.cod} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="pl-8 font-mono text-[10px] font-bold text-[#0A2472]">{item.cod}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-xs text-slate-800">{item.nombre}</span>
                      <span className="text-[9px] text-slate-400 uppercase">Último: {item.mov}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-medium text-slate-500">{item.cat}</TableCell>
                  <TableCell className={cn("text-center font-black text-sm", item.stock < item.min ? "text-rose-500" : "text-slate-700")}>{item.stock}</TableCell>
                  <TableCell className="text-center font-medium text-xs text-slate-400">{item.min}</TableCell>
                  <TableCell className="text-right font-mono text-xs font-bold">{formatCurrency(item.precio, 'Bs.')}</TableCell>
                  <TableCell className="text-right pr-8">
                    {item.stock < item.min ? (
                      <Badge variant="destructive" className="text-[8px] font-black uppercase tracking-tighter flex items-center gap-1">
                        <AlertTriangle className="h-2 w-2" /> Comprar Ya
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[8px] font-black uppercase tracking-tighter text-[#00A86B] border-[#00A86B]/20">
                        Óptimo
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}