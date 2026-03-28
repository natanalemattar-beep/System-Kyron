"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Clock, Download, ArrowLeft, Loader2, Inbox } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Link } from "@/navigation";

interface Empleado {
    id: number;
    nombre: string;
    apellido: string;
    cedula: string;
    cargo: string;
    departamento: string;
    salario: string;
}

export default function HorasExtrasPage() {
    const [rows, setRows] = useState<Empleado[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/contabilidad/records?type=empleados')
            .then(r => r.ok ? r.json() : { rows: [] })
            .then(d => setRows((d.rows ?? []).filter((e: Empleado & { activo: boolean }) => e.activo)))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="p-6 md:p-12 bg-[#f5f7fa] min-h-screen space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <Button variant="ghost" asChild className="p-0 h-auto text-[#0A2472] hover:bg-transparent mb-2">
                        <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4" /> Volver al Centro Contable</Link>
                    </Button>
                    <h1 className="text-3xl font-black text-[#0A2472] uppercase tracking-tighter flex items-center gap-3">
                        <Clock className="h-8 w-8 text-[#00A86B]" />
                        Libro de Horas Extras
                    </h1>
                    <p className="text-slate-500 font-medium">Registro de horas extraordinarias conforme a la LOTTT.</p>
                </div>
                <Button variant="outline" className="rounded-xl"><Download className="mr-2 h-4 w-4" />Exportar</Button>
            </header>

            <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span className="text-sm font-bold uppercase tracking-widest">Cargando empleados...</span>
                        </div>
                    ) : rows.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
                            <Inbox className="h-10 w-10" />
                            <p className="text-sm font-bold uppercase tracking-widest">Sin registro de horas extras</p>
                            <p className="text-xs text-slate-400/70">Registre empleados y sus horas extraordinarias para verlas aquí.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50">
                                    <TableHead className="pl-8 font-bold text-[10px] uppercase">Empleado</TableHead>
                                    <TableHead className="font-bold text-[10px] uppercase">Cédula</TableHead>
                                    <TableHead className="font-bold text-[10px] uppercase">Cargo</TableHead>
                                    <TableHead className="font-bold text-[10px] uppercase">Departamento</TableHead>
                                    <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">Salario Base</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.map((e) => (
                                    <TableRow key={e.id} className="hover:bg-slate-50 transition-colors">
                                        <TableCell className="pl-8 font-bold text-xs text-[#0A2472]">{e.nombre} {e.apellido}</TableCell>
                                        <TableCell className="text-xs font-mono">{e.cedula}</TableCell>
                                        <TableCell className="text-xs">{e.cargo}</TableCell>
                                        <TableCell className="text-xs text-slate-500">{e.departamento}</TableCell>
                                        <TableCell className="text-right pr-8 font-mono text-xs font-bold text-[#00A86B]">{formatCurrency(parseFloat(e.salario), 'Bs.')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
