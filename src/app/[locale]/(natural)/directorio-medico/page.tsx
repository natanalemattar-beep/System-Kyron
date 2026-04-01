"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Stethoscope, Search, Phone, MapPin, Star, Clock, Building, Heart, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from '@/navigation';
import { cn } from "@/lib/utils";

const medicos = [
    { id: 1, nombre: "Dra. María González", especialidad: "Cardiología", hospital: "Clínica El Ávila", zona: "Altamira, Caracas", tel: "0212-208-9000", calificacion: 4.9, disponible: true, horario: "Lun-Vie 8am-5pm" },
    { id: 2, nombre: "Dr. Carlos Pérez", especialidad: "Medicina General", hospital: "Centro Médico de Caracas", zona: "San Bernardino, Caracas", tel: "0212-555-0100", calificacion: 4.7, disponible: true, horario: "Lun-Sáb 7am-7pm" },
    { id: 3, nombre: "Dra. Ana Rodríguez", especialidad: "Pediatría", hospital: "Hospital de Niños J.M. de los Ríos", zona: "San José, Caracas", tel: "0212-483-6922", calificacion: 4.8, disponible: false, horario: "Mar-Sáb 9am-4pm" },
    { id: 4, nombre: "Dr. José Martínez", especialidad: "Traumatología", hospital: "Instituto Médico La Floresta", zona: "La Floresta, Caracas", tel: "0212-285-0111", calificacion: 4.6, disponible: true, horario: "Lun-Vie 9am-6pm" },
    { id: 5, nombre: "Dra. Carmen López", especialidad: "Dermatología", hospital: "Policlínica Metropolitana", zona: "Chuao, Caracas", tel: "0212-908-0100", calificacion: 4.9, disponible: true, horario: "Lun-Vie 10am-5pm" },
    { id: 6, nombre: "Dr. Rafael Silva", especialidad: "Oftalmología", hospital: "Centro Médico Docente La Trinidad", zona: "La Trinidad, Caracas", tel: "0212-945-7100", calificacion: 4.7, disponible: false, horario: "Mié-Vie 8am-3pm" },
];

const especialidades = ["Todas", "Cardiología", "Medicina General", "Pediatría", "Traumatología", "Dermatología", "Oftalmología"];

export default function DirectorioMedicoPage() {
    const { toast } = useToast();
    const [search, setSearch] = useState("");
    const [especialidad, setEspecialidad] = useState("Todas");

    const filtered = medicos.filter(m => {
        const matchEsp = especialidad === "Todas" || m.especialidad === especialidad;
        const matchSearch = !search || m.nombre.toLowerCase().includes(search.toLowerCase()) || m.especialidad.toLowerCase().includes(search.toLowerCase()) || m.hospital.toLowerCase().includes(search.toLowerCase());
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

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                    <Input placeholder="Buscar médico, especialidad u hospital..." value={search} onChange={e => setSearch(e.target.value)}
                        className="pl-11 h-11 rounded-xl border-border/30 bg-background" />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {especialidades.map(esp => (
                        <Button key={esp} variant={especialidad === esp ? "default" : "outline"} size="sm"
                            className={cn("h-9 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                                especialidad !== esp && "border-border/30")}
                            onClick={() => setEspecialidad(esp)}>
                            {esp}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((medico, i) => (
                    <motion.div key={medico.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
                        <Card className="rounded-2xl border border-border/30 bg-card overflow-hidden h-full flex flex-col hover:border-border/50 hover:shadow-lg transition-all">
                            <CardContent className="p-5 flex-1 flex flex-col gap-4">
                                <div className="flex items-start justify-between">
                                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/15 flex items-center justify-center">
                                        <Heart className="h-5 w-5 text-rose-400" />
                                    </div>
                                    <Badge className={cn("text-[9px] font-bold uppercase tracking-wider border h-6",
                                        medico.disponible
                                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                            : "bg-muted/30 text-muted-foreground border-border/30"
                                    )}>
                                        {medico.disponible ? "Disponible" : "No disponible"}
                                    </Badge>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-foreground/90">{medico.nombre}</p>
                                    <p className="text-[11px] font-medium text-primary/70 mt-0.5">{medico.especialidad}</p>
                                </div>
                                <div className="space-y-2 text-[11px] text-muted-foreground/60">
                                    <div className="flex items-center gap-2"><Building className="h-3 w-3 shrink-0" /><span className="font-medium truncate">{medico.hospital}</span></div>
                                    <div className="flex items-center gap-2"><MapPin className="h-3 w-3 shrink-0" /><span className="font-medium">{medico.zona}</span></div>
                                    <div className="flex items-center gap-2"><Clock className="h-3 w-3 shrink-0" /><span className="font-medium">{medico.horario}</span></div>
                                    <div className="flex items-center gap-2"><Star className="h-3 w-3 text-amber-400 shrink-0" /><span className="font-bold text-amber-400">{medico.calificacion}</span></div>
                                </div>
                                <Button className="w-full h-9 rounded-xl text-[10px] font-bold uppercase tracking-widest gap-1.5"
                                    onClick={() => toast({ title: "Cita solicitada", description: `Solicitud enviada a ${medico.nombre}. Te contactarán pronto.` })}>
                                    <Phone className="h-3 w-3" /> Solicitar Cita
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-16">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-muted/20 border border-border/20 flex items-center justify-center mb-4">
                        <Stethoscope className="h-6 w-6 text-muted-foreground/30" />
                    </div>
                    <p className="text-sm text-muted-foreground/50 font-medium">No se encontraron resultados</p>
                </div>
            )}
        </div>
    );
}
