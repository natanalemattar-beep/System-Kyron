"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Stethoscope, Search, Phone, MapPin, Star, Clock, Building, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const medicos = [
    {
        id: 1, nombre: "Dra. María González", especialidad: "Cardiología", hospital: "Clínica El Ávila",
        zona: "Altamira, Caracas", tel: "0212-208-9000", calificacion: 4.9, disponible: true, horario: "Lun-Vie 8am-5pm",
    },
    {
        id: 2, nombre: "Dr. Carlos Pérez", especialidad: "Medicina General", hospital: "Centro Médico de Caracas",
        zona: "San Bernardino, Caracas", tel: "0212-555-0100", calificacion: 4.7, disponible: true, horario: "Lun-Sáb 7am-7pm",
    },
    {
        id: 3, nombre: "Dra. Ana Rodríguez", especialidad: "Pediatría", hospital: "Hospital de Niños J.M. de los Ríos",
        zona: "San José, Caracas", tel: "0212-483-6922", calificacion: 4.8, disponible: false, horario: "Mar-Sáb 9am-4pm",
    },
    {
        id: 4, nombre: "Dr. José Martínez", especialidad: "Traumatología", hospital: "Instituto Médico La Floresta",
        zona: "La Floresta, Caracas", tel: "0212-285-0111", calificacion: 4.6, disponible: true, horario: "Lun-Vie 9am-6pm",
    },
    {
        id: 5, nombre: "Dra. Carmen López", especialidad: "Dermatología", hospital: "Policlínica Metropolitana",
        zona: "Chuao, Caracas", tel: "0212-908-0100", calificacion: 4.9, disponible: true, horario: "Lun-Vie 10am-5pm",
    },
    {
        id: 6, nombre: "Dr. Rafael Silva", especialidad: "Oftalmología", hospital: "Centro Médico Docente La Trinidad",
        zona: "La Trinidad, Caracas", tel: "0212-945-7100", calificacion: 4.7, disponible: false, horario: "Mié-Vie 8am-3pm",
    },
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
        <div className="space-y-10 pb-20 px-4 md:px-10">
            <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-l-4 border-primary pl-8 py-2 mt-10"
            >
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-rose-400 mb-3">
                        <Stethoscope className="h-3 w-3" /> RED MÉDICA KYRON
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">
                        Directorio <span className="text-rose-400 italic">Médico</span>
                    </h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">
                        Red de Salud • Centros Médicos Aliados • Venezuela
                    </p>
                </div>
            </motion.header>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                    <Input
                        placeholder="Buscar médico, especialidad u hospital..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-11 h-12 rounded-xl bg-card/50 border-border/40"
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {especialidades.map(esp => (
                        <Button
                            key={esp}
                            variant={especialidad === esp ? "default" : "outline"}
                            size="sm"
                            className={`h-9 px-4 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all ${especialidad === esp ? "btn-3d-primary" : "border-border/40"}`}
                            onClick={() => setEspecialidad(esp)}
                        >
                            {esp}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((medico, i) => (
                    <motion.div
                        key={medico.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.06 * i }}
                    >
                        <Card className="glass-card border-none bg-card/40 rounded-2xl overflow-hidden h-full flex flex-col hover:bg-card/60 transition-all group">
                            <CardContent className="p-6 flex-1 flex flex-col gap-4">
                                <div className="flex items-start justify-between">
                                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                                        <Heart className="h-6 w-6 text-rose-400" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge className={`text-[8px] font-black uppercase tracking-widest border h-6 ${medico.disponible ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-muted text-muted-foreground border-border/40"}`}>
                                            {medico.disponible ? "Disponible" : "No disponible"}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <p className="text-sm font-black uppercase tracking-tight text-foreground/90 group-hover:text-primary transition-colors">{medico.nombre}</p>
                                    <p className="text-[10px] font-bold text-primary/70 uppercase tracking-widest mt-0.5">{medico.especialidad}</p>
                                </div>

                                <div className="space-y-2 text-[10px] text-muted-foreground/60">
                                    <div className="flex items-center gap-2">
                                        <Building className="h-3 w-3 shrink-0" />
                                        <span className="font-bold truncate">{medico.hospital}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-3 w-3 shrink-0" />
                                        <span className="font-bold">{medico.zona}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-3 w-3 shrink-0" />
                                        <span className="font-bold">{medico.horario}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Star className="h-3 w-3 text-amber-400 shrink-0" />
                                        <span className="font-black text-amber-400">{medico.calificacion}</span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full h-9 rounded-xl text-[9px] font-black uppercase tracking-widest btn-3d-primary"
                                    onClick={() => toast({
                                        title: "CITA SOLICITADA",
                                        description: `Solicitud enviada a ${medico.nombre}. Te contactarán pronto.`,
                                    })}
                                >
                                    <Phone className="mr-1.5 h-3 w-3" /> SOLICITAR CITA
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-16">
                    <Stethoscope className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
                    <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/40">No se encontraron resultados</p>
                </div>
            )}
        </div>
    );
}
