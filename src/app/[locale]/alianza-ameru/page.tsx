"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Mail, Phone, Globe, Printer } from 'lucide-react';
import { Link } from '@/navigation';

export default function AlianzaAmeruPage() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-zinc-100 text-zinc-900 font-sans selection:bg-cyan-100">
            
            {/* Top Bar - Clean & Mobile Friendly */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 px-4 py-3 flex justify-between items-center print:hidden">
                <Link 
                    href="/brand-kit" 
                    className="flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-cyan-600 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Volver al Brand Kit</span>
                    <span className="sm:hidden">Atrás</span>
                </Link>
                <button 
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-cyan-600 transition-colors shadow-sm"
                >
                    <Printer className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Imprimir / PDF</span>
                </button>
            </div>

            {/* Letter Container */}
            <main className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-xl sm:shadow-2xl rounded-none sm:rounded-xl overflow-hidden border border-zinc-200 print:shadow-none print:border-none"
                >
                    {/* Letter Header */}
                    <div className="p-6 sm:p-12 border-b border-zinc-100 flex flex-col sm:flex-row justify-between items-start gap-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 uppercase">System Kyron</h1>
                            <p className="text-xs sm:text-sm text-cyan-600 font-bold uppercase tracking-widest mt-1">Inteligencia Corporativa</p>
                        </div>
                        <div className="text-left sm:text-right">
                            <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mb-1">Fecha de Emisión</p>
                            <p className="text-sm sm:text-base font-medium text-zinc-600">
                                {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    {/* Recipient & Subject */}
                    <div className="p-6 sm:p-12 space-y-8">
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Destinatario</p>
                            <p className="text-lg font-bold text-zinc-900">Ameru AI Team</p>
                            <p className="text-sm text-zinc-500">Munich, Germany</p>
                            <p className="text-sm text-cyan-600 font-medium">info@ameru.ai</p>
                        </div>

                        <div className="bg-zinc-50 p-4 rounded-lg border-l-4 border-cyan-500">
                            <p className="text-sm font-bold text-zinc-900 uppercase tracking-wide">
                                Asunto: Propuesta de Alianza Estratégica
                            </p>
                        </div>

                        {/* Body Content */}
                        <div className="space-y-6 text-zinc-600 leading-relaxed text-sm sm:text-base font-medium">
                            <p>Estimado equipo de Ameru AI,</p>
                            <p>
                                Me dirijo a ustedes en nombre de <strong className="text-zinc-900">System Kyron</strong>, un ecosistema de inteligencia corporativa con sede en Venezuela, especializado en soluciones SaaS/ERP para la gestión empresarial, asesoría legal y sostenibilidad. Nuestra plataforma integra inteligencia artificial de vanguardia para potenciar a pequeñas y medianas empresas en América Latina.
                            </p>
                            <p>
                                Tras un análisis exhaustivo de la trayectoria y propuesta de valor tecnológica de Ameru AI, estoy convencido de que existe una sinergia significativa entre nuestras organizaciones. System Kyron ha desarrollado un módulo dedicado a la sostenibilidad — <strong className="text-cyan-600">"Sostenibilidad Ameru"</strong> — diseñado para gestionar Eco-Créditos, huella de carbono y analíticas de reciclaje corporativo. Este módulo refleja nuestra visión compartida de aprovechar la tecnología para el impacto ambiental.
                            </p>
                            <p>Por medio de la presente, proponemos formalmente una alianza estratégica bajo los siguientes términos de colaboración:</p>

                            {/* Terms Grid */}
                            <div className="grid gap-4 sm:gap-6">
                                {[
                                    { title: "Integración Tecnológica", desc: "Integrar los datos de los smart bins y la inteligencia de clasificación de residuos de Ameru AI directamente en la plataforma System Kyron." },
                                    { title: "Alianza Comercial", desc: "Co-comercializar nuestra solución integrada a empresas que buscan automatización de sostenibilidad en América Latina." },
                                    { title: "Innovación Conjunta", desc: "Colaborar en iniciativas de I+D enfocadas en gestión de residuos impulsada por IA y modelos de economía circular." },
                                    { title: "Branding Mutuo", desc: "Destacar ambas marcas en comunicaciones conjuntas, white papers y eventos de la industria." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-4 bg-zinc-50 rounded-lg border border-zinc-100">
                                        <span className="h-6 w-6 shrink-0 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold text-xs">{i + 1}</span>
                                        <div>
                                            <h4 className="font-bold text-zinc-900 text-sm mb-1">{item.title}</h4>
                                            <p className="text-xs sm:text-sm text-zinc-500 leading-snug">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p>
                                Creemos que esta alianza no solo acelerará la adopción de gestión inteligente de residuos en la región, sino que también creará una propuesta de valor diferenciada para ambas empresas.
                            </p>
                            <p>
                                Estaría encantado de programar una reunión a la mayor brevedad posible para discutir esta propuesta en mayor detalle y definir los próximos pasos hacia un acuerdo formal.
                            </p>
                            <p>Gracias por considerar esta oportunidad. Quedo a la espera de su favorable respuesta.</p>
                        </div>

                        {/* Signature */}
                        <div className="pt-8 border-t border-zinc-100 mt-8">
                            <p className="text-zinc-900 font-bold mb-6">Atentamente,</p>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 sm:h-16 sm:w-16 bg-zinc-100 rounded-full flex items-center justify-center text-xl sm:text-2xl font-black text-zinc-400 border-2 border-white shadow-sm">
                                    CM
                                </div>
                                <div>
                                    <p className="text-lg sm:text-xl font-black text-zinc-900">Carlos Mattar</p>
                                    <p className="text-xs sm:text-sm text-cyan-600 font-bold uppercase tracking-widest">Chief Executive Officer</p>
                                    <p className="text-xs sm:text-sm text-zinc-500 font-medium">System Kyron</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Contact */}
                        <div className="bg-zinc-50 p-4 sm:p-6 rounded-lg flex flex-wrap gap-4 sm:gap-8 justify-center text-xs sm:text-sm font-medium text-zinc-500 border border-zinc-100">
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
                </motion.div>
            </main>
        </div>
    );
}
