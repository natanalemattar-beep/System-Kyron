"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Handshake, Loader2, Inbox, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BackButton } from "@/components/back-button";
import { useToast } from "@/hooks/use-toast";

interface Entidad {
  id: number;
  nombre: string;
  tipo: string;
  rif: string;
  estado: string;
  ingresos: string;
  egresos: string;
  saldo: string;
}

const tipos = [
  { key: "fundaciones", label: "Fundaciones" },
  { key: "asociaciones", label: "Asociaciones" },
  { key: "iglesias", label: "Iglesias" },
  { key: "condominios", label: "Condominios" },
];

export default function EntidadesSinFinesLucroPage() {
  const { toast } = useToast();
  const [activeType, setActiveType] = useState("fundaciones");
  const [rows, setRows] = useState<Entidad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/contabilidad/records?type=esfl_${activeType}`)
      .then((r) => (r.ok ? r.json() : { rows: [] }))
      .then((d) => setRows(d.rows ?? []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, [activeType]);

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-background">
      <BackButton href="/contabilidad" label="Volver al Centro Contable" />

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground uppercase tracking-tight flex items-center gap-3">
            <Handshake className="h-8 w-8 text-emerald-500" />
            Entidades Sin Fines de Lucro
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Gestión contable para Fundaciones, Asociaciones, Iglesias y Condominios.
          </p>
        </div>
        <Button variant="outline" className="rounded-xl" onClick={() => window.print()}>
          <Download className="mr-2 h-4 w-4" /> Exportar Balance
        </Button>
      </header>

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 flex items-start gap-4">
        <Handshake className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
        <p className="text-sm text-emerald-800">
          Este módulo permite gestionar la contabilidad social y rendición de cuentas
          para entidades sin fines de lucro bajo normativa venezolana vigente.
        </p>
      </div>

      <Tabs value={activeType} onValueChange={setActiveType}>
        <TabsList className="grid grid-cols-4 w-full max-w-lg">
          {tipos.map((t) => (
            <TabsTrigger key={t.key} value={t.key} className="text-xs font-bold uppercase">
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tipos.map((t) => (
          <TabsContent key={t.key} value={t.key} className="mt-6">
            <Card className="border rounded-2xl shadow-sm overflow-hidden">
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-sm font-bold uppercase tracking-widest">Cargando {t.label.toLowerCase()}...</span>
                  </div>
                ) : rows.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
                    <Inbox className="h-10 w-10" />
                    <p className="text-sm font-bold uppercase tracking-widest">Sin {t.label.toLowerCase()} registradas</p>
                    <p className="text-xs text-muted-foreground/70">
                      Las entidades de tipo {t.label.toLowerCase()} aparecerán aquí al ser registradas en el sistema.
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="pl-8 font-bold text-[10px] uppercase">Nombre</TableHead>
                        <TableHead className="font-bold text-[10px] uppercase">RIF</TableHead>
                        <TableHead className="font-bold text-[10px] uppercase">Estado</TableHead>
                        <TableHead className="text-right font-bold text-[10px] uppercase">Ingresos</TableHead>
                        <TableHead className="text-right font-bold text-[10px] uppercase">Egresos</TableHead>
                        <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">Saldo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.map((e) => (
                        <TableRow key={e.id} className="hover:bg-muted/30 transition-colors">
                          <TableCell className="pl-8 text-xs font-medium">{e.nombre}</TableCell>
                          <TableCell className="text-xs font-mono">{e.rif}</TableCell>
                          <TableCell>
                            <Badge variant={e.estado === "ACTIVA" ? "default" : "secondary"} className="text-[10px] uppercase">
                              {e.estado}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-mono text-xs">{e.ingresos}</TableCell>
                          <TableCell className="text-right font-mono text-xs">{e.egresos}</TableCell>
                          <TableCell className="text-right pr-8 font-mono text-xs font-bold text-emerald-600">{e.saldo}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
