"use client";

import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon, ArrowLeft, Bell, Clock, TriangleAlert as AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const calendarEvents = [
  { id: 1, title: "Declaración Mensual IVA", date: "15/04/2026", urgency: "high", desc: "Para RIF terminados en 0, 1, 2 y 3." },
  { id: 2, title: "Cierre Trimestral ISLR", date: "31/03/2026", urgency: "critical", desc: "Declaración definitiva del ejercicio anterior." },
  { id: 3, title: "Pago IGTF (Quincenal)", date: "20/03/2026", urgency: "medium", desc: "Consolidado de transacciones en divisas." },
  { id: 4, title: "Impuesto Actividad Económica", date: "05/04/2026", urgency: "medium", desc: "Municipio Vargas / Libertador." },
  { id: 5, title: "Aporte Protección Pensiones", date: "10/04/2026", urgency: "high", desc: "Nueva contribución especial 2025." },
];

export default function CalendarioFiscalPage() {
  const { toast } = useToast();
  const handleAction = (msg: string) => toast({ title: "CALENDARIO FISCAL", description: msg });

  return (
    <div className="p-6 md:p-12 bg-[#f5f7fa] min-h-screen space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <Button variant="ghost" asChild className="p-0 h-auto text-[#0A2472] hover:bg-transparent mb-2">
            <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4"/> Volver al Centro Contable</Link>
          </Button>
          <h1 className="text-3xl font-black text-[#0A2472] uppercase tracking-tighter flex items-center gap-3">
            <CalendarIcon className="h-8 w-8 text-[#00A86B]" />
            Calendario Fiscal
          </h1>
          <p className="text-slate-500 font-medium text-sm">Cronograma de vencimientos y obligaciones tributarias.</p>
        </div>
        <Button className="bg-[#0A2472] hover:bg-blue-900 rounded-xl" onClick={() => handleAction("Sincronizando con calendarios oficiales...")}>
          <Bell className="mr-2 h-4 w-4" /> Activar Alertas
        </Button>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {calendarEvents.map((event) => (
            <Card key={event.id} className="border-none shadow-sm rounded-2xl bg-white hover:shadow-md transition-all group overflow-hidden">
              <div className="flex">
                <div className={cn(
                  "w-2 transition-all group-hover:w-4",
                  event.urgency === 'critical' ? "bg-rose-500" : event.urgency === 'high' ? "bg-amber-500" : "bg-blue-500"
                )} />
                <div className="flex-1 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-black uppercase text-[#0A2472]">{event.title}</h3>
                      <Badge variant={event.urgency === 'critical' ? 'destructive' : 'secondary'} className="text-[8px] font-black uppercase tracking-widest">
                        {event.urgency}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500 font-medium uppercase tracking-tight">{event.desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Fecha Límite</span>
                    </div>
                    <p className="text-xl font-black text-slate-800 italic">{event.date}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-8">
          <Card className="border-none shadow-sm rounded-[2.5rem] bg-[#0A2472] p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10"><AlertTriangle className="h-32 w-32" /></div>
            <div className="relative z-10 space-y-6">
              <h3 className="text-xl font-black uppercase italic text-[#00A86B]">Próximo Vencimiento</h3>
              <div className="space-y-1">
                <p className="text-4xl font-black tracking-tighter italic">12 DÍAS</p>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Restantes para ISLR 2025</p>
              </div>
              <Button variant="secondary" className="w-full bg-white text-[#0A2472] hover:bg-slate-100 font-black uppercase text-[10px] tracking-widest h-12 rounded-xl shadow-lg">PREPARAR DECLARACIÓN</Button>
            </div>
          </Card>

          <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-10">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Guía de Prioridad</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-3 w-3 rounded-full bg-rose-500" />
                <span className="text-[10px] font-bold uppercase text-slate-600">Crítico: Menos de 48h</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="text-[10px] font-bold uppercase text-slate-600">Alto: Próxima semana</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span className="text-[10px] font-bold uppercase text-slate-600">Normal: En agenda</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}