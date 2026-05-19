"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";
import { UserCheck, Search, Loader2, Inbox, TriangleAlert, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Socio {
  id: string;
  nombre: string;
  cargo: string;
  participacion: string;
  estatus: string;
}

export default function CertificacionesSociosPage() {
  const { toast } = useToast();
  const [socios, setSocios] = useState<Socio[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch('/api/contabilidad/records?type=socios')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => setSocios(d.rows ?? []))
      .catch(() => setSocios([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = socios.filter(s =>
    !search || s.nombre?.toLowerCase().includes(search.toLowerCase()) || s.cargo?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad" label="Contabilidad" />
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-semibold uppercase tracking-wide text-primary mb-3">
            <UserCheck className="h-3.5 w-3.5" /> Registro de Accionistas
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Certificaciones <span className="text-primary">de Socios</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Registro de accionistas y directivos · Validación de identidad</p>
        </div>
      </header>

      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre o cargo..."
          className="pl-12 h-12 rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card className="rounded-2xl border shadow-lg overflow-hidden">
        <CardHeader className="p-6 border-b bg-muted/30">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" /> Relación de Accionistas y Directivos
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-semibold">Cargando socios...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">Sin socios registrados</p>
              <p className="text-xs text-muted-foreground/70">Los socios y accionistas aparecerán aquí al ser registrados en el acta constitutiva.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead className="pl-6 py-4 text-xs font-semibold">Socio</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Cargo</TableHead>
                  <TableHead className="text-center py-4 text-xs font-semibold">Participación</TableHead>
                  <TableHead className="text-center pr-6 py-4 text-xs font-semibold">Estatus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(socio => (
                  <TableRow key={socio.id} className="hover:bg-muted/10">
                    <TableCell className="pl-6 py-4">
                      <p className="text-xs font-semibold">{socio.nombre}</p>
                      <p className="text-[11px] font-mono text-muted-foreground mt-0.5">{socio.id}</p>
                    </TableCell>
                    <TableCell className="py-4 text-xs text-muted-foreground">{socio.cargo}</TableCell>
                    <TableCell className="text-center py-4 font-mono text-sm font-semibold">{socio.participacion}</TableCell>
                    <TableCell className="text-center pr-6 py-4">
                      <Badge className={cn("text-[10px] font-semibold border-none",
                        socio.estatus === 'Verificado' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                      )}>{socio.estatus}</Badge>
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
          <TriangleAlert className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Nota Legal</p>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
              El registro de accionistas debe estar acorde con el Acta Constitutiva y las Asambleas de Accionistas inscritas en el Registro Mercantil correspondiente. Código de Comercio Arts. 200-341.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
