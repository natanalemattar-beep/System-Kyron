"use client";

import { PricingSection } from '@/components/landing/pricing-section';
import { LandingHeader } from '@/components/landing/landing-header';
import { Footer } from '@/components/landing/footer';
import { motion } from 'framer-motion';
import { ArrowLeft, Rocket } from 'lucide-react';
import { Link } from '@/navigation';

export default function PlanesPage() {
    return (
        <div className="min-h-screen bg-[#03050a] text-white selection:bg-cyan-500/30 overflow-x-hidden">
            <LandingHeader />
            
            <main className="pt-24">
                {/* Hero Minimalista para Planes */}
                <section className="relative py-20 px-6 overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/10 blur-[120px] rounded-full" />
                    </div>
                    
                    <div className="max-w-6xl mx-auto text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8"
                        >
                            <Rocket className="h-3 w-3" /> Transparencia Total
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9]"
                        >
                            Planes de<br/><span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">Ecosistema</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-zinc-400 font-medium max-w-2xl mx-auto mb-12"
                        >
                            Elige solo los módulos que tu negocio necesita. Sin letras pequeñas, sin contratos forzosos.
                        </motion.p>
                    </div>
                </section>

                {/* La sección de precios existente */}
                <PricingSection />

                {/* CTA Final */}
                <section className="py-32 px-6 border-t border-white/5 bg-black/40">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-black uppercase tracking-tight mb-8">¿Necesitas un plan a medida?</h2>
                        <p className="text-zinc-500 font-medium mb-12 italic">Para empresas con más de 50 empleados o necesidades de infraestructura masiva, ofrecemos consultoría dedicada.</p>
                        <Link 
                            href="/#contacto" 
                            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all"
                        >
                            Contactar con Ventas
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
