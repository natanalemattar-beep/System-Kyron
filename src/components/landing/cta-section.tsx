
'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
    return (
        <section className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <div 
                    className="max-w-2xl mx-auto p-8 rounded-2xl bg-card border"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-balance">Comienza a Optimizar tu Empresa Hoy</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Únete a cientos de empresas que ya están transformando su gestión con Kyron.</p>
                    <Button size="lg" asChild className="mt-8 btn-3d-primary">
                      <Link href="/register">¡Regístrate Ya! <ArrowRight className="ml-2"/></Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
