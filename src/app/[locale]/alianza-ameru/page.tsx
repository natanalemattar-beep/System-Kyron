"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Mail, Phone, Globe } from 'lucide-react';
import { Link } from '@/navigation';
import { ResourceHeader } from '@/components/brand/ResourceHeader';

export default function AlianzaAmeruPage() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white font-[family-name:var(--font-outfit)]">
            <ResourceHeader />
            
            <main className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-24">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link 
                        href="/brand-kit" 
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all text-sm font-bold"
                    >
                        <ArrowLeft className="h-4 w-4 text-cyan-400" />
                        Volver al Brand Kit
                    </Link>
                </motion.div>

                {/* Letter Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative"
                >
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl rounded-[2rem]" />
                    
                    <div className="relative bg-white text-zinc-900 rounded-[1.5rem] overflow-hidden shadow-2xl print:shadow-none print:rounded-none">
                        {/* Header Bar */}
                        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 flex justify-between items-center print:hidden">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <Mail className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-white font-black text-lg tracking-tight">Carta de Alianza Estratégica</h2>
                                    <p className="text-cyan-100 text-xs font-bold uppercase tracking-widest">System Kyron → Ameru AI</p>
                                </div>
                            </div>
                            <button 
                                onClick={handlePrint}
                                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white text-xs font-black uppercase tracking-widest transition-all"
                            >
                                <Download className="h-4 w-4" />
                                Imprimir / PDF
                            </button>
                        </div>

                        {/* Letter Content */}
                        <div className="p-12 lg:p-16 space-y-8">
                            {/* Logo Placeholder */}
                            <div className="flex justify-between items-start border-b-2 border-zinc-100 pb-8">
                                <div>
                                    <h1 className="text-3xl font-black tracking-tighter text-zinc-900">SYSTEM KYRON</h1>
                                    <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest mt-1">Ecosistema de Inteligencia Corporativa</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-zinc-400 font-bold">Fecha: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>

                            {/* Recipient */}
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Destinatario:</p>
                                <p className="text-lg font-black text-zinc-900">Ameru AI Team</p>
                                <p className="text-sm text-zinc-600">Munich, Germany</p>
                                <p className="text-sm text-cyan-600 font-bold">info@ameru.ai</p>
                            </div>

                            {/* Subject */}
                            <div className="bg-zinc-50 p-4 rounded-xl border-l-4 border-cyan-500">
                                <p className="text-sm font-black text-zinc-900 uppercase tracking-widest">
                                    Asunto: Propuesta Formal de Alianza Estratégica entre System Kyron y Ameru AI
                                </p>
                            </div>

                            {/* Body */}
                            <div className="space-y-6 text-zinc-700 leading-relaxed font-medium">
                                <p>
                                    Estimado equipo de Ameru AI,
                                </p>
                                <p>
                                    Me dirijo a ustedes en nombre de <strong className="text-zinc-900">System Kyron</strong>, un ecosistema de inteligencia corporativa con sede en Venezuela, especializado en soluciones SaaS/ERP para la gestión empresarial, asesoría legal y sostenibilidad. Nuestra plataforma integra inteligencia artificial de vanguardia para potenciar a pequeñas y medianas empresas en América Latina.
                                </p>
                                <p>
                                    Tras un análisis exhaustivo de la trayectoria y propuesta de valor tecnológica de Ameru AI, estoy convencido de que existe una sinergia significativa entre nuestras organizaciones. System Kyron ha desarrollado un módulo dedicado a la sostenibilidad — <strong className="text-cyan-600">"Sostenibilidad Ameru"</strong> — diseñado para gestionar Eco-Créditos, huella de carbono y analíticas de reciclaje corporativo. Este módulo refleja nuestra visión compartida de aprovechar la tecnología para el impacto ambiental.
                                </p>
                                <p>
                                    Por medio de la presente, proponemos formalmente una alianza estratégica bajo los siguientes términos de colaboración:
                                </p>

                                {/* Terms */}
                                <div className="grid gap-4">
                                    <div className="flex gap-4 p-4 bg-zinc-50 rounded-xl">
                                        <span className="h-8 w-8 shrink-0 bg-cyan-100 text-cyan-600 rounded-lg flex items-center justify-center font-black text-sm">1</span>
                                        <div>
                                            <h4 className="font-black text-zinc-900 uppercase tracking-widest text-sm mb-1">Integración Tecnológica</h4>
                                            <p className="text-sm">Integrar los datos de los smart bins y la inteligencia de clasificación de residuos de Ameru AI directamente en la plataforma System Kyron, permitiendo a nuestros clientes corporativos rastrear métricas de reciclaje y cumplimiento ambiental en tiempo real.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 p-4 bg-zinc-50 rounded-xl">
                                        <span className="h-8 w-8 shrink-0 bg-cyan-100 text-cyan-600 rounded-lg flex items-center justify-center font-black text-sm">2</span>
                                        <div>
                                            <h4 className="font-black text-zinc-900 uppercase tracking-widest text-sm mb-1">Alianza Comercial</h4>
                                            <p className="text-sm">Co-comercializar nuestra solución integrada a empresas que buscan automatización de sostenibilidad en América Latina, combinando la red B2B de System Kyron con las capacidades de hardware e IA de Ameru AI.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 p-4 bg-zinc-50 rounded-xl">
                                        <span className="h-8 w-8 shrink-0 bg-cyan-100 text-cyan-600 rounded-lg flex items-center justify-center font-black text-sm">3</span>
                                        <div>
                                            <h4 className="font-black text-zinc-900 uppercase tracking-widest text-sm mb-1">Innovación Conjunta</h4>
                                            <p className="text-sm">Colaborar en iniciativas de I+D enfocadas en gestión de residuos impulsada por IA, modelos de economía circular y sistemas de puntuación de sostenibilidad corporativa adaptados a mercados emergentes.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 p-4 bg-zinc-50 rounded-xl">
                                        <span className="h-8 w-8 shrink-0 bg-cyan-100 text-cyan-600 rounded-lg flex items-center justify-center font-black text-sm">4</span>
                                        <div>
                                            <h4 className="font-black text-zinc-900 uppercase tracking-widest text-sm mb-1">Branding Mutuo</h4>
                                            <p className="text-sm">Destacar ambas marcas en comunicaciones conjuntas, white papers, webinars y eventos de la industria, fortaleciendo nuestro posicionamiento colectivo como líderes en sostenibilidad corporativa impulsada por IA.</p>
                                        </div>
                                    </div>
                                </div>

                                <p>
                                    Creemos que esta alianza no solo acelerará la adopción de gestión inteligente de residuos en la región, sino que también creará una propuesta de valor diferenciada para ambas empresas.
                                </p>
                                <p>
                                    Estaría encantado de programar una reunión a su earliest convenience para discutir esta propuesta en mayor detalle y definir los próximos pasos hacia un acuerdo formal.
                                </p>
                                <p>
                                    Gracias por considerar esta oportunidad. Quedo a la espera de su favorable respuesta.
                                </p>
                            </div>

                            {/* Signature */}
                            <div className="pt-8 border-t border-zinc-200">
                                <p className="text-zinc-900 font-bold mb-1">Atentamente,</p>
                                <div className="flex items-center gap-4 mt-6">
                                    <div className="h-16 w-16 bg-zinc-100 rounded-full flex items-center justify-center text-2xl font-black text-zinc-400">
                                        CM
                                    </div>
                                    <div>
                                        <p className="text-xl font-black text-zinc-900">Carlos Mattar</p>
                                        <p className="text-sm text-cyan-600 font-bold uppercase tracking-widest">Chief Executive Officer</p>
                                        <p className="text-sm text-zinc-500 font-bold">System Kyron</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-zinc-50 p-6 rounded-xl flex flex-wrap gap-6 justify-center text-sm font-bold text-zinc-600">
                                <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-cyan-500" />
                                    systemkyron.com
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-cyan-500" />
                                    carlos.mattar@systemkyron.com
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-cyan-500" />
                                    +58 424-184-6016
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
