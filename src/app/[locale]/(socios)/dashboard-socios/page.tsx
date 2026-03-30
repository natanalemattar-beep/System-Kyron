"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, DollarSign, Briefcase, ArrowRight, ShieldCheck, Handshake, Scale, FileText, Activity, CirclePercent, Clock, Landmark } from "lucide-react";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const socios = [
  { nombre: "Carlos Mendoza R.", participacion: 35, capital: "$87,500.00", cargo: "Presidente", estado: "Activo", desde: "2019" },
  { nombre: "María Elena Suárez", participacion: 25, capital: "$62,500.00", cargo: "Vicepresidente", estado: "Activo", desde: "2019" },
  { nombre: "José Antonio Pérez", participacion: 20, capital: "$50,000.00", cargo: "Director", estado: "Activo", desde: "2020" },
  { nombre: "Laura Beatriz Gómez", participacion: 15, capital: "$37,500.00", cargo: "Director", estado: "Activo", desde: "2021" },
  { nombre: "Ricardo Vargas M.", participacion: 5, capital: "$12,500.00", cargo: "Comisario", estado: "Activo", desde: "2022" },
];

const acuerdos = [
  { titulo: "Distribución de dividendos Q1 2026", fecha: "15/03/2026", estado: "Aprobado", tipo: "Dividendos" },
  { titulo: "Ampliación de capital social", fecha: "01/03/2026", estado: "En revisión", tipo: "Capital" },
  { titulo: "Nombramiento Director Operaciones", fecha: "20/02/2026", estado: "Aprobado", tipo: "Junta" },
  { titulo: "Modificación de estatutos Art. 12", fecha: "10/02/2026", estado: "Pendiente", tipo: "Legal" },
];

const modules = [
  { title: "Actas de Asamblea", description: "Registro y control de actas, quórum, decisiones y acuerdos de asambleas ordinarias y extraordinarias.", icon: FileText, href: "/socios/actas-asamblea", color: "text-blue-500", bgColor: "bg-blue-500/10 border-blue-500/15" },
  { title: "Capital Social", description: "Gestión de aportes, distribución accionaria, aumentos de capital y valoración patrimonial.", icon: Landmark, href: "/socios/capital-social", color: "text-emerald-500", bgColor: "bg-emerald-500/10 border-emerald-500/15" },
  { title: "Dividendos", description: "Cálculo y distribución de utilidades, retenciones ISLR, y registro de pagos a socios.", icon: CirclePercent, href: "/socios/dividendos", color: "text-violet-500", bgColor: "bg-violet-500/10 border-violet-500/15" },
  { title: "Gobernanza Corporativa", description: "Estructura de poder, cargos, comités, y compliance regulatorio ante el Registro Mercantil.", icon: Scale, href: "/socios/gobernanza", color: "text-amber-500", bgColor: "bg-amber-500/10 border-amber-500/15" },
];

export default function DashboardSociosPage() {
  return (
    <div className="space-y-10 pb-20">
      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-4">
          <Briefcase className="h-3 w-3" /> NODO SOCIETARIO
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase">Gestión de <span className="text-indigo-500 italic">Socios</span></h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mt-2">Estructura Accionaria • Gobernanza Corporativa 2026</p>
      </header>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Capital Social", val: "$250,000", icon: DollarSign, color: "text-emerald-500", bgColor: "bg-emerald-500/10 border-emerald-500/15", sub: "Registrado y pagado" },
          { label: "Socios Activos", val: "5", icon: Users, color: "text-blue-500", bgColor: "bg-blue-500/10 border-blue-500/15", sub: "100% al día" },
          { label: "Dividendos 2026", val: "$18,750", icon: TrendingUp, color: "text-violet-500", bgColor: "bg-violet-500/10 border-violet-500/15", sub: "Q1 distribuido" },
          { label: "Próxima Asamblea", val: "15 ABR", icon: Clock, color: "text-amber-500", bgColor: "bg-amber-500/10 border-amber-500/15", sub: "Asamblea ordinaria" },
        ].map((kpi, i) => (
          <Card key={i} className="glass-card border-none bg-card/50 p-5 rounded-2xl group hover:scale-[1.01] transition-all">
            <div className="flex justify-between items-start mb-4">
              <p className="text-[9px] font-black uppercase tracking-[0.15em] text-muted-foreground/40">{kpi.label}</p>
              <div className={cn("p-1.5 rounded-lg border", kpi.bgColor)}>
                <kpi.icon className={cn("h-3.5 w-3.5", kpi.color)} />
              </div>
            </div>
            <p className="text-2xl font-black text-foreground tracking-tight">{kpi.val}</p>
            <p className="text-[10px] text-muted-foreground/50 font-bold mt-1">{kpi.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-8 glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
          <CardHeader className="p-6 border-b border-border/30">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-foreground">Composición Accionaria</CardTitle>
                <CardDescription className="text-[10px] mt-1">Distribución actual de participación social</CardDescription>
              </div>
              <Badge variant="outline" className="text-[8px] font-bold uppercase tracking-wider border-emerald-500/20 text-emerald-500 bg-emerald-500/5">
                <ShieldCheck className="h-2.5 w-2.5 mr-1" /> Reg. Mercantil
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/20">
              {socios.map((socio, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-muted/20 transition-colors group">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center text-indigo-500 font-black text-sm shrink-0">
                      {socio.nombre.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground truncate">{socio.nombre}</p>
                      <p className="text-[10px] text-muted-foreground">{socio.cargo} · Desde {socio.desde}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 shrink-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-black text-foreground">{socio.capital}</p>
                      <p className="text-[9px] text-muted-foreground/40 uppercase">Capital aportado</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-muted/30 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${socio.participacion}%` }} />
                        </div>
                        <span className="text-sm font-black text-indigo-500 tabular-nums w-10 text-right">{socio.participacion}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-6">
          <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
            <CardHeader className="p-5 border-b border-border/30">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-foreground flex items-center gap-2">
                <Activity className="h-3.5 w-3.5 text-indigo-500" /> Acuerdos Recientes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/20">
                {acuerdos.map((acuerdo, i) => (
                  <div key={i} className="px-5 py-3.5 hover:bg-muted/20 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-foreground truncate">{acuerdo.titulo}</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5">{acuerdo.fecha} · {acuerdo.tipo}</p>
                      </div>
                      <Badge variant="outline" className={cn(
                        "text-[8px] font-bold uppercase shrink-0",
                        acuerdo.estado === "Aprobado" ? "border-emerald-500/20 text-emerald-500 bg-emerald-500/5" :
                        acuerdo.estado === "En revisión" ? "border-amber-500/20 text-amber-500 bg-amber-500/5" :
                        "border-blue-500/20 text-blue-500 bg-blue-500/5"
                      )}>{acuerdo.estado}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-2xl p-6 border-none relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Handshake className="h-24 w-24" /></div>
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <h3 className="text-sm font-black uppercase tracking-tight mb-2">Pacto Parasocial</h3>
            <p className="text-[11px] opacity-80 leading-relaxed mb-5">Gestione cláusulas de prelación, derecho de tag-along, drag-along y resolución de conflictos.</p>
            <Button variant="secondary" size="sm" className="bg-white text-indigo-700 font-bold text-[10px] uppercase tracking-wider rounded-xl h-9 px-5 hover:bg-white/90">
              Ver Documento
            </Button>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((module) => (
          <Link key={module.title} href={module.href as any} className="group block">
            <Card className="glass-card border-none bg-card/50 p-5 rounded-2xl h-full flex flex-col justify-between hover:scale-[1.01] transition-all">
              <div className="space-y-3">
                <div className={cn("p-2.5 rounded-xl border w-fit transition-transform group-hover:scale-110 duration-300", module.bgColor)}>
                  <module.icon className={cn("h-4 w-4", module.color)} />
                </div>
                <div>
                  <CardTitle className="text-xs font-black uppercase tracking-tight text-foreground mb-1.5 group-hover:text-indigo-500 transition-colors">{module.title}</CardTitle>
                  <CardDescription className="text-[10px] text-muted-foreground leading-relaxed">{module.description}</CardDescription>
                </div>
              </div>
              <div className="pt-4 mt-auto flex items-center justify-between text-[9px] font-bold text-muted-foreground/30 group-hover:text-indigo-500 transition-colors uppercase tracking-wider">
                <span>Acceder</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
