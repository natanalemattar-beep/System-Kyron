import { FC } from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Globe, 
  Briefcase, 
  Layers, 
  ShieldAlert, 
  Network, 
  Database, 
  FileText, 
  Scale
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Solution {
  title: string;
  subtitle: string;
  icon?: React.ElementType;
  logo?: string;
  color?: string;
}

const categories = [
  {
    label: 'INFRAESTRUCTURA',
    color: 'border-cyan-500/20 text-cyan-400',
    items: [
      { title: 'CONECTIVIDAD', subtitle: 'GESTIÓN DE RED 5G', icon: Cpu, color: 'text-cyan-400' },
      { title: 'INFRAESTRUCTURA CLOUD', subtitle: 'ESCALABILIDAD TOTAL', icon: Layers, color: 'text-amber-400' },
      { title: 'GESTIÓN DE REDES', subtitle: 'INFRAESTRUCTURA CRÍTICA', icon: Network, color: 'text-cyan-500' },
      { title: 'BASE DE DATOS', subtitle: 'INTEGRIDAD DE DATOS', icon: Database, color: 'text-blue-500' },
    ],
  },
  {
    label: 'EMPRESA',
    color: 'border-blue-500/20 text-blue-400',
    items: [
      { title: 'GESTIÓN EMPRESARIAL', subtitle: 'OPERACIONES DIGITALES', icon: Briefcase, color: 'text-blue-400' },
      { title: 'INTELIGENCIA DE DATOS', subtitle: 'ANÁLISIS PREDICTIVO', icon: BarChart3, color: 'text-violet-400' },
       { title: 'AUTOMATIZACIÓN', subtitle: 'EFICIENCIA OPERATIVA', logo: '/images/module-logos/mod-ia-new.svg', color: 'text-yellow-400' },
      { title: 'DOCUMENTACIÓN', subtitle: 'GESTIÓN DOCUMENTAL', icon: FileText, color: 'text-emerald-500' },
    ],
  },
  {
    label: 'SEGURIDAD & LEGAL',
    color: 'border-rose-500/20 text-rose-400',
    items: [
       { title: 'ASESORÍA LEGAL', subtitle: 'BLINDAJE JURÍDICO', logo: '/images/module-logos/mod-legal-new.svg', color: 'text-emerald-400' },
       { title: 'SEGURIDAD DIGITAL', subtitle: 'PROTECCIÓN DE ACTIVOS', logo: '/images/module-logos/mod-kyronshield-new.svg', color: 'text-rose-400' },
       { title: 'CONECTIVIDAD GLOBAL', subtitle: 'INTEROPERABILIDAD', icon: Globe, color: 'text-indigo-400' },
       { title: 'CUMPLIMIENTO', subtitle: 'NORMATIVA Y AUDITORÍA', icon: Scale, color: 'text-violet-500' },
    ],
  },
];

const SolutionsPage: FC = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
            Nuestras <span className="kyron-gradient-text">Soluciones</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base font-medium">
            Ecosistema integral de tecnología avanzada diseñado para potenciar la competitividad y la resiliencia de tu organización.
          </p>
        </div>

        <div className="space-y-10">
          {categories.map((cat) => (
            <div key={cat.label}>
              <div className="flex items-center gap-4 mb-5">
                <span className={cn("text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full border", cat.color)}>
                  {cat.label}
                </span>
                <div className="h-px flex-1 bg-white/5" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {cat.items.map((solution, i) => (
                  <div
                    key={i}
                    className="group relative p-4 md:p-5 rounded-2xl bg-card/40 border border-white/5 hover:border-white/20 transition-all duration-300 hover:bg-card/60 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                    <div className="relative">
                       <div className={cn(
                         "h-9 w-9 md:h-10 md:w-10 rounded-xl flex items-center justify-center mb-3 transition-all duration-300",
                         "bg-white/[0.03] border border-white/10 group-hover:scale-110 group-hover:shadow-glow"
                       )}>
                         {solution.logo ? (
                           <img src={solution.logo} alt={solution.title} className="h-full w-full object-cover rounded-xl" />
                         ) : (
                           <solution.icon className={cn("h-4 w-4 md:h-5 md:w-5", solution.color)} />
                         )}
                       </div>
                      
                      <div className="space-y-1">
                        <h3 className="text-xs md:text-sm font-black uppercase tracking-tight text-white">
                          {solution.title}
                        </h3>
                        <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">
                          {solution.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolutionsPage;
