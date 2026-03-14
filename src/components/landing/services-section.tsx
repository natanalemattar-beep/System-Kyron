
'use client';

import { motion } from "framer-motion";
import { loginOptions } from "@/lib/login-options";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

/**
 * @fileOverview Sección de Servicios: Ecosistema Modular y Responsivo.
 */

export function ServicesSection() {
    return (
        <section id="servicios" className="py-16 md:py-32 bg-transparent relative z-10">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="mb-12 md:mb-20 space-y-4 text-center lg:text-left">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase italic italic-shadow">Ecosistema <span className="text-primary not-italic">Modular</span></h2>
                    <p className="text-white/40 max-w-xl mx-auto lg:ml-0 font-bold uppercase tracking-widest text-xs md:text-sm italic">
                        Componentes de ingeniería diseñados para escalar su infraestructura operativa sin fricciones.
                    </p>
                </div>

                <div className="relative">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4 md:-ml-6">
                            {loginOptions.map((item, index) => (
                                <CarouselItem key={item.label} className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3">
                                    <div className="h-full bg-white/[0.02] backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border border-white/5 hover:border-primary/20 transition-all duration-500 group flex flex-col min-h-[340px] shadow-2xl">
                                        <div className="mb-8">
                                            <div className="p-4 bg-primary/10 rounded-2xl w-fit group-hover:bg-primary/20 transition-all border border-primary/10 shadow-inner">
                                                <item.icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4 flex-grow">
                                            <h3 className="text-base md:text-lg font-black text-white/90 tracking-tight uppercase italic group-hover:text-primary transition-colors">{item.label}</h3>
                                            <p className="text-white/40 text-[11px] md:text-xs leading-relaxed font-bold uppercase tracking-wide">
                                                {item.description}
                                            </p>
                                        </div>
                                        
                                        <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3">
                                            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white/20">Área de Protocolo 0{index + 1}</span>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        
                        <div className="flex gap-3 mt-8 md:mt-12 justify-center lg:justify-end">
                             <CarouselPrevious className="relative left-0 translate-y-0 h-12 w-12 bg-white/5 border-white/10 hover:bg-primary/10 text-white transition-all rounded-xl" />
                             <CarouselNext className="relative right-0 translate-y-0 h-12 w-12 bg-white/5 border-white/10 hover:bg-primary/10 text-white transition-all rounded-xl" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
