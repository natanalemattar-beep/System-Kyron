"use client";

import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, ArrowLeft, Printer, PlusCircle, AlertTriangle, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const mockEquipos = [
  { id: 1, nombre: "Impresora Fiscal Térmica Bixolon", serial: "Z3A123456", fecha: "15/01/2024", vence: "15/01/2027", estado: "Operativo", sede: "Principal" },
  { id: 2, nombre: "Caja Fiscal Registradora ACLAS", serial: "ACL-998877", fecha: "20/05/2023", vence: "20/05/2026", estado: "Por Vencer", sede: "Sede Valencia" },
  { id: 3, nombre: "Impresora Fiscal HKA", serial: "HKA-001122", fecha: "10/02/2024", vence: "10/02/2027", estado: "Operativo", sede: "Almacén Central" },
];

export default function HomologacionPage() {
  const handleAction = (msg: string) => alert(msg);

  return (
    <div className="p-6 md:p-12 bg-[#f5f7fa] min-h-screen space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <Button variant="ghost" asChild className="p-0 h-auto text-[#0A2472] hover:bg-transparent mb-2">
            <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4"/> Volver al Centro Contable</Link>
          </Button>
          <h1 className="text-3xl font-black text-[#0A2472] uppercase tracking-tighter flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-[#00A86B]" />
            Homologación SENIAT
          </h1>
          <p className="text-slate-500 font-medium text-sm">Control de equipos fiscales y cumplimiento de la Providencia 0071.</p>
        </div>
        <Button className="bg-[#0A2472] hover:bg-blue-900 rounded-xl" onClick={() => handleAction("Abriendo formulario de registro de equipo...")}>
          <PlusCircle className="mr-2 h-4 w-4" /> Registrar Equipo
        </Button>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm rounded-3xl bg-white p-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-6 opacity-5"><Printer className="h-32 w-32" /></div>
            <div className="relative z-10 space-y-6">
                <h3 className="text-sm font-black uppercase tracking-[0.4em] text-slate-400 italic">Resumen de Parque Fiscal</h3>
                <div className="flex gap-12">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Equipos Activos</p>
                        <p className="text-4xl font-black text-[#0A2472]">03</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Mantenimientos</p>
                        <p className="text-4xl font-black text-[#00A86B]">AL DÍA</p>
                    </div>
                </div>
            </div>
        </Card>

        <Card className="border-none shadow-sm rounded-3xl bg-amber-50 p-8 border-l-4 border-amber-500">
            <div className="flex items-start gap-6">
                <div className="p-4 bg-amber-500/10 rounded-2xl"><AlertTriangle className="h-8 w-8 text-amber-600" /></div>
                <div className="space-y-2">
                    <h3 className="text-lg font-black uppercase text-amber-700">Aviso de Renovación</h3>
                    <p className="text-sm text-amber-600/80 font-medium leading-relaxed">El equipo **ACLAS (Sede Valencia)** requiere renovación de homologación en los próximos 60 días para garantizar la validez legal de las facturas.</p>
                </div>
            </div>
        </Card>
      </div>

      <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardHeader className="p-8 border-b bg-slate-50/50">
          <CardTitle className="text-sm font-black uppercase tracking-widest text-[#0A2472]">Registro de Máquinas Fiscales</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="pl-8 font-bold text-[10px] uppercase">Equipo / Modelo</TableHead>
                <TableHead className="font-bold text-[10px] uppercase">Nro. de Serial</TableHead>
                <TableHead className="text-center font-bold text-[10px] uppercase">Última Revisión</TableHead>
                <TableHead className="text-center font-bold text-[10px] uppercase">Vencimiento</TableHead>
                <TableHead className="font-bold text-[10px] uppercase">Ubicación</TableHead>
                <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEquipos.map((e) => (
                <TableRow key={e.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="pl-8">
                    <div className="flex flex-col">
                        <span className="font-black text-xs text-[#0A2472] uppercase italic">{e.nombre}</span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Homologado SENIAT</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs font-bold text-slate-600">{e.serial}</TableCell>
                  <TableCell className="text-center text-xs text-slate-500">{e.fecha}</TableCell>
                  <TableCell className={cn(
                    "text-center text-xs font-black",
                    e.estado === 'Por Vencer' ? "text-amber-600" : "text-slate-500"
                  )}>{e.vence}</TableCell>
                  <TableCell className="text-xs font-medium text-slate-400 uppercase">{e.sede}</TableCell>
                  <TableCell className="text-right pr-8">
                    <Badge variant={e.estado === 'Operativo' ? 'default' : 'secondary'} className={cn(
                        "text-[8px] font-black uppercase h-6 px-3 rounded-lg",
                        e.estado === 'Por Vencer' && "bg-amber-100 text-amber-600 border-none shadow-sm"
                    )}>
                        {e.estado}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="p-8 bg-[#0A2472]/5 rounded-3xl border border-[#0A2472]/10 flex items-center gap-6">
        <ShieldCheck className="h-10 w-10 text-[#0A2472]" />
        <div className="space-y-1">
            <p className="text-xs font-black text-[#0A2472] uppercase tracking-widest italic">Protocolo de Integridad Fiscal</p>
            <p className="text-xs text-slate-500 font-medium leading-relaxed uppercase">Todos los equipos listados están sincronizados con la memoria fiscal del sistema para evitar discrepancias en los Libros de Venta.</p>
        </div>
      </div>
    </div>
  );
}