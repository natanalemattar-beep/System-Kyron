'use client';

import { PricingSection } from "@/components/landing/pricing-section";
import { LandingHeader } from "@/components/landing/landing-header";
import { Footer } from "@/components/landing/footer";
import { motion } from "framer-motion";
import { Shield, Zap, Calculator } from "lucide-react";

export default function PreciosPage() {
    return (
        <div className="min-h-screen bg-[#030711]">
            <LandingHeader />
            
            <main className="pt-20">
                {/* Hero de Precios */}
                <section className="relative py-24 overflow-hidden border-b border-white/5">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full" />
                    </div>
                    
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                                <Shield className="h-4 w-4 text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Inversión Inteligente</span>
                            </div>
                            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black tracking-tighter leading-[0.9] mb-8 text-white uppercase">
                                Transparencia <br/>
                                <span className="text-primary italic">Sin Fronteras</span>
                            </h1>
                            <p className="text-lg text-white/40 max-w-2xl mx-auto font-medium leading-relaxed">
                                Sin cargos ocultos. Sin contratos de permanencia. Escala tu empresa con la infraestructura más avanzada de Venezuela.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <PricingSection />

                {/* FAQ Quick Section */}
                <section className="py-24 bg-zinc-950/50 backdrop-blur-3xl">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="space-y-4">
                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <Zap className="h-6 w-6 text-primary" />
                                </div>
                                <h4 className="text-sm font-black uppercase tracking-widest text-white">Activación Inmediata</h4>
                                <p className="text-xs text-white/40 leading-relaxed font-medium">Acceso instantáneo a todos los módulos seleccionados tras la confirmación del pago.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <Shield className="h-6 w-6 text-primary" />
                                </div>
                                <h4 className="text-sm font-black uppercase tracking-widest text-white">Kyron Shield Inc.</h4>
                                <p className="text-xs text-white/40 leading-relaxed font-medium">Todos los planes incluyen protección legal y ciberseguridad AES-256 de serie.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <Calculator className="h-6 w-6 text-primary" />
                                </div>
                                <h4 className="text-sm font-black uppercase tracking-widest text-white">Tasa BCV Real</h4>
                                <p className="text-xs text-white/40 leading-relaxed font-medium">Facturación automática en VES anclada a la tasa oficial del Banco Central de Venezuela.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
