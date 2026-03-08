
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
        <section id="servicios" className="py-16 md:py-32 bg-transparent relative z-10">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                <div className="mb-12 md:mb-20 space-y-4 text-center lg:text-left">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase italic">Ecosistema <span className="text-primary/60 not-italic">Modular</span></h2>
                    <p className="text-muted-foreground max-w-xl mx-auto lg:ml-0 font-medium text-sm md:text-base">
                        Componentes de ingeniería diseñados para escalar su infraestructura operativa sin fricciones.
                    </p>
                </div>

                <div className="relative px-4 sm:px-0">
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
                                    <div className="h-full bg-card/40 backdrop-blur-md p-6 md:p-10 rounded-[2rem] border border-border/50 hover:border-primary/20 transition-all duration-500 group flex flex-col min-h-[300px] md:min-h-[340px] shadow-lg">
                                        <div className="mb-6 md:mb-8">
                                            <div className="p-3 bg-primary/10 rounded-xl w-fit group-hover:bg-primary/20 transition-all border border-primary/10">
                                                <item.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-3 md:space-y-4 flex-grow">
                                            <h3 className="text-base md:text-lg font-black text-foreground tracking-tight uppercase italic">{item.label}</h3>
                                            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed font-medium">
                                                {item.description}
                                            </p>
                                        </div>
                                        
                                        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-border/50 flex items-center gap-3">
                                            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Protocol Node 0{index + 1}</span>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        
                        <div className="flex gap-3 mt-8 md:mt-12 justify-center lg:justify-end">
                             <CarouselPrevious className="relative left-0 translate-y-0 h-10 w-10 bg-white/5 border-border hover:bg-primary/10 text-foreground transition-all rounded-xl" />
                             <CarouselNext className="relative right-0 translate-y-0 h-10 w-10 bg-white/5 border-border hover:bg-primary/10 text-foreground transition-all rounded-xl" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
