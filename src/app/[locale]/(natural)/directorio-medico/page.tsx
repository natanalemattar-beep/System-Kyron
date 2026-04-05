"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Stethoscope, Search, Phone, MapPin, ArrowLeft, Info, Loader2, Inbox } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from '@/navigation';
import { cn } from "@/lib/utils";

interface CentroMedico {
  id: number;
  nombre: string;
  tipo: string;
  zona: string;
  tel: string;
  especialidades: string[];
  disponible: boolean;
}

const especialidades = ["Todas", "Cardiología", "Medicina General", "Pediatría", "Traumatología", "Dermatología", "Oftalmología", "Neurología", "Ginecología", "Odontología"];

export default function DirectorioMedicoPage() {
  const { toast } = useToast();
  const [centros, setCentros] = useState<CentroMedico[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [especialidad, setEspecialidad] = useState("Todas");

  const loadData = useCallback(() => {
    setLoading(true);
    fetch('/api/natural/directorio-medico')
      .then(r => r.ok ? r.json() : { centros: [] })
      .then(d => setCentros(d.centros ?? []))
      .catch(() => setCentros([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const filtered = centros.filter(c => {
    const matchEsp = especialidad === "Todas" || c.especialidades.includes(especialidad);
    const matchSearch = !search || c.nombre.toLowerCase().includes(search.toLowerCase()) || c.zona.toLowerCase().includes(search.toLowerCase());
    return matchEsp && matchSearch;
  });

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" /> Volver al Dashboard
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-rose-500/[0.04] via-card to-card p-6 sm:p-8"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
        <div className="relative flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
            <Stethoscope className="h-7 w-7 text-rose-500" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Directorio Médico</h1>
            <p className="text-sm text-muted-foreground font-medium">Red de centros médicos aliados en Venezuela</p>
          </div>
        </div>
      </motion.div>

      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-3">
        <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground">Los centros médicos son registrados por el administrador del sistema. Confirma disponibilidad llamando directamente antes de acudir.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por centro o zona..."
            className="pl-10 h-11 rounded-xl"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {especialidades.slice(0, 5).map(e => (
            <Button
              key={e}
              variant={especialidad === e ? "default" : "outline"}
              size="sm"
              className={cn("h-11 px-4 rounded-xl text-[10px] font-bold uppercase tracking-wider", especialidad === e ? "bg-rose-500 text-white hover:bg-rose-500/90" : "")}
              onClick={() => setEspecialidad(e)}
            >
              {e}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm">Cargando directorio...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
          <Inbox className="h-10 w-10 opacity-30" />
          <p className="text-sm font-bold">{centros.length === 0 ? "Directorio aún sin centros registrados" : "Sin resultados"}</p>
          <p className="text-xs text-center max-w-xs">
            {centros.length === 0
              ? "El administrador puede agregar centros médicos aliados desde el panel de configuración."
              : "No se encontraron centros médicos con esos criterios de búsqueda."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((centro, i) => (
            <motion.div
              key={centro.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="hover:border-rose-500/30 transition-all duration-300 rounded-2xl overflow-hidden group">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="font-bold text-sm text-foreground group-hover:text-rose-600 transition-colors truncate">{centro.nombre}</p>
                      <p className="text-[10px] text-muted-foreground font-medium mt-0.5">{centro.tipo}</p>
                    </div>
                    <Badge className={cn("text-[10px] font-bold shrink-0", centro.disponible ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-muted/50 text-muted-foreground")}>
                      {centro.disponible ? "Disponible" : "Consultar"}
                    </Badge>
                  </div>
                  <div className="space-y-1.5 mb-3">
                    <p className="text-[11px] flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-3 w-3 text-rose-500 shrink-0" /> {centro.zona}
                    </p>
                    <p className="text-[11px] flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-3 w-3 text-rose-500 shrink-0" /> {centro.tel}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/30">
                    {centro.especialidades.map(esp => (
                      <span key={esp} className="text-[11px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 font-bold border border-rose-500/20">{esp}</span>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3 w-full h-9 rounded-xl text-[10px] font-bold uppercase tracking-wider border-rose-500/20 text-rose-600 hover:bg-rose-500/10"
                    onClick={() => toast({ title: `Contactando ${centro.nombre}`, description: `Llamar al ${centro.tel}` })}
                  >
                    <Phone className="h-3.5 w-3.5 mr-2" /> Contactar
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
