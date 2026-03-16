
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
    FileText, User, UserCheck, Heart, 
    ArrowRight, ArrowLeft, Download, Send, 
    Share2, QrCode, CheckCircle, ShieldCheck,
    Printer, Loader2, Search, Briefcase, Landmark
} from "lucide-react";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Logo } from "@/components/logo";
import Image from "next/image";

const mockEmployees = [
  { id: "EMP-001", name: "Ana Pérez", ci: "V-12.345.678", cargo: "Gerente Finanzas", ingreso: "15/01/2020", salario: 15000, empresa: "System Kyron, C.A.", rif: "J-12345678-9", tlf: "0212-1112233" },
  { id: "EMP-002", name: "Luis Gómez", ci: "V-18.765.432", cargo: "Analista Senior", ingreso: "10/02/2021", salario: 8500, empresa: "System Kyron, C.A.", rif: "J-12345678-9", tlf: "0212-1112233" },
  { id: "EMP-003", name: "Carlos Mattar", ci: "V-32.855.496", cargo: "Ingeniero Maestro", ingreso: "01/01/2024", salario: 25000, empresa: "System Kyron, C.A.", rif: "J-12345678-9", tlf: "0212-1112233" },
];

const mockHistory = [
    { id: "CERT-001", fecha: "15/03/2026", tipo: "Trabajador Dependiente", empleado: "Ana Pérez", vigencia: "13/06/2026", status: "Válido" },
    { id: "CERT-002", fecha: "10/03/2026", tipo: "Profesional Independiente", empleado: "Carlos Mattar", vigencia: "08/06/2026", status: "Válido" },
];

type CertMode = 'personal' | 'hr';
type CertType = 'dependiente' | 'independiente' | 'pensionado' | null;

export function CertificadoManager({ mode }: { mode: CertMode }) {
    const { toast } = useToast();
    const [step, setStep] = useState<'selector' | 'form' | 'preview'>('selector');
    const [type, setType] = useState<CertType>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<any>({});

    const handleSelectType = (selectedType: CertType) => {
        setType(selectedType);
        if (mode === 'personal') {
            setFormData({
                nombre: "Usuario Natural",
                cedula: "V-32.855.496",
                empresa: "System Kyron, C.A.",
                rif: "J-12345678-9",
                cargo: "Consultor de Ingeniería",
                salario: 12000,
                ingreso: "01/01/2024",
                tlf: "0212-1234567",
                profesion: "Ingeniero",
                actividad: "Consultoría IT",
                fuente: "Honorarios Profesionales",
                ente: "IVSS",
                numCarnet: "12345678"
            });
        }
        setStep('form');
    };

    const handleEmployeeSelect = (empId: string) => {
        const emp = mockEmployees.find(e => e.id === empId);
        if (emp) {
            setFormData({
                nombre: emp.name,
                cedula: emp.ci,
                empresa: emp.empresa,
                rif: emp.rif,
                cargo: emp.cargo,
                salario: emp.salario,
                ingreso: emp.ingreso,
                tlf: emp.tlf
            });
        }
    };

    const handleGenerate = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep('preview');
            toast({
                title: "CERTIFICADO GENERADO",
                description: "El documento ha sido sellado digitalmente.",
                action: <CheckCircle className="text-emerald-500 h-4 w-4" />
            });
        }, 1200);
    };

    const handleAction = (action: string) => {
        alert(`${action}: Función en construcción para el prototipo v2.6.5`);
    };

    return (
        <div className="space-y-10">
            {step === 'selector' && (
                <div className="grid md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Card onClick={() => handleSelectType('dependiente')} className="glass-card border-none p-10 cursor-pointer group hover:bg-primary/5 transition-all text-center">
                        <div className="p-6 bg-primary/10 rounded-[2rem] w-fit mx-auto mb-8 border border-primary/20 group-hover:scale-110 transition-transform shadow-inner">
                            <Briefcase className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-black uppercase italic tracking-tighter mb-4">Trabajador Dependiente</h3>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed mb-8">Constancia de trabajo oficial con datos de nómina.</p>
                        <Button variant="outline" className="w-full h-12 rounded-xl text-[10px] font-black uppercase tracking-widest border-primary/20 text-primary">Generar certificado</Button>
                    </Card>

                    <Card onClick={() => handleSelectType('independiente')} className="glass-card border-none p-10 cursor-pointer group hover:bg-secondary/5 transition-all text-center">
                        <div className="p-6 bg-secondary/10 rounded-[2rem] w-fit mx-auto mb-8 border border-secondary/20 group-hover:scale-110 transition-transform shadow-inner">
                            <UserCheck className="h-10 w-10 text-secondary" />
                        </div>
                        <h3 className="text-xl font-black uppercase italic tracking-tighter mb-4">Profesional Independiente</h3>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed mb-8">Atestiguamiento de ingresos para el libre ejercicio.</p>
                        <Button variant="outline" className="w-full h-12 rounded-xl text-[10px] font-black uppercase tracking-widest border-secondary/20 text-secondary">Generar certificado</Button>
                    </Card>

                    <Card onClick={() => handleSelectType('pensionado')} className="glass-card border-none p-10 cursor-pointer group hover:bg-rose-500/5 transition-all text-center">
                        <div className="p-6 bg-rose-500/10 rounded-[2rem] w-fit mx-auto mb-8 border border-rose-500/20 group-hover:scale-110 transition-transform shadow-inner">
                            <Heart className="h-10 w-10 text-rose-500" />
                        </div>
                        <h3 className="text-xl font-black uppercase italic tracking-tighter mb-4">Jubilado / Pensionado</h3>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed mb-8">Certificación de estatus ante el IVSS o privado.</p>
                        <Button variant="outline" className="w-full h-12 rounded-xl text-[10px] font-black uppercase tracking-widest border-rose-500/20 text-rose-500">Generar certificado</Button>
                    </Card>
                </div>
            )}

            {step === 'form' && (
                <Card className="glass-card border-none rounded-[3rem] p-1 shadow-2xl animate-in fade-in zoom-in-95 duration-500 max-w-4xl mx-auto">
                    <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                        <div className="flex items-center gap-6">
                            <Button variant="ghost" onClick={() => setStep('selector')} className="h-10 w-10 rounded-full bg-white/10"><ArrowLeft className="h-4 w-4" /></Button>
                            <div>
                                <CardTitle className="text-xl font-black uppercase italic text-foreground tracking-tighter">Expediente de Ingreso</CardTitle>
                                <CardDescription className="text-[10px] font-bold uppercase text-primary tracking-widest">Formulario: {type?.toUpperCase()}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-10 space-y-8">
                        {mode === 'hr' && (
                            <div className="space-y-3">
                                <Label className="text-[9px] font-black uppercase text-primary/60 ml-1">Seleccionar Empleado</Label>
                                <Select onValueChange={handleEmployeeSelect}>
                                    <SelectTrigger className="h-12 rounded-xl bg-white/5 border-border font-bold uppercase"><SelectValue placeholder="Buscar en nómina..." /></SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {mockEmployees.map(e => <SelectItem key={e.id} value={e.id} className="uppercase text-xs font-bold">{e.name} ({e.ci})</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase text-muted-foreground/40 ml-1">Nombre Completo</Label>
                                <Input value={formData.nombre || ""} readOnly={mode === 'personal'} onChange={e => setFormData({...formData, nombre: e.target.value})} className="h-12 rounded-xl bg-white/5 border-border font-bold text-foreground" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase text-muted-foreground/40 ml-1">Cédula de Identidad</Label>
                                <Input value={formData.cedula || ""} readOnly={mode === 'personal'} onChange={e => setFormData({...formData, cedula: e.target.value})} className="h-12 rounded-xl bg-white/5 border-border font-bold text-foreground" />
                            </div>

                            {type === 'dependiente' && (
                                <>
                                    <div className="space-y-2">
                                        <Label className="text-[9px] font-black uppercase text-muted-foreground/40 ml-1">Empresa</Label>
                                        <Input value={formData.empresa || ""} onChange={e => setFormData({...formData, empresa: e.target.value})} className="h-12 rounded-xl bg-white/5 border-border font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[9px] font-black uppercase text-muted-foreground/40 ml-1">Cargo</Label>
                                        <Input value={formData.cargo || ""} onChange={e => setFormData({...formData, cargo: e.target.value})} className="h-12 rounded-xl bg-white/5 border-border font-bold" />
                                    </div>
                                </>
                            )}

                            {type === 'independiente' && (
                                <>
                                    <div className="space-y-2">
                                        <Label className="text-[9px] font-black uppercase text-muted-foreground/40 ml-1">Profesión / Oficio</Label>
                                        <Input value={formData.profesion || ""} onChange={e => setFormData({...formData, profesion: e.target.value})} className="h-12 rounded-xl bg-white/5 border-border font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[9px] font-black uppercase text-muted-foreground/40 ml-1">Actividad Realizada</Label>
                                        <Input value={formData.actividad || ""} onChange={e => setFormData({...formData, actividad: e.target.value})} className="h-12 rounded-xl bg-white/5 border-border font-bold" />
                                    </div>
                                </>
                            )}

                            {type === 'pensionado' && (
                                <>
                                    <div className="space-y-2">
                                        <Label className="text-[9px] font-black uppercase text-muted-foreground/40 ml-1">Ente Emisor</Label>
                                        <Input value={formData.ente || ""} onChange={e => setFormData({...formData, ente: e.target.value})} className="h-12 rounded-xl bg-white/5 border-border font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[9px] font-black uppercase text-muted-foreground/40 ml-1">Nro. Carnet IVSS</Label>
                                        <Input value={formData.numCarnet || ""} onChange={e => setFormData({...formData, numCarnet: e.target.value})} className="h-12 rounded-xl bg-white/5 border-border font-bold" />
                                    </div>
                                </>
                            )}

                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase text-muted-foreground/40 ml-1">Ingreso Mensual</Label>
                                <Input type="number" value={formData.salario || ""} onChange={e => setFormData({...formData, salario: Number(e.target.value)})} className="h-12 rounded-xl bg-white/5 border-border font-black text-primary italic" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[9px] font-black uppercase text-muted-foreground/40 ml-1">Fecha {type === 'pensionado' ? 'Jubilación' : 'Ingreso'}</Label>
                                <Input type="date" value={formData.ingreso || ""} onChange={e => setFormData({...formData, ingreso: e.target.value})} className="h-12 rounded-xl bg-white/5 border-border font-bold" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="p-10 bg-primary/5 border-t border-border flex justify-end">
                        <Button onClick={handleGenerate} className="h-14 px-12 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest shadow-xl" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <FileText className="mr-3 h-5 w-5" />}
                            SELLAR CERTIFICADO
                        </Button>
                    </CardFooter>
                </Card>
            )}

            {step === 'preview' && (
                <div className="space-y-10 animate-in fade-in duration-700">
                    <Card className="max-w-4xl mx-auto bg-white p-12 md:p-20 shadow-2xl border border-slate-100 rounded-lg text-slate-950 font-serif relative overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none flex items-center justify-center">
                            <Logo className="h-full w-full rotate-12 scale-150 grayscale" />
                        </div>
                        
                        <header className="flex justify-between items-start mb-20 border-b-2 border-slate-900 pb-10">
                            <div className="flex items-center gap-6">
                                <Logo className="h-16 w-16" />
                                <div className="space-y-1">
                                    <h4 className="text-xl font-black italic uppercase tracking-tighter">System Kyron</h4>
                                    <p className="text-[8px] font-bold uppercase tracking-[0.4em] opacity-60">Control Maestro • 2026</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">CERTIFICACIÓN</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Ref: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                            </div>
                        </header>

                        <div className="space-y-12 text-justify leading-loose text-lg">
                            <p className="indent-12">
                                Mediante la presente se hace constar que el(la) ciudadano(a) <strong className="uppercase">{formData.nombre}</strong>, titular de la Cédula de Identidad Nro. <strong>{formData.cedula}</strong>, {type === 'pensionado' ? 'se encuentra en condición de Jubilado/Pensionado' : `presta sus servicios en la organización ${formData.empresa || 'System Kyron'} (RIF: ${formData.rif || 'J-12345678-9'})`}.
                            </p>
                            
                            <p className="indent-12">
                                Se certifica que el titular de la presente percibe un ingreso mensual de <strong>{formatCurrency(formData.salario || 0, 'Bs.')}</strong>, {type === 'pensionado' ? 'por concepto de pensión de jubilación' : `desempeñando el cargo de ${formData.cargo || formData.profesion || 'Consultor'}`}.
                            </p>

                            <p className="indent-12">
                                Constancia que se expide a petición de la parte interesada en la ciudad de Caracas, a los {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}.
                            </p>
                        </div>

                        <footer className="mt-32 grid md:grid-cols-2 gap-20">
                            <div className="flex flex-col items-center">
                                <div className="w-full h-px bg-slate-900 mb-4" />
                                <p className="font-bold text-sm uppercase">Firma del Certificador</p>
                                <p className="text-[10px] uppercase opacity-40">System Kyron v2.6.5</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="p-4 border-2 border-slate-900 rounded-xl bg-white shadow-inner">
                                    <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=CERT-${formData.cedula}`} alt="QR Verification" width={80} height={80} className="grayscale" />
                                </div>
                                <p className="text-[8px] font-black uppercase tracking-widest mt-3 opacity-40">Sello de Integridad Digital</p>
                            </div>
                        </footer>

                        <div className="mt-20 pt-10 border-t border-slate-100 text-center">
                            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-300 italic">CERTIFICADO VÁLIDO POR 90 DÍAS • VERIFICACIÓN BLOCKCHAIN ACTIVA</p>
                        </div>
                    </Card>

                    <div className="flex flex-wrap justify-center gap-4 no-print">
                        <Button variant="outline" className="rounded-xl h-12 px-8 font-black text-[10px] uppercase tracking-widest" onClick={() => setStep('form')}><ArrowLeft className="mr-2 h-4 w-4" /> Editar Datos</Button>
                        <Button variant="outline" className="rounded-xl h-12 px-8 font-black text-[10px] uppercase tracking-widest" onClick={() => handleAction('Descarga PDF')}><Download className="mr-2 h-4 w-4" /> Descargar PDF</Button>
                        <Button variant="outline" className="rounded-xl h-12 px-8 font-black text-[10px] uppercase tracking-widest" onClick={() => handleAction('Impresión')}><Printer className="mr-2 h-4 w-4" /> Imprimir</Button>
                        <Button className="btn-3d-secondary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl" onClick={() => setStep('selector')}>FINALIZAR TRÁMITE</Button>
                    </div>
                </div>
            )}

            <div className="pt-10">
                <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                    <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Historial de Certificaciones</CardTitle>
                                <CardDescription className="text-[9px] font-bold uppercase opacity-30 mt-1">Registro centralizado de documentos emitidos</CardDescription>
                            </div>
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40" />
                                <Input placeholder="Buscar..." className="pl-9 h-9 rounded-xl bg-white/5 border-border text-[9px] font-bold uppercase" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/30 border-none">
                                    <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Fecha Emisión</TableHead>
                                    {mode === 'hr' && <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Empleado</TableHead>}
                                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Tipo de Certificado</TableHead>
                                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Vencimiento</TableHead>
                                    <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Acción</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockHistory.map((h) => (
                                    <TableRow key={h.id} className="border-border/50 hover:bg-muted/20 transition-all group">
                                        <TableCell className="pl-10 py-6 text-[10px] font-bold text-muted-foreground uppercase">{h.fecha}</TableCell>
                                        {mode === 'hr' && <TableCell className="py-6 font-black text-xs text-foreground/80 uppercase italic">{h.empleado}</TableCell>}
                                        <TableCell className="py-6 font-black text-xs text-foreground/80 uppercase italic group-hover:text-primary transition-colors">{h.tipo}</TableCell>
                                        <TableCell className="py-6">
                                            <Badge variant="outline" className="text-[8px] font-black uppercase border-emerald-500/20 text-emerald-400 bg-emerald-500/5 h-6 px-3 rounded-lg">Hasta {h.vigencia}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right pr-10 py-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary"><Eye className="h-4 w-4" /></Button>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary"><Download className="h-4 w-4" /></Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
