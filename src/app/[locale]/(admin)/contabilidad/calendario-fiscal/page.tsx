"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsTrigger,
  TabsList,
} from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  AlertTriangle,
  Bell,
  Landmark,
  FileText,
  DollarSign,
  ArrowLeft,
  Activity,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { useToast } from "@/hooks/use-toast";

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const DAY_NAMES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const IVA_DAYS: Record<number, number> = {
  0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10,
};

const ISLR_QUARTERLY = [
  { month: 2, day: 31 },
  { month: 5, day: 30 },
  { month: 8, day: 30 },
  { month: 11, day: 31 },
];

const INCES_QUARTERS = [2, 5, 8, 11];
const MUNICIPAL_QUARTERS = [2, 5, 8, 11];

interface Obligation {
  name: string;
  frequency: string;
  deadline: string;
  penalty: string;
  legalBasis: string;
  icon: typeof Calendar;
  color: string;
}

const FISCAL_OBLIGATIONS: Obligation[] = [
  {
    name: "Declaración de IVA",
    frequency: "Mensual",
    deadline: "Día 1-10 del mes siguiente según dígito terminal del RIF",
    penalty: "Multa de 50 a 150 UT + intereses moratorios",
    legalBasis: "Ley de IVA Art. 47 · COT Art. 103",
    icon: DollarSign,
    color: "text-amber-500",
  },
  {
    name: "Retención de IVA",
    frequency: "Quincenal",
    deadline: "Primeros 15 días hábiles del mes",
    penalty: "Multa de 100 a 300 UT + responsabilidad solidaria",
    legalBasis: "Providencia SNAT/2015/0049",
    icon: FileText,
    color: "text-orange-500",
  },
  {
    name: "ISLR Declaración Anual",
    frequency: "Anual (Marzo)",
    deadline: "Día 1-10 de Marzo según dígito terminal del RIF",
    penalty: "Multa de 50 a 150 UT + intereses moratorios 1.2x",
    legalBasis: "Ley de ISLR Art. 80 · COT Art. 103",
    icon: Landmark,
    color: "text-blue-500",
  },
  {
    name: "ISLR Estimadas Trimestrales",
    frequency: "Trimestral",
    deadline: "31 Mar, 30 Jun, 30 Sep, 31 Dic",
    penalty: "Multa de 25 a 100 UT",
    legalBasis: "Ley de ISLR Art. 83-86",
    icon: Activity,
    color: "text-indigo-500",
  },
];

const LABOR_OBLIGATIONS: Obligation[] = [
  {
    name: "IVSS (Seguro Social)",
    frequency: "Mensual",
    deadline: "Día 1-5 de cada mes",
    penalty: "Recargos del 5% mensual + sanción administrativa",
    legalBasis: "Ley del Seguro Social Art. 63",
    icon: Bell,
    color: "text-emerald-500",
  },
  {
    name: "FAOV / BANAVIH",
    frequency: "Mensual",
    deadline: "Día 1-5 de cada mes",
    penalty: "Multa de 10 a 50 UT + intereses de mora",
    legalBasis: "Ley del Régimen Prestacional de Vivienda Art. 34",
    icon: Landmark,
    color: "text-cyan-500",
  },
  {
    name: "INCES",
    frequency: "Trimestral",
    deadline: "Marzo, Junio, Septiembre, Diciembre",
    penalty: "Multa de 25 a 100 UT + cierre temporal",
    legalBasis: "Ley del INCES Art. 14",
    icon: FileText,
    color: "text-violet-500",
  },
  {
    name: "RPE (Registro Nacional de Empresas)",
    frequency: "Anual",
    deadline: "Renovación anual dentro del mes de constitución",
    penalty: "Multa de 50 a 200 UT + inhabilitación",
    legalBasis: "Decreto con Fuerza de Ley Art. 3",
    icon: Clock,
    color: "text-pink-500",
  },
];

const MUNICIPAL_OBLIGATIONS: Obligation[] = [
  {
    name: "Impuesto de Actividades Económicas",
    frequency: "Trimestral",
    deadline: "Último día hábil del trimestre",
    penalty: "Recargo del 1% diario hasta 100% + cierre del establecimiento",
    legalBasis: "LOPPM Art. 205-214",
    icon: DollarSign,
    color: "text-rose-500",
  },
  {
    name: "Patente de Industria y Comercio",
    frequency: "Anual",
    deadline: "Renovación dentro de los primeros 30 días del año fiscal municipal",
    penalty: "Multa de 25 a 150 UT + suspensión de actividades",
    legalBasis: "Ordenanza Municipal de cada jurisdicción",
    icon: Landmark,
    color: "text-teal-500",
  },
];

function getDeadlinesForMonth(
  month: number,
  year: number,
  rifDigit: number
): { day: number; label: string; type: "fiscal" | "labor" | "municipal" }[] {
  const deadlines: { day: number; label: string; type: "fiscal" | "labor" | "municipal" }[] = [];

  const ivaDay = IVA_DAYS[rifDigit];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  if (ivaDay <= daysInMonth) {
    deadlines.push({ day: ivaDay, label: "IVA Declaración", type: "fiscal" });
  }

  for (let d = 1; d <= Math.min(5, daysInMonth); d++) {
    deadlines.push({ day: d, label: "Retención IVA", type: "fiscal" });
  }

  if (month === 2) {
    const islrDay = IVA_DAYS[rifDigit];
    if (islrDay <= daysInMonth) {
      deadlines.push({ day: islrDay, label: "ISLR Anual", type: "fiscal" });
    }
  }

  const qMatch = ISLR_QUARTERLY.find((q) => q.month === month);
  if (qMatch) {
    const lastDay = Math.min(qMatch.day, daysInMonth);
    deadlines.push({ day: lastDay, label: "ISLR Estimada", type: "fiscal" });
  }

  for (let d = 1; d <= Math.min(5, daysInMonth); d++) {
    deadlines.push({ day: d, label: "IVSS", type: "labor" });
    deadlines.push({ day: d, label: "FAOV/BANAVIH", type: "labor" });
  }

  if (INCES_QUARTERS.includes(month)) {
    deadlines.push({ day: daysInMonth, label: "INCES", type: "labor" });
  }

  if (MUNICIPAL_QUARTERS.includes(month)) {
    deadlines.push({ day: daysInMonth, label: "Actividades Económicas", type: "municipal" });
  }

  return deadlines;
}

function getStatusColor(month: number, year: number): { bg: string; text: string; label: string } {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return { bg: "bg-red-500/10 border-red-500/30", text: "text-red-400", label: "Vencido" };
  }
  if (year === currentYear && month === currentMonth) {
    return { bg: "bg-amber-500/10 border-amber-500/30", text: "text-amber-400", label: "Este Mes" };
  }
  return { bg: "bg-emerald-500/10 border-emerald-500/30", text: "text-emerald-400", label: "Próximo" };
}

function ObligationCard({ ob }: { ob: Obligation }) {
  const Icon = ob.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border rounded-2xl shadow-sm hover:shadow-md transition-all">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn("p-2.5 rounded-xl bg-muted")}>
                <Icon className={cn("h-5 w-5", ob.color)} />
              </div>
              <div>
                <CardTitle className="text-sm font-bold uppercase tracking-tight">
                  {ob.name}
                </CardTitle>
                <Badge variant="outline" className="mt-1 text-[9px] font-black uppercase tracking-widest">
                  {ob.frequency}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-2">
            <Clock className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Vencimiento</p>
              <p className="text-xs text-foreground">{ob.deadline}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-3.5 w-3.5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Sanción por Incumplimiento</p>
              <p className="text-xs text-foreground">{ob.penalty}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Info className="h-3.5 w-3.5 text-blue-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Base Legal</p>
              <p className="text-xs text-foreground">{ob.legalBasis}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function CalendarioFiscalPage() {
  const { toast } = useToast();
  const now = new Date();
  const [rifDigit, setRifDigit] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const deadlines = useMemo(
    () => getDeadlinesForMonth(currentMonth, currentYear, rifDigit),
    [currentMonth, currentYear, rifDigit]
  );

  const deadlinesByDay = useMemo(() => {
    const map: Record<number, { label: string; type: string }[]> = {};
    for (const d of deadlines) {
      if (!map[d.day]) map[d.day] = [];
      const exists = map[d.day].some((x) => x.label === d.label);
      if (!exists) map[d.day].push({ label: d.label, type: d.type });
    }
    return map;
  }, [deadlines]);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const status = getStatusColor(currentMonth, currentYear);

  const handleExport = () => {
    toast({
      title: "Exportación iniciada",
      description: `Calendario fiscal de ${MONTH_NAMES[currentMonth]} ${currentYear} preparado para impresión.`,
    });
  };

  const calendarCells = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarCells.push(<div key={`empty-${i}`} />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDeadlines = deadlinesByDay[day] || [];
    const isToday =
      day === now.getDate() &&
      currentMonth === now.getMonth() &&
      currentYear === now.getFullYear();
    const hasDeadline = dayDeadlines.length > 0;

    calendarCells.push(
      <div
        key={day}
        className={cn(
          "relative p-1.5 min-h-[70px] rounded-xl border transition-all text-xs",
          isToday
            ? "border-amber-500/50 bg-amber-500/5"
            : hasDeadline
            ? "border-amber-500/20 bg-muted/30"
            : "border-border/50 bg-background",
          hasDeadline && "hover:border-amber-500/40"
        )}
      >
        <span
          className={cn(
            "inline-flex items-center justify-center h-6 w-6 rounded-full text-[11px] font-bold",
            isToday && "bg-amber-500 text-black"
          )}
        >
          {day}
        </span>
        {dayDeadlines.length > 0 && (
          <div className="mt-0.5 space-y-0.5">
            {dayDeadlines.slice(0, 3).map((dl, i) => (
              <div
                key={i}
                className={cn(
                  "text-[8px] font-bold uppercase tracking-wider truncate px-1 py-0.5 rounded",
                  dl.type === "fiscal"
                    ? "bg-amber-500/10 text-amber-400"
                    : dl.type === "labor"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-rose-500/10 text-rose-400"
                )}
              >
                {dl.label}
              </div>
            ))}
            {dayDeadlines.length > 3 && (
              <span className="text-[8px] text-muted-foreground">+{dayDeadlines.length - 3} más</span>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-background">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        <Link href={"/contabilidad" as any}>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Contabilidad
          </Button>
        </Link>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-[9px] font-black uppercase tracking-widest text-amber-500">
            <Landmark className="h-3 w-3" />
            CALENDARIO FISCAL SENIAT
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight uppercase bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">
            Calendario Fiscal
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Vencimientos por Dígito de RIF • Obligaciones Tributarias, Laborales y Municipales
          </p>
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Dígito Terminal RIF
          </span>
          <Select
            value={String(rifDigit)}
            onValueChange={(v) => setRifDigit(Number(v))}
          >
            <SelectTrigger className="w-20 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => (
                <SelectItem key={i} value={String(i)}>
                  {i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-widest", status.text, status.bg)}>
            {status.label}
          </Badge>
          <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest text-amber-400">
            IVA: Día {IVA_DAYS[rifDigit]}
          </Badge>
        </div>

        <div className="sm:ml-auto">
          <Button variant="outline" size="sm" className="rounded-xl gap-2" onClick={handleExport}>
            <FileText className="h-4 w-4" />
            Exportar / Imprimir
          </Button>
        </div>
      </motion.div>

      <Tabs defaultValue="calendario" className="space-y-6">
        <TabsList className="bg-muted/50 rounded-xl p-1">
          <TabsTrigger value="calendario" className="rounded-lg text-xs font-bold uppercase tracking-wider gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            Calendario
          </TabsTrigger>
          <TabsTrigger value="fiscales" className="rounded-lg text-xs font-bold uppercase tracking-wider gap-1.5">
            <DollarSign className="h-3.5 w-3.5" />
            Obligaciones Fiscales
          </TabsTrigger>
          <TabsTrigger value="laborales" className="rounded-lg text-xs font-bold uppercase tracking-wider gap-1.5">
            <Bell className="h-3.5 w-3.5" />
            Laborales
          </TabsTrigger>
          <TabsTrigger value="municipales" className="rounded-lg text-xs font-bold uppercase tracking-wider gap-1.5">
            <Landmark className="h-3.5 w-3.5" />
            Municipales
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendario">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border rounded-2xl shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="icon" className="rounded-xl" onClick={prevMonth}>
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <CardTitle className="text-lg font-black uppercase tracking-tight">
                    {MONTH_NAMES[currentMonth]} {currentYear}
                  </CardTitle>
                  <Button variant="ghost" size="icon" className="rounded-xl" onClick={nextMonth}>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {DAY_NAMES.map((d) => (
                    <div
                      key={d}
                      className="text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground py-2"
                    >
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarCells}
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Fiscal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Laboral</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-rose-500/20 border border-rose-500/40" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Municipal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-black">H</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Hoy</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className={cn("border rounded-2xl shadow-sm p-5", "border-red-500/20")}>
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Vencido</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Obligaciones cuyo plazo ya transcurrió. Sujetas a multas e intereses moratorios.
                </p>
              </Card>
              <Card className={cn("border rounded-2xl shadow-sm p-5", "border-amber-500/20")}>
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-4 w-4 text-amber-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Este Mes</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Obligaciones vigentes del período actual. Atención inmediata requerida.
                </p>
              </Card>
              <Card className={cn("border rounded-2xl shadow-sm p-5", "border-emerald-500/20")}>
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Próximo</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Obligaciones futuras. Planifique con anticipación para evitar sanciones.
                </p>
              </Card>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="fiscales">
          <AnimatePresence mode="wait">
            <motion.div
              key="fiscales"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {FISCAL_OBLIGATIONS.map((ob, i) => (
                <ObligationCard key={i} ob={ob} />
              ))}
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="laborales">
          <AnimatePresence mode="wait">
            <motion.div
              key="laborales"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {LABOR_OBLIGATIONS.map((ob, i) => (
                <ObligationCard key={i} ob={ob} />
              ))}
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="municipales">
          <AnimatePresence mode="wait">
            <motion.div
              key="municipales"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {MUNICIPAL_OBLIGATIONS.map((ob, i) => (
                <ObligationCard key={i} ob={ob} />
              ))}
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </div>
  );
}
