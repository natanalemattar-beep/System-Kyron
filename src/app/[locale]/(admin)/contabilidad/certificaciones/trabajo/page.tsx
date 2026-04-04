"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/back-button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { Signature as FileSignature, Search, Loader2, Inbox, Printer, AlertTriangle, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Empleado {
  id: string;
  nombre: string;
  cargo: string;
  ingreso: string;
  salario: number;
}

export default function ConstanciaTrabajoPage() {
  const { toast } = useToast();
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch('/api/contabilidad/records?type=empleados')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => setEmpleados(d.rows ?? []))
      .catch(() => setEmpleados([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = empleados.filter(e =>
    !search || e.nombre?.toLowerCase().includes(search.toLowerCase()) || e.id?.toLowerCase().includes(search.toLowerCase())
  );

  const handleGenerar = async (nombre: string) => {
    try {
      const res = await fetch('/api/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoria: 'contabilidad', subcategoria: 'constancia_trabajo', descripcion: `Constancia de trabajo para ${nombre}` }),
      });
      if (res.ok) toast({ title: "Solicitud registrada", description: `Constancia de ${nombre} solicitada.` });
      else toast({ variant: "destructive", title: "Error" });
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    }
  };

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad" label="Contabilidad" />
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">
            <FileSignature className="h-3.5 w-3.5" /> Constancias Laborales · LOTTT
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            Constancias <span className="text-primary">de Trabajo</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Certificación laboral · LOTTT Art. 108 · Firma digital</p>
        </div>
      </header>

      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar empleado por nombre o ID..."
          className="pl-12 h-12 rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card className="rounded-2xl border shadow-lg overflow-hidden">
        <CardHeader className="p-6 border-b bg-muted/30">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" /> Generador de Constancias
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-semibold">Cargando empleados...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">Sin empleados registrados</p>
              <p className="text-xs text-muted-foreground/70">Registre empleados en RRHH para generar constancias de trabajo.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead className="pl-6 py-4 text-xs font-semibold">Trabajador / ID</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Cargo</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Fecha Ingreso</TableHead>
                  <TableHead className="text-right py-4 text-xs font-semibold">Sueldo Base</TableHead>
                  <TableHead className="text-right pr-6 py-4 text-xs font-semibold">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(emp => (
                  <TableRow key={emp.id} className="hover:bg-muted/10">
                    <TableCell className="pl-6 py-4">
                      <p className="text-xs font-semibold">{emp.nombre}</p>
                      <p className="text-[11px] font-mono text-muted-foreground mt-0.5">{emp.id}</p>
                    </TableCell>
                    <TableCell className="py-4 text-xs text-muted-foreground">{emp.cargo}</TableCell>
                    <TableCell className="py-4 text-xs text-muted-foreground">{emp.ingreso}</TableCell>
                    <TableCell className="text-right py-4 font-mono text-sm font-semibold">{formatCurrency(emp.salario, 'Bs.')}</TableCell>
                    <TableCell className="text-right pr-6 py-4">
                      <Button variant="outline" size="sm" className="rounded-xl text-xs" onClick={() => handleGenerar(emp.nombre)}>
                        <Printer className="mr-2 h-3 w-3" /> Generar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Base Legal</p>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
              Las constancias de trabajo se emiten conforme al Artículo 108 de la LOTTT. Tienen validez para trámites bancarios, consulares e institucionales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
