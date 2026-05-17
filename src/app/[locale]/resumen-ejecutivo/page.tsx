'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
    FileText, ShieldCheck, FileDown, Leaf, Recycle, Globe, 
    Brain, Banknote, Target, Megaphone, Milestone, Users, 
    Zap, Cpu, Smartphone, Wifi, Printer, Loader2, 
    Signal, BarChart3, Building2, TreePine, Sparkles, Layers,
    CheckCircle2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { LandingHeader } from '@/components/landing/landing-header';
import Image from 'next/image';

type Theme = 'dark' | 'light';

function SectionHeader({ icon: Icon, children, theme }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode; theme: Theme }) {
    const color = theme === 'dark' ? 'text-primary' : 'text-[#0A2472]';
    return (
        <h2 className={`text-xs font-black uppercase tracking-[0.2em] ${color} flex items-center gap-2`}>
            <Icon className="h-4 w-4" /> {children}
        </h2>
    );
}

function SummaryContent({ theme }: { theme: Theme }) {
    const isDark = theme === 'dark';
    const t = (dark: string, light: string) => isDark ? dark : light;

    return (
        <div className={t('', 'text-black')}>
            {/* Header */}
            <div className={`flex items-center gap-5 mb-12 pb-8 border-b ${t('border-border', 'border-gray-300')}`}>
                <div className={`relative ${t('h-14 w-14', 'h-16 w-16')} shrink-0`}>
                    <Image
                        src="/images/logo-kyron-hq.png"
                        alt="System Kyron"
                        fill
                        className="object-contain"
                        unoptimized
                    />
                </div>
                <div className="space-y-2">
                    <span className={`text-xl font-black tracking-tighter uppercase ${t('text-white', 'text-[#0A2472]')}`}>SYSTEM KYRON</span>
                    <div className={`h-0.5 w-full ${t('bg-gradient-to-r from-primary to-transparent', 'bg-[#0A2472]')}`} />
                    <p className={`text-[9px] font-black uppercase tracking-widest ${t('text-muted-foreground', 'text-gray-500')}`}>
                        ESLOGAN: <span className={`font-bold italic ${t('text-white', 'text-black')}`}>&ldquo;EL ECOSISTEMA QUE PROTEGE TU LÍNEA, TU NEGOCIO Y EL AMBIENTE&rdquo;</span>
                    </p>
                    <p className={`text-[9px] font-black uppercase tracking-widest ${t('text-muted-foreground', 'text-gray-500')}`}>
                        EQUIPO: <span className={`font-bold ${t('text-white', 'text-black')}`}>CARLOS MATTAR · SEBASTIÁN GARRIDO · MARCOS SOUSA</span>
                    </p>
                </div>
            </div>

            <div className="space-y-10">
                {/* 1. Información General */}
                <section className="space-y-3">
                    <SectionHeader icon={FileText} theme={theme}>1. INFORMACIÓN GENERAL</SectionHeader>
                    <div className={`pl-4 border-l-2 ${t('border-primary/10', 'border-[#0A2472]/20')} grid md:grid-cols-2 gap-4`}>
                        <div>
                            <p className={`text-[10px] font-black uppercase mb-1 ${t('text-muted-foreground', 'text-gray-500')}`}>Nombre del Proyecto</p>
                            <p className={`text-sm font-bold ${t('text-white', 'text-black')}`}>System Kyron</p>
                            <p className={`text-xs italic ${t('text-white/60', 'text-gray-500')}`}>El ecosistema que protege tu línea, tu negocio y el ambiente.</p>
                        </div>
                        <div>
                            <p className={`text-[10px] font-black uppercase mb-1 ${t('text-muted-foreground', 'text-gray-500')}`}>Equipo</p>
                            <p className={`text-sm font-bold ${t('text-white', 'text-black')}`}>Carlos Mattar · Sebastián Garrido · Marcos Sousa</p>
                            <p className={`text-xs ${t('text-white/60', 'text-gray-500')}`}>Emprendimiento Carlos Mattar · RIF: J-50832149-9</p>
                        </div>
                    </div>
                </section>

                {/* 2. Definición del Problema */}
                <section className="space-y-3">
                    <SectionHeader icon={Globe} theme={theme}>2. DEFINICIÓN DEL PROBLEMA</SectionHeader>
                    <div className={`pl-4 border-l-2 ${t('border-primary/10', 'border-[#0A2472]/20')} space-y-4`}>
                        <p className={`text-sm leading-relaxed ${t('text-white/70', 'text-gray-700')}`}>
                            El emprendedor y la PyME venezolana se enfrentan diariamente a una <strong>&ldquo;Triple Crisis&rdquo; operativa</strong> que frena su desarrollo:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {[
                                { icon: Signal, label: 'Telecomunicaciones', value: '21M+ líneas vulnerables', desc: 'Bloqueos y fraudes constantes.', color: 'rose' },
                                { icon: Recycle, label: 'Sostenibilidad', value: '+50% residuos sin reciclar', desc: 'Falta de incentivos y trazabilidad.', color: 'amber' },
                                { icon: BarChart3, label: 'Carga Administrativa', value: '134 hrs/año perdidas', desc: 'Burocracia y riesgo de multas.', color: 'orange' },
                            ].map((item, i) => (
                                <div key={i} className={`p-4 rounded-xl ${t(`bg-white/5 border border-white/5`, 'bg-gray-50 border border-gray-200')}`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <item.icon className={`h-4 w-4 text-${item.color}-500`} />
                                        <p className={`text-[9px] font-black text-${item.color}-500 uppercase`}>{item.label}</p>
                                    </div>
                                    <p className={`text-xs font-bold ${t('text-white', 'text-black')}`}>{item.value}</p>
                                    <p className={`text-[10px] mt-1 ${t('text-white/40', 'text-gray-400')}`}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. Propuesta de Valor */}
                <section className="space-y-3">
                    <SectionHeader icon={Zap} theme={theme}>3. PROPUESTA DE VALOR (LA SOLUCIÓN)</SectionHeader>
                    <div className={`pl-4 border-l-2 ${t('border-primary/10', 'border-[#0A2472]/20')} space-y-4`}>
                        <p className={`text-sm ${t('text-white/70', 'text-gray-700')}`}>
                            System Kyron es un <strong>ecosistema corporativo integral</strong> que blinda y digitaliza a la PyME mediante <strong>cuatro pilares</strong>:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {[
                                { icon: ShieldCheck, label: 'Seguridad (Kyron Shield)', desc: 'Reposición de equipos, defensa legal y "Modo Reserva" —accede a la App sin saldo ni megas.', color: 'indigo' },
                                { icon: Cpu, label: 'Software (SaaS)', desc: 'Plataforma modular de operación empresarial sin contratos anuales.', color: 'cyan' },
                                { icon: Printer, label: 'Hardware (Fintech Fiscal)', desc: 'Infraestructura de facturación de lujo, 100% homologada por el SENIAT.', color: 'amber' },
                                { icon: Leaf, label: 'Impacto', desc: 'Reciclaje conectado que genera rentabilidad.', color: 'emerald' },
                            ].map((item, i) => (
                                <div key={i} className={`p-4 rounded-xl ${t(`bg-${item.color}-500/5 border border-${item.color}-500/20`, `bg-${item.color}-50 border border-${item.color}-200`)}`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <item.icon className={`h-4 w-4 text-${item.color}-400`} />
                                        <p className={`text-[10px] font-black text-${item.color}-400 uppercase`}>{item.label}</p>
                                    </div>
                                    <p className={`text-[11px] ${t('text-white/60', 'text-gray-600')}`}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. Mercado Objetivo */}
                <section className="space-y-3">
                    <SectionHeader icon={Target} theme={theme}>4. MERCADO OBJETIVO</SectionHeader>
                    <div className={`pl-4 border-l-2 ${t('border-primary/10', 'border-[#0A2472]/20')} space-y-4`}>
                        <div className={`p-5 rounded-xl ${t('bg-white/5 border border-white/10', 'bg-gray-50 border border-gray-200')}`}>
                            <p className={`text-sm leading-relaxed ${t('text-white/70', 'text-gray-700')}`}>
                                Nuestro cliente ideal está representado por el perfil de <strong>&ldquo;José&rdquo;</strong>, dueño de un abasto o comercio local en La Guaira, que necesita vender, cumplir con la ley y proteger su negocio sin complicaciones tecnológicas.
                            </p>
                        </div>
                        <div className={`flex items-center gap-3 p-4 rounded-xl ${t('bg-primary/5 border border-primary/10', 'bg-[#0A2472]/5 border border-[#0A2472]/20')}`}>
                            <Building2 className={`h-5 w-5 shrink-0 ${t('text-primary', 'text-[#0A2472]')}`} />
                            <div>
                                <p className={`text-sm font-bold ${t('text-white', 'text-black')}`}>Tamaño de Mercado</p>
                                <p className={`text-xs ${t('text-white/60', 'text-gray-500')}`}><strong>500,000 PyMEs</strong> existentes en Venezuela.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Modelo de Negocio */}
                <section className="space-y-3">
                    <SectionHeader icon={Banknote} theme={theme}>5. MODELO DE NEGOCIO</SectionHeader>
                    <div className={`pl-4 border-l-2 ${t('border-primary/10', 'border-[#0A2472]/20')} space-y-5`}>
                        <p className={`text-sm ${t('text-white/70', 'text-gray-700')}`}>Generamos ingresos a través de <strong>tres vías escalables</strong>:</p>

                        <div className="space-y-1">
                            <p className={`text-[10px] font-black uppercase flex items-center gap-2 ${t('text-cyan-400', 'text-cyan-700')}`}>
                                <Layers className="h-3 w-3" /> Suscripciones SaaS
                            </p>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { name: 'Microempresa', price: '$19.99/mes', highlight: true },
                                    { name: 'Comercio', price: '$49.99/mes', highlight: false },
                                    { name: 'Corporativo', price: '$99.99/mes', highlight: false },
                                ].map((p, i) => (
                                    <div key={i} className={`p-3 rounded-xl text-center ${t('border border-white/5 bg-white/[0.02]', 'border border-gray-200 bg-gray-50')}`}>
                                        <p className={`text-[9px] font-black uppercase mb-1 ${t('text-white/40', 'text-gray-400')}`}>{p.name}</p>
                                        <p className={`text-sm font-black ${p.highlight ? t('text-primary', 'text-[#0A2472]') : t('text-white', 'text-black')}`}>{p.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className={`text-[10px] font-black uppercase flex items-center gap-2 ${t('text-emerald-400', 'text-emerald-700')}`}>
                                <Wifi className="h-3 w-3" /> Conectividad 5G Global
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { name: 'Personal', price: 'Desde $6.99', desc: 'Prepago · Pospago · eSIM' },
                                    { name: 'Empresarial', price: 'Desde $9.99', desc: 'Prepago · Pospago · eSIM' },
                                ].map((p, i) => (
                                    <div key={i} className={`p-3 rounded-xl ${t('border border-white/5 bg-white/[0.02]', 'border border-gray-200 bg-gray-50')}`}>
                                        <p className={`text-[9px] font-black uppercase mb-1 ${t('text-white/40', 'text-gray-400')}`}>{p.name}</p>
                                        <p className={`text-sm font-black ${t('text-white', 'text-black')}`}>{p.price}</p>
                                        <p className={`text-[9px] ${t('text-white/30', 'text-gray-400')}`}>{p.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className={`text-[10px] font-black uppercase flex items-center gap-2 ${t('text-amber-400', 'text-amber-700')}`}>
                                <Printer className="h-3 w-3" /> Hardware Fiscal Premium
                            </p>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { name: 'Impresora Fiscal', price: '$849' },
                                    { name: 'Caja Auto-Pago', price: '$1,394' },
                                    { name: 'Kit TPV Completo', price: '$2,499' },
                                ].map((p, i) => (
                                    <div key={i} className={`p-3 rounded-xl text-center ${t('border border-white/5 bg-white/[0.02]', 'border border-gray-200 bg-gray-50')}`}>
                                        <p className={`text-[9px] font-black uppercase mb-1 ${t('text-white/40', 'text-gray-400')}`}>{p.name}</p>
                                        <p className={`text-sm font-black ${t('text-white', 'text-black')}`}>{p.price}</p>
                                    </div>
                                ))}
                            </div>
                            <div className={`flex items-center gap-2 p-3 rounded-xl ${t('bg-amber-500/10 border border-amber-500/20', 'bg-amber-50 border border-amber-200')}`}>
                                <Sparkles className={`h-4 w-4 shrink-0 ${t('text-amber-400', 'text-amber-600')}`} />
                                <p className={`text-[10px] ${t('text-white/60', 'text-gray-600')}`}><strong>Kyron Finance:</strong> Financiamiento propio en cuotas para facilitar la adquisición.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. Estrategia de Marketing */}
                <section className="space-y-3">
                    <SectionHeader icon={Megaphone} theme={theme}>6. ESTRATEGIA DE MARKETING Y VENTAS</SectionHeader>
                    <div className={`pl-4 border-l-2 ${t('border-primary/10', 'border-[#0A2472]/20')} space-y-4`}>
                        <p className={`text-sm ${t('text-white/70', 'text-gray-700')}`}>
                            Nuestra captación (B2B) se fundamenta en demostrar el <strong>retorno de inversión</strong> y operar a través de alianzas de clase mundial:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {[
                                { name: 'Coca-Cola FEMSA', desc: 'Canal comercial de reciclaje.' },
                                { name: 'The Factory HKA', desc: 'Manufactura de hardware.' },
                                { name: 'Ameru.AI', desc: 'Tecnología IoT.' },
                            ].map((a, i) => (
                                <div key={i} className={`p-4 rounded-xl ${t('bg-white/5 border border-white/10', 'bg-gray-50 border border-gray-200')}`}>
                                    <p className={`text-[9px] font-black uppercase mb-1 ${t('text-cyan-400', 'text-cyan-700')}`}>{a.name}</p>
                                    <p className={`text-[10px] ${t('text-white/40', 'text-gray-400')}`}>{a.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {[
                                { label: 'Ahorro Fiscal', value: '$8,500', sub: 'anuales por cliente' },
                                { label: 'Tiempo Recuperado', value: '15 hrs', sub: 'mensuales en gestión' },
                                { label: 'ROI Proyectado', value: '187%', sub: 'retorno de inversión' },
                            ].map((m, i) => (
                                <div key={i} className={`p-4 rounded-xl ${t('bg-emerald-500/5 border border-emerald-500/20', 'bg-emerald-50 border border-emerald-200')}`}>
                                    <p className={`text-[9px] font-black uppercase ${t('text-emerald-400', 'text-emerald-700')}`}>{m.label}</p>
                                    <p className={`text-lg font-black ${t('text-white', 'text-black')}`}>{m.value}</p>
                                    <p className={`text-[10px] ${t('text-white/40', 'text-gray-400')}`}>{m.sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 7. Impacto Social o Ambiental */}
                <section className="space-y-3">
                    <SectionHeader icon={TreePine} theme={theme}>7. IMPACTO SOCIAL O AMBIENTAL</SectionHeader>
                    <div className={`pl-4 border-l-2 ${t('border-emerald-500/30', 'border-emerald-300')} p-6 rounded-2xl ${t('bg-emerald-500/5 border border-emerald-500/10', 'bg-emerald-50 border border-emerald-200')} space-y-4`}>
                        <p className={`text-sm leading-relaxed ${t('text-white/70', 'text-gray-700')}`}>
                            En System Kyron, convertimos el reciclaje en activos. A través de nuestra red de <strong>Smart Bins</strong> —nodos equipados con inducción magnética y tecnología IoT— recolectamos con alta precisión plásticos, botellas y metales.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className={`flex items-start gap-3 p-3 rounded-xl ${t('bg-emerald-500/10 border border-emerald-500/20', 'bg-emerald-100/50 border border-emerald-200')}`}>
                                <Recycle className={`h-5 w-5 shrink-0 mt-0.5 ${t('text-emerald-400', 'text-emerald-600')}`} />
                                <div>
                                    <p className={`text-[10px] font-black uppercase ${t('text-emerald-400', 'text-emerald-700')}`}>Eco-créditos</p>
                                    <p className={`text-[11px] ${t('text-white/50', 'text-gray-500')}`}>Al depositar residuos, el usuario recibe créditos canjeables que reducen costos operativos.</p>
                                </div>
                            </div>
                            <div className={`flex items-start gap-3 p-3 rounded-xl ${t('bg-emerald-500/10 border border-emerald-500/20', 'bg-emerald-100/50 border border-emerald-200')}`}>
                                <Leaf className={`h-5 w-5 shrink-0 mt-0.5 ${t('text-emerald-400', 'text-emerald-600')}`} />
                                <div>
                                    <p className={`text-[10px] font-black uppercase ${t('text-emerald-400', 'text-emerald-700')}`}>Huella de Carbono</p>
                                    <p className={`text-[11px] ${t('text-white/50', 'text-gray-500')}`}><strong>1.2 toneladas</strong> de CO₂ reducidas al año por cliente con economía circular.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. Estado Actual y Hoja de Ruta */}
                <section className="space-y-3">
                    <SectionHeader icon={Milestone} theme={theme}>8. ESTADO ACTUAL Y HOJA DE RUTA</SectionHeader>
                    <div className={`pl-4 border-l-2 ${t('border-primary/10', 'border-[#0A2472]/20')} space-y-4`}>
                        <div className={`flex items-center gap-3 p-4 rounded-xl ${t('bg-amber-500/10 border border-amber-500/20', 'bg-amber-50 border border-amber-200')}`}>
                            <Zap className={`h-5 w-5 shrink-0 ${t('text-amber-400', 'text-amber-600')}`} />
                            <p className={`text-sm ${t('text-white/70', 'text-gray-700')}`}>Fase <strong>pre-operativa</strong> — Prototipado y consolidación de alianzas estratégicas.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {[
                                { year: '2026', title: 'Despliegue nacional', sub: 'Venezuela' },
                                { year: '2027', title: 'Expansión regional', sub: 'Colombia y Panamá' },
                                { year: '2028', title: 'Consolidación', sub: 'México y EE. UU.' },
                            ].map((r, i) => (
                                <div key={i} className={`p-4 rounded-xl ${t('bg-white/5 border border-white/10', 'bg-gray-50 border border-gray-200')}`}>
                                    <p className={`text-[9px] font-black uppercase mb-2 ${t('text-primary', 'text-[#0A2472]')}`}>{r.year}</p>
                                    <p className={`text-[11px] font-bold ${t('text-white', 'text-black')}`}>{r.title}</p>
                                    <p className={`text-[10px] ${t('text-white/40', 'text-gray-400')}`}>{r.sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <div className={`pt-8 flex flex-col items-center justify-center text-center space-y-3 border-t ${t('border-white/5', 'border-gray-200')}`}>
                    <div className={`h-px w-48 ${t('bg-border', 'bg-gray-300')}`} />
                    <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${t('text-muted-foreground', 'text-gray-500')}`}>
                        Kyron Shield &bull; Ecosistema de Protección Integral &bull; Reto Inspira 2026
                    </p>
                    <p className={`text-[8px] font-black uppercase tracking-widest ${t('text-white/20', 'text-gray-400')}`}>Emprendimiento Carlos Mattar · RIF: J-50832149-9</p>
                </div>
            </div>
        </div>
    );
}

export default function ResumenEjecutivoPage() {
    const [isExporting, setIsExporting] = useState(false);
    const pdfRef = useRef<HTMLDivElement>(null);

    const handleExportWord = () => {
        const styles = `
            body { font-family: 'Segoe UI', Arial, sans-serif; padding: 48px; color: #0f172a; background: #fff; }
            .kyron-header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #0A2472; padding-bottom: 24px; }
            h1 { color: #0A2472; font-size: 28pt; font-weight: 900; text-transform: uppercase; }
            h2 { color: #0A2472; font-size: 16pt; font-weight: 900; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; margin-top: 40px; }
            h3 { color: #00A86B; font-size: 12pt; font-weight: 800; text-transform: uppercase; }
            p { font-size: 11pt; line-height: 1.7; color: #334155; margin-bottom: 12px; }
            ul { margin-bottom: 20px; padding-left: 24px; }
            li { font-size: 11pt; color: #334155; margin-bottom: 8px; }
            .footer { text-align: center; font-size: 9pt; color: #94a3b8; margin-top: 60px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
        `;
        const el = document.getElementById('reporte-contenido');
        if (!el) return;
        let content = el.innerHTML.replace(/<style[\s\S]*?<\/style>/gi, '');
        const html = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset='utf-8'><title>Resumen Ejecutivo Kyron</title><style>${styles}</style></head>
<body>
    <div class="kyron-header">
        <h1>SYSTEM KYRON</h1>
        <p style="font-size: 12pt; color: #64748b; text-transform: uppercase; letter-spacing: 3px;">Resumen Ejecutivo — Reto Inspira 2026</p>
        <p style="font-size: 10pt; color: #94a3b8;">Equipo: Carlos Mattar · Sebastián Garrido · Marcos Sousa</p>
    </div>
    ${content}
    <div class="footer">
        <p>System Kyron — El ecosistema que protege tu linea, tu negocio y el ambiente</p>
        <p>&copy; 2026 Emprendimiento Carlos Mattar &bull; infosystemkyron@gmail.com</p>
    </div>
</body></html>`;
        const blob = new Blob(["\ufeff", html], { type: 'application/vnd.ms-word' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = 'RESUMEN_EJECUTIVO_KYRON.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    };

    const handleExportPDF = async () => {
        if (isExporting) return;
        setIsExporting(true);

        try {
            const html2canvas = (await import('html2canvas')).default;
            const { jsPDF } = await import('jspdf');

            const element = pdfRef.current;
            if (!element) return;

            const canvas = await html2canvas(element, {
                scale: 3,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                logging: false,
                imageTimeout: 15000,
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'in',
                format: 'letter',
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 0.5;
            const imgWidth = pageWidth - margin * 2;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = margin;

            pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
            heightLeft -= pageHeight - margin * 2;

            while (heightLeft > 0) {
                position = margin - (pageHeight - margin * 2 - heightLeft);
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
                heightLeft -= pageHeight - margin * 2;
            }

            pdf.save('System_Kyron_Resumen_Ejecutivo.pdf');
        } catch (error) {
            console.error('PDF Error:', error);
            alert('Error al generar el PDF. Intenta de nuevo.');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030711]">
            <LandingHeader />
            
            <div className="container mx-auto px-6 py-32 max-w-4xl print:p-0">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6 print:hidden"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-5 w-5 text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Documentación Oficial Reto Inspira 2026</span>
                        </div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
                            Resumen <span className="text-primary italic">Ejecutivo</span>
                        </h1>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 w-full md:w-auto">
                        <Button 
                            variant="outline" 
                            onClick={handleExportPDF} 
                            disabled={isExporting}
                            className="flex-1 md:flex-none rounded-xl border-primary/20 hover:bg-primary/5 h-12 px-6 font-bold uppercase text-[11px] tracking-widest text-white"
                        >
                            {isExporting ? (
                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            ) : (
                                <Printer className="h-5 w-5 mr-2" />
                            )}
                            {isExporting ? 'Generando...' : 'Descargar PDF'}
                        </Button>
                        <Button onClick={handleExportWord} className="flex-1 md:flex-none rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 font-black uppercase text-sm tracking-widest shadow-xl shadow-primary/30">
                            <FileDown className="h-5 w-5 mr-2" /> Exportar Word
                        </Button>
                    </div>
                </motion.div>

                {/* Versión web - dark */}
                <Card id="reporte-contenido" className="p-12 md:p-16 rounded-[3rem] border-white/10 bg-zinc-950 shadow-2xl relative overflow-hidden print:shadow-none print:border-none print:p-0 print:bg-white print:text-black">
                    <style jsx global>{`
                        @media print {
                            body { background: white !important; color: black !important; }
                            .print\\:hidden { display: none !important; }
                            * { border-color: #eee !important; }
                            .text-primary { color: #000 !important; font-weight: bold !important; }
                            .bg-primary { background: #000 !important; }
                            .container { padding: 0 !important; margin: 0 !important; width: 100% !important; max-width: 100% !important; }
                            section { break-inside: avoid; }
                        }
                    `}</style>
                    <SummaryContent theme="dark" />
                    <div className="flex justify-end mt-6 print:hidden">
                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 uppercase font-black text-[10px] py-1 px-3">
                            RIF: J-50832149-9
                        </Badge>
                    </div>
                </Card>

                {/* Versión PDF - white (oculta, solo para captura) */}
                <div ref={pdfRef} className="fixed left-[-9999px] top-0 bg-white" style={{ width: '8.5in', padding: '0.75in' }}>
                    <SummaryContent theme="light" />
                </div>
            </div>
        </div>
    );
}
