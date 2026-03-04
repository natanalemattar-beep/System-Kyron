
'use client';

import { motion } from "framer-motion";
import { loginOptions } from "@/lib/login-options";
import { Info } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ServicesSection() {
    return (
        <section id="servicios" className="py-24 md:py-32 bg-background border-t border-white/5 relative overflow-hidden">
            {/* Background ambient glow for the section */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />
            
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[8px] font-black uppercase tracking-[0.4em] mb-2">
                        Explorar Nodo
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic italic-shadow text-white">Ecosistema de Soluciones</h2>
                    <p className="text-white/40 max-w-2xl mx-auto font-bold text-xs md:text-sm uppercase tracking-widest leading-relaxed">
                        Arquitectura modular diseñada para cubrir cada necesidad de su infraestructura operativa.
                    </p>
                </div>

                <div className="relative px-4 md:px-12">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {loginOptions.map((item, index) => (
                                <CarouselItem key={item.label} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                    <div className="h-full bg-white/[0.02] backdrop-blur-3xl p-8 md:p-10 rounded-[2.5rem] border border-white/5 hover:border-primary/20 transition-all duration-500 relative overflow-hidden group shadow-2xl flex flex-col min-h-[380px]">
                                        <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-all">
                                            <item.icon className="h-24 w-24 rotate-12" />
                                        </div>
                                        
                                        <div className="mb-8 relative z-10">
                                            <div className="p-4 bg-primary/5 rounded-2xl w-fit group-hover:scale-110 group-hover:bg-primary/10 transition-all border border-primary/10 shadow-inner">
                                                <item.icon className="h-6 w-6 text-primary" />
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4 relative z-10 flex-grow">
                                            <h3 className="text-lg font-black uppercase italic tracking-tight text-white">{item.label}</h3>
                                            <p className="text-white/40 text-[11px] md:text-xs leading-relaxed font-bold uppercase tracking-tight text-justify line-clamp-4">
                                                {item.description}
                                            </p>
                                        </div>
                                        
                                        <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-3 relative z-10">
                                            <div className="h-1 w-1 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(37,99,235,1)]" />
                                            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20">Protocolo {index + 1}</span>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        
                        <div className="hidden md:flex gap-2 absolute -bottom-12 left-1/2 -translate-x-1/2">
                             <CarouselPrevious className="relative left-0 translate-y-0 h-10 w-10 bg-white/5 border-white/10 hover:bg-primary hover:text-white transition-all rounded-xl" />
                             <CarouselNext className="relative right-0 translate-y-0 h-10 w-10 bg-white/5 border-white/10 hover:bg-primary hover:text-white transition-all rounded-xl" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
