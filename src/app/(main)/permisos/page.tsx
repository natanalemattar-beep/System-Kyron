
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, PlusCircle, Download, Scale, Trophy, Camera } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const permisos = [
    // --- Ministerio de Petróleo y relacionados ---
    { id: "PERM-PET-001", tipo: "Permiso de Transporte Terrestre de Hidrocarburos", emisor: "Min. Petróleo", fechaEmision: "10/01/2024", fechaVencimiento: "10/01/2025", estado: "Vigente" },
    { id: "PERM-PET-002", tipo: "Permiso de Transporte Acuático de Hidrocarburos", emisor: "Min. Petróleo / INEA", fechaEmision: "15/02/2024", fechaVencimiento: "15/02/2025", estado: "Vigente" },
    { id: "PERM-PET-003", tipo: "Autorización de Distribución de Lubricantes Terminados", emisor: "Min. Petróleo", fechaEmision: "01/03/2024", fechaVencimiento: "01/03/2025", estado: "Por Vencer" },
    { id: "PERM-PET-004", tipo: "Autorización de Distribución de Productos Derivados de Hidrocarburos", emisor: "Min. Petróleo", fechaEmision: "05/04/2024", fechaVencimiento: "05/04/2025", estado: "Vigente" },
    { id: "PERM-PET-005", tipo: "Permiso para Suministro y Almacenamiento de Gas", emisor: "Min. Petróleo", fechaEmision: "20/05/2024", fechaVencimiento: "20/05/2026", estado: "Vigente" },
    { id: "PERM-PET-006", tipo: "Actualización para industrialización de LGN", emisor: "Min. Petróleo", fechaEmision: "11/06/2024", fechaVencimiento: "11/06/2025", estado: "Vigente" },
    { id: "PERM-PET-007", tipo: "Registro para industrialización de refinación", emisor: "Min. Petróleo", fechaEmision: "12/07/2024", fechaVencimiento: "12/07/2025", estado: "Vigente" },
    
    // --- Construcción ---
    { id: "PERM-CONS-001", tipo: "Permiso de Construcción de Obra Civil", emisor: "Min. Obras Públicas / Alcaldía", fechaEmision: "01/02/2024", fechaVencimiento: "01/02/2026", estado: "Vigente" },
    { id: "PERM-CONS-002", tipo: "Permiso de Desmantelamiento de Instalaciones", emisor: "Min. Obras Públicas / MINEC", fechaEmision: "18/03/2024", fechaVencimiento: "18/09/2024", estado: "Por Vencer" },

    // --- Comercio Exterior ---
    { id: "PERM-COM-001", tipo: "Licencia de Importación", emisor: "Min. Comercio / SENIAT", fechaEmision: "01/07/2024", fechaVencimiento: "31/12/2024", estado: "Vigente" },
    { id: "PERM-COM-002", tipo: "Licencia de Exportación", emisor: "Min. Comercio / BANCOEX", fechaEmision: "15/06/2024", fechaVencimiento: "15/12/2024", estado: "Vigente" },
    { id: "PERM-COM-003", tipo: "Certificado de No Producción Nacional (CNP)", emisor: "Min. Comercio", fechaEmision: "22/07/2024", fechaVencimiento: "22/01/2025", estado: "Vigente" },

    // --- Permisología General y Otros Ministerios ---
    { id: "PERM-001", tipo: "Permiso Sanitario de Funcionamiento", emisor: "SACS (Min. Salud)", fechaEmision: "15/01/2024", fechaVencimiento: "15/01/2025", estado: "Vigente" },
    { id: "PERM-002", tipo: "Licencia de Actividades Económicas", emisor: "Alcaldía de Caracas", fechaEmision: "01/03/2024", fechaVencimiento: "01/03/2025", estado: "Vigente" },
    { id: "PERM-003", tipo: "Conformidad de Uso (Bomberos)", emisor: "Cuerpo de Bomberos", fechaEmision: "20/02/2024", fechaVencimiento: "20/08/2024", estado: "Por Vencer" },
    { id: "PERM-004", tipo: "Inscripción en el IVSS", emisor: "IVSS", fechaEmision: "10/01/2020", fechaVencimiento: "Indefinido", estado: "Vigente" },
    { id: "PERM-005", tipo: "Registro de Actividades (RACDA)", emisor: "MINEC", fechaEmision: "05/09/2023", fechaVencimiento: "05/09/2024", estado: "Por Vencer" },
    { id: "PERM-006", tipo: "Registro Sanitario de Producto", emisor: "SACS (Min. Salud)", fechaEmision: "11/11/2022", fechaVencimiento: "11/11/2027", estado: "Vigente" },
    { id: "PERM-007", tipo: "Acreditación en INPSASEL", emisor: "INPSASEL", fechaEmision: "18/01/2023", fechaVencimiento: "18/01/2025", estado: "Vigente" },
    { id: "PERM-008", tipo: "Habilitación Postal", emisor: "CONATEL", fechaEmision: "01/06/2021", fechaVencimiento: "01/06/2024", estado: "Vencido" },
    { id: "PERM-009", tipo: "Registro Nacional de Contratistas (RNC)", emisor: "SNC", fechaEmision: "10/07/2024", fechaVencimiento: "10/07/2025", estado: "Vigente" },
    { id: "PERM-010", tipo: "Inscripción en el RNA (CONALOTE)", emisor: "Min. Trabajo", fechaEmision: "01/02/2020", fechaVencimiento: "Indefinido", estado: "Vigente" },
    { id: "PERM-011", tipo: "Certificado de Inscripción en el RESQUIMC", emisor: "ONA", fechaEmision: "15/05/2024", fechaVencimiento: "15/05/2025", estado: "Vigente" },
    { id: "PERM-012", tipo: "Registro de Empresas de Producción Social (EPS)", emisor: "MINCOMUNAS", fechaEmision: "20/03/2023", fechaVencimiento: "20/03/2025", estado: "Por Vencer" },
    { id: "PERM-013", tipo: "Certificado de Fumigación", emisor: "SACS (Min. Salud)", fechaEmision: "01/07/2024", fechaVencimiento: "01/01/2025", estado: "Vigente" },
    { id: "PERM-014", tipo: "Registro Nacional del Deporte", emisor: "Min. Deporte", fechaEmision: "12/04/2024", fechaVencimiento: "12/04/2026", estado: "Vigente" },
    { id: "PERM-015", tipo: "Licencia de Turismo", emisor: "MINTUR", fechaEmision: "25/01/2024", fechaVencimiento: "25/01/2025", estado: "Vigente" },
    { id: "PERM-016", tipo: "Certificado de Patrimonio Cultural", emisor: "Min. Cultura (MPPC)", fechaEmision: "01/12/2023", fechaVencimiento: "Indefinido", estado: "Vigente" },
    { id: "PERM-017", tipo: "RUPDAE", emisor: "SUNDDE", fechaEmision: "10/02/2024", fechaVencimiento: "10/02/2025", estado: "Vigente" },
    { id: "PERM-020", tipo: "Registro de Marca", emisor: "SAPI", fechaEmision: "10/01/2022", fechaVencimiento: "10/01/2032", estado: "Vigente" },
    { id: "PERM-021", tipo: "Registro de Derecho de Autor", emisor: "SAPI", fechaEmision: "05/03/2023", fechaVencimiento: "Vitalicio", estado: "Vigente" },
    { id: "PERM-022", tipo: "Conformidad de Uso Educativo", emisor: "Min. Educación", fechaEmision: "01/09/2023", fechaVencimiento: "01/09/2028", estado: "Vigente" },
    { id: "PERM-023", tipo: "Asignación de ISBN", emisor: "CENAL", fechaEmision: "20/04/2024", fechaVencimiento: "N/A", estado: "Vigente" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Vigente: "default",
  "Por Vencer": "secondary",
  Vencido: "destructive",
};

export default function PermisosPage() {
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
                        <TableRow key={permiso.id} className={permiso.estado === 'Vencido' ? 'bg-destructive/10' : ''}>
                            <TableCell className="font-medium">{permiso.id}</TableCell>
                            <TableCell>{permiso.tipo}</TableCell>
                            <TableCell>{permiso.emisor}</TableCell>
                            <TableCell>{permiso.fechaEmision}</TableCell>
                            <TableCell>{permiso.fechaVencimiento}</TableCell>
                            <TableCell>
                                <Badge variant={statusVariant[permiso.estado]}>{permiso.estado}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon">
                                    <Download className="h-4 w-4" />
                                </Button>
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
