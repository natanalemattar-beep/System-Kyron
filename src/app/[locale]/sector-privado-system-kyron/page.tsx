"use client";

import React from 'react';
import { 
    Shield, 
    Zap, 
    Globe, 
    Users, 
    Calculator, 
    Smartphone, 
    Gavel, 
    Building2, 
    Target, 
    TrendingUp, 
    CheckCircle2, 
    ArrowRight,
    Lock,
    Cpu,
    Wifi,
    BarChart3,
    ShoppingCart,
    Recycle,
    BookOpen,
    ScanLine,
    Activity,
    Handshake,
    ShieldCheck
} from 'lucide-react';
import { Logo } from '@/components/ui/logo';

export function FolletoView() {
    const QR_PRINCIPAL = "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://system-kyron.vercel.app&color=03050a&bgcolor=ffffff&margin=4";
    const QR_FEEDBACK = "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://system-kyron.vercel.app/es/feedback&color=03050a&bgcolor=ffffff&margin=4";
    
    return (
        <div id="folleto-content" className="w-full bg-slate-900 p-8 flex flex-col items-center gap-12 overflow-x-auto print:bg-white print:p-0 print:gap-0 font-[family-name:var(--font-outfit)]">

            {/* ═ CARA 1: EXTERIOR (Paneles: Historia, Especificaciones, Portada Dual QR) ═ */}
            <div className="w-[11in] h-[8.5in] bg-[#03050a] text-white shadow-[0_24px_60px_rgba(0,0,0,0.7)] flex shrink-0 overflow-hidden print:shadow-none print:break-after-page relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_70%_-10%,rgba(14,165,233,0.12),transparent)] pointer-events-none" />

                {/* P1: HISTORIA & ADN (Solapa Izquierda) */}
                <div className="w-[3.62in] border-r border-white/5 p-8 flex flex-col relative z-10 bg-[#020409]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-9 w-9 rounded-full bg-amber-500/15 border border-amber-500/40 flex items-center justify-center">
                            <BookOpen className="h-4 w-4 text-amber-400" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-amber-400/80">ADN Soberano</span>
                    </div>
                    <h3 className="text-[22px] font-black text-white leading-tight tracking-tighter mb-5">Ingeniería que<br/><span className="text-amber-500 font-black">Define el Futuro.</span></h3>
                    
                    <div className="space-y-4">
                        <p className="text-[10px] text-slate-300 leading-relaxed text-justify">
                            System Kyron nace de una verdad incómoda: la fragmentación tecnológica mata la eficiencia. Mientras otros ofrecen parches, nosotros construimos un <span className="text-white font-bold uppercase tracking-wider">Ecosistema de Misión Crítica</span> diseñado específicamente para el complejo tejido empresarial venezolano.
                        </p>
                        <p className="text-[10px] text-slate-400 leading-relaxed text-justify">
                            Nuestra arquitectura elimina la fricción entre la contabilidad VEN-NIF, el cumplimiento SENIAT y la conectividad móvil 5G, fusionándolos en una sola inteligencia operativa que protege su patrimonio.
                        </p>
                    </div>

                    <div className="mt-8 space-y-3">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <h5 className="text-[9px] font-black text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Target className="h-3 w-3" /> Compromiso 2026
                            </h5>
                            <p className="text-[9.5px] text-slate-400 leading-relaxed italic">
                                "Establecer el estándar de transparencia fiscal y eficiencia operativa en Venezuela a través de IA autónoma."
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                            <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 text-center">
                                <p className="text-[14px] font-black text-white leading-none mb-1">100%</p>
                                <p className="text-[7px] text-slate-500 uppercase font-black tracking-widest">Alineado SENIAT</p>
                            </div>
                            <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 text-center">
                                <p className="text-[14px] font-black text-white leading-none mb-1">24/7</p>
                                <p className="text-[7px] text-slate-500 uppercase font-black tracking-widest">Soporte Elite</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-6 flex items-center gap-3">
                        <Handshake className="h-6 w-6 text-amber-500 opacity-50" />
                        <p className="text-[7px] text-slate-600 uppercase font-bold leading-tight tracking-[0.2em]">Más que un proveedor,<br/>somos su aliado estratégico.</p>
                    </div>
                </div>

                {/* P2: ESPECIFICACIONES TÉCNICAS & SEGURIDAD (Contraportada) */}
                <div className="w-[3.69in] border-r border-white/5 p-8 flex flex-col relative z-10 bg-[#03050a]">
                    <div className="mb-6">
                        <p className="text-[8px] font-black uppercase tracking-[0.5em] text-cyan-500/60 mb-2">Technical Specifications</p>
                        <h3 className="text-[18px] font-black text-white uppercase tracking-tighter">Infraestructura <span className="text-cyan-400">Blindada</span></h3>
                    </div>

                    <div className="space-y-3 mb-8">
                        {[
                            {i:Lock, t:"Cifrado AES-256 Military Grade", d:"Toda la data financiera y personal es ininteligible para terceros, incluso bajo ataques de fuerza bruta."},
                            {i:Cpu, t:"Triple Motor de IA (Anthropic/OpenAI)", d:"Modelos especializados para fiscalidad, legalidad y análisis de mercado integrados nativamente."},
                            {i:Wifi, t:"Conectividad 5G & eSIM", d:"Única plataforma con aprovisionamiento directo de líneas móviles para flotas corporativas en Venezuela."},
                            {i:ShieldCheck, t:"Auditoría Inmutable Blockchain", d:"Cada registro fiscal se sella criptográficamente para garantizar su validez ante cualquier ente regulador."},
                        ].map((spec,idx)=>(
                            <div key={idx} className="flex gap-4 p-3 bg-white/[0.03] rounded-xl border border-white/10 group hover:border-cyan-500/30 transition-colors">
                                <spec.i className="h-5 w-5 text-cyan-400 shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-[9px] font-black uppercase tracking-widest text-white mb-1">{spec.t}</h4>
                                    <p className="text-[8.5px] text-slate-500 leading-snug">{spec.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-br from-cyan-500/10 to-transparent p-5 rounded-2xl border border-cyan-500/20">
                        <div className="flex items-center gap-3 mb-3">
                            <Activity className="h-4 w-4 text-cyan-400" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-white">SLA de Disponibilidad</span>
                        </div>
                        <div className="flex items-end gap-2">
                            <p className="text-3xl font-black text-cyan-400 leading-none">99.9%</p>
                            <p className="text-[8px] text-slate-500 uppercase font-bold pb-1 tracking-widest">Uptime Garantizado</p>
                        </div>
                    </div>

                    <div className="mt-auto flex flex-col items-center">
                        <Logo className="h-8 w-8 mb-3 opacity-20 filter grayscale" />
                        <p className="text-[8px] text-slate-600 uppercase tracking-[0.4em] font-black">Distrito Capital · Venezuela</p>
                    </div>
                </div>

                {/* P3: PORTADA DUAL QR (Derecha) */}
                <div className="w-[3.69in] p-8 flex flex-col relative z-10 overflow-hidden bg-[#050816]">
                    <div className="absolute top-1/4 -right-24 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[130px] pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-8">
                            <Logo className="h-16 w-16 drop-shadow-[0_0_30px_rgba(34,211,238,0.7)]" />
                            <div className="flex flex-col items-end">
                                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/25 rounded-full text-[7px] font-black uppercase tracking-widest text-cyan-400 mb-1">Misión Crítica</span>
                                <span className="text-[8px] font-black text-slate-500 tracking-widest uppercase">Ver. 2.0.26</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400 mb-4 flex items-center gap-3">
                                <span className="h-px w-10 bg-slate-600 inline-block" /> Sector Privado
                            </p>
                            <h1 className="text-[58px] font-black uppercase tracking-tighter leading-[0.8] mb-6 text-white">System<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Kyron.</span></h1>
                            <p className="text-[12px] text-slate-200 leading-relaxed border-l-4 border-cyan-500 pl-5 font-medium">
                                El estándar de oro en Inteligencia Corporativa y Ecosistema Digital para el mercado venezolano.
                            </p>
                        </div>

                        {/* ACCESO DUAL QR */}
                        <div className="mt-auto bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-6 flex flex-col items-center">
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-5">Centro de Acceso Digital</p>
                            
                            <div className="flex gap-6 w-full justify-center mb-5">
                                {/* QR WEB */}
                                <div className="flex flex-col items-center gap-3">
                                    <div className="bg-white p-2 rounded-2xl shadow-[0_0_40px_rgba(34,211,238,0.2)]">
                                        <img src={QR_PRINCIPAL} alt="Página Principal" width={95} height={95} className="rounded-lg block" />
                                    </div>
                                    <p className="text-[7px] font-black uppercase tracking-widest text-white/60">Portal Web</p>
                                </div>
                                
                                {/* QR ENCUESTA */}
                                <div className="flex flex-col items-center gap-3">
                                    <div className="bg-white p-2 rounded-2xl shadow-[0_0_40px_rgba(244,63,94,0.2)]">
                                        <img src={QR_FEEDBACK} alt="Encuesta Feedback" width={95} height={95} className="rounded-lg block" />
                                    </div>
                                    <p className="text-[7px] font-black uppercase tracking-widest text-white/60">Encuesta Elite</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20">
                                <ScanLine className="h-4 w-4 text-cyan-400 animate-pulse" />
                                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-cyan-400">Escanea para Comenzar</p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-between items-center px-2">
                            <p className="text-[8px] text-slate-500 tracking-widest font-black uppercase">system-kyron.vercel.app</p>
                            <Shield className="h-4 w-4 text-slate-700" />
                        </div>
                    </div>
                </div>
            </div>

            {/* ═ CARA 2: INTERIOR (Paneles: Módulos Expandidos, Kyron Shield, Transformación) ═ */}
            <div className="w-[11in] h-[8.5in] bg-[#03050a] text-white shadow-[0_24px_60px_rgba(0,0,0,0.7)] flex shrink-0 overflow-hidden print:shadow-none relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_-20%,rgba(14,165,233,0.06),transparent)] pointer-events-none" />

                {/* P4: LOS 9 MÓDULOS DE ÉLITE (Izquierda) */}
                <div className="w-[3.69in] border-r border-white/5 p-8 flex flex-col relative z-10 bg-[#020409]/60">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-emerald-400/70 mb-1">Full Ecosystem</p>
                            <h3 className="text-[26px] font-black uppercase tracking-tighter text-white leading-none">Los 9 <span className="text-emerald-400">Módulos</span></h3>
                        </div>
                        <div className="h-10 w-10 rounded-full border border-white/5 flex items-center justify-center">
                            <Zap className="h-5 w-5 text-emerald-400" />
                        </div>
                    </div>

                    <div className="space-y-2 flex-1">
                        {[
                            {I:Calculator, t:"Contabilidad VEN-NIF", d:"Automatización total de libros diarios, mayores e inventarios alineados con normas internacionales."},
                            {I:Users, t:"RRHH & Nómina LOTTT", d:"Cálculos exactos de prestaciones, vacaciones, utilidades y aportes legales en segundos."},
                            {I:ShoppingCart, t:"Facturación & POS", d:"Cumplimiento fiscal SENIAT con validación de IGTF y actualización de tasa BCV en tiempo real."},
                            {I:Gavel, t:"IA Legal & Permisos", d:"Generación inteligente de contratos y monitoreo activo de la Gaceta Oficial y entes reguladores."},
                            {I:Smartphone, t:"Telecom 5G Corp.", d:"Gestión de líneas, eSIMs y planes de datos empresariales integrados directamente en su portal."},
                            {I:Building2, t:"Gestión de Socios", d:"Control de asambleas, actas, repartición de dividendos y gobierno corporativo blindado."},
                            {I:Recycle, t:"Sostenibilidad Eco-IA", d:"Tecnología de clasificación de residuos y generación de Eco-Créditos certificados por Ameru.AI."},
                            {I:ShieldCheck, t:"Centro Tributario", d:"Dashboard preventivo de riesgos fiscales para evitar multas mediante auditoría interna con IA."},
                            {I:BarChart3, t:"Analítica Avanzada", d:"KPIs estratégicos, flujo de caja proyectado y reportes financieros automáticos para toma de decisiones."},
                        ].map(({I,t,d},i)=>(
                            <div key={i} className="flex gap-4 p-3 bg-white/[0.02] rounded-xl border border-white/5 hover:bg-white/[0.05] transition-all group">
                                <div className="h-9 w-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                                    <I className="h-4 w-4 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="font-black text-white uppercase text-[9px] tracking-widest mb-1">{t}</h4>
                                    <p className="text-[8.5px] text-slate-500 leading-snug">{d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* P5: KYRON SHIELD & PROTECCIÓN (Centro) */}
                <div className="w-[3.69in] border-r border-white/5 p-8 flex flex-col relative z-10 bg-[#03050a]">
                    <div className="mb-8">
                        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-blue-400/70 mb-2">Protocolo de Seguridad</p>
                        <h3 className="text-[26px] font-black uppercase tracking-tighter text-white leading-none">Kyron <span className="text-blue-500">Shield</span></h3>
                    </div>

                    <div className="space-y-6 flex-1">
                        <div className="relative p-6 rounded-3xl border border-blue-500/20 bg-blue-500/5 overflow-hidden group">
                            <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform">
                                <Shield className="h-24 w-24 text-blue-400" />
                            </div>
                            <h4 className="font-black text-blue-400 uppercase text-[11px] tracking-widest mb-3">Defensa Fiscal Inmediata</h4>
                            <p className="text-[10px] text-slate-400 leading-relaxed mb-4">
                                En caso de fiscalización del SENIAT o entes regulatorios, nuestro equipo legal y técnico se activa automáticamente para respaldar sus datos.
                            </p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-blue-500/20 rounded-md text-[7px] font-black text-blue-300 tracking-tighter">PERITAJE TÉCNICO</span>
                                <span className="px-2 py-1 bg-blue-500/20 rounded-md text-[7px] font-black text-blue-300 tracking-tighter">SOPORTE LEGAL</span>
                            </div>
                        </div>

                        <div className="p-6 rounded-3xl border border-amber-500/20 bg-amber-500/5">
                            <h4 className="font-black text-amber-400 uppercase text-[11px] tracking-widest mb-3">Hardware Fiscal Express</h4>
                            <p className="text-[10px] text-slate-400 leading-relaxed">
                                Garantía de reposición de equipos críticos (Impresoras fiscales, terminales POS, routers 5G) en menos de 2 horas en la Gran Caracas.
                            </p>
                        </div>

                        <div className="p-6 rounded-3xl border border-indigo-500/20 bg-indigo-500/5">
                            <h4 className="font-black text-indigo-400 uppercase text-[11px] tracking-widest mb-3">Continuidad de Negocio</h4>
                            <p className="text-[10px] text-slate-400 leading-relaxed">
                                Backups redundantes en servidores locales y nube cifrada. Su empresa nunca se detiene, incluso sin internet estable.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 p-6 bg-gradient-to-r from-blue-600/20 to-transparent rounded-3xl border border-blue-500/30 text-center">
                        <p className="text-[11px] text-white font-black uppercase tracking-[0.2em]">"Cero Multas. Cero Preocupaciones."</p>
                    </div>
                </div>

                {/* P6: VISIÓN 2026 & ALIANZA (Derecha) */}
                <div className="w-[3.62in] p-8 flex flex-col relative z-10 bg-[#050816]">
                    <div className="absolute -right-20 -bottom-20 opacity-[0.03] pointer-events-none -rotate-12">
                        <Logo className="w-[450px] h-[450px] text-white" />
                    </div>
                    
                    <div className="mb-10">
                        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-rose-400/70 mb-2">The Future is Now</p>
                        <h3 className="text-[26px] font-black uppercase tracking-tighter text-white leading-none">Misión <span className="text-rose-400">2026</span></h3>
                    </div>

                    <div className="space-y-6 flex-1">
                        <div className="space-y-4">
                            <p className="text-[11px] text-slate-300 leading-relaxed text-justify font-medium">
                                System Kyron no es solo software; es la infraestructura que permitirá a la empresa venezolana competir en el escenario global de la próxima década.
                            </p>
                            <p className="text-[11px] text-slate-400 leading-relaxed text-justify">
                                Para finales de 2026, nuestra red habrá automatizado el 80% de la carga administrativa de nuestros socios, permitiéndoles enfocarse exclusivamente en el crecimiento y la innovación.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 pt-6">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                    <TrendingUp className="h-5 w-5 text-rose-400" />
                                </div>
                                <div>
                                    <h5 className="text-[9px] font-black text-white uppercase tracking-widest">Escalabilidad</h5>
                                    <p className="text-[8px] text-slate-500">Crezca sin límites técnicos.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Globe className="h-5 w-5 text-rose-400" />
                                </div>
                                <div>
                                    <h5 className="text-[9px] font-black text-white uppercase tracking-widest">Presencia Nacional</h5>
                                    <p className="text-[8px] text-slate-500">Soporte en las 24 entidades.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-6 liquid-glass rounded-3xl border border-white/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent" />
                            <p className="relative z-10 text-[10px] text-white font-bold leading-relaxed text-center italic">
                                "Su éxito es nuestra única métrica de rendimiento."
                            </p>
                        </div>
                    </div>

                    <div className="mt-auto flex justify-between items-end pt-8 border-t border-white/5">
                        <Logo className="h-10 w-10 opacity-30" />
                        <div className="text-right">
                            <p className="text-[8px] text-slate-700 font-black uppercase tracking-widest mb-1">System Kyron Elite © 2026</p>
                            <p className="text-[7px] text-slate-800 font-bold tracking-tighter">Security Protocol Activated</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
