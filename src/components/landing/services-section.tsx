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

export function ServicesSection() {
    return (
        <section id="servicios" className="py-32 bg-black">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="mb-20 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">Ecosistema <span className="text-white/40">Modular</span></h2>
                    <p className="text-muted-foreground max-w-xl font-medium">
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
                        <CarouselContent className="-ml-6">
                            {loginOptions.map((item, index) => (
                                <CarouselItem key={item.label} className="pl-6 md:basis-1/2 lg:basis-1/3">
                                    <div className="h-full bg-white/[0.02] p-8 md:p-10 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-500 group flex flex-col min-h-[340px]">
                                        <div className="mb-8">
                                            <div className="p-3 bg-white/5 rounded-lg w-fit group-hover:bg-white/10 transition-all border border-white/5">
                                                <item.icon className="h-5 w-5 text-white" />
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4 flex-grow">
                                            <h3 className="text-lg font-bold text-white tracking-tight">{item.label}</h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                        
                                        <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Protocol Node 0{index + 1}</span>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        
                        <div className="flex gap-3 mt-12 justify-end">
                             <CarouselPrevious className="relative left-0 translate-y-0 h-10 w-10 bg-transparent border-white/10 hover:bg-white/5 text-white transition-all rounded-lg" />
                             <CarouselNext className="relative right-0 translate-y-0 h-10 w-10 bg-transparent border-white/10 hover:bg-white/5 text-white transition-all rounded-lg" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
