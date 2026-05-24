import {
  User, Calculator, Landmark, Users, Megaphone, Gavel, Recycle,
  Smartphone, Server, ClipboardList, Briefcase, Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from '@/navigation';

const modules = [
  { icon: User, name: "Cuenta Personal", desc: "Identidad, documentos, salud, gestión civil", href: "/perfil", count: 17, color: "blue" as const },
  { icon: Calculator, name: "Contabilidad", desc: "Libros, asientos, estados financieros, cierre", href: "/contabilidad/libros", count: 14, color: "cyan" as const },
  { icon: Landmark, name: "Fiscal", desc: "IVA, ISLR, IGTF, retenciones, municipales", href: "/contabilidad/tributos", count: 12, color: "amber" as const },
  { icon: Users, name: "Nómina & RRHH", desc: "Pago nómina, IVSS, desarrollo, LOPCYMAT", href: "/nominas", count: 13, color: "emerald" as const },
  { icon: Megaphone, name: "Marketing & Ventas", desc: "Campañas, CRM, POS, email, redes", href: "/marketing", count: 13, color: "violet" as const },
  { icon: Gavel, name: "Legal & Permisología", desc: "Contratos, CONATEL, trámites fiscales", href: "/generador-documentos", count: 8, color: "rose" as const },
  { icon: Recycle, name: "Sostenibilidad", desc: "Dashboard ambiental, eco-créditos", href: "/sostenibilidad", count: 3, color: "green" as const },
  { icon: Smartphone, name: "Telecomunicaciones", desc: "Líneas, eSIM, 5G, flota, CONATEL", href: "/mi-linea", count: 23, color: "indigo" as const },
  { icon: Server, name: "IT & Seguridad", desc: "Panel IT, ciberseguridad, backup, redes", href: "/dashboard-it", count: 6, color: "slate" as const },
  { icon: ClipboardList, name: "Planificación", desc: "ISO 9001, factibilidad, proyectos, IA", href: "/analisis-rentabilidad", count: 6, color: "orange" as const },
  { icon: Briefcase, name: "Socios & Directivos", desc: "Empresas holding, supervisión estratégica", href: "/contabilidad/tributos/poderes-representacion", count: 1, color: "teal" as const },
  { icon: Sparkles, name: "IA & Automatización", desc: "Agentes AI, automatizaciones inteligentes", href: "/automatizaciones", count: 2, color: "purple" as const },
];

const colorMap: Record<string, string> = {
  blue:    "border-blue-500/20 hover:border-blue-500/40 text-blue-400 bg-blue-500/10 border-blue-500/20",
  cyan:    "border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  amber:   "border-amber-500/20 hover:border-amber-500/40 text-amber-400 bg-amber-500/10 border-amber-500/20",
  emerald: "border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  violet:  "border-violet-500/20 hover:border-violet-500/40 text-violet-400 bg-violet-500/10 border-violet-500/20",
  rose:    "border-rose-500/20 hover:border-rose-500/40 text-rose-400 bg-rose-500/10 border-rose-500/20",
  green:   "border-green-500/20 hover:border-green-500/40 text-green-400 bg-green-500/10 border-green-500/20",
  indigo:  "border-indigo-500/20 hover:border-indigo-500/40 text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  slate:   "border-slate-500/20 hover:border-slate-500/40 text-slate-400 bg-slate-500/10 border-slate-500/20",
  orange:  "border-orange-500/20 hover:border-orange-500/40 text-orange-400 bg-orange-500/10 border-orange-500/20",
  teal:    "border-teal-500/20 hover:border-teal-500/40 text-teal-400 bg-teal-500/10 border-teal-500/20",
  purple:  "border-purple-500/20 hover:border-purple-500/40 text-purple-400 bg-purple-500/10 border-purple-500/20",
};

export function ModulesSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-cyan-500/[0.03] blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-blue-500/[0.02] blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mx-auto">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-200/60">MÓDULOS</span>
          </div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-gray-900 dark:text-white leading-[0.9] tracking-tighter uppercase italic">
            Todo tu ecosistema<br/>
            <span className="text-glow-cyan not-italic">en un solo lugar</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-white/30 max-w-2xl mx-auto font-medium">
            Más de 100 módulos integrados — fiscal, contable, legal, RRHH, telecom, marketing, IT y más
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {modules.map((mod, i) => (
            <Link key={i} href={mod.href}>
              <div className={"group relative overflow-hidden rounded-[2rem] bg-gray-50 dark:bg-white/[0.02] border p-6 transition-all duration-500 hover:-translate-y-1 h-full " + colorMap[mod.color]}>
                <div className="flex items-start gap-4">
                  <div className={"shrink-0 h-10 w-10 rounded-xl border flex items-center justify-center " + colorMap[mod.color]}>
                    <mod.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">{mod.name}</h3>
                    <p className="text-[11px] text-gray-400 dark:text-white/25 font-medium mt-0.5 leading-snug">{mod.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200 dark:border-white/5">
                  <span className="text-[10px] font-black text-gray-400 dark:text-white/20 uppercase tracking-widest">{mod.count} módulos</span>
                  <ArrowRight className="h-3.5 w-3.5 text-gray-300 dark:text-white/10 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
