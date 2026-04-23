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
    ShieldCheck,
    Coins,
    BarChart4,
    Scale,
    Rocket,
    Download,
    FileText,
    Printer as PrinterIcon,
    Image as ImageIcon
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { toPng } from 'html-to-image';

export function FolletoView() {
    const QR_PRINCIPAL = "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://system-kyron.vercel.app&color=03050a&bgcolor=ffffff&margin=4";
    const QR_FEEDBACK = "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://system-kyron.vercel.app/es/feedback&color=03050a&bgcolor=ffffff&margin=4";
    
    const handleDownloadPDF = () => {
        window.print();
    };

    const handleDownloadPNG = async (id: string, name: string) => {
        const node = document.getElementById(id);
        if (!node) return;

        try {
            // Captura de alta fidelidad (2x pixel ratio)
            const dataUrl = await toPng(node, { 
                quality: 1,
                pixelRatio: 2,
                backgroundColor: '#03050a'
            });
            
            const link = document.createElement('a');
            link.download = `System-Kyron-Folleto-${name}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Error generando PNG:', error);
        }
    };

    const handleDownloadWord = () => {
        // Solo capturar el texto de los paneles, no de la UI
        const panels = document.querySelectorAll('.print\\:break-after-page, .print\\:shadow-none');
        let content = "";
        panels.forEach(p => {
            content += (p as HTMLElement).innerText + "\n\n--- SIGUIENTE PÁGINA ---\n\n";
        });

        const blob = new Blob(['\ufeff', content], {
            type: 'application/msword'
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'System-Kyron-Folleto-Contenido.doc';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div id="folleto-content" className="w-full bg-slate-900 p-8 flex flex-col items-center gap-12 overflow-x-auto print:bg-white print:p-0 print:gap-0 font-[family-name:var(--font-outfit)] relative">
            
            {/* Toolbar Flotante (Oculta en impresión) */}
            <div id="folleto-toolbar" className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex gap-3 bg-black/90 backdrop-blur-3xl px-6 py-4 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] print:hidden transition-opacity duration-300">
                <button 
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 px-5 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 group shadow-lg shadow-cyan-500/20"
                >
                    <PrinterIcon className="h-4 w-4" /> PDF Full
                </button>
                <div className="flex gap-1 bg-white/5 p-1 rounded-2xl border border-white/5">
                    <button 
                        onClick={() => handleDownloadPNG('cara-frontal', 'Frontal')}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-emerald-600/20 text-emerald-400 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all"
                    >
                        <ImageIcon className="h-3.5 w-3.5" /> Cara 1
                    </button>
                    <button 
                        onClick={() => handleDownloadPNG('cara-interior', 'Interior')}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-emerald-600/20 text-emerald-400 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all"
                    >
                        <ImageIcon className="h-3.5 w-3.5" /> Cara 2
                    </button>
                </div>
                <button 
                    onClick={handleDownloadWord}
                    className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all border border-white/5"
                >
                    <FileText className="h-4 w-4" /> Texto
                </button>
            </div>

            {/* ═ CARA 1: EXTERIOR (Paneles: Rentabilidad, Blindaje, Portada Dual) ═ */}
            <div id="cara-frontal" className="w-[11in] h-[8.5in] bg-[#03050a] text-white shadow-[0_24px_60px_rgba(0,0,0,0.7)] flex shrink-0 overflow-hidden print:shadow-none print:break-after-page relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_70%_-10%,rgba(14,165,233,0.12),transparent)] pointer-events-none" />

                {/* P1: PROPÓSITO & RENTABILIDAD (Solapa Izquierda) */}
                <div className="w-[3.62in] border-r border-white/5 p-8 flex flex-col relative z-10 bg-[#020409]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-9 w-9 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center">
                            <Coins className="h-4 w-4 text-emerald-400" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-400/80">Value Proposition</span>
                    </div>
                    <h3 className="text-[22px] font-black text-white leading-tight tracking-tighter mb-5">Eficiencia que se<br/><span className="text-emerald-500">traduce en Capital.</span></h3>
                    
                    <div className="space-y-4">
                        <p className="text-[10px] text-slate-300 leading-relaxed text-justify">
                            En un entorno de alta volatilidad, la **consolidación de costos** es la única ventaja real. System Kyron reemplaza hasta 10 proveedores de software desconectados por un único ecosistema, reduciendo sus costos operativos fijos en hasta un <span className="text-white font-bold">65% desde el primer mes.</span>
                        </p>
                        <p className="text-[10px] text-slate-400 leading-relaxed text-justify">
                            No vendemos software; vendemos **Tiempo de Dirección**. Nuestra IA automatiza la carga administrativa para que sus líderes se enfoquen en la expansión, no en el papeleo.
                        </p>
                    </div>

                    <div className="mt-8 space-y-3">
                        <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/20">
                            <h5 className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <BarChart4 className="h-3 w-3" /> Impacto Económico
                            </h5>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2 text-[9px] text-slate-300">
                                    <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Reducción drástica de multas fiscales.
                                </li>
                                <li className="flex items-center gap-2 text-[9px] text-slate-300">
                                    <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Optimización de nómina y parafiscales.
                                </li>
                                <li className="flex items-center gap-2 text-[9px] text-slate-300">
                                    <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Control total de activos y flotas.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/5">
                         <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center">
                                <TrendingUp className="h-4 w-4 text-emerald-400" />
                            </div>
                            <p className="text-[7px] text-slate-500 uppercase font-black tracking-widest leading-tight">Escalabilidad Horizontal:<br/>Diseñado para Holdings y Grupos.</p>
                         </div>
                    </div>
                </div>

                {/* P2: BLINDAJE & RIESGO CERO (Contraportada) */}
                <div className="w-[3.69in] border-r border-white/5 p-8 flex flex-col relative z-10 bg-[#03050a] overflow-hidden">
                    {/* Grid Background Effect */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                         style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    
                    <div className="mb-6 relative z-10">
                        <p className="text-[8px] font-black uppercase tracking-[0.5em] text-rose-500/60 mb-2">Risk Mitigation</p>
                        <h3 className="text-[18px] font-black text-white uppercase tracking-tighter">Blindaje <span className="text-rose-500">Operativo</span></h3>
                    </div>

                    <div className="space-y-4 mb-6 relative z-10">
                        <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <Scale className="h-4 w-4 text-rose-400" />
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Cumplimiento SENIAT 24/7</h4>
                            </div>
                            <p className="text-[8.5px] text-slate-500 leading-relaxed">
                                Algoritmos entrenados con la Gaceta Oficial vigente aseguran que cada declaración sea perfecta. **Eliminamos el error humano**.
                            </p>
                        </div>

                        <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/10 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <ShieldCheck className="h-4 w-4 text-rose-400" />
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Seguridad de Grado Bancario</h4>
                            </div>
                            <p className="text-[8.5px] text-slate-500 leading-relaxed">
                                Cifrado AES-256 y protocolos de misión crítica. Sus secretos financieros están protegidos bajo estándares globales.
                            </p>
                        </div>
                    </div>

                    {/* NUEVA SECCIÓN PARA RELLENAR ESPACIO (Infraestructura de Misión Crítica) */}
                    <div className="flex-1 flex flex-col justify-center relative z-10 py-4">
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="h-8 w-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                                    <Cpu className="h-4 w-4 text-rose-400/80" />
                                </div>
                                <div>
                                    <h5 className="text-[9px] font-black text-white uppercase tracking-widest mb-1">Núcleo de Procesamiento Híbrido</h5>
                                    <p className="text-[7.5px] text-slate-600 leading-tight">Cómputo distribuido que garantiza 99.99% de uptime incluso sin internet.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="h-8 w-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                                    <Wifi className="h-4 w-4 text-rose-400/80" />
                                </div>
                                <div>
                                    <h5 className="text-[9px] font-black text-white uppercase tracking-widest mb-1">Conectividad Encriptada</h5>
                                    <p className="text-[7.5px] text-slate-600 leading-tight">Canales dedicados punto a punto con rotación de llaves cada 60 segundos.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="h-8 w-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                                    <Activity className="h-4 w-4 text-rose-400/80" />
                                </div>
                                <div>
                                    <h5 className="text-[9px] font-black text-white uppercase tracking-widest mb-1">Monitoreo Proactivo</h5>
                                    <p className="text-[7.5px] text-slate-600 leading-tight">Detección de anomalías en tiempo real antes de que afecten su operación.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 h-px bg-white/10" />
                            <p className="text-[7px] text-slate-600 uppercase font-black tracking-widest">Confianza Corporativa</p>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>
                        <div className="grid grid-cols-3 gap-4 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                             <div className="text-center"><Shield className="h-6 w-6 mx-auto mb-1 text-white" /><p className="text-[6px] font-bold tracking-tighter">PROTECTED</p></div>
                             <div className="text-center"><Lock className="h-6 w-6 mx-auto mb-1 text-white" /><p className="text-[6px] font-bold tracking-tighter">ENCRYPTED</p></div>
                             <div className="text-center"><CheckCircle2 className="h-6 w-6 mx-auto mb-1 text-white" /><p className="text-[6px] font-bold tracking-tighter">VERIFIED</p></div>
                        </div>
                    </div>
                </div>

                {/* P3: PORTADA DE IMPACTO (Derecha) */}
                <div className="w-[3.69in] p-8 flex flex-col relative z-10 overflow-hidden bg-[#050816]">
                    <div className="absolute top-1/4 -right-24 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[130px] pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-8">
                            <Logo className="h-16 w-16 drop-shadow-[0_0_30px_rgba(34,211,238,0.7)]" />
                            <div className="flex flex-col items-end">
                                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/25 rounded-full text-[7px] font-black uppercase tracking-widest text-cyan-400 mb-1">Inversión Segura</span>
                                <span className="text-[8px] font-black text-slate-500 tracking-widest uppercase">Ecosistema 2.0</span>
                            </div>
                        </div>

                        <div className="mb-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400 mb-4 flex items-center gap-3">
                                <span className="h-px w-10 bg-slate-600 inline-block" /> Sector Privado
                            </p>
                            <h1 className="text-[58px] font-black uppercase tracking-tighter leading-[0.8] mb-6 text-white">Kyron<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500">Shield.</span></h1>
                            <p className="text-[12px] text-slate-200 leading-relaxed border-l-4 border-cyan-500 pl-5 font-medium">
                                Protegiendo y potenciando el capital de las empresas líderes en Venezuela.
                            </p>
                        </div>

                        {/* CALL TO ACTION DUAL QR REDISEÑADO */}
                        <div className="mt-auto bg-white/5 backdrop-blur-2xl rounded-[3.5rem] border border-white/10 p-8 flex flex-col items-center shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
                            <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white/30 mb-7">CENTRO DE GESTIÓN DIGITAL</p>
                            
                            <div className="flex gap-10 w-full justify-center mb-7">
                                <div className="flex flex-col items-center gap-3 group">
                                    <div className="relative p-1 bg-white rounded-[2rem] shadow-[0_0_40px_rgba(34,211,238,0.2)] group-hover:scale-105 transition-all duration-500 overflow-hidden">
                                        <div className="absolute inset-0 border-[3px] border-cyan-500/20 rounded-[2rem] animate-pulse" />
                                        <img src={QR_PRINCIPAL} alt="Portal" width={95} height={95} className="rounded-[1.8rem] relative z-10" />
                                    </div>
                                    <p className="text-[7px] font-black uppercase tracking-widest text-cyan-400 group-hover:text-cyan-300 transition-colors">Portal Web</p>
                                </div>
                                
                                <div className="flex flex-col items-center gap-3 group">
                                    <div className="relative p-1 bg-white rounded-[2rem] shadow-[0_0_40px_rgba(16,185,129,0.2)] group-hover:scale-105 transition-all duration-500 overflow-hidden">
                                        <div className="absolute inset-0 border-[3px] border-emerald-500/20 rounded-[2rem] animate-pulse" />
                                        <img src={QR_FEEDBACK} alt="Encuesta" width={95} height={95} className="rounded-[1.8rem] relative z-10" />
                                    </div>
                                    <p className="text-[7px] font-black uppercase tracking-widest text-emerald-400 group-hover:text-emerald-300 transition-colors">Encuesta Elite</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-white/5 px-6 py-2.5 rounded-full border border-white/10 group hover:border-cyan-500/30 transition-colors">
                                <ScanLine className="h-4 w-4 text-cyan-400/50 group-hover:text-cyan-400 transition-colors animate-pulse" />
                                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/80 group-hover:text-white">Escanea para auditar</p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-between items-center px-4">
                            <p className="text-[8px] text-slate-600 tracking-widest font-black uppercase">system-kyron.vercel.app</p>
                            <div className="flex gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/40" />
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/20" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═ CARA 2: INTERIOR (Paneles: Unidades de Negocio, Garantía, Escalabilidad) ═ */}
            <div id="cara-interior" className="w-[11in] h-[8.5in] bg-[#03050a] text-white shadow-[0_24px_60px_rgba(0,0,0,0.7)] flex shrink-0 overflow-hidden print:shadow-none relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_-20%,rgba(16,185,129,0.06),transparent)] pointer-events-none" />

                {/* P4: UNIDADES DE VALOR (Izquierda) */}
                <div className="w-[3.69in] border-r border-white/5 p-8 flex flex-col relative z-10 bg-[#020409]/60">
                    <div className="mb-8">
                        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-emerald-400/70 mb-2">Operational Assets</p>
                        <h3 className="text-[26px] font-black uppercase tracking-tighter text-white leading-none">Unidades de <span className="text-emerald-400">Control</span></h3>
                    </div>

                    <div className="space-y-3 flex-1">
                        {[
                            {I:Calculator, t:"Finanzas VEN-NIF", d:"Control de libros y declaraciones tributarias sin intervención humana."},
                            {I:Users, t:"Capital Humano", d:"Gestión integral de nómina LOTTT y bienestar organizacional."},
                            {I:ShoppingCart, t:"Facturación SENIAT", d:"Emisión masiva con validación fiscal IGTF y tasa BCV dinámica."},
                            {I:Gavel, t:"Unidad Legal IA", d:"Blindaje contractual y monitoreo regulatorio automatizado."},
                            {I:Smartphone, t:"Telecom 5G Corp.", d:"Gestión de infraestructura móvil y eSIMs como activo empresarial."},
                            {I:Building2, t:"Gobierno Corporativo", d:"Gestión de accionistas, actas y repartición de dividendos."},
                            {I:Recycle, t:"Responsabilidad Social", d:"Generación de valor ambiental certificado (Eco-Créditos)."},
                            {I:ShieldCheck, t:"Compliance Preventivo", d:"Auditoría interna constante para asegurar el riesgo cero."},
                            {I:BarChart3, t:"Inteligencia de Datos", d:"KPIs en tiempo real para decisiones de alta gerencia."},
                        ].map(({I,t,d},i)=>(
                            <div key={i} className="flex gap-4 p-3 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-all group">
                                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
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

                {/* P5: GARANTÍA DE CONTINUIDAD (Centro) */}
                <div className="w-[3.69in] border-r border-white/5 p-8 flex flex-col relative z-10 bg-[#03050a]">
                    <div className="mb-8">
                        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-blue-400/70 mb-2">Business Continuity</p>
                        <h3 className="text-[26px] font-black uppercase tracking-tighter text-white leading-none">Garantía <span className="text-blue-500">Kyron</span></h3>
                    </div>

                    <div className="space-y-6 flex-1">
                        <div className="p-7 rounded-[2rem] border border-blue-500/20 bg-blue-500/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
                                <Zap className="h-16 w-16 text-blue-400" />
                            </div>
                            <h4 className="font-black text-blue-400 uppercase text-[11px] tracking-widest mb-3">Infraestructura 24/7</h4>
                            <p className="text-[10px] text-slate-400 leading-relaxed">
                                Garantizamos la continuidad operativa de su empresa. Si su hardware fiscal o telecom falla, lo reponemos en **tiempo récord** para evitar pérdidas de facturación.
                            </p>
                        </div>

                        <div className="p-7 rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5">
                            <h4 className="font-black text-emerald-400 uppercase text-[11px] tracking-widest mb-3">Soporte Estratégico</h4>
                            <p className="text-[10px] text-slate-400 leading-relaxed">
                                Acceso directo a ingenieros y consultores legales. No somos un Call Center; somos su **departamento técnico externo**.
                            </p>
                        </div>

                        <div className="p-7 rounded-[2rem] border border-white/10 bg-white/5">
                            <h4 className="font-black text-white uppercase text-[11px] tracking-widest mb-3">Redundancia de Datos</h4>
                            <p className="text-[10px] text-slate-400 leading-relaxed">
                                Sincronización híbrida (Local/Nube). Su empresa opera con o sin conexión, con respaldo total ininterrumpido.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 p-6 bg-gradient-to-r from-blue-600/20 to-transparent rounded-[2rem] border border-blue-500/30">
                        <p className="text-[11px] text-white font-black uppercase tracking-[0.2em] text-center italic">"Seguridad que se siente en el balance general."</p>
                    </div>
                </div>

                {/* P6: VISIÓN & ESCALABILIDAD 2026 (Derecha) */}
                <div className="w-[3.62in] p-8 flex flex-col relative z-10 bg-[#050816]">
                    <div className="absolute -right-20 -bottom-20 opacity-[0.03] pointer-events-none">
                        <Logo className="w-[450px] h-[450px] text-white" />
                    </div>
                    
                    <div className="mb-10">
                        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-cyan-400/70 mb-2">Strategic Roadmap</p>
                        <h3 className="text-[26px] font-black uppercase tracking-tighter text-white leading-none">Expansión <span className="text-cyan-400">2026</span></h3>
                    </div>

                    <div className="space-y-6 flex-1">
                        <div className="space-y-4">
                            <p className="text-[11px] text-slate-300 leading-relaxed text-justify font-medium">
                                System Kyron está diseñado para escalar. Desde una Pyme hasta un Holding multinacional, nuestro ecosistema se adapta sin necesidad de reinvertir en infraestructura básica.
                            </p>
                            <p className="text-[11px] text-slate-400 leading-relaxed text-justify">
                                Para 2026, seremos la red de gestión más grande de la región, conectando empresas, talento y entes gubernamentales en un solo flujo digital eficiente.
                            </p>
                        </div>

                        <div className="pt-8 grid grid-cols-1 gap-6">
                            <div className="flex items-center gap-5">
                                <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                                    <Rocket className="h-6 w-6 text-cyan-400" />
                                </div>
                                <div>
                                    <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Inversión Tecnológica</h5>
                                    <p className="text-[8px] text-slate-500 uppercase font-bold tracking-tighter">I+D Constante en IA Soberana</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                                    <Shield className="h-6 w-6 text-cyan-400" />
                                </div>
                                <div>
                                    <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Protección de Activos</h5>
                                    <p className="text-[8px] text-slate-500 uppercase font-bold tracking-tighter">Vigilancia Regulatoria 24/7</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto p-6 bg-cyan-500/10 rounded-[2rem] border border-cyan-500/30 text-center">
                            <p className="text-[10px] text-white font-black uppercase tracking-widest leading-relaxed">
                                Forme parte de la élite corporativa de Venezuela.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between items-end pt-8 border-t border-white/5">
                        <Logo className="h-12 w-12 opacity-30" />
                        <div className="text-right">
                            <p className="text-[8px] text-slate-700 font-black uppercase tracking-[0.3em] mb-1">System Kyron Elite</p>
                            <p className="text-[7px] text-slate-800 font-bold">Secure Infrastructure System</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default FolletoView;
