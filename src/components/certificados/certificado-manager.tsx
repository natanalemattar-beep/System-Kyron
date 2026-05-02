
"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CircleCheck, Loader2, ShieldCheck, Briefcase, UserCheck, Heart, Search, ArrowLeft, Download, Eye, Printer } from "lucide-react";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Logo } from "@/components/logo";
import Image from "next/image";

type Employee = {
  id: string;
  name: string;
  ci: string;
  cargo: string;
  ingreso: string;
  salario: number;
  empresa: string;
  rif: string;
  tlf: string;
};

type CertHistory = {
  id: string;
  fecha: string;
  tipo: string;
  empleado: string;
  vigencia: string;
  status: string;
};

type CertMode = 'personal' | 'hr';
type CertType = 'dependiente' | 'independiente' | 'pensionado' | null;

export function CertificadoManager({ mode }: { mode: CertMode }) {
    const { toast } = useToast();
    const [step, setStep] = useState<'selector' | 'form' | 'preview'>('selector');
    const [type, setType] = useState<CertType>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [certHistory, setCertHistory] = useState<CertHistory[]>([]);
    const [loadingEmployees, setLoadingEmployees] = useState(false);
    const [formData, setFormData] = useState<any>({
        nombre: "",
        cedula: "",
        empresa: "",
        rif: "",
        cargo: "",
        salario: 0,
        ingreso: "",
        tlf: "",
        profesion: "",
        actividad: "",
        fuente: "Honorarios Profesionales",
        ente: "IVSS",
        numCarnet: ""
    });

    const [refId, setRefId] = useState("");
    const [certDateStr, setCertDateStr] = useState("");

    const loadUserData = useCallback(async () => {
        try {
            const res = await fetch('/api/auth/me');
            if (res.ok) {
                const data = await res.json();
                const u = data.user;
                if (u) {
                    setFormData((prev: any) => ({
                        ...prev,
                        nombre: ((u.nombre || '') + ' ' + (u.apellido || '')).trim().toUpperCase(),
                        cedula: u.cedula || '',
                        empresa: u.razon_social || '',
                        rif: u.rif || '',
                    }));
                }
            }
        } catch {}
    }, []);

    const loadEmployees = useCallback(async () => {
        if (mode !== 'hr') return;
        setLoadingEmployees(true);
        try {
            const res = await fetch('/api/empleados');
            if (res.ok) {
                const data = await res.json();
                const mapped = (data.empleados || []).map((e: any) => ({
                    id: `EMP-${e.id}`,
                    name: ((e.nombre || '') + ' ' + (e.apellido || '')).trim(),
                    ci: e.cedula || '',
                    cargo: e.cargo || '',
                    ingreso: e.fecha_ingreso || '',
                    salario: e.salario || 0,
                    empresa: e.empresa || '',
                    rif: e.rif_empresa || '',
                    tlf: e.telefono || '',
                }));
                setEmployees(mapped);
            }
        } catch {}
        setLoadingEmployees(false);
    }, [mode]);

    const loadHistory = useCallback(async () => {
        try {
            const res = await fetch('/api/certificados');
            if (res.ok) {
                const data = await res.json();
                setCertHistory((data.certificados || []).map((c: any) => ({
                    id: c.id || `CERT-${Math.random().toString(36).substr(2, 6)}`,
                    fecha: c.fecha_emision ? new Date(c.fecha_emision).toLocaleDateString('es-VE') : '',
                    tipo: c.tipo || '',
                    empleado: c.nombre_titular || '',
                    vigencia: c.fecha_vigencia ? new Date(c.fecha_vigencia).toLocaleDateString('es-VE') : '',
                    status: c.estado || 'Válido',
                })));
            }
        } catch {}
    }, []);

    useEffect(() => {
        setRefId("KYR-" + Math.random().toString(36).substr(2, 9).toUpperCase());
        setCertDateStr(new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }));
        loadUserData();
        loadEmployees();
        loadHistory();
    }, [loadUserData, loadEmployees, loadHistory]);

    const handleSelectType = (selectedType: CertType) => {
        setType(selectedType);
        setStep('form');
    };

    const handleEmployeeSelect = (empId: string) => {
        const emp = employees.find(e => e.id === empId);
        if (emp) {
            setFormData({
                ...formData,
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

    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            await fetch('/api/certificados', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tipo: type,
                    nombre_titular: formData.nombre,
                    cedula_titular: formData.cedula,
                    datos: formData,
                }),
            });
        } catch {}
        setTimeout(() => {
            setIsLoading(false);
            setStep('preview');
            toast({
                title: "CERTIFICADO SELLADO",
                description: "El documento ha sido validado bajo protocolo digital.",
                action: <CircleCheck className="text-emerald-500 h-4 w-4" />
            });
            loadHistory();
        }, 1200);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="space-y-10">
            {step === 'selector' && (
                <div className="grid md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Card onClick={() => handleSelectType('dependiente')} className="glass-card border-none p-10 cursor-pointer group hover:bg-primary/5 transition-all text-center rounded-[2.5rem]">
                        <div className="p-6 bg-primary/10 rounded-xl w-fit mx-auto mb-8 border border-primary/20 group-hover:scale-110 transition-transform shadow-inner">
                            <Briefcase className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold uppercase italic tracking-tight mb-4">Trabajador Dependiente</h3>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed mb-8">Certificación laboral para personal bajo relación de dependencia.</p>
                        <Button variant="outline" className="w-full h-12 rounded-xl text-[10px] font-semibold uppercase tracking-widest border-primary/20 text-primary">Iniciar Gestión</Button>
                    </Card>

                    <Card onClick={() => handleSelectType('independiente')} className="glass-card border-none p-10 cursor-pointer group hover:bg-secondary/5 transition-all text-center rounded-[2.5rem]">
                        <div className="p-6 bg-secondary/10 rounded-xl w-fit mx-auto mb-8 border border-secondary/20 group-hover:scale-110 transition-transform shadow-inner">
                            <UserCheck className="h-10 w-10 text-secondary" />
                        </div>
                        <h3 className="text-xl font-semibold uppercase italic tracking-tight mb-4">Profesional Libre</h3>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed mb-8">Atestiguamiento de ingresos para trabajadores independientes.</p>
                        <Button variant="outline" className="w-full h-12 rounded-xl text-[10px] font-semibold uppercase tracking-widest border-secondary/20 text-secondary">Iniciar Gestión</Button>
                    </Card>

                    <Card onClick={() => handleSelectType('pensionado')} className="glass-card border-none p-10 cursor-pointer group hover:bg-rose-500/5 transition-all text-center rounded-[2.5rem]">
                        <div className="p-6 bg-rose-500/10 rounded-xl w-fit mx-auto mb-8 border border-rose-500/20 group-hover:scale-110 transition-transform shadow-inner">
                            <Heart className="h-10 w-10 text-rose-500" />
                        </div>
                        <h3 className="text-xl font-semibold uppercase italic tracking-tight mb-4">Jubilados / Pensiones</h3>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed mb-8">Certificación de estatus ante entes públicos o privados.</p>
                        <Button variant="outline" className="w-full h-12 rounded-xl text-[10px] font-semibold uppercase tracking-widest border-rose-500/20 text-rose-500">Iniciar Gestión</Button>
                    </Card>
                </div>
            )}

            {step === 'form' && (
                <Card className="glass-card border-none rounded-2xl p-1 shadow-lg animate-in fade-in zoom-in-95 duration-500 max-w-4xl mx-auto">
                    <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                        <div className="flex items-center gap-6">
                            <Button variant="ghost" onClick={() => setStep('selector')} className="h-10 w-10 rounded-full bg-white/10"><ArrowLeft className="h-4 w-4" /></Button>
                            <div>
                                <CardTitle className="text-xl font-semibold uppercase italic text-foreground tracking-tight">Dossier de Certificación</CardTitle>
                                <CardDescription className="text-[10px] font-bold uppercase text-primary tracking-widest">Protocolo: {type?.toUpperCase()}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-10 space-y-10">
                        {mode === 'hr' && (
                            <div className="space-y-3">
                                <Label className="text-[11px] font-semibold uppercase text-primary/60 ml-1">Seleccionar Empleado de Nómina</Label>
                                <Select onValueChange={handleEmployeeSelect}>
                                    <SelectTrigger className="h-12 rounded-xl bg-white/5 border-border font-bold uppercase"><SelectValue placeholder={loadingEmployees ? "Cargando empleados..." : employees.length > 0 ? "Buscar en la lista..." : "Ingrese los datos manualmente"} /></SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {employees.map(e => <SelectItem key={e.id} value={e.id} className="uppercase text-xs font-bold">{e.name} ({e.ci})</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase text-muted-foreground/40 ml-1">Nombre Completo</Label>
                                <Input value={formData.nombre || ""} onChange={e => setFormData({...formData, nombre: e.target.value.toUpperCase()})} className="h-12 rounded-xl bg-white/5 border-border font-bold text-foreground" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase text-muted-foreground/40 ml-1">Cédula de Identidad</Label>
                                <Input value={formData.cedula || ""} onChange={e => setFormData({...formData, cedula: e.target.value})} className="h-12 rounded-xl bg-white/5 border-border font-bold text-foreground" />
                            </div>

                            {type === 'dependiente' && (
                                <>
                                    <div className="space-y-2">
                                        <Label className="text-[11px] font-semibold uppercase text-muted-foreground/40 ml-1">Entidad de Trabajo</Label>
                                        <Input value={formData.empresa || ""} onChange={e => setFormData({...formData, empresa: e.target.value.toUpperCase()})} className="h-12 rounded-xl bg-white/5 border-border font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[11px] font-semibold uppercase text-muted-foreground/40 ml-1">Cargo Desempeñado</Label>
                                        <Input value={formData.cargo || ""} onChange={e => setFormData({...formData, cargo: e.target.value.toUpperCase()})} className="h-12 rounded-xl bg-white/5 border-border font-bold" />
                                    </div>
                                </>
                            )}

                            {type === 'independiente' && (
                                <>
                                    <div className="space-y-2">
                                        <Label className="text-[11px] font-semibold uppercase text-muted-foreground/40 ml-1">Profesión u Oficio</Label>
                                        <Input value={formData.profesion || ""} onChange={e => setFormData({...formData, profesion: e.target.value.toUpperCase()})} className="h-12 rounded-xl bg-white/5 border-border font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[11px] font-semibold uppercase text-muted-foreground/40 ml-1">Actividad Específica</Label>
                                        <Input value={formData.actividad || ""} onChange={e => setFormData({...formData, actividad: e.target.value.toUpperCase()})} className="h-12 rounded-xl bg-white/5 border-border font-bold" />
                                    </div>
                                </>
                            )}

                            {type === 'pensionado' && (
                                <>
                                    <div className="space-y-2">
                                        <Label className="text-[11px] font-semibold uppercase text-muted-foreground/40 ml-1">Institución Otorgante</Label>
                                        <Input value={formData.ente || ""} onChange={e => setFormData({...formData, ente: e.target.value.toUpperCase()})} className="h-12 rounded-xl bg-white/5 border-border font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[11px] font-semibold uppercase text-muted-foreground/40 ml-1">Nro. Carnet de Pensionado</Label>
                                        <Input value={formData.numCarnet || ""} onChange={e => setFormData({...formData, numCarnet: e.target.value})} className="h-12 rounded-xl bg-white/5 border-border font-bold" />
                                    </div>
                                </>
                            )}

                            <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase text-muted-foreground/40 ml-1">Ingreso Mensual Promedio (Bs.)</Label>
                                <Input type="number" value={formData.salario || ""} onChange={e => setFormData({...formData, salario: Number(e.target.value)})} className="h-12 rounded-xl bg-white/5 border-border font-bold text-primary italic" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[11px] font-semibold uppercase text-muted-foreground/40 ml-1">Fecha de Inicio / Jubilación</Label>
                                <Input type="date" value={formData.ingreso || ""} onChange={e => setFormData({...formData, ingreso: e.target.value})} className="h-12 rounded-xl bg-white/5 border-border font-bold" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="p-10 bg-primary/5 border-t border-border flex justify-end">
                        <Button onClick={handleGenerate} className="h-14 px-12 rounded-2xl btn-3d-primary font-semibold uppercase text-xs tracking-widest shadow-xl" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <ShieldCheck className="mr-3 h-5 w-5" />}
                            SELLAR DOCUMENTO
                        </Button>
                    </CardFooter>
                </Card>
            )}

            {step === 'preview' && (
                <div className="space-y-10 animate-in fade-in duration-1000">
                    <Card className="max-w-4xl mx-auto bg-white p-12 md:p-20 shadow-lg border border-slate-100 rounded-sm text-slate-950 font-serif relative overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none flex items-center justify-center">
                            <Logo className="h-full w-full rotate-12 scale-150 grayscale" />
                        </div>
                        
                        <header className="flex justify-between items-start mb-20 border-b-2 border-slate-900 pb-10 relative z-10">
                            <div className="flex items-center gap-6">
                                <Logo className="h-16 w-16" />
                                <div className="space-y-1">
                                    <h4 className="text-xl font-bold uppercase tracking-tight leading-none">System Kyron</h4>
                                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">Corporate Intelligence • 2026</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <h3 className="text-2xl font-semibold uppercase italic tracking-tight text-slate-900 leading-none">CERTIFICACIÓN</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Ref: {refId || "KYR-000000000"}</p>
                            </div>
                        </header>

                        <div className="space-y-12 text-justify leading-loose text-lg relative z-10">
                            <p className="indent-12">
                                Quien suscribe, actuando en representación del <strong>NÚCLEO DE GESTIÓN SYSTEM KYRON</strong>, por medio de la presente certifica formalmente que el(la) ciudadano(a) <strong className="uppercase">{formData.nombre}</strong>, titular de la Cédula de Identidad Nro. <strong>{formData.cedula}</strong>, {
                                    type === 'pensionado' 
                                    ? `se encuentra en condición de JUBILADO / PENSIONADO ante la institución ${formData.ente || 'IVSS'}, portador de la credencial Nro. ${formData.numCarnet || 'N/A'}, desde la fecha ${formatDate(formData.ingreso)}` 
                                    : type === 'independiente'
                                    ? `ejerce de forma libre e independiente la profesión de ${formData.profesion || 'PROFESIONAL'} en el área de ${formData.actividad || 'SERVICIOS'}, realizando estas labores de forma ininterrumpida desde el ${formatDate(formData.ingreso)}, operando bajo su propia estructura de ingresos`
                                    : `presta sus servicios profesionales en la organización ${formData.empresa || 'N/A'} (RIF: ${formData.rif || 'N/A'}), desempeñando el cargo de ${formData.cargo || 'N/A'} desde la fecha de ingreso ${formatDate(formData.ingreso)}`
                                }.
                            </p>
                            
                            <p className="indent-12">
                                Se hace constar que el titular de la presente percibe un ingreso mensual promedio de <strong>{formatCurrency(formData.salario || 0, 'Bs.')}</strong>, {type === 'pensionado' ? 'derivado de su asignación de jubilación' : `por concepto de su actividad profesional antes descrita`}. Dicho monto ha sido validado contra los registros de flujo de caja y depósitos certificados en nuestro sistema central.
                            </p>

                            <p className="indent-12">
                                Constancia que se expide a petición de la parte interesada, a los fines de ser presentada ante quien corresponda, en la ciudad de Caracas, a los {certDateStr || "—"}.
                            </p>
                        </div>

                        <footer className="mt-32 grid grid-cols-2 gap-20 relative z-10">
                            <div className="flex flex-col items-center">
                                <div className="w-40 h-px bg-slate-900 mb-2 mt-16" />
                                <p className="font-semibold text-xs uppercase tracking-tight">Firma del Certificador</p>
                                <p className="text-[10px] uppercase font-bold opacity-40">System Kyron</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="p-4 border-2 border-slate-900 rounded-2xl bg-white shadow-inner">
                                    <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=CERT-KYRON-${formData.cedula}-${refId}&bgcolor=ffffff&color=000000&margin=1`} alt="QR Verification" width={100} height={100} className="grayscale" />
                                </div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide mt-4 opacity-40">Validación Digital Activa</p>
                            </div>
                        </footer>

                        <div className="mt-20 pt-10 border-t border-slate-100 text-center relative z-10">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-300 italic">DOCUMENTO SELLADO DIGITALMENTE • INTEGRIDAD DE DATOS GARANTIZADA • VÁLIDO POR 90 DÍAS</p>
                        </div>
                    </Card>

                    <div className="flex flex-wrap justify-center gap-4 no-print">
                        <Button variant="outline" className="rounded-xl h-14 px-8 font-semibold text-[10px] uppercase tracking-widest border-border bg-card text-foreground" onClick={() => setStep('form')}><ArrowLeft className="mr-3 h-4 w-4" /> REVISAR DATOS</Button>
                        <Button variant="outline" className="rounded-xl h-14 px-8 font-semibold text-[10px] uppercase tracking-widest border-border bg-card text-foreground" onClick={handlePrint}><Printer className="mr-3 h-4 w-4" /> IMPRIMIR</Button>
                        <Button className="btn-3d-secondary h-14 px-12 rounded-xl font-semibold text-[10px] uppercase tracking-widest shadow-lg" onClick={() => setStep('selector')}>FINALIZAR TRÁMITE</Button>
                    </div>
                </div>
            )}

            <div className="pt-10">
                <Card className="glass-card border-none rounded-2xl bg-card/40 overflow-hidden shadow-lg">
                    <CardHeader className="p-10 border-b border-border/50 bg-muted/10 flex justify-between items-center">
                        <div>
                            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-primary italic">Historial de Certificaciones</CardTitle>
                            <CardDescription className="text-[10px] font-bold uppercase opacity-30 mt-1">Dossier centralizado de documentos emitidos</CardDescription>
                        </div>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40" />
                            <Input placeholder="Buscar..." className="pl-9 h-9 rounded-xl bg-white/5 border-border text-[11px] font-bold uppercase" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/30 border-none">
                                    <TableHead className="pl-10 py-5 text-[11px] font-semibold uppercase tracking-widest opacity-30">Fecha Emisión</TableHead>
                                    {mode === 'hr' && <TableHead className="py-5 text-[11px] font-semibold uppercase tracking-widest opacity-30">Titular</TableHead>}
                                    <TableHead className="py-5 text-[11px] font-semibold uppercase tracking-widest opacity-30">Tipo de Documento</TableHead>
                                    <TableHead className="py-5 text-[11px] font-semibold uppercase tracking-widest opacity-30">Vigencia</TableHead>
                                    <TableHead className="text-right pr-10 py-5 text-[11px] font-semibold uppercase tracking-widest opacity-30">Acción</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {certHistory.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={mode === 'hr' ? 5 : 4} className="text-center py-12 text-muted-foreground text-xs uppercase font-bold">
                                            No hay certificaciones emitidas aún
                                        </TableCell>
                                    </TableRow>
                                )}
                                {certHistory.map((h) => (
                                    <TableRow key={h.id} className="border-border/50 hover:bg-muted/20 transition-all group">
                                        <TableCell className="pl-10 py-6 text-[10px] font-bold text-muted-foreground uppercase">{h.fecha}</TableCell>
                                        {mode === 'hr' && <TableCell className="py-6 font-semibold text-xs text-foreground/80 uppercase italic">{h.empleado}</TableCell>}
                                        <TableCell className="py-6 font-semibold text-xs text-foreground/80 uppercase italic group-hover:text-primary transition-colors">{h.tipo}</TableCell>
                                        <TableCell className="py-6">
                                            <Badge variant="outline" className="text-[10px] font-semibold uppercase border-emerald-500/20 text-emerald-400 bg-emerald-500/5 h-6 px-3 rounded-lg">{h.vigencia ? `Hasta ${h.vigencia}` : 'Sin vencimiento'}</Badge>
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
