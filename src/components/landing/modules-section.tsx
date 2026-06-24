import { memo } from 'react';
import { User, Calculator, Landmark, Users, Megaphone, Gavel, Recycle, Smartphone, Server, ClipboardList, Briefcase, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from '@/navigation';

const modules = [
  { icon: User, name: "Cuenta Personal", desc: "Tu identidad digital, documentos, salud y trámites civiles desde un solo lugar", href: "/perfil", count: 17, color: "blue" as const },
  { icon: Calculator, name: "Contabilidad", desc: "Lleva la contabilidad de tu negocio sin perder tiempo en papeles ni Excel", href: "/contabilidad/libros", count: 14, color: "cyan" as const },
  { icon: Landmark, name: "Fiscal", desc: "Cumple con el SENIAT sin dolores de cabeza. IVA, ISLR e IGTF se calculan solos", href: "/contabilidad/tributos", count: 12, color: "amber" as const },
  { icon: Users, name: "Nómina & RRHH", desc: "Paga a tu equipo sin errores. Cálculos de IVSS, utilidades y prestaciones al día", href: "/nominas", count: 13, color: "emerald" as const },
  { icon: Megaphone, name: "Marketing & Ventas", desc: "Atrae clientes, gestiona tu CRM y vende más con campañas automatizadas", href: "/marketing", count: 13, color: "violet" as const },
  { icon: Gavel, name: "Legal & Permisología", desc: "Contratos, trámites CONATEL y permisos sin abogados costosos ni vueltas", href: "/generador-documentos", count: 8, color: "rose" as const },
  { icon: Recycle, name: "Sostenibilidad", desc: "Reduce el impacto ambiental de tu empresa y conviértelo en beneficios reales", href: "/sostenibilidad", count: 3, color: "green" as const },
  { icon: Smartphone, name: "Telecomunicaciones", desc: "Líneas 5G, eSIM y control de flota corporativa en un solo panel", href: "/mi-linea", count: 23, color: "indigo" as const },
  { icon: Server, name: "IT & Seguridad", desc: "Protege tu negocio con respaldos automáticos y monitoreo de redes", href: "/dashboard-it", count: 6, color: "slate" as const },
  { icon: ClipboardList, name: "Planificación", desc: "Proyectos, presupuestos y planes de negocio con datos reales, no corazonadas", href: "/analisis-rentabilidad", count: 6, color: "orange" as const },
  { icon: Briefcase, name: "Socios & Directivos", desc: "Controla varias empresas desde un solo tablero. Toma decisiones informadas", href: "/contabilidad/tributos/poderes-representacion", count: 1, color: "teal" as const },
  { icon: Sparkles, name: "IA & Automatización", desc: "Agentes que hacen el trabajo pesado por ti. Sin configuraciones complicadas", href: "/automatizaciones", count: 2, color: "purple" as const },
];

const colors: Record<string, { border: string; hoverBorder: string; icon: string; glow: string }> = {
  blue:    { border: "border-blue-500/15",    hoverBorder: "hover:border-blue-500/30",    icon: "text-blue-400 bg-blue-500/10 border-blue-500/20", glow: "shadow-blue-500/5" },
  cyan:    { border: "border-cyan-500/15",    hoverBorder: "hover:border-cyan-500/30",    icon: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20", glow: "shadow-cyan-500/5" },
  amber:   { border: "border-amber-500/15",   hoverBorder: "hover:border-amber-500/30",   icon: "text-amber-400 bg-amber-500/10 border-amber-500/20", glow: "shadow-amber-500/5" },
  emerald: { border: "border-emerald-500/15", hoverBorder: "hover:border-emerald-500/30", icon: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", glow: "shadow-emerald-500/5" },
  violet:  { border: "border-violet-500/15",  hoverBorder: "hover:border-violet-500/30",  icon: "text-violet-400 bg-violet-500/10 border-violet-500/20", glow: "shadow-violet-500/5" },
  rose:    { border: "border-rose-500/15",    hoverBorder: "hover:border-rose-500/30",    icon: "text-rose-400 bg-rose-500/10 border-rose-500/20", glow: "shadow-rose-500/5" },
  green:   { border: "border-green-500/15",   hoverBorder: "hover:border-green-500/30",   icon: "text-green-400 bg-green-500/10 border-green-500/20", glow: "shadow-green-500/5" },
  indigo:  { border: "border-indigo-500/15",  hoverBorder: "hover:border-indigo-500/30",  icon: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20", glow: "shadow-indigo-500/5" },
  slate:   { border: "border-slate-500/15",   hoverBorder: "hover:border-slate-500/30",   icon: "text-slate-400 bg-slate-500/10 border-slate-500/20", glow: "shadow-slate-500/5" },
  orange:  { border: "border-orange-500/15",  hoverBorder: "hover:border-orange-500/30",  icon: "text-orange-400 bg-orange-500/10 border-orange-500/20", glow: "shadow-orange-500/5" },
  teal:    { border: "border-teal-500/15",    hoverBorder: "hover:border-teal-500/30",    icon: "text-teal-400 bg-teal-500/10 border-teal-500/20", glow: "shadow-teal-500/5" },
  purple:  { border: "border-purple-500/15",  hoverBorder: "hover:border-purple-500/30",  icon: "text-purple-400 bg-purple-500/10 border-purple-500/20", glow: "shadow-purple-500/5" },
};

export const ModulesSection = memo(function ModulesSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-transparent mesh-gradient">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[5%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-kyron-cyan/[0.02] blur-[100px]" />
        <div className="absolute bottom-[5%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-blue-500/[0.02] blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-kyron-cyan/20 bg-kyron-cyan/5 mx-auto backdrop-blur-sm shadow-lg">
            <Sparkles className="h-4 w-4 text-kyron-cyan" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-kyron-cyan/60">MÓDULOS</span>
          </div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-foreground leading-[0.9] tracking-tighter uppercase italic">
            Lo que tu negocio<br/>
            <span className="text-glow-cyan not-italic">necesita, sin vueltas</span>
          </h2>
          <p className="text-lg text-muted-foreground/50 max-w-2xl mx-auto font-medium">
            {modules.length} módulos integrados en un solo ecosistema
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {modules.map((mod, i) => {
            const c = colors[mod.color];
            return (
              <Link key={mod.name} href={mod.href} className="animate-module" style={{ animationDelay: (i * 0.04) + 's', opacity: 0 }}>
                <div className={`group relative overflow-hidden rounded-2xl md:rounded-[2rem] glass-card ${c.border} ${c.hoverBorder} p-4 md:p-6 transition-all duration-500 hover:-translate-y-1.5 h-full`}>
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className={`shrink-0 h-8 md:h-10 w-8 md:w-10 rounded-lg md:rounded-xl border flex items-center justify-center ${c.icon} transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg ${c.glow}`}>
                      <mod.icon className="h-4 md:h-5 w-4 md:w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs md:text-sm font-black text-foreground uppercase tracking-tight">{mod.name}</h3>
                      <p className="text-[10px] md:text-[11px] text-muted-foreground/50 font-medium mt-0.5 leading-snug">{mod.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 md:mt-4 pt-2 md:pt-3 border-t border-border/30 dark:border-white/[0.04]">
                    <span className="text-[9px] md:text-[10px] font-black text-muted-foreground/30 uppercase tracking-widest">{mod.count} submódulos</span>
                    <ArrowRight className="h-3 md:h-3.5 w-3 md:w-3.5 text-muted-foreground/20 group-hover:text-kyron-cyan group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
});
