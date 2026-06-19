import { FC } from 'react';
import { 
  Cpu, ShieldCheck, Zap, BarChart3, Globe, Briefcase, 
  Layers, ShieldAlert, Network, Database, FileText, Scale,
  ArrowRight, Sparkles, Lock, Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModuleLogo } from '@/components/module-logo';
import { motion } from 'framer-motion';

interface Solution {
  title: string;
  subtitle: string;
  description: string;
  icon?: React.ElementType;
  logo?: string;
  color: string;
  accent: string;
}

const categories = [
  {
    label: 'INFRAESTRUCTURA CRÍTICA',
    description: 'Soporte tecnológico de grado industrial para la continuidad del negocio.',
    color: 'text-cyan-400',
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/5',
    items: [
      { title: 'CONECTIVIDAD ESTRATÉGICA', subtitle: 'Gestión de Red 5G y Fibra', description: 'Infraestructura de comunicaciones de baja latencia para despliegue corporativo masivo.', icon: Cpu, color: 'text-cyan-400', accent: 'from-cyan-500/20 to-transparent' },
      { title: 'NUBE SOBERANA', subtitle: 'Escalabilidad Total', description: 'Almacenamiento y procesamiento en la nube con redundancia geográfica y seguridad cifrada.', icon: Layers, color: 'text-amber-400', accent: 'from-amber-500/20 to-transparent' },
      { title: 'SISTEMAS DE REDES', subtitle: 'Infraestructura Crítica', description: 'Diseño y optimización de redes locales y remotas para máxima disponibilidad.', icon: Network, color: 'text-cyan-500', accent: 'from-cyan-500/20 to-transparent' },
      { title: 'INTEGRIDAD DE DATOS', subtitle: 'Bases de Datos Avanzadas', description: 'Sistemas de almacenamiento estructurado con optimización de consultas y respaldo automático.', icon: Database, color: 'text-blue-500', accent: 'from-blue-500/20 to-transparent' },
    ],
  },
  {
    label: 'ORQUESTACIÓN EMPRESARIAL',
    description: 'Herramientas de alta precisión para la gestión administrativa y financiera.',
    color: 'text-blue-400',
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/5',
    items: [
      { title: 'GESTIÓN CORPORATIVA', subtitle: 'Operaciones Digitales', description: 'Unificación de procesos administrativos en un solo flujo de trabajo inteligente y automatizado.', icon: Briefcase, color: 'text-blue-400', accent: 'from-blue-500/20 to-transparent' },
      { title: 'INTELIGENCIA DE DATOS', subtitle: 'Análisis Predictivo', description: 'Transformamos datos brutos en decisiones estratégicas mediante modelos de IA y Big Data.', icon: BarChart3, color: 'text-violet-400', accent: 'from-violet-500/20 to-transparent' },
      { title: 'AUTOMATIZACIÓN IA', subtitle: 'Eficiencia Operativa', description: 'Sustitución de tareas repetitivas por flujos lógicos de IA para maximizar la productividad.', logo: '/images/module-logos/mod-ia-new.svg', color: 'text-yellow-400', accent: 'from-yellow-500/20 to-transparent' },
      { title: 'GESTIÓN DOCUMENTAL', subtitle: 'Archivo Digital Inteligente', description: 'Digitalización y organización de documentos con búsqueda semántica y control de versiones.', icon: FileText, color: 'text-emerald-500', accent: 'from-emerald-500/20 to-transparent' },
    ],
  },
  {
    label: 'BLINDAJE LEGAL & SEGURIDAD',
    description: 'Protección jurídica y digital contra riesgos normativos y ciberataques.',
    color: 'text-rose-400',
    border: 'border-rose-500/20',
    bg: 'bg-rose-500/5',
    items: [
      { title: 'SOPORTE JURÍDICO', subtitle: 'Blindaje Normativo', description: 'Asesoría legal especializada en derecho mercantil, laboral y tributario venezolano.', logo: '/images/module-logos/mod-legal-new.svg', color: 'text-emerald-400', accent: 'from-emerald-500/20 to-transparent' },
      { title: 'KYRON SHIELD', subtitle: 'Protección de Activos', description: 'Capa de seguridad avanzada para la protección de datos críticos y prevención de intrusiones.', logo: '/images/module-logos/mod-kyronshield-new.svg', color: 'text-rose-400', accent: 'from-rose-500/20 to-transparent' },
      { title: 'CONECTIVIDAD GLOBAL', subtitle: 'Interoperabilidad Total', description: 'Sistemas de enlace internacional para empresas con operaciones en múltiples jurisdicciones.', icon: Globe, color: 'text-indigo-400', accent: 'from-indigo-500/20 to-transparent' },
      { title: 'AUDITORÍA Y CUMPLIMIENTO', subtitle: 'Rigor Normativo', description: 'Verificación exhaustiva de procesos para asegurar la conformidad con entes reguladores.', icon: Scale, color: 'text-violet-500', accent: 'from-violet-500/20 to-transparent' },
    ],
  },
];

const SolutionsPage: FC = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 md:px-8 selection:bg-primary/30">
      <div className="max-w-7xl mx-auto">
        
        {/* HERO SECTION */}
        <div className="text-center mb-20 space-y-6 relative">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4"
          >
            <Sparkles className="h-3 w-3" /> Ecosistema de Vanguardia
          </motion.div>
          
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.9]">
            Nuestras <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-accent">Soluciones</span>
          </h1>
          
          <p className="text-muted-foreground max-w-3xl mx-auto text-base md:text-lg font-medium leading-relaxed">
            No ofrecemos herramientas, entregamos <span className="text-foreground font-bold">ventaja competitiva</span>. 
            Un ecosistema integral diseñado para orquestar la complejidad y transformarla en eficiencia pura.
          </p>
        </div>

        <div className="space-y-24">
          {categories.map((cat, catIdx) => (
            <div key={cat.label} className="relative group">
              {/* Category Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className={cn("h-2 w-8 rounded-full", cat.bg.replace('/5', '/50'))} />
                    <span className={cn("text-xs font-black uppercase tracking-[0.4em]", cat.color)}>{cat.label}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
                    {cat.label.split(' ')[0]} <span className="text-muted-foreground/40">{cat.label.split(' ').slice(1).join(' ')}</span>
                  </h2>
                  <p className="text-muted-foreground max-w-xl text-sm font-medium">{cat.description}</p>
                </div>
                <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/10 mx-8 mb-4" />
              </div>

              {/* Grid of solutions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cat.items.map((solution, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative p-6 rounded-3xl bg-card/30 border border-white/5 hover:border-primary/30 transition-all duration-500 backdrop-blur-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                    
                    <div className="relative z-10">
                      <div className="h-16 w-16 mb-6 relative">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        {solution.logo ? (
                          <ModuleLogo src={solution.logo} alt={solution.title} size="md" className="relative z-10" />
                        ) : (
                          <div className={cn("h-full w-full rounded-2xl flex items-center justify-center border border-white/10 bg-white/[0.03] group-hover:border-primary/40 transition-colors duration-500", cat.bg)}>
                            <solution.icon className={cn("h-7 w-7 transition-transform duration-500 group-hover:scale-110", solution.color)} />
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-300">
                            {solution.title}
                          </h3>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">{solution.subtitle}</p>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                          {solution.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA Section */}
        <div className="mt-32 p-12 rounded-[3rem] bg-gradient-to-br from-blue-600/20 via-indigo-600/10 to-transparent border border-primary/20 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
              ¿Listo para el <span className="text-primary">Siguiente Nivel</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-sm md:text-base">
              Únete a la élite corporativa que ya utiliza la infraestructura de System Kyron para dominar su mercado.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 transition-all">
                Agendar Demo Estratégica <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 rounded-2xl font-black uppercase tracking-widest border-primary/20 hover:bg-primary/10 transition-all">
                Ver Planes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsPage;
