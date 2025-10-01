
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, PlusCircle, Download, RefreshCw } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const initialPermisos = [
    // --- Ministerios - Petróleo y Minería ---
    { id: "PERM-PET-001", tipo: "Transporte Terrestre de Hidrocarburos", emisor: "Min. Petróleo (MINPET)", fechaEmision: "2024-01-10", fechaVencimiento: "2025-01-10", estado: "Vigente" },
    { id: "PERM-PET-002", tipo: "Transporte Acuático de Hidrocarburos", emisor: "MINPET / INEA", fechaEmision: "2024-02-15", fechaVencimiento: "2025-02-15", estado: "Vigente" },
    { id: "PERM-PET-003", tipo: "Distribución de Lubricantes Terminados", emisor: "Min. Petróleo (MINPET)", fechaEmision: "2023-08-01", fechaVencimiento: "2024-08-01", estado: "Por Vencer" },
    { id: "PERM-PET-004", tipo: "Distribución de Derivados de Hidrocarburos", emisor: "Min. Petróleo (MINPET)", fechaEmision: "2024-04-05", fechaVencimiento: "2025-04-05", estado: "Vigente" },
    { id: "PERM-PET-005", tipo: "Suministro y Almacenamiento de Gas", emisor: "Min. Petróleo (MINPET)", fechaEmision: "2024-05-20", fechaVencimiento: "2026-05-20", estado: "Vigente" },
    { id: "PERM-PET-006", tipo: "Actualización de Industrialización de LGN", emisor: "Min. Petróleo (MINPET)", fechaEmision: "2024-06-11", fechaVencimiento: "2025-06-11", estado: "Vigente" },
    { id: "PERM-PET-007", tipo: "Registro para Industrialización de Refinación", emisor: "Min. Petróleo (MINPET)", fechaEmision: "2024-07-12", fechaVencimiento: "2025-07-12", estado: "Vigente" },
    { id: "PERM-MIN-001", tipo: "Desarrollo Minero Ecológico", emisor: "Min. Desarrollo Minero", fechaEmision: "2024-03-10", fechaVencimiento: "2026-03-10", estado: "Vigente" },

    // --- Ministerios - Comercio e Industria ---
    { id: "PERM-COM-001", tipo: "Licencia de Importación", emisor: "Min. Comercio / SENIAT", fechaEmision: "2024-07-01", fechaVencimiento: "2024-12-31", estado: "Vigente" },
    { id: "PERM-COM-002", tipo: "Licencia de Exportación", emisor: "Min. Comercio / BANCOEX", fechaEmision: "2024-06-15", fechaVencimiento: "2024-12-15", estado: "Vigente" },
    { id: "PERM-COM-003", tipo: "Certificado de No Producción Nacional (CNP)", emisor: "Min. Comercio", fechaEmision: "2024-07-22", fechaVencimiento: "2025-01-22", estado: "Vigente" },

    // --- Ministerios - Salud y Trabajo ---
    { id: "PERM-SAL-001", tipo: "Permiso Sanitario de Funcionamiento", emisor: "MPPS / SACS", fechaEmision: "2024-01-15", fechaVencimiento: "2025-01-15", estado: "Vigente" },
    { id: "PERM-SAL-002", tipo: "Registro Sanitario de Producto", emisor: "MPPS / SACS", fechaEmision: "2022-11-11", fechaVencimiento: "2027-11-11", estado: "Vigente" },
    { id: "PERM-SAL-003", tipo: "Certificado de Fumigación", emisor: "MPPS / SACS", fechaEmision: "2024-07-01", fechaVencimiento: "2025-01-01", estado: "Vigente" },
    { id: "PERM-SAL-004", tipo: "Permiso de Manipulación de Alimentos", emisor: "MPPS / SACS", fechaEmision: "2024-06-01", fechaVencimiento: "2025-06-01", estado: "Vigente" },
    { id: "PERM-SAL-005", tipo: "Conformidad Sanitaria de Habitabilidad", emisor: "MPPS / SACS", fechaEmision: "2024-02-10", fechaVencimiento: "2025-02-10", estado: "Vigente" },
    { id: "PERM-TRA-001", tipo: "Acreditación en INPSASEL", emisor: "INPSASEL (Min. Trabajo)", fechaEmision: "2023-01-18", fechaVencimiento: "2025-01-18", estado: "Vigente" },

    // --- Ministerios - Sectoriales Diversos ---
    { id: "PERM-CONS-001", tipo: "Permiso de Construcción de Obra Civil", emisor: "Min. Obras Públicas / Alcaldía", fechaEmision: "2024-02-01", fechaVencimiento: "2026-02-01", estado: "Vigente" },
    { id: "PERM-CONS-002", tipo: "Permiso de Desmantelamiento de Instalaciones", emisor: "Min. Obras Públicas / MINEC", fechaEmision: "2024-03-18", fechaVencimiento: "2024-09-18", estado: "Por Vencer" },
    { id: "PERM-ECO-001", tipo: "Registro de Actividades (RACDA)", emisor: "Min. Ecosocialismo (MINEC)", fechaEmision: "2023-09-05", fechaVencimiento: "2024-09-05", estado: "Por Vencer" },
    { id: "PERM-TUR-001", tipo: "Licencia de Turismo", emisor: "Min. Turismo (MINTUR)", fechaEmision: "2024-01-25", fechaVencimiento: "2025-01-25", estado: "Vigente" },
    { id: "PERM-TUR-002", tipo: "Inscripción en Marca País", emisor: "Min. Turismo (MINTUR)", fechaEmision: "2024-07-26", fechaVencimiento: "2026-07-26", estado: "Vigente" },
    { id: "PERM-EDU-001", tipo: "Conformidad de Uso Educativo", emisor: "Min. Educación", fechaEmision: "2023-09-01", fechaVencimiento: "2028-09-01", estado: "Vigente" },
    { id: "PERM-CUL-001", tipo: "Asignación de ISBN", emisor: "CENAL (Min. Cultura)", fechaEmision: "2024-04-20", fechaVencimiento: "N/A", estado: "Vigente" },
    { id: "PERM-CUL-002", tipo: "Certificado de Patrimonio Cultural", emisor: "Min. Cultura (MPPC)", fechaEmision: "2023-12-01", fechaVencimiento: "Indefinido", estado: "Vigente" },
    { id: "PERM-DEP-001", tipo: "Registro Nacional del Deporte", emisor: "Min. Deporte", fechaEmision: "2024-04-12", fechaVencimiento: "2026-04-12", estado: "Vigente" },
    { id: "PERM-PES-001", tipo: "Registro de Empresas de Pesca", emisor: "Min. Pesca y Acuicultura", fechaEmision: "2024-05-14", fechaVencimiento: "2025-05-14", estado: "Vigente" },
    
    // --- Permisos Municipales ---
    { id: "PERM-MUN-001", tipo: "Licencia de Actividades Económicas", emisor: "Alcaldía Municipal", fechaEmision: "2024-03-01", fechaVencimiento: "2025-03-01", estado: "Vigente" },
    { id: "PERM-MUN-002", tipo: "Conformidad de Uso de Bomberos", emisor: "Cuerpo de Bomberos", fechaEmision: "2023-08-20", fechaVencimiento: "2024-08-20", estado: "Por Vencer" },
    { id: "PERM-MUN-003", tipo: "Certificado de Uso Conforme", emisor: "Alcaldía (Ing. Municipal)", fechaEmision: "2024-03-01", fechaVencimiento: "2025-03-01", estado: "Vigente" },
    { id: "PERM-MUN-004", tipo: "Certificado de Uso de Suelo (Zonificación)", emisor: "Alcaldía (Urbanismo)", fechaEmision: "2024-03-01", fechaVencimiento: "2025-03-01", estado: "Vigente" },

    // --- Entes Nacionales y Registros Obligatorios ---
    { id: "PERM-NAC-001", tipo: "Inscripción Patronal en el IVSS", emisor: "IVSS", fechaEmision: "2020-01-10", fechaVencimiento: "Indefinido", estado: "Vigente" },
    { id: "PERM-NAC-002", tipo: "Inscripción en BANAVIH (FAOV)", emisor: "BANAVIH", fechaEmision: "2020-01-10", fechaVencimiento: "Indefinido", estado: "Vigente" },
    { id: "PERM-NAC-003", tipo: "Habilitación Postal", emisor: "CONATEL", fechaEmision: "2021-06-01", fechaVencimiento: "2024-06-01", estado: "Vencido" },
    { id: "PERM-NAC-004", tipo: "Registro Nacional de Contratistas (RNC)", emisor: "SNC", fechaEmision: "2024-07-10", fechaVencimiento: "2025-07-10", estado: "Vigente" },
    { id: "PERM-NAC-005", tipo: "Inscripción en el RNA (CONALOT)", emisor: "Min. Trabajo (MPPPST)", fechaEmision: "2020-02-01", fechaVencimiento: "Indefinido", estado: "Vigente" },
    { id: "PERM-NAC-006", tipo: "Inscripción en el RESQUIMC", emisor: "ONA (Min. Interior)", fechaEmision: "2024-05-15", fechaVencimiento: "2025-05-15", estado: "Vigente" },
    { id: "PERM-NAC-007", tipo: "Registro de Empresas de Producción Social (EPS)", emisor: "Min. Comunas", fechaEmision: "2023-08-20", fechaVencimiento: "2024-08-20", estado: "Por Vencer" },
    { id: "PERM-NAC-008", tipo: "Inscripción en el RUPDAE", emisor: "SUNDDE", fechaEmision: "2024-02-10", fechaVencimiento: "2025-02-10", estado: "Vigente" },
    { id: "PERM-NAC-009", tipo: "Registro de Marca", emisor: "SAPI", fechaEmision: "2022-01-10", fechaVencimiento: "2032-01-10", estado: "Vigente" },
    { id: "PERM-NAC-010", tipo: "Registro de Derecho de Autor", emisor: "SAPI", fechaEmision: "2023-03-05", fechaVencimiento: "Vitalicio", estado: "Vigente" },
    { id: "PERM-NAC-011", tipo: "Declaración de Aduanas (Nacionalización)", emisor: "SENIAT", fechaEmision: "2024-07-25", fechaVencimiento: "N/A", estado: "Vigente" },
    { id: "PERM-NAC-012", tipo: "Inscripción Militar Obligatoria (Empresa)", emisor: "Min. Defensa", fechaEmision: "2020-01-15", fechaVencimiento: "Indefinido", estado: "Vigente" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Vigente: "default",
  "Por Vencer": "secondary",
  Vencido: "destructive",
  "En Renovación": "outline",
};

const formatDate = (dateString: string) => {
    if (!dateString || dateString === "N/A" || dateString === "Indefinido" || dateString === "Vitalicio") return dateString;
    return new Date(dateString).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
}


export default function PermisosPage() {
  const [permisos, setPermisos] = useState(initialPermisos);
  const { toast } = useToast();

  const handleRenew = (permisoId: string) => {
    setPermisos(permisos.map(p => {
        if (p.id === permisoId) {
            const currentVencimiento = new Date(p.fechaVencimiento);
            const newVencimiento = new Date(currentVencimiento.setFullYear(currentVencimiento.getFullYear() + 1));
            
            toast({
                title: "Renovación Iniciada",
                description: `El permiso ${p.id} está ahora en proceso de renovación.`,
            });
            
            return { ...p, estado: "En Renovación", fechaVencimiento: newVencimiento.toISOString().split('T')[0] };
        }
        return p;
    }));
  };

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <UserCheck className="h-8 w-8" />
                Gestión de Permisos
            </h1>
            <p className="text-muted-foreground mt-2">
                Consulta y gestiona todos los permisos y licencias de tu empresa.
            </p>
        </div>
        <Button>
            <PlusCircle className="mr-2" />
            Solicitar Nuevo Permiso
        </Button>
      </header>
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Permisos y Licencias</CardTitle>
            <CardDescription>Listado de todos los permisos activos y su estado.</CardDescription>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Referencia</TableHead>
                        <TableHead>Tipo de Permiso</TableHead>
                        <TableHead>Ente Emisor</TableHead>
                        <TableHead>Fecha Emisión</TableHead>
                        <TableHead>Fecha Vencimiento</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {permisos.map((permiso) => (
                        <TableRow key={permiso.id} className={permiso.estado === 'Vencido' ? 'bg-destructive/10' : permiso.estado === 'Por Vencer' ? 'bg-secondary/50' : ''}>
                            <TableCell className="font-medium">{permiso.id}</TableCell>
                            <TableCell>{permiso.tipo}</TableCell>
                            <TableCell>{permiso.emisor}</TableCell>
                            <TableCell>{formatDate(permiso.fechaEmision)}</TableCell>
                            <TableCell>{formatDate(permiso.fechaVencimiento)}</TableCell>
                            <TableCell>
                                <Badge variant={statusVariant[permiso.estado]}>{permiso.estado}</Badge>
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button variant="ghost" size="icon" title="Descargar">
                                    <Download className="h-4 w-4" />
                                </Button>
                                {(permiso.estado === "Por Vencer" || permiso.estado === "Vencido") && (
                                     <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm">
                                                <RefreshCw className="mr-2 h-4 w-4" />
                                                Renovar
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Confirmar Renovación</DialogTitle>
                                                <DialogDescription>
                                                    Estás a punto de iniciar el proceso de renovación para el permiso <span className="font-bold">{permiso.id} ({permiso.tipo})</span>. ¿Deseas continuar?
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline">Cancelar</Button>
                                                </DialogTrigger>
                                                <DialogTrigger asChild>
                                                    <Button onClick={() => handleRenew(permiso.id)}>Sí, Iniciar Renovación</Button>
                                                </DialogTrigger>
                                            </DialogFooter>
                                        </DialogContent>
                                     </Dialog>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
