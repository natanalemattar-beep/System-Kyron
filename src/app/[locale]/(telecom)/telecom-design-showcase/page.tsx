
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Signal, Radio, Activity, Cpu, Globe, Zap, Network, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function TelecomDesignShowcasePage() {
    return (
        <div className="space-y-16 pb-20">
            <header className="border-l-4 border-amber-500 pl-10 py-4 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-amber-500 shadow-glow mb-4">
                    <Terminal className="h-3 w-3" /> ÁREA DESIGN
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic">Telecom <span className="text-amber-500">Design Lab</span></h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">Muestrario de Componentes UHD • Protocolo de Interfaz v2.8.5</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <Card className="glass-card border-none bg-amber-500/5 rounded-[3rem] p-10 border border-amber-500/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform"><Signal className="h-32 w-32" /></div>
                    <CardHeader className="p-0 mb-8">
                        <CardTitle className="text-xl font-black uppercase italic tracking-tight text-white flex items-center gap-4">
                            <Radio className="h-6 w-6 text-amber-500" /> Transmisión 5G
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4">
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                                animate={{ x: ["-100%", "100%"] }} 
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="h-full w-1/3 bg-amber-500 shadow-glow-secondary" 
                            />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Ancho de Banda Asignado: 1.2 Gbps</p>
                    </CardContent>
                </Card>

                <Card className="glass-card border-none bg-white/[0.01] rounded-[3rem] p-10 border border-white/5 flex flex-col justify-center items-center text-center">
                    <Activity className="h-16 w-16 text-emerald-400 mb-6 animate-pulse" />
                    <h3 className="text-2xl font-black uppercase italic tracking-tight text-foreground mb-2">Telemetría</h3>
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Status: Operational</p>
                </Card>

                <Card className="bg-amber-600 text-black rounded-[3rem] p-10 flex flex-col justify-between shadow-glow-secondary">
                    <CardTitle className="text-3xl font-black uppercase italic tracking-tight leading-none">ÁREA <br/> MAESTRA</CardTitle>
                    <div className="flex items-center gap-4 pt-10">
                        <Cpu className="h-8 w-8 opacity-40" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Auth v2.8.5</span>
                    </div>
                </Card>
            </div>
        </div>
    );
}
