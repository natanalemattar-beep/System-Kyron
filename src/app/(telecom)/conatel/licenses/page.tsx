
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { FileText, CirclePlus as PlusCircle, Filter, TriangleAlert as AlertTriangle, Calculator, Download, Check as Checkbox, FileUp, Info } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const initialComplianceStatus = [
    { id: "CON-001", name: "Concesión de Espectro Radioeléctrico", expires: "2028-03-20", status: "Vigente", diasMora: 0, dailyPenalty: 25, calculatedPenalty: 0, requirements: ["form_A", "payment_proof"] },
    { id: "CON-002", name: "Licencia de Proveedor de Servicios (ISP)", expires: "2028-04-01", status: "Vigente", diasMora: 0, dailyPenalty: 20, calculatedPenalty: 0, requirements: ["form_B", "financial_statement"] },
    { id: "CON-003", name: "Habilitación Postal", expires: "2024-06-01", status: "Vencida", diasMora: 68, dailyPenalty: 15.50, calculatedPenalty: 1054, requirements: ["form_FUR-02", "payment_proof_fine", "previous_license_copy", "rif_copy", "solvencia_seniat", "solvencia_ivss"] },
];

const tramiteRequisitos: Record<string, { id: string; label: string; type: 'download' | 'calculator' | 'upload' }> = {
    "form_FUR-02": { id: "req-1", label: "Formulario Único de Renovación (FUR-02)", type: "download" },
    "payment_proof_fine": { id: "req-2", label: "Pago de derechos administrativos + multa por mora", type: "calculator" },
    "previous_license_copy": { id: "req-3", label: "Copia de la habilitación anterior", type: "upload" },
    "rif_copy": { id: "req-4", label: "Copia del RIF actualizado", type: "upload" },
    "solvencia_seniat": { id: "req-5", label: "Solvencia de Obligaciones Tributarias (SENIAT)", type: "upload" },
    "solvencia_ivss": { id: "req-6", label: "Solvencia Laboral (IVSS, FAOV, INCES)", type: "upload" },
};

const statusVariant: { [key: string]: "default" | "destructive" | "secondary" } = {
  Vigente: "default",
  Vencida: "destructive",
  "Por Vencer": "secondary",
};


export default function LicensesPage() {
    const { toast } = useToast();
    const [isWizardOpen, setIsWizardOpen] = useState(false);
    const [wizardStep, setWizardStep] = useState(1);
    const [selectedTramite, setSelectedTramite] = useState("");
    const [selectedLicenciaId, setSelectedLicenciaId] = useState("");
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
    const [multaCalculada, setMultaCalculada] = useState<{ derecho: number, multa: number, total: number } | null>(null);

    const selectedLicencia = initialComplianceStatus.find(l => l.id === selectedLicenciaId);
    
    const handleCalculateMulta = () => {
        if (selectedLicencia) {
            const derecho = 500; // Example base fee
            const multa = selectedLicencia.diasMora * selectedLicencia.dailyPenalty;
            setMultaCalculada({ derecho, multa, total: derecho + multa });
        }
    };
    
    return (
        <div className="space-y-8">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Gestión de Licencias CONATEL</h1>
                    <p className="text-muted-foreground mt-2">
                        Administra el ciclo de vida de tus habilitaciones y permisos.
                    </p>
                </div>
                 <Button onClick={() => { setIsWizardOpen(true); setWizardStep(1); setSelectedLicenciaId(""); setSelectedTramite(""); }}>
                    <PlusCircle className="mr-2"/>
                    Nueva Solicitud / Trámite
                </Button>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Mis Licencias</CardTitle>
                    <CardDescription>
                        Listado detallado de todas las licencias y su estado de cumplimiento.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Licencia</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Vencimiento</TableHead>
                                <TableHead className="text-center">Días Vencidos</TableHead>
                                <TableHead className="text-right">Multa Estimada</TableHead>
                                <TableHead className="text-right">Próximo Paso</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {initialComplianceStatus.map(item => (
                                <TableRow key={item.id} className={item.status === 'Vencida' ? 'bg-destructive/10' : ''}>
                                    <TableCell className="font-medium">{item.name} ({item.id})</TableCell>
                                    <TableCell><Badge variant={statusVariant[item.status as keyof typeof statusVariant]}>{item.status}</Badge></TableCell>
                                    <TableCell>{formatDate(item.expires)}</TableCell>
                                    <TableCell className="text-center font-mono">{item.diasMora > 0 ? item.diasMora : '-'}</TableCell>
                                    <TableCell className="text-right font-mono">{item.calculatedPenalty > 0 ? formatCurrency(item.calculatedPenalty, '$') : '-'}</TableCell>
                                    <TableCell className="text-right">
                                        <Button 
                                            variant={item.status === 'Vencida' ? 'destructive' : 'default'} 
                                            size="sm"
                                            onClick={() => {setSelectedLicenciaId(item.id); setSelectedTramite("renovacion"); setWizardStep(3); setIsWizardOpen(true);}}
                                        >
                                            {item.status === 'Vencida' ? 'Renovar Urgente' : 'Gestionar'}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Asistente de Trámites CONATEL</DialogTitle>
                    </DialogHeader>
                    {wizardStep === 1 && (
                        <div className="py-4 space-y-4">
                            <Label>Paso 1: ¿Qué trámite necesita?</Label>
                            <Select onValueChange={(val) => { setSelectedTramite(val); setWizardStep(2); }}>
                                <SelectTrigger><SelectValue placeholder="Seleccione una opción..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="renovacion">Renovación de Licencia/Habilitación</SelectItem>
                                    <SelectItem value="nueva">Nueva Licencia/Habilitación</SelectItem>
                                    <SelectItem value="consulta">Consulta o Modificación de Trámite</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    {wizardStep === 2 && (
                        <div className="py-4 space-y-4">
                            <Label>Paso 2: ¿Para qué licencia?</Label>
                            <Select onValueChange={(val) => { setSelectedLicenciaId(val); setWizardStep(3); }} value={selectedLicenciaId}>
                                <SelectTrigger><SelectValue placeholder="Seleccione la licencia..." /></SelectTrigger>
                                <SelectContent>
                                    {initialComplianceStatus.map(l => (
                                        <SelectItem key={l.id} value={l.id} className={l.status === 'Vencida' ? 'text-destructive' : ''}>
                                            {l.name} ({l.id}) - {l.status}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    {wizardStep === 3 && selectedLicencia && (
                        <div className="py-4">
                            <DialogTitle>Paso 3: Checklist de Requisitos</DialogTitle>
                            <DialogDescription>
                                Para la "Renovación de {selectedLicencia.name}" necesita:
                            </DialogDescription>
                            <div className="mt-4 space-y-3 max-h-80 overflow-y-auto pr-2">
                                {selectedLicencia.requirements.map(reqKey => {
                                    const req = tramiteRequisitos[reqKey];
                                    if (!req) return null;
                                    return (
                                    <div key={req.id} className="flex items-center gap-4 justify-between p-3 rounded-lg bg-secondary/50">
                                        <div className="flex items-center gap-3">
                                            <Checkbox id={req.id}/>
                                            <Label htmlFor={req.id}>{req.label}</Label>
                                        </div>
                                        {req.type === 'calculator' && (
                                            <Button variant="secondary" size="sm" onClick={() => { handleCalculateMulta(); setIsCalculatorOpen(true); }}>
                                                <Calculator className="mr-2 h-4 w-4"/>Calcular
                                            </Button>
                                        )}
                                        {req.type === 'download' && <Button variant="secondary" size="sm"><Download className="mr-2 h-4 w-4"/>Descargar</Button>}
                                        {req.type === 'upload' && <Button variant="secondary" size="sm"><FileUp className="mr-2 h-4 w-4"/>Adjuntar</Button>}
                                    </div>
                                )})}
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsWizardOpen(false)}>Cancelar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

             <Dialog open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Calculadora de Costos y Multas</DialogTitle>
                    </DialogHeader>
                    {selectedLicencia && (
                        <div className="py-4 space-y-4">
                            <p><strong>Licencia:</strong> {selectedLicencia.name}</p>
                            <p><strong>Días de retraso:</strong> {selectedLicencia.diasMora}</p>
                            {multaCalculada && (
                                <div className="pt-4 border-t space-y-2">
                                    <div className="flex justify-between"><span>Derecho de Renovación:</span> <span>{formatCurrency(multaCalculada.derecho, "$")}</span></div>
                                    <div className="flex justify-between text-destructive"><span>Multa por mora:</span> <span>{formatCurrency(multaCalculada.multa, "$")}</span></div>
                                    <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total a pagar estimado:</span> <span>{formatCurrency(multaCalculada.total, "$")}</span></div>
                                </div>
                            )}
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={() => setIsCalculatorOpen(false)}>Cerrar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
