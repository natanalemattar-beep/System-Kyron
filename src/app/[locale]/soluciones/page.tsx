import { FC } from 'react';
import { Link } from '@/navigation';
import { 
  Cpu, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Globe, 
  Briefcase, 
  Smartphone, 
  Layers, 
  ShieldAlert, 
  Network, 
  Database, 
  FileText, 
  Scale, 
  FileCheck, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Solution {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  href: string;
  description?: string;
  color?: string;
}

const solutions: Solution[] = [
  {
    title: 'CONECTIVIDAD',
    subtitle: 'GESTIÓN DE RED 5G',
    icon: Cpu,
    href: '/soluciones/conectividad',
    description: 'Optimización y monitoreo de infraestructuras de telecomunicaciones de última generación.',
    color: 'text-cyan-400',
  },
  {
    title: 'ASESORÍA LEGAL',
    subtitle: 'BLINDAJE JURÍDICO',
    icon: ShieldCheck,
    href: '/soluciones/legal',
    description: 'Cumplimiento normativo y gestión de riesgos legales para empresas y emprendedores.',
    color: 'text-emerald-400',
  },
  {
    title: 'INTELIGENCIA DE DATOS',
    subtitle: 'ANÁLISIS PREDICTIVO',
    icon: BarChart3,
    href: '/soluciones/data-intelligence',
    description: 'Transforma tus datos en decisiones estratégicas con nuestro motor analítico.',
    color: 'text-violet-400',
  },
  {
    title: 'GESTIÓN EMPRESARIAL',
    subtitle: 'OPERACIONES DIGITALES',
    icon: Briefcase,
    href: '/soluciones/business-management',
    description: 'Digitalización completa de procesos operativos y administrativos.',
    color: 'text-blue-400',
  },
  {
    title: 'SEGURIDAD DIGITAL',
    subtitle: 'PROTECCIÓN DE ACTIVOS',
    icon: ShieldAlert,
    href: '/soluciones/cybersecurity',
    description: 'Blindaje de infraestructura crítica y protección de datos corporativos.',
    color: 'text-rose-400',
  },
  {
    title: 'INFRAESTRUCTURA CLOUD',
    subtitle: 'ESCALABILIDAD TOTAL',
    icon: Layers,
    href: '/soluciones/cloud-infrastructure',
    description: 'Despliegue y gestión de arquitecturas en la nube de alta disponibilidad.',
    color: 'text-amber-400',
  },
  {
    title: 'CONECTIVIDAD GLOBAL',
    subtitle: 'INTEROPERABILIDAD',
    icon: Globe,
    href: '/soluciones/global-connectivity',
    description: 'Integración de sistemas y redes a nivel internacional.',
    color: 'text-indigo-400',
  },
  {
    title: 'AUTOMATIZACIÓN',
    subtitle: 'EFICIENCIA OPERATIVA',
    icon: Zap,
    href: '/soluciones/automation',
    description: 'Reducción de costos operativos mediante procesos inteligentes.',
    color: 'text-yellow-400',
  },
  {
    title: 'GESTIÓN DE REDES',
    subtitle: 'INFRAESTRUCTURA CRÍTICA',
    icon: Network,
    href: '/soluciones/network-management',
    description: 'Monitoreo y mantenimiento de redes de alta complejidad.',
    color: 'text-cyan-500',
  },
  {
    title: 'BASE DE DATOS',
    subtitle: 'INTEGRIDAD DE DATOS',
    icon: Database,
    href: '/soluciones/database-management',
    description: 'Gestión y protección de grandes volúmenes de información.',
    color: 'text-blue-500',
  },
  {
    title: 'DOCUMENTACIÓN',
    subtitle: 'GESTIÓN DOCUMENTAL',
    icon: FileText,
    href: '/soluciones/document-management',
    description: 'Digitalización y automatización del ciclo de vida documental.',
    color: 'text-emerald-500',
  },
  {
    title: 'CUMPLIMIENTO',
    subtitle: 'NORMATIVA Y AUDITORÍA',
    icon: Scale,
    href: '/soluciones/compliance',
    description: 'Aseguramiento de estándares legales y regulatorios vigentes.',
    color: 'text-violet-500',
  },
];

const SolutionsPage: FC = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
            Nuestras <span className="kyron-gradient-text">Soluciones</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base font-medium">
            Ecosistema integral de tecnología avanzada diseñado para potenciar la competitividad y la resiliencia de tu organización.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {solutions.map((solution, index) => (
            <Link 
              key={index} 
              href={solution.href}
              className="group relative block p-1 rounded-[2rem] transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
              <div className="relative h-full p-8 rounded-[1.9rem] bg-card/50 border border-white/5 backdrop-blur-xl group-hover:border-white/20 transition-all duration-500 flex flex-col h-full">
                <div className={cn(
                  "h-14 w-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-glow",
                  "bg-white/[0.03] border border-white/10"
                )}>
                  <solution.icon className={cn("h-7 w-7", solution.color)} />
                </div>
                
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">
                    {solution.title}
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    {solution.subtitle}
                  </p>
                  {solution.description && (
                    <p className="text-sm text-muted-foreground mt-4 line-clamp-3 leading-relaxed">
                      {solution.description}
                    </p>
                  )}
                </div>

                <div className="mt-8 flex items-center gap-2 text-white/20 group-hover:text-white transition-colors duration-500">
                  <span className="text-[10px] font-black uppercase tracking-widest">Explorar</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolutionsPage;
