"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBar as ChartColumn, Download, Printer, Activity, ShieldCheck, TrendingUp, Search, CircleCheck as CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const reportGroups = [
  { title: "Gestión Financiera", items: ["Balance General Consolidado", "Estado de Ganancias y Pérdidas", "Flujo de Caja Real vs Proyectado", "Análisis de Ratios de Liquidez"], icon: TrendingUp },
  { title: "Control Fiscal", items: ["Libro de Compras y Ventas (TXT)", "Resumen Mensual de Retenciones", "Expediente de Municipales", "Auditoría Preventiva SENIAT"], icon: ShieldCheck },
  { title: "Recursos Humanos", items: ["Resumen de Nómina Anual", "Cálculo de Prestaciones Sociales", "Reporte de Vacaciones y Utilidades", "Consolidado de Aportes Parafiscales"], icon: Activity },
];

export default function ReportesGlobalPage() {
  const { toast } = useToast();
  const [exportingExcel, setExportingExcel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleExportDossier = async () => {
    setExportingExcel(true);
    try {
      const allItems = reportGroups.flatMap(g => g.items.map(item => ({ grupo: g.title, reporte: item })));
      const res = await fetch('/api/export-excel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Reportes - System Kyron',
          filename: 'reportes_system_kyron',
          sheets: [{
            name: 'Reportes',
            headers: ['Grupo', 'Nombre del Reporte'],
            keys: ['grupo', 'reporte'],
            rows: allItems,
          }],
        }),
      });
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'reportes_system_kyron.xlsx';
      document.body.appendChild(a); a.click();
      document.body.removeChild(a); URL.revokeObjectURL(url);
      toast({ title: 'Excel generado', description: 'Dossier de reportes descargado.' });
    } catch {
      toast({ title: 'Error', description: 'No se pudo generar el archivo Excel.', variant: 'destructive' });
    } finally {
      setExportingExcel(false);
    }
  };

  const filteredGroups = searchQuery
    ? reportGroups.map(g => ({
        ...g,
        items: g.items.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
      })).filter(g => g.items.length > 0)
    : reportGroups;

  return (
    <div className="space-y-8 pb-16">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pt-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ChartColumn className="h-5 w-5 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Reportes
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Genera y descarga reportes financieros, fiscales y de recursos humanos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" /> Imprimir
          </Button>
          <Button size="sm" onClick={handleExportDossier} disabled={exportingExcel}>
            <Download className="mr-2 h-4 w-4" /> Exportar Excel
          </Button>
        </div>
      </header>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar reporte..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGroups.map((group, i) => (
          <Card key={i} className="flex flex-col justify-between">
            <div>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-primary/10 rounded-lg">
                    <group.icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-[10px]">
                    {group.items.length} reportes
                  </Badge>
                </div>
                <CardTitle className="text-base font-semibold mt-3">{group.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2.5">
                  {group.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary/40 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </div>
            <CardFooter className="pt-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={async () => {
                  try {
                    const res = await fetch('/api/solicitudes', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ categoria: 'admin', subcategoria: 'descarga_iniciada', descripcion: `Descarga: ${group.title}` }),
                    });
                    if (res.ok) toast({ title: "Descarga iniciada", description: `Reportes de ${group.title} exportados.` });
                    else toast({ title: "Error", variant: "destructive" });
                  } catch { toast({ title: "Error de conexión", variant: "destructive" }); }
                }}
              >
                <Download className="mr-2 h-4 w-4" /> Descargar lote
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Search className="h-8 w-8 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No se encontraron reportes para "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}
