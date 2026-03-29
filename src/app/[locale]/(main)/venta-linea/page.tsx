"use client";

  import { Card, CardContent } from "@/components/ui/card";
  import { Phone, ArrowLeft } from "lucide-react";
  import { Link } from "@/navigation";

  export default function Page() {
      return (
          <div className="space-y-8 pb-20">
              <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-4">
                  <ArrowLeft className="h-3.5 w-3.5" /> Volver
              </Link>
              <header>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-sky-400 mb-3">
                      <Phone className="h-3 w-3" /> KYRON SYSTEM
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
                      Nueva Línea Telefónica
                  </h1>
                  <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest opacity-60 mt-2">
                      Adquiere tu línea 5G con eSIM integrada
                  </p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                      { title: "Planes Disponibles", desc: "Desde $5/mes — cobertura nacional 5G" },
                    { title: "Activación eSIM", desc: "QR de aprovisionamiento instantáneo" },
                    { title: "Portabilidad", desc: "Trae tu número de otra operadora" }
                  ].map((item, i) => (
                      <Card key={i} className="group hover:border-sky-500/30 transition-all duration-300">
                          <CardContent className="p-5 space-y-2">
                              <div className="flex items-center gap-2">
                                  <div className="h-8 w-8 rounded-lg bg-sky-500/10 flex items-center justify-center">
                                      <Phone className="h-4 w-4 text-sky-400" />
                                  </div>
                                  <h3 className="text-sm font-black uppercase tracking-tight text-foreground">{item.title}</h3>
                              </div>
                              <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                          </CardContent>
                      </Card>
                  ))}
              </div>
              <Card className="border-dashed border-2 border-muted-foreground/20">
                  <CardContent className="p-8 text-center space-y-3">
                      <Phone className="h-10 w-10 text-muted-foreground/30 mx-auto" />
                      <p className="text-sm font-bold text-muted-foreground">Módulo en desarrollo activo</p>
                      <p className="text-xs text-muted-foreground/60">Esta funcionalidad está siendo implementada. Próximamente disponible.</p>
                  </CardContent>
              </Card>
          </div>
      );
  }
  