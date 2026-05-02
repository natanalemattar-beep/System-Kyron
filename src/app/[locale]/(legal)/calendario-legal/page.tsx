"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, TriangleAlert, Bell, ChevronLeft, ChevronRight, ArrowLeft, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";

const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

type Obligacion = {
  nombre: string;
  tipo: "fiscal" | "laboral" | "regulatorio";
  descripcion: string;
  icono: "seniat" | "islr" | "municipal" | "inces" | "ivss" | "faov" | "retencion";
};

const SENIAT_IVA_DIAS: Record<number, number> = {
  0: 1, 1: 2, 2: 3, 3: 4, 4: 5,
  5: 8, 6: 9, 7: 10, 8: 11, 9: 12,
};

const TIPO_COLORES: Record<string, string> = {
  fiscal: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  laboral: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  regulatorio: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function isBusinessDay(year: number, month: number, day: number) {
  const d = new Date(year, month, day).getDay();
  return d !== 0 && d !== 6;
}

function getBusinessDays(year: number, month: number, count: number): number[] {
  const days: number[] = [];
  const totalDays = getDaysInMonth(year, month);
  for (let d = 1; d <= totalDays && days.length < count; d++) {
    if (isBusinessDay(year, month, d)) days.push(d);
  }
  return days;
}

function getObligaciones(year: number, month: number, day: number, rifDigit: number): Obligacion[] {
  const result: Obligacion[] = [];
  const m = month + 1;

  const seniatDay = SENIAT_IVA_DIAS[rifDigit];
  if (day === seniatDay) {
    result.push({
      nombre: `Declaración IVA SENIAT (RIF ...${rifDigit})`,
      tipo: "fiscal",
      descripcion: `Vencimiento para contribuyentes con RIF terminal ${rifDigit}. Declarar el IVA del mes anterior.`,
      icono: "seniat",
    });
  }

  if (day === 15) {
    result.push({
      nombre: "Retenciones IVA — Quincena",
      tipo: "fiscal",
      descripcion: "Enterar retenciones de IVA correspondientes a la primera quincena del mes.",
      icono: "retencion",
    });
  }

  if (day === getDaysInMonth(year, month)) {
    result.push({
      nombre: "Retenciones IVA — Fin de Mes",
      tipo: "fiscal",
      descripcion: "Enterar retenciones de IVA correspondientes a la segunda quincena del mes.",
      icono: "retencion",
    });
  }

  if ((m === 3 && day === 31) || (m === 6 && day === 30) || (m === 9 && day === 30)) {
    result.push({
      nombre: "ISLR — Anticipo Trimestral",
      tipo: "fiscal",
      descripcion: "Pago del anticipo trimestral del Impuesto Sobre la Renta (ISLR).",
      icono: "islr",
    });
  }

  if (m === 3 && day === 31) {
    result.push({
      nombre: "ISLR — Declaración Anual",
      tipo: "fiscal",
      descripcion: "Declaración definitiva del Impuesto Sobre la Renta del ejercicio fiscal anterior.",
      icono: "islr",
    });
  }

  if (day === 15) {
    result.push({
      nombre: "Impuestos Municipales — Pago",
      tipo: "fiscal",
      descripcion: "Vencimiento estimado para pagos de patente de industria y comercio municipal.",
      icono: "municipal",
    });
  }

  if ((m === 1 || m === 4 || m === 7 || m === 10) && day === 15) {
    result.push({
      nombre: "INCES — Aporte Trimestral",
      tipo: "laboral",
      descripcion: "Aporte trimestral al Instituto Nacional de Capacitación y Educación Socialista (2% nómina).",
      icono: "inces",
    });
  }

  if (day === 5 && isBusinessDay(year, month, day)) {
    result.push({
      nombre: "IVSS — Contribución Mensual",
      tipo: "laboral",
      descripcion: "Pago de cotizaciones al Instituto Venezolano de los Seguros Sociales.",
      icono: "ivss",
    });
  } else if (day <= 7 && !result.some(o => o.icono === "ivss")) {
    const bdays = getBusinessDays(year, month, 3);
    if (bdays.includes(day)) {
      const idx = bdays.indexOf(day);
      if (idx === 2) {
        result.push({
          nombre: "IVSS — Contribución Mensual",
          tipo: "laboral",
          descripcion: "Pago de cotizaciones al Instituto Venezolano de los Seguros Sociales.",
          icono: "ivss",
        });
      }
    }
  }

  if (day === 10) {
    result.push({
      nombre: "FAOV/BANAVIH — Aporte Mensual",
      tipo: "laboral",
      descripcion: "Aporte mensual al Fondo de Ahorro Obligatorio para la Vivienda (BANAVIH).",
      icono: "faov",
    });
  }

  const businessDays15 = getBusinessDays(year, month, 15);
  if (businessDays15.includes(day) && !result.some(o => o.icono === "retencion")) {
    if (businessDays15.indexOf(day) < 5) {
      result.push({
        nombre: "Retenciones IVA — Período Hábil",
        tipo: "fiscal",
        descripcion: "Dentro del período de los primeros 15 días hábiles para enterar retenciones de IVA.",
        icono: "retencion",
      });
    }
  }

  return result;
}

function getUpcomingEvents(year: number, month: number, rifDigit: number, count: number) {
  const today = new Date();
  const events: { date: Date; obligacion: Obligacion }[] = [];

  for (let offset = 0; offset < 90 && events.length < count; offset++) {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    const obs = getObligaciones(d.getFullYear(), d.getMonth(), d.getDate(), rifDigit);
    for (const o of obs) {
      if (events.length < count) {
        events.push({ date: new Date(d), obligacion: o });
      }
    }
  }

  return events;
}

export default function CalendarioLegalPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [rifDigit, setRifDigit] = useState(0);
  const [direction, setDirection] = useState(0);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    setDirection(-1);
    setSelectedDay(null);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    setDirection(1);
    setSelectedDay(null);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  const goToToday = () => {
    setDirection(0);
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDay(today.getDate());
  };

  const selectedObligaciones = useMemo(() => {
    if (selectedDay === null) return [];
    return getObligaciones(currentYear, currentMonth, selectedDay, rifDigit);
  }, [selectedDay, currentYear, currentMonth, rifDigit]);

  const upcomingEvents = useMemo(() => {
    return getUpcomingEvents(currentYear, currentMonth, rifDigit, 7);
  }, [currentYear, currentMonth, rifDigit]);

  const isToday = (day: number) =>
    day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

  const getDateStatus = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const weekEnd = new Date(todayStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    if (date < todayStart) return "past";
    if (date >= todayStart && date < weekEnd) return "thisweek";
    return "future";
  };

  const getDayObligacionCount = (day: number) => {
    return getObligaciones(currentYear, currentMonth, day, rifDigit).length;
  };

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    while (days.length % 7 !== 0) days.push(null);
    return days;
  }, [firstDay, daysInMonth]);

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-l-4 border-rose-500 pl-8 py-2 mt-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <Button asChild variant="outline" size="sm" className="h-8 px-3 rounded-xl text-[11px] font-semibold uppercase tracking-widest">
            <Link href="/escritorio-juridico"><ArrowLeft className="mr-1.5 h-3 w-3" /> Escritorio Jurídico</Link>
          </Button>
        </div>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-[11px] font-semibold uppercase tracking-wider text-rose-400 mb-3">
            <Calendar className="h-3 w-3" /> CALENDARIO LEGAL
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase leading-none">
            Calendario <span className="bg-gradient-to-r from-rose-400 to-rose-600 bg-clip-text text-transparent italic">Legal</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-40 mt-2 italic">
            Vencimientos Fiscales, Laborales y Regulatorios — Venezuela
          </p>
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
      >
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-rose-400" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">RIF Terminal:</span>
        </div>
        <Select value={String(rifDigit)} onValueChange={v => setRifDigit(Number(v))}>
          <SelectTrigger className="w-[140px] h-10 rounded-xl bg-card/50 border-border/40 text-sm font-bold">
            <SelectValue placeholder="Dígito RIF" />
          </SelectTrigger>
          <SelectContent>
            {[0,1,2,3,4,5,6,7,8,9].map(d => (
              <SelectItem key={d} value={String(d)}>
                Dígito {d} → Día {SENIAT_IVA_DIAS[d]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={goToToday} className="h-10 px-4 rounded-xl text-[11px] font-semibold uppercase tracking-widest">
          <Calendar className="mr-1.5 h-3 w-3" /> Hoy
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-3"
        >
          <Card className="bg-card/40 border-border/30 rounded-2xl overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={prevMonth} className="h-10 w-10 rounded-xl hover:bg-rose-500/10">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <CardTitle className="text-lg md:text-2xl font-semibold uppercase tracking-tight text-center">
                  {MESES[currentMonth]} <span className="text-rose-400">{currentYear}</span>
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={nextMonth} className="h-10 w-10 rounded-xl hover:bg-rose-500/10">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-3 md:p-6">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DIAS_SEMANA.map(dia => (
                  <div key={dia} className="text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50 py-2">
                    {dia}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${currentYear}-${currentMonth}`}
                  initial={{ opacity: 0, x: direction * 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -50 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-7 gap-1"
                >
                  {calendarDays.map((day, i) => {
                    if (day === null) {
                      return <div key={`empty-${i}`} className="aspect-square" />;
                    }

                    const status = getDateStatus(day);
                    const count = getDayObligacionCount(day);
                    const selected = selectedDay === day;
                    const todayMark = isToday(day);

                    return (
                      <motion.button
                        key={`day-${day}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                        className={cn(
                          "aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all border",
                          selected
                            ? "bg-rose-500/20 border-rose-500/50 ring-2 ring-rose-500/30"
                            : "border-transparent hover:bg-card/80 hover:border-border/40",
                          todayMark && !selected && "border-rose-500/40 bg-rose-500/5",
                          count > 0 && !selected && status === "past" && "bg-red-500/5",
                          count > 0 && !selected && status === "thisweek" && "bg-amber-500/5",
                          count > 0 && !selected && status === "future" && "bg-emerald-500/5",
                        )}
                      >
                        <span className={cn(
                          "text-sm font-bold",
                          todayMark && "text-rose-400",
                          selected && "text-rose-300",
                          !todayMark && !selected && "text-foreground/80",
                        )}>
                          {day}
                        </span>
                        {count > 0 && (
                          <div className="flex gap-0.5 mt-0.5">
                            {Array.from({ length: Math.min(count, 3) }).map((_, j) => (
                              <span
                                key={j}
                                className={cn(
                                  "w-1.5 h-1.5 rounded-full",
                                  status === "past" && "bg-red-400",
                                  status === "thisweek" && "bg-amber-400",
                                  status === "future" && "bg-emerald-400",
                                )}
                              />
                            ))}
                            {count > 3 && (
                              <span className="text-[7px] font-bold text-muted-foreground/50">+{count - 3}</span>
                            )}
                          </div>
                        )}
                        {todayMark && (
                          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                        )}
                      </motion.button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border/20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Vencido</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Esta semana</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Futuro</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <AnimatePresence>
            {selectedDay !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-4"
              >
                <Card className="bg-card/40 border-border/30 rounded-2xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold uppercase tracking-tight flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-rose-400" />
                      {selectedDay} de {MESES[currentMonth]} {currentYear}
                      <Badge className="ml-2 text-[10px] font-semibold uppercase tracking-widest bg-rose-500/20 text-rose-400 border-rose-500/30">
                        {selectedObligaciones.length} {selectedObligaciones.length === 1 ? "obligación" : "obligaciones"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedObligaciones.length === 0 ? (
                      <div className="text-center py-8">
                        <Calendar className="h-10 w-10 text-muted-foreground/20 mx-auto mb-3" />
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/40">
                          Sin obligaciones fiscales o laborales este día
                        </p>
                      </div>
                    ) : (
                      selectedObligaciones.map((ob, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-4 p-4 rounded-xl bg-card/60 border border-border/20"
                        >
                          <div className={cn(
                            "p-2.5 rounded-xl shrink-0",
                            ob.tipo === "fiscal" && "bg-rose-500/10 border border-rose-500/20",
                            ob.tipo === "laboral" && "bg-blue-500/10 border border-blue-500/20",
                            ob.tipo === "regulatorio" && "bg-purple-500/10 border border-purple-500/20",
                          )}>
                            {ob.tipo === "fiscal" ? (
                              <TriangleAlert className={cn("h-4 w-4", "text-rose-400")} />
                            ) : ob.tipo === "laboral" ? (
                              <Activity className={cn("h-4 w-4", "text-blue-400")} />
                            ) : (
                              <Bell className={cn("h-4 w-4", "text-purple-400")} />
                            )}
                          </div>
                          <div className="space-y-1 min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-tight text-foreground/90">{ob.nombre}</p>
                            <Badge className={cn("text-[7px] font-semibold uppercase tracking-widest border h-5", TIPO_COLORES[ob.tipo])}>
                              {ob.tipo}
                            </Badge>
                            <p className="text-[10px] text-muted-foreground/60 leading-relaxed mt-1">{ob.descripcion}</p>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <Card className="bg-card/40 border-border/30 rounded-2xl sticky top-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-semibold uppercase tracking-widest flex items-center gap-2">
                <Bell className="h-3.5 w-3.5 text-rose-400" />
                Próximos Vencimientos
              </CardTitle>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">Siguientes 7 eventos</p>
            </CardHeader>
            <CardContent className="space-y-2">
              {upcomingEvents.map((ev, i) => {
                const dayStr = ev.date.getDate();
                const monthStr = MESES[ev.date.getMonth()].slice(0, 3);

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.04 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-card/60 border border-border/10 hover:bg-card/80 transition-all cursor-pointer"
                    onClick={() => {
                      setCurrentMonth(ev.date.getMonth());
                      setCurrentYear(ev.date.getFullYear());
                      setSelectedDay(ev.date.getDate());
                    }}
                  >
                    <div className="text-center shrink-0 w-10">
                      <p className="text-lg font-bold text-rose-400 leading-none">{dayStr}</p>
                      <p className="text-[7px] font-semibold uppercase tracking-widest text-muted-foreground/40">{monthStr}</p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-tight text-foreground/80 leading-tight truncate">{ev.obligacion.nombre}</p>
                      <Badge className={cn("text-[6px] font-semibold uppercase tracking-widest border h-4 mt-1", TIPO_COLORES[ev.obligacion.tipo])}>
                        {ev.obligacion.tipo}
                      </Badge>
                    </div>
                  </motion.div>
                );
              })}

              {upcomingEvents.length === 0 && (
                <div className="text-center py-6">
                  <Clock className="h-8 w-8 text-muted-foreground/20 mx-auto mb-2" />
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40">Sin eventos próximos</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/30 rounded-2xl mt-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-semibold uppercase tracking-widest flex items-center gap-2">
                <TriangleAlert className="h-3.5 w-3.5 text-amber-400" />
                Leyenda
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { color: "bg-rose-500/20 text-rose-400 border-rose-500/30", label: "Fiscal", desc: "SENIAT, IVA, ISLR" },
                { color: "bg-blue-500/20 text-blue-400 border-blue-500/30", label: "Laboral", desc: "IVSS, INCES, FAOV" },
                { color: "bg-purple-500/20 text-purple-400 border-purple-500/30", label: "Regulatorio", desc: "Permisos, Municipal" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Badge className={cn("text-[7px] font-semibold uppercase tracking-widest border h-5", item.color)}>
                    {item.label}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground/40 font-bold">{item.desc}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}