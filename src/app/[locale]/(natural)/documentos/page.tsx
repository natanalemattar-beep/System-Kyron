
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { File, Download, Eye, Search, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const documentos = [
    { id: "DOC-001", nombre: "Cédula de Identidad Digital", tipo: "PDF", tamano: "1.2 MB", fecha: "15/01/2024" },
    { id: "DOC-002", nombre: "RIF Personal (V-12345678-9)", tipo: "PDF", tamano: "0.8 MB", fecha: "20/05/2024" },
    { id: "DOC-003", nombre: "Pasaporte (Página Principal)", tipo: "JPG", tamano: "2.5 MB", fecha: "10/02/2023" },
    { id: "DOC-004", nombre: "Título Universitario", tipo: "PDF", tamano: "4.1 MB", fecha: "05/11/2022" },
];

export default function MisDocumentosPage() {
    return (
        <div className="space-y-12">
            <header className="border-l-4 border-primary pl-8 py-2">
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-white italic-shadow">Bóveda Digital</h1>
                <p className="text-muted-foreground mt-2 font-bold text-xs uppercase tracking-widest opacity-40">Almacenamiento de Grado Legal • Zero-Knowledge</p>
            </header>

            <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 h-5 w-5" />
                <Input placeholder="Buscar activos digitales..." className="pl-12 h-14 rounded-2xl bg-white/5 border-white/10 text-xs font-bold uppercase tracking-widest" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {documentos.map(doc => (
                    <Card key={doc.id} className="glass-card border-none rounded-[2rem] bg-white/[0.02] hover:bg-white/[0.04] transition-all group overflow-hidden">
                        <CardHeader className="flex-row items-center gap-6 p-8 pb-4">
                            <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 group-hover:scale-110 transition-transform shadow-inner">
                                <File className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-sm font-black uppercase italic tracking-tight text-white/90">{doc.nombre}</CardTitle>
                                <CardDescription className="text-[9px] font-bold uppercase opacity-30 tracking-widest">{doc.fecha} • {doc.tamano}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 pt-4 flex gap-3">
                            <Button variant="outline" className="flex-1 h-10 rounded-xl border-white/5 bg-white/5 text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"><Eye className="mr-2 h-3 w-3"/> Ver</Button>
                            <Button variant="outline" className="flex-1 h-10 rounded-xl border-white/5 bg-white/5 text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"><Download className="mr-2 h-3 w-3"/> Bajar</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
